---
title: Public sharing and deployment capabilities
level: professional
order: 20
facts:
  - id: public-requirements
    text: Public sharing requires SemanticVersion and LicenseUrl properties.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-how-to-publish.html#share-application
  - id: nested-permission
    text: A consumer must have permission to deploy nested applications to deploy their parent application.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/application-deployment-permissions.html#application-deployment-permissions
  - id: nested-capability
    text: Applications with nested applications require CAPABILITY_AUTO_EXPAND.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: named-iam
    text: Applications containing IAM resources with custom names require CAPABILITY_NAMED_IAM.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/acknowledging-application-capabilities.html#acknowledging-application-capabilities
  - id: cli-deployment
    text: CLI deployment reviews requiredCapabilities, creates a CloudFormation change set with required capabilities and executes the change set.
    source: https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-how-to-consume.html#acknowledging-application-capabilities-api
cards:
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
AWS Serverless Application Repository public sharing and deployment involve requirements for application properties, permissions and capabilities. A consumer deploying a parent application must also have permission to deploy its nested applications.

### How it works

1. For public sharing, provide `SemanticVersion` and `LicenseUrl`.
2. For a parent with nested applications, ensure the consumer has permission to deploy the nested applications.
3. Review the required capabilities.
4. For CLI deployment, review `requiredCapabilities`, create a CloudFormation change set with the required capabilities, then execute the change set to deploy.

### Exam cues

- If the question says a public parent contains a private nested application, think nested deployment permission, because the consumer needs permission to deploy the nested application too.
- If the question says an application contains nested applications, think `CAPABILITY_AUTO_EXPAND`, because it must be acknowledged.
- If the question says an application creates IAM resources with custom names, think `CAPABILITY_NAMED_IAM`, because it is required for those resources.
- If the question says a CLI change set has been created, think execute it, because execution deploys the application.

### Remember

- Public sharing requires `SemanticVersion` and `LicenseUrl`.
- Review `requiredCapabilities` before creating the change set with the required capabilities.

> **Trap:** A public parent does not give a consumer permission to deploy a restricted nested application.
