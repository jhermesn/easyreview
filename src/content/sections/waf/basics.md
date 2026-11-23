---
title: "WAF basics"
level: foundational
order: 5
facts:
  - id: web-firewall
    text: "The AWS WAF web application firewall monitors HTTP(S) requests sent to resources, including API Gateway APIs and CloudFront distributions. It allows or blocks requests according to rules."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter
  - id: geo-match
    text: An AWS WAF geo match rule statement allows or blocks web requests by their country or region of origin.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html
  - id: sqli
    text: An AWS WAF SQL injection rule statement inspects web requests for malicious SQL code.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-sqli-match.html
  - id: scope
    text: "AWS WAF web ACLs can protect CloudFront distributions and supported regional resources."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: request-components
    text: "AWS WAF rule statements can inspect HTTP request headers and URI paths."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-fields-list.html
  - id: eks-alb
    text: "An Amazon EKS application exposed through an Application Load Balancer can use an AWS WAF web ACL."
    source: https://docs.aws.amazon.com/eks/latest/userguide/auto-configure-alb.html
cards:
  - id: waf-025
    q: "A web application behind CloudFront must block SQL injection attempts and requests from certain IP addresses. Which service fits?"
    a: "AWS WAF."
    facts: [web-firewall]
  - id: waf-020
    q: A company must block web requests to its application from specific countries. Which AWS service and rule type fit?
    a: AWS WAF with a geo match rule statement.
    facts: [geo-match]
  - id: waf-021
    q: Which AWS service can block SQL injection attempts in web requests?
    a: AWS WAF, with an SQL injection rule statement.
    facts: [sqli]
  - id: waf-029
    q: "Can AWS WAF inspect a web request header or URI path for a CloudFront distribution?"
    a: "Yes. Associate a web ACL with the distribution and configure rules for the request components."
    facts: [scope, request-components]
  - id: waf-030
    q: "How can an Amazon EKS application behind an Application Load Balancer filter HTTP requests with AWS WAF?"
    a: "Associate an AWS WAF web ACL with the Application Load Balancer."
    facts: [eks-alb]
---
AWS WAF filters web requests before they reach an application.

### How it works

1. Attach a web ACL to a protected resource such as CloudFront or API Gateway.
2. Rules inspect each HTTP(S) request.
3. Matching requests are allowed, blocked or counted.

### Exam cues

- If the question says protect an EKS application behind an Application Load Balancer, think an AWS WAF web ACL, because WAF can inspect requests at the load balancer.
- If the question says filter CloudFront requests by a header or URI path, think AWS WAF web ACL, because its rules inspect those request components.
- If the question says block SQL injection, cross-site scripting or IP addresses at the web layer, think AWS WAF.

### Remember

- Works on HTTP(S) requests.

> **Trap:** WAF filters web requests; security groups filter network traffic to instances.
