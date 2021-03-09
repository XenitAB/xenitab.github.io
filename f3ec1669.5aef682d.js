(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{117:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return i})),r.d(t,"default",(function(){return s}));var n=r(3),a=r(7),b=(r(0),r(122)),o={title:"Ingress NGINX (ingress-nginx)",slug:"/terraform-modules/kubernetes/ingress-nginx",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/ingress-nginx/README.md"},c={unversionedId:"terraform-modules/kubernetes/ingress-nginx",id:"terraform-modules/kubernetes/ingress-nginx",isDocsHomePage:!1,title:"Ingress NGINX (ingress-nginx)",description:"This module is used to add ingress-nginx to Kubernetes clusters.",source:"@site/docs/terraform-modules/kubernetes/ingress-nginx.md",slug:"/terraform-modules/kubernetes/ingress-nginx",permalink:"/docs/terraform-modules/kubernetes/ingress-nginx",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/ingress-nginx/README.md",version:"current",sidebar:"docs",previous:{title:"Flux V2",permalink:"/docs/terraform-modules/kubernetes/fluxcd-v2-github"},next:{title:"kyverno",permalink:"/docs/terraform-modules/kubernetes/kyverno"}},i=[{value:"Requirements",id:"requirements",children:[]},{value:"Providers",id:"providers",children:[]},{value:"Modules",id:"modules",children:[]},{value:"Resources",id:"resources",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Outputs",id:"outputs",children:[]}],l={rightToc:i};function s(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"This module is used to add ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/kubernetes/ingress-nginx"}),Object(b.b)("inlineCode",{parentName:"a"},"ingress-nginx"))," to Kubernetes clusters."),Object(b.b)("h2",{id:"requirements"},"Requirements"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"terraform"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"0.14.7")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"helm"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.0.2")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"kubernetes"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.0.2")))),Object(b.b)("h2",{id:"providers"},"Providers"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"helm"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.0.2")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"kubernetes"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.0.2")))),Object(b.b)("h2",{id:"modules"},"Modules"),Object(b.b)("p",null,"No Modules."),Object(b.b)("h2",{id:"resources"},"Resources"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/helm/2.0.2/docs/resources/release"}),"helm_release"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/kubernetes/2.0.2/docs/resources/namespace"}),"kubernetes_namespace"))))),Object(b.b)("h2",{id:"inputs"},"Inputs"),Object(b.b)("p",null,"No input."),Object(b.b)("h2",{id:"outputs"},"Outputs"),Object(b.b)("p",null,"No output."))}s.isMDXComponent=!0},122:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},b=Object.keys(e);for(n=0;n<b.length;n++)r=b[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(n=0;n<b.length;n++)r=b[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),s=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=s(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,b=e.originalType,o=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=s(r),d=n,m=u["".concat(o,".").concat(d)]||u[d]||p[d]||b;return r?a.a.createElement(m,c(c({ref:t},l),{},{components:r})):a.a.createElement(m,c({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var b=r.length,o=new Array(b);o[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var l=2;l<b;l++)o[l]=r[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);