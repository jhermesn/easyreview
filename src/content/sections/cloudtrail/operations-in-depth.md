---
title: Trail operations and validation
level: professional
order: 90
facts:
  - id: invalid-digest
    text: An invalid signature, modified or missing digest, or missing log file is a validation failure
      and does not establish log integrity for affected files.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli
  - id: cli-original
    text: AWS CLI validation requires online access, read permission and log and digest files in their
      original S3 locations; it checks only logs referenced by digests.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli
  - id: cli-parameters
    text: validate-logs requires trail-arn and start-time; organization trails also require account-id,
      and region selects the Region being validated.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli
  - id: validation-gap
    text: Disabling validation breaks the digest chain after one hour, and CloudTrail does not create digests for files delivered while validation was disabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_CreateTrail.html#awscloudtrail-CreateTrail-request-EnableLogFileValidation
  - id: recursive-events
    text: Logging S3 data events on the trail destination bucket can record CloudTrail PutObject
      deliveries and create repeated delivery events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-trail-recursive-logging.html#cloudtrail-trail-recursive-logging
  - id: recursive-suppression
    text: RecursiveLogging false suppresses CloudTrail-invoked S3 PutObject and CloudWatch Logs
      PutLogEvents delivery events while preserving other callers' events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-trail-recursive-logging.html#cloudtrail-trail-recursive-logging
  - id: s3-selector
    text: Advanced selectors can select S3 object data events with eventCategory Data, resources.type
      AWS::S3::Object and resources.ARN StartsWith a bucket or object prefix.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events-with-cloudtrail
  - id: sts-regions
    text: CloudTrail records requests to the global STS endpoint in us-east-1. Requests to Regional STS endpoints are recorded in the corresponding Region.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html#cloudtrail-integration
  - id: trail-regions
    text: A multi-Region trail covers enabled Regions; all trails created in the CloudTrail console are
      multi-Region.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
  - id: selector-replace
    text: A trail uses basic or advanced selectors, not both; applying advanced selectors overwrites
      basic selectors.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_PutEventSelectors.html#API_PutEventSelectors
  - id: selector-default
    text: Trails created without specific selectors record all read and write management events, with no
      data or network activity events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_PutEventSelectors.html#API_PutEventSelectors
  - id: create-start
    text: "Trail creation and starting event logging are separate CLI operations: create-trail and
      start-logging."
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli.html#cloudtrail-create-and-update-a-trail-by-using-the-aws-cli
  - id: start-logging
    text: StartLogging starts API recording and log delivery for an existing trail and must be called in
      the home Region for a multi-Region trail.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StartLogging.html#API_StartLogging
  - id: recursive-default
    text: RecursiveLogging defaults to true on trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_CreateTrail.html#API_CreateTrail_RequestParameters
  - id: api-region-default
    text: CreateTrail defaults IsMultiRegionTrail to false, creating a single-Region trail unless the setting is enabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_CreateTrail.html#awscloudtrail-CreateTrail-request-IsMultiRegionTrail
cards:
  - id: cloudtrail-017
    q: CloudTrail validate-logs reports an invalid or missing digest. Can the affected log files be
      treated as proven unchanged?
    a: No. The affected integrity evidence failed. The CLI checks only digest-referenced logs and
      requires the original S3 locations.
    trap: true
    facts:
      - invalid-digest
      - cli-original
  - id: cloudtrail-036
    q: An auditor validates one member account's CloudTrail organization logs using the CLI. What
      additional selector is required?
    a: Pass --account-id for that member account, along with --trail-arn and --start-time. Use --region
      for the Region being validated.
    facts:
      - cli-parameters
  - id: cloudtrail-049
    q: A team disables CloudTrail log file integrity validation for a week and then reenables it. Can it validate the gap with newly generated digests?
    a: No. CloudTrail does not create digests for files delivered while validation was disabled; the digest chain breaks after one hour.
    trap: true
    facts:
      - validation-gap
      - cli-original
  - id: cloudtrail-006
    q: A CloudTrail trail records its own S3 log deliveries as data events. How can it suppress that
      repeated activity?
    a: Set RecursiveLogging to false. CloudTrail suppresses its own delivery events; other callers
      remain logged. A destination excluded from the S3 selector also avoids the loop.
    trap: true
    facts:
      - recursive-events
      - recursive-suppression
      - s3-selector
  - id: cloudtrail-007
    q: Does CloudTrail log every STS request in us-east-1, even when the caller uses a Regional STS
      endpoint?
    a: No. Requests to the global endpoint are recorded in us-east-1; requests to Regional endpoints are recorded in the corresponding Region. Use a multi-Region trail for enabled Regions.
    trap: true
    facts:
      - sts-regions
      - trail-regions
  - id: cloudtrail-027
    q: A team applies advanced data selectors to a CloudTrail trail that used basic management
      selectors. What must it preserve explicitly?
    a: Include the required management selection in the new configuration. Advanced selectors overwrite
      basic selectors.
    trap: true
    facts:
      - selector-replace
      - selector-default
  - id: cloudtrail-028
    q: Automation recreates a CloudTrail trail through the CLI after deletion. Which additional
      operation begins recording and log delivery?
    a: Call StartLogging for the new trail. For a multi-Region trail, call it in the home Region.
    facts:
      - create-start
      - start-logging
  - id: cloudtrail-029
    q: What is the default RecursiveLogging value on a CloudTrail trail?
    a: True. Set it to false to suppress CloudTrail-generated delivery events.
    facts:
      - recursive-default
      - recursive-suppression
  - id: cloudtrail-050
    q: A team creates a CloudTrail trail using CreateTrail without setting IsMultiRegionTrail. Does it collect events in all enabled Regions?
    a: No. The API defaults to a single-Region trail. Set IsMultiRegionTrail to true for multi-Region coverage.
    trap: true
    facts:
      - api-region-default
      - trail-regions
---
CloudTrail trail operations determine which events are recorded, where to look for them, and how to validate delivered logs. Check the trail configuration and validation evidence together when investigating a gap. Trail concepts · CLI validation

### How it works

1. Choose Region coverage. A multi-Region trail covers enabled Regions. The console creates multi-Region trails, while `CreateTrail` defaults to a single Region unless `IsMultiRegionTrail` is enabled. Trail concepts · CreateTrail
2. Set event selectors. A trail without specific selectors records read and write management events, but no data or network activity events. Advanced selectors replace basic selectors, so include the management events still needed. For S3 object data, use `eventCategory: Data`, `resources.type: AWS::S3::Object` and a `resources.ARN` prefix. PutEventSelectors · Data events
3. Start recording. CLI trail creation and starting logging are separate operations. Call `StartLogging` in the home Region of a multi-Region trail to begin recording and delivery. CLI trail operations · StartLogging
4. Validate logs with `validate-logs`. The CLI needs online access, read permission, and log and digest files in their original S3 locations. It checks only logs referenced by digests. Pass `--trail-arn` and `--start-time`, add `--account-id` for an organization trail, and use `--region` to select the Region.

### Exam cues

- If the question says a trail logs its own S3 deliveries repeatedly, think `RecursiveLogging: false`, because it suppresses CloudTrail delivery events while preserving other callers' events.
- If the question says find an STS request, think about the endpoint: requests to the global endpoint are recorded in `us-east-1`, and requests to Regional endpoints are recorded in the corresponding Region.
- If the question says a digest is missing or its signature is invalid, think validation failure, because the affected files' integrity is not established.

### Remember

- `RecursiveLogging` defaults to `true`. Setting it to `false` suppresses CloudTrail-invoked S3 `PutObject` and CloudWatch Logs `PutLogEvents` delivery events. CreateTrail · Recursive logging
- Disabling validation breaks the digest chain after one hour. Files delivered while validation was disabled do not get digests.

> **Trap:** Reenabling validation does not create digests for the disabled period. A missing or modified digest also cannot establish the integrity of affected files.
