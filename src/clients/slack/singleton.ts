import { WebClient } from "@slack/web-api";
import { useEnv } from "../../hooks/useEnv";

let slackInstance: WebClient | null = null;

export const slack = (() => {
  if (slackInstance) {
    return slackInstance;
  }

  const { SLACK_TOKEN } = useEnv();

  slackInstance = new WebClient(SLACK_TOKEN);

  return slackInstance;
})();
