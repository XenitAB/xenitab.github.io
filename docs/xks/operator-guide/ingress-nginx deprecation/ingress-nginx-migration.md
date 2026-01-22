---
id: ingress-nginx-retiring
title: Ingress Nginx Retiring
---

## Retirment and Deprecation Notice for Ingress Nginx

We defer you to the original and most up-to-date official post regarding the retirement of Ingress Nginx project:

[https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/)

The Ingress API and Nginx Ingress Controller are being deprecated across the Kubernetes ecosystem and within XKS. This change aligns with the Kubernetes community's shift toward the Gateway API as the successor to Ingress.

### Official Deprecation Information

The Kubernetes community has officially recognized Gateway API as the future of ingress traffic management:

- **Gateway API Status**: The Gateway API has [graduated to General Availability (GA)](https://kubernetes.io/blog/2023/10/31/gateway-api-ga/) as of October 2023, signaling production readiness and long-term support
- **Kubernetes Documentation**: The official Kubernetes documentation now [recommends Gateway API](https://kubernetes.io/docs/concepts/services-networking/gateway/) as the preferred solution for ingress traffic
- **Ingress Specification**: The [Ingress API](https://kubernetes.io/docs/concepts/services-networking/ingress/) remains in beta and is considered feature-frozen, with new development focused on Gateway API
- **Nginx Ingress Controller**: While still maintained, the [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/) project recommends evaluating Gateway API for new deployments

### XKS Timeline and Support

- **Current Status**: Ingress resources with Nginx Ingress Controller remain functional and supported for backward compatibility
- **Recommendation**: All new applications and projects should use Gateway API from the start
- **Migration Period**: Existing Ingress resources should be migrated to Gateway API. Support for legacy Ingress will be maintained during a transition period
- **Future Removal**: Advanced notice will be provided before Ingress support is removed from XKS clusters
- **Support**: The XKS platform team is available to assist with migration planning and execution

## Why Migrate?

The migration from Ingress to Gateway API offers significant benefits:

### Standardization

Gateway API is an official Kubernetes standard maintained by SIG Network, ensuring:

- Long-term support and stability
- Cross-vendor compatibility
- Regular updates aligned with Kubernetes releases
- Community-driven development

### Enhanced Capabilities

Gateway API provides features that were impossible or required complex workarounds in Ingress:

- **Header-based routing**: Make routing decisions based on HTTP headers
- **Traffic splitting**: Distribute traffic across multiple backends for canary deployments
- **Request mirroring**: Duplicate traffic for testing without affecting production
- **Cross-namespace routing**: Reference services in other namespaces with explicit permissions
- **Protocol flexibility**: Native support for HTTP, HTTPS, TCP, TLS, UDP, and GRPC

### Better Architecture

- **Role-oriented design**: Clear separation between infrastructure (GatewayClass), operations (Gateway), and application (HTTPRoute) concerns
- **Type safety**: Configuration validated by Kubernetes API server instead of annotations
- **Extensibility**: Well-defined extension points for policies and filters
- **Simplified configuration**: More intuitive and expressive resource definitions

## Migration Resources

### Gateway API Documentation

To understand and implement Gateway API in XKS, refer to the comprehensive [Gateway API Guide](/docs/xks/operator-guide/ingress-nginx%20deprecation/gateway-api):

- **Getting Started**: Basic HTTPRoute examples and common patterns
- **Advanced Features**: Traffic splitting, header routing, URL rewriting, and more
- **TLS Configuration**: Automated certificate management
- **Rate Limiting & Policies**: Request control and traffic management
- **Complete Examples**: Real-world use cases and configurations
- **Debugging Guide**: Troubleshooting tips and common issues

For the official Gateway API specification and concepts, see:

- [Gateway API Official Documentation](https://gateway-api.sigs.k8s.io/)
- [Gateway API Concepts](https://gateway-api.sigs.k8s.io/concepts/api-overview/)
- [Gateway API User Guides](https://gateway-api.sigs.k8s.io/guides/)

### Envoy Gateway Documentation

XKS uses Envoy Gateway as the implementation of Gateway API. Learn more in the [Envoy Gateway Guide](/docs/xks/operator-guide/ingress-nginx%20deprecation/envoy-gateway):

- **Architecture Overview**: How Envoy Gateway works in XKS
- **Advanced Features**: Circuit breaking, health checks, load balancing
- **Performance**: Understanding resource usage and optimization
- **Observability**: Metrics, logging, and tracing capabilities
- **Troubleshooting**: Debugging Envoy configuration and behavior

For official Envoy Gateway documentation:

- [Envoy Gateway Documentation](https://gateway.envoyproxy.io/)
- [Envoy Gateway Quick Start](https://gateway.envoyproxy.io/latest/user/quickstart/)
- [Envoy Gateway Tasks](https://gateway.envoyproxy.io/latest/tasks/)

For Envoy Proxy internals:

- [Envoy Proxy Documentation](https://www.envoyproxy.io/docs)
- [Envoy Architecture](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/arch_overview)

## Migration Guide

### Step 1: Assess Current Ingress Resources

Inventory all Ingress resources in your namespaces:

```shell
kubectl get ingress --all-namespaces
```

Document:

- Hostnames and paths configured
- Annotations used (especially implementation-specific ones)
- TLS configuration
- Backend services referenced

### Step 2: Understand Annotation Mapping

Many Nginx Ingress annotations have Gateway API equivalents. Review the [annotation migration table](#annotation-migration-reference) below to understand how to convert your configuration.

### Step 3: Create HTTPRoute Resources

Convert each Ingress to an HTTPRoute. See the [Gateway API Guide](/docs/xks/operator-guide/ingress-nginx%20deprecation/gateway-api#migration-from-ingress) for detailed side-by-side examples.

Basic conversion pattern:

**Before (Ingress):**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-app
  namespace: tenant
spec:
  ingressClassName: nginx
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: example-app
                port:
                  number: 80
  tls:
    - hosts:
        - app.example.com
      secretName: example-cert
```

**After (HTTPRoute):**

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: example-app
  namespace: tenant
spec:
  parentRefs:
    - name: default-gateway
      namespace: gateway-system
  hostnames:
    - "app.example.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: example-app
          port: 80
```

### Step 4: Test in Parallel

Keep both Ingress and HTTPRoute running initially:

- Use different hostnames for testing (e.g., `app-new.example.com` for HTTPRoute)
- Verify functionality matches expected behavior
- Test with actual traffic patterns

### Step 5: Update DNS and Switch Traffic

Once confident in HTTPRoute configuration:

- Update DNS records to point to Gateway IP
- Monitor metrics and logs for issues
- Keep Ingress as a fallback initially

### Step 6: Clean Up

After successful migration:

- Remove old Ingress resources
- Delete unused Certificate resources if consolidated
- Update documentation and deployment pipelines

## Annotation Migration Reference

| Nginx Ingress Annotation                            | Gateway API Equivalent                  | Documentation                                                                 |
|------------------------------------------------------|-----------------------------------------|-------------------------------------------------------------------------------|
| `nginx.ingress.kubernetes.io/rewrite-target`        | URLRewrite filter                       | [Gateway API - URL Rewriting](gateway-api#url-rewriting)                     |
| `nginx.ingress.kubernetes.io/backend-protocol`      | BackendTLSPolicy                        | [Envoy Gateway - Backend TLS](envoy-gateway#backend-tls)                     |
| `nginx.ingress.kubernetes.io/limit-rps`             | BackendTrafficPolicy (rate limiting)    | [Envoy Gateway - Rate Limiting](envoy-gateway#rate-limiting)                 |
| `nginx.ingress.kubernetes.io/limit-connections`     | BackendTrafficPolicy (rate limiting)    | [Envoy Gateway - Rate Limiting](envoy-gateway#rate-limiting)                 |
| `nginx.ingress.kubernetes.io/cors-*`                | CORSPolicy (extension)                  | [Envoy Gateway - CORS](envoy-gateway#cors-policy)                            |
| `nginx.ingress.kubernetes.io/auth-*`                | SecurityPolicy                          | [Envoy Gateway - Basic Auth](envoy-gateway#basic-authentication)             |
| `nginx.ingress.kubernetes.io/upstream-hash-by`      | BackendTrafficPolicy (load balancing)   | [Envoy Gateway - Load Balancing](envoy-gateway#load-balancing)               |
| `nginx.ingress.kubernetes.io/affinity`              | BackendTrafficPolicy (session affinity) | [Envoy Gateway - Session Affinity](envoy-gateway#session-affinity)           |
| `nginx.ingress.kubernetes.io/proxy-body-size`       | ClientTrafficPolicy (buffer limits)     | [Envoy Gateway - ClientTrafficPolicy](envoy-gateway#clienttrafficpolicy)     |
| `nginx.ingress.kubernetes.io/ssl-redirect`          | HTTPRoute (redirect)                    | Use HTTPRoute filters for redirect behavior                                  |
| `nginx.ingress.kubernetes.io/configuration-snippet` | Custom filters or policies              | [Envoy Gateway - Extensibility](envoy-gateway#extensibility)                 |

For complex configurations using configuration snippets, consult the XKS platform team for guidance on migration strategies.

## Network Policy Considerations

When migrating, ensure Network Policies allow traffic from the Gateway:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-gateway
  namespace: tenant
spec:
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: gateway-system
  podSelector:
    matchLabels:
      app: your-app
  policyTypes:
    - Ingress
```

Previously, you may have allowed traffic from `ingress-nginx` namespace - this should be updated to `gateway-system` (or your Gateway's namespace).

## Common Migration Patterns

### Simple Host-Based Routing

Most basic Ingress resources translate directly to HTTPRoute with minimal changes. See [Gateway API - Basic HTTP Route](/docs/xks/operator-guide/ingress-nginx%20deprecation/gateway-api#basic-http-route).

### Path Rewriting

URL rewriting moves from annotations to typed filters. See [Gateway API - URL Rewriting](/docs/xks/operator-guide/ingress-nginx%20deprecation/gateway-api#url-rewriting).

### TLS Termination

TLS configuration moves from Ingress to Gateway resource (managed by cluster operators). Applications reference the Gateway and inherit TLS configuration. See [Gateway API - TLS Configuration](/docs/xks/operator-guide/ingress-nginx%20deprecation/gateway-api#tls-configuration).

### Rate Limiting

Rate limiting moves from annotations to BackendTrafficPolicy resources with more granular control. See [Envoy Gateway - Rate Limiting](/docs/xks/operator-guide/ingress-nginx%20deprecation/envoy-gateway#rate-limiting).

### External Services

Routing to external endpoints works similarly but uses Gateway API's ExternalName services.

## Getting Help

### Documentation Resources

- [Gateway API Guide](/docs/xks/operator-guide/ingress-nginx%20deprecation/gateway-api) - Complete XKS Gateway API documentation
- [Envoy Gateway Guide](/docs/xks/operator-guide/ingress-nginx%20deprecation/envoy-gateway) - Envoy-specific features and configuration
- [Official Gateway API Docs](https://gateway-api.sigs.k8s.io/) - Kubernetes Gateway API specification
- [Official Envoy Gateway Docs](https://gateway.envoyproxy.io/) - Envoy Gateway project documentation
- [Envoy Proxy Docs](https://www.envoyproxy.io/docs) - Envoy Proxy internals

### Support Channels

- **XKS Platform Team**: Contact for migration assistance and cluster-specific questions
- **Migration Planning**: Request guidance for complex migration scenarios
- **Troubleshooting**: Get help debugging Gateway API or Envoy Gateway issues

### Community Resources

- [Gateway API Slack](https://kubernetes.slack.com/messages/gateway-api) - Kubernetes Slack channel
- [Envoy Slack](https://envoyproxy.slack.com/) - Envoy community Slack
- [Gateway API GitHub](https://github.com/kubernetes-sigs/gateway-api) - Report issues and view discussions

## Frequently Asked Questions

### When will Ingress be removed from XKS?

Ingress support will be maintained during a transition period to allow sufficient time for migration. Advance notice will be provided before removal.

### Can I use both Ingress and Gateway API during migration?

Yes, both can coexist in the same cluster. This allows for gradual migration and parallel testing.

### Will my existing Ingress resources stop working?

No, existing Ingress resources will continue to function during the migration period. However, new features and optimizations will only be added to Gateway API.

### Is Gateway API production-ready?

Yes, Gateway API graduated to GA (General Availability) in October 2023 and is production-ready. It's already in use by major organizations and cloud providers.

### What if I use advanced Nginx features?

Most Nginx features have Gateway API or Envoy Gateway equivalents. For complex scenarios, consult the [annotation migration table](#annotation-migration-reference) or contact the XKS platform team.

### Do I need to change my application code?

No, application code doesn't need to change. Only the Kubernetes resources that define how traffic reaches your application need to be updated.

### What happens to my DNS and certificates?

External DNS and Cert Manager continue to work with Gateway API. DNS records and certificates are managed automatically, just as they were with Ingress.

### Can I migrate incrementally?

Yes, you can migrate one application at a time. Start with simple applications and gain confidence before migrating more complex configurations.
