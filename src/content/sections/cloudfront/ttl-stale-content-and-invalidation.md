---
title: TTL, stale content, and invalidation
level: associate
order: 20
facts:
  - id: ttl-validity
    text: TTL settings and origin Cache-Control or Expires headers determine how long cached objects remain valid.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html#cache-key-understand-cache-policy-ttl
  - id: ttl-default
    text: Default TTL applies when the origin provides no Cache-Control or Expires header.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html#cache-key-understand-cache-policy-ttl
  - id: ttl-legacy-default
    text: If no cache policy is used, the initial default TTL is 24 hours and can be changed.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#Expiration
  - id: ttl-bounds
    text: CloudFront bounds max-age or s-maxage freshness by the configured minimum and maximum TTLs.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#ExpirationDownloadDist
  - id: ttl-shared
    text: When both max-age and s-maxage are present, CloudFront uses s-maxage while browsers use max-age.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#ExpirationDownloadDist
  - id: ttl-expires
    text: Cache-Control max-age takes precedence over Expires when both are supplied.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#expiration-individual-objects
  - id: ttl-private-positive
    text: A minimum TTL greater than 0 makes CloudFront cache content for that minimum even with private, no-cache
      or no-store origin directives.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html#cache-key-understand-cache-policy-ttl
  - id: ttl-private-zero
    text: With a minimum TTL of 0, CloudFront respects origin private, no-cache and no-store directives.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#ExpirationDownloadDist
  - id: ttl-disabled
    text: Setting minimum, default and maximum TTLs all to 0 disables CloudFront caching.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html#cache-key-understand-cache-policy-ttl
  - id: ttl-expiry-check
    text: After a cached file expires, CloudFront can check the origin; an unchanged file returns 304 Not Modified
      and a changed file returns 200 OK with the new content.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#Expiration
  - id: ttl-eviction
    text: CloudFront can evict infrequently requested files before their expiration to make room for other files.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#Expiration
  - id: ttl-swr
    text: stale-while-revalidate permits serving expired content while CloudFront fetches a fresh version in the
      background.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#stale-while-revalidate
  - id: ttl-sie
    text: stale-if-error permits serving expired content when the origin is unreachable or returns an error
      between 500 and 600.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#stale-if-error-only
  - id: ttl-stale-bound
    text: The stale directive duration and CloudFront maximum TTL limit stale serving; the object is unavailable
      after maximum TTL.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#stale-if-error-only
  - id: ttl-swr-bound
    text: stale-while-revalidate serving is limited by its directive duration and CloudFront maximum TTL.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#stale-while-revalidate
  - id: ttl-invalidate
    text: Invalidation removes a file from CloudFront edge caches before expiry; the next request fetches the
      latest origin version.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html#Invalidation
  - id: ttl-versioned
    text: AWS recommends versioned file names for frequent updates because they avoid invalidation charges and
      select a new file despite older copies in browser or proxy caches.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html#Invalidation_Expiration
  - id: ttl-browser
    text: CloudFront invalidation does not clear browser or corporate proxy caches.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html#Invalidation_Expiration
  - id: ttl-viewer-header
    text: Cache-Control or Pragma headers in a viewer GET request do not force CloudFront to retrieve the object
      from the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#expiration-individual-objects
  - id: ttl-wildcard
    text: Invalidation paths support the * wildcard.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation_Requests.html#invalidating-objects-console
cards:
  - id: cloudfront-004
    q: How long does CloudFront cache an object with neither Cache-Control nor Expires in the origin response?
    a: For the configured default TTL. If no cache policy is used, the initial default is 24 hours, but it can be
      changed.
    facts:
      - ttl-default
      - ttl-legacy-default
  - id: cloudfront-005
    q: "A CloudFront origin sends Cache-Control: private, but the response is cached. Which cache setting should
      the team inspect?"
    a: Minimum TTL. A value above 0 makes CloudFront cache for at least that minimum even with private, no-cache
      or no-store. With a minimum of 0, it respects those directives.
    trap: true
    facts:
      - ttl-private-positive
      - ttl-private-zero
  - id: cloudfront-006
    q: Which CloudFront origin response directives allow serving stale content during background refresh or origin
      errors?
    a: Use stale-while-revalidate for background refresh and stale-if-error for an unreachable origin or errors
      between 500 and 600. Stale serving is bounded by the directive duration and maximum TTL.
    facts:
      - ttl-swr
      - ttl-sie
      - ttl-stale-bound
      - ttl-swr-bound
  - id: cloudfront-007
    q: How can a team replace a CloudFront file before its TTL expires?
    a: Invalidate the path, which can include a * wildcard, or publish a new versioned file name. AWS recommends
      versioned names for frequent updates to avoid invalidation charges and old browser or proxy copies.
    facts:
      - ttl-invalidate
      - ttl-wildcard
      - ttl-versioned
  - id: cloudfront-008
    q: Users still receive an old CloudFront asset after its invalidation has completed. Could their browser or
      corporate proxy be responsible?
    a: Yes. Invalidation clears CloudFront edge copies, not browser or proxy copies. Publish a new versioned file
      name to select the new asset through those caches.
    trap: true
    facts:
      - ttl-browser
      - ttl-versioned
  - id: cloudfront-032
    q: A site needs short browser caching but longer CloudFront caching for the same object. Which origin response
      directives should it use?
    a: Use max-age for browsers and s-maxage for CloudFront. CloudFront still applies its minimum and maximum TTL
      bounds.
    facts:
      - ttl-shared
      - ttl-bounds
  - id: cloudfront-033
    q: "A client sends Cache-Control: no-cache on a GET to CloudFront. Must CloudFront fetch a fresh origin copy?"
    a: No. Viewer GET Cache-Control and Pragma headers do not force CloudFront to contact the origin.
    trap: true
    facts:
      - ttl-viewer-header
  - id: cloudfront-034
    q: How does a CloudFront cache policy disable caching completely?
    a: Set minimum, default and maximum TTLs all to 0.
    facts:
      - ttl-disabled
---
CloudFront expiration settings control when a stored response needs another origin check. Time to live (TTL) is its freshness duration. A stale object has passed that duration but may still be usable during a refresh or an origin failure.

### How it works

1. CloudFront combines the cache policy's minimum, default and maximum TTLs with the origin's caching headers. It uses default TTL when both `Cache-Control` and `Expires` are absent.
2. An origin `Cache-Control` directive is an instruction about caching. `max-age` sets freshness in seconds; `s-maxage` sets CloudFront freshness separately from the browser. When both appear, CloudFront uses `s-maxage` and the browser uses `max-age`. CloudFront applies its minimum and maximum TTL bounds. `max-age` takes precedence over `Expires`, an expiration timestamp.
3. After expiry, CloudFront can check with the origin. `304 Not Modified` means the cached version is still current; `200 OK` supplies a new version. CloudFront can also evict, or remove, an infrequently used object before expiry to free space.
4. Origin stale directives allow continued delivery from an expired copy. Background refresh uses `stale-while-revalidate`; origin failure uses `stale-if-error`. Each has a duration limit and remains bounded by maximum TTL.
5. To replace a file before expiry, invalidate its CloudFront path or publish a versioned file name, a new name for a new revision. Invalidation removes edge copies; versioned names also avoid selecting old browser or proxy copies.

| Origin instruction | CloudFront effect |
|---|---|
| `max-age` | Freshness duration within TTL bounds |
| `s-maxage` | CloudFront freshness when browser freshness differs |
| `stale-while-revalidate` | Serve expired content while fetching a fresh copy |
| `stale-if-error` | Serve expired content when the origin is unreachable or returns an error between 500 and 600 |

### Exam cues

- If the question says users see old assets after an invalidation, think versioned file names, because browser and proxy caches are outside that invalidation.
- If the question says serve content during origin failure, think `stale-if-error`, because an expired cached copy can satisfy the request within its limits.
- If the question says different browser and CloudFront freshness durations, think `max-age` plus `s-maxage`, because the origin can set them separately.

### Remember

- Without a cache policy, the initial default TTL is 24 hours; it is configurable.
- Minimum, default and maximum TTLs all set to 0 disable caching.
- Invalidation paths support `*`. Versioned names avoid invalidation charges.

> **Trap:** A minimum TTL above 0 overrides origin `private`, `no-cache` and `no-store` for that minimum. Set minimum TTL to 0 to respect those directives.

> **Trap:** A viewer's GET `Cache-Control: no-cache` or `Pragma` header does not force an origin fetch.
