(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{109:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return j}));var r=a(0),n=a.n(r);function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},b=Object.keys(e);for(r=0;r<b.length;r++)a=b[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(r=0;r<b.length;r++)a=b[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=n.a.createContext({}),u=function(e){var t=n.a.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=u(e.components);return n.a.createElement(i.Provider,{value:t},e.children)},O={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,b=e.originalType,l=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),p=u(a),d=r,j=p["".concat(l,".").concat(d)]||p[d]||O[d]||b;return a?n.a.createElement(j,c(c({ref:t},i),{},{components:a})):n.a.createElement(j,c({ref:t},i))}));function j(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var b=a.length,l=new Array(b);l[0]=d;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var i=2;i<b;i++)l[i]=a[i];return n.a.createElement.apply(null,l)}return n.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},132:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/fluxcd-v2-cd7b8300384cf8a51744bb537697956d.jpg"},82:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return c})),a.d(t,"rightToc",(function(){return o})),a.d(t,"default",(function(){return u}));var r=a(3),n=a(7),b=(a(0),a(109)),l={title:"Flux V2",slug:"/terraform-modules/kubernetes/fluxcd-v2-azdo",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/fluxcd-v2-azdo/README.md"},c={unversionedId:"terraform-modules/kubernetes/fluxcd-v2-azdo",id:"terraform-modules/kubernetes/fluxcd-v2-azdo",isDocsHomePage:!1,title:"Flux V2",description:"Installs and configures flux2 with Azure DevOps.",source:"@site/docs/terraform-modules/kubernetes/fluxcd-v2-azdo.md",slug:"/terraform-modules/kubernetes/fluxcd-v2-azdo",permalink:"/docs/terraform-modules/kubernetes/fluxcd-v2-azdo",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/fluxcd-v2-azdo/README.md",version:"current",sidebar:"docs",previous:{title:"Flux (v1)",permalink:"/docs/terraform-modules/kubernetes/fluxcd-v1"},next:{title:"Flux V2",permalink:"/docs/terraform-modules/kubernetes/fluxcd-v2-github"}},o=[{value:"Requirements",id:"requirements",children:[]},{value:"Providers",id:"providers",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Outputs",id:"outputs",children:[]}],i={rightToc:o};function u(e){var t=e.components,l=Object(n.a)(e,["components"]);return Object(b.b)("wrapper",Object(r.a)({},i,l,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"Installs and configures ",Object(b.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/fluxcd/flux2"}),"flux2")," with Azure DevOps."),Object(b.b)("p",null,"The module is meant to offer a full bootstrap and confiugration of a Kubernetes cluster",Object(b.b)("br",{parentName:"p"}),"\n",'with Fluxv2. A "root" repository is created for the bootstrap configuration along with a',Object(b.b)("br",{parentName:"p"}),"\n","repository per namepsace passed in the variables. The root repository will receive ",Object(b.b)("inlineCode",{parentName:"p"},"cluster-admin"),Object(b.b)("br",{parentName:"p"}),"\n","permissions in the cluster while each of the namespace repositories will be limited to their",Object(b.b)("br",{parentName:"p"}),"\n","repsective namespace. The CRDs, component deployments and bootstrap configuration are both",Object(b.b)("br",{parentName:"p"}),"\n","added to the Kubernetes cluster and commited to the root repository. While the namespace",Object(b.b)("br",{parentName:"p"}),"\n","configuration is only comitted to the root repository and expected to be reconciled through",Object(b.b)("br",{parentName:"p"}),"\n","the bootstrap configuration."),Object(b.b)("p",null,Object(b.b)("img",{alt:"flux-arch",src:a(132).default})),Object(b.b)("h2",{id:"requirements"},"Requirements"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"terraform"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"0.13.5")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"azuredevops"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"0.3.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"flux"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"0.0.6")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"kubectl"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"1.9.1")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"kubernetes"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"1.13.3")))),Object(b.b)("h2",{id:"providers"},"Providers"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"azuredevops"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"0.3.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"flux"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"0.0.6")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"kubectl"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"1.9.1")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"kubernetes"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"1.13.3")))),Object(b.b)("h2",{id:"inputs"},"Inputs"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Description"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:"center"}),"Required"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"azure","_","devops","_","org"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Azure DevOps organization for bootstrap repository"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"azure","_","devops","_","pat"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"PAT to authenticate with Azure DevOps"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"azure","_","devops","_","proj"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Azure DevOps project for bootstrap repository"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"bootstrap","_","path"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Path to reconcile bootstrap from"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"bootstrap","_","repo"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Name of repository to bootstrap from"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"fleet-infra"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"branch"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Path to reconcile bootstrap from"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"master"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"namespaces"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The namespaces to configure flux with"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"list(",Object(b.b)("br",null),"    object({",Object(b.b)("br",null),"      name = string",Object(b.b)("br",null),"      flux = object({",Object(b.b)("br",null),"        enabled = bool",Object(b.b)("br",null),"        repo    = string",Object(b.b)("br",null),"      })",Object(b.b)("br",null),"    })",Object(b.b)("br",null),"  )")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")))),Object(b.b)("h2",{id:"outputs"},"Outputs"),Object(b.b)("p",null,"No output."))}u.isMDXComponent=!0}}]);