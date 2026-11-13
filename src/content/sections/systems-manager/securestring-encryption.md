---
title: SecureString encryption
level: associate
order: 140
facts:
  - id: secure-value
    text: SecureString encrypts the parameter value.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/param-create-cli.html#param-create-cli-securestring
  - id: secure-value-plaintext
    text: SecureString parameter names and descriptions remain plaintext.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/param-create-cli.html#param-create-cli-securestring
  - id: secure-key
    text: Parameter Store supports symmetric KMS encryption keys, not asymmetric keys.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#secure-string-parameter-kms-encryption
  - id: secure-default
    text: SecureString uses the AWS managed aws/ssm key if no KMS key is specified.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#kms-encryption-securestring-standard
  - id: secure-standard
    text: Standard SecureString values are encrypted directly with KMS Encrypt.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#kms-encryption-securestring-standard
  - id: secure-advanced
    text: Advanced SecureString uses the AWS Encryption SDK and envelope encryption, with a data key
      encrypting the value and a KMS key encrypting the data key.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#secure-string-parameter-kms-encryption
  - id: secure-read
    text: GetParameter with WithDecryption true returns the decrypted plaintext value.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#parameter-policy-kms-encryption
  - id: secure-read-permissions
    text: Reading decrypted SecureString values requires parameter retrieval permission and kms:Decrypt.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#parameter-policy-kms-encryption
  - id: secure-write
    text: Standard SecureString encryption requires kms:Encrypt.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#parameter-policy-kms-encryption
  - id: secure-write-advanced
    text: Advanced SecureString encryption requires kms:GenerateDataKey.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#parameter-policy-kms-encryption
  - id: secure-custom
    text: The aws/ssm key policy cannot be changed; use a customer managed key for custom key access
      controls.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#parameter-policy-kms-encryption
  - id: secure-share
    text: Sharing a SecureString across accounts requires an advanced parameter and a customer managed
      KMS key shared separately with consumers.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#prereqs
  - id: secure-reference
    text: Parameter Store can retrieve Secrets Manager secrets through names beginning
      /aws/reference/secretsmanager/.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-ps-secretsmanager.html#integration-ps-secretsmanager
  - id: secure-reference-apis
    text: Secrets Manager references support GetParameter and GetParameters, but not GetParametersByPath.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-ps-secretsmanager.html#integration-ps-secretsmanager-restrictions
  - id: secure-reference-apis-history
    text: Secrets Manager references do not support Parameter Store version history.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-ps-secretsmanager.html#integration-ps-secretsmanager-restrictions
  - id: secure-reference-auth
    text: Parameter Store Secrets Manager references honor the secret access policies and do not retain
      the secret data or metadata.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-ps-secretsmanager.html#integration-ps-secretsmanager-restrictions
  - id: term-symmetric-key
    text: "Symmetric key: A cryptographic key that uses the same secret material to encrypt and decrypt."
    source: https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/concepts.html#symmetric-key-encryption
  - id: term-envelope-encryption
    text: "Envelope encryption: Encryption where a data key protects the value and a KMS key protects
      that data key."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#secure-string-parameter-kms-encryption
diagrams:
  - id: ssm-securestring-read
    title: A decrypted read also needs permission to use the KMS key
    width: 940
    height: 190
    nodes:
      - id: n0
        label: Caller
        sub: GetParameter
        icon: res-client
        tone: user
        x: 25
        y: 45
        w: 270
        h: 86
      - id: n1
        label: Parameter Store
        sub: WithDecryption true
        icon: res-systems-manager-parameter-store
        tone: mgmt
        x: 335
        y: 45
        w: 270
        h: 86
      - id: n2
        label: KMS
        sub: Decrypt authorization
        icon: key-management-service
        tone: security
        x: 645
        y: 45
        w: 270
        h: 86
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
    steps:
      - The caller requests the SecureString with WithDecryption and parameter retrieval permission.
      - Parameter Store uses KMS decryption on behalf of the caller; kms:Decrypt must also be
        allowed.
cards:
  - id: systems-manager-006
    q: How is a Systems Manager Parameter Store SecureString encrypted, and what permissions does a
      reader need?
    a: Use a symmetric KMS key, defaulting to aws/ssm. A reader requests WithDecryption and needs
      permission to retrieve the parameter and kms:Decrypt. Use a customer managed key for custom
      key-policy controls.
    facts:
      - secure-key
      - secure-default
      - secure-read
      - secure-read-permissions
      - secure-custom
  - id: systems-manager-075
    q: An application can retrieve a Systems Manager SecureString but gets AccessDenied when requesting
      plaintext. What should the team check?
    a: Check kms:Decrypt access to the parameter encryption key in addition to parameter retrieval
      permission.
    facts:
      - secure-read
      - secure-read-permissions
  - id: systems-manager-076
    q: A team needs to share a Systems Manager SecureString with another account. Can it use the default
      aws/ssm key?
    a: No. Use an advanced parameter with a customer managed KMS key and grant consumers access to that
      key separately.
    trap: true
    facts:
      - secure-share
  - id: systems-manager-077
    q: How do standard and advanced Systems Manager SecureString encryption differ?
    a: "Standard values use KMS Encrypt directly. Advanced values use envelope encryption: a data key
      encrypts the value and a KMS key protects that data key."
    facts:
      - secure-standard
      - secure-advanced
  - id: systems-manager-078
    q: An application already reads Systems Manager parameters but needs a Secrets Manager secret. How
      can it retrieve the secret through that interface?
    a: Use GetParameter or GetParameters with /aws/reference/secretsmanager/ followed by the secret
      name. Secret access policies still apply; GetParametersByPath and Parameter Store history are
      unsupported for these references.
    facts:
      - secure-reference
      - secure-reference-apis
      - secure-reference-apis-history
      - secure-reference-auth
---
A SecureString is a Parameter Store value encrypted with a symmetric AWS KMS key, a key that uses the same secret material to encrypt and decrypt. The parameter name and description remain readable.

### How it works

1. Choose the default AWS managed `aws/ssm` key or a customer managed key, whose policy you control.
2. For standard values, Parameter Store calls KMS `Encrypt` directly. For advanced values, it uses envelope encryption: a data key encrypts the value and a KMS key protects that data key.
3. Retrieve with `GetParameter` and `WithDecryption: true` when plaintext is needed. Authorize both parameter retrieval and `kms:Decrypt`.
4. For a Secrets Manager reference, use `/aws/reference/secretsmanager/` followed by the secret name. Parameter Store passes through the request and honors the secret access policies.

### Exam cues

- If the question says parameter retrieval works but decryption fails, think KMS permissions, because retrieval and decryption are separate permissions.
- If the question says custom key policy or cross-account SecureString sharing is required, think a customer managed key, because the `aws/ssm` key policy cannot be changed.
- If the question says reuse a parameter-reading integration for a Secrets Manager secret, think the reserved reference path, because Parameter Store supports that pass-through retrieval.

### Remember

- Only symmetric KMS encryption keys are supported.
- Standard writes need `kms:Encrypt`; advanced writes need `kms:GenerateDataKey`; decrypted reads need `kms:Decrypt`.
- Cross-account SecureString sharing requires an advanced parameter and separate customer managed key access.
- Secret references support `GetParameter` and `GetParameters`, not recursive path retrieval or Parameter Store history.

> **Trap:** Encrypting a SecureString does not hide its parameter name or description.

> **Trap:** The Secrets Manager reference path does not bypass the secret access policy.
