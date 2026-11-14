---
title: Regions, Availability Zones, and edge locations
level: foundational
order: 10
facts:
  - id: region
    text: A Region is a geographical location where AWS clusters data centers; each Region is made of multiple independent, physically separate Availability Zones.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions
  - id: three-azs
    text: Each public AWS Region has at least three Availability Zones.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-availability-zones.html#aws-availability-zones
  - id: region-isolation
    text: Regions are isolated and independent from each other, which limits a service failure to a single Region.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions
  - id: data-stays
    text: Resources and data created in one Region don't exist in any other Region unless you replicate or copy them.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions
  - id: choose-region
    text: Choose a Region that has the services and features you need, that is close to most of your users for lower latency, and that meets your legal requirements.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html#aws-regions
  - id: az
    text: An Availability Zone is one or more discrete data centers with independent and redundant power, networking and connectivity in a Region.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones
  - id: az-distance
    text: Availability Zones in a Region are up to about 100 km (60 miles) apart to prevent correlated failures, but close enough for synchronous replication with single-digit millisecond latency.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones
  - id: az-no-shared
    text: Common points of failure such as generators and cooling equipment aren't shared across Availability Zones, which are supplied by different power substations.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones
  - id: multi-az
    text: An application that uses multiple Availability Zones is better protected from issues that affect one Availability Zone and, if architected correctly, stays up when one fails.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones
  - id: az-code
    text: An Availability Zone code is the Region code followed by a letter, such as us-east-2a.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-availability-zones.html#aws-availability-zones
  - id: edge
    text: DNS routes a CloudFront request to the edge location (point of presence) that can best serve it, typically the nearest in latency, which returns cached content or fetches it from the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html#HowCloudFrontWorksContentDelivery
  - id: regional-edge-cache
    text: CloudFront regional edge caches keep content closer to viewers even when it isn't popular enough to stay at an edge location.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html#CloudFrontRegionaledgecaches
  - id: local-zones
    text: AWS Local Zones place compute, storage, database and other select resources close to large population and industry centers for low-latency access.
    source: https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html#what-is-aws-local-zones
  - id: global-services
    text: A few AWS services are global within a partition, such as IAM, AWS Organizations, Amazon CloudFront, AWS Global Accelerator and Amazon Route 53; most services, such as EC2, RDS and Lambda, are Regional.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/global-services.html
  - id: az-encryption
    text: All traffic between Availability Zones is encrypted.
    source: https://aws.amazon.com/about-aws/global-infrastructure/regions_az/
  - id: s3-namespace
    text: By default, S3 general purpose bucket names must be unique across all AWS accounts in a partition, but each bucket is created in one Region.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html
cards:
  - id: global-infrastructure-001
    q: How do AWS Regions and Availability Zones relate to each other?
    a: A Region is a geographic area that contains multiple isolated Availability Zones. Each public Region has at least three.
    facts: [region, three-azs]
  - id: global-infrastructure-002
    q: What is an AWS Availability Zone?
    a: One or more discrete data centers with independent, redundant power, networking and connectivity inside a Region.
    facts: [az]
  - id: global-infrastructure-003
    q: A company runs its web servers in one Availability Zone and wants the application to survive the loss of that zone. What should it do?
    a: Run the servers in at least two Availability Zones of the Region. AZs share no single points of failure, so one can fail while the others keep serving.
    facts: [multi-az, az-no-shared]
  - id: global-infrastructure-004
    q: Why can a database replicate synchronously between Availability Zones in the same AWS Region?
    a: AZs are close enough (up to about 100 km apart) for single-digit millisecond latency, while far enough apart to avoid correlated failures.
    facts: [az-distance]
  - id: global-infrastructure-005
    q: A company stores data in an Amazon S3 bucket in one AWS Region. Does AWS copy that data to other Regions automatically?
    a: No. Data stays in its Region unless you replicate or copy it.
    trap: true
    facts: [data-stays]
  - id: global-infrastructure-006
    q: Which three factors should a company weigh when choosing an AWS Region?
    a: "- The services and features it needs are available there\n- Closeness to most users, for lower latency\n- Legal and data residency requirements"
    facts: [choose-region]
  - id: global-infrastructure-007
    q: What role do edge locations play in the AWS global infrastructure?
    a: They serve Amazon CloudFront content from the location nearest the user, returning cached content or fetching it from the origin.
    facts: [edge, regional-edge-cache]
  - id: global-infrastructure-008
    q: A game studio needs single-digit millisecond latency for players in a large city that has no AWS Region. Which AWS infrastructure option fits?
    a: AWS Local Zones. They place compute, storage and database resources close to large population centers.
    facts: [local-zones]
  - id: global-infrastructure-009
    q: Does an outage in one AWS Region normally affect workloads running in other Regions?
    a: No. Regions are isolated and independent, which limits a service failure to one Region.
    facts: [region-isolation]
  - id: global-infrastructure-010
    q: Are Availability Zones the same thing as edge locations?
    a: No. AZs are data centers inside a Region where you run resources. Edge locations are separate sites that cache and deliver content, such as CloudFront content, close to users.
    trap: true
    facts: [az, edge]
  - id: global-infrastructure-016
    q: "Which of these AWS services are global rather than Regional: IAM, Amazon CloudFront, Amazon EC2, Amazon RDS, Amazon Route 53?"
    a: IAM, CloudFront and Route 53. EC2 and RDS are Regional.
    facts: [global-services]
  - id: global-infrastructure-017
    q: Is Amazon S3 a global service because bucket names are unique worldwide?
    a: No. Bucket names share a global namespace by default, but each bucket and its data live in one Region.
    trap: true
    facts: [s3-namespace]
  - id: global-infrastructure-018
    q: Is traffic between Availability Zones in a Region encrypted?
    a: Yes. All traffic between AZs is encrypted.
    facts: [az-encryption]
diagrams:
  - id: region-azs-edge
    title: A Region, its Availability Zones, and edge locations
    width: 800
    height: 300
    groups:
      - { label: AWS Region, x: 20, y: 30, w: 565, h: 240, tone: network }
    nodes:
      - { id: az-a, label: Availability Zone A, sub: data centers, x: 40, y: 110, w: 170, h: 60, tone: network }
      - { id: az-b, label: Availability Zone B, sub: data centers, x: 220, y: 110, w: 170, h: 60, tone: network }
      - { id: az-c, label: Availability Zone C, sub: data centers, x: 400, y: 110, w: 170, h: 60, tone: network }
      - { id: edge, label: Edge location, sub: CloudFront cache, x: 620, y: 60, w: 160, h: 60, tone: user }
      - { id: users, label: Users, x: 620, y: 190, w: 160, h: 56, tone: user }
    edges:
      - { from: users, to: edge, step: 1 }
      - { from: edge, to: az-c, step: 2, dashed: true }
    steps:
      - Users reach the nearest edge location, which answers from its cache when it can.
      - On a cache miss, the edge location fetches the content from the origin in the Region.
---
The AWS global infrastructure has three building blocks. A Region is a geographic area. Inside it, Availability Zones (AZs) are isolated groups of data centers. Edge locations, outside the Regions, deliver content close to users. [Regions](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions) · [Availability Zones](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones)

### How it works

1. You pick a Region for each resource. Regions are isolated from each other, and data stays in its Region unless you copy it.
2. Inside the Region, you spread resources over two or more AZs. Each AZ has its own power, networking and connectivity, and AZs share no generators or cooling.
3. AZs are close enough for synchronous replication, so a database or load-balanced fleet can span them.
4. Edge locations cache content for Amazon CloudFront near users; on a miss they fetch it from the origin in the Region. [How CloudFront delivers content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html#HowCloudFrontWorksContentDelivery)
5. Local Zones extend a Region with compute and storage near large cities for low latency. [Local Zones](https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html#what-is-aws-local-zones)

| Building block | What it is | Used for |
|---|---|---|
| Region | Geographic area with at least three AZs | Where resources and data live; latency, data residency |
| Availability Zone | One or more data centers with independent power and networking | High availability inside a Region |
| Edge location | Cache site near users | Fast content delivery with CloudFront |
| Local Zone | Compute and storage near a large city | Single-digit millisecond latency for local users |

### Exam cues

- If the question says survive a data center failure, think multiple Availability Zones.
- If the question says users far away see slow static content, think edge locations with CloudFront.
- If the question says data must stay in a country, think choose a Region there; data stays in its Region unless copied.
- If the question says very low latency in a city without a Region, think Local Zones.

### Remember

- Every public Region has at least three AZs.
- AZs are up to about 100 km (60 miles) apart, with single-digit millisecond latency between them.
- AZ codes are the Region code plus a letter, such as us-east-2a.
- Global: IAM, Organizations, CloudFront, Route 53, Global Accelerator. Most others are Regional.
- Traffic between AZs is encrypted.

> **Trap:** One AZ is not highly available. A single AZ can fail as a unit, so high availability needs at least two AZs.
