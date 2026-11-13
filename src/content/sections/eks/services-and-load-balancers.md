---
title: Services and load balancers
level: associate
order: 30
facts:
  - id: lb-service
    text: A Kubernetes Service exposes application replicas through one IP address or name.
    source: https://docs.aws.amazon.com/eks/latest/userguide/sample-deployment.html#sample-deployment
  - id: lb-controller
    text: The AWS Load Balancer Controller watches Kubernetes Service and Ingress resources and creates
      corresponding AWS load balancers.
    source: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html#aws-load-balancer-controller
  - id: lb-mapping
    text: With AWS Load Balancer Controller, a LoadBalancer Service creates an NLB and an Ingress
      creates an ALB.
    source: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html#aws-load-balancer-controller
  - id: lb-layers
    text: NLB handles Layer 4 network traffic such as TCP and UDP; ALB handles Layer 7 application
      traffic such as HTTP and HTTPS.
    source: https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html#network-load-balancing
  - id: lb-legacy
    text: The legacy AWS cloud-provider controller creates Classic Load Balancers by default; the AWS
      Load Balancer Controller creates NLBs, not Classic Load Balancers.
    source: https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html#network-load-balancing
  - id: lb-instance-path
    text: With instance targets, the load balancer sends traffic to a node NodePort and Kubernetes
      forwards it to a destination Pod.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/load-balancing.html#load-balancing
  - id: lb-ip-path
    text: With IP targets, the load balancer sends traffic and health checks directly to Pod IP
      addresses, bypassing the node NodePort and Service ClusterIP hops.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/load-balancing.html#load-balancing
  - id: lb-alb-default
    text: ALB instance mode is the default; its Service must be NodePort or LoadBalancer.
    source: https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html#alb-ingress
  - id: lb-alb-ip
    text: "Set alb.ingress.kubernetes.io/target-type: ip on an Ingress for direct Pod targets; Fargate
      and Hybrid Nodes require IP targets."
    source: https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html#alb-ingress
  - id: lb-nlb-ip
    text: "Set service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip on a Service to select
      NLB IP targets."
    source: https://docs.aws.amazon.com/eks/latest/best-practices/load-balancing.html#load-balancing
  - id: lb-alb-subnets
    text: An ALB needs at least two subnets in different AZs, each with at least eight free IP addresses.
    source: https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html#alb-ingress
  - id: lb-nlb-subnets
    text: An NLB needs at least one subnet, with at least eight available IP addresses.
    source: https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html#network-load-balancing
  - id: lb-subnet-tags
    text: "Subnet auto-discovery uses kubernetes.io/role/elb: 1 for public and
      kubernetes.io/role/internal-elb: 1 for private subnets; explicit subnet IDs avoid this
      discovery requirement."
    source: https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html#network-load-balancing
  - id: lb-alb-scheme
    text: The ALB scheme annotation alb.ingress.kubernetes.io/scheme selects internet-facing or internal
      placement.
    source: https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html#alb-ingress
  - id: lb-readiness-gate
    text: With IP targets, a Pod readiness gate can wait for the load balancer target to become healthy
      before a rollout removes old Pods.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/load-balancing.html#load-balancing
  - id: lb-annotations
    text: Annotations on Kubernetes resources configure AWS Load Balancer Controller behavior, including
      load balancer settings.
    source: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html#aws-load-balancer-controller
cards:
  - id: eks-038
    q: What AWS load balancers does the AWS Load Balancer Controller create for EKS Service and Ingress
      resources?
    a: An NLB for a Service of type LoadBalancer and an ALB for an Ingress. The controller must own the
      resource; the legacy provider has different behavior.
    facts:
      - lb-controller
      - lb-mapping
      - lb-legacy
  - id: eks-039
    q: An EKS application must expose TCP and UDP traffic through an AWS load balancer. Which Kubernetes
      resource fits?
    a: A controller-managed Service of type LoadBalancer, which creates an NLB for Layer 4 traffic.
    facts:
      - lb-mapping
      - lb-layers
  - id: eks-040
    q: An EKS application on Fargate must receive HTTP traffic through an ALB. Which target mode should
      its Ingress select?
    a: "IP targets using alb.ingress.kubernetes.io/target-type: ip. Fargate requires Pod IP targeting
      rather than instance targeting."
    facts:
      - lb-alb-ip
  - id: eks-041
    q: How does EKS instance target mode differ from IP target mode?
    a: Instance mode sends traffic through node NodePort and Kubernetes forwarding. IP mode sends
      traffic and health checks directly to Pods.
    facts:
      - lb-instance-path
      - lb-ip-path
  - id: eks-042
    q: An EKS ALB cannot be provisioned with only one eligible subnet. What subnet requirement is
      missing?
    a: At least two subnets in different AZs, each with at least eight available IP addresses.
    facts:
      - lb-alb-subnets
  - id: eks-043
    q: The EKS AWS Load Balancer Controller cannot discover internal load balancer subnets. Which
      discovery configuration should be checked?
    a: "The private subnet tag kubernetes.io/role/internal-elb: 1, or explicit subnet IDs on the
      Kubernetes resource. Public auto-discovery uses kubernetes.io/role/elb: 1."
    facts:
      - lb-subnet-tags
  - id: eks-044
    q: An EKS rolling update removes old Pods before new Pod targets become healthy on the AWS load
      balancer. What coordinates these states?
    a: A Pod readiness gate tied to load balancer target health. With IP targets it can keep the Pod
      unready until target registration and health checks complete.
    facts:
      - lb-readiness-gate
  - id: eks-045
    q: An EKS Service of type LoadBalancer creates a Classic Load Balancer. Does that prove the AWS Load
      Balancer Controller selected a Classic type?
    a: No. The legacy cloud-provider controller creates Classic Load Balancers by default. The AWS Load
      Balancer Controller creates NLBs for these Services.
    trap: true
    facts:
      - lb-legacy
diagrams:
  - id: eks-target-routing-paths
    title: Instance targets add a node hop; IP targets send traffic to Pods
    width: 800
    height: 320
    groups: []
    nodes:
      - id: instance-lb
        label: Load balancer
        icon: elastic-load-balancing
        x: 20
        y: 30
        w: 180
        h: 86
        tone: network
        sub: instance targets
      - id: node
        label: NodePort
        icon: res-ec2-instance
        x: 310
        y: 30
        w: 180
        h: 86
        tone: compute
        sub: node forwarding
      - id: instance-pod
        label: Pod
        icon: elastic-kubernetes-service
        x: 600
        y: 30
        w: 180
        h: 72
        tone: compute
      - id: ip-lb
        label: Load balancer
        icon: elastic-load-balancing
        x: 20
        y: 210
        w: 180
        h: 86
        tone: network
        sub: IP targets
      - id: ip-pod
        label: Pod
        icon: elastic-kubernetes-service
        x: 600
        y: 210
        w: 180
        h: 72
        tone: compute
    edges:
      - from: instance-lb
        to: node
        label: node port
      - from: node
        to: instance-pod
        label: forward
      - from: ip-lb
        to: ip-pod
        label: direct Pod IP
    steps: []
---
A Kubernetes Service gives application Pods a traffic destination while individual Pods change. The AWS Load Balancer Controller watches Service and Ingress objects and creates AWS load balancers for them. An Ingress describes application routing, such as HTTP paths. [Controller behavior](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html)

### How it works

1. Choose the network entry object. Layer 4 means transport traffic such as TCP and UDP; Layer 7 means application traffic such as HTTP and HTTPS.
2. Ensure the intended controller manages the object. An annotation is configuration attached to a Kubernetes resource; controller annotations choose target mode and placement.
3. Select the target type, meaning what the load balancer registers as a destination. Instance targets receive traffic at NodePort, a port exposed on a worker node, before Kubernetes forwards it to a Pod. IP targets receive traffic directly at Pod addresses.
4. Provide eligible subnets and choose internal or internet-facing placement. A subnet is a network address range within an AZ. Auto-discovery uses role tags unless subnet IDs are specified explicitly.
5. During rollout, coordinate new target registration with a Pod readiness gate, an additional condition for accepting a Pod as ready. It can wait for load balancer health before old Pods are removed. [Target paths and readiness gates](https://docs.aws.amazon.com/eks/latest/best-practices/load-balancing.html)

| Resource or target choice | Result | Selection cue |
|---|---|---|
| Controller-managed `LoadBalancer` Service | NLB | TCP or UDP traffic |
| Controller-managed Ingress | ALB | HTTP or HTTPS routing |
| Instance target | NodePort, then Pod forwarding | ALB default; Service must expose NodePort or LoadBalancer |
| IP target | Direct Pod traffic and health checks | Required for Fargate targets |

For ALB Pod targets, set `alb.ingress.kubernetes.io/target-type: ip`. For NLB Pod targets, set `service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip`. ClusterIP is the Service's internal address; direct IP targeting bypasses that forwarding hop. [ALB settings](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) · [NLB settings](https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html)

### Exam cues

- If the question says expose transport traffic such as TCP, think a controller-managed `LoadBalancer` Service, because it provisions an NLB.
- If the question says route HTTP to Fargate Pods, think ALB Ingress with IP targets, because Fargate has no instance target path.
- If the question says Pods are ready before external targets are healthy, think a readiness gate, because Kubernetes readiness and load balancer registration can complete at different times.
- If the question says a Service unexpectedly created a Classic Load Balancer, think controller ownership, because the legacy controller has a different default.

### Remember

- ALB: at least two subnets in different AZs, each with eight free IP addresses.
- NLB: at least one subnet with eight free IP addresses.
- Auto-discovery tags: public `kubernetes.io/role/elb: 1`; private `kubernetes.io/role/internal-elb: 1`.
- ALB scheme: `alb.ingress.kubernetes.io/scheme` can select `internet-facing` or `internal`.

> **Trap:** A `LoadBalancer` Service does not identify the responsible controller by itself. Verify ownership before assuming the NLB behavior described here.
