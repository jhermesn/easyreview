---
title: Account Factory for Terraform
level: professional
order: 40
facts:
  - id: aft
    text: AFT provides a Terraform pipeline for provisioning and customizing Control Tower accounts through account request files committed to Git.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-overview.html#aft-overview
  - id: prerequisite
    text: AFT requires an existing Control Tower landing zone and uses a separate AFT management account.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-overview.html#aft-overview
  - id: account-purpose
    text: The AFT management account is separate from the Control Tower management account and hosts AFT capabilities.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-overview.html#aft-overview
  - id: scope
    text: AFT is intended for account provisioning and customization, not deployment of application workload resources.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-overview.html#aft-overview
  - id: order
    text: Global customizations run after the provisioning framework, followed by account-specific customizations.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-account-customization-options.html#aft-account-customizations
  - id: reinvoke
    text: To customize existing AFT accounts retroactively, push the customization changes and invoke the aft-invoke-customizations Step Functions workflow; a customization repository push alone does not run it.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-account-customization-options.html#aft-re-invoke-customizations
  - id: opt-in
    text: CloudTrail data events, Enterprise Support enrollment, and default-VPC deletion are opt-in AFT features, disabled by default.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-feature-options.html#aft-feature-options
  - id: data-events
    text: Setting aft_feature_cloudtrail_data_events to true creates an organization trail for S3 and Lambda data events and requires CloudTrail trusted access.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-feature-options.html#cloudtrail-data-event-option
  - id: org-scope
    text: The AFT data-event option affects all organization accounts, including accounts not managed by AFT.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-feature-options.html#cloudtrail-data-event-option
  - id: data-storage
    text: The data-event option enables log validation and KMS-encrypted log delivery to an aws-aft-logs-* bucket in the logging account; existing logging-account buckets are excluded from S3 data events.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-feature-options.html#cloudtrail-data-event-option
  - id: support
    text: Setting aft_feature_enterprise_support to true requests Enterprise Support enrollment for AFT-provisioned accounts; the payer account must already have Enterprise Support.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-feature-options.html#enterprise-support-option
  - id: vpc
    text: Setting aft_feature_delete_default_vpcs_enabled to true deletes default VPCs only in the AFT management account across Regions, not in accounts AFT provisions or enrolls.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-feature-options.md#delete-default-vpc-option
  - id: vpc-custom
    text: Default-VPC deletion in accounts AFT provisions or enrolls requires custom deletion logic; Control Tower account creation separately deletes default VPCs in governed Regions but enrollment does not.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-feature-options.md#delete-default-vpc-option
  - id: vpc-definition
    text: A VPC is a virtual network for AWS resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
diagrams:
  - id: control-tower-aft-order
    title: AFT account request and customization order
    width: 1100
    height: 190
    nodes:
      - id: git
        label: Account request
        icon: res-git-repository
        x: 20
        y: 55
        w: 190
        h: 72
        tone: devtools
      - id: provision
        label: AFT provisioning
        icon: control-tower
        x: 300
        y: 55
        w: 190
        h: 72
        tone: mgmt
      - id: global
        label: Global config
        icon: res-git-repository
        x: 580
        y: 55
        w: 190
        h: 72
        tone: devtools
      - id: account
        label: Account config
        icon: res-git-repository
        x: 860
        y: 55
        w: 210
        h: 72
        tone: devtools
    edges:
      - from: git
        to: provision
        step: 1
        label: push
      - from: provision
        to: global
        step: 2
      - from: global
        to: account
        step: 3
    steps:
      - An account request commit triggers AFT provisioning.
      - After the provisioning framework, global customizations run.
      - Account-specific customizations run after global customizations.
cards:
  - id: control-tower-011
    q: A team needs AWS Control Tower accounts provisioned from Terraform account requests committed to Git. What should it use?
    a: Account Factory for Terraform (AFT). It runs account provisioning and customization pipelines in a separate AFT management account and requires an existing landing zone.
    facts:
      - aft
      - prerequisite
      - account-purpose
  - id: control-tower-025
    q: A team needs Enterprise Support on accounts provisioned by AWS Control Tower AFT. Which setting and prerequisite apply?
    a: Set aft_feature_enterprise_support to true in the AFT deployment configuration. The payer account must already be enrolled in Enterprise Support.
    facts:
      - support
      - opt-in
  - id: control-tower-026
    q: Does enabling aft_feature_delete_default_vpcs_enabled remove default VPCs from every account AWS Control Tower AFT provisions?
    a: No. The flag affects only the AFT management account. Use account customization logic for other accounts.
    trap: true
    facts:
      - vpc
      - vpc-custom
  - id: control-tower-027
    q: Which AWS Control Tower AFT flag enables organization-wide S3 and Lambda data-event logging, and is its scope limited to AFT-managed accounts?
    a: Set aft_feature_cloudtrail_data_events to true after enabling CloudTrail trusted access. It affects all accounts in the organization.
    facts:
      - data-events
      - org-scope
  - id: control-tower-028
    q: An AWS Control Tower AFT team pushes new global customizations but existing accounts do not change. What must it do?
    a: Invoke the aft-invoke-customizations Step Functions workflow for the selected accounts after pushing the changes.
    trap: true
    facts:
      - reinvoke
  - id: control-tower-029
    q: In what order does AWS Control Tower AFT apply global and account-specific customizations?
    a: After the provisioning framework, apply global customizations and then account-specific customizations.
    facts:
      - order
---
Account Factory for Terraform (AFT) turns Terraform account request files in Git into Control Tower account provisioning and customization. This GitOps model uses repository changes as workflow inputs. AFT runs in its own management account, separate from the Control Tower management account.

### How it works

1. Start with an existing Control Tower landing zone and deploy AFT capabilities in the separate AFT management account.
2. Commit and push an account request Terraform file to trigger the provisioning workflow.
3. After provisioning and the provisioning framework, AFT applies global customizations and then account-specific customizations.
4. Select optional feature flags in the AFT deployment configuration. Each flag below is disabled by default.
5. For retroactive customization of existing accounts, push the changed customization files and invoke the aft-invoke-customizations Step Functions workflow. A customization repository push alone does not start that rerun.

### Exam cues

- If the question says provision governed accounts from Terraform files in Git, think AFT, because account request commits trigger its workflow.
- If the question says enroll AFT-provisioned accounts in Enterprise Support, think aft_feature_enterprise_support=true, because the option requests enrollment when the payer already has that plan.
- If the question says delete default VPCs in every provisioned account, think account customization logic, because AFT's deletion flag applies only to its own management account. A VPC is a virtual network for AWS resources.

### Remember

| Feature flag | Effect when true | Scope or prerequisite |
|---|---|---|
| aft_feature_cloudtrail_data_events | Organization trail for S3 and Lambda data events | All organization accounts; CloudTrail trusted access required |
| aft_feature_enterprise_support | Requests Enterprise Support enrollment | AFT-provisioned accounts; payer already enrolled |
| aft_feature_delete_default_vpcs_enabled | Removes default VPCs across Regions | AFT management account only |

- These feature flags are opt-in and disabled by default.
- Data-event logs use KMS encryption and log validation in an aws-aft-logs-* bucket in the logging account. Existing logging-account buckets are excluded from S3 data events.
- AFT customizes accounts; its pipeline is not intended for application workload deployment.

> **Trap:** An AFT account request commit and a customization repository commit have different effects. Existing accounts need the explicit customization rerun workflow.
