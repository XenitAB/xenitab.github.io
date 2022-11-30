---
id: api-migrations
title: API-migrations
---

In Kubernetes API:s get continuously upgraded and deprecated.
As a part of XKF we are in charge of upgrading the applications but it's up to you as a developer to upgrade the
resources if you are utilizing them, but we will of course inform you when it's time and what is needed to be done.

This page is about sharing that information.

## Kubernetes 1.25

### CronJob

Moving CronJob apiVersion from `batch/v1beta1` to `batch/v1`
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

Moving HorizontalPodAutoscaler apiVersion from `autoscaling/v2beta1` to `autoscaling/v2`

Changes will include the `apiVersion` and also `targetAverageUtilization` to the changes made below.

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

Moving PodDisruptionBudget apiVersion from `policy/v1beta1` to `policy/v1`
The only thing you need to do is to change the API version.

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

Other noticeable changes is that in `policy/v1` an empty `spec.selector {}` selects all pods in the namespace, when the previous `policy/v1beta1` did not select any pods.

### PodSecurityPolicy

PodSecurityPolicy in the policy/v1beta1 API version will no longer be served in v1.25, and the PodSecurityPolicy admission controller will be removed. More informaiton can be found [here.](https://kubernetes.io/docs/reference/using-api/deprecation-guide/#psp-v125)

This is not something that we use in XKF, but it is good to know.

### Patching

If you have any kustomizations patching in different values between environments, or similar. These will also have to be changed to match the new apiVersion.

## General API changes

### SecretProviderClass v1alpha1 to v1

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

### Flux sourcecontroller v1beta1 to v1beta2

The only thing that you need to change when moving source.toolkit.fluxcd.io from `source.toolkit.fluxcd.io/v1beta1`to `source.toolkit.fluxcd.io/v1beta2` is the API version.

In XKF we handle the upgrade of your default GitRepository, but if you have created some other source object you will need to update it on your own.
