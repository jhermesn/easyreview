---
title: Access points and CORS
level: associate
order: 110
facts:
  - id: access-point
    text: An S3 access point is a named endpoint with its own policy and network controls for object
      operations.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html#access-points
  - id: access-point-bucket
    text: An access point policy works together with the underlying bucket policy.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html#access-points
  - id: access-point-vpc
    text: An access point can be restricted to requests from a virtual private cloud (VPC).
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html#access-points
  - id: access-point-bpa
    text: Each access point can have its own Block Public Access settings.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html#access-points
  - id: access-point-object
    text: Access points support object operations rather than bucket operations such as creating
      replication configurations.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html#access-points
  - id: cors-browser
    text: CORS lets browser applications access permitted resources across origins while existing
      authorization policies still apply.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html#cors
  - id: cors-origin
    text: An origin is the combination of protocol, host, and port; changing one makes a request
      cross-origin.
    source: https://aws.amazon.com/what-is/cross-origin-resource-sharing/
  - id: cors-preflight
    text: A browser can send an OPTIONS preflight request to check whether a cross-origin method and
      headers are allowed before the actual request.
    source: https://aws.amazon.com/what-is/cross-origin-resource-sharing/
  - id: presign-purpose
    text: Presigned URLs grant time-limited access to an object operation using the permissions of the
      signing identity.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html#using-presigned-url
  - id: presign-upload
    text: A presigned PUT URL permits an upload without giving the recipient AWS credentials.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html#using-presigned-url
  - id: presign-existing
    text: A presigned upload replaces the current object at its specified key.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html#using-presigned-url
  - id: presign-existing-versioning
    text: Bucket versioning retains prior versions when an upload replaces the current object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#Versioning
  - id: presign-expiry
    text: A presigned URL expires when its signing credentials expire or are revoked, even if its
      requested lifetime is longer.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html#PresignedUrl-Expiration
  - id: presign-max
    text: SigV4 presigned URLs created through the CLI or SDKs can last up to 7 days when signing
      credentials remain valid.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html#PresignedUrl-Expiration
  - id: presign-bearer
    text: "Presigned URLs are bearer tokens: anyone possessing a valid URL can use its permitted
      operation."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html#PresignedUrlUploadObject-LimitCapabilities
  - id: lambda-transform
    text: S3 Object Lambda uses Lambda to transform GET, LIST, or HEAD responses.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transforming-objects.html#transforming-objects
  - id: lambda-transform-access
    text: An Object Lambda Access Point uses a supporting access point to access original data.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transforming-objects.html#transforming-objects
  - id: lambda-original
    text: Object Lambda can filter or redact returned data without requiring changes to the stored
      original.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transforming-objects.html#transforming-objects
  - id: lambda-availability
    text: Since November 7, 2025, S3 Object Lambda is limited to existing customers and selected partner
      solutions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/amazons3-ol-change.html#amazons3-ol-change
  - id: vpc-definition
    text: A VPC is a logically isolated virtual network in AWS.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
  - id: endpoint-definition
    text: A VPC endpoint provides private connectivity to supported AWS services.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html#concepts
  - id: sigv4-definition
    text: AWS Signature Version 4 (SigV4) adds authentication information to AWS API requests.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv.html#reference_sigv
  - id: access-grants
    text: "S3 Access Grants maps read-only, write-only or read-write access to S3 prefixes, buckets or objects for IAM principals and directly for users and groups from a corporate directory."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-grants.html#access-grants
  - id: ap-delegation
    text: "AWS recommends a bucket policy that delegates access control to access points, so each access point policy grants access without repeating it in the bucket policy."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-policies.html#access-points-delegating-control
  - id: ap-vpc-endpoint
    text: "To use an access point from a VPC, the S3 VPC endpoint policy must allow the access point and its underlying bucket."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-vpc.html
diagrams:
  - id: s3-object-lambda-response
    title: Transforming an Object Lambda response
    width: 1000
    height: 230
    nodes:
      - id: access
        label: Object Lambda AP
        icon: simple-storage-service
        tone: storage
        x: 30
        y: 80
        w: 210
        h: 72
      - id: function
        label: Lambda transform
        icon: lambda
        tone: compute
        x: 360
        y: 80
        w: 210
        h: 72
      - id: client
        label: Application
        icon: res-client
        tone: user
        x: 690
        y: 80
        w: 210
        h: 72
    edges:
      - from: access
        to: function
        step: 1
      - from: function
        to: client
        step: 2
    steps:
      - A request through the Object Lambda Access Point invokes Lambda, with a supporting access
        point providing access to original data.
      - Lambda transforms the returned data for the application without changing the stored original.
cards:
  - id: s3-027
    q: What problem do S3 access points solve for teams sharing a bucket?
    a: They provide named endpoints with distinct access policies and network controls. A point can be
      VPC-only and has its own Block Public Access settings; its policy works with the bucket
      policy.
    facts:
      - access-point
      - access-point-vpc
      - access-point-bpa
      - access-point-bucket
  - id: s3-028
    q: Does enabling CORS grant a browser access to a private S3 object?
    a: No. CORS controls browser cross-origin behavior. Existing ACLs and policies still determine
      authorization.
    trap: true
    facts:
      - cors-browser
  - id: s3-067
    q: An S3 presigned URL was given a long lifetime but fails when its signing role session expires.
      Why?
    a: Its lifetime cannot exceed the signing credentials. Expiration or revocation of those credentials
      ends access even if the URL expiration is later.
    trap: true
    facts:
      - presign-expiry
  - id: s3-068
    q: An S3 application must let a recipient upload one object without receiving AWS credentials. What
      feature fits?
    a: A presigned PUT URL. Its permissions are limited by the signer and its validity by the URL and
      signing credentials; protect it as a bearer token.
    facts:
      - presign-upload
      - presign-purpose
      - presign-expiry
      - presign-bearer
  - id: s3-069
    q: An existing S3 Object Lambda customer needs a redacted GET response without editing the source
      object. Which mechanism fits?
    a: An Object Lambda Access Point invokes Lambda to transform the response through a supporting
      access point. Since November 2025, availability is limited to existing customers and selected
      partner solutions.
    facts:
      - lambda-transform
      - lambda-transform-access
      - lambda-original
      - lambda-availability
  - id: s3-159
    q: "Thousands of corporate directory users each need access to their own S3 prefixes, beyond what bucket policies scale to. Which S3 feature fits?"
    a: "S3 Access Grants, which maps prefix-level permissions to IAM principals and to directory users and groups."
    facts: [access-grants]
---
S3 access points give a shared bucket separate named entry points and permission controls. CORS, or cross-origin resource sharing, lets browser code use permitted resources from another origin; an origin combines protocol, host, and port.

### How it works

1. Create an access point for each required access policy or private-network boundary. For a VPC, a private AWS network, restrict the point to that VPC. The access point policy and bucket policy work together.
2. For browser access, configure CORS. When a preflight check is needed, the browser sends `OPTIONS` before the actual request.
3. Authorize the actual request independently. A VPC endpoint provides private connectivity to AWS services.
4. For temporary sharing, issue a presigned URL for a specific object and operation. A presigned `PUT` lets a recipient upload without AWS credentials, but does not outlive its signing credentials.
5. For eligible existing users, S3 Object Lambda invokes Lambda through an Object Lambda Access Point to transform returned data. A supporting access point provides access to the original object.

### Exam cues

- If the question says different teams need different S3 policies for a shared dataset, think access points, because each endpoint has its own access controls.
- If the question says authorized browser code cannot read S3 from another origin, think CORS matching, because browser permission and object authorization are separate checks.
- If the question says temporary S3 uploads must work without handing out credentials, think a presigned PUT URL, because it delegates one permitted operation.
- If the question says an existing Object Lambda user needs filtered S3 responses, think a response transformation, because the original object can remain unchanged.

### Remember

- CORS does not grant object permissions. A different protocol, host, or port is a different origin.
- Access points are for object operations, not bucket administration.
- Signature Version 4 (SigV4) signs AWS API requests. CLI or SDK SigV4 presigned URLs can last up to 7 days only while their signing credentials remain valid. Treat URLs as bearer tokens.
- A presigned upload to an existing key replaces its current data; versioning determines whether earlier versions remain.
- Since November 2025, Object Lambda is restricted to existing customers and selected partner solutions.

> **Trap:** CORS permits a cross-origin browser request but does not grant permission to access the object.
