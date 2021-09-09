import fs from "fs";
import yaml from "js-yaml";
import { homedir } from "node:os";

function getFilePath(devMode: boolean) {
  let filePath = "";

  if (devMode) {
    filePath = `../../octosync.example.yaml`;
  } else {
    filePath = `${homedir()}/octosync.yaml`;
  }

  return filePath;
}

export function getPublicConfig(devMode: boolean): PublicConfig {
  const filePath = getFilePath(devMode);

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents);

    return data as PublicConfig;
  } catch (error) {
    console.warn(
      `Custom octosync.yaml file not found @ ${filePath}. Returning default public configuration.`
    );

    return {
      direction: {
        comments: "bidirectional",
        issue_closing: "bidirectional",
        issue_creation: "bidirectional",
      },
    };
  }
}

export function writePublicConfig() {
  // TODO
  // - Run this method right after installation
  // - Check if file exists in the home directory
  // - Write to file if it doesn't exist
}

export type Direction = "bidirectional" | "github-to-jira" | "jira-to-github";

export interface PublicConfig {
  direction: {
    comments: Direction;
    issue_creation: Direction;
    issue_closing: Direction;
  };
}
