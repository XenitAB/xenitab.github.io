module.exports = {
  docs: [
    {
      type: "doc",
      id: "index",
    },
    {
      type: "category",
      label: "Xenit Kubernetes Service",
      items: [
        {
          type: "doc",
          id: "xks/index"
        },
        {
          type: "category",
          label: "Developer Guide",
          items: [
            "xks/developer-guide/introduction",
            "xks/developer-guide/best-practices",
            "xks/developer-guide/ingress",
            "xks/developer-guide/cd",
            "xks/developer-guide/cloud-iam",
            "xks/developer-guide/secrets-management",
            "xks/developer-guide/security",
            "xks/developer-guide/linkerd",
            "xks/developer-guide/flux",
          ],
        },
        {
          type: "category",
          label: "Operator Guide",
          items: [
            "xks/operator-guide/index",
            "xks/operator-guide/aws-azdo",
            "xks/operator-guide/azure-devops-agents",
            "xks/operator-guide/blast-radius",
            "xks/operator-guide/blue-green",
            "xks/operator-guide/eks",
            "xks/operator-guide/operator-guide",
          ],
        },
      ],
    },
  ],
};
