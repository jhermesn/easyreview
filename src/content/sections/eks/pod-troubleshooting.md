---
title: Pod troubleshooting
level: associate
order: 70
facts:
  - id: pod-node
    text: EKS schedules Pods on nodes, which are machines running containerized applications.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html#eks-compute
  - id: pod-inspect
    text: Use kubectl get pods for status, kubectl describe pod for events, and kubectl logs for startup
      errors.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-otel-quickstart.html#container-insights-eks-otel-quickstart-ts-crashloop
  - id: pod-pending
    text: Insufficient node CPU or memory can leave agent Pods Pending; inspect resource requests and
      node capacity.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-troubleshooting.html#container-insights-eks-troubleshooting-agent-pods
  - id: pod-placement
    text: Node affinity or taints can cause FailedScheduling; inspect nodeSelector and tolerations.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-troubleshooting.html#container-insights-eks-troubleshooting-agent-pods
  - id: pod-image
    text: ImagePullBackOff can result from an incorrect image tag or unreachable ECR; check the image
      reference and network access.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-troubleshooting.html#container-insights-eks-troubleshooting-agent-pods
  - id: pod-crash
    text: For agent Pods in CrashLoopBackOff, inspect logs for invalid configuration or missing mounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-troubleshooting.html#container-insights-eks-troubleshooting-agent-pods
  - id: pod-ecr-role
    text: ECR image pulls need permissions on the EC2 node IAM role or the Fargate Pod execution role.
    source: https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html#not-authorized-for-images
  - id: pod-logs-opt-in
    text: EKS control-plane logs are not sent to CloudWatch Logs by default; each type is enabled
      individually per cluster.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#enabling-control-plane-log-export
  - id: pod-api-log
    text: The api control-plane log type records API server component activity.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#control-plane-logs
  - id: pod-audit-log
    text: The audit log type records actions by users, administrators, and system components affecting
      the cluster.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#control-plane-logs
  - id: pod-auth-log
    text: The authenticator log type records the EKS control-plane component authenticating IAM
      credentials.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#control-plane-logs
  - id: pod-controller-log
    text: The controllerManager log type records the component managing Kubernetes core control loops.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#control-plane-logs
  - id: pod-scheduler-log
    text: The scheduler log type records the component deciding when and where Pods run.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#control-plane-logs
  - id: pod-log-group
    text: Enabled control-plane logs go to CloudWatch Logs in the same account under
      /aws/eks/<cluster-name>/cluster.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#viewing-control-plane-logs
  - id: pod-log-cost
    text: Enabled EKS control-plane logs incur CloudWatch Logs ingestion and storage charges, and
      delivery is best effort.
    source: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html#control-plane-logs
  - id: pod-log-collector
    text: The EKS node log collector at /etc/eks/log-collector-script/eks-log-collector.sh gathers node
      diagnostics when present.
    source: https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html#log-collector
  - id: pod-namespace
    text: A Kubernetes namespace groups resources within a cluster.
    source: https://docs.aws.amazon.com/eks/latest/userguide/sample-deployment.html#sample-deployment
cards:
  - id: eks-031
    q: Which diagnostic views help investigate an EKS Pod that does not start?
    a: Use kubectl get pods to locate the state, kubectl describe pod for events, and kubectl logs for
      startup errors.
    facts:
      - pod-inspect
  - id: eks-032
    q: An EKS monitoring-agent Pod remains Pending and its events report FailedScheduling. What should
      an operator inspect before adding nodes?
    a: Check CPU and memory requests, node capacity, nodeSelector, and tolerations. Incompatible
      placement constraints can block scheduling even with more nodes.
    facts:
      - pod-pending
      - pod-placement
  - id: eks-033
    q: An EKS Pod reports ImagePullBackOff for an ECR image. Which checks distinguish image access from
      application startup?
    a: Check the image tag and ECR reachability, then the EC2 node role or Fargate execution role used
      for pulling images. The container has not successfully obtained its image.
    facts:
      - pod-image
      - pod-ecr-role
  - id: eks-034
    q: An EKS monitoring-agent Pod reports CrashLoopBackOff. What evidence should an operator inspect?
    a: Container logs and Pod events. AWS identifies invalid configuration and missing mounts as
      possible agent startup causes.
    facts:
      - pod-inspect
      - pod-crash
  - id: eks-035
    q: An EKS team expects scheduler diagnostics in CloudWatch Logs, but never enabled control-plane
      logging. What must change?
    a: Enable the scheduler log type for that cluster. Control-plane export is off by default and each
      type is enabled separately.
    facts:
      - pod-logs-opt-in
      - pod-scheduler-log
  - id: eks-036
    q: An EKS team must identify who changed cluster resources. Which log type and destination apply?
    a: Enable audit logs and read /aws/eks/<cluster-name>/cluster in CloudWatch Logs in the same
      account.
    facts:
      - pod-audit-log
      - pod-log-group
  - id: eks-037
    q: An EKS workload cannot authenticate using IAM credentials. Which control-plane log type is
      relevant, and does enabling api enable it too?
    a: Use authenticator logs. Each type is enabled individually, so enabling api does not also enable
      authenticator.
    trap: true
    facts:
      - pod-auth-log
      - pod-logs-opt-in
      - pod-api-log
---
EKS Pod troubleshooting separates placement failures, image retrieval failures, and container startup failures. A Pod is the unit Kubernetes places on a node, the machine that runs it. Start with its state and events, then inspect the component responsible for the failure. [AWS diagnostic walkthrough](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-otel-quickstart.html)

### How it works

1. Use `kubectl get pods` in the affected namespace, a named group of Kubernetes resources, to locate the Pod state. Use `kubectl describe pod` for events and `kubectl logs` for startup errors. Specify the intended `--context` and namespace.
2. Follow the evidence rather than repeatedly deleting Pods. Resource requests reserve CPU and memory for placement. Node affinity and `nodeSelector` constrain eligible nodes; taints restrict placement unless a Pod has a matching toleration, permission to tolerate that restriction.
3. For image failures, inspect the image reference and connectivity to ECR, the container image registry. Pull permissions belong to the EC2 node role or Fargate Pod execution role. [Cluster troubleshooting](https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html)
4. Enable the relevant control-plane log type when the problem concerns cluster management. The control plane accepts API requests, places Pods, and maintains desired cluster state. Export is off by default. [Control-plane logging](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)

| Pod evidence | Check next |
|---|---|
| `Pending` with insufficient CPU or memory | Requests against available node capacity |
| `FailedScheduling` with placement restrictions | Node affinity, `nodeSelector`, taints, and tolerations |
| `ImagePullBackOff` | Image tag, ECR connectivity, and image-pull permissions |
| Agent `CrashLoopBackOff` | Startup logs for configuration errors or missing volume mounts |

[AWS agent troubleshooting examples](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-troubleshooting.html)

| Control-plane log type | Diagnostic purpose |
|---|---|
| `api` | API server component activity |
| `audit` | Actions by users and system components |
| `authenticator` | IAM credential authentication |
| `controllerManager` | Core reconciliation loops, which maintain desired state |
| `scheduler` | When and where Pods are placed |

For node-level diagnostics, the EKS log collector gathers logs at `/etc/eks/log-collector-script/eks-log-collector.sh` when installed. [Node diagnostics](https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html)

### Exam cues

- If the question says Pod events show placement restrictions, think node selection and tolerations, because additional incompatible nodes will not satisfy those rules.
- If the question says an image cannot be pulled, think the image path, registry connectivity, and pulling role, because application code cannot start without its image.
- If the question says find who changed a cluster resource, think `audit`, because it records the responsible users and components.
- If the question says diagnose IAM authentication, think `authenticator`, because that component handles IAM credential authentication.

### Remember

- Enable each of the five control-plane log types separately.
- Destination: `/aws/eks/<cluster-name>/cluster` in the same account.
- CloudWatch Logs ingestion and storage charges apply; delivery is best effort.

> **Trap:** Turning on API server logs does not turn on audit, authenticator, controller manager, or scheduler logs. Select the required types explicitly.
