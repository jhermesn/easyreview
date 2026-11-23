---
title: "CloudFront basics"
level: foundational
order: 5
facts:
  - id: cdn
    text: "Amazon CloudFront speeds up delivery of static and dynamic web content by serving it from a worldwide network of edge locations."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction
  - id: cache-delivery
    text: CloudFront serves content through edge locations and retrieves missing content from a configured origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction
  - id: oac-auth
    text: Origin access control authenticates CloudFront requests to an S3 bucket origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
  - id: oac-principal
    text: The S3 bucket policy grants access to the CloudFront service principal cloudfront.amazonaws.com.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-permission-to-access-s3
  - id: oac-source-arn
    text: An AWS:SourceArn condition scopes the S3 bucket policy grant to the distribution containing the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-permission-to-access-s3
  - id: oac-read
    text: The read-only OAC bucket policy grants s3:GetObject on the bucket objects.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-permission-to-access-s3
  - id: oac-private
    text: Remove permissions that allow other users to read the S3 objects directly to prevent bypassing
      CloudFront.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-overview.html#private-content-overview-s3
  - id: edge-availability
    text: "Cached copies at edge locations improve CloudFront availability and reliability."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction
  - id: s3-origin-storage
    text: "CloudFront supports Amazon S3 origins across S3 storage classes."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html#concept_S3Origin
  - id: archived-restore
    text: Archived S3 objects, in the S3 Glacier Deep Archive or S3 Glacier Flexible Retrieval storage class, have to be restored before anyone can read them.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects.html#restoring-objects
cards:
  - id: cloudfront-058
    q: "How do Amazon CloudFront edge locations benefit users around the world?"
    a: "They speed up delivery of static and dynamic web content through a worldwide network."
    facts: [cdn]
  - id: cloudfront-055
    q: A website needs to serve cached content from locations close to viewers. Which AWS service
      fits?
    a: Amazon CloudFront delivers content through edge locations and retrieves missing content from
      the configured origin.
    facts: [cache-delivery]
  - id: cloudfront-009
    q: A team serves content from S3 through CloudFront and must prevent direct public bucket reads. What should
      it configure?
    a: Use OAC with the regular S3 bucket origin. Grant cloudfront.amazonaws.com s3:GetObject in the bucket
      policy, scoped by AWS:SourceArn to the distribution. Remove direct public read permissions.
    facts:
      - oac-auth
      - oac-principal
      - oac-source-arn
      - oac-read
      - oac-private
  - id: cloudfront-065
    q: "How can CloudFront edge locations improve availability for content delivery?"
    a: "CloudFront keeps cached copies at edge locations, improving availability and reliability."
    facts: [edge-availability]
  - id: cloudfront-066
    q: "Can a CloudFront distribution use an S3 origin with S3 Intelligent-Tiering?"
    a: "Yes. CloudFront supports S3 origins across storage classes."
    facts: [s3-origin-storage]
  - id: cloudfront-070
    q: What must happen before CloudFront can retrieve an S3 Glacier Deep Archive object from an S3 origin?
    a: Restore the archived object before accessing it.
    facts: [archived-restore, s3-origin-storage]
---
Amazon CloudFront is AWS's content delivery network (CDN): copies of content are served from edge locations close to users.

### How it works

1. A user requests content.
2. The nearest edge location serves it if cached.
3. Otherwise it fetches from the origin, caches and returns it.

### Exam cues

- If the question says serve an archived S3 object through CloudFront, think restore it first, because Glacier Flexible Retrieval and Deep Archive objects are not immediately accessible.
- If the question says improve content availability, think CloudFront edge caching, because copies are held at edge locations.
- If the question says low latency content delivery to global users, think CloudFront.

### Remember

- Edge locations worldwide.

> **Trap:** CloudFront caches content; Global Accelerator speeds up network paths without caching.
