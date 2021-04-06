export function useEnv() {
  const {
    GITHUB_TOKEN = "",
    GITHUB_ORGANIZATION = "",
    SLACK_TOKEN = "",
    JIRA_HOST = "",
    JIRA_BASE_TOKEN = "",
  } = process.env;

  return {
    GITHUB_TOKEN,
    GITHUB_ORGANIZATION,
    SLACK_TOKEN,
    JIRA_BASE_TOKEN,
    JIRA_HOST,
  };
}
