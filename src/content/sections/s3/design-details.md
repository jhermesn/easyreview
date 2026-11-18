---
title: "PLACEHOLDER s3/design-details"
level: associate
order: 190
facts:
  - id: ia-minimums
    text: "Standard-IA and One Zone-IA bill each object as at least 128 KB and at least 30 days of storage; deleting earlier still bills the 30 days."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: it-small-objects
    text: "In S3 Intelligent-Tiering, objects smaller than 128 KB are not monitored or auto-tiered and always stay in the Frequent Access tier."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html
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
cards:
  - id: s3-169
    q: "Millions of 20 KB objects are moved to S3 Standard-IA to save money, and the bill goes up. Why?"
    a: "Standard-IA bills every object as at least 128 KB (and 30 days), so tiny objects cost more there than in Standard."
    trap: true
    facts: [ia-minimums]
  - id: s3-170
    q: "Does S3 Intelligent-Tiering move a 50 KB object to the Infrequent Access tier when it is not read?"
    a: "No. Objects under 128 KB are not monitored and always stay in Frequent Access."
    facts: [it-small-objects]
  - id: s3-173
    q: "A team plans to archive millions of 2 KB log objects in S3 Glacier Deep Archive to cut costs. What overhead undermines the plan?"
    a: "Each archived object adds **40 KB of metadata** (32 KB at the archive rate, 8 KB at the Standard rate). Bundle small files into larger objects before archiving."
    trap: true
    facts: [archive-metadata]
  - id: s3-148
    q: "Older exam questions ask how to make archives in an Amazon Glacier vault immutable for compliance. What was the answer, and what should a new design use?"
    a: "- Old answer: a **Glacier Vault Lock** policy, which can't change once locked.\n- New designs: S3 Glacier storage classes with **S3 Object Lock** (compliance mode), since standalone Glacier vaults are closed to new customers."
    trap: true
    facts: [glacier-vault-lock, glacier-closed]
  - id: s3-160
    q: "A static website in S3 must answer at example.com through Route 53. What must be true of the bucket?"
    a: "Its name must be exactly example.com, with static website hosting turned on, and the domain must be registered."
    facts: [website-bucket-name]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
