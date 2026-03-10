---
id: best-practices
title: Best Practices
---

This page aims to collect best practices and common mistakes that can be made while using XKF. It's meant to be used as the quick summary when you are lacking in time.

If you follow these guidlines, you will most likely have a well running application in the general case.

We segment our best practices into two parts. The first regards general philosophies you should adhere to when developing your applications.
The second is a checklist you should check make sure you satisfy before bringing your application to production.

## Development Philosophy in XKF

This segment provides a summay of things one should consider while developing applications in XKF.

- **Cattle not Pets**

  In contemporary software systems it is common to say that you should treat components of your systems as cattle, not pets. In the case of Kubernetes this relates to the fact that a pod may be restarted at arbitrary times or a node can be rotated. To be cloud native means to accomodate for this. This is discussed at length in other places in our documentation, but it is worthwhile to always think: _What happens in my application if the pod is restarted?_

- **Run more than one replica in all environments**

  Unless you have a special case you should run your application as more than one replica, even in non production environments. Apart from the more obvious fact that you get higher availability, it will help you catch bugs related to concurrency earlier. For example, if your application writes to a database and you want high availability in your production environment, add high availability to your non production environments as well. If you have a bug, e.g. some bad transactional logic in your application it is better to expose this bug in non production environments as well.

- **Crash on unrecoverable errors**

  Since it is easy to create new pods in Kubernetes it is better to just crash and start from a well defined state if your application encounters errors that are not recoverable.

# Production Readiness checklist

Please consider the following items before bringing your application to production. There exist a multitute of situations where items from this checklist does not make sense, but we strongly recommend that you at least consider every item in order to have as stable and well behaving applications as possible.

## Read language specific docs

Xenit provides some language specific documentation, e.g. [Xenit's Golang style guide](https://xenitab.github.io/docs/xenit-style-guide/golang) or [Xenit's Javascript/Typescript style guide](https://xenitab.github.io/docs/xenit-style-guide/javascript). These are summaries of experiences we have gathered while running production applications in XKF.

## Readiness/Liveness probes

Good probes are important if you want stable applications. They help with error reporting, but in our experience, they are the most important when you deploy new versions.

The short summary follows,

1. Liveness probes are too powerful and in most situations you do not want them.
2. You most likely want a basic readiness probe. This readiness probe should probably not involve other applications as this can lead to thundering herd problems. An endpoint that answers with **200** on **/healthz** on your http server for your application is a very good start.

Your mileage may vary and only you can know what it means for your application to be ready to receive traffic. Consider reading [livenes probes are dangerous](https://srcco.de/posts/kubernetes-liveness-probes-are-dangerous.html) as it provides a more nuanced discussion when and where you want to use liveness/readiness probes.

## Incoming HTTP

TODO

## Outgoing HTTP

TODO

## Graceful Shutdown

Your pod can be shut down by kubernetes. Make sure you capture sigterm and act reasonably on the signal. What reasonable is depends on you application, but a common case is to finish handling all ongoing http-requests as well as closing connections cleanly to databases and external services.

## Observability and Telemetry

Make sure you have set up sufficient observability tools for your application. What this means depends on context. At Xenit we have found that the following provides a good start.

### Logs

1. Log the correct amount. This usually means one info log per "thing that happened". If you add too much you will never find the log you are looking for.
2. Always add context to logs. A log should always be related to the entity that was affected. If you don't add this information the log is just noise and will never help you find issues in the future.
3. Assume things work and mostly log errors. We have found that most info logs are just a poor man's implementation of metrics and traces. The ideal log is the log that immediately tells you what is wrong with the system. If you can get away with not logging something, consider doing so.
4. Consider disabling HTTP request logging for non error http requests. We have found that it is common to add a general http log on top of every application. If you have a lot of traffic this will mean a lot of logs. How useful is it really to log that someone made a succesful _GET_ request to a certain endpoint?

### Metrics

Metrics is also a nuanced topic that depends on your context. However, it is usually a good idea to add the so called **RED** metrics to your application. **RED** stand for _Rate_, _Errors_, and _Duration_. We have found that measuring the rate of incoming requests, the rate of them erroring and the time it takes to execute them provides a very good baseline for knowing how your applications are doing.

Consider reading our extended [extended documentation on metrics](https://xenitab.github.io/docs/xks/developer-guide/observability).

### Traces

Add tracing to your application. We have found that modern trace tools provide pretty good configuration out of the box. You just need to add an appropriate tracing library to your application. Consider reading our extended [extended documentation on tracing](https://xenitab.github.io/docs/xks/developer-guide/observability).

## Pod disruption budgets

Make sure you have written a pod disruption budget. Otherwise you will have problems with downtime when a node rotates. This is extensively documented [here](https://xenitab.github.io/docs/xks/developer-guide/scheduling-scaling#pod-disruption-budget).

## Network Policies

Configure network policies. No network policy is needed if your application only communicates inside namespace. However, if you want network traffic across namespaces, you need to configure network policies. It is documented extensively [here](https://xenitab.github.io/docs/xks/developer-guide/networking).

## Resources and Scaling

Make sure you have written reasonable resource requests and limits. It is extensively documented [here](https://xenitab.github.io/docs/xks/developer-guide/scheduling-scaling#pod-resources).

## Secret Management & External Resources

If you communicate with things outside of your namespace, i.e. databases and such make you have checked the following.

1. Make sure no secrets are commited to either source code repository, nor gitops repository.
2. We recommend using MSI (Managed Service Identity) to provide an identity for your pods. Documentation can be found [here](https://xenitab.github.io/docs/xks/developer-guide/cloud-iam). It's okay to get secrets from Cloud provider key vault solutions as well.
3. How you load secrets is very specific for your own application. However, we have used and documented Secret Store CSI Driver. Documentation can be found [here](https://xenitab.github.io/docs/xks/developer-guide/secrets-management).

## Documentation

Is everything documented to a sufficient level? If the whole team would quit tomorrow, could someone take over the application with as little friction as possible?

## Further reading

This documentation provides bare minimum for making a production ready kubernetes application. Consider reading the following for further understanding,

1. [Production checklist](https://srcco.de/posts/web-service-on-kubernetes-production-checklist-2019.html)
