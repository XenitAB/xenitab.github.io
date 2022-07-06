---
id: golang
title: Golang
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Golang (Go) is one of the most common languages at Xenit especially for backend systems and open source projects. It should be the first language choice when starting a new project.

## HTTP

Go has a standard library which includes an HTTP server, but it usually does not fulfill all requirements. For this reason the preferred HTTP library to be used at Xenit is [go-gin](https://github.com/gin-gonic/gin). It provides certain extensions such as path parameters and middleware which developers are accustomed to in other programming languages.

## Logging

```go
func main() {


}
```

## Metrics

## Configuration

## Tracing

To trace a request, HTTP headers carrying trace information are extracted from and injected into the request as it propagates through the microservices. A trace is made up of one or more spans. At the start of a request, a trace id is generated, which is the same for all spans, and a root span. For each service the request passes through, a new span is started as a child of the calling span.

<img alt="Tracing example" src={useBaseUrl("img/assets/xenit-style-guide/tracing-example.jpg")} />

### Datadog

The middleware to use depends on the tracing provider. The main thing that differs between the providers is the HTTP headers to use. The examples below uses [Datadog](https://github.com/DataDog/dd-trace-go). Datadog's default HTTP headers for trace and span id's are X-Datadog-Trace-Id and X-Datadog-Parent-Id.

First, start the tracer.

```go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start()
    defer tracer.Stop()
}
```

Then, add the middleware that extracts and injects the tracing headers. The example below uses middleware for [gin](https://github.com/DataDog/dd-trace-go/tree/main/contrib/gin-gonic/gin).

```go
import (
    gintrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin"
    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.New()
    router.Use(gintrace.Middleware("my-service-name"))
}
```

To add tracing for other http frameworks and libraries, see [Go Compatibility Requirements](https://docs.datadoghq.com/tracing/setup_overview/compatibility_requirements/go/#compatibility).

It is recommended to use [Datadog's Unified Service Tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tabs=kubernetes), to tag the traces with the environment where the service is run and its name and version. These variables can be set when calling `tracer.Start()` or as environment variables.
