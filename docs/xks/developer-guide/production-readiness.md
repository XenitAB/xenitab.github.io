---
id: production-readiness
title: Production Readiness
---

## Kubernetes

* HPA is used
* More than one replica is required
* Pod disruption budget is configured
* Readiness probe is configured
* Liveness probe is not the same as readiness probe
* Running as non-root user
* Resource requests and limtis are configured
* CPU limits are not used if not required
* Image tag is not blank or latest
* Image pull policy IfNotPresent
* Priority class is set
* All Ingress resources have TLS enabled
* Pod anti afinity is configured properly
* Secrets come from CSI


## Applications

* Http timeouts are set
* Http retries are used with backoff
* Application crashes after fatal error
* graceful shutdown

## Monitoring

