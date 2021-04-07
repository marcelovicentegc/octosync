export function useEnv() {
  const {
    NODE_ENV = "development",
    PORT = 8000,
    GITHUB_TOKEN = "",
    GITHUB_ORGANIZATION = "",
    SLACK_TOKEN = "",
    JIRA_HOST = "",
    JIRA_BASE_TOKEN = "",
    JIRA_PROJECT = "",
    JIRA_PROJECT_ID = "",
  } = process.env;

  return {
    NODE_ENV,
    PORT,
    GITHUB_TOKEN,
    GITHUB_ORGANIZATION,
    SLACK_TOKEN,
    JIRA_BASE_TOKEN,
    JIRA_HOST,
    JIRA_PROJECT,
    JIRA_PROJECT_ID,
  };
}
