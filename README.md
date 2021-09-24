# Home

Welcome home!

## About

Repository gathering documentation for Xenit open source projects

## More details

Take a look at the [Makefile](Makefile) and in [docs/](docs/).

## Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Generate external docs

```console
node .github/workflows/sync-docs.js terraform-modules "Terraform Modules" modules
node .github/workflows/sync-docs.js azure-devops-templates "Azure DevOps Templates"
```

Do not commit the folders that are synced as of now.