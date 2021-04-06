import { jira } from "../../clients";

export class Jira {
  private host: string;
  private project: string;
  private projectId: string;

  private async getUserAccountId(email: string) {
    try {
      let user = await jira.user.search({
        query: email,
      });
      if (user.length > 0) return user[0].accountId;
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
      const ticket = {
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

      return await jira.issue.createIssue(ticket);
    } catch (err) {
      throw new Error(err.toString());
    }
  }

  public async closeIssue(issueNumber: number) {
    try {
      const transitions = await jira.issue.getTransitions({
        issueKey: `${this.project}-${issueNumber}`,
      });

      const transitionId = transitions.transitions.find(
        (transition: any) => transition.name === "Done"
      ).id;

      await jira.issue.transitionIssue({
        issueKey: `${this.project}-${issueNumber}`,
        transition: {
          id: transitionId,
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
