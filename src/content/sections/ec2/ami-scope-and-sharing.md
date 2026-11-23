---
title: AMI scope and sharing
level: associate
order: 10
facts:
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
  - id: copy-creates-snapshots
    text: "Copying an EBS-backed AMI to another Region creates copies of its backing snapshots there, billed as additional snapshot storage."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html#copy-ami-costs
  - id: ami-bpa-default
    text: "Block public access for AMIs is on by default for new accounts and for existing accounts that never had public AMIs; it is off by default for accounts that had public AMIs."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/block-public-access-to-amis.html#block-public-access-to-amis-default-settings
  - id: ami-bpa-existing
    text: "Turning on block public access for AMIs stops new attempts to make an AMI public, but AMIs that are already public stay public."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/block-public-access-to-amis.html#block-public-access-to-amis
  - id: ami-org-share
    text: "An AMI can be shared with a whole AWS organization or with organizational units instead of listing account IDs."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/share-amis-with-organizations-and-OUs.html#share-amis-with-organizations-and-OUs
  - id: paid-ami
    text: "An instance launched from a paid AMI is charged at the rate the AMI owner sets plus the standard EC2 usage fees; AWS Marketplace is where such software is sold."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/paid-amis.html
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
  - id: ec2-007
    q: An EC2 AMI uses EBS snapshots encrypted with aws/ebs. How can its owner make an image available to another account?
    a: Copy the AMI using a customer managed KMS key, then share the copy and grant the recipient key access. The default AWS managed key cannot support this sharing.
    facts: [managed-key-block, customer-key, managed-key, copy-encryption, encrypted-access]
    trap: true
  - id: ec2-008
    q: A team must relocate an EC2 instance to another Availability Zone in its current Region. What image-based procedure fits?
    a: Create an AMI and launch a replacement in a subnet in the destination zone. AWSSupport-CopyEC2Instance can automate this. Update references to changed IP addresses.
    facts: [az-replacement, subnet-zone, az-addresses]
  - id: ec2-011
    q: Can EC2 CopyImage turn an encrypted EBS-backed AMI into an unencrypted AMI?
    a: No. Copying can encrypt or re-encrypt the backing snapshots, but cannot remove their encryption.
    facts: [no-decryption, copy-encryption]
    trap: true
  - id: ec2-082
    q: "An AMI made from a snapshot in Region A is copied to Region B, and one instance is launched from it in Region B. What exists in Region B?"
    a: "One instance, one AMI and one snapshot. Copying an EBS-backed AMI also copies its backing snapshot into the destination Region."
    facts: [copy-creates-snapshots]
  - id: ec2-099
    q: Does copying an EC2 AMI also copy its launch permissions to the new AMI?
    a: No. AMI copying does not copy the source AMI launch permissions.
    facts: [copy-permissions]
  - id: ec2-104
    q: What happens to EC2 AMIs that are already public when block public access for AMIs is turned on?
    a: They stay public. The setting blocks new attempts to make an AMI public.
    facts: [ami-bpa-existing]
  - id: ec2-123
    q: "A team launches EC2 instances from an AWS Marketplace AMI that includes commercial software. What does it pay?"
    a: "The software rate set by the AMI owner plus the standard EC2 usage fees."
    facts: [paid-ami]
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
revised:
  - date: 2026-11-23
    note: The card now covers launch permissions when copying an AMI.
    cards: [ec2-099]
  - date: 2026-11-23
    note: The card now covers existing public AMIs after block public access is enabled.
    cards: [ec2-104]
---
An Amazon Machine Image (AMI) is a software template for setting up and booting EC2 instances. Sharing lets another account launch from your template; copying creates a separate image. An EBS-backed AMI uses EBS snapshots, point-in-time backups of disk volumes.

### How it works

1. Select an AMI in the launch Region that supports the chosen instance type, the instance's hardware configuration. A Region is a separate geographic area containing isolated locations called Availability Zones.
2. To let another account launch from your AMI, grant it launch permission. The source AMI remains yours.
3. For encrypted snapshots, grant access to their KMS encryption keys too. Use a customer managed key, which you create and control. An AWS managed key, whose permissions AWS controls, cannot support cross-account AMI sharing.
4. To give the recipient its own image, let it copy the shared AMI.
5. For another Region, copy the AMI there and set launch permissions on the copy. Copying does not carry over those permissions. To select a different encryption key for the copy, set `Encrypted` and `KmsKeyId` on `CopyImage`.
6. For another Availability Zone in the same Region, create an AMI and launch a replacement in the destination subnet. A subnet is a range of addresses in your virtual private cloud (VPC) within one zone. `AWSSupport-CopyEC2Instance` automates this procedure. Update references to changed addresses.

| Requirement | Mechanism | Ownership or scope |
|---|---|---|
| Another account needs to launch | Share the AMI and any required encryption keys | Source account owns the image |
| Another account needs its own image | Copy the shared AMI | Recipient owns the copy |
| Instances must run in another Region | Copy the AMI into that Region | Launch from the destination image |
| Instance must run in another zone | Launch a replacement from an AMI in the destination subnet | New instance and changed addresses |

### Exam cues

- If the question says an encrypted shared AMI cannot launch, think KMS key access, because image permission alone does not authorize use of the encryption keys.
- If the question says relocate an instance to another Availability Zone, think an AMI and a replacement launch, because the target subnet determines the zone.

### Remember

- AMIs are Regional; sharing does not extend their launch scope.
- The source account pays for shared-image storage; the recipient owns an AMI it copies.
- `aws/ebs` is an AWS managed key. An AMI encrypted with the default AWS managed key cannot be shared.
- Copies need their own launch permissions. Encrypted snapshots cannot become unencrypted through copying.
- Paid AMIs: the owner's software rate plus standard EC2 fees.

> **Trap:** A shared AMI is permission to use the owner's image. It does not create an image owned by the recipient.
