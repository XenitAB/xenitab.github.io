(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{122:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return j}));var a=r(0),n=r.n(a);function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},b=Object.keys(e);for(a=0;a<b.length;a++)r=b[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(a=0;a<b.length;a++)r=b[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=n.a.createContext({}),p=function(e){var t=n.a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=p(e.components);return n.a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},O=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,b=e.originalType,c=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),u=p(r),O=a,j=u["".concat(c,".").concat(O)]||u[O]||d[O]||b;return r?n.a.createElement(j,l(l({ref:t},i),{},{components:r})):n.a.createElement(j,l({ref:t},i))}));function j(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var b=r.length,c=new Array(b);c[0]=O;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,c[1]=l;for(var i=2;i<b;i++)c[i]=r[i];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,r)}O.displayName="MDXCreateElement"},145:function(e,t,r){"use strict";r.r(t),t.default=r.p+"assets/images/fluxcd-v2-cd7b8300384cf8a51744bb537697956d.jpg"},87:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return o})),r.d(t,"default",(function(){return p}));var a=r(3),n=r(7),b=(r(0),r(122)),c={title:"Flux V2",slug:"/terraform-modules/kubernetes/fluxcd-v2-azdo",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/fluxcd-v2-azdo/README.md"},l={unversionedId:"terraform-modules/kubernetes/fluxcd-v2-azdo",id:"terraform-modules/kubernetes/fluxcd-v2-azdo",isDocsHomePage:!1,title:"Flux V2",description:"Installs and configures flux2 with Azure DevOps.",source:"@site/docs/terraform-modules/kubernetes/fluxcd-v2-azdo.md",slug:"/terraform-modules/kubernetes/fluxcd-v2-azdo",permalink:"/docs/terraform-modules/kubernetes/fluxcd-v2-azdo",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/modules/kubernetes/fluxcd-v2-azdo/README.md",version:"current",sidebar:"docs",previous:{title:"Flux (v1)",permalink:"/docs/terraform-modules/kubernetes/fluxcd-v1"},next:{title:"Flux V2",permalink:"/docs/terraform-modules/kubernetes/fluxcd-v2-github"}},o=[{value:"Requirements",id:"requirements",children:[]},{value:"Providers",id:"providers",children:[]},{value:"Modules",id:"modules",children:[]},{value:"Resources",id:"resources",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Outputs",id:"outputs",children:[]}],i={rightToc:o};function p(e){var t=e.components,c=Object(n.a)(e,["components"]);return Object(b.b)("wrapper",Object(a.a)({},i,c,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"Installs and configures ",Object(b.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/fluxcd/flux2"}),"flux2")," with Azure DevOps."),Object(b.b)("p",null,"The module is meant to offer a full bootstrap and confiugration of a Kubernetes cluster",Object(b.b)("br",{parentName:"p"}),"\n",'with Fluxv2. A "root" repository is created for the bootstrap configuration along with a',Object(b.b)("br",{parentName:"p"}),"\n","repository per namepsace passed in the variables. The root repository will receive ",Object(b.b)("inlineCode",{parentName:"p"},"cluster-admin"),Object(b.b)("br",{parentName:"p"}),"\n","permissions in the cluster while each of the namespace repositories will be limited to their",Object(b.b)("br",{parentName:"p"}),"\n","repsective namespace. The CRDs, component deployments and bootstrap configuration are both",Object(b.b)("br",{parentName:"p"}),"\n","added to the Kubernetes cluster and commited to the root repository. While the namespace",Object(b.b)("br",{parentName:"p"}),"\n","configuration is only comitted to the root repository and expected to be reconciled through",Object(b.b)("br",{parentName:"p"}),"\n","the bootstrap configuration."),Object(b.b)("p",null,Object(b.b)("img",{alt:"flux-arch",src:r(145).default})),Object(b.b)("h2",{id:"requirements"},"Requirements"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"terraform"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"0.14.7")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"azuredevops"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"0.3.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"flux"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"0.0.12")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"helm"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.0.2")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"kubectl"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"1.10.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"kubernetes"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.0.2")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"random"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"3.1.0")))),Object(b.b)("h2",{id:"providers"},"Providers"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"azuredevops"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"0.3.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"flux"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"0.0.12")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"helm"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.0.2")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"kubectl"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"1.10.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"kubernetes"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"2.0.2")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"random"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"3.1.0")))),Object(b.b)("h2",{id:"modules"},"Modules"),Object(b.b)("p",null,"No Modules."),Object(b.b)("h2",{id:"resources"},"Resources"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/xenitab/azuredevops/0.3.0/docs/data-sources/git_repository"}),"azuredevops_git_repository"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/xenitab/azuredevops/0.3.0/docs/resources/git_repository_file"}),"azuredevops_git_repository_file"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/xenitab/azuredevops/0.3.0/docs/data-sources/project"}),"azuredevops_project"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/fluxcd/flux/0.0.12/docs/data-sources/install"}),"flux_install"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/fluxcd/flux/0.0.12/docs/data-sources/sync"}),"flux_sync"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/helm/2.0.2/docs/resources/release"}),"helm_release"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/gavinbunney/kubectl/1.10.0/docs/data-sources/file_documents"}),"kubectl_file_documents"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/gavinbunney/kubectl/1.10.0/docs/resources/manifest"}),"kubectl_manifest"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/kubernetes/2.0.2/docs/resources/namespace"}),"kubernetes_namespace"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/kubernetes/2.0.2/docs/resources/secret"}),"kubernetes_secret"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(a.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/random/3.1.0/docs/resources/password"}),"random_password"))))),Object(b.b)("h2",{id:"inputs"},"Inputs"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(a.a)({parentName:"tr"},{align:"center"}),"Required"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"azure","_","devops","_","org"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Azure DevOps organization for bootstrap repository"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"azure","_","devops","_","pat"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"PAT to authenticate with Azure DevOps"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"azure","_","devops","_","proj"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Azure DevOps project for bootstrap repository"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"branch"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Branch to point source controller towards"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"main"')),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"cluster","_","repo"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Name of cluster repository"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"fleet-infra"')),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"environment"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Environment name of the cluster"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"namespaces"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"The namespaces to configure flux with"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"list(",Object(b.b)("br",null),"    object({",Object(b.b)("br",null),"      name = string",Object(b.b)("br",null),"      flux = object({",Object(b.b)("br",null),"        enabled = bool",Object(b.b)("br",null),"        azure_devops = object({",Object(b.b)("br",null),"          org  = string",Object(b.b)("br",null),"          proj = string",Object(b.b)("br",null),"          repo = string",Object(b.b)("br",null),"        })",Object(b.b)("br",null),"      })",Object(b.b)("br",null),"    })",Object(b.b)("br",null),"  )")),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"yes")))),Object(b.b)("h2",{id:"outputs"},"Outputs"),Object(b.b)("p",null,"No output."))}p.isMDXComponent=!0}}]);