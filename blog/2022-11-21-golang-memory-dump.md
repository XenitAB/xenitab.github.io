---
title: Memory dump golang in kubernetes
description: Xenit evolves Starboard for continuous scanning of production workloads.
authors: nissessenap
tags:
  - security
  - kubernetes
  - starboard
  - trivy
keywords:
  - security
  - kubernetes
  - starboard
  - trivy
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Something something we need to be able to dump our application for debbuging.
We don't have something like parca today but we can still do it.

<!-- truncate -->

## Example app

Deploy the example app https://github.com/polarsignals/pprof-example-app-go

There is a container image `quay.io/polarsignals/pprof-example-app-go:v0.2.0`

It will continue to use memory and don't contain any request nor limit so don't run this for a long time or your system will probably oom.

```shell
k apply -f https://raw.githubusercontent.com/polarsignals/pprof-example-app-go/main/manifests/deployment.yaml

k expose deployment pprof-example-app-go --port=8080
```

To test if we can reach the endpoint

```shell
kubectl run -i -t curl --image=curlimages/curl:latest /bin/sh
```

You will be sent directly in to the container and you can run something like:

```shell
curl http://pprof-example-app-go:8080/debug/pprof/allocs?debug=1
```

But what happens if the endpoint isn't available outside as a service (which it most cases shouldn't).

## Debug container/ephemeral container

Before doing my research my plan was to write about how we attached an volume so we could
save data locally inside the container and then copy it out of the container on to our client and
do show some nice flame graphs. But apparently it's not supported to attach volumes, it's not even supported to reach the existing volumes on the pod.

There is an open [issue](https://github.com/kubernetes/kubectl/issues/1071) to solve this but it's not part of the current enhancement [proposal](https://github.com/kubernetes/enhancements/issues/1441) so this is nothing that we will see in the near future.

So instead I will just show how we can debug using pprof from within the container.

```shell
k debug pprof-example-app-go-7c4b6d77d-xw52p --image=golang:1.19.3-alpine3.16 -i -t -- /bin/sh
```

Kubernetes will attach the container for you and give you a shell.

```shell
k debug pprof-example-app-go-7c4b6d77d-xw52p --image=golang:1.19.3-alpine3.16 -i -t -- /bin/sh
Kubernetes will attach the container for you and give you a shell
go tool pprof http://localhost:8080/debug/pprof/allocs
```

This will provide you with a pprof terminal inside the container.

I'm no pprof master but there are some easy commands to get you started.

`top 10 -cum` will show you the time it takes to call a function including all function it calls

```pprof
top 10 -cum
Showing nodes accounting for 27.63GB, 99.80% of 27.69GB total
Dropped 26 nodes (cum <= 0.14GB)
Showing top 10 nodes out of 17
      flat  flat%   sum%        cum   cum%
         0     0%     0%    25.66GB 92.69%  main.calculateFib
   25.59GB 92.43% 92.43%    25.59GB 92.43%  math/big.nat.make (inline)
         0     0% 92.43%    25.41GB 91.78%  github.com/polarsignals/pprof-example-app-go/fib.Fibonacci
         0     0% 92.43%    25.41GB 91.78%  math/big.(*Int).Add
         0     0% 92.43%    25.41GB 91.78%  math/big.nat.add
    2.02GB  7.30% 99.73%     2.02GB  7.30%  main.allocMem
    0.02GB 0.073% 99.80%     0.25GB  0.91%  fmt.Sprintln
         0     0% 99.80%     0.25GB  0.91%  log.Println
         0     0% 99.80%     0.23GB  0.84%  fmt.(*pp).doPrintln
         0     0% 99.80%     0.23GB  0.84%  fmt.(*pp).handleMethods
```

`top 10 -flat` will show you the time it takes to call a function excluding all function it calls

```pprof
Active filters:
   ignore=flat
Showing nodes accounting for 27.66GB, 99.90% of 27.69GB total
Dropped 10 nodes (cum <= 0.14GB)
Showing top 10 nodes out of 17
      flat  flat%   sum%        cum   cum%
   25.59GB 92.43% 92.43%    25.59GB 92.43%  math/big.nat.make (inline)
    2.02GB  7.30% 99.73%     2.02GB  7.30%  main.allocMem
    0.03GB   0.1% 99.83%     0.21GB  0.76%  math/big.nat.itoa
    0.02GB 0.073% 99.90%     0.25GB  0.91%  fmt.Sprintln
         0     0% 99.90%     0.23GB  0.84%  fmt.(*pp).doPrintln
         0     0% 99.90%     0.23GB  0.84%  fmt.(*pp).handleMethods
         0     0% 99.90%     0.23GB  0.84%  fmt.(*pp).printArg
         0     0% 99.90%    25.41GB 91.78%  github.com/polarsignals/pprof-example-app-go/fib.Fibonacci
         0     0% 99.90%     0.25GB  0.91%  log.Println
         0     0% 99.90%    25.66GB 92.69%  main.calculateFib
```

By looking at the output we can see that it's `math/big.nat.make` that takes the most resources.

## Conclusion

The `kubectl debug` command is extremely useful when you want to debug your application and you
don't have access to a shell or the tools that you need in your normal container.

It saves us from having to install unneeded applications in our container which lowers the amount of potential CVE:s and the time it takes to start your container.

Kubectl debug isn't perfect and it won't work for all your uses cases especially since you can't
attach volumes but it's a great start.

If you really don't want to use a tool like pprof locally you could of course write some small application that takes performs a request to an endpoint and streams the output to an object store or similar without ever storing the data on disk.

When it comes to continues profiling it's probably better to look at tool specifically written for it like Grafana Phlare or Parca.
