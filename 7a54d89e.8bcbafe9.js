(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{100:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return i})),r.d(t,"default",(function(){return o}));var n=r(3),a=r(7),b=(r(0),r(144)),c={title:"Xenit Platform Configuration",slug:"/terraform-modules/kubernetes/xenit",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/xenit/README.md"},l={unversionedId:"terraform-modules/kubernetes/xenit",id:"terraform-modules/kubernetes/xenit",isDocsHomePage:!1,title:"Xenit Platform Configuration",description:"This module is used to add Xenit Kubernetes Framework configuration to Kubernetes clusters.",source:"@site/docs/terraform-modules/kubernetes/xenit.md",slug:"/terraform-modules/kubernetes/xenit",permalink:"/docs/terraform-modules/kubernetes/xenit",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/xenit/README.md",version:"current",sidebar:"docs",previous:{title:"Velero",permalink:"/docs/terraform-modules/kubernetes/velero"},next:{title:"Azure DevOps Templates",permalink:"/docs/azure-devops-templates"}},i=[{value:"Requirements",id:"requirements",children:[]},{value:"Providers",id:"providers",children:[]},{value:"Modules",id:"modules",children:[]},{value:"Resources",id:"resources",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Outputs",id:"outputs",children:[]}],u={rightToc:i};function o(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"This module is used to add Xenit Kubernetes Framework configuration to Kubernetes clusters."),Object(b.b)("p",null,"You need to configure a certificate in Azure KeyVault"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell"}),"openssl pkcs12 -export -in tenant-xenit-proxy.crt -inkey tenant-xenit-proxy.key -out tenant-xenit-proxy.pfx\naz keyvault certificate import --vault-name <aks keyvault name> -n xenit-proxy-certificate -f tenant-xenit-proxy.pfx\n")),Object(b.b)("h2",{id:"requirements"},"Requirements"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_terraform"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#requirement_terraform"}),"terraform")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"0.15.3")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_helm"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#requirement_helm"}),"helm")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.3.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_kubernetes"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#requirement_kubernetes"}),"kubernetes")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.4.1")))),Object(b.b)("h2",{id:"providers"},"Providers"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"provider_helm"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#provider_helm"}),"helm")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.3.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"provider_kubernetes"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#provider_kubernetes"}),"kubernetes")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"2.4.1")))),Object(b.b)("h2",{id:"modules"},"Modules"),Object(b.b)("p",null,"No modules."),Object(b.b)("h2",{id:"resources"},"Resources"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/helm/2.3.0/docs/resources/release"}),"helm_release.xenit_proxy")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"resource")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/helm/2.3.0/docs/resources/release"}),"helm_release.xenit_proxy_extras")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"resource")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/kubernetes/2.4.1/docs/resources/namespace"}),"kubernetes_namespace.this")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"resource")))),Object(b.b)("h2",{id:"inputs"},"Inputs"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"center"}),"Required"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_aws_config"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#input_aws_config"}),"aws","_","config")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"AWS specific configuration"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"object({",Object(b.b)("br",null),"    role_arn = string",Object(b.b)("br",null),"  })")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"{",Object(b.b)("br",null),'  "role_arn": ""',Object(b.b)("br",null),"}")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_azure_config"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#input_azure_config"}),"azure","_","config")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Azure specific configuration"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"object({",Object(b.b)("br",null),"    azure_key_vault_name = string",Object(b.b)("br",null),"    identity = object({",Object(b.b)("br",null),"      client_id   = string",Object(b.b)("br",null),"      resource_id = string",Object(b.b)("br",null),"      tenant_id   = string",Object(b.b)("br",null),"    })",Object(b.b)("br",null),"  })")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"{",Object(b.b)("br",null),'  "azure_key_vault_name": "",',Object(b.b)("br",null),'  "identity": {',Object(b.b)("br",null),'    "client_id": "",',Object(b.b)("br",null),'    "resource_id": "",',Object(b.b)("br",null),'    "tenant_id": ""',Object(b.b)("br",null),"  }",Object(b.b)("br",null),"}")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_cloud_provider"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#input_cloud_provider"}),"cloud","_","provider")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Cloud provider to use"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_loki_api_fqdn"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#input_loki_api_fqdn"}),"loki","_","api","_","fqdn")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The loki api fqdn"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_thanos_receiver_fqdn"})," ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"#input_thanos_receiver_fqdn"}),"thanos","_","receiver","_","fqdn")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The thanos receiver fqdn"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"center"}),"yes")))),Object(b.b)("h2",{id:"outputs"},"Outputs"),Object(b.b)("p",null,"No outputs."))}o.isMDXComponent=!0},144:function(e,t,r){"use strict";r.d(t,"a",(function(){return O})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},b=Object.keys(e);for(n=0;n<b.length;n++)r=b[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(n=0;n<b.length;n++)r=b[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=a.a.createContext({}),o=function(e){var t=a.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},O=function(e){var t=o(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},j=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,b=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),O=o(r),j=n,m=O["".concat(c,".").concat(j)]||O[j]||p[j]||b;return r?a.a.createElement(m,l(l({ref:t},u),{},{components:r})):a.a.createElement(m,l({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var b=r.length,c=new Array(b);c[0]=j;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,c[1]=l;for(var u=2;u<b;u++)c[u]=r[u];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}j.displayName="MDXCreateElement"}}]);