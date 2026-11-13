---
title: Public access and object ownership
level: associate
order: 100
facts:
  - id: bpa-purpose
    text: S3 Block Public Access overrides public grants in policies and ACLs when a blocking setting
      applies.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html#access-control-block-public-access
  - id: bpa-scope
    text: Block Public Access can be managed at organization, account, bucket, and access point levels;
      S3 uses the most restrictive applicable combination.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html#access-control-block-public-access
  - id: bpa-acls
    text: BlockPublicAcls rejects requests that set public ACLs without changing existing ACLs.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html#access-control-block-public-access-options
  - id: bpa-ignore
    text: IgnorePublicAcls disregards public ACL grants without preventing those ACLs from being stored.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html#access-control-block-public-access-options
  - id: bpa-policy
    text: BlockPublicPolicy rejects new public bucket policies without changing existing policies.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html#access-control-block-public-access-options
  - id: bpa-restrict
    text: RestrictPublicBuckets limits a bucket with a public policy to AWS service principals and
      authorized users in the owner account, blocking other cross-account access.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html#access-control-block-public-access-options
  - id: ownership-default
    text: "Bucket owner enforced is the default Object Ownership setting: ACLs are disabled and the
      bucket owner owns all objects."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html#about-object-ownership
  - id: ownership-policy
    text: With ACLs disabled, policies determine access rather than ACL grants.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html#about-object-ownership
  - id: ownership-preferred
    text: Bucket owner preferred transfers ownership of a new cross-account upload to the bucket owner
      when it uses bucket-owner-full-control.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html#about-object-ownership
  - id: ownership-writer
    text: Object writer leaves ownership with the uploading account and keeps ACLs enabled.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html#about-object-ownership
  - id: ownership-acl-error
    text: Bucket owner enforced accepts uploads without an ACL or with bucket-owner-full-control; other
      ACL uploads fail with AccessControlListNotSupported.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html#about-object-ownership
  - id: acl-authenticated
    text: The authenticated-read canned ACL grants object READ access to the AuthenticatedUsers group,
      which includes any authenticated AWS account.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl
  - id: transport-deny
    text: A bucket policy deny with aws:SecureTransport false rejects insecure client requests.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/amazon-s3-policy-keys.html#example-object-tls-version
  - id: transport-service
    text: Using aws:PrincipalIsAWSService false in a network-based deny excludes AWS service principals
      whose network context can be redacted.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/amazon-s3-policy-keys.html#amazon-s3-policy-keys
  - id: website-public
    text: S3 website endpoints support only publicly readable content and do not support HTTPS.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html#WebsiteEndpoints
  - id: website-index
    text: A website endpoint returns its configured index document at the bucket root rather than the
      REST endpoint object listing.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html#WebsiteEndpoints
  - id: website-https
    text: CloudFront can provide HTTPS for a static website hosted on S3.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html#WebsiteEndpoints
  - id: acl-definition
    text: An ACL is a list of grants attached to a bucket or object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#acl-overview
cards:
  - id: s3-017
    q: How can an S3 administrator block public access even when bucket-level permissions grant it?
    a: Enable Block Public Access at the account level, or enforce it through an organization policy.
      The most restrictive applicable organization, account, bucket, and access point settings
      apply.
    facts:
      - bpa-purpose
      - bpa-scope
  - id: s3-018
    q: What is the default S3 Object Ownership setting for a new bucket?
    a: Bucket owner enforced. ACLs are disabled, the bucket owner owns all objects, and policies control
      access.
    facts:
      - ownership-default
      - ownership-policy
  - id: s3-061
    q: A legacy S3 object uses authenticated-read. Does this restrict readers to the bucket owner
      organization?
    a: No. Its AuthenticatedUsers grant includes any authenticated AWS account, subject to other
      applicable controls.
    trap: true
    facts:
      - acl-authenticated
  - id: s3-062
    q: An S3 client can upload without an ACL but fails with AccessControlListNotSupported when sending
      a custom ACL. What setting explains this?
    a: Bucket owner enforced Object Ownership. It accepts uploads without ACLs or with
      bucket-owner-full-control, and rejects other ACLs.
    facts:
      - ownership-acl-error
  - id: s3-063
    q: An S3 security requirement says to reject unencrypted network transport from clients. What policy
      condition fits?
    a: An explicit deny when aws:SecureTransport is false. Exclude AWS service principals with
      aws:PrincipalIsAWSService false when service-to-service network context could be redacted.
    facts:
      - transport-deny
      - transport-service
  - id: s3-064
    q: An S3 static website must accept HTTPS at its website endpoint. Is that endpoint sufficient?
    a: No. S3 website endpoints support HTTP and publicly readable content. Use CloudFront for HTTPS
      delivery.
    trap: true
    facts:
      - website-public
      - website-https
---
S3 separates public-access safeguards from object ownership. Block Public Access limits public grants; Object Ownership decides who owns uploaded objects and whether access control lists (ACLs), lists of grants attached to resources, are used.

### How it works

1. Apply Block Public Access at the account level or through an organization policy for a shared baseline. S3 combines it with bucket and access point settings using the most restrictive result.
2. Keep Bucket owner enforced for policy-based access. It makes the bucket owner own all objects and disables ACL authorization.
3. For a legacy ACL workflow, distinguish Bucket owner preferred from Object writer. Preferred needs `bucket-owner-full-control` on a new cross-account upload to transfer ownership.
4. Deny insecure client requests with `aws:SecureTransport: false`. When appropriate, exclude AWS service principals using `aws:PrincipalIsAWSService: false` so redacted service network context does not block delivery.
5. Treat website endpoints separately from REST endpoints: they serve publicly readable website content over HTTP, including the configured index document. Use CloudFront when HTTPS delivery is required.

| Object Ownership | Who owns an uploaded object? | ACLs |
|---|---|---|
| Bucket owner enforced | Bucket owner | Disabled; default |
| Bucket owner preferred | Bucket owner for new cross-account uploads with `bucket-owner-full-control` | Enabled |
| Object writer | Uploading account | Enabled |

### Exam cues

- If the question says an S3 bucket must stay private even after a public grant, think Block Public Access, because its applicable settings override public permissions.
- If the question says S3 cross-account uploads must belong to the bucket owner without ACL management, think Bucket owner enforced, because it disables ACLs and gives that owner all objects.
- If the question says an S3 website needs HTTPS, think CloudFront, because the website endpoint itself supports HTTP only.

### Remember

- `BlockPublicAcls` rejects new public ACLs; `IgnorePublicAcls` ignores their grants.
- `BlockPublicPolicy` rejects new public policies; `RestrictPublicBuckets` restricts access when a policy is public.
- Bucket owner enforced accepts no ACL or `bucket-owner-full-control`; other upload ACLs fail with `AccessControlListNotSupported`.
- The legacy `authenticated-read` ACL is not restricted to an organization.

> **Trap:** An authenticated AWS account is not necessarily a trusted account. The AuthenticatedUsers ACL group includes accounts outside your organization.
