module.exports = {
  title: "Xenit",
  tagline: "Xenit Open Source",
  url: "http://xenitab.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "XenitAB", // Usually your GitHub org/user name.
  projectName: "xenitab.github.io", // Usually your repo name.
  plugins: [
    require.resolve("docusaurus-lunr-search"),
    'docusaurus-plugin-hubspot',
  ],
  themeConfig: {
    navbar: {
      // title: "Xenit AB Open Source",
      logo: {
        alt: "Xenit logo",
        src: "img/Xenit_logo_Svart.png",
        srcDark: "img/Xenit_logo_Vit.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "right",
        },
        { to: "blog/", label: "Blog", position: "right" },
        {
          href: "https://github.com/XenitAB",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      additionalLanguages: ["hcl", "aspnet"],
    },
    image: "img/Xenit_logo_Svart.png",
    hubspot: {
      accountId: 25696959,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/xenitab/xenitab.github.io/edit/main/",
        },
        gtag: {
          trackingID: "GTM-5K3TQ3K",
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
