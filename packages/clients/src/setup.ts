import { Github } from "./github";
import { useEnv } from "./hooks";
import { Jira } from "./jira";

function setup() {
  const {
    JIRA_HOST,
    JIRA_PROJECT,
    JIRA_PROJECT_ID,
    GITHUB_ORGANIZATION,
  } = useEnv();

  const jira = new Jira(JIRA_HOST, JIRA_PROJECT, JIRA_PROJECT_ID);
  const github = new Github(GITHUB_ORGANIZATION);

  return { jira, github };
}

const { jira, github } = setup();

export { jira, github };
