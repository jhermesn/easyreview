---
title: Groups, launch templates, and AZ balance
level: associate
order: 10
facts:
  - id: capacity
    text: An Auto Scaling group maintains desired capacity within its minimum and maximum size limits.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-capacity-limits.html#asg-capacity-limits
  - id: unexpected-loss
    text: An Auto Scaling group launches replacement instances after unexpected termination to maintain desired capacity.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-capacity-limits.html#asg-capacity-limits
  - id: template
    text: A launch template is a versioned set of instance launch settings, including the machine image, instance type and security groups.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html#launch-templates
  - id: az-subnet
    text: An Availability Zone is an isolated location in a Region; each subnet belongs to one Availability Zone.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html#arch-AutoScalingMultiAZ
  - id: distribution
    text: Balanced best effort and balanced only aim for an even instance distribution across enabled Availability Zones.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html
  - id: az-recovery
    text: With balanced best effort, if an Availability Zone becomes unavailable, Auto Scaling can launch instances in other enabled zones and rebalance when the zone recovers.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html#AutoScalingBehavior.Rebalancing
  - id: rebalancing-order
    text: Availability Zone rebalancing launches replacement instances before terminating existing instances.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html#AutoScalingBehavior.InstanceUsage
  - id: rebalancing-headroom
    text: By default, Availability Zone rebalancing can temporarily exceed maximum capacity by 10 percent or one instance, whichever is greater; an instance maintenance policy can control replacement thresholds.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html#AutoScalingBehavior.InstanceUsage
  - id: load-balancer
    text: A load balancer distributes application traffic among instances in an Auto Scaling group.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html#auto-scaling-benefits
  - id: termination-zone
    text: For scale-in under balanced distribution, Auto Scaling prioritizes Availability Zone balance before applying termination policies to eligible instances.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#ec2-auto-scaling-termination-policies
  - id: termination-default
    text: For a launch-template group, the default termination policy prioritizes launch configurations, then other launch templates, then the oldest version of the current template.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#default-termination-policy
  - id: termination-tie
    text: After configuration criteria, the default termination policy chooses instances closest to the next billing hour and breaks remaining ties randomly.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#default-termination-policy
  - id: termination-options
    text: OldestInstance prioritizes the oldest eligible instance for termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#predefined-termination-policies
  - id: termination-newest
    text: NewestInstance prioritizes the newest eligible instance for termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#predefined-termination-policies
  - id: termination-allocation
    text: AllocationStrategy prioritizes terminations that align remaining capacity with the configured allocation strategy.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#predefined-termination-policies
  - id: termination-custom
    text: A Lambda custom termination policy returns instance IDs ready for termination; its input includes capacity to terminate and suggested instances.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lambda-custom-termination-policy.html#lambda-custom-termination-policy
  - id: termination-unhealthy
    text: Instances marked unhealthy bypass termination policy evaluation.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#ec2-auto-scaling-termination-policies
  - id: machine-image
    text: An Amazon Machine Image provides the software needed to set up and boot an EC2 instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
  - id: security-group
    text: A security group controls incoming and outgoing network traffic for associated EC2 instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html#ec2-security-groups
  - id: capacity-failure
    text: An EC2 instance type or Availability Zone capacity shortage can prevent Auto Scaling launches; using more instance types or zones can help.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-instancelaunchfailure.html#ts-as-instancelaunchfailure
  - id: az-strategies
    text: Balanced best effort is the default and tries another healthy zone after a launch failure; balanced only
      keeps retrying the affected zone to preserve balance.
    source: https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_AvailabilityZoneDistribution.html#API_AvailabilityZoneDistribution_Contents
  - id: reservation-strategy
    text: Reservations then balanced fills targeted Capacity Reservations before distributing remaining capacity
      evenly; a reservation ID or Capacity Reservation resource group is required.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html
  - id: template-requirements
    text: A launch template for an Auto Scaling group must specify an AMI; instance types can be supplied when
      creating the group. Multiple instance types and mixed purchase options require a launch template.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html
  - id: template-permissions
    text: Launch template authorization requires ec2:RunInstances, ec2:CreateTags when tags are specified, and
      iam:PassRole when an instance profile is specified. A private cross-account AMI must be shared.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-launch-template.html#ts-launch-template-unauthorized-error
  - id: group-quota
    text: The default quota is 500 Auto Scaling groups per Region; increases can be requested for supported
      quotas, and EC2 and VPC quotas can also constrain a group.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-quotas.html
  - id: template-update
    text: A new launch template applies to new instances; existing instances keep their original configuration
      until replaced, for example by instance refresh.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/update-auto-scaling-group.html#update-auto-scaling-instances
  - id: encrypted-volume-key
    text: A customer managed KMS key for encrypted Auto Scaling EBS volumes needs a key policy allowing the
      service-linked role to use the key and create grants.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html#configuring-key-policies
  - id: encrypted-volume-cross-account
    text: A KMS key in another account needs a key policy allowing the Auto Scaling account and a grant to the
      Auto Scaling service-linked role.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html#policy-example-cmk-cross-account-access
  - id: termination-oldest-config
    text: "OldestLaunchConfiguration terminates instances on a noncurrent launch configuration first. OldestLaunchTemplate terminates instances on a noncurrent launch template first, then those on the oldest version of the current template."
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html#predefined-termination-policies
  - id: no-fee
    text: EC2 Auto Scaling has no additional fee beyond the EC2 instances, CloudWatch and other resources it uses.
    source: https://aws.amazon.com/ec2/autoscaling/pricing/
diagrams:
  - id: asg-alb-zones
    title: Load balancing across an Auto Scaling group
    width: 1120
    height: 504
    groups:
      - label: Auto Scaling group
        icon: group-auto-scaling-group
        x: 588
        y: 28
        w: 490
        h: 448
        tone: compute
    nodes:
      - id: client
        label: Clients
        icon: res-users
        h: 72
        x: 28
        y: 206
        w: 120
        tone: user
      - id: alb
        label: Load balancer
        icon: res-elastic-load-balancing-application-load-balancer
        h: 72
        x: 308
        y: 206
        w: 180
        tone: network
        info: Distributes application requests among group instances.
      - id: az1
        label: AZ 1 instances
        icon: res-ec2-instances
        h: 72
        x: 700
        y: 87
        w: 180
        tone: compute
      - id: az2
        label: AZ 2 instances
        icon: res-ec2-instances
        h: 72
        x: 700
        y: 339
        w: 180
        tone: compute
    edges:
      - from: client
        to: alb
        step: 1
      - from: alb
        to: az1
        step: 2
      - from: alb
        to: az2
        step: 3
    steps:
      - Clients send requests to the load balancer.
      - The load balancer distributes requests to instances in one zone.
      - Instances in another zone also serve requests.
cards:
  - id: ec2-auto-scaling-021
    q: An Availability Zone used by an EC2 Auto Scaling group with balanced best effort becomes unavailable. How does recovery work, and what can block it?
    a: It can launch replacements in other enabled zones. When balance is restored, rebalancing launches instances before terminating others. Capacity shortages can still prevent launches; using more instance types or zones can help.
    trap: true
    facts:
      - az-recovery
      - rebalancing-order
      - capacity-failure
  - id: ec2-auto-scaling-029
    q: An EC2 Auto Scaling group must keep a fixed fleet size without demand-based scaling. Which setting defines that size?
    a: Desired capacity. The group maintains it and replaces unexpectedly terminated instances.
    facts:
      - capacity
      - unexpected-loss
  - id: ec2-auto-scaling-030
    q: An EC2 Auto Scaling group uses OldestInstance, but removes a newer instance in a crowded zone. Why?
    a: Availability Zone balance takes priority over the termination policy. The policy is applied to eligible candidates after choosing the zone.
    trap: true
    facts:
      - termination-zone
      - termination-options
      - termination-newest
      - termination-allocation
  - id: ec2-auto-scaling-031
    q: Which configuration order does the EC2 Auto Scaling default termination policy prefer in a launch-template group?
    a: Launch configurations, other launch templates, then the oldest version of the current template. Billing-hour proximity and random selection resolve remaining ties.
    facts:
      - termination-default
      - termination-tie
  - id: ec2-auto-scaling-032
    q: An EC2 Auto Scaling application must select idle workers for scale-in using application state. Which feature can choose candidates?
    a: A Lambda custom termination policy. It evaluates the supplied candidates and returns the IDs ready for termination.
    facts:
      - termination-custom
  - id: ec2-auto-scaling-033
    q: Which EC2 Auto Scaling termination policies prioritize the oldest instance, newest instance or configured allocation strategy?
    a: OldestInstance, NewestInstance and AllocationStrategy, respectively.
    facts:
      - termination-options
      - termination-newest
      - termination-allocation
  - id: ec2-auto-scaling-071
    q: An EC2 Auto Scaling group must keep Availability Zones balanced even if launches fail in one zone. Which
      distribution strategy should it use?
    a: Balanced only. It retries the affected zone; the default balanced best effort can launch in another healthy
      zone.
    facts:
      - az-strategies
  - id: ec2-auto-scaling-072
    q: An EC2 Auto Scaling group must use its Capacity Reservations before balancing remaining instances across
      Availability Zones. What does it configure?
    a: Reservations then balanced, with a reservation ID or Capacity Reservation resource group as the target.
    facts:
      - reservation-strategy
  - id: ec2-auto-scaling-073
    q: An EC2 Auto Scaling group needs Spot and On-Demand instances across multiple instance types. What must its
      launch template include?
    a: Use a launch template with an AMI. Instance types can be specified when creating the group.
    facts:
      - template-requirements
  - id: ec2-auto-scaling-074
    q: An EC2 Auto Scaling launch template specifies tags, an instance profile and a private AMI owned by another
      account. What should an administrator check after an authorization error?
    a: Check ec2:RunInstances, ec2:CreateTags and iam:PassRole permissions, and ensure the AMI is shared with the
      group account.
    facts:
      - template-permissions
  - id: ec2-auto-scaling-075
    q: An account cannot create another EC2 Auto Scaling group in a Region. Which default quota should it check?
    a: The default is 500 groups per Region. Check Service Quotas for the account's actual limit and request an
      increase if needed.
    facts:
      - group-quota
  - id: ec2-auto-scaling-076
    q: An EC2 Auto Scaling group switches to a new launch template, but existing instances still use the old AMI.
      How can the fleet be updated?
    a: Start an instance refresh. The updated template applies to new instances, not existing ones.
    facts:
      - template-update
  - id: ec2-auto-scaling-077
    q: EC2 Auto Scaling cannot launch instances with EBS volumes encrypted by a customer managed KMS key in
      another account. What access must be configured?
    a: Allow key use and grant creation in the key policy, then create a cross-account grant for the Auto Scaling
      service-linked role.
    facts:
      - encrypted-volume-key
      - encrypted-volume-cross-account
  - id: ec2-auto-scaling-078
    q: "An Auto Scaling group moved to a new launch template, and scale-in must remove instances from the old configuration first. Which termination policies target that?"
    a: "OldestLaunchTemplate, or OldestLaunchConfiguration for groups on launch configurations. Zone balance is still applied before either policy."
    facts:
      - termination-oldest-config
      - termination-zone
  - id: ec2-auto-scaling-079
    q: Does Amazon EC2 Auto Scaling itself cost extra?
    a: No. You pay only for the EC2 instances, CloudWatch and other resources it uses.
    facts: [no-fee]
---
An Auto Scaling group maintains a chosen amount of EC2 capacity and replaces instances that terminate unexpectedly. A launch template is its versioned recipe for new instances, including the machine image, instance type and security groups. A machine image supplies the software to boot the instance; security groups are network traffic rules for its connections.

### How it works

1. Set minimum, desired and maximum capacity. The group attempts to maintain desired capacity within those limits.
2. Select subnets in the Availability Zones to use. An Availability Zone is an isolated location within a Region; a subnet belongs to one zone.
3. Choose an Availability Zone distribution strategy. Balanced best effort is the default and can launch in another healthy zone after a failure. Balanced only keeps retrying the affected zone. Reservations then balanced fills targeted Capacity Reservations first and requires a reservation ID or resource group.
4. With balanced best effort, if a zone becomes unavailable, the group can launch in other enabled zones. When it rebalances, it launches replacements before terminating existing instances. Capacity shortages can still prevent launches; additional instance types or zones provide more places to find capacity. A load balancer distributes application requests among the instances.
5. During scale-in, which means removing capacity, zone balance normally takes priority. Reservations then balanced removes instances outside reservations first. Within the eligible zone, the default termination policy removes outdated configurations first, then considers the next billing hour and breaks remaining ties randomly. Unhealthy instances bypass this policy.
6. Put the AMI in the launch template; instance types can be supplied when the group is created. For authorization failures, check launch and tagging permissions, permission to pass an instance role, and sharing of a private cross-account AMI.
7. Updating the launch template affects new instances, not existing ones. Use instance refresh to replace the fleet. For customer managed KMS keys on encrypted EBS volumes, allow the Auto Scaling service-linked role to use the key and create grants. A cross-account key also needs a grant to that role.

| Termination choice | Selection rule |
|---|---|
| Default | Launch configurations, other templates, then oldest current-template version |
| OldestInstance | Oldest instance |
| NewestInstance | Newest instance |
| AllocationStrategy | Keep capacity aligned with the configured allocation strategy |
| Custom Lambda | Return instance IDs ready to terminate based on application state |

### Exam cues

- If the question says a zone fails under balanced best effort, think replacement capacity in other enabled zones, because the group attempts to maintain desired capacity.
- If preserving zone balance matters more than launching elsewhere, choose balanced only. If reservation use matters first, choose reservations then balanced and specify the reservation target.
- If the question says a newer instance was removed under OldestInstance, think zone balance, because it takes priority over age.
- If the question says only idle workers should be selected for scale-in, think a Lambda custom termination policy, because it can use application state to return candidates.
- If the question says phase out instances from an earlier configuration during scale-in, think OldestLaunchTemplate or OldestLaunchConfiguration, because they terminate noncurrent configurations first.

### Remember

- Minimum <= desired <= maximum capacity.
- Rebalancing launches before terminating.
- Default rebalancing headroom is 10% of maximum capacity or one instance, whichever is greater. An instance maintenance policy can set replacement thresholds.
- The default group quota is 500 per Region. EC2 and VPC quotas can also limit launches.

> **Trap:** A termination policy does not override zone balance or protect an unhealthy instance from replacement.
