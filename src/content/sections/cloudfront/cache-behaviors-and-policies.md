---
title: Cache behaviors and policies
level: associate
order: 10
facts:
  - id: cache-delivery
    text: CloudFront serves content through edge locations and retrieves missing content from a configured origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction
  - id: cache-distribution
    text: A distribution specifies the origins and settings CloudFront uses to deliver content.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#HowCloudFrontWorksOverview
  - id: cache-behavior
    text: A cache behavior applies origin selection and delivery settings to a URL path pattern.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html#DownloadDistValuesCacheBehavior
  - id: cache-order
    text: CloudFront uses the first matching cache behavior in configured order.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html#DownloadDistValuesPathPattern
  - id: cache-default
    text: The default cache behavior uses the unchangeable path pattern * and is evaluated last.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html#DownloadDistValuesPathPattern
  - id: cache-path-only
    text: CloudFront does not consider cookies or query strings when matching a behavior path pattern.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html#DownloadDistValuesPathPattern
  - id: cache-access-order
    text: An earlier matching behavior without signed access allows access even if a later matching behavior
      requires signatures.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html#DownloadDistValuesPathPattern
  - id: cache-target
    text: Each cache behavior selects an origin or origin group.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html#DownloadDistValuesTargetOriginId
  - id: cache-key
    text: A cache key identifies a cached object; the default key includes the distribution domain name and URL
      path.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-the-cache-key.html#cache-key-default
  - id: cache-vary
    text: Include request values that change the origin response in the cache key; irrelevant values can create
      duplicate cached objects.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-the-cache-key.html#cache-key-custom
  - id: cache-policy
    text: A cache policy selects headers, cookies and query strings for the cache key.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#controlling-the-cache-key
  - id: cache-policy-ttl
    text: A cache policy sets the minimum, default and maximum TTLs for cached content.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#controlling-the-cache-key
  - id: cache-hit
    text: A valid cached object with the same cache key can satisfy a request without contacting the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#controlling-the-cache-key
  - id: cache-origin-policy
    text: An origin request policy forwards additional request values without adding them to the cache key.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#controlling-origin-requests
  - id: cache-key-forwarded
    text: Values included in the cache key by a cache policy are automatically included in origin requests.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#controlling-origin-requests
  - id: cache-response-ttl
    text: Cache-Control added by a response headers policy affects viewer caching, not CloudFront object caching.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html#modifying-response-headers
  - id: cache-geo
    text: CloudFront geographic restrictions use a country allowlist or denylist for the entire distribution.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html#georestrictions-cloudfront
  - id: cache-geo-unknown
    text: CloudFront serves the requested content if it cannot determine the viewer country.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html#georestrictions-cloudfront
  - id: cache-geo-custom
    text: For location rules finer than country or applying to selected files, an application can use a
      geolocation service and issue signed URLs to eligible viewers.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html#georestrictions-geolocation-service
  - id: cache-geo-oac
    text: AWS recommends an S3 origin with OAC to prevent direct origin access when using custom geolocation
      authorization.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html#georestrictions-geolocation-service
  - id: cache-origin-group
    text: An origin group pairs a primary and a secondary origin for failover.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: cache-cookie-definition
    text: A client stores cookie values and returns them with later requests.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html#private-content-how-signed-cookies-work
  - id: cache-query-definition
    text: A URL query string carries named request values that a cache policy can include in the cache key.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html#cache-key-understand-cache-policy-settings
  - id: custom-origin-anywhere
    text: "A CloudFront custom origin is any HTTP or HTTPS server with a publicly resolvable DNS name, hosted on AWS or elsewhere, such as an on-premises web server."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html#concept_CustomOrigin
  - id: flat-rate-plans
    text: "CloudFront flat-rate pricing plans (Free, Pro, Business and Premium) bundle the CDN with AWS WAF, DDoS protection, a TLS certificate and S3 storage credits for one monthly price per distribution, with usage allowances and no overage charges."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html#flat-rate-pricing-plan
  - id: default-root-object
    text: "A default root object is the object CloudFront returns when a viewer requests the root URL of the distribution, which avoids exposing a listing of its contents."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html
  - id: custom-error-pages
    text: "CloudFront can return a custom error page for chosen HTTP status codes; you pay standard charges for the error page instead of the requested object."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GeneratingCustomErrorResponses.html
  - id: price-class
    text: "A price class other than PriceClass_All limits which edge locations serve a distribution to lower cost; viewers in excluded regions may see slower performance."
    source: https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_DistributionConfig.html
cards:
  - id: cloudfront-001
    q: What decides which CloudFront origin and settings handle a request?
    a: The first matching cache behavior in list order. The default * behavior is last. An earlier public match
      can bypass a later matching behavior that requires signed access.
    trap: true
    facts:
      - cache-order
      - cache-default
      - cache-access-order
  - id: cloudfront-002
    q: What is a CloudFront cache key, and how does a cache policy control it?
    a: The identifier for a cached object. The default includes the distribution domain and URL path. A cache
      policy selects additional headers, cookies and query strings, and sets TTLs.
    facts:
      - cache-key
      - cache-policy
      - cache-policy-ttl
  - id: cloudfront-003
    q: A CloudFront origin needs a tracing header that does not change its response. How can the team forward it
      without splitting the cache?
    a: Use an origin request policy. It forwards additional values without changing the cache key; values already
      in the key are forwarded automatically.
    facts:
      - cache-origin-policy
      - cache-key-forwarded
  - id: cloudfront-028
    q: A CloudFront origin returns different pages by language and records a tracing header. How should the team
      choose cache and origin request policy inputs?
    a: Include the response-changing language value in the cache policy. Forward the tracing header with an origin
      request policy so it does not create duplicate cached objects.
    facts:
      - cache-vary
      - cache-origin-policy
  - id: cloudfront-031
    q: A CloudFront application licenses only selected files to users in approved cities. How should it authorize
      downloads?
    a: Have the application evaluate a geolocation service result and issue a signed URL to eligible users. For an
      S3 origin, use OAC to prevent direct bucket access. Built-in geographic restrictions apply to whole
      distributions at country level.
    facts:
      - cache-geo
      - cache-geo-custom
      - cache-geo-oac
  - id: cloudfront-052
    q: "A dynamic site must stay in an on-premises data center in the US but load faster for new users in Asia within days. What fits?"
    a: "A CloudFront distribution with a custom origin that points to the on-premises web servers. A custom origin can be any publicly resolvable HTTP server."
    facts: [custom-origin-anywhere]
  - id: cloudfront-055
    q: A website needs to serve cached content from locations close to viewers. Which AWS service
      fits?
    a: Amazon CloudFront delivers content through edge locations and retrieves missing content from
      the configured origin.
    facts: [cache-delivery]
  - id: cloudfront-059
    q: "A company serves viewers mostly in North America and Europe and wants to lower CloudFront delivery costs, accepting slower access elsewhere. Which setting fits?"
    a: "A cheaper **price class** (such as Price Class 100). It limits the edge locations used; viewers in excluded regions may see more latency."
    facts: [price-class]
  - id: cloudfront-060
    q: A CloudFront origin returns different content for different query values. How should the team
      prevent those responses from sharing the same cache key?
    a: Use a cache policy to include the relevant query strings in the cache key.
    facts: [cache-policy, cache-vary]
---
CloudFront delivers web content through edge locations, which are servers that keep copies near viewers, the clients requesting content. An origin holds the original content. A distribution is the configuration that connects those origins to viewers; its cache behaviors are ordered rules for different URL paths.

A cookie is a value stored by the client and sent with later requests. A query string carries named request values in the URL.

### How it works

1. CloudFront compares the requested URL path with behavior patterns in order. The first match selects the settings and origin or origin group, a primary and secondary pair used for failover. The default `*` behavior is last; cookies and query strings do not select a behavior.
2. The cache policy builds the cache key, the identifier used to find a stored response. Its default parts are the distribution domain and URL path. Add values that change the response, such as its language. The policy also sets time to live (TTL), how long cached content remains valid.
3. A cache hit means a valid stored response matches the key. CloudFront serves it without contacting the origin. On a miss, CloudFront forwards the key values and any extra values selected by the origin request policy.
4. A response headers policy changes HTTP headers, the name-value metadata sent with a response, before delivery. It applies to hits and origin responses. It can add security headers without code.

| Policy | Controls | Typical use |
|---|---|---|
| Cache policy | Cache key and TTLs | Keep separate language variants |
| Origin request policy | Extra values sent to the origin | Forward tracing information |
| Response headers policy | Headers sent to viewers | Add standard security headers |

For selected files or city-level rules, an application can check a geolocation service and issue a signed URL, a link carrying proof of permission. Use origin access control (OAC) with an S3 origin to prevent direct access around that check. Built-in geographic restrictions apply to the entire distribution at country level.

### Exam cues

- If the question says a tracing header must reach the origin without creating extra cached copies, think origin request policy, because forwarding and cache identity are separate.
- If the question says authorize selected downloads by city, think application geolocation plus signed URLs and an S3 origin protected by OAC, because built-in geographic restrictions cover a whole distribution at country level.

### Remember

- The first matching behavior wins; the default `*` rule is last.
- Cache key values are forwarded automatically.

> **Trap:** Adding `Cache-Control` with a response headers policy changes viewer caching. It does not set CloudFront's object TTL.
