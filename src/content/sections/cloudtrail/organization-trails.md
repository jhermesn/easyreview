---
title: Organization trails
level: professional
order: 30
facts:
  - id: organization-scope
    text: An organization trail records selected events for the management account and member accounts
      in an AWS Organizations organization.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: organization-admin
    text: The management account or a CloudTrail delegated administrator can create and manage
      organization trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: organization-console
    text: Console-created organization trails are multi-Region and cover enabled Regions; the CLI can
      create single-Region or multi-Region trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: organization-members
    text: Member-account users with CloudTrail permissions can view an organization trail but cannot
      modify, delete, start or stop it.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: organization-new-accounts
    text: New organization members receive the organization trail and required
      AWSServiceRoleForCloudTrail service-linked role automatically, and logging starts
      automatically.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: organization-opt-in
    text: If a multi-Region organization trail has an opt-in home Region, member accounts must enable
      that Region before they send any activity to the trail.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: organization-status
    text: An organization trail copy can exist despite S3, SNS, CloudWatch Logs or KMS validation
      errors; get-trail-status exposes delivery problems.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: organization-path
    text: Organization log file paths include AWSLogs, organization ID, account ID, CloudTrail and
      Region.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/get-and-view-cloudtrail-log-files.html#get-and-view-cloudtrail-log-files
  - id: organization-cw
    text: CloudWatch Logs delivery requires an IAM role policy that permits organization log streams as
      well as the selected log group.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#policy-cwl-org
  - id: organization-filter
    text: A metric filter on CloudTrail events delivered to CloudWatch Logs can feed an alarm for
      security changes.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html#cloudwatch-alarms-for-cloudtrail
  - id: organization-digests
    text: Enabling integrity validation adds signed hourly digest files to the same S3 bucket as the
      logs.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
  - id: organization-kms
    text: The KMS key used to encrypt CloudTrail log and digest files must be in the destination
      bucket's Region.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms
diagrams:
  - id: cloudtrail-organization
    title: Organization trail and centralized audit
    width: 1000
    height: 360
    nodes:
      - id: accounts
        label: Member accounts
        sub: selected activity
        icon: res-organizations-account
        x: 20
        y: 125
        w: 160
        h: 86
        tone: mgmt
        info: New members receive the organization trail automatically. Member users cannot change its
          settings.
      - id: trail
        label: Organization trail
        sub: enabled Regions
        icon: cloudtrail
        x: 260
        y: 125
        w: 170
        h: 86
        tone: mgmt
        info: The management account or a delegated administrator manages the trail. Members must enable an
          opt-in home Region.
      - id: bucket
        label: S3 bucket
        sub: organization/account path
        icon: res-simple-storage-service-bucket
        x: 530
        y: 30
        w: 190
        h: 86
        tone: storage
        info: The organization and account IDs identify the log path. Integrity validation adds signed
          hourly digests. A KMS key must be in the bucket Region.
      - id: logs
        label: CloudWatch Logs
        sub: optional delivery
        icon: res-cloudwatch-logs
        x: 530
        y: 230
        w: 190
        h: 86
        tone: mgmt
        info: The delivery role policy must allow the organization log streams.
      - id: alarm
        label: Metric alarm
        sub: security changes
        icon: res-cloudwatch-alarm
        x: 810
        y: 230
        w: 160
        h: 86
        tone: mgmt
        info: A metric filter converts matching events into a metric for an alarm.
    edges:
      - from: accounts
        to: trail
        step: 1
      - from: trail
        to: bucket
        step: 2
      - from: trail
        to: logs
        step: 3
      - from: logs
        to: alarm
        step: 4
    steps:
      - The trail records selected organization activity.
      - CloudTrail delivers the log files to S3.
      - Optional CloudWatch Logs delivery uses a role authorized for organization streams.
      - A metric filter supplies a security-change metric for an alarm.
cards:
  - id: cloudtrail-008
    q: An AWS organization needs management event logging for all accounts and enabled Regions,
      including future members. What should it configure?
    a: A multi-Region organization trail, created by the management account or a CloudTrail delegated
      administrator. New members receive the trail automatically.
    facts:
      - organization-scope
      - organization-admin
      - organization-console
      - organization-new-accounts
  - id: cloudtrail-009
    q: Can an administrator in a member account disable the CloudTrail organization trail?
    a: No. Members can view it with CloudTrail permissions, but cannot change or delete it or turn
      logging on or off.
    trap: true
    facts:
      - organization-members
  - id: cloudtrail-030
    q: A multi-Region CloudTrail organization trail has its home in an opt-in Region. Some members send
      no activity. What must be checked?
    a: Confirm those member accounts enabled the home Region. Without that opt-in they do not send
      activity to this trail.
    trap: true
    facts:
      - organization-opt-in
  - id: cloudtrail-031
    q: A CloudTrail organization trail appears in a member account, but no logs arrive. Does the trail
      copy prove delivery works?
    a: No. Check get-trail-status and destination permissions. Trail copies can exist despite S3,
      CloudWatch Logs or KMS errors.
    trap: true
    facts:
      - organization-status
---
An organization trail applies CloudTrail event collection across an AWS Organizations organization, a group of centrally managed AWS accounts. A delegated administrator is a member account authorized to manage CloudTrail organization resources. [AWS organization trails](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization)

### How it works

1. The management account or a CloudTrail delegated administrator creates the organization trail and chooses the event selection and destinations.
2. For enabled Regions, use a multi-Region trail. The console creates this type; the CLI also supports single-Region trails. If the home Region requires explicit opt-in, each member must enable it before contributing any activity.
3. CloudTrail adds trail copies to member accounts. New members receive the trail and its required service-linked role, an IAM role used by the service, and logging starts automatically.
4. Collect files in S3 under paths containing the organization and account IDs. Optionally add hourly signed digests and CloudWatch Logs delivery. That delivery needs permissions for organization log streams. [File paths](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/get-and-view-cloudtrail-log-files.html#get-and-view-cloudtrail-log-files) · [Organization log permissions](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#policy-cwl-org)
5. Inspect delivery status and destination permissions. The presence of a trail copy does not prove that its bucket or KMS configuration allows delivery.

### Exam cues

- If the question says member administrators must not disable auditing, think organization trail, because members cannot change its logging configuration.
- If the question says new accounts need automatic audit coverage, think organization trail, because CloudTrail adds the trail and service-linked role automatically.
- If the question says some accounts send nothing from a trail based in an opt-in Region, think home Region activation, because members must enable that Region.

### Remember

- An organization trail includes the management account and member accounts, for the selected events.
- Members can view the trail with permission, but cannot stop logging, edit it or delete it.
- `get-trail-status` helps distinguish a visible trail from working delivery.

> **Trap:** Central trail administration does not remove destination permission failures. S3, CloudWatch Logs and KMS errors can still prevent delivery.
