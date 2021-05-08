import { User, CreatedIssue } from "@octosync/clients";

export interface IssuePayload {
  timestamp: number;
  webhookEvent:
    | "jira:issue_created"
    | "jira:issue_updated"
    | "comment_created"
    | string;
  issue_event_type_name: "issue_created" | "issue_generic" | string;
  user: User;
  issue: CreatedIssue & {
    fields: IssuePayloadField;
  };
  comment?: {
    self: string;
    id: string;
    author: {
      self: string;
      accountId: string;
      avatarUrls: any[];
      displayName: string;
      active: true;
      timeZone: string;
      accountType: string;
    };
    body: string;
    updateAuthor: {
      self: string;
      accountId: string;
      avatarUrls: any[];
      displayName: string;
      active: boolean;
      timeZone: string;
      accountType: string;
    };
    created: string;
    updated: string;
    jsdPublic: boolean;
  };
}

export interface IssuePayloadField {
  /**
   * Custom fields
   */
  [key: string]: any;
  statuscategorychangedate: any;
  issuetype: {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: "Story" | string;
    subtask: boolean;
    avatarId: number;
  };
  timespent: any;
  project: {
    self: string;
    id: string;
    key: string;
    name: string;
    projectTypeKey: "software" | string;
    simplified: boolean;
    avatarUrls: [Object];
  };
  fixVersions: [];
  aggregatetimespent: any;
  resolution: any;
  resolutiondate: any;
  workratio: -1;
  lastViewed: any;
  issuerestriction: { issuerestrictions: {}; shouldDisplay: boolean };
  watches: {
    self: string;
    watchCount: 0;
    isWatching: true;
  };
  created: string;
  priority: {
    self: string;
    iconUrl: string;
    name: string;
    id: "1" | "2" | "3" | "4" | string;
  };
  labels: string[];
  timeestimate: any;
  aggregatetimeoriginalestimate: any;
  versions: [];
  issuelinks: [];
  assignee: {
    self: string;
    accountId: string;
    avatarUrls: [Object];
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
  };
  updated: string;
  status: {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: [Object];
  };
  components: [];
  timeoriginalestimate: any;
  description: string;
  timetracking: {};
  security: any;
  attachment: [];
  aggregatetimeestimate: any;
  summary: string;
  creator: {
    self: string;
    accountId: string;
    avatarUrls: [Object];
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
  };
  subtasks: [];
  reporter: {
    self: string;
    accountId: string;
    avatarUrls: [Object];
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
  };
  aggregateprogress: { progress: number; total: number };
  environment: any;
  duedate: any;
  progress: { progress: number; total: number };
  votes: {
    self: string;
    votes: number;
    hasVoted: boolean;
  };
}
