import { User, CreatedIssue } from "../../../clients/jira/types";

export interface IssuePayload {
  timestamp: number;
  webhookEvent: "jira:issue_created" | string;
  issue_event_type_name: "issue_created" | string;
  user: User;
  issue: CreatedIssue & {
    fields: IssuePayloadField;
  };
}

export interface IssuePayloadField {
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
  customfield_10028: any;
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
  customfield_10020: any;
  customfield_10021: any;
  customfield_10022: any;
  customfield_10023: any;
  priority: {
    self: string;
    iconUrl: string;
    name: string;
    id: "1" | "2" | "3" | "4" | string;
  };
  customfield_10024: any;
  customfield_10025: any;
  labels: string[];
  customfield_10016: any;
  customfield_10017: any;
  customfield_10018: {
    hasEpicLinkFieldDependency: false;
    showField: false;
    nonEditableReason: [Object];
  };
  customfield_10019: string;
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
  customfield_10010: any;
  customfield_10014: any;
  customfield_10015: any;
  timetracking: {};
  customfield_10005: any;
  customfield_10006: any;
  customfield_10007: any;
  security: any;
  customfield_10008: any;
  attachment: [];
  customfield_10009: any;
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
  customfield_10000: any;
  aggregateprogress: { progress: number; total: number };
  customfield_10001: any;
  customfield_10002: any;
  customfield_10003: any;
  customfield_10004: any;
  environment: any;
  duedate: any;
  progress: { progress: number; total: number };
  votes: {
    self: string;
    votes: number;
    hasVoted: boolean;
  };
}
