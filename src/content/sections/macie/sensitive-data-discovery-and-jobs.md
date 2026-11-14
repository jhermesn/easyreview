---
title: Sensitive data discovery and jobs
level: associate
order: 10
facts:
  - id: s3-scope
    text: Macie inventories S3 general purpose buckets, evaluates security and access settings, and discovers sensitive data in S3 objects.
    source: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html
  - id: finding-types
    text: Policy findings report bucket security or privacy issues; sensitive data findings report sensitive data detected in objects.
    source: https://docs.aws.amazon.com/macie/latest/user/findings-types.html
  - id: managed-identifiers
    text: Managed data identifiers are built-in detection criteria for credentials, financial information, and personal information, including personally identifiable information (PII).
    source: https://docs.aws.amazon.com/macie/latest/user/managed-data-identifiers.html
  - id: custom-identifiers
    text: Custom data identifiers use a regular expression and optional keywords, ignore words, and proximity criteria to detect organization-specific data.
    source: https://docs.aws.amazon.com/macie/latest/user/custom-data-identifiers.html
  - id: allow-lists
    text: Allow lists specify text or patterns to ignore, even when they match a managed or custom data identifier.
    source: https://docs.aws.amazon.com/macie/latest/user/allow-lists.html
  - id: automated-sampling
    text: Automated discovery evaluates inventory daily and analyzes the latest versions of representative eligible objects, providing broad visibility rather than analysis of every object.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-asdd-how-it-works.html
  - id: job-scope
    text: Jobs target selected buckets or buckets matching runtime criteria and can refine object scope and sampling depth.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs-scope.html
  - id: job-schedule
    text: Discovery jobs can run once or periodically on a daily, weekly, or monthly basis.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs-scope.html
  - id: job-incremental
    text: After the initial run, periodic jobs analyze only objects created or changed since the previous run; Include existing objects controls the initial scope.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs-scope.html
  - id: job-records
    text: A sensitive data finding records a positive detection; discovery results also record analyses with no sensitive data or with errors.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs.html
  - id: eventbridge
    text: Macie publishes findings to EventBridge automatically (source aws.macie), so rules can alert through SNS or start Lambda.
    source: https://docs.aws.amazon.com/macie/latest/user/monitoring-findings-eventbridge.html
cards:
  - id: macie-001
    q: Which AWS service discovers personally identifiable information in S3 objects and reports bucket security issues?
    a: Amazon Macie. Sensitive data findings describe detected content; policy findings describe bucket security or privacy issues.
    facts:
      - s3-scope
      - finding-types
      - managed-identifiers
  - id: macie-003
    q: A company stores internal identifiers in S3 with a proprietary format. How can Amazon Macie detect them?
    a: Create a custom data identifier with a regular expression and optional nearby keywords or ignore words.
    facts:
      - custom-identifiers
  - id: macie-004
    q: A security team needs a targeted monthly Macie scan of selected S3 buckets in addition to broad discovery. What fits?
    a: A monthly sensitive data discovery job. Set the bucket scope, object criteria, sampling depth, and identifiers for that job.
    facts:
      - job-schedule
      - job-scope
      - managed-identifiers
      - custom-identifiers
  - id: macie-005
    q: Amazon Macie automated discovery found no sensitive data in a bucket sample. Does that establish that every object is free of sensitive data?
    a: No. Automated discovery samples representative eligible objects. Use a targeted job with an appropriate scope for deeper analysis.
    trap: true
    facts:
      - automated-sampling
      - job-scope
  - id: macie-006
    q: What does an Amazon Macie discovery result record when an analyzed S3 object produces no sensitive data finding?
    a: Details of the analysis, including no detection or an analysis error. A finding specifically reports detected sensitive data.
    facts:
      - job-records
  - id: macie-007
    q: A recurring Amazon Macie job has completed its initial run. Does every later run reread all unchanged objects?
    a: No. Later runs analyze objects created or changed since the previous run.
    trap: true
    facts:
      - job-incremental
  - id: macie-012
    q: How does a security team get an alert as soon as Amazon Macie finds sensitive data?
    a: An EventBridge rule on Macie findings (source aws.macie) that targets SNS.
    facts: [eventbridge]
---

Amazon Macie discovers sensitive content in S3 general purpose buckets and monitors bucket security settings. Personally identifiable information (PII) means data that can identify a person. Macie separates risks in access settings from sensitive content found inside objects.

### How it works

1. Inventory buckets and evaluate their security and access settings. Policy findings report bucket security or privacy issues.
2. Choose automated discovery for broad sampling or a discovery job for a defined scope. Automated discovery evaluates inventory daily and analyzes representative eligible objects.
3. Select managed data identifiers, the built-in detection criteria, or custom identifiers for proprietary patterns. A regular expression is a text pattern; optional nearby keywords refine a custom match.
4. Add allow lists for text or patterns that should be ignored. Review sensitive data findings and discovery results, including analysis errors and objects with no detection.

| Detection choice | Purpose | Scope |
|---|---|---|
| Automated discovery | Broad visibility | Representative eligible objects |
| One-time job | Targeted analysis | Selected buckets or runtime criteria |
| Periodic job | Recurring analysis | Daily, weekly, or monthly increments |

### Exam cues

- If the question says locate sensitive data broadly across S3, think automated discovery, because it distributes sampling across eligible data.
- If the question says inspect selected buckets monthly, think a scheduled discovery job, because the job has its own scope and schedule.
- If the question says detect a proprietary identifier format, think a custom data identifier, because its regular expression can match that format.

### Remember

- Automated discovery evaluates inventory daily and samples objects.
- Jobs run once, daily, weekly, or monthly.
- After the initial run, periodic jobs examine newly created or changed objects.
- Allow lists suppress matching text even when a data identifier matches it.

> **Trap:** No sensitive data finding is not proof of a complete, error-free scan. Review the scope and discovery results; some analyses may have failed or examined only a sample.
