---
title: "Elastic Load Balancing basics"
level: foundational
order: 5
facts:
  - id: distributes
    text: "Elastic Load Balancing spreads incoming traffic across targets such as EC2 instances, containers and IP addresses in one or more Availability Zones, and sends traffic only to healthy targets."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html#what-is-load-balancing
cards:
  - id: elastic-load-balancing-070
    q: "A web app runs on EC2 instances in two Availability Zones. Which service spreads requests across them and skips unhealthy instances?"
    a: "Elastic Load Balancing."
    facts: [distributes]
---
Elastic Load Balancing puts one entry point in front of many targets and spreads the traffic among the healthy ones. [What is Elastic Load Balancing?](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html#what-is-load-balancing)

### How it works

1. Clients connect to the load balancer.
2. It checks the health of the registered targets.
3. It sends each request to a healthy target, across Availability Zones.

### Exam cues

- If the question says distribute traffic across instances or Availability Zones, think Elastic Load Balancing.

### Remember

- Routes only to healthy targets.

> **Trap:** A load balancer spreads traffic; Auto Scaling changes how many instances there are. They are often used together.
