import {
  IssueUpdateDetails,
  TimeTrackingDetails,
  Project,
  Notification,
  User,
} from "./models";

export interface Notify extends Notification {
  /** ID or key of the issue that the notification is sent for. */
  issueIdOrKey: string;
}

export interface GetTransitions {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** Use [expand](#expansion) to include additional information about transitions in the response. This parameter accepts `transitions.fields`, which returns information about the fields in the transition screen for each transition. Fields hidden from the screen are not returned. Use this information to populate the `fields` and `update` fields in [Transition issue](#api-rest-api-2-issue-issueIdOrKey-transitions-post). */
  expand?: string;
  /** The ID of the transition. */
  transitionId?: string;
  /** Whether transitions with the condition *Hide From User Condition* are included in the response. */
  skipRemoteOnlyCondition?: boolean;
  /** Whether details of transitions that fail a condition are included in the response */
  includeUnavailableTransitions?: boolean;
  /** Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or only by ops-bar sequence value. */
  sortByOpsBarAndStatus?: boolean;
}

export interface GetIssue {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** A list of fields to return for the issue. This parameter accepts a comma-separated list. Use it to retrieve a subset of fields. Allowed values:

     *  `*all` Returns all fields.
     *  `*navigable` Returns navigable fields.
     *  Any issue field, prefixed with a minus to exclude.

    Examples:

     *  `summary,comment` Returns only the summary and comments fields.
     *  `-description` Returns all (default) fields except description.
     *  `*navigable,-comment` Returns all navigable fields except comment.

    This parameter may be specified multiple times. For example, `fields=field1,field2& fields=field3`.

    Note: All fields are returned by default. This differs from [Search for issues using JQL (GET)](#api-rest-api-2-search-get) and [Search for issues using JQL (POST)](#api-rest-api-2-search-post) where the default is all navigable fields. */
  fields?: string[];
  /** Whether fields in `fields` are referenced by keys rather than IDs. This parameter is useful where fields have been added by a connect app and a field's key may differ from its ID. */
  fieldsByKeys?: boolean;
  /** Use [expand](#expansion) to include additional information about the issues in the response. This parameter accepts a comma-separated list. Expand options include:

     *  `renderedFields` Returns field values rendered in HTML format.
     *  `names` Returns the display name of each field.
     *  `schema` Returns the schema describing a field type.
     *  `transitions` Returns all possible transitions for the issue.
     *  `editmeta` Returns information about how each field can be edited.
     *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.
     *  `versionedRepresentations` Returns a JSON array for each version of a field's value, with the highest number representing the most recent version. Note: When included in the request, the `fields` parameter is ignored. */
  expand?: string;
  /** A list of issue properties to return for the issue. This parameter accepts a comma-separated list. Allowed values:

     *  `*all` Returns all issue properties.
     *  Any issue property key, prefixed with a minus to exclude.

    Examples:

     *  `*all` Returns all properties.
     *  `*all,-prop1` Returns all properties except `prop1`.
     *  `prop1,prop2` Returns `prop1` and `prop2` properties.

    This parameter may be specified multiple times. For example, `properties=prop1,prop2& properties=prop3`. */
  properties?: string[];
  /** Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. This also populates the [JQL issues search](#api-rest-api-2-search-get) `lastViewed` field. */
  updateHistory?: boolean;
}

export interface GetEditIssueMeta {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** Whether hidden fields should be returned. Available to connect app users with admin permissions. */
  overrideScreenSecurity?: boolean;
  /** Whether non-editable fields should be returned. Available to connect app users with admin permissions. */
  overrideEditableFlag?: boolean;
}

export interface GetChangeLogs {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}

export interface GetCreateIssueMeta {
  /** List of project IDs. This parameter accepts a comma-separated list. Multiple project IDs can also be provided using an ampersand-separated list. For example, `projectIds=10000,10001&projectIds=10020,10021`. This parameter may be provided with `projectKeys`. */
  projectIds?: string[];
  /** List of project keys. This parameter accepts a comma-separated list. Multiple project keys can also be provided using an ampersand-separated list. For example, `projectKeys=proj1,proj2&projectKeys=proj3`. This parameter may be provided with `projectIds`. */
  projectKeys?: string[];
  /** List of issue type IDs. This parameter accepts a comma-separated list. Multiple issue type IDs can also be provided using an ampersand-separated list. For example, `issuetypeIds=10000,10001&issuetypeIds=10020,10021`. This parameter may be provided with `issuetypeNames`. */
  issuetypeIds?: string[];
  /** List of issue type names. This parameter accepts a comma-separated list. Multiple issue type names can also be provided using an ampersand-separated list. For example, `issuetypeNames=name1,name2&issuetypeNames=name3`. This parameter may be provided with `issuetypeIds`. */
  issuetypeNames?: string[];
  /** Use [expand](#expansion) to include additional information about issue metadata in the response. This parameter accepts `projects.issuetypes.fields`, which returns information about the fields in the issue creation screen for each issue type. Fields hidden from the screen are not returned. Use the information to populate the `fields` and `update` fields in [Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post). */
  expand?: string;
}

export interface FindUsersWithBrowsePermission {
  /** A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified. */
  query?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId?: string;
  /** The issue key for the issue. Required, unless `projectKey` is specified. */
  issueKey?: string;
  /** The project key for the project (case sensitive). Required, unless `issueKey` is specified. */
  projectKey?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}

export interface FindUsersWithAllPermissions {
  /** A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified. */
  query?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId?: string;
  /** A comma separated list of permissions. Permissions can be specified as any:

     *  permission returned by [Get all permissions](#api-rest-api-2-permissions-get).
     *  custom project permission added by Connect apps.
     *  (deprecated) one of the following:

         *  ASSIGNABLE\_USER
         *  ASSIGN\_ISSUE
         *  ATTACHMENT\_DELETE\_ALL
         *  ATTACHMENT\_DELETE\_OWN
         *  BROWSE
         *  CLOSE\_ISSUE
         *  COMMENT\_DELETE\_ALL
         *  COMMENT\_DELETE\_OWN
         *  COMMENT\_EDIT\_ALL
         *  COMMENT\_EDIT\_OWN
         *  COMMENT\_ISSUE
         *  CREATE\_ATTACHMENT
         *  CREATE\_ISSUE
         *  DELETE\_ISSUE
         *  EDIT\_ISSUE
         *  LINK\_ISSUE
         *  MANAGE\_WATCHER\_LIST
         *  MODIFY\_REPORTER
         *  MOVE\_ISSUE
         *  PROJECT\_ADMIN
         *  RESOLVE\_ISSUE
         *  SCHEDULE\_ISSUE
         *  SET\_ISSUE\_SECURITY
         *  TRANSITION\_ISSUE
         *  VIEW\_VERSION\_CONTROL
         *  VIEW\_VOTERS\_AND\_WATCHERS
         *  VIEW\_WORKFLOW\_READONLY
         *  WORKLOG\_DELETE\_ALL
         *  WORKLOG\_DELETE\_OWN
         *  WORKLOG\_EDIT\_ALL
         *  WORKLOG\_EDIT\_OWN
         *  WORK\_ISSUE */
  permissions: string;
  /** The issue key for the issue. */
  issueKey?: string;
  /** The project key for the project (case sensitive). */
  projectKey?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}

export interface FindUsersForPicker {
  /** A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. */
  query: string;
  /** The maximum number of items to return. The total number of matched users is returned in `total`. */
  maxResults?: number;
  /** Include the URI to the user's avatar. */
  showAvatar?: boolean;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  exclude?: string[];
  /** A list of account IDs to exclude from the search results. This parameter accepts a comma-separated list. Multiple account IDs can also be provided using an ampersand-separated list. For example, `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`. Cannot be provided with `exclude`. */
  excludeAccountIds?: string[];
  avatarSize?: string;
  excludeConnectUsers?: boolean;
}

export interface FindUserKeysByQuery {
  /** The search query. */
  query: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}

export interface FindBulkAssignableUsers {
  /** A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified. */
  query?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId?: string;
  /** A list of project keys (case sensitive). This parameter accepts a comma-separated list. */
  projectKeys: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}

export interface FindAssignableUsers {
  /** A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `username` or `accountId` is specified. */
  query?: string;
  /** The sessionId of this request. SessionId is the same until the assignee is set. */
  sessionId?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId?: string;
  /** The project ID or project key (case sensitive). Required, unless `issueKey` is specified. */
  project?: string;
  /** The key of the issue. Required, unless `project` is specified. */
  issueKey?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return. This operation may return less than the maximum number of items even if more are available. The operation fetches users up to the maximum and then, from the fetched users, returns only the users that can be assigned to the issue. */
  maxResults?: number;
  /** The ID of the transition. */
  actionDescriptorId?: number;
  recommend?: boolean;
}

export interface EditIssue extends IssueUpdateDetails {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** Whether a notification email about the issue update is sent to all watchers. To disable the notification, administer Jira or administer project permissions are required. If the user doesn't have the necessary permission the request is ignored. */
  notifyUsers?: boolean;
  /** Whether screen security should be overridden to enable hidden fields to be edited. Available to Connect app users with admin permissions. */
  overrideScreenSecurity?: boolean;
  /** Whether screen security should be overridden to enable uneditable fields to be edited. Available to Connect app users with admin permissions. */
  overrideEditableFlag?: boolean;
}

export interface DoTransition extends IssueUpdateDetails {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}

export interface DeleteIssue {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** Whether the issue's subtasks are deleted when the issue is deleted. */
  deleteSubtasks?: string;
}

export interface CreateIssue extends Omit<IssueUpdateDetails, "fields"> {
  /** Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. */
  updateHistory?: boolean;

  /** List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`. */
  fields: {
    [key: string]: any;
    summary: string;
    project: Partial<Project>;
    issuetype: {
      id?: string | number;
      name?: string;
    };
    parent?: {
      [key: string]: any;
      key?: string;
    };
    components?: Array<{
      [key: string]: any;
      id?: string | number;
    }>;
    description?:
      | string
      | {
          type?: string;
          version?: string | number;
          content: Array<{
            type: string;
            text: string;
            content?: any;
          }>;
        };
    reporter?: {
      [key: string]: any;
      id?: string | number;
    };
    fixVersions?: Array<{
      [key: string]: any;
      id?: string | number;
    }>;
    priority?: {
      [key: string]: any;
      id?: string | number;
    };
    labels?: string[];
    timetracking?: TimeTrackingDetails;
    security?: {
      [key: string]: any;
      id?: string | number;
    };
    environment?: any;
    versions?: Array<{
      [key: string]: any;
      id?: string | number;
    }>;
    duedate?: string;
    assignee?: {
      [key: string]: any;
      id?: string | number;
    };
  };
}

export interface AssignIssue extends User {
  /** The ID or key of the issue to be assigned. */
  issueIdOrKey: string;
}

export interface FindUsersByQuery {
  /** The search query. */
  query: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}

export interface FindUsers {
  /** A query string that is matched against user attributes ( `displayName`, and `emailAddress`) to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` or `property` is specified. */
  query?: string;
  username?: string;
  /** A query string that is matched exactly against a user `accountId`. Required, unless `query` or `property` is specified. */
  accountId?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** A query string used to search properties. Property keys are specified by path, so property keys containing dot (.) or equals (=) characters cannot be used. The query string cannot be specified using a JSON object. Example: To search for the value of `nested` from `{"something":{"nested":1,"other":2}}` use `thepropertykey.something.nested=1`. Required, unless `accountId` or `query` is specified. */
  property?: string;
}
