export function useEnv() {
  const {
    NODE_ENV = "development",
    PORT = 8000,
    GITHUB_TOKEN = "",
    GITHUB_ORGANIZATION = "",
    GITHUB_REPOSITORY = "",
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
    JIRA_DONE_STATUS_NAME = "Done",
    JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD = "",
    JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD = "",
  } = process.env;

  const CUSTOM_GITHUB_REPO_FIELD = `customfield_${JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD}`;
  const CUSTOM_ISSUE_NUMBER_FIELD = `customfield_${JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD}`;

  return {
    NODE_ENV,
    PORT: NODE_ENV === "production" ? 8000 : PORT,
    GITHUB_TOKEN,
    GITHUB_ORGANIZATION,
    GITHUB_REPOSITORY,
    JIRA_API_TOKEN,
    JIRA_ISSUER_EMAIL,
    JIRA_HOST,
    JIRA_PROJECT,
    JIRA_PROJECT_ID,
    JIRA_DONE_TRANSITION_ID,
    JIRA_DONE_STATUS_NAME,
    JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD: CUSTOM_GITHUB_REPO_FIELD,
    JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD: CUSTOM_ISSUE_NUMBER_FIELD,
  };
}
