---
title: Rotation workflow and coordination
level: professional
order: 60
facts:
  - id: create
    text: The createSecret step stores the new secret version with the AWSPENDING staging label.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html#rotate-secrets_lambda-functions-code
  - id: set
    text: The setSecret step changes the database or service credential to match AWSPENDING.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html#rotate-secrets_lambda-functions-code
  - id: test
    text: The testSecret step uses AWSPENDING to test access to the database or service.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html#rotate-secrets_lambda-functions-code
  - id: finish
    text: The finishSecret step moves AWSCURRENT to the new version, and Secrets Manager assigns
      AWSPREVIOUS to the former current version.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html#rotate-secrets_lambda-functions-code
  - id: repeat
    text: The rotation ClientRequestToken identifies the new version and supports idempotency, meaning
      retries avoid creating the same change twice.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda.html
  - id: schedule
    text: Secrets Manager rotation schedules use UTC rate() or cron() expressions and can rotate as
      frequently as every four hours.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_managed.html
  - id: managed-property
    text: CloudFormation ManageMasterUserPassword enables Secrets Manager management of master
      credentials for supported RDS and Aurora DB clusters.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-managemasteruserpassword
  - id: origin-sync
    text: AWS documents Lambda rotation that updates both a CloudFront origin custom header and the WAF
      rule protecting the origin ALB.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: origin-overlap
    text: The documented CloudFront origin-header rotation accepts both AWSPENDING and AWSCURRENT in the
      WAF rule while the distribution change propagates.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
cards:
  - id: secrets-manager-003
    q: What does a Secrets Manager Lambda rotation function do, in order?
    a: createSecret stores AWSPENDING; setSecret changes the target credential; testSecret tests access;
      finishSecret promotes AWSCURRENT and retains the old version as AWSPREVIOUS.
    facts:
      - create
      - set
      - test
      - finish
  - id: secrets-manager-020
    q: What prevents retries of a Secrets Manager rotation request from creating the same new version
      twice?
    a: The ClientRequestToken identifying the version supports idempotency across retries.
    facts:
      - repeat
  - id: secrets-manager-021
    q: What time zone and minimum interval can a Secrets Manager rotation schedule use?
    a: UTC, using rate() or cron(); rotation can run as often as every four hours.
    facts:
      - schedule
  - id: secrets-manager-033
    q: An Aurora DB cluster declared in CloudFormation should have its master password managed in
      Secrets Manager. Which property enables this?
    a: Set ManageMasterUserPassword on AWS::RDS::DBCluster.
    facts:
      - managed-property
  - id: secrets-manager-034
    q: A CloudFront origin header stored in Secrets Manager must rotate without WAF rejecting requests
      during propagation. What must the rotation coordinate?
    a: Update both the CloudFront custom origin header and the WAF rule on the origin ALB. Temporarily
      accept AWSPENDING and AWSCURRENT while the distribution change propagates.
    facts:
      - origin-sync
      - origin-overlap
---
Secrets Manager Lambda rotation coordinates a new secret version with the credential used by a database or service. Staging labels track the pending, current, and previous versions through the rotation workflow.

### How it works

1. `createSecret` stores the new version with the `AWSPENDING` label.
2. `setSecret` changes the database or service credential to match `AWSPENDING`, and `testSecret` uses that value to test access.
3. `finishSecret` moves `AWSCURRENT` to the new version. Secrets Manager assigns `AWSPREVIOUS` to the former current version.
4. For retries, the ClientRequestToken identifies the new version and supports idempotency, so a retry does not create the same change twice.

In AWS's CloudFront origin-header example, Lambda rotation updates both the CloudFront custom origin header and the WAF rule protecting the origin Application Load Balancer (ALB). The rule accepts both `AWSPENDING` and `AWSCURRENT` while the distribution change propagates.

### Exam cues

- If the question says a rotation retry must not create the same version twice, think `ClientRequestToken`, because it identifies the new version and supports idempotency.
- If the question says an Aurora cluster in CloudFormation needs its master password managed in Secrets Manager, think `ManageMasterUserPassword` on `AWS::RDS::DBCluster`, because the property enables that management.
- If the question says a CloudFront origin header must rotate during distribution propagation, think coordinated CloudFront and WAF updates, because the documented rule accepts both pending and current values during the change.

### Remember

- Lambda order: `createSecret`, `setSecret`, `testSecret`, `finishSecret`.
- `AWSPENDING` is tested before `AWSCURRENT` moves; the former current version becomes `AWSPREVIOUS`.
- Rotation schedules use UTC `rate()` or `cron()` expressions and can run as often as every four hours.

> **Trap:** Updating the CloudFront header alone is not enough in the documented origin-header rotation. The WAF rule must accept both the current and pending values while the distribution change propagates.
