---
title: Warm pools
level: associate
order: 60
facts:
  - id: pool
    text: A warm pool keeps pre-initialized EC2 instances alongside an Auto Scaling group to reduce scale-out startup latency.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: pool-desired
    text: Instances drawn from the warm pool count toward group desired capacity when they leave the pool.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: states
    text: Warm-pool instances can be Stopped, Hibernated or Running.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: cost
    text: Stopped warm-pool instances incur charges for volumes and attached Elastic IP addresses.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: hibernation-cost
    text: Hibernated warm-pool instances incur volume and attached Elastic IP charges, including root-volume space for saved memory.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: running-cost
    text: Running warm-pool instances incur instance charges.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: root
    text: A Stopped or Hibernated warm-pool instance requires an EBS root volume.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pools-limitations
  - id: hibernation-support
    text: A Hibernated warm-pool instance must satisfy the EC2 hibernation requirements.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pools-limitations
  - id: mixed
    text: Warm pools do not support instance weighting or Spot Instances in mixed instance groups.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pools-limitations
  - id: reuse
    text: Scale-in terminates instances by default; an instance reuse policy can return them to the warm pool.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: hooks
    text: Launch hooks delay stopping or hibernation until initialization finishes and can pause instances again before they enter service from the pool.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/warm-pool-instance-lifecycle.html#warm-pool-instance-lifecycle
  - id: refresh
    text: Instance refresh updates InService instances first, then warm-pool instances; changing a launch template alone does not replace existing pool instances.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#update-warm-pool
cards:
  - id: ec2-auto-scaling-017
    q: When should an EC2 Auto Scaling group use a warm pool, and which states are available?
    a: Use it when long initialization makes scale-out too slow. Keep pre-initialized instances Stopped, Hibernated or Running; hooks can hold them until setup finishes.
    facts:
      - pool
      - states
      - hooks
  - id: ec2-auto-scaling-018
    q: Which restrictions apply to stopped EC2 Auto Scaling warm pools and mixed instance groups?
    a: Stopped or hibernated instances need an EBS root volume. Mixed groups cannot use Spot or instance weighting with warm pools. Hibernation needs a supported configuration.
    facts:
      - root
      - hibernation-support
      - mixed
  - id: ec2-auto-scaling-049
    q: An EC2 Auto Scaling team wants initialized instances returned to its warm pool on scale-in. What must it configure?
    a: An instance reuse policy. Default scale-in terminates the instances.
    facts:
      - reuse
  - id: ec2-auto-scaling-050
    q: An EC2 Auto Scaling warm pool stops instances before their user data setup finishes. What should prevent this?
    a: A launch lifecycle hook. It delays stopping or hibernation until initialization completes and can pause promotion into service again.
    facts:
      - hooks
  - id: ec2-auto-scaling-052
    q: "An EC2 Auto Scaling application scales out slowly because new instances take a long time to initialize. What can reduce the delay?"
    a: "Use a warm pool of pre-initialized instances so the group can add prepared capacity more quickly."
    facts: [pool]
diagrams:
  - id: asg-warm-pool-flow
    title: Prepare an instance before demand arrives
    width: 1080
    height: 210
    nodes:
      - id: n0
        label: Initialize
        sub: launch hook waits
        icon: res-ec2-instance
        x: 30
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n1
        label: Warm pool
        sub: prepared instances
        icon: ec2-auto-scaling
        x: 300
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n2
        label: Scale out
        sub: start and finish hook
        icon: res-ec2-instance
        x: 570
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n3
        label: In service
        sub: counts toward desired
        icon: res-ec2-instances
        x: 840
        y: 65
        w: 210
        h: 86
        tone: compute
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
      - from: n2
        to: n3
        step: 3
    steps:
      - Initialize the instance before storing it in the pool.
      - Draw prepared capacity from the pool on scale-out.
      - Finish the launch hook before service entry.
---
A warm pool keeps initialized EC2 instances ready beside an Auto Scaling group. It reduces the time needed to add capacity when a fresh instance takes a long time to prepare.

### How it works

1. Auto Scaling prepares pool instances. Use a launch lifecycle hook to finish initialization before they stop or hibernate.
2. Keep prepared instances in a supported state. Hibernation saves memory contents to the EBS root volume so they can be restored when the instance starts.
3. On scale-out, take an instance from the pool. A launch hook can pause it again before service entry; it counts toward desired capacity when it leaves the pool.
4. On scale-in, instances terminate by default. Enable an instance reuse policy to return them to the pool. An instance refresh replaces serving instances first, then pool instances.

| Pool state | Resource cost or requirement |
|---|---|
| Stopped | EBS root volume; volume and attached Elastic IP charges remain |
| Hibernated | Supported hibernation configuration; root volume also stores memory contents |
| Running | Instance charges continue |

### Exam cues

- If the question says long first boot delays scale-out, think warm pool, because preparation happens before demand arrives.
- If the question says reuse configured instances after scale-in, think instance reuse policy, because default scale-in terminates them.
- If the question says setup is interrupted when pool instances stop, think launch lifecycle hook, because stopping does not wait for setup by itself.

### Remember

- Mixed groups with warm pools cannot use instance weighting or Spot.
- Stopped and Hibernated require EBS root volumes.

> **Trap:** A stopped warm-pool instance still has storage and potentially attached Elastic IP charges. A new launch template does not update existing pool instances until they are replaced.
