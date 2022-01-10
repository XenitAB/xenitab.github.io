---
id: gitops
title: GitOps a la XKS
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## What is GitOps?

> GitOps works by using Git as a single source of truth for declarative infrastructure and applications. With GitOps, the use of software agents can alert on any divergence between Git with what's running in [an environment], and if there's a difference, Kubernetes reconcilers automatically update or rollback the cluster depending on the case. &dash; _[Weave Works - Guide To GitOps](https://www.weave.works/technologies/gitops/)_

XKS supports GitHub and Azure DevOps with almost identical workflows. XKF refers to these as Git providers. For simplicity, we refer to their CI/CD automation as "pipelines". If you are using GitHub, whenever this text refers to "pipeline", think "GitHub Actions workflow". As you saw in the previous section, XKS comes with a set of pipelines that automatically detects app releases and promotes them through a series of environments. The allows both rapid iteration and strong validation of apps.

XKS is built around [trunk-based development](https://trunkbaseddevelopment.com/).

## User story: Emilia updates an app

In the previous section, we looked at deploying our first app to Kubernetes using a fully automatic flow. But what actually happened in that flow? This section tells the story about a developer called Emilia. She has updated an app packaged as a container image. A pipeline in the app's repository has just tagged the container image as `a8b91c33` and uploaded it to a container registry.

The GitOps repository for Emilia's app has a `gitops-promotion.yaml` that looks like this (for much more details, see the [gitops-promotion](https://github.com/XenitAB/gitops-promotion) readme):

```yaml
prflow: per-app
environments:
  - env: dev
    auto: true
  - env: qa
    auto: true
  - env: prod
    auto: false
```

The `dev` and `qa` environments have `auto: true` which means that new releases will be automatically applied, while `prod` environment is configured with `auto: false`. This means that pull requests must be merged by a human, presumably one that has verified that the update worked as expected in previous environments. The GitOps repository is configured to require checks on pull requests to pass in order to allow merge.

### Applying to dev

The flow is fully automatic and is triggered by the container image upload.

<img alt="Apply to dev" src={useBaseUrl("img/assets/xks/developer-guide/developer-flow-apply-dev.jpg")} />

1. The <img src={useBaseUrl("static/img//gitops/acr-icon.png")} style={{width: '1em'}} /> / <img src={useBaseUrl("static/img//gitops/ecr-icon.png")} style={{width: '1em'}} /> container image upload triggers a pipeline in the GitOps repository that runs the <img src={useBaseUrl("static/img//gitops/devops-icon.png")} style={{width: '1em'}} /> / <img src={useBaseUrl("static/img//gitops/github-icon.png")} style={{width: '1em'}} /> [gitops-promotion new](https://github.com/XenitAB/gitops-promotion#gitops-promotion-new) command. It pushes a new branch and updates the `dev` environment manifest for the app with the new tag. It then opens an "auto-merging" pull request to integrate the new tag into the main branch.
1. The <img src={useBaseUrl("static/img//gitops/pr-icon.png")} style={{width: '1em'}} /> pull request triggers another pipeline that runs <img src={useBaseUrl("static/img//gitops/devops-icon.png")} style={{width: '1em'}} /> / <img src={useBaseUrl("static/img//gitops/github-icon.png")} style={{width: '1em'}} /> [gitops-promotion status](https://github.com/XenitAB/gitops-promotion#gitops-promotion-new) command. Since `dev` is the first environment in the list, it does nothing and reports success.
1. The pull request check turns green and the pull request is automatically merged by Git provider.
1. The <img src={useBaseUrl("static/img//gitops/fluxcdio-icon.png")} style={{width: '1em'}} /> Flux Kustomization controller detects that there has been an update to the app's tag in the Git repository and applies this update to the Kubernetes resource for the app (typically a `Deployment`).
1. The pods running the new container image came up healthy and so Flux sets a commit status on the `main` branch in the GitOps repository, reporting that the update was successfully applied. This will be significant in the next section.

### Applying to qa

<img alt="Apply to qa" src={useBaseUrl("img/assets/xks/developer-guide/developer-flow-apply-qa.jpg")} />

1. Merging a promotion to the main branch triggers a pipeline in the GitOps repository that runs the [gitops-promotion promote](https://github.com/XenitAB/gitops-promotion#gitops-promotion-promote) command. Like `new`, it creates a branch and updates the `qa` envrionment manifest for the app with the new tag. Because the configuration for this environment says `auto: true` it creates an auto-merging pull request.
1. As before, this new pull request triggers antoher pipeline that runs the `status` command. This time there is a previous environment and the status command reads the Flux commit status for that environment. Since Flux managed to apply the change in `dev` the `status` command reports success.
1. The pull request check turns green and the pull request is automatically merged by Git provider.
1. The Flux Kustomization controller detects that there has been an update to the app's tag in the Git repository and applies this update to the Kubernetes resource for the app (typically a `Deployment`).
1. In this case, someone had applied manual changes to the app's database in the `dev` environment during development. These updates are not present in the `qa` environment, and when the pods running the new container image come up, they cannot read state from the database and so fail their health check. Flux consequently sets a commit status on the `main` branch of the GitHub repository, reporting that the update failed.

Emilia's team has configured Flux to notify them when updates fail and so Emilia's chat client informs her that the update did not go through.

### Application to prod is blocked

<img alt="Apply to prod" src={useBaseUrl("img/assets/xks/developer-guide/developer-flow-apply-prod-blocked.jpg")} />

The workflow for applying to `prod` is similar to that of `qa` above, but since Flux reported failure when applying the update to `qa`, the pipeline running the `status` command will fail and the Git provider will block merging of the pull request.

Seeing that the rollout failed, Emilia investigates and realizes that the release is missing a database migration script. She pushes an updated release tagged `cc2b7e0a` and so triggers the pipline running the `new` command. Because the configuration says `prflow: per-app`, the command "resets" the blocked pull request to apply to the updated release to the `dev` environment.

### Second attempt applying to prod

<img alt="Apply to prod" src={useBaseUrl("img/assets/xks/developer-guide/developer-flow-apply-prod-success.jpg")} />

Emilia's updated app with database migration is successfully applied first to the `dev` environment and then to the `qa` environment. The `status` check for the pull request against `prod` turns green and the pull request can be merged. Since the configuration says `auto: false`, the pull request is not automatically merged. Emilia can now verify the update in the `qa` environment and then merge the pull request through the Git provider's user interface.
