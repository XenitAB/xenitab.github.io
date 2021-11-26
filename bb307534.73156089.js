(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{84:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return d}));var n=r(3),a=r(7),i=(r(0),r(93)),s=r(95),o={id:"architecture-and-design",title:"Architecture and design"},c={unversionedId:"xks/operator-guide/architecture-and-design",id:"xks/operator-guide/architecture-and-design",isDocsHomePage:!1,title:"Architecture and design",description:"Overview",source:"@site/docs/xks/operator-guide/architecture-and-design.md",slug:"/xks/operator-guide/architecture-and-design",permalink:"/docs/xks/operator-guide/architecture-and-design",editUrl:"https://github.com/xenitab/xenitab.github.io/edit/main/docs/xks/operator-guide/architecture-and-design.md",version:"current",sidebar:"docs",previous:{title:"Overview",permalink:"/docs/xks/operator-guide/index"},next:{title:"Getting Started",permalink:"/docs/xks/operator-guide/getting-started"}},l=[{value:"Overview",id:"overview",children:[]},{value:"Role-based access management",id:"role-based-access-management",children:[]},{value:"Security and access",id:"security-and-access",children:[{value:"Security",id:"security",children:[]},{value:"Access",id:"access",children:[]}]},{value:"Network design",id:"network-design",children:[]},{value:"Backup",id:"backup",children:[]},{value:"Cost optimization",id:"cost-optimization",children:[]},{value:"Container management",id:"container-management",children:[]},{value:"Xenit Kubernetes Framework",id:"xenit-kubernetes-framework",children:[]}],u={rightToc:l};function d(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"overview"},"Overview"),Object(i.b)("p",null,Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/search?q=topic%3Axenit-kubernetes-framework+org%3AXenitAB+fork%3Atrue"}),"Xenit Kubernetes Framework")," (XKF) is the open source building blocks for a service Xenit AB provides customers: ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://xenit.se/it-tjanster/kubernetes-eng/"}),"Xenit Kubernetes Service")," (XKS)"),Object(i.b)("p",null,"In the terminology of ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/enterprise-scale/architecture"}),"Microsoft Cloud Adoption Framework")," (CAF), Xenit Kubernetes Service is an enterprise-scale landing zone. Additionally, the workload supports multiple cloud providers and AWS is also supported at the moment (but still requires the governance part in Azure)."),Object(i.b)("p",null,"The primary goal of the framework is to provide a standardized service to customers where the creators of the framework (employees at Xenit) can manage multiple environments without having to be the one who set it up - because it looks just about the same in all places. This also provides the ability to fix issues, change standards in one place and not having to repeat the same thing over and over at all customer (or two engineers solving the same problem at two different customers)."),Object(i.b)("img",{alt:"XKS Overview",src:Object(s.a)("img/assets/xks/operator-guide/aks-overview.jpg")}),Object(i.b)("h2",{id:"role-based-access-management"},"Role-based access management"),Object(i.b)("p",null,"All role-based access control (RBAC) and identity & access management (IAM) is handled with Azure AD. Azure AD groups are created and nested using the framework and framework admins as well as customer end users are granted access through these different groups."),Object(i.b)("p",null,"Everything, where possible, exposes two different permissions: Reader and Contributor"),Object(i.b)("p",null,"These permissions are scoped in many different ways and start at the management group level, subscription level, resource group level and at last namespaces in Kubernetes. These are also split over the different environments (development, quality assurance and production) meaning you can have read/write in one environment but only read in the others."),Object(i.b)("p",null,"An owner role and group is also created for most resources, but the recommendation is not to use it as owners will be able to actually change the IAM wich in most cases is undesirable."),Object(i.b)("p",null,"The normal customer end user (often an engineer / developer, referred to as a tenant) is granted read/write to their resource groups and namespaces, meaning they will be able to add/remove whatever they want in their limited scope. This usually means creating deployments in Kubernetes as well as databases and other stateful resources in their Azure Resource Groups. When using AWS Elastic Kubernetes Service (EKS) the delegation insn't as rigorous as in Azure and the default setup creates three accounts where all the customer tenants share resources."),Object(i.b)("p",null,"As a last step, each tenant namespace has the ability to use the cloud provider metadata service to access services in the cloud provider. This is enabled through the tools like ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/Azure/aad-pod-identity"}),"Azure AD POD Identity")," (aad-pod-identity) and ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html"}),"IAM Roles for Service Accounts")," (IRSA). These tools enable the tenants to access resources in their respective resource groups or accounts without having to creat manually shared secrets (that also would have to be rotated)."),Object(i.b)("h2",{id:"security-and-access"},"Security and access"),Object(i.b)("h3",{id:"security"},"Security"),Object(i.b)("p",null,"The platform is based on the principle of least privilege and in every layer we try to only delegate what is needed and no more. This is both true for the tenant and platform resources and their respective access."),Object(i.b)("p",null,"The second part of the work we do around security is try to keep the platform as lean and easy to understand as possible, making sure to remove complexity where needed. Adding security often means a much more complex solution and it is much harder to understand and maintain something complex over something simple, and keeping the cognitive load of maintaining a platform like this as low as possible is always a priority."),Object(i.b)("p",null,"Additionally, we try to add products and services into the mix to make it easier for both the platform team and tenant teams to keep the environment secure. This is an everchanging environment where new things are added as needed and the list below is not an exhaustive one:"),Object(i.b)("h4",{id:"tenant-security"},"Tenant security"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"GitOps for application delivery to clusters"),Object(i.b)("li",{parentName:"ul"},"CI/CD templates for building containers and promoting applications with GitOps"),Object(i.b)("li",{parentName:"ul"},"Tools for security scanning and linting inside the pipelines"),Object(i.b)("li",{parentName:"ul"},"Admission controllers to make sure unsafe configuration is prohibited"),Object(i.b)("li",{parentName:"ul"},"Mutating admission controllers to make it easier to have sane defaults"),Object(i.b)("li",{parentName:"ul"},"Continous education from the platform team"),Object(i.b)("li",{parentName:"ul"},"One account to protect instead of having multiple accounts to access different resources"),Object(i.b)("li",{parentName:"ul"},"Infrastructure as Code with corresponding CI/CD templates for secure deployment of resources"),Object(i.b)("li",{parentName:"ul"},"SSO from the tenant namespaces to the tenant resource groups to make sure no secrets have to be shared"),Object(i.b)("li",{parentName:"ul"},"Ability to use mTLS together with a service mesh (linkerd)"),Object(i.b)("li",{parentName:"ul"},"Automated certificate and dns management from the platform")),Object(i.b)("h4",{id:"platform"},"Platform"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Observability of the platform handled by the platform team"),Object(i.b)("li",{parentName:"ul"},"Runtime security in the platform using Falco"),Object(i.b)("li",{parentName:"ul"},"Automated update management of Infrastructure as Code (with code review)")),Object(i.b)("h3",{id:"access"},"Access"),Object(i.b)("p",null,"The primary authentication method to access any resource is based on Azure AD. This isn't enforced using the framework in all places, with two examples being AWS Console / CLI and GitHub. Most of the actions taken by a tenant engineer will require authentication to Azure AD either using the Azure Management Console or the Azure CLI."),Object(i.b)("p",null,"A tenant will be granted access to the clusters using a ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/XenitAB/azad-kube-proxy"}),"proxy")," built by Xenit and provided in the framework, making sure they don't have to reconfigure their computers when a blue/green deployment of the clusters are made and the Kubernetes API endpoint change. The proxy will move with the clusters and it will be seamless for the tenant engineers."),Object(i.b)("p",null,"The proxy also provides a CLI (kubectl plugin through ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://krew.sigs.k8s.io/"}),"krew"),") that makes it easier to both discover and configure access to the clusters. A valid session with Azure CLI is required to use it."),Object(i.b)("p",null,"Other than that, most of the access and work with the tenant resources are done through a GitOps repository for changes in regards to applications in Kubernetes and a terraform repository in regards to resources in the cloud provider."),Object(i.b)("h2",{id:"network-design"},"Network design"),Object(i.b)("p",null,"By default, the network setup is expected to be quite autonomous and usually considered to be an external service compared to everything else in the organization using it. It is possible to setup peering with internal networks, but usually it begins with a much simpler setup and then grows organically when required."),Object(i.b)("img",{alt:"XKS Simple Network Design",src:Object(s.a)("img/assets/xks/operator-guide/simple-network-design.jpg")}),Object(i.b)("p",null,"The cluster environments are completely separated from each other, but a hub in the production subscription has a peering with them to provide static IP-addresses for CI/CD like terraform to access resources."),Object(i.b)("p",null,"Inside an environment the cluster is using kubenet and Calico to keep the amount of IP-addresses to a minimum. Services can either be exposed internally or externally using either a service or an ingress, where most tenants exclusively use ingress (provided by ingress-nginx)."),Object(i.b)("p",null,"Inside the clusters Calico is used to limit traffic between namespaces."),Object(i.b)("h2",{id:"backup"},"Backup"),Object(i.b)("p",null,"The platform is built to be ephemeral wich means any cluster can at any time be wiped and a new setup without any loss of data. This means that tenants are not allowed to store state inside of the clusters and are required to store it in the cloud provider (blob storage, databases, message queues etc.)."),Object(i.b)("p",null,"Since the deployment is built on GitOps, the current state of the environment is stored in git."),Object(i.b)("p",null,"Backups of databases and resources like it are handled by the cloud provided and is up to the tenant to manage."),Object(i.b)("h2",{id:"cost-optimization"},"Cost optimization"),Object(i.b)("p",null,"The platform team limits how much the clusters can auto scale and a service delivery manager together with the platform team helps the tenants understand their utilization and provides feedback to keep the cost at bay."),Object(i.b)("h2",{id:"container-management"},"Container management"),Object(i.b)("p",null,"When a new tenant is being setup, the platform team provides onboarding for them in the initial phase of the setup and then continously works together to assist in any questions. Monthly health checks are done to make sure that no obvious mistakes have been made by the tenants and monitoring is setup to warn the platform team if something is wrong with the platform."),Object(i.b)("p",null,"Most of the management of the workloads that the tenants deploy are handled through GitOps but they are also able to work with the clusters directly, with the knowledge that any cluster may at any time be rolled over (blue/green) and anything not in git won't be persisted."),Object(i.b)("h2",{id:"xenit-kubernetes-framework"},"Xenit Kubernetes Framework"),Object(i.b)("p",null,"XKF is set up from a set of Terraform modules that when combined creates the full XKS service. There are multiple individual states that all fulfill their own purpose and build\nupon each other in a hierarchical manner. The first setup requires applying the Terraform in the correct order, but after that ordering should not matter. Separate states are used\nas it allows for a more flexible architecture that could be changed in parallel."),Object(i.b)("img",{alt:"XKS Overview",src:Object(s.a)("img/assets/xks/operator-guide/aks-overview.jpg")}),Object(i.b)("p",null,"The AKS terraform contains three modules that are used to setup a Kubernetes cluster. To allow for blue/green deployments of AKS clusters resources have to be split up in to\nglobal resources that can be shared between the clusters, and cluster specific resources."),Object(i.b)("p",null,"The aks-global module contains the global resources like ACR, DNS and Azure AD configuration."),Object(i.b)("p",null,"The aks and aks-core module creates a AKS cluster and configures it. This cluster will have a suffix, normally a number to allow for temporarily creating multiple clusters\nwhen performing a blue/green deployment of the clusters. Namespaces will be created in the cluster for each of the configured tenants. Each namespaces is linked to a resource\ngroup in Azure where namespace resources are expected to be created."),Object(i.b)("img",{alt:"AKS Resource Groups",src:Object(s.a)("img/assets/xks/operator-guide/aks-rg-xks-overview.jpg")}))}d.isMDXComponent=!0},93:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return b}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(r),p=n,b=d["".concat(s,".").concat(p)]||d[p]||h[p]||i;return r?a.a.createElement(b,o(o({ref:t},l),{},{components:r})):a.a.createElement(b,o({ref:t},l))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,s=new Array(i);s[0]=p;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:n,s[1]=o;for(var l=2;l<i;l++)s[l]=r[l];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},94:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(20);t.default=function(){var e=Object(n.useContext)(a.a);if(null===e)throw new Error("Docusaurus context not provided");return e}},95:function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return s}));var n=r(94),a=r(96);function i(){var e=Object(n.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,r=void 0===t?"/":t,i=e.url;return{withBaseUrl:function(e,t){return function(e,t,r,n){var i=void 0===n?{}:n,s=i.forcePrependBaseUrl,o=void 0!==s&&s,c=i.absolute,l=void 0!==c&&c;if(!r)return r;if(r.startsWith("#"))return r;if(Object(a.b)(r))return r;if(o)return t+r;var u=r.startsWith(t)?r:t+r.replace(/^\//,"");return l?e+u:u}(i,r,e,t)}}}function s(e,t){return void 0===t&&(t={}),(0,i().withBaseUrl)(e,t)}},96:function(e,t,r){"use strict";function n(e){return!0===/^(\w*:|\/\/)/.test(e)}function a(e){return void 0!==e&&!n(e)}r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return a}))}}]);