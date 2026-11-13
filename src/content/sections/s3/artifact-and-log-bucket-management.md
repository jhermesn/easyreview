---
title: Artifact and log bucket management
level: associate
order: 130
facts:
  - id: artifact-source
    text: A CodePipeline S3 source action requires versioning on its source bucket.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-S3.html#action-reference-S3
  - id: artifact-zip
    text: An S3 source can contain a ZIP archive; a single unzipped file fails downstream actions that
      require ZIP input.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-S3.html#action-reference-S3
  - id: artifact-encryption
    text: CodePipeline artifact encryption supports symmetric KMS keys and can use a customer managed
      key.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/S3-artifact-encryption.html#S3-artifact-encryption
  - id: artifact-lifecycle
    text: S3 Lifecycle can transition or expire stored objects, with separate actions for noncurrent
      versions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html#intro-lifecycle-rules-actions
  - id: alb-log-policy
    text: Application Load Balancer access logs require a destination S3 bucket policy granting
      log-delivery access.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html#enable-access-logging
  - id: alb-log-region
    text: An ALB log bucket must be in the load balancer Region and can belong to another account.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html#enable-access-logging
  - id: alb-log-encryption
    text: SSE-S3 is the only supported server-side encryption option for ALB access log delivery.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html#enable-access-logging
  - id: trail-log-policy
    text: CloudTrail log delivery requires an S3 bucket policy granting the service access;
      aws:SourceArn can restrict the grant to specific trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-s3-bucket-policy-for-cloudtrail.html#create-s3-bucket-policy-for-cloudtrail
  - id: log-lambda
    text: S3 arrival events can invoke Lambda code that reads and parses a log object and indexes
      records into OpenSearch Service.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/integrations-s3-lambda.html#integrations-s3-lambda
  - id: log-lambda-role
    text: The log-processing Lambda role needs source S3 read permissions and destination OpenSearch
      write permissions.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/integrations-s3-lambda.html#integrations-s3-lambda
  - id: log-cloudwatch
    text: PutLogEvents uploads log-event batches to a specified CloudWatch Logs log stream.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html#API_PutLogEvents
  - id: log-lock
    text: Object Lock compliance retention protects saved log versions from deletion during their
      retention period.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-modes
  - id: upload-parts
    text: Multipart upload initiates an upload, uploads separate parts, then completes the object from
      those parts.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html#mpu-process
  - id: upload-parallel
    text: Multipart upload allows parallel part uploads and retrying interrupted parts without
      restarting the full object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html#mpuoverview
  - id: upload-billing
    text: Uploaded multipart parts incur storage charges until the upload is completed or aborted.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html#mpuploadpricing
  - id: upload-acceleration
    text: Transfer Acceleration routes distant client uploads through CloudFront edge locations and an
      optimized network path to S3.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html#transfer-acceleration
  - id: upload-endpoint
    text: Transfer Acceleration must be enabled on the bucket and uses
      bucket-name.s3-accelerate.amazonaws.com.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html#transfer-acceleration
  - id: upload-checksum
    text: A checksum is a calculated value for detecting data changes; S3 compares uploaded checksums
      and rejects mismatches with BadDigest.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/checking-object-integrity-upload.html#checking-object-integrity-upload
  - id: upload-download-check
    text: Stored S3 checksums can be requested during downloads to verify integrity.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/checking-object-integrity-upload.html#checking-object-integrity-upload
  - id: upload-etag
    text: For qualifying single-part PUT, POST, or Copy objects encrypted with SSE-S3 or unencrypted,
      the ETag is an MD5 digest of object data.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Object.html#AmazonS3-Type-Object-ETag
  - id: upload-etag-multipart
    text: Multipart upload ETags are not MD5 digests of the entire object, regardless of encryption.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Object.html#AmazonS3-Type-Object-ETag
  - id: upload-etag-kms
    text: SSE-KMS and SSE-C objects do not have object-data MD5 ETags.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Object.html#AmazonS3-Type-Object-ETag
  - id: artifact-definition
    text: Artifacts are files consumed or produced by pipeline actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html#welcome-introducing-artifacts
  - id: artifact-separate
    text: The CodePipeline artifact bucket is distinct from an S3 source bucket.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html#welcome-introducing-artifacts
  - id: upload-id
    text: Multipart initiation returns an upload ID used to upload, list, complete, or abort parts.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html#mpu-process
  - id: log-notifications
    text: S3 arrival events can notify a Lambda function to process a new object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#EventNotifications
diagrams:
  - id: s3-multipart-upload-sequence
    title: Multipart artifact upload
    width: 1000
    height: 230
    nodes:
      - id: init
        label: Initiate upload
        icon: res-client
        tone: user
        x: 30
        y: 80
        w: 210
        h: 72
      - id: parts
        label: Upload parts
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 360
        y: 80
        w: 210
        h: 72
      - id: complete
        label: Complete object
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 690
        y: 80
        w: 210
        h: 72
    edges:
      - from: init
        to: parts
        step: 1
      - from: parts
        to: complete
        step: 2
    steps:
      - Initiation returns an upload ID used to send and independently retry parts.
      - CompleteMultipartUpload assembles the uploaded parts into the object.
cards:
  - id: s3-029
    q: What S3 settings matter when CodePipeline reads a source archive and stores encrypted build
      artifacts?
    a: Enable versioning on the S3 source bucket. Package ZIP input for actions that expect it.
      CodePipeline supports symmetric KMS artifact encryption; lifecycle rules can remove aging
      objects and noncurrent versions.
    facts:
      - artifact-source
      - artifact-zip
      - artifact-encryption
      - artifact-lifecycle
  - id: s3-030
    q: New ALB or CloudTrail files in S3 must be parsed automatically and aged into cheaper storage
      before deletion. Which controls fit?
    a: Configure service-specific delivery permissions, S3 arrival notifications to Lambda, and
      lifecycle transition and expiration rules. Lambda can parse and index records into OpenSearch.
      ALB delivery supports SSE-S3 only.
    facts:
      - alb-log-policy
      - alb-log-encryption
      - trail-log-policy
      - log-lambda
      - artifact-lifecycle
  - id: s3-072
    q: A distant S3 client repeatedly restarts a large artifact upload after network errors. What upload
      mechanism reduces repeated work?
    a: Multipart upload. Upload parts in parallel and retry interrupted parts independently; complete or
      abort the upload to stop charges for unfinished parts.
    facts:
      - upload-parts
      - upload-parallel
      - upload-billing
  - id: s3-073
    q: Worldwide clients upload artifacts into one S3 Region and network distance is a bottleneck. Which
      bucket feature can help?
    a: Transfer Acceleration. Enable it and use the s3-accelerate endpoint so uploads enter through
      CloudFront edge locations and an optimized path to S3.
    facts:
      - upload-acceleration
      - upload-endpoint
  - id: s3-074
    q: An S3 team compares a multipart upload ETag with a local full-file MD5 and sees a mismatch. Is
      that proof of corruption?
    a: No. A multipart ETag is not the full-object MD5. Use S3 checksum validation and request stored
      checksums during download.
    trap: true
    facts:
      - upload-etag-multipart
      - upload-checksum
      - upload-download-check
  - id: s3-075
    q: A security policy requires SSE-KMS for every S3 log destination, but ALB log delivery must
      continue. What compatibility issue matters?
    a: ALB access log delivery supports SSE-S3 only. Its destination encryption requirement must account
      for this service-specific limitation.
    trap: true
    facts:
      - alb-log-encryption
  - id: s3-076
    q: How can custom processing forward parsed S3 log records into CloudWatch Logs?
    a: Read and parse the arriving S3 object in Lambda, then use PutLogEvents to upload batches into a
      destination log stream with the required access. This is custom forwarding code.
    facts:
      - log-lambda
      - log-cloudwatch
  - id: s3-082
    q: What are the stages of an S3 multipart upload?
    a: Initiate the upload, upload the parts, then complete the upload to assemble the object. An upload
      ID identifies the operation; unfinished parts incur storage charges until completion or abort.
    facts:
      - upload-parts
      - upload-id
      - upload-billing
---
S3 buckets can hold source packages, build artifacts, and delivered log files. An artifact is a file produced or consumed by a build or deployment; bucket settings must match the producing service as well as retention requirements.

### How it works

1. Enable versioning for a CodePipeline S3 source and provide ZIP input when downstream actions require it. The artifact bucket is separate from this source bucket; artifact encryption can use a symmetric customer managed KMS key.
2. Grant each log producer delivery access. An ALB log bucket must be in the load balancer Region and supports SSE-S3 only. Scope CloudTrail delivery grants to the required trails with `aws:SourceArn`.
3. Use S3 arrival events to invoke Lambda for custom parsing. Give the function source read access and destination write access; it can index records in OpenSearch or send batches to a CloudWatch Logs stream with `PutLogEvents`.
4. Apply lifecycle transitions and expiration, including noncurrent-version actions. Protect retained log versions with Object Lock compliance retention when deletion must be prevented.
5. For large uploads, initiate multipart upload, send parts in parallel, and complete it. Retry failed parts individually; complete or abort abandoned uploads to stop part-storage charges.
6. For distant uploaders, consider Transfer Acceleration. Enable it and use the accelerate endpoint. A checksum is a calculated value used to detect data changes. Validate transfers with checksums rather than assuming an ETag, the object entity tag, is an MD5 digest of the file.

### Exam cues

- If the question says an S3 CodePipeline source must identify object revisions, think source-bucket versioning, because the source action requires it.
- If the question says S3 log files need searchable parsed records on arrival, think S3 events plus Lambda, because custom code can read and index the records.
- If the question says an S3 upload suffers repeated network interruptions, think multipart upload, because only interrupted parts need retrying.
- If the question says S3 uploads travel long distances to one bucket, think Transfer Acceleration, because edge ingress provides an optimized path.

### Remember

- ALB delivery requires a same-Region destination, a delivery policy, and SSE-S3. CloudTrail has its own delivery policy.
- Lifecycle needs separate noncurrent-version actions to remove older versions.
- `bucket-name.s3-accelerate.amazonaws.com` is the Transfer Acceleration endpoint.
- S3 rejects a supplied checksum mismatch with `BadDigest`; request stored checksums when downloading.
- MD5 is a checksum algorithm. An ETag is the file MD5 only for qualifying single-part operations using plaintext or SSE-S3, not for multipart, SSE-KMS, or SSE-C objects.

> **Trap:** A single blanket encryption policy can break a log producer. ALB access log delivery supports SSE-S3 rather than SSE-KMS.
