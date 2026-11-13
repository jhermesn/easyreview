---
title: Origin Shield
level: associate
order: 50
facts:
  - id: shield-cache
    text: Origin Shield adds a CloudFront caching layer between regional edge caches and the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#os-use-cases-global-viewers
  - id: shield-regional
    text: Regional edge caches are an intermediate cache layer that serves edge misses and consolidates requests
      from nearby geographic areas.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#os-use-cases-global-viewers
  - id: shield-collapse
    text: Origin Shield consolidates simultaneous misses for the same object, potentially reducing them to one
      origin request.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#origin-shield
  - id: shield-region
    text: Choose the Origin Shield Region with the lowest latency to the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#choose-origin-shield-region
  - id: shield-origin-setting
    text: Origin Shield is configured separately for each origin in a distribution.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#enable-origin-shield
  - id: shield-external
    text: Origin Shield supports origins inside and outside AWS.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#choose-origin-shield-region-outside-aws
  - id: shield-multi-cdn
    text: Using a CloudFront distribution with Origin Shield as the origin for other CDNs can reduce duplicate
      requests to the content origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#os-use-cases-multi-cdn
  - id: shield-use-case
    text: Origin Shield can benefit globally distributed viewers and origins that perform image processing or live
      video packaging.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#origin-shield-use-cases
  - id: shield-poor-fit
    text: Content with low cacheability, infrequent requests or dynamic requests proxied to the origin may be a
      poor fit for Origin Shield.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#origin-shield-use-cases
  - id: shield-charges
    text: Origin Shield adds charges.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#origin-shield
  - id: shield-grpc
    text: gRPC requests bypass Origin Shield even when it is enabled on the distribution.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#origin-shield
  - id: shield-failover
    text: When enabled for both origins in an origin group, requests use the primary origin's Origin Shield and
      then the secondary origin's Origin Shield if failover occurs.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#origin-shield-and-origin-group
  - id: shield-lambda
    text: Origin-facing Lambda@Edge triggers run in the Region where Origin Shield is enabled; viewer-facing
      triggers are unaffected.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#origin-shield-and-lambda-at-edge
  - id: shield-grpc-definition
    text: gRPC is a framework for remote procedure calls, which invoke application functions on a remote system.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-using-grpc.html#distribution-using-grpc
diagrams:
  - id: cloudfront-origin-shield-flow
    title: Regional cache misses converge on Origin Shield
    width: 1040
    height: 350
    nodes:
      - id: regional-a
        label: Regional cache A
        icon: cloudfront
        x: 30
        y: 35
        w: 170
        h: 72
        tone: network
        info: An intermediate CloudFront cache serving edge misses.
      - id: regional-b
        label: Regional cache B
        icon: cloudfront
        x: 30
        y: 245
        w: 170
        h: 72
        tone: network
        info: Another geographic area can request the same object.
      - id: shield
        label: Origin Shield
        icon: cloudfront
        x: 435
        y: 140
        w: 170
        h: 72
        tone: network
        info: A hit avoids the origin. Simultaneous misses for the same object can be consolidated.
      - id: origin
        label: Origin
        icon: res-server
        x: 835
        y: 140
        w: 170
        h: 72
        tone: user
        info: Receives fewer duplicate requests for cacheable content.
    edges:
      - from: regional-a
        to: shield
        step: 1
        label: cache miss
      - from: regional-b
        to: shield
        step: 2
        label: same object
      - from: shield
        to: origin
        step: 3
        label: Shield miss
    steps:
      - A regional edge cache misses and requests the object through Origin Shield.
      - Requests from other regional edge caches can use the same Origin Shield cache.
      - On a Shield miss, simultaneous requests for the same object can be consolidated into one origin
        request.
cards:
  - id: cloudfront-017
    q: What does CloudFront Origin Shield add between regional edge caches and the origin?
    a: Another caching layer that can serve hits and consolidate simultaneous misses for the same object into as
      few as one origin request. It adds charges.
    facts:
      - shield-cache
      - shield-collapse
      - shield-charges
  - id: cloudfront-039
    q: A CloudFront origin is outside AWS, and most viewers are far away. How should the team choose the Origin
      Shield Region?
    a: Choose the Region with the lowest latency to the origin. Origin Shield supports origins outside AWS and is
      configured per origin.
    facts:
      - shield-region
      - shield-external
      - shield-origin-setting
  - id: cloudfront-040
    q: Several CDNs repeatedly request the same video objects from a capacity-limited origin. How can CloudFront
      Origin Shield reduce duplicate origin work?
    a: Use the CloudFront distribution with Origin Shield as the origin for the other CDNs. Its shared cache and
      request consolidation reduce repeated fetches from the content origin.
    facts:
      - shield-multi-cdn
      - shield-collapse
  - id: cloudfront-041
    q: Does enabling CloudFront Origin Shield guarantee better results for content that is rarely cacheable or
      requested?
    a: No. Dynamic, poorly cacheable or infrequently requested content may be a poor fit, and Origin Shield adds
      charges.
    trap: true
    facts:
      - shield-poor-fit
      - shield-charges
---
Origin Shield is an extra CloudFront cache between regional edge caches and an origin. Regional edge caches are intermediate stores that serve misses from nearby edge locations. Origin Shield lets requests from different regions share another cached copy and reduces duplicate work at the origin.

### How it works

1. Enable Origin Shield for each origin that needs it. Choose the AWS Region with the lowest latency, the shortest network delay, to that origin. The origin can be inside or outside AWS.
2. Requests that miss regional edge caches can converge on Origin Shield. A Shield cache hit avoids another origin request.
3. If the object is missing, Origin Shield can consolidate simultaneous requests for the same object into as few as one origin fetch. This helps with costly work such as image processing or packaging live video.
4. In a multi-CDN design, where several content delivery networks serve viewers, use the CloudFront distribution as the origin for the other CDNs so they can share this cache.

Origin Shield is also compatible with origin groups. When enabled on both origins, requests use the primary origin's Shield; after failover, they use the secondary's Shield. Origin-facing Lambda@Edge triggers run in the Shield Region, while viewer-facing triggers are unaffected.

### Exam cues

- If the question says viewers in many regions cause duplicate origin fetches, think Origin Shield, because regional caches can share another cached copy and consolidate misses.
- If the question says choose a Shield Region for an on-premises origin, think lowest latency to the origin, because Shield supports origins outside AWS.
- If the question says several CDNs overwhelm a packaging origin, think CloudFront with Origin Shield as their origin, because this brings their requests through a shared cache.

### Remember

- Configure Origin Shield per origin.
- Origin Shield adds charges.
- gRPC, a protocol for calling remote application functions, bypasses Origin Shield.

> **Trap:** Dynamic content, poorly cacheable responses and infrequent requests may gain little from another cache. Origin Shield still adds charges.
