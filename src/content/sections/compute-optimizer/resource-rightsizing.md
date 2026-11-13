---
title: Resource rightsizing
level: associate
order: 10
facts:
  - id: purpose
    text: Compute Optimizer analyzes resource configuration and utilization metrics to recommend sizes and identify idle resources.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html#what-is-compute-optimizer
  - id: opt-in
    text: Compute Optimizer requires an account to opt in before it analyzes resources.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html#intro-opting-in
  - id: organization
    text: An organization management account can opt in all member accounts, including new members added later.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/account-opt-in.html#opt-in-procedure
  - id: supported
    text: Supported resources include EC2 instances and Auto Scaling groups, EBS volumes, Lambda functions, ECS services on Fargate, and Aurora and RDS databases.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html#intro-supported-resources
  - id: lookback
    text: The default analysis lookback is 14 days; paid enhanced infrastructure metrics extend it to 93 days for selected resources.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html#intro-enhanced-infrastructure-metrics
  - id: lookback-options
    text: Rightsizing preferences offer 14-day and 32-day lookbacks without additional payments and a paid 93-day option.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/rightsizing-preferences.html#rightsizing-preferences-lookback
  - id: ec2-requirements
    text: EC2 instances and Auto Scaling groups require at least 30 hours of CloudWatch metrics in the past 14 days, or 93 days with enhanced infrastructure metrics.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-ec2-instances
  - id: ebs-requirements
    text: Supported EBS volumes must be attached to a running instance for at least 30 consecutive hours; recommendations disappear when a volume is detached.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-ebs-volumes
  - id: lambda-requirements
    text: Lambda memory recommendations require configured memory of at most 1792 MB and at least 50 invocations in the last 14 days.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-lambda-functions
  - id: delay
    text: After sufficient metrics are available, analysis can take up to 24 hours.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements
  - id: graphs
    text: Compute Optimizer provides recent and projected utilization graphs to help evaluate recommendation trade-offs.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html#what-is-compute-optimizer
  - id: preferences
    text: Rightsizing preferences can adjust CPU threshold, CPU and memory headroom, lookback periods, and instance family preferences; CPU and memory utilization preferences apply only to EC2 instances.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/rightsizing-preferences.html#rightsizing-preferences
  - id: memory-metrics
    text: Compute Optimizer can use EC2 memory utilization collected by the CloudWatch agent or ingested from supported external products.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/ec2-metrics-analyzed.html#ec2-metrics-list
  - id: cost-explorer
    text: Cost Explorer must be enabled for Compute Optimizer to calculate savings and populate pricing information for recommendations using billing data.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-ec2-instances
  - id: license-manager
    text: AWS License Manager tracks license usage and provides rule-based controls on license consumption.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html#license-manager
  - id: license-recommendations
    text: Compute Optimizer generates commercial software license recommendations only for Microsoft SQL Server on EC2.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-license
cards:
  - id: compute-optimizer-001
    q: Which AWS service recommends resource sizes based on configuration and utilization?
    a: AWS Compute Optimizer analyzes resource configuration and utilization to recommend sizes and identify idle resources.
    facts: [purpose]
  - id: compute-optimizer-002
    q: What is the default AWS Compute Optimizer lookback, and how can selected resources use a longer period?
    a: The default is 14 days. Paid enhanced infrastructure metrics extend it to 93 days for selected resources.
    facts: [lookback]
  - id: compute-optimizer-003
    q: A team sees no AWS Compute Optimizer recommendation for a new EC2 instance with only 10 hours of metrics. Why?
    a: EC2 recommendations require at least 30 hours of CloudWatch metrics in the applicable lookback period.
    facts: [ec2-requirements]
  - id: compute-optimizer-004
    q: An organization wants AWS Compute Optimizer recommendations across all accounts. How can it enroll them?
    a: Opt in all accounts from the management account. New member accounts are opted in automatically.
    facts: [organization]
  - id: compute-optimizer-005
    q: A Lambda function has 20 invocations in 14 days. Why does AWS Compute Optimizer not recommend its memory size?
    a: Lambda memory recommendations require at least 50 invocations in the last 14 days and configured memory of at most 1792 MB.
    facts: [lambda-requirements]
  - id: compute-optimizer-006
    q: Does AWS Compute Optimizer enforce software license consumption limits?
    a: Use AWS License Manager for rule-based license controls. Compute Optimizer provides optimization recommendations.
    trap: true
    facts: [license-manager, purpose]
  - id: compute-optimizer-007
    q: A team detached an EBS volume and its AWS Compute Optimizer recommendation disappeared. Why?
    a: Recommendations are unavailable when a volume is detached; supported volumes need at least 30 consecutive hours attached to a running instance.
    facts: [ebs-requirements]
  - id: compute-optimizer-008
    q: A team wants AWS Compute Optimizer EC2 recommendations to consider instance memory use. What can it configure?
    a: Collect memory metrics with the CloudWatch agent or ingest them from a supported external product.
    facts: [memory-metrics]
---
AWS Compute Optimizer helps choose resource configurations based on usage. Rightsizing means selecting capacity suited to the workload rather than provisioning too much or too little.

### How it works

1. Opt in an account. An organization management account can opt in all member accounts, including members added later.
2. Compute Optimizer examines resource configuration and utilization metrics, measurements of how resources are used. Supported examples include EC2 instances and Auto Scaling groups, EBS volumes, Lambda functions, ECS services on Fargate, and Aurora and RDS databases.
3. Eligible resources need enough data. Analysis can take up to 24 hours once sufficient metrics are available.
4. Review recommendations alongside recent and projected utilization graphs. Adjust rightsizing preferences such as CPU and memory headroom, the spare capacity reserved above observed use, when appropriate.

### Exam cues

- If the question says find a better EC2 size based on usage, think Compute Optimizer, because it analyzes configuration and utilization.
- If the question says analyze a longer usage history, think enhanced infrastructure metrics, because the paid preference extends the lookback for selected resources.
- If the question says enforce software license consumption rules, think License Manager, because it tracks licenses and provides rule-based controls.
- If the question says recommendations are missing for a recently launched EC2 instance, think insufficient metrics, because EC2 needs at least 30 hours of data.

### Remember

- Default lookback: 14 days. Rightsizing preferences also offer 32 days without additional payment, or 93 days with paid enhanced infrastructure metrics for selected resources.
- EC2 instances and Auto Scaling groups need 30 hours of metrics in the applicable lookback period.
- For EC2 memory metrics, use the CloudWatch agent or supported external metrics ingestion.
- Enable Cost Explorer for pricing and savings calculations using billing data.
- EBS volumes need 30 consecutive hours attached to a running instance. Detaching removes their recommendations.
- Lambda memory recommendations need at least 50 invocations in 14 days and configured memory at most 1792 MB.
- Commercial software license recommendations cover Microsoft SQL Server on EC2.

> **Trap:** Compute Optimizer recommends configurations, but License Manager provides rule-based license consumption controls.
