import express from "express";
import cors from "cors";
import { github } from "./webhooks";
import { useEnv } from "../hooks";

export function startEventsServer() {
  const { PORT } = useEnv();

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
