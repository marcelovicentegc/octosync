import { Context } from "probot";

export interface Clients {
  github:
    | {
        auth: string;
      }
    | {
        ctx: Context;
      };
}
