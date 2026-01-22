---
id: api-migrations
title: API migrations
---

In Kubernetes API:s get continuously upgraded and deprecated.
As a part of XKF we are in charge of upgrading the applications but it's up to you as a developer to upgrade the
resources if you are utilizing them. We will of course inform you when it's time and summarize what needs to be done.

This page is about sharing that information.

## Upgrading to Kubernetes 1.25

### CronJob

CronJob `apiVersion` is moved from `batch/v1beta1` to `batch/v1`.
The only thing you need to do is to change the API version.

From:

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: foo
```

To:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: foo
```

### HorizontalPodAutoscaler

HorizontalPodAutoscaler `apiVersion` is moved from `autoscaling/v2beta1` to `autoscaling/v2`.

Changes include the `apiVersion` but there's also changes to how `targetAverageUtilization` is used. See example below.

From:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: foo
spec:
  metrics:
    - type: Resource
      resource:
        name: cpu
        targetAverageUtilization: 50

    - type: Resource
      resource:
        name: memory
        targetAverageUtilization: 50
```

To:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: foo
spec:
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 50
```

### PodDisruptionBudget

PodDisruptionBudget `apiVersion` is moved from `policy/v1beta1` to `policy/v1`.
The main thing you need to do is to change `apiVersion`.

From:

```yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: foo
```

To:

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: foo
```

Another important change is that in `policy/v1` an empty `spec.selector {}` selects all pods in the namespace, when the previous `policy/v1beta1` did not select any pods.

### PodSecurityPolicy

PodSecurityPolicy in the policy/v1beta1 API version will no longer be served in v1.25, and the PodSecurityPolicy admission controller will be removed. More information can be found in the [Kubernetes deprecation guide](https://kubernetes.io/docs/reference/using-api/deprecation-guide/#psp-v125).

This is not something that we use in XKF, but it is good to know.

### Patching

If you have any kustomizations patching in different values between environments, or similar, these will also have to be changed to match the new `apiVersion`.

From:

```yaml
- path: pdb-patch.yaml
  target:
    group: policy
    version: v1beta1
    kind: PodDisruptionBudget
    name: app
```

To:

```yaml
- path: pdb-patch.yaml
  target:
    group: policy
    version: v1
    kind: PodDisruptionBudget
    name: app
```

## General API changes

### SecretProviderClass v1alpha1 to v1

SecretProviderClass `apiVersion` is moved from `secrets-store.csi.x-k8s.io/v1alpha1` to `secrets-store.csi.x-k8s.io/v1`.

The only thing you need to do is to change is the API version.

From:

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

To:

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

### Flux sourcecontroller v1beta1 to v1beta2

The only thing that you need to change when moving `source.toolkit.fluxcd.io` from `source.toolkit.fluxcd.io/v1beta1`to `source.toolkit.fluxcd.io/v1beta2` is the API version.

In XKF we handle the upgrade of your default GitRepository, but if you have created some other source object you will need to update it on your own.

Note that other Flux controllers (e.g. `kustomization.toolkit.fluxcd.io` and `notification.toolkit.fluxcd.io`) remain at `v1beta1`.
