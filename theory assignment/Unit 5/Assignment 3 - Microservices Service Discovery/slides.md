---
marp: true
theme: default
paginate: true
title: Microservices Service Discovery
author: Divyansh Panwar
---

# Microservices Service Discovery

### Assignment III presentation

Divyansh Panwar  
SAP ID: 590018990  
Backend Development  
Assigned topic: Topic 4

---

# The problem: instance addresses change

Microservice instances are created, removed and restarted during normal
operation.

- IP addresses and ports are deployment details
- hard-coded addresses couple callers to one instance
- scaling creates more destinations to track
- failed instances must leave the traffic pool quickly

```text
checkout-service  ->  http://10.0.2.17:8080
                         restart or scale
checkout-service  ->  which address is healthy now?
```

---

# The service discovery lifecycle

```text
service starts
     |
register identity, address and health check
     |
registry records the instance
     |
consumer asks for a service by name
     |
healthy instance receives traffic
     |
heartbeat fails or service stops
     |
registry removes the instance from results
```

The registry turns a changing network into a stable service name.

Source: [Consul service discovery](https://developer.hashicorp.com/consul/docs/use-case/service-discovery)

---

# Two discovery patterns

## Client-side discovery

The caller queries the registry, chooses a healthy instance and sends the
request directly. The client owns discovery-aware load balancing.

## Server-side discovery

The caller sends the request to an intermediary. The intermediary queries the
registry and routes traffic to a healthy instance.

Client-side discovery reduces intermediary hops. Server-side discovery keeps
discovery logic out of application clients.

Source: [Consul discovery patterns](https://developer.hashicorp.com/consul/docs/use-case/service-discovery)

---

# Kubernetes: discovery through Services and DNS

```text
orders-api  ->  orders.prod.svc.cluster.local
                         |
                    Kubernetes Service
                         |
              EndpointSlices for ready Pods
```

- a Service provides a stable name and virtual address
- cluster DNS resolves the Service name
- EndpointSlices track the Pods behind the Service
- callers do not need Pod IP addresses

DNS is usually safer than injecting environment variables because clients can
resolve a Service after it is created.

Source: [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

---

# Consul: catalog plus health checks

Consul keeps a service catalog that records service identity and network
location.

1. Define the service and its health checks
2. Register the definition with a Consul agent
3. Query healthy instances through DNS or the HTTP API

Consul agents update catalog health and replicate server state with Raft. DNS
queries can therefore return only instances that are currently eligible for
traffic.

Source: [Consul registration](https://developer.hashicorp.com/consul/docs/register)

---

# Eureka: client-driven discovery

Eureka fits naturally into Spring Cloud applications.

- a client registers metadata such as host, port and health URL
- clients send periodic heartbeats
- consumers query the registry through `DiscoveryClient`
- Eureka servers can replicate registry state for availability
- failed heartbeats lead to instance removal after the configured lease window

The trade-off is operational: teams must run and protect the registry, and
clients must handle cached or stale results correctly.

Source: [Spring Cloud Netflix Eureka](https://docs.spring.io/spring-cloud-netflix/docs/current/reference/html/index.html)

---

# Failure handling and security

Discovery improves routing, but it does not remove distributed-system failure.

- use readiness checks that represent real request capability
- expire stale records and use bounded caches
- retry with backoff, then use a circuit breaker
- keep a safe response when the registry is unavailable
- secure registry APIs with TLS and ACLs or service identity
- treat discovery as routing, not as authorization

A name such as `payments` tells a client where to try. Authentication and
authorization still decide whether the request is allowed.

---

# A practical student-platform design

```text
web client
    |
API gateway
    |
service discovery
  /       |          \
users  courses   notifications
  |       |          |
health  health    health
```

Recommendation:

- use Kubernetes Service and DNS when the platform already runs in a cluster
- use Consul when VMs and containers must share one discovery system
- use Eureka when the services already use Spring Cloud

Keep service names stable, expose health endpoints and make every caller
tolerate temporary discovery failure.

---

# Viva questions

**1. Why is service discovery needed?**  
It maps a stable service identity to changing healthy instances.

**2. What is the difference between client-side and server-side discovery?**  
The client selects an instance in the first pattern. An intermediary selects
one in the second.

**3. Is service discovery the same as load balancing?**  
No. Discovery finds eligible instances. Load balancing chooses how requests are
distributed among them.

**4. Does discovery provide security?**  
No. It provides routing information. TLS, identity, authentication and
authorization still protect the request.

---

# References

- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Kubernetes DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- [Consul Service Discovery Explained](https://developer.hashicorp.com/consul/docs/use-case/service-discovery)
- [Consul Register Services](https://developer.hashicorp.com/consul/docs/register)
- [Spring Cloud Netflix Eureka](https://docs.spring.io/spring-cloud-netflix/docs/current/reference/html/index.html)

These references were selected because they document the service-discovery
behavior of Kubernetes, Consul and Eureka directly.
