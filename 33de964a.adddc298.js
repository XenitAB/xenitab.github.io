(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{139:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},c=Object.keys(e);for(a=0;a<c.length;a++)r=c[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)r=c[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=n.a.createContext({}),i=function(e){var t=n.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=i(e.components);return n.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,c=e.originalType,b=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),l=i(r),d=a,m=l["".concat(b,".").concat(d)]||l[d]||p[d]||c;return r?n.a.createElement(m,o(o({ref:t},s),{},{components:r})):n.a.createElement(m,o({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=r.length,b=new Array(c);b[0]=d;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:a,b[1]=o;for(var s=2;s<c;s++)b[s]=r[s];return n.a.createElement.apply(null,b)}return n.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},77:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return b})),r.d(t,"metadata",(function(){return o})),r.d(t,"rightToc",(function(){return u})),r.d(t,"default",(function(){return i}));var a=r(3),n=r(7),c=(r(0),r(139)),b={title:"Azure Key Vault Provider for Secrets Store CSI Driver",slug:"/terraform-modules/kubernetes/csi-secrets-store-provider-azure",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/csi-secrets-store-provider-azure/README.md"},o={unversionedId:"terraform-modules/kubernetes/csi-secrets-store-provider-azure",id:"terraform-modules/kubernetes/csi-secrets-store-provider-azure",isDocsHomePage:!1,title:"Azure Key Vault Provider for Secrets Store CSI Driver",description:"Adds csi-secrets-store-provider-azure to a Kubernetes cluster.",source:"@site/docs/terraform-modules/kubernetes/csi-secrets-store-provider-azure.md",slug:"/terraform-modules/kubernetes/csi-secrets-store-provider-azure",permalink:"/docs/terraform-modules/kubernetes/csi-secrets-store-provider-azure",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/csi-secrets-store-provider-azure/README.md",version:"current"},u=[{value:"Requirements",id:"requirements",children:[]},{value:"Providers",id:"providers",children:[]},{value:"Modules",id:"modules",children:[]},{value:"Resources",id:"resources",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Outputs",id:"outputs",children:[]}],s={rightToc:u};function i(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Adds ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/Azure/secrets-store-csi-driver-provider-azure"}),"csi-secrets-store-provider-azure")," to a Kubernetes cluster."),Object(c.b)("h2",{id:"requirements"},"Requirements"),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Version"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",{name:"requirement_terraform"})," ",Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"#requirement_terraform"}),"terraform")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"0.15.3")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",{name:"requirement_helm"})," ",Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"#requirement_helm"}),"helm")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.2.0")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",{name:"requirement_kubernetes"})," ",Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"#requirement_kubernetes"}),"kubernetes")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.4.1")))),Object(c.b)("h2",{id:"providers"},"Providers"),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Version"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",{name:"provider_helm"})," ",Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"#provider_helm"}),"helm")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.2.0")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",{name:"provider_kubernetes"})," ",Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"#provider_kubernetes"}),"kubernetes")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.4.1")))),Object(c.b)("h2",{id:"modules"},"Modules"),Object(c.b)("p",null,"No modules."),Object(c.b)("h2",{id:"resources"},"Resources"),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/helm/2.2.0/docs/resources/release"}),"helm_release.csi_secrets_store_provider_azure")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"resource")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/kubernetes/2.4.1/docs/resources/namespace"}),"kubernetes_namespace.this")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"resource")))),Object(c.b)("h2",{id:"inputs"},"Inputs"),Object(c.b)("p",null,"No inputs."),Object(c.b)("h2",{id:"outputs"},"Outputs"),Object(c.b)("p",null,"No outputs."))}i.isMDXComponent=!0}}]);