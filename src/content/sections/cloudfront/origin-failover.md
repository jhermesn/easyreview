---
title: Origin failover
level: professional
order: 40
facts:
  - id: failover-group
    text: An origin group contains a primary and a secondary origin and must be selected by a cache behavior.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.creating
  - id: failover-hit
    text: CloudFront serves a cache hit without contacting the origin group.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: failover-primary
    text: With default origin selection, each cache miss goes to the primary before failover, even if an earlier
      request used the secondary.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: failover-codes
    text: Selectable failover status codes are 400, 403, 404, 416, 429, 500, 502, 503 and 504.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.creating
  - id: failover-connect
    text: Failure to connect to the primary triggers failover when 503 is selected.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: failover-response
    text: A primary response timeout triggers failover when 504 is selected.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: failover-methods
    text: Origin failover supports only GET, HEAD and OPTIONS, not POST or PUT.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: failover-options
    text: OPTIONS requests fail over only when OPTIONS is included in cached HTTP methods.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: failover-timeout
    text: Origin connection timeout is 1 to 10 seconds, with a default of 10 seconds.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#controlling-attempts-and-timeouts
  - id: failover-attempts
    text: Origin connection attempts are 1 to 3, with a default of 3.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#controlling-attempts-and-timeouts
  - id: failover-default-wait
    text: Default connection attempts can take as long as 30 seconds before failover to the secondary.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#controlling-attempts-and-timeouts
  - id: failover-read-timeout
    text: The origin response timeout defaults to 30 seconds and can be set from 1 to 120 seconds; it can also be
      adjusted for faster failover with custom origins.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#controlling-attempts-and-timeouts
  - id: failover-replication
    text: S3 Cross-Region Replication asynchronously copies new and updated objects to a bucket in another Region.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: failover-existing
    text: S3 live replication does not copy objects that predate its configuration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: failover-batch
    text: S3 Batch Replication can copy existing objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: failover-edge-twice
    text: An origin-request Lambda@Edge function can run for both the primary and secondary during one viewer
      request.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.lambda
  - id: route53-alias
    text: "Route 53 points a domain at a CloudFront distribution with an alias record, an A record plus an AAAA record when IPv6 is enabled."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html#routing-to-cloudfront-distribution-config
diagrams:
  - id: cloudfront-origin-failover
    title: Cache miss and origin failover
    width: 1120
    height: 434
    nodes:
      - id: viewer
        label: Viewer
        icon: res-client
        x: 28
        y: 171
        w: 130
        h: 72
        tone: user
        info: Requests an object from CloudFront.
      - id: edge
        label: CloudFront
        icon: cloudfront
        x: 343
        y: 164
        w: 160
        h: 86
        tone: network
        sub: cache behavior
        info: A hit returns cached content. A miss uses the origin group.
      - id: primary
        label: Primary origin
        icon: res-server
        x: 826
        y: 45
        w: 160
        h: 72
        tone: user
        info: With default origin selection, each cache miss tries the primary before failover.
      - id: secondary
        label: Secondary origin
        icon: res-server
        x: 826
        y: 311
        w: 160
        h: 72
        tone: user
        info: Prepare the content here too, such as with S3 Cross-Region Replication.
    edges:
      - from: viewer
        to: edge
        step: 1
        label: request
      - from: edge
        to: primary
        step: 2
        label: cache miss
      - from: edge
        to: secondary
        step: 3
        label: eligible failover
        dashed: true
    steps:
      - CloudFront finds the matching cache behavior and checks for cached content.
      - With default origin selection, a cache miss goes to the primary origin.
      - A configured failure sends GET, HEAD or cached OPTIONS to the secondary origin.
cards:
  - id: cloudfront-012
    q: Which CloudFront origin group failures can send a request to its secondary origin?
    a: Configured status codes from 400, 403, 404, 416, 429, 500, 502, 503 and 504. Connection failures require
      503 selected; response timeouts require 504. Only GET, HEAD and cached OPTIONS can fail over.
    facts:
      - failover-codes
      - failover-connect
      - failover-response
      - failover-methods
      - failover-options
  - id: cloudfront-013
    q: Does CloudFront origin failover retry POST or PUT requests on the secondary origin?
    a: No. Only GET, HEAD and OPTIONS are eligible, and OPTIONS must be a cached method.
    trap: true
    facts:
      - failover-methods
      - failover-options
  - id: cloudfront-014
    q: With default CloudFront origin selection, do later cache misses keep using the secondary after a request
      fails over?
    a: No. Each cache miss tries the primary before failover. A cache hit is served without contacting the origin
      group.
    trap: true
    facts:
      - failover-primary
      - failover-hit
  - id: cloudfront-015
    q: Which CloudFront origin settings can reduce the delay before origin failover?
    a: Reduce connection timeout or connection attempts. Timeout is 1 to 10 seconds, default 10; attempts are 1 to
      3, default 3. For custom origins, also adjust response timeout, 1 to 120 seconds, default 30. Default
      connection attempts can take up to 30 seconds.
    facts:
      - failover-timeout
      - failover-attempts
      - failover-read-timeout
      - failover-default-wait
  - id: cloudfront-016
    q: An S3 static site behind CloudFront needs a second Region for read availability. How should the team
      prepare its origins?
    a: Use S3 Cross-Region Replication for new and updated objects, and Batch Replication for existing objects
      when needed. Configure the two buckets as primary and secondary in an origin group and select it in the
      cache behavior.
    facts:
      - failover-replication
      - failover-existing
      - failover-batch
      - failover-group
  - id: cloudfront-029
    q: A replicated S3 site uses a CloudFront origin group. During an outage, can the group retry uploads on the
      secondary?
    a: No. The origin group fails over GET, HEAD and cached OPTIONS only. PUT and POST are not retried on the
      secondary.
    trap: true
    facts:
      - failover-methods
      - failover-options
  - id: cloudfront-038
    q: A CloudFront origin group fails over GET requests but not OPTIONS requests, even though OPTIONS is allowed.
      Which behavior setting should the team inspect?
    a: Cached HTTP methods. OPTIONS must be cached to qualify for origin failover; merely allowing it is
      insufficient.
    trap: true
    facts:
      - failover-options
  - id: cloudfront-051
    q: "A CloudFront distribution uses an origin group to fail over between S3 buckets in two Regions. What Route 53 record should send the site domain to it?"
    a: "A simple alias record to the distribution. Failover between the buckets happens inside CloudFront through the origin group, so DNS failover routing has nothing to switch."
    facts:
      - route53-alias
      - failover-group
---
CloudFront origin failover retries eligible requests on a secondary origin when the primary fails. An origin group is the pair of origins attached to a cache behavior. This gives cached content a second place to be retrieved from during an origin outage.

### How it works

1. Add the primary and secondary origins, create an origin group, and select that group in the cache behavior. For an S3 site spanning Regions, use Cross-Region Replication to copy new and updated objects asynchronously, meaning the copy happens after the source write. Use S3 Batch Replication for objects that existed before live replication was configured.
2. A cache hit returns stored content. With default origin selection, a cache miss first contacts the primary, even when an earlier request failed over.
3. CloudFront evaluates the configured failure status codes. A connection failure qualifies when `503` is selected; a response timeout qualifies when `504` is selected.
4. For `GET`, `HEAD` or eligible `OPTIONS`, CloudFront sends the request to the secondary. `OPTIONS` must be included in cached HTTP methods. Other methods do not fail over.
5. Tune connection attempts and timeouts if connection failures must move to the secondary faster. For custom origins, the origin response timeout, the wait for the origin's response, can also be adjusted.

| Setting | Range | Default |
|---|---|---|
| Connection timeout | 1 to 10 seconds | 10 seconds |
| Connection attempts | 1 to 3 | 3 |
| Response timeout | 1 to 120 seconds | 30 seconds |

### Exam cues

- If the question says an S3 site needs read availability across Regions, think replicated buckets plus an origin group, because the secondary must have the objects that CloudFront requests.
- If the question says failover works for GET but not allowed OPTIONS, think cached HTTP methods, because OPTIONS must also be cached.
- If the question says shorten connection failure recovery, think fewer attempts or a shorter connection timeout, because default connection attempts can take up to 30 seconds.
- If the question says CloudFront origin failover already covers two Regions, think a plain Route 53 alias to the distribution, because the origin group handles failover.

### Remember

- Failover codes: `400`, `403`, `404`, `416`, `429`, `500`, `502`, `503`, `504`.
- With default origin selection, each cache miss tries the primary before failover.
- An origin-request Lambda@Edge function can run twice during failover, once for each origin.

> **Trap:** An origin group does not retry `POST` or `PUT` on the secondary. Replicating S3 objects does not change the eligible request methods.

> **Trap:** The default 30 seconds describes connection attempts. It is not a fixed recovery time for every failure; response timeout settings also affect the wait.
