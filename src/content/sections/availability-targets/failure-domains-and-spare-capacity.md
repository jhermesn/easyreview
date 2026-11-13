---
title: Failure domains and spare capacity
level: professional
order: 40
facts:
  - id: zone-boundary
    text: An Availability Zone is an isolated location within a Region; instances in the same location
      can become unavailable together.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
  - id: region-boundary
    text: Regions are isolated from one another, and EC2 resources are not automatically replicated
      between Regions.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-regions
  - id: static-capacity
    text: Static stability for compute means provisioning enough capacity before failure for the
      surviving locations to handle the workload.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_static_stability.html#implementation-guidance
  - id: plane-dependency
    text: Pre-provisioning removes the need to launch replacement instances through the EC2 control
      plane as part of immediate recovery.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/static-stability.html#static-stability
  - id: planes
    text: The control plane creates or changes resources; the data plane provides the existing
      resources' working functionality.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/control-planes-and-data-planes.html#control-planes-and-data-planes
  - id: route-repair
    text: Load balancer or Route 53 health checks can shift traffic from impaired instances; Auto
      Scaling can replace lost capacity afterward.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_static_stability.html#implementation-guidance
  - id: quota-overlap
    text: Inaccessible resources can still consume quotas, so failover quotas must allow failed
      resources and their replacements to overlap.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_manage_service_limits_suff_buffer_limits.html#implementation-guidance
  - id: address-space
    text: Subnet address allocation must accommodate expansion and high availability.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_network_topology_ip_subnet_allocation.html#rel_planning_network_topology_ip_subnet_allocation
  - id: test-failure
    text: Fault injection and expected-load testing exercise recovery behavior that architecture alone
      does not prove.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_testing_resiliency_failure_injection_resiliency.html#rel_testing_resiliency_failure_injection_resiliency
  - id: ebs-zone
    text: EBS provides block storage, and an attached volume and EC2 instance must be in the same
      Availability Zone.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html#ebs-volumes
  - id: efs-type
    text: EFS Regional stores file data across multiple AZs; EFS One Zone stores it in one AZ and can
      lose data if that AZ is lost.
    source: https://docs.aws.amazon.com/efs/latest/ug/features.html#file-system-type
  - id: s3-scope
    text: S3 Standard stores objects across at least three AZs; S3 One Zone-IA stores objects within one
      AZ.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html#DataDurability
cards:
  - id: availability-targets-016
    q: What does static stability mean for a multi-AZ EC2 workload?
    a: Pre-provision enough capacity in surviving AZs to serve the workload without waiting for new
      instance launches.
    facts:
      - static-capacity
      - plane-dependency
  - id: availability-targets-017
    q: An EC2 application spans several AZs but needs new instances before it can serve normal load
      after losing an AZ. What resilience improvement is needed?
    a: Provision spare capacity before the failure. A multi-AZ layout alone does not remove the recovery
      dependency on instance launches.
    trap: true
    facts:
      - static-capacity
      - plane-dependency
  - id: availability-targets-018
    q: An EC2 failover cannot create replacement instances because inaccessible instances still consume
      the account quota. What should the design allow?
    a: Quota headroom for both inaccessible resources and replacements at the same time.
    facts:
      - quota-overlap
  - id: availability-targets-019
    q: An EC2 application has healthy replicas in another AZ but its data is on an EBS volume in the
      failed AZ. Can the replicas attach that volume across AZs?
    a: No. EBS volumes attach to instances in their own AZ. The storage design must also meet the
      failure-domain requirement.
    trap: true
    facts:
      - ebs-zone
  - id: availability-targets-020
    q: Which EFS file system type stores shared file data across AZs, and how does S3 Standard compare?
    a: EFS Regional stores files across multiple AZs. S3 Standard stores objects across at least three
      AZs. EFS One Zone and S3 One Zone-IA keep data in one AZ.
    facts:
      - efs-type
      - s3-scope
  - id: availability-targets-021
    q: An EC2 service already has enough surviving capacity during an AZ outage. How should traffic
      shifting and capacity repair relate?
    a: Shift traffic to healthy instances using health checks, then let Auto Scaling restore lost
      capacity. Immediate service recovery need not wait for new instances.
    facts:
      - route-repair
      - static-capacity
diagrams:
  - id: availability-surviving-capacity
    title: Shift work to capacity already running outside the failed AZ
    width: 800
    height: 310
    groups:
      - label: "AZ A: impaired"
        x: 30
        y: 170
        w: 220
        h: 120
        tone: compute
      - label: "AZ B: surviving"
        x: 290
        y: 170
        w: 220
        h: 120
        tone: compute
      - label: "AZ C: surviving"
        x: 550
        y: 170
        w: 220
        h: 120
        tone: compute
    nodes:
      - id: lb
        label: Load balancer
        icon: elastic-load-balancing
        x: 310
        y: 20
        w: 180
        h: 72
        tone: network
      - id: a
        label: EC2 fleet
        icon: res-ec2-instances
        x: 50
        y: 208
        w: 180
        h: 72
        tone: compute
      - id: b
        label: EC2 fleet
        icon: res-ec2-instances
        x: 310
        y: 208
        w: 180
        h: 72
        tone: compute
      - id: c
        label: EC2 fleet
        icon: res-ec2-instances
        x: 570
        y: 208
        w: 180
        h: 72
        tone: compute
    edges:
      - from: lb
        to: a
        dashed: true
        label: impaired
      - from: lb
        to: b
        label: healthy
      - from: lb
        to: c
        label: healthy
    steps: []
---
A failure domain is a location whose resources can fail together, such as an Availability Zone (AZ). Spare capacity is already available capacity that can take over lost work. Static stability means preparing the surviving locations to serve the workload before a failure occurs. [AWS static stability guidance](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_static_stability.html#implementation-guidance)

### How it works

1. Choose the failure to tolerate: an instance, an AZ, or a Region. Distribute resources across the relevant boundary. Multiple instances in one AZ still share that location's risk.
2. Pre-provision enough capacity for the surviving locations. This avoids making immediate recovery depend on the control plane, which creates or changes resources. The data plane is the existing resources' working functionality.
3. Shift traffic to healthy instances using health checks. Auto Scaling can repair lost capacity afterward.
4. Check storage, quota headroom, and subnet address space. A quota is an account usage limit; failed resources may still count while replacements launch. A subnet is a network address range whose free addresses must accommodate growth.
5. Test the expected load with faults injected. Recovery must work across the application and its dependencies. [Quota planning](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_manage_service_limits_suff_buffer_limits.html#implementation-guidance) · [Network planning](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_network_topology_ip_subnet_allocation.html) · [Resilience testing](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_testing_resiliency_failure_injection_resiliency.html)

| Storage choice | Interface | Failure-domain consideration |
|---|---|---|
| EBS | Block storage, used like an attached disk | Volume and instance must share an AZ |
| EFS Regional / One Zone | Shared files | Regional spans AZs; One Zone can lose data with its AZ |
| S3 Standard / One Zone-IA | Objects | Standard spans at least three AZs; One Zone-IA uses one |

[Block storage](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html) · [File system types](https://docs.aws.amazon.com/efs/latest/ug/features.html#file-system-type) · [Object storage](https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html)

### Exam cues

- If the question says survive an AZ failure without waiting for new instances, think static stability, because surviving capacity is provisioned in advance.
- If the question says replacement launches hit quotas during failover, think overlap headroom, because inaccessible instances may still consume quota.
- If the question says compute spans AZs but storage remains in one, think a storage failure domain, because an EBS volume cannot attach across AZs.
- If the question says survive a Region failure, think an explicit multi-Region design, because EC2 does not automatically replicate resources between Regions.

### Remember

- Check surviving capacity, storage placement, quotas, and free network addresses together.
- S3 Standard spans at least three AZs; S3 One Zone-IA uses one.
- EFS Regional and One Zone have different failure scopes.
- Test recovery under expected load.

> **Trap:** A second AZ is not proof of sufficient failover capacity. Waiting to launch resources adds a control-plane dependency during recovery.
