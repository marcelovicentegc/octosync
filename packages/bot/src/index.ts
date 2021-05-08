import { Probot } from "probot";
import {
  handleClosedIssue,
  handleIssueCommentCreation,
  handleOpenedIssue,
} from "@octosync/handlers";
import { CONTROL_LABELS, removeDuplicates } from "@octosync/utils";

export = (app: Probot) => {
  app.on("issues.opened", async (ctx) => {
    const {
      issue: {
        title,
        body,
        number: ghIssueNumber,
        user: { login: triggererEmail },
        labels: ghLabels,
      },
      repository: { name: repositoryName },
      organization,
    } = ctx.payload;

    if (!organization) {
      return;
    }

    let labels = ghLabels.map((label) => label.name);
    labels.push(CONTROL_LABELS.FROM_GITHUB);
    labels = removeDuplicates(labels);

    await handleOpenedIssue({
      clients: {
        github: {
          ctx,
        },
      },
      organization: organization.name,
      title,
      triggererEmail,
      body,
      labels,
      issueNumber: ghIssueNumber,
      repository: repositoryName,
    });
  });

  app.on("issues.closed", async (ctx) => {
    const {
      issue: { title },
    } = ctx.payload;

    await handleClosedIssue({ title });
  });

  app.on("issue_comment.created", async (ctx) => {
    const {
      issue: { title },
      repository: { name: repositoryName },
      comment,
      sender,
    } = ctx.payload;

    await handleIssueCommentCreation({
      clients: {
        github: {
          ctx,
        },
      },
      title,
      body: comment.body,
      owner: sender.login,
      repository: repositoryName,
      commentId: comment.id,
    });
  });
};
