---
title: Launch template and parameter outputs
level: associate
order: 50
facts:
  - id: launch-settings
    text: A launch template stores EC2 launch parameters, which can include the AMI ID.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/manage-launch-template-versions.html
  - id: template-output
    text: launchTemplateConfigurations makes Image Builder create a launch template version referencing
      the output AMI.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/dist-using-launch-template.html#dist-using-launch-template
  - id: default-template
    text: setDefaultVersion defaults to true when omitted.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_LaunchTemplateConfiguration.html#imagebuilder-Type-LaunchTemplateConfiguration-setDefaultVersion
  - id: parameter-output
    text: ssmParameterConfigurations stores a distributed output AMI ID in a named Parameter Store
      parameter for the destination Region and optionally account.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#create-ami-distribution-config
  - id: parameter-validation
    text: The default output parameter data type is aws:ec2:image, which validates the value as an AMI
      ID; text skips AMI-ID validation.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#ami-distribution-prereqs-ssm-param
  - id: output-permissions
    text: The Image Builder execution role needs ssm:PutParameter for output parameters and
      ec2:DescribeImages when the data type is aws:ec2:image.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#ami-distribution-prereqs-ssm-param
  - id: existing-parameter
    text: An existing output parameter must have type String and a matching data type; checking it in
      the current account requires ssm:GetParameter.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#ami-distribution-prereqs-ssm-param
  - id: output-account
    text: The output parameter account must be a target distribution account for that Region.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#ami-distribution-prereqs-ssm-param
  - id: instance-rollout
    text: An Auto Scaling instance refresh rolls out an updated AMI or launch template to the group
      instances.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html#asg-instance-refresh
  - id: template-future
    text: A new launch template version does not update existing instances automatically.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/manage-launch-template-versions.html
  - id: read-output
    text: ssm:GetParameter permits retrieving a parameter that holds an AMI ID.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/tutorial-ssm-parameters-recipe.html#tutorial-ssm-configure-iam
diagrams:
  - id: ib-output-handoff
    title: Publish an AMI separately from its rollout
    width: 800
    height: 170
    nodes:
      - id: image
        label: Image Builder
        icon: ec2-image-builder
        info: Distribution writes the output AMI ID to a named parameter.
        x: 20
        y: 45
        w: 220
        h: 86
        tone: compute
      - id: parameter
        label: AMI parameter
        icon: res-systems-manager-parameter-store
        info: A separate deployment pipeline can retrieve the AMI ID.
        x: 280
        y: 45
        w: 220
        h: 86
        tone: mgmt
      - id: refresh
        label: Instance refresh
        icon: ec2-auto-scaling
        info: A deployment step uses the AMI in a launch template and refreshes the group.
        x: 540
        y: 45
        w: 220
        h: 86
        tone: compute
    edges:
      - from: image
        to: parameter
        step: 1
      - from: parameter
        to: refresh
        step: 2
    steps:
      - Publish the output AMI ID during distribution.
      - A separate deployment pipeline reads the ID and starts the instance rollout.
cards:
  - id: ec2-image-builder-009
    q: Other pipelines need the output AMI ID from EC2 Image Builder without hard-coded image IDs. What
      should the producer configure?
    a: Add ssmParameterConfigurations to distribution settings. Image Builder writes the output AMI ID
      to Parameter Store. Its execution role needs ssm:PutParameter and, for aws:ec2:image,
      ec2:DescribeImages.
    facts:
      - parameter-output
      - parameter-validation
      - output-permissions
  - id: ec2-image-builder-011
    q: EC2 Image Builder updates an Auto Scaling launch template. Does that roll out the AMI to existing
      instances?
    a: No. Distribution creates a new launch template version; setDefaultVersion is true if omitted. Use
      an Auto Scaling instance refresh to roll out the AMI to existing instances.
    trap: true
    facts:
      - template-output
      - default-template
      - template-future
      - instance-rollout
  - id: ec2-image-builder-022
    q: A team wants to review an EC2 Image Builder AMI separately from the infrastructure rollout. How
      can the image pipeline hand off the result?
    a: Publish the output AMI ID through distribution to Parameter Store. A separate deployment pipeline
      can retrieve that ID and roll it out with the launch template and an instance refresh.
    facts:
      - parameter-output
      - read-output
      - template-output
      - instance-rollout
  - id: ec2-image-builder-023
    q: EC2 Image Builder can write an output parameter but fails when its data type is aws:ec2:image.
      Which additional permission should the team check?
    a: ec2:DescribeImages. The aws:ec2:image data type validates that the parameter value is an AMI ID.
    facts:
      - parameter-validation
      - output-permissions
---
Image Builder can publish an AMI ID for other systems and create a new launch template version. A launch template stores EC2 launch settings, including the AMI to use. Parameter Store holds a named value that a separate deployment pipeline can retrieve.

### How it works

1. Add `launchTemplateConfigurations` to distribution settings to create a version containing the output AMI ID. `setDefaultVersion` defaults to `true`; set it to `false` to leave the default version unchanged.
2. Add `ssmParameterConfigurations` to write the distributed AMI ID into a parameter for a destination Region and account. That account must be a distribution target.
3. Grant the execution role `ssm:PutParameter`. The default data type, `aws:ec2:image`, validates the AMI ID and also requires `ec2:DescribeImages`. An existing parameter must be type `String` with the same data type; checking it in the current account requires `ssm:GetParameter`.
4. A separate deployment pipeline can retrieve the AMI ID with `ssm:GetParameter` and release it after review. To roll out the launch template change to existing Auto Scaling instances, start an instance refresh, which updates the group's instances.

### Exam cues

- If the question says downstream pipelines need the current image identifier, think Parameter Store output, because Image Builder can write the ID during distribution.
- If the question says instances still run the old AMI after the template changes, think instance refresh, because a template version does not automatically update existing instances.
- If the question says output AMI validation fails despite write permission, think `ec2:DescribeImages`, because `aws:ec2:image` validates the value as an AMI ID.

### Remember

- `setDefaultVersion` defaults to `true`.
- Output parameter data type defaults to `aws:ec2:image`; `text` skips AMI-ID validation.
- Publishing an AMI ID and rolling out instances are separate operations.

> **Trap:** A newly created launch template version does not deploy the AMI to running instances. Use an instance refresh for that rollout.
