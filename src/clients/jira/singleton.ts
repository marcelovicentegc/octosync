import { useEnv } from "../../hooks/useEnv";
import { JiraClient } from "./client";

let jiraInstance: JiraClient | null = null;

export const jira = (() => {
  if (jiraInstance) {
    return jiraInstance;
  }

  const { JIRA_API_TOKEN, JIRA_ISSUER_EMAIL, JIRA_HOST } = useEnv();

  jiraInstance = new JiraClient({
    host: JIRA_HOST,
    authentication: {
      email: JIRA_ISSUER_EMAIL,
      /**
       * Manage API tokens for your Atlassian account
       * You can use an API token to authenticate a script or other process with an Atlassian cloud product.
       * You generate the token from your Atlassian account, then copy and paste it to the script.
       *
       * https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/
       */
      apiKey: JIRA_API_TOKEN,
    },
  });

  return jiraInstance;
})();
