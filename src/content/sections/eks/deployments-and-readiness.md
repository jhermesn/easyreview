---
title: Deployments and readiness
level: associate
order: 20
facts:
  - id: deployment
    text: Kubernetes Deployments update application versions and create replacement replicas when
      replicas fail.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_have_a_mechanism_to_perform_rollbacks
  - id: rolling
    text: A Deployment normally updates a portion of Pods at a time when its update requires Pod
      recreation.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_have_a_mechanism_to_perform_rollbacks
  - id: rollout-limits
    text: maxUnavailable limits unavailable Pods during a rolling update; its default is 25 percent.
      maxSurge limits Pods above the desired replica count.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_have_a_mechanism_to_perform_rollbacks
  - id: rollback
    text: kubectl rollout history deployment shows rollout history; kubectl rollout undo deployment
      <name> rolls back a Deployment.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_have_a_mechanism_to_perform_rollbacks
  - id: readiness
    text: A failed readiness probe removes a Pod from Kubernetes Service traffic until the probe
      succeeds, without requiring Pod termination.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_readiness_probe_to_detect_partial_unavailability
  - id: liveness
    text: A liveness probe detects an unresponsive application; repeated failure causes termination and
      restart.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_liveness_probe_to_remove_unhealthy_pods
  - id: startup
    text: A startup probe delays readiness and liveness probes until startup succeeds; exceeding its
      allowed startup time causes termination.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_startup_probe_for_applications_that_take_longer_to_start
  - id: service-routing
    text: The AWS Load Balancer Controller creates an NLB for a Kubernetes LoadBalancer Service and an
      ALB for a Kubernetes Ingress.
    source: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
  - id: shared-failure
    text: Making probes depend on a shared external database can cause all replicas to fail their health
      checks at once.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_readiness_probe_to_detect_partial_unavailability
diagrams:
  - id: eks-readiness-flow
    title: Readiness gates Service traffic
    width: 900
    height: 300
    nodes:
      - id: probe
        label: Readiness check
        x: 30
        y: 105
        w: 180
        h: 72
        tone: neutral
      - id: ready
        label: Ready Pod
        x: 350
        y: 30
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: unready
        label: Unready Pod
        x: 350
        y: 185
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: service
        label: Service traffic
        x: 670
        y: 30
        w: 180
        h: 72
        tone: network
    edges:
      - from: probe
        to: ready
        step: 1
        label: success
      - from: probe
        to: unready
        step: 2
        label: failure
      - from: ready
        to: service
        step: 3
        label: eligible
    steps:
      - A successful readiness check makes the Pod ready.
      - A failed readiness check keeps the Pod out of Service traffic.
      - Ready Pods can receive Service traffic.
cards:
  - id: eks-005
    q: An EKS application needs a rolling release, replacement replicas, and an external TCP endpoint.
      What should the team configure?
    a: Use a Deployment with readiness probes and a LoadBalancer Service managed by the AWS Load
      Balancer Controller. The Deployment maintains replicas; the Service gets an NLB.
    facts:
      - deployment
      - rolling
      - readiness
      - service-routing
  - id: eks-013
    q: An EKS Pod is temporarily busy but should not restart. Which probe should stop new Service
      traffic?
    a: A readiness probe. Failed readiness removes the Pod from Service traffic until it recovers.
    facts:
      - readiness
  - id: eks-014
    q: An EKS application takes a long time to initialize and keeps failing liveness checks. What should
      the team add?
    a: A startup probe. Readiness and liveness checks wait until it succeeds.
    facts:
      - startup
  - id: eks-015
    q: What do maxUnavailable and maxSurge control in an EKS Deployment?
    a: "`maxUnavailable` limits unavailable Pods, with a default of 25%. `maxSurge` limits extra Pods
      above the desired replica count."
    facts:
      - rollout-limits
  - id: eks-016
    q: An EKS application version fails after rollout. Which kubectl operations inspect and revert the
      release?
    a: Use `kubectl rollout history deployment` to inspect history and `kubectl rollout undo deployment
      <name>` to roll back.
    facts:
      - rollback
  - id: eks-017
    q: Should EKS liveness probes fail whenever a shared external database is unavailable?
    a: Avoid that dependency. All replicas can fail together, causing repeated restarts without fixing
      the database.
    facts:
      - shared-failure
      - liveness
    trap: true
---
A Kubernetes Deployment describes an application's desired replicas, meaning copies of its Pods, and updates their version. Health probes are checks that tell Kubernetes whether a container can serve requests or needs recovery. A Service provides traffic routing to the application Pods.

### How it works

1. Define a Deployment and update its container image for a release. A rolling update replaces part of the running Pods at a time. The Deployment also creates replacement replicas after failures.
2. Bound the rollout with `maxUnavailable`, the allowed unavailable Pods, and `maxSurge`, the allowed extra Pods above the desired count.
3. Let the kubelet, the node agent, run probes to control startup, recovery, and traffic eligibility.

| Probe | Question it answers | Effect |
|---|---|---|
| Startup | Has initialization finished? | Holds readiness and liveness checks until success; terminates after the allowed startup time is exceeded |
| Readiness | Can this Pod accept requests? | Removes an unready Pod from Service traffic until recovery |
| Liveness | Is the application stuck? | Repeated failure causes termination and restart |

4. For an external TCP endpoint, use a `LoadBalancer` Service managed by the AWS Load Balancer Controller, which creates a Network Load Balancer (NLB). For HTTP routing through an Ingress, a Kubernetes routing resource, the controller creates an Application Load Balancer (ALB).
5. Inspect release history with `kubectl rollout history deployment`. Revert a bad application release with `kubectl rollout undo deployment <name>`.

### Exam cues

- If the question says temporary overload must stop traffic without restarting the application, think readiness, because an unready Pod leaves Service traffic until it recovers.
- If the question says slow initialization causes repeated liveness failures, think a startup probe, because liveness and readiness wait for startup success.
- If the question says an EKS application needs a TCP load balancer, think a controller-managed `LoadBalancer` Service, because the controller creates an NLB.

### Remember

- `maxUnavailable` defaults to 25%; choose a value compatible with required serving capacity.
- `maxSurge` controls extra Pods, not a percentage of user traffic.
- Readiness controls Service traffic; liveness controls recovery from a stuck application.

> **Trap:** A shared database outage can fail every replica's probe at once. Restarting those replicas does not repair the database; avoid that dependency in liveness probes.
