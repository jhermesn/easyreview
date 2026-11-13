---
title: Signed URLs and cookies
level: associate
order: 60
facts:
  - id: signed-purpose
    text: CloudFront signed URLs and signed cookies control viewer access to private content.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html#PrivateContent
  - id: signed-url-choice
    text: Use signed URLs for individual files or clients that do not support cookies.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html#private-content-choosing-signed-urls-cookies
  - id: signed-cookie-choice
    text: Use signed cookies for multiple restricted files or to preserve existing URLs.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html#private-content-choosing-signed-urls-cookies
  - id: signed-key-group
    text: AWS recommends trusted key groups to specify which public keys CloudFront accepts for signed access.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#choosing-key-groups-or-AWS-accounts
  - id: signed-key-management
    text: Trusted key groups allow API and IAM-based key management without using the AWS account root user.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#choosing-key-groups-or-AWS-accounts
  - id: signed-application
    text: The application determines whether a viewer is entitled to content and returns signed URLs or signed
      cookies.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html#private-content-task-list
  - id: signed-keys
    text: The application signs CloudFront URLs with a private key.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-how-signed-urls-work
  - id: signed-public-key
    text: CloudFront validates a signed URL with the corresponding public key in a trusted key group.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-how-signed-urls-work
  - id: signed-validity
    text: CloudFront validates the signature and access policy before serving protected content from cache or
      fetching it from the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-how-signed-urls-work
  - id: signed-cookie-headers
    text: The application sends three Set-Cookie headers to set the values required for CloudFront signed cookies.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html#private-content-how-signed-cookies-work
  - id: signed-end
    text: Both canned and custom signed access policies specify when access ends.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-choosing-canned-custom-policy
  - id: signed-custom-start
    text: A custom policy can optionally set the date and time when access starts.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-choosing-canned-custom-policy
  - id: signed-custom-ip
    text: A custom policy can optionally restrict access by client IP address or range.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-choosing-canned-custom-policy
  - id: signed-custom-wildcard
    text: A custom policy can use a wildcard resource to cover multiple files.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-choosing-canned-custom-policy
  - id: signed-origin
    text: Signed URLs do not prevent direct origin access.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-overview.html#private-content-overview
  - id: signed-s3-origin
    text: OAC and removal of direct S3 read permissions prevent viewers from bypassing CloudFront via S3 URLs.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-overview.html#private-content-overview
  - id: signed-custom-origin
    text: A custom HTTP origin can require custom headers to restrict direct access around CloudFront.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-overview.html#private-content-overview
  - id: signed-expiry
    text: CloudFront checks signed URL expiry at the time of each HTTP request.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-check-expiration
  - id: signed-download-finish
    text: A download begun before signed URL expiry can finish after expiry.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-check-expiration
  - id: signed-download-retry
    text: A retry or range request begun after signed URL expiry fails.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-check-expiration
  - id: signed-precedence
    text: When a request has both a signed URL and signed cookies, CloudFront uses the signed URL alone to decide
      access.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html#private-content-using-signed-urls-and-cookies
  - id: signed-options
    text: CloudFront does not require a signature for allowed OPTIONS requests on behaviors requiring signed
      access, so the origin must not return protected content to OPTIONS.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html#private-content-how-signed-urls-work
  - id: signed-cookie-definition
    text: A client stores cookie values and returns them in a Cookie header with later requests.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html#private-content-how-signed-cookies-work
diagrams:
  - id: cloudfront-signed-access-flow
    title: The application grants access and CloudFront checks it
    width: 1270
    height: 210
    nodes:
      - id: app
        label: Application
        icon: res-server
        x: 30
        y: 65
        w: 160
        h: 86
        tone: user
        sub: signs with private key
        info: Determines whether the viewer may access the requested content.
      - id: viewer
        label: Viewer
        icon: res-client
        x: 380
        y: 72
        w: 140
        h: 72
        tone: user
        info: Receives the signed URL or cookies and requests content.
      - id: edge
        label: CloudFront
        icon: cloudfront
        x: 710
        y: 65
        w: 160
        h: 86
        tone: network
        sub: checks public key
        info: Validates the signature and policy before serving protected content.
      - id: origin
        label: Private origin
        icon: simple-storage-service
        x: 1080
        y: 65
        w: 160
        h: 86
        tone: storage
        sub: S3 with OAC
        info: Origin access restrictions prevent direct reads around CloudFront.
    edges:
      - from: app
        to: viewer
        step: 1
        label: signed access
      - from: viewer
        to: edge
        step: 2
        label: content request
      - from: edge
        to: origin
        step: 3
        label: cache miss
    steps:
      - The application authorizes the viewer and issues a signed URL or signed cookies.
      - CloudFront validates the signature and access policy for the content request.
      - After a successful check, a cache hit is served or CloudFront fetches from the restricted origin.
cards:
  - id: cloudfront-018
    q: When should CloudFront use signed URLs versus signed cookies for private content?
    a: Use signed URLs for individual files or clients without cookies. Use signed cookies for multiple restricted
      files or unchanged URLs. AWS recommends trusted key groups for the public keys used to validate access.
    facts:
      - signed-url-choice
      - signed-cookie-choice
      - signed-key-group
  - id: cloudfront-019
    q: A site uses CloudFront signed URLs, but its origin is publicly readable. Can viewers bypass the signed
      access restrictions?
    a: "Yes. Restrict origin access too: use OAC for S3, or require custom headers on a custom HTTP origin. Signed
      URLs alone do not protect direct origin URLs."
    trap: true
    facts:
      - signed-origin
      - signed-s3-origin
      - signed-custom-origin
  - id: cloudfront-042
    q: A subscriber site serves many restricted media files through CloudFront and must keep its current URLs.
      Which access mechanism should it use?
    a: Signed cookies. The application authorizes the viewer and sends the three Set-Cookie headers that establish
      signed access.
    facts:
      - signed-cookie-choice
      - signed-cookie-headers
      - signed-application
  - id: cloudfront-043
    q: A CloudFront download may begin only after a scheduled time and only from an approved IP range. Which
      signed access policy is required?
    a: A custom policy. It can set an optional start time and client IP restriction; both canned and custom
      policies support expiry.
    facts:
      - signed-custom-start
      - signed-custom-ip
      - signed-end
  - id: cloudfront-044
    q: A CloudFront signed URL expires while a large file is downloading. Can the download finish, and can a
      disconnected client retry after expiry?
    a: The download begun before expiry can finish. A retry or range request begun after expiry fails because
      CloudFront checks validity when each request begins.
    trap: true
    facts:
      - signed-expiry
      - signed-download-finish
      - signed-download-retry
---
Signed URLs and signed cookies let CloudFront enforce an application's decision about who may retrieve private content. A signature is proof generated with a private key and checked with its public key. The application grants access; CloudFront checks that grant before delivering protected content.

### How it works

1. Configure a trusted key group, a collection of public keys accepted for signed access, on the relevant cache behavior, the rule for that URL path. AWS recommends key groups because keys can be managed through APIs and IAM permissions without the account root user.
2. The application determines whether a viewer may access the content. It uses its private key to sign a URL or cookie policy, the rules that set the permitted resource and access period.
3. For a signed URL, the viewer requests the returned link. For signed cookies, the application sends three `Set-Cookie` headers; the client stores these values and returns them with content requests. A cookie is a value a client stores and sends with later requests.
4. CloudFront uses the public key to check the signature and evaluates the policy. Once access is permitted, it serves a cached copy or retrieves the file from the origin.
5. Restrict the origin separately. For S3, use origin access control (OAC); for a custom HTTP server, require custom headers so direct requests cannot bypass CloudFront.

Use signed URLs for individual downloads or clients that cannot store cookies. Use signed cookies for access to many files while preserving existing URLs.

| Policy constraint | Canned policy | Custom policy |
|---|---|---|
| Expiration time | Yes | Yes |
| Optional start time | No | Yes |
| Optional client IP range | No | Yes |
| Wildcard resource for multiple files | No | Yes |

### Exam cues

- If the question says protect many media files without changing URLs, think signed cookies, because one grant can cover multiple restricted files.
- If the question says a download client cannot use cookies, think signed URL, because the access information travels in the link.
- If the question says access starts at a future time or is limited to an IP range, think custom policy, because a canned policy lacks those constraints.

### Remember

- The application signs with the private key; CloudFront checks with the public key.
- Signed cookies require three `Set-Cookie` headers.
- A signed URL takes precedence over signed cookies when both are present.

> **Trap:** Expiry is checked at request time. A download started before expiry can finish, but a new retry or range request after expiry fails.

> **Trap:** Allowed `OPTIONS` requests do not require a signature. The origin must not return protected content for that method.
