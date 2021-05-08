import { AxiosRequestConfig } from "axios";
import {
  Callback,
  Client,
  CreatedIssue,
  IssueBean,
  IssueCreateMetadata,
  IssueUpdateMetadata,
  PageBeanChangelog,
  AssignIssue,
  CreateIssue,
  DeleteIssue,
  DoTransition,
  EditIssue,
  GetChangeLogs,
  GetCreateIssueMeta,
  GetEditIssueMeta,
  GetIssue,
  GetTransitions,
  Notify,
  Transitions,
  PageBeanComment,
  GetCommentsByIds,
  PageOfComments,
  GetComments,
  Comment,
  AddComment,
  GetComment,
  UpdateComment,
  DeleteComment,
} from "../types";

export class Issues {
  constructor(private client: Client) {}
  /**
   * Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties set.
   *
   * The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get). These are the same fields that appear on the issue's create screen.
   *
   * Creating a subtask differs from creating an issue as follows:
   *
   *  *  `issueType` must be set to a subtask issue type (use [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   *  *  `parent` must contain the ID or key of the parent issue.
   *
   * **[Permissions](#permissions) required:** *Browse projects* and *Create issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in which the issue or subtask is created. */
  async createIssue<T = CreatedIssue>(
    parameters: CreateIssue | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties set.
   *
   * The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue or subtask are determined using the [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get). These are the same fields that appear on the issue's create screen.
   *
   * Creating a subtask differs from creating an issue as follows:
   *
   *  *  `issueType` must be set to a subtask issue type (use [ Get create issue metadata](#api-rest-api-2-issue-createmeta-get) to find subtask issue types).
   *  *  `parent` must contain the ID or key of the parent issue.
   *
   * **[Permissions](#permissions) required:** *Browse projects* and *Create issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in which the issue or subtask is created. */
  async createIssue<T = CreatedIssue>(
    parameters?: CreateIssue,
    callback?: never
  ): Promise<T>;
  async createIssue<T = CreatedIssue>(
    parameters?: CreateIssue,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: "/rest/api/2/issue",
      method: "POST",
      params: {
        updateHistory: parameters?.updateHistory,
      },
      data: {
        transition: parameters?.transition,
        fields: parameters?.fields,
        update: parameters?.update,
        historyMetadata: parameters?.historyMetadata,
        properties: parameters?.properties,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns details of projects, issue types within projects, and, when requested, the create screen fields for each issue type for the user. Use the information to populate the requests in [ Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   * The request can be restricted to specific projects or issue types using the query parameters. The response will contain information for the valid projects, issue types, or project and issue type combinations requested. Note that invalid project, issue type, or project and issue type combinations do not generate errors.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:** *Create issues* [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects. */
  async getCreateIssueMeta<T = IssueCreateMetadata>(
    parameters: GetCreateIssueMeta | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns details of projects, issue types within projects, and, when requested, the create screen fields for each issue type for the user. Use the information to populate the requests in [ Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   *
   * The request can be restricted to specific projects or issue types using the query parameters. The response will contain information for the valid projects, issue types, or project and issue type combinations requested. Note that invalid project, issue type, or project and issue type combinations do not generate errors.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:** *Create issues* [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects. */
  async getCreateIssueMeta<T = IssueCreateMetadata>(
    parameters?: GetCreateIssueMeta,
    callback?: never
  ): Promise<T>;
  async getCreateIssueMeta<T = IssueCreateMetadata>(
    parameters?: GetCreateIssueMeta,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: "/rest/api/2/issue/createmeta",
      method: "GET",
      params: {
        projectIds: parameters?.projectIds,
        projectKeys: parameters?.projectKeys,
        issuetypeIds: parameters?.issuetypeIds,
        issuetypeNames: parameters?.issuetypeNames,
        expand: parameters?.expand,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns the details for an issue.
   *
   * The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other redirect is **not** returned. The issue key returned in the response is the key of the issue found.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async getIssue<T = IssueBean>(
    parameters: GetIssue,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the details for an issue.
   *
   * The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other redirect is **not** returned. The issue key returned in the response is the key of the issue found.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async getIssue<T = IssueBean>(
    parameters: GetIssue,
    callback?: never
  ): Promise<T>;
  async getIssue<T = IssueBean>(
    parameters: GetIssue,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: "GET",
      params: {
        fields: parameters.fields,
        fieldsByKeys: parameters.fieldsByKeys,
        expand: parameters.expand,
        properties: parameters.properties,
        updateHistory: parameters.updateHistory,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Edits an issue. A transition may be applied and issue properties updated as part of the edit.
   *
   * The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are determined using [ Get edit issue metadata](#api-rest-api-2-issue-issueIdOrKey-editmeta-get).
   *
   * The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting `update.parent.set.none` to *true*.
   *
   * Connect app users with admin permissions (from user permissions and app scopes) can override the screen security configuration using `overrideScreenSecurity` and `overrideEditableFlag`.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async editIssue<T = void>(
    parameters: EditIssue,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Edits an issue. A transition may be applied and issue properties updated as part of the edit.
   *
   * The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are determined using [ Get edit issue metadata](#api-rest-api-2-issue-issueIdOrKey-editmeta-get).
   *
   * The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting `update.parent.set.none` to *true*.
   *
   * Connect app users with admin permissions (from user permissions and app scopes) can override the screen security configuration using `overrideScreenSecurity` and `overrideEditableFlag`.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async editIssue<T = void>(
    parameters: EditIssue,
    callback?: never
  ): Promise<T>;
  async editIssue<T = void>(
    parameters: EditIssue,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: "PUT",
      params: {
        notifyUsers: parameters.notifyUsers,
        overrideScreenSecurity: parameters.overrideScreenSecurity,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      data: {
        transition: parameters.transition,
        fields: parameters.fields,
        update: parameters.update,
        historyMetadata: parameters.historyMetadata,
        properties: parameters.properties,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Deletes an issue.
   *
   * An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`. This causes the issue's subtasks to be deleted with the issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Delete issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async deleteIssue<T = void>(
    parameters: DeleteIssue,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes an issue.
   *
   * An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`. This causes the issue's subtasks to be deleted with the issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Delete issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async deleteIssue<T = void>(
    parameters: DeleteIssue,
    callback?: never
  ): Promise<T>;
  async deleteIssue<T = void>(
    parameters: DeleteIssue,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: "DELETE",
      params: {
        deleteSubtasks: parameters.deleteSubtasks,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Assigns an issue to a user. Use this operation when the calling user does not have the *Edit Issues* permission but has the *Assign issue* permission for the project that the issue is in.
   *
   * If `name` or `accountId` is set to:
   *
   *  *  `"-1"`, the issue is assigned to the default assignee for the project.
   *  *  `null`, the issue is set to unassigned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse Projects* and *Assign Issues* [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async assignIssue<T = void>(
    parameters: AssignIssue,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Assigns an issue to a user. Use this operation when the calling user does not have the *Edit Issues* permission but has the *Assign issue* permission for the project that the issue is in.
   *
   * If `name` or `accountId` is set to:
   *
   *  *  `"-1"`, the issue is assigned to the default assignee for the project.
   *  *  `null`, the issue is set to unassigned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse Projects* and *Assign Issues* [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async assignIssue<T = void>(
    parameters: AssignIssue,
    callback?: never
  ): Promise<T>;
  async assignIssue<T = void>(
    parameters: AssignIssue,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/assignee`,
      method: "PUT",
      data: {
        self: parameters.self,
        key: parameters.key,
        accountId: parameters.accountId,
        accountType: parameters.accountType,
        name: parameters.name,
        emailAddress: parameters.emailAddress,
        avatarUrls: parameters.avatarUrls,
        displayName: parameters.displayName,
        active: parameters.active,
        timeZone: parameters.timeZone,
        locale: parameters.locale,
        groups: parameters.groups,
        applicationRoles: parameters.applicationRoles,
        expand: parameters.expand,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns a [paginated](#pagination) list of all changelogs for an issue sorted by date, starting from the oldest.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async getChangeLogs<T = PageBeanChangelog>(
    parameters: GetChangeLogs,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](#pagination) list of all changelogs for an issue sorted by date, starting from the oldest.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async getChangeLogs<T = PageBeanChangelog>(
    parameters: GetChangeLogs,
    callback?: never
  ): Promise<T>;
  async getChangeLogs<T = PageBeanChangelog>(
    parameters: GetChangeLogs,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/changelog`,
      method: "GET",
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to populate the requests in [Edit issue](#api-rest-api-2-issue-issueIdOrKey-put).
   *
   * Connect app users with admin permissions (from user permissions and app scopes) can return additional details using:
   *
   *  *  `overrideScreenSecurity` Returns hidden fields.
   *  *  `overrideEditableFlag` Returns uneditable fields. For example, where an issue has a workflow status of closed none of its fields are editable.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *
   * Note: For any fields to be editable the user must have the *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the issue. */
  async getEditIssueMeta<T = IssueUpdateMetadata>(
    parameters: GetEditIssueMeta,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to populate the requests in [Edit issue](#api-rest-api-2-issue-issueIdOrKey-put).
   *
   * Connect app users with admin permissions (from user permissions and app scopes) can return additional details using:
   *
   *  *  `overrideScreenSecurity` Returns hidden fields.
   *  *  `overrideEditableFlag` Returns uneditable fields. For example, where an issue has a workflow status of closed none of its fields are editable.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *
   * Note: For any fields to be editable the user must have the *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the issue. */
  async getEditIssueMeta<T = IssueUpdateMetadata>(
    parameters: GetEditIssueMeta,
    callback?: never
  ): Promise<T>;
  async getEditIssueMeta<T = IssueUpdateMetadata>(
    parameters: GetEditIssueMeta,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/editmeta`,
      method: "GET",
      params: {
        overrideScreenSecurity: parameters.overrideScreenSecurity,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Creates an email notification for an issue and adds it to the mail queue.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async notify<T = void>(
    parameters: Notify,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates an email notification for an issue and adds it to the mail queue.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async notify<T = void>(parameters: Notify, callback?: never): Promise<T>;
  async notify<T = void>(
    parameters: Notify,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/notify`,
      method: "POST",
      data: {
        subject: parameters.subject,
        textBody: parameters.textBody,
        htmlBody: parameters.htmlBody,
        to: parameters.to,
        restrict: parameters.restrict,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's status.
   *
   * Note, if a request is made for a transition that does not exist or cannot be performed on the issue, given its status, the response will return any empty transitions list.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required: A list or transition is returned only when the user has:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *
   * However, if the user does not have the *Transition issues* [ project permission](https://confluence.atlassian.com/x/yodKLg) the response will not list any transitions. */
  async getTransitions<T = Transitions>(
    parameters: GetTransitions,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's status.
   *
   * Note, if a request is made for a transition that does not exist or cannot be performed on the issue, given its status, the response will return any empty transitions list.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required: A list or transition is returned only when the user has:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *
   * However, if the user does not have the *Transition issues* [ project permission](https://confluence.atlassian.com/x/yodKLg) the response will not list any transitions. */
  async getTransitions<T = Transitions>(
    parameters: GetTransitions,
    callback?: never
  ): Promise<T>;
  async getTransitions<T = Transitions>(
    parameters: GetTransitions,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
      method: "GET",
      params: {
        expand: parameters.expand,
        transitionId: parameters.transitionId,
        skipRemoteOnlyCondition: parameters.skipRemoteOnlyCondition,
        includeUnavailableTransitions: parameters.includeUnavailableTransitions,
        sortByOpsBarAndStatus: parameters.sortByOpsBarAndStatus,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen.
   *
   * sortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update` parameters in the request body. Get details about the fields using [ Get transitions](#api-rest-api-2-issue-issueIdOrKey-transitions-get) with the `transitions.fields` expand.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Transition issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async doTransition<T = void>(
    parameters: DoTransition,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen.
   *
   * sortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update` parameters in the request body. Get details about the fields using [ Get transitions](#api-rest-api-2-issue-issueIdOrKey-transitions-get) with the `transitions.fields` expand.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Transition issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async doTransition<T = void>(
    parameters: DoTransition,
    callback?: never
  ): Promise<T>;
  async doTransition<T = void>(
    parameters: DoTransition,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
      method: "POST",
      data: {
        transition: parameters.transition,
        fields: parameters.fields,
        update: parameters.update,
        historyMetadata: parameters.historyMetadata,
        properties: parameters.properties,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](#pagination) list of just the comments for a list of comments specified by comment IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:** Comments are returned where the user:
   *
   *  *  has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentsByIds<T = PageBeanComment>(
    parameters: GetCommentsByIds | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](#pagination) list of just the comments for a list of comments specified by comment IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:** Comments are returned where the user:
   *
   *  *  has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentsByIds<T = PageBeanComment>(
    parameters?: GetCommentsByIds,
    callback?: never
  ): Promise<T>;
  async getCommentsByIds<T = PageBeanComment>(
    parameters?: GetCommentsByIds,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: "/rest/api/2/comment/list",
      method: "POST",
      params: {
        expand: parameters?.expand,
      },
      data: {
        ids: parameters?.ids,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns all comments for an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:** Comments are included in the response where the user has:
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is restricted to. */
  async getComments<T = PageOfComments>(
    parameters: GetComments,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all comments for an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:** Comments are included in the response where the user has:
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is restricted to. */
  async getComments<T = PageOfComments>(
    parameters: GetComments,
    callback?: never
  ): Promise<T>;
  async getComments<T = PageOfComments>(
    parameters: GetComments,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: "GET",
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Adds a comment to an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Add comments* [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async addComment<T = Comment>(
    parameters: AddComment,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds a comment to an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* and *Add comments* [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async addComment<T = Comment>(
    parameters: AddComment,
    callback?: never
  ): Promise<T>;
  async addComment<T = Comment>(
    parameters: AddComment,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: "POST",
      params: {
        expand: parameters.expand,
      },
      data: {
        self: parameters.self,
        id: parameters.id,
        author: parameters.author,
        body: parameters.body,
        renderedBody: parameters.renderedBody,
        updateAuthor: parameters.updateAuthor,
        created: parameters.created,
        updated: parameters.updated,
        visibility: parameters.visibility,
        jsdPublic: parameters.jsdPublic,
        properties: parameters.properties,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async getComment<T = Comment>(
    parameters: GetComment,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async getComment<T = Comment>(
    parameters: GetComment,
    callback?: never
  ): Promise<T>;
  async getComment<T = Comment>(
    parameters: GetComment,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: "GET",
      params: {
        expand: parameters.expand,
      },
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Updates a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Edit all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or *Edit own comments* to update comment created by the user.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async updateComment<T = Comment>(
    parameters: UpdateComment,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Edit all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or *Edit own comments* to update comment created by the user.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async updateComment<T = Comment>(
    parameters: UpdateComment,
    callback?: never
  ): Promise<T>;
  async updateComment<T = Comment>(
    parameters: UpdateComment,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: "PUT",
      params: {
        expand: parameters.expand,
      },
      data: parameters.body,
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
  /**
   * Deletes a comment.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Delete all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async deleteComment<T = void>(
    parameters: DeleteComment,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a comment.
   *
   * **[Permissions](#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Delete all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async deleteComment<T = void>(
    parameters: DeleteComment,
    callback?: never
  ): Promise<T>;
  async deleteComment<T = void>(
    parameters: DeleteComment,
    callback?: Callback<T>
  ): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: "DELETE",
    } as AxiosRequestConfig;

    return this.client.sendRequest(config, callback);
  }
}
