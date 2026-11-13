---
title: Provisioning tool selection
level: associate
order: 10
facts:
  - id: stack
    text: CloudFormation provisions resources described in a template and manages them together as a stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html
  - id: cdk
    text: AWS CDK defines infrastructure in supported programming languages and synthesizes CloudFormation templates for deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/home.html
  - id: construct
    text: A CDK construct is a reusable component that defines cloud infrastructure.
    source: https://docs.aws.amazon.com/cdk/v2/guide/home.html
  - id: sam
    text: AWS SAM extends CloudFormation with shorthand serverless resource definitions.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
  - id: sam-local
    text: SAM CLI supports local testing of serverless applications, including CDK applications.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
  - id: modules
    text: CloudFormation modules package reusable resource configurations and support versioning.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html
  - id: catalog
    text: Service Catalog administrators organize products into portfolios and grant end users access to approved product versions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html
  - id: constraints
    text: Service Catalog constraints control product deployment choices and launch permissions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html
  - id: nested
    text: Nested stacks group child stacks under a parent so resources can be managed from one stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html
  - id: exports
    text: Export and Fn::ImportValue share stack outputs only within the same account and Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html
  - id: export-lock
    text: An exported output cannot be changed, or its exporting stack deleted, while another stack imports it.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html
  - id: weak-output
    text: Fn::GetStackOutput supports cross-account and cross-Region output references resolved at create or update time without automatically updating consumers later.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html
  - id: stacksets
    text: StackSets deploy stacks from one template across selected accounts and Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html
  - id: changes
    text: A CloudFormation change set previews proposed stack changes and applies them only when executed.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html
  - id: drift
    text: Drift detection compares supported resource properties with values explicitly defined in the template or parameters.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html
  - id: creation
    text: CreationPolicy waits for resource success signals or a timeout during creation of supported resources.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-creationpolicy.html
  - id: update
    text: UpdatePolicy controls supported resource updates, including Auto Scaling rolling replacement.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html
  - id: custom
    text: Custom resources run custom provisioning logic during stack create, applicable update, and delete operations.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html
  - id: macro
    text: A CloudFormation macro transforms template content before resources are provisioned.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
  - id: hooks
    text: CloudFormation Hooks inspect configurations before provisioning and can fail the operation or warn and allow it.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html
  - id: stack-policy
    text: A stack policy protects selected resources against updates during stack update operations.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html
  - id: state
    text: State Manager associations maintain desired configurations on targeted managed nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html
  - id: ami
    text: The AWS-UpdateLinuxAmi Automation runbook updates an AMI with Linux packages and Amazon software.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-updatelinuxami.html
diagrams:
  - id: configuration-provisioning
    title: CDK definitions become managed resources
    width: 800
    height: 180
    nodes:
      - id: cdk
        label: CDK
        icon: cloud-development-kit
        tone: devtools
        x: 30
        y: 45
        w: 200
        h: 86
      - id: cfn
        label: CloudFormation
        icon: cloudformation
        tone: mgmt
        x: 300
        y: 45
        w: 200
        h: 86
      - id: ec2
        label: EC2 resources
        icon: res-ec2-instances
        tone: compute
        x: 570
        y: 45
        w: 200
        h: 86
    edges:
      - from: cdk
        to: cfn
        step: 1
      - from: cfn
        to: ec2
        step: 2
    steps:
      - CDK synthesizes a CloudFormation template.
      - CloudFormation provisions the resources as a stack.
cards:
  - id: configuration-management-001
    q: Which AWS infrastructure tools fit programming-language reuse, serverless shorthand, and direct templates?
    a: CDK for code and constructs; SAM for serverless shorthand; CloudFormation for direct templates. CDK and SAM deploy through CloudFormation.
    facts:
      - cdk
      - construct
      - sam
      - stack
  - id: configuration-management-002
    q: How do AWS CDK and AWS SAM relate to CloudFormation deployments?
    a: CDK synthesizes CloudFormation templates. SAM extends template syntax for serverless resources. CloudFormation manages the resulting stacks.
    facts:
      - cdk
      - sam
      - stack
  - id: configuration-management-004
    q: A team must provision EC2 infrastructure and keep its operating-system settings consistent afterward. Which AWS tools fit?
    a: CloudFormation for provisioning, followed by State Manager associations for desired configuration.
    facts:
      - stack
      - state
  - id: configuration-management-005
    q: Developers need reusable infrastructure components, while operators need approved self-service products. Which AWS tools fit?
    a: CDK constructs or CloudFormation modules for authoring reuse; Service Catalog products and portfolios for governed self-service.
    facts:
      - construct
      - modules
      - catalog
      - constraints
  - id: configuration-management-006
    q: A company must deploy the same CloudFormation baseline in many accounts and Regions. Which feature fits?
    a: StackSets. It manages stacks from one template across the selected accounts and Regions.
    facts:
      - stacksets
  - id: configuration-management-007
    q: A CloudFormation consumer needs an output from a stack in another Region. Can Fn::ImportValue supply it?
    a: No. Use Fn::GetStackOutput for cross-Region references, and explicitly update consumers when the producer changes.
    trap: true
    facts:
      - exports
      - weak-output
  - id: configuration-management-008
    q: A team wants CloudFormation to reject resource configurations before provisioning. Which extension fits?
    a: A CloudFormation Hook configured to fail the operation. A macro transforms templates, and a custom resource implements provisioning logic.
    facts:
      - hooks
      - macro
      - custom
---
Infrastructure as code describes resources in files so deployments can be repeated. CloudFormation manages a stack, a collection of resources created from a template. CDK and SAM provide different ways to author that infrastructure.

### How it works

1. Choose the authoring format. CDK uses programming languages and reusable constructs; SAM uses shorthand for serverless resources; CloudFormation accepts direct templates.
2. Package reusable definitions as modules or child templates called nested stacks. Offer approved products through Service Catalog portfolios, which group products and control user access.
3. Create a change set, a preview of proposed stack changes. Review it, then execute it to apply the update.
4. Use StackSets when the same template must create stacks across accounts and Regions. Use State Manager afterward to maintain settings inside managed servers.

| Need | Tool or feature |
|---|---|
| Programming-language infrastructure and reusable components | CDK constructs |
| Serverless templates and local testing | SAM and SAM CLI, which also supports CDK apps |
| Reusable resource configurations within templates | CloudFormation modules |
| Approved versions, access, and launch constraints for users | Service Catalog |
| Related child templates managed through a parent | Nested stacks |
| Share outputs within one account and Region | Export and Fn::ImportValue |
| Read outputs across accounts or Regions | Fn::GetStackOutput, a reference resolved during create or update |
| Wait for configuration success during creation | CreationPolicy on supported resources |
| Control Auto Scaling rolling replacement | UpdatePolicy |
| Custom provisioning logic | Custom resource |
| Transform template content | Macro |
| Inspect and reject configurations before provisioning | Hook configured to fail |
| Protect resources during stack updates | Stack policy |

### Exam cues

- If the question says deploy one baseline to many accounts and Regions, think StackSets, because it creates stacks from the same template across targets.
- If the question says users may launch only approved product versions, think Service Catalog, because portfolios, permissions, and constraints govern self-service provisioning.
- If the question says patch a Linux machine image, think AWS-UpdateLinuxAmi, because this Automation runbook updates an AMI, an image used to launch instances.

### Remember

- Change sets apply changes only when executed.
- Imported exports prevent changing the exported value or deleting its stack until imports are removed.
- Fn::GetStackOutput does not automatically update a consumer when the source output changes.
- Drift means actual resource settings differ from template expectations. Detection covers supported properties explicitly set in templates or parameters.

> **Trap:** A stack policy protects resources during stack updates. A Hook configured to fail can reject provisioning. Select the control for the operation being tested.
