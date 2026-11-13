---
title: Regional endpoint routing
level: professional
order: 10
facts:
  - id: fixed-entry
    text: Global Accelerator provides static IP addresses that accept client traffic at an AWS edge location and route it over the AWS global network to regional endpoints.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#introduction-how-it-works
  - id: addresses
    text: An IPv4 accelerator has two static IPv4 addresses; a dual-stack accelerator has two IPv4 and two IPv6 addresses.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#about-static-ip-addresses
  - id: lifecycle
    text: Global Accelerator retains its static IP addresses while an accelerator exists, including when disabled, but releases them when it is deleted.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/about-accelerators.html#about-accelerators
  - id: standard-endpoints
    text: Standard accelerator endpoints include regional Network Load Balancers, Application Load Balancers, EC2 instances, and Elastic IP addresses.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/about-accelerators.html#about-accelerators
  - id: listener
    text: A listener processes incoming client connections using configured protocols and ports.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/about-accelerators.html#about-accelerators
  - id: endpoint-group
    text: A standard accelerator endpoint group contains endpoints in one AWS Region and is associated with a listener.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/about-endpoint-groups.html#about-endpoint-groups
  - id: selection
    text: A standard accelerator selects regional endpoints based on factors including client location, endpoint health, and configured weights.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#introduction-how-it-works
  - id: tcp
    text: Global Accelerator terminates client TCP connections at AWS edge locations and establishes new TCP connections with endpoints.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#how-it-works-summary
  - id: failover
    text: When a standard accelerator detects an unhealthy active endpoint, it directs new connections to another available endpoint.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#how-it-works-summary
  - id: all-unhealthy
    text: If a standard accelerator has no healthy endpoints, Global Accelerator routes requests to all endpoints.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#about-endpoint-groups-automatic-health-checks
  - id: dial
    text: A traffic dial limits the percentage of traffic already directed to a particular endpoint group, not the percentage of all listener traffic.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#introduction-traffic-dials-weights
  - id: weight
    text: Endpoint weights determine the proportion of traffic sent to individual endpoints within a group; the default weight is 128.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#introduction-traffic-dials-weights
  - id: route53
    text: A Route 53 alias record can route a custom domain to a Global Accelerator accelerator.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-global-accelerator.html#routing-to-global-accelerator-configuring
  - id: custom
    text: A custom routing accelerator maps a client to a specific EC2 instance and port in a VPC subnet and does not use health checks or failover.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#how-it-works-summary
  - id: timeouts
    text: Global Accelerator idle timeouts are 340 seconds for TCP and 30 seconds for UDP; they cannot be customized.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#about-idle-timeout
  - id: existing-connections
    text: Existing connections remain directed to their endpoint until the idle timeout, even if the endpoint becomes unhealthy or is removed.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#about-idle-timeout
diagrams:
  - id: accelerator-regional-routing
    title: Standard accelerator routing
    width: 800
    height: 330
    nodes:
      - { id: client, label: Client, icon: res-client, x: 25, y: 125, w: 140, h: 72, tone: user }
      - { id: accelerator, label: Global Accelerator, icon: global-accelerator, x: 275, y: 125, w: 185, h: 72, tone: network }
      - { id: alb, label: ALB, sub: "Region A", icon: res-elastic-load-balancing-application-load-balancer, x: 590, y: 30, w: 160, h: 86, tone: network }
      - { id: nlb, label: NLB, sub: "Region B", icon: elastic-load-balancing, x: 590, y: 215, w: 160, h: 86, tone: network }
    edges:
      - { from: client, to: accelerator, step: 1 }
      - { from: accelerator, to: alb, step: 2 }
      - { from: accelerator, to: nlb, step: 3 }
    steps:
      - The client connects to a static accelerator IP at the AWS edge.
      - The standard accelerator can route to a healthy regional Application Load Balancer.
      - It can route new connections to another available endpoint, such as a Network Load Balancer.
cards:
  - id: global-accelerator-001
    q: A global TCP application needs fixed IP addresses and routing to healthy regional load balancers. What AWS service fits?
    a: Use a standard Global Accelerator with regional load balancer endpoints.
    facts: [fixed-entry, tcp, standard-endpoints, selection]
  - id: global-accelerator-002
    q: How can a Route 53 domain name point to AWS Global Accelerator?
    a: Create a Route 53 alias record pointing to the accelerator.
    facts: [route53]
  - id: global-accelerator-003
    q: Does a 50% Global Accelerator traffic dial send exactly half of all listener traffic to that endpoint group?
    a: No. It applies to traffic already directed to that group, not all listener traffic.
    facts: [dial]
    trap: true
  - id: global-accelerator-004
    q: A team wants to change the traffic share between endpoints in one Global Accelerator endpoint group. What should it adjust?
    a: Adjust endpoint weights. Traffic dials limit traffic to the group.
    facts: [weight, dial]
  - id: global-accelerator-005
    q: What happens when a standard Global Accelerator has no healthy endpoints?
    a: It routes requests to all endpoints.
    facts: [all-unhealthy]
    trap: true
  - id: global-accelerator-006
    q: A game needs Global Accelerator to send a player to a specific EC2 instance and port. Which accelerator type fits?
    a: A custom routing accelerator. It does not provide health-check-based failover.
    facts: [custom]
  - id: global-accelerator-007
    q: What happens to Global Accelerator static IP addresses when an accelerator is disabled or deleted?
    a: Disabling retains the addresses; deleting the accelerator releases them.
    facts: [lifecycle]
  - id: global-accelerator-008
    q: Does an existing Global Accelerator connection immediately move when its endpoint becomes unhealthy?
    a: No. Existing connections remain directed to that endpoint until idle timeout; new connections can use another available endpoint.
    facts: [existing-connections, failover]
    trap: true
  - id: global-accelerator-009
    q: What are the Global Accelerator TCP and UDP idle timeouts?
    a: TCP is 340 seconds and UDP is 30 seconds. Neither is customizable.
    facts: [timeouts]
---

AWS Global Accelerator gives clients fixed IP addresses for applications running in AWS Regions. It brings traffic onto the AWS global network at an edge location, an entry point near users, then routes it to application endpoints, the receiving resources.

### How it works

1. Create a standard accelerator and configure a listener, which accepts connections on specified protocols and ports. An IPv4 accelerator receives two static IPv4 addresses.
2. Associate the listener with endpoint groups. Each group contains endpoints in one Region, such as an Application Load Balancer (ALB) or Network Load Balancer (NLB).
3. Clients connect to a static IP at the AWS edge. For TCP, Global Accelerator terminates the client connection there and opens a connection to the regional endpoint.
4. Global Accelerator selects an endpoint using client location, health, and configured weights. When an active endpoint becomes unhealthy, new connections go to another available endpoint.
5. Use a traffic dial, a percentage limit, to restrict traffic already directed to a group. Use endpoint weights, relative values, to distribute traffic within a group. A Route 53 alias record can point a custom domain to the accelerator.

### Exam cues

- If the question says fixed global IPs and healthy regional ALB or NLB endpoints, think standard Global Accelerator, because it routes traffic through the AWS network and monitors endpoint health.
- If the question says a hostname should resolve to the accelerator, think a Route 53 alias record, because it can target an accelerator.
- If the question says reduce traffic to a Region during a rollout, think traffic dial, because it limits traffic directed to that endpoint group.
- If the question says split traffic among endpoints in one Region, think endpoint weights, because weights control their relative shares within a group.
- If the question says route a player to a specific server and port, think custom routing, because it maps the client to a specific EC2 destination.

### Remember

- A dual-stack accelerator has two IPv4 and two IPv6 addresses.
- The default endpoint weight is 128.
- TCP idle timeout is 340 seconds; UDP idle timeout is 30 seconds.
- Disabling an accelerator retains its static IPs; deleting it releases them.
- Custom routing does not use health checks or failover.

> **Trap:** A 50% traffic dial does not mean 50% of all listener traffic. It applies only to traffic already directed to that endpoint group.

> **Trap:** If every standard accelerator endpoint is unhealthy, Global Accelerator routes requests to all endpoints. Existing connections also remain on their endpoint until the idle timeout.
