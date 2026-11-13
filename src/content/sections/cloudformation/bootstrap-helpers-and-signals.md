---
title: Bootstrap helpers and signals
level: associate
order: 170
facts:
  - id: helpers
    text: CloudFormation helper scripts must be explicitly called; install aws-cfn-bootstrap if the
      selected image does not include the helpers.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/cfn-helper-scripts-reference.html#cfn-helper-scripts-reference
  - id: init
    text: cfn-init reads AWS::CloudFormation::Init metadata and applies packages, files, commands, and
      services.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-init.html#aws-resource-init
  - id: init-identities
    text: AWS::CloudFormation::Init can create operating-system users and groups and download and unpack
      archives using sources.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-init.html#aws-resource-init
  - id: config-order
    text: Within a config key, cfn-init processes packages, groups, users, sources, files, commands, and
      services in that order.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-init.html#aws-resource-init
  - id: configsets
    text: configSets orders multiple cfn-init config keys; without a selected configset, cfn-init looks
      for a config key named config.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-init.html#aws-resource-init-configsets
  - id: userdata
    text: cfn-init is typically called from EC2 user data; Fn::Base64 encodes a string for the UserData
      property.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-base64.html#intrinsic-function-reference-base64
  - id: signal
    text: CreationPolicy prevents create completion until the required success signals arrive;
      cfn-signal or SignalResource sends those signals.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html#aws-attribute-creationpolicy
  - id: signal-count
    text: CreationPolicy ResourceSignal.Count defaults to 1.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html#aws-attribute-creationpolicy
  - id: signal-timeout
    text: CreationPolicy ResourceSignal.Timeout defaults to PT5M and allows up to 12 hours; its timer
      starts after resource stabilization.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html#aws-attribute-creationpolicy
  - id: signal-failure
    text: A failure signal or too few success signals before timeout fails resource creation and
      triggers stack rollback.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html#aws-attribute-creationpolicy
  - id: supported-creation
    text: CreationPolicy is supported by AWS::EC2::Instance, AWS::AutoScaling::AutoScalingGroup,
      AWS::CloudFormation::WaitCondition, and AWS::AppStream::Fleet.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html#aws-attribute-creationpolicy
  - id: creation-percent
    text: AutoScalingCreationPolicy.MinSuccessfulInstancesPercent defaults to 100.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html#aws-attribute-creationpolicy
  - id: hup
    text: cfn-hup checks for metadata changes and runs configured actions; changing metadata alone does
      not run cfn-init.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/cfn-hup.html#cfn-hup
  - id: wait-handle
    text: A WaitConditionHandle provides a presigned S3 URL for wait-condition signals, so the signal
      sender needs access to the CloudFormation-specific S3 bucket.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-waitcondition.html#using-cfn-waitcondition
  - id: wait-signalresource
    text: A WaitCondition configured with CreationPolicy can receive signals through SignalResource
      instead of a wait-condition handle.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html#aws-attribute-creationpolicy
  - id: prefer-creation
    text: AWS recommends CreationPolicy with cfn-signal rather than a separate wait condition for EC2
      and Auto Scaling bootstrap readiness.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-waitcondition.html#using-cfn-waitcondition
cards:
  - id: cloudformation-011
    q: A CloudFormation stack must wait for EC2 software setup before creation completes. What should
      the team configure?
    a: Attach CreationPolicy with ResourceSignal and send cfn-signal after setup. Count defaults to 1;
      Timeout defaults to PT5M and permits up to 12 hours. A failure or timeout fails resource
      creation.
    facts:
      - signal
      - signal-count
      - signal-timeout
      - signal-failure
  - id: cloudformation-012
    q: Which CloudFormation resource types support CreationPolicy, and how can an Auto Scaling group set
      its success percentage?
    a: EC2 Instance, Auto Scaling AutoScalingGroup, CloudFormation WaitCondition, and AppStream Fleet.
      For a group, set AutoScalingCreationPolicy.MinSuccessfulInstancesPercent; its default is 100.
    facts:
      - supported-creation
      - creation-percent
  - id: cloudformation-013
    q: After CloudFormation metadata changes on a running EC2 instance, what can rerun its
      configuration?
    a: cfn-hup detects the metadata change and runs a configured action such as cfn-init. Metadata
      changes alone do not invoke cfn-init.
    trap: true
    facts:
      - init
      - hup
  - id: cloudformation-014
    q: How do CloudFormation wait-condition handle signals differ from CreationPolicy signals?
    a: A WaitConditionHandle receives signals through a presigned S3 URL and needs S3 reachability.
      CreationPolicy uses cfn-signal or SignalResource; a WaitCondition can also be configured with
      CreationPolicy to use SignalResource. Prefer CreationPolicy for EC2 and Auto Scaling
      readiness.
    facts:
      - wait-handle
      - signal
      - wait-signalresource
      - prefer-creation
  - id: cloudformation-032
    q: An EC2 instance exists but its software is not ready. How can CloudFormation prevent stack
      creation from completing early?
    a: Use CreationPolicy and send cfn-signal only after software setup succeeds. The policy waits for
      success signals rather than just instance provisioning.
    trap: true
    facts:
      - signal
      - signal-failure
  - id: cloudformation-109
    q: A CloudFormation bootstrap must install packages, write files, and then run a separate
      application configuration. How can it control multiple configurations?
    a: Define configSets in the required config-key order and select that configset when calling
      cfn-init. Each config key has a fixed internal processing order.
    facts:
      - configsets
      - config-order
  - id: cloudformation-110
    q: An EC2 image lacks CloudFormation helper scripts and bootstrap cannot run cfn-init. What should
      the template bootstrap do?
    a: Install aws-cfn-bootstrap before calling the helper. Helper scripts are not automatically run and
      are not included in every image.
    facts:
      - helpers
  - id: cloudformation-111
    q: Which CloudFormation intrinsic function encodes EC2 UserData?
    a: Fn::Base64 returns the encoded form of the user-data string.
    facts:
      - userdata
  - id: cloudformation-112
    q: A private EC2 instance sends a wait-condition handle signal but CloudFormation never receives it.
      What connectivity must the team check?
    a: Access to the CloudFormation-specific S3 bucket used by the presigned URL. A CloudFormation
      interface endpoint alone does not provide that response path.
    trap: true
    facts:
      - wait-handle
diagrams:
  - id: cfn-bootstrap-signals
    title: Configure software before reporting readiness
    width: 840
    height: 210
    nodes:
      - id: metadata
        label: Init metadata
        icon: res-cloudformation-template
        info: Define configuration keys and their configSets order.
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: instance
        label: EC2 instance
        icon: res-ec2-instance
        info: User data calls cfn-init to apply the metadata.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: signal
        label: CreationPolicy
        icon: res-cloudformation-stack
        info: cfn-signal reports the result. Creation waits for the required success signals.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: metadata
        to: instance
        step: 1
      - from: instance
        to: signal
        step: 2
    steps:
      - Run cfn-init on the instance to apply its metadata.
      - Send the setup result so CreationPolicy can complete or fail resource creation.
---
CloudFormation bootstrap helpers configure EC2 software, while signals report whether setup succeeded. A CreationPolicy makes that report part of resource creation, so a provisioned instance is not accepted as ready before its setup finishes.

### How it works

1. Ensure the instance image contains the helpers or install `aws-cfn-bootstrap`. Call the helpers explicitly from bootstrap, typically EC2 user data. `Fn::Base64` encodes the user-data string.
2. Call `cfn-init` to apply `AWS::CloudFormation::Init` metadata. A configset, an ordered list of configuration keys, controls multiple phases through `configSets`.
3. After configuration succeeds or fails, report the result with `cfn-signal` or `SignalResource`. A `CreationPolicy` waits for the required successes and fails creation on a failure signal or timeout.
4. For later metadata changes, configure `cfn-hup` to run an action such as calling `cfn-init` again.

| Helper | Purpose |
|---|---|
| `cfn-init` | Apply packages, users, groups, archives, files, commands, and services from metadata |
| `cfn-signal` | Report readiness or failure |
| `cfn-hup` | Detect metadata changes and run configured actions |

Within each config key, the order is packages, groups, users, sources, files, commands, then services. `sources` downloads and unpacks an archive. Use separate config keys in a configset when a different overall order is needed.

### Exam cues

- If the question says wait for EC2 application setup, think `CreationPolicy` plus `cfn-signal`, because instance provisioning alone does not report software readiness.
- If the question says apply changed metadata to a running instance, think `cfn-hup`, because metadata updates do not invoke `cfn-init` automatically.
- If the question says coordinate installation phases, think `configSets`, because it orders configuration keys.

### Remember

- `ResourceSignal.Count` defaults to 1; `Timeout` defaults to `PT5M`, maximum 12 hours, starting after stabilization.
- CreationPolicy supports EC2 Instance, Auto Scaling AutoScalingGroup, CloudFormation WaitCondition, and AppStream Fleet.
- Auto Scaling creation success percentage defaults to 100.
- Without a selected configset, `cfn-init` looks for a key named `config`.

> **Trap:** A WaitConditionHandle uses a presigned S3 URL, which is a URL authorized for a specific request. The sender needs S3 reachability. A WaitCondition using CreationPolicy can instead use SignalResource. Keep the two signaling paths separate.
