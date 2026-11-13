---
title: Rotation failures and client caching
level: professional
order: 30
facts:
  - id: logs
    text: For Lambda rotation failures, AWS recommends starting with CloudWatch logs and checking that
      every rotation step was attempted.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/troubleshoot_rotation.html
  - id: network
    text: A Lambda rotation function needs network access to both Secrets Manager and the target
      database or service; check endpoint access and security group rules.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/troubleshoot_rotation.html
  - id: set
    text: setSecret applies the AWSPENDING credential to the database or service; creating a version
      alone does not perform this step.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html#rotate-secrets_lambda-functions-code
  - id: pending
    text: If AWSPENDING labels a different version from AWSCURRENT, a later RotateSecret call treats
      rotation as still in progress and returns an error.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_RotateSecret.html
  - id: pending-success
    text: Successful rotation can leave AWSPENDING on the same version as AWSCURRENT or on no version.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_RotateSecret.html
  - id: finish-labels
    text: During normal rotation, do not remove AWSPENDING early or in a separate API call before
      finishSecret.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html#rotate-secrets_lambda-functions-code
  - id: retry-window
    text: If a Lambda rotation step fails, Secrets Manager retries the entire rotation process multiple
      times during the open rotation window.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda.html
  - id: cache
    text: AWS recommends client-side caching of secret values to improve retrieval speed and reduce API
      costs.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  - id: cache-hour
    text: The Secrets Manager Python caching component refreshes secrets every hour by default and
      allows configuring the refresh interval.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_cache-python.html
  - id: cache-invalidation
    text: The Secrets Manager Python caching component does not implement cache invalidation and is not
      security hardened.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_cache-python.html
  - id: single-gap
    text: Single-user rotation can briefly reject new authentication between the database password
      update and the secret update; applications can mitigate this with retries.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotation-strategy.html#rotating-secrets-one-user-one-password
cards:
  - id: secrets-manager-004
    q: Secrets Manager createSecret succeeded, but setSecret failed and the database still accepts the
      old password. What must be repaired?
    a: The target credential update in setSecret. Inspect the rotation logs, access permissions, and
      network path; creating AWSPENDING alone does not update the database.
    facts:
      - set
      - logs
      - network
    trap: true
  - id: secrets-manager-005
    q: A Secrets Manager secret has AWSPENDING on a different version from AWSCURRENT. What happens to
      the next RotateSecret request?
    a: It returns an error because rotation appears to be in progress. Investigate the failed workflow
      and version state before retrying.
    facts:
      - pending
    trap: true
  - id: secrets-manager-022
    q: What is the default refresh interval of the Secrets Manager Python caching component?
    a: One hour. The refresh interval is configurable; the component does not implement cache
      invalidation.
    facts:
      - cache-hour
      - cache-invalidation
  - id: secrets-manager-023
    q: An application uses the Secrets Manager Python cache and begins rejecting new database
      connections after rotation. What should the team inspect?
    a: Compare the cached credential with the current version and inspect the refresh configuration.
      Also check rotation logs and target connectivity before concluding that caching is the cause.
    facts:
      - cache
      - cache-hour
      - logs
      - network
  - id: secrets-manager-024
    q: Does an AWSPENDING label remaining after Secrets Manager rotation always mean failure?
    a: No. Successful rotation can leave AWSPENDING on the same version as AWSCURRENT. A separate
      pending version causes later rotation requests to report rotation in progress.
    facts:
      - pending
      - pending-success
    trap: true
  - id: secrets-manager-025
    q: A Secrets Manager rotation Lambda cannot reach the database from its VPC. Which paths must work?
    a: The function needs a network path to both the target and Secrets Manager, including suitable
      endpoint access and security group rules.
    facts:
      - network
---
A rotation failure can occur while creating, applying, testing, or promoting a credential. Client caching, keeping a retrieved value in application memory for reuse, can also leave an application using an older value after rotation succeeds.

### How it works

1. Start with the Lambda function's CloudWatch logs and find the failing step. A new AWSPENDING version does not prove that setSecret changed the database password.
2. Check the function's network paths to both Secrets Manager and the database or service. Review endpoint access and security group rules, which control permitted network traffic.
3. Inspect the version labels. AWSPENDING on a different version from AWSCURRENT makes a later RotateSecret request report a rotation still in progress. AWSPENDING on the same current version, or absent after success, is allowed.
4. Repair the failing workflow before retrying. During normal execution, finishSecret handles promotion; removing AWSPENDING early in separate calls can disrupt the workflow. Secrets Manager retries failed Lambda rotation during the open rotation window.
5. Inspect application refresh behavior as well. AWS recommends client-side caching. The Python caching component refreshes hourly by default and allows a different interval, but has no cache invalidation mechanism that immediately discards an outdated cached value.

### Exam cues

- If the question says createSecret succeeded but the target password stayed old, think setSecret failure, because that step applies the pending credential.
- If the question says the next rotation reports another rotation in progress, think a separate AWSPENDING version, because the labels still show unfinished work.
- If the question says rotation succeeded but a cached client uses old credentials, think cache refresh configuration, because cached values are reused between refreshes.
- If the question says new logins briefly fail during single-user rotation, think retries, because the target password can change before the secret is promoted.

### Remember

- Check logs, version state, permissions, and both network paths.
- The Python caching component defaults to a one-hour refresh; this is not a service-wide cache default.
- Successful rotation does not require AWSPENDING to disappear if it labels AWSCURRENT too.
- Single-user rotation can briefly affect new authentication; retry handling can reduce that impact.

> **Trap:** Login errors after rotation do not identify one cause by themselves. An unapplied target password, an unfinished rotation, and an older cached value require different repairs.
