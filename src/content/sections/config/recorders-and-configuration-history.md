---
title: Recorders and configuration history
level: associate
order: 10
facts:
  - id: configuration-item
    text: A configuration item is a point-in-time record of a supported resource's attributes,
      configuration, relationships, and related events.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-concepts.html#config-items
  - id: history-start
    text: AWS Config maintains configuration history from the time the configuration recorder starts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html#resource-discovery
  - id: configuration-history
    text: Configuration history is the sequence of configuration items for a resource, accessible
      through its console timeline or the API.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-concepts.html#config-history
  - id: configuration-snapshot
    text: A configuration snapshot collects the configuration items for the resources being recorded in
      an account.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-concepts.html#config-snapshot
  - id: history-delivery
    text: AWS Config delivers JSON configuration history files to the specified S3 bucket every six
      hours for resource types with changes during that period.
    source: https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html#delivery-channel-S3-bucket
  - id: snapshot-delivery
    text: DeliverConfigSnapshot requests delivery of a configuration snapshot to the configured S3
      bucket.
    source: https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html#delivery-channel-S3-bucket
  - id: s3-lifecycle
    text: AWS Config does not change the lifecycle policies of the S3 objects it delivers.
    source: https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html#delivery-channel-S3-bucket
  - id: recorder-scope
    text: A customer managed recorder lets you include or exclude resource types and defaults to all
      supported types except global IAM users, groups, roles, and customer managed policies.
    source: https://docs.aws.amazon.com/config/latest/developerguide/stop-start-recorder.html#stop-start-recorder-considerations
  - id: recorder-count
    text: Each account can have one customer managed configuration recorder per Region.
    source: https://docs.aws.amazon.com/config/latest/developerguide/stop-start-recorder.html#stop-start-recorder-considerations
  - id: service-linked-recorder
    text: A service-linked recorder has its resource scope set by its linked AWS service.
    source: https://docs.aws.amazon.com/config/latest/developerguide/stop-start-recorder.html#stop-start-recorder
  - id: continuous-recording
    text: Continuous recording captures configuration changes whenever they occur.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: daily-recording
    text: Daily recording captures the latest state over a 24-hour period only when it differs from the
      previous recorded configuration item.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: firewall-recording
    text: Firewall Manager depends on continuous recording to monitor resources.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: global-iam-recording
    text: Global IAM users, groups, roles, and customer managed policies can be recorded only in Regions
      where Config was supported before February 2022; recording them in one supported Region avoids
      duplicates.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: global-home-regions
    text: Config records supported global CloudFront, Route 53, WAF, ECR Public, and Global Accelerator
      resource types only in their designated home Region in the commercial partition.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: aurora-global-exception
    text: AWS::RDS::GlobalCluster is recorded in all enabled supported Config Regions unless excluded
      from recording.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: nonrecorded-details
    text: Non-recorded resources have creation and deletion markers but no configuration-change history
      or relationship details on their own resource page.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: periodic-without-recorder
    text: Periodic rules can run without the configuration recorder enabled because they do not depend
      on configuration items.
    source: https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html#resource-config-reference
  - id: change-rule-recording
    text: A configuration-change rule evaluates after a configuration item change notification for a
      resource matching its scope.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-trigger
  - id: ssm-history
    text: Recording Systems Manager patch and association compliance resources in Config enables
      compliance history and change tracking.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/compliance-about.html#compliance-about
  - id: organization-resources
    text: Supported Config resource types include AWS::Organizations::Account,
      AWS::Organizations::Organization, AWS::Organizations::OrganizationalUnit,
      AWS::Organizations::Policy, and AWS::Organizations::ResourcePolicy.
    source: https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html#resource-config-reference
  - id: history-retention
    text: RetentionPeriodInDays controls configuration item history retention and accepts 30 through
      2557 days.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_RetentionConfiguration.html#config-Type-RetentionConfiguration-RetentionPeriodInDays
  - id: temporary-workloads
    text: Temporary workloads can increase Config recording and evaluation activity through repeated
      resource creation and deletion.
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html
  - id: delivery-channel
    text: The delivery channel controls the destinations for Config notifications and configuration
      updates.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-concepts.html#delivery-channel
  - id: retention-default
    text: Config retains configuration items for seven years, or 2557 days, by default.
    source: https://docs.aws.amazon.com/config/latest/developerguide/delete-config-data-with-retention-period.html
  - id: organizational-unit
    text: An organizational unit groups AWS accounts within an organization and can contain other
      organizational units.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
  - id: ssm-resource-types
    text: AWS::SSM::PatchCompliance and AWS::SSM::AssociationCompliance are supported Config resource
      types.
    source: https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html#resource-config-reference
  - id: scp-purpose
    text: A service control policy limits the maximum permissions of IAM users and roles in an
      organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
  - id: protect-recording
    text: The Control Tower Config protection SCP denies DeleteConfigurationRecorder,
      StopConfigurationRecorder, PutConfigurationRecorder, DeleteDeliveryChannel, and
      PutDeliveryChannel, with an exception for AWSControlTowerExecution.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/mandatory-controls.html#mandatory-on-all-ous
  - id: resource-definition
    text: An AWS resource is an entity you create and manage in AWS, such as an EC2 instance or storage
      volume.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-concepts.html#aws-resources
diagrams:
  - id: config-history-flow
    title: Record resource state and deliver history
    width: 860
    height: 180
    nodes:
      - id: resource
        label: EC2 instance
        icon: res-ec2-instance
        x: 20
        y: 45
        w: 160
        h: 72
        tone: compute
        info: A supported resource selected for recording.
      - id: recorder
        label: Config recorder
        icon: config
        x: 330
        y: 45
        w: 170
        h: 72
        tone: mgmt
        info: Records configuration items at the selected recording frequency.
      - id: history
        label: S3 history
        icon: res-simple-storage-service-bucket
        x: 660
        y: 45
        w: 170
        h: 72
        tone: storage
        info: Receives history files for changed resource types every six hours.
    edges:
      - from: resource
        to: recorder
        step: 1
        label: state changes
      - from: recorder
        to: history
        step: 2
        label: delivery
    steps:
      - The recorder captures the selected resource's configuration and relationships as
        configuration items.
      - Config delivers history files to the configured S3 bucket; the console timeline also exposes
        resource history.
cards:
  - id: config-002
    q: What does AWS Config configuration history contain, and how far back does it reach?
    a: Configuration items describing supported resource configurations and relationships, from when
      recording started. Use the resource timeline or API to review them.
    trap: true
    facts:
      - configuration-item
      - configuration-history
      - history-start
  - id: config-004
    q: An AWS Config configuration-change rule has no evaluations for an EC2 resource. What recording
      settings should an operator inspect?
    a: Check that the recorder is running, includes the resource type, and produces changes matching the
      rule's scope. Periodic rules are different and can run without configuration items.
    trap: true
    facts:
      - change-rule-recording
      - recorder-scope
      - periodic-without-recorder
  - id: config-018
    q: How do AWS Config Continuous and Daily recording differ, and which does Firewall Manager need?
    a: Continuous captures changes as they occur. Daily captures the latest state over 24 hours if
      different from the previous item. Firewall Manager depends on continuous recording.
    facts:
      - continuous-recording
      - daily-recording
      - firewall-recording
  - id: config-019
    q: How should an AWS Config deployment avoid duplicate records of global IAM users, groups, roles,
      and customer managed policies?
    a: Record those types in one Region where Config was supported before February 2022. Regions added
      after that date cannot record those global IAM types.
    facts:
      - global-iam-recording
  - id: config-027
    q: An auditor needs historical Systems Manager patch and State Manager association compliance. What
      should be recorded in AWS Config?
    a: Record AWS::SSM::PatchCompliance and AWS::SSM::AssociationCompliance. Systems Manager shows
      current compliance; Config provides its history and change tracking.
    facts:
      - ssm-history
      - ssm-resource-types
  - id: config-028
    q: An auditor needs configuration evidence for AWS Organizations accounts, organizational units, and
      policies. Can AWS Config record those resource types?
    a: Yes. Supported types include Account, Organization, OrganizationalUnit, Policy, and
      ResourcePolicy under AWS::Organizations.
    facts:
      - organization-resources
  - id: config-029
    q: How do AWS Config configuration history and configuration snapshots differ, and where are their
      files delivered?
    a: History follows changes to a resource over time; a snapshot collects recorded resource
      configurations together. Config delivers files to the configured S3 bucket, with history files
      every six hours when changes occur.
    facts:
      - configuration-history
      - configuration-snapshot
      - history-delivery
      - snapshot-delivery
  - id: config-030
    q: Can an AWS Config periodic rule evaluate when its configuration recorder is disabled?
    a: Yes. Periodic rules do not depend on configuration items. Do not apply the recording prerequisite
      for configuration-change rules to every rule.
    trap: true
    facts:
      - periodic-without-recorder
      - change-rule-recording
  - id: config-048
    q: An organization wants to protect baseline AWS Config recorders and delivery channels while
      retaining other permitted Config administration. Which permissions should an SCP deny?
    a: Use an SCP denying config:DeleteConfigurationRecorder, config:StopConfigurationRecorder,
      config:PutConfigurationRecorder, config:DeleteDeliveryChannel, and config:PutDeliveryChannel.
      Target these actions rather than config:*; AWS documents the pattern in its Control Tower
      Config protection SCP.
    facts:
      - scp-purpose
      - protect-recording
---
AWS Config records the settings and relationships of supported AWS **resources**, entities such as instances and storage volumes, so you can investigate how they changed. A **configuration item (CI)** is a record of one resource at a particular time. Its configuration history starts when recording starts.

### How it works

1. Choose resource types in each account and Region. The **customer managed recorder**, whose scope you control, defaults to supported types except global IAM users, groups, roles, and customer managed policies. A **service-linked recorder** has its scope set by its linked service.
2. Select **Continuous** recording for changes as they occur or **Daily** recording for the latest state over 24 hours, only when different from the previous CI. Repeated creation and deletion of temporary resources can increase recording activity.
3. Review a resource's **configuration history**, its sequence of CIs, through its console timeline or the API. A **configuration snapshot** collects the recorded resources' configurations together.
4. Use the **delivery channel**, the destination settings for configuration updates, to deliver history to S3. History files arrive every six hours for resource types with changes. `DeliverConfigSnapshot` requests a snapshot. Config does not manage the delivered objects' S3 lifecycle policies, which control archiving and deletion.
5. For patch and State Manager association compliance history, record `AWS::SSM::PatchCompliance` and `AWS::SSM::AssociationCompliance`. Config also supports Organizations account, organization, organizational unit, policy, and resource policy types. An **organizational unit** groups accounts within an organization.

6. Protect the recording baseline with a **service control policy (SCP)**, a limit on member-account IAM permissions. Deny recorder stop, delete, and update actions plus delivery-channel delete and update actions, while retaining other permitted administration. AWS documents this pattern in its Control Tower Config protection SCP.

### Exam cues

- If the question says investigate a resource's settings before an incident, think configuration history, because its CIs show configurations and relationships over time from the start of recording.
- If the question says a configuration-change rule has no evaluations, think recorder status, selected resource types, and rule scope, because those evaluations follow matching CI change notifications.
- If the question says retain patch and association compliance changes, think Config recording of Systems Manager compliance resources, because current compliance reports alone do not provide that history.
- If the question says Firewall Manager must monitor changes, think Continuous recording, because Firewall Manager depends on it.

### Remember

- One customer managed recorder per account per Region.
- To protect the baseline, deny `config:DeleteConfigurationRecorder`, `config:StopConfigurationRecorder`, `config:PutConfigurationRecorder`, `config:DeleteDeliveryChannel`, and `config:PutDeliveryChannel` through an SCP.
- Daily recording represents the latest state over 24 hours, not every intermediate change.
- Global IAM types require Regions where Config was supported before February 2022. Record them once in a supported Region to avoid duplicates.
- Supported global CloudFront, Route 53, WAF, ECR Public, and Global Accelerator types use their designated **home Region**, the Region where Config records that global type in the commercial partition. Aurora global clusters are an exception and are recorded in enabled supported Regions unless excluded.
- Non-recorded resources have creation and deletion markers, not a configuration-change history on their own page.
- `RetentionPeriodInDays` accepts 30 through 2557 days for CI history; the default is seven years, or 2557 days. S3 lifecycle policies control delivered objects separately.

> **Trap:** A missing CI does not prove a periodic rule cannot run. Periodic rules do not depend on CIs; configuration-change rules do.
