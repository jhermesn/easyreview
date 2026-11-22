---
title: "Elastic Load Balancing basics"
level: foundational
order: 5
facts:
  - id: distributes
    text: "Elastic Load Balancing spreads incoming traffic across targets such as EC2 instances, containers and IP addresses in one or more Availability Zones, and sends traffic only to healthy targets."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html#what-is-load-balancing
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
  - id: healthy-targets
    text: "Elastic Load Balancing scales its load balancer capacity as incoming traffic changes, distributes traffic across targets in multiple Availability Zones, and monitors target health to select healthy targets."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html
  - id: alb-websockets
    text: "Application Load Balancers natively support WebSockets: an HTTP/1.1 connection can be upgraded to a persistent ws or wss connection."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html#load-balancer-listeners
  - id: alb-lambda
    text: "An ALB can forward a request to a target group whose target is a Lambda function, invoking the function with the request content."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#lambda-functions
  - id: alb-host-path
    text: "Application Load Balancer listener rules can match the request host name and URL path."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-condition-types.html
  - id: alb-availability-zones
    text: "A regional Application Load Balancer requires subnets in at least two Availability Zones."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html
  - id: alb-health-checks
    text: "An Application Load Balancer periodically checks its registered targets to determine their health."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
  - id: alb-routing-algorithms
    text: "Application Load Balancer target groups support round robin, least outstanding requests and weighted random routing algorithms."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html
cards:
  - id: elastic-load-balancing-070
    q: "A web app runs on EC2 instances in two Availability Zones. Which service spreads requests across them and skips unhealthy instances?"
    a: "Elastic Load Balancing."
    facts: [distributes]
  - id: elastic-load-balancing-002
    q: When should an application use an ALB, NLB, or GWLB?
    a: ALB for HTTP request routing; NLB for transport protocols and static zonal addresses; GWLB for
      virtual inspection appliances using GENEVE on port 6081.
    facts:
      - alb
      - nlb
      - static-ip
      - gwlb
  - id: elastic-load-balancing-058
    q: How does Elastic Load Balancing improve the availability of an application on EC2 instances in two Availability Zones?
    a: It spreads traffic across the instances in both AZs and sends requests only to healthy ones.
    facts: [healthy-targets]
  - id: elastic-load-balancing-066
    q: "Which load balancer supports path-based and host-based routing, WebSockets, and Lambda functions as targets?"
    a: "The Application Load Balancer. It routes on HTTP content, upgrades connections to WebSockets, and can invoke a Lambda function from a target group."
    facts: [alb-websockets, alb-lambda]
  - id: elastic-load-balancing-077
    q: "When incoming application traffic grows, how does Elastic Load Balancing adjust the capacity of the load balancer itself?"
    a: "Elastic Load Balancing scales load balancer capacity automatically as traffic changes."
    facts: [healthy-targets]
  - id: elastic-load-balancing-080
    q: "A web application needs to route requests to different targets by host name or URL path. Which Elastic Load Balancing feature fits?"
    a: "Application Load Balancer listener rules can match host names and URL paths."
    facts: [alb-host-path]
  - id: elastic-load-balancing-081
    q: "How many Availability Zones must a regional Application Load Balancer use?"
    a: "At least two Availability Zones."
    facts: [alb-availability-zones]
  - id: elastic-load-balancing-082
    q: "Which target group routing algorithms can an Application Load Balancer use?"
    a: "Round robin, least outstanding requests or weighted random."
    facts: [alb-routing-algorithms]
---
Elastic Load Balancing puts one entry point in front of many targets and spreads the traffic among the healthy ones.

### How it works

1. Clients connect to the load balancer.
2. It checks the health of the registered targets.
3. It sends each request to a healthy target, across Availability Zones.

### Exam cues

- If the question says an Application Load Balancer needs to test target availability, think health checks, because the load balancer checks registered targets periodically.
- If the question says route web requests by host name or URL path, think Application Load Balancer listener rules, because their conditions can match either value.
- If the question says distribute traffic across instances or Availability Zones, think Elastic Load Balancing.

### Remember

- A regional Application Load Balancer requires subnets in at least two Availability Zones.
- Routes only to healthy targets.

> **Trap:** A load balancer spreads traffic; Auto Scaling changes how many instances there are. They are often used together.
