---
id: ingress
title: Ingress
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Certificates

## Ingress

The XKS service comes pre configured with external dns, cert manager and the nginx ingress controller to provide a secure method for external traffic to reach applications in the
Kubernetes cluster. The three projects work together to enable automatic DNS configuration, certificate provisioning and traffic routing. Below is an example of a ingress resource
which configures securet HTTPS ingress.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: foo
  namespace: bar
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: foo.dev.example.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: http
  tls:
    - hosts:
      - foo.dev.example.com
```

It is useful to be aware of [annotation configuration](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#annotations) in the nginx ingress controller.
Sometimes a specific ingress requires custom behavior that is not default in the ingress controller, this behavior can be customized with the help of annotations for a specific ingress resource.
For example changing the client body buffer size may be useful if the header size in a request is larger than the buffer.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: foo
  namespace: bar
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/client-body-buffer-size: 1M
spec:
  rules:
  - host: foo.dev.example.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: http
  tls:
    - hosts:
      - foo.dev.example.com
```
