---
title: Parameters, mappings, and conditions
level: associate
order: 20
facts:
  - id: parameters
    text: Parameters supplies typed inputs each time a stack is created or updated.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure
  - id: parameter-type
    text: Type is required for each parameter; a parameter without a Default needs an input value at
      creation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-syntax
  - id: constraints
    text: AllowedValues and AllowedPattern constrain allowed parameter values; MinLength and MaxLength
      constrain strings, and MinValue and MaxValue constrain numbers.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties
  - id: constraint-message
    text: ConstraintDescription supplies an explanation when a parameter constraint is violated.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties
  - id: pseudo
    text: AWS::Region, AWS::AccountId, and AWS::StackName are built-in pseudo parameters supplied by
      CloudFormation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/pseudo-parameter-reference.html#pseudo-parameter-reference
  - id: mapping
    text: Mappings holds literal lookup values retrieved with Fn::FindInMap.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html#mappings-section-structure
  - id: condition
    text: A Condition attached to a resource controls whether CloudFormation creates that resource.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html#associate-conditions-with-resources
  - id: if
    text: Fn::If selects a value based on a condition; returning AWS::NoValue removes the corresponding
      property.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html#using-fn-if-with-novalue
  - id: ssm-type
    text: AWS::SSM::Parameter::Value<AWS::EC2::Image::Id> takes a Parameter Store key and resolves its
      latest value for a stack operation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-supplied-parameter-types.html#cloudformation-supplied-parameter-types
  - id: ssm-resource
    text: The AWS::SSM::Parameter resource creates a parameter in Systems Manager Parameter Store.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-ssm-parameter.html#aws-resource-ssm-parameter
  - id: ssm-plaintext-reference
    text: An ssm dynamic reference retrieves a plaintext String or StringList value from Parameter Store.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references-ssm.html#dynamic-references-ssm
  - id: ssm-existing
    text: UsePreviousValue on an SSM parameter type preserves the key, not its previously resolved value.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-supplied-parameter-types.html#cloudformation-supplied-parameter-types
  - id: ssm-change-set
    text: SSM parameter types resolve at change set creation; executing that change set uses those
      resolved values.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-supplied-parameter-types.html#cloudformation-supplied-parameter-types
  - id: public-ami
    text: AWS public Parameter Store parameters can supply current AMI IDs without a Region-to-AMI
      mapping.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-supplied-parameter-types.html#cloudformation-supplied-parameter-types
  - id: azs
    text: Fn::GetAZs returns available Availability Zone names for a Region; an empty Region argument
      means the stack Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getavailabilityzones.html#region
  - id: az-filter
    text: Fn::GetAZs returns zones with default subnets unless none have a default subnet, and its
      result order can change.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getavailabilityzones.html#intrinsic-function-reference-getavailabilityzones
  - id: select
    text: Fn::Select uses a zero-based list index and fails on an invalid index or a selected null value.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-select.html#intrinsic-function-reference-select
  - id: cidr
    text: Fn::Cidr splits an address block into a requested list of smaller CIDR blocks, with count from
      1 to 256.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-cidr.html#intrinsic-function-reference-cidr-parameters
cards:
  - id: cloudformation-029
    q: How do CloudFormation parameters, pseudo parameters, and mappings differ?
    a: Parameters are supplied inputs. Pseudo parameters such as AWS::Region come from CloudFormation.
      Mappings are literal lookup tables read with Fn::FindInMap.
    facts:
      - parameters
      - pseudo
      - mapping
  - id: cloudformation-030
    q: How can a CloudFormation template create a resource only for a production environment?
    a: Define a condition using the environment input and attach it with Condition. Use Fn::If for
      conditional property values and AWS::NoValue to remove a property.
    facts:
      - condition
      - if
  - id: cloudformation-054
    q: A CloudFormation template must serve test and production without manual edits. Which features
      select values and resources?
    a: Parameters supply inputs, mappings supply lookup values, and conditions control resource
      creation.
    facts:
      - parameters
      - mapping
      - condition
  - id: cloudformation-056
    q: CloudFormation stacks must resolve a current AMI without hardcoded IDs. What parameter type
      should they use?
    a: AWS::SSM::Parameter::Value<AWS::EC2::Image::Id> with an AWS public Parameter Store key.
      UsePreviousValue preserves the key, so a later operation can resolve a newer AMI.
    trap: true
    facts:
      - ssm-type
      - public-ami
      - ssm-existing
  - id: cloudformation-066
    q: A CloudFormation template must reject an environment outside an approved list and explain the
      error. What should the team set?
    a: AllowedValues and ConstraintDescription on the parameter. Use AllowedPattern for a string
      pattern, length bounds for strings, and value bounds for numbers.
    facts:
      - constraints
      - constraint-message
  - id: cloudformation-067
    q: A CloudFormation template must select an Availability Zone without hardcoding its name. Which
      functions should it combine?
    a: Fn::GetAZs and Fn::Select. Verify that the selected zero-based index exists; default-subnet
      filtering can shorten the list and its order can change.
    trap: true
    facts:
      - azs
      - az-filter
      - select
  - id: cloudformation-068
    q: Which CloudFormation function generates subnet address ranges from a larger address block?
    a: Fn::Cidr. It returns a list of smaller CIDR blocks and accepts a count from 1 to 256.
    facts:
      - cidr
  - id: cloudformation-069
    q: A Parameter Store AMI value changes after a CloudFormation change set is created. Which value
      does execution use?
    a: The value resolved when the change set was created. Create a new change set to resolve a later
      value.
    trap: true
    facts:
      - ssm-change-set
  - id: cloudformation-136
    q: A CloudFormation template needs a new Parameter Store parameter, while another template reads an existing AMI parameter. Which features serve each need?
    a: Use an AWS::SSM::Parameter resource to create the parameter. Use AWS::SSM::Parameter::Value<AWS::EC2::Image::Id> to read an existing AMI value.
    facts:
      - ssm-resource
      - ssm-type
  - id: cloudformation-139
    q: A CloudFormation template needs a plaintext String value from an existing Systems Manager Parameter Store parameter. Which dynamic reference can retrieve it?
    a: Use an ssm dynamic reference to the existing parameter.
    facts:
      - ssm-plaintext-reference
---
Parameters, mappings, and conditions let one CloudFormation template serve different environments. Parameters are inputs, mappings are lookup tables, and conditions decide which resources or property values apply.

### How it works

1. Give every parameter a `Type`. Supply a `Default` or require an input at stack creation. Use `AllowedValues`, `AllowedPattern`, string length bounds, or numeric value bounds to reject unsuitable inputs. `ConstraintDescription` explains a constraint failure.
2. Use built-in pseudo parameters such as `AWS::Region`, `AWS::AccountId`, and `AWS::StackName` for deployment context. Read literal mapping values with `Fn::FindInMap`.
3. Attach a `Condition` to resources that should exist only in some environments. Use `Fn::If` for property values and return `AWS::NoValue` to omit a property.
4. Resolve environment details with the functions and parameter types below.

To create a Parameter Store parameter, declare an `AWS::SSM::Parameter` resource. To read an existing AMI parameter, use the SSM parameter type below. An `ssm` dynamic reference can also retrieve an existing plaintext `String` or `StringList` value.

| Need | Template feature | Behavior |
|---|---|---|
| Current AMI from Parameter Store | `AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>` | Takes a key, including an AWS public parameter key, and resolves its latest value |
| Available zone names | `Fn::GetAZs` | Empty Region argument uses the stack Region; default-subnet filtering applies |
| One element from a list | `Fn::Select` | Uses a zero-based index; invalid indexes or selected null values fail |
| Smaller subnet address ranges | `Fn::Cidr` | Returns smaller CIDR blocks, which describe network address ranges |

### Exam cues

- If the question says one template must serve test and production, think parameters and conditions, because inputs and conditional resources avoid manual template edits.
- If the question says a string input must match an approved pattern, think `AllowedPattern`, because the parameter constraint rejects other values.
- If the question says current AMI IDs must work across Regions, think an SSM parameter type with an AWS public parameter key, because the stack operation resolves the value.
- If the question says create a Parameter Store parameter, think `AWS::SSM::Parameter` resource, because an SSM parameter type reads an existing key instead.

### Remember

- `UsePreviousValue` preserves the SSM key, not the old resolved value.
- SSM parameter types resolve during change set creation; execution uses that resolved value.
- `Fn::Cidr` accepts a count from 1 to 256.
- `Fn::GetAZs` can filter out zones without default subnets; its result order can change.

> **Trap:** Selecting a fixed list index does not guarantee that the Availability Zone exists in every account. Check the available list before selecting an element.
