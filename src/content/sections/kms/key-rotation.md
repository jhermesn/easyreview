---
title: Key rotation
level: associate
order: 30
facts:
  - id: rotation-material
    text: Automatic and on-demand rotation replace current key material within the same logical KMS key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
  - id: rotation-id
    text: Rotation within a KMS key preserves its key ID, ARN, policies, and permissions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-enable.html#rotating-keys-enable
  - id: old-material
    text: KMS retains AWS_KMS-origin key material and chooses the version needed to decrypt older ciphertext.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys-how-it-works
  - id: no-data-rotation
    text: KMS key rotation does not rotate data keys or re-encrypt stored data.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
  - id: auto-eligible
    text: Automatic rotation supports symmetric encryption keys with KMS-generated material, AWS_KMS origin, in
      the standard store.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys-how-it-works
  - id: auto-opt-in
    text: Automatic rotation is disabled by default for customer managed keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-enable.html#rotate-keys-api
  - id: auto-default
    text: When automatic rotation is enabled without a custom period, its period is 365 days.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-enable.html#rotate-keys-console
  - id: auto-range
    text: A custom automatic rotation period can be 90 to 2560 days.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-enable.html#rotate-keys-console
  - id: demand-eligible
    text: On-demand rotation supports symmetric encryption customer managed keys with AWS_KMS or imported EXTERNAL
      material.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys-how-it-works
  - id: demand-import
    text: Imported symmetric material must be staged in Pending rotation state before on-demand rotation.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-on-demand.html#rotate-on-demand-console
  - id: demand-schedule
    text: On-demand rotation works with automatic rotation disabled and does not change an existing automatic
      rotation schedule.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-on-demand.html#rotating-keys-on-demand
  - id: demand-limit
    text: A KMS key supports at most 25 on-demand rotations.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-on-demand.html#rotating-keys-on-demand
  - id: manual-required
    text: Asymmetric keys, HMAC keys, and keys in custom key stores support neither automatic nor on-demand
      rotation.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys-how-it-works
  - id: manual-new-key
    text: Manual rotation creates a new KMS key and redirects applications or aliases to it.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys-manually.html
  - id: alias-old
    text: After manual rotation, an asymmetric decrypt or HMAC verification must identify the original key, not an
      alias redirected to the replacement.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys-manually.html
  - id: managed-year
    text: AWS managed keys rotate annually and customers cannot change their rotation settings.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-enable.html#rotate-keys-console
  - id: rotation-status
    text: GetKeyRotationStatus reports automatic rotation settings and on-demand rotation in progress.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
  - id: rotation-history
    text: ListKeyRotations reports completed rotations.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-on-demand.html#rotating-keys-on-demand
  - id: config-rule
    text: The cmk-backing-key-rotation-enabled managed Config rule checks whether automatic rotation is enabled
      and has no parameters.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html
  - id: material-date
    text: The rotation date in key material history identifies when that material became current, distinct from
      creating a new logical key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/list-rotations.html
  - id: flexible-date
    text: Custom automatic rotation periods and on-demand rotation were introduced in April 2024.
    source: https://aws.amazon.com/about-aws/whats-new/2024/04/aws-kms-automatic-key-rotation/
  - id: imported-date
    text: On-demand rotation of imported symmetric key material was introduced in June 2025.
    source: https://aws.amazon.com/about-aws/whats-new/2025/06/aws-kms-on-demand-key-rotation-imported-keys/
  - id: asymmetric-term
    text: An asymmetric key has a related public key and private key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html
  - id: hmac-term
    text: HMAC keys generate and verify keyed authentication codes used to check data integrity and authenticity.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/hmac.html
cards:
  - id: kms-007
    q: What are the default and configurable periods for automatic AWS KMS rotation, and what remains unchanged?
    a: Once enabled, the default is 365 days; choose 90 to 2560 days for eligible symmetric AWS_KMS-origin keys.
      The key ID and ARN stay the same, and old ciphertext remains decryptable with retained material.
    facts:
      - auto-default
      - auto-range
      - auto-eligible
      - rotation-id
      - old-material
  - id: kms-008
    q: Which AWS KMS keys require manual replacement rather than automatic or on-demand rotation?
    a: Asymmetric keys, HMAC keys, and custom-key-store keys. Create a new key and redirect the application or
      alias. Imported symmetric keys support on-demand rotation, but not automatic rotation.
    trap: true
    facts:
      - manual-required
      - manual-new-key
      - demand-eligible
      - auto-eligible
  - id: kms-013
    q: A team rotates an AWS KMS key and expects stored application data and data keys to change. What happens?
    a: Only the current KMS key material changes. Existing data is not re-encrypted and data keys are not rotated.
    trap: true
    facts:
      - rotation-material
      - no-data-rotation
  - id: kms-014
    q: A team needs an eligible customer managed AWS KMS key to rotate annually while old ciphertext stays
      readable. What should it enable?
    a: Enable automatic rotation with the default 365-day period. KMS retains earlier AWS_KMS-origin material for
      decryption while preserving the key ID.
    facts:
      - auto-default
      - auto-eligible
      - old-material
      - rotation-id
  - id: kms-022
    q: A team requires a 180-day AWS KMS automatic rotation period. Can the managed Config rotation rule enforce
      that age through a parameter?
    a: No. Configure the eligible key period, then use a custom age check if needed.
      `cmk-backing-key-rotation-enabled` has no parameters and checks enablement, not rotation age.
    trap: true
    facts:
      - auto-range
      - config-rule
  - id: kms-023
    q: A custom AWS KMS rotation-age check uses only key creation date. What does it miss after automatic
      rotation?
    a: Material can rotate while the key ID stays unchanged. Inspect rotation history and material rotation dates,
      and treat manual replacement as a new logical key.
    facts:
      - rotation-id
      - rotation-history
      - material-date
      - manual-new-key
  - id: kms-024
    q: A team imported new symmetric AWS KMS material and needs to activate it without changing the key ARN. Which
      operation fits?
    a: Stage the new material in Pending rotation state, then perform on-demand rotation. Imported symmetric keys
      gained this support in June 2025.
    facts:
      - demand-import
      - demand-eligible
      - rotation-id
      - imported-date
  - id: kms-025
    q: Does an AWS KMS on-demand rotation reset the next automatic rotation date?
    a: No. It leaves the existing automatic schedule unchanged and is available even when automatic rotation is
      disabled.
    trap: true
    facts:
      - demand-schedule
---
KMS rotation changes key material, the secret cryptographic value behind a key, while automatic and on-demand rotation keep the same logical key. Manual rotation replaces the key resource and redirects future use to it.

### How it works

1. Identify the key type and material origin, which says whether KMS generated the material or you imported it.

   | Key type | Automatic rotation | On-demand rotation | Manual replacement |
   | --- | --- | --- | --- |
   | Symmetric encryption, standard store, `AWS_KMS` origin | Optional | Supported | Supported |
   | Symmetric encryption, imported `EXTERNAL` material | Unsupported | Supported after staging material | Supported |
   | Asymmetric, HMAC, or custom-key-store key | Unsupported | Unsupported | Required to replace material |

   An asymmetric key has a public and private key pair. An HMAC key generates and verifies a keyed authentication code, a value used to detect changed or unauthentic messages.
2. Enable automatic rotation for an eligible customer managed key. It is off by default. Once enabled, the default period is 365 days, configurable from 90 to 2560 days.
3. For eligible keys needing immediate rotation, use on-demand rotation. Imported symmetric keys need new material in `Pending rotation` state first. On-demand rotation leaves any automatic schedule unchanged and supports at most 25 rotations per key.
4. Keep the key ID and ARN unchanged during automatic or on-demand rotation. For KMS-generated material, KMS retains older material and selects it when decrypting older ciphertext. Stored data and generated data keys are not re-encrypted or rotated.
5. For manual replacement, create a new key and redirect the application or alias, a name pointing to a KMS key. Keep track of the original key for operations on earlier data. An asymmetric decrypt or HMAC verification cannot use an alias that now points to a different key.

Custom automatic periods and on-demand rotation arrived in April 2024. Imported symmetric keys gained on-demand rotation in June 2025. AWS managed keys rotate annually; customers cannot change that setting.

The Config managed rule `cmk-backing-key-rotation-enabled` checks automatic rotation enablement and has no parameters. A custom age check must distinguish creating a replacement key from rotating material within the same key. Use `GetKeyRotationStatus` for settings and in-progress rotation, and `ListKeyRotations` with material rotation dates for completed rotations.

### Exam cues

- If the question says rotate every 180 days, think a custom automatic period on an eligible symmetric key, because the allowed range is 90 to 2560 days.
- If the question says prove a maximum rotation age, think a custom check using material rotation history, because the managed Config rule only tests enablement.
- If the question says rotate imported symmetric material without changing the ARN, think on-demand rotation after staging new material, because that key type supports it.
- If the question says rotation should rewrite all stored ciphertext, think a separate data re-encryption process, because KMS rotation does not rewrite data or data keys.

### Remember

- Automatic: customer opt-in, 365-day default, 90 to 2560 days configurable.
- On-demand: supported symmetric keys, at most 25 rotations per key.
- Manual: new key resource and redirected future use.
- AWS managed keys: annual rotation controlled by AWS.

> **Trap:** An old key creation date does not prove old key material. Material rotation preserves the key ID.
