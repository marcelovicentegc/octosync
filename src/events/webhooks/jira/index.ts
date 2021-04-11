import { github, jira } from "../../../clients";
import { useEnv } from "../../../hooks";
import { CONTROL_LABELS, STRING_AFTER_LAST_SLASH_REGEX } from "../consts";
import { webhook } from "../router";
import { removeDuplicates } from "../utils";
import { IssuePayload } from "./types";

webhook.post("/jira", async (req, res) => {
  const reqBody = req.body as IssuePayload;

  const {
    GITHUB_REPOSITORY,
    JIRA_DONE_STATUS_NAME,
    JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD,
    JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD,
  } = useEnv();

  try {
    const {
      webhookEvent,
      issue: {
        fields: { summary, description, labels: jiraLabels, status },
        key,
      },
    } = reqBody;

    // This means that this issue has already been created,
    // and this hook must finish executing immediately.
    if (jiraLabels.includes(CONTROL_LABELS.FROM_GITHUB)) {
      return;
    }

    switch (webhookEvent) {
      case "jira:issue_created":
        jiraLabels.push(CONTROL_LABELS.FROM_JIRA);

        const labels = removeDuplicates(jiraLabels);

        const { data: issue } = await github.createIssue({
          repository: GITHUB_REPOSITORY,
          title: `${key} - ${summary}`,
          body: description,
          labels,
        });

        await jira.updateIssueWithGithubData({
          issueKey: key,
          repository: issue.repository_url.match(
            STRING_AFTER_LAST_SLASH_REGEX
          )![0],
          issueNumber: issue.number.toString(),
        });
      case "jira:issue_updated":
        if (status.name === JIRA_DONE_STATUS_NAME) {
          await github.updateIssue({
            issueNumber:
              reqBody.issue.fields[JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD],
            repository:
              reqBody.issue.fields[JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD],
            state: "closed",
          });
        }
      default:
        break;
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

export { webhook as jira };
