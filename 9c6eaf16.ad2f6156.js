(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{104:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return i})),r.d(t,"default",(function(){return u}));var a=r(3),n=r(7),b=(r(0),r(137)),c={title:"Azure AD POD Identity (AAD-POD-Identity)",slug:"/terraform-modules/kubernetes/aad-pod-identity",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/aad-pod-identity/README.md"},l={unversionedId:"terraform-modules/kubernetes/aad-pod-identity",id:"terraform-modules/kubernetes/aad-pod-identity",isDocsHomePage:!1,title:"Azure AD POD Identity (AAD-POD-Identity)",description:"This module is used to add aad-pod-identity to Kubernetes clusters (tested with AKS).",source:"@site/docs/terraform-modules/kubernetes/aad-pod-identity.md",slug:"/terraform-modules/kubernetes/aad-pod-identity",permalink:"/docs/terraform-modules/kubernetes/aad-pod-identity",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/aad-pod-identity/README.md",version:"current"},i=[{value:"Requirements",id:"requirements",children:[]},{value:"Providers",id:"providers",children:[]},{value:"Modules",id:"modules",children:[]},{value:"Resources",id:"resources",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Outputs",id:"outputs",children:[]}],d={rightToc:i};function u(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(b.b)("wrapper",Object(a.a)({},d,r,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"This module is used to add ",Object(b.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/Azure/aad-pod-identity"}),Object(b.b)("inlineCode",{parentName:"a"},"aad-pod-identity"))," to Kubernetes clusters (tested with AKS)."),Object(b.b)("h2",{id:"requirements"},"Requirements"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_terraform"})," ",Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"#requirement_terraform"}),"terraform")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"0.15.3")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_helm"})," ",Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"#requirement_helm"}),"helm")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.2.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_kubernetes"})," ",Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"#requirement_kubernetes"}),"kubernetes")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.4.1")))),Object(b.b)("h2",{id:"providers"},"Providers"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"provider_helm"})," ",Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"#provider_helm"}),"helm")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.2.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"provider_kubernetes"})," ",Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"#provider_kubernetes"}),"kubernetes")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.4.1")))),Object(b.b)("h2",{id:"modules"},"Modules"),Object(b.b)("p",null,"No modules."),Object(b.b)("h2",{id:"resources"},"Resources"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/helm/2.2.0/docs/resources/release"}),"helm_release.aad_pod_identity")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"resource")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/kubernetes/2.4.1/docs/resources/namespace"}),"kubernetes_namespace.this")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"resource")))),Object(b.b)("h2",{id:"inputs"},"Inputs"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:"center"}),"Required"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_aad_pod_identity"})," ",Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"#input_aad_pod_identity"}),"aad","_","pod","_","identity")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Configuration for aad pod identity"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"map(object({",Object(b.b)("br",null),"    id        = string",Object(b.b)("br",null),"    client_id = string",Object(b.b)("br",null),"  }))")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_namespaces"})," ",Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"#input_namespaces"}),"namespaces")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Namespaces to create AzureIdentity and AzureIdentityBindings in."),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"list(",Object(b.b)("br",null),"    object({",Object(b.b)("br",null),"      name = string",Object(b.b)("br",null),"    })",Object(b.b)("br",null),"  )")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"yes")))),Object(b.b)("h2",{id:"outputs"},"Outputs"),Object(b.b)("p",null,"No outputs."))}u.isMDXComponent=!0},137:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},b=Object.keys(e);for(a=0;a<b.length;a++)r=b[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(a=0;a<b.length;a++)r=b[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=n.a.createContext({}),u=function(e){var t=n.a.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},o=function(e){var t=u(e.components);return n.a.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},O=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,b=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),o=u(r),O=a,m=o["".concat(c,".").concat(O)]||o[O]||p[O]||b;return r?n.a.createElement(m,l(l({ref:t},d),{},{components:r})):n.a.createElement(m,l({ref:t},d))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var b=r.length,c=new Array(b);c[0]=O;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,c[1]=l;for(var d=2;d<b;d++)c[d]=r[d];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,r)}O.displayName="MDXCreateElement"}}]);