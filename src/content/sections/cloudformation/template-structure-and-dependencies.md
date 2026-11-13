---
title: Template structure and dependencies
level: associate
order: 10
facts:
  - id: template-stack
    text: CloudFormation provisions and manages a stack of resources from a JSON or YAML template.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome
  - id: required-resources
    text: Resources is the only required template section.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html#template-anatomy
  - id: logical-id
    text: A template resource has a logical ID, a resource type, and its configuration properties.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html#template-anatomy
  - id: optional-sections
    text: Parameters, Mappings, Conditions, Outputs, Metadata, Rules, and Transform are optional
      template sections.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html#template-anatomy
  - id: outputs
    text: Outputs exposes selected stack values such as resource identifiers.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html#template-anatomy
  - id: ref
    text: Ref returns a parameter value or the resource-specific identifying value documented for a
      resource.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-ref.html#ref-return-value
  - id: getatt
    text: Fn::GetAtt returns a named resource attribute documented for that resource type.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getatt.html#getatt-parameters
  - id: sub
    text: Fn::Sub replaces variables in a string using parameter values, resource identifiers,
      attributes, or a variable map.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-sub.html#intrinsic-function-reference-sub
  - id: join
    text: Fn::Join combines a list of strings with a specified separator.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-join.html#intrinsic-function-reference-join
  - id: implicit-order
    text: "A resource reference through Ref, GetAtt, or Sub creates an implicit dependency: the
      referenced resource is created and updated first and deleted last."
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-dependson.html#aws-attribute-dependson
  - id: explicit-order
    text: DependsOn explicitly orders resource operations that CloudFormation might otherwise perform in
      parallel.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-dependson.html#aws-attribute-dependson
cards:
  - id: cloudformation-028
    q: Which section must a CloudFormation template contain, and what does it define?
    a: Resources. It defines each resource with a logical ID, type, and configuration properties.
    facts:
      - required-resources
      - logical-id
  - id: cloudformation-031
    q: How does CloudFormation order resources when resource A references resource B?
    a: B is created and updated before A, and deleted after A. Use DependsOn for an explicit dependency
      when no reference establishes it.
    facts:
      - implicit-order
      - explicit-order
  - id: cloudformation-063
    q: A CloudFormation template needs a generated resource attribute rather than its identifying value.
      Which function should the team choose?
    a: Fn::GetAtt. Ref returns the resource-specific identifying value; GetAtt reads a named attribute.
    facts:
      - ref
      - getatt
  - id: cloudformation-064
    q: Two CloudFormation resources have no reference between them, but one must finish creation first.
      What should the team add?
    a: DependsOn on the dependent resource. It establishes the missing order.
    facts:
      - explicit-order
  - id: cloudformation-065
    q: Which CloudFormation functions build strings from deployment values?
    a: Fn::Sub replaces variables in a string. Fn::Join joins a list with a separator.
    facts:
      - sub
      - join
diagrams:
  - id: cfn-dependency-order
    title: Create dependencies before their consumers
    width: 840
    height: 210
    nodes:
      - id: network
        label: Network resource
        icon: res-gear
        info: The referenced resource is created first and deleted last.
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: compute
        label: Dependent resource
        icon: res-gear
        info: Ref, GetAtt, Sub, or DependsOn establishes ordering.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: stack
        label: Stack resources
        icon: res-cloudformation-stack
        info: Independent resource operations can run in parallel.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: network
        to: compute
        step: 1
      - from: compute
        to: stack
        step: 2
    steps:
      - Create the referenced resource before its dependent.
      - Complete the remaining stack resources according to their dependencies.
---
CloudFormation turns a JSON or YAML template into a stack, a group of resources managed together. The template describes the resources; references tell CloudFormation which operations must happen first.

### How it works

1. Define resources under `Resources`. A logical ID is the name used to refer to a resource inside the template.
2. Supply optional inputs and logic using the sections below.
3. Use `Ref` for a parameter value or a resource's identifying value, and `Fn::GetAtt` for a documented attribute. Use `Fn::Sub` to substitute string variables or `Fn::Join` to join strings with a separator.
4. CloudFormation follows dependencies and runs independent operations in parallel. A referenced resource is created and updated first, then deleted last. Add `DependsOn` when the required order has no reference.

| Section | Purpose |
|---|---|
| Parameters | Inputs supplied for creation or update |
| Mappings | Lookup tables |
| Conditions | Decide whether resources exist or properties get values |
| Outputs | Expose selected stack values |
| Metadata | Additional template information |
| Rules | Validate parameters together |
| Transform | Apply template macros, which process template content |

### Exam cues

- If the question says a template must return a generated resource attribute, think `Fn::GetAtt`, because `Ref` returns the identifying value for that resource type.
- If the question says two resources must be ordered without referencing each other, think `DependsOn`, because independent operations can run in parallel.

### Remember

- `Resources` is the only required section.
- Creation order reverses for deletion: dependents go first.

> **Trap:** Ref does not always return an ARN. Its return value depends on the resource type.
