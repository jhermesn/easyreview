---
title: Event history and event types
level: associate
order: 10
facts:
  - id: account-activity
    text: CloudTrail records supported API and non-API account activity from the console, SDKs, command
      line tools and AWS services.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-events
  - id: event-fields
    text: CloudTrail records the identity, event name, event time, AWS Region and source IP address for
      an event.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html#cloudtrail-event-reference-record-contents
  - id: management-events
    text: Management events describe resource administration, including security configuration and
      ConsoleLogin sign-in events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-management-events
  - id: data-events
    text: Data events describe operations on resources, including S3 GetObject, PutObject and
      DeleteObject and Lambda Invoke.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-data-events
  - id: network-events
    text: Network activity events record API activity through VPC endpoints and require explicit logging
      configuration.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-network-events
  - id: insights-events
    text: Insights events describe unusual API call rates or error rates relative to a learned baseline.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: history-window
    text: Event history automatically retains an immutable record of management events for the past 90
      days in each AWS Region, without a trail.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html#view-cloudtrail-events
  - id: history-scope
    text: Event history searches cover one account and one Region, allow one attribute filter plus a
      time range, and do not aggregate an organization.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html#view-cloudtrail-events
  - id: history-exclusions
    text: The Event history console excludes data, network activity and Insights events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html#view-cloudtrail-events
  - id: history-lookup
    text: LookupEvents retrieves recent events; an ongoing record beyond the Event history window
      requires a trail or event data store.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html#view-cloudtrail-events
  - id: trail-defaults
    text: A trail without specific event selectors logs read and write management events, but no data or
      network activity events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_PutEventSelectors.html#API_PutEventSelectors
  - id: s3-query
    text: Amazon Athena can query CloudTrail log files stored in S3.
    source: https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#cloudtrail-logs
  - id: insights-default
    text: CloudTrail trails do not log Insights events by default.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#understanding-insight-selectors
cards:
  - id: cloudtrail-001
    q: A security group was changed outside a CloudFormation deployment yesterday. How can investigators
      identify the caller?
    a: Search CloudTrail management events for the change, then inspect the identity and event time.
    facts:
      - management-events
      - event-fields
      - history-window
  - id: cloudtrail-002
    q: What does CloudTrail Event history retain without configuring a trail?
    a: The past 90 days of management events in each Region for the current account. It is an immutable
      record.
    facts:
      - history-window
      - history-scope
  - id: cloudtrail-003
    q: Does a default CloudTrail trail record S3 object reads and VPC endpoint API activity?
    a: No. It records read and write management events. Data and network activity logging require
      configuration.
    trap: true
    facts:
      - trail-defaults
      - data-events
      - network-events
  - id: cloudtrail-021
    q: Investigators need a CloudTrail security configuration change from more than 90 days ago. Where
      should they search?
    a: Search previously retained trail logs in S3 with Athena, or a retained event data store. Event
      history has only 90 days.
    facts:
      - history-window
      - history-lookup
      - s3-query
  - id: cloudtrail-025
    q: Which CloudTrail event category records S3 GetObject and Lambda Invoke?
    a: Data events. They record operations on resources.
    facts:
      - data-events
  - id: cloudtrail-026
    q: An auditor searches CloudTrail Event history in the management account but cannot find
      member-account changes. What explains this?
    a: Event history searches one account and Region. It does not aggregate organization events.
    trap: true
    facts:
      - history-scope
---
CloudTrail records supported activity in an AWS account so investigators can identify an action and its caller. An API is the interface a tool uses to ask a service to perform an action. CloudTrail events include API calls and some actions such as console sign-ins. [AWS event concepts](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-events)

### How it works

1. A person, application or AWS service performs a supported action. CloudTrail records fields such as identity, event name, event time, Region and source IP address.
2. Classify the event by what it describes. The control plane manages resources; the data plane performs operations on those resources.
3. Search Event history for recent management activity in the relevant account and Region. Use one attribute filter and a time range, or call `LookupEvents`.
4. Use a trail or event data store for an ongoing record beyond the history window. Athena can query trail files retained in S3. [Event history](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html#view-cloudtrail-events) · [Athena queries](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#cloudtrail-logs)

| Category | What it records | Default trail coverage |
|---|---|---|
| Management | Resource administration and console sign-ins | Read and write events |
| Data | Resource operations such as S3 object reads and Lambda invocations | Must be enabled |
| Network activity | API calls through VPC endpoints, private entry points to AWS services | Must be enabled |
| Insights | Call-rate or error-rate departures from normal activity | Must be enabled |

### Exam cues

- If the question says a security group changed outside a deployment, think CloudTrail management events, because the event identifies the caller and action.
- If the question says the change occurred more than 90 days ago, think previously retained trail logs or an event data store, because Event history has a fixed window.
- If the question says an object was downloaded, think data events, because object operations are data plane activity.

### Remember

- Event history: 90 days, management events, one account and Region per search.
- One attribute filter plus a time range is available in an Event history search.
- Data, network activity and Insights events are absent from the Event history console.

> **Trap:** An organization trail does not turn Event history into an organization-wide search. Event history still covers the account being searched.
