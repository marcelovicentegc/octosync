[![License: MIT](https://img.shields.io/github/license/marcelovicentegc/octosync)](LICENSE)
[![Build](https://github.com/marcelovicentegc/octosync/actions/workflows/build.yml/badge.svg)](https://github.com/marcelovicentegc/octosync/actions/workflows/build.yml)

<p align="center">
  <img alt="octosync logo" src="../../assets/octosync.png" height="300" />
  <h3 align="center">octosync</h3>
  <p align="center">An open-source solution to keep Github and Jira issues synchronized. An alternative to Exalate and Unito.</p>
</p>

---

## Features

- Sync issue creation bi-directionally
- Sync issue closing bi-directionally
- Sync issue comments bi-directionally

## Installation

The directions below go as far as getting Octosync up and running on a host machine. Configuring a host machine and setting up any kind of proxy to make Octosync available to the world is beyond the scope of this document.

The above is also valid for how to get the ID of custom Jira fields, transition IDs and so on. I'm leaving some links that might be helpful, on the table below.

### Configuration

This information will be used on the following step: [Spinning Octosync](#spinning-octosync).

| Variable                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Defaults to   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| NODE_ENV                              | Whether you're running on a `production` or `development` environment. Set this to `production` when deploying Octosync to an actual host.                                                                                                                                                                                                                                                                                                                                                                                                           | `development` |
| PORT                                  | The port which Octosync should run. This variable only takes effect when developing locally, and NODE_ENV is set to `development`. Otherwise, it's set to `8000`, which is the port it runs on the docker image.                                                                                                                                                                                                                                                                                                                                     | `8000`        |
| GITHUB_TOKEN                          | An alternative to using passwords for authentication to GitHub when using the GitHub API or the command line. For more information on how to get this, see [Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).                                                                                                                                                                                                                                                          | -             |
| GITHUB_ORGANIZATION                   | Is your project hosted under your organization? If yes, use the organization name. Otherwise, use your Github usernamename.                                                                                                                                                                                                                                                                                                                                                                                                                          | -             |
| GITHUB_REPOSITORY                     | The repository name of the repository which you'd like to sync issues with.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | -             |
| JIRA_HOST                             | The Jira's host of the project you'd like to sync issues with. For example, mine is `https://marcelovicentegc.atlassian.net/`.                                                                                                                                                                                                                                                                                                                                                                                                                       | -             |
| JIRA_API_TOKEN                        | An API token to authenticate a script or other process (in this case, Octosync) with an Atlassian cloud product. For more information on how to get this, see [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).                                                                                                                                                                                                                                    | -             |
| JIRA_ISSUER_EMAIL                     | You'll need an account to act in name of Octosync, by syncing Github events. This is where its email goes.                                                                                                                                                                                                                                                                                                                                                                                                                                           | -             |
| JIRA_PROJECT                          | The project key of your project on Jira. To give you an example, Octosync's project key on Jira is `OCT` - [see its prefix on the Github messages](https://github.com/marcelovicentegc/octosync/issues?q=is%3Aissue+is%3Aclosed).                                                                                                                                                                                                                                                                                                                    | -             |
| JIRA_PROJECT_ID                       | The ID of your project. It sucks, but you'll need to get this from a querystring on Jira. See the following for more information on how to get these: [Solved: JIRA Project ID](https://community.atlassian.com/t5/Jira-questions/JIRA-Project-ID/qaq-p/193094), [How to get project id from the Jira User Interface](https://confluence.atlassian.com/jirakb/how-to-get-project-id-from-the-jira-user-interface-827341414.html).                                                                                                                    | -             |
| JIRA_DONE_TRANSITION_ID               | The transition ID of the "Done", or the state which represents that a issue is completed/closed. For more information on how to get this, see [How to find transition ID?](https://community.atlassian.com/t5/Jira-questions/How-to-fine-transition-ID-of-JIRA/qaq-p/1207483#:~:text=Go%20to%20you%20Project%20Workflow,see%20transition%20id's%20for%20transitions.). In my case, I navigated to {{ JIRA_HOST }}/secure/admin/workflows/ListWorkflows.jspa and clicked on edit on the transition I needed to see the transition ID.                 | -             |
| JIRA_DONE_STATUS_NAME                 | The name of the transition above 👆.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | -             |
| JIRA_CUSTOM_GITHUB_REPOSITORY_FIELD   | In order for Jira to figure out what is the repository linked to the project. We need to create custom fields on Jira, which will be filled by Github. For more information on how to create custom fields, see: [Create a custom field](https://support.atlassian.com/jira-cloud-administration/docs/create-a-custom-field). After creating the custom field, get its ID. For more on how to get a custom field ID, see: [How to find out field id?](https://community.atlassian.com/t5/Jira-Core-questions/How-to-find-out-field-id/qaq-p/140555). | -             |
| JIRA_CUSTOM_GITHUB_ISSUE_NUMBER_FIELD | Repeat the above steps 👆.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | -             |

Once you have gotten the configuration variables needed, it's time to set the webhook triggerers on Github, and Jira. I'm assuming you already know where you'll be hosting Octosync and what is its domain.

- To configure your Github project's webhooks, navigate to: `https://github.com/{{ GITHUB_ORGANIZATION }}/{{ GITHUB_REPOSITORY }}/settings/hooks`
- To configure your Jira's system webhooks, navigate to: `{{ JIRA_HOST }}/plugins/servlet/webhooks`

| Platform | Webhooks                                                                                                                                        | Endpoint               |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Github   | Check the following triggerers: `issues`, `issue comments` and `labels`                                                                         | `<your-domain>/github` |
| Jira     | Check the following triggerers: Under the `Issue` column, check `created`, `updated` and `deleted`. Under the `Comment` column, check `created` | `<your-domain>/jira`   |

### Spinning Octosync

1.  Pull image from registry:
    ```bash
    $ docker pull ghcr.io/marcelovicentegc/octosync:latest
    ```
2.  Create a configuration file, based on the following format (same as `.env.example`, except it doens't has the PORT option):

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
      <summary>Click here to see an example file filled in, to have an idea of what it may end looking like (token values are fake)</summary>

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

3.  Start the image:
    ```bash
    $ docker run -d -p <port-of-your-choice>:8000 --env-file configuration.file ghcr.io/marcelovicentegc/octosync
    ```
4.  You're all set. By this point Octosync should be up and running and all you need to do now is expose it to the world 😉.

## Development

- Start octosync locally with `yarn start`.
- On another terminal window, run `yarn start:expose` to link octosync with an actual endpoint to test the webhooks.
- Edit files and have fun.
