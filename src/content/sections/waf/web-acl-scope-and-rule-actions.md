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
  - id: origin-header
    text: CloudFront can add a secret origin header that an ALB WAF rule checks to block requests
      bypassing CloudFront.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: origin-rotation
    text: A Secrets Manager rotation workflow can update both the CloudFront custom origin header and
      the ALB WAF rule configuration.
    source: https://aws.amazon.com/blogs/security/how-to-enhance-amazon-cloudfront-origin-security-with-aws-waf-and-aws-secrets-manager/
  - id: ip-set
    text: An IP set match statement checks the request IP against a list of CIDR ranges; an Allow rule on it with a Block default action restricts access to those ranges.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-ipset-match.html
  - id: size-constraint
    text: "An AWS WAF size constraint statement compares the byte size of a request component, such as the query string or body, with a number you set, without inspecting its contents."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-size-constraint-match.html#waf-rule-statement-type-size-constraint-match
  - id: wcu
    text: "A web ACL can use up to 5,000 WAF capacity units (WCUs); its base price includes 1,500 WCUs and higher usage costs extra. A rule group can have at most 5,000 WCUs."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/aws-waf-capacity-units.html
  - id: request-components
    text: "AWS WAF rule statements can inspect request components such as the HTTP method, a single header or all headers, cookies, the URI path, the query string and the body."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-fields-list.html
  - id: logical-statements
    text: "Logical rule statements combine or negate nested statements with AND, OR and NOT."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statements-logical.html
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
    q: How many AWS WAF web ACLs can protect one resource, and can an ACL protect multiple resources?
    a: A resource can have one web ACL. An ACL can protect multiple compatible resources.
    facts: [association]
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
  - id: waf-012
    q: A CloudFront distribution sends a secret origin header checked by an ALB WAF rule. What must
      secret rotation update?
    a: Both the CloudFront custom origin header and the ALB WAF rule configuration, so the value
      CloudFront sends is accepted at the origin.
    facts:
      - origin-header
      - origin-rotation
  - id: waf-023
    q: A CloudFront distribution must accept requests only from the company's office IP ranges. How with AWS WAF?
    a: An IP set of the CIDR ranges, an Allow rule on that IP set, and Block as the web ACL default action.
    facts: [ip-set]
  - id: waf-024
    q: "A web app must reject requests whose query string is longer than 100 bytes. Which AWS WAF rule statement fits?"
    a: "A size constraint statement on the query string with a greater-than comparison."
    facts: [size-constraint]
  - id: waf-027
    q: "An AWS WAF rule must block requests that have a particular header value AND come from outside one country. How is that built?"
    a: "Nest a header match statement and a negated geo match statement under a logical AND statement."
    facts: [request-components, logical-statements]
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
revised:
  - date: 2026-11-23
    note: The web ACL card now covers resource association limits.
    cards: [waf-007]
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
- WAF logs can go to CloudWatch Logs, S3 or Data Firehose.
- Inspectable parts: method, headers, cookies, URI path, query string, body. AND, OR and NOT combine statements.

> **Trap:** Count does not guarantee that a request reaches the application. A later rule or the default action can still block it.
