import { Octokit } from "@octokit/rest";
import { useEnv } from "../../hooks/useEnv";

let githubInstance: Octokit | null = null;

export const github = (() => {
  if (githubInstance) {
    return githubInstance;
  }

  const { GITHUB_TOKEN } = useEnv();

  githubInstance = new Octokit({ auth: GITHUB_TOKEN });

  return githubInstance;
})();
