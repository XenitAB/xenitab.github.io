# Home

Welcome home!

## About

Repository gathering documentation for Xenit open source projects.

## More details

Take a look at the [Makefile](Makefile) and in [docs/](docs/).

## Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## Prerequisites

- Node.js 18.0 or higher
- Yarn package manager

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Search function

The search function does not work when running the dev server, it requires running `yarn build` (see below).

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service or locally by running `yarn serve`.

### Clear Cache

If you encounter build issues, clear the Docusaurus cache:

```console
yarn clear
```

## Deployment

This documentation is deployed automatically to https://xenitab.github.io when changes are merged to the `main` branch.
