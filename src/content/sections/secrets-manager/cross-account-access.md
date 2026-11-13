---
title: Cross-account access
level: professional
order: 50
facts:
  - id: secret-policy
    text: A cross-account Secrets Manager read requires a secret resource policy allowing the consumer
      principal and an identity policy allowing that principal to read the secret.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html
  - id: key-type
    text: Cross-account secret access cannot use aws/secretsmanager; encrypt with a customer managed KMS
      key.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html
  - id: key-policy
    text: A cross-account reader needs kms:Decrypt allowed by both the owning key policy and its own
      identity policy.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html
  - id: arn
    text: GetSecretValue requires an ARN for another account secret; AWS recommends a complete ARN
      rather than a partial ARN.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html#API_GetSecretValue_RequestParameters
  - id: block
    text: PutResourcePolicy with BlockPublicPolicy helps prevent public access through a secret resource
      policy.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html
  - id: analyzer
    text: IAM Access Analyzer can review cross-account access to Secrets Manager secrets.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html
  - id: policy-escalation
    text: Granting secretsmanager:PutResourcePolicy can allow principals to escalate their access by
      changing the secret resource policy.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html
  - id: cross-actions
    text: Cross-account Secrets Manager access is effective only for the documented supported actions,
      including GetSecretValue.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html
cards:
  - id: secrets-manager-008
    q: An application must read a Secrets Manager secret in another account. What permissions and
      encryption are required?
    a: Allow the consumer principal in the secret resource policy and its identity policy. Use a
      customer managed KMS key, with kms:Decrypt allowed by its key policy and the consumer identity
      policy. Retrieve using the secret ARN.
    facts:
      - secret-policy
      - key-type
      - key-policy
      - arn
    trap: true
  - id: secrets-manager-009
    q: How can a team prevent a Secrets Manager resource policy from granting public access?
    a: Set BlockPublicPolicy on PutResourcePolicy. Use IAM Access Analyzer to review external access,
      and restrict who can change the resource policy.
    facts:
      - block
      - analyzer
      - policy-escalation
  - id: secrets-manager-029
    q: A Secrets Manager resource policy permits a role in another account, but the secret uses
      aws/secretsmanager. What must change?
    a: Encrypt the secret with a customer managed KMS key and grant the role decrypt permission through
      the key policy and identity policy.
    facts:
      - key-type
      - key-policy
    trap: true
  - id: secrets-manager-030
    q: A cross-account Secrets Manager reader has GetSecretValue but KMS denies decryption. Which
      policies must allow kms:Decrypt?
    a: The owning KMS key policy and the reader identity policy. Secret permissions alone do not grant
      key use.
    facts:
      - secret-policy
      - key-policy
  - id: secrets-manager-031
    q: Can a cross-account Secrets Manager GetSecretValue request identify the secret only by name?
    a: No. It must use an ARN; AWS recommends the complete ARN.
    facts:
      - arn
    trap: true
diagrams:
  - id: secret-cross-account
    title: Cross-account read of a secret
    width: 760
    height: 330
    groups:
      - label: Account 2 (consumer)
        icon: group-aws-account
        x: 20
        y: 20
        w: 240
        h: 290
        tone: mgmt
      - label: Account 1 (owner)
        icon: group-aws-account
        x: 340
        y: 20
        w: 400
        h: 290
        tone: mgmt
    nodes:
      - id: role
        label: App role
        sub: identity policy
        icon: res-identity-access-management-role
        x: 50
        y: 130
        w: 180
        h: 86
        tone: security
        info: Needs an identity policy allowing `secretsmanager:GetSecretValue` on the secret ARN and
          `kms:Decrypt` on the key ARN. Use the full secret ARN, not the name.
      - id: secret
        label: Secret
        sub: resource policy
        icon: secrets-manager
        x: 470
        y: 60
        w: 200
        h: 86
        tone: security
        info: A **resource policy** names the account 2 role. Cross-account access works only for a defined
          list of actions such as `GetSecretValue`.
      - id: kms
        label: KMS key
        sub: customer managed key
        icon: key-management-service
        x: 470
        y: 220
        w: 200
        h: 86
        tone: security
        info: Use a customer managed key. Its key policy and the caller identity policy must allow
          kms:Decrypt for a cross-account read; aws/secretsmanager cannot be used.
    edges:
      - from: role
        to: secret
        step: 1
        label: GetSecretValue
      - from: secret
        to: kms
        step: 2
        label: decrypt as caller
    steps:
      - The role in account 2 calls `GetSecretValue` using the secret's full ARN. Both the identity
        policy and the secret's resource policy must allow it.
      - Secrets Manager decrypts the value with the secret's customer managed key. The caller needs
        KMS permission from the key policy and its own identity policy.
---
Cross-account secret access lets an application read a secret owned by another AWS account. The owner authorizes the reader on the secret and its encryption key, and the consumer account authorizes the reader to use both.

### How it works

1. Name the consumer principal in the secret's resource policy. A principal is the identity making a request; a resource policy is a permission document attached to the resource being accessed.
2. Grant secretsmanager:GetSecretValue on that secret in the principal's identity policy, the permission document attached to its user or role.
3. Encrypt the secret with a customer managed KMS key, a key whose policy the owner controls. The AWS managed key aws/secretsmanager cannot support cross-account access.
4. Allow kms:Decrypt in both the owning key policy and the reader's identity policy. A key policy is the permission document attached to a KMS key.
5. Retrieve the secret using its ARN. AWS recommends the complete ARN, the identifier containing the service, Region, account, and resource.
6. Protect policy changes with BlockPublicPolicy on PutResourcePolicy and review cross-account access with IAM Access Analyzer. Limit PutResourcePolicy permission because it can let a principal expand its own access.

### Exam cues

- If the question says share a secret across accounts, think secret resource policy, reader identity policy, and customer managed KMS key, because both read and decryption permissions must cross the account boundary.
- If the question says secret access is allowed but decryption fails, think key policy and identity permission for kms:Decrypt, because permission to read the secret is separate from permission to use its key.
- If the question says prevent public secret policies, think BlockPublicPolicy, because it checks the resource policy being attached.

### Remember

- Cross-account GetSecretValue requires an ARN; prefer the complete ARN.
- aws/secretsmanager cannot be used for cross-account secret access.
- Read permission: secretsmanager:GetSecretValue. Decryption permission: kms:Decrypt.
- Restrict who can call PutResourcePolicy.

> **Trap:** A resource policy on the secret is only part of cross-account access. The reader's identity policy and the customer managed key policy must also permit the required operations.
