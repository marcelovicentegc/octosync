import { CreateIssue } from "jira.js/out/version2/parameters";
import { jira } from "./singleton";

export class Jira {
  private host: string;
  private project: string;
  private projectId: string;

  private async getUserAccountId(email: string) {
    try {
      // See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-rest-api-3-user-get
      await jira.sendRequest<{ user: [{ accountId: string }] }>(
        {
          url: "search",
          params: {
            query: email,
          },
        },
        (err, data) => {
          if (err) {
            throw new Error(err.name);
          }

          if (data?.user && data.user.length > 0) return data.user[0].accountId;
        }
      );
      return null;
    } catch (err) {
      throw err;
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
      const ticket: CreateIssue = {
        fields: {
          project: { id: this.projectId },
          summary: title,
          description: description,
          issuetype: { id: issueTypeId },
          labels,
        },
      };

      const accountId = await this.getUserAccountId(email);

      if (accountId) {
        Object.assign(ticket.fields, { assignee: { id: accountId } });
      }

      return await jira.issues.createIssue(ticket);
    } catch (err) {
      throw new Error(err.toString());
    }
  }

  public async closeIssue(issueNumber: number) {
    try {
      await jira.issues.doTransition({
        issueIdOrKey: `${this.project}-${issueNumber}`,
        transition: {
          name: "Done",
        },
      });
    } catch (err) {
      throw new Error(err.toString());
    }
  }

  public async buildIssueUrl(issueKey: string) {
    try {
      return `https://${this.host}/jira/software/projects/${this.project}/issues/${issueKey}`;
    } catch (err) {
      throw new Error(err.toString());
    }
  }
}
