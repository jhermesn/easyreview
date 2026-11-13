---
title: VPC builds
level: associate
order: 70
facts:
  - id: vpc-config
    text: A VPC-enabled project specifies the VPC, subnet IDs, and security group IDs to reach private
      resources.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: private-tests
    text: VPC builds can run integration tests against RDS in private subnets.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: private-subnets
    text: AWS recommends private subnets for CodeBuild builds.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: nat
    text: Internet access requires a NAT gateway or NAT instance; a NAT gateway belongs in a public
      subnet.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: no-public-ip
    text: CodeBuild-created network interfaces cannot receive public or Elastic IP addresses, so an
      internet gateway alone does not provide internet access.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: security-group
    text: Build security groups need no inbound rules and must allow required outbound traffic.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: shared-vpc
    text: CodeBuild VPC connectivity does not support shared VPCs.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: s3-endpoint
    text: An S3 gateway endpoint routes S3 traffic through an associated route table without NAT and has
      no additional charge.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html
  - id: endpoint-region
    text: An S3 gateway endpoint must be in the same Region as the bucket.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#gateway-endpoint-considerations-s3
  - id: vpc-cache
    text: VPC builds cannot use local caching.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: s3-cache
    text: S3 caching provides a cache available across build hosts.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-s3.html
diagrams:
  - id: codebuild-private-access
    title: Private tests and outbound access
    width: 820
    height: 360
    nodes:
      - id: build
        label: CodeBuild
        x: 60
        y: 90
        w: 160
        h: 86
        tone: devtools
        icon: codebuild
        sub: Private subnet
      - id: db
        label: RDS
        x: 370
        y: 25
        w: 160
        h: 72
        tone: database
        icon: rds
      - id: egress
        label: VPC egress
        x: 370
        y: 190
        w: 160
        h: 86
        tone: network
        icon: virtual-private-cloud
        sub: NAT in public subnet
      - id: internet
        label: Internet
        x: 650
        y: 190
        w: 140
        h: 72
        tone: neutral
        icon: res-client
    edges:
      - from: build
        to: db
        step: 1
      - from: build
        to: egress
        step: 2
      - from: egress
        to: internet
        step: 3
    steps:
      - Run integration tests against the private database.
      - Send internet traffic through NAT in a public subnet.
      - NAT supplies the outbound internet path.
    groups:
      - label: VPC
        x: 20
        y: 0
        w: 550
        h: 330
        tone: network
        icon: group-virtual-private-cloud-vpc
cards:
  - id: codebuild-013
    q: A CodeBuild build must reach private RDS and download internet packages. Which subnet and
      internet path should it use?
    a: Use VPC configuration with private subnets and security groups, plus a NAT gateway in a public
      subnet. CodeBuild interfaces receive no public IP, so an internet gateway alone cannot provide
      internet access.
    facts:
      - vpc-config
      - private-tests
      - private-subnets
      - nat
      - no-public-ip
    trap: true
  - id: codebuild-019
    q: A CodeBuild VPC build needs cached dependencies and internet downloads. Which cache and network
      path fit?
    a: S3 cache and NAT egress from private subnets. VPC builds cannot use local cache.
    facts:
      - vpc-cache
      - nat
      - private-subnets
      - s3-cache
    trap: true
  - id: codebuild-038
    q: A CodeBuild VPC build only needs S3 access for dependencies in the same Region. What can provide
      that path without NAT?
    a: An S3 gateway endpoint associated with the subnet route table. It has no additional charge and
      must be in the bucket Region.
    facts:
      - s3-endpoint
      - endpoint-region
---
A VPC-enabled CodeBuild project lets build commands reach private resources such as an RDS database. A VPC is an isolated AWS network; a subnet is a range of addresses within it. Configuring the VPC connects the build to that network.

### How it works

1. Set the project's VPC ID, private subnet IDs, and security group IDs. A security group controls allowed network traffic.
2. Allow the outbound traffic the build needs. The build security group does not need inbound rules.
3. For internet downloads, route traffic through a NAT gateway in a public subnet. NAT provides an outbound path for resources without public IP addresses.
4. For S3 access without NAT, associate an S3 gateway endpoint with the route table used by the build subnet. The endpoint provides a private route to S3, not a route to the general internet.

### Exam cues

- If the question says tests must reach private RDS, think a VPC-enabled CodeBuild project, because the project subnet and security group settings provide private resource access.
- If the question says a public-subnet build cannot download internet packages, think private subnets plus NAT, because CodeBuild network interfaces have no public IP addresses.
- If the question says only S3 downloads need a route without NAT, think an S3 gateway endpoint, because it routes S3 traffic through the subnet route table.

### Remember

- CodeBuild interfaces cannot receive public or Elastic IP addresses.
- NAT gateways belong in public subnets; CodeBuild should use private subnets.
- S3 gateway endpoints have no additional charge and must be in the bucket Region.
- Shared VPC connectivity and local caching are unsupported.

> **Trap:** An internet gateway alone does not give a CodeBuild network interface internet access. It lacks the public address needed for that path.
