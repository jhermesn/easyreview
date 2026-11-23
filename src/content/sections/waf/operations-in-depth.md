---
title: Rate rules and logging operations
level: professional
order: 30
facts:
  - id: windows
    text: WAF rate evaluation windows are 60, 120, 300 or 600 seconds, with 300 seconds as the default.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-high-level-settings.html
  - id: minimum
    text: The minimum rate-based rule limit is 10 requests per evaluation window.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-high-level-settings.html
  - id: missing-keys
    text: A request missing a component required by a custom aggregation key is omitted from that
      rate-based rule evaluation.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-aggregation-options.html
  - id: reset
    text: Changing rate-based rule rate settings resets its counts and can pause rate limiting for up to
      one minute.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-caveats.html
  - id: rate-action
    text: A WAF rate-based rule can use any rule action except Allow.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-high-level-settings.html
  - id: log-redaction
    text: WAF logging redaction does not affect request sampling; web ACL data protection can exclude
      fields from sampling.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
  - id: log-prefix
    text: AWS WAF logging destinations (S3 bucket, CloudWatch Logs group or Firehose stream) must have names starting with aws-waf-logs-.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/logging-s3.html
  - id: custom-block
    text: "Instead of the default 403 Forbidden response, a WAF Block action can return customized response codes, headers and body."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-custom-request-response.html
cards:
  - id: waf-014
    q: What evaluation windows and minimum limit can an AWS WAF rate-based rule use?
    a: 60, 120, 300 or 600 seconds; 300 seconds is the default. The lowest limit is 10 requests per
      evaluation window.
    facts:
      - windows
      - minimum
  - id: waf-015
    q: An AWS WAF rate-based rule groups by a custom session cookie. What happens to a request without
      that cookie?
    a: The rule omits it from evaluation because the required aggregation component is missing.
    trap: true
    facts:
      - missing-keys
  - id: waf-017
    q: A team edits the evaluation window of a live AWS WAF rate-based rule. What happens to its request
      counts?
    a: The counts reset, and rate limiting can pause for up to one minute.
    facts:
      - reset
  - id: waf-018
    q: Can an AWS WAF rate-based rule use Allow as its rate action?
    a: No. Its rate action can use the other rule actions, but not Allow.
    facts:
      - rate-action
  - id: waf-011
    q: A team redacts a request header in AWS WAF logs. Is that header automatically excluded from
      sampled requests?
    a: No. Logging redaction does not affect sampling. Use web ACL data protection to exclude fields
      from sampling.
    trap: true
    facts:
      - log-redaction
  - id: waf-022
    q: AWS WAF refuses an S3 bucket as its log destination. What naming rule applies?
    a: The destination name must start with aws-waf-logs-.
    trap: true
    facts: [log-prefix]
  - id: waf-026
    q: "Blocked requests must get a branded HTML page with status 429 instead of the default AWS WAF response. What should the team configure?"
    a: "A **custom response** on the Block action: status code, headers and body. It replaces the default 403 Forbidden."
    facts: [custom-block]
---
AWS WAF rate-based rules and logging have settings that affect how requests are evaluated and what data is recorded. Plan these settings alongside custom Block responses when operating a web ACL.

### How it works

1. Choose a rate evaluation window and limit. A rate-based rule can use any rule action except Allow. See rate-based rule settings.
2. Check the custom aggregation key, the request components used to group requests. A request missing any required component is omitted from that rule's evaluation. See aggregation options.
3. Plan changes to a live rule: changing rate settings resets its counts and can pause rate limiting for up to one minute. See rate-based rule caveats.
4. Name a logging destination with the required prefix. Logging redaction does not affect request sampling; web ACL data protection can exclude fields from sampling. See S3 logging and WAF logging.
5. For a tailored Block response, configure its response code, headers and body in place of the default 403 Forbidden. See custom responses.

### Exam cues

- If the question says a session cookie is missing from a request, think omission from the rate rule, because every custom aggregation key component is required.
- If the question says a live rate rule's window changed, think reset counts and a possible pause, because changing rate settings resets rate limiting counts.
- If the question says a blocked request needs a branded page, think a custom Block response, because it can set the status code, headers and body.

### Remember

- Evaluation windows: 60, 120, 300 or 600 seconds; default: 300 seconds. Minimum limit: 10 requests per window.
- Rate-based rules cannot use Allow as their action.
- S3 buckets, CloudWatch Logs groups and Firehose streams used for WAF logging need names starting with `aws-waf-logs-`.

> **Trap:** Redacting a field in WAF logs does not remove it from sampled requests. Use web ACL data protection to exclude fields from sampling.
