---
title: EC2 configuration and cost details
level: associate
order: 100
facts:
  - id: type-naming
    text: "An instance type name is the instance family then the size: in c7gn.4xlarge, c is the series, 7 the generation, gn the options and 4xlarge the size."
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-type-names.html#instance-type-names
  - id: spot-notice
    text: "EC2 Spot interruption notices are best effort: stop and termination notices give two minutes of warning, while a hibernation notice arrives as hibernation begins."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html#spot-instance-termination-notices
  - id: vpc-tenancy
    text: "Instances in a VPC with dedicated tenancy always run as Dedicated Instances; in a VPC with default tenancy, an instance or launch template can still request dedicated tenancy."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html#dedicated-howitworks
  - id: billing-states
    text: "EC2 bills instance usage only in the running state, plus the stopping state when hibernating; EBS volumes and Elastic IP addresses bill whatever the instance state, and a Reserved Instance keeps billing to the end of its term after its instance is terminated."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html#instance-billing-by-state
  - id: cr-billing
    text: "A Capacity Reservation is billed at the On-Demand rate whether or not instances run in it; Savings Plans and Regional Reserved Instances can apply their discount to it."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/capacity-reservations-pricing-billing.html
  - id: instance-scheduler
    text: "Instance Scheduler on AWS is a deployable solution that uses resource tags and Lambda to stop and start EC2 and RDS instances on custom schedules across accounts and Regions."
    source: https://docs.aws.amazon.com/solutions/latest/instance-scheduler-on-aws/solution-overview.html#solution-overview
  - id: ri-marketplace
    text: The EC2 Reserved Instance Marketplace lets customers sell unused Standard Reserved Instances, for example after moving Regions or changing instance types.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html#ri-market-general
  - id: on-demand-capacity
    text: "An EC2 On-Demand launch or restart can fail with InsufficientInstanceCapacity when AWS lacks capacity for the request."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/troubleshooting-launch.html#troubleshooting-launch-capacity
  - id: host-affinity
    text: "Dedicated Host affinity lets an EC2 instance remain associated with a particular physical host across deployments over time."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html
  - id: cr-attributes
    text: "An EC2 Capacity Reservation defines its capacity by Availability Zone, instance type, operating system platform and tenancy."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cr-concepts.html#cr-attributes
  - id: resize-downtime
    text: "Changing the instance type of an EBS-backed EC2 instance requires stopping it and starting it again, so the workload needs planned downtime."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/change-instance-type-of-ebs-backed-instance.html
  - id: host-billing
    text: "An active On-Demand Dedicated Host is billed for the host regardless of the number or sizes of instances running on it; releasing the host stops those charges."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-billing.html#on-demand-dedicated-hosts
  - id: ri-market-convertible
    text: Convertible Reserved Instances cannot be sold in the Reserved Instance Marketplace.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-types.html
  - id: ri-market-term
    text: A Standard Reserved Instance must have at least one month left in its term to be sold in the Reserved Instance Marketplace.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html
  - id: ri-market-active
    text: A Standard Reserved Instance must have been active in the account for at least 30 days before it can be sold in the Reserved Instance Marketplace.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html
cards:
  - id: ec2-088
    q: "What does each part of the instance type name m5.2xlarge mean?"
    a: "m is the series (general purpose), 5 the generation and 2xlarge the size within the family."
    facts: [type-naming]
  - id: ec2-038
    q: Can an EC2 Spot workload rely on a two-minute warning before every interruption?
    a: "No. Notices are best effort. Stop and termination notices give two minutes of warning; hibernation starts immediately."
    facts: [spot-notice]
  - id: ec2-083
    q: "A launch template asks for dedicated tenancy, but the VPC has default tenancy. Where do the instances run?"
    a: "On dedicated hardware. A default-tenancy VPC lets the launch template choose dedicated, and a dedicated-tenancy VPC forces dedicated for every instance."
    trap: true
    facts: [vpc-tenancy]
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
  - id: ec2-048
    q: A company no longer needs a Standard Reserved Instance after moving Regions. What can it do with it?
    a: Sell it in the EC2 Reserved Instance Marketplace.
    facts: [ri-marketplace]
  - id: ec2-108
    q: "An EC2 application must launch in one Availability Zone for a scheduled event. Does choosing On-Demand alone ensure that the launch succeeds?"
    a: "No. On-Demand launches can fail when capacity is unavailable. Plan capacity separately from the pricing choice."
    facts: [on-demand-capacity]
  - id: ec2-109
    q: "An EC2 application license requires repeated placement on the same physical server. Which Dedicated Host feature supports that requirement?"
    a: "Host affinity. It associates the instance with a particular Dedicated Host over time."
    facts: [host-affinity]
  - id: ec2-110
    q: "A team plans an EC2 Capacity Reservation for a specific workload. Which workload attributes must it plan the reservation around?"
    a: "Availability Zone, instance type, operating system platform and tenancy."
    facts: [cr-attributes]
  - id: ec2-112
    q: "An EBS-backed EC2 application needs a larger instance type. Can the team resize it while it keeps serving requests?"
    a: "No. Stop the instance, change its type and start it again. Plan for downtime."
    facts: [resize-downtime]
  - id: ec2-114
    q: "A team stops every EC2 instance on an On-Demand Dedicated Host but keeps the host allocated. Does host billing stop?"
    a: "No. The active host is billed regardless of how many instances run on it. Release the host to stop its On-Demand charges."
    facts: [host-billing]
  - id: ec2-136
    q: Can a Convertible EC2 Reserved Instance be sold in the Reserved Instance Marketplace?
    a: No. Only eligible Standard Reserved Instances can be sold there.
    facts: [ri-market-convertible, ri-market-term]
  - id: ec2-142
    q: What minimum remaining term and activation period are required to sell a Standard EC2 Reserved Instance in the Reserved Instance Marketplace?
    a: At least one month must remain in the term, and the reservation must have been active in the account for at least 30 days.
    facts: [ri-market-term, ri-market-active]
---
EC2 design choices include the instance type, tenancy and how capacity is paid for. Reading the instance name and understanding charges across its lifecycle helps you choose and operate instances.

### How it works

1. Read an instance type name as family and size. In `c7gn.4xlarge`, `c` is the series, `7` the generation, `gn` the options and `4xlarge` the size.
2. Choose tenancy for the VPC and instance. A dedicated-tenancy VPC runs all instances as Dedicated Instances. In a default-tenancy VPC, an instance or launch template can still request dedicated tenancy.
3. Account for instance state and reserved capacity. Instance usage is billed while running and while stopping for hibernation. A Capacity Reservation is billed at the On-Demand rate even when unused, with applicable Savings Plans or Regional Reserved Instance discounts.
4. Use Instance Scheduler on AWS to start and stop tagged EC2 and RDS instances on custom schedules across accounts and Regions.
5. Consider the Reserved Instance Marketplace when a Standard Reserved Instance is no longer needed, such as after a move to another Region.
6. Plan capacity separately from price: On-Demand launches and restarts can fail for insufficient capacity. A Capacity Reservation defines the zone, instance type, platform and tenancy.
7. Use Dedicated Host affinity when placement must stay tied to a physical host. Budget for the allocated host even when its instances are stopped.
8. Schedule downtime for vertical resizing: an EBS-backed instance must stop before its type changes and start again afterward.

### Exam cues

- If the question says sell a Standard Reserved Instance, think marketplace eligibility, because the reservation needs a minimum remaining term and activation period.
- If the question says sell an unused Convertible Reserved Instance, think unavailable, because Convertible reservations cannot be sold in the Reserved Instance Marketplace.
- If the question says `m5.2xlarge`, think series `m`, generation `5` and size `2xlarge`, because the name separates the family from the size.
- If the question says a default-tenancy VPC and a dedicated launch template, think Dedicated Instances, because the template can request dedicated tenancy.
- If the question says stop development instances outside business hours across accounts, think Instance Scheduler on AWS, because it uses tags and schedules.
- If the question says an unused Standard Reserved Instance after a Region move, think Reserved Instance Marketplace, because customers can sell unused Standard reservations there.
- If the question says resize an EBS-backed EC2 instance without downtime, think a different scaling design, because changing its type requires a stop and start.
- If the question says an empty Dedicated Host still incurs charges, think host allocation, because billing does not depend on the number of running instances.

### Remember

- Spot notices are best effort: two minutes for stop or termination, with no preparation interval for hibernation.
- EBS volumes and Elastic IP addresses can incur charges regardless of instance state. A Reserved Instance continues billing through its term after its instance is terminated.
- A Capacity Reservation incurs the On-Demand rate even when no instances use it.

> **Trap:** Stopping an instance does not stop every charge. EBS volumes and Elastic IP addresses can still incur charges, and a Capacity Reservation is billed even when unused.
