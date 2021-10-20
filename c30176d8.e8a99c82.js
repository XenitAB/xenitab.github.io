(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{122:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(7),a=(r(0),r(144)),i={title:"Changelog",slug:"/terraform-modules/CHANGELOG",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/CHANGELOG.md"},l={unversionedId:"terraform-modules/CHANGELOG",id:"terraform-modules/CHANGELOG",isDocsHomePage:!1,title:"Changelog",description:"All notable changes to this project will be documented in this file.",source:"@site/docs/terraform-modules/CHANGELOG.md",slug:"/terraform-modules/CHANGELOG",permalink:"/docs/terraform-modules/CHANGELOG",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/CHANGELOG.md",version:"current",sidebar:"docs",previous:{title:"Azure DevOps agents",permalink:"/docs/xks/operator-guide/azure-devops-agents"},next:{title:"Contributing",permalink:"/docs/terraform-modules/CONTRIBUTING"}},c=[{value:"Unreleased",id:"unreleased",children:[{value:"Added",id:"added",children:[]},{value:"Changed",id:"changed",children:[]}]}],u={rightToc:c};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"All notable changes to this project will be documented in this file."),Object(a.b)("p",null,"The format is based on ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://keepachangelog.com/en/1.0.0/"}),"Keep a Changelog"),", and this project adheres to ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://calver.org/"}),"Calendar Versioning"),"."),Object(a.b)("h2",{id:"unreleased"},"Unreleased"),Object(a.b)("h3",{id:"added"},"Added"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/XenitAB/terraform-modules/pull/416"}),"#416")," Enable Prometheus pod monitoring for azad-kube-proxy."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/XenitAB/terraform-modules/pull/420"}),"#420")," Add support for New Relic metrics and log exporting. This feature is optional opt-in and will have no effect on current deployments.")),Object(a.b)("h3",{id:"changed"},"Changed"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/XenitAB/terraform-modules/pull/415"}),"#415")," Migrate from azdo-proxy to git-auth-proxy and update GitHub FluxV2 module to work with git-auth-proxy."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/XenitAB/terraform-modules/pull/418"}),"#418")," ","[Breaking]"," Update the Flux provider version to 0.4.0. Check the ",Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/fluxcd/terraform-provider-flux/blob/main/CHANGELOG.md#040"}),"provider release")," for migration instructions.")))}p.isMDXComponent=!0},144:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return b}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=o.a.createContext({}),p=function(e){var t=o.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=p(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=p(r),m=n,b=d["".concat(i,".").concat(m)]||d[m]||s[m]||a;return r?o.a.createElement(b,l(l({ref:t},u),{},{components:r})):o.a.createElement(b,l({ref:t},u))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);