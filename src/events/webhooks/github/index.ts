import { CONTROL_LABELS } from "../consts";
import { webhook } from "../router";
import { removeDuplicates } from "../utils";
import {
  handleClosedIssue,
  handleIssueCommentCreation,
  handleOpenedIssue,
} from "./handlers";
import { IssuePayload } from "./types";

webhook.post("/github", async (req, res) => {
  const reqBody = req.body as IssuePayload;

  try {
    const {
      action,
      issue: { title, body, number: ghIssueNumber, labels: ghLabels },
      sender,
      comment,
      repository: { name: repositoryName },
    } = reqBody;
    const triggererEmail = reqBody.issue.user.login;

    // This means that this issue has already been created,
    // and this hook must finish executing immediately.
    if (
      action === "opened" &&
      ghLabels.some((label) => label.name === CONTROL_LABELS.FROM_JIRA)
    ) {
      res.status(409).end("Conflict");
      return res;
    }

    let labels = ghLabels.map((label) => label.name);

    labels.push(CONTROL_LABELS.FROM_GITHUB);

    labels = removeDuplicates(labels);

    switch (action) {
      case "opened":
        await handleOpenedIssue({
          title,
          triggererEmail,
          body,
          labels,
          ghIssueNumber,
          repositoryName,
        });
        break;
      case "closed":
        const success = await handleClosedIssue({ title });

        if (!success) {
          res.status(422).end("Unprocessable Entity");
          return res;
        }

        break;
      case "created":
        const result = await handleIssueCommentCreation({
          title,
          body: comment.body,
          owner: sender.login,
          repositoryName,
          commentId: comment.id,
        });

        if (result === "conflict") {
          res.status(409).end("Conflict");
          return res;
        }

        if (result === "unprocessableEntity") {
          res.status(422).end("Unprocessable Entity");
          return res;
        }
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(400).end("Bad Request");
    return res;
  }

  res.setHeader("Content-Type", "application/json");
  res.status(202).json("Accepted");

  return res;
});

export { webhook as github };
