(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{73:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return l}));var r=n(3),o=n(7),a=(n(0),n(94)),i=(n(96),{id:"introduction",title:"Introduction"}),c={unversionedId:"xks/developer-guide/introduction",id:"xks/developer-guide/introduction",isDocsHomePage:!1,title:"Introduction",description:"This documentation is targeted towards developers using XKS. It covers the basics of Kubernetes and the additional features that are offered by XKS. It is recommended to read this page in its entirety to get a lay of the land. By the end of it new users should be setup with access to their clusters and ready to deploy applications.",source:"@site/docs/xks/developer-guide/introduction.md",slug:"/xks/developer-guide/introduction",permalink:"/docs/xks/developer-guide/introduction",editUrl:"https://github.com/xenitab/xenitab.github.io/edit/main/docs/xks/developer-guide/introduction.md",version:"current",sidebar:"docs",previous:{title:"Architecture and design",permalink:"/docs/xks/architecture-and-design"},next:{title:"GitOps a la XKS",permalink:"/docs/xks/developer-guide/gitops"}},u=[{value:"Getting Started",id:"getting-started",children:[]},{value:"Kubectl Configuration",id:"kubectl-configuration",children:[{value:"Using AZAD Proxy",id:"using-azad-proxy",children:[]},{value:"Otherwise",id:"otherwise",children:[]}]},{value:"My First Application",id:"my-first-application",children:[]},{value:"Next Steps",id:"next-steps",children:[]},{value:"Troubleshoot applications in Kubernetes",id:"troubleshoot-applications-in-kubernetes",children:[]}],s={rightToc:u};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"This documentation is targeted towards developers using ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://xenit.se/it-tjanster/kubernetes-framework/"}),"XKS"),". It covers the basics of Kubernetes and the additional features that are offered by XKS. It is recommended to read this page in its entirety to get a lay of the land. By the end of it new users should be setup with access to their clusters and ready to deploy applications."),Object(a.b)("h2",{id:"getting-started"},"Getting Started"),Object(a.b)("p",null,"A good starting point is to get CLI access to the clusters. It is useful to have manual access to the clusters for debugging purposes. Try to avoid\ndoing any changes to cluster resources with the CLI as the changes will be difficult to track and update in the future. There are a couple of\nprerequisites that have to be met before getting access however."),Object(a.b)("p",null,"Start off by ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"}),"installing the Azure CLI"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"az login\n")),Object(a.b)("h2",{id:"kubectl-configuration"},"Kubectl Configuration"),Object(a.b)("p",null,"You can run the following commands to add the AKS cluster to your kubeconfig assuming that you have installed the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"}),"Azure CLI"),"\nand ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli"}),"authenticated with the Azure portal"),"."),Object(a.b)("h3",{id:"using-azad-proxy"},"Using AZAD Proxy"),Object(a.b)("p",null,"If you use the AZAD proxy you can find documentation to help you set it up here: ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/XenitAB/azad-kube-proxy"}),"AZAD Documentation")),Object(a.b)("h3",{id:"otherwise"},"Otherwise"),Object(a.b)("p",null,"Once you have logged in you can list your subscriptions"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"az account list -o table\n")),Object(a.b)("p",null,"In the case that you have more than one subscription, you might want to change the default subscription in order to target the correct environment."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"az account set -s <SubscriptionId>\n")),Object(a.b)("p",null,"To get information about cluster name and resource group for your current default subscription you can use:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"az aks list -o table\n")),Object(a.b)("p",null,"Once you know the resource group and name of the cluster, you can run the following to add the credentials to your kubekonfig:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"az aks get-credentials --resource-group <ResourceGroup> --name <Name>\n")),Object(a.b)("h2",{id:"my-first-application"},"My First Application"),Object(a.b)("p",null,"TBD"),Object(a.b)("h2",{id:"next-steps"},"Next Steps"),Object(a.b)("p",null,"TBD"),Object(a.b)("h2",{id:"troubleshoot-applications-in-kubernetes"},"Troubleshoot applications in Kubernetes"),Object(a.b)("p",null,"There is a great guide how to debug Kubernetes deployment over at ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://learnk8s.io/troubleshooting-deployments"}),"learnk8s.io"),"."),Object(a.b)("p",null,"To debug flux issues have a look at our ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/xks/developer-guide/flux"}),"Flux docs"),"."))}l.isMDXComponent=!0},94:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return h}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),l=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=l(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),d=l(n),b=r,h=d["".concat(i,".").concat(b)]||d[b]||p[b]||a;return n?o.a.createElement(h,c(c({ref:t},s),{},{components:n})):o.a.createElement(h,c({ref:t},s))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=b;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},95:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(20);t.default=function(){var e=Object(r.useContext)(o.a);if(null===e)throw new Error("Docusaurus context not provided");return e}},96:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var r=n(95),o=n(97);function a(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,a=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var a=void 0===r?{}:r,i=a.forcePrependBaseUrl,c=void 0!==i&&i,u=a.absolute,s=void 0!==u&&u;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(c)return t+n;var l=n.startsWith(t)?n:t+n.replace(/^\//,"");return s?e+l:l}(a,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,a().withBaseUrl)(e,t)}},97:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))}}]);