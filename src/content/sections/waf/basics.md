---
title: "WAF basics"
level: foundational
order: 5
facts:
  - id: web-firewall
    text: "AWS WAF is a web application firewall that watches HTTP(S) requests to resources such as CloudFront distributions and API Gateway APIs and allows or blocks them by rules."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter
cards:
  - id: waf-025
    q: "A web application behind CloudFront must block SQL injection attempts and requests from certain IP addresses. Which service fits?"
    a: "AWS WAF."
    facts: [web-firewall]
---
AWS WAF filters web requests before they reach an application. [AWS WAF](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter)

### How it works

1. Attach a web ACL to a protected resource such as CloudFront or API Gateway.
2. Rules inspect each HTTP(S) request.
3. Matching requests are allowed, blocked or counted.

### Exam cues

- If the question says block SQL injection, cross-site scripting or IP addresses at the web layer, think AWS WAF.

### Remember

- Works on HTTP(S) requests.

> **Trap:** WAF filters web requests; security groups filter network traffic to instances.
