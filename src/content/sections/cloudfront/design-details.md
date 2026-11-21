---
title: Distribution design choices
level: associate
order: 100
facts:
  - id: cache-geo
    text: CloudFront geographic restrictions use a country allowlist or denylist for the entire distribution.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html#georestrictions-cloudfront
  - id: cache-geo-waf
    text: CloudFront geographic restrictions do not forward blocked requests to AWS WAF; use WAF geo match to
      combine geography with other conditions.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html#cloudfront-distributions-geo-restriction
  - id: all-methods
    text: "When a distribution allows all HTTP methods, CloudFront forwards PUT, POST, PATCH and DELETE requests to the origin, so uploads also travel over the AWS edge network; it caches only GET, HEAD and optionally OPTIONS responses."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/RequestAndResponseBehaviorCustomOrigin.html#RequestCustomHTTPMethods
  - id: edge-connection-events
    text: Connection Functions are a type of CloudFront Functions for custom client certificate checks during the
      TLS handshake.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/function-code-choose-purpose.html#function-code-connection-request
  - id: edge-connection-decision
    text: A CloudFront Connection Function allows or denies a TLS connection.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/function-code-choose-purpose.html#function-code-connection-request
  - id: edge-connection-http
    text: CloudFront Connection Functions cannot modify HTTP requests or responses.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/function-code-choose-purpose.html#function-code-connection-request
  - id: vpc-origins
    text: "CloudFront VPC origins deliver content from Application Load Balancers, Network Load Balancers and EC2 instances in private subnets, so CloudFront becomes the single entry point and the origin needs no public access."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-vpc-origins.html#private-content-vpc-origins
  - id: origin-transfer-free
    text: "Data transfer from AWS origins, such as S3 or an ALB, to CloudFront is not charged."
    source: https://aws.amazon.com/cloudfront/pricing/
cards:
  - id: cloudfront-027
    q: When should a CloudFront distribution use geographic restrictions rather than AWS WAF geo match?
    a: Use CloudFront geographic restrictions for a distribution-wide country allowlist or denylist. Use WAF geo
      match when geography must be combined with other conditions. CloudFront geo-blocked requests never reach
      WAF.
    facts:
      - cache-geo
      - cache-geo-waf
  - id: cloudfront-053
    q: "Can CloudFront speed up uploads to an S3 bucket, or only downloads?"
    a: "Both. With all HTTP methods allowed, CloudFront forwards PUT and POST requests to the origin over the edge network. Only GET, HEAD and optionally OPTIONS responses are cached."
    facts: [all-methods]
  - id: cloudfront-050
    q: A CloudFront distribution uses mutual TLS and needs custom checks on client certificate properties during
      connection establishment. Which edge function type should it use?
    a: A CloudFront Connection Function. It evaluates certificate and connection information during the TLS
      handshake and allows or denies the connection; it cannot modify HTTP requests or responses.
    facts:
      - edge-connection-events
      - edge-connection-decision
      - edge-connection-http
  - id: cloudfront-054
    q: "An internal ALB in private subnets must serve users through CloudFront without any public endpoint of its own. What does CloudFront offer?"
    a: "A VPC origin. CloudFront reaches ALBs, NLBs and EC2 instances in private subnets over a private connection and becomes the only way in."
    facts: [vpc-origins]
  - id: cloudfront-057
    q: "Serving S3 content through CloudFront instead of straight from S3: is the S3 to CloudFront transfer billed?"
    a: "No. Transfer from AWS origins to CloudFront is free; you pay CloudFront delivery to viewers."
    facts: [origin-transfer-free]
---
CloudFront offers distribution settings for access, origin connectivity and request handling. These choices help control who can connect, where requests go and which responses can be cached.

### How it works

1. Use a country allowlist or denylist to restrict an entire distribution. For geography combined with other conditions, use AWS WAF geo match.
2. For custom client certificate checks during the TLS handshake, use a CloudFront Connection Function. It allows or denies the connection and cannot modify HTTP requests or responses.
3. For an origin in a private subnet, use a VPC origin. It supports Application Load Balancers, Network Load Balancers and EC2 instances, with CloudFront as the single entry point and no public access needed at the origin.
4. When all HTTP methods are allowed, CloudFront forwards uploads and other requests using `PUT`, `POST`, `PATCH` and `DELETE` to the origin over the edge network. It caches only `GET`, `HEAD` and optionally `OPTIONS` responses. See HTTP methods.

### Exam cues

- If the question says restrict a whole distribution by country, think CloudFront geographic restrictions, because they use a distribution-wide allowlist or denylist.
- If the question says combine geography with other conditions, think AWS WAF geo match, because CloudFront geo-blocked requests do not reach WAF.
- If the question says check client certificates during connection establishment, think Connection Function, because it can allow or deny the TLS connection.
- If the question says serve an internal load balancer without a public origin, think VPC origin, because CloudFront can reach it in a private subnet.
- If the question says upload through CloudFront, think allow all HTTP methods, because `PUT` and `POST` are forwarded to the origin.

### Remember

- CloudFront caches `GET` and `HEAD` responses and can cache `OPTIONS` responses, but does not cache responses to the other methods.
- Data transfer from AWS origins to CloudFront, such as from S3 or an Application Load Balancer, is not charged.

> **Trap:** A CloudFront geographic restriction blocks requests before AWS WAF receives them. Use WAF geo match when geography must be combined with other conditions.
