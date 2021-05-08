import { Octokit } from "@octokit/rest";
import { ProbotOctokit } from "probot";
import { Clients } from "../types";
import { hasOwnProperty } from "../utils";

export function resolveGithubClient(
  clients: Clients
): InstanceType<typeof ProbotOctokit> | Octokit {
  if (hasOwnProperty(clients.github, "auth")) {
    return new Octokit({ auth: clients.github.auth });
  } else {
    return clients.github.ctx.octokit;
  }
}
