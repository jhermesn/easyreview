---
title: Canary and blue/green deployments
level: professional
order: 40
facts:
  - id: rolling-controls
    text: Rolling updates replace Pods gradually; maxUnavailable limits unavailable Pods and defaults to
      25 percent, while maxSurge limits extra Pods.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_have_a_mechanism_to_perform_rollbacks
  - id: blue-green
    text: For blue/green in Kubernetes, create a new Deployment alongside the existing version, test its
      Pods, and change the Service selector to direct traffic to it.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_bluegreen_deployments
  - id: blue-green-rollback
    text: Blue/green rollback restores traffic to the old version; terminate the old environment only
      after accepting the new version.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_bluegreen_deployments
  - id: canary
    text: A canary deployment runs a smaller new Deployment beside the old one, sends a small traffic
      share to it, and increases traffic and replicas when metrics are acceptable.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_canary_deployments
  - id: canary-rollback
    text: If a canary fails, route traffic back to the old Deployment and stop sending traffic to the
      new version.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_canary_deployments
  - id: canary-tooling
    text: Kubernetes has no native canary deployment mechanism; AWS describes using tools such as
      Flagger with Istio.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_canary_deployments
diagrams:
  - id: eks-release-routing
    title: Keep both versions while changing traffic
    width: 850
    height: 320
    nodes:
      - id: router
        label: Traffic routing
        x: 30
        y: 120
        w: 180
        h: 72
        tone: network
      - id: old
        label: Old Deployment
        x: 350
        y: 30
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: new
        label: New Deployment
        x: 350
        y: 210
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: metrics
        label: Compare metrics
        x: 650
        y: 210
        w: 180
        h: 72
        tone: mgmt
    edges:
      - from: router
        to: old
        step: 1
        label: existing traffic
      - from: router
        to: new
        step: 2
        label: controlled exposure
      - from: new
        to: metrics
        step: 3
        label: observe
    steps:
      - Keep the old Deployment available as a traffic destination.
      - Switch after testing for blue/green, or send a small initial share for canary.
      - Use metrics to decide whether to expand the canary or restore old-version traffic.
cards:
  - id: eks-006
    q: How do rolling updates and canary releases differ for EKS Deployments?
    a: Rolling updates replace Pods using `maxUnavailable` and `maxSurge`. A canary runs a separate new
      Deployment with a small traffic share and uses additional routing or rollout tooling.
    facts:
      - rolling-controls
      - canary
      - canary-tooling
  - id: eks-018
    q: An EKS team wants to test a complete replacement version before switching live traffic. What
      deployment pattern fits?
    a: Blue/green. Create a separate Deployment, test it, then change the Service selector to the new
      version. Keep the old version for rollback.
    facts:
      - blue-green
      - blue-green-rollback
  - id: eks-019
    q: An EKS team wants a small user population to try a release before wider exposure. What should it
      configure?
    a: A canary release with a smaller new Deployment and controlled traffic routing. Increase traffic
      and replicas only after examining metrics.
    facts:
      - canary
      - canary-tooling
  - id: eks-020
    q: An EKS canary shows unacceptable behavior. What traffic action provides rollback?
    a: Stop sending traffic to the canary and route it to the old Deployment.
    facts:
      - canary-rollback
  - id: eks-021
    q: Does reducing maxSurge give an EKS release a controlled canary traffic percentage?
    a: No. `maxSurge` limits extra Pods during a rolling update. A canary needs a separate Deployment
      and control over traffic routing.
    facts:
      - rolling-controls
      - canary
      - canary-tooling
    trap: true
---
Blue/green and canary deployments keep an old EKS application version available while introducing another. Blue/green switches traffic after testing the replacement. A canary exposes a small traffic share first and expands it after examining metrics.

### How it works

1. Run the new version as a separate Deployment, a Kubernetes object that maintains application replicas. Keep the existing Deployment available.
2. Choose the traffic transition.

| Pattern | What changes | Release control |
|---|---|---|
| Rolling | Pods within a Deployment are replaced gradually | `maxUnavailable` and `maxSurge` |
| Blue/green | A new Deployment replaces the old version as the traffic destination | Test new Pods, then change the Service selector |
| Canary | A smaller new Deployment receives a small traffic share | Increase its traffic and replicas after acceptable metrics |

3. For blue/green, change the Service selector, the labels used to choose destination Pods, after testing the new version. Restore the old destination if it fails.
4. For a canary, use routing or rollout tooling to control exposure. AWS describes Flagger with Istio. Expand only after examining metrics; on failure, stop sending traffic to the canary.
5. Remove the old environment only after accepting the replacement.

### Exam cues

- If the question says test a replacement before switching all live traffic, think blue/green, because the old Deployment remains a rollback destination.
- If the question says expose a small traffic share and expand after observing metrics, think canary, because the new version runs alongside the old one during evaluation.
- If the question says limit extra Pods during a normal Deployment rollout, think `maxSurge`, because it controls capacity during rolling replacement.

### Remember

- Rolling `maxUnavailable` defaults to 25%.
- Blue/green uses a Service selector change to select the replacement Pods.
- Kubernetes needs additional routing or rollout tooling for a controlled canary.

> **Trap:** A rolling update's Pod capacity limits do not define a canary traffic percentage.
