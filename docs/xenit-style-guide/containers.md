---
id: containers
title: Containers
---

This page documents best practices when publishing open source applications that are meant to run in Kubernetes. Refer to the [developer guide](./xks/developer-guide/introduction) for documentation about how to run and manage applications in Kubernetes.

## Docker

TBD

## Helm

Helm has since version 3.8.0 supported storing Helm charts in OCI registires. This solution has a lot of benefits over the old Helm registry and for this reason should be the only way Helm charts are published in Xenit open source projects. The Helm chart OCI artifact should have the same name as the Docker image which the application produces and share the same version number. To avoid name conflicts however the Helm chart should be prefixed with `helm-charts/`. Refer to the project [node-ttl](https://github.com/XenitAB/node-ttl) for an example. It has both the Docker image [node-ttl](https://github.com/XenitAB/node-ttl/pkgs/container/node-ttl) and the Helm chart [helm-charts/node-ttl](https://github.com/XenitAB/node-ttl/pkgs/container/helm-charts%2Fnode-ttl) stored in Github container registries.

Below is an GitHub action which builds and pushes a chart to GitHub container registry.

```yaml
name: release
on:
  release:
    types: [published]
jobs:
  helm:
    runs-on: ubuntu-latest
    steps:
      - name: Clone repo
        uses: actions/checkout@v2
      - name: Install Helm
        uses: azure/setup-helm@v1
      - name: Get GitHub Tag
        id: get_tag
        run: |
          echo "::set-output name=tag::${GITHUB_REF#refs/tags/}"
      - name: Publish Helm charts
        run: |
          cd charts
          helm registry login -u ${{ github.repository_owner }} -p ${{ secrets.GITHUB_TOKEN }} ghcr.io
          helm package --app-version ${{ steps.get_tag.outputs.tag }} --version ${{ steps.get_tag.outputs.tag }} node-ttl 
          helm push node-ttl-${{ steps.get_tag.outputs.tag }}.tgz oci://ghcr.io/xenitab/helm-charts
```
