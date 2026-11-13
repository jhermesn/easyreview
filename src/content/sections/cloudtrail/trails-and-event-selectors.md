---
title: Trails and event selectors
level: associate
order: 20
facts:
  - id: trail-destination
    text: A trail configures ongoing delivery of selected CloudTrail events to an S3 bucket.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
  - id: trail-regions
    text: A multi-Region trail covers enabled Regions; all trails created in the CloudTrail console are
      multi-Region.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
  - id: api-region-default
    text: CreateTrail defaults IsMultiRegionTrail to false, creating a single-Region trail unless the setting is enabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_CreateTrail.html#awscloudtrail-CreateTrail-request-IsMultiRegionTrail
  - id: selector-default
    text: Trails created without specific selectors record all read and write management events, with no
      data or network activity events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_PutEventSelectors.html#API_PutEventSelectors
  - id: data-opt-in
    text: S3 object and Lambda invocation data events require explicit selection and incur additional
      charges.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events-with-cloudtrail
  - id: s3-selector
    text: Advanced selectors can select S3 object data events with eventCategory Data, resources.type
      AWS::S3::Object and resources.ARN StartsWith a bucket or object prefix.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events-with-cloudtrail
  - id: lambda-selector
    text: Advanced selectors use resources.type AWS::Lambda::Function for Lambda function data events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events-with-cloudtrail
  - id: selector-fields
    text: Advanced data event selectors can filter eventName and readOnly to include specific operations
      or read versus write activity.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/filtering-data-events.html#filtering-data-events
  - id: selector-replace
    text: A trail uses basic or advanced selectors, not both; applying advanced selectors overwrites
      basic selectors.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_PutEventSelectors.html#API_PutEventSelectors
  - id: recursive-events
    text: Logging S3 data events on the trail destination bucket can record CloudTrail PutObject
      deliveries and create repeated delivery events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-trail-recursive-logging.html#cloudtrail-trail-recursive-logging
  - id: recursive-suppression
    text: RecursiveLogging false suppresses CloudTrail-invoked S3 PutObject and CloudWatch Logs
      PutLogEvents delivery events while preserving other callers' events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-trail-recursive-logging.html#cloudtrail-trail-recursive-logging
  - id: recursive-default
    text: RecursiveLogging defaults to true on trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_CreateTrail.html#API_CreateTrail_RequestParameters
  - id: global-services
    text: Global service events are included by default in console-created trails; multiple
      single-Region trails should include them only once to avoid duplicates.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events
  - id: sts-regions
    text: CloudTrail logs STS global endpoint requests in us-east-1, while Regional STS endpoint
      requests are logged in their respective Region.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html#cloudtrail-integration
  - id: start-logging
    text: StartLogging starts API recording and log delivery for an existing trail and must be called in
      the home Region for a multi-Region trail.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StartLogging.html#API_StartLogging
  - id: create-start
    text: "Trail creation and starting event logging are separate CLI operations: create-trail and
      start-logging."
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli.html#cloudtrail-create-and-update-a-trail-by-using-the-aws-cli
cards:
  - id: cloudtrail-004
    q: A CloudTrail trail existed before an S3 download, but S3 data events were disabled. Can its
      management events identify the download?
    a: No. S3 GetObject is a data event and had to be selected when the request occurred.
    trap: true
    facts:
      - data-opt-in
      - selector-default
  - id: cloudtrail-005
    q: How can a CloudTrail trail audit reads of one S3 object prefix and invocations of one Lambda
      function?
    a: Use advanced data event selectors. Select AWS::S3::Object or AWS::Lambda::Function and restrict
      resources.ARN. Use readOnly or eventName to narrow activity.
    facts:
      - s3-selector
      - lambda-selector
      - selector-fields
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
    a: No. Global endpoint requests are logged in us-east-1; Regional endpoint requests are logged in
      their respective Region. Use a multi-Region trail for enabled Regions.
    trap: true
    facts:
      - sts-regions
      - trail-regions
  - id: cloudtrail-024
    q: How does a CloudTrail trail capture S3 GetObject and DeleteObject for a chosen bucket?
    a: Enable S3 object data events for that bucket. Data event logging is opt-in and incurs additional
      charges.
    facts:
      - data-opt-in
      - s3-selector
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
A trail is the CloudTrail configuration that sends selected events to S3 for an ongoing audit record. An event selector is a filter that decides which activity the trail records. [Trail concepts](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails)

### How it works

1. Choose the destination bucket and Region coverage. A multi-Region trail covers enabled Regions; the console creates this kind of trail.
2. Choose the events. Without specific selectors, the trail records read and write management events. Add data events explicitly for object operations or function invocations.
3. Narrow data collection with advanced selectors. An ARN, or Amazon Resource Name, identifies a resource. Use the fields below to select its activity.
4. When creating or recreating a trail through the CLI, create the configuration and start logging. `StartLogging` starts recording and delivery; call it in the Region where the trail was created, called its home Region. [CLI operations](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli.html#cloudtrail-create-and-update-a-trail-by-using-the-aws-cli)

| Selector field | Meaning | Example selection |
|---|---|---|
| `eventCategory` | Category to collect | `Data` |
| `resources.type` | Resource kind | `AWS::S3::Object` or `AWS::Lambda::Function` |
| `resources.ARN` | Resource identifier or prefix | `StartsWith` the chosen S3 prefix |
| `eventName` | API operation | Selected object operations |
| `readOnly` | Read or write activity | Read operations only |

[AWS data event selection](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events-with-cloudtrail) · [Advanced selector fields](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/filtering-data-events.html#filtering-data-events)

Global endpoint and Regional endpoint requests need different handling: STS global endpoint calls are logged in `us-east-1`, while Regional endpoint calls are logged in their respective Region. Console-created trails include global service events by default. If several single-Region trails collect global events, include them only once to avoid duplicates. [STS logging](https://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html#cloudtrail-integration) · [Global event handling](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events)

### Exam cues

- If the question says audit one S3 prefix, think advanced data event selectors, because a resource ARN filter limits collection to that prefix.
- If the question says a recreated trail delivers nothing, think `StartLogging`, because creating the configuration and starting recording are separate operations.
- If the question says log delivery creates more log events, think `RecursiveLogging: false` or exclude the destination bucket, because CloudTrail delivery can match the data selector.

### Remember

- Data events are opt-in and incur additional charges.
- `CreateTrail` defaults to a single-Region trail; the console creates multi-Region trails.
- Advanced selectors replace basic selectors; include every event category still required.
- `RecursiveLogging` defaults to `true`. Setting it to `false` suppresses CloudTrail-invoked S3 `PutObject` and CloudWatch Logs `PutLogEvents` deliveries. [Recursive event handling](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-trail-recursive-logging.html#cloudtrail-trail-recursive-logging)

> **Trap:** An existing trail is not evidence that an S3 download was recorded. Its data event selection must have included that operation when it happened.
