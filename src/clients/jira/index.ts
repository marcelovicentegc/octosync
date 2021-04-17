import { CreateIssue, User } from "./types";
import { jira } from "./singleton";
import { handleAxiosError } from "../../utils/errors";
import { useEnv } from "../../hooks";

export class Jira {
  private host: string;
  private project: string;
  private projectId: string;
  public defaultIssueTypes = {
    epic: "10000",
    story: "10001",
    task: "10002",
    subTask: "10003",
    bug: "10004",
  };

  private async getUserAccountId(email: string) {
    try {
      const users: User[] = await jira.userSearch.findUsers({
        query: email,
      });

      return users[0].accountId;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public constructor(host: string, project: string, projectId: string) {
    this.host = host;
    this.project = project;
    this.projectId = projectId;
  }

  public async createJiraIssue(
    title: string,
    email: string,
    description: string,
    labels: string[],
    issueTypeId: string,
    repository: string,
    issueNumber: string
  ) {
    try {
      const {
        JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD,
        JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD,
      } = useEnv();

      let ticket: CreateIssue = {
        fields: {
          project: { id: this.projectId },
          summary: title,
          description,
          issuetype: { id: issueTypeId },
          labels,
          assignee: {
            id: undefined,
          },
          [JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD]: issueNumber,
          [JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD]: repository,
        },
      };

      const accountId = await this.getUserAccountId(email);

      if (accountId) {
        ticket.fields.assignee!.id = accountId;
      }

      return await jira.issues.createIssue(ticket);
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }

  public async updateIssueWithGithubData(params: {
    issueKey: string;
    repository: string;
    issueNumber: string;
  }) {
    const { issueKey, repository, issueNumber } = params;

    const {
      JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD,
      JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD,
    } = useEnv();

    try {
      await jira.issues.editIssue({
        issueIdOrKey: issueKey,
        fields: {
          [JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD]: issueNumber,
          [JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD]: repository,
        },
      });
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }

  public async commentIssue(params: { issueKey: string; body: string }) {
    const { issueKey, body } = params;

    try {
      await jira.issues.addComment({
        issueIdOrKey: issueKey,
        body,
      });
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }

  public async closeIssue(issueKey: string) {
    const { JIRA_DONE_TRANSITION_ID } = useEnv();

    try {
      await jira.issues.doTransition({
        issueIdOrKey: issueKey,
        transition: {
          id: JIRA_DONE_TRANSITION_ID,
        },
      });
    } catch (error) {
      handleAxiosError(error);
    }
  }

  public async getIssue(issueKey: string) {
    try {
      return await jira.issues.getIssue({
        issueIdOrKey: issueKey,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  }

  public async buildIssueUrl(issueKey: string) {
    try {
      return `https://${this.host}/jira/software/projects/${this.project}/issues/${issueKey}`;
    } catch (err) {
      throw err;
    }
  }
}
