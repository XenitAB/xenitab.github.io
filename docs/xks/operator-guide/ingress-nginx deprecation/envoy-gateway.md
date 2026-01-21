---
id: envoy-gateway
title: Envoy Gateway
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview

[Envoy Gateway](https://gateway.envoyproxy.io/) is XKS's implementation of the Kubernetes Gateway API, providing a powerful and performant ingress solution built on [Envoy Proxy](https://www.envoyproxy.io/). Envoy Gateway combines the maturity and capabilities of Envoy with a Kubernetes-native control plane designed specifically for the Gateway API.

## Why Envoy Gateway?

### Modern Cloud-Native Architecture

Envoy Proxy was designed from the ground up for cloud-native environments:

- **Dynamic Configuration**: Updates configuration without reloading or dropping connections, ensuring zero-downtime changes
- **API-Driven**: Controlled via xDS (Discovery Service) APIs, enabling sophisticated runtime traffic management
- **High Performance**: Optimized for high-throughput, low-latency scenarios with efficient resource utilization
- **Battle-Tested**: Powers major platforms including AWS App Mesh, Google Traffic Director, and is the data plane for most service meshes

### Native Gateway API Support

Envoy Gateway is purpose-built to implement the Gateway API specification:

- **First-Class Support**: All Gateway API resources map directly to Envoy's native capabilities
- **Clean Architecture**: Clear separation between control plane (Envoy Gateway) and data plane (Envoy Proxy)
- **Specification Compliance**: Regular updates aligned with Gateway API releases and standards
- **No Translation Layer**: Features work natively without annotation-based workarounds

### Advanced Traffic Management

Envoy provides sophisticated Layer 7 capabilities out of the box:

- **Circuit Breaking**: Protect services from cascading failures with configurable thresholds
- **Intelligent Retries**: Fine-grained retry policies with exponential backoff and budget controls
- **Load Balancing**: Multiple algorithms including round-robin, least request, ring hash, and maglev
- **Health Checking**: Active and passive health checks with customizable intervals and thresholds
- **Rate Limiting**: Both local (per-instance) and global (distributed) rate limiting strategies

### Superior Observability

Observability is built into Envoy's core, not bolted on:

- **Rich Metrics**: Detailed statistics for requests, connections, clusters, and more via Prometheus
- **Distributed Tracing**: Native support for Jaeger, Zipkin, and OpenTelemetry
- **Structured Logging**: Comprehensive access logs with customizable formats
- **Admin Interface**: Real-time debugging and configuration inspection via HTTP API

### Service Mesh Integration

Envoy is the data plane of choice for major service mesh implementations:

- **Istio**: Uses Envoy for both ingress gateways and service mesh
- **Linkerd**: Supports Envoy as an alternative data plane
- **Consul Connect**: Uses Envoy for service-to-service communication
- **AWS App Mesh**: Built entirely on Envoy

Using Envoy Gateway provides a unified architecture if you adopt a service mesh in the future.

### Extensibility

Envoy's filter architecture enables powerful extensions:

- **WASM Filters**: Write custom logic in multiple languages (Rust, Go, C++, AssemblyScript)
- **External Authorization**: Integrate with external auth services via gRPC/HTTP
- **Custom Filters**: Native Envoy filters for advanced use cases
- **Rate Limit Service**: Pluggable external rate limiting service

## Architecture

<img alt="Envoy Gateway Architecture" src={useBaseUrl("img/assets/xks/developer-guide/envoy-gateway-architecture.jpg")} />

Envoy Gateway consists of two main components:

### Control Plane

The Envoy Gateway control plane:
- Watches Gateway API resources (Gateway, HTTPRoute, etc.)
- Translates them into Envoy xDS configuration
- Manages Envoy Proxy deployments
- Handles certificate lifecycle via integration with Cert Manager

### Data Plane

The Envoy Proxy data plane:
- Receives dynamic configuration from the control plane
- Routes and processes traffic based on configuration
- Reports metrics and traces
- Performs health checking and load balancing

## Configuration

### BackendTrafficPolicy

BackendTrafficPolicy configures how traffic is handled between the Gateway and backend services.

#### Rate Limiting

Local rate limiting (per Envoy instance):

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: rate-limit-policy
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  rateLimit:
    type: Local
    local:
      rules:
        - clientSelectors:
            - headers:
                - name: x-user-id
                  type: Distinct
          limit:
            requests: 100
            unit: Minute
```

Global rate limiting (distributed across all instances):

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: global-rate-limit
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  rateLimit:
    type: Global
    global:
      rules:
        - clientSelectors:
            - sourceCIDR:
                type: Distinct
          limit:
            requests: 10000
            unit: Hour
```

#### Load Balancing

Configure load balancing algorithm:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: load-balancer
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  loadBalancer:
    type: ConsistentHash
    consistentHash:
      type: Header
      header:
        name: X-User-ID
```

Available load balancing types:
- **RoundRobin**: Distribute requests evenly (default)
- **LeastRequest**: Send to backend with fewest active requests
- **Random**: Random selection
- **ConsistentHash**: Hash-based routing for session affinity

#### Session Affinity

Maintain sticky sessions:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: session-affinity
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  loadBalancer:
    type: ConsistentHash
    consistentHash:
      type: Cookie
      cookie:
        name: session-cookie
        ttl: 3600s
```

#### Circuit Breaking

Protect services from overload:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: circuit-breaker
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  circuitBreaker:
    maxConnections: 1024
    maxPendingRequests: 1024
    maxRequests: 1024
    maxRetries: 3
    maxRequestsPerConnection: 100
```

#### Timeout and Retry

Configure request timeouts and retry behavior:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: timeout-retry
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  timeout:
    request: 10s
    backendRequest: 8s
  retry:
    numRetries: 3
    perRetryTimeout: 3s
    retryOn:
      httpStatusCodes:
        - 500
        - 502
        - 503
        - 504
      triggers:
        - connect-failure
        - refused-stream
        - retriable-4xx
```

#### Health Checks

Active health checking:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: health-check
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  healthCheck:
    active:
      type: HTTP
      http:
        path: /health
        method: GET
        expectedStatuses:
          - 200
          - 204
        expectedResponse:
          type: Text
          text: "healthy"
      timeout: 1s
      interval: 3s
      unhealthyThreshold: 3
      healthyThreshold: 2
```

Passive health checking (outlier detection):

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: outlier-detection
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  healthCheck:
    passive:
      consecutive5xxErrors: 5
      interval: 10s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
      splitExternalLocalOriginErrors: true
```

### ClientTrafficPolicy

ClientTrafficPolicy configures how traffic is handled between clients and the Gateway.

#### Client Timeout

Set client-side timeouts:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: ClientTrafficPolicy
metadata:
  name: client-timeout
  namespace: gateway-system
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: default-gateway
  timeout:
    http:
      requestReceivedTimeout: 30s
```

#### HTTP/2 and HTTP/3

Enable HTTP/2 and HTTP/3:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: ClientTrafficPolicy
metadata:
  name: http-versions
  namespace: gateway-system
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: default-gateway
  http2:
    maxConcurrentStreams: 128
  http3: {}
```

#### Client IP Detection

Configure how client IPs are detected (important when behind load balancers):

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: ClientTrafficPolicy
metadata:
  name: client-ip-detection
  namespace: gateway-system
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: default-gateway
  clientIPDetection:
    xForwardedFor:
      numTrustedHops: 1
```

#### Path Normalization

Configure URL path normalization:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: ClientTrafficPolicy
metadata:
  name: path-normalization
  namespace: gateway-system
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: default-gateway
  path:
    mergeSlashes: true
    escapedSlashesAction: UnescapeAndRedirect
```

### SecurityPolicy

SecurityPolicy provides security-related configuration.

#### CORS Policy

Configure Cross-Origin Resource Sharing:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: cors-policy
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  cors:
    allowOrigins:
      - "https://example.com"
      - "https://*.example.com"
    allowMethods:
      - GET
      - POST
      - PUT
      - DELETE
    allowHeaders:
      - Content-Type
      - Authorization
      - X-Custom-Header
    exposeHeaders:
      - X-Response-ID
    maxAge: 86400
    allowCredentials: true
```

#### Basic Authentication

Enable basic authentication:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: basic-auth
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  basicAuth:
    users:
      name: basic-auth-secret
---
apiVersion: v1
kind: Secret
metadata:
  name: basic-auth-secret
  namespace: tenant
type: Opaque
stringData:
  .htpasswd: |
    user1:$apr1$...
    user2:$apr1$...
```

#### External Authorization

Integrate with external authorization service:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: ext-auth
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  extAuth:
    grpc:
      backendRef:
        name: auth-service
        port: 9000
    headersToBackend:
      - authorization
    failOpen: false
```

#### JWT Authentication

Validate JWT tokens:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: jwt-auth
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  jwt:
    providers:
      - name: auth0
        issuer: "https://example.auth0.com/"
        audiences:
          - "https://api.example.com"
        remoteJWKS:
          uri: "https://example.auth0.com/.well-known/jwks.json"
        claimToHeaders:
          - claim: sub
            header: X-User-ID
```

### Backend TLS

Configure TLS for backend connections:

```yaml
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: BackendTLSPolicy
metadata:
  name: backend-tls
  namespace: tenant
spec:
  targetRef:
    group: ''
    kind: Service
    name: backend-service
  tls:
    certificateAuthorityRefs:
      - name: backend-ca-cert
        group: ''
        kind: ConfigMap
    hostname: backend.internal.example.com
```

## Observability

### Metrics

Envoy Gateway exposes Prometheus metrics for monitoring:

- **Gateway metrics**: Available at `:19001/stats/prometheus` on Gateway pods
- **Envoy Proxy metrics**: Available at `:19001/stats/prometheus` on Envoy pods

Key metrics to monitor:
- `envoy_http_downstream_rq_total`: Total requests received
- `envoy_http_downstream_rq_xx`: Requests by status code (2xx, 4xx, 5xx)
- `envoy_cluster_upstream_rq_total`: Total requests to backends
- `envoy_cluster_upstream_rq_time`: Request latency
- `envoy_cluster_membership_healthy`: Healthy backend endpoints

### Access Logs

Configure access logging:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyProxy
metadata:
  name: custom-proxy-config
  namespace: gateway-system
spec:
  telemetry:
    accessLog:
      settings:
        - format:
            type: Text
            text: |
              [%START_TIME%] "%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%"
              %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION%
              "%REQ(X-FORWARDED-FOR)%" "%REQ(USER-AGENT)%" "%REQ(X-REQUEST-ID)%"
              "%REQ(:AUTHORITY)%" "%UPSTREAM_HOST%"
          sinks:
            - type: File
              file:
                path: /dev/stdout
```

JSON format for structured logging:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyProxy
metadata:
  name: json-logging
  namespace: gateway-system
spec:
  telemetry:
    accessLog:
      settings:
        - format:
            type: JSON
            json:
              start_time: "%START_TIME%"
              method: "%REQ(:METHOD)%"
              path: "%REQ(X-ENVOY-ORIGINAL-PATH?:PATH)%"
              protocol: "%PROTOCOL%"
              response_code: "%RESPONSE_CODE%"
              response_flags: "%RESPONSE_FLAGS%"
              bytes_received: "%BYTES_RECEIVED%"
              bytes_sent: "%BYTES_SENT%"
              duration: "%DURATION%"
              upstream_host: "%UPSTREAM_HOST%"
              x_forwarded_for: "%REQ(X-FORWARDED-FOR)%"
              user_agent: "%REQ(USER-AGENT)%"
              request_id: "%REQ(X-REQUEST-ID)%"
          sinks:
            - type: File
              file:
                path: /dev/stdout
```

### Distributed Tracing

Enable distributed tracing with OpenTelemetry:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyProxy
metadata:
  name: tracing-config
  namespace: gateway-system
spec:
  telemetry:
    tracing:
      provider:
        type: OpenTelemetry
        openTelemetry:
          host: otel-collector.observability.svc.cluster.local
          port: 4317
      samplingRate: 100
```

## Performance Tuning

### Resource Allocation

Envoy Gateway and Envoy Proxy resource requirements depend on traffic patterns:

**Low Traffic** (< 100 RPS):
```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

**Medium Traffic** (100-1000 RPS):
```yaml
resources:
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 2000m
    memory: 2Gi
```

**High Traffic** (> 1000 RPS):
```yaml
resources:
  requests:
    cpu: 2000m
    memory: 2Gi
  limits:
    cpu: 4000m
    memory: 4Gi
```

### Horizontal Scaling

Scale Envoy Proxy pods based on metrics:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: envoy-gateway-hpa
  namespace: gateway-system
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: envoy-gateway
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### Connection Pooling

Optimize connection pooling for backends:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: connection-pool
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  connectionPool:
    maxConnections: 1024
    maxPendingRequests: 1024
    maxRequestsPerConnection: 0  # unlimited
    idleTimeout: 3600s
```

## Debugging

### View Envoy Configuration

Access the Envoy admin interface to inspect configuration:

```shell
# Port forward to Envoy proxy pod
kubectl port-forward -n gateway-system <envoy-pod> 19000:19000

# View configuration dump
curl localhost:19000/config_dump | jq

# View specific configuration
curl localhost:19000/config_dump?resource=routes
curl localhost:19000/config_dump?resource=clusters
curl localhost:19000/config_dump?resource=listeners
```

### Check Runtime Statistics

```shell
# View all stats
curl localhost:19000/stats

# View specific stat
curl localhost:19000/stats?filter=http.downstream_rq

# Reset counters
curl -X POST localhost:19000/reset_counters
```

### Enable Debug Logging

Temporarily enable debug logging:

```shell
# Enable debug logging for a specific logger
curl -X POST localhost:19000/logging?level=debug

# Enable for specific component
curl -X POST localhost:19000/logging?router=debug

# Reset to default
curl -X POST localhost:19000/logging?level=info
```

### Common Issues

**HTTPRoute not accepting traffic**:
- Check Gateway acceptance conditions: `kubectl get httproute <name> -o yaml`
- Verify BackendTrafficPolicy is targeting correct HTTPRoute
- Ensure Service has healthy endpoints

**High latency**:
- Check backend response times in metrics
- Review circuit breaker settings
- Examine retry configurations
- Check connection pooling limits

**Rate limiting not working**:
- Verify BackendTrafficPolicy targetRef matches HTTPRoute
- Check rate limit metrics: `envoy_ratelimit_*`
- Ensure client selectors match traffic patterns

**TLS errors**:
- Verify certificate validity and SANs
- Check BackendTLSPolicy configuration
- Review Envoy logs for TLS handshake errors

## Extensibility

### WASM Filters

Extend Envoy with WebAssembly filters:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyPatchPolicy
metadata:
  name: wasm-filter
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  type: JSONPatch
  jsonPatches:
    - type: "type.googleapis.com/envoy.config.listener.v3.Listener"
      name: listener-patch
      operation:
        op: add
        path: "/filter_chains/0/filters/0/typed_config/http_filters/0"
        value:
          name: envoy.filters.http.wasm
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.wasm.v3.Wasm
            config:
              vm_config:
                runtime: "envoy.wasm.runtime.v8"
                code:
                  remote:
                    http_uri:
                      uri: "https://example.com/filter.wasm"
                      cluster: filter-server
                      timeout: 10s
```

### External Processors

Integrate external processing services:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyExtensionPolicy
metadata:
  name: ext-proc
  namespace: tenant
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: example-app
  extProc:
    backendRef:
      name: ext-proc-service
      port: 9002
    processingMode:
      requestHeaderMode: SEND
      responseHeaderMode: SEND
    messageTimeout: 200ms
```

## Further Reading

- [Envoy Gateway Official Documentation](https://gateway.envoyproxy.io/)
- [Envoy Gateway Tasks](https://gateway.envoyproxy.io/latest/tasks/)
- [Envoy Proxy Documentation](https://www.envoyproxy.io/docs)
- [Envoy Proxy Configuration Reference](https://www.envoyproxy.io/docs/envoy/latest/configuration/configuration)
- [xDS Protocol](https://www.envoyproxy.io/docs/envoy/latest/api-docs/xds_protocol)
