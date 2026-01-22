---
id: golang
title: Golang
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Golang (Go) is one of the most common languages at Xenit especially for backend systems and open source projects. It should be the first language choice when starting a new project.

## Shared Library

Some code may be best to share between multiple repositories. These shared packages should be stored in [pkg](https://github.com/xenitAB/pkg).

## Startup and Shutdown

It may seem a bit nit picky to document how a program should startup and shutdown, but it is necissary as there are a lot of resources like blogs which offer a multitude of solutions how it could be implemented. Doing this properly is important to make sure that all incoming messages such as HTTP requests and processed before shutting down, the alternative would be to cancel HTTP request without responding to them. There are generally two event soures which cause a shutdown, either an internal error which requires the program shutdown or an [external signal](https://pkg.go.dev/os/signal) notifying the program to shut down.

In a lot of cases a program may run multiple go routines simultaneously, and example of this would be running both the buisness logic HTTP server and the HTTP server that is serving metrics. All of these would need to be gracefully stopped and also cause a graceful shutdown in case of an error. The [errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup) package offers a solution to this problem by wrapping the go routines with an error handler which cancels a context when one of the go routines returns an error.

```go
package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"time"

	"golang.org/x/sync/errgroup"
)

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()
	g, ctx := errgroup.WithContext(ctx)

	g.Go(func() error {
		<-ctx.Done()
		fmt.Println("completed 1")
		return nil
	})
	g.Go(func() error {
		var err error
		select {
		case <-ctx.Done():
		case <-time.After(5 * time.Second):
			err = fmt.Errorf("example timeout error")
		}
		fmt.Println("completed 2")
		return err
	})
	g.Go(func() error {
		<-ctx.Done()
		fmt.Println("completed 3")
		return nil
	})

	fmt.Println("running")
	if err := g.Wait(); err != nil {
		fmt.Printf("stopped with error: %v\n", err)
		os.Exit(1)
		return
	}
	fmt.Println("stopped without error")
}
```

All of the go routines will run at the same time. The program can be stopped with two methods. Either it runs for 5 seconds and the second go routine will return an error, or a signal will stop the program before the error is returned. Either way the context will be cancelled causing all of the go routines to run to completion. When this occurs the `Wait()` call returns wither with the error returned from one of the go routines or nil. This logic may seem complicated but is with the help of error groups simple to implement.

A general good practice when building programs with multiple go routines is to allow the error group to manage the go routine. This means that all functions when possible should be blocking and should not implement there own threading and error handling. Instead if possible the functions should accept a context as a parameter and listen to the returned done channel. This increases testability of individual components while simplifying logic and decreasing risks of improper shutdowns and orphande go routines.

## Program Input

Go has a lot of options when parsing program input flags and commands. On top of the standard `flag` library there are a bunch of other options out there that do the one or the other, or both. For this reason it is good to standardize on a library to use at Xenit. The most popular libraries at this time are [cobra](https://github.com/spf13/cobra) and by extension [pflag](https://github.com/spf13/pflag). While these libraries may be popular they also introduce a lot of opinion and complexity to the project structure.

A lightweight alternative is [go-arg](https://github.com/alexflint/go-arg) which offers the same feature set in a less opinionated manner. It offers most features that can be needed such as struct mapping, environment variables, default values, descriptions, short and long form, and argument lists. On top of these features it offers support for subcommands which allows for specific arguments which are only expected for specific subcommands.

All flags are defined in a struct which is then populated with the input args. All configuration of the parsing is done through annotations.

```go
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

```go
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

## Logging

The options when logging with Go is usual many and opinionated, they depend on the required output format or how variables are passed. Currently the best compromise out there is [logr](https://github.com/go-logr/logr) which is a logging interface compatible with a lot of logging libraries. This means that the logging library can easily be replaced in the future without having to refactor the whole code base. A main feature of logr is that it supports structured logging, which means that parameters can easily be passed with the log message in a structured manner.  

:::caution
Using the `status` field when logging can interfere with how Datadog interprets the severity of the log. If you have a log with fields `status = 400` and `level = error`, then Datadog reports this as an info log. If you use another field for the status code, for example `http_response.status_code`, together with `level = error`, Datadog will report it as an error log. You can read more about the `status` field and other reserved log fields in [Datadog's reserved attributes documentation](https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes).
:::

Unless there are any other requirements it is good to use the [zapr](https://github.com/go-logr/zapr) logger. Zapr is fast and will output logs as JSON.

```go
package main

import (
	"context"
	"fmt"

	"github.com/go-logr/logr"
	"github.com/go-logr/zapr"
	"go.uber.org/zap"
)

func main() {
	zapLog, err := zap.NewProduction()
	if err != nil {
		panic(fmt.Sprintf("who watches the watchmen (%v)?", err))
	}
	log := zapr.NewLogger(zapLog)
	log.Info("Logr in action!", "the answer", 42)
}
```

The logging object should be passed through the context when calling a function that needs to log. This removes the need to add an additional parameter that needs to be tracked.

```go
ctx := logr.NewContext(context.Background(), log)
run(ctx)

func run(ctx context.Context) {
	log := logr.FromContextOrDiscard(ctx)
	log.Info("running function")
}
```

## Metrics

The [Prometheus Go client](https://prometheus.io/docs/guides/go-application/) contains packages which help instrumenting a project with metrics. The `promhttp` package help expose these metrics through an HTTP handler. Programs should expose their metrics through the path `/metrics`. It is important to **NOT** add the metrics handler to an existing HTTP server if one already exists. Metrics should be served on its own address that is not used by the buisness logic. This is to avoid exposing metrics, which should not but could, contain sensitive information to the public. The `promauto` package allows registering of new metrics in a Go native method.

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"golang.org/x/sync/errgroup"

	"github.com/alexflint/go-arg"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	opsProcessed = promauto.NewCounter(prometheus.CounterOpts{
		Name: "processed_ops_total",
		Help: "The total number of processed events",
	})
)

type arguments struct {
	MetricsAddr string `arg:"--metrics-addr" default:":9090"`
}

func main() {
	args := &arguments{}
	arg.MustParse(args)

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()
	g, ctx := errgroup.WithContext(ctx)

	mux := http.NewServeMux()
	mux.Handle("/metrics", promhttp.Handler())
	srv := &http.Server{
		Addr:    args.MetricsAddr,
		Handler: mux,
	}
	g.Go(func() error {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			return err
		}
		return nil
	})
	g.Go(func() error {
		<-ctx.Done()
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		return srv.Shutdown(shutdownCtx)
	})

	g.Go(func() error {
		for {
			select {
			case <-ctx.Done():
				return nil
			case <-time.After(2 * time.Second):
				opsProcessed.Inc()
			}

		}
	})

	if err := g.Wait(); err != nil {
		fmt.Printf("stopped with error: %v\n", err)
		os.Exit(1)
		return
	}
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

To connect logs and traces, log the span id of the current span. An example of a custom gin middleware logger that uses Datadog as tracing provider is shown below. It adds a `dd` field that holds the trace and span id. Read more on how to connect logs and traces in [Datadog's trace correlation documentation](https://docs.datadoghq.com/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom&tabs=custom).

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

## HTTP

The Go standard library includes a http package that works well for simple applications, but requires a lot of custom code when building larger projects. While it is fine to just use the standard library for simple applications it is preferable to switch to [Gin](https://github.com/gin-gonic/gin) as project feature requirements develop. Gin provides extra functionality and extensions to simplify things like parsing parameters in the URL path and endpoint authorization.

The HTTP server should be started and stopped in accordance to the Startup and Shutdown documentation. The HTTP server should be gracefully stopped before the program exits to make sure that all in flight requests are processed.

It is highly recommended to use the default Gin router from [Xenit Gin PKG](https://github.com/XenitAB/pkg/tree/main/gin). It sets up default midleware such as logging and metrics which all applications should configure. The option to extend additional functionality is still possible but it removes the need to think about the best practices.

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"golang.org/x/sync/errgroup"

	"github.com/alexflint/go-arg"
	"github.com/gin-gonic/gin"
	"github.com/go-logr/zapr"
	"go.uber.org/zap"
	pkggin "github.com/xenitab/pkg/gin"
)

type arguments struct {
	Addr string `arg:"--addr" default:":8080"`
}

func main() {
	args := &arguments{}
	arg.MustParse(args)
	
  zapLog, err := zap.NewProduction()
	if err != nil {
		panic(fmt.Sprintf("who watches the watchmen (%v)?", err))
	}
	log := zapr.NewLogger(zapLog)

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()
	g, ctx := errgroup.WithContext(ctx)

  router := pkggin.Default(logger)
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	srv := &http.Server{
		Addr:    args.Addr,
		Handler: router,
	}
	g.Go(func() error {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			return err
		}
		return nil
	})
	g.Go(func() error {
		<-ctx.Done()
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		return srv.Shutdown(shutdownCtx)
	})

	fmt.Println("running")
	if err := g.Wait(); err != nil {
		fmt.Printf("stopped with error: %v\n", err)
		os.Exit(1)
		return
	}
	fmt.Println("stopped without error")
}
```
