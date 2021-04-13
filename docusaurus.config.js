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
  themeConfig: {
    navbar: {
      // title: "Xenit AB Open Source",
      logo: {
        alt: "Xenit logo",
        src: "img/xenit_logo_Svart.png",
        srcDark: "img/xenit_logo_Vit.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "right",
        },
        // { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/XenitAB",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    // footer: {
    //   logo: {
    //     alt: 'Facebook Open Source Logo',
    //     src: 'img/oss_logo.png',
    //     href: 'https://opensource.facebook.com',
    //   },
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // }
    // footer: {
    //   style: "dark",
    //   links: [
    //     {
    //       title: "Docs",
    //       items: [
    //         {
    //           label: "Style Guide",
    //           to: "docs/",
    //           logo: {
    //             alt: "Facebook Open Source Logo",
    //             src: "img/oss_logo.png",
    //             href: "https://opensource.facebook.com",
    //           },
    //         },
    //         {
    //           label: "Second Doc",
    //           to: "docs/doc2/",
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} Xenit AB`,
    // },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
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
