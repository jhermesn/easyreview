---
title: Recommendation eligibility
level: professional
order: 20
facts:
  - id: ec2-requirements
    text: EC2 instances and Auto Scaling groups require at least 30 hours of CloudWatch metrics in the past 14 days, or 93 days with enhanced infrastructure metrics.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-ec2-instances
  - id: lambda-requirements
    text: Lambda memory recommendations require configured memory of at most 1792 MB and at least 50 invocations in the last 14 days.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-lambda-functions
  - id: ebs-requirements
    text: Supported EBS volumes must be attached to a running instance for at least 30 consecutive hours; recommendations disappear when a volume is detached.
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-ebs-volumes
cards:
  - id: compute-optimizer-003
    q: A team sees no AWS Compute Optimizer recommendation for a new EC2 instance with only 10 hours of metrics. Why?
    a: EC2 recommendations require at least 30 hours of CloudWatch metrics in the applicable lookback period.
    facts: [ec2-requirements]
  - id: compute-optimizer-005
    q: A Lambda function has 20 invocations in 14 days. Why does AWS Compute Optimizer not recommend its memory size?
    a: Lambda memory recommendations require at least 50 invocations in the last 14 days and configured memory of at most 1792 MB.
    facts: [lambda-requirements]
  - id: compute-optimizer-007
    q: A team detached an EBS volume and its AWS Compute Optimizer recommendation disappeared. Why?
    a: Recommendations are unavailable when a volume is detached; supported volumes need at least 30 consecutive hours attached to a running instance.
    facts: [ebs-requirements]
---
AWS Compute Optimizer recommendations depend on resource-specific requirements. When a recommendation is missing, check the requirements for that resource type.

### How it works

1. For [EC2 instances and Auto Scaling groups](https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-ec2-instances), check for at least 30 hours of CloudWatch metrics in the past 14 days, or in the past 93 days with enhanced infrastructure metrics.
2. For [Lambda memory recommendations](https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-lambda-functions), check both configured memory and invocation count in the last 14 days.
3. For a supported [EBS volume](https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html#requirements-ebs-volumes), check that it has been attached to a running instance for at least 30 consecutive hours. Its recommendation is unavailable after detachment.

### Exam cues

- If the question says a new EC2 instance has only 10 hours of metrics, think insufficient data, because it needs at least 30 hours in the applicable lookback period.
- If the question says a Lambda function has only 20 invocations in 14 days, think insufficient invocations, because memory recommendations require at least 50.
- If the question says an EBS recommendation disappeared after detachment, think attachment state, because recommendations are unavailable for detached volumes.

### Remember

- EC2 instances and Auto Scaling groups need 30 hours of CloudWatch metrics in 14 days, or 93 days with enhanced infrastructure metrics.
- Lambda memory recommendations require at least 50 invocations in the last 14 days and configured memory of at most 1792 MB.
- Supported EBS volumes need 30 consecutive hours attached to a running instance.

> **Trap:** The 30-hour EC2 metric requirement and the 30-consecutive-hour EBS attachment requirement are different checks.
