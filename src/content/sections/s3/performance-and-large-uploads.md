---
title: Performance and large uploads
level: associate
order: 150
facts:
  - id: prefix-rate
    text: Amazon S3 supports at least 3,500 PUT/COPY/POST/DELETE or 11,000 GET/HEAD requests per second per partitioned prefix, and scales gradually to higher rates as traffic grows, returning temporary 503 Slow Down errors while it scales.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html#optimizing-performance
  - id: prefix-parallel
    text: A prefix is the leading characters of an object key and the forward slash has no special meaning, so folder-like paths alone do not raise the request rate; to spread load, add entropy such as a hash character at the start of key names.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance-design-patterns.html
  - id: rate-change
    text: In November 2026 the Amazon S3 documentation raised the per-prefix GET/HEAD baseline from 5,500 to 11,000 requests per second; the write baseline stays 3,500.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html#optimizing-performance
  - id: slow-down
    text: HTTP 503 Slow Down responses show which prefixes, keys or buckets are being throttled, and the AWS SDKs retry them automatically.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance-guidelines.html#optimizing-performance-guidelines-measure-503
  - id: single-put
    text: A single PUT uploads an object of up to 5 GB; multipart upload handles objects from 5 MB up to 50 TB.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
  - id: multipart
    text: Multipart upload sends an object as independent parts, in any order and in parallel, which raises throughput and lets you retry only the parts that failed on an unreliable network.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html#mpuoverview
  - id: part-numbers
    text: A multipart upload has three steps (initiate, upload parts, complete), part numbers run from 1 to 10,000, and an unfinished upload never expires until you complete or stop it.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html#mpu-process
  - id: byte-range
    text: A GET with the Range header fetches only part of an object, and concurrent range requests on one object raise aggregate throughput.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance-guidelines.html#optimizing-performance-guidelines-get-range
  - id: ta-what
    text: S3 Transfer Acceleration speeds up transfers over long distances between clients and a bucket by routing them through CloudFront's globally distributed edge locations.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html#transfer-acceleration
  - id: ta-when
    text: Transfer Acceleration suits customers uploading to a central bucket from around the world, regular cross-continent transfers of gigabytes to terabytes, and uploads that can't use the available internet bandwidth.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html#transfer-acceleration-why-use
  - id: ta-endpoint
    text: "Transfer Acceleration requires an enabled bucket with a DNS-compliant name without periods. Use bucket-name.s3-accelerate.amazonaws.com, or bucket-name.s3-accelerate.dualstack.amazonaws.com for IPv6."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html#transfer-acceleration-requirements
  - id: ta-cost
    text: Transfer Acceleration can add data transfer charges on top of standard S3 pricing.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html#transfer-acceleration
  - id: same-region
    text: Keeping the EC2 instances that use a bucket in the same Region as the bucket reduces latency and data transfer costs.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance-guidelines.html#optimizing-performance-guidelines-combine
  - id: ta-not-accelerated
    text: "When Transfer Acceleration would not speed up a transfer, AWS does not charge the acceleration fee for it."
    source: https://aws.amazon.com/s3/transfer-acceleration/
  - id: cli-sync
    text: "The AWS CLI aws s3 sync command recursively copies new and updated files between a local directory and an S3 prefix, or between two S3 prefixes, including buckets in different Regions."
    source: https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html#description
  - id: select-closed
    text: "S3 Select is no longer available to new customers; existing customers can keep using it."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html
  - id: multipart-guidance
    text: "AWS suggests multipart upload once an object reaches about 100 MB; an upload can have up to 10,000 parts, and only the last part may be smaller than 5 MiB."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html#qfacts
  - id: same-region-free
    text: "S3 data transfer to an EC2 instance in the same AWS Region has no S3 data transfer charge."
    source: https://aws.amazon.com/s3/pricing/
  - id: single-range
    text: "A single S3 GET request cannot retrieve multiple byte ranges."
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html
  - id: batch-lambda
    text: "S3 Batch Operations can invoke a Lambda function to perform custom actions on objects in a job manifest."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops-invoke-lambda.html
cards:
  - id: s3-132
    q: An application writes 20,000 objects per second into a single S3 prefix and gets HTTP 503 Slow Down errors. What design change fixes it?
    a: "Spread the keys across more prefixes, for example with a hash character at the start of each key name.\nEach prefix supports at least 3,500 writes and 11,000 reads per second, and S3 scales per prefix."
    facts: [prefix-rate, prefix-parallel, slow-down]
  - id: s3-133
    q: Users on several continents upload multi-gigabyte files to one S3 bucket in us-east-1 and complain about slow uploads. Which two S3 features help most?
    a: "- **S3 Transfer Acceleration** (edge locations shorten the long-distance path).\n- **Multipart upload** (parallel parts, retry only failed parts)."
    facts: [ta-what, ta-when, multipart]
  - id: s3-134
    q: What is the largest object you can upload to Amazon S3 with one PUT, and with multipart upload?
    a: "5 GB with a single PUT; up to 50 TB with multipart upload."
    facts: [single-put]
  - id: s3-135
    q: An analytics job needs only the first 250 bytes (a header) of millions of large S3 objects. How should it read them?
    a: "Use byte-range GETs (the `Range` header) to fetch only those bytes."
    facts: [byte-range]
  - id: s3-137
    q: "Can S3 Transfer Acceleration add to the bill beyond standard Amazon S3 pricing?"
    a: "Yes. It can add data transfer charges on top of standard S3 pricing."
    facts: [ta-cost]
  - id: s3-138
    q: Does an incomplete S3 multipart upload expire on its own?
    a: "No. Its parts stay until you complete or stop the upload; a lifecycle rule (AbortIncompleteMultipartUpload) can clean them up."
    trap: true
    facts: [part-numbers]
  - id: s3-149
    q: "A 3 GB upload with Transfer Acceleration turns out no faster than a normal upload. What does the uploader pay for the transfer into S3?"
    a: "Nothing for the transfer. Data coming in from the internet has no S3 transfer charge, and the acceleration fee is not charged when the transfer was not accelerated."
    trap: true
    facts: [ta-not-accelerated]
  - id: s3-150
    q: "What is a simple one-time way to copy all objects from one bucket to a bucket in another Region?"
    a: "Run aws s3 sync between the two bucket prefixes. S3 Batch Replication also works when a replication rule is set up."
    facts: [cli-sync]
  - id: s3-164
    q: "From what object size does AWS suggest multipart upload, and how many parts can one upload have?"
    a: "Around 100 MB, with up to 10,000 parts."
    facts: [multipart-guidance]
  - id: s3-224
    q: "Is Amazon S3 data transfer to an EC2 instance in the same Region charged by S3?"
    a: "No S3 data transfer charge applies."
    facts: [same-region-free]
  - id: s3-225
    q: "Can one Amazon S3 GET request retrieve multiple byte ranges?"
    a: "No. Use separate GET requests for the ranges."
    facts: [single-range]
  - id: s3-230
    q: "How can Amazon S3 Batch Operations run custom code for objects in a manifest?"
    a: "Use its Lambda invocation operation."
    facts: [batch-lambda]
revised:
  - date: 2026-11-21
    note: Amazon S3 now supports at least 11,000 GET/HEAD requests per second per prefix, up from 5,500, and recommends a hash character at the start of key names to spread load.
    cards: [s3-132]
---
Amazon S3 scales per prefix, so performance problems are usually design problems: one hot prefix, single-stream uploads, or long-distance transfers.

### How it works

1. Each partitioned prefix gets its own request capacity; spreading keys across more prefixes lets S3 partition more of them in parallel. The `/` is not special, so add entropy (a hash character) at the start of key names.
2. Large objects go up with multipart upload: initiate, upload parts in parallel, complete.
3. Large reads use concurrent byte-range GETs.
4. Distant clients use Transfer Acceleration, which enters the AWS network at the nearest edge location.

| Problem | Fix |
|---|---|
| 503 Slow Down on one prefix | Spread keys across more prefixes |
| Large object, slow or unreliable upload | Multipart upload |
| Need part of an object, or faster reads | Byte-range GETs |
| Clients far from the bucket's Region | S3 Transfer Acceleration |
| Repeated reads from many users | Amazon CloudFront in front of S3 |

### Exam cues

- If the question says run custom processing for many S3 objects, think S3 Batch Operations invoking Lambda, because it invokes the function for objects in a manifest.
- If the question says fetch several byte ranges from one S3 object, think separate GET requests, because one GET cannot return multiple ranges.
- If the question says transfer S3 data to EC2 in the same Region, think no S3 data transfer charge, because that transfer is free.
- If the question says high request rate and 503 errors, think more prefixes. Questions written before November 2026 use 5,500 reads per second per prefix.
- If the question says large files from around the world, think Transfer Acceleration plus multipart upload.
- If the question says read only part of each object, think byte-range fetches.

### Remember

- At least 3,500 writes and 11,000 reads per second per prefix (5,500 reads until November 2026).
- Single PUT up to 5 GB; multipart up to 50 TB, parts 1 to 10,000.
- Transfer Acceleration: enable on bucket, `s3-accelerate` endpoint, no periods in the name, extra charges may apply. IPv6 clients use `bucket-name.s3-accelerate.dualstack.amazonaws.com`.

> **Trap:** Abandoned multipart uploads keep their parts until completed or stopped. Add a lifecycle rule that aborts incomplete multipart uploads.
