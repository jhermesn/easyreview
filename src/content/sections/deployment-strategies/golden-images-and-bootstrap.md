---
title: Golden images and bootstrap
level: associate
order: 50
facts:
  - id: ami-template
    text: An AMI contains the software configuration used to launch EC2 instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
  - id: bake
    text: Prebaking embeds application components in an AMI and can reduce instance startup work.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/prebaking-vs.-bootstrapping-amis.html
  - id: bootstrap
    text: Bootstrapping installs or customizes software at instance launch; large downloads and complex
      setup can slow deployment and scaling.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/prebaking-vs.-bootstrapping-amis.html
  - id: combine
    text: Prebaking and bootstrapping can be combined to start instances with software already installed
      and customize them for their environment.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/prebaking-vs.-bootstrapping-amis.html
  - id: image-recipe
    text: An Image Builder recipe selects the base image and build and test components; components
      contain installation, configuration, or test instructions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html
  - id: test-before-distribute
    text: Image Builder distributes an image only after all configured tests succeed.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html
  - id: build-infrastructure
    text: Image Builder launches EC2 instances in the account to customize images and run validation
      tests.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html
  - id: regional-ami
    text: AMIs are Region-specific and can be copied to another Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
  - id: distribution
    text: Image Builder AMI distribution settings can copy images to Regions and grant launch permission
      to accounts, organizations, or organizational units.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html
  - id: parameter-output
    text: Image Builder distribution can write an output AMI ID into a Systems Manager Parameter Store
      parameter.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html
  - id: ami-validation
    text: The Image Builder output parameter data type aws:ec2:image makes Systems Manager validate the
      value as an AMI ID.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html
  - id: template-output
    text: Image Builder distribution can create a launch template version for the output AMI;
      setDefaultVersion defaults to true.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/dist-using-launch-template.html
  - id: schedule-condition
    text: The Image Builder schedule start condition defaults to
      EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE; EXPRESSION_MATCH_ONLY builds at every
      matching schedule time.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html
  - id: parameter-dependency
    text: When an Image Builder recipe selects its base through a Parameter Store parameter, a changed
      parameter value counts as a dependency update.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html
  - id: schedule-evaluation
    text: An Image Builder schedule determines when the pipeline evaluates whether its start condition
      is satisfied.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html
  - id: refresh-separate
    text: To update existing instances with a new AMI, create or update a launch template and start a
      rolling instance refresh.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-how-it-works
  - id: refresh-options
    text: Rolling instance refresh supports instance warmup, checkpoints, and optional rollback.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-how-it-works
  - id: user-data-limit
    text: EC2 user data is limited to 16 KB before base64 encoding and is not included when an AMI is created
      from an instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
  - id: bootstrap-permissions
    text: Linux user data scripts that call AWS APIs need an instance profile with permissions for those calls;
      cloud-init output is recorded in /var/log/cloud-init-output.log.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts
  - id: ami-share-encryption
    text: Sharing an encrypted AMI requires access to its KMS key; AMIs backed by snapshots encrypted with the
      default AWS managed key cannot be shared. Referenced snapshots need not be shared for instance launch.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#considerations-for-sharing-AMI-with-accounts
  - id: cross-account-copy
    text: Image Builder cross-account AMI copying requires EC2ImageBuilderDistributionCrossAccountRole in each
      destination account, a managed distribution policy, and trust for the source account.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-prereqs-iam
  - id: cross-account-encryption
    text: For encrypted Image Builder cross-account copies, destination roles need KMS permissions and source
      key policies must allow destination accounts to use the keys in the source and destination Regions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: distribution-retry
    text: After a distribution-phase failure, Image Builder can retry distribution without rebuilding the image.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist-prereqs
  - id: build-failure
    text: Image Builder terminates build or test instances on failure by default; infrastructure configuration
      can retain them for troubleshooting.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/troubleshooting.html#troubleshooting-pipelines
  - id: encrypt-ami
    text: To get an encrypted AMI from an unencrypted one, copy it with encryption turned on and a KMS key; the copy's snapshots are encrypted.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html
  - id: instance-metadata
    text: Instance metadata is data about a running EC2 instance, such as its ID and type, that software on the instance can read; it is not the launch script, which is user data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
  - id: user-data
    text: EC2 user data can run configuration scripts at launch; Linux user data scripts and cloud-init
      directives run on first launch by default.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts
diagrams:
  - id: image-builder-bake-and-roll
    title: Bake, distribute and roll out a golden AMI
    width: 1025
    height: 495
    nodes:
      - id: base
        label: Base image
        sub: AMI or SSM parameter
        icon: res-ec2-ami
        x: 25
        y: 60
        w: 150
        h: 86
        tone: compute
        info: The image recipe selects a parent AMI directly or through a Systems Manager parameter. A
          changed parameter value can count as a dependency update at schedule evaluation.
      - id: ib
        label: Image Builder
        sub: recipe + tests
        icon: ec2-image-builder
        x: 288
        y: 60
        w: 150
        h: 86
        tone: compute
        info: Build and test components customize and validate the image. Configured tests must pass before
          Image Builder distributes it.
      - id: ami
        label: New AMI
        sub: tested, versioned
        icon: res-ec2-ami
        x: 550
        y: 60
        w: 150
        h: 86
        tone: compute
        info: Owned by the build account. AMIs are **regional**.
      - id: dist
        label: Distribution
        sub: Regions + accounts
        icon: ec2-image-builder
        x: 813
        y: 60
        w: 150
        h: 86
        tone: compute
        info: Distribution can copy AMIs to Regions, grant launch permissions to accounts or organizational
          groups, and publish AMI IDs or launch template versions.
      - id: ssm
        label: Parameter Store
        sub: latest AMI ID
        icon: res-systems-manager-parameter-store
        x: 813
        y: 330
        w: 150
        h: 86
        tone: mgmt
        info: Data type `aws:ec2:image` makes Systems Manager validate the value as an AMI ID. Consumers
          read this parameter.
      - id: lt
        label: Launch template
        sub: new version
        icon: ec2
        x: 550
        y: 330
        w: 150
        h: 86
        tone: compute
        info: Distribution adds a launch template version with the new AMI ID. It becomes the **default
          version** unless `setDefaultVersion` is false.
      - id: asg
        label: Auto Scaling
        sub: instance refresh
        icon: res-ec2-auto-scaling
        x: 275
        y: 330
        w: 160
        h: 86
        tone: compute
        info: A rolling instance refresh replaces existing instances in batches. Warmup and checkpoints
          support rollout validation; optional rollback has launch-template restrictions.
    edges:
      - from: base
        to: ib
        step: 1
      - from: ib
        to: ami
        step: 2
      - from: ami
        to: dist
        step: 3
      - from: dist
        to: ssm
        step: 4
      - from: dist
        to: lt
        step: 5
      - from: lt
        to: asg
        step: 6
        dashed: true
    steps:
      - Start the pipeline on demand or evaluate its schedule. The dependency-update condition can
        skip a scheduled build when dependencies have not changed.
      - Image Builder uses the recipe and components to build and test an image on EC2
        infrastructure.
      - Only distribute the output image after all configured tests succeed.
      - Distribution copies or shares the AMI and can publish its ID to a Parameter Store parameter.
      - Distribution can create a launch template version referencing the new AMI; setDefaultVersion
        defaults to true.
      - Start a rolling instance refresh to replace running instances. Image publication alone does
        not refresh the fleet.
cards:
  - id: deployment-strategies-008
    q: When should an EC2 deployment combine a prebaked AMI with launch-time bootstrapping?
    a: Prebake application components to reduce launch work, then bootstrap environment-specific
      customization. Complex setup and large downloads at launch can slow deployment or scaling.
    facts:
      - bake
      - bootstrap
      - combine
  - id: deployment-strategies-025
    q: An EC2 Auto Scaling fleet starts slowly because every new instance downloads large dependencies.
      Which deployment preparation helps?
    a: Prebake those application components into an AMI, then use launch-time bootstrapping only for the
      remaining customization.
    facts:
      - bake
      - bootstrap
      - combine
  - id: deployment-strategies-026
    q: Image Builder published a new AMI and launch template version, but existing Auto Scaling
      instances still use the old software. What rollout step is missing?
    a: Start an instance refresh using the desired launch configuration. Publishing the image and
      template version alone does not replace existing instances.
    facts:
      - template-output
      - refresh-separate
  - id: deployment-strategies-027
    q: "An EC2 Auto Scaling fleet needs a new application version using immutable instances. How should the team roll it out?"
    a: "Build a new AMI, update the launch template, and start an instance refresh to replace existing instances."
    facts: [ami-template, refresh-separate]
  - id: deployment-strategies-028
    q: "An EC2 fleet takes too long to scale because every instance downloads application software at launch. What image strategy helps?"
    a: "Prebake the application components into an AMI to reduce startup work."
    facts: [bake, bootstrap]
  - id: deployment-strategies-030
    q: An administrator creates an EC2 AMI from an instance whose user data configures the application. Will
      instances launched from that AMI inherit the user data?
    a: No. User data is an instance attribute and is not included in the AMI. Supply it when launching, within
      the 16 KB raw limit.
    trap: true
    facts:
      - user-data-limit
  - id: deployment-strategies-031
    q: An EC2 Linux user data script calls an AWS API and fails during boot. Where should an operator check
      permissions and output?
    a: Check the instance profile role's API permissions and /var/log/cloud-init-output.log for script output.
    facts:
      - bootstrap-permissions
  - id: deployment-strategies-032
    q: An encrypted EC2 AMI must be shared with another account for instance launches. What must be shared?
    a: Grant AMI launch permission and access to its customer managed KMS key. The referenced snapshots need not
      be separately shared for launch; the default AWS managed key cannot be used for a shared AMI.
    facts:
      - ami-share-encryption
  - id: deployment-strategies-033
    q: "A team needs the same tested EC2 image available in multiple AWS Regions. How can Image Builder support an immutable deployment?"
    a: "Distribute copies of the AMI to the required Regions, then launch instances from those images."
    facts: [distribution, ami-template]
  - id: deployment-strategies-034
    q: "A team publishes a new AMI for its EC2 Auto Scaling group. Does publishing the image replace running instances?"
    a: "No. Update the launch template and start an instance refresh to replace the existing instances."
    trap: true
    facts: [refresh-separate]
  - id: deployment-strategies-035
    q: "An EC2 team wants fast instance startup and environment-specific configuration. How can it combine image and launch strategies?"
    a: "Prebake common software into the AMI and use bootstrapping for environment-specific customization."
    facts: [combine]
  - id: deployment-strategies-037
    q: "An EC2 Image Builder pipeline must prevent an image from being distributed when validation fails. What should the team configure?"
    a: "Configure image tests. Image Builder distributes the image only after all configured tests succeed."
    facts: [test-before-distribute]
  - id: deployment-strategies-042
    q: How does a team turn an existing unencrypted AMI into an encrypted one?
    a: Copy the AMI with encryption on and a KMS key; the new AMI's snapshots are encrypted.
    facts: [encrypt-ami]
  - id: deployment-strategies-041
    q: A company wants each EC2 instance to install software automatically at first launch. Should it use instance metadata or user data?
    a: User data, which runs scripts at launch. Instance metadata only describes the running instance.
    trap: true
    facts: [instance-metadata, user-data]
---

A golden AMI is a reusable EC2 launch image prepared with the software and settings an application needs. Prebaking puts application components into that image. Bootstrapping runs installation or configuration when an instance starts. AWS deployment guidance recommends combining the two when instances need both quick startup and environment-specific customization.

### How it works

1. Define an Image Builder recipe, the base image plus build and test components. A component is a set of installation, configuration, or testing instructions. The parent image can come from a Systems Manager parameter, which stores a named configuration value.
2. Start the pipeline on demand or evaluate its schedule. With the default dependency-update condition, a scheduled run builds only when matching dependencies have changed. A changed base-image parameter counts as such an update.
3. Image Builder launches EC2 infrastructure, applies the recipe, and runs tests. It distributes the image only when all configured tests succeed.
4. Distribution can copy the AMI to Regions, grant launch permissions to accounts or organizational groups, write its ID to Parameter Store, and create a launch template version. A launch template stores settings for new EC2 instances.
5. Start a rolling instance refresh to apply the new launch configuration to existing fleet instances. Use warmup, checkpoints, and supported rollback settings to control replacement. Keep remaining environment customization in bootstrap logic such as user data, the startup configuration supplied to EC2.
6. For cross-account AMI copies, create the Image Builder distribution role in each destination with its managed policy and trust for the source. Encrypted copies also need destination role KMS permissions and key policies that permit destination access in the source and destination Regions. A distribution-phase failure can be retried without rebuilding.

### Exam cues

- If the question says large downloads delay EC2 scaling, think prebaking, because the software is installed before instances launch.
- If the question says a new Image Builder AMI must reach an existing fleet, think launch template plus instance refresh, because image publication and fleet replacement are separate operations.
- If the question says publish the tested AMI for later infrastructure deployment, think an output Parameter Store value or launch template version, because distribution can expose the image identifier to consumers.
- If an account only needs to launch a shared encrypted AMI, grant launch and KMS key access; its snapshots do not need separate sharing for launch. An AMI encrypted with the default AWS managed key cannot be shared.
- If a Linux bootstrap script calls AWS APIs, use an instance profile with the required permissions and inspect `/var/log/cloud-init-output.log` for output.
- If Image Builder build diagnosis needs the failed instance, turn off termination on failure in the infrastructure configuration.

### Remember

- AMIs are Region-specific. Copy them for use in another Region.
- Output parameter data type aws:ec2:image validates the AMI ID.
- Image Builder launch-template setDefaultVersion defaults to true.
- The schedule defaults to EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE; EXPRESSION_MATCH_ONLY builds at every matching time.
- Linux user data runs on first launch by default.
- User data is limited to 16 KB before encoding and is not included in an AMI created from the instance.

> **Trap:** Publishing a new AMI and launch template version does not update existing instances. Start an instance refresh to replace them.
