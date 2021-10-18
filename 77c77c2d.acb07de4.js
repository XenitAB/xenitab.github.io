(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{143:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),u=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),p=r,f=d["".concat(a,".").concat(p)]||d[p]||b[p]||i;return n?o.a.createElement(f,s(s({ref:t},c),{},{components:n})):o.a.createElement(f,s({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},144:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(20);t.default=function(){var e=Object(r.useContext)(o.a);if(null===e)throw new Error("Docusaurus context not provided");return e}},145:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return a}));var r=n(144),o=n(146);function i(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,i=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var i=void 0===r?{}:r,a=i.forcePrependBaseUrl,s=void 0!==a&&a,l=i.absolute,c=void 0!==l&&l;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(s)return t+n;var u=n.startsWith(t)?n:t+n.replace(/^\//,"");return c?e+u:u}(i,n,e,t)}}}function a(e,t){return void 0===t&&(t={}),(0,i().withBaseUrl)(e,t)}},146:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))},98:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return d}));var r=n(3),o=n(7),i=(n(0),n(143)),a=n(145),s={id:"wsl2",title:"Working with XKF from Windows"},l={unversionedId:"xks/developer-guide/wsl2",id:"xks/developer-guide/wsl2",isDocsHomePage:!1,title:"Working with XKF from Windows",description:"The reason for this documentation is that we are using a number of linux based tools to be able to have a good integration with Windows, we recommend to use linux as a base for this.",source:"@site/docs/xks/developer-guide/wsl2.md",slug:"/xks/developer-guide/wsl2",permalink:"/docs/xks/developer-guide/wsl2",editUrl:"https://github.com/xenitab/xenitab.github.io/edit/main/docs/xks/developer-guide/wsl2.md",version:"current",sidebar:"docs",previous:{title:"Networking",permalink:"/docs/xks/developer-guide/networking"},next:{title:"Overview",permalink:"/docs/xks/operator-guide/index"}},c=[{value:"Installation of WSL2 - Windows Subsystem for Linux",id:"installation-of-wsl2---windows-subsystem-for-linux",children:[]},{value:"Install Docker-Desktop",id:"install-docker-desktop",children:[]},{value:"Utilising Make with WSL2, Terraform and Docker",id:"utilising-make-with-wsl2-terraform-and-docker",children:[]}],u={rightToc:c};function d(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The reason for this documentation is that we are using a number of linux based tools to be able to have a good integration with Windows, we recommend to use linux as a base for this.\nThis document is verified using Ubuntu version 20.04 but other distributions will most likely work."),Object(i.b)("h2",{id:"installation-of-wsl2---windows-subsystem-for-linux"},"Installation of WSL2 - Windows Subsystem for Linux"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/windows/wsl/install"}),"Install via Powershell")),Object(i.b)("p",null,"Installation is also possible via Microsoft Store. Search for \u201clinux\u201d."),Object(i.b)("p",null,"Make sure that Windows Subsystem for Linux is enabled as a feature in Windows."),Object(i.b)("p",null,"In Windows: Go to Control Panel \u2192 Programs and Features."),Object(i.b)("p",null,"In the left-hand menu, select \u201cTurn Windows features on or off\u201d"),Object(i.b)("img",{alt:"wsl-enable",src:Object(a.a)("img/developer/wsl-enable.png")}),Object(i.b)("h2",{id:"install-docker-desktop"},"Install Docker-Desktop"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.docker.com/products/docker-desktop"}),"Download and install Docker.")),Object(i.b)("p",null,'Once installation is complete, verify that the application works. We experienced issues when trying to start Docker-desktop within a managed organisation using AD accounts, this caused an error with us not being members of a group called \u201cdocker-users\u201c. To solve this, open up \u201cComputer Management\u201d in Windows as an administrator. Navigate to \u201clocal users and groups\u201d \u2192 Groups and locate the "docker-users" group and double-click. Press \u201cAdd\u201d and search for \u201cAuthenticated Users\u201d and add to the group.'),Object(i.b)("p",null,"Now sign-out from Windows and back in, and Docker application should work."),Object(i.b)("p",null,"Verify in settings, WSL2 based engine is used."),Object(i.b)("img",{alt:"docker1",src:Object(a.a)("img/developer/docker1.png")}),Object(i.b)("p",null,"Also under settings. Go to Resources \u2192 WSL Integration and verify that you have access to the WSL integration with your installed WSL. In this case Ubuntu and make sure it is checked."),Object(i.b)("img",{alt:"docker2",src:Object(a.a)("img/developer/docker2.png")}),Object(i.b)("p",null,"To verify functionality:"),Object(i.b)("p",null,"In your Ubuntu WSL2 instance - Run the command:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"docker run hello-world\n")),Object(i.b)("p",null,"Wait for the image to be pulled and if everything works properly the output should be:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Hello from Docker!\nThis message shows that your installation appears to be working correctly.")),Object(i.b)("h2",{id:"utilising-make-with-wsl2-terraform-and-docker"},"Utilising Make with WSL2, Terraform and Docker"),Object(i.b)("p",null,"We noticed, when running terraform from within our Ubuntu instance, that there appears to be som network issues. We saw quite slow network connections. Probably caused by the TCP connection with the following error:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"\u2502 Error: Failed to install provider\n\u2502\n\u2502 Error while installing hashicorp/azurerm v2.64.0: local error: tls: bad record MAC")),Object(i.b)("p",null,"We ran the terraform command again - and it worked perfectly."))}d.isMDXComponent=!0}}]);