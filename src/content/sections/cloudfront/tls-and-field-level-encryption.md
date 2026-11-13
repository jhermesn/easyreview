---
title: TLS and field-level encryption
level: associate
order: 70
facts:
  - id: tls-hops
    text: Viewer HTTPS and HTTPS from CloudFront to a custom origin are configured separately.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html#using-https-cloudfront-to-custom-origin
  - id: tls-acm
    text: An ACM certificate used between viewers and CloudFront must be requested or imported in us-east-1.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-aws-region
  - id: tls-alb
    text: For an Elastic Load Balancing origin, its ACM certificate can be requested or imported in any AWS Region.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-aws-region
  - id: tls-san
    text: The viewer certificate SAN must cover each alternate domain name exactly or with a wildcard at the same
      domain level.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-domain-names-in-cert
  - id: tls-viewer-redirect
    text: Redirect HTTP to HTTPS redirects viewer GET and HEAD requests with status 301.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html#configure-cloudfront-HTTPS-viewers
  - id: tls-redirect-write
    text: With Redirect HTTP to HTTPS, HTTP 1.1 or later POST, PUT, DELETE, OPTIONS and PATCH requests receive 307
      with the same method and body preserved.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html#configure-cloudfront-HTTPS-viewers
  - id: tls-redirect-old
    text: For those non-GET and non-HEAD methods with a request protocol below HTTP 1.1, Redirect HTTP to HTTPS
      returns 403.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html#configure-cloudfront-HTTPS-viewers
  - id: tls-viewer-only
    text: HTTPS only viewer protocol policy rejects HTTP requests with status 403.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html#configure-cloudfront-HTTPS-viewers
  - id: tls-security-policy
    text: A CloudFront viewer security policy specifies the minimum TLS version and allowed encryption ciphers.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/secure-connections-supported-viewer-protocols-ciphers.html#secure-connections-supported-viewer-protocols-ciphers
  - id: tls-origin-http
    text: HTTP only origin protocol policy sends custom-origin requests over HTTP.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginProtocolPolicy
  - id: tls-origin-https
    text: HTTPS only origin protocol policy sends custom-origin requests over HTTPS.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginProtocolPolicy
  - id: tls-origin-match
    text: Match viewer origin protocol policy uses the viewer request protocol for the custom-origin connection.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginProtocolPolicy
  - id: tls-origin-name
    text: A custom origin certificate must match the configured origin domain or the forwarded Host header domain.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html#using-https-cloudfront-to-origin-certificate
  - id: tls-origin-trust
    text: CloudFront requires a certificate from a trusted CA for HTTPS to a custom origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html#using-https-cloudfront-to-origin-certificate
  - id: tls-origin-invalid
    text: An invalid, expired or self-signed custom-origin certificate causes CloudFront to return 502.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html#using-https-cloudfront-to-origin-certificate
  - id: tls-origin-mismatch
    text: An origin certificate that does not match the origin domain can cause CloudFront to return 502 Bad
      Gateway.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-domain-names-in-cert
  - id: tls-website
    text: S3 static website endpoints do not support HTTPS from CloudFront to the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html#using-https-cloudfront-to-custom-origin
  - id: tls-sni
    text: With Server Name Indication (SNI), the client includes the requested domain in the TLS ClientHello;
      CloudFront selects the matching distribution and certificate without dedicated IPs.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-https-dedicated-ip-or-sni.html#cnames-https-sni
  - id: tls-dedicated
    text: Dedicated IP HTTPS is an alternative for clients lacking SNI and adds a monthly charge.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-https-dedicated-ip-or-sni.html#cnames-https-dedicated-ip
  - id: tls-fle
    text: Field-level encryption encrypts selected POST fields at the edge with a public key; only applications
      holding the corresponding private key can decrypt them.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption
  - id: tls-fle-limit
    text: Field-level encryption supports up to 10 data fields per request.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption
  - id: tls-fle-individual
    text: Field-level encryption requires selected fields and cannot encrypt the entire request.
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
  - id: tls-fle-profile
    text: A field-level encryption profile selects which fields to encrypt.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption-overview
  - id: tls-fle-config
    text: A field-level encryption configuration chooses profiles and is linked to a cache behavior.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption-overview
  - id: tls-fle-viewer
    text: Field-level encryption requires viewer protocol policy Redirect HTTP to HTTPS or HTTPS only.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption-setting-up-step5
  - id: tls-fle-methods
    text: Field-level encryption requires allowing GET, HEAD, OPTIONS, PUT, POST, PATCH and DELETE on the cache
      behavior.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption-setting-up-step5
  - id: tls-fle-origin
    text: Field-level encryption requires origin protocol policy Match viewer or HTTPS only.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption-setting-up-step5
  - id: tls-fle-stack
    text: Encrypted fields remain encrypted through intermediate application components until an authorized
      component decrypts them.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption
  - id: tls-alb-region
    text: ACM certificates are regional resources; an Elastic Load Balancing certificate must be provisioned
      separately in each Region where it is used.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-regions
  - id: tls-chunk-definition
    text: Chunked transfer encoding sends a message body in chunks.
    source: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html#runtimes-custom-response-streaming
  - id: tls-encryption-definition
    text: HTTPS protects connections, while field-level encryption keeps selected data encrypted during
      application processing.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html#field-level-encryption
diagrams:
  - id: cloudfront-field-encryption-flow
    title: Selected fields stay encrypted through the application
    width: 1270
    height: 220
    nodes:
      - id: viewer
        label: Viewer
        icon: res-client
        x: 30
        y: 70
        w: 140
        h: 72
        tone: user
        info: Submits a form using HTTPS.
      - id: edge
        label: CloudFront
        icon: cloudfront
        x: 360
        y: 63
        w: 160
        h: 86
        tone: network
        sub: encrypt chosen fields
        info: Uses the configured public key to encrypt selected POST fields.
      - id: frontend
        label: Web tier
        icon: res-server
        x: 710
        y: 63
        w: 160
        h: 86
        tone: user
        sub: encrypted fields
        info: Intermediate application components receive fields that remain encrypted.
      - id: decryptor
        label: Authorized app
        icon: res-server
        x: 1080
        y: 63
        w: 160
        h: 86
        tone: user
        sub: private key
        info: Only the component holding the corresponding private key can decrypt the fields.
    edges:
      - from: viewer
        to: edge
        step: 1
        label: HTTPS form
      - from: edge
        to: frontend
        step: 2
        label: HTTPS
      - from: frontend
        to: decryptor
        step: 3
        label: encrypted fields
    steps:
      - The viewer submits selected form fields over HTTPS.
      - CloudFront encrypts the configured fields with the public key and forwards the request over HTTPS.
      - The fields remain encrypted until the application holding the private key decrypts them.
cards:
  - id: cloudfront-020
    q: A CloudFront distribution uses an alternate domain name. Where must its ACM viewer certificate be, and
      which names must it cover?
    a: In us-east-1. The SAN must cover the alternate domain exactly or with a wildcard at the same level. An
      Elastic Load Balancing origin uses a separate regional certificate; provision that certificate in the
      Region where the load balancer uses it.
    trap: true
    facts:
      - tls-acm
      - tls-san
      - tls-alb
      - tls-alb-region
  - id: cloudfront-021
    q: A CloudFront custom origin uses HTTPS but returns an invalid certificate. Which origin settings and
      certificate requirements should the team check?
    a: Check the separate origin protocol policy and certificate. The policy is HTTP only, HTTPS only or Match
      viewer. For HTTPS, the certificate must be trusted and match the origin domain or forwarded Host domain.
      Invalid or mismatched certificates can cause 502.
    facts:
      - tls-hops
      - tls-origin-http
      - tls-origin-https
      - tls-origin-match
      - tls-origin-name
      - tls-origin-trust
      - tls-origin-invalid
      - tls-origin-mismatch
  - id: cloudfront-022
    q: How does a CloudFront cache behavior require viewers to use HTTPS and set their minimum TLS version?
    a: Set viewer protocol policy to Redirect HTTP to HTTPS or HTTPS only. Choose a viewer security policy for the
      minimum TLS version and allowed ciphers. Configure origin HTTPS separately.
    facts:
      - tls-viewer-redirect
      - tls-viewer-only
      - tls-security-policy
      - tls-hops
  - id: cloudfront-023
    q: A form passes through several application components behind CloudFront, but only the final processor may
      read selected sensitive fields. What should the team use?
    a: Field-level encryption. CloudFront encrypts up to 10 selected POST fields with the public key; only the
      component holding the private key can decrypt them. Configure HTTPS to viewers and origin and allow all
      supported HTTP methods.
    facts:
      - tls-fle
      - tls-fle-limit
      - tls-fle-individual
      - tls-fle-stack
      - tls-fle-viewer
      - tls-fle-methods
      - tls-fle-origin
  - id: cloudfront-045
    q: CloudFront must serve HTTPS for a custom domain to clients that support SNI without dedicated IPs. How does
      it select the certificate?
    a: The client sends the domain name in the TLS ClientHello SNI extension. CloudFront finds the matching
      distribution and returns its certificate. Dedicated IP HTTPS is an alternative for clients without SNI
      and adds a monthly charge.
    facts:
      - tls-sni
      - tls-dedicated
  - id: cloudfront-046
    q: Which key, form format and origin capability does CloudFront field-level encryption require?
    a: An RSA 2048-bit key pair, application/x-www-form-urlencoded content, and an origin supporting chunked
      encoding. Upload the public key; keep the private key with the decrypting application.
    facts:
      - tls-fle
      - tls-fle-rsa
      - tls-fle-format
      - tls-fle-chunk
---
CloudFront uses Transport Layer Security (TLS) to protect HTTPS connections. The viewer connection and the custom-origin connection have separate settings. Field-level encryption protects selected form values beyond those connections so they stay encrypted inside the application until the component with the private key reads them.

### How it works

1. For an alternate domain name, your custom name for the distribution, request or import the viewer certificate in ACM in `us-east-1`. Its subject alternative name (SAN) field, the list of names a certificate covers, must include an exact match or a wildcard at the same domain level.
2. With Server Name Indication (SNI), the viewer includes the domain in its TLS ClientHello, the message that starts negotiation. CloudFront selects the matching distribution and certificate without dedicated IP addresses. Dedicated IP HTTPS supports clients without SNI and adds a monthly charge.
3. Set the viewer protocol policy to redirect HTTP or reject it. Choose the viewer security policy for the minimum TLS version and ciphers, the encryption algorithms allowed on the connection.
4. Set the origin protocol policy separately. For HTTPS, the origin certificate must come from a trusted certificate authority (CA), an issuer CloudFront accepts. Its name must match the origin domain or forwarded `Host` domain. Invalid certificates or name mismatches can produce `502 Bad Gateway`.
5. For field-level encryption, upload the public half of an RSA 2048-bit key pair. A profile selects the POST fields; a configuration chooses profiles and attaches to a cache behavior. CloudFront encrypts those fields, and the authorized application uses the private key to decrypt them.

| Custom-origin protocol policy | Connection used |
|---|---|
| HTTP only | HTTP |
| HTTPS only | HTTPS |
| Match viewer | The viewer request's protocol |

Field-level encryption supports up to 10 fields per request in `application/x-www-form-urlencoded`, the encoded format for form name-value pairs. The origin must support chunked encoding, transferring a request body in chunks. Require viewer `Redirect HTTP to HTTPS` or `HTTPS only`, origin `Match viewer` or `HTTPS only`, and allow `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE` on the behavior.

### Exam cues

- If the question says a custom domain cannot use its ACM certificate, think `us-east-1` and SAN coverage, because those are requirements for the viewer certificate.
- If the question says modern clients need custom-domain HTTPS without dedicated addresses, think SNI, because the requested domain selects the certificate.
- If the question says intermediate application components must not see selected form fields, think field-level encryption, because TLS alone protects connections and those fields must remain encrypted through processing.

### Remember

- `HTTPS only` viewer policy rejects HTTP with `403`.
- Redirect mode uses `301` for GET and HEAD; for POST, PUT, DELETE, OPTIONS and PATCH over HTTP 1.1 or later it uses `307`, preserving method and body. Those methods below HTTP 1.1 get `403`.
- The viewer ACM certificate belongs in `us-east-1`; an Elastic Load Balancing origin uses its own regional certificate. Provision it in the Region where the load balancer uses it.
- Field-level encryption uses RSA 2048-bit keys and at most 10 fields.

> **Trap:** Viewer HTTPS does not configure custom-origin HTTPS. An S3 website endpoint cannot use HTTPS on the origin connection.

> **Trap:** Field-level encryption encrypts named POST fields. It cannot encrypt the entire request.
