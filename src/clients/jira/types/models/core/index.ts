/**
 * A user found in a search. */
export interface UserPickerUser {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** The display name, email address, and key of the user with the matched query string highlighted with the HTML bold tag. */
  html?: string;
  /** The display name of the user. Depending on the user’s privacy setting, this may be returned as null. */
  displayName?: string;
  /** The avatar URL of the user. */
  avatarUrl?: string;
}

/**
 * A status. */
export interface StatusDetails {
  /** The URL of the status. */
  self?: string;
  /** The description of the status. */
  description?: string;
  /** The URL of the icon used to represent the status. */
  iconUrl?: string;
  /** The name of the status. */
  name?: string;
  /** The ID of the status. */
  id?: string;
  /** The category assigned to the status. */
  statusCategory?: StatusCategory[];
}

/**
 * A status category. */
export interface StatusCategory {
  /** The URL of the status category. */
  self?: string;
  /** The ID of the status category. */
  id?: number;
  /** The key of the status category. */
  key?: string;
  /** The name of the color used to represent the status category. */
  colorName?: string;
  /** The name of the status category. */
  name?: string;
}

/**
 * Details of an issue transition. */
export interface IssueTransition {
  /** The ID of the issue transition. Required when specifying a transition to undertake. */
  id?: string;
  /** The name of the issue transition. */
  name?: string;
  /** Details of the issue status after the transition. */
  to?: StatusDetails[];
  /** Whether there is a screen associated with the issue transition. */
  hasScreen?: boolean;
  /** Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. */
  isGlobal?: boolean;
  /** Whether this is the initial issue transition for the workflow. */
  isInitial?: boolean;
  /** Whether the transition is available to be performed. */
  isAvailable?: boolean;
  /** Whether the issue has to meet criteria before the issue transition is applied. */
  isConditional?: boolean;
  /** Details of the fields associated with the issue transition screen. Use this information to populate `fields` and `update` in a transition request. */
  fields?: {};
  /** Expand options that include additional transition details in the response. */
  expand?: string;
  looped?: boolean;
}

/**
 * Error messages from an operation. */
export interface ErrorCollection {
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages?: string[];
  /** The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters." */
  errors?: {};
  status?: number;
}

/**
 * Details of the operations that can be performed on the issue. */
export interface Operations {
  /** Details of the link groups defining issue operations. */
  linkGroups?: LinkGroup[];
}

/**
 * Details a link group, which defines issue operations. */
export interface LinkGroup {
  id?: string;
  styleClass?: string;
  header?: SimpleLink;
  weight?: number;
  links?: SimpleLink[];
  groups?: LinkGroup[];
}

/**
 * Details about the operations available in this version. */
export interface SimpleLink {
  id?: string;
  styleClass?: string;
  iconClass?: string;
  label?: string;
  title?: string;
  href?: string;
  weight?: number;
}

/**
 * A page of changelogs. */
export interface PageOfChangelogs {
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The number of results on the page. */
  total?: number;
  /** The list of changelogs. */
  histories?: Changelog[];
}

/**
 * A changelog. */
export interface Changelog {
  /** The ID of the changelog. */
  id?: string;
  /** The user who made the change. */
  author?: UserDetails[];
  /** The date on which the change took place. */
  created?: string;
  /** The list of items changed. */
  items?: ChangeDetails[];
  /** The history metadata associated with the changed. */
  historyMetadata?: HistoryMetadata[];
}

/**
 * Details of issue history metadata. */
export interface HistoryMetadata {
  /** The type of the history record. */
  type?: string;
  /** The description of the history record. */
  description?: string;
  /** The description key of the history record. */
  descriptionKey?: string;
  /** The activity described in the history record. */
  activityDescription?: string;
  /** The key of the activity described in the history record. */
  activityDescriptionKey?: string;
  /** The description of the email address associated the history record. */
  emailDescription?: string;
  /** The description key of the email address associated the history record. */
  emailDescriptionKey?: string;
  /** Details of the user whose action created the history record. */
  actor?: HistoryMetadataParticipant[];
  /** Details of the system that generated the history record. */
  generator?: HistoryMetadataParticipant[];
  /** Details of the cause that triggered the creation the history record. */
  cause?: HistoryMetadataParticipant[];
  /** Additional arbitrary information about the history record. */
  extraData?: {};
}

/**
 * Details of user or system associated with a issue history metadata item. */
export interface HistoryMetadataParticipant {
  /** The ID of the user or system associated with a history record. */
  id?: string;
  /** The display name of the user or system associated with a history record. */
  displayName?: string;
  /** The key of the display name of the user or system associated with a history record. */
  displayNameKey?: string;
  /** The type of the user or system associated with a history record. */
  type?: string;
  /** The URL to an avatar for the user or system associated with a history record. */
  avatarUrl?: string;
  /** The URL of the user or system associated with a history record. */
  url?: string;
}

/**
 * A change item. */
export interface ChangeDetails {
  /** The name of the field changed. */
  field?: string;
  /** The type of the field changed. */
  fieldtype?: string;
  /** The ID of the field changed. */
  fieldId?: string;
  /** The details of the original value. */
  from?: string;
  /** The details of the original value as a string. */
  fromString?: string;
  /** The details of the new value. */
  to?: string;
  /** The details of the new value as a string. */
  toString?: string;
}

/**
 * User details permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:*
 *
 *  *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).
 *  *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.
 *  *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values. */
export interface UserDetails {
  /** The URL of the user. */
  self?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string;
  /** The email address of the user. Depending on the user’s privacy settings, this may be returned as null. */
  emailAddress?: string;
  /** The avatars of the user. */
  avatarUrls?: AvatarUrlsBean[];
  /** The display name of the user. Depending on the user’s privacy settings, this may return an alternative value. */
  displayName?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null. */
  timeZone?: string;
  /** The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user) */
  accountType?: string;
}

export interface AvatarUrlsBean {
  /** The URL of the item's 16x16 pixel avatar. */
  "16x16"?: string;
  /** The URL of the item's 24x24 pixel avatar. */
  "24x24"?: string;
  /** The URL of the item's 32x32 pixel avatar. */
  "32x32"?: string;
  /** The URL of the item's 48x48 pixel avatar. */
  "48x48"?: string;
}

export interface IncludedFields {
  actuallyIncluded?: string[];
  excluded?: string[];
  included?: string[];
}

/**
 * Details of the issue creation metadata for a project. */
export interface ProjectIssueCreateMetadata {
  /** Expand options that include additional project issue create metadata details in the response. */
  expand?: string;
  /** The URL of the project. */
  self?: string;
  /** The ID of the project. */
  id?: string;
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** List of the project's avatars, returning the avatar size and associated URL. */
  avatarUrls?: AvatarUrlsBean[];
  /** List of the issue types supported by the project. */
  issuetypes?: IssueTypeIssueCreateMetadata[];
}

/**
 * Details of the issue creation metadata for an issue type. */
export interface IssueTypeIssueCreateMetadata {
  /** The URL of these issue type details. */
  self?: string;
  /** The ID of the issue type. */
  id?: string;
  /** The description of the issue type. */
  description?: string;
  /** The URL of the issue type's avatar. */
  iconUrl?: string;
  /** The name of the issue type. */
  name?: string;
  /** Whether this issue type is used to create subtasks. */
  subtask?: boolean;
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** Unique ID for next-gen projects. */
  entityId?: string;
  /** Hierarchy level of the issue type. */
  hierarchyLevel?: number;
  /** Details of the next-gen projects the issue type is available in. */
  scope?: Scope[];
  /** Expand options that include additional issue type metadata details in the response. */
  expand?: string;
  /** List of the fields available when creating an issue for the issue type. */
  fields?: {};
}

/**
 * The projects the item is associated with. Indicated for items associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO). */
export interface Scope {
  /** The type of scope. */
  type?: string;
  /** The project the item has scope in. */
  project?: ProjectForScope[];
}

/**
 * Details about a next-gen project. */
export interface ProjectForScope {
  /** The URL of the project details. */
  self?: string;
  /** The ID of the project. */
  id?: string;
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. */
  projectTypeKey?: string;
  /** Whether or not the project is simplified. */
  simplified?: boolean;
  /** The URLs of the project's avatars. */
  avatarUrls?: AvatarUrlsBean[];
  /** The category the project belongs to. */
  projectCategory?: UpdatedProjectCategory[];
}

/**
 * A project category. */
export interface UpdatedProjectCategory {
  /** The URL of the project category. */
  self?: string;
  /** The ID of the project category. */
  id?: string;
  /** The name of the project category. */
  description?: string;
  /** The description of the project category. */
  name?: string;
}

export interface SimpleListWrapperGroupName {
  size?: number;
  items?: GroupName[];
  pagingCallback?: {};
  callback?: {};
  "max-results"?: number;
}

/**
 * Details about a group name. */
export interface GroupName {
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
}

export interface SimpleListWrapperApplicationRole {
  size?: number;
  items?: ApplicationRole[];
  pagingCallback?: {};
  callback?: {};
  "max-results"?: number;
}

/**
 * Details of an application role. */
export interface ApplicationRole {
  /** The key of the application role. */
  key?: string;
  /** The groups associated with the application role. */
  groups?: string[];
  /** The display name of the application role. */
  name?: string;
  /** The groups that are granted default access for this application role. */
  defaultGroups?: string[];
  /** Determines whether this application role should be selected by default on user creation. */
  selectedByDefault?: boolean;
  /** Deprecated. */
  defined?: boolean;
  /** The maximum count of users on your license. */
  numberOfSeats?: number;
  /** The count of users remaining on your license. */
  remainingSeats?: number;
  /** The number of users counting against your license. */
  userCount?: number;
  /** The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted against your license. */
  userCountDescription?: string;
  hasUnlimitedSeats?: boolean;
  /** Indicates if the application role belongs to Jira platform (`jira-core`). */
  platform?: boolean;
}

/**
 * An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/). */
export interface EntityProperty {
  /** The key of the property. Required on create and update. */
  key?: string;
  /** The value of the property. Required on create and update. */
  value?: any;
}

/**
 * Counts of the number of issues in various statuses. */
export interface VersionIssuesStatus {
  /** Count of issues with a status other than *to do*, *in progress*, and *done*. */
  unmapped?: number;
  /** Count of issues with status *to do*. */
  toDo?: number;
  /** Count of issues with status *in progress*. */
  inProgress?: number;
  /** Count of issues with status *done*. */
  done?: number;
}

/**
 * The project issue type hierarchy. */
export interface Hierarchy {
  /** The ID of the base level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  baseLevelId?: number;
  /** Details about the hierarchy level. */
  levels?: HierarchyLevel[];
}

export interface HierarchyLevel {
  /** The ID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  id?: number;
  /** The name of this hierarchy level. */
  name?: string;
  /** The ID of the level above this one in the hierarchy. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  aboveLevelId?: number;
  /** The ID of the level below this one in the hierarchy. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  belowLevelId?: number;
  /** The ID of the project configuration. This property is deprecated, see [Change oticen: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  projectConfigurationId?: number;
  /** The level of this item in the hierarchy. */
  level?: number;
  /** The issue types available in this hierarchy level. */
  issueTypeIds?: number[];
  /** The external UUID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  externalUuid?: string;
  globalHierarchyLevel?: string;
}

/**
 * ID of a screen. */
export interface ScreenID {
  /** The ID of the screen. */
  id: string;
}

/**
 * A collection of transition rules. */
export interface WorkflowRules {
  /** The workflow conditions. */
  conditions: WorkflowTransitionRule[];
  conditionsTree?: {};
  /** The workflow validators. */
  validators: WorkflowTransitionRule[];
  /** The workflow post functions. */
  postFunctions: WorkflowTransitionRule[];
}

/**
 * A workflow transition rule. */
export interface WorkflowTransitionRule {
  /** The type of the transition rule. */
  type: string;
  /** The configuration of the transition rule. This is currently returned only for some of the rule types. Availability of this property is subject to change. */
  configuration?: any;
}
