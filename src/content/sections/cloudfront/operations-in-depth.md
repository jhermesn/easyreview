---
title: Response and request operations
level: professional
order: 90
facts:
  - id: cache-response-policy
    text: A response headers policy attached to a cache behavior adds or removes viewer response headers without
      function code or origin changes.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html#modifying-response-headers
  - id: cache-security-headers
    text: A response headers policy can add Strict-Transport-Security, Content-Security-Policy and X-Frame-Options.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html#modifying-response-headers
  - id: cache-response-hit
    text: Response headers policies apply to cached responses and responses forwarded from the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html#modifying-response-headers
  - id: failover-options
    text: OPTIONS requests fail over only when OPTIONS is included in cached HTTP methods.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: tls-fle
    text: Field-level encryption encrypts selected POST fields at the edge with a public key; only applications
      holding the corresponding private key can decrypt them.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption
  - id: tls-fle-rsa
    text: Field-level encryption requires an RSA key pair of 2048 bits.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption-setting-up-step1
  - id: tls-fle-format
    text: The field-level encryption content type is application/x-www-form-urlencoded.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption-setting-up-step4
  - id: tls-fle-chunk
    text: The origin must support chunked encoding for field-level encryption.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption
  - id: ttl-viewer-header
    text: Cache-Control or Pragma headers in a viewer GET request do not force CloudFront to retrieve the object
      from the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html#expiration-individual-objects
cards:
  - id: cloudfront-030
    q: A team needs standard security headers on cached and uncached CloudFront responses without maintaining
      function code. What should it attach?
    a: A response headers policy on the cache behavior. It can add Strict-Transport-Security,
      Content-Security-Policy and X-Frame-Options to both kinds of response.
    facts:
      - cache-response-policy
      - cache-security-headers
      - cache-response-hit
  - id: cloudfront-038
    q: A CloudFront origin group fails over GET requests but not OPTIONS requests, even though OPTIONS is allowed.
      Which behavior setting should the team inspect?
    a: Cached HTTP methods. OPTIONS must be cached to qualify for origin failover; merely allowing it is
      insufficient.
    trap: true
    facts:
      - failover-options
  - id: cloudfront-046
    q: Which key, form format and origin capability does CloudFront field-level encryption require?
    a: An RSA 2048-bit key pair, application/x-www-form-urlencoded content, and an origin supporting chunked
      encoding. Upload the public key; keep the private key with the decrypting application.
    facts:
      - tls-fle
      - tls-fle-rsa
      - tls-fle-format
      - tls-fle-chunk
  - id: cloudfront-033
    q: "A client sends Cache-Control: no-cache on a GET to CloudFront. Must CloudFront fetch a fresh origin copy?"
    a: No. Viewer GET Cache-Control and Pragma headers do not force CloudFront to contact the origin.
    trap: true
    facts:
      - ttl-viewer-header
---
CloudFront provides settings for response headers, origin failover and field-level encryption. These settings control how responses reach viewers and how selected request fields are protected.

### How it works

1. Attach a response headers policy to a cache behavior to add or remove viewer response headers without function code or origin changes. The policy applies to cached responses and responses forwarded from the origin.
2. For origin failover of `OPTIONS` requests, include `OPTIONS` in the behavior's cached HTTP methods.
3. For field-level encryption, CloudFront uses a public key at the edge to encrypt selected POST fields. Only applications with the corresponding private key can decrypt them. The origin must support chunked encoding, which sends a message body in chunks.
4. A viewer's GET request with `Cache-Control` or `Pragma` does not force CloudFront to fetch the object from the origin.

### Exam cues

- If the question says add security headers to cached and origin responses without function code, think response headers policy, because it applies to both.
- If the question says allowed `OPTIONS` requests do not fail over, think cached HTTP methods, because `OPTIONS` must be included there.
- If the question says protect selected POST fields for a specific application, think field-level encryption, because only the holder of the private key can decrypt them.
- If the question says a viewer sends `Cache-Control: no-cache` on a GET, think CloudFront may still serve a cached object, because the header does not force an origin fetch.

### Remember

- A response headers policy can add `Strict-Transport-Security`, `Content-Security-Policy` and `X-Frame-Options`.
- Field-level encryption requires an RSA 2048-bit key pair and `application/x-www-form-urlencoded` content.

> **Trap:** Allowing `OPTIONS` is not enough for origin failover. The method must also be included in cached HTTP methods.
