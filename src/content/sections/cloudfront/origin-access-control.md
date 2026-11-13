---
title: Origin access control
level: associate
order: 30
facts:
  - id: oac-auth
    text: Origin access control authenticates CloudFront requests to an S3 bucket origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
  - id: oac-regions
    text: OAC supports S3 buckets in all AWS Regions.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
  - id: oac-sse-kms
    text: OAC supports S3 objects encrypted with SSE-KMS.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
  - id: oac-write
    text: OAC supports PUT and DELETE requests to S3.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
  - id: oac-recommended
    text: AWS recommends OAC over legacy origin access identity (OAI) for S3 origins.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
  - id: oac-website
    text: An S3 website endpoint is a custom origin and supports neither OAC nor OAI.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-prerequisites-s3
  - id: oac-owner
    text: For S3 with OAC, use Bucket owner enforced Object Ownership; if ACLs are required, use Bucket owner
      preferred.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
  - id: oac-principal
    text: The S3 bucket policy grants access to the CloudFront service principal cloudfront.amazonaws.com.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-permission-to-access-s3
  - id: oac-source-arn
    text: An AWS:SourceArn condition scopes the S3 bucket policy grant to the distribution containing the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-permission-to-access-s3
  - id: oac-read
    text: The read-only OAC bucket policy grants s3:GetObject on the bucket objects.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-permission-to-access-s3
  - id: oac-signature
    text: OAC signs origin requests using Signature Version 4 (sigv4).
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#create-oac-s3
  - id: oac-always
    text: The recommended Sign requests option, API value always, signs every origin request.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-prerequisites-s3
  - id: oac-https
    text: With OAC set to always sign, CloudFront always uses HTTPS to S3.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-prerequisites-s3
  - id: oac-never
    text: The Do not sign requests option, API value never, disables signing for origins sharing the OAC.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-advanced-settings-s3
  - id: oac-no-override
    text: Do not override authorization header, API value no-override, preserves viewer Authorization when
      supplied and otherwise signs the request.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-advanced-settings-s3
  - id: oac-auth-forward
    text: With no-override, add Authorization to the cache policy of relevant S3 behaviors to pass the viewer
      header through.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-advanced-settings-s3
  - id: oac-kms
    text: SSE-KMS objects also require a KMS key policy permitting the CloudFront distribution to use the key.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-permissions-sse-kms
  - id: oac-private
    text: Remove permissions that allow other users to read the S3 objects directly to prevent bypassing
      CloudFront.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-overview.html#private-content-overview-s3
  - id: oac-migrate-both
    text: Before migrating from OAI to OAC, update the bucket policy to allow both the OAI and the distribution
      using OAC.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#migrate-from-oai-to-oac
  - id: oac-migrate-remove
    text: After switching the distribution to OAC and waiting for full deployment, remove the old OAI bucket
      policy grant.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#migrate-from-oai-to-oac
  - id: oac-arn
    text: An Amazon Resource Name (ARN) uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
  - id: oac-ownership-definition
    text: S3 Object Ownership controls ownership of uploaded objects and enables or disables access control lists.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html#about-object-ownership
diagrams:
  - id: cloudfront-oac-private-origin
    title: CloudFront signs requests to a private S3 origin
    width: 1020
    height: 200
    nodes:
      - id: viewer
        label: Viewer
        icon: res-client
        x: 30
        y: 70
        w: 140
        h: 72
        tone: user
        info: Requests content through CloudFront.
      - id: edge
        label: CloudFront
        icon: cloudfront
        x: 420
        y: 63
        w: 160
        h: 86
        tone: network
        sub: "OAC: always"
        info: Signs S3 requests with Signature Version 4 and uses HTTPS.
      - id: bucket
        label: Private S3
        icon: simple-storage-service
        x: 830
        y: 63
        w: 160
        h: 86
        tone: storage
        sub: bucket origin
        info: The bucket policy permits the CloudFront service principal for the distribution ARN.
    edges:
      - from: viewer
        to: edge
        step: 1
        label: request
      - from: edge
        to: bucket
        step: 2
        label: signed HTTPS
    steps:
      - The viewer requests content through the distribution.
      - When CloudFront requests the object from S3, OAC signs the request; the bucket policy grants the
        distribution access.
cards:
  - id: cloudfront-009
    q: A team serves content from S3 through CloudFront and must prevent direct public bucket reads. What should
      it configure?
    a: Use OAC with the regular S3 bucket origin. Grant cloudfront.amazonaws.com s3:GetObject in the bucket
      policy, scoped by AWS:SourceArn to the distribution. Remove direct public read permissions.
    facts:
      - oac-auth
      - oac-principal
      - oac-source-arn
      - oac-read
      - oac-private
  - id: cloudfront-010
    q: Why does AWS recommend CloudFront OAC over legacy OAI for S3 origins?
    a: OAC supports all S3 Regions, SSE-KMS objects, and PUT and DELETE requests. SSE-KMS also needs a KMS key
      policy allowing the distribution to use the key.
    trap: true
    facts:
      - oac-regions
      - oac-sse-kms
      - oac-write
      - oac-recommended
      - oac-kms
  - id: cloudfront-011
    q: Can CloudFront OAC protect an S3 static website endpoint?
    a: No. An S3 website endpoint is a custom origin and supports neither OAC nor OAI. Use a regular S3 bucket
      origin for OAC.
    trap: true
    facts:
      - oac-website
  - id: cloudfront-035
    q: CloudFront OAC has a read grant in the S3 bucket policy, but the objects use SSE-KMS. Which additional
      resource policy must the team configure?
    a: The KMS key policy. It must permit the CloudFront distribution to use the encryption key. The S3 read grant
      alone does not grant key access.
    facts:
      - oac-read
      - oac-kms
  - id: cloudfront-036
    q: How should a team migrate a CloudFront S3 origin from OAI to OAC without losing origin access during
      deployment?
    a: Allow both identities in the bucket policy first. Switch the distribution to OAC, wait until it is fully
      deployed, then remove the old OAI policy grant.
    facts:
      - oac-migrate-both
      - oac-migrate-remove
  - id: cloudfront-037
    q: Which CloudFront OAC signing option guarantees HTTPS to its S3 bucket origin?
    a: Sign requests, API value always. It signs every origin request. The no-override option preserves viewer
      Authorization when present and needs Authorization in the relevant cache policy.
    facts:
      - oac-always
      - oac-https
      - oac-no-override
      - oac-auth-forward
---
Origin access control (OAC) lets CloudFront authenticate to an S3 bucket so the bucket can serve content through a distribution without public read access. It protects the origin connection. Remove direct read permissions as well, so viewers cannot bypass CloudFront with S3 URLs.

### How it works

1. Use the regular S3 bucket origin. A static website endpoint is a custom origin, an HTTP server endpoint, and cannot use OAC or the legacy origin access identity (OAI).
2. Set S3 Object Ownership, the setting for who controls uploaded objects, to `Bucket owner enforced`. If access control lists (ACLs), permission lists for buckets or objects, are required, AWS specifies `Bucket owner preferred`.
3. Grant the CloudFront service principal, the AWS service identity `cloudfront.amazonaws.com`, permission in the bucket policy. For reads, grant `s3:GetObject` on objects and use `AWS:SourceArn` to limit the grant to the distribution's Amazon Resource Name (ARN), its AWS resource identifier.
4. Attach OAC and select `Sign requests`. CloudFront signs origin requests with Signature Version 4 (SigV4), AWS's request authentication format, and uses HTTPS to S3.
5. For server-side encryption with AWS KMS (SSE-KMS), encryption of stored objects using a KMS key, also grant the distribution key access in the KMS key policy.

| Signing behavior | API value | Effect |
|---|---|---|
| Sign requests | `always` | Sign every request and use HTTPS to S3 |
| Do not sign requests | `never` | Disable signing for origins using this OAC |
| Do not override authorization header | `no-override` | Preserve viewer Authorization when supplied; otherwise sign |

For `no-override`, add `Authorization` to the cache policy on relevant S3 behaviors so CloudFront forwards the viewer's header.

### Exam cues

- If the question says keep S3 private while serving through CloudFront, think OAC plus a distribution-scoped bucket policy, because S3 must authorize CloudFront's signed requests.
- If the question says OAC can read ordinary objects but needs access to SSE-KMS objects, think KMS key policy, because the distribution also needs permission to use the key.
- If the question says migrate from OAI without interrupting access, think allow both identities, switch to OAC, wait for full deployment, then remove OAI, because policy access must cover the transition.

### Remember

- OAC supports all S3 Regions, SSE-KMS, `PUT` and `DELETE`.
- `always` is the recommended signing option.
- The S3 website endpoint supports neither OAC nor OAI.

> **Trap:** A bucket policy grant does not grant permission to a KMS key. SSE-KMS needs the key policy too.
