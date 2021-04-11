import { jira, github } from "../../../clients";
import { CONTROL_LABELS } from "../consts";
import { webhook } from "../router";
import { removeDuplicates } from "../utils";
import { ISSUE_KEY_REGEX } from "./consts";
import { IssuePayload } from "./types";
import { reverse } from "./utils";

webhook.post("/github", async (req, res) => {
  const reqBody = req.body as IssuePayload;

  try {
    const {
      action,
      issue: { title, body, number: ghIssueNumber, labels: ghLabels },
      repository: { name: repositoryName },
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

    switch (action) {
      case "opened":
        const issue = await jira.createJiraIssue(
          title,
          triggererEmail,
          body,
          labels,
          jira.defaultIssueTypes.task
        );

        const updatedTitle = `${issue.key} - ${title}`;

        await github.updateIssue({
          issueNumber: ghIssueNumber,
          repository: repositoryName,
          title: updatedTitle,
        });
        break;
      case "closed":
        const match = reverse(title).match(ISSUE_KEY_REGEX);

        if (!match) {
          res.status(422).end("Unprocessable Entity");
          return res;
        }

        await jira.closeIssue(reverse(match[0]));
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
