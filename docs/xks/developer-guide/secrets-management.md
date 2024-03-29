---
id: secrets-management
title: Secrets Management
---

Secrets management is an important feature when building secure products. Access to secrets should be limited, and it should be easy to rotate them when required. It becomes a requirement when working with
GitOps as secrets can and should not be committed to a git repository. This means that secrets have to be loaded from another source separate from the manifests, but before the application is started.
To solve this problem XKS makes use of the [Secret Store CSI Driver](https://secrets-store-csi-driver.sigs.k8s.io/providers.html) project when running in both Azure and AWS. The CSI driver creates an
entrypoint so that secrets store services in cloud providers can be read as Kubernetes volumes. The project works in a similar way in both Azure and AWS but there are some configuration differences
as the service that stores the secrets is different.

A common question when looking at the CSI Driver is why not just load the secret with the help of the cloud provider's SDK? While that solution may work it is not recommended as it creates a close
coupling between the application logic and the secret source. A simple thing such as renaming the secret could require the application to be compiled again. Local development could also be affected as
the application would need alternative logic get the secrets locally. With the CSI Driver the application can just expect the secrets to be read through a file or environment variable, the
method in which that file or environment variable got created is irrelevant for the application.

> The guide below assumes that you have read and understood the [Cloud IAM](./cloud-iam.md) documentation as the Pod loading the secret will need to have permission to read the secret.

The main component of the Secret Store CSI Driver is the Secret Provider Class. The Secret Provider Class creates the link between a remote secret and a Kubernetes volume. It can be referenced as a
volume which can be mounted in a Pod, it can additionally be configured to be written to a Kubernetes Secret. The name of the Secret Provider Class is only used as a reference when creating a module.
The `objects` field contains a list of references to the secret in the secret store. The object name is the name of the secret in for example Azure KeyVault or AWS Secrets Manager.

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

When mounting the Secret Provider Class to a Pod a file will be created with the contents of the secret. The file name will either be the object name or the object alias as specified in the Secret
Provider Class. If a Secret Provider Class has multiple objects, multiple files will be mounted in the Pod. Keep this in mind when creating Secret Provider Classes. Try to only mount the secrets
needed for a Pod instead of creating a large Secret Provider Class which contains all the secrets needed in a namespace. The Pod resulting from the Deployment below (together with the Secret Provider Class) will have two files mounted in it,
`/mnt/secrets-store/bar` and `/mnt/secrets-store/baz`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: foo
spec:
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
        - name: foo
          volumeMounts:
            - name: secret-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
      volumes:
        - name: secret-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: foo
```

Additionally, you may want to have your secrets available as environment variables. Extending the example above, the secret `bar` is now also available as the environment variable `BAR`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: foo
spec:
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
        - name: foo
          volumeMounts:
            - name: secret-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
          env:
            - name: BAR
              valueFrom:
                secretKeyRef:
                  name: bar
                  key: bar
      volumes:
        - name: secret-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: foo
```

Note that even if you only want to access your secret via an environment variable, you still need to mount the secret store as a volume.

## Auto updating secrets

The CSI drivers sits and pools the cloud provider for changes in the secrets defined in your secretProviderClass. Depending on which cloud provider they have different default values.
But the CSI driver only pools the secrets if you have a pod that is actively using the secret defined in the cloud.

This can cause issues if you are using CSI driver in a cronjob and that secret don't have any other long running pods that mounts it.
For example a cronjob that runs for under 2 minutes **is not** guaranteed to get the latest updated secret from the cloud provider.
And even if you have a longer running cronjob that would get a update you would then have to restart that job to make sure that you got the latest secret if someone have updated the secret.

To workaround this issue you have to create a pod that uses the same secret to make sure that the secret is up to date.
All this long running pod needs to do is to mount the secret and sleep.

Below you can find a suggestion on how to that:

```.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: foo
spec:
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
        - name: busybox
          image: busybox:latest
          command: ["/bin/sh", "-c", "--"]
          args: ["while true; do sleep 30; done;"]
          tty: true
          volumeMounts:
            - name: secret-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
          env:
            - name: BAR
              valueFrom:
                secretKeyRef:
                  name: bar
                  key: bar
      volumes:
        - name: secret-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: foo
```

## Cloud Providers

### Azure

The Azure provider for the CSI driver requires some configuration to work, as it is possible to have multiple Azure Key Vaults. For that reason the Secret Provider Class has to specify the name of the
Key Vault and the tenant id where the CSI Driver can find the secret. Additionally it is important to set `usePodIdentity: "true"` as authentication to the Azure API will be done with the help of
AAD Pod Identity.

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: connection-string-test
spec:
  provider: azure
  parameters:
    usePodIdentity: "true"
    keyvaultName: "kvname"
    objects: |
      array:
        - |
          objectName: connectionstring
          objectType: secret
    tenantId: "11111111-1111-1111-1111-111111111111"
```

To use the Secret Provider Class simply mount it as a volume in the Pod where you want to read the secret. The only extra configuration that is required is setting the label `aadpodidbinding` to the
name of the Azure Identity. This is required as the CSI Driver will assume the Pods identity when authenticating with the Azure API. Without this label the fetching of the secret will fail.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: connection-string-test
  namespace: tenant
spec:
  selector:
    matchLabels:
      app: connection-string-test
  template:
    metadata:
      labels:
        app: connection-string-test
        aadpodidbinding: tenant
    spec:
      containers:
        - name: connection-string-test
          image: alpine:latest
          volumeMounts:
            - name: secret-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
      volumes:
        - name: secret-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: connection-string-test
```

### AWS

There are two secret store services in AWS that is supported by the CSI Driver, [AWS Secret Manager](https://aws.amazon.com/secrets-manager/) and [AWS System Manager Parameter
Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html). Both services have their own pros and cons in regards to features and pricing, but in the
end both services deliver the same features in the cluster. The example below shows how to read the secret `application/connection-string-test/connectionstring` with examples for both Secret Manager
and System Manager Parameter Store.

Create an IAM role which gives permission to read the specific secret, note that the full ARN path including the secret name is included in the resource field. This is to limit secret acccess for the
application as there is only a single service instance per account and region. The CSI Driver also requires the `secretsmanager:ListSecrets` permission or `ssm:DescribeParameters` to function
properly. It will not be able to read any secret values with this permission, just list them.

```hcl
data "aws_iam_policy_document" "db_connection_string" {
  statement {
    effect = "Allow"
    actions = [
      "secretsmanager:ListSecrets",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret",
      "secretsmanager:GetResourcePolicy",
      "secretsmanager:ListSecretVersionIds"
    ]
    resources = ["arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:application/connection-string-test/connectionstring"]
  }
}
```

or

```hcl
data "aws_iam_policy_document" "db_connection_string" {
  statement {
    effect = "Allow"
    actions = [
      "ssm:DescribeParameters",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "ssm:GetParameter",
      "ssm:GetParameters",
    ]
    resources = ["arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter/db-*"]
  }
}
```

Complete the configuration by passing the policy document to the IRSA module which will create the IAM policy and role, this should be the same for both Secret Manager and System Manager Parameter
Store.

```hcl
module "irsa_test" {
  source = "github.com/xenitab/terraform-modules//modules/aws/irsa?ref=2021.08.9"

  name = "irsa-test"
  oidc_providers = [
    for v in var.oidc_urls :
    {
      url = v
      arn = aws_iam_openid_connect_provider.this[v].arn
    }
  ]
  kubernetes_namespace       = "tenant"
  kubernetes_service_account = "connection-string-test"
  policy_json                = data.aws_iam_policy_document.get_login_profile.json
}
```

After the IAM role and policy have been created a Secret Provider Class has to be created specifying the secrets that should be read. Make sure to specify the correct object type, it should either be
`secretsmanager` or `ssmparameter`. Note the configuration of `objectAlias` for the object. This is required as the secret name contains the character `/` in the name. By default the CSI Driver uses
the name as the file name, which would cause issues as this is not permitted in Linux. The solution is to give the secret an alias instead.

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: connection-string-test
  namespace: tenant
spec:
  provider: aws
  parameters:
    objects: |
      - objectName: "application/connection-string-test/connectionstring"
        objectType: "secretsmanager" | "ssmparameter"
        objectAlias: "connectionstring"
  secretObjects:
    - data:
        - key: password
          objectName: "connectionstring"
      secretName: connectionstring
      type: Opaque
```

Create a deployment which mounts the secret from the remote service. The secret is mounted as a volume in the Pod and will be populated with the value stored in the remote service. It is important
that the Service Account is configured properly as the CSI Driver will assume the Pod's role when fetching the secret value.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: connection-string-test
  namespace: tenant
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::111111111111:role/connection-string-test
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: connection-string-test
  namespace: tenant
spec:
  selector:
    matchLabels:
      app: connection-string-test
  template:
    metadata:
      labels:
        app: connection-string-test
    spec:
      serviceAccountName: connection-string-test
      containers:
        - name: connection-string-test
          image: alpine:latest
          volumeMounts:
            - name: secret-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
      volumes:
        - name: secret-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: connection-string-test
```

## Automatic Reloading

A Pod will get the latest version of the Secret Provider Class when started. The CSI Driver will poll the secret and update when the secret value is updated. However the Pod will not be
updated as this would require the application to be able to restart the process and read the file instead. The Pod will not receive the new value until a new instance of the Pod is created. This could
become annoying for situations where the secret value may change often or there are a lot of secrets being read.

The solution in XKS is to configure the Secret Provider Class to annotate the Pod to be recreated when the Secret value is updated. The Pod recreation is done with the
[Reloader](https://github.com/stakater/Reloader) project which is present in all XKS clusters. Reloader works by adding an annotation with the key `secret.reloader.stakater.com/reload`, where the value
is the name of the secret. If you need to recreate your Pod when any of multiple secrets are changed, use comma-separated values:

```yaml
secret.reloader.stakater.com/reload: "foo,bar"
```

> When using an object alias the object name in the secrets objects refers to the alias and not to the original object name.

Below is an example of creating a Service Provider Class which also creates a Kubernetes Secret, there is no need to actually use the created secret but in the example below it is mounted as an environment variable.

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: application
  namespace: tenant
spec:
  provider: <provider>
  parameters:
    objects: |
      - objectName: "foo"
        objectType: "<type>"
  secretObjects:
    - data:
        - key: bar
          objectName: foo
      secretName: foo
      type: Opaque
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application
  namespace: tenant
spec:
  selector:
    matchLabels:
      app: application
  template:
    metadata:
      annotations:
        secret.reloader.stakater.com/reload: "foo"
      labels:
        app: application
    spec:
      serviceAccountName: application
      containers:
        - name: application
          image: alpine:latest
          env:
            - name: BAR
              valueFrom:
                secretKeyRef:
                  name: foo
                  key: bar
          volumeMounts:
            - name: secret-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
      volumes:
        - name: secret-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: foo
```

## Troubleshooting

There are a lot of things that can go wrong when configuring Secrets. Here are some pointers for things to check:

### Did you forget to declare the `SecretProviderClass`?

Remember, getting access to your secrets consists of 2 separate parts:

- a `SecretProviderClass`, which tells Kubernetes where it can get the stored secret
- a mount of the provided `secrets-store` for your deployment

### Verifying your loaded YAML

By running `kubectl get secretproviderclasspodstatuses -o yaml` you can get a lot of information about if and how your secrets got correctly loaded. Check here first!
For example, look out to see that all the secrets you expect to see are available, and that they are mounted:

```yaml
status:
  mounted: true
```

### Is your key vault correctly configured, and does the pod have access to it?

Speaking from experience, it is all too easy to setup access to the wrong key vault. If you are accessing the right key vault and you are using Azure, double check that
`usePodIdentity: "true"` is set on the `SecretProviderClass`.

You also need to make sure that the metadata of your deployment's `template` section contains a declaration of which `aadpodidbinding` to use (which is always your tenant's name):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: connection-string-test
  namespace: tenant
spec:
  selector:
    matchLabels:
      app: connection-string-test
  template:
    metadata:
      labels:
        app: connection-string-test
        aadpodidbinding: tenant
```

Please also verify that `aadpodidbinding` is set on the `metadata` section under `template` and not on the root `metadata` section. The latter will not work.

### Are your environment variables correctly set?

If you want to load your secret as an environment variable, remember that it **still needs to be mounted as a volume**. Also, don't forget that it doesn't automatically become available as a
corresponding environment variable, you still need to load it explicitly, like this:

```yaml
env:
  - name: BAR
    valueFrom:
      secretKeyRef:
        name: foo
        key: bar
```

### Are your secret names matching the names in the reloader statement?

If this is not the case, you will see errors when running `kubectl describe <podname>`. A well-behaved reloader will emit events that look like this:

```bash
Normal SecretRotationComplete 4m22s (x889 over 29h) csi-secrets-store-rotation successfully rotated K8s secret <secret-name>
```
