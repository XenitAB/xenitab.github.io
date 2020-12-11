(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{109:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return O}));var n=a(0),r=a.n(n);function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},b=Object.keys(e);for(n=0;n<b.length;n++)a=b[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(n=0;n<b.length;n++)a=b[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=r.a.createContext({}),p=function(e){var t=r.a.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=p(e.components);return r.a.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,b=e.originalType,l=e.parentName,o=c(e,["components","mdxType","originalType","parentName"]),d=p(a),u=n,O=d["".concat(l,".").concat(u)]||d[u]||m[u]||b;return a?r.a.createElement(O,i(i({ref:t},o),{},{components:a})):r.a.createElement(O,i({ref:t},o))}));function O(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var b=a.length,l=new Array(b);l[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,l[1]=i;for(var o=2;o<b;o++)l[o]=a[o];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"},152:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/gitops-architecture-79448af5ae370f9af1e392f94d58bdf9.jpg"},78:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return c})),a.d(t,"default",(function(){return p}));var n=a(3),r=a(7),b=(a(0),a(109)),l={title:"GitOps",slug:"/azure-devops-templates/gitops",custom_edit_url:"https://github.com/XenitAB/azure-devops-templates/edit/main/gitops/README.md"},i={unversionedId:"azure-devops-templates/gitops",id:"azure-devops-templates/gitops",isDocsHomePage:!1,title:"GitOps",description:"The GitOps templates are meant to be used with Flux v1 to build docker images and update a repository with the new image tag.",source:"@site/docs/azure-devops-templates/gitops.md",slug:"/azure-devops-templates/gitops",permalink:"/docs/azure-devops-templates/gitops",editUrl:"https://github.com/XenitAB/azure-devops-templates/edit/main/gitops/README.md",version:"current",sidebar:"docs",previous:{title:"Azure DevOps Templates",permalink:"/docs/azure-devops-templates"},next:{title:"Packer",permalink:"/docs/azure-devops-templates/packer"}},c=[{value:"Architecture",id:"architecture",children:[]},{value:"Template Format",id:"template-format",children:[]},{value:"Build",id:"build",children:[]},{value:"Deploy",id:"deploy",children:[]},{value:"Examples",id:"examples",children:[]}],o={rightToc:c};function p(e){var t=e.components,l=Object(r.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},o,l,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"The GitOps templates are meant to be used with Flux v1 to build docker images and update a repository with the new image tag."),Object(b.b)("h2",{id:"architecture"},"Architecture"),Object(b.b)("p",null,Object(b.b)("img",{alt:"gitops-architecture",src:a(152).default})),Object(b.b)("h2",{id:"template-format"},"Template Format"),Object(b.b)("p",null,"Parameter names that end with  ",Object(b.b)("inlineCode",{parentName:"p"},"Template")," will be templated before they are used.  They are templted with the ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops#format"}),"format command"),".\nThe format command is passed the environment name, which can be placed in the string."),Object(b.b)("h2",{id:"build"},"Build"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"poolVmImage"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"ubuntu-16.04"')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"VM Image to set in pool configuration.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"poolName"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Pool name to set in pool configuration.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"sourceBranch"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"refs/heads/master"')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Source branch to limit image builds to.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"dockerfilePath"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"./Dockerfile"')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Path to Dockerfile used in build.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"dockerBuildArgs"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Additional build args to append when building docker image.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"serviceName"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Name of application or service, will also be the name of the image.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"enableDockerBuildkit"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"false")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Should ",Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"https://docs.docker.com/develop/develop-images/build_enhancements/#to-enable-buildkit-builds"}),Object(b.b)("inlineCode",{parentName:"a"},"DOCKER_BUILDKIT=1"))," be set when running docker build.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"preBuild"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"[]")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Steps to run  before Docker build, takes a list of steps.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"postBuild"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"[]")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Steps to run  after Docker build, takes a list of steps.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"dockerLint.enable"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"true")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Enable running Docker lint step.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"dockerLint.ignoreRuleViolations"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"true")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Continues if any Docker lint violations occur.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"imageScan.enable"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"true")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Enable running Image scan step.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"imageScan.ignoreRuleViolations"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"true")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Continues if any Image scan violations occur.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"binaries.hadolint.tag"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"v.18.0")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Version of hadolint to download.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"binaries.hadolint.sha"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"f9bc9de12438b463ca84e77fde70b07b155d4da07ca21bc3f4354a62c6199db4")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"SHA sum to verify downloaded hadolint binary with.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"binaries.trivy.tag"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"`v0.12.0"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Version of trivy to download.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"binaries.trivy.sha"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"4003d993d4b6b5673d4ef6e216578e8ac2bf6b439201a8e748a75fc68430c3f5")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"SHA sum to verify downloaded trivy archive with.")))),Object(b.b)("h2",{id:"deploy"},"Deploy"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"poolNameTemplate"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Name of pool to use in template format.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"sourceBranch"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"refs/heads/master"')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Source branch to limit image builds to.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"serviceName"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Name of the service, should match service name in build.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"azureSubscriptionTemplate"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Name of Azure subscription in template format.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"acrNameTemplate"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Name of ACr to use in template format.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"imagePathPrefix"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Prefix to append to image name before pushing to ACR.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"gitopsRepoBranch"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"master"')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The branch used for the GitOps repository.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"tagIsFullName"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"false")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Set to true if the new tag is full name (registry/image:tag).")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"environments"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'[{name: dev, deployTags: false, extraTag: "latest"}, {name: qa, deployTags: true}, {name: prod, deployTags: true}]')),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Environments that should be deployed to.")))),Object(b.b)("h2",{id:"examples"},"Examples"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Build")),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),'name: $(Build.BuildId)\n\ntrigger:\n  batch: true\n  branches:\n    include:\n      - master\n  tags:\n    include:\n      - "*"\n  paths:\n    include:\n      - "*"\n\nresources:\n  repositories:\n    - repository: templates\n      type: git\n      name: XenitKubernetesService/azure-devops-templates\n      ref: refs/tags/2020.10.0\n\nstages:\n  - template: gitops/build/main.yaml@templates\n    parameters:\n      serviceName: "podinfo"\n')),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Deploy")),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),'name: $(Build.BuildId)\n\ntrigger: none\n\nresources:\n  repositories:\n    - repository: templates\n      type: git\n      name: XenitKubernetesService/azure-devops-templates\n      ref: refs/tags/2020.10.2\n  pipelines:\n    - pipeline: ciPipeline\n      source: ci-podinfo\n      trigger:\n        stages:\n        - cd_trigger # Stage will only trigger if the build reason isn\'t pull request\n\nstages:\n  - template: gitops/deploy/main.yaml@templates\n    parameters:\n      poolNameTemplate: "xks-{0}"\n      serviceName: "podinfo"\n      azureSubscriptionTemplate: "azure-{0}-lab-contributor"\n      acrNameTemplate: "acr{0}wexks"\n      imagePathPrefix: "lab"\n      imageTagPath: ".spec.values.application.buildId"\n      environments:\n        - name: dev\n          deployTags: false\n          extraTag: "latest"\n')))}p.isMDXComponent=!0}}]);