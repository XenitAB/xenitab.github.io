---
id: api-migrations
title: API-migrations
---

In kubernetes API:s gets continuously upgraded and deprecated.
As a part of XKF we are in charge of upgrading the applications but it's up to you as a developer to upgrade the
resources if you are utilizing them, but we will of course inform you when it's time and what is needed to be done.

This page is about sharing that information.

## SecretProviderClass v1alpha1 to v1

Moving SecretProviderClass apiVersion from `secrets-store.csi.x-k8s.io/v1alpha1` to `secrets-store.csi.x-k8s.io/v1`.

So the only thing you need to do is to change is the API version.

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

## Flux sourcecontroller v1beta1 to v1beta2

The only thing that you need to change when moving source.toolkit.fluxcd.io from `source.toolkit.fluxcd.io/v1beta1`to `source.toolkit.fluxcd.io/v1beta2` is the API version.

In XKF we handle the upgrade of your default GitRepository, but if you have created some other source object you will need to update it on your own.
