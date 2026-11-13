---
title: Assessments, drift, and pipeline checks
level: professional
order: 20
facts:
  - id: assessment
    text: Resilience Hub assesses application components against the policy and reports estimated workload RTO and RPO.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#how-it-works
  - id: component
    text: An application component is a group of related resources that work and fail as a single unit.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#app-component
  - id: recommendations
    text: Assessment recommendations include component configuration, alarms, tests and recovery procedures.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#how-it-works
  - id: import-stack
    text: Resilience Hub can import application resources from CloudFormation stacks.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#how-it-works
  - id: estimate
    text: Estimated workload RTO is based on the application configuration, not the policy.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/review-assessment.html#review-section
  - id: validation
    text: Tests simulate resource outages to measure resilience and recovery time.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#how-it-works
  - id: daily
    text: Daily scheduled assessment begins after a first successful manual assessment and appropriate IAM role configuration.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/scheduled-assessment.html#scheduled-assessment
  - id: notify
    text: Drift notifications require an SNS topic with permissions for Resilience Hub to publish.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/scheduled-assessment.html#scheduled-assessment
  - id: sns-topic
    text: An SNS topic is a communication channel for messages to multiple endpoints.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html#sns-create-topic
  - id: resource-drift
    text: The report identifies resources added or removed since the latest published application version; reimport, publish and assess to include updated resources.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/review-assessment.html#review-section
  - id: policy-drift
    text: Application policy drift identifies components that met the policy in the previous assessment but fail to meet it in the current assessment.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#drift-status
  - id: status
    text: Policy met means all application components are estimated to meet the policy objectives; policy breached means one or more components do not satisfy them.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#app-compliance
  - id: pipeline
    text: Resilience Hub can be added to a CI/CD pipeline to validate builds before production release.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#arh-mgmt
  - id: delivery
    text: Continuous integration builds and tests code changes; continuous delivery automates the software release process.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-continuous-delivery-integration.html#concepts-continuous-delivery-integration
  - id: unsupported
    text: Some resources are unsupported or ignored, including resources that do not affect estimated RTO or RPO and non-top-level resources.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/supported-resources.html#supported-resources
  - id: fis
    text: AWS recommends controlled failure simulations with Fault Injection Service to gain confidence before production deployment.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_tracking_change_management_resiliency_testing.html#implementation-guidance
  - id: run-fis
    text: Resilience Hub can create and run Fault Injection Service experiments that mimic application disruptions.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/what-is.html#what-is
cards:
  - id: resilience-hub-002
    q: What does an AWS Resilience Hub assessment report?
    a: Estimated workload RTO and RPO against policy targets, with recommendations for configuration, alarms, tests and recovery procedures.
    facts: [assessment, recommendations]
  - id: resilience-hub-003
    q: Does an AWS Resilience Hub assessment prove an application will meet recovery targets during an outage?
    a: No. It estimates recovery from configuration; run outage simulations to measure recovery.
    trap: true
    facts: [estimate, validation]
  - id: resilience-hub-004
    q: How can a team detect later resource changes with AWS Resilience Hub?
    a: Enable daily assessments and drift notifications. Notifications require a permitted SNS topic; daily assessments require an initial successful manual assessment and an appropriate IAM role.
    facts: [daily, notify, resource-drift]
  - id: resilience-hub-005
    q: How can a team use AWS Resilience Hub to check each build for resilience before release?
    a: AWS Resilience Hub assessments in the CI/CD pipeline.
    facts: [pipeline]
  - id: resilience-hub-010
    q: An AWS Resilience Hub report shows added resources after the application was published. How can the team include them in an assessment?
    a: Reimport the input sources, publish the updated application and assess it.
    facts: [resource-drift]
  - id: resilience-hub-011
    q: A team wants to measure actual recovery after an AWS Resilience Hub assessment. What should it run?
    a: Run controlled outage simulations, such as AWS Fault Injection Service experiments.
    facts: [validation, fis]
  - id: resilience-hub-013
    q: What does application policy drift mean in AWS Resilience Hub?
    a: A component that met the policy in the previous assessment fails to meet it in the current assessment.
    facts: [policy-drift]
diagrams:
  - id: resilience-hub-assessment-flow
    title: Assess and test recovery
    width: 700
    height: 160
    nodes:
      - { id: stack, label: CloudFormation, x: 20, y: 30, w: 170, h: 72, tone: devtools, icon: cloudformation }
      - { id: hub, label: Resilience Hub, x: 260, y: 30, w: 170, h: 72, tone: mgmt, icon: resilience-hub }
      - { id: fis, label: Fault Injection, x: 510, y: 30, w: 170, h: 72, tone: mgmt, icon: fault-injection-service }
    edges:
      - { from: stack, to: hub, step: 1 }
      - { from: hub, to: fis, step: 2 }
    steps:
      - Import resources and assess their configuration against recovery targets.
      - Run controlled failure tests to measure recovery.
---
In the original AWS Resilience Hub experience, assessments compare recovery estimates with an application's policy and suggest improvements. A test measures recovery during a simulated outage.

### How it works

1. Assess the application model against its recovery policy. Review estimated recovery time and data loss, component configuration, alarms, tests and recovery procedures. An application component is a group of related resources that work and fail together.
2. Improve the application and reassess. Run controlled outage simulations to measure recovery.
3. Enable daily assessments after the first successful manual assessment and AWS Identity and Access Management (IAM) role setup. Enable drift notifications with a permitted Amazon Simple Notification Service (SNS) topic, a channel for messages.
4. For added or removed resources, reimport the input sources, publish the updated model and assess it.

### Exam cues

- If the question says check each build before production, think Resilience Hub in the continuous integration and continuous delivery (CI/CD) pipeline, because it can validate builds before release.
- If the question says a resource was added after the model was published, think reimport, publish and assess, because the updated resources must be included.
- If the question says measure recovery under failure, think controlled outage tests, because an assessment provides estimates.
- If the question says a previously compliant component no longer meets its policy, think application policy drift, because the latest assessment detected a compliance change.

### Remember

- Daily assessments start after a successful manual assessment and appropriate IAM role configuration.
- Policy met means all components are estimated to meet the policy; policy breached means at least one does not.
- Resource drift identifies added or removed resources. Policy drift identifies components that no longer meet their policy.
- Some resources are unsupported or ignored, including non-top-level resources.

> **Trap:** A compliant estimate is not an outage test. Simulate failures to measure recovery.
