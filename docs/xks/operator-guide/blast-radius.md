---
id: blast-radius
title: Blast Radius
---

import useBaseUrl from '@docusaurus/useBaseUrl';

As part of ourTterraform pipelines at Xenit we use something called OPA Blast Radius to make sure that we do not do to big changes during a single commit and do not remove needed infrastructure by mistake.

## Workflow

Our normal way of working uses a Makefile to make managing commands easier.

When running Terraform locally and in our CI pipelines we use our Markdown files.

## OPA Blast Radius calculation

The calculation of the blast radius value is done in the Dockerfile that is started through the Makefile.

We use [OPA](https://www.openpolicyagent.org/) to calculate the blast radius itself.
To see exactly how we do it you can look in this [bash script](https://github.com/XenitAB/github-actions/blob/main/docker/terraform.sh)

The default value is currently set to 50.

## Overwrite OPA blast radius locally

Run your `make` command normally, but when running `plan` add `OPA_BLAST_RADIUS` and the value you want.

```shell
make plan ENV=dev DIR=governance OPA_BLAST_RADIUS=51
```

## Overwrite OPA blast radius in CI

We are using Just Enough Administration (JEA) at Xenit and in many cases our admins do not have enough access to run Terraform plan/apply locally.
Instead we are forced to use our CI/CD systems to manage this for us.

If you look at the `Makefile` you will see that we do not use any environment variables to overwrite the `OPA_BLAST_RADIUS` value.
So how should we change the `OPA_BLAST_RADIUS` without having to update the pipeline file every time we want to overwrite the default value?

Sadly here comes some magic, if you look in [https://github.com/XenitAB/azure-devops-templates/](https://github.com/XenitAB/azure-devops-templates/blob/594c374cb5418c415737fdb688049d4138f2d67f/terraform-docker/plan/main.yaml#L107)
you will see that we are listening for the environment variable `opaBlastRadius`.

So to overwrite the `OPA_BLAST_RADIUS` value during a single run we can utilize the `opaBlastRadius` environment variable.

To add a custom value to your pipeline in Azure DevOps do the following:

Pipelines -> "pipeline-you-want-to-run" -> Run pipeline -> Variables -> Add variable

Add `opaBlastRadius=51`, it should look something like this:

<img alt="Blast Radius" src={useBaseUrl("img/assets/xks/operator-guide/opaBlastRadius.png")} />

To start the job you have to push the back arrow `<-` and Run.

Remember, this variable is only set for one run.
