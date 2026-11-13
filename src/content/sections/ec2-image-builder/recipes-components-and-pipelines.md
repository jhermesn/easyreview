---
title: Recipes, components, and pipelines
level: associate
order: 10
facts:
  - id: image-automation
    text: An Image Builder pipeline automates creating and updating AMIs and container images.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#what-is-image-builder
  - id: ami-definition
    text: An AMI contains an operating system and preinstalled software for launching EC2 instances.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
  - id: recipe-inputs
    text: An image recipe defines a base image and components for an output AMI.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
  - id: container-recipe
    text: A container recipe defines a base image and components for an output container image.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
  - id: component-document
    text: A component is a sequence of customization or test steps described in a YAML or JSON document.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-component-yaml.html#create-component-yaml
  - id: component-types
    text: A test component contains only the test phase; a build component can include a test phase that
      runs during testing.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-component-yaml.html#create-component-yaml
  - id: pipeline-resources
    text: A pipeline combines a recipe with infrastructure and distribution configurations.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
  - id: build-environment
    text: Infrastructure configuration defines the EC2 environment used to build and test images.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-infra-config.html#manage-infra-config
  - id: container-destinations
    text: A container pipeline can distribute Docker images to ECR repositories in target Regions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/start-build-container-pipeline.html#start-build-container-pipeline
  - id: image-pricing
    text: Creating custom AMI and container images with Image Builder has no service charge; underlying
      EC2, S3, EBS, ECR and Inspector usage can incur charges.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-pricing
  - id: container-scanning
    text: Image Builder container scanning uses Inspector on an image copy pushed to ECR and requires
      Inspector activation for ECR in the build Region.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/integ-inspector.html#integ-inspector
  - id: scheduled-builds
    text: Pipelines can run on a schedule or be started manually.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/schedule-pipeline.html#schedule-pipeline
  - id: account-delivery
    text: AMI distribution can deliver image copies to target accounts.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#create-ami-distribution-config
  - id: vm-image
    text: For on-premises Amazon Linux 2 development and testing, AWS provides a separate VM image for
      each supported virtualization platform.
    source: https://docs.aws.amazon.com/linux/al2/ug/amazon-linux-2-virtual-machine.html
  - id: seed-image
    text: The Amazon Linux 2 seed.iso contains initial configuration, not operating system files, and is
      used together with a separate VM image.
    source: https://docs.aws.amazon.com/linux/al2/ug/amazon-linux-2-virtual-machine.html
cards:
  - id: ec2-image-builder-001
    q: What does EC2 Image Builder automate, and which resources can still cost money?
    a: Image creation and updates for AMIs and container images. Image Builder has no image-creation
      service charge; EC2, S3, EBS, ECR and Inspector usage can still cost money.
    facts:
      - image-automation
      - image-pricing
  - id: ec2-image-builder-002
    q: Which EC2 Image Builder resources define the image contents, build environment and delivery
      targets?
    a: A recipe selects the base image and components. Infrastructure configuration defines the build
      environment. Distribution configuration defines delivery targets. A pipeline combines them.
    facts:
      - recipe-inputs
      - container-recipe
      - pipeline-resources
      - build-environment
  - id: ec2-image-builder-008
    q: A team needs patched AMIs built, tested and delivered to target accounts weekly. Which EC2 Image
      Builder setup should it use?
    a: Use a scheduled image pipeline with an image recipe, test components, infrastructure
      configuration and distribution configuration.
    facts:
      - image-automation
      - recipe-inputs
      - component-document
      - pipeline-resources
      - scheduled-builds
  - id: ec2-image-builder-012
    q: A team needs EC2 Image Builder to build containers, scan them for vulnerabilities and deliver
      them to ECR. What must it configure?
    a: Use a container recipe and an ECR distribution target. Enable image scanning and activate
      Inspector for ECR in the build Region.
    facts:
      - container-recipe
      - container-destinations
      - container-scanning
  - id: ec2-image-builder-013
    q: A team has an Amazon Linux 2 seed.iso but cannot boot an operating system on its local
      hypervisor. What is missing?
    a: Download the separate Amazon Linux 2 VM image for the hypervisor and attach the seed ISO for
      initial configuration. The ISO does not contain the operating system.
    trap: true
    facts:
      - vm-image
      - seed-image
---
EC2 Image Builder automates creating and updating machine and container images. An Amazon Machine Image (AMI) contains the operating system and software used to launch an EC2 instance. A pipeline connects the instructions, build environment and delivery settings.

### How it works

1. Select a base image, the starting operating system and software. An image recipe produces an AMI; a container recipe produces a container image.
2. Add components, which are reusable lists of customization or test steps written in YAML or JSON, plain-text data formats. A build component can also contain tests; a standalone test component contains only the test phase.
3. Attach infrastructure and distribution configurations. Run the pipeline manually or on a schedule.
4. For container vulnerability scanning, enable scanning and activate Inspector for ECR in the build Region. Image Builder scans a copy pushed to ECR.

| Resource | What it specifies |
|---|---|
| Recipe | Base image and components |
| Infrastructure configuration | EC2 build and test environment |
| Distribution configuration | Delivery targets, such as ECR repositories for containers |
| Pipeline | Resources and execution schedule |

### Exam cues

- If the question says patched AMIs must be built, tested and delivered weekly, think scheduled Image Builder pipeline, because it connects those operations.
- If the question says build containers and scan them before delivery to ECR, think container recipe and Inspector integration, because Image Builder supports container outputs and vulnerability scanning.
- If the question says test Amazon Linux 2 on premises, think the VM image for the target hypervisor plus a seed ISO, because the ISO contains initial configuration rather than the operating system.

### Remember

- AMIs and container images use different recipe types.
- Image Builder image creation has no service charge; the resources it uses can incur charges.
- Container scanning requires Inspector activation for ECR in the build Region.

> **Trap:** An Amazon Linux 2 seed ISO cannot replace the operating system VM image. Use both to boot the local VM.
