---
title: AMI scope and sharing
level: associate
order: 10
facts:
  - id: ami-template
    text: An Amazon Machine Image (AMI) supplies the software used to set up and boot an EC2 instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
  - id: compatible-type
    text: An AMI must be compatible with the instance type selected for launch.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
  - id: instance-type
    text: An EC2 instance type determines the host hardware configuration used for an instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#instance-types
  - id: region-and-zone
    text: An AWS Region is a separate geographic area containing isolated locations called Availability Zones.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html#aws-regions-availability-zones
  - id: regional
    text: An AMI can launch instances only in its own AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html
  - id: share-launch
    text: Sharing an AMI grants another account launch permission without transferring ownership of the source AMI.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts
  - id: share-storage
    text: The source account continues paying for the storage of a shared AMI.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#copy-ami-across-accounts
  - id: launch-snapshots
    text: Launching from a shared AMI does not require separately sharing its backing EBS snapshots.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts
  - id: copy-snapshots
    text: Copying a shared EBS-backed AMI requires read permission for its backing snapshots.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#copy-ami-across-accounts
  - id: encrypted-access
    text: A recipient of an encrypted AMI needs permission to use the KMS keys that encrypt its backing snapshots.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts
  - id: managed-key-block
    text: An AMI backed by snapshots encrypted with the default AWS managed key cannot be shared.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts
  - id: customer-key
    text: A customer managed key is a KMS key that the customer creates and controls.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-mgn-key
  - id: managed-key
    text: AWS manages the lifecycle and permissions of an AWS managed KMS key such as aws/ebs.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-key
  - id: copy-owned
    text: Copying a shared AMI creates a target AMI owned by the recipient account.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#copy-ami-across-accounts
  - id: copy-distinct
    text: An AMI copy has a new AMI ID and remains independent of changes to the source AMI.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#how-ami-copy-works
  - id: cross-region
    text: To share an AMI in another Region, copy it to that Region and share the copy there.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts
  - id: copy-permissions
    text: AMI copying does not copy the source AMI launch permissions to the target AMI.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html#copy-ami-considerations
  - id: copy-encryption
    text: Setting Encrypted and KmsKeyId on CopyImage encrypts the target EBS snapshots with the specified KMS key.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIEncryption.html#AMI-encryption-copy
  - id: no-decryption
    text: An encrypted AMI snapshot cannot become unencrypted through AMI copying.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ami-copy-works.html#ami-copy-encryption
  - id: imagebuilder-distribution
    text: Image Builder cross-account distribution delivers an AMI into destination accounts that can launch or modify it.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist
  - id: imagebuilder-keys
    text: Encrypted Image Builder cross-account distribution requires access to source and destination KMS keys.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: imagebuilder-reencrypt
    text: Image Builder re-encrypts distributed encrypted images using the designated destination Region key.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: subnet-zone
    text: A subnet is an IP address range in a VPC that lies entirely within one Availability Zone.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics
  - id: az-replacement
    text: AWSSupport-CopyEC2Instance can create an AMI and launch a new instance in a specified subnet to relocate an instance to another Availability Zone.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-awssupport-copyec2instance.html#automation-awssupport-copyec2instance
  - id: az-addresses
    text: The replacement created by AWSSupport-CopyEC2Instance gets different private IPv4 or public IPv6 addresses and requires references to the old addresses to be updated.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-awssupport-copyec2instance.html#automation-awssupport-copyec2instance
  - id: snapshot
    text: An EBS snapshot is a point-in-time backup of an EBS volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: ebs-backed-image
    text: An EBS-backed AMI uses EBS snapshots for its disk image data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIEncryption.html#AMIEncryption
  - id: approved-launch
    text: Resource-level permissions on ec2:RunInstances can restrict the AMI resources a user may use to launch instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-ec2-console.html#iam-policies-ec2-console
  - id: approved-running
    text: The AWS Config rule approved-amis-by-id marks running EC2 instances NON_COMPLIANT when their AMI is outside the configured list of approved AMI IDs.
    source: https://docs.aws.amazon.com/config/latest/developerguide/approved-amis-by-id.html#approved-amis-by-id
cards:
  - id: ec2-004
    q: Does sharing an EC2 AMI create a copy owned by the recipient account?
    a: No. It grants launch permission; the source account retains ownership and storage charges. Copying the AMI creates a recipient-owned image.
    trap: true
    facts: [share-launch, share-storage, copy-owned]
  - id: ec2-005
    q: An EC2 AMI is shared with an account that needs instances in another Region. What must happen before launch?
    a: Copy the AMI to the destination Region and grant launch permission there. Sharing the source image does not make it available in another Region.
    trap: true
    facts: [regional, cross-region, copy-permissions]
  - id: ec2-006
    q: A team can launch from a shared EBS-backed EC2 AMI but cannot copy it. Which additional resource permission should it check?
    a: Read permission on the backing EBS snapshots. Launch permission alone does not grant that access for copying.
    facts: [launch-snapshots, copy-snapshots]
    trap: true
  - id: ec2-007
    q: An EC2 AMI uses EBS snapshots encrypted with aws/ebs. How can its owner make an image available to another account?
    a: Copy the AMI using a customer managed KMS key, then share the copy and grant the recipient key access. The default AWS managed key cannot support this sharing.
    facts: [managed-key-block, customer-key, managed-key, copy-encryption, encrypted-access]
    trap: true
  - id: ec2-008
    q: A team must relocate an EC2 instance to another Availability Zone in its current Region. What image-based procedure fits?
    a: Create an AMI and launch a replacement in a subnet in the destination zone. AWSSupport-CopyEC2Instance can automate this. Update references to changed IP addresses.
    facts: [az-replacement, subnet-zone, az-addresses]
  - id: ec2-009
    q: What does an EC2 AMI provide, and what compatibility must a launch satisfy?
    a: The software to set up and boot an instance. The AMI must support the chosen instance type.
    facts: [ami-template, compatible-type]
  - id: ec2-010
    q: A team copies an EC2 AMI that was shared with several accounts. Does the new AMI retain those launch permissions?
    a: No. Reapply launch permissions to the copy. It has its own AMI ID and is independent of the source image.
    facts: [copy-permissions, copy-distinct]
    trap: true
  - id: ec2-011
    q: Can EC2 CopyImage turn an encrypted EBS-backed AMI into an unencrypted AMI?
    a: No. Copying can encrypt or re-encrypt the backing snapshots, but cannot remove their encryption.
    facts: [no-decryption, copy-encryption]
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
diagrams:
  - id: ec2-ami-zone-replacement
    title: Relocate within a Region by launching from an AMI
    width: 840
    height: 260
    groups:
      - { label: Source zone, x: 10, y: 50, w: 240, h: 190, tone: compute }
      - { label: Destination zone, x: 590, y: 50, w: 240, h: 190, tone: compute }
    nodes:
      - { id: source, label: Source instance, icon: res-ec2-instance, sub: current subnet, x: 20, y: 110, w: 220, h: 86, tone: compute }
      - { id: image, label: Regional AMI, icon: res-ec2-ami, sub: instance software, x: 310, y: 110, w: 220, h: 86, tone: compute }
      - { id: target, label: New instance, icon: res-ec2-instance, sub: destination subnet, x: 600, y: 110, w: 220, h: 86, tone: compute }
    edges:
      - { from: source, to: image, step: 1 }
      - { from: image, to: target, step: 2 }
    steps:
      - Create an AMI from the source instance.
      - Launch a new instance in the destination subnet and update references to changed addresses.
---
An Amazon Machine Image (AMI) is a software template for setting up and booting EC2 instances. Sharing lets another account launch from your template; copying creates a separate image. An EBS-backed AMI uses EBS snapshots, point-in-time backups of disk volumes.

### How it works

1. Select an AMI in the launch Region that supports the chosen instance type, the instance's hardware configuration. A Region is a separate geographic area containing isolated locations called Availability Zones.
2. To let another account launch from your AMI, grant it launch permission. The source AMI remains yours. Launching does not require separate snapshot-sharing permissions.
3. For encrypted snapshots, grant access to their KMS encryption keys too. Use a customer managed key, which you create and control. An AWS managed key, whose permissions AWS controls, cannot support cross-account AMI sharing.
4. To give the recipient its own image, also grant read access to the backing snapshots and let it copy the AMI. The copy gets a new ID. Image Builder cross-account distribution can deliver images into destination accounts; encrypted distribution needs access to both source and destination keys.
5. For another Region, copy the AMI there and set launch permissions on the copy. Copying does not carry over those permissions. To select a different encryption key for the copy, set `Encrypted` and `KmsKeyId` on `CopyImage`.
6. For another Availability Zone in the same Region, create an AMI and launch a replacement in the destination subnet. A subnet is a range of addresses in your virtual private cloud (VPC) within one zone. `AWSSupport-CopyEC2Instance` automates this procedure. Update references to changed addresses.

| Requirement | Mechanism | Ownership or scope |
|---|---|---|
| Another account needs to launch | Share the AMI and any required encryption keys | Source account owns the image |
| Another account needs its own image | Copy the shared AMI with backing-storage access | Recipient owns the copy |
| Instances must run in another Region | Copy the AMI into that Region | Launch from the destination image |
| Instance must run in another zone | Launch a replacement from an AMI in the destination subnet | New instance and changed addresses |

To restrict which images a user can launch, scope `ec2:RunInstances` permissions in an IAM policy to approved AMI resources. To find running instances using other images, configure AWS Config's `approved-amis-by-id` rule with the approved image IDs. It marks running instances outside that list `NON_COMPLIANT`.

### Exam cues

- If the question says launch succeeds but copying a shared AMI fails, think snapshot read permission, because launching and copying have different backing-storage access requirements.
- If the question says an encrypted shared AMI cannot launch, think KMS key access, because image permission alone does not authorize use of the encryption keys.
- If the question says relocate an instance to another Availability Zone, think an AMI and a replacement launch, because the target subnet determines the zone.
- If the question says identify running instances using unapproved images, think `approved-amis-by-id`, because the rule compares their AMI IDs with the configured list.

### Remember

- AMIs are Regional; sharing does not extend their launch scope.
- The source account pays for shared-image storage; the recipient owns an AMI it copies.
- `aws/ebs` is an AWS managed key. An AMI encrypted with the default AWS managed key cannot be shared.
- Copies need their own launch permissions. Encrypted snapshots cannot become unencrypted through copying.

> **Trap:** A shared AMI is permission to use the owner's image. It does not create an image owned by the recipient. Copying requires backing-snapshot read access as well as any required KMS key access.
