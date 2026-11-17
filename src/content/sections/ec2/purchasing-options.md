---
title: Purchasing options
level: foundational
order: 2
facts:
  - id: options
    text: EC2 purchasing options are On-Demand Instances, Savings Plans, Reserved Instances, Spot Instances, Dedicated Hosts, Dedicated Instances and Capacity Reservations.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html#instance-purchasing-options
  - id: on-demand
    text: On-Demand Instances are paid by the second for the instances you launch, with no commitment.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html#instance-purchasing-options
  - id: savings-plans
    text: Savings Plans give lower prices in exchange for a commitment to a consistent amount of usage, in USD per hour, for 1 or 3 years.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html#instance-purchasing-options
  - id: savings-72
    text: Savings Plans can save up to 72% on compute; Compute Savings Plans apply regardless of instance family, size, OS, tenancy or Region, and also to AWS Fargate and AWS Lambda.
    source: https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html#what-is-savings-plans
  - id: reserved
    text: Reserved Instances lower costs in exchange for a commitment to a consistent instance configuration, including instance type and Region, for 1 or 3 years; they are a billing discount, not physical instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html#ec2-reserved-instances
  - id: prefer-sp
    text: AWS recommends Savings Plans over Reserved Instances; both offer up to 72% off On-Demand, but Savings Plans don't tie you to an instance configuration.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html#ec2-reserved-instances
  - id: spot
    text: Spot Instances use spare EC2 capacity at steep discounts and suit applications that are flexible about when they run and can be interrupted, such as batch jobs, data analysis and background processing.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html#using-spot-instances
  - id: spot-notice
    text: Amazon EC2 issues a Spot Instance interruption notice two minutes before it stops or terminates the instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html#spot-instance-termination-notices
  - id: dedicated-host
    text: A Dedicated Host is a physical server fully dedicated to your instances, which lets you bring per-socket, per-core or per-VM software licenses.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html#instance-purchasing-options
  - id: dedicated-instance
    text: Dedicated Instances run on single-tenant hardware; they don't give the host-level visibility, placement control or per-core licensing of Dedicated Hosts.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html#dedicated-hosts-overview
  - id: capacity-reservations
    text: Capacity Reservations reserve capacity for EC2 instances in a specific Availability Zone.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html#instance-purchasing-options
  - id: payment
    text: Savings Plans can be paid All Upfront, Partial Upfront or No Upfront.
    source: https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html#what-is-savings-plans
  - id: per-second
    text: On-Demand Instances are billed per second while running, with a 60-second minimum.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-on-demand-instances.html
  - id: spot-90
    text: Spot Instances are available at up to a 90% discount compared with On-Demand prices.
    source: https://aws.amazon.com/ec2/spot/
  - id: sp-types
    text: "There are four Savings Plans types: Compute, EC2 Instance, Database and SageMaker AI Savings Plans."
    source: https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html
  - id: sp-rates
    text: EC2 Instance Savings Plans save up to 72% for a commitment to one instance family in one Region; Compute Savings Plans save up to 66% but apply across instance families, Regions, Fargate and Lambda.
    source: https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html
  - id: vpc-tenancy
    text: "Instances in a VPC with dedicated tenancy always run as Dedicated Instances; in a VPC with default tenancy, an instance or launch template can still request dedicated tenancy."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html#dedicated-howitworks
  - id: stopped-billing
    text: "A stopped EC2 instance is not billed for usage or data transfer, but its attached EBS volumes keep being charged."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html#instance-stop-start
  - id: sql-license-included
    text: "EC2 instances can run Microsoft SQL Server with the license included from AWS, launched from license-included Windows AMIs, or with licenses you bring yourself."
    source: https://docs.aws.amazon.com/sql-server-ec2/latest/userguide/sql-server-on-ec2-licensing.html#sql-server-on-ec2-licensing
  - id: vcpu-quota
    text: "On-Demand Instance quotas are counted in vCPUs per account per Region, whatever the instance types; launches that would exceed the quota fail until you request an increase."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-on-demand-instances.html#ec2-on-demand-instances-limits
  - id: billing-states
    text: "EC2 bills instance usage only in the running state, plus the stopping state when hibernating; EBS volumes and Elastic IP addresses bill whatever the instance state, and a Reserved Instance keeps billing to the end of its term after its instance is terminated."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html#instance-billing-by-state
  - id: cr-billing
    text: "A Capacity Reservation is billed at the On-Demand rate whether or not instances run in it; Savings Plans and Regional Reserved Instances can apply their discount to it."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/capacity-reservations-pricing-billing.html
  - id: instance-scheduler
    text: "Instance Scheduler on AWS is a deployable solution that uses resource tags and Lambda to stop and start EC2 and RDS instances on custom schedules across accounts and Regions."
    source: https://docs.aws.amazon.com/solutions/latest/instance-scheduler-on-aws/solution-overview.html#solution-overview
cards:
  - id: ec2-036
    q: A company runs a steady workload on EC2 for the next three years but may change instance families. Which purchasing option saves the most while staying flexible?
    a: A Compute Savings Plan, which applies across instance family, size, OS, tenancy and Region, plus Fargate and Lambda.
    facts: [savings-plans, savings-72]
  - id: ec2-037
    q: A batch job can stop and restart at any time. Which EC2 purchasing option is cheapest?
    a: Spot Instances, which use spare capacity at steep discounts and can be interrupted.
    facts: [spot]
  - id: ec2-038
    q: How much warning does EC2 give before interrupting a Spot Instance?
    a: Two minutes, through an interruption notice.
    facts: [spot-notice]
  - id: ec2-039
    q: A developer needs an EC2 instance for a short test of unknown length with no commitment. Which purchasing option fits?
    a: On-Demand Instances, billed by the second with no commitment.
    facts: [on-demand]
  - id: ec2-040
    q: A company must use its existing per-core SQL Server licenses on EC2. Which purchasing option supports this?
    a: Dedicated Hosts, which give a physical server and support per-socket, per-core and per-VM licenses.
    facts: [dedicated-host]
  - id: ec2-041
    q: A company needs guaranteed EC2 capacity in one Availability Zone for a launch event, without a long-term commitment. Which option fits?
    a: On-Demand Capacity Reservations, which reserve capacity in a specific AZ.
    facts: [capacity-reservations]
  - id: ec2-042
    q: Should a production database that must never stop run on Spot Instances to save money?
    a: No. Spot Instances can be interrupted with two minutes' notice. Use On-Demand, Savings Plans or Reserved Instances.
    trap: true
    facts: [spot, spot-notice]
  - id: ec2-043
    q: Which is AWS's recommended commitment-based discount for EC2 today, Savings Plans or Reserved Instances?
    a: Savings Plans. Both offer up to 72% off On-Demand, but Savings Plans don't lock you into an instance configuration.
    facts: [prefer-sp]
  - id: ec2-051
    q: What is the minimum billing period when an EC2 On-Demand Instance starts?
    a: 60 seconds. After that, On-Demand Instances are billed per second.
    facts: [per-second]
  - id: ec2-052
    q: Which EC2 purchasing option can give up to a 90% discount compared with On-Demand?
    a: Spot Instances.
    facts: [spot-90]
  - id: ec2-053
    q: Which Savings Plans type gives the largest EC2 discount, and what does it tie you to?
    a: EC2 Instance Savings Plans, up to 72%. They tie you to one instance family in one Region; Compute Savings Plans (up to 66%) are more flexible.
    trap: true
    facts: [sp-rates]
  - id: ec2-054
    q: Which four Savings Plans types does AWS offer?
    a: Compute, EC2 Instance, Database and SageMaker AI Savings Plans.
    facts: [sp-types]
  - id: ec2-083
    q: "A launch template asks for dedicated tenancy, but the VPC has default tenancy. Where do the instances run?"
    a: "On dedicated hardware. A default-tenancy VPC lets the launch template choose dedicated, and a dedicated-tenancy VPC forces dedicated for every instance."
    trap: true
    facts: [vpc-tenancy]
  - id: ec2-086
    q: "In which instance state is only EBS storage billed, not the instance itself?"
    a: "Stopped. Instance usage stops being billed, but attached EBS volumes are still charged."
    facts: [stopped-billing]
  - id: ec2-087
    q: "A DBA needs SQL Server Standard on a server reachable by RDP, must not buy a license separately, and is unsure about sizing. What fits?"
    a: "An EC2 instance from a Windows Server AMI with SQL Server Standard license included. AWS bills the license with the instance, and the instance type can be changed later."
    facts: [sql-license-included]
  - id: ec2-089
    q: "A script launching many On-Demand instances in one Region fails after a few dozen succeed. What limit is likely involved?"
    a: "The On-Demand Instance quota, measured in vCPUs per account per Region. Request an increase through Service Quotas."
    facts: [vcpu-quota]
  - id: ec2-090
    q: "Which EC2 states bill instance usage?"
    a: "Running, and stopping when the instance is hibernating. EBS volumes and Elastic IPs still bill while stopped, and Reserved Instances bill for their full term even after termination."
    trap: true
    facts: [billing-states]
  - id: ec2-091
    q: "A team creates a Capacity Reservation for a week but launches nothing into it. What do they pay?"
    a: "The On-Demand rate for the reserved capacity for the whole week. A Capacity Reservation is charged whether or not it is used; only Savings Plans or Regional Reserved Instances lower that price."
    trap: true
    facts: [cr-billing]
  - id: ec2-096
    q: "Development EC2 and RDS instances in several accounts should stop outside business hours automatically. What ready-made AWS solution fits?"
    a: "Instance Scheduler on AWS, which stops and starts tagged instances on defined schedules across accounts and Regions."
    facts: [instance-scheduler]
---
Amazon EC2 charges the same instance in different ways depending on how much you commit and how much interruption you accept. Choosing well can cut compute costs sharply. [EC2 billing and purchasing options](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html#instance-purchasing-options)

### How it works

| Option | You commit to | Best for |
|---|---|---|
| On-Demand | Nothing; pay per second | Short, unpredictable or new workloads |
| Savings Plans | USD per hour of usage for 1 or 3 years | Steady usage that may change shape; up to 72% off |
| Reserved Instances | An instance configuration for 1 or 3 years | Steady usage of one configuration; up to 72% off |
| Spot Instances | Nothing, but instances can be interrupted | Fault-tolerant, flexible jobs; steepest discounts |
| Dedicated Hosts | A physical server | Server-bound licenses, compliance |
| Dedicated Instances | Single-tenant hardware | Hardware isolation without host control |
| Capacity Reservations | Capacity in one AZ | Guaranteed capacity |

1. Start with On-Demand while usage is unknown.
2. Cover steady usage with Savings Plans; AWS recommends them over Reserved Instances. [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html#what-is-savings-plans)
3. Move interruptible work to Spot, which warns two minutes before an interruption. [Spot interruption notices](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html#spot-instance-termination-notices)
4. Use Dedicated Hosts when licenses are tied to sockets or cores.

### Exam cues

- If the question says steady usage for one or three years, think Savings Plans or Reserved Instances.
- If the question says can be interrupted or flexible start times, think Spot.
- If the question says short-term, unpredictable, no commitment, think On-Demand.
- If the question says bring per-core licenses or physical server, think Dedicated Hosts.
- If the question says guaranteed capacity in a specific AZ, think Capacity Reservations (or zonal RIs).

### Remember

- Savings Plans and RIs: 1 or 3 years, up to 72% off.
- Spot: two-minute interruption notice.
- Savings Plans payment: All Upfront, Partial Upfront or No Upfront.
- On-Demand: per second, 60-second minimum.
- Spot: up to 90% off.
- EC2 Instance Savings Plans up to 72%; Compute Savings Plans up to 66%.

> **Trap:** A Reserved Instance is a billing discount, not a server. It applies automatically to matching On-Demand usage.
