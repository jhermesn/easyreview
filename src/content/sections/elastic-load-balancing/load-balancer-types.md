---
title: Load balancer types
level: associate
order: 10
facts:
  - id: entry
    text: A load balancer receives client requests through listeners and uses listener rules to route
      them to registered targets in target groups.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html
  - id: alb
    text: Application Load Balancers route HTTP and HTTPS requests using request content.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#request-routing
  - id: nlb
    text: Network Load Balancers support TCP, TLS, UDP, TCP_UDP, QUIC, and TCP_QUIC listeners.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html#listener-configuration
  - id: static-ip
    text: A Network Load Balancer has a static IP address per enabled Availability Zone; an Elastic IP
      address can optionally be associated when it is created.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#request-routing
  - id: gwlb
    text: Gateway Load Balancers distribute IP traffic to virtual appliances and exchange traffic with
      them using GENEVE on port 6081.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html#gateway-load-balancer-overview
  - id: scheme-public
    text: An internet-facing load balancer accepts internet traffic through its public addresses.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme
  - id: scheme-private
    text: An internal load balancer uses private addresses and requires clients with access to its VPC;
      its DNS name resolves to private addresses.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme
  - id: target-private
    text: Both internal and internet-facing load balancers reach targets using private addresses, so
      targets do not need public addresses.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme
  - id: subnet-zones
    text: An Application Load Balancer deployed in Availability Zones requires subnets in at least two
      different Availability Zones.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#subnets-load-balancer
  - id: subnet-headroom
    text: Each Availability Zone subnet for an Application Load Balancer needs a /27 or larger address
      block and at least eight free IP addresses for scaling.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#subnets-load-balancer
  - id: priority
    text: ALB listener rules run from lowest numbered priority to highest, followed by the default rule
      if no other rule matches.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-rules.html
  - id: conditions
    text: ALB conditions can match host-header, path-pattern, http-header, http-request-method,
      source-ip, and query-string.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-rules.html
  - id: actions
    text: "An ALB rule ends with exactly one routing action: forward, redirect, or fixed-response."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html#rule-action-types
  - id: redirect
    text: An ALB redirect action sends a client to a different URL and can change HTTP to HTTPS.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html#redirect-actions
  - id: fixed
    text: An ALB fixed-response action returns a configured HTTP response without forwarding the request
      to a target.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html#fixed-response-actions
  - id: weights
    text: An ALB forward action can distribute requests among target groups using relative weights from
      0 to 999.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html#forward-actions
  - id: weighted-failure
    text: Weighted ALB target groups do not automatically fail over to another group when one group is
      empty or has only unhealthy targets.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html#forward-actions
  - id: tls-offload
    text: An NLB TLS listener terminates client TLS and requires a server certificate.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html#listener-configuration
  - id: tls-pass
    text: An NLB TCP listener on port 443 can pass encrypted TLS traffic through to targets for
      decryption.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html#listener-configuration
  - id: dualstack
    text: An ALB using dualstack accepts IPv4 and IPv6 clients; its target group IP address type
      independently determines how it reaches targets.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-ip-address-type.html
  - id: vpc
    text: A VPC is a logically isolated virtual network for AWS resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
  - id: subnet
    text: A subnet is an address range inside a VPC and resides in a single Availability Zone.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
  - id: security-path
    text: ALB security group rules must permit listener and health check traffic in both directions.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#load-balancer-security-groups
  - id: fargate
    text: The ECS service guide lists ALB, NLB, and GWLB as supported load balancer types for Fargate
      services.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html
  - id: security-group
    text: A security group acts as a firewall controlling traffic allowed to and from an ALB.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#load-balancer-security-groups
  - id: quic-date
    text: NLB added QUIC and TCP_QUIC listener support in November 2025.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/doc-history.html
  - id: quic
    text: QUIC is a transport protocol carried over UDP; NLB QUIC listeners pass this traffic to targets.
    source: https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-quic-protocol-support-for-network-load-balancer-accelerating-mobile-first-applications/
  - id: lambda-permission
    text: An ALB Lambda target needs a function resource policy granting elasticloadbalancing.amazonaws.com
      lambda:InvokeFunction; AWS recommends restricting it with aws:SourceArn and aws:SourceAccount.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#prepare-lambda-function
  - id: lambda-limits
    text: An ALB Lambda target and its target group must share an account and Region; request bodies
      and Lambda response JSON are each limited to 1 MB.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#lambda-functions
  - id: target-tls
    text: ALB does not validate certificates on HTTPS targets, so self-signed or expired certificates
      can be used for target connections.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-group-routing-configuration
  - id: transforms-date
    text: ALB added host header and URL transforms in October 2025.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/doc-history.html#doc-history
  - id: transforms
    text: ALB rule transforms rewrite the host header or URL before forwarding without changing the
      routing decision; the default rule cannot have a transform.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-transforms.html#rule-transforms
  - id: jwt-date
    text: ALB added JSON Web Token validation for service-to-service requests in November 2025.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/doc-history.html#doc-history
  - id: jwt-verify
    text: ALB JWT validation requires an HTTPS listener, RS256 signatures, issuer and expiration claims,
      and a publicly accessible JSON Web Key Set endpoint.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-verify-jwt.html#listener-verify-jwt
  - id: nlb-alb-target
    text: An NLB can forward to one ALB per target group for static IP or PrivateLink with HTTP routing; both load balancers must share an account and VPC, and the TCP target group port must match an ALB listener.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/application-load-balancer-target.html
  - id: nlb-security-group-creation
    text: An NLB created without security groups cannot have them added later; NLB health checks are subject to outbound security group rules.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-security-groups.html#security-group-considerations
  - id: nlb-quic-security
    text: NLB QUIC and TCP_QUIC listeners require an IPv4 NLB without security groups, cannot coexist with UDP or TCP_UDP listeners, and are limited to one such listener per NLB.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-listener.html#listener-prereqs
  - id: nlb-zonal-routing
    text: NLB cross-zone load balancing is off by default; without a healthy target in a zone, its address can be removed from DNS.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html#network-load-balancer-overview
  - id: nlb-fail-open
    text: If all targets fail health checks across enabled zones, an NLB fails open and routes to targets regardless of health.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html
  - id: alb-fail-open
    text: An ALB target group with only unhealthy registered targets fails open and routes to those targets.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
  - id: gwlb-endpoint
    text: A Gateway Load Balancer endpoint connects consumer and appliance VPCs; consumer route tables direct traffic to the endpoint, which must be in a different subnet from application servers.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html#gateway-load-balancer-overview
  - id: nlb-ip-routing-date
    text: In July 2026 NLB added listener rules that route IPv4 and IPv6 clients to separate target groups.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/doc-history.html
  - id: nlb-ip-routing
    text: NLB listener rules require dualstack and match the source IP address type, IPv4 or IPv6, rather than the CIDR ranges supported by ALB source-ip conditions.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html#listener-rules
  - id: nlb-weighted-date
    text: In November 2025 NLB added weighted target groups for default actions.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/doc-history.html
  - id: lambda-one-function
    text: "An ALB target group of type lambda holds one Lambda function; to replace the function, AWS recommends a new target group and an updated listener rule."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#register-lambda-function
  - id: healthy-targets
    text: A load balancer distributes incoming traffic across targets in multiple Availability Zones, monitors their health and routes traffic only to healthy targets.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html
cards:
  - id: elastic-load-balancing-002
    q: When should an application use an ALB, NLB, or GWLB?
    a: ALB for HTTP request routing; NLB for transport protocols and static zonal addresses; GWLB for
      virtual inspection appliances using GENEVE on port 6081.
    facts:
      - alb
      - nlb
      - static-ip
      - gwlb
  - id: elastic-load-balancing-009
    q: An ALB must route requests by HTTP method and query string. Which feature handles this?
    a: Listener rule conditions. ALB can match http-request-method and query-string alongside host,
      path, header, and source IP conditions.
    facts:
      - conditions
  - id: elastic-load-balancing-010
    q: Two ALB listener rules match a request. Which rule runs, and when is the default used?
    a: The matching rule with the lowest numbered priority runs. The default runs last if no other rule
      matches.
    facts:
      - priority
  - id: elastic-load-balancing-011
    q: A team wants to move a small share of ALB requests to a new release without DNS changes. What
      should it configure?
    a: A forward action with weighted target groups. Relative weights control the share sent to each
      group.
    facts:
      - weights
  - id: elastic-load-balancing-012
    q: An ALB forwards to weighted target groups, and one group becomes unhealthy. Does ALB send that
      group's share to the healthy group?
    a: No. Weighted forwarding does not automatically fail over between target groups.
    facts:
      - weighted-failure
    trap: true
  - id: elastic-load-balancing-013
    q: An NLB must leave TLS decryption to the application. Which listener should it use?
    a: A TCP listener on port 443. A TLS listener terminates client TLS at the NLB.
    facts:
      - tls-pass
      - tls-offload
    trap: true
  - id: elastic-load-balancing-014
    q: An ALB must redirect HTTP clients to HTTPS and return a maintenance message for another route.
      Which actions fit?
    a: Use redirect for HTTP to HTTPS and fixed-response for the maintenance response.
    facts:
      - redirect
      - fixed
  - id: elastic-load-balancing-015
    q: An ALB in Availability Zones cannot scale because subnet addresses are exhausted. What subnet
      headroom does AWS require?
    a: A /27 or larger address block and at least eight free IP addresses per ALB subnet, across at
      least two different Availability Zones.
    facts:
      - subnet-headroom
      - subnet-zones
  - id: elastic-load-balancing-016
    q: Must EC2 targets behind an internet-facing Application Load Balancer have public IP addresses?
    a: No. Both internet-facing and internal load balancers reach targets through private addresses.
    facts:
      - target-private
    trap: true
  - id: elastic-load-balancing-017
    q: An ALB must accept IPv6 clients while retaining IPv4 targets. Which address settings fit?
    a: Use a dualstack ALB with an IPv4 target group. Client and target address types are configured
      independently.
    facts:
      - dualstack
  - id: elastic-load-balancing-018
    q: An application tier behind an ALB should accept traffic only from clients with VPC access. Which
      load balancer scheme fits?
    a: Internal. Its DNS name resolves to private load balancer addresses.
    facts:
      - scheme-private
  - id: elastic-load-balancing-033
    q: An ALB listener works, but health checks fail after a port change. Which network rules should the
      team inspect?
    a: Security group rules for the listener and health check ports. ALB requires the traffic to be
      allowed in both directions.
    facts:
      - security-path
  - id: elastic-load-balancing-034
    q: Which load balancer types does the ECS service guide list for services on Fargate?
    a: Application, Network, and Gateway Load Balancers. Choose according to the application protocol or
      appliance inspection requirement.
    facts:
      - fargate
      - alb
      - nlb
      - gwlb
  - id: elastic-load-balancing-041
    q: An Application Load Balancer must invoke an AWS Lambda function registered through the CLI. What permission is required?
    a: Grant the ELB service principal lambda:InvokeFunction in the function resource policy, restricted to the target group and account.
    facts:
      - lambda-permission
  - id: elastic-load-balancing-042
    q: Can an Application Load Balancer forward a 2 MB request body to a Lambda target in another account?
    a: No. The Lambda function and target group must share an account and Region, and the request body limit is 1 MB.
    trap: true
    facts:
      - lambda-limits
  - id: elastic-load-balancing-043
    q: Does an Application Load Balancer validate the certificate of an HTTPS target?
    a: No. ALB accepts target certificates even when self-signed or expired.
    trap: true
    facts:
      - target-tls
  - id: elastic-load-balancing-044
    q: An Application Load Balancer must change a request path for a backend without changing the client URL or routing decision. What feature fits?
    a: Use a URL rewrite transform on a nondefault listener rule. ALB added transforms in October 2025.
    facts:
      - transforms
      - transforms-date
  - id: elastic-load-balancing-045
    q: An Application Load Balancer must validate service-to-service JWTs before routing. What must be configured?
    a: An HTTPS listener rule with JWT validation, RS256 tokens and a publicly accessible key set endpoint. ALB added this capability in November 2025.
    facts:
      - jwt-verify
      - jwt-date
  - id: elastic-load-balancing-046
    q: A service needs AWS PrivateLink and static IP addresses plus HTTP path routing. How can NLB and ALB be combined?
    a: Register the ALB in an NLB target group of type `alb`. Both must share an account and VPC; use TCP and match the ALB listener port.
    facts: [nlb-alb-target]
  - id: elastic-load-balancing-047
    q: A team created an NLB without security groups and later needs to filter its traffic with one. Can it add a security group?
    a: No. An NLB created without security groups cannot have them added later.
    trap: true
    facts: [nlb-security-group-creation]
  - id: elastic-load-balancing-048
    q: A team wants an NLB with a QUIC listener and an attached security group. Is that supported?
    a: No. QUIC and TCP_QUIC listeners require an IPv4 NLB without security groups and cannot coexist with UDP or TCP_UDP listeners.
    trap: true
    facts: [nlb-quic-security]
  - id: elastic-load-balancing-049
    q: An NLB has cross-zone routing disabled and a zone loses all healthy targets. What happens to that zone's DNS address?
    a: It can be removed from DNS. Cross-zone load balancing is off by default.
    facts: [nlb-zonal-routing]
  - id: elastic-load-balancing-050
    q: Every registered target in an ALB target group is unhealthy. Does the ALB stop sending requests to them?
    a: No. It fails open and routes to the unhealthy registered targets.
    trap: true
    facts: [alb-fail-open]
  - id: elastic-load-balancing-051
    q: Every NLB target fails health checks across enabled zones. What does the NLB do?
    a: It fails open and routes to targets regardless of health.
    trap: true
    facts: [nlb-fail-open]
  - id: elastic-load-balancing-052
    q: How can a Gateway Load Balancer inspect traffic from an application VPC using appliances in another VPC?
    a: Create a Gateway Load Balancer endpoint in a separate subnet from the application servers and route the application traffic to that endpoint.
    facts: [gwlb-endpoint]
  - id: elastic-load-balancing-053
    q: Can an NLB send IPv4 and IPv6 clients to different target groups and distribute traffic by weights?
    a: Yes. A dualstack NLB can use IP address type rules, added in July 2026, and weighted default actions, added in November 2025.
    facts: [nlb-ip-routing-date, nlb-ip-routing, nlb-weighted-date]
  - id: elastic-load-balancing-054
    q: An NLB target becomes unhealthy after its NLB security group outbound rules change. What should the team check?
    a: Allow the health check traffic in the NLB security group's outbound rules.
    facts: [nlb-security-group-creation]
  - id: elastic-load-balancing-055
    q: Can an NLB listener rule match a specific client CIDR range like an ALB source-ip condition?
    a: No. NLB listener rules match the source IP address type, IPv4 or IPv6, on a dualstack NLB.
    trap: true
    facts: [nlb-ip-routing]
  - id: elastic-load-balancing-056
    q: "An ALB serves five API paths from EC2 instances and must send a small share of each path to its own Lambda function. How many Lambda target groups are needed, and where are the weights set?"
    a: "Five Lambda target groups, one per function. Each path gets its own listener rule whose forward action weights that Lambda group against the instance target group."
    facts:
      - lambda-one-function
      - weights
  - id: elastic-load-balancing-058
    q: How does Elastic Load Balancing improve the availability of an application on EC2 instances in two Availability Zones?
    a: It spreads traffic across the instances in both AZs and sends requests only to healthy ones.
    facts: [healthy-targets]
diagrams:
  - id: alb-weighted-request-flow
    title: ALB rules select a weighted target group
    width: 800
    height: 330
    nodes:
      - id: client
        label: Client
        icon: res-client
        x: 20
        y: 125
        w: 140
        h: 72
        tone: user
      - id: alb
        label: ALB listener
        icon: res-elastic-load-balancing-application-load-balancer
        x: 270
        y: 125
        w: 190
        h: 72
        tone: network
      - id: old
        label: Existing targets
        icon: res-ec2-instance
        x: 600
        y: 30
        w: 180
        h: 72
        tone: compute
      - id: new
        label: New targets
        icon: res-ec2-instance
        x: 600
        y: 225
        w: 180
        h: 72
        tone: compute
    edges:
      - from: client
        to: alb
        step: 1
      - from: alb
        to: old
        step: 2
      - from: alb
        to: new
        step: 2
    steps:
      - Evaluate listener rules in priority order.
      - A forward action selects a target group using its configured weight.
---
An Elastic Load Balancing listener is the entry point that accepts connections on a configured protocol and port. A target group is a set of destinations, such as EC2 instances, to which listener rules can send traffic.

### How it works

1. Choose the load balancer for the traffic being handled.

   | Type | Use when | Routing detail |
   |---|---|---|
   | Application Load Balancer (ALB) | HTTP or HTTPS request content decides the destination | Host, path, headers, method, source IP, or query string |
   | Network Load Balancer (NLB) | Transport protocols or static zonal addresses are required | TCP, TLS, UDP, TCP_UDP, QUIC, or TCP_QUIC listeners |
   | Gateway Load Balancer (GWLB) | Virtual appliances inspect IP traffic | GENEVE, a packet encapsulation protocol, on port 6081 |

2. Choose the scheme. Internet-facing load balancers accept internet clients through public addresses. Internal load balancers use private addresses and require access to the virtual private cloud (VPC), an isolated virtual network. Both reach targets through private addresses.
3. For a regional ALB using Availability Zones, select subnets, address ranges within a VPC, in at least two different zones. Allow a /27 or larger address block and at least eight free IP addresses in each subnet so nodes can scale.
4. Register targets and configure a listener. ALB rules run in increasing numeric priority; the default runs last when no other rule matches.
5. End the matching ALB rule with a routing action.

   | Action | Result |
   |---|---|
   | `forward` | Send to a target group, or divide requests among groups using relative weights |
   | `redirect` | Tell the client to use a different URL, such as HTTPS |
   | `fixed-response` | Return a configured HTTP response without a target |

6. Allow listener and health check traffic through security group rules in both directions. A security group is a firewall that controls allowed network traffic.
7. Choose encryption and addresses separately. TLS, the protocol that encrypts a connection, can terminate at an NLB TLS listener or pass through an NLB TCP listener on port 443. A dualstack ALB accepts both IPv4 and IPv6 clients while its target group controls the target address type.
8. For Lambda targets, grant ELB invocation permission in the function resource policy and restrict the permission to the target group and account. The function and target group must share an account and Region.
9. ALB HTTPS target connections use encryption, but ALB does not validate the target certificate.
10. Since October 2025, a nondefault ALB rule can rewrite the host header or URL after matching, without changing its routing decision. Since November 2025, an HTTPS rule can validate a JSON Web Token (JWT), a signed set of claims, before routing. This requires RS256 signatures and a publicly accessible JSON Web Key Set endpoint that supplies verification keys.

For ECS services on Fargate, the ECS guide lists ALB, NLB, and GWLB as supported types. Choose by protocol or the need to inspect traffic with appliances.

NLB added QUIC and TCP_QUIC listeners in November 2025. QUIC is a transport protocol carried over UDP; an NLB QUIC listener passes that traffic to targets.

For static addresses or AWS PrivateLink with HTTP routing, an NLB can forward to an ALB in the same account and VPC. Use a TCP target group whose port matches the ALB listener. For inspection across VPCs, route application traffic to a Gateway Load Balancer endpoint in a separate subnet from the application servers.

An NLB created without security groups cannot add them later. QUIC and TCP_QUIC listeners require IPv4 and no security groups, cannot coexist with UDP or TCP_UDP listeners, and allow only one such listener per NLB. NLB health checks must be allowed by outbound security group rules.

Since November 2025, NLB default actions can use weighted target groups. Since July 2026, listener rules on dualstack NLBs can route IPv4 and IPv6 clients to different target groups. Unlike ALB source-IP conditions, NLB rules match the IP address type, not a CIDR range.

### Exam cues

- If the question says route by method or query string, think ALB conditions, because they inspect HTTP request fields.
- If the question says gradually expose a release, think weighted forward actions, because group weights divide matching requests.
- If the question says the application must decrypt TLS, think an NLB TCP listener on port 443, because it passes encrypted traffic through.
- If the question says keep backend instances private, think either load balancer scheme with private targets, because internet access terminates at the internet-facing load balancer.
- If a CLI-registered Lambda target cannot be invoked by an ALB, check the function resource policy.
- If the backend needs a different path but clients should keep their URL, think a URL rewrite transform, not a redirect.
- If static IP addresses and path-based routing are both required, think NLB forwarding to an ALB, because the two can combine transport and HTTP features.
- If a zone loses healthy NLB targets, check cross-zone routing and DNS: cross-zone is off by default and the zone's address can be removed.
- If the question says route part of several ALB paths to different Lambda functions, think one Lambda target group per function and a weighted rule per path, because a Lambda target group holds a single function.

### Remember

- ALB Availability Zone subnets: at least two zones, /27 or larger, eight free addresses per subnet.
- NLB: static address per enabled zone, with optional Elastic IP association at creation.
- ALB target group weights: 0 to 999; they are relative weights.
- The default ALB listener rule runs last.
- Dualstack describes the client-facing address choice; the target group controls backend addressing.
- ALB Lambda request body and response JSON limits are 1 MB each.
- When all registered targets are unhealthy, ALB and NLB can fail open and send traffic to unhealthy targets.

> **Trap:** An unhealthy weighted ALB target group does not cause automatic failover to the other weighted group. Plan how the group weights will change.
