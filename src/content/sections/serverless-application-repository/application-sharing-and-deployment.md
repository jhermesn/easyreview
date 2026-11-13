---
title: Application sharing and deployment
level: associate
order: 10
facts:
  - id: serverless-definition
    text: Serverless technologies let customers run code and integrate applications without managing servers.
    source: https://aws.amazon.com/serverless/
  - id: purpose
    text: AWS Serverless Application Repository lets developers find, deploy and publish serverless applications.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html#what-is-serverlessrepo
  - id: sam-template
    text: Publishers define applications with an AWS SAM template and can publish using the console, SAM CLI or an AWS SDK.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-publishing-applications.html#serverlessrepo-publishing-applications
  - id: sharing
    text: Applications are private by default and can be shared with specific accounts, an AWS organization or everyone.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-how-to-publish.html#share-application
  - id: regions
    text: Private and privately shared applications are available only in their creation Region; public applications are available in all AWS Regions.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-publishing-applications.html#serverlessrepo-publishing-applications
  - id: public-copy
    text: When a public application is deployed in another Region, the repository copies deployment artifacts to an S3 bucket in that Region and updates template references.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-publishing-applications.html#serverlessrepo-publishing-applications
  - id: public-requirements
    text: Public sharing requires SemanticVersion and LicenseUrl properties.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-how-to-publish.html#share-application
  - id: nested-permission
    text: A consumer must have permission to deploy nested applications to deploy their parent application.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/application-deployment-permissions.html#application-deployment-permissions
  - id: nested-definition
    text: A nested application is part of a larger serverless application.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-template-nested-applications.html#serverless-sam-template-nested-applications
  - id: capability-review
    text: The repository checks templates for IAM roles, resource policies and nested applications and requires acknowledgment of applicable capabilities before deployment.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: named-iam
    text: Applications containing IAM resources with custom names require CAPABILITY_NAMED_IAM.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: iam-capability
    text: Specified IAM resources require CAPABILITY_IAM or CAPABILITY_NAMED_IAM.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: resource-policy
    text: Certain resource policies require CAPABILITY_RESOURCE_POLICY.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: nested-capability
    text: Applications with nested applications require CAPABILITY_AUTO_EXPAND.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: cli-deployment
    text: CLI deployment reviews requiredCapabilities, creates a CloudFormation change set with required capabilities and executes the change set.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-how-to-consume.html#acknowledging-application-capabilities-api
  - id: changeset-definition
    text: A CloudFormation change set previews proposed stack changes before execution.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
  - id: stack-definition
    text: A CloudFormation stack is a collection of AWS resources managed as one unit.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html#stacks
  - id: policy-scope
    text: For privately shared applications, repository application policies grant or deny access to AWS accounts, not individual users in an account.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/security_iam_resource-based-policy-examples.html#security_iam_resource-based-policy-examples
diagrams:
  - id: repository-cli-deployment
    title: Deploy a repository application with the CLI
    width: 800
    height: 190
    nodes:
      - { id: review, label: Review, sub: Required capabilities, x: 30, y: 50, w: 180, h: 86, icon: serverless-application-repository, tone: compute }
      - { id: create, label: Create change set, sub: Acknowledge capabilities, x: 310, y: 50, w: 180, h: 86, icon: serverless-application-repository, tone: compute }
      - { id: execute, label: Execute change set, x: 590, y: 57, w: 180, h: 72, icon: cloudformation, tone: mgmt }
    edges:
      - { from: review, to: create, step: 1 }
      - { from: create, to: execute, step: 2 }
    steps:
      - Review required capabilities and create the change set with those capabilities.
      - Execute the change set to deploy the application.
cards:
  - id: serverless-application-repository-001
    q: Where can a team find, publish and deploy reusable serverless applications?
    a: AWS Serverless Application Repository. Publishers define applications using AWS SAM templates.
    facts: [purpose, sam-template]
  - id: serverless-application-repository-002
    q: A team publishes an application to AWS Serverless Application Repository but has not configured sharing. Who can deploy it?
    a: The publishing account. Applications are private by default.
    facts: [sharing]
  - id: serverless-application-repository-003
    q: A company wants to share an AWS Serverless Application Repository application only with its organization. What should the publisher configure?
    a: Privately share the application with the AWS organization.
    facts: [sharing]
  - id: serverless-application-repository-004
    q: Can a privately shared AWS Serverless Application Repository application be deployed in a different Region from its creation Region?
    a: No. Private and privately shared applications are available only in their creation Region.
    facts: [regions]
    trap: true
  - id: serverless-application-repository-005
    q: What properties are required to share an AWS Serverless Application Repository application publicly?
    a: SemanticVersion and LicenseUrl.
    facts: [public-requirements]
  - id: serverless-application-repository-006
    q: A public AWS Serverless Application Repository parent contains a private nested application. Why might another account be unable to deploy the parent?
    a: The account also needs permission to deploy the nested application.
    facts: [nested-permission]
    trap: true
  - id: serverless-application-repository-007
    q: Which capability must be acknowledged when an AWS Serverless Application Repository application contains nested applications?
    a: CAPABILITY_AUTO_EXPAND.
    facts: [nested-capability]
  - id: serverless-application-repository-008
    q: Which capability is required when an AWS Serverless Application Repository application creates IAM resources with custom names?
    a: CAPABILITY_NAMED_IAM.
    facts: [named-iam]
  - id: serverless-application-repository-009
    q: After creating an AWS Serverless Application Repository CloudFormation change set using the CLI, what deploys the application?
    a: Execute the change set.
    facts: [cli-deployment]
---
AWS Serverless Application Repository helps teams find, publish and deploy serverless applications, which use services that run code without managing servers. A publisher provides an AWS Serverless Application Model (SAM) template, a file defining the application's AWS resources, so others can reuse the application.

### How it works

1. Define the application in a SAM template and publish it with the console, SAM CLI or an AWS SDK.
2. Choose who can deploy it. New applications start private. A publisher can share with specific accounts, an AWS organization or everyone.
3. A consumer reviews the template and permissions, configures the application and acknowledges any required capabilities, which declare the sensitive resources or nested applications to be created. A nested application is an application included inside another.
4. For CLI deployment, inspect `requiredCapabilities`, create a CloudFormation change set, a proposed set of changes to a stack, with those capabilities, then execute it to deploy. A stack is a collection of AWS resources managed as one unit.

| Sharing setting | Who can deploy | Region availability |
| --- | --- | --- |
| Private | Publishing account | Creation Region |
| Privately shared | Specified accounts or organization | Creation Region |
| Public | Everyone | All AWS Regions |

When a public application is deployed in another Region, the repository copies its deployment artifacts, such as code, to an S3 bucket there and updates the template references.

### Exam cues

- If the question says reuse a serverless application across accounts in one organization, think private sharing, because the publisher can grant the organization access.
- If the question says deploy a public parent with a restricted nested application, think nested application permissions, because the consumer must be allowed to deploy the nested application too.
- If the question says a template creates named IAM resources, think `CAPABILITY_NAMED_IAM`, because deployment requires that acknowledgment.
- If the question says an application contains nested applications, think `CAPABILITY_AUTO_EXPAND`, because deployment requires that capability.

### Remember

- Public sharing requires `SemanticVersion` and `LicenseUrl`.
- Private application policies grant or deny access at the account level, not to individual users in an account.
- Review application permissions before acknowledging capabilities.

| Capability | When required |
| --- | --- |
| `CAPABILITY_IAM` | Specified IAM resources without custom names, unless `CAPABILITY_NAMED_IAM` is used |
| `CAPABILITY_NAMED_IAM` | IAM resources with custom names |
| `CAPABILITY_RESOURCE_POLICY` | Certain resource policies |
| `CAPABILITY_AUTO_EXPAND` | Nested applications |

> **Trap:** Public access to a parent does not override a nested application's sharing restrictions.
