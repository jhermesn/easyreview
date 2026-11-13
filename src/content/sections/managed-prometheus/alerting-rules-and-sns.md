---
title: Alerting rules and SNS
level: associate
order: 30
facts:
  - id: alert-rule
    text: An alerting rule evaluates a PromQL condition and sends a triggered alert to alert manager.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-Ruler.html
  - id: record-rule
    text: A recording rule stores a precomputed expression as a new set of time series.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-Ruler.html
  - id: rule-order
    text: Rules in one rule group run from top to bottom; ordering is not guaranteed across separate rule groups
      or files.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-Ruler.html
  - id: route-alert
    text: Alert manager de-duplicates, groups, and routes alerts to receivers.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-alertmanager-receiver.html#AMP-alertmanager-receiver
  - id: sns-config
    text: Configure an SNS Standard topic receiver with topic_arn and sigv4.region in the alert manager definition.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-alertmanager-receiver-config.html#AMP-alertmanager-receiver-config
  - id: topic-policy
    text: For a same-Region SNS topic, authorize aps.amazonaws.com for sns:Publish and sns:GetTopicAttributes in
      the topic access policy.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-alertmanager-receiver-AMPpermission.html#AMP-alertmanager-receiver-AMPpermission
  - id: source-conditions
    text: Restrict the SNS topic permission using the workspace ARN in aws:SourceArn and its account in
      aws:SourceAccount.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-alertmanager-receiver-AMPpermission.html#cross-service-confused-deputy-prevention
  - id: kms-policy
    text: An encrypted SNS topic needs a KMS key policy granting aps.amazonaws.com kms:GenerateDataKey* and
      kms:Decrypt.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-alertmanager-receiver-AMPpermission.html#AMP-alertmanager-receiver-AMPpermission
  - id: managed-path
    text: The managed EKS collector scrapes metrics and remote writes through a VPC endpoint.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-collector.html#AMP-collector
  - id: grafana-source
    text: Managed Grafana supports AMP as a dashboard data source.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html#what-is-Amazon-Managed-Service-Grafana
  - id: principal-definition
    text: A service principal identifies an AWS service in a resource policy.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#reference_policies_elements_principal
  - id: time-series-definition
    text: A time series is an ordered set of metric values over time.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
diagrams:
  - id: amp-eks-alerting
    title: EKS metrics to Prometheus, Grafana and SNS alerts
    width: 1260
    height: 476
    nodes:
      - id: eks
        label: EKS cluster
        sub: Prometheus metrics
        icon: elastic-kubernetes-service
        h: 86
        x: 28
        y: 150
        w: 140
        tone: compute
        info: EKS exposes Prometheus-compatible metrics.
      - id: scraper
        label: Managed collector
        sub: agentless scraper
        icon: managed-service-for-prometheus
        h: 86
        x: 336
        y: 150
        w: 150
        tone: mgmt
        info: AWS operates the EKS scraper and sends metrics through a VPC endpoint.
      - id: amp
        label: AMP workspace
        sub: PromQL storage
        icon: managed-service-for-prometheus
        h: 86
        x: 658
        y: 150
        w: 150
        tone: mgmt
        info: The workspace stores ingested metrics for queries and rules.
      - id: am
        label: Alert manager
        sub: rules + receivers
        icon: managed-service-for-prometheus
        h: 86
        x: 1008
        y: 38
        w: 150
        tone: mgmt
        info: Alerting rules send alerts to alert manager, which groups and routes notifications.
      - id: sns
        label: SNS topic
        sub: notifications
        icon: res-simple-notification-service-topic
        h: 86
        x: 1008
        y: 276
        w: 150
        tone: integration
        info: The topic policy authorizes aps.amazonaws.com to publish and read topic attributes. An encrypted topic
          also needs KMS key permissions.
      - id: graf
        label: Managed Grafana
        sub: dashboards
        icon: managed-grafana
        h: 86
        x: 658
        y: 346
        w: 150
        tone: mgmt
        info: Managed Grafana can query AMP as a data source.
    edges:
      - from: eks
        to: scraper
        step: 1
        label: scrape
      - from: scraper
        to: amp
        step: 2
      - from: amp
        to: am
        step: 3
        label: rule fires
      - from: am
        to: sns
        step: 4
        label: notify
      - from: graf
        to: amp
        step: 5
        label: PromQL
        dashed: true
    steps:
      - The managed collector discovers and scrapes Prometheus metrics from the EKS cluster.
      - It pushes the samples to the AMP workspace with `remote_write` over a VPC endpoint, so data does not
        cross the public internet.
      - An alerting rule evaluated on the workspace's metrics fires.
      - The alert manager sends the notification to the SNS topic, which needs a resource policy for
        `aps.amazonaws.com`.
      - Managed Grafana queries the same workspace with PromQL for dashboards.
cards:
  - id: managed-prometheus-005
    q: Engineers need AMP alert notifications in an SNS topic in the same Region. What must they configure?
    a: An alerting rule, an alert manager definition with the SNS Standard topic receiver and sigv4.region, and a
      topic policy allowing aps.amazonaws.com to call sns:Publish and sns:GetTopicAttributes. Restrict it to
      the workspace and account.
    facts:
      - alert-rule
      - sns-config
      - topic-policy
      - source-conditions
    trap: true
  - id: managed-prometheus-006
    q: AMP notifications to an unencrypted SNS topic work, but fail after topic encryption is enabled. What
      additional permissions are needed?
    a: The KMS key policy must grant aps.amazonaws.com kms:GenerateDataKey* and kms:Decrypt. The SNS topic policy
      is still required.
    facts:
      - kms-policy
      - topic-policy
  - id: managed-prometheus-012
    q: An AMP dashboard repeatedly runs an expensive PromQL expression. Which rule type can precompute it?
    a: A recording rule. It saves the expression result as new time series for later queries.
    facts:
      - record-rule
  - id: managed-prometheus-013
    q: An AMP alerting rule depends on a recording rule result. How should the rules be arranged for ordered
      evaluation?
    a: Place the recording rule before the alerting rule within the same rule group. Do not rely on ordering
      across groups or files.
    facts:
      - rule-order
    trap: true
---
AMP rules turn stored metrics into computed values or alerts. Alert manager handles notification routing after an alerting rule fires; the SNS topic then carries the notification to its subscribers.

### How it works

1. Ingest metrics into the workspace. A managed EKS collector can scrape and send them over a VPC endpoint; Managed Grafana can query the same workspace.
2. Create rules in a YAML rules file. Recording rules save computed time series, meaning measured values indexed by time. Alerting rules evaluate PromQL conditions.
3. Put dependent rules in one group, with the producer before the rule that uses its output.
4. Configure alert manager routes and an SNS Standard receiver using `topic_arn` and `sigv4.region`. Alert manager groups related alerts and removes duplicates.
5. Grant the AMP service principal, the identity AWS uses for the service, access in the topic policy. Restrict that permission to the workspace and account.
6. For an encrypted topic, grant the service access to the KMS encryption key too.

### Exam cues

- If the question says an AMP rule fires but SNS gets no message, think receiver configuration and topic access policy, because AMP needs permission to publish.
- If the question says notifications stopped after SNS encryption, think KMS key policy, because topic permission alone does not authorize use of the encryption key.
- If the question says expensive repeated PromQL calculation, think recording rule, because it stores the result for reuse.

### Remember

- Topic actions: `sns:Publish` and `sns:GetTopicAttributes` for `aps.amazonaws.com` in the same Region.
- Restrict access with `aws:SourceArn` and `aws:SourceAccount`.
- KMS actions: `kms:GenerateDataKey*` and `kms:Decrypt`.
- Rule order is guaranteed within one rule group, not across groups or files.

> **Trap:** Adding SNS permissions to an EKS workload role does not grant the AMP service principal access to the topic.
