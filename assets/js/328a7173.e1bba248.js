"use strict";(self.webpackChunkhome=self.webpackChunkhome||[]).push([[3977],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),l=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=l(n),h=o,f=p["".concat(u,".").concat(h)]||p[h]||d[h]||a;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6801:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return c},default:function(){return p}});var r=n(3117),o=n(102),a=(n(7294),n(3905)),i=(n(4996),["components"]),s={id:"introduction",title:"Introduction"},u=void 0,l={unversionedId:"xks/developer-guide/introduction",id:"xks/developer-guide/introduction",title:"Introduction",description:"This documentation is targeted towards developers using XKS. It covers the basics of Kubernetes and the additional features that are offered by XKS. It is recommended to read this page in its entirety to get a lay of the land. By the end of reading this guide new users should have all the prerequisites for access to their clusters and be ready to deploy applications.",source:"@site/docs/xks/developer-guide/introduction.md",sourceDirName:"xks/developer-guide",slug:"/xks/developer-guide/introduction",permalink:"/docs/xks/developer-guide/introduction",editUrl:"https://github.com/xenitab/xenitab.github.io/edit/main/docs/xks/developer-guide/introduction.md",tags:[],version:"current",frontMatter:{id:"introduction",title:"Introduction"},sidebar:"docs",previous:{title:"Architecture and design",permalink:"/docs/xks/architecture-and-design"},next:{title:"Best Practices",permalink:"/docs/xks/developer-guide/best-practices"}},c=[{value:"Getting Started",id:"getting-started",children:[],level:2},{value:"Kubectl Configuration",id:"kubectl-configuration",children:[{value:"Using AZAD Proxy",id:"using-azad-proxy",children:[],level:3},{value:"Otherwise",id:"otherwise",children:[],level:3}],level:2},{value:"My First Application",id:"my-first-application",children:[],level:2},{value:"Next Steps",id:"next-steps",children:[],level:2},{value:"Troubleshoot applications in Kubernetes",id:"troubleshoot-applications-in-kubernetes",children:[],level:2}],d={toc:c};function p(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This documentation is targeted towards developers using ",(0,a.kt)("a",{parentName:"p",href:"https://xenit.se/it-tjanster/kubernetes-framework/"},"XKS"),". It covers the basics of Kubernetes and the additional features that are offered by XKS. It is recommended to read this page in its entirety to get a lay of the land. By the end of reading this guide new users should have all the prerequisites for access to their clusters and be ready to deploy applications."),(0,a.kt)("p",null,"Right now, this introduction is only targeted towards Azure users."),(0,a.kt)("h2",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,"A good starting point is to get CLI access to the clusters. It is useful to have manual access to the clusters for debugging purposes. Try to avoid\ndoing any changes to cluster resources with the CLI as the changes will be difficult to track and update in the future. There are a couple of\nprerequisites that have to be met before getting access however."),(0,a.kt)("p",null,"Start off by ",(0,a.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"},"installing the Azure CLI"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"az login\n")),(0,a.kt)("h2",{id:"kubectl-configuration"},"Kubectl Configuration"),(0,a.kt)("p",null,"You can run the following commands to add the AKS cluster to your kubeconfig, assuming that you have installed the ",(0,a.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"},"Azure CLI"),"\nand ",(0,a.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli"},"authenticated with the Azure portal"),"."),(0,a.kt)("h3",{id:"using-azad-proxy"},"Using AZAD Proxy"),(0,a.kt)("p",null,"If you use the AZAD proxy you can find documentation to help you set it up here: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/XenitAB/azad-kube-proxy"},"AZAD Documentation")),(0,a.kt)("h3",{id:"otherwise"},"Otherwise"),(0,a.kt)("p",null,"Once you have logged in you can list your subscriptions"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"az account list -o table\n")),(0,a.kt)("p",null,"In the case where you have more than one subscription, you might want to change the default subscription in order to target the correct environment."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"az account set -s <SubscriptionId>\n")),(0,a.kt)("p",null,"To get information about cluster name and resource group for your current default subscription you can use:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"az aks list -o table\n")),(0,a.kt)("p",null,"Once you know the resource group and name of the cluster, you can run the following to add the credentials to your ",(0,a.kt)("inlineCode",{parentName:"p"},"kubekonfig"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"az aks get-credentials --resource-group <ResourceGroup> --name <Name>\n")),(0,a.kt)("h2",{id:"my-first-application"},"My First Application"),(0,a.kt)("p",null,"TBD"),(0,a.kt)("h2",{id:"next-steps"},"Next Steps"),(0,a.kt)("p",null,"TBD"),(0,a.kt)("h2",{id:"troubleshoot-applications-in-kubernetes"},"Troubleshoot applications in Kubernetes"),(0,a.kt)("p",null,"There is a great guide how to debug Kubernetes deployment over at ",(0,a.kt)("a",{parentName:"p",href:"https://learnk8s.io/troubleshooting-deployments"},"learnk8s.io"),"."),(0,a.kt)("p",null,"To debug flux issues have a look at our ",(0,a.kt)("a",{parentName:"p",href:"/docs/xks/developer-guide/ci-cd/flux"},"Flux docs"),"."))}p.isMDXComponent=!0}}]);