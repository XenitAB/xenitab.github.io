---
id: ci
title: Continuous Integration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

XKF provides a number of base [templates](https://github.com/XenitAB/azure-devops-templates/blob/main/gitops-v2/) for CI and CD, in this part we will go through the CI.
The core feature of the CI pipeline is that it generates a artifactory containing the application container.

The CI triggers the CD that will grab the container artifact and push it to a central container registry, for Azure it will be ACR and AWS uses ECR.

When following these docs we assume that you already have imported the azure-devops-templates to your [project](https://github.com/XenitAB/azure-devops-templates#usage).

There are a number of extra addons that you can enable on your build stage that we will go through bellow.

## Hadolint

[Hadolint](https://github.com/hadolint/hadolint) is a linter for container files and gives you suggestions on how to follow best practices.

This check is enabled by default and you can disable it by adding:

```.yaml
dockerLint:
    enabled: false
    ignoreRuleViolations: false
```

You can add a config file for hadolint where you can
[ignore](https://github.com/hadolint/hadolint#configure) specific errors

## Trivy

[Trivy](https://github.com/aquasecurity/trivy) is a container image scanner
in a cli tool used to scan for CVE:s in both your code and base image.

To scan the image

```shell
trivy <image-name>
```

After that we have built the image we scan it and give you a report.

If you want to ignore specific trivy errors you can create a .trivyignore file.
For example it can look like this:

```.trivyignore
CVE-2020-29652
```

If you want to disable trivy by appending the following to your ci file.

```.yaml
imageScan
    enable: true
    ignoreRuleViolations: true
```

## Horusec

A CLI tool to scan your application code for security issues that is disabled by default.
To enable in your CI pipeline

Before enabling horusec in your CI pipeline you should configure what issues your CI pipeline should catch.

```shell
horusec generate
```

It will generate a file called: horusec-config.json, in this file you can configure everything horusec should scan and report.

You can find more horusec config [flags here](https://horusec.io/docs/cli/resources/#global-flags).

**Key config values:**

- horusecCliSeveritiesToIgnore: What severities do you want to show?
- horusecCliFilesOrPathsToIgnore: What paths do you want to ignore

To save time it's easy to run horusec locally:

```shell
horusec start -p .
```
