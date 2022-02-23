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
  plugins: [require.resolve("docusaurus-lunr-search")],
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
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/xenitab/xenitab.github.io/edit/main/",
        },
        /*blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/xenitab/home/edit/main/blog/",
        },*/
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
