---
id: golang
title: Golang
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Golang (Go) is one of the most common languages at Xenit especially for backend systems and open source projects. It should be the first language choice when starting a new project.

## Program Input

Go has a lot of options when parsing program input flags and commands. On top of the standard `flag` library there are a bunch of other options out there that do the one or the other, or both. For this reason it is good to standardize on a library to use at Xenit. The most popular libraries at this time are [cobra](https://github.com/spf13/cobra) and by extension [pflag](https://github.com/spf13/pflag). While these libraries may be popular they also introduce a lot of opinion and complexity to the project structure.

A lightweight alternative is [go-arg](https://github.com/alexflint/go-arg) which offers the same feature set in a less opinionated manner. It offers most features that can be needed such as struct mapping, environment variables, default values, descriptions, short and long form, and argument lists. On top of these features it offers support for subcommands which allows for specific arguments which are only expected for specific subcommands.

All flags are defined in a struct which is then populated with the input args. All configuration of the parsing is done through annotations.

```golang
package main

import (
	"fmt"

	"github.com/alexflint/go-arg"
)

type args struct {
	Id      bool `arg:"-i,--id,env:ID" help:"id input"`
	Verbose bool `arg:"-v,--verbose,env:VERBOSE" default:"true" help:"verbosity level"`
}

func main() {
	a := &args{}
	arg.MustParse(a)
	fmt.Printf("%#v\n", a)
}
```

Subcommands are useful when there are multiple functions that can be called in the same program.

```golang
type CheckoutCmd struct {
	Branch string `arg:"positional"`
	Track  bool   `arg:"-t"`
}
type CommitCmd struct {
	All     bool   `arg:"-a"`
	Message string `arg:"-m"`
}
type PushCmd struct {
	Remote      string `arg:"positional"`
	Branch      string `arg:"positional"`
	SetUpstream bool   `arg:"-u"`
}
var args struct {
	Checkout *CheckoutCmd `arg:"subcommand:checkout"`
	Commit   *CommitCmd   `arg:"subcommand:commit"`
	Push     *PushCmd     `arg:"subcommand:push"`
	Quiet    bool         `arg:"-q"` // this flag is global to all subcommands
}

arg.MustParse(&args)

switch {
case args.Checkout != nil:
	fmt.Printf("checkout requested for branch %s\n", args.Checkout.Branch)
case args.Commit != nil:
	fmt.Printf("commit requested with message \"%s\"\n", args.Commit.Message)
case args.Push != nil:
	fmt.Printf("push requested from %s to %s\n", args.Push.Branch, args.Push.Remote)
}
```

Refer to the [API Documentation](https://pkg.go.dev/github.com/alexflint/go-arg) for more detailed information.

## HTTP

Go has a standard library which includes an HTTP server, but it usually does not fulfill all requirements. For this reason the preferred HTTP library to be used at Xenit is [go-gin](https://github.com/gin-gonic/gin). It provides certain extensions such as path parameters and middleware which developers are accustomed to in other programming languages.

## Logging

To log all requests that are done to a gin HTTP server, the [ginlogr](https://github.com/alron/ginlogr) middleware can be used, see example code below. It is unfortunately not possible to configure the fields that `ginlogr` logs.

```go
// Taken from https://github.com/alron/ginlogr
func main() {
    r := gin.New()
    // We use zap and zapr here, but you can really use any of the loggers
    // supported by logr
    zl, _ := zap.NewProduction()
    logger := zapr.NewLogger(zl)

    // Add a ginlogr middleware, which:
    //   - Logs all requests, like a combined access and error log.
    //   - Logs to stdout.
    //   - RFC3339 with UTC time format.
    r.Use(ginlogr.Ginlogr(logger, time.RFC3339, true))

    // Logs all panic to error log
    //   - RFC3389 with UTC time format.
    //   - stack means whether output the stack info.
    r.Use(ginlogr.RecoveryWithLogr(logger, time.RFC3339, true, true))

    // Example ping request.
    r.GET("/ping", func(c *gin.Context) {
        c.String(200, "pong "+fmt.Sprint(time.Now().Unix()))
    })

    // Example when panic happen.
    r.GET("/panic", func(c *gin.Context) {
        panic("An unexpected error happen!")
    })

    // Listen and Server in 0.0.0.0:8080
    r.Run(":8080")
}
```

### Datadog

Using the `status` field when logging can interfere with how Datadog interprets the severity of the log. If you have a log with fields `status = 400` and `level = error`, then Datadog reports this as an info log. If you use another field for the status code, for example `http_response.status_code`, together with `level = error`, Datadog will report it as an error log. You can read more about the `status` field and other reserved log fields in Datadog [here](https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes).

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

### Connect logs and traces

To connect logs and traces, log the span id of the current span. An example of a custom gin middleware logger that uses Datadog as tracing provider is shown below. It adds a `dd` field that holds the trace and span id. Read more on how to connect logs and traces in Datadog [here](https://docs.datadoghq.com/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom&tabs=custom).

```go
type span struct {
    SpanID  uint64 `json:"span_id"`
    TraceID uint64 `json:"trace_id"`
}

func getSpan(c *gin.Context) span {
    span, _ := tracer.SpanFromContext(c.Request.Context())
    return span{
        SpanID: span.Context().SpanID(),
        TraceID: span.Context().TraceID(),
    }
}

func ginlogrWithSpan(logger logr.Logger) gin.HandlerFunc {
    return func(c *gin.Context) {
        path := c.Request.URL.Path
        span := getSpan()
        // Extract other values to log
        // ...

        logger.Info(path,
            // Other fields
            // ...
            "dd", span,
        )
    }
}
```
