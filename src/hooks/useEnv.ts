export function useEnv() {
  const {
    NODE_ENV = "development",
    PORT = 8000,
    GITHUB_TOKEN = "",
    GITHUB_ORGANIZATION = "",
    GITHUB_REPOSITORY = "",
    SLACK_TOKEN = "",
    JIRA_HOST = "",
    JIRA_API_TOKEN = "",
    JIRA_ISSUER_EMAIL = "",
    JIRA_PROJECT = "",
    JIRA_PROJECT_ID = "",
    /**
     * Navigate to {{ JIRA_HOST }}/secure/admin/workflows/ListWorkflows.jspa
     * and click on edit to see the transition IDs
     */
    JIRA_DONE_TRANSITION_ID = "41",
  } = process.env;

  return {
    NODE_ENV,
    PORT,
    GITHUB_TOKEN,
    GITHUB_ORGANIZATION,
    GITHUB_REPOSITORY,
    SLACK_TOKEN,
    JIRA_API_TOKEN,
    JIRA_ISSUER_EMAIL,
    JIRA_HOST,
    JIRA_PROJECT,
    JIRA_PROJECT_ID,
    JIRA_DONE_TRANSITION_ID,
  };
}
