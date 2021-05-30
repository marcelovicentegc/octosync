[![License: ISC](https://img.shields.io/badge/ISC-license-green)](LICENSE)
[![Build](https://github.com/marcelovicentegc/octosync/actions/workflows/build.yml/badge.svg)](https://github.com/marcelovicentegc/octosync/actions/workflows/build.yml)

<p align="center">
  <img alt="octosync logo" src="https://raw.githubusercontent.com/marcelovicentegc/octosync/main/assets/octosync.png" height="300" />
  <h3 align="center">@octosync/bot</h3>
  <p align="center">Octosync Bot keeps Github and Jira issues in sync.</p>
</p>

---

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t octosync-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> octosync-bot
```

## Contributing

If you have suggestions for how `@octosync/bot` could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 Marcelo Cardoso <marcelovicentegc@gmail.com>
