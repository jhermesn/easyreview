---
title: Container Insights
level: associate
order: 170
facts:
  - id: ci-purpose
    text: Container Insights collects and summarizes metrics and logs for container workloads, including
      ECS and EKS.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html#ContainerInsights
  - id: ci-resource
    text: Container Insights provides CPU, memory, disk, network, and container diagnostic information.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html#ContainerInsights
  - id: ci-levels
    text: Classic Container Insights derives CloudWatch metrics at cluster, node, pod, task, and service
      levels from performance log events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html#ContainerInsights
  - id: ci-otel
    text: AWS recommends OTel Container Insights for new EKS deployments; it uses Prometheus metrics
      that can be queried with PromQL.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-compare.html#container-insights-eks-compare-decision
  - id: ci-versions
    text: OTel Container Insights requires EKS 1.28 or later and amazon-cloudwatch-observability add-on
      v6.2.0 or later.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-compare.html#container-insights-eks-compare-prerequisites
  - id: ci-classic
    text: Enhanced Container Insights (Classic) is in maintenance mode with security patches only and
      uses CloudWatch-format EMF metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-compare.html#container-insights-eks-compare-classic-capabilities
  - id: ci-permissions
    text: The Container Insights EKS comparison lists CloudWatchAgentServerPolicy as a required IAM
      policy for both approaches.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/container-insights-eks-compare.html#container-insights-eks-compare-prerequisites
  - id: fb-daemon
    text: The documented Fluent Bit setup runs as a DaemonSet to send container and node logs to
      CloudWatch Logs.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html#Container-Insights-FluentBit-setup
  - id: fb-application
    text: Fluent Bit sends files from /var/log/containers to
      /aws/containerinsights/Cluster_Name/application.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html#Container-Insights-FluentBit-setup
  - id: fb-host
    text: Fluent Bit sends host logs from /var/log/dmesg, /var/log/secure, and /var/log/messages to
      /aws/containerinsights/Cluster_Name/host.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html#Container-Insights-FluentBit-setup
  - id: fb-dataplane
    text: Fluent Bit sends kubelet.service, kubeproxy.service, and docker.service journal logs to
      /aws/containerinsights/Cluster_Name/dataplane.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html#Container-Insights-FluentBit-setup
  - id: fb-tail
    text: The documented Fluent Bit setup reads from the tail by default, collecting new log entries;
      FluentBitReadFromHead=On includes existing file contents.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html#Container-Insights-FluentBit-setup
  - id: term-otel
    text: OpenTelemetry is an open framework for collecting metrics, logs, and traces using
      instrumentation.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OpenTelemetry-Sections.html#CloudWatch-OpenTelemetry-Sections
  - id: term-promql
    text: PromQL is the query language used to select and calculate results from Prometheus metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-PromQL-QueryStudio.html#CloudWatch-PromQL-QueryStudio
  - id: term-node
    text: A worker node is a machine that runs Kubernetes application workloads.
    source: https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html
  - id: term-pod
    text: A pod is the smallest deployable Kubernetes unit and contains one or more containers.
    source: https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html
  - id: term-daemon
    text: A DaemonSet keeps a selected Kubernetes workload running on each eligible node.
    source: https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html
  - id: term-fluent
    text: A log shipper collects log records and forwards them to a destination.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html#Container-Insights-FluentBit-setup
  - id: term-emf
    text: Embedded metric format places custom metric definitions and values inside structured log
      events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
cards:
  - id: cloudwatch-036
    q: Which CloudWatch Container Insights approach does AWS recommend for a new EKS cluster?
    a: OTel Container Insights. It uses PromQL-queryable metrics and requires EKS 1.28+ and
      amazon-cloudwatch-observability add-on v6.2.0+.
    facts:
      - ci-otel
      - ci-versions
  - id: cloudwatch-077
    q: Which log groups does the documented CloudWatch Fluent Bit setup use for EKS application, host,
      and node-service logs?
    a: /aws/containerinsights/Cluster_Name/application, /host, and /dataplane. Application logs come
      from /var/log/containers; dataplane logs include kubelet service journals.
    facts:
      - fb-application
      - fb-host
      - fb-dataplane
  - id: cloudwatch-078
    q: An EKS team deployed the documented CloudWatch Fluent Bit DaemonSet but cannot find older entries
      already in the log files. What explains this?
    a: The setup reads from the tail by default. Set FluentBitReadFromHead=On to collect existing file
      contents.
    trap: true
    facts:
      - fb-tail
  - id: cloudwatch-079
    q: An EKS team needs PromQL dashboards but uses Enhanced Container Insights Classic metrics. Which
      migration target fits?
    a: OTel Container Insights. Classic uses CloudWatch-format EMF metrics and receives security patches
      only; OTel supports PromQL.
    facts:
      - ci-otel
      - ci-classic
diagrams:
  - id: cloudwatch-fluent-bit-delivery
    title: Fluent Bit log delivery on EKS
    width: 900
    height: 230
    nodes:
      - id: eks
        label: EKS nodes
        sub: container + node logs
        icon: elastic-kubernetes-service
        x: 30
        y: 90
        w: 200
        h: 86
        tone: compute
      - id: fluent
        label: Fluent Bit
        sub: DaemonSet
        x: 350
        y: 90
        w: 180
        h: 86
        tone: neutral
      - id: logs
        label: CloudWatch Logs
        sub: three log groups
        icon: res-cloudwatch-logs
        x: 650
        y: 90
        w: 210
        h: 86
        tone: mgmt
    edges:
      - from: eks
        to: fluent
        step: 1
        label: collect
      - from: fluent
        to: logs
        step: 2
        label: publish
    steps:
      - Fluent Bit collects container files, host files, and node-service journals.
      - Fluent Bit publishes to application, host, and dataplane log groups.
---
Container Insights collects performance measurements and logs from container workloads such as ECS and EKS. It helps locate resource pressure and container failures across the workload's layers.

### How it works

1. Choose the collection approach. For new EKS deployments, AWS recommends OTel Container Insights. OpenTelemetry (OTel) is a standard framework for collecting operational data; PromQL is the query language used for Prometheus metrics.
2. Meet the OTel prerequisites: EKS 1.28 or later and the `amazon-cloudwatch-observability` add-on v6.2.0 or later. Give the collector the publishing permissions listed in `CloudWatchAgentServerPolicy`.
3. Collect CPU, memory, disk, and network measurements alongside container diagnostics. Classic builds CloudWatch metrics from performance log events at cluster, node, pod, task, and service levels. A node is a worker machine; a pod groups running containers.
4. For the documented Fluent Bit log path, deploy its DaemonSet, a Kubernetes controller that runs a collector on each eligible node. Fluent Bit is a log shipper that forwards files and service journals to CloudWatch Logs.

| Log group suffix under `/aws/containerinsights/Cluster_Name/` | Source |
|---|---|
| `application` | Files in `/var/log/containers` |
| `host` | `/var/log/dmesg`, `/var/log/secure`, `/var/log/messages` |
| `dataplane` | Journal logs for `kubelet.service`, `kubeproxy.service`, `docker.service` |

### Exam cues

- If the question says inspect container resource pressure across workload layers, think Container Insights, because it collects container performance measurements and diagnostics.
- If the question says new EKS deployment with PromQL queries, think OTel Container Insights, because its metrics use the Prometheus model.
- If the question says ship EKS application and node log files, think Fluent Bit, because its DaemonSet forwards those logs to CloudWatch Logs.

### Remember

- OTel prerequisites: EKS 1.28+, add-on v6.2.0+.
- Enhanced Container Insights Classic uses embedded metric format (EMF), structured logs carrying metric definitions. It receives security patches only.
- The documented Fluent Bit setup reads new log entries from the tail by default. `FluentBitReadFromHead=On` includes existing contents.

> **Trap:** Installing a log shipper does not imply it will replay every existing file. Check where collection starts.
