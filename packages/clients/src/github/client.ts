import { github } from "./singleton";
import { OK_STATUS } from "./consts";

export class Github {
  private organization: string;

  public constructor(organization: string) {
    this.organization = organization;
  }

  public async getIssue(issueNumber: number, repository: string) {
    try {
      const response = await github.issues.get({
        owner: this.organization,
        repo: repository,
        issue_number: issueNumber,
      });

      if (OK_STATUS.includes(response.status)) {
        return response;
      }

      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async listIssueComments(issueNumber: number, repository: string) {
    return await github.issues.listComments({
      owner: this.organization,
      repo: repository,
      issue_number: issueNumber,
    });
  }

  public async commentIssue(params: {
    repository: string;
    issueNumber: number;
    body: string;
  }) {
    const { repository, issueNumber, body } = params;

    try {
      return await github.issues.createComment({
        owner: this.organization,
        repo: repository,
        issue_number: issueNumber,
        body,
      });
    } catch (error) {
      throw error;
    }
  }

  public async updateIssueComment(params: {
    owner: string;
    repository: string;
    commentId: number;
    body: string;
  }) {
    const { owner, repository, commentId, body } = params;

    try {
      return await github.issues.updateComment({
        owner,
        repo: repository,
        comment_id: commentId,
        body,
      });
    } catch (error) {
      throw error;
    }
  }

  public async createIssue(params: {
    repository: string;
    title: string;
    body: string;
    labels: string[];
  }) {
    const { repository, title, body, labels } = params;

    return await github.issues.create({
      owner: this.organization,
      repo: repository,
      title: title,
      body: body,
      labels,
    });
  }

  public async updateIssue(params: {
    issueNumber: number;
    repository: string;
    state?: "open" | "closed";
    body?: string;
    title?: string;
  }) {
    const { repository, issueNumber, body, title, state } = params;

    return await github.issues.update({
      owner: this.organization,
      repo: repository,
      issue_number: issueNumber,
      body,
      title,
      state,
    });
  }
}
