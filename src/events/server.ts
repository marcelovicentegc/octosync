import express from "express";
import cors from "cors";
import { github } from "./webhooks";
import { useEnv } from "../hooks";

export function startEventsServer() {
  const { PORT, NODE_ENV, GITHUB_REPOSITORY, GITHUB_ORGANIZATION } = useEnv();

  if (NODE_ENV === "development") {
    console.log(
      `Update your Github webhook endpoint @ https://github.com/${GITHUB_ORGANIZATION}/${GITHUB_REPOSITORY}/settings/hooks`
    );
  }

  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(github);

  server.use((_, res) => {
    res.status(404).end("Not Found");
    return res;
  });

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}
