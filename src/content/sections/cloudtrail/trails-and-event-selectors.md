---
title: Trails and event selectors
level: associate
order: 20
facts:
  - id: trail-destination
    text: A trail configures ongoing delivery of selected CloudTrail events to an S3 bucket.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
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
  - id: global-services
    text: Global service events are included by default in console-created trails; multiple
      single-Region trails should include them only once to avoid duplicates.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events
  - id: console-multi-region
    text: "A trail created in the CloudTrail console applies to all enabled Regions (a multi-Region trail); a single-Region trail can only be created with the CLI or API."
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html#cloudtrail-create-a-trail-using-the-console-first-time
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
  - id: cloudtrail-024
    q: How does a CloudTrail trail capture S3 GetObject and DeleteObject for a chosen bucket?
    a: Enable S3 object data events for that bucket. Data event logging is opt-in and incurs additional
      charges.
    facts:
      - data-opt-in
      - s3-selector
  - id: cloudtrail-051
    q: "A trail is created in the CloudTrail console. Which Regions does it log?"
    a: "All enabled Regions. Console trails are multi-Region; a single-Region trail needs the CLI or API."
    facts: [console-multi-region]
---
A trail is the CloudTrail configuration that sends selected events to S3 for an ongoing audit record. An event selector is a filter that decides which activity the trail records. [Trail concepts](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails)

### How it works

1. Choose the destination bucket and Region coverage. A multi-Region trail covers enabled Regions; the console creates this kind of trail.
2. Choose the events. Without specific selectors, the trail records read and write management events. Add data events explicitly for object operations or function invocations.
3. Narrow data collection with advanced selectors. An ARN, or Amazon Resource Name, identifies a resource. Use the fields below to select its activity.

| Selector field | Meaning | Example selection |
|---|---|---|
| `eventCategory` | Category to collect | `Data` |
| `resources.type` | Resource kind | `AWS::S3::Object` or `AWS::Lambda::Function` |
| `resources.ARN` | Resource identifier or prefix | `StartsWith` the chosen S3 prefix |
| `eventName` | API operation | Selected object operations |
| `readOnly` | Read or write activity | Read operations only |

[AWS data event selection](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events-with-cloudtrail) · [Advanced selector fields](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/filtering-data-events.html#filtering-data-events)

See also [global event handling](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events).

### Exam cues

- If the question says audit one S3 prefix, think advanced data event selectors, because a resource ARN filter limits collection to that prefix.
- If the question says audit a Lambda invocation, think data event selectors, because function invocations require explicit selection.
- If the question says a trail was created in the console, think all enabled Regions, because console-created trails are multi-Region.

### Remember

- Data events are opt-in and incur additional charges.
- Console-created trails cover all enabled Regions. [Console trails](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html#cloudtrail-create-a-trail-using-the-console-first-time)

> **Trap:** An existing trail is not evidence that an S3 download was recorded. Its data event selection must have included that operation when it happened.
