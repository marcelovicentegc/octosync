import { github, jira } from "../../../clients";
import { CONTROL_COMMENT_BODY } from "../consts";
import { ISSUE_KEY_REGEX } from "./consts";
import { reverse } from "./utils";

export async function handleOpenedIssue(params: {
  title: string;
  triggererEmail: string;
  body: string;
  labels: string[];
  ghIssueNumber: number;
  repositoryName: string;
}) {
  const {
    title,
    triggererEmail,
    body,
    labels,
    ghIssueNumber,
    repositoryName,
  } = params;

  const issue = await jira.createJiraIssue(
    title,
    triggererEmail,
    body,
    labels,
    jira.defaultIssueTypes.task,
    repositoryName,
    ghIssueNumber.toString()
  );

  const updatedTitle = `${issue.key} - ${title}`;

  await github.updateIssue({
    issueNumber: ghIssueNumber,
    repository: repositoryName,
    title: updatedTitle,
  });
}

export async function handleClosedIssue(params: { title: string }) {
  const { title } = params;

  const match = reverse(title).match(ISSUE_KEY_REGEX);

  if (!match) {
    return false;
  }

  await jira.closeIssue(reverse(match[0]));

  return true;
}

export async function handleIssueCommentCreation(params: {
  title: string;
  body: string;
  commentId: number;
  owner: string;
  repositoryName: string;
}) {
  const { title, body, commentId, owner, repositoryName } = params;

  if (
    body.includes(CONTROL_COMMENT_BODY.FROM_GITHUB) ||
    body.includes(CONTROL_COMMENT_BODY.FROM_JIRA)
  ) {
    return "conflict";
  }

  const match = reverse(title).match(ISSUE_KEY_REGEX);

  if (!match) {
    return "unprocessableEntity";
  }

  const customBody = `${body}\n\n${CONTROL_COMMENT_BODY.FROM_GITHUB} by ${owner}`;

  await github.updateIssueComment({
    commentId,
    owner,
    body: customBody,
    repository: repositoryName,
  });

  await jira.commentIssue({
    issueKey: reverse(match[0]),
    body: customBody,
  });

  return "success";
}
