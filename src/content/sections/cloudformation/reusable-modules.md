---
title: Reusable modules
level: professional
order: 210
facts:
  - id: module-purpose
    text: A module packages reusable resource configurations and customizable inputs for inclusion in
      stack templates.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html#modules
  - id: module-contract
    text: A module contains a template fragment defining its resources and a generated schema defining
      its input and resource contract.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/modules-structure.html#modules-structure
  - id: module-registration
    text: Register a private module in the account and Region where its template will be deployed.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules-using.html#modules-using
  - id: module-type
    text: Module type names use organization::service::use-case::MODULE and are placed in the template
      Resources section.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules-using.html#modules-using
  - id: module-expansion
    text: CloudFormation resolves modules into resources in the processed template, and change sets show
      their resource changes.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules-using.html#modules-using
  - id: module-register-resource
    text: AWS::CloudFormation::ModuleVersion registers a module package stored in S3; the registering
      identity needs s3:GetObject on the package.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-moduleversion.html#aws-resource-cloudformation-moduleversion
  - id: module-immutable
    text: A registered module version cannot be edited; updating ModuleVersion registers a new version.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-moduleversion.html#aws-resource-cloudformation-moduleversion
  - id: module-first-default
    text: The first registered module version remains the default until another version is explicitly
      selected.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-moduledefaultversion.html#aws-resource-cloudformation-moduledefaultversion
  - id: module-select-default
    text: AWS::CloudFormation::ModuleDefaultVersion selects a default using Arn or ModuleName together
      with VersionId.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-moduledefaultversion.html#aws-resource-cloudformation-moduledefaultversion
  - id: module-operation-version
    text: Stack operations resolve the current default module version in the operation account and
      Region, including nested modules.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/module-versioning.html#module-versioning
  - id: module-no-auto-update
    text: Changing a default module version does not update existing stacks.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/module-versioning.html#module-versioning
  - id: module-previous-template
    text: A stack update using the previous template reuses the previous processed template without
      reprocessing modules.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/module-versioning.html#module-versioning
  - id: module-inputs
    text: Pass module inputs through its Properties; template parameters can supply those values.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/module-using-params.html#module-using-params
  - id: module-constraints
    text: Module parameter constraints are not enforced; validate inputs using constrained template
      parameters passed into the module.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/module-using-params.html#module-using-params
  - id: module-restrictions
    text: Module fragments cannot contain Fn::ImportValue, exported outputs, macros or transforms,
      nested stacks, or StackSets.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/modules-structure.html#modules-structure
  - id: module-nesting
    text: Modules can contain other modules with nesting up to three levels deep.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/modules-structure.html#modules-structure
  - id: module-quotas
    text: Resource-count and template-size quotas apply to the processed template including resources
      expanded from modules.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html#modules
cards:
  - id: cloudformation-128
    q: What does a CloudFormation module contribute to a stack template?
    a: Reusable resource configurations and inputs that CloudFormation expands into resources in the
      processed template.
    facts:
      - module-purpose
      - module-expansion
  - id: cloudformation-129
    q: A team must reuse an approved CloudFormation resource configuration across accounts and Regions.
      What must it prepare for module use?
    a: Register the private module in each target account and Region, then use its module type under
      Resources with the required Properties.
    facts:
      - module-registration
      - module-type
      - module-inputs
  - id: cloudformation-130
    q: A team changes the default CloudFormation module version and expects deployed stacks to change
      immediately. What happens?
    a: Existing stacks stay unchanged. A later operation that processes the template resolves the
      current default; using the previous template reuses the old processed template.
    trap: true
    facts:
      - module-no-auto-update
      - module-operation-version
      - module-previous-template
  - id: cloudformation-131
    q: Identical CloudFormation templates containing a module create different resources in two Regions.
      Which module setting should the team compare?
    a: The default module version in each account and Region. Align defaults, including nested-module
      defaults, for consistent expansion.
    facts:
      - module-operation-version
  - id: cloudformation-132
    q: How does a team release and select a new private CloudFormation module version?
    a: Register a new version rather than editing an existing one. Set the desired default with
      AWS::CloudFormation::ModuleDefaultVersion using Arn or ModuleName and VersionId.
    facts:
      - module-immutable
      - module-select-default
  - id: cloudformation-133
    q: A CloudFormation module declares input constraints, but invalid values are not rejected. Where
      should input constraints be enforced?
    a: On a template parameter passed into the module Properties. Module parameter constraints are not
      enforced.
    trap: true
    facts:
      - module-constraints
      - module-inputs
  - id: cloudformation-134
    q: Can a CloudFormation module contain a nested module, a nested stack, or a macro?
    a: Nested modules are supported up to three levels deep. Nested stacks and macros are not allowed in
      module fragments.
    facts:
      - module-nesting
      - module-restrictions
  - id: cloudformation-135
    q: Does packaging many CloudFormation resources into a module bypass stack resource-count limits?
    a: No. Limits apply to the processed template, including the resources expanded from modules.
    trap: true
    facts:
      - module-quotas
diagrams:
  - id: cloudformation-module-expansion
    title: Modules expand into resources before the reviewed stack operation
    width: 800
    height: 180
    groups: []
    nodes:
      - id: template
        label: Template
        icon: res-cloudformation-template
        x: 20
        y: 48
        w: 180
        h: 86
        tone: mgmt
        sub: contains module
      - id: process
        label: CloudFormation
        icon: cloudformation
        x: 310
        y: 48
        w: 180
        h: 86
        tone: mgmt
        sub: resolve default version
      - id: stack
        label: Stack resources
        icon: res-cloudformation-stack
        x: 600
        y: 48
        w: 180
        h: 86
        tone: mgmt
        sub: review then deploy
    edges:
      - from: template
        to: process
        step: 1
      - from: process
        to: stack
        step: 2
    steps:
      - Resolve registered modules into the processed template.
      - Review the expanded resources in a change set and execute it.
---
A CloudFormation module packages a reusable resource configuration with inputs that customize it. It lets teams reuse an approved infrastructure pattern while CloudFormation still exposes the resources the pattern creates. A schema is the contract describing those inputs and resources. [Modules](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html)

### How it works

1. Define a template fragment, the resource definitions and related configuration to reuse, and generate its schema. Package them for registration.
2. Register the private module in each target account and Region. With `AWS::CloudFormation::ModuleVersion`, the package is stored in S3 and registration needs `s3:GetObject` permission.
3. Add the type under `Resources` using `organization::service::use-case::MODULE`. Supply module inputs through `Properties`; template parameters can provide those values.
4. CloudFormation expands the module into the processed template. Review a change set, a preview of resource changes, before executing the operation. [Using modules](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules-using.html) · [Registration](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-moduleversion.html)

| Version choice | Behavior |
|---|---|
| First registration | Becomes the default until explicitly changed |
| `AWS::CloudFormation::ModuleDefaultVersion` | Selects a version using `Arn`, or `ModuleName` and `VersionId` |
| Normal template processing | Resolves the current default in the operation's account and Region |
| Use previous template | Reuses the previous processed template without expanding modules again |

A version is immutable, meaning it cannot be edited after registration. Register a new version to change the pattern. Align defaults across deployment accounts and Regions, including defaults for nested modules. [Version selection](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-moduledefaultversion.html) · [Operation behavior](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/module-versioning.html)

### Exam cues

- If the question says distribute an approved resource configuration as a template building block, think a registry module, because it packages the configuration and its inputs.
- If the question says a new module default did not change deployed stacks, think a later stack operation, because changing the default does not start an update.
- If the question says an update still uses the old expansion, think use previous template, because that option reuses the processed template.
- If the question says reject an invalid module input, think a constrained template parameter, because module parameter constraints are not enforced.

### Remember

- Private module registration is scoped to the account and Region.
- Modules can nest up to three levels deep.
- Module fragments cannot contain nested stacks, StackSets, macros, transforms, `Fn::ImportValue`, or exported outputs.
- Expanded resources still count toward processed-template quotas. [Fragment restrictions](https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/modules-structure.html) · [Input constraints](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/module-using-params.html)

> **Trap:** A newer registered module version does not automatically become the default after the first registration. Select the new default explicitly; existing stacks still need an operation that processes the module.
