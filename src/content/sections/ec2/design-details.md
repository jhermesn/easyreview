---
title: "PLACEHOLDER ec2/design-details"
level: associate
order: 100
facts:
  - id: type-naming
    text: "An instance type name is the instance family then the size: in c7gn.4xlarge, c is the series, 7 the generation, gn the options and 4xlarge the size."
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-type-names.html#instance-type-names
  - id: spot-notice
    text: Amazon EC2 issues a Spot Instance interruption notice two minutes before it stops or terminates the instance.
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
cards:
  - id: ec2-088
    q: "What does each part of the instance type name m5.2xlarge mean?"
    a: "m is the series (general purpose), 5 the generation and 2xlarge the size within the family."
    facts: [type-naming]
  - id: ec2-038
    q: How much warning does EC2 give before interrupting a Spot Instance?
    a: Two minutes, through an interruption notice.
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
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
