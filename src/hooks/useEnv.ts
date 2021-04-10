export function useEnv() {
  const {
    NODE_ENV = "development",
    PORT = 8000,
    GITHUB_TOKEN = "",
    GITHUB_ORGANIZATION = "",
    SLACK_TOKEN = "",
    JIRA_HOST = "",
    JIRA_API_TOKEN = "",
    JIRA_ISSUER_EMAIL = "",
    JIRA_PROJECT = "",
    JIRA_PROJECT_ID = "",
  } = process.env;

  return {
    NODE_ENV,
    PORT,
    GITHUB_TOKEN,
    GITHUB_ORGANIZATION,
    SLACK_TOKEN,
    JIRA_API_TOKEN,
    JIRA_ISSUER_EMAIL,
    JIRA_HOST,
    JIRA_PROJECT,
    JIRA_PROJECT_ID,
  };
}
