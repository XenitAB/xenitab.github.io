---
id: blue-green
title: Blue Green Clusters
---

For different reasons you might want to create a completely new cluster, this can be due to many reasons like:

- Broken cluster
- Test patch the cluster
- Major breaking change

Thanks to this XKF support performing blue-green deployment on an entire kubernetes cluster, this is applicable for both Azure and AWS.
These docs is intended for both clouds, the main difference is in the naming.

Today XKS does not support any way of only doing blue green on a specific environment.
If you need too perform blue green on QA you should do it in dev and prod as well.
We think that the risk is to great that you by mistake would get drift between the modules used in the different clusters would be to great.

## Workflow

> We assume that the workloads on the clusters are stateless and can run multiple instances.

1. Set up a new cluster in the target environment using Terraform
2. Verify that the new cluster is functioning as intended
    - You **won't** be able to verify any ingress
    - You **won't** be able to use AZAD-proxy in the newly created cluster
3. Change the TXT DNS records over to the newly created cluster
4. Verify that the ingress traffic is migrated to the new cluster and it is working as intended
5. Destroy the old cluster using terraform

## DNS migration

You can find a small small script bellow to make the migration of DNS easier.
As always use at your own risk and make sure that you understand what the script does.

Our recommendation is that you migrate one DNS record manually and verify that the ingress and the new cluster is working as intended,
when you know that you can run the script.

### Azure

```bash
ENVIRONMENT="dev"
OLD_OWNER_ID="${ENVIRONMENT}-aks1"
NEW_OWNER_ID="${ENVIRONMENT}-aks2"
RESOURCE_GROUP_NAME="rg-${ENVIRONMENT}-we-aks"
ZONE_NAME="${ENVIRONMENT}.domain.se"
ZONE_RECORDS=$(az network dns record-set txt list -g ${RESOURCE_GROUP_NAME} -z ${ZONE_NAME} | jq -rc '.[]')
ZONE_RECORDS_CSV_ARRAY=( $(jq -rc '. | [.name, (.txtRecords[0].value[0] | @base64)] | join(";")' <<< "${ZONE_RECORDS}") )
for ZONE_RECORD_CSV in "${ZONE_RECORDS_CSV_ARRAY[@]}"; do
  ZONE_RECORD_NAME=$(awk -F';' '{print $1}' <<< $ZONE_RECORD_CSV)
  OLD_ZONE_TXT_VALUE=$(awk -F';' '{print $2}' <<< $ZONE_RECORD_CSV | base64 -d)
  if [[ ${OLD_ZONE_TXT_VALUE} =~ "owner=${OLD_OWNER_ID}" ]]; then
    NEW_ZONE_TXT_VALUE=${OLD_ZONE_TXT_VALUE/owner=${OLD_OWNER_ID}/owner=${NEW_OWNER_ID}}
    echo Updating external-dns owner of ${ZONE_RECORD_NAME}: ${OLD_OWNER_ID} to ${NEW_OWNER_ID}
    az network dns record-set txt add-record --resource-group ${RESOURCE_GROUP_NAME} --zone-name ${ZONE_NAME} --record-set-name ${ZONE_RECORD_NAME} --value "${NEW_ZONE_TXT_VALUE}" 1>/dev/null
    az network dns record-set txt remove-record --resource-group ${RESOURCE_GROUP_NAME} --zone-name ${ZONE_NAME} --record-set-name ${ZONE_RECORD_NAME} --value "${OLD_ZONE_TXT_VALUE}" 1>/dev/null
  fi
done
```
