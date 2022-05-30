"use strict";(self.webpackChunkhome=self.webpackChunkhome||[]).push([[7847],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=o.createContext({}),u=function(e){var t=o.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return o.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(n),m=a,h=c["".concat(i,".").concat(m)]||c[m]||p[m]||r;return n?o.createElement(h,s(s({ref:t},d),{},{components:n})):o.createElement(h,s({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,s[1]=l;for(var u=2;u<r;u++)s[u]=n[u];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4324:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return d},default:function(){return c}});var o=n(3117),a=n(102),r=(n(7294),n(3905)),s=(n(4996),["components"]),l={id:"aks",title:"AKS"},i=void 0,u={unversionedId:"xks/operator-guide/kubernetes/aks",id:"xks/operator-guide/kubernetes/aks",title:"AKS",description:"System Node Pool",source:"@site/docs/xks/operator-guide/kubernetes/aks.md",sourceDirName:"xks/operator-guide/kubernetes",slug:"/xks/operator-guide/kubernetes/aks",permalink:"/docs/xks/operator-guide/kubernetes/aks",editUrl:"https://github.com/xenitab/xenitab.github.io/edit/main/docs/xks/operator-guide/kubernetes/aks.md",tags:[],version:"current",frontMatter:{id:"aks",title:"AKS"},sidebar:"docs",previous:{title:"XKF on Github",permalink:"/docs/xks/operator-guide/github"},next:{title:"EKS",permalink:"/docs/xks/operator-guide/kubernetes/eks"}},d=[{value:"System Node Pool",id:"system-node-pool",children:[{value:"Sizing Nodes",id:"sizing-nodes",children:[],level:3},{value:"Modifying Nodes",id:"modifying-nodes",children:[],level:3}],level:2},{value:"Update AKS cluster",id:"update-aks-cluster",children:[{value:"Useful commands in Kubernetes",id:"useful-commands-in-kubernetes",children:[],level:3},{value:"Terraform update Kubernetes version",id:"terraform-update-kubernetes-version",children:[],level:3},{value:"CLI update Kubernetes version",id:"cli-update-kubernetes-version",children:[],level:3},{value:"Upgrading node pools without upgrading cluster",id:"upgrading-node-pools-without-upgrading-cluster",children:[],level:3}],level:2},{value:"Change vm size through Terraform",id:"change-vm-size-through-terraform",children:[],level:2},{value:"AKS resources",id:"aks-resources",children:[],level:2}],p={toc:d};function c(e){var t=e.components,n=(0,a.Z)(e,s);return(0,r.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"system-node-pool"},"System Node Pool"),(0,r.kt)("p",null,"AKS requires the configuration of a system node pool when creating a cluster. This system node pool is not like the other additional node pools. It is tightly coupled to the AKS cluster. It is not\npossible without manual intervention to change the instance type or taints on this node pool without recreating the cluster. Additionally the system node pool cannot scale down to zero, for AKS to\nwork there has to be at least one instance present. This is because critical system pods like Tunnelfront and CoreDNS will by default run on the system node pool. For more information about AKS\nsystem node pool refer to the ",(0,r.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/azure/aks/use-system-pools#system-and-user-node-pools"},"official documentation"),"."),(0,r.kt)("p",null,"XKS follows the Azure recommendation and runs only system critical applications on the system node pool. Doing this protects services like CoreDNS from starvation or memory issues caused by user\napplications running on the same nodes. This is achieved by adding the taint ",(0,r.kt)("inlineCode",{parentName:"p"},"CriticalAddonsOnly")," to all of the system nodes."),(0,r.kt)("h3",{id:"sizing-nodes"},"Sizing Nodes"),(0,r.kt)("p",null,"Smaller AKS clusters can survive with a single node as the load on the system applications will be moderately low. In larger clusters and production clusters it is recommended to run at least three\nsystem nodes that may be larger in size. This section aims to describe how to properly size the system nodes."),(0,r.kt)("p",null,"The minimum requirement for a system node is a VM with at least 2 vCPUs and 4GB of memory. Burstable B series VMs are not recommended. A good starting point for all clusters are the D series node\ntypes which have a balance of CPU and memory resources. A good starting point is a node of type ",(0,r.kt)("inlineCode",{parentName:"p"},"Standard_D2as_v4"),"."),(0,r.kt)("p",null,"More work has to be done in this area regarding sizing and scaling of the system node pools to achieve a standardized solution."),(0,r.kt)("h3",{id:"modifying-nodes"},"Modifying Nodes"),(0,r.kt)("p",null,"There may come times when Terraform wants to recreate the AKS cluster when the system node pool has been updated. This happens when updating certain properties in the system node pool. It is still\npossible to do these updates without recreating the cluster, but it requires some manual intervention. AKS requires at least one system node pool but does not have an upper limit. This makes it\npossible to manually add a new temporary system node pool. Remove the existing default node pool created by Terraform. Create a new system node pool with the same name but with the updated parameters.\nFinally remove the temporary node pool. Terraform will just assume that the changes have already been applied and import the new state without any other complaints."),(0,r.kt)("p",null,"Start off with creating a temporary system pool. Make sure to replace the cluster name and resource groups to the correct values."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'az aks nodepool add --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name temp --mode "System" --node-count 1\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"It may not be possible to create a new node pool with the current Kubernetes version if the cluster has not been updated in a while. Azure will remove minor versions as new versions are released. In\nthat case you will need to upgrade the cluster to the latest minor version before making changes to the system pool, as AKS will not allow a node with a newer version than the control plane.")),(0,r.kt)("p",null,"Delete the system node pool created by Terraform:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks nodepool delete --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name default\n")),(0,r.kt)("p",null,"Create a new node pool with the new configuration. In this case it is setting a new instance type and adding a taint:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'az aks nodepool add --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name default --mode "System" --zones 1 2 3 --node-vm-size "Standard_D2as_v4" --node-taints "CriticalAddonsOnly=true:NoSchedule"\n--node-count 1\n')),(0,r.kt)("p",null,"Delete the temporary pool:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks nodepool delete --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name temp\n")),(0,r.kt)("p",null,"For additional information about updating the system nodes refer to ",(0,r.kt)("a",{parentName:"p",href:"https://pumpingco.de/blog/modify-aks-default-node-pool-in-terraform-without-redeploying-the-cluster/"},"this blog post"),"."),(0,r.kt)("h2",{id:"update-aks-cluster"},"Update AKS cluster"),(0,r.kt)("h3",{id:"useful-commands-in-kubernetes"},"Useful commands in Kubernetes"),(0,r.kt)("p",null,"When patching an AKS cluster or just upgrading nodes it can be useful to watch your resources in Kubernetes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'# Show node version\nkubectl get nodes -o jsonpath=\'{range .items[*]}{.metadata.name}{"\\t"}{.metadata.labels.kubernetes\\.azure\\.com\\/node-image-version}{"\\n"}{end}\'\n\n# Watch nodes\nwatch kubectl get nodes\n\n# Check the status of all pods in the cluster\nkubectl get pods -A\n')),(0,r.kt)("h3",{id:"terraform-update-kubernetes-version"},"Terraform update Kubernetes version"),(0,r.kt)("p",null,"TBD"),(0,r.kt)("h3",{id:"cli-update-kubernetes-version"},"CLI update Kubernetes version"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"export RG=rg1\nexport POOL_NAME=default\nexport CLUSTER_NAME=cluster1\nexport AZURE_LOCATION=westeurope\nexport KUBE_VERSION=1.21.9\n")),(0,r.kt)("p",null,"What AKS versions can I pick in this Azure location:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks get-versions --location $AZURE_LOCATION -o table\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks get-upgrades --resource-group $RG --name $CLUSTER_NAME --output table\n")),(0,r.kt)("p",null,"We recommend to only upgrade control-plane separately and then upgrade the nodes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks upgrade --resource-group $RG --name $CLUSTER_NAME --kubernetes-version $KUBE_VERSION --control-plane-only\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks nodepool upgrade --resource-group $RG --cluster-name $CLUSTER_NAME --name $POOL_NAME --kubernetes-version $KUBE_VERSION\n")),(0,r.kt)("h3",{id:"upgrading-node-pools-without-upgrading-cluster"},"Upgrading node pools without upgrading cluster"),(0,r.kt)("p",null,"From time to time you might want to upgrade your Node Pools without upgrading the Kubernetes version. We always recommend to look at\nthe ",(0,r.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/azure/aks/node-image-upgrade"},"official documentation"),"as well."),(0,r.kt)("p",null,"The node pool will spin up a new node and drain the existing one.\nWhen this is done the old node will be deleted."),(0,r.kt)("p",null,"The below command works great for smaller clusters. If you want to upgrade more nodes faster it is possible to do so. Read the documentation for more information."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"export RG=rg1\nexport POOL_NAME=default\nexport CLUSTER_NAME=cluster1\n")),(0,r.kt)("p",null,"Get the latest available node versions for your node pool:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks nodepool get-upgrades --nodepool-name $POOL_NAME --cluster-name $CLUSTER_NAME --resource-group $RG\n")),(0,r.kt)("p",null,"Upgrade the image on the specified node pool:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"az aks nodepool upgrade --resource-group $RG --cluster-name $CLUSTER_NAME --name $POOL_NAME --node-image-only\n")),(0,r.kt)("h2",{id:"change-vm-size-through-terraform"},"Change vm size through Terraform"),(0,r.kt)("p",null,"If you want to use terraform to change the your node pools VM size you ",(0,r.kt)("strong",{parentName:"p"},"can't")," just change the vm_size in the additional_node_pools config.\nThis will tell Azure to drain all the nodes and then delete the existing ones, then Azure will spin up a new node pool after the existing one is gone."),(0,r.kt)("p",null,"This might be fine if you already have multiple additional node pools and you pods don't have specific node affinities."),(0,r.kt)("p",null,"But if that isn't the case terraform will most likely run for ever since it won't be able to destroy the nodes that you already have workload on.\nOr even worse it will destroy the existing node and you won't have any node pools in your cluster to manage your workloads."),(0,r.kt)("p",null,"Instead you have to add a second additional node pool in to your cluster."),(0,r.kt)("p",null,"For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-.hcl"},'  additional_node_pools = [\n    {\n      name                 = "standard"\n      orchestrator_version = "1.21.2"\n      vm_size              = "Standard_E2s_v4"\n      min_count            = 1\n      max_count            = 5\n      node_labels          = {}\n      node_taints          = []\n      spot_enabled         = false\n      spot_max_price       = null\n    },\n    {\n      name                 = "standard2"\n      orchestrator_version = "1.21.2"\n      vm_size              = "Standard_F4s_v2"\n      min_count            = 1\n      max_count            = 5\n      node_labels          = {}\n      node_taints          = []\n      spot_enabled         = false\n      spot_max_price       = null\n    }\n  ]\n')),(0,r.kt)("p",null,"Run terraform and see that standard2 is up and running."),(0,r.kt)("p",null,"Now you can remove the standard node pool and standard2 should be able to handle the new load."),(0,r.kt)("p",null,"Azure will automatically drain all the data from the old standard node pool."),(0,r.kt)("p",null,"Remember to set min_count so that your current workload fits, you can always reduce min_count later.\nThe cluster autoscaler will scale up new vm:s of standard2 but it will take time.\nDuring the creation of more standard2 nodes much of your workload might become pending."),(0,r.kt)("h2",{id:"aks-resources"},"AKS resources"),(0,r.kt)("p",null,"To get a quick overview of what is happening in AKS you can look at its ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Azure/AKS/releases"},"changelog"),"."))}c.isMDXComponent=!0}}]);