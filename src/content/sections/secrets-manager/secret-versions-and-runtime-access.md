---
title: Secret versions and runtime access
level: associate
order: 10
facts:
  - id: values
    text: A Secrets Manager secret contains a string or binary value and metadata; JSON key-value pairs
      can hold several related string values.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/whats-in-a-secret.html
  - id: size
    text: The Secrets Manager secret value size quota is 65,536 bytes.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_limits.html
  - id: encryption
    text: Secrets Manager encrypts stored secret values using a KMS key and encrypts secrets in transit.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/whats-in-a-secret.html#whats-in-a-secret-metadata
  - id: new-version
    text: Changing or rotating a secret value creates a new encrypted secret version.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/whats-in-a-secret.html#term_version
  - id: labels
    text: AWSCURRENT identifies the current secret version, AWSPREVIOUS the previous version, and
      AWSPENDING a pending rotation version.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/whats-in-a-secret.html#term_version
  - id: default-version
    text: GetSecretValue returns AWSCURRENT if neither VersionId nor VersionStage is specified.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html#API_GetSecretValue_RequestParameters
  - id: version-selector
    text: GetSecretValue can select VersionId or VersionStage; if both are provided they must identify
      the same version.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html#API_GetSecretValue_RequestParameters
  - id: permission
    text: GetSecretValue requires secretsmanager:GetSecretValue; a customer managed KMS key also
      requires kms:Decrypt.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  - id: audit
    text: Retrieving a Secrets Manager secret generates a CloudTrail log entry.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets.html
  - id: ecs-injection
    text: ECS injects a referenced secret when a container starts; later rotation requires a new task or
      forced service deployment to update the injected value.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html
  - id: ecs-exposure
    text: Code, logs, and debugging tools inside an ECS container can access its environment variables.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html
  - id: reference
    text: Parameter Store can retrieve a Secrets Manager secret through the reserved
      /aws/reference/secretsmanager/ path using GetParameter or GetParameters; it enforces the
      secret permissions and does not retain secret data.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-ps-secretsmanager.html#integration-ps-secretsmanager-restrictions
  - id: discovery
    text: CodeGuru Reviewer integrates with Secrets Manager to find unprotected secrets in code and
      guide replacement of hardcoded values.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating-codeguru.html
  - id: discovery-date
    text: Since November 7, 2025, CodeGuru Reviewer cannot create new repository associations and can be
      used only with existing associations.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/codeguru-reviewer-availability-change.html
  - id: stored-vs-target
    text: Credential rotation updates both the stored secret and the credential in the target database
      or service.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
cards:
  - id: secrets-manager-011
    q: What does Secrets Manager return when GetSecretValue has no VersionId or VersionStage?
    a: The AWSCURRENT version. AWSPREVIOUS selects the previous version, and AWSPENDING identifies a
      pending rotation version.
    facts:
      - default-version
      - labels
  - id: secrets-manager-012
    q: An application must retrieve the previous Secrets Manager value for troubleshooting. Which
      selector should it use?
    a: VersionStage set to AWSPREVIOUS. If VersionId is also provided, both selectors must identify the
      same version.
    facts:
      - labels
      - version-selector
  - id: secrets-manager-013
    q: An application reads a Secrets Manager secret encrypted with a customer managed KMS key. Which
      permissions are required?
    a: secretsmanager:GetSecretValue on the secret and kms:Decrypt on the key.
    facts:
      - permission
  - id: secrets-manager-014
    q: An ECS service still uses an old Secrets Manager password after rotation. How does it receive an
      updated environment value?
    a: Launch new tasks, such as through a forced service deployment. Secrets injected at container
      startup do not update automatically.
    facts:
      - ecs-injection
  - id: secrets-manager-015
    q: What is the Secrets Manager secret value size quota?
    a: 65,536 bytes.
    facts:
      - size
  - id: secrets-manager-016
    q: A deployment tool supports Parameter Store references but the credential is in Secrets Manager.
      What reference can it use?
    a: Use /aws/reference/secretsmanager/ followed by the secret name with GetParameter or
      GetParameters. Secrets Manager permissions still apply.
    facts:
      - reference
  - id: secrets-manager-017
    q: Can a team create a new CodeGuru Reviewer repository association to discover hardcoded secrets?
    a: No. Since November 7, 2025, only existing repository associations can use CodeGuru Reviewer.
      Those associations can use its Secrets Manager integration to find exposed secrets.
    facts:
      - discovery
      - discovery-date
    trap: true
---
Secrets Manager stores encrypted credentials separately from application code. A secret has metadata and versions of its value; applications retrieve the required version at runtime, meaning while the application is running.

### How it works

1. Store a string or binary value. A JSON object, a set of named key-value pairs, can hold related fields such as a username and password. The value size quota is 65,536 bytes.
2. Secrets Manager encrypts the stored value with a KMS encryption key. A value change creates a new version, which is a saved copy of the encrypted value.
3. Use staging labels, names attached to versions, to identify their roles.

   | Label | Meaning |
   |---|---|
   | AWSCURRENT | Current value, returned by default |
   | AWSPREVIOUS | Previous value |
   | AWSPENDING | Value being prepared during rotation |

4. Call GetSecretValue with permission to read the secret and, for a customer managed key, permission to decrypt with that key. A VersionId selects a specific version; VersionStage selects a label. If both are supplied, they must agree. Retrieval creates a CloudTrail audit event.
5. Account for how the consumer receives updates. ECS environment injection happens at container startup, so rotated values require new tasks. Environment variables are available to code, logs, and debugging tools inside the container.
6. A tool that accepts Parameter Store references can use /aws/reference/secretsmanager/ followed by the secret name with GetParameter or GetParameters. This passes the request through to Secrets Manager and preserves its access controls.

Existing CodeGuru Reviewer repository associations can find unprotected secrets and guide replacement with Secrets Manager references. Since November 7, 2025, CodeGuru Reviewer has not accepted new repository associations.

### Exam cues

- If the question says read the current password without pinning a version, think GetSecretValue without version selectors, because AWSCURRENT is the default.
- If the question says ECS kept the old password after rotation, think new tasks, because startup injection does not refresh a running container.
- If the question says use an existing Parameter Store integration for a Secrets Manager value, think the reserved reference path, because Parameter Store passes through the request.

### Remember

- Secret value quota: 65,536 bytes.
- Retrieval requires secretsmanager:GetSecretValue and, for a customer managed key, kms:Decrypt.
- GetSecretValue defaults to AWSCURRENT.
- AWSPREVIOUS is a version label, not a command that changes the database password.
- CodeGuru Reviewer accepts only existing repository associations as of November 7, 2025.

> **Trap:** Updating a Secrets Manager version does not refresh an environment variable already injected into a running ECS container.
