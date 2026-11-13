---
title: Application models and resiliency policies
level: professional
order: 10
facts:
  - id: model-sources
    text: Resilience Hub describes an application by importing resources from CloudFormation stacks, Terraform state files, Resource Groups, EKS clusters, or myApplications.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#how-it-works
  - id: policy-targets
    text: A resiliency policy sets recovery time and recovery point objectives for application, infrastructure, Availability Zone and Region disruptions.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: application-disruption
    text: An application disruption is the loss of a required software service or process.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: infrastructure-disruption
    text: An infrastructure disruption is the loss of hardware such as an EC2 instance.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: az-disruption
    text: An Availability Zone disruption makes one or more Availability Zones unavailable.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: region-disruption
    text: A Region disruption makes one or more Regions unavailable.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: rto-definition
    text: RTO is the maximum acceptable delay between service interruption and restoration.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#RTO
  - id: rpo-definition
    text: RPO is the maximum acceptable time since the last data recovery point.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#RPO
  - id: region-optional
    text: Region is the only disruption type for which RTO and RPO targets may be omitted.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/review-assessment.html#review-section
  - id: policy-effects
    text: A policy does not change the application.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: policy-sharing
    text: Multiple applications can share a resiliency policy.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: zero-target
    text: A zero RTO or RPO target can be entered, but the lowest assessment result is near zero, so a zero target is breached.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
  - id: next-generation
    text: The next generation became generally available on May 28, 2026; existing customers may adopt it at their own pace.
    source: https://aws.amazon.com/about-aws/whats-new/2026/05/aws-announces-next-gen-aws-resilience-hub/
  - id: next-model
    text: The next generation groups services into systems and uses user journeys to describe paths through them.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/next-gen-what-changes.html#next-gen-what-changes
  - id: next-assessment
    text: The next generation uses generative AI for failure mode assessments.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/next-gen-what-changes.html#next-gen-what-changes
  - id: next-discovery
    text: The next generation automatically discovers dependencies.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/next-gen-what-changes.html#next-gen-what-changes
  - id: next-policy
    text: The next generation combines disaster recovery, availability and data recovery conditions in modular policies.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/next-gen-what-changes.html#next-gen-what-changes
  - id: next-governance
    text: The next generation supports organization-wide governance.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/next-gen-what-changes.html#next-gen-what-changes
  - id: az-definition
    text: An Availability Zone is one or more distinct data centers in an AWS Region with independent power, networking and connectivity.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones
cards:
  - id: resilience-hub-001
    q: What targets does an AWS Resilience Hub resiliency policy contain?
    a: RTO and RPO targets for application, infrastructure, Availability Zone and Region disruptions. Region targets are optional.
    facts: [policy-targets, region-optional]
  - id: resilience-hub-006
    q: A team wants to assess resources described in a CloudFormation stack in AWS Resilience Hub. How can it model the application?
    a: Import the stack as an application input source.
    facts: [model-sources]
  - id: resilience-hub-007
    q: A team sets a zero RTO in an AWS Resilience Hub policy. Will a near-zero estimated RTO meet it?
    a: No. A zero target is breached because the lowest assessment result is near zero.
    trap: true
    facts: [zero-target]
  - id: resilience-hub-008
    q: Does attaching an AWS Resilience Hub policy change the application?
    a: No. The policy supplies assessment targets and can be shared by multiple applications.
    trap: true
    facts: [policy-effects, policy-sharing]
  - id: resilience-hub-009
    q: How do RTO and RPO differ in an AWS Resilience Hub policy?
    a: RTO is acceptable downtime; RPO is the acceptable period of data loss.
    facts: [rto-definition, rpo-definition]
  - id: resilience-hub-012
    q: How does the next generation of AWS Resilience Hub change application modeling and assessment?
    a: It groups services in systems, describes paths as user journeys, discovers dependencies and uses generative AI for failure mode assessments.
    facts: [next-model, next-assessment, next-discovery]
---
AWS Resilience Hub helps teams assess whether an application's recovery estimates meet business targets. In the original experience, the application model identifies resources to assess and the policy states the recovery targets.

### How it works

1. Import resources from CloudFormation, Terraform state, Resource Groups, EKS, or myApplications to describe the application.
2. Set a recovery time objective (RTO), the acceptable downtime, and recovery point objective (RPO), the acceptable period of data loss.
3. Attach a policy with targets for application, infrastructure and Availability Zone disruptions. An Availability Zone is a distinct set of data centers in an AWS Region. Region targets are optional. Assess the model against the policy.

| Disruption | Example |
|---|---|
| Application | A required software process is lost. |
| Infrastructure | An EC2 instance is lost. |
| Availability Zone | One or more zones are unavailable. |
| Region | One or more Regions are unavailable. |

### Exam cues

- If the question says a CloudFormation application needs recovery assessment, think import the stack into Resilience Hub, because its resources describe the application.
- If the question says several applications have the same recovery requirements, think a shared policy, because one policy can be attached to multiple applications.
- If the question says zero downtime is required, think a zero target is breached, because the lowest assessment result is near zero.

### Remember

- A policy does not change the application.
- Region is the only disruption type whose targets may be omitted.
- The next generation became generally available on May 28, 2026. It groups services into systems, describes paths as user journeys, discovers dependencies and uses generative AI for failure analysis.
- The next generation uses modular policies for disaster recovery, availability and data recovery, and supports organization-wide governance. Existing customers can adopt it at their own pace.

> **Trap:** Attaching a policy does not implement recovery. It sets targets for assessment.
