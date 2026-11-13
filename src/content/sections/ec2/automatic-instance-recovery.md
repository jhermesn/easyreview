---
title: Automatic instance recovery
level: associate
order: 30
facts:
  - id: system-check
    text: EC2 system status checks detect problems in the AWS infrastructure hosting an instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html#system-status-checks
  - id: instance-check
    text: EC2 instance status checks monitor the individual instance's software and network connectivity.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html#instance-status-checks
  - id: system-metric
    text: StatusCheckFailed_System is 0 for a passed system check and 1 for a failed system check.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: recovery-attempt
    text: Automatic instance recovery attempts to move an impaired instance to another host after an underlying hardware or software failure.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-instance-recover
  - id: recovery-reboot
    text: Successful automatic recovery appears to the instance as an unplanned reboot.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-instance-recover
  - id: keep-id
    text: Automatic recovery retains the instance ID.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: keep-addresses
    text: Automatic recovery retains public, private and Elastic IP addresses.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: keep-metadata
    text: Automatic recovery retains instance metadata.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: keep-volumes
    text: Automatic recovery retains attached EBS volumes.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: keep-zone
    text: Automatic recovery retains the instance's Availability Zone.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: zone-definition
    text: An Availability Zone is an isolated location within an AWS Region, a separate geographic area.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html#aws-regions-availability-zones
  - id: memory-lost
    text: Automatic recovery loses volatile memory (RAM) contents.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: uptime-reset
    text: Automatic recovery resets operating system uptime to zero.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
  - id: simplified-default
    text: Simplified automatic recovery is enabled by default at launch on supported EC2 instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-configuration-recovery.html#set-recovery-behavior
  - id: simplified-store
    text: Simplified automatic recovery does not support instances with instance store volumes.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-configuration-recovery.html#requirements-for-simplified-automatic-recovery
  - id: cloudwatch-config
    text: CloudWatch action based recovery requires configuring an alarm recovery action and works with StatusCheckFailed_System.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#ec2-instance-recover-cloudwatch-configure
  - id: instance-reboot
    text: An alarm on StatusCheckFailed_Instance can reboot an instance but cannot use the recover action.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
  - id: cloudwatch-store-types
    text: With instance store volumes attached at launch, CloudWatch action based recovery supports only M3, C3, R3, X1, X1e, X2idn and X2iedn instance types.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#requirements-for-cloudwatch-action-based-recovery
  - id: cloudwatch-store-loss
    text: CloudWatch action based recovery loses instance store data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#cloudwatch-recovery
  - id: efa-excluded
    text: Neither simplified automatic recovery nor CloudWatch action based recovery supports instances using an Elastic Fabric Adapter.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#requirements-for-cloudwatch-action-based-recovery
  - id: efa-definition
    text: An Elastic Fabric Adapter (EFA) is an EC2 network device for workloads such as machine learning and high performance computing.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html#efa
  - id: asg-excluded
    text: Simplified automatic recovery and CloudWatch action based recovery do not support instances in Auto Scaling groups.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#requirements-for-cloudwatch-action-based-recovery
  - id: asg-replaces
    text: EC2 Auto Scaling replaces instances it determines are unhealthy.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html#health-checks-overview
  - id: recovery-conditions
    text: Automatic recovery requires a running instance, available instance-type capacity and no service events listed in the AWS Health Dashboard.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#cloudwatch-recovery
  - id: failed-recovery
    text: If recovery fails and an instance remains unreachable or keeps failing system checks, AWS recommends manually stopping and starting it.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-instance-recover
  - id: restart-address
    text: Unlike automatic recovery, a manual stop and start assigns a new public IPv4 address unless the instance has an Elastic IP address.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-instance-recover
  - id: missing-data
    text: AWS recommends treating missing data as missing and triggering EC2 action alarms only in ALARM state.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
  - id: metric-alarm
    text: A CloudWatch metric records measurements over time.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: alarm-definition
    text: A CloudWatch alarm evaluates a metric against a threshold over a period.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#CloudWatchAlarms
  - id: metadata-definition
    text: Instance metadata is information about an instance used to configure or manage it.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#ec2-instance-metadata
  - id: elastic-ip-definition
    text: An Elastic IP address is a static public IPv4 address allocated to an AWS account.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#elastic-ip-addresses-eip
  - id: primary-interface
    text: An EC2 instance's primary network interface cannot be detached from the instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#eni-basics
  - id: secondary-interface
    text: A secondary network interface retains its attributes, including private IP addresses, when moved between EC2 instances in the same Availability Zone.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#using-eni
cards:
  - id: ec2-002
    q: Which CloudWatch alarm action attempts to move an impaired EC2 instance to another host while preserving its ID and IP addresses?
    a: The recover action on StatusCheckFailed_System. Successful recovery keeps the instance ID, IP addresses, metadata, EBS volumes and zone, but loses RAM contents.
    trap: true
    facts: [cloudwatch-config, recovery-attempt, keep-id, keep-addresses, keep-metadata, keep-volumes, keep-zone, memory-lost]
  - id: ec2-003
    q: A standalone EC2 instance fails StatusCheckFailed_Instance while its system status check passes. Which CloudWatch action can restart it automatically?
    a: Reboot, using an alarm on StatusCheckFailed_Instance. The recover action cannot be used on that metric; investigate the instance's software and network configuration.
    facts: [instance-check, instance-reboot]
    trap: true
  - id: ec2-018
    q: Must an operator create a CloudWatch alarm to enable simplified automatic recovery for a supported EC2 instance?
    a: No. Simplified automatic recovery is enabled by default at launch. CloudWatch action based recovery requires an explicitly configured alarm action.
    facts: [simplified-default, cloudwatch-config]
  - id: ec2-019
    q: An EC2 workload uses an Elastic Fabric Adapter. Can either simplified automatic recovery or CloudWatch action based recovery restore the instance after a host failure?
    a: No. Both mechanisms exclude instances using EFA.
    facts: [efa-excluded]
    trap: true
  - id: ec2-020
    q: How do simplified and CloudWatch action based EC2 recovery differ for instances with instance store volumes?
    a: Simplified recovery excludes them. CloudWatch recovery supports selected instance types with instance store attached at launch, but loses that data during recovery.
    facts: [simplified-store, cloudwatch-store-types, cloudwatch-store-loss]
    trap: true
  - id: ec2-021
    q: An operator compares automatic EC2 recovery with manually stopping and starting an impaired instance. Which preserves an automatically assigned public IPv4 address?
    a: Automatic recovery. Manual stop and start changes the public IPv4 address unless the instance has an Elastic IP address.
    facts: [keep-addresses, restart-address]
  - id: ec2-022
    q: An unhealthy EC2 instance belongs to an Auto Scaling group. Which mechanism should replace it?
    a: EC2 Auto Scaling health-based replacement. Instances in Auto Scaling groups are excluded from simplified and CloudWatch action based recovery.
    facts: [asg-excluded, asg-replaces]
  - id: ec2-023
    q: A running EC2 instance has automatic recovery configured, but there is no capacity for its instance type. Is recovery guaranteed?
    a: No. Recovery requires available capacity. If recovery fails and the instance stays unreachable or keeps failing system checks, AWS recommends a manual stop and start.
    facts: [recovery-conditions, failed-recovery]
  - id: ec2-024
    q: How should missing data be handled for a CloudWatch alarm configured to recover an EC2 instance?
    a: Treat missing data as missing and trigger the action only in ALARM state. AWS recommends this configuration for EC2 action alarms.
    facts: [missing-data]
  - id: ec2-025
    q: A team needs an EC2 instance to resume in another Availability Zone after a zone outage. Does automatic instance recovery provide this?
    a: No. Automatic recovery retains the instance's Availability Zone.
    facts: [keep-zone]
    trap: true
  - id: ec2-028
    q: A team wants to detach the primary network interface from an impaired EC2 instance and attach it to a replacement. Is that possible?
    a: No. An EC2 instance's primary network interface cannot be detached.
    facts: [primary-interface]
    trap: true
  - id: ec2-029
    q: An EC2 secondary network interface moves between instances in the same Availability Zone. What happens to its private IP addresses?
    a: They stay with the network interface when it is moved.
    facts: [secondary-interface]
diagrams:
  - id: ec2-cloudwatch-recovery-flow
    title: CloudWatch recovery attempts to restore the same instance
    width: 840
    height: 200
    nodes:
      - { id: impaired, label: EC2 instance, icon: res-ec2-instance, sub: system check fails, x: 20, y: 60, w: 220, h: 86, tone: compute }
      - { id: alarm, label: CloudWatch alarm, icon: res-cloudwatch-alarm, sub: recover action, x: 310, y: 60, w: 220, h: 86, tone: mgmt }
      - { id: recovered, label: EC2 instance, icon: res-ec2-instance, sub: same ID and zone, x: 600, y: 60, w: 220, h: 86, tone: compute }
    edges:
      - { from: impaired, to: alarm, step: 1 }
      - { from: alarm, to: recovered, step: 2 }
    steps:
      - A configured alarm evaluates StatusCheckFailed_System and triggers its recovery action.
      - AWS attempts recovery on another host; success preserves identity and EBS volumes but loses RAM and instance store data.
---
EC2 automatic instance recovery attempts to restore an instance after a problem in its underlying host, the computer running it. The successful operation looks like an unplanned reboot while retaining the instance's identity. It also retains the Availability Zone, an isolated location within an AWS Region, which is a separate geographic area.

### How it works

1. Distinguish the checks. A system status check tests AWS infrastructure; an instance status check tests the individual instance's software and network connectivity.
2. For a supported standalone instance, simplified automatic recovery is enabled at launch by default. For alarm-controlled recovery, configure a CloudWatch alarm on `StatusCheckFailed_System` with the recover action. A metric records measurements over time; an alarm evaluates them against a threshold.
3. After a system failure, AWS attempts to move the instance to another host. Recovery requires a running instance, available capacity and no service events listed in the AWS Health Dashboard.
4. Successful recovery retains the instance ID, IP addresses, attached EBS disk volumes and zone. It also retains metadata, the information used to configure or manage the instance. An Elastic IP is a static public IPv4 address allocated to your account; it is retained too.
5. Expect to lose RAM, the instance's working memory. Operating system uptime resets to zero. CloudWatch recovery also loses instance store data; simplified recovery excludes instances with instance store volumes.
6. If recovery fails and the instance remains unreachable or keeps failing system checks, stop and start it manually. This can change its public IPv4 address unless it uses an Elastic IP.

| Situation | Mechanism | Deciding limitation |
|---|---|---|
| Supported standalone instance, default recovery | Simplified automatic recovery | No instance store volumes or EFA |
| Supported standalone instance, alarm-controlled recovery | CloudWatch recover action | Selected instance store configurations supported, with data loss; no EFA |
| Instance software failure, system check passes | CloudWatch reboot action | Recover cannot use StatusCheckFailed_Instance |
| Unhealthy Auto Scaling group member | Auto Scaling replacement | Neither individual-instance recovery mechanism supports group members |

An Elastic Fabric Adapter (EFA) is a network device for workloads such as machine learning and high performance computing. Both recovery mechanisms exclude instances using EFA.

For a separate failover approach, a network interface is a virtual network card. A primary interface cannot be detached, but a secondary interface and its private IP addresses can move between EC2 instances within one Availability Zone.

### Exam cues

- If the question says host failure while preserving instance ID and addresses, think recover, because it attempts to restore the same instance on other hardware.
- If the question says only the instance status check fails, think reboot or instance repair, because the recover action cannot use `StatusCheckFailed_Instance`.
- If the question says an instance belongs to an Auto Scaling group, think group health-based replacement, because individual-instance recovery excludes group members.
- If the question says fail over to another Availability Zone, think a separate replacement strategy, because automatic recovery retains the zone.
- If the question says transfer private addresses to another instance in the same zone, think a secondary network interface, because its attributes move with it.

### Remember

- `StatusCheckFailed_System`: 0 means passed; 1 means failed.
- Simplified recovery is enabled by default only on supported instances. CloudWatch recovery needs an alarm action.
- With instance store volumes attached at launch, CloudWatch recovery supports M3, C3, R3, X1, X1e, X2idn and X2iedn. It loses their local data.
- For EC2 action alarms, treat missing data as `missing` and trigger actions only in `ALARM` state.

> **Trap:** Recovery preserves instance identity, addresses and EBS volumes, but not RAM or instance store contents. It is not a guarantee of recovery when capacity is unavailable.

- EC2 auto recovery handles standalone instances (`StatusCheckFailed_System`). In an ASG the group replaces the instance.
