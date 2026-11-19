---
title: Performance and large uploads
level: associate
order: 150
facts:
  - id: prefix-rate
    text: Amazon S3 scales automatically to at least 3,500 PUT/COPY/POST/DELETE or 5,500 GET/HEAD requests per second per partitioned prefix, with no limit on the number of prefixes in a bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html#optimizing-performance
  - id: prefix-parallel
    text: Spreading reads across 10 prefixes can scale an application to about 55,000 read requests per second.
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
cards:
  - id: s3-132
    q: An application writes 20,000 objects per second into a single S3 prefix and gets HTTP 503 Slow Down errors. What design change fixes it?
    a: "Spread the keys across more prefixes.\nEach prefix supports at least 3,500 writes and 5,500 reads per second, and prefixes are unlimited."
    facts: [prefix-rate, slow-down]
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
  - id: s3-136
    q: A 3 GB upload to Amazon S3 over a flaky network keeps restarting from zero. What should the client use?
    a: "Multipart upload, so only the failed parts are retried."
    facts: [multipart]
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
---
Amazon S3 scales per prefix, so performance problems are usually design problems: one hot prefix, single-stream uploads, or long-distance transfers. [Optimizing Amazon S3 performance](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html)

### How it works

1. Each prefix gets its own request capacity; more prefixes means more parallel capacity.
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

- If the question says high request rate and 503 errors, think more prefixes.
- If the question says large files from around the world, think Transfer Acceleration plus multipart upload.
- If the question says read only part of each object, think byte-range fetches.

### Remember

- At least 3,500 writes and 5,500 reads per second per prefix; unlimited prefixes.
- Single PUT up to 5 GB; multipart up to 50 TB, parts 1 to 10,000.
- Transfer Acceleration: enable on bucket, `s3-accelerate` endpoint, no periods in the name, extra charges may apply. IPv6 clients use `bucket-name.s3-accelerate.dualstack.amazonaws.com`.

> **Trap:** Abandoned multipart uploads keep their parts until completed or stopped. Add a lifecycle rule that aborts incomplete multipart uploads.
