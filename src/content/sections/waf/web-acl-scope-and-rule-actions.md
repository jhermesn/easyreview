---
title: Web ACL scope and rule actions
level: associate
order: 10
facts:
  - id: acl
    text: A WAF web access control list (web ACL), also called a protection pack, associates request
      inspection rules with protected resources.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: global
    text: CloudFront web ACLs and their WAF resources are created in us-east-1; a CloudFront-associated
      ACL cannot protect another resource type.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: regional
    text: Regional WAF resources include ALB, API Gateway REST API, AppSync GraphQL API, Cognito user
      pool, App Runner service, Bedrock AgentCore Gateway and Verified Access instance.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: amplify
    text: Amplify apps require a web ACL in the Global CloudFront Region rather than an existing
      Regional ACL.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: same-region
    text: A Regional web ACL and its WAF resources must be in the same Region as the protected regional
      resource.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: unsupported
    text: WAF does not list Network Load Balancers or EC2 instances as directly supported protected
      resource types.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: association
    text: Each protected resource can have only one web ACL; a web ACL can protect multiple compatible
      resources.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: priority
    text: WAF evaluates rules from lowest to highest numeric priority, stopping at a terminating action
      or the end of the rules.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-processing-order.html
  - id: allow-block
    text: Allow and Block terminate web ACL evaluation; Block prevents the protected resource from
      receiving the request.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-rule-actions.html
  - id: count
    text: Count records a matching request and continues evaluating later rules.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-rule-actions.html
  - id: token
    text: CAPTCHA and Challenge continue evaluation when a valid token is present; otherwise they
      terminate evaluation and request a puzzle or background challenge.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-rule-actions.html
  - id: default
    text: If no rule produces a terminating action, WAF applies the web ACL default action.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-rule-actions.html
  - id: testing
    text: AWS recommends testing and tuning WAF in staging, then using Count on production traffic
      before enabling enforcement.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-testing.html
  - id: log-destinations
    text: WAF request logs can be sent to CloudWatch Logs, an S3 bucket or a Data Firehose delivery
      stream.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
  - id: log-redaction
    text: WAF logging redaction does not affect request sampling; web ACL data protection can exclude
      fields from sampling.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
  - id: origin-header
    text: CloudFront can add a secret origin header that an ALB WAF rule checks to block requests
      bypassing CloudFront.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: origin-rotation
    text: A Secrets Manager rotation workflow can update both the CloudFront custom origin header and
      the ALB WAF rule configuration.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: geo-match
    text: An AWS WAF geo match rule statement allows or blocks web requests by their country or region of origin.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html
  - id: sqli
    text: An AWS WAF SQL injection rule statement inspects web requests for malicious SQL code.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-sqli-match.html
diagrams:
  - id: waf-rule-evaluation
    title: Evaluation when no rule terminates
    width: 800
    height: 190
    nodes:
      - id: count
        label: Count match
        icon: waf
        tone: security
        x: 30
        y: 60
        w: 210
        h: 86
      - id: next
        label: Later rules
        icon: waf
        tone: security
        x: 295
        y: 60
        w: 210
        h: 86
      - id: default
        label: Default action
        icon: waf
        tone: security
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: count
        to: next
        step: 1
      - from: next
        to: default
        step: 2
    steps:
      - Continue evaluation
      - No terminating match
cards:
  - id: waf-001
    q: Which resource types can AWS WAF protect with a web ACL?
    a: CloudFront, ALB, API Gateway REST API, AppSync GraphQL API, Cognito user pool, App Runner,
      Bedrock AgentCore Gateway, Verified Access and Amplify. Amplify requires the Global CloudFront
      Region.
    facts:
      - global
      - regional
      - amplify
  - id: waf-003
    q: Can AWS WAF attach directly to an EC2 instance or Network Load Balancer?
    a: No. Put HTTP request inspection on a supported resource, such as an Application Load Balancer or
      CloudFront distribution.
    trap: true
    facts:
      - unsupported
      - regional
      - global
  - id: waf-004
    q: How does AWS WAF evaluate web ACL rules and choose the final action?
    a: Lowest numeric priority first. Allow and Block terminate; Count continues. CAPTCHA and Challenge
      continue with a valid token and terminate otherwise. If nothing terminates, the default action
      applies.
    facts:
      - priority
      - allow-block
      - count
      - token
      - default
  - id: waf-005
    q: How should a team test a new AWS WAF rule before blocking production requests?
    a: Test and tune in staging, then use Count with production traffic before enforcing. Count allows
      evaluation to continue to later rules.
    facts:
      - testing
      - count
  - id: waf-007
    q: A service needs AWS WAF HTTP filtering in front of an NLB. Can WAF attach directly to the NLB?
    a: No. WAF needs a supported resource, such as an ALB or CloudFront distribution.
    trap: true
    facts:
      - unsupported
      - regional
      - global
  - id: waf-008
    q: A WAF Allow rule runs before a Count rule and both would match the request. Does the Count rule
      record it?
    a: No. Allow terminates evaluation. Put Count first if it must observe requests that the Allow rule
      accepts.
    trap: true
    facts:
      - priority
      - allow-block
      - count
  - id: waf-009
    q: A team needs an AWS WAF web ACL for a CloudFront distribution. Which Region must it use?
    a: us-east-1, also shown as Global (CloudFront). Regional application resources normally need a web
      ACL in their own Region.
    facts:
      - global
      - same-region
  - id: waf-010
    q: Where can a team send AWS WAF web request logs?
    a: CloudWatch Logs, an S3 bucket or a Data Firehose delivery stream.
    facts:
      - log-destinations
  - id: waf-011
    q: A team redacts a request header in AWS WAF logs. Is that header automatically excluded from
      sampled requests?
    a: No. Logging redaction does not affect sampling. Use web ACL data protection to exclude fields
      from sampling.
    trap: true
    facts:
      - log-redaction
  - id: waf-012
    q: A CloudFront distribution sends a secret origin header checked by an ALB WAF rule. What must
      secret rotation update?
    a: Both the CloudFront custom origin header and the ALB WAF rule configuration, so the value
      CloudFront sends is accepted at the origin.
    facts:
      - origin-header
      - origin-rotation
  - id: waf-020
    q: A company must block web requests to its application from specific countries. Which AWS service and rule type fit?
    a: AWS WAF with a geo match rule statement.
    facts: [geo-match]
  - id: waf-021
    q: Which AWS service can block SQL injection attempts in web requests?
    a: AWS WAF, with an SQL injection rule statement.
    facts: [sqli]
---
AWS WAF filters web requests using a web access control list (web ACL), also called a protection pack. A web ACL contains rules associated with a supported application endpoint. It lets you choose which matching requests to allow, block, count or challenge.

### How it works

1. Associate the web ACL with a supported resource. Each resource can have one web ACL; one ACL can protect multiple compatible resources.
2. Match the scope: create CloudFront WAF resources in `us-east-1`, shown as Global (CloudFront). Regional resources need WAF resources in their own Region. Amplify also requires the Global CloudFront Region.
3. WAF evaluates rules in ascending numeric priority. A terminating action ends evaluation immediately.
4. If no rule terminates evaluation, WAF applies the configured default action.
5. Test in staging and use Count with production traffic before enforcement. Enable logs in CloudWatch Logs, S3 or Data Firehose to inspect requests and rule matches.

| Action | Effect on evaluation |
|---|---|
| Allow | Accept and stop |
| Block | Reject and stop before the protected resource receives the request |
| Count | Record the match and continue |
| CAPTCHA or Challenge | Continue with a valid verification token; otherwise stop and ask the client to solve a puzzle or background challenge |

A token records client verification. A Regional ACL can protect an ALB, API Gateway REST API, AppSync GraphQL API, Cognito user pool, App Runner service, Bedrock AgentCore Gateway or Verified Access instance. CloudFront uses a global ACL. NLBs and EC2 instances are not direct WAF attachment targets.

For an ALB origin behind CloudFront, an origin is the backend serving CloudFront's requests. CloudFront can add a secret header that the ALB's WAF rule requires. Rotate the CloudFront header and the ALB rule together so direct requests without the secret remain blocked.

### Exam cues

- If the question says Count metrics miss requests accepted by an earlier Allow rule, think priority order, because Allow ends evaluation before Count can run.
- If the question says protect CloudFront with a Regional ACL, think a global ACL created in `us-east-1`, because a Regional ACL has the wrong scope.
- If the question says audit matching web requests centrally, think WAF logging, because logs can go to CloudWatch Logs, S3 or Firehose.
- If the question says rotate an origin validation secret, think both CloudFront and the ALB WAF rule, because the sent and accepted values must stay aligned.
- If the question says block countries or SQL injection, think AWS WAF, because it has geo match and SQL injection rule statements.

### Remember

- Lowest numeric priority runs first.
- Each resource has at most one web ACL.
- Allow and Block stop evaluation. Count continues.
- CAPTCHA and Challenge depend on token validity.
- Logging redaction does not redact sampled requests. Use web ACL data protection for sampling exclusions.

> **Trap:** Count does not guarantee that a request reaches the application. A later rule or the default action can still block it.
