---
title: Cross-account and Region distribution
level: professional
order: 40
facts:
  - id: distribution-targets
    text: AMI distribution settings can copy images to other Regions and target accounts or grant launch
      permission to accounts, organizations and organizational units.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#create-ami-distribution-config
  - id: sharing-scope
    text: AMI launch sharing retains ownership, permits launching rather than modifying the shared AMI,
      and is limited to the AMI Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#sharingamis-explicit
  - id: copied-ownership
    text: Cross-account Image Builder distribution delivers an AMI that the destination account can
      launch or modify.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist
  - id: destination-role
    text: Each destination account needs EC2ImageBuilderDistributionCrossAccountRole with the
      Ec2ImageBuilderCrossAccountDistributionAccess managed policy and trust for the source account.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: regional-keys
    text: For encrypted cross-account distribution, destination permissions must allow use of keys in
      the source and destination Regions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: key-policy
    text: Encrypted cross-account distribution requires source KMS key policies granting destination
      access and an inline KMS policy on the destination distribution role.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: default-key-sharing
    text: An AMI backed by snapshots encrypted with the default AWS managed key cannot be shared across
      accounts.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#sharingamis-explicit
  - id: encryption-placement
    text: The recipe block-device mapping encrypts the original source AMI; distribution KMS settings
      apply to copies sent to other accounts or Regions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#create-ami-distribution-config
  - id: ram-resources
    text: AWS RAM shares Image Builder components, images and recipes with accounts, organizations or
      organizational units.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-shared-resources.html#manage-shared-resources
  - id: ram-region
    text: RAM sharing of Image Builder resources is limited to their creation Region and does not
      replicate them to other Regions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-shared-resources.html#share-ib-resources-owners
  - id: ram-consumers
    text: Consumers can use shared Image Builder resources but cannot modify them.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-shared-resources.html#share-ib-resources-comsumers
  - id: output-integrations
    text: AMI distribution can create launch template versions and store output AMI IDs in Parameter
      Store.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#create-ami-distribution-config
  - id: container-delivery
    text: Container distribution settings identify destination ECR repositories.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/start-build-container-pipeline.html#start-build-container-pipeline
diagrams:
  - id: ib-account-copy
    title: Encrypted cross-account AMI distribution
    width: 800
    height: 260
    groups:
      - label: Source account / Region
        x: 10
        y: 10
        w: 350
        h: 240
        tone: mgmt
        icon: group-aws-account
      - label: Target account / Region
        x: 440
        y: 10
        w: 350
        h: 240
        tone: mgmt
        icon: group-aws-account
    nodes:
      - id: source
        label: Source AMI
        sub: Key permits target
        icon: res-ec2-ami
        x: 70
        y: 100
        w: 230
        h: 86
        tone: compute
        info: The source key policy must allow destination access.
      - id: target
        label: Target AMI
        sub: Distribution role + key
        icon: res-ec2-ami
        x: 500
        y: 100
        w: 230
        h: 86
        tone: compute
        info: The destination distribution role needs source-account trust and permissions to use both
          Region keys.
    edges:
      - from: source
        to: target
        step: 1
        label: copy
    steps:
      - Image Builder copies the AMI using the destination distribution role and re-encrypts it with
        the designated target Region key.
cards:
  - id: ec2-image-builder-005
    q: What delivery and output options can EC2 Image Builder distribution configure?
    a: "For AMIs: Region and account copies, launch permissions, encryption, launch template versions
      and Parameter Store AMI-ID outputs. Container distribution identifies ECR repositories."
    facts:
      - distribution-targets
      - output-integrations
      - container-delivery
  - id: ec2-image-builder-010
    q: EC2 Image Builder must copy an encrypted AMI to another account. Which permissions and encryption
      setup are required?
    a: Use a shareable customer managed key with destination access in its policy. Configure
      EC2ImageBuilderDistributionCrossAccountRole, its managed distribution policy, source-account
      trust and KMS permissions for source and destination keys.
    trap: true
    facts:
      - destination-role
      - regional-keys
      - key-policy
      - default-key-sharing
  - id: ec2-image-builder-019
    q: A platform team wants other accounts to reuse an EC2 Image Builder recipe without maintaining
      their own copies. Which sharing feature fits?
    a: Create an AWS RAM resource share for the recipe in its Region. Consumers can use the shared
      recipe but cannot modify it.
    facts:
      - ram-resources
      - ram-region
      - ram-consumers
  - id: ec2-image-builder-020
    q: A team shares an Image Builder component through AWS RAM and expects it to appear in another
      Region. What must it change?
    a: Provide the resource in the required Region. AWS RAM sharing does not replicate Image Builder
      resources across Regions.
    trap: true
    facts:
      - ram-region
  - id: ec2-image-builder-021
    q: An account must own and modify an AMI produced by EC2 Image Builder. Should the producer only
      grant launch permission?
    a: Use cross-account distribution to deliver a copy. Launch sharing permits launches but does not
      transfer ownership or allow modification of the shared AMI.
    trap: true
    facts:
      - copied-ownership
      - sharing-scope
---
Image Builder distribution delivers an image to selected accounts and Regions. Copying an AMI lets the destination account manage its copy. Launch sharing lets another account launch the owner's AMI. An organizational unit (OU) is a group of accounts within AWS Organizations.

### How it works

1. Choose Region and account targets, or grant AMI launch permissions to accounts, organizations or OUs. AMI launch sharing is Regional and retains the owner's control.
2. For account copies, create `EC2ImageBuilderDistributionCrossAccountRole` in each destination account. Attach `Ec2ImageBuilderCrossAccountDistributionAccess` and configure trust, which names the source account allowed to assume the role.
3. For encrypted copies, grant access through both KMS key policies and the destination role's KMS permissions. The destination needs access to source and destination Region keys.
4. Set encryption for the original AMI in the recipe's block-device mapping, which defines its disks. Distribution KMS settings encrypt copies sent to other accounts or Regions.
5. To reuse build definitions, use an AWS RAM resource share. It can share components, Image Builder images and recipes. Consumers can use them but cannot modify them or obtain cross-Region replication through the share.

| Requirement | Mechanism | Result |
|---|---|---|
| Launch another account's AMI | AMI launch permission | Owner retains the AMI |
| Own and modify a delivered AMI | Cross-account distribution | Destination manages its copy |
| Reuse a recipe or component | AWS RAM resource share | Consumers use the shared resource in its Region |

### Exam cues

- If the question says each account must own its AMI, think cross-account distribution, because the destination receives a copy it can modify.
- If the question says reuse centrally maintained recipes, think AWS RAM, because recipes and components are shareable resources.
- If the question says encrypted AMI distribution fails, think destination role and KMS access, because both identity permissions and key policies must permit the operation.

### Remember

- Destination role: `EC2ImageBuilderDistributionCrossAccountRole`.
- Destination managed policy: `Ec2ImageBuilderCrossAccountDistributionAccess`.
- AWS RAM sharing does not replicate Image Builder resources across Regions.

> **Trap:** Launch permission does not grant access to an encryption key. AMIs encrypted with the default AWS managed key cannot be shared across accounts.
