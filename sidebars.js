module.exports = {
  docs: {
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
          "services/xks/developer-guide",
        ],
      },
    ],
    Security: ["security"],
  },
};
