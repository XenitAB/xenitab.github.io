---
id: azure-dns-migration-playbook
title: Azure DNS Migration Playbook
---

This playbook provides a step-by-step process for migrating from Ingress to Gateway API when using Azure DNS with external-dns. This approach ensures zero-downtime DNS switchover.

## Prerequisites

- Access to Azure DNS zone management
- `kubectl` access to the cluster
- Understanding of your current Ingress resources
- Gateway API and Envoy Gateway already deployed in the cluster

## Migration Steps

### Step 1: Lower DNS TTL

Edit the TTL for all existing Ingress A records to 5 seconds in Azure DNS. This ensures DNS changes propagate quickly during the migration.

```bash
# List current DNS records and their TTLs
az network dns record-set a list \
  --resource-group <dns-resource-group> \
  --zone-name <your-domain.com> \
  --output table

# Update TTL for a specific record
az network dns record-set a update \
  --resource-group <dns-resource-group> \
  --zone-name <your-domain.com> \
  --name <record-name> \
  --set ttl=5
```

:::warning Important
Before proceeding to the next steps, wait for the previous TTL to expire. If the original TTL was 300 seconds (5 minutes), wait at least 5 minutes before continuing.
:::

### Step 2: Create HTTPRoutes with Gateway Hostname

Create HTTPRoutes for each application that has an Ingress. Use a new hostname with a `gw-` prefix.

:::note Hostname Format
The prefix must use a dash (`-`), not a dot (`.`). Using `gw.app.example.com` would create a subdomain, while `gw-app.example.com` is a different hostname in the same zone.
:::

**Example:** If your Ingress uses `app.example.com`, create an HTTPRoute with `gw-app.example.com`.

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
    - "gw-app.example.com"  # New gateway hostname for testing
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: example-app
          port: 80
```

At this point, test your application through the new `gw-*` hostname to verify the HTTPRoute works correctly.

### Step 3: Add Original Hostname to HTTPRoute

Once testing is successful, add the actual hostname (currently used by the Ingress) as a second hostname in the HTTPRoute:

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
    - "gw-app.example.com"   # Gateway test hostname
    - "app.example.com"      # Original hostname (add this)
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: example-app
          port: 80
```

### Step 4: Update Ingress with Target Annotation

Add the `external-dns.alpha.kubernetes.io/target` annotation to the Ingress resource, pointing to the Gateway's load balancer IP address:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-app
  namespace: tenant
  annotations:
    external-dns.alpha.kubernetes.io/target: "your-gw-ip-address"  # Gateway LB IP
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
```

:::tip Finding the Gateway IP
Depending on how you deployed your Gateway it might be in a different namespace and with a different name so the command bellow might not be accurate.

Get the Gateway's load balancer IP with:

```bash
kubectl get svc -n gateway-system envoy-gateway-lb -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

Using the IP address is preferred over a hostname for the target annotation.
:::

### Step 5: Wait for DNS Propagation

Let external-dns update the DNS records. The A record for `app.example.com` will now point to the Gateway's IP instead of the Ingress controller's IP.

```bash
# Verify DNS has been updated
dig +short app.example.com

# Should return the Gateway LB IP (e.g., 20.100.50.25)
```

**The DNS switch is now complete!** Traffic is flowing through the Gateway.

### Step 6: Remove Ingress Resources

Once you've verified traffic is flowing correctly through the Gateway, remove the old Ingress resources:

```bash
kubectl delete ingress example-app -n tenant
```

### Step 7: Update TXT Record Ownership

External-dns creates TXT records to track ownership of DNS records. After removing the Ingress, update the TXT record's owner ID from `ingress` to `httproute`:

```bash
# List TXT records
az network dns record-set txt list \
  --resource-group <dns-resource-group> \
  --zone-name <your-domain.com> \
  --output table

# The ownership TXT record typically looks like:
# heritage=external-dns,external-dns/owner=<cluster-id>,external-dns/resource=ingress/tenant/example-app
```

You may need to delete the old TXT record so external-dns can recreate it with the correct owner:

```bash
# Delete old ownership record (external-dns will recreate it)
az network dns record-set txt delete \
  --resource-group <dns-resource-group> \
  --zone-name <your-domain.com> \
  --name <txt-record-name> \
  --yes
```

### Step 8 (Optional): Clean Up HTTPRoute Hostnames

Remove the temporary `gw-*` hostname from the HTTPRoute, keeping only the original hostname:

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
    - "app.example.com"  # Only the original hostname
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: example-app
          port: 80
```

Also clean up the `gw-*` DNS records if they're no longer needed.

## Summary Checklist

- [ ] Lower TTL to 5 seconds for Ingress A records
- [ ] Wait for previous TTL to expire
- [ ] Create HTTPRoute with `gw-` prefixed hostname
- [ ] Test application through new hostname
- [ ] Add original hostname to HTTPRoute
- [ ] Add `external-dns.alpha.kubernetes.io/target` annotation to Ingress
- [ ] Verify DNS points to Gateway IP
- [ ] Delete Ingress resource
- [ ] Update/recreate TXT ownership records
- [ ] (Optional) Remove `gw-` hostname from HTTPRoute
- [ ] (Optional) Restore TTL to normal value (e.g., 300 seconds)

## Rollback Procedure

If issues occur during migration:

1. Remove the `external-dns.alpha.kubernetes.io/target` annotation from the Ingress
2. Wait for external-dns to update DNS back to the Ingress controller IP
3. Remove the original hostname from the HTTPRoute (keep only `gw-*` for future testing)
4. Investigate and resolve issues before retrying

## Related Documentation

- [Gateway API Guide](/docs/xks/operator-guide/ingress-nginx%20deprecation/gateway-api)
- [Envoy Gateway Guide](/docs/xks/operator-guide/ingress-nginx%20deprecation/envoy-gateway)
- [Ingress Nginx Migration Overview](/docs/xks/operator-guide/ingress-nginx%20deprecation/ingress-nginx-retiring)
