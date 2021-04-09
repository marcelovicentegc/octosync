import { jira } from "../../../clients";
import { webhook } from "../router";
import { IssuePayload } from "./types";

webhook.post("/github", async (req, res) => {
  const reqBody = req.body as IssuePayload;

  try {
    const action = reqBody.action;
    const title = reqBody.issue.title;
    const body = reqBody.issue.body;
    const triggererEmail = reqBody.issue.user.login;

    if (action === "opened") {
      await jira.createJiraIssue(title, triggererEmail, body, [], "");
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

export { webhook as github };
