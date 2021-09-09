import { github, jira } from "@octosync/clients";
import { useEnv } from "@octosync/utils";
import {
  removeDuplicates,
  CONTROL_COMMENT_BODY,
  CONTROL_LABELS,
  STRING_AFTER_LAST_SLASH_REGEX,
} from "@octosync/utils";
import { webhook } from "../router";
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
      comment,
      issue: {
        fields: { summary, description, labels: jiraLabels, status },
        key,
      },
    } = reqBody;

    switch (webhookEvent) {
      case "jira:issue_created":
        const {
          PUBLIC_CONFIG: {
            direction: { issue_creation },
          },
        } = useEnv();

        if (issue_creation === "github-to-jira") {
          return;
        }

        // This means that this issue has already been created,
        // and this hook must finish executing immediately.
        if (jiraLabels?.includes(CONTROL_LABELS.FROM_GITHUB)) {
          res.status(409).end("Conflict");
          return res;
        }

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
        const {
          PUBLIC_CONFIG: {
            direction: { issue_closing },
          },
        } = useEnv();

        if (issue_closing === "github-to-jira") {
          return;
        }

        if (status.name === JIRA_DONE_STATUS_NAME) {
          await github.updateIssue({
            issueNumber:
              reqBody.issue.fields[JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD],
            repository:
              reqBody.issue.fields[JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD],
            state: "closed",
          });
        }
      case "comment_created":
        const {
          PUBLIC_CONFIG: {
            direction: { comments },
          },
        } = useEnv();

        if (comments === "github-to-jira") {
          return;
        }

        const commentBody = comment?.body;

        if (!commentBody) {
          res.status(400).end("Bad Request");
          return res;
        }

        // Prevents duplicating a comment that came from Github, on Github
        if (
          commentBody.includes(CONTROL_COMMENT_BODY.FROM_GITHUB) ||
          commentBody.includes(CONTROL_COMMENT_BODY.FROM_JIRA)
        ) {
          res.status(409).end("Conflict");
          return res;
        }

        const jiraIssue = await jira.getIssue(key);

        if (!jiraIssue) {
          res.status(404).end("Not Found");
          return res;
        }

        const customBody = `${commentBody}\n\n${CONTROL_COMMENT_BODY.FROM_JIRA} by ${comment?.author.displayName}`;

        await github.commentIssue({
          issueNumber: jiraIssue.fields[JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD],
          repository: jiraIssue.fields[JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD],
          body: customBody,
        });
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
