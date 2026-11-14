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
  - id: user-data
    text: EC2 user data can run configuration scripts at launch; Linux user data scripts and cloud-init
      directives run on first launch by default.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts
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
  - id: rollback-versions
    text: Instance refresh rollback requires a desired configuration and an explicit numbered previous
      launch template version; $Latest, $Default, and Parameter Store AMI aliases are not supported.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html
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
  - id: parameter-permissions
    text: Image Builder output parameters require ssm:PutParameter on the execution role and ec2:DescribeImages
      for aws:ec2:image validation; the source account must enable a targeted opt-in Region for parameter writes.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#ami-distribution-prereqs-ssm-param
  - id: build-failure
    text: Image Builder terminates build or test instances on failure by default; infrastructure configuration
      can retain them for troubleshooting.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/troubleshooting.html#troubleshooting-pipelines
  - id: build-ssm
    text: Image Builder build and test instances must reach Systems Manager. Image Builder uses Run Command
      and requires an instance profile with permissions for the build and test components.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/set-up-ib-env.html#prereq-config
  - id: build-logs
    text: If Image Builder writes build logs to an S3 bucket, its instance profile needs s3:PutObject for that
      bucket.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/set-up-ib-env.html#image-builder-IAM-prereq
  - id: ami-scan-release
    text: Image Builder added on-demand AMI scanning with Amazon Inspector in October 2026.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/doc-history.html
  - id: ami-scan-gate
    text: On-demand AMI scanning does not require Inspector account activation. A scan result condition makes
      Image Builder wait and fail the image for findings above the allowed severity; without one, it can distribute
      before the scan finishes.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/integ-inspector.html#integ-inspector-ami-scan
  - id: instance-metadata
    text: Instance metadata is data about a running EC2 instance, such as its ID and type, that software on the instance can read; it is not the launch script, which is user data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
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
    q: What does Image Builder setDefaultVersion do when AMI distribution creates a launch template
      version?
    a: It controls whether the new launch template version becomes default. It defaults to true; false
      creates a version without changing the default.
    facts:
      - template-output
  - id: deployment-strategies-028
    q: Does changing a Parameter Store base-image parameter instantly trigger an Image Builder scheduled
      build?
    a: No. It counts as a dependency update when the pipeline evaluates its scheduled start condition.
    trap: true
    facts:
      - parameter-dependency
      - schedule-evaluation
  - id: deployment-strategies-029
    q: An Auto Scaling instance refresh needs rollback, but the group uses $Latest or an AMI alias from
      Parameter Store. What must the release plan change?
    a: Use a supported explicit numbered launch template version and specify a desired configuration.
      Instance refresh rollback does not support $Latest, $Default, or Parameter Store AMI aliases.
    trap: true
    facts:
      - rollback-versions
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
    q: An Image Builder pipeline must copy an AMI into another AWS account. What role is required in the target?
    a: EC2ImageBuilderDistributionCrossAccountRole, with the managed cross-account distribution policy and
      trust for the source account.
    facts:
      - cross-account-copy
  - id: deployment-strategies-034
    q: Image Builder cannot distribute an encrypted AMI across accounts and Regions because of KMS access. What
      must the accounts configure?
    a: Allow the destination account in the source key policies and grant the destination role access to the
      keys in the source and destination Regions.
    facts:
      - cross-account-encryption
  - id: deployment-strategies-035
    q: An Image Builder image fails only during cross-account distribution because a role is missing. Must the
      image be rebuilt after the role is fixed?
    a: No. Retry the failed image; Image Builder can rerun distribution without rebuilding it.
    trap: true
    facts:
      - distribution-retry
  - id: deployment-strategies-036
    q: Image Builder copies an AMI to an opt-in Region but fails to publish its ID to Parameter Store. What
      permissions and Region setting should be checked?
    a: Enable the opt-in Region in the source account and grant the execution role ssm:PutParameter and, for
      aws:ec2:image validation, ec2:DescribeImages.
    facts:
      - parameter-permissions
  - id: deployment-strategies-037
    q: An Image Builder test instance is terminated after a failed build. How can an operator retain a future
      failed instance for diagnosis?
    a: Disable termination on failure in the infrastructure configuration. The default is to terminate it.
    facts:
      - build-failure
  - id: deployment-strategies-038
    q: An Image Builder AMI build in a private subnet cannot run its test components. Which Systems Manager
      prerequisites should an operator check?
    a: Ensure build and test instances can reach Systems Manager and their instance profile has permissions for
      the components. Image Builder uses Run Command to operate the instances.
    facts:
      - build-ssm
  - id: deployment-strategies-039
    q: An Image Builder instance cannot upload build logs to the configured Amazon S3 bucket. What permission
      does its instance profile need?
    a: Grant s3:PutObject for the target bucket's objects.
    facts:
      - build-logs
  - id: deployment-strategies-040
    q: An Image Builder pipeline must block AMI distribution when an Amazon Inspector on-demand scan finds
      vulnerabilities above an allowed severity. What must it configure?
    a: Enable on-demand AMI scanning and set a scan result condition. Without the condition, distribution can
      proceed before the scan finishes. This scan option was added in October 2026.
    facts:
      - ami-scan-release
      - ami-scan-gate
  - id: deployment-strategies-041
    q: A company wants each EC2 instance to install software automatically at first launch. Should it use instance metadata or user data?
    a: User data, which runs scripts at launch. Instance metadata only describes the running instance.
    trap: true
    facts: [instance-metadata, user-data]
---

A golden AMI is a reusable EC2 launch image prepared with the software and settings an application needs. Prebaking puts application components into that image. Bootstrapping runs installation or configuration when an instance starts. [AWS deployment guidance](https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/prebaking-vs.-bootstrapping-amis.html) recommends combining the two when instances need both quick startup and environment-specific customization.

### How it works

1. Define an Image Builder recipe, the base image plus build and test components. A component is a set of installation, configuration, or testing instructions. The parent image can come from a Systems Manager parameter, which stores a named configuration value.
2. Start the pipeline on demand or evaluate its schedule. With the default dependency-update condition, a scheduled run builds only when matching dependencies have changed. A changed base-image parameter counts as such an update.
3. Image Builder launches EC2 infrastructure, applies the recipe, and runs tests. It distributes the image only when all configured tests succeed.
4. Distribution can copy the AMI to Regions, grant launch permissions to accounts or organizational groups, write its ID to Parameter Store, and create a launch template version. A launch template stores settings for new EC2 instances.
5. Start a rolling instance refresh to apply the new launch configuration to existing fleet instances. Use warmup, checkpoints, and supported rollback settings to control replacement. Keep remaining environment customization in bootstrap logic such as user data, the startup configuration supplied to EC2.
6. For cross-account AMI copies, create the Image Builder distribution role in each destination with its managed policy and trust for the source. Encrypted copies also need destination role KMS permissions and key policies that permit destination access in the source and destination Regions. A distribution-phase failure can be retried without rebuilding.
7. For output parameters, grant the execution role `ssm:PutParameter` and, for AMI validation, `ec2:DescribeImages`. Enable each targeted opt-in Region in the source account for parameter writes.
8. Build and test instances need Systems Manager connectivity and an instance profile with component permissions. For S3 build logs, grant that profile `s3:PutObject` on the target bucket.
9. Since October 2026, Image Builder can use an Amazon Inspector on-demand AMI scan without activating Inspector for the account. Set a scan result condition to wait for results and fail the image when findings exceed the allowed severity; without it, distribution can proceed before the scan finishes.

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
- Instance refresh rollback needs a desired configuration and an explicit numbered previous launch template version. It does not support $Latest, $Default, or a Parameter Store AMI alias.

> **Trap:** A Parameter Store AMI alias is useful for selecting an image, but it is not a supported previous configuration for instance refresh rollback. Pin the supported launch configuration when rollback is required.
