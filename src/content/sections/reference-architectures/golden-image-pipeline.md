---
title: Golden image pipeline with immutable rollout
level: professional
order: 120
facts:
  - id: recipe
    text: An Image Builder recipe selects the base image and build and test components; components contain installation, configuration, or test instructions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html
  - id: scheduled
    text: Pipelines can run on a schedule or be started manually.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/schedule-pipeline.html#schedule-pipeline
  - id: workflow-order
    text: Image Builder workflow stages run in the order Build, Test and Distribution; a stage starts after the previous included stage succeeds.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-image-workflows.html#wf-stages
  - id: test-instance
    text: AMI testing launches a new EC2 instance from the image created during the build stage.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-components.html#manage-components
  - id: test-gate
    text: Image Builder distributes an image only after all configured tests succeed.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-features
  - id: build-sns
    text: Infrastructure configuration selects instance types, subnet and security groups, an S3 application-log location and an SNS build-status notification topic.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-infra-config.html#manage-infra-config
  - id: keep-failed
    text: The Image Builder console selects Terminate instance on failure by default; clearing it retains a failed instance for troubleshooting.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-infra-config.html#create-infra-config
  - id: distribution
    text: AMI distribution settings can copy images to other Regions and target accounts or grant launch permission to accounts, organizations and organizational units.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#create-ami-distribution-config
  - id: copied
    text: Cross-account Image Builder distribution delivers an AMI that the destination account can launch or modify.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html#cross-account-dist
  - id: shared-scope
    text: AMI launch sharing retains ownership, permits launching rather than modifying the shared AMI, and is limited to the AMI Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html#sharingamis-explicit
  - id: parameter-output
    text: Image Builder distribution can write an output AMI ID into a Systems Manager Parameter Store parameter.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html
  - id: regional-ami
    text: AMIs are Region-specific and can be copied to another Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
  - id: inspector
    text: Inspector scans owned AMIs for operating system and programming language package vulnerabilities using their backing EBS snapshots, without launching instances.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html#scan-types
  - id: template-update
    text: A new launch template applies to new instances; existing instances keep their original configuration until replaced, for example by instance refresh.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/update-auto-scaling-group.html#update-auto-scaling-instances
  - id: refresh
    text: An instance refresh replaces group instances using an updated launch template or instance configuration.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-overview
  - id: refresh-min
    text: Without an instance maintenance policy, instance refresh defaults to a minimum healthy percentage of 90 percent.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: rollback-default
    text: Instance refresh auto rollback is disabled by default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: rollback-alias
    text: Rollback cannot restore a launch template using an AMI alias from Systems Manager Parameter Store.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback-considerations
  - id: mutable
    text: An in-place CodeDeploy EC2 deployment updates the application revision on existing instances.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-server.html
  - id: immutable
    text: An immutable deployment starts a new server set with the new configuration or application version.
    source: https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/deployment-methods.html
  - id: bake
    text: Prebaking embeds application components in an AMI and can reduce instance startup work.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/prebaking-vs.-bootstrapping-amis.html
  - id: bootstrap
    text: Bootstrapping installs or customizes software at instance launch; large downloads and complex setup can slow deployment and scaling.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/prebaking-vs.-bootstrapping-amis.html
  - id: inventory
    text: Inventory collects metadata such as application versions, file attributes, network configuration, Windows updates, services and tags rather than file contents.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
  - id: inventory-sync
    text: Inventory resource data sync continuously updates a central S3 bucket as new collected inventory data is discovered.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/inventory-resource-data-sync.html#inventory-resource-data-sync
  - id: compliance
    text: Systems Manager Compliance reports current patch, association and custom compliance data.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/compliance-about.html#compliance-about
  - id: baseline
    text: Patch baselines define rules and explicit lists for approving or rejecting patches.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-custom
diagrams:
  - id: golden-image-pipeline
    title: Image Builder bakes and tests an AMI, shares it, and Auto Scaling replaces instances with it
    facts: [recipe, scheduled, workflow-order, test-instance, test-gate, build-sns, keep-failed, distribution, copied, shared-scope, parameter-output, regional-ami, inspector, template-update, refresh, refresh-min, rollback-default, rollback-alias, mutable, immutable, bake, bootstrap, inventory, inventory-sync, compliance, baseline]
    width: 1240
    height: 760
    groups:
      - { label: Image factory account, x: 20, y: 20, w: 560, h: 720, tone: devtools, icon: group-aws-account }
      - { label: Workload account, x: 620, y: 20, w: 600, h: 720, tone: neutral, icon: group-aws-account }
    nodes:
      - { id: recipe, label: Image recipe, sub: base and components, x: 60, y: 70, w: 160, h: 86, tone: devtools, icon: ec2-image-builder }
      - { id: ib, label: Image Builder, sub: scheduled pipeline, x: 330, y: 70, w: 160, h: 86, tone: devtools, icon: ec2-image-builder, info: "Runs the Build, Test and Distribution stages in order; each starts only after the previous one succeeds." }
      - { id: sns, label: SNS topic, sub: build status, x: 60, y: 240, w: 160, h: 86, tone: integration, icon: simple-notification-service }
      - { id: build, label: Build instance, sub: build and test, x: 330, y: 240, w: 160, h: 86, tone: compute, icon: res-ec2-instance, info: "Testing launches a new instance from the image built in the previous stage." }
      - { id: insp, label: Inspector, sub: AMI scanning, x: 60, y: 420, w: 160, h: 86, tone: security, icon: inspector }
      - { id: ami, label: Golden AMI, sub: tested, x: 330, y: 420, w: 160, h: 86, tone: compute, icon: res-ec2-ami }
      - { id: cd, label: CodeDeploy, sub: app revisions, x: 660, y: 240, w: 160, h: 86, tone: devtools, icon: codedeploy }
      - { id: ssm, label: Systems Manager, sub: inventory and patching, x: 940, y: 240, w: 180, h: 86, tone: mgmt, icon: systems-manager, info: "Inventory collects software metadata; Compliance reports patch status against the patch baseline between image releases." }
      - { id: copy, label: AMI copy, sub: owned by workload, x: 660, y: 420, w: 160, h: 86, tone: compute, icon: res-ec2-ami }
      - { id: asg, label: Auto Scaling, sub: instance refresh, x: 940, y: 420, w: 180, h: 86, tone: compute, icon: ec2-auto-scaling, info: "Replaces instances in batches, keeping at least 90 percent healthy by default." }
      - { id: param, label: Parameter Store, sub: latest AMI ID, x: 660, y: 600, w: 160, h: 86, tone: mgmt, icon: res-systems-manager-parameter-store }
      - { id: lt, label: Launch template, sub: new version, x: 940, y: 600, w: 180, h: 86, tone: compute, icon: ec2 }
    edges:
      - { from: recipe, to: ib, step: 1 }
      - { from: ib, to: build, step: 2 }
      - { from: build, to: ami, step: 3 }
      - { from: ami, to: insp, step: 4 }
      - { from: ami, to: copy, step: 5 }
      - { from: copy, to: param, step: 5 }
      - { from: param, to: lt, step: 6 }
      - { from: lt, to: asg, step: 6 }
      - { from: cd, to: asg, step: 7 }
      - { from: ssm, to: asg, step: 8 }
      - { from: build, to: sns, step: 9, dashed: true }
    steps:
      - "The image recipe selects a base image and the build and test components. The pipeline runs on a schedule or when started."
      - "The build stage launches an instance and runs the components; the test stage launches a new instance from the result and runs the tests."
      - "Only an image that passes every test becomes the golden AMI."
      - "Inspector scans the AMI for operating system and language package vulnerabilities."
      - "Distribution copies the AMI to the workload account and Regions, so that account owns its copy, and writes the new AMI ID to a Parameter Store parameter."
      - "A new launch template version uses the new AMI, and an instance refresh replaces the group's instances in batches."
      - "CodeDeploy deploys application revisions onto the instances that the golden AMI started."
      - "Between image releases, Systems Manager Inventory and Patch Manager report what each instance runs and whether it meets the patch baseline."
      - "If a build or test step fails, nothing is distributed. The build status goes to the SNS topic, and clearing Terminate instance on failure keeps the failed instance for troubleshooting."
cards:
  - id: reference-architectures-154
    q: "A company wants a hardened, tested AMI rebuilt every week with the latest patches, and only images that pass tests may be used. What fits?"
    a: "An **EC2 Image Builder** pipeline on a schedule, with a recipe of build and test components. It distributes an image only after all tests succeed."
    facts: [recipe, scheduled, test-gate]
  - id: reference-architectures-155
    q: "Workload accounts in several Regions must launch the golden AMI and own their copy. How should Image Builder deliver it?"
    a: "**Distribution settings** that copy the AMI to the target accounts and Regions. A copied AMI belongs to the destination account; launch sharing would only allow launching, in one Region."
    facts: [distribution, copied, shared-scope, regional-ami]
  - id: reference-architectures-156
    q: "Teams always want the newest golden AMI in their launch templates without editing AMI IDs by hand. What fits?"
    a: "Have Image Builder distribution write the AMI ID to a **Parameter Store** parameter that launch templates and pipelines read."
    facts: [parameter-output]
  - id: reference-architectures-157
    q: "A new launch template version with the new AMI is set as default, but running instances still use the old AMI. How are they replaced safely?"
    a: "Start an **instance refresh**, which replaces instances in batches, keeping 90 percent healthy by default. A new template only affects new instances."
    facts: [template-update, refresh, refresh-min]
  - id: reference-architectures-158
    q: "An instance refresh must roll back automatically, but the launch template takes its AMI from a Parameter Store alias. Will rollback work?"
    a: "No. Auto rollback is **off by default**, and it **cannot restore a launch template that uses a Parameter Store AMI alias**; it needs a numbered previous template version."
    trap: true
    facts: [rollback-default, rollback-alias]
  - id: reference-architectures-159
    q: "What is the difference between patching instances in place and replacing them with a new golden AMI?"
    a: "In place is **mutable**: existing servers change. A new AMI rolled out by instance refresh is **immutable**: new servers start from a tested image, and baking cuts launch time compared with bootstrapping."
    facts: [mutable, immutable, bake, bootstrap]
  - id: reference-architectures-160
    q: "Security needs to know which software versions run on every instance and whether each meets the patch baseline, across accounts. What fits?"
    a: "**Systems Manager Inventory** with a resource data sync to a central S3 bucket, plus **Compliance** for patch status against the patch baseline."
    facts: [inventory, inventory-sync, compliance, baseline]
  - id: reference-architectures-161
    q: "Every new golden AMI must be checked for known package vulnerabilities before teams adopt it. Which service scans the AMI?"
    a: "**Amazon Inspector**, which scans owned AMIs for operating system and programming language package vulnerabilities."
    facts: [inspector]
---
Image questions ask how to give every server the same tested base, patch it regularly and roll changes out without touching running instances. The professional answer is an image factory: Image Builder bakes and tests a golden AMI on a schedule, distribution hands each account its own copy, and Auto Scaling replaces instances with an instance refresh.

### How it works

1. An Image Builder pipeline runs the recipe's build and test components on a schedule.
2. Tests run on a new instance launched from the built image, and nothing is distributed unless they pass.
3. Distribution copies the AMI to each workload account and Region, and writes its ID to Parameter Store.
4. A new launch template version picks up the AMI, and an instance refresh replaces instances in batches.
5. CodeDeploy deploys the application on top, and Systems Manager reports inventory and patch compliance between images.

| Decision | Choose | When |
|---|---|---|
| Patch servers | Replace with a new AMI (immutable) | Repeatable, tested, rollback by version |
| Patch servers | Patch Manager in place (mutable) | Between image releases |
| Speed up launch | Bake software into the AMI | Long installs slow scaling |
| Environment settings | Bootstrap at launch | Values differ per environment |
| Give accounts the image | Distribution copy | Account must own its copy |
| Roll out the image | Instance refresh | Replace running instances in batches |

### Exam cues

- If the question says build and test AMIs automatically on a schedule, think EC2 Image Builder.
- If the question says always launch the latest AMI without editing IDs, think a Parameter Store parameter written by distribution.
- If the question says replace running instances with a new AMI, think instance refresh.
- If the question says immutable infrastructure, think new instances from a new image rather than changes to running ones.
- If the question says report installed software and patch compliance, think Systems Manager Inventory and Compliance.

### Remember

- Image Builder stages: Build, Test, Distribution, in order.
- A copied AMI belongs to the destination account; a shared AMI only allows launching, in its Region.
- Instance refresh: 90 percent minimum healthy by default; auto rollback off by default.
- Rollback cannot restore a template that uses a Parameter Store AMI alias.

> **Trap:** Updating the launch template changes nothing on running instances. Only new instances, or an instance refresh, pick up the new AMI.
