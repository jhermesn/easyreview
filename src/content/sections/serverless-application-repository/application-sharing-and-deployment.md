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
  - id: nested-definition
    text: A nested application is part of a larger serverless application.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-template-nested-applications.html#serverless-sam-template-nested-applications
  - id: capability-review
    text: The repository checks templates for IAM roles, resource policies and nested applications and requires acknowledgment of applicable capabilities before deployment.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: iam-capability
    text: Specified IAM resources require CAPABILITY_IAM or CAPABILITY_NAMED_IAM.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: resource-policy
    text: Certain resource policies require CAPABILITY_RESOURCE_POLICY.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
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
---
AWS Serverless Application Repository helps teams find, publish and deploy serverless applications, which use services that run code without managing servers. A publisher provides an AWS Serverless Application Model (SAM) template, a file defining the application's AWS resources, so others can reuse the application.

### How it works

1. Define the application in a SAM template and publish it with the console, SAM CLI or an AWS SDK.
2. Choose who can deploy it. New applications start private. A publisher can share with specific accounts, an AWS organization or everyone.
3. Check Region availability. Private and privately shared applications are available in their creation Region; public applications are available in all AWS Regions.

| Sharing setting | Who can deploy | Region availability |
| --- | --- | --- |
| Private | Publishing account | Creation Region |
| Privately shared | Specified accounts or organization | Creation Region |
| Public | Everyone | All AWS Regions |

When a public application is deployed in another Region, the repository copies its deployment artifacts, such as code, to an S3 bucket there and updates the template references.

### Exam cues

- If the question says find and deploy a reusable serverless application, think AWS Serverless Application Repository, because it lets developers find, deploy and publish applications.
- If the question says reuse a serverless application across accounts in one organization, think private sharing, because the publisher can grant the organization access.
- If the question says deploy a privately shared application in another Region, think creation Region, because privately shared applications are only available there.

### Remember

- Applications are private by default.
- Private application policies grant or deny access at the account level, not to individual users in an account.

> **Trap:** Sharing an application privately does not make it available in another Region.
