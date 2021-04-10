import { github } from "../../../clients";
import { useEnv } from "../../../hooks";
import { CONTROL_LABELS } from "../consts";
import { webhook } from "../router";
import { removeDuplicates } from "../utils";
import { IssuePayload } from "./types";

webhook.post("/jira", async (req, res) => {
  const reqBody = req.body as IssuePayload;

  const { GITHUB_REPOSITORY } = useEnv();

  try {
    const {
      issue_event_type_name,
      issue: {
        fields: { summary, labels: jiraLabels },
        key,
      },
    } = reqBody;

    // This means that this issue has already been created,
    // and this hook must finish executing immediately.
    if (jiraLabels.includes(CONTROL_LABELS.FROM_GITHUB)) {
      return;
    }

    if (issue_event_type_name === "issue_created") {
      jiraLabels.push(CONTROL_LABELS.FROM_JIRA);

      const labels = removeDuplicates(jiraLabels);

      return await github.createIssue(GITHUB_REPOSITORY, key, summary, labels);
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

export { webhook as jira };
