---
title: "X-Ray basics"
level: foundational
order: 5
facts:
  - id: tracing
    text: "AWS X-Ray collects data about the requests an application serves and provides tools to view and filter it to find issues and optimization opportunities."
    source: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#aws-xray
  - id: lambda-traces
    text: "AWS Lambda can send sampled request traces to AWS X-Ray for performance analysis and troubleshooting."
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray
cards:
  - id: xray-035
    q: "Requests through several microservices are slow and the team must see which service adds the delay. Which AWS service fits?"
    a: "AWS X-Ray, which traces requests across services."
    facts: [tracing]
  - id: xray-037
    q: "How can a team investigate slow AWS Lambda requests with AWS X-Ray?"
    a: "Enable Lambda tracing and use X-Ray to examine sampled request traces."
    facts: [lambda-traces]
---
AWS X-Ray traces requests through an application to show where time is spent and where errors happen.

### How it works

1. Instrument the application.
2. X-Ray records each request as it passes through services.
3. View traces to find slow or failing parts.

### Exam cues

- If the question says diagnose slow Lambda requests, think X-Ray traces, because Lambda can send sampled traces for analysis.
- If the question says trace requests across microservices, think X-Ray.

### Remember

- Request tracing.

> **Trap:** X-Ray traces requests; CloudWatch holds metrics and logs.
