---
title: Lifecycle and retention
level: associate
order: 60
facts:
  - id: lifecycle-rules
    text: S3 Lifecycle rules select groups of objects and schedule storage-class transitions or
      expiration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html#object-lifecycle-mgmt
  - id: lifecycle-noncurrent
    text: Current and noncurrent versions have separate transition and expiration actions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html#intro-lifecycle-rules-actions
  - id: lifecycle-marker
    text: Expiration in a versioning-enabled bucket adds a delete marker; NoncurrentVersionExpiration
      permanently removes older versions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-small
    text: Since September 2024, new or modified lifecycle configurations block transitions of objects
      smaller than 128 KB by default.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints
  - id: lifecycle-legacy
    text: Configurations created before September 2024 retain the older small-object behavior until
      modified.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints
  - id: lifecycle-size-override
    text: ObjectSizeGreaterThan or ObjectSizeLessThan filters can override the default minimum
      transition size.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints
  - id: lifecycle-ia-update
    text: In July 2026, S3 removed the 30-day wait before transitions into Standard-IA and One Zone-IA;
      rules can use 0 days after creation.
    source: https://aws.amazon.com/about-aws/whats-new/2026/07/s3-removes-30-day-transitions-standard-ia-one-zone-ia/
  - id: lifecycle-ia-billing
    text: Standard-IA and One Zone-IA each have a 30-day minimum storage billing duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: lifecycle-glacier-billing
    text: Glacier Instant Retrieval has a 90-day minimum storage billing duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: lifecycle-glacier-billing-flexible
    text: Glacier Flexible Retrieval has a 90-day minimum storage billing duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: lifecycle-glacier-billing-deep
    text: Glacier Deep Archive has a 180-day minimum storage billing duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: lifecycle-early
    text: Deleting, overwriting, or transitioning objects out of a class before its minimum storage
      duration can incur remaining-duration charges.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints
  - id: lifecycle-abort
    text: AbortIncompleteMultipartUpload removes unfinished upload parts after the configured number of
      days.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpu-abort-incomplete-mpu-lifecycle-config.html#mpu-abort-incomplete-mpu-lifecycle-config
  - id: lifecycle-restore
    text: Lifecycle cannot transition Deep Archive objects to another class; restore a temporary copy
      and copy it with the required storage class.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#transition-glacier-deep-archive
  - id: class-standard
    text: S3 Standard is the default storage class for frequently accessed objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: class-ia
    text: Standard-IA stores data redundantly across multiple Availability Zones.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: class-ia-one-zone
    text: One Zone-IA stores data in one Availability Zone and is not resilient to physical loss of that
      zone.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: class-tiering
    text: Intelligent-Tiering monitors access patterns and moves eligible objects to less expensive
      access tiers for an object monitoring and automation fee.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html#intelligent-tiering-overview
  - id: tiering-days
    text: Intelligent-Tiering moves objects to Infrequent Access after 30 consecutive days without
      access.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html#intelligent-tiering-overview
  - id: tiering-days-instant
    text: Intelligent-Tiering moves objects to Archive Instant Access after 90 consecutive days without
      access.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html#intelligent-tiering-overview
  - id: tiering-archive
    text: Intelligent-Tiering optional Archive Access and Deep Archive Access tiers require activation
      and have minimum no-access periods of 90 and 180 days respectively.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html#intelligent-tiering-overview
  - id: tiering-small
    text: Intelligent-Tiering objects smaller than 128 KB are not monitored or automatically tiered and
      remain in Frequent Access.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html#intelligent-tiering-overview
  - id: lifecycle-lock
    text: Lifecycle does not expire noncurrent versions protected by Object Lock.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-pending
    text: Lifecycle does not act on current or noncurrent versions with PENDING or FAILED replication
      status.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: tiering-restore
    text: Objects in Intelligent-Tiering Archive Access or Deep Archive Access must be restored before
      reading; restoration moves them to Frequent Access.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects.html#restoring-objects
  - id: storage-class-definition
    text: A storage class defines object storage characteristics including access time, placement, and
      minimum billing terms.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: lifecycle-existing
    text: Lifecycle rules apply to both existing and newly added objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-policy-deny
    text: A bucket policy cannot prevent deletions or transitions performed by an S3 Lifecycle rule.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-precedence
    text: When lifecycle actions conflict on the same day, permanent deletion takes precedence over transition, which takes precedence over creating a delete marker.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-newer-versions
    text: Noncurrent version expiration can retain a specified number of newer noncurrent versions; specifying that count requires a Filter element as well as an age.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-tag-recheck
    text: S3 rechecks tags when a queued tag-filtered expiration executes and skips the expiration if the triggering tag is absent.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-tag-based-expiration-eligibility
  - id: lifecycle-expiration-delay
    text: S3 may remove an object after its lifecycle expiration date rather than at the exact expiration time.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-when
  - id: lifecycle-tag-filter
    text: "A Lifecycle rule tag filter matches only objects whose tag key and value both match exactly. Several tags go inside And, and the object must carry all of them; extra tags do not stop the match."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-filters.html#intro-lifecycle-filters
  - id: tag-set-replace
    text: "PutObjectTagging replaces the whole tag set of an object, so adding one tag means reading the set with GetObjectTagging, changing it and putting it back. An object can hold up to 10 tags."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html#tagging-apis
  - id: batch-tagging
    text: "S3 Batch Operations applies a tag set to every object in a supplied list in one job, which can cover billions of objects."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html#object-tagging
cards:
  - id: s3-021
    q: Which S3 controls move aging objects, delete old versions, and remove abandoned upload parts?
    a: Lifecycle transition and expiration rules, separate NoncurrentVersion actions, and
      AbortIncompleteMultipartUpload. New or modified configurations block transitions below 128 KB
      by default. Minimum storage-duration charges still apply.
    facts:
      - lifecycle-rules
      - lifecycle-noncurrent
      - lifecycle-abort
      - lifecycle-small
      - lifecycle-early
  - id: s3-024
    q: Can S3 Lifecycle move a Deep Archive object back to S3 Standard?
    a: No. Restore a temporary readable copy, then copy the object with S3 Standard as the target
      storage class.
    trap: true
    facts:
      - lifecycle-restore
  - id: s3-047
    q: A versioning-enabled S3 log bucket still incurs storage costs after its current objects expire.
      Which rule is missing?
    a: NoncurrentVersionExpiration. Current-version expiration adds delete markers and retains the older
      versions.
    trap: true
    facts:
      - lifecycle-marker
  - id: s3-048
    q: An S3 team wants day-zero transitions from Standard into Standard-IA. Is the old 30-day waiting
      rule still required?
    a: No. S3 removed that wait in July 2026; a rule can use 0 days. Standard-IA still bills a minimum
      30-day storage duration.
    trap: true
    facts:
      - lifecycle-ia-update
      - lifecycle-ia-billing
  - id: s3-049
    q: An S3 backup can be recreated after an Availability Zone is lost. Which infrequent-access class
      trades zone resilience for lower cost?
    a: S3 One Zone-IA. It stores data in one Availability Zone; Standard-IA stores data across multiple
      zones.
    facts:
      - class-ia
      - class-ia-one-zone
  - id: s3-050
    q: An S3 dataset has unpredictable access patterns. Which storage class moves eligible objects
      between access tiers automatically?
    a: S3 Intelligent-Tiering. It monitors access and moves eligible objects for a monitoring and
      automation fee. Objects smaller than 128 KB remain in Frequent Access.
    facts:
      - class-tiering
      - tiering-small
  - id: s3-051
    q: An S3 team needs logs to remain immediately readable after 90 days with no access in
      Intelligent-Tiering. Which automatic tier fits, and what should it avoid enabling?
    a: Archive Instant Access is automatic after 90 days without access. Do not confuse it with the
      optional Archive Access tier, which requires archive restoration.
    facts:
      - tiering-days
      - tiering-days-instant
      - tiering-archive
      - tiering-restore
  - id: s3-092
    q: A team adds an S3 Lifecycle expiration rule to a bucket containing old logs. Does it apply only to new logs?
    a: No. Lifecycle rules apply to existing objects as well as new objects.
    trap: true
    facts:
      - lifecycle-existing
  - id: s3-093
    q: Can an S3 bucket policy deny prevent an S3 Lifecycle rule from deleting objects?
    a: No. Bucket policy denies do not prevent lifecycle deletions or transitions.
    trap: true
    facts:
      - lifecycle-policy-deny
  - id: s3-094
    q: An S3 object qualifies for permanent deletion and a lifecycle transition on the same day. Which action wins?
    a: Permanent deletion takes precedence over transition.
    facts:
      - lifecycle-precedence
  - id: s3-095
    q: An S3 lifecycle rule must retain a number of newer noncurrent versions before deleting older versions. What configuration is required?
    a: Specify the noncurrent age, the number of newer versions to retain, and a Filter element.
    facts:
      - lifecycle-newer-versions
  - id: s3-096
    q: A queued S3 Lifecycle expiration uses a tag filter, but the triggering tag is removed before execution. What happens?
    a: S3 rechecks the tags and skips expiration if the triggering tag is absent at execution.
    facts:
      - lifecycle-tag-recheck
  - id: s3-097
    q: Does S3 Lifecycle guarantee that an object is physically removed at its expiration time?
    a: No. Removal can occur after the expiration date.
    trap: true
    facts:
      - lifecycle-expiration-delay
  - id: s3-108
    q: "An S3 Lifecycle rule must expire only objects that a scanning process marked with the tag status=processed. How does the rule select them?"
    a: "Use a tag filter with key status and value processed. Both must match exactly; other tags on the object do not prevent the match."
    facts:
      - lifecycle-tag-filter
  - id: s3-109
    q: "A Lambda function adds a tag to S3 objects that already carry other tags, and the old tags disappear. Why?"
    a: "PutObjectTagging replaces the whole tag set. Read the current set with GetObjectTagging, add the new tag and put the full set back."
    facts:
      - tag-set-replace
  - id: s3-110
    q: "A team must add the same tag to millions of existing S3 objects listed in an inventory report. Which feature does it in one managed job?"
    a: "S3 Batch Operations with a replace-tags operation over the supplied object list."
    facts:
      - batch-tagging
---
S3 Lifecycle applies rules to move aging objects between storage classes or remove them. A storage class is a choice of access speed, storage placement, and billing terms; choose it before scheduling transitions.

### How it works

1. Choose a class for the access pattern. Standard suits frequent reads. IA means infrequent access: Standard-IA retains zone resilience; One Zone-IA suits data that can be recreated after a zone loss.
2. Use lifecycle rules when age determines the move. Use Intelligent-Tiering when changing access patterns should determine the access tier.
3. Configure current-version and noncurrent-version actions separately. In a versioning-enabled bucket, current-version expiration adds a delete marker; noncurrent expiration removes old versions permanently.
4. Add `AbortIncompleteMultipartUpload` for abandoned uploads. It removes unfinished parts after the configured age.
5. Check minimum billing durations before moving or deleting data. Lifecycle cannot move Deep Archive objects back to Standard; restore and copy them.
6. Rules apply to existing objects as well as new ones. To retain a number of newer noncurrent versions, set that count and an age with a filter.

| Choice | Suitable access pattern or tradeoff |
|---|---|
| Standard | Frequent access; default class |
| Standard-IA | Infrequent reads with data across zones |
| One Zone-IA | Re-creatable data in one zone |
| Intelligent-Tiering | Changing or unknown access patterns |
| Glacier classes | Rare access; restore requirements depend on class |

### Exam cues

- If the question says old versions remain after S3 logs expire, think `NoncurrentVersionExpiration`, because current-version expiration keeps the older data.
- If the question says S3 access patterns are unknown, think Intelligent-Tiering, because it monitors access and changes tiers automatically.
- If the question says S3 logs should move to IA immediately, think a day-zero lifecycle rule, because July 2026 removed the old transition wait.
- If an S3 bucket policy denies deletion, think lifecycle configuration separately, because bucket policies do not prevent lifecycle actions.
- If multiple lifecycle actions are due on the same day, think permanent deletion before transition and transition before delete-marker creation.
- If the question says act only on S3 objects that another process marked, think a Lifecycle tag filter, because it matches an exact tag key and value.

### Remember

- From September 2024, new or modified configurations block transitions below 128 KB by default; size filters can override this. Older configurations keep their earlier behavior until changed.
- Minimum billing: IA classes 30 days; Glacier Instant and Flexible 90 days; Deep Archive 180 days. Early exit can still incur charges.
- Intelligent-Tiering moves unaccessed objects after 30 days to Infrequent Access and 90 days to Archive Instant Access.
- Optional Archive Access and Deep Archive Access need activation, with minimum no-access periods of 90 and 180 days. Objects below 128 KB stay in Frequent Access. The optional archive tiers require restoration before reading.
- Lifecycle does not expire locked noncurrent versions or act on versions with pending or failed replication.
- Tag-filtered expiration rechecks the tag at execution. Physical removal may occur after expiration.

> **Trap:** The 30-day IA billing minimum is not a 30-day wait in S3 Standard. The wait was removed in July 2026.
