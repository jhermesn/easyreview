---
title: "EC2 Auto Scaling basics"
level: foundational
order: 5
facts:
  - id: asg
    text: "Amazon EC2 Auto Scaling keeps the right number of EC2 instances for the load, in collections called Auto Scaling groups with a minimum, desired and maximum size; scaling policies change the count within those limits."
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#what-is-amazon-ec2-auto-scaling
  - id: capacity
    text: An Auto Scaling group maintains desired capacity within its minimum and maximum size limits.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-capacity-limits.html#asg-capacity-limits
  - id: unexpected-loss
    text: An Auto Scaling group launches replacement instances after unexpected termination to maintain desired capacity.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-capacity-limits.html#asg-capacity-limits
  - id: ec2
    text: EC2 status checks and scheduled events are always part of Auto Scaling health evaluation.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#available-health-checks
  - id: elb
    text: Auto Scaling ignores load balancer health results by default; enabling Elastic Load Balancing health checks makes it replace instances reported unhealthy by the load balancer.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#elastic-load-balancing-health-checks
  - id: lattice
    text: VPC Lattice health checks are optional and use the target group health result to identify unhealthy instances.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#available-health-checks
  - id: ebs
    text: Optional EBS health checks evaluate volume reachability and I/O status.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#available-health-checks
  - id: custom
    text: Custom health checks can report application-specific health problems to Auto Scaling.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#available-health-checks
cards:
  - id: ec2-auto-scaling-084
    q: "Traffic to a web app doubles every evening. How can the number of EC2 instances follow the load automatically?"
    a: "Amazon EC2 Auto Scaling, with an Auto Scaling group and a scaling policy."
    facts: [asg]
  - id: ec2-auto-scaling-085
    q: "What three sizes does an EC2 Auto Scaling group define?"
    a: "Minimum, desired and maximum number of instances."
    facts: [asg]
  - id: ec2-auto-scaling-029
    q: An EC2 Auto Scaling group must keep a fixed fleet size without demand-based scaling. Which setting defines that size?
    a: Desired capacity. The group maintains it and replaces unexpectedly terminated instances.
    facts:
      - capacity
      - unexpected-loss
  - id: ec2-auto-scaling-011
    q: Which health signals can an EC2 Auto Scaling group evaluate?
    a: EC2 status checks and scheduled events are always included. ELB, VPC Lattice and EBS checks are optional; custom checks can report other health problems.
    facts:
      - ec2
      - elb
      - lattice
      - ebs
      - custom
---
Amazon EC2 Auto Scaling adds and removes EC2 instances so capacity matches demand, which supports elasticity and availability.

### How it works

1. Create an Auto Scaling group with minimum, desired and maximum sizes.
2. Scaling policies raise or lower the desired count as load changes.
3. The group replaces instances to keep the count.

### Exam cues

- If the question says match the number of EC2 instances to demand, think EC2 Auto Scaling.

### Remember

- Group sizes: minimum, desired, maximum.

> **Trap:** Auto Scaling changes how many instances run (horizontal scaling); it does not resize one instance.
