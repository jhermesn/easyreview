---
title: "PLACEHOLDER compute-optimizer/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
