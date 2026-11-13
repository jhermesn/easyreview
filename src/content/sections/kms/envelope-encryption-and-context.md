---
title: Envelope encryption and context
level: associate
order: 20
facts:
  - id: data-key
    text: A data key is a symmetric key used outside KMS to encrypt application data.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html
  - id: generate-copies
    text: GenerateDataKey normally returns a plaintext data key and a copy encrypted under a specified symmetric
      encryption KMS key.
    source: https://docs.aws.amazon.com/kms/latest/APIReference/API_GenerateDataKey.html
  - id: local-encrypt
    text: The application encrypts data locally with the plaintext data key and removes that key from memory after
      use.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html
  - id: store-wrapped
    text: Store the encrypted data key with the encrypted application data.
    source: https://docs.aws.amazon.com/kms/latest/APIReference/API_GenerateDataKey.html
  - id: local-decrypt
    text: Call KMS Decrypt on the encrypted data key, decrypt data locally with the returned plaintext key, then
      erase the plaintext key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html
  - id: kms-no-data-store
    text: KMS does not store, manage, or track the application data keys it generates.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html
  - id: encrypt-limit
    text: Encrypt with SYMMETRIC_DEFAULT supports at most 4096 bytes of plaintext.
    source: https://docs.aws.amazon.com/kms/latest/APIReference/API_Encrypt.html
  - id: asymmetric-limit
    text: The Encrypt plaintext limit for asymmetric encryption keys depends on the selected key type and
      algorithm.
    source: https://docs.aws.amazon.com/kms/latest/APIReference/API_Encrypt.html
  - id: context-definition
    text: Encryption context is optional non-secret key-value data authenticated with symmetric-key ciphertext.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/encrypt_context.html
  - id: context-match
    text: Decrypting a ciphertext or encrypted data key requires the same encryption context used during
      encryption, with exact case-sensitive matching.
    source: https://docs.aws.amazon.com/kms/latest/APIReference/API_GenerateDataKey.html
  - id: context-logs
    text: Encryption context is not encrypted and appears in plaintext in CloudTrail logs.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/encrypt_context.html
  - id: context-policy
    text: Encryption context can restrict access through policy conditions and grant constraints.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/encrypt_context.html
  - id: context-key-types
    text: Asymmetric and HMAC KMS operations do not support encryption context.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/encrypt_context.html
  - id: logs-context
    text: CloudWatch Logs uses the log-group ARN in encryption context, referenced by
      kms:EncryptionContext:aws:logs:arn policy conditions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html
diagrams:
  - id: kms-envelope-encryption
    title: Encrypt locally and retain only the encrypted data key
    width: 1130
    height: 200
    nodes:
      - id: app
        label: Application
        sub: requests a data key
        icon: res-generic-application
        x: 30
        y: 60
        w: 200
        h: 86
        tone: user
      - id: kms
        label: AWS KMS
        sub: returns both key copies
        icon: key-management-service
        x: 320
        y: 60
        w: 200
        h: 86
        tone: security
      - id: encrypt
        label: Application
        sub: encrypts data locally
        icon: res-generic-application
        x: 610
        y: 60
        w: 200
        h: 86
        tone: user
      - id: stored
        label: Stored data
        sub: ciphertext + wrapped key
        icon: res-identity-access-management-encrypted-data
        x: 900
        y: 60
        w: 200
        h: 86
        tone: security
    edges:
      - from: app
        to: kms
        step: 1
        label: request
      - from: kms
        to: encrypt
        step: 2
        label: data key
      - from: encrypt
        to: stored
        step: 3
        label: store
    steps:
      - The application calls GenerateDataKey under a symmetric encryption KMS key.
      - KMS returns plaintext and encrypted copies; the application encrypts locally and erases the plaintext
        key.
      - The application stores ciphertext alongside the encrypted data key.
  - id: kms-envelope-decryption
    title: Recover the data key before decrypting local data
    width: 840
    height: 200
    nodes:
      - id: key
        label: Encrypted key
        sub: stored beside ciphertext
        icon: res-identity-access-management-encrypted-data
        x: 30
        y: 60
        w: 200
        h: 86
        tone: security
      - id: kms
        label: AWS KMS
        sub: Decrypt with context
        icon: key-management-service
        x: 320
        y: 60
        w: 200
        h: 86
        tone: security
      - id: app
        label: Application
        sub: decrypts data locally
        icon: res-generic-application
        x: 610
        y: 60
        w: 200
        h: 86
        tone: user
    edges:
      - from: key
        to: kms
        step: 1
      - from: kms
        to: app
        step: 2
    steps:
      - The application sends the encrypted data key and original encryption context to KMS Decrypt.
      - KMS returns the plaintext data key for local decryption; the application erases it after use.
cards:
  - id: kms-005
    q: An application must encrypt a large file that exceeds AWS KMS Encrypt capacity. What design fits?
    a: "Use envelope encryption: call `GenerateDataKey`, encrypt locally with its plaintext data key, erase that
      key, and store the encrypted data key with the ciphertext. Symmetric `Encrypt` supports only 4096
      plaintext bytes."
    facts:
      - generate-copies
      - local-encrypt
      - store-wrapped
      - encrypt-limit
  - id: kms-006
    q: What is AWS KMS encryption context and what must a decrypting caller supply?
    a: Non-secret key-value data authenticated with the ciphertext. Supply exactly the original context, including
      case. It can restrict policies and grants and is visible in CloudTrail.
    facts:
      - context-definition
      - context-match
      - context-policy
      - context-logs
  - id: kms-018
    q: An application has AWS KMS decrypt permission but changed the letter case of the encryption context used
      with its encrypted data key. Can decryption succeed?
    a: No. The encryption context must match exactly, including case.
    trap: true
    facts:
      - context-match
  - id: kms-019
    q: A team wants to put a secret identifier value in AWS KMS encryption context to hide it from logs. What
      should it do?
    a: Keep sensitive values out of the context. It is not encrypted and appears in plaintext in CloudTrail logs.
    trap: true
    facts:
      - context-logs
  - id: kms-020
    q: An application stored a large encrypted file and its encrypted data key. How should it decrypt the file
      with AWS KMS?
    a: Send the encrypted data key to KMS `Decrypt`, using the original context if one was supplied. Use the
      returned plaintext data key locally, then erase it.
    facts:
      - local-decrypt
      - context-match
  - id: kms-021
    q: A team must restrict a CloudWatch Logs KMS key to a specific log group. Which encryption-context value
      identifies the group?
    a: The log group ARN, referenced in a `kms:EncryptionContext:aws:logs:arn` policy condition.
    facts:
      - logs-context
---
Envelope encryption protects data with a data key and protects that data key with a KMS key. A data key is a symmetric key, one secret used for both encryption and decryption. The file stays in the application; KMS protects the smaller key.

### How it works

1. Call `GenerateDataKey` with a symmetric encryption KMS key. The normal response includes the data key in plaintext, its readable form, and an encrypted copy.
2. Encrypt application data locally with the plaintext data key. The encrypted result is ciphertext. Remove the plaintext key from memory after use.
3. Store the encrypted data key alongside the ciphertext. KMS does not store or track those data keys for the application.
4. To read the data, send the encrypted data key to KMS `Decrypt`. If encryption context was supplied, provide exactly the same key-value pairs, including case.
5. Use the returned plaintext data key to decrypt the application data locally, then erase the key from memory again.

Encryption context is optional non-secret key-value information authenticated with symmetric-key ciphertext. It binds meaning to the encrypted value: changing or omitting the original context prevents decryption. Context can also limit access in policies and grants. It appears in plaintext in CloudTrail, so keep secrets out of it.

CloudWatch Logs uses the log-group ARN, its AWS resource identifier, as encryption context. A key policy can restrict that use with `kms:EncryptionContext:aws:logs:arn`.

### Exam cues

- If the question says encrypt a large file, think envelope encryption, because symmetric KMS `Encrypt` accepts only 4096 plaintext bytes.
- If the question says decrypt is authorized but fails after context changes, think an exact context mismatch, because context is authenticated with the ciphertext.
- If the question says restrict key use to one log group, think a condition on its log-group ARN context, because CloudWatch Logs supplies that identifier.

### Remember

- `GenerateDataKey`: plaintext data key plus encrypted copy in a normal response.
- Keep the encrypted data key; erase its plaintext after local use.
- Symmetric `Encrypt`: 4096 bytes; asymmetric limits depend on the algorithm and key type.
- Encryption context works with symmetric encryption keys, not asymmetric or HMAC keys.

> **Trap:** Encryption context is not a secret channel. CloudTrail logs it in plaintext.
