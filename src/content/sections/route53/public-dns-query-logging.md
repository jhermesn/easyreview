---
title: Public DNS query logging
level: associate
order: 100
facts:
  - id: query-logs
    text: Public DNS query logging sends the queries received by Route 53 to CloudWatch Logs.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html#query-logs
  - id: log-region
    text: The CloudWatch Logs log group for public DNS query logs must be in us-east-1.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html#query-logs-configuring
  - id: log-permissions
    text: A CloudWatch Logs resource policy must allow Route 53 to publish to the selected log group.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html#query-logs-configuring
  - id: log-fields
    text: Public query logs include the requested name, record type, timestamp, responding edge location and response code.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html#query-logs
  - id: cached-queries
    text: Public query logs record resolver queries reaching Route 53; queries answered from resolver caches do not reach Route 53.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html#query-logs
  - id: log-streams
    text: Route 53 creates a log stream for each edge location responding for the configured hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html#query-logs-viewing
cards:
  - id: route53-052
    q: A team needs the names and response codes of public DNS queries received by Route 53. What should it configure?
    a: Enable public hosted-zone query logging to CloudWatch Logs with a log group in us-east-1 and permission for Route 53 to write to it.
    facts:
      - query-logs
      - log-region
      - log-permissions
      - log-fields
  - id: route53-053
    q: Public Route 53 query logs show fewer lookups than application requests. Does that prove logging is broken?
    a: No. Resolvers can answer from cached DNS data without sending another query to Route 53. Those lookups do not appear in public query logs.
    facts:
      - cached-queries
    trap: true
  - id: route53-054
    q: Where does Route 53 send public hosted-zone query logs, and how are streams separated?
    a: To CloudWatch Logs in us-east-1, with a stream for each Route 53 edge location answering for the zone.
    facts:
      - query-logs
      - log-region
      - log-streams
---
Public DNS query logging records the queries that reach a Route 53 public hosted zone. It helps inspect requested names and DNS response codes, which describe whether resolution succeeded or returned an error.

### How it works

1. Choose or create a CloudWatch Logs log group in us-east-1 for the hosted zone's query logs. A log group contains related log streams.
2. Grant Route 53 permission to write through a CloudWatch Logs resource policy, a policy attached to the logging destination.
3. Enable query logging for the public hosted zone. Route 53 publishes a separate log stream for each responding edge location.
4. Inspect the requested name, type, timestamp, location and response code in CloudWatch Logs. A resolver that answers from cache sends no query to Route 53 for that lookup.

### Exam cues

- If the question says inspect public DNS names and response codes, think public query logging to CloudWatch Logs, because it records queries Route 53 receives.
- If the question says logs omit many client lookups, think resolver caching, because cached answers do not require another authoritative query.

### Remember

- Public DNS query-log groups must be in us-east-1.
- Route 53 needs permission to publish to the log group.
- Each responding edge location has a separate log stream.

> **Trap:** Public query logs are not a record of every client lookup or application request. Resolver caches can answer without contacting Route 53.
