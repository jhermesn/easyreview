---
title: Annotations, metadata, and groups
level: associate
order: 30
facts:
  - id: annotation
    text: X-Ray annotations are indexed key-value pairs used in filter expressions.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html#api-segmentdocuments-annotations
  - id: types
    text: Annotation values support strings, numbers, and Booleans, but not objects or arrays.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html#api-segmentdocuments-annotations
  - id: limit
    text: X-Ray indexes up to 50 annotations per trace.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html#api-segmentdocuments-annotations
  - id: metadata
    text: X-Ray metadata can contain values including objects and arrays, but X-Ray does not index it.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html#api-segmentdocuments-metadata
  - id: filter
    text: Filter expressions can search annotation values and combine conditions with AND or OR.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-filters.html
  - id: api
    text: Annotations can be used to filter traces in the console or through GetTraceSummaries.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-annotations
  - id: group
    text: An X-Ray group selects incoming traces through a filter expression and has its own service
      graph and trace summaries.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-groups.html
  - id: metrics
    text: X-Ray publishes CloudWatch metrics for counts of traces matching a group every minute.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-groups.html#xray-console-group-cloudwatch
  - id: edit
    text: Changing a group expression affects subsequent traces only; create a new group to avoid a
      graph combining old and new selections.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-groups.html
  - id: insights
    text: Enable Insights for each X-Ray group to detect anomalous fault rates and track their impact.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-insights.html#xray-console-enable-insights
  - id: notifications
    text: Enable Notifications on an insights-enabled group to emit insight events to EventBridge on a
      best-effort basis.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-insights.html#xray-console-insight-notifications
  - id: event
    text: X-Ray insight events use source aws.xray and detail-type AWS X-Ray Insight Update.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-insights.html#xray-console-insight-notifications
  - id: target
    text: EventBridge rules can route X-Ray insight notifications to targets including SNS or Lambda.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-insights.html#xray-console-insight-notifications
diagrams:
  - id: xray-insight-events
    title: Route group insight updates to notifications
    width: 1000
    height: 230
    nodes:
      - id: insight
        label: X-Ray group
        icon: x-ray
        sub: Insights + Notifications
        x: 30
        y: 75
        w: 270
        h: 86
        tone: devtools
      - id: events
        label: EventBridge
        icon: eventbridge
        sub: match insight updates
        x: 360
        y: 75
        w: 270
        h: 86
        tone: integration
      - id: notify
        label: SNS
        icon: simple-notification-service
        sub: notification target
        x: 690
        y: 75
        w: 270
        h: 86
        tone: integration
    edges:
      - from: insight
        to: events
        step: 1
      - from: events
        to: notify
        step: 2
    steps:
      - An insights-enabled group with Notifications emits an insight update to EventBridge.
      - A matching rule sends the event to its configured SNS target.
cards:
  - id: xray-009
    q: A team needs to filter X-Ray traces by an order reference. Should it record an annotation or
      metadata?
    a: An annotation. X-Ray indexes annotations for filters; metadata can hold objects and arrays but is
      not indexed.
    facts:
      - annotation
      - metadata
    trap: true
  - id: xray-010
    q: A team records an opaque customer reference and wants slow X-Ray traces for that reference. Which
      feature should it use?
    a: Record the reference as an annotation and combine its filter with a response-time condition in
      the console or GetTraceSummaries.
    facts:
      - annotation
      - filter
      - api
  - id: xray-011
    q: What does an X-Ray group provide?
    a: A saved filter over incoming traces, a service graph and trace summaries, and CloudWatch metrics
      published every minute for matching traces.
    facts:
      - group
      - metrics
  - id: xray-028
    q: A team needs automated notifications when X-Ray detects an unusual fault rate. What should it
      configure?
    a: Enable Insights and Notifications on the relevant group, then match EventBridge events with
      source aws.xray and detail-type AWS X-Ray Insight Update. Route them to a target such as SNS.
    facts:
      - insights
      - notifications
      - event
      - target
  - id: xray-029
    q: An X-Ray group changes its filter, but the graph still contains the old population. What explains
      this, and how can the team get a clean graph?
    a: The change applies only to subsequent traces. Create a new group to avoid combining old and new
      selections.
    facts:
      - edit
    trap: true
  - id: xray-030
    q: Can an X-Ray annotation contain a JSON object, and how many annotations are indexed per trace?
    a: No. Annotation values are strings, numbers, or Booleans. X-Ray indexes up to 50 annotations per
      trace; objects belong in metadata.
    facts:
      - types
      - limit
      - metadata
---
Annotations make selected trace values searchable. Metadata stores extra details for inspection. Groups save a filter over incoming traces so a team can view a relevant application slice and its metrics.

### How it works

1. Record values needed for search as annotations, indexed key-value pairs. Use metadata for objects or arrays that only need inspection.
2. Build a filter expression, a condition that selects traces. Combine annotation conditions with response-time or status conditions using AND or OR.
3. Save the filter as a group. X-Ray creates its service graph and trace summaries, and publishes matching-trace counts to CloudWatch every minute.
4. To detect unusual fault rates, enable Insights for the group. To route changes to automation, also enable Notifications and create an EventBridge rule.

| Field or feature | Purpose | Search behavior |
|---|---|---|
| Annotation | Selected string, number, or Boolean value | Indexed for filters |
| Metadata | Additional details, including objects and arrays | Stored without indexing |
| Group | A saved filter over incoming traces | Selects traces and supplies group metrics |

An insight tracks a detected fault-rate anomaly and its impact. Insight notifications reach EventBridge with source aws.xray and detail-type AWS X-Ray Insight Update. A rule can route them to SNS notifications or a Lambda function. Delivery is best effort.

### Exam cues

- If the question says find traces by an application reference, think annotation, because metadata is not indexed.
- If the question says maintain a graph and metrics for a selected application slice, think group, because it applies a saved filter to incoming traces.
- If the question says notify when fault rates become unusual, think group Insights plus Notifications and EventBridge, because Insights detects the anomaly and notifications expose its updates.

### Remember

- X-Ray indexes up to 50 annotations per trace.
- Annotation values are strings, numbers, or Booleans.
- Group metrics are published every minute.
- A changed group filter affects subsequent traces, not stored history.
- Insights and Notifications are separate group settings.

> **Trap:** Enabling Insights alone does not enable EventBridge notifications. Enable Notifications on that insights-enabled group as well.
