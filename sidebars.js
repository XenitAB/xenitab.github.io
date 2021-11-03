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
          "type": "category",
          "label": "Developer Guide",
          "items": [
            "xks/developer-guide/introduction",
            "xks/developer-guide/best-practices",
            "xks/developer-guide/secrets-management",
            "xks/developer-guide/cloud-iam",
            "xks/developer-guide/security",
            "xks/developer-guide/cd",
            "xks/developer-guide/ci",
            "xks/developer-guide/flux",
            "xks/developer-guide/networking",
            "xks/developer-guide/wsl2"
          ]
        },
        {
          "type": "category",
          "label": "Operator Guide",
          "items": [
            "xks/operator-guide/index",
            "xks/operator-guide/architecture",
            "xks/operator-guide/getting-started",
            "xks/operator-guide/azure-devops-agents",
            "xks/operator-guide/blast-radius",
            "xks/operator-guide/blue-green",
            "xks/operator-guide/aws-azdo",
            "xks/operator-guide/blast-radius",
            "xks/operator-guide/operator-guide",
            "xks/operator-guide/agents",
            "xks/operator-guide/github",
            {
              "type": "category",
              "label": "Kubernetes",
              "items": [
                "xks/operator-guide/kubernetes/aks",
                "xks/operator-guide/kubernetes/eks",
              ],
            },
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
