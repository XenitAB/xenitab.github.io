module.exports = {
  "docs": [
    {
      "type": "doc",
      "id": "index"
    },
    {
      "type": "category",
      "label": "Xenit Kubernetes Service",
      "items": [
        {
          "type": "doc",
          "id": "xks/index"
        },
        {
          "type": "doc",
          "id": "xks/architecture-and-design",

        },
        {
          "type": "category",
          "label": "Developer Guide",
          "items": [
            "xks/developer-guide/introduction",
            "xks/developer-guide/api-migrations",
            "xks/developer-guide/secrets-management",
            "xks/developer-guide/cloud-iam",
            "xks/developer-guide/container-security",
            {
              "type": "category",
              "label": "CI/CD",
              "items": [
                "xks/developer-guide/ci-cd/ci",
                "xks/developer-guide/ci-cd/cd",
                "xks/developer-guide/ci-cd/gitops",
                "xks/developer-guide/ci-cd/flux",
                "xks/developer-guide/ci-cd/repo-structure",
              ]
            },
            "xks/developer-guide/scheduling-scaling",
            "xks/developer-guide/observability",
            "xks/developer-guide/networking",
            "xks/developer-guide/wsl2",
            "xks/developer-guide/reports",
            "xks/developer-guide/best-practices"
          ]
        },
        {
          "type": "category",
          "label": "Operator Guide",
          "items": [
            "xks/operator-guide/index",
            "xks/operator-guide/getting-started",
            "xks/operator-guide/agents",
            "xks/operator-guide/networking",
            "xks/operator-guide/blast-radius",
            "xks/operator-guide/blue-green",
            "xks/operator-guide/aws-azdo",
            "xks/operator-guide/github",
            "xks/operator-guide/cve",
            {
              "type": "category",
              "label": "Kubernetes",
              "items": [
                "xks/operator-guide/kubernetes/aks",
                "xks/operator-guide/kubernetes/eks",
              ]
            },
            {
              "type": "category",
              "label": "Deprecation ingress-nginx ",
              "items": [
                "xks/operator-guide/ingress-nginx deprecation/ingress-nginx-retiring",
                "xks/operator-guide/ingress-nginx deprecation/gateway-api",
                "xks/operator-guide/ingress-nginx deprecation/envoy-gateway",
                "xks/operator-guide/ingress-nginx deprecation/azure-dns-migration-playbook",
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Xenit Style Guide",
      "items": [
        "xenit-style-guide/containers",
        "xenit-style-guide/golang",
        "xenit-style-guide/javascript",
      ]
    }
  ]
}
