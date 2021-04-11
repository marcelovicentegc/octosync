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
    issueTypeId: string
  ) {
    try {
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

  public async buildIssueUrl(issueKey: string) {
    try {
      return `https://${this.host}/jira/software/projects/${this.project}/issues/${issueKey}`;
    } catch (err) {
      throw err;
    }
  }
}
