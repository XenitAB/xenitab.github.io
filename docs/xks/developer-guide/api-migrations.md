---
id: api-migrations
title: API-migrations
---

In kubernetes API:s gets continuously upgraded and deprecated.
As a part of XKF we are in charging of upgrading the applications but it's up to you as a developer to upgrade the
resources if you are utilizing them, but we will of course inform you when it's time and what is needed to be done.

This page is about sharing that information.

## XKF 2022.05.4

This release is preparing for deprecation happening in kubernetes 1.22, as a part of this release we upgraded allot of CRD:s.

You as a developer only need to think about one API upgrade in this release.

### SecretProviderClass API version

Moving SecretProviderClass apiVersion from `secrets-store.csi.x-k8s.io/v1alpha1` to `secrets-store.csi.x-k8s.io/v1`.

The only thing you need to do is to change from

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1alpha1
kind: SecretProviderClass
metadata:
  name: foo
spec:
  provider: <provider>
  parameters:
    objects: |
      - objectName: "bar"
        objectType: "<type>"
      - objectName: "baz"
        objectType: "<type>"
```

to

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: foo
spec:
  provider: <provider>
  parameters:
    objects: |
      - objectName: "bar"
        objectType: "<type>"
      - objectName: "baz"
        objectType: "<type>"
```
