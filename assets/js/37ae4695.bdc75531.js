"use strict";(self.webpackChunkhome=self.webpackChunkhome||[]).push([[435],{3905:function(e,t,n){n.d(t,{Zo:function(){return g},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},g=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,g=s(e,["components","mdxType","originalType","parentName"]),p=l(n),u=a,h=p["".concat(c,".").concat(u)]||p[u]||d[u]||o;return n?r.createElement(h,i(i({ref:t},g),{},{components:n})):r.createElement(h,i({ref:t},g))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8515:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return g},toc:function(){return d},default:function(){return u}});var r=n(3117),a=n(102),o=(n(7294),n(3905)),i=n(4996),s=["components"],c={id:"golang",title:"Golang"},l=void 0,g={unversionedId:"xenit-style-guide/golang",id:"xenit-style-guide/golang",title:"Golang",description:"Golang (Go) is one of the most common languages at Xenit especially for backend systems and open source projects. It should be the first language choice when starting a new project.",source:"@site/docs/xenit-style-guide/golang.md",sourceDirName:"xenit-style-guide",slug:"/xenit-style-guide/golang",permalink:"/docs/xenit-style-guide/golang",editUrl:"https://github.com/xenitab/xenitab.github.io/edit/main/docs/xenit-style-guide/golang.md",tags:[],version:"current",frontMatter:{id:"golang",title:"Golang"},sidebar:"docs",previous:{title:"Containers",permalink:"/docs/xenit-style-guide/containers"},next:{title:"Javascript",permalink:"/docs/xenit-style-guide/javascript"}},d=[{value:"HTTP",id:"http",children:[],level:2},{value:"Logging",id:"logging",children:[{value:"Datadog",id:"datadog",children:[],level:3}],level:2},{value:"Metrics",id:"metrics",children:[],level:2},{value:"Configuration",id:"configuration",children:[],level:2},{value:"Tracing",id:"tracing",children:[{value:"Datadog",id:"datadog-1",children:[],level:3},{value:"Connect logs and traces",id:"connect-logs-and-traces",children:[],level:3}],level:2}],p={toc:d};function u(e){var t=e.components,n=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Golang (Go) is one of the most common languages at Xenit especially for backend systems and open source projects. It should be the first language choice when starting a new project."),(0,o.kt)("h2",{id:"http"},"HTTP"),(0,o.kt)("p",null,"Go has a standard library which includes an HTTP server, but it usually does not fulfill all requirements. For this reason the preferred HTTP library to be used at Xenit is ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/gin-gonic/gin"},"go-gin"),". It provides certain extensions such as path parameters and middleware which developers are accustomed to in other programming languages."),(0,o.kt)("h2",{id:"logging"},"Logging"),(0,o.kt)("p",null,"To log all requests that are done to a gin HTTP server, the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/alron/ginlogr"},"ginlogr")," middleware can be used, see example code below. It is unfortunately not possible to configure the fields that ",(0,o.kt)("inlineCode",{parentName:"p"},"ginlogr")," logs."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'// Taken from https://github.com/alron/ginlogr\nfunc main() {\n    r := gin.New()\n    // We use zap and zapr here, but you can really use any of the loggers\n    // supported by logr\n    zl, _ := zap.NewProduction()\n    logger := zapr.NewLogger(zl)\n\n    // Add a ginlogr middleware, which:\n    //   - Logs all requests, like a combined access and error log.\n    //   - Logs to stdout.\n    //   - RFC3339 with UTC time format.\n    r.Use(ginlogr.Ginlogr(logger, time.RFC3339, true))\n\n    // Logs all panic to error log\n    //   - RFC3389 with UTC time format.\n    //   - stack means whether output the stack info.\n    r.Use(ginlogr.RecoveryWithLogr(logger, time.RFC3339, true, true))\n\n    // Example ping request.\n    r.GET("/ping", func(c *gin.Context) {\n        c.String(200, "pong "+fmt.Sprint(time.Now().Unix()))\n    })\n\n    // Example when panic happen.\n    r.GET("/panic", func(c *gin.Context) {\n        panic("An unexpected error happen!")\n    })\n\n    // Listen and Server in 0.0.0.0:8080\n    r.Run(":8080")\n}\n')),(0,o.kt)("h3",{id:"datadog"},"Datadog"),(0,o.kt)("p",null,"Using the ",(0,o.kt)("inlineCode",{parentName:"p"},"status")," field when logging can interfere with how Datadog interprets the severity of the log. If you have a log with fields ",(0,o.kt)("inlineCode",{parentName:"p"},"status = 400")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"level = error"),", then Datadog reports this as an info log. If you use another field for the status code, for example ",(0,o.kt)("inlineCode",{parentName:"p"},"http_response.status_code"),", together with ",(0,o.kt)("inlineCode",{parentName:"p"},"level = error"),", Datadog will report it as an error log. You can read more about the ",(0,o.kt)("inlineCode",{parentName:"p"},"status")," field and other reserved log fields in Datadog ",(0,o.kt)("a",{parentName:"p",href:"https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes"},"here"),"."),(0,o.kt)("h2",{id:"metrics"},"Metrics"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/penglongli/gin-metrics"},"ginmetrics")," library can be used to export metrics for Prometheus when using the gin HTTP server. The example below sets up a two gin servers, one user-facing on port ",(0,o.kt)("inlineCode",{parentName:"p"},"8080")," and one exposing metrics on port ",(0,o.kt)("inlineCode",{parentName:"p"},"8081"),". Now, after visiting ",(0,o.kt)("inlineCode",{parentName:"p"},"http://localhost:8080/increment-counter"),", the value of ",(0,o.kt)("inlineCode",{parentName:"p"},"my_counter")," can be seen on ",(0,o.kt)("inlineCode",{parentName:"p"},"http://localhost:8081/metrics")," together with some default metrics."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'import (\n    "github.com/gin-gonic/gin"\n    "github.com/penglongli/gin-metrics/ginmetrics"\n)\n\nfunc main() {\n    apiRouter := gin.Default()\n\n    // Add a route that increments the counter `my_counter`\n    apiRouter.GET("/increment-counter", func(c *gin.Context) {\n        _ = ginmetrics.GetMonitor().GetMetric("my_counter").Inc([]string{"label1-value"})\n        c.JSON(200, gin.H{"message": "Incremented counter `my_counter`"})\n    })\n\n    // Get the global metrics monitor\n    monitor := ginmetrics.GetMonitor()\n\n    // Set the metrics path, the default is /debug/metrics\n    monitor.SetMetricPath("/metrics")\n\n    // Let the api router use the metrics server without exposing the metrics\n    // path on the same port. This is useful to not expose the metrics to the\n    // user.\n    monitor.UseWithoutExposingEndpoint(apiRouter)\n\n    // Create and add a counter\n    counter := &ginmetrics.Metric{\n        Type:        ginmetrics.Counter,\n        Name:        "my_counter",\n        Description: "description of counter",\n        Labels:      []string{"label1"},\n    }\n    monitor.AddMetric(counter)\n\n    // Create a metrics router and add the metric path to it\n    metricsRouter := gin.New()\n    monitor.Expose(metricsRouter)\n\n    go func() {\n        apiRouter.Run("localhost:8080")\n    }()\n\n    // Run the metrics server on a separate port\n    metricsRouter.Run("localhost:8081")\n}\n')),(0,o.kt)("h2",{id:"configuration"},"Configuration"),(0,o.kt)("h2",{id:"tracing"},"Tracing"),(0,o.kt)("p",null,"To trace a request, HTTP headers carrying trace information are extracted from and injected into the request as it propagates through the microservices. A trace is made up of one or more spans. At the start of a request, a trace id is generated, which is the same for all spans, and a root span. For each service the request passes through, a new span is started as a child of the calling span."),(0,o.kt)("img",{alt:"Tracing example",src:(0,i.Z)("img/assets/xenit-style-guide/tracing-example.jpg")}),(0,o.kt)("h3",{id:"datadog-1"},"Datadog"),(0,o.kt)("p",null,"The middleware to use depends on the tracing provider. The main thing that differs between the providers is the HTTP headers to use. The examples below uses ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/DataDog/dd-trace-go"},"Datadog"),". Datadog's default HTTP headers for trace and span id's are X-Datadog-Trace-Id and X-Datadog-Parent-Id."),(0,o.kt)("p",null,"First, start the tracer."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"\n\nfunc main() {\n    tracer.Start()\n    defer tracer.Stop()\n}\n')),(0,o.kt)("p",null,"Then, add the middleware that extracts and injects the tracing headers. The example below uses middleware for ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/DataDog/dd-trace-go/tree/main/contrib/gin-gonic/gin"},"gin"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'import (\n    gintrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    router := gin.New()\n    router.Use(gintrace.Middleware("my-service-name"))\n}\n')),(0,o.kt)("p",null,"To add tracing for other http frameworks and libraries, see ",(0,o.kt)("a",{parentName:"p",href:"https://docs.datadoghq.com/tracing/setup_overview/compatibility_requirements/go/#compatibility"},"Go Compatibility Requirements"),"."),(0,o.kt)("p",null,"It is recommended to use ",(0,o.kt)("a",{parentName:"p",href:"https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tabs=kubernetes"},"Datadog's Unified Service Tagging"),", to tag the traces with the environment where the service is run and its name and version. These variables can be set when calling ",(0,o.kt)("inlineCode",{parentName:"p"},"tracer.Start()")," or as environment variables."),(0,o.kt)("h3",{id:"connect-logs-and-traces"},"Connect logs and traces"),(0,o.kt)("p",null,"To connect logs and traces, log the span id of the current span. An example of a custom gin middleware logger that uses Datadog as tracing provider is shown below. It adds a ",(0,o.kt)("inlineCode",{parentName:"p"},"dd")," field that holds the trace and span id. Read more on how to connect logs and traces in Datadog ",(0,o.kt)("a",{parentName:"p",href:"https://docs.datadoghq.com/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom&tabs=custom"},"here"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'type span struct {\n    SpanID  uint64 `json:"span_id"`\n    TraceID uint64 `json:"trace_id"`\n}\n\nfunc getSpan(c *gin.Context) span {\n    span, _ := tracer.SpanFromContext(c.Request.Context())\n    return span{\n        SpanID: span.Context().SpanID(),\n        TraceID: span.Context().TraceID(),\n    }\n}\n\nfunc ginlogrWithSpan(logger logr.Logger) gin.HandlerFunc {\n    return func(c *gin.Context) {\n        path := c.Request.URL.Path\n        span := getSpan()\n        // Extract other values to log\n        // ...\n\n        logger.Info(path,\n            // Other fields\n            // ...\n            "dd", span,\n        )\n    }\n}\n')))}u.isMDXComponent=!0}}]);