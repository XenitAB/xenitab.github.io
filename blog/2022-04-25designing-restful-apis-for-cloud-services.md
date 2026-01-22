---
title: Designing RESTful APIs for cloud services
authors: andersq
description: >
  This blog post provides guidelines for RESTful APIs for software-as-a-service offerings, with the goal to maximize their life span and support rapid evolution throughout it.
tags:
  - api
  - rest
  - architecture
keywords:
  - api
  - rest
  - architecture
---

HTTP has become the de-facto standard transport protocol for programmatic communication in software-as-a-service offerings. This mostly entails publishing request-response style APIs. We often refer to these APIs as "RESTful APIs":

> _[When a] request is made via a RESTful API, [the response is] a representation of the state of the resource[.]_ -- https://www.redhat.com/en/topics/api/what-is-a-rest-api

Let's decrypt that: "representation" has come to mean JSON, while "state" refers to those ubiquitous (and unwieldy) relational databases and "resource" is an object from our domain model.

The literature on API design will exhort you to analyze the problem space and consider your design choices carefully. Indeed, design choices will significantly impact the lifecycle of APIs that are part of a software-as-a-service offering. However, when designing a software-as-a-service API, we do not really know the details of future usage. The goal must therefore be to maximize our freedom to evolve the APIs without having to change the formal or informal contracts that regulate their usage. The API should become a facade behind which we are free to evolve the implementation.

This post proposes and motivates a set of guidelines for RESTful APIs (and by extension their contracts) intended to maximize their life span and support rapid evolution throughout it. The post focuses on organizations that want to provide commercial software-as-a-service offerings, though many of the guidelines have wider application.

<!-- truncate -->

## Start with the basics

The guidelines below should be considered in addition to established good practice, so if you are new to REST, you may want to start by reading the literature. Here are some good good articles about RESTful API practices:

- http://www.restfulwebapis.org/
- https://restfulapi.net/rest-api-design-tutorial-with-example/
- https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design

Note that these articles and the recommendations are not in total harmony, for example when it comes to the extent to which use cases should be allowed to influence API design.

Also, please remember that HTTP is a very rich transport protocol which provides solutions to many common API needs. For example, [content negotiation](https://tools.ietf.org/html/rfc7231#section-5.3) and [conditional requests](https://tools.ietf.org/html/rfc7232) can help solve various problems.

## Practices for rapid evolution

Additionally, there are a number of good practices which are relevant when building software-as-a-service RESTful APIs.

### Your API is a collection of nouns

_The most central tenet of REST bears repeating: your API is expressed in nouns, each of which is a class of resources. (If expressing your API in terms of nouns feels contrived, you may want to consider an RPC style API instead.) Those resources are queried and manipulated using basic ["CRUD"](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) operations. A car sharing service might expose `GET /vehicles` for finding available vehicles and an individual vehicle would be `GET /vehicles/:id`._

**Motivation**: Focusing on resources reduces the risk of implementation details bleeding into the API, which means that it becomes easier to change the backing implementation. This is akin to Kant's [Der ding an sich](https://en.wikipedia.org/wiki/Thing-in-itself), in that we are trying to discover what properties a resource should reasonably have to match the sum of all observations.

An important consequence of realizing a service as a series of nouns is that in order to be able to keep to CRUD operations, we may need to introduce new nouns (i.e. sub-resource), for example giving cars "services" so that we have `POST /vehicles/:id/services/heater` for activating the car's heater. With this design, the developer using the API knows that discovery will be `GET /vehicles/:id/services` and heater status can be checked with `GET /vehicles/:id/services/heater`. "CRUD plus noun" allows us to builda a contract taxonomy.

### The caller is responsible for the use case

_The RESTful API concerns itself with effective access to the data model (the "resources"). Generally speaking, the use case is the caller's concern. For example, the caller may be required to combine data from numerous API calls, read more data than it needs and perform its own sorting._

**Motivation**: An endpoint that is optimized for one use case will be hard pressed to accommodate a second use case. It will be hard to avoid adding a second similar endpoint, risking divergence. Furthermore, use cases will evolve over time and if too much of processing, filtering and sorting quirks is handled by the endpoint, it is very easy to end up in a situation where we have to spend our time optimizing specific database queries for individual use cases rather than improving the performance for all callers by refactoring storage.

Properly implemented RESTful APIs have a good chance of ageing gracefully. By pushing parts of the business logic to the caller (e.g. a batch job or a [backend-for-frontend](https://samnewman.io/patterns/architectural/bff/)) it ensures that the RESTful API can be reused across many use cases.

One of the most common mistakes with RESTful APIs is to treat the backend as a layer that translates API calls into SQL. Under this fallacy, as APIs evolve, their queries grow more complex (joining, sorting and complex mutations are common examples) making it ever harder to maintain response times. An extreme version of this is "passthru-sql" (e.g. a query parameter like `?filter="username eq 'bittrance'"`). When developers try to follow the precepts of REST but retain an RPC mindset, they frequently create endpoints that allow the caller to pass query fragments that are appended to the resulting database query more or less verbatim.

### A published API is an eternal promise

_As long as we have paying customers on a particular API, we maintain that API. We may refuse access by new customers and we may cancel entire services, but as long as a customer uses a service, all APIs on that service are maintained. Where an API in use needs to be decommissioned, that is a commercial decision._

**Motivation**: There is no good time to decommission an API. Any change you force on a customer will incur costs for that customer, with limited benefit. Furthermore, in many cases your success will come through partners using your APIs to design new services on top of yours. Adding customers to a well-designed multi-tenant service has very low marginal cost, potentially enabling different business models. Strong sun-setting clauses will constrain our partners' business models.

You may still want to retain the right to decommission APIs in your contracts; sometimes runaway success may incur unacceptable operational costs and you are forced to redesign. Just be aware that regular use of that clause will damage your reputation. Google Ads ability to [regularly decommission](https://developers.google.com/google-ads/api/docs/sunset-dates) their APIs is a strong indicator of its undue marketing power. For a counter-point look at [retiring EC2 Classic](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-classic-platform.html). It took over 10 years from the decision was made to retire EC2 Classic until AWS decided it was commercially acceptable to evict the last stragglers in late 2022.

### Endpoints make no assumptions about the URL space

_We frequently use HTTP load balancers (and API gateways) to compose our URL space. They may direct any arbitrary part of that space to a particular process. Thus, `POST /customers` may be one service (which writes to the master database) and `GET /customers/:id` goes to read replica: a particular endpoint or process must not assume that it "owns" the customer resources, for example by assuming that it will see all writes. Similarly, endpoints should minimize the part of the object model that it requires to present its resource. For example, `GET /users/:id` should not include additional company information in order to be useful, since users and companies may need to be split across different services tomorrow._

**Motivation**: Our users will be successful by creating innovative things on top of our APIs. Almost by definition, they will use our APIs in ways we did not forsee, thus creating unexpected loads. Therefore, a large part of evolving a cloud service is about changing how data is partitioned and what storage systems are used. Therefore, it is very important to retain flexibility in this regard.

A service typically starts small, as a single process exposing all your endpoints. However, as the service grows in popularity and scope, simple horizontal scaling is often not possible and you need to diversify: you may add new overlapping (micro-)services or you may want to split reads and writes into separate processes (i.e. go [CQRS](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)).

### JSON objects are maps

_Adding properties to any returned object is considered a non-breaking change. API docs should point out that properties are new. Similarly, an API can start accepting new optional query parameters on the URL or properties in the input body or add HTTP headers in either direction without being considered breaking._

**Motivation**: REST fundamentally limits us to CRUD and behavior will be implicit from the resource state. In order to implement new behavior it follows that we will over time introduce new properties which controls that behavior.

### Versioning is part of the URI

_The URI should contain a version number. In [semver](https://semver.org/) terms, this is a "major" version and we use it to signal breaking changes. Given that we have the ability to extend input and output (see [JSON objects are maps](#json-objects-are-maps)), it should be possible to accommodate most "minor" changes within existing APIs. Ideally, resources with different versions have an implicit relation. For example, if we serve both `GET /v1/customers/acme` and `GET /v2/customers/acme`, they refer to the same customer._

**Motivation**: Versions in the URI serve two purposes. First, it signals that one resource should be preferred over another. Second, enables us to write new implementations of a service incrementally.

### Authorization is based on method + resource

_Client authorization should depend only on the HTTP request method and the URI (and in some cases on headers). It should preferably not on depend on the request body and particularly not on the state of the resource._

**Motivation**: Ideally, both authentication and authorization should be handled outside of your endpoint. This may be by middleware in your API or by a load balancer or API gateway. Furthermore, having bespoke authorization logic in your endpoints invites security bugs. It is also hard to document and understand for the caller. Loading the underlying resource to know whether the caller is permitted to perform the request risks being expensive - if you deactivate the caller's credentials you don't want to continue accruing the cost of those calls (or higher: the client may well retry several times). Finally, filtering lists on permission defeats caching.

A consequence of this rule is that you should avoid APIs that use permissions as filter criteria for resource listings; everyone who calls `GET /users` should get the same list. If the user list is secret, you introduce a `GET /departments/:id/users` that has only the relevant users. Similarly, if you have restricted parts of a resource, you can make it into a sub-resource, e.g. `GET /users/:id/access_tokens`.

### Be tough on clients

_Clients are expected to:_

- implement HTTP properly. For example, if a resource was missing a correct Content-Type, a client that breaks when this is rectified is at fault.
- be reasonably parallel. A client should be able to make thousands of requests in a reasonable time frame. For example, a search operation may return summaries and if the client wants more information, it is expected to request the full object for each returned item.
- do local caching. A client that excessively requests resources that has caching directives should be considered as misbehaving.

**Motivation**: We are building REST APIs to be used by many different callers and our situation would quickly be untenable if we had to respect quirky clients and inexperienced developers. For example, it is relatively straight-forward to horizontally scale a service that can answer 1 million GET/s, but very tricky to answer one GET request which is supposed to return 1 million entries per second.

Someone may protest that browsers only allow 6-8 concurrent HTTP sessions against one host and that data must therefore be aggregated or pre-processed for clients to be performant. Normally, introducing [HTTP/2.0 multiplexing](https://datatracker.ietf.org/doc/html/rfc7540#section-5) and ensuring observed response times of \<50ms will do the trick just as well.
