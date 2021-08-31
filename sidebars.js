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
            "xks/developer-guide/index",
            "xks/developer-guide/best-practices",
            "xks/developer-guide/ingress",
            "xks/developer-guide/security",
            "xks/developer-guide/cd",
            "xks/developer-guide/linkerd",
            "xks/developer-guide/cloud-resources",
          ],
        },
        {
          type: "category",
          label: "Operator Guide",
          items: [
            "xks/operator-guide/index",
            "xks/operator-guide/operator-guide",
            "xks/operator-guide/azure-devops-agents",
            "xks/operator-guide/blast-radius",
          ],
        },
      ],
    },
  ],
};
