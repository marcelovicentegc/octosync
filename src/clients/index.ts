import { useEnv } from "../hooks";
import { Jira } from "./jira";

function setup() {
  const { JIRA_HOST, JIRA_PROJECT, JIRA_PROJECT_ID } = useEnv();

  const jira = new Jira(JIRA_HOST, JIRA_PROJECT, JIRA_PROJECT_ID);

  return { jira };
}

const { jira } = setup();

export { jira };
