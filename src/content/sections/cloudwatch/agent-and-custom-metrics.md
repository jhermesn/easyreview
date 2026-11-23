---
title: Agent and custom metrics
level: associate
order: 20
facts:
  - id: agent-purpose
    text: On EC2 and on-premises servers, the CloudWatch agent gathers guest operating system metrics and logs.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
  - id: guest-metrics
    text: Use the CloudWatch agent to collect guest memory and disk space metrics beyond EC2 basic
      monitoring.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
  - id: agent-namespace
    text: Traditional CloudWatch metrics collected by the agent use CWAgent as the default namespace and
      are billed as custom metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
  - id: agent-setup
    text: The agent setup consists of granting permissions, installing the package, configuring
      collection, and starting the agent.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
  - id: agent-ssm
    text: Systems Manager can install and manage the CloudWatch agent; its configuration can be stored
      in Parameter Store.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Configuration-File-Details.html#Upload-CloudWatch-Agent-Configuration-To-Parameter-Store
  - id: agent-server-policy
    text: CloudWatchAgentServerPolicy grants metric and log publishing permissions and GetParameter
      access to AmazonCloudWatch-* parameters.
    source: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/CloudWatchAgentServerPolicy.html#CloudWatchAgentServerPolicy-json
  - id: emf
    text: Embedded metric format puts metric definitions and values inside structured logs so CloudWatch
      can extract custom metrics asynchronously.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
  - id: emf-permissions
    text: Publishing embedded metric format log events requires logs:PutLogEvents without requiring
      cloudwatch:PutMetricData.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
  - id: emf-cardinality
    text: Each unique dimension combination in embedded metric format creates a custom metric, so
      request IDs as dimensions can increase charges.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
  - id: otel-path
    text: AWS recommends OpenTelemetry metrics for most new workloads; embedded metric format suits
      workloads that need metrics kept with their originating log events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
  - id: agent-swap
    text: "On Linux, the CloudWatch agent can collect swap metrics such as swap_used, swap_free and swap_used_percent, which EC2 does not publish by itself."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/metrics-collected-by-CloudWatch-agent.html#linux-metrics-enabled-by-CloudWatch-agent
  - id: lambda-insights
    text: "CloudWatch Lambda Insights adds a Lambda extension layer that reports system metrics such as CPU, memory, disk and network, plus diagnostics such as cold starts."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights.html#Lambda-Insights
  - id: ec2-host-metrics
    text: "EC2 publishes CPUUtilization, NetworkPacketsOut and instance store disk read metrics to CloudWatch without a guest agent."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html
  - id: disk-no-instance-store
    text: "Without instance store volumes, EC2 instance store disk read metrics can be zero or unreported."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html
  - id: memory-asg
    text: "The CloudWatch agent can aggregate memory utilization by AutoScalingGroupName for an EC2 Auto Scaling policy."
    source: https://aws.amazon.com/blogs/mt/create-amazon-ec2-auto-scaling-policy-memory-utilization-metric-linux/
  - id: old-agent
    text: "The deprecated CloudWatch Logs agent can send log files to CloudWatch Logs but does not support IMDSv2; use the unified CloudWatch agent for IMDSv2."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC2Instance.html
cards:
  - id: cloudwatch-005
    q: An EC2 application needs memory use, disk space use, and application log files in CloudWatch.
      What should operators install?
    a: The CloudWatch agent, with publishing permissions such as CloudWatchAgentServerPolicy on the
      instance role. Configure the guest metrics and file paths; traditional agent metrics use
      CWAgent by default.
    trap: true
    facts:
      - agent-purpose
      - guest-metrics
      - agent-server-policy
      - agent-namespace
  - id: cloudwatch-006
    q: A Lambda function must publish CloudWatch custom metrics from its logs without making
      PutMetricData calls. What fits?
    a: Embedded metric format. CloudWatch extracts custom metrics asynchronously from the structured log
      events. Avoid request IDs as dimensions because each dimension combination creates a custom
      metric.
    facts:
      - emf
      - emf-permissions
      - emf-cardinality
  - id: cloudwatch-048
    q: A team wants centrally managed CloudWatch agent configuration across many servers. Where can it
      store the configuration?
    a: Systems Manager Parameter Store. Use Systems Manager to install and manage the agent, with
      permissions to read its configuration.
    facts:
      - agent-ssm
      - agent-server-policy
  - id: cloudwatch-049
    q: A Lambda team needs request IDs for investigations but wants to avoid a separate CloudWatch
      metric for each request. How should it use embedded metric format?
    a: Keep request IDs as log details and use stable dimensions for metrics. Embedded metric format
      creates a metric for every distinct dimension combination.
    facts:
      - emf
      - emf-cardinality
  - id: cloudwatch-121
    q: "EC2 instances fail for lack of swap space. How do you monitor available swap on each instance?"
    a: "Install the CloudWatch agent and collect its swap metrics (for example swap_used_percent); EC2 does not report swap by default."
    facts: [agent-swap]
  - id: cloudwatch-123
    q: "A team needs memory and CPU usage plus cold-start data for its Lambda functions in CloudWatch. What should it enable?"
    a: "Lambda Insights, the CloudWatch extension delivered as a Lambda layer."
    facts: [lambda-insights]
  - id: cloudwatch-133
    q: "Which EC2 metrics reach CloudWatch without a guest agent, and what happens to instance store disk reads without instance store volumes?"
    a: "CPU utilization, outgoing network packets and instance store disk read metrics are published by EC2. Disk reads can be zero or absent without instance store volumes."
    facts: [ec2-host-metrics, disk-no-instance-store]
  - id: cloudwatch-134
    q: "How can an EC2 Auto Scaling group scale on aggregate memory utilization using CloudWatch?"
    a: "Configure the CloudWatch agent to collect memory and aggregate by AutoScalingGroupName, then use that metric in a scaling policy."
    facts: [memory-asg]
  - id: cloudwatch-135
    q: "An EC2 instance requires IMDSv2 and forwards log files to CloudWatch Logs. Which CloudWatch agent should it use?"
    a: "Use the unified CloudWatch agent. The older CloudWatch Logs agent is deprecated and does not support IMDSv2."
    facts: [old-agent]
---
The CloudWatch agent collects measurements and log files from inside a server. It fills the gap between EC2 host monitoring and what the operating system or application knows, such as memory use and free disk space.

### How it works

1. Grant the server permission to publish telemetry, meaning operational measurements and events.
2. Install the agent and configure which guest metrics and file paths to collect. Start the agent to send the data.
3. Use Systems Manager for fleet management and Parameter Store to hold the configuration.
4. For application metrics carried in logs, emit embedded metric format (EMF), structured log data containing metric definitions. CloudWatch extracts those metrics asynchronously without a separate PutMetricData call.

### Exam cues

- If the question says scale an Auto Scaling group on memory, think CloudWatch agent aggregation by AutoScalingGroupName, because the group needs a shared memory metric.
- If the question says IMDSv2 and log collection, think the unified CloudWatch agent, because the deprecated Logs agent does not support IMDSv2.
- If the question says instance store disk reads are missing, think the instance storage configuration, because the metric can be absent or zero without instance store volumes.
- If the question says EC2 memory and disk space are missing, think CloudWatch agent, because it collects guest measurements.
- If the question says Lambda should emit metrics without PutMetricData, think EMF, because extraction happens from log events.
- If the question says configure many agents consistently, think Systems Manager and Parameter Store, because they manage installation and shared configuration.

### Remember

- Traditional agent metrics use `CWAgent` by default and incur custom metric charges.
- EMF publishing needs `logs:PutLogEvents`, without `cloudwatch:PutMetricData`.
- Cardinality means the number of distinct dimension combinations. Each EMF combination creates a custom metric.
- AWS recommends OpenTelemetry metrics for most new workloads; EMF keeps measurements with their originating log details.

> **Trap:** A request ID is useful in a log but costly as an EMF dimension when every request creates another metric.
