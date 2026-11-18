---
title: "PLACEHOLDER secrets-manager/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
