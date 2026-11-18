---
title: AMI controls and recovery exceptions
level: professional
order: 90
facts:
  - id: launch-snapshots
    text: Launching from a shared AMI does not require separately sharing its backing EBS snapshots.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts
  - id: copy-snapshots
    text: Copying a shared EBS-backed AMI requires read permission for its backing snapshots.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#copy-ami-across-accounts
  - id: copy-permissions
    text: AMI copying does not copy the source AMI launch permissions to the target AMI.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html#copy-ami-considerations
  - id: copy-distinct
    text: An AMI copy has a new AMI ID and remains independent of changes to the source AMI.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#how-ami-copy-works
  - id: imagebuilder-distribution
    text: Image Builder cross-account distribution delivers an AMI into destination accounts that can launch or modify it.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist
  - id: imagebuilder-keys
    text: Encrypted Image Builder cross-account distribution requires access to source and destination KMS keys.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: imagebuilder-reencrypt
    text: Image Builder re-encrypts distributed encrypted images using the designated destination Region key.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: approved-launch
    text: Resource-level permissions on ec2:RunInstances can restrict the AMI resources a user may use to launch instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-ec2-console.html#iam-policies-ec2-console
  - id: approved-running
    text: The AWS Config rule approved-amis-by-id marks running EC2 instances NON_COMPLIANT when their AMI is outside the configured list of approved AMI IDs.
    source: https://docs.aws.amazon.com/config/latest/developerguide/approved-amis-by-id.html#approved-amis-by-id
  - id: efa-excluded
    text: Neither simplified automatic recovery nor CloudWatch action based recovery supports instances using an Elastic Fabric Adapter.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#requirements-for-cloudwatch-action-based-recovery
  - id: missing-data
    text: AWS recommends treating missing data as missing and triggering EC2 action alarms only in ALARM state.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
cards:
  - id: ec2-006
    q: A team can launch from a shared EBS-backed EC2 AMI but cannot copy it. Which additional resource permission should it check?
    a: Read permission on the backing EBS snapshots. Launch permission alone does not grant that access for copying.
    facts: [launch-snapshots, copy-snapshots]
    trap: true
  - id: ec2-010
    q: A team copies an EC2 AMI that was shared with several accounts. Does the new AMI retain those launch permissions?
    a: No. Reapply launch permissions to the copy. It has its own AMI ID and is independent of the source image.
    facts: [copy-permissions, copy-distinct]
    trap: true
  - id: ec2-012
    q: A team needs encrypted EC2 images delivered into other accounts through Image Builder. What key access is required?
    a: Access to source and destination KMS keys. Image Builder re-encrypts the distributed image with the designated destination Region key; destination accounts can launch or modify their images.
    facts: [imagebuilder-distribution, imagebuilder-keys, imagebuilder-reencrypt]
  - id: ec2-026
    q: A team must restrict which AMIs a user can use to launch EC2 instances. Which permission should it scope to approved image resources?
    a: ec2:RunInstances in the user's IAM policy. Resource-level permissions can restrict which AMIs the user may launch.
    facts: [approved-launch]
  - id: ec2-027
    q: A team needs to identify running EC2 instances whose AMI IDs are outside its approved list. Which AWS Config rule fits?
    a: approved-amis-by-id. Configure the approved AMI IDs; the rule marks running instances using other images NON_COMPLIANT.
    facts: [approved-running]
  - id: ec2-019
    q: An EC2 workload uses an Elastic Fabric Adapter. Can either simplified automatic recovery or CloudWatch action based recovery restore the instance after a host failure?
    a: No. Both mechanisms exclude instances using EFA.
    facts: [efa-excluded]
    trap: true
  - id: ec2-024
    q: How should missing data be handled for a CloudWatch alarm configured to recover an EC2 instance?
    a: Treat missing data as missing and trigger the action only in ALARM state. AWS recommends this configuration for EC2 action alarms.
    facts: [missing-data]
---
EC2 operations can require control over how Amazon Machine Images (AMIs) are distributed and used, as well as attention to recovery limits. Sharing, copying and distribution have different permission requirements, while recovery depends on the instance configuration and alarm settings.

### How it works

1. [Launching from a shared AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts) does not require separately sharing its backing EBS snapshots. [Copying a shared EBS-backed AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#copy-ami-across-accounts) requires read permission for those snapshots.
2. A copy has a [new AMI ID and is independent of its source](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#how-ami-copy-works). Its [launch permissions are not copied](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html#copy-ami-considerations), so grant them on the new AMI.
3. [Image Builder cross-account distribution](https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist) delivers images that destination accounts can launch or modify. For encrypted images, provide access to the [source and destination KMS keys](https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs); Image Builder re-encrypts with the designated destination Region key.
4. Restrict which AMIs a user can launch with [resource-level permissions for `ec2:RunInstances`](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-ec2-console.html#iam-policies-ec2-console). To identify running instances outside an approved list, configure the AWS Config rule [`approved-amis-by-id`](https://docs.aws.amazon.com/config/latest/developerguide/approved-amis-by-id.html#approved-amis-by-id).
5. Check recovery eligibility: [neither simplified nor CloudWatch action based recovery supports instances using an Elastic Fabric Adapter (EFA)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#requirements-for-cloudwatch-action-based-recovery). For EC2 action alarms, AWS recommends [treating missing data as missing and triggering actions only in `ALARM` state](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions).

### Exam cues

- If the question says a shared AMI launches but cannot be copied, think backing snapshot read permission, because copying needs access that launching does not.
- If the question says encrypted images must reach other accounts through Image Builder, think source and destination KMS key access, because distribution re-encrypts with the destination Region key.
- If the question says restrict launch images, think `ec2:RunInstances` resource permissions, because they can limit the AMIs a user may use.
- If the question says find running instances using unapproved images, think `approved-amis-by-id`, because it compares their AMI IDs with the configured list.
- If the question says an instance uses EFA, think recovery exclusion, because neither recovery mechanism supports it.

### Remember

- Shared AMI launch does not require separate snapshot sharing; copying requires snapshot read permission.
- AMI copies have new IDs and need their own launch permissions.
- For EC2 action alarms, treat missing data as `missing` and trigger actions only in `ALARM` state.

> **Trap:** Permission to launch a shared AMI does not supply the snapshot read permission needed to copy it. A copy also does not inherit the source AMI's launch permissions.
