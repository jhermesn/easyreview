---
title: Support Center and cases
level: foundational
order: 20
facts:
  - id: case-types
    text: "The AWS Support Center console offers three case types: account and billing, service limit increase, and technical support."
    source: https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#case-management
  - id: all-customers
    text: Account and billing cases and service limit increase requests are available to all customers; Basic Support can't create technical cases.
    source: https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#case-management
  - id: severities
    text: Case severities and first-response times are general guidance (24 hours), system impaired (12 hours), production system impaired (4 hours), production system down (1 hour) and business-critical system down (under 30 minutes with Business Support+, under 15 minutes with Enterprise Support, 5 minutes with Unified Operations).
    source: https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#choosing-severity
  - id: highest-only
    text: Best practice is to choose the highest severity only for cases that can't be worked around or that directly affect production.
    source: https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#choosing-severity
  - id: change-severity
    text: Business Support+, Enterprise Support and Unified Operations customers can change a case's severity after creating it; Basic Support customers can't.
    source: https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#change-severity-for-support-cases
  - id: always
    text: All support plans provide round-the-clock access to customer service, documentation, technical papers and support forums.
    source: https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html#getting-started
cards:
  - id: support-009
    q: Which three kinds of cases can be opened in the AWS Support Center?
    a: Account and billing, service limit increase, and technical support. Basic Support can open the first two only.
    facts: [case-types, all-customers]
  - id: support-010
    q: What is the first-response time for an AWS Support case with severity "production system down"?
    a: 1 hour.
    facts: [severities]
  - id: support-011
    q: What is the first-response time for a "business-critical system down" case with AWS Enterprise Support?
    a: Under 15 minutes. With Business Support+ it is under 30 minutes.
    facts: [severities]
  - id: support-012
    q: A company on Basic Support needs a higher service quota. Can it ask AWS Support?
    a: Yes. Service limit increase requests are available to all customers, including Basic.
    facts: [all-customers]
  - id: support-013
    q: Should a team open every AWS Support case at the highest severity to get faster answers?
    a: No. Use the highest severity only when there's no workaround or production is directly affected.
    trap: true
    facts: [highest-only]
---
The AWS Support Center is where customers open and track cases with AWS Support. The case type and the support plan decide what help is available, and the severity sets how fast the first response comes. [Case management](https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#case-management)

### How it works

1. Open a case in the Support Center console and choose its type.
2. Describe the problem in detail: resources, timestamps and logs.
3. Pick a severity that matches the business impact. [Severity levels](https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#choosing-severity)
4. On Business Support+ or higher, change the severity later if the impact changes.

| Severity | First response | Plans |
|---|---|---|
| General guidance | 24 hours | Business Support+ and higher |
| System impaired | 12 hours | Business Support+ and higher |
| Production system impaired | 4 hours | Business Support+ and higher |
| Production system down | 1 hour | Business Support+ and higher |
| Business-critical system down | Under 30 min (Business Support+), under 15 min (Enterprise), 5 min (Unified Operations) | Business Support+ and higher |

### Exam cues

- If the question says billing question on Basic Support, think an account and billing case.
- If the question says raise a quota, think a service limit increase case (or Service Quotas).
- If the question says production is down, think severity production system down (1 hour).

### Remember

- Three case types; Basic can't open technical cases.
- 24 h, 12 h, 4 h, 1 h, then under 30 or 15 minutes.

> **Trap:** The response times are first-response times, not resolution times.
