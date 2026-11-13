---
title: Log delivery and encryption
level: associate
order: 40
facts:
  - id: s3-delivery
    text: CloudTrail typically delivers logs to S3 about 5 minutes after an API call on average;
      delivery time is not guaranteed.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/get-and-view-cloudtrail-log-files.html#get-and-view-cloudtrail-log-files
  - id: cw-delivery
    text: CloudTrail typically delivers events to CloudWatch Logs in about 5 minutes on average, without
      a guaranteed delivery time.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#viewing-events-in-cloudwatch
  - id: event-order
    text: CloudTrail events in log files are not in a guaranteed order.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-events
  - id: event-time
    text: The eventTime field records when the API request completed in UTC.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html#cloudtrail-event-reference-record-contents
  - id: console-time
    text: The CloudWatch console Time UTC column for delivered CloudTrail events shows delivery time,
      not the original event time.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#viewing-events-in-cloudwatch
  - id: cw-account
    text: A CloudTrail trail must use a CloudWatch Logs group in the current account; console
      configuration selects a group in the trail home Region.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#send-cloudtrail-events-to-cloudwatch-logs-console-create-log-group
  - id: cw-trust
    text: The delivery role trusts cloudtrail.amazonaws.com to assume it.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#send-cloudtrail-events-to-cloudwatch-logs-cli-create-role
  - id: cw-permissions
    text: The delivery role needs logs:CreateLogStream and logs:PutLogEvents on the intended log streams.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-required-policy-for-cloudwatch-logs.html#cloudtrail-required-policy-for-cloudwatch-logs
  - id: cw-org-policy
    text: An organization trail requires delivery role permissions for organization log streams.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#policy-cwl-org
  - id: cw-org-admin
    text: Only the management account configures organization trail CloudWatch Logs integration in the
      console; a delegated administrator uses the CLI or API.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#send-cloudtrail-events-to-cloudwatch-logs
  - id: forwarding-cutoff
    text: CloudTrail does not forward events larger than 256 KB to CloudWatch Logs or EventBridge.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#send-cloudtrail-events-to-cloudwatch-logs-limitations
  - id: console-encryption
    text: The trail creation console enables SSE-KMS by default; disabling it uses SSE-S3 encryption for
      log and digest files.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html#cloudtrail-create-a-trail-using-the-console-first-time
  - id: kms-region
    text: The KMS key for CloudTrail S3 log encryption must be in the same Region as the destination
      bucket.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms
  - id: kms-encrypt
    text: The KMS key policy must authorize CloudTrail to generate data keys and describe the key.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-kms-key-policy-for-cloudtrail.html#create-kms-key-policy-for-cloudtrail
  - id: kms-read
    text: Reading KMS-encrypted CloudTrail log and digest files requires S3 read access and KMS decrypt
      permission.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms
  - id: kms-failure
    text: A disabled KMS key or a key policy that does not authorize CloudTrail prevents encrypted log
      delivery.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-kms-key-policy-for-cloudtrail.html#create-kms-key-policy-for-cloudtrail
  - id: s3-redelivery
    text: CloudTrail retries delivery to a misconfigured S3 destination for 30 days, and attempted deliveries are subject to standard CloudTrail charges.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-working-with-log-files.html#cloudtrail-working-with-log-files
  - id: delivery-errors
    text: GetTrailStatus reports S3 errors in LatestDeliveryError and CloudWatch Logs errors in LatestCloudWatchLogsDeliveryError; the S3 field does not report request timeouts.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-troubleshooting.html#event-delivery-failure-optin
cards:
  - id: cloudtrail-010
    q: How soon should a CloudTrail event reach S3 or CloudWatch Logs, and which time should
      investigators use?
    a: About 5 minutes on average, without a guarantee. Use eventTime for request completion time; the
      CloudWatch console delivery time and file ordering do not establish event order.
    facts:
      - s3-delivery
      - cw-delivery
      - event-time
      - console-time
      - event-order
  - id: cloudtrail-011
    q: A CloudTrail trail must deliver events to CloudWatch Logs. Which destination and IAM settings are
      needed?
    a: A log group in the current account and trail home Region, plus a role trusted by
      cloudtrail.amazonaws.com with logs:CreateLogStream and logs:PutLogEvents. Organization streams
      need matching policy permissions.
    facts:
      - cw-account
      - cw-trust
      - cw-permissions
      - cw-org-policy
  - id: cloudtrail-012
    q: Which large CloudTrail events are not forwarded to CloudWatch Logs or EventBridge?
    a: Events larger than 256 KB. This is the documented CloudTrail forwarding cutoff.
    facts:
      - forwarding-cutoff
  - id: cloudtrail-018
    q: An auditor can read the CloudTrail S3 bucket but cannot open its SSE-KMS log files. Which
      additional permission is required?
    a: KMS decrypt permission for the encryption key. S3 read permission alone is insufficient.
    trap: true
    facts:
      - kms-read
  - id: cloudtrail-032
    q: A multi-Region CloudTrail trail delivers to a bucket in one Region. Where must its S3 encryption
      KMS key be located?
    a: In the destination bucket Region. The trail collecting events from other Regions does not change
      that requirement.
    facts:
      - kms-region
  - id: cloudtrail-033
    q: A delegated administrator cannot configure CloudWatch Logs for a CloudTrail organization trail in
      the console. What supported route should it use?
    a: Use the AWS CLI or CloudTrail CreateTrail or UpdateTrail API. Only the management account
      configures this integration in the console.
    facts:
      - cw-org-admin
  - id: cloudtrail-034
    q: What encryption does the CloudTrail creation console select by default, and what happens if that
      option is disabled?
    a: SSE-KMS is enabled by default. Disabling it uses SSE-S3 for log and digest files.
    facts:
      - console-encryption
  - id: cloudtrail-047
    q: A CloudTrail trail cannot deliver logs because its S3 bucket policy is incorrect. What happens while delivery remains misconfigured?
    a: CloudTrail retries S3 delivery for 30 days, and attempted deliveries are subject to standard CloudTrail charges. Repair the bucket policy.
    facts:
      - s3-redelivery
      - delivery-errors
  - id: cloudtrail-048
    q: A CloudTrail organization trail delivers to S3 but not CloudWatch Logs. Which status field helps identify the CloudWatch failure?
    a: Inspect LatestCloudWatchLogsDeliveryError with GetTrailStatus, then repair the CloudWatch Logs role policy.
    facts:
      - delivery-errors
      - cw-permissions
---
CloudTrail sends audit logs to S3 and can also send selected events to CloudWatch Logs for monitoring. Server-side encryption means the destination encrypts stored files: SSE-KMS uses an AWS KMS key, while SSE-S3 uses keys managed by S3. [Delivery and encryption](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms)

### How it works

1. Configure the trail destination and encryption. The trail creation console enables SSE-KMS by default; disabling it selects SSE-S3.
2. For SSE-KMS, choose a key in the bucket Region and authorize CloudTrail to generate data keys and describe the key. Readers need S3 read access and KMS decrypt permission. A disabled key or incorrect key policy blocks delivery.
3. For CloudWatch Logs, select a log group in the current account and trail home Region. A log group holds related event streams. Give CloudTrail a role it can assume with `logs:CreateLogStream` and `logs:PutLogEvents` on those streams. Include organization stream permissions for an organization trail. [Role policy](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-required-policy-for-cloudwatch-logs.html#cloudtrail-required-policy-for-cloudwatch-logs)
4. Allow for delivery delay and inspect `eventTime` when reconstructing events. CloudTrail files have no guaranteed event order. The CloudWatch console time column shows delivery time. [CloudWatch delivery](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#viewing-events-in-cloudwatch)
5. If delivery fails, inspect `GetTrailStatus`. `LatestDeliveryError` reports S3 errors, while `LatestCloudWatchLogsDeliveryError` reports CloudWatch Logs errors. The S3 error field does not report request timeouts.

### Exam cues

- If the question says S3 access works but encrypted audit files cannot be read, think KMS decrypt permission, because reading the bucket and decrypting its files are separate permissions.
- If the question says delivery stopped after a key was disabled, think restore the KMS configuration, because encrypted log delivery depends on an available, authorized key.
- If the question says a delegated administrator needs organization trail log integration, think CLI or API, because console configuration is limited to the management account.

### Remember

- S3 and CloudWatch Logs delivery average about 5 minutes; neither timing is guaranteed.
- CloudTrail does not forward events larger than 256 KB to CloudWatch Logs or EventBridge. [CloudTrail forwarding limitation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html#send-cloudtrail-events-to-cloudwatch-logs-limitations)
- The KMS key Region follows the S3 bucket Region.
- CloudTrail retries delivery to a misconfigured S3 destination for 30 days; attempted deliveries are subject to standard CloudTrail charges.

> **Trap:** A multi-Region trail does not let its S3 encryption key reside in any Region. The key must match the destination bucket Region.
