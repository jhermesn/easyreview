---
title: Sampling rules
level: associate
order: 20
facts:
  - id: default
    text: The default X-Ray SDK sampling rule records the first request each second and five percent of
      additional requests.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-custom
  - id: reservoir
    text: A sampling reservoir is the fixed number of matching requests per second recorded before the
      additional sampling rate applies.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling-options
  - id: priority
    text: Custom X-Ray sampling rule priorities range from 1 to 9999.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling-options
  - id: first-match
    text: X-Ray evaluates sampling rules in ascending priority order and uses the first match.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling-options
  - id: rate
    text: The X-Ray console expresses sampling rate as a percentage from 0 to 100.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling-options
  - id: json-rate
    text: Local X-Ray SDK sampling JSON uses a rate value from 0 to 1.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling-options
  - id: matching
    text: Sampling rules can match service name, service type, host, HTTP method, URL path, and
      supported resource or attribute criteria.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling-options
  - id: central
    text: For clients using remote rules, X-Ray distributes reservoir quotas among service instances and
      rule changes do not require code deployment.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-custom
  - id: local
    text: Local SDK sampling rule files apply independently on each instance, adding instance reservoirs
      together; changes require redeployment.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-custom
  - id: parent
    text: "X-Ray sampling is parent-based: downstream services honor an upstream decision even if their
      own matching rule differs."
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-custom
  - id: root
    text: A service applies a custom sampling rule only when no sampling decision has yet been made,
      such as at an entry point or worker starting a new trace.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-custom
  - id: lambda
    text: Lambda native X-Ray sampling cannot be configured on the function; absent an upstream decision
      its sampling rate is one request per second plus five percent of additional requests.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
  - id: active
    text: Lambda Active tracing uses the upstream header decision when one is provided.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
  - id: best-effort
    text: X-Ray applies sampling on a best-effort basis, so observed rates can differ from configured
      rates over short periods.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-custom
  - id: api-name
    text: For X-Ray sampling rules, API Gateway service names use the form api-name/stage.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling-options
cards:
  - id: xray-005
    q: What does the default X-Ray SDK sampling rule record?
    a: The first request each second and five percent of additional requests. Sampling means a missing
      trace is not by itself an instrumentation failure.
    facts:
      - default
    trap: true
  - id: xray-006
    q: A team needs all requests for a particular route eligible for X-Ray recording while debugging.
      How should it configure centralized sampling?
    a: Create a matching high-priority rule at the entry service and set the console rate to 100
      percent. Clients using remote rules pick up the change without a code deployment; application
      of sampling remains best effort. For API Gateway, match the service name as api-name/stage.
    facts:
      - priority
      - first-match
      - rate
      - json-rate
      - matching
      - central
      - root
      - best-effort
      - api-name
  - id: xray-007
    q: Why use remote X-Ray sampling rules rather than a local JSON rule file across many application
      instances?
    a: X-Ray distributes the rule reservoir across instances and allows updates without redeployment.
      Local files apply separately per instance, so their reservoirs add together.
    facts:
      - central
      - local
  - id: xray-008
    q: Service B has a low-rate X-Ray sampling rule but still records calls sampled by service A. Why?
    a: Parent-based sampling honors A's upstream decision. Adjust the rule where the request first
      receives its sampling decision.
    facts:
      - parent
      - root
    trap: true
  - id: xray-014
    q: Can a Lambda function configure its native X-Ray sampling rate?
    a: No. Lambda follows an upstream sampling decision or uses one request per second plus five percent
      of additional requests. Adjust an entry service rule to control its upstream traffic.
    facts:
      - lambda
      - active
      - root
  - id: xray-025
    q: A Lambda request arrives with an upstream X-Ray Sampled=0 decision. Does Active tracing override
      it?
    a: No. Active tracing follows the upstream sampling decision.
    facts:
      - active
    trap: true
  - id: xray-027
    q: What do reservoir and rate mean in an X-Ray sampling rule?
    a: Reservoir is the fixed matching request count per second. Rate is the proportion recorded after
      that count is exhausted.
    facts:
      - reservoir
      - rate
      - json-rate
---
Sampling chooses which requests to record, limiting trace volume. The reservoir covers a fixed request count each second; the rate applies to additional matching requests.

### How it works

1. At a service that has no upstream decision, compare request details with sampling rules. Match fields such as service name, HTTP method, and URL path.
2. Evaluate custom rules in ascending priority order. The first match decides the reservoir and rate.
3. For clients configured to fetch remote rules, X-Ray divides reservoir quotas among instances. Local JSON files apply separately on each instance.
4. Propagate the decision. Downstream services honor the parent decision even if their own rules would choose differently.

### Exam cues

- If the question says record a specific route while debugging, think a matching entry-service rule with rate 100 percent, because that is where a new sampling decision applies.
- If the question says service B ignores a stricter rule, think upstream sampling, because B honors its parent's decision.
- If the question says sampling increases as instances scale out, think local reservoirs, because each local rule file samples independently.

### Remember

- Default SDK sampling: first request each second plus five percent of additional requests.
- Custom rule priority: 1 through 9999; the lowest matching value wins.
- Console rate: 0 through 100 percent. Local SDK JSON rate: 0 through 1.
- Remote rule changes need no code deployment when the client fetches them.
- API Gateway sampling service name: api-name/stage.
- Lambda native sampling is not configurable per function.
- Sampling is best effort; short-term observed rates can differ.

> **Trap:** Active tracing on Lambda does not turn an upstream Sampled=0 decision into a recorded request. Change sampling at the entry service.
