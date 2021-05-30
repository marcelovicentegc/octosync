import { removeDuplicates, CONTROL_LABELS, useEnv } from "@octosync/utils";
import {
  handleClosedIssue,
  handleIssueCommentCreation,
  handleOpenedIssue,
} from "@octosync/handlers";
import { webhook } from "../router";
import { IssuePayload } from "./types";

const { GITHUB_TOKEN } = useEnv();

webhook.post("/github", async (req, res) => {
  const reqBody = req.body as IssuePayload;

  try {
    const {
      action,
      issue: { title, body, number: ghIssueNumber, labels: ghLabels },
      sender,
      comment,
      repository: {
        name: repositoryName,
        owner: { login: organizationName },
      },
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
          clients: {
            github: {
              auth: GITHUB_TOKEN,
            },
          },
          organization: organizationName,
          title,
          triggererEmail,
          body,
          labels,
          issueNumber: ghIssueNumber,
          repository: repositoryName,
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
          clients: {
            github: {
              auth: GITHUB_TOKEN,
            },
          },
          title,
          body: comment.body,
          owner: sender.login,
          repository: repositoryName,
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
