---
id: javascript
title: Javascript
---

Javascript and Typescript are mainly used for frontend applications at Xenit.

## Tracing

### Datadog

To trace a frontend application using Datadog as tracing provider, see [Connect RUM (Real User Monitoring) and Traces](https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces?tabs=browserrum). This will inject the trace headers into the HTTP requests which will be propagated to the backend services. Enabling RUM will also insert a user session id into the request that can be used to group multiple traces to one user session.
