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
          "id": "xkf/index"
        },
        {
          "type": "doc",
          "id": "xkf/architecture-and-design",

        },
        {
          "type": "category",
          "label": "Developer Guide",
          "items": [
            "xkf/developer-guide/introduction",
            "xkf/developer-guide/best-practices",
            "xkf/developer-guide/secrets-management",
            "xkf/developer-guide/cloud-iam",
            "xkf/developer-guide/container-security",
            {
              "type": "category",
              "label": "CI/CD",
              "items": [
                "xkf/developer-guide/ci-cd/ci",
                "xkf/developer-guide/ci-cd/cd",
                "xkf/developer-guide/ci-cd/gitops",
                "xkf/developer-guide/ci-cd/flux",
              ]
            },
            "xkf/developer-guide/scheduling-scaling",
            "xkf/developer-guide/observability",
            "xkf/developer-guide/networking",
            "xkf/developer-guide/wsl2",
            "xkf/developer-guide/reports",
          ]
        },
        {
          "type": "category",
          "label": "Operator Guide",
          "items": [
            "xkf/operator-guide/index",
            "xkf/operator-guide/getting-started",
            "xkf/operator-guide/agents",
            "xkf/operator-guide/networking",
            "xkf/operator-guide/blast-radius",
            "xkf/operator-guide/blue-green",
            "xkf/operator-guide/aws-azdo",
            "xkf/operator-guide/github",
            {
              "type": "category",
              "label": "Kubernetes",
              "items": [
                "xkf/operator-guide/kubernetes/aks",
                "xkf/operator-guide/kubernetes/eks",
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Projects",
      "items": []
    }
  ]
}
