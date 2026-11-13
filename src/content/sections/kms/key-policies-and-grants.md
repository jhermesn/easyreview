---
title: Key policies and grants
level: associate
order: 10
facts:
  - id: one-policy
    text: Every KMS key must have exactly one key policy.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html
  - id: policy-access
    text: A key policy is the resource permission document controlling who can manage or use its KMS key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html
  - id: regional-policy
    text: A key policy applies to its key in its Region, not to keys in other Regions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html
  - id: iam-delegation
    text: IAM allow policies grant access only when the key policy enables IAM delegation.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html
  - id: iam-deny
    text: An IAM deny applies even when the key policy does not enable IAM delegation.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html
  - id: root-statement
    text: The default account-principal statement uses the account root ARN and kms:* to enable IAM delegation; it
      does not give every IAM identity key access.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default-allow-root-enable-iam
  - id: api-default
    text: Creating a key programmatically without a key policy produces the account IAM-delegation statement as
      its default policy.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default
  - id: console-default
    text: The console default policy adds selected key administrators and key users to the account-delegation
      statement.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default
  - id: admin-use
    text: The console key-administrator statement grants management actions, not cryptographic use.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default-allow-administrators
  - id: admin-escalation
    text: Key administrators able to change policy or create grants can give themselves or others key-use
      permissions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default-allow-administrators
  - id: user-use
    text: For symmetric encryption keys, the console key-user statement grants Encrypt, Decrypt, ReEncrypt,
      GenerateDataKey, and DescribeKey permissions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-users-crypto
  - id: cross-policies
    text: Policy-based cross-account key access requires an allow in the owning key policy and an allow in the
      caller account IAM policy.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html
  - id: grant-purpose
    text: A grant gives a grantee specified allowed operations on one KMS key without editing key or IAM policies.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-allow
    text: Grants can allow access but cannot deny access.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-lifecycle
    text: Authorized callers remove grant permissions by retiring or revoking the grant.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-services
    text: AWS services commonly create grants to use KMS keys for a task and retire them when the task finishes.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-token
    text: Grant changes propagate with eventual consistency; a grant token allows immediate use of newly granted
      permissions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-context
    text: Encryption-context constraints can limit grant permissions for symmetric encryption keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
diagrams:
  - id: kms-cross-account-policy-access
    title: Cross-account policy access requires permission on both sides
    width: 550
    height: 200
    nodes:
      - id: caller
        label: Caller role
        sub: IAM allows key operation
        icon: res-generic-application
        x: 30
        y: 60
        w: 200
        h: 86
        tone: user
      - id: key
        label: KMS key
        sub: key policy allows caller
        icon: key-management-service
        x: 320
        y: 60
        w: 200
        h: 86
        tone: security
    edges:
      - from: caller
        to: key
        step: 1
        label: authorize
    steps:
      - The caller account IAM policy and the owning account key policy must both authorize policy-based
        cross-account use.
cards:
  - id: kms-001
    q: Does an IAM allow policy alone authorize an identity to use an AWS KMS key?
    a: Only if the key policy enables IAM delegation. The default account-principal statement enables delegation;
      it does not automatically grant key use to every identity. IAM denies still apply.
    trap: true
    facts:
      - iam-delegation
      - root-statement
      - iam-deny
  - id: kms-002
    q: An application role has an IAM allow for kms:Decrypt but an AWS KMS call is denied. Which authorization
      settings should it check?
    a: Check whether the key policy enables IAM delegation and whether an explicit deny applies. For policy-based
      access from another account, both the key policy and caller IAM policy must allow it.
    trap: true
    facts:
      - iam-delegation
      - iam-deny
      - cross-policies
  - id: kms-003
    q: Does the AWS KMS console default key-administrator statement allow cryptographic key use?
    a: No. It grants management actions. Administrators with policy-edit or grant-creation permissions can still
      give themselves use permissions, so this separation is not a security boundary against those
      administrators.
    trap: true
    facts:
      - admin-use
      - admin-escalation
  - id: kms-004
    q: What is an AWS KMS grant and how can a new grant be used immediately?
    a: A grant allows specified operations on one key for a grantee. It cannot deny access and can be retired or
      revoked. Use its grant token before the permission change has propagated.
    facts:
      - grant-purpose
      - grant-allow
      - grant-lifecycle
      - grant-token
  - id: kms-016
    q: An application in account B must decrypt using a customer managed KMS key in account A through policies.
      Which accounts need policy changes?
    a: Allow the external caller in the key policy in A and delegate the required key operation through the caller
      IAM policy in B.
    facts:
      - cross-policies
  - id: kms-017
    q: An AWS service needs temporary AWS KMS key access for a task without repeated key-policy edits. Which
      permission mechanism fits?
    a: Use a grant with only the required operations, optionally constrained by encryption context. Retire or
      revoke it when access is no longer needed.
    facts:
      - grant-purpose
      - grant-context
      - grant-lifecycle
      - grant-services
---
AWS KMS authorizes key management and cryptographic operations, such as encryption and decryption, through key policies, IAM policies, and grants. A key policy is the permission document attached to one key. A principal is the identity making the request, such as a user, role, or AWS service.

### How it works

1. Start with the key policy. Every KMS key has exactly one, and it controls that key in its own Region.
2. For IAM-based access, allow IAM delegation in the key policy, then grant the caller the required operation in IAM. The default account-principal statement uses the account root ARN, an AWS resource identifier, and `kms:*` to enable that delegation. It does not grant every identity access.
3. Keep management and use permissions separate. The console's key-administrator statement permits management; the symmetric key-user statement includes `Encrypt`, `Decrypt`, `ReEncrypt`, `GenerateDataKey`, and `DescribeKey`. Administrators who can change policy or create grants can give themselves use permissions.
4. For policy-based access from another account, allow access in the owning key policy and in the caller account's IAM policy. An IAM deny can still block access even when IAM delegation is not enabled.
5. For task-specific access, create a grant, a removable set of allowed operations on one key. Its grantee is the identity receiving permission. Limit a symmetric key grant with encryption context, non-secret key-value data bound to the ciphertext. Retire or revoke the grant to remove its permissions.

| Access mechanism | Where it belongs | What it does |
| --- | --- | --- |
| Key policy | On one KMS key | Defines key access and can enable IAM delegation |
| IAM policy | On an identity | Grants delegated permissions or explicitly denies access |
| Grant | On one key for a grantee | Allows selected operations until retired or revoked |

Programmatic creation without a supplied policy produces the account-delegation statement. Console creation also adds the selected administrators and key users. Grant changes use eventual consistency, meaning permission updates take time to reach all KMS servers. Pass a grant token to use newly granted permissions immediately.

### Exam cues

- If the question says IAM allows decrypt but KMS denies it, think key-policy delegation and explicit denies, because an IAM allow needs the key policy's permission to delegate.
- If the question says another account must use a key, think both owning key policy and caller IAM policy, because neither policy alone completes policy-based cross-account access.
- If the question says a service needs access for a task, think a grant, because the service can use and retire that permission without editing policies.
- If the question says a newly created grant does not work immediately, think a grant token, because grant changes need time to propagate.

### Remember

- Exactly one key policy per key; its scope is Regional.
- The account-principal statement enables IAM delegation.
- Grants allow operations and can be retired or revoked; they cannot deny.
- The console administrator statement does not itself grant cryptographic use.

> **Trap:** Separating key users from administrators does not stop an administrator with policy-edit or grant-creation permissions from giving themselves access.
