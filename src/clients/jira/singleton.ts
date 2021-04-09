import JiraClient from "jira-connector";
import { useEnv } from "../../hooks/useEnv";

let jiraInstance: JiraClient | null = null;

export const jira = (() => {
  if (jiraInstance) {
    return jiraInstance;
  }

  const { JIRA_BASE_TOKEN, JIRA_HOST } = useEnv();

  jiraInstance = new JiraClient({
    host: JIRA_HOST,
    basic_auth: { base64: JIRA_BASE_TOKEN },
  });

  return jiraInstance;
})();
