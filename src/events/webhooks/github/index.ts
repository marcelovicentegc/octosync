import { jira } from "../../../clients";
import { CONTROL_LABELS } from "../consts";
import { webhook } from "../router";
import { removeDuplicates } from "../utils";
import { IssuePayload } from "./types";

webhook.post("/github", async (req, res) => {
  const reqBody = req.body as IssuePayload;

  try {
    const {
      action,
      issue: { title, body, labels: ghLabels },
    } = reqBody;
    const triggererEmail = reqBody.issue.user.login;

    // This means that this issue has already been created,
    // and this hook must finish executing immediately.
    if (ghLabels.some((label) => label.name === CONTROL_LABELS.FROM_JIRA)) {
      return;
    }

    let labels = ghLabels.map((label) => label.name);

    labels.push(CONTROL_LABELS.FROM_GITHUB);

    labels = removeDuplicates(labels);

    if (action === "opened") {
      await jira.createJiraIssue(
        title,
        triggererEmail,
        body,
        labels,
        jira.defaultIssueTypes.task
      );
    }
  } catch (error) {
    console.error(error);
    res.status(400).end("Bad Request");
    return res;
  }

  res.setHeader("Content-Type", "application/json");
  res.status(202).json("Accepted");

  return res;
});

export { webhook as github };
