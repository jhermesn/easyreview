---
title: Build and test workflows
level: associate
order: 20
facts:
  - id: workflow-order
    text: Image Builder workflow stages run in the order Build, Test and Distribution; a stage starts
      after the previous included stage succeeds.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-image-workflows.html#wf-stages
  - id: build-phases
    text: The build stage runs component build and validate phases before creating the snapshot or
      container image.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-components.html#manage-components
  - id: ami-test-instance
    text: AMI testing launches a new EC2 instance from the image created during the build stage.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-components.html#manage-components
  - id: container-test-host
    text: Container workflow tests run on the same instance used for building.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-components.html#manage-components
  - id: test-gate
    text: Image Builder distributes an image only after all configured tests succeed.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-features
  - id: optional-stages
    text: A pipeline can omit build or test workflows, including building and distributing without tests.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-image-workflows.html#wf-stages
  - id: workflow-document
    text: A workflow is a versioned YAML resource defining ordered steps for a stage; changing it
      requires a new version or clone.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-image-workflows.html#manage-image-workflows
  - id: instance-profile
    text: Infrastructure configuration selects an instance profile that supplies permissions to build
      and test instances for component actions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-infra-config.html#manage-infra-config
  - id: profile-definition
    text: An instance profile passes an IAM role to an EC2 instance.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
  - id: snapshot-definition
    text: An EBS snapshot is a point-in-time copy of data on an EBS volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html
  - id: network-and-logs
    text: Infrastructure configuration selects instance types, subnet and security groups, an S3
      application-log location and an SNS build-status notification topic.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-infra-config.html#manage-infra-config
  - id: failure-default
    text: The Image Builder console selects Terminate instance on failure by default; clearing it
      retains a failed instance for troubleshooting.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-infra-config.html#create-infra-config
  - id: log-permissions
    text: Writing Image Builder application logs to S3 requires s3:PutObject on the destination bucket
      objects in the instance profile.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-infra-config.html#manage-infra-config
diagrams:
  - id: ib-ami-build-test
    title: AMI build and test sequence
    width: 800
    height: 170
    nodes:
      - id: build
        label: Build instance
        icon: res-ec2-instance
        info: Run build and validate phases, then create an AMI.
        x: 20
        y: 45
        w: 220
        h: 86
        tone: compute
      - id: test
        label: Fresh test
        icon: res-ec2-instance
        info: Launch a new instance from the AMI and run configured tests.
        x: 280
        y: 45
        w: 220
        h: 86
        tone: compute
      - id: deliver
        label: Distribute AMI
        icon: ec2-image-builder
        info: Distribute after configured tests succeed.
        x: 540
        y: 45
        w: 220
        h: 86
        tone: compute
    edges:
      - from: build
        to: test
        step: 1
      - from: test
        to: deliver
        step: 2
    steps:
      - Create the AMI and launch a new test instance from it.
      - Distribute the image after configured tests succeed.
cards:
  - id: ec2-image-builder-003
    q: For an EC2 Image Builder AMI pipeline with tests, what happens between customization and
      distribution?
    a: Run build and validate phases, create the image, launch a fresh test instance from it, and run
      tests. Distribution follows successful configured tests.
    facts:
      - workflow-order
      - build-phases
      - ami-test-instance
      - test-gate
  - id: ec2-image-builder-004
    q: What does EC2 Image Builder infrastructure configuration control, and how can a failed instance
      be retained?
    a: It controls instance permissions, instance types, network, logs and SNS notifications. Clear
      Terminate instance on failure to retain the failed instance; the console selects termination
      by default.
    facts:
      - instance-profile
      - network-and-logs
      - failure-default
  - id: ec2-image-builder-014
    q: An EC2 Image Builder AMI pipeline installs an application successfully but the produced image
      fails to boot correctly. Where should the team test the resulting image?
    a: Use the test stage, which launches a new EC2 instance from the built image. The validate phase
      runs before image creation.
    facts:
      - build-phases
      - ami-test-instance
  - id: ec2-image-builder-015
    q: An EC2 Image Builder component downloads private S3 files and receives AccessDenied. Which build
      resource needs permission?
    a: The build instance profile needs permission to access those files. Component actions run with the
      build and test instance permissions.
    facts:
      - instance-profile
  - id: ec2-image-builder-016
    q: Does every EC2 Image Builder pipeline necessarily test an image before distributing it?
    a: No. Build and test workflows can be omitted. The successful-test requirement applies to tests
      that are configured.
    trap: true
    facts:
      - optional-stages
      - test-gate
---
An Image Builder workflow is a versioned list of steps for one image-creation stage. Components describe customization and tests inside that process. For AMIs, testing a newly launched instance checks the saved image rather than only the machine used to build it.

### How it works

1. Infrastructure configuration supplies an instance profile, the IAM role permissions delivered to the EC2 instance, plus instance types and networking.
2. The Build stage runs component build and validate phases. It then creates a snapshot, a saved disk copy, or a container image.
3. The Test stage launches a fresh instance for AMI tests. Container tests use the build instance. All configured tests must succeed before distribution.
4. Distribution follows successful included stages. A pipeline can omit build or test workflows, so include tests when they are required.
5. Use S3 application logs and SNS build-status notifications to investigate failures. The instance profile needs `s3:PutObject` to write application logs to the chosen S3 location. Clear Terminate instance on failure to retain the failed instance.

### Exam cues

- If the question says an AMI installs correctly but fails after launch, think test stage, because it launches an instance from the saved image.
- If the question says a build component cannot read an S3 object, think instance profile permissions, because the component runs on the build instance.
- If the question says investigate a failed build interactively, think retain the failed instance, because termination is selected by default in the console.

### Remember

- Included stages run Build, Test, Distribution, in that order.
- The console selects Terminate instance on failure by default.
- Workflows are versioned; create a new version or clone to change one.

> **Trap:** A validate phase checks the build instance before image creation. It does not replace launching the resulting AMI for testing.
