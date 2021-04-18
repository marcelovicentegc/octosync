[![Build](https://github.com/marcelovicentegc/octosync/actions/workflows/build.yml/badge.svg)](https://github.com/marcelovicentegc/octosync/actions/workflows/build.yml)

<p align="center">
  <img alt="octosync logo" src="./assets/octosync.png" height="300" />
  <h3 align="center">octosync</h3>
  <p align="center">An open-source solution to keep Github and Jira issues in sync. An alternative to Exalate and Unito.</p>
</p>

---

| Features            | Status |
| ------------------- | ------ |
| Sync issue creation | ✔️     |
| Sync issue closing  | ✔️     |
| Sync comments       | ✔️     |
| Sync issue edition  | 🚧     |

## Installation

The directions below go as far as getting Octosync up and running on a host machine. Configuring a host machine and setting up any kind of proxy to make Octosync available to the world is beyond the scope of this document.

The above is also valid for how to get the ID of custom Jira fields, transition IDs and so on. You may find the [useful resources section](#useful-resources), useful.

1.  Pull image from registry: `docker pull ghcr.io/marcelovicentegc/octosync:latest`
2.  Create a file with your configuration, based on the following format (same as `.env.example`, except it doens't has the PORT option):

    _configuration.file_

    ```bash
    NODE_ENV=production
    GITHUB_TOKEN=
    GITHUB_ORGANIZATION=
    GITHUB_REPOSITORY=
    JIRA_HOST=
    JIRA_ISSUER_EMAIL=
    JIRA_PROJECT=
    JIRA_PROJECT_ID=
    JIRA_API_TOKEN=
    JIRA_DONE_TRANSITION_ID=
    JIRA_DONE_STATUS_NAME=
    JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD=
    JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD=
    ```

      <details>
      <summary>Click here to see an example file filled in</summary>
        
        
          NODE_ENV=production
          GITHUB_TOKEN=ZmFrZURhdGE
          GITHUB_ORGANIZATION=marcelovicentegc
          GITHUB_REPOSITORY=octosync
          JIRA_HOST=https://marcelovicentegc.atlassian.net
          JIRA_ISSUER_EMAIL=marcelovicentegc@pm.me
          JIRA_PROJECT=OCT
          JIRA_PROJECT_ID=10043
          JIRA_API_TOKEN=bW9yZUZha2VEYXRh
          JIRA_DONE_TRANSITION_ID=44
          JIRA_DONE_STATUS_NAME=Done
          JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD=10035
          JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD=10036
        
        
      </details>

3.  Start the image: `docker run -d -p <port-of-your-choice>:8000 --env-file configuration.file marcelovicentegc/octosync`
4.  Set the following webhook triggerers for Github on your project's webhooks settings:

    Octosync waits for Github events on the `github` endpoint. This means you must set Github webhook URL to this: `https://<your-host's-url>/github`

    - Issues
    - Issue comments
    - Labels

5.  Set the following webhook triggerers for Jira on your system's webhooks settings:

    Octosync waits for Jira events on the `jira` endpoint. This means you must set Jira webhook URL to this: `https://<your-host's-url>/jira`

    - Issue
      - created
      - updated
      - deleted
    - Comment
      - created

## Development

- Start octosync locally with `yarn start`.
- On another terminal window, run `yarn start:expose` to link octosync with an actual endpoint to test the webhooks.
- Edit files and have fun.

## Useful resources

### Jira

- [How to find the transition ID of a column?](https://community.atlassian.com/t5/Jira-questions/How-to-fine-transition-ID-of-JIRA/qaq-p/1207483#:~:text=Go%20to%20you%20Project%20Workflow,see%20transition%20id's%20for%20transitions.)
- [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)
- [How to find id for custom field(s)?](https://confluence.atlassian.com/jirakb/how-to-find-id-for-custom-field-s-744522503.html)
- [Manage Jira webhooks](https://support.atlassian.com/jira-cloud-administration/docs/manage-webhooks/)
