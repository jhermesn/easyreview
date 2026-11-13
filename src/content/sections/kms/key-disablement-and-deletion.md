---
title: Key disablement and deletion
level: associate
order: 60
facts:
  - id: disable-reversible
    text: Disabling a customer managed KMS key blocks KMS cryptographic use until the key is re-enabled.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/enabling-keys.html
  - id: customer-lifecycle
    text: Customers cannot disable or schedule deletion of AWS managed or AWS owned keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys
  - id: deletion-window
    text: Scheduling key deletion requires a waiting period of 7 to 30 days, with a default of 30 days.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-how-it-works
  - id: pending-block
    text: A key in PendingDeletion cannot perform KMS cryptographic operations.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-how-it-works
  - id: pending-no-rotation
    text: KMS does not rotate key material while deletion is pending.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-how-it-works
  - id: cancel-disabled
    text: CancelKeyDeletion during the pending period changes the key state to Disabled; EnableKey is then
      required to use it.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys-cancelling-key-deletion.html
  - id: delete-irreversible
    text: Deleting a KMS key removes its key material and metadata irreversibly; data whose only decryption path
      needs that key becomes unrecoverable.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys
  - id: delete-time
    text: Actual deletion may be up to 24 hours later than the selected waiting period; DescribeKey reports the
      scheduled deletion date.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-how-it-works
  - id: pending-alarm
    text: A CloudWatch alarm can warn about attempted use of a pending-deletion key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-how-it-works
  - id: data-key-delay
    text: Disabling or scheduling deletion does not erase data keys already available to an application; effects
      on encrypted data can wait until the next KMS use.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/unusable-kms-keys.html
  - id: delete-primary
    text: A multi-Region primary deletion waiting period begins only after the last replica has been deleted.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-mrks
  - id: public-use
    text: Disabling KMS use or scheduling deletion cannot prevent use of an already downloaded asymmetric public
      key outside KMS.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-asymmetric-cmks
diagrams:
  - id: kms-cancel-deletion-recovery
    title: Cancel deletion before enabling the recovered key
    width: 840
    height: 200
    nodes:
      - id: pending
        label: PendingDeletion
        sub: KMS use blocked
        icon: key-management-service
        x: 30
        y: 60
        w: 200
        h: 86
        tone: security
      - id: disabled
        label: Disabled
        sub: deletion canceled
        icon: key-management-service
        x: 320
        y: 60
        w: 200
        h: 86
        tone: security
      - id: enabled
        label: Enabled
        sub: KMS use restored
        icon: key-management-service
        x: 610
        y: 60
        w: 200
        h: 86
        tone: security
    edges:
      - from: pending
        to: disabled
        step: 1
        label: cancel
      - from: disabled
        to: enabled
        step: 2
        label: enable
    steps:
      - CancelKeyDeletion stops pending deletion and leaves the key Disabled.
      - EnableKey restores cryptographic use of the disabled key.
cards:
  - id: kms-012
    q: What waiting period applies to AWS KMS key deletion and what reversible option should a team consider
      first?
    a: Deletion waits 7 to 30 days, default 30. Disable an uncertain key first. Pending deletion blocks KMS
      cryptographic use, and deletion permanently removes the key.
    facts:
      - deletion-window
      - disable-reversible
      - pending-block
      - delete-irreversible
  - id: kms-015
    q: A team needs a reversible way to stop AWS KMS cryptographic operations on a customer managed key. What
      should it do?
    a: Disable the key and re-enable it if needed. Already available data keys can continue working until the
      application needs KMS again.
    facts:
      - disable-reversible
      - data-key-delay
  - id: kms-034
    q: A team cancels scheduled AWS KMS key deletion but decrypt requests still fail. Which key-lifecycle step
      remains?
    a: Enable the key. Canceling deletion leaves it Disabled, so cancellation alone does not restore cryptographic
      use.
    trap: true
    facts:
      - cancel-disabled
  - id: kms-035
    q: An AWS KMS key is disabled, but an application using a cached plaintext data key still reads data. Why?
    a: Disabling the KMS key does not erase the application's already available data key. The effect may appear
      only when it calls KMS again.
    trap: true
    facts:
      - data-key-delay
  - id: kms-036
    q: A team schedules an AWS KMS multi-Region primary for deletion while replicas still exist. When does the
      primary waiting period start?
    a: After the last replica has been deleted.
    trap: true
    facts:
      - delete-primary
  - id: kms-037
    q: An AWS KMS key scheduled for deletion receives unexpected decrypt requests. What should operators do before
      deletion completes?
    a: Investigate the dependency, cancel deletion while still pending, and enable the key if continued use is
      required. Alarm on attempted use during the waiting period.
    facts:
      - pending-alarm
      - cancel-disabled
---
Disabling a KMS key stops its KMS cryptographic use reversibly. Deleting a key permanently removes its material and metadata, so use disablement while investigating whether applications still depend on it.

### How it works

1. Disable a customer managed key to block KMS cryptographic operations. Re-enable it to restore that use. Customers cannot disable or schedule deletion of AWS managed or AWS owned keys.
2. If the key is no longer needed, schedule deletion with a waiting period from 7 to 30 days. The default is 30 days. The key becomes `PendingDeletion` and cannot perform KMS cryptographic operations or rotate material.
3. Monitor attempted use during that period, for example with a CloudWatch alarm. `DescribeKey` reports the scheduled deletion date; actual deletion can occur up to 24 hours later than the selected waiting period.
4. If use is still needed, call `CancelKeyDeletion` while deletion is pending. This leaves the key `Disabled`. Call `EnableKey` before attempting cryptographic operations again.
5. After deletion completes, the key cannot be recovered. Data whose only decryption path requires it becomes unrecoverable.

KMS key state does not erase a plaintext data key already available in an application. A cached key, one retained for reuse, may continue working until the application needs KMS again. Likewise, a public key downloaded from an asymmetric KMS key can still be used outside KMS even when the KMS key cannot be used.

### Exam cues

- If the question says stop use while preserving a recovery option, think disablement, because the customer managed key can be re-enabled.
- If the question says deletion was canceled but decrypt still fails, think `EnableKey`, because cancellation leaves the key disabled.
- If the question says data remains readable after disabling its KMS key, think an already available plaintext data key, because disablement does not erase application memory.
- If the question says delete a multi-Region primary while replicas remain, think replica deletion first, because the primary's waiting period starts only after the last replica is deleted.

### Remember

- Deletion wait: 7 to 30 days, default 30.
- Pending deletion blocks KMS cryptographic use and rotation.
- Recovery sequence: cancel deletion, then enable the key.
- A deleted key cannot be recovered.

> **Trap:** Canceling deletion does not return the key to `Enabled`. It returns to `Disabled`.
