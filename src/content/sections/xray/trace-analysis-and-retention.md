---
title: Trace analysis and retention
level: associate
order: 50
facts:
  - id: map
    text: The X-Ray trace map identifies services with errors, high-latency connections, and
      unsuccessful requests.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-servicemap.html
  - id: timeline
    text: Trace details show a service-node map and a timeline of segments and subsegments.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-traces.html
  - id: search
    text: The X-Ray console can filter traces by response code, URL, and other trace-summary data, or
      find a trace by its ID.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-traces.html
  - id: error
    text: X-Ray categorizes HTTP 4xx responses as client errors.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-errors
  - id: fault
    text: X-Ray categorizes HTTP 5xx responses as server faults.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-errors
  - id: throttle
    text: X-Ray categorizes HTTP 429 responses as throttling errors.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-errors
  - id: colors
    text: The X-Ray service map uses green for success, yellow for client errors, red for server faults,
      and purple for throttling.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-servicemap.html#xray-console-servicemap-view
  - id: trace-retention
    text: X-Ray retains trace data for 30 days.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-traces
  - id: graph-retention
    text: X-Ray retains service graph data for 30 days.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-servicegraph
  - id: readonly
    text: AWSXrayReadOnlyAccess is the AWS managed policy for read-only X-Ray access.
    source: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSXrayReadOnlyAccess.html
  - id: logs
    text: Supported trace-map nodes can link to associated CloudWatch logs; this is not supported for
      every node type.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-servicemap.html
  - id: downstream
    text: A trace-level error filter can miss errors handled by an upstream application; service() and
      edge() filters can search downstream issues.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-filters.html#console-filters-complex
cards:
  - id: xray-020
    q: How does X-Ray classify HTTP failures, and what colors indicate them on the service map?
    a: Client errors are 4xx and yellow; server faults are 5xx and red; throttling is 429 and purple.
      Successful calls are green.
    facts:
      - error
      - fault
      - throttle
      - colors
  - id: xray-021
    q: A checkout request is slow across several services. How should the team investigate it with
      X-Ray?
    a: Select a high-latency node or connection on the trace map, filter the trace list, and inspect a
      trace timeline for the slow segment or subsegment. Open associated logs where supported.
    facts:
      - map
      - timeline
      - search
      - logs
  - id: xray-022
    q: How long does X-Ray retain traces and service graph data, and which managed policy supports an
      analyst who only views X-Ray?
    a: 30 days for both. AWSXrayReadOnlyAccess is the read-only managed policy.
    facts:
      - trace-retention
      - graph-retention
      - readonly
  - id: xray-032
    q: A service handles downstream failures and returns success, so an X-Ray error filter misses the
      failing dependency. How should the team refine its search?
    a: Use service() or edge() conditions for downstream issues. A trace-level error condition does not
      necessarily capture an error handled before the final response.
    facts:
      - downstream
    trap: true
  - id: xray-033
    q: An analyst needs to inspect one failed X-Ray request with a known trace ID. What should the
      analyst open?
    a: Search by trace ID, select the matching trace, and inspect its service map and segment timeline.
    facts:
      - search
      - timeline
  - id: xray-034
    q: Does the X-Ray service map provide permanent request history for an audit?
    a: No. X-Ray trace and service graph retention is 30 days. Plan audit evidence around that retention
      window.
    facts:
      - trace-retention
      - graph-retention
    trap: true
---
X-Ray analysis connects an application's symptoms to the service work recorded for a request. The trace map shows dependencies and their health; the timeline shows where a selected request spent its time.

### How it works

1. Select a service node or connection with high latency or failures on the trace map.
2. Narrow the trace list by URL, response code, or other summary fields. Search by trace ID when investigating a known request.
3. Open a trace and inspect the segment and subsegment timeline for the slow operation or failing call.
4. Open associated CloudWatch logs where the node supports them. Use service() or edge() filters when a downstream error was handled before the final response.

| Classification | HTTP response | Service-map color |
|---|---|---|
| Error | 4xx client response | Yellow |
| Fault | 5xx server response | Red |
| Throttle | 429 | Purple |

Successful calls appear green on the service map. An error handled inside the application can be absent from a trace-level error search even though its downstream call failed.

### Exam cues

- If the question says locate the slow downstream operation, think trace timeline, because segment and subsegment durations show the recorded work.
- If the question says a dependency failed but the application returned success, think service() or edge() filters, because trace-level status can hide a handled downstream failure.
- If the question says an analyst only needs to inspect traces, think AWSXrayReadOnlyAccess, because it is the read-only X-Ray managed policy.

### Remember

- Trace data retention: 30 days.
- Service graph retention: 30 days.
- Error: 4xx. Fault: 5xx. Throttle: 429.
- Associated logs are available for supported node types, not every node.

> **Trap:** A successful final response does not prove every downstream call succeeded. Inspect service or edge conditions and the trace timeline for handled failures.
