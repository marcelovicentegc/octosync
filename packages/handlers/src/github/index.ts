import { jira } from "@octosync/clients";
import {
  reverse,
  ISSUE_KEY_REGEX,
  CONTROL_COMMENT_BODY,
} from "@octosync/utils";
import { Clients } from "../types";
import { resolveGithubClient } from "./utils";

export async function handleOpenedIssue(params: {
  clients: Clients;
  title: string;
  triggererEmail: string;
  body: string;
  labels: string[];
  issueNumber: number;
  organization: string;
  repository: string;
  state?: "open" | "closed";
}) {
  const {
    clients,
    organization,
    title,
    triggererEmail,
    body,
    labels,
    issueNumber,
    repository,
    state,
  } = params;

  const github = resolveGithubClient(clients);

  const issue = await jira.createJiraIssue(
    title,
    triggererEmail,
    body,
    labels,
    jira.defaultIssueTypes.task,
    repository,
    issueNumber.toString()
  );

  const updatedTitle = `${issue.key} - ${title}`;

  await github.issues.update({
    owner: organization,
    repo: repository,
    issue_number: issueNumber,
    body,
    title: updatedTitle,
    state,
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
  clients: Clients;
  title: string;
  body: string;
  commentId: number;
  owner: string;
  repository: string;
}) {
  const { clients, title, body, commentId, owner, repository } = params;

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

  const github = resolveGithubClient(clients);

  const customBody = `${body}\n\n${CONTROL_COMMENT_BODY.FROM_GITHUB} by ${owner}`;

  await github.issues.updateComment({
    owner,
    repo: repository,
    comment_id: commentId,
    body,
  });

  await jira.commentIssue({
    issueKey: reverse(match[0]),
    body: customBody,
  });

  return "success";
}
