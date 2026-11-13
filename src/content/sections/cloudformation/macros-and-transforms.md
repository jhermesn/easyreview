---
title: Macros and transforms
level: professional
order: 200
facts:
  - id: macro
    text: A CloudFormation macro uses a Lambda function to process a template or snippet before resource
      provisioning.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-overview
  - id: macro-resource
    text: AWS::CloudFormation::Macro registers the Lambda function that provides custom template
      processing.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-overview
  - id: transform
    text: The Transform section invokes a macro on an entire template; Fn::Transform invokes it on part
      of a template.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-overview
  - id: processed
    text: CloudFormation generates a change set from macro-processed content, which can introduce
      additional resources.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-overview
  - id: review-macro
    text: AWS recommends reviewing the processed change set before execution.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-change-sets
  - id: auto-expand
    text: Direct stack creation or updating with macros without prior change set review requires
      CAPABILITY_AUTO_EXPAND.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-change-sets
  - id: include
    text: AWS::Include is a CloudFormation-hosted transform that inserts reusable template snippets.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html#template-macros
  - id: serverless
    text: AWS::Serverless is a CloudFormation-hosted transform that expands SAM syntax into
      CloudFormation resources.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html#template-macros
  - id: service-managed-macros
    text: Service-managed StackSets do not support templates containing macros.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-considerations
  - id: macro-scope
    text: A macro must be defined in the account using it; multiple account macro definitions can
      reference a shared Lambda function with cross-account access.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-permissions
cards:
  - id: cloudformation-021
    q: What is a CloudFormation macro, and when is its output used?
    a: A Lambda-backed template processor registered with AWS::CloudFormation::Macro. Transform
      processes the full template and Fn::Transform processes a snippet before the processed
      resources are provisioned. AWS::Include and AWS::Serverless are hosted transforms.
    facts:
      - macro
      - macro-resource
      - transform
      - include
      - serverless
  - id: cloudformation-119
    q: A CloudFormation template uses custom shorthand that expands into several resources. How should a
      team review the resulting deployment?
    a: Create and inspect a processed change set before executing it. Macro expansion can add resources
      that were not explicit in the submitted template.
    facts:
      - processed
      - review-macro
  - id: cloudformation-120
    q: A team directly creates a CloudFormation stack containing a macro without reviewing a change set.
      Which acknowledgment is required?
    a: CAPABILITY_AUTO_EXPAND. It acknowledges direct macro processing before the stack operation.
    facts:
      - auto-expand
  - id: cloudformation-121
    q: Can a CloudFormation macro definition in one account automatically be called by templates in
      every other account?
    a: No. Define the macro in each account that uses it. Those definitions can reference a shared
      Lambda function if cross-account access is granted.
    trap: true
    facts:
      - macro-scope
diagrams:
  - id: cfn-macro-expansion
    title: Expand the template before reviewing resource changes
    width: 840
    height: 210
    nodes:
      - id: input
        label: Input template
        icon: res-cloudformation-template
        info: Transform or Fn::Transform selects template content for processing.
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: macro
        label: Macro Lambda
        icon: lambda
        info: Return the processed template or snippet.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: preview
        label: Change set
        icon: res-cloudformation-change-set
        info: Review resources introduced by the processed content before execution.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: input
        to: macro
        step: 1
      - from: macro
        to: preview
        step: 2
    steps:
      - Send template content to the registered macro Lambda function.
      - Create the change set using the processed content.
---
A CloudFormation macro processes template text before CloudFormation provisions the resulting resources. It lets template authors use reusable snippets or custom syntax that expands into a CloudFormation template.

### How it works

1. Implement a Lambda function that accepts template content and returns processed content. Register it with `AWS::CloudFormation::Macro`.
2. Reference the macro in `Transform` for the whole template or `Fn::Transform` for a snippet, a selected part of the template.
3. Create a change set from the processed template and review it, because the macro can add resources.
4. Execute the reviewed change set. If creating or updating directly without that review, acknowledge `CAPABILITY_AUTO_EXPAND`.

| Transform | Processing |
|---|---|
| Custom macro | Lambda-defined template changes |
| `AWS::Include` | Insert reusable template snippets |
| `AWS::Serverless` | Expand SAM syntax into CloudFormation resources |

### Exam cues

- If the question says custom template syntax must expand before provisioning, think a macro, because its Lambda function transforms the template first.
- If the question says directly deploy a macro template without change set review, think `CAPABILITY_AUTO_EXPAND`, because expansion must be acknowledged.

### Remember

- Define the macro in each account that uses it. Definitions can share a Lambda function with cross-account access.
- Service-managed StackSets do not support macro-containing templates.

> **Trap:** The submitted template is not the complete resource plan when macros are involved. Review the processed change set to see what expansion introduces.
