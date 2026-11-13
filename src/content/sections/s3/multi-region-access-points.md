---
title: Multi-Region Access Points
level: professional
order: 50
facts:
  - id: mrap-endpoint
    text: An S3 Multi-Region Access Point provides a global endpoint for buckets in multiple Regions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPoints.html#MultiRegionAccessPoints
  - id: mrap-route
    text: Requests through a Multi-Region Access Point route to the closest-proximity bucket with active
      routing status.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPoints.html#MultiRegionAccessPoints
  - id: mrap-contents
    text: Routing does not inspect bucket contents; a GET can return HTTP 404 when the selected bucket
      lacks the object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPointRequestRouting.html#MultiRegionAccessPointRequestRouting
  - id: mrap-replication
    text: Multi-Region Access Points require separately configured CRR to copy data between their
      buckets.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPointBucketReplication.html#MultiRegionAccessPointBucketReplication
  - id: mrap-two-way
    text: Two-way replication helps synchronize buckets that accept writes through a Multi-Region Access
      Point.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPointBucketReplication.html#MultiRegionAccessPointBucketReplication
  - id: mrap-active
    text: Active-active routing allows all configured Regions to receive traffic.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/FailoverConfiguration.html#FailoverConfiguration
  - id: mrap-passive
    text: In active-passive routing, active Regions receive traffic and passive Regions do not.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/FailoverConfiguration.html#FailoverConfiguration
  - id: mrap-failover
    text: Failover controls change which Regions receive requests while preserving the global endpoint.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MrapFailover.html#MrapFailover
  - id: mrap-existing
    text: Existing objects need Batch Replication because live CRR covers new matching objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: mrap-kms
    text: Cross-Region SSE-KMS replication requires explicit encrypted-object selection, destination KMS
      key configuration, and source decrypt and destination encrypt permissions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html#replication-config-for-kms-objects
  - id: mrap-versions
    text: Replication requires versioning enabled on source and destination buckets.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html#replication-requirements
diagrams:
  - id: s3-mrap-routing-and-replication
    title: Routing and copying are separate paths
    width: 1000
    height: 400
    nodes:
      - id: client
        label: Application
        icon: res-client
        tone: user
        x: 30
        y: 80
        w: 160
        h: 72
      - id: endpoint
        label: Global endpoint
        icon: simple-storage-service
        tone: storage
        x: 350
        y: 80
        w: 180
        h: 72
      - id: active
        label: Active bucket
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 750
        y: 80
        w: 170
        h: 72
      - id: other
        label: Other Region
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 750
        y: 285
        w: 170
        h: 72
    edges:
      - from: client
        to: endpoint
        step: 1
        label: request
      - from: endpoint
        to: active
        step: 2
        label: route
      - from: active
        to: other
        step: 3
        label: CRR
        dashed: true
    steps:
      - The application uses one global endpoint.
      - Routing selects a nearby active bucket without checking which keys it holds.
      - Separately configured asynchronous CRR copies matching new objects to another Region.
cards:
  - id: s3-001
    q: An S3 team needs SSE-KMS objects, including existing objects, in another Region behind one
      endpoint. What is required?
    a: Use a Multi-Region Access Point for routing. Enable versioning and CRR, opt in to
      encrypted-object replication, and grant source decrypt and destination encrypt access. Use
      Batch Replication for existing data.
    facts:
      - mrap-endpoint
      - mrap-replication
      - mrap-kms
      - mrap-existing
      - mrap-versions
  - id: s3-013
    q: Does an S3 Multi-Region Access Point replicate objects or find the bucket that already holds a
      requested key?
    a: No. It routes to a nearby active bucket without checking contents. Configure replication
      separately; a routed GET can return 404 if that bucket lacks the object.
    trap: true
    facts:
      - mrap-route
      - mrap-contents
      - mrap-replication
  - id: s3-033
    q: An application writes through an S3 Multi-Region Access Point and needs existing data available
      before recovery-region failover. What copying setup fits?
    a: Two-way CRR for new writes and Batch Replication for existing objects. The global endpoint
      handles routing and does not copy data.
    trap: true
    facts:
      - mrap-two-way
      - mrap-existing
      - mrap-replication
  - id: s3-045
    q: An S3 team wants a recovery Region to receive no normal traffic through its Multi-Region Access
      Point. Which routing arrangement fits?
    a: Active-passive. Keep the recovery Region passive, then use failover controls to change routing
      when needed.
    facts:
      - mrap-passive
      - mrap-failover
  - id: s3-046
    q: An S3 Multi-Region Access Point returns 404 although another associated bucket has the object.
      What explains it?
    a: Routing chose a nearby active bucket without checking object placement. Configure CRR and
      backfill existing objects before relying on regional copies.
    trap: true
    facts:
      - mrap-route
      - mrap-contents
      - mrap-replication
      - mrap-existing
---
An S3 Multi-Region Access Point gives applications one global endpoint for buckets in different Regions. It chooses where a request goes; separate replication rules maintain the copies at those destinations.

### How it works

1. Associate regional buckets with the global endpoint and set their routing states. Active Regions can receive traffic; passive Regions cannot.
2. The endpoint sends each request to the closest active bucket. It does not search other buckets for the requested key.
3. Configure Cross-Region Replication (CRR) between the buckets. Use two-way replication if writes can land in different Regions, and Batch Replication for data already stored.
4. Use failover controls to change the Regions receiving requests while applications keep the same global endpoint.

### Exam cues

- If the question says an S3 application needs one endpoint across Regions, think a Multi-Region Access Point, because it routes requests to an active regional bucket.
- If the question says S3 recovery-region writes must return to the original Region, think two-way replication, because routing alone does not synchronize objects.
- If the question says an S3 request returns 404 although another Region has the object, think missing regional copies, because routing does not inspect object contents.

### Remember

- Active-active lets all Regions receive traffic; active-passive leaves designated Regions idle for requests.
- Versioning is required for replication.
- SSE-KMS replication needs explicit configuration and key permissions.
- Backfill existing objects before relying on a recovery copy.

> **Trap:** A global endpoint does not guarantee that its chosen bucket already contains the requested object.
