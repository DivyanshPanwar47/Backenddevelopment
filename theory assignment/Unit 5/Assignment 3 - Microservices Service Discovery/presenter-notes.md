# Presenter Notes

Target length: approximately 6 minutes.

## Slide 1: Microservices Service Discovery

Introduce the topic and identify the assignment, student and assigned topic.
State the central question: how can one service find another when instances
move, scale and fail?

## Slide 2: The problem

Explain that a microservice deployment rarely has one permanent server. A
restart can change the address, and horizontal scaling creates several valid
destinations. If a caller stores an IP address in code, every infrastructure
change becomes an application change. Service discovery replaces that fragile
coupling with a logical service identity.

## Slide 3: Lifecycle

Walk through registration, health checking, lookup and removal. Registration
adds an instance to the catalog. Health checks decide whether it should appear
in discovery results. A failed heartbeat or failed check removes it from the
eligible pool. The registry is therefore a live view, not a permanent list of
servers.

Reference: Consul describes the catalog, dynamic instance addresses and health
based removal in its service discovery overview.

## Slide 4: Two patterns

Contrast the two designs. With client-side discovery, the application queries
the registry and performs selection itself. This can reduce infrastructure
components, but every client needs the discovery and load-balancing library.
With server-side discovery, a gateway or load balancer owns that logic. Clients
stay simpler, while the intermediary becomes an important operational
component.

## Slide 5: Kubernetes

Explain that Kubernetes already provides a discovery mechanism. A Service gives
callers a stable name and virtual address. Cluster DNS resolves that name, and
EndpointSlices represent the current backing Pods. The key lesson is that
callers target the Service name, not a Pod IP. DNS also avoids the startup-order
limitation of environment-variable discovery.

## Slide 6: Consul

Describe Consul as a catalog with health checks. A service definition says what
to register and how to check it. After registration, consumers can use Consul
DNS or the HTTP API. Consul is useful when an organization has more than one
runtime, such as virtual machines and containers. Its servers replicate catalog
state with Raft, which supports a highly available control plane.

## Slide 7: Eureka

Explain the Spring Cloud workflow. The application registers metadata and sends
heartbeats. Another application uses a discovery client to find service
instances by logical name. Eureka is convenient for Spring ecosystems because
the client integration is built into the platform. It still needs health-aware
clients, cache behavior and operational protection around the registry.

## Slide 8: Failure and security

Emphasize that discovery is part of a distributed system. A stale record can
send traffic to a dead instance, while an overly aggressive check can remove a
slow but healthy instance. Use readiness checks, bounded caching, retries with
backoff and circuit breakers. Finally, discovery is not authorization. A
service name or registry response must never be treated as proof that a caller
is trusted.

## Slide 9: Recommendation

Apply the concepts to a student platform. An API gateway calls user, course and
notification services by stable names. Kubernetes is a good choice for a
clustered deployment. Consul is a good choice for mixed infrastructure. Eureka
is a good choice when the existing services use Spring Cloud. In all cases,
health endpoints and failure-tolerant callers matter more than the product
name.

## Slide 10: Viva questions

Read the questions and answer them briefly. The distinction to reinforce is:
discovery finds instances, load balancing selects or distributes traffic, and
security controls access.

## Slide 11: References

Mention that the sources are official Kubernetes, HashiCorp Consul and Spring
Cloud documentation. They were chosen to distinguish platform behavior from
general architectural advice.

## References used

- Kubernetes Services: https://kubernetes.io/docs/concepts/services-networking/service/
- Kubernetes DNS: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/
- Consul service discovery: https://developer.hashicorp.com/consul/docs/use-case/service-discovery
- Consul registration: https://developer.hashicorp.com/consul/docs/register
- Spring Cloud Netflix Eureka: https://docs.spring.io/spring-cloud-netflix/docs/current/reference/html/index.html
