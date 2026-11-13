---
title: Managed and Lambda rotation
level: associate
order: 20
facts:
  - id: rotation
    text: Secrets Manager credential rotation updates both the stored secret and the database or service
      credential.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
  - id: managed
    text: Managed rotation lets a supporting service configure and manage secret rotation without a
      Lambda rotation function.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_managed.html
  - id: managed-db
    text: RDS and Aurora support managed rotation for their master user credentials.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_managed.html
  - id: external
    text: Secrets Manager managed external secrets can rotate secrets held by supported partners without
      a Lambda function.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
  - id: lambda
    text: Other Secrets Manager secrets can use a Lambda rotation function, with a custom function when
      no suitable template exists.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html
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
  - id: single
    text: Single-user database rotation changes one user password; existing open connections remain, but
      new authentication can fail briefly between the database update and secret promotion.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotation-strategy.html#rotating-secrets-one-user-one-password
  - id: alternating
    text: Alternating-users rotation switches between an original and cloned database user, using a
      separate privileged secret to clone the user; both credentials remain valid after rotation.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotation-strategy.html#rotating-secrets-two-users
  - id: schedule
    text: Secrets Manager rotation schedules use UTC rate() or cron() expressions and can rotate as
      frequently as every four hours.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_managed.html
  - id: policies
    text: Parameter Store advanced parameter policies are Expiration, ExpirationNotification, and
      NoChangeNotification; they delete or notify rather than rotate database credentials.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html
  - id: external-launch
    text: Secrets Manager managed external secrets launched in November 2025.
    source: https://aws.amazon.com/about-aws/whats-new/2025/11/aws-secrets-manager-managed-external-secrets/
  - id: managed-property
    text: CloudFormation ManageMasterUserPassword enables Secrets Manager management of master
      credentials for supported RDS and Aurora DB clusters.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-managemasteruserpassword
  - id: attachment
    text: CloudFormation AWS::SecretsManager::SecretTargetAttachment adds the target database connection
      information to the secret JSON required for database rotation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-secretsmanager-secrettargetattachment.html
  - id: origin-sync
    text: AWS documents Lambda rotation that updates both a CloudFront origin custom header and the WAF
      rule protecting the origin ALB.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: origin-overlap
    text: The documented CloudFront origin-header rotation accepts both AWSPENDING and AWSCURRENT in the
      WAF rule while the distribution change propagates.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: origin-test
    text: The documented origin-header rotation tests both AWSPENDING and AWSCURRENT header values
      against the ALB before finishSecret.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: origin
    text: A CloudFront origin is the backend from which the distribution retrieves content.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
cards:
  - id: secrets-manager-001
    q: A database password must rotate automatically with its Secrets Manager value and database kept in
      sync. Which rotation service fits?
    a: Secrets Manager. Use the database service's managed rotation when supported or configure a Lambda
      rotation function.
    facts:
      - rotation
      - managed
      - lambda
  - id: secrets-manager-002
    q: Which Secrets Manager rotation paths use Lambda, and which do not?
    a: Managed rotation for supporting AWS services and managed external secrets rotation do not use
      Lambda. Other secret types can use a configured Lambda rotation function.
    facts:
      - managed
      - external
      - lambda
  - id: secrets-manager-003
    q: What does a Secrets Manager Lambda rotation function do, in order?
    a: createSecret stores AWSPENDING; setSecret changes the target credential; testSecret tests access;
      finishSecret promotes AWSCURRENT and retains the old version as AWSPREVIOUS.
    facts:
      - create
      - set
      - test
      - finish
  - id: secrets-manager-010
    q: Can Parameter Store Expiration or NoChangeNotification policies replace Secrets Manager automatic
      rotation for a database password?
    a: No. They delete a parameter or issue a notification. Use Secrets Manager automatic rotation to
      update both the credential store and database.
    facts:
      - policies
      - rotation
    trap: true
  - id: secrets-manager-018
    q: An application needs database credentials that stay valid while Secrets Manager rotates them.
      Which Lambda strategy fits?
    a: Alternating users. It switches between an original and cloned user and requires a separate
      privileged secret for cloning.
    facts:
      - alternating
  - id: secrets-manager-019
    q: A supported RDS master credential in Secrets Manager should rotate without maintaining a Lambda
      function. Which rotation path fits?
    a: Managed rotation configured through the supporting database service.
    facts:
      - managed
      - managed-db
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
  - id: secrets-manager-032
    q: A CloudFormation database secret lacks host and connection fields needed for rotation. Which
      resource fills them in?
    a: AWS::SecretsManager::SecretTargetAttachment adds the database connection information to the
      secret JSON.
    facts:
      - attachment
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
diagrams:
  - id: secret-lambda-rotation-order
    title: Create, apply, test, then promote the pending value
    width: 800
    height: 320
    nodes:
      - id: create
        label: createSecret
        icon: lambda
        x: 20
        y: 30
        w: 160
        h: 86
        tone: compute
        sub: store AWSPENDING
      - id: set
        label: setSecret
        icon: lambda
        x: 260
        y: 30
        w: 160
        h: 86
        tone: compute
        sub: update target
      - id: test
        label: testSecret
        icon: lambda
        x: 500
        y: 30
        w: 160
        h: 86
        tone: compute
        sub: test target access
      - id: finish
        label: finishSecret
        icon: lambda
        x: 500
        y: 220
        w: 160
        h: 86
        tone: compute
        sub: move AWSCURRENT
    edges:
      - from: create
        to: set
        step: 1
      - from: set
        to: test
        step: 2
      - from: test
        to: finish
        step: 3
    steps:
      - Create the pending version before changing the target.
      - Apply the pending credential before testing it.
      - Promote the tested version and retain AWSPREVIOUS.
  - id: secret-origin-header-rotation
    title: Coordinate the allowed header values and their sender
    width: 800
    height: 400
    nodes:
      - id: rotation
        label: Rotation Lambda
        icon: lambda
        x: 20
        y: 160
        w: 190
        h: 72
        tone: compute
      - id: waf
        label: WAF rule
        icon: waf
        x: 330
        y: 30
        w: 210
        h: 86
        tone: security
        sub: allow current + pending
      - id: cloudfront
        label: CloudFront
        icon: cloudfront
        x: 330
        y: 280
        w: 210
        h: 86
        tone: network
        sub: send pending header
      - id: origin
        label: ALB origin
        icon: res-elastic-load-balancing-application-load-balancer
        x: 600
        y: 160
        w: 180
        h: 86
        tone: network
        sub: test both values
    edges:
      - from: rotation
        to: waf
        step: 1
        label: allow
      - from: rotation
        to: cloudfront
        step: 2
        label: update
      - from: rotation
        to: origin
        step: 3
        label: test
    steps:
      - Allow pending and current header values in the WAF rule.
      - Update the CloudFront custom origin header while both values remain accepted.
      - Test both header values against the ALB before promoting the new secret version.
---
Secret rotation periodically changes a credential in both Secrets Manager and its database or service. Treat the stored value and the credential accepted by the target as a pair that must stay in sync.

### How it works

1. Choose the rotation path supported by the secret.

   | Path | Who performs the update | Lambda function |
   |---|---|---|
   | Managed rotation | A supporting AWS service, such as RDS or Aurora for master credentials | Not used |
   | Managed external secrets rotation | Secrets Manager updates a secret held by a supported partner | Not used |
   | Lambda rotation | A configured function updates the secret and target | Required |

2. For Lambda database rotation, choose a strategy. Single user changes one user's password. Alternating users switches between an original and cloned user, with a separate privileged secret to create the clone. Both credentials remain valid after alternating-users rotation.
3. Run createSecret to save a new AWSPENDING value. The ClientRequestToken identifies the version so retries are idempotent, meaning they do not repeat the same change as a new version.
4. Run setSecret to change the credential accepted by the database or service, then testSecret to use AWSPENDING for an access test.
5. Run finishSecret to move AWSCURRENT to the tested version. Secrets Manager assigns AWSPREVIOUS to the old current version.
6. Configure a UTC rotation schedule using rate() or cron(). Rotation can run as often as every four hours.

Managed external secrets launched in November 2025.

For CloudFormation database setup, ManageMasterUserPassword enables service management of supported cluster master credentials. AWS::SecretsManager::SecretTargetAttachment fills database connection fields into a secret used for rotation.

For a CloudFront origin-header secret, the documented Lambda rotation updates both CloudFront's custom header and the WAF request-filtering rule protecting the origin ALB. The rule accepts both pending and current values while the distribution change propagates. An origin is the backend from which CloudFront fetches content.

### Exam cues

- If the question says supported database master credentials with no custom function, think managed rotation, because the database service manages the updates.
- If the question says a custom service password must change with its stored value, think Lambda rotation, because the function can update and test the target system.
- If the question says credentials must stay usable during rotation, think alternating users, because the current user stays valid while the other user's password changes.
- If the question says expire or notify about an old Parameter Store value, think parameter policies, because those actions do not change a database password.

### Remember

- Lambda order: createSecret, setSecret, testSecret, finishSecret.
- AWSPENDING is tested before AWSCURRENT moves.
- Single-user rotation keeps open database connections but can briefly affect new authentication.
- Alternating users requires a separate privileged secret for cloning.
- Rotation schedules use UTC; the shortest interval is four hours.

> **Trap:** Saving a new password value is only one part of rotation. The target system must accept it before it becomes the current value.
