---
title: Insights
level: associate
order: 70
facts:
  - id: insights-baseline
    text: CloudTrail Insights learns a baseline from past API activity and emits events when call or
      error rates depart from it.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-write
    text: Management API call-rate Insights require write management events and Insights enabled on the
      trail or source event data store.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-errors
    text: Management API error-rate Insights require read or write management events, or both, with
      Insights enabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-data
    text: Data event Insights require a trail logging the relevant data events and support call-rate and
      error-rate detection; event data stores do not support data event Insights.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-region
    text: An Insights event is generated in the same Region as its supporting events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-opt-in
    text: Insights logging is disabled by default and incurs additional charges when enabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-insights-events
  - id: insights-trail-delay
    text: Trail Insights delivery can take up to 36 hours after first enabling or restarting Insights,
      provided unusual activity is detected.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/insights-events-understanding.html#insights-events-understanding
  - id: insights-lake-delay
    text: Lake Insights delivery uses a source and destination event data store and can take up to 7
      days after enabling or restarting, provided unusual activity is detected.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/insights-events-understanding.html#insights-events-understanding
cards:
  - id: cloudtrail-019
    q: What does CloudTrail Insights detect, and which management events must be recorded first?
    a: Call-rate or error-rate deviations from a learned baseline. Management call-rate Insights need
      write events; error-rate Insights need read or write events, or both. Enable Insights
      explicitly.
    facts:
      - insights-baseline
      - insights-write
      - insights-errors
      - insights-opt-in
  - id: cloudtrail-040
    q: A CloudTrail trail records only read management calls. A team wants call-rate Insights. What must
      change?
    a: Enable write management event logging and Insights. Management call-rate Insights analyze write
      calls.
    trap: true
    facts:
      - insights-write
  - id: cloudtrail-041
    q: A team needs CloudTrail Insights for an unusual rate of S3 data calls. Should it configure data
      event Insights on an event data store?
    a: No. Use a trail logging the data events and enable Insights there. Data event Insights are not
      supported on event data stores.
    trap: true
    facts:
      - insights-data
  - id: cloudtrail-042
    q: A CloudTrail trail has no Insights events immediately after Insights is enabled. Does that prove
      a delivery failure?
    a: No. Initial delivery can take up to 36 hours, and Insights events appear only when unusual
      activity is detected.
    trap: true
    facts:
      - insights-trail-delay
      - insights-baseline
---
CloudTrail Insights detects unusual API call rates and error rates. Its baseline is the normal activity pattern learned from past events, so the feature looks for departures from that pattern. [AWS Insights behavior](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail)

### How it works

1. Record the supporting activity and enable Insights. The table shows which inputs each detector needs.
2. CloudTrail learns normal call and error patterns from past activity.
3. When current activity departs from that baseline, CloudTrail generates an Insights event in the Region of the supporting events.

| Detector | Supporting activity | Where supported |
|---|---|---|
| Management call rate | Write management calls | Trail or source event data store |
| Management error rate | Read or write management calls, or both | Trail or source event data store |
| Data call or error rate | Relevant data events | Trail only |

### Exam cues

- If the question says a burst of write API calls differs from normal behavior, think call-rate Insights, because it compares current volume with a learned baseline.
- If the question says API errors increased unusually, think error-rate Insights, because it compares errors with past patterns.
- If the question says detect unusual S3 data API volume, think trail data event Insights, because event data stores do not support that detector.

### Remember

- Insights is opt-in and incurs additional charges.
- Trail delivery can take up to 36 hours after enablement or restart, and only produces events when unusual activity is detected.
- Lake uses a source and destination event data store and can take up to 7 days under the same condition. [Delivery timing](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/insights-events-understanding.html#insights-events-understanding)

> **Trap:** Enabling management call-rate Insights on a trail that records only read calls does not supply its required write-event input.
