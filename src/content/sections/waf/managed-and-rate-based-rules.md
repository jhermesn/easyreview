---
title: Managed and rate-based rules
level: associate
order: 20
facts:
  - id: core
    text: The WAF core rule set AWSManagedRulesCommonRuleSet includes protections against common web
      vulnerabilities, including cross-site scripting request patterns.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html#aws-managed-rule-groups-baseline-crs
  - id: sql
    text: AWSManagedRulesSQLiRuleSet detects patterns associated with SQL injection, where requests
      attempt to inject unauthorized database queries.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-use-case.html#aws-managed-rule-groups-use-case-sql-db
  - id: ip-reputation
    text: WAF IP reputation rule groups inspect source IP addresses using threat intelligence or lists
      of identity-obscuring sources.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-ip-rep.html
  - id: bots
    text: Bot Control manages bot requests with Common protection for self-identifying bots and Targeted
      protection for more sophisticated bots.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-bot.html
  - id: rate-model
    text: A rate-based rule counts request groupings over an evaluation window and applies its action to
      requests above the configured limit.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-high-level-settings.html
  - id: aggregation
    text: Rate-based rules group by source IP by default, or can use forwarded IPs and custom keys such
      as headers, cookies, HTTP methods or paths.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-aggregation-options.html
  - id: scope
    text: A scope-down statement narrows the requests counted and rate limited; Count all aggregates all
      matches together and requires a scope-down statement.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-high-level-settings.html
  - id: managed-scope
    text: A scope-down statement in a managed rule group limits evaluation to requests matching the statement.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-scope-down-statements.html#waf-rule-scope-down-statements
  - id: approximate
    text: WAF rate limiting is approximate and can react after a delay; it does not guarantee an exact
      request quota.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-caveats.html
  - id: testing
    text: Test and tune WAF protections in staging, then Count mode on production traffic before
      enforcement.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-testing.html
diagrams: []
cards:
  - id: waf-002
    q: A public ALB application faces SQL injection, cross-site scripting and request floods. Which AWS
      WAF protections should a team combine?
    a: Use the SQL database managed rule group, the core rule set and a rate-based rule. Test and tune
      in staging and Count mode before enforcing.
    facts:
      - sql
      - core
      - rate-model
      - testing
  - id: waf-006
    q: A login endpoint receives a distributed flood with each IP below a per-IP limit. How can AWS WAF
      rate limit the combined login traffic?
    a: Use a rate-based rule with Count all aggregation and a scope-down statement matching the login
      path. Its rate action applies to the combined matching request group.
    facts:
      - aggregation
      - scope
      - rate-model
  - id: waf-013
    q: Which AWS WAF managed protections fit known malicious IPs and automated bot requests?
    a: IP reputation rule groups for source IP intelligence, and Bot Control for bot requests. Bot
      Control Common handles self-identifying bots; Targeted adds sophisticated bot detection.
    facts:
      - ip-reputation
      - bots
  - id: waf-016
    q: An API must accept exactly a fixed request quota with no delay. Does an AWS WAF rate-based rule
      guarantee that quota?
    a: No. WAF rate limiting is approximate and can take time to react to traffic changes.
    trap: true
    facts:
      - approximate
  - id: waf-019
    q: An AWS WAF managed rule group should inspect only requests to a login path. What should the team add?
    a: Add a scope-down statement matching the login path. Only matching requests are evaluated by the group.
    facts: [managed-scope]
---
AWS WAF managed rule groups provide maintained sets of request checks. Rate-based rules control high request volumes. Use both when an application faces exploit attempts as well as floods.

### How it works

1. Choose managed rule groups for the application. SQL injection means adding unauthorized database query instructions to a request. Cross-site scripting means sending script content intended to run in a user's browser.
2. For volume control, choose an aggregation key, the request value used to group requests into counters. The default is source IP. Custom keys can use headers, cookies, HTTP methods or paths.
3. Add a scope-down statement, a filter that limits which requests are counted. For a combined limit on a login path, use Count all aggregation with a scope-down statement matching that path.
4. WAF looks back over the evaluation window and applies the rate action when a grouping exceeds the limit.
5. Test and tune in staging and Count mode before enforcing. Treat the rate limit as approximate availability protection, since detection can lag traffic changes.

A scope-down statement can also restrict a managed rule group to matching requests.

| Threat | Managed rule group |
|---|---|
| Common vulnerabilities, including cross-site scripting | Core rule set, `AWSManagedRulesCommonRuleSet` |
| Unauthorized SQL query patterns | SQL database group, `AWSManagedRulesSQLiRuleSet` |
| Known threatening or identity-obscuring IP sources | IP reputation groups |
| Automated bot requests | Bot Control, Common or Targeted protection |

### Exam cues

- If the question says SQL injection and request floods, think managed exploit rules plus a rate-based rule, because matching malicious content and counting request volume solve different problems.
- If the question says many IPs flood one login path below each IP's limit, think Count all with a path scope-down statement, because all matching login traffic shares the counter.
- If the question says a managed rule group should inspect only one path, think a scope-down statement, because the group evaluates only matching requests.
- If the question says bots hide their identity, think Bot Control Targeted protection, because it adds detection for bots that do not identify themselves.

### Remember

- Count all requires a scope-down statement. It is an aggregation choice, separate from the Count rule action.
- Rate limiting is approximate and can react after a delay.

> **Trap:** A per-IP counter does not impose one shared limit on requests from all IPs. Choose aggregation to match the traffic grouping the question requires.
