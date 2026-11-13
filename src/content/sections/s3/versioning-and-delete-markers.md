---
title: Versioning and delete markers
level: associate
order: 10
facts:
  - id: versions
    text: S3 Versioning preserves separate versions of objects to recover from accidental overwrites or
      deletions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#Versioning
  - id: versioning-default
    text: Buckets start unversioned.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#versioning-states
  - id: versioning-state
    text: Once enabled, bucket versioning can be suspended but cannot return to the unversioned state.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#versioning-states
  - id: new-version
    text: A write in a versioning-enabled bucket creates a version with a unique version ID.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#versioning-states
  - id: old-null
    text: Objects present before versioning is enabled keep their null version ID until changed by a
      later write.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#versioning-states
  - id: delete-marker
    text: A DELETE without a version ID in a versioning-enabled bucket adds a delete marker as the
      current version.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeletingObjectVersions.html#DeletingObjectVersions
  - id: recover-marker
    text: Permanently deleting the current delete marker by its version ID exposes the preceding version.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeletingObjectVersions.html#DeletingObjectVersions
  - id: permanent-delete
    text: A DELETE with a version ID permanently removes that version when authorized.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeletingObjectVersions.html#DeletingObjectVersions
  - id: suspend-versions
    text: Suspending versioning leaves existing versions unchanged.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/VersionSuspendedBehavior.html#VersionSuspendedBehavior
  - id: suspend-null
    text: New writes in a versioning-suspended bucket have the null version ID and replace an existing
      null version.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/AddingObjectstoVersionSuspendedBuckets.html#AddingObjectstoVersionSuspendedBuckets
  - id: version-cost
    text: Each stored version is a full object and incurs normal storage charges.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#Versioning
  - id: mfa-root
    text: Only the bucket owner root account can enable MFA delete.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html#MultiFactorAuthenticationDelete
  - id: mfa-root-interface
    text: MFA delete is configured through the CLI or API, not the console.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html#MultiFactorAuthenticationDelete
  - id: mfa-actions
    text: MFA delete requires an authentication code for permanent version deletion and changes to the
      bucket versioning state.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html#MultiFactorAuthenticationDelete
  - id: mfa-lifecycle
    text: MFA delete cannot be used with lifecycle configurations.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html#MultiFactorAuthenticationDelete
  - id: object-key
    text: An object key is the name used to identify an object in a bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Object.html#AmazonS3-Type-Object-Key
  - id: current-noncurrent
    text: The current version is returned by default; a previous version becomes noncurrent when a newer
      version becomes current.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/versioning-workflows.html#versioning-workflows
diagrams:
  - id: s3-delete-marker-recovery
    title: Recovering from an ordinary versioned delete
    width: 1000
    height: 230
    nodes:
      - id: saved
        label: Saved version
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 30
        y: 80
        w: 210
        h: 72
      - id: hidden
        label: Delete marker
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 360
        y: 80
        w: 210
        h: 72
      - id: visible
        label: Version visible
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 690
        y: 80
        w: 210
        h: 72
    edges:
      - from: saved
        to: hidden
        step: 1
      - from: hidden
        to: visible
        step: 2
    steps:
      - A DELETE without a version ID adds a delete marker and hides the saved object.
      - Deleting the current marker by its version ID exposes the preceding version.
cards:
  - id: s3-004
    q: What happens when an S3 object is deleted without a version ID in a versioning-enabled bucket?
    a: S3 adds a delete marker. Earlier versions remain; deleting the current marker by its version ID
      exposes the preceding version. A version-specific delete permanently removes that version.
    facts:
      - delete-marker
      - recover-marker
      - permanent-delete
  - id: s3-005
    q: Does suspending S3 bucket versioning erase existing versions?
    a: No. Existing versions remain. New writes use the null version ID and can replace that null
      version. You can suspend versioning after enabling it, but cannot return to an unversioned
      bucket.
    trap: true
    facts:
      - suspend-versions
      - suspend-null
      - versioning-state
  - id: s3-035
    q: An S3 application overwrote a configuration file in a versioning-enabled bucket. What enables
      recovery?
    a: Retrieve a previous object version by its version ID. Versioning retains separate versions rather
      than replacing the earlier data.
    facts:
      - versions
      - new-version
  - id: s3-036
    q: An S3 object disappeared after a delete without a version ID in a versioning-enabled bucket. How
      can an operator restore normal reads?
    a: Delete the current delete marker by its version ID. This exposes the preceding object version.
    facts:
      - delete-marker
      - recover-marker
  - id: s3-037
    q: An S3 team wants an MFA code required before permanently deleting object versions. Who enables
      this protection, and how?
    a: The bucket owner root account enables MFA delete through the CLI or API. It also protects changes
      to versioning state and cannot be combined with lifecycle configurations.
    facts:
      - mfa-root
      - mfa-root-interface
      - mfa-actions
      - mfa-lifecycle
---
S3 Versioning keeps earlier copies when an object is overwritten or deleted. An object key is its name within a bucket; a version ID selects one saved copy of that name.

### How it works

1. Enable versioning on the bucket. Existing objects keep a `null` version ID; later writes create versions with unique IDs.
2. Overwrite a key to create a new current version. The earlier copy becomes noncurrent, meaning it is no longer the copy returned by an ordinary read.
3. Delete without a version ID to add a delete marker, a current version that hides the object. Delete that marker by its version ID to expose the preceding version.
4. Use a version ID to target permanent deletion of one version. MFA delete can add a requirement for an authentication code.

### Exam cues

- If the question says an overwritten S3 file must be recovered, think versioning and retrieval of the earlier version, because each write retains a separate copy.
- If the question says an S3 object vanished after an ordinary delete, think delete-marker removal, because the earlier versions remain.
- If the question says permanent version deletion must require MFA, think root-enabled MFA delete, because this protection covers version deletion and versioning-state changes.

### Remember

- Versioning starts disabled; after enabling it, you can only enable or suspend it.
- Suspension preserves existing versions but new writes can overwrite the `null` version.
- Every version incurs storage charges for a full object.
- MFA delete is configured through the CLI or API and cannot be used with lifecycle configurations.

> **Trap:** Suspending versioning does not remove the stored history. Deleting a specific version permanently is different from placing a delete marker.
