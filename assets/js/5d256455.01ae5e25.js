"use strict";(self.webpackChunkhome=self.webpackChunkhome||[]).push([[7814],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(r),m=a,d=u["".concat(c,".").concat(m)]||u[m]||f[m]||o;return r?n.createElement(d,i(i({ref:t},p),{},{components:r})):n.createElement(d,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},472:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},assets:function(){return p},toc:function(){return f},default:function(){return m}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],s={title:"Twelve-factor app anno 2022",description:"The Twelve-factor app methodology turns 10. This blog posts re-evaluates  the original factors against a decade of experience with  software-as-a-service development and the maturing of serverless  development.\n",authors:"andersq",tags:["12-factor","devops","serverless"],keywords:["12-factor","devops","serverless"]},c=void 0,l={permalink:"/blog/2022/02/23/12factor",source:"@site/blog/2022-02-23-12factor.md",title:"Twelve-factor app anno 2022",description:"The Twelve-factor app methodology turns 10. This blog posts re-evaluates  the original factors against a decade of experience with  software-as-a-service development and the maturing of serverless  development.\n",date:"2022-02-23T00:00:00.000Z",formattedDate:"February 23, 2022",tags:[{label:"12-factor",permalink:"/blog/tags/12-factor"},{label:"devops",permalink:"/blog/tags/devops"},{label:"serverless",permalink:"/blog/tags/serverless"}],readingTime:18.095,truncated:!0,authors:[{name:"Anders Qvist",title:"Expert Engineer",url:"https://github.com/bittrance",email:"anders.qvist@xenit.se",imageURL:"https://media-exp1.licdn.com/dms/image/C5603AQETsc7IPBMeZg/profile-displayphoto-shrink_800_800/0/1516275947412?e=1655337600&v=beta&t=YGaLEyUu6DC041xPrzS_P2nSLHwsMWKEEIIhqkFxX-8",key:"andersq"}],prevItem:{title:"Kubernetes Ephemeral Container Security",permalink:"/blog/2022/04/12/ephemeral-container-security"}},p={authorsImageUrls:[void 0]},f=[],u={toc:f};function m(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://12factor.net/"},"The Twelve-factor app")," is a methodology for building software-as-a-service apps that was first formulated by developers associated with Heroku. It's been ten years since the first presentation of this methodology. Despite the criticism that it is only applicable to Heroku and similar webapp services, it remains a relevant yard stick for software-as-a-service development. Some of its tenets have been incorporated into Docker and thence into OCI, effectively making them the law of container-land. This blog post looks at each of the twelve factors and tries to evaluate whether they remain relevant or whether they need updating."))}m.isMDXComponent=!0}}]);