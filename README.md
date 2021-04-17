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

1. Pull image from registry: `docker pull marcelovicentegc/octosync`
2. Create a file with your configuration, based on the following format (same as `.env.example`, except it doens't has the PORT option):

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

3. Start the image: `docker run -d -p <port-of-your-choice>:8000 --env-file configuration.file marcelovicentegc/octosync`

## Development

- Start octosync locally with `yarn start`.
- On another terminal window, run `yarn start:expose` to link octosync with an actual endpoint to test the webhooks.
- Edit files and have fun.

## Useful resources

- [Manage Jira webhooks](https://support.atlassian.com/jira-cloud-administration/docs/manage-webhooks/)
