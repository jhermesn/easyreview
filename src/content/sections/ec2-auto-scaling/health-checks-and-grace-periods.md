---
title: Health checks and grace periods
level: associate
order: 40
facts:
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
  - id: impaired
    text: Auto Scaling waits a few minutes before marking an instance unhealthy after an impaired EC2 status check.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#instance-health-detection
  - id: insufficient-data
    text: An EC2 status check result of insufficient-data alone does not mark an instance unhealthy.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#instance-health-detection
  - id: nonrunning
    text: An instance that leaves the EC2 running state is marked unhealthy and replaced immediately, even during the grace period.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-check-grace-period.html#health-check-grace-period
  - id: grace
    text: The health check grace period delays unhealthy replacement for a newly InService instance while load balancer health checks continue independently.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-check-grace-period.html#health-check-grace-period
  - id: grace-default
    text: A new Auto Scaling group created in the console defaults to a health check grace period of 300 seconds.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-check-grace-period.html#health-check-grace-period
  - id: grace-api-default
    text: A new Auto Scaling group created through the CLI or SDK defaults to a health check grace period of 0 seconds.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-check-grace-period.html#health-check-grace-period
  - id: hook-grace
    text: With a launch lifecycle hook, the grace period starts after the instance reaches InService.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: standby
    text: Auto Scaling does not perform health checks on instances in Standby until they return to service.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#health-check-considerations
  - id: suspend
    text: Suspending HealthCheck and ReplaceUnhealthy can prevent automatic health-based replacement during troubleshooting.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#health-check-considerations
cards:
  - id: ec2-auto-scaling-010
    q: An ALB marks an EC2 Auto Scaling instance unhealthy, but the group keeps it. What should be enabled?
    a: Elastic Load Balancing health checks on the Auto Scaling group. By default the group ignores the load balancer health result.
    trap: true
    facts:
      - elb
  - id: ec2-auto-scaling-011
    q: Which health signals can an EC2 Auto Scaling group evaluate?
    a: EC2 status checks and scheduled events are always included. ELB, VPC Lattice and EBS checks are optional; custom checks can report other health problems.
    facts:
      - ec2
      - elb
      - lattice
      - ebs
      - custom
  - id: ec2-auto-scaling-012
    q: What does the EC2 Auto Scaling health check grace period delay after a launch hook?
    a: Unhealthy replacement after the instance reaches InService. It does not pause load balancer checks, and leaving running state still causes immediate replacement.
    trap: true
    facts:
      - grace
      - hook-grace
      - nonrunning
  - id: ec2-auto-scaling-013
    q: An engineer needs to debug an EC2 Auto Scaling instance without health checks replacing it. Which options apply?
    a: Put the instance in Standby, or suspend the group HealthCheck and ReplaceUnhealthy processes. Standby instances receive no Auto Scaling health checks until returned to service.
    facts:
      - standby
      - suspend
  - id: ec2-auto-scaling-041
    q: An EC2 Auto Scaling group was created with the CLI and has no grace period configured. What is its default, and how does the console differ?
    a: CLI and SDK default to 0 seconds. The console defaults to 300 seconds.
    facts:
      - grace-default
      - grace-api-default
  - id: ec2-auto-scaling-042
    q: An engineer stops a new EC2 Auto Scaling instance during its health check grace period. Will the grace period prevent replacement?
    a: No. Leaving the EC2 running state causes immediate unhealthy marking and replacement, even within the grace period.
    trap: true
    facts:
      - nonrunning
---
Health checks let EC2 Auto Scaling identify instances to replace. EC2 checks cover instance and host problems; optional traffic-service checks let the group also react when an application cannot serve requests.

### How it works

1. Auto Scaling evaluates EC2 status checks and scheduled events. These checks are always included.
2. Enable additional checks that match the application. By default the group ignores load balancer health results, even when the load balancer reports an unhealthy target.
3. After a new instance reaches InService, meaning it has entered the serving state, the grace period delays replacement for health failures while initialization finishes. A launch hook completes before this period starts.
4. Load balancer checks continue independently. If an instance leaves the EC2 running state, Auto Scaling replaces it immediately, including during grace.
5. For diagnosis, use Standby to suspend Auto Scaling health checks for that instance, or suspend the group's HealthCheck and ReplaceUnhealthy processes.

| Signal | Configuration |
|---|---|
| EC2 status and scheduled events | Always included |
| Elastic Load Balancing | Opt in to use target health |
| VPC Lattice | Opt in to use target group health |
| EBS | Opt in to check volume reachability and I/O |
| Custom | Report application-specific problems |

### Exam cues

- If the question says an ALB detects an unhealthy target but the group keeps it, think enable ELB health checks, because the group ignores them by default.
- If the question says a slow application is replaced during startup, think an appropriate grace period or launch hook, because initialization must finish before health failure triggers replacement.
- If the question says inspect a failing instance without replacement, think Standby, because Auto Scaling does not health-check it until it returns to service.

### Remember

- Grace period defaults: console 300 seconds; CLI and SDK 0 seconds.
- Impaired EC2 checks receive a short opportunity to recover; insufficient-data alone does not mark an instance unhealthy.
- Leaving running state causes immediate replacement.

> **Trap:** Grace is not a pause in load balancer checks and does not protect a stopped instance.
