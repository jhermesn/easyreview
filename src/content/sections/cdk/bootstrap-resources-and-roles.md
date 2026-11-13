---
title: Bootstrap resources and roles
level: associate
order: 30
facts:
  - id: environment
    text: A CDK environment is an AWS account and Region.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html#bootstrapping-what
  - id: bootstrap-environments
    text: Bootstrap each account and Region intended for CDK deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html#bootstrapping-what
  - id: resources
    text: Bootstrapping provisions an S3 asset bucket, an ECR image repository and IAM roles.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html#bootstrapping-what
  - id: stack-name
    text: The bootstrap CloudFormation stack is named CDKToolkit by default.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html#bootstrapping-how
  - id: version
    text: The bootstrap stack includes an SSM parameter that records the bootstrap template version.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrap-template-history
  - id: execution
    text: CloudFormationExecutionRole is the service role CloudFormation uses to provision resources.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: deployment
    text: DeploymentActionRole is assumed by the CDK CLI for deployment and can be assumed across
      accounts.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: files
    text: FilePublishingRole uploads and deletes file assets in the bootstrap S3 bucket.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: images
    text: ImagePublishingRole publishes image assets to the bootstrap ECR repository.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: lookup
    text: LookupRole grants read-only access for context lookups.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: missing
    text: A missing /cdk-bootstrap/.../version SSM parameter error can indicate that the target
      environment has not been bootstrapped.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-when
  - id: exception
    text: Without bootstrap resources, only stacks with no assets and synthesized templates under 51,200
      bytes can deploy.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html
  - id: principals
    text: For CDK Pipelines, invalid principals in a target environment can mean bootstrap IAM roles do
      not exist; an unbootstrapped environment is the most likely cause.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-pipelines
  - id: scale
    text: cdk bootstrap --show-template exports the bootstrap template for deployment with
      CloudFormation tools such as StackSets or Control Tower.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-howto
  - id: updates
    text: Re-running cdk bootstrap upgrades the bootstrap stack if needed and otherwise makes no change.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-when
  - id: protect
    text: Deleting a bootstrap stack breaks its pipeline and has no general recovery solution.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-pipelines
  - id: termination
    text: --termination-protection protects the bootstrap stack against accidental deletion.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-pipelines
  - id: role-identity
    text: An IAM role is an identity that can be assumed to obtain its permissions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
cards:
  - id: cdk-006
    q: What resources does AWS CDK bootstrapping create for an environment?
    a: The CDKToolkit stack by default, with an S3 asset bucket, ECR image repository, IAM roles and an
      SSM bootstrap version parameter. An environment is an account and Region.
    facts:
      - resources
      - stack-name
      - version
      - environment
      - bootstrap-environments
  - id: cdk-007
    q: What are the five default AWS CDK bootstrap roles used for?
    a: "CloudFormationExecutionRole: provision resources. DeploymentActionRole: submit deployments.
      FilePublishingRole: S3 assets. ImagePublishingRole: ECR assets. LookupRole: read-only context
      lookups."
    facts:
      - execution
      - deployment
      - files
      - images
      - lookup
  - id: cdk-008
    q: An AWS CDK deployment reports a missing bootstrap version SSM parameter. What should the team
      check?
    a: Check that the intended account and Region are bootstrapped. Without bootstrap resources, only
      asset-free stacks with templates under 51,200 bytes can deploy.
    trap: true
    facts:
      - missing
      - environment
      - bootstrap-environments
      - exception
  - id: cdk-009
    q: A CDK Pipeline fails in a target account with a policy containing invalid principals. What
      bootstrap problem should the team investigate?
    a: Missing target bootstrap roles. The target account and Region may not have been bootstrapped.
    trap: true
    facts:
      - principals
      - environment
      - bootstrap-environments
  - id: cdk-012
    q: Many AWS accounts need identical CDK bootstrap resources. How can a team distribute the template
      and protect the stacks?
    a: Export it with cdk bootstrap --show-template and deploy with StackSets or Control Tower. Enable
      --termination-protection and upgrade existing stacks rather than deleting them.
    facts:
      - scale
      - protect
      - termination
      - updates
  - id: cdk-025
    q: Should an AWS CDK bootstrap stack be deleted and recreated when its template changes?
    a: No. Re-run cdk bootstrap to upgrade it. Deleting it breaks the pipeline and has no general
      recovery solution.
    trap: true
    facts:
      - updates
      - protect
      - termination
---
Bootstrapping prepares an AWS account and Region for CDK deployments. It creates the storage and IAM roles that deployment tools need before they can publish application assets and submit templates. An IAM role is an identity that a tool or service assumes to obtain permissions.

### How it works

1. Bootstrap each target environment, meaning each account and Region.
2. CloudFormation creates `CDKToolkit` by default, including an S3 bucket, ECR repository, IAM roles and an SSM parameter that records the bootstrap version.
3. The CDK CLI uses separate roles for lookups, file publishing, image publishing and deployment. CloudFormation uses its service role to create resources.
4. Re-run `cdk bootstrap` to upgrade the stack when needed. Enable `--termination-protection` to prevent accidental deletion.

| Role | Purpose |
|---|---|
| `CloudFormationExecutionRole` | Let CloudFormation provision resources |
| `DeploymentActionRole` | Submit deployments, including across accounts |
| `FilePublishingRole` | Publish files to S3 |
| `ImagePublishingRole` | Publish images to ECR |
| `LookupRole` | Read environment information for context |

### Exam cues

- If the question says the bootstrap version parameter is missing, think bootstrap the intended environment, because the deployment expects its supporting stack.
- If the question says a CDK Pipeline reports invalid principals in the target, think missing bootstrap roles, because the policy references roles that may not exist.
- If the question says many accounts need identical bootstrap resources, think export the template and use StackSets, because the template can be deployed with CloudFormation tools.

### Remember

- Default stack name: `CDKToolkit`. Default bootstrap roles: five.
- The unbootstrapped exception requires no assets and a template under 51,200 bytes.
- Re-running bootstrap upgrades when needed; otherwise it makes no change.

> **Trap:** Deleting the bootstrap stack deletes supporting resources and breaks the pipeline. AWS documents no general recovery solution; update the stack in place.
