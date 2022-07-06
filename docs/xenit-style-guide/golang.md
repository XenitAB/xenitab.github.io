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

The [ginmetrics](https://github.com/penglongli/gin-metrics) library can be used to export metrics for Prometheus when using the gin HTTP server. The example below sets up a two gin servers, one user-facing on port `8080` and one exposing metrics on port `8081`. Now, after visiting `http://localhost:8080/increment-counter`, the value of `my_counter` can be seen on `http://localhost:8081/metrics` together with some default metrics.

```go
import (
    "github.com/gin-gonic/gin"
    "github.com/penglongli/gin-metrics/ginmetrics"
)

func main() {
    apiRouter := gin.Default()

    // Add a route that increments the counter `my_counter`
    apiRouter.GET("/increment-counter", func(c *gin.Context) {
        _ = ginmetrics.GetMonitor().GetMetric("my_counter").Inc([]string{"label1-value"})
        c.JSON(200, gin.H{"message": "Incremented counter `my_counter`"})
    })

    // Get the global metrics monitor
    monitor := ginmetrics.GetMonitor()

    // Set the metrics path, the default is /debug/metrics
    monitor.SetMetricPath("/metrics")

    // Let the api router use the metrics server without exposing the metrics
    // path on the same port. This is useful to not expose the metrics to the
    // user.
    monitor.UseWithoutExposingEndpoint(apiRouter)

    // Create and add a counter
    counter := &ginmetrics.Metric{
        Type:        ginmetrics.Counter,
        Name:        "my_counter",
        Description: "description of counter",
        Labels:      []string{"label1"},
    }
    monitor.AddMetric(counter)

    // Create a metrics router and add the metric path to it
    metricsRouter := gin.New()
    monitor.Expose(metricsRouter)

    go func() {
        apiRouter.Run("localhost:8080")
    }()

    // Run the metrics server on a separate port
    metricsRouter.Run("localhost:8081")
}
```

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
