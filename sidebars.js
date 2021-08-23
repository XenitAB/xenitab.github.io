module.exports = {
  docs: {
    "Xenit Kubernetes Service": [
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
        ],
      },
    ],
    Documentation: [
      "documentation/index",
      {
        type: "category",
        label: "Kubernetes",
        items: [
          "documentation/kubernetes/oneoone",
          "documentation/kubernetes/best-practices",
          "documentation/kubernetes/blast-radius",
        ],
      },
    ],
    Services: [
      {
        type: "category",
        label: "Xenit Kubernetes Service",
        items: [
          "services/xks/index",
          "services/xks/operator-guide",
          "services/xks/azure-devops-agents",
          "services/xks/developer-guide",
        ],
      },
    ]
  },
};
