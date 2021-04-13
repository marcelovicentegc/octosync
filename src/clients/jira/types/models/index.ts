import {
  HistoryMetadata,
  IssueTransition,
  EntityProperty,
  AvatarUrlsBean,
  SimpleListWrapperGroupName,
  SimpleListWrapperApplicationRole,
  Scope,
  SimpleLink,
  VersionIssuesStatus,
  Operations,
  Changelog,
  ProjectIssueCreateMetadata,
  ErrorCollection,
  PageOfChangelogs,
  IncludedFields,
  UserPickerUser,
  ScreenID,
  WorkflowRules,
} from "./core";

/**
 * Details of an issue update request. */
export interface IssueUpdateDetails {
  /** Details of a transition. Required when performing a transition, optional when creating or editing an issue. */
  transition?: IssueTransition;
  /** List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`. */
  fields?: {};
  /** List of operations to perform on issue screen fields. Note that fields included in here cannot be included in `fields`. */
  update?: {};
  /** Additional issue history details. */
  historyMetadata?: HistoryMetadata;
  /** Details of issue properties to be add or update. */
  properties?: EntityProperty[];
}

/**
 * Time tracking details. */
export interface TimeTrackingDetails {
  /** The original estimate of time needed for this issue in readable format. */
  originalEstimate?: string;
  /** The remaining estimate of time needed for this issue in readable format. */
  remainingEstimate?: string;
  /** Time worked on this issue in readable format. */
  timeSpent?: string;
  /** The original estimate of time needed for this issue in seconds. */
  originalEstimateSeconds?: number;
  /** The remaining estimate of time needed for this issue in seconds. */
  remainingEstimateSeconds?: number;
  /** Time worked on this issue in seconds. */
  timeSpentSeconds?: number;
}

/**
 * Details about a project. */
export interface Project {
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** The URL of the project details. */
  self?: string;
  /** The ID of the project. */
  id?: string;
  /** The key of the project. */
  key?: string;
  /** A brief description of the project. */
  description?: string;
  /** The username of the project lead. */
  lead?: User[];
  /** List of the components contained in the project. */
  components?: Component[];
  /** List of the issue types available in the project. */
  issueTypes?: IssueTypeDetails[];
  /** A link to information about this project, such as project documentation. */
  url?: string;
  /** An email address associated with the project. */
  email?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: string;
  /** The versions defined in the project. For more information, see [Create version](#api-rest-api-3-version-post). */
  versions?: Version[];
  /** The name of the project. */
  name?: string;
  /** The name and self URL for each role defined in the project. For more information, see [Create project role](#api-rest-api-3-role-post). */
  roles?: {};
  /** The URLs of the project's avatars. */
  avatarUrls?: AvatarUrlsBean[];
  /** The category the project belongs to. */
  projectCategory?: ProjectCategory[];
  /** The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. */
  projectTypeKey?: string;
  /** Whether the project is simplified. */
  simplified?: boolean;
  /** The type of the project. */
  style?: string;
  /** Whether the project is selected as a favorite. */
  favourite?: boolean;
  /** Whether the project is private. */
  isPrivate?: boolean;
  /** The issue type hierarchy for the project. */
  issueTypeHierarchy?: Hierarchy[];
  /** User permissions on the project */
  permissions?: ProjectPermissions[];
  /** Map of project properties */
  properties?: {};
  /** Unique ID for next-gen projects. */
  uuid?: string;
  /** Insights about the project. */
  insight?: ProjectInsight[];
  /** Whether the project is marked as deleted. */
  deleted?: boolean;
  /** The date when the project is deleted permanently. */
  retentionTillDate?: string;
  /** The date when the project was marked as deleted. */
  deletedDate?: string;
  /** The user who marked the project as deleted. */
  deletedBy?: User[];
  /** Whether the project is archived. */
  archived?: boolean;
  /** The date when the project was archived. */
  archivedDate?: string;
  /** The user who archived the project. */
  archivedBy?: User[];
}

/**
 * Additional details about a project. */
export interface ProjectInsight {
  /** Total issue count. */
  totalIssueCount?: number;
  /** The last issue update time. */
  lastIssueUpdateTime?: string;
}

/**
 * A project category. */
export interface ProjectCategory {
  /** The URL of the project category. */
  self?: string;
  /** The ID of the project category. */
  id?: string;
  /** The name of the project category. Required on create, optional on update. */
  name?: string;
  /** The description of the project category. Required on create, optional on update. */
  description?: string;
}

/**
 * Permissions which a user has on a project. */
export interface ProjectPermissions {
  /** Whether the logged user can edit the project. */
  canEdit?: boolean;
}

/**
 * A user with details as permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:*
 *
 *  *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).
 *  *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.
 *  *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values. */
export interface User {
  /** The URL of the user. */
  self?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests. */
  accountId?: string;
  /** The user account type. Can take the following values:

     *  `atlassian` regular Atlassian user account
     *  `app` system account used for Connect applications and OAuth to represent external systems
     *  `customer` Jira Service Desk account representing an external service desk */
  accountType?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
  /** The email address of the user. Depending on the user’s privacy setting, this may be returned as null. */
  emailAddress?: string;
  /** The avatars of the user. */
  avatarUrls?: AvatarUrlsBean[];
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The time zone specified in the user's profile. Depending on the user’s privacy setting, this may be returned as null. */
  timeZone?: string;
  /** The locale of the user. Depending on the user’s privacy setting, this may be returned as null. */
  locale?: string;
  /** The groups that the user belongs to. */
  groups?: SimpleListWrapperGroupName[];
  /** The application roles the user is assigned to. */
  applicationRoles?: SimpleListWrapperApplicationRole[];
  /** Expand options that include additional user details in the response. */
  expand?: string;
}

/**
 * A page of items. */
export interface PageBeanUser {
  /** The URL of the page. */
  self?: string;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The list of items. */
  values?: User[];
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
 * Details about a project component. */
export interface Component {
  /** The URL of the component. */
  self?: string;
  /** The unique identifier for the component. */
  id?: string;
  /** The unique name for the component in the project. Required when creating a component. Optional when updating a component. The maximum length is 255 characters. */
  name?: string;
  /** The description for the component. Optional when creating or updating a component. */
  description?: string;
  /** The user details for the component's lead user. */
  lead?: User[];
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  leadUserName?: string;
  /** The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  leadAccountId?: string;
  /** The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the following values:

     *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.
     *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.
     *  `UNASSIGNED` an assignee is not set for issues created with this component.
     *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in.

    Default value: `PROJECT_DEFAULT`.
    Optional when creating or updating a component. */
  assigneeType?: string;
  /** The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component. */
  assignee?: User[];
  /** The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:

     *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.
     *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.
     *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.
     *  `PROJECT_DEFAULT` when none of the preceding cases are true. */
  realAssigneeType?: string;
  /** The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee. */
  realAssignee?: User[];
  /** Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned. */
  isAssigneeTypeValid?: boolean;
  /** The key of the project the component is assigned to. Required when creating a component. Can't be updated. */
  project?: string;
  /** The ID of the project the component is assigned to. */
  projectId?: number;
}

/**
 * Details about an issue type. */
export interface IssueTypeDetails {
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
}

/**
 * Details about a project version. */
export interface Version {
  /** Use [expand](em>#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:

     *  `operations` Returns the list of operations available for this version.
     *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.

    Optional for create and update. */
  expand?: string;
  /** The URL of the version. */
  self?: string;
  /** The ID of the version. */
  id?: string;
  /** The description of the version. Optional when creating or updating a version. */
  description?: string;
  /** The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters. */
  name?: string;
  /** Indicates that the version is archived. Optional when creating or updating a version. */
  archived?: boolean;
  /** Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version. */
  released?: boolean;
  /** The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
  startDate?: string;
  /** The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
  releaseDate?: string;
  /** Indicates that the version is overdue. */
  overdue?: boolean;
  /** The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format. */
  userStartDate?: string;
  /** The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format. */
  userReleaseDate?: string;
  /** Deprecated. Use `projectId`. */
  project?: string;
  /** The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version. */
  projectId?: number;
  /** The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version. */
  moveUnfixedIssuesTo?: string;
  /** If the expand option `operations` is used, returns the list of operations available for this version. */
  operations?: SimpleLink[];
  /** If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*. */
  issuesStatusForFixVersion?: VersionIssuesStatus[];
}

export interface IssueBean {
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  /** The ID of the issue. */
  id?: string;
  /** The URL of the issue details. */
  self?: string;
  /** The key of the issue. */
  key?: string;
  /** The rendered value of each field present on the issue. */
  renderedFields?: {};
  /** Details of the issue properties identified in the request. */
  properties?: {};
  /** The ID and name of each field present on the issue. */
  names?: {};
  /** The schema describing each field present on the issue. */
  schema?: {};
  /** The transitions that can be performed on the issue. */
  transitions?: IssueTransition[];
  /** The operations that can be performed on the issue. */
  operations?: Operations[];
  /** The metadata for the fields on the issue that can be amended. */
  editmeta?: IssueUpdateMetadata[];
  /** Details of changelogs associated with the issue. */
  changelog?: PageOfChangelogs[];
  /** The versions of each field on the issue. */
  versionedRepresentations?: {};
  fieldsToInclude?: IncludedFields;
  fields?: any;
}

/**
 * A list of editable field details. */
export interface IssueUpdateMetadata {
  fields?: {};
}

/**
 * The wrapper for the issue creation metadata for a list of projects. */
export interface IssueCreateMetadata {
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** List of projects and their issue creation metadata. */
  projects?: ProjectIssueCreateMetadata[];
}

export interface NestedResponse {
  status?: number;
  errorCollection?: ErrorCollection;
}

/**
 * A page of items. */
export interface PageBeanChangelog {
  /** The URL of the page. */
  self?: string;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The list of items. */
  values?: Changelog[];
}

/**
 * A page of items. */
export interface PageBeanUserKey {
  /** The URL of the page. */
  self?: string;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The list of items. */
  values?: UserKey[];
}

/**
 * List of user account IDs. */
export interface UserKey {
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown* if the record is deleted and corrupted, for example, as the result of a server import. */
  accountId?: string;
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

/**
 * A page of items. */
export interface PageBeanUserKey {
  /** The URL of the page. */
  self?: string;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The list of items. */
  values?: UserKey[];
}

export interface UserBean {
  /** This property is deprecated in favor of `accountId` because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
    The key of the user. */
  key?: string;
  /** The URL of the user. */
  self?: string;
  /** This property is deprecated in favor of `accountId` because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
    The username of the user. */
  name?: string;
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string;
  /** The avatars of the user. */
  avatarUrls?: UserBeanAvatarUrls[];
}

export interface UserBeanAvatarUrls {
  /** The URL of the user's 32x32 pixel avatar. */
  "32x32"?: string;
  /** The URL of the user's 16x16 pixel avatar. */
  "16x16"?: string;
  /** The URL of the user's 48x48 pixel avatar. */
  "48x48"?: string;
  /** The URL of the user's 24x24 pixel avatar. */
  "24x24"?: string;
}

/**
 * The list of users found in a search, including header text (Showing X of Y matching users) and total of matched users. */
export interface FoundUsers {
  users?: UserPickerUser[];
  /** The total number of users found in the search. */
  total?: number;
  /** Header text indicating the number of users in the response and the total number of users found in the search. */
  header?: string;
}

/**
 * Details about a created issue or subtask. */
export interface CreatedIssue {
  /** The ID of the created issue or subtask. */
  id: string;
  /** The key of the created issue or subtask. */
  key: string;
  /** The URL of the created issue or subtask. */
  self?: string;
  /** The response code and messages related to any requested transition. */
  transition?: NestedResponse[];
}

/**
 * The list of users found in a search, including header text (Showing X of Y matching users) and total of matched users. */
export interface FoundUsers {
  users?: UserPickerUser[];
  /** The total number of users found in the search. */
  total?: number;
  /** Header text indicating the number of users in the response and the total number of users found in the search. */
  header?: string;
}

/**
 * Details of a workflow transition. */
export interface Transition {
  /** The ID of the transition. */
  id: string;
  /** The name of the transition. */
  name: string;
  /** The description of the transition. */
  description: string;
  /** The statuses the transition can start from. */
  from: string[];
  /** The status the transition goes to. */
  to: string;
  /** The type of the transition. */
  type: string;
  screen?: ScreenID;
  rules?: WorkflowRules;
}

/**
 * List of issue transitions. */
export interface Transitions {
  /** Expand options that include additional transitions details in the response. */
  expand?: string;
  /** List of issue transitions. */
  transitions?: IssueTransition[];
}

/**
 * Details about a notification. */
export interface Notification {
  /** The subject of the email notification for the issue. If this is not specified, then the subject is set to the issue key and summary. */
  subject?: string;
  /** The plain text body of the email notification for the issue. */
  textBody?: string;
  /** The HTML body of the email notification for the issue. */
  htmlBody?: string;
  /** The recipients of the email notification for the issue. */
  to?: NotificationRecipients[];
  /** Restricts the notifications to users with the specified permissions. */
  restrict?: NotificationRecipientsRestrictions[];
}

/**
 * Details of the users and groups to receive the notification. */
export interface NotificationRecipients {
  /** Whether the notification should be sent to the issue's reporter. */
  reporter?: boolean;
  /** Whether the notification should be sent to the issue's assignees. */
  assignee?: boolean;
  /** Whether the notification should be sent to the issue's watchers. */
  watchers?: boolean;
  /** Whether the notification should be sent to the issue's voters. */
  voters?: boolean;
  /** List of users to receive the notification. */
  users?: UserDetails[];
  /** List of groups to receive the notification. */
  groups?: GroupName[];
}

/**
 * Details about a group name. */
export interface GroupName {
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
}

/**
 * Details of the group membership or permissions needed to receive the notification. */
export interface NotificationRecipientsRestrictions {
  /** List of group memberships required to receive the notification. */
  groups?: GroupName[];
  /** List of permissions required to receive the notification. */
  permissions?: RestrictedPermission[];
}

/**
 * Details of the permission. */
export interface RestrictedPermission {
  /** The ID of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions. */
  id?: string;
  /** The key of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions. */
  key?: string;
}
