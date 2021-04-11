/**
 * Extracts issue key from Github title.
 *
 * See https://community.atlassian.com/t5/Bitbucket-questions/Regex-pattern-to-match-JIRA-issue-key/qaq-p/233319
 */
export const ISSUE_KEY_REGEX = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;
