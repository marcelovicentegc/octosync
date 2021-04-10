import express from "express";
import cors from "cors";
import { github, jira } from "./webhooks";
import { useEnv } from "../hooks";

export function startEventsServer() {
  const {
    PORT,
    NODE_ENV,
    GITHUB_REPOSITORY,
    GITHUB_ORGANIZATION,
    JIRA_HOST,
  } = useEnv();

  if (NODE_ENV === "development") {
    console.log(`

    ██████╗  ██████╗████████╗ ██████╗ ███████╗██╗   ██╗███╗   ██╗ ██████╗
    ██╔═══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝
    ██║   ██║██║        ██║   ██║   ██║███████╗ ╚████╔╝ ██╔██╗ ██║██║     
    ██║   ██║██║        ██║   ██║   ██║╚════██║  ╚██╔╝  ██║╚██╗██║██║     
    ╚██████╔╝╚██████╗   ██║   ╚██████╔╝███████║   ██║   ██║ ╚████║╚██████╗
     ╚═════╝  ╚═════╝   ╚═╝    ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝
                                                                              

Make sure your Github webhook endpoint is configured @ https://github.com/${GITHUB_ORGANIZATION}/${GITHUB_REPOSITORY}/settings/hooks
Make sure your Jira webhook endpoint is configured @ ${JIRA_HOST}/plugins/servlet/webhooks
`);
  }

  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(github);
  server.use(jira);

  server.get("/", async (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json("OK");

    return res;
  });

  server.use((_, res) => {
    res.status(404).end("Not Found");
    return res;
  });

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}
