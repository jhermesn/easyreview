---
title: Storage and website design details
level: associate
order: 190
facts:
  - id: ia-minimums
    text: "Standard-IA and One Zone-IA bill each object as at least 128 KB and at least 30 days of storage; deleting earlier still bills the 30 days."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: it-small-objects
    text: "Intelligent-Tiering keeps objects smaller than 128 KB in Frequent Access without automatic tiering or monitoring and automation fees."
    source: https://aws.amazon.com/s3/pricing/
  - id: archive-metadata
    text: "Each object in Glacier Flexible Retrieval or Glacier Deep Archive adds 40 KB of metadata: 32 KB billed at the archive class rate and 8 KB at the S3 Standard rate."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html
  - id: glacier-vault-lock
    text: "Amazon Glacier Vault Lock enforces compliance controls such as WORM on a standalone Glacier vault through a Vault Lock policy, which can't be changed or deleted once locked."
    source: https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html#vault-lock-overview
  - id: glacier-closed
    text: "The original standalone Amazon Glacier vault service no longer accepts new customers; AWS recommends the S3 Glacier storage classes in Amazon S3 instead."
    source: https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html
  - id: website-bucket-name
    text: "To serve an S3 static website at a custom domain through a Route 53 alias, the bucket name must match the domain name exactly, for example example.com."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html#website-hosting-custom-domain-walkthrough
  - id: standard-retrieval-cost
    text: "S3 One Zone-IA adds a per-GB retrieval fee when objects are read; S3 Standard has no per-GB retrieval fee."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: standard-billing-minimums
    text: "S3 Standard has neither a minimum billable object size nor a minimum storage duration."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: bucket-namespaces
    text: "General purpose bucket names share a global namespace by default and must be unique across all accounts in a partition; a bucket can instead be created in the account regional namespace, a reserved part of that namespace where only the owning account can create buckets."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/gpbucketnamespaces.html#account-regional-gp-buckets
  - id: bucket-quota
    text: "An account can create 10,000 general purpose buckets by default, and the quota can be increased."
    source: https://docs.aws.amazon.com/general/latest/gr/s3.html
cards:
  - id: s3-169
    q: "Millions of 20 KB objects are moved to S3 Standard-IA to save money, and the bill goes up. Why?"
    a: "Standard-IA bills every object as at least 128 KB (and 30 days), so tiny objects cost more there than in Standard."
    trap: true
    facts: [ia-minimums]
  - id: s3-170
    q: "An Amazon S3 bucket contains 50 KB objects in Intelligent-Tiering. Are they automatically tiered or charged monitoring fees?"
    a: "No. They remain in Frequent Access and incur no monitoring and automation fee."
    facts: [it-small-objects]
  - id: s3-173
    q: "A team deletes objects from S3 Standard-IA after 10 days. Will it pay for only 10 days of storage?"
    a: "No. S3 Standard-IA charges for at least 30 days of storage per object, even when it is deleted earlier."
    trap: true
    facts: [ia-minimums]
  - id: s3-148
    q: "Older exam questions ask how to make archives in an Amazon Glacier vault immutable for compliance. What was the answer, and what should a new design use?"
    a: "- Old answer: a **Glacier Vault Lock** policy, which can't change once locked.\n- New designs: S3 Glacier storage classes with **S3 Object Lock** (compliance mode), since standalone Glacier vaults are closed to new customers."
    trap: true
    facts: [glacier-vault-lock, glacier-closed]
  - id: s3-160
    q: "A static website in S3 must answer at example.com through Route 53. What must be true of the bucket?"
    a: "Its name must be exactly example.com, with static website hosting turned on, and the domain must be registered."
    facts: [website-bucket-name]
  - id: s3-187
    q: "An Amazon S3 workload frequently reads objects that can be recreated. Does the lower One Zone-IA storage rate alone make it cheaper than Standard?"
    a: "No. One Zone-IA adds per-GB retrieval fees; Standard has no per-GB retrieval fee. Include the reads when comparing costs."
    facts: [standard-retrieval-cost]
  - id: s3-188
    q: "An Amazon S3 workload stores tiny temporary objects. Which minimum size and storage duration apply in Standard?"
    a: "Neither. S3 Standard has no minimum billable object size or minimum storage duration."
    facts: [standard-billing-minimums]
  - id: s3-205
    q: "Must every Amazon S3 general purpose bucket name compete with all other AWS accounts' bucket names?"
    a: "By default, yes, within the partition.\nA bucket created in the account regional namespace uses a reserved part that only the owning account can create buckets in."
    facts: [bucket-namespaces]
  - id: s3-206
    q: "How many Amazon S3 general purpose buckets can an account create by default, and is that fixed?"
    a: "10,000, and the quota can be increased."
    facts: [bucket-quota]
---
S3 design choices depend on object size, archive controls and website naming. Check these details before choosing a storage class or setting up a custom domain.

### How it works

1. Standard has no minimum billable object size or storage duration. One Zone-IA adds per-GB retrieval fees, while Standard has no per-GB retrieval fee. For small objects in Standard-IA or One Zone-IA, account for the [minimum billed object size and storage duration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare).
2. For S3 Intelligent-Tiering, objects smaller than 128 KB stay in Frequent Access without automatic tiering or a [monitoring and automation fee](https://aws.amazon.com/s3/pricing/).
3. For Glacier Flexible Retrieval or Deep Archive, include the [metadata billed for each archived object](https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html).
4. For an existing standalone Amazon Glacier vault, a [Vault Lock policy](https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html#vault-lock-overview) can enforce write-once-read-many (WORM) controls. Once locked, the policy cannot be changed or deleted. The standalone service is [closed to new customers](https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html); AWS recommends S3 Glacier storage classes.
5. For an S3 static website using a Route 53 alias, [match the bucket name to the custom domain](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html#website-hosting-custom-domain-walkthrough), such as `example.com`.

### Exam cues

- If the question says many small objects cost more in Standard-IA, think minimum billed size, because each object is billed as at least 128 KB.
- If the question says a 50 KB object in Intelligent-Tiering is rarely read, think Frequent Access, because objects below 128 KB are not automatically tiered.
- If the question says millions of tiny objects go into Deep Archive, think per-object metadata, because each object adds 40 KB of billed metadata.
- If the question says an existing Glacier vault needs immutable compliance controls, think Vault Lock, because its locked policy cannot be changed or deleted.
- If the question says an S3 website must answer at `example.com` through a Route 53 alias, think a bucket named `example.com`, because the names must match.

### Remember

- Standard has no minimum billed size or storage duration and no per-GB retrieval fee. One Zone-IA has per-GB retrieval fees.
- Intelligent-Tiering objects below 128 KB incur no monitoring and automation fee.
- Standard-IA and One Zone-IA bill each object for at least 128 KB and 30 days, even if deleted earlier.
- Glacier Flexible Retrieval and Deep Archive add 40 KB of metadata per object: 32 KB at the archive rate and 8 KB at the S3 Standard rate.
- Bucket names: global namespace per partition by default, or the account regional namespace reserved to one account.
- Default bucket quota: 10,000 general purpose buckets per account, adjustable.

> **Trap:** A small object in Intelligent-Tiering does not move to Infrequent Access just because it is rarely read. Objects below 128 KB remain in Frequent Access.
