import { github } from "../../clients";
import { BREAK_REGEX, DATE_REGEX, OK_STATUS } from "./consts";
import { formatDateTime } from "./utils";

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

  public async addIssueComment(
    issueNumber: number,
    newComment: string,
    author: string,
    launcher: string,
    repository: string,
    timestamp: number
  ) {
    try {
      const response = await github.issues.listComments({
        owner: this.organization,
        repo: repository,
        issue_number: issueNumber,
      });
      if (OK_STATUS.includes(response.status)) {
        let shouldCommentIssue = true;

        if (response.data.length > 0) {
          const checkComment = newComment
            .replace(BREAK_REGEX, "")
            .substring(0, 150);

          response.data.forEach((message) => {
            if (message.body) {
              message.body = message.body.replace(BREAK_REGEX, "");

              const datetimeArray = message.body.match(DATE_REGEX);

              if (datetimeArray) {
                const buffer = Buffer.from(message.body);

                const commentStartIndex =
                  buffer.indexOf(datetimeArray[0], 50) +
                  datetimeArray[0].length;

                const bodySlice = message.body
                  .substring(commentStartIndex)
                  .slice(0, 150);

                if (bodySlice === checkComment) {
                  shouldCommentIssue = false;
                }
              } else {
                const bodySlice = message.body.slice(0, 150);

                if (bodySlice === checkComment) {
                  shouldCommentIssue = false;
                }
              }
            }
          });
        }

        if (shouldCommentIssue) {
          const body = `[**who add this**] : ${launcher}\n[**message from**] : ${author}\n[**message date**] : ${formatDateTime(
            timestamp
          )}\r\n\n${newComment}`;

          await this.commentIssue(repository, issueNumber, body);
        }
      }
    } catch (err) {
      return;
    }
  }

  public async listIssueComments(issueNumber: number, repository: string) {
    return await github.issues.listComments({
      owner: this.organization,
      repo: repository,
      issue_number: issueNumber,
    });
  }

  public async commentIssue(
    repository: string,
    issueNumber: number,
    body: string
  ) {
    return await github.issues.createComment({
      owner: this.organization,
      repo: repository,
      issue_number: issueNumber,
      body,
    });
  }

  public async createIssue(
    repository: string,
    title: string,
    body: string,
    labels: string[]
  ) {
    return await github.issues.create({
      owner: this.organization,
      repo: repository,
      title: title,
      body: body,
      labels,
    });
  }

  public async updateIssue(
    issueNumber: number,
    repository: string,
    body: string
  ) {
    return await github.issues.update({
      owner: this.organization,
      repo: repository,
      issue_number: issueNumber,
      body: body,
      state: "closed",
    });
  }
}
