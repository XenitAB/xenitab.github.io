"use strict";(self.webpackChunkhome=self.webpackChunkhome||[]).push([[4021],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=o.createContext({}),s=function(e){var t=o.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return o.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,h=d["".concat(u,".").concat(m)]||d[m]||p[m]||r;return n?o.createElement(h,i(i({ref:t},c),{},{components:n})):o.createElement(h,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<r;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7381:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return c},default:function(){return d}});var o=n(7462),a=n(3366),r=(n(7294),n(3905)),i=["components"],l={id:"flux",title:"Flux"},u=void 0,s={unversionedId:"xks/developer-guide/ci-cd/flux",id:"xks/developer-guide/ci-cd/flux",isDocsHomePage:!1,title:"Flux",description:"Flux is very tightly coupled with XKF and it is how we deploy all tenant YAML to our clusters.",source:"@site/docs/xks/developer-guide/ci-cd/flux.md",sourceDirName:"xks/developer-guide/ci-cd",slug:"/xks/developer-guide/ci-cd/flux",permalink:"/docs/xks/developer-guide/ci-cd/flux",editUrl:"https://github.com/xenitab/xenitab.github.io/edit/main/docs/xks/developer-guide/ci-cd/flux.md",tags:[],version:"current",frontMatter:{id:"flux",title:"Flux"},sidebar:"docs",previous:{title:"GitOps a la XKS",permalink:"/docs/xks/developer-guide/ci-cd/gitops"},next:{title:"Observability",permalink:"/docs/xks/developer-guide/observability"}},c=[{value:"Flux CLI",id:"flux-cli",children:[],level:2},{value:"XKF and Flux",id:"xkf-and-flux",children:[],level:2},{value:"Debugging",id:"debugging",children:[{value:"Normal error",id:"normal-error",children:[],level:3},{value:"git repositories",id:"git-repositories",children:[],level:3},{value:"Kustomization",id:"kustomization",children:[],level:3}],level:2}],p={toc:c};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Flux is very tightly coupled with XKF and it is how we deploy all tenant YAML to our clusters.\nThe goal of this document is to give you as a developer a quick overview of\nhow to get use Flux in XKF and perform simple debugging tasks.\nFlux has its own ",(0,r.kt)("a",{parentName:"p",href:"https://fluxcd.io/"},"official documentation")," where you can find much more information."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"In this document we will only cover Flux v2\nBefore reading any further please read through the ",(0,r.kt)("a",{parentName:"p",href:"https://fluxcd.io/docs/concepts/"},"core concepts")," of flux.")),(0,r.kt)("p",null,"Our very own Philip Laine's ",(0,r.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=F7B_TBcIyl8"},"presentation")," at KubeCon 2021 shows a similar workflow to what we use."),(0,r.kt)("h2",{id:"flux-cli"},"Flux CLI"),(0,r.kt)("p",null,"You do not have to use the Flux CLI but it can be very helpful especially if want to force a reconciliation of a Flux resource.\nIn some of the commands and debugging we assume that you have the CLI installed.\nHere you can find more information on how to setup the ",(0,r.kt)("a",{parentName:"p",href:"https://fluxcd.io/docs/installation/"},"Flux CLI"),"."),(0,r.kt)("h2",{id:"xkf-and-flux"},"XKF and Flux"),(0,r.kt)("p",null,"In the XKF framework we talk a lot about tenants, from a Kubernetes point of view a tenant is a namespace that has been generated using Terraform.\nIf you want more information on how that works you can look at the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/fluxcd-v2-azdo"},"AZDO module"),"\nand the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/fluxcd-v2-github"},"GitHub module"),"."),(0,r.kt)("p",null,"The module populates the tenant namespaces by creating a basic config with a Flux GitRepository and Kustomization pointing to a pre-defined repository and path.\nIt stores this in a central repository that normally your platform team manages and it should only be updated using Terraform."),(0,r.kt)("p",null,"At the time of writing these docs the files generated could look something like this if you are using Azure DevOps (AZDO) and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/XenitAB/azdo-proxy"},"AZDO-proxy"),"."),(0,r.kt)("p",null,"As a member of ",(0,r.kt)("inlineCode",{parentName:"p"},"tenant1")," you will be able to see these resources in your namespace, in this case ",(0,r.kt)("inlineCode",{parentName:"p"},"tenant1"),".\nYou should never modify these resources manually, Flux will overwrite any manual changes back to the config defined in the git repository."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"---\napiVersion: source.toolkit.fluxcd.io/v1beta1\nkind: GitRepository\nmetadata:\n  name: tenant1\n  namespace: tenant1\nspec:\n  # If you are using github libgit2 will not be defined\n  gitImplementation: libgit2\n  interval: 1m\n  # This example url assumes that you are using AZDO-proxy https://github.com/XenitAB/azdo-proxy\n  url: http://azdo-proxy.flux-system.svc.cluster.local/Org1/project1/_git/gitops\n  secretRef:\n    name: flux\n  ref:\n    branch: main\n---\napiVersion: kustomize.toolkit.fluxcd.io/v1beta1\nkind: Kustomization\nmetadata:\n  name: tenant1\n  namespace: tenant1\nspec:\n  serviceAccountName: flux\n  interval: 5m\n  path: ./tenant/dev\n  sourceRef:\n    kind: GitRepository\n    name: tenant1\n  prune: true\n  validation: client\n")),(0,r.kt)("h2",{id:"debugging"},"Debugging"),(0,r.kt)("p",null,"Below, you will find a few good base commands to debug why Flux has not applied your changes."),(0,r.kt)("h3",{id:"normal-error"},"Normal error"),(0,r.kt)("p",null,"When adding a new file to your GitOps repository do not forget to update the ",(0,r.kt)("inlineCode",{parentName:"p"},"kustomization.yaml")," file."),(0,r.kt)("p",null,"It can easily happen that you create a file in your repository and you commit it and when you look in the cluster it has not been synced.\nThis is most likely due to that you have missed to update the ",(0,r.kt)("inlineCode",{parentName:"p"},"kustomization.yaml")," file."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-kustomization.yaml"},"apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n  - deployment.yaml\n  - ingress.yaml\n  - networkpolicy.yaml\n")),(0,r.kt)("h3",{id:"git-repositories"},"git repositories"),(0,r.kt)("p",null,"Shows you the status if your changes have been synced to the cluster."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ kubectl get gitrepositories\nNAME   URL                                                                         READY   STATUS                                                            AGE\nwt     http://azdo-proxy.flux-system.svc.cluster.local/Org1/project1/_git/gitops   True    Fetched revision: main/9baa401630894b78ecc5fa5ebdf72c978583dea8   2d2h\n")),(0,r.kt)("p",null,"Flux should automatically pull the changes to the cluster but if you think they sync takes\nto long time or you want to sync it for some other reason you can."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Remember to provide the --namespace flag, else Flux will assume the source is in the ",(0,r.kt)("inlineCode",{parentName:"p"},"flux-system")," namespace.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"flux reconcile source git tenant1 --namespace tenant1\n")),(0,r.kt)("h3",{id:"kustomization"},"Kustomization"),(0,r.kt)("p",null,"It is always good to check if Flux has applied your changes and if your health checks have passed.\nOverall the checksum of your source and the kustomization resource should be the same."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ kubectl get kustomizations\nNAME       READY   STATUS                                                            AGE\napps-dev   True    Applied revision: main/9baa401630894b78ecc5fa5ebdf72c978583dea8   47h\ntenant1    True    Applied revision: main/9baa401630894b78ecc5fa5ebdf72c978583dea8   2d2h\n")))}d.isMDXComponent=!0}}]);