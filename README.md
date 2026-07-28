# noxaeapi-sdk-test

Quick smoke test for the published `@wumx-labs/noxaeapi-sdk` package against a real running NoxAeApi server.

## Setup

```bash
npm install
cp .env.example .env
# edit .env: set NOXAEAPI_BASE_URL and NOXAEAPI_KEY to match your server
```

## Run

```bash
npm test
```

This calls, in order: `ping`, `server.info()`, `players.list()`, `economy.info()`, `worlds.list()`.

Each section is wrapped independently, so if one endpoint fails (e.g. economy isn't set up, or the key lacks permission) the rest still run — errors print with the specific SDK error type (`NoxAeApiUnauthorizedError`, `NoxAeApiForbiddenError`, `NoxAeApiNetworkError`, etc.) so it's clear what went wrong and where.
