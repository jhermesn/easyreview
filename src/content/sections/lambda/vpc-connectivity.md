---
title: VPC connectivity
level: associate
order: 70
facts:
  - id: managed-vpc
    text: Lambda functions run in a Lambda-managed VPC; a customer VPC attachment provides access to customer VPC resources.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#configuration-vpc
  - id: public-subnet
    text: Connecting Lambda to a public subnet does not give the function a public IP address or internet access.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#configuration-vpc-attaching
  - id: ipv4-nat
    text: A VPC-connected Lambda function can reach the IPv4 internet from private subnets through a NAT gateway in a public subnet with internet-gateway routing.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html#configuration-vpc-internet
  - id: vpc-endpoint
    text: An S3 gateway endpoint provides an alternative path from the VPC to S3.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html#configuration-vpc-internet
  - id: ipv6
    text: Outbound IPv6 support is disabled by default and requires all selected Lambda subnets to be dual stack.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#configuration-vpc-ipv6
  - id: ipv6-egress
    text: An egress-only internet gateway provides an outbound internet route for IPv6 in the Lambda VPC internet-access setup.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html#configuration-vpc-internet
  - id: eni-reuse
    text: Lambda shares Hyperplane network interfaces among functions in the same account that use the same subnet and security-group combination.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#configuration-vpc-enis
  - id: eni-role
    text: AWSLambdaVPCAccessExecutionRole grants the execution role permissions to create and manage the network interfaces used for a VPC attachment.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#configuration-vpc-permissions
  - id: eni-invoke
    text: Network-interface management permissions are needed to create the VPC attachment, not for each subsequent function invocation.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#configuration-vpc-permissions
  - id: efs-mount
    text: Lambda can mount shared EFS files through an access point to a local directory beginning with /mnt/.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem-efs.html#configuration-filesystem-efs
  - id: efs-network
    text: EFS mount targets must be reachable from the Lambda subnets, with NFS traffic on port 2049 allowed by function and mount-target security groups.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem-efs.html#configuration-filesystem-efs
  - id: efs-az
    text: Create EFS mount targets in every Availability Zone used by the Lambda function.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem-efs.html#configuration-filesystem-efs
  - id: efs-permissions
    text: With a user-configured EFS IAM policy, Lambda needs ClientMount and, for writes, ClientWrite permissions plus VPC connectivity permissions.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem-efs.html#configuration-filesystem-efs
  - id: efs-cross-account
    text: Cross-account Lambda access to EFS requires network visibility through VPC routing or peering and IAM permissions to mount the file system.
    source: https://aws.amazon.com/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/
  - id: efs-accesspoint
    text: An EFS access point can limit a Lambda client to a specific file-system path.
    source: https://aws.amazon.com/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/
diagrams:
  - id: lambda-vpc-ipv4-egress
    title: IPv4 internet access uses a private-to-public route
    width: 900
    height: 320
    nodes:
      - id: lambda
        label: Lambda VPC link
        icon: lambda
        x: 30
        y: 100
        w: 170
        h: 72
        tone: compute
      - id: nat
        label: VPC egress
        icon: virtual-private-cloud
        x: 330
        y: 100
        w: 170
        h: 86
        tone: network
        sub: public-subnet NAT
      - id: internet
        label: Internet
        icon: res-client
        x: 630
        y: 100
        w: 170
        h: 72
        tone: user
    edges:
      - from: lambda
        to: nat
        step: 1
        label: private route
      - from: nat
        to: internet
        step: 2
        label: internet gateway
    steps:
      - The function VPC attachment uses a private-subnet route to a NAT gateway in a public subnet.
      - The public subnet routes through an internet gateway for IPv4 internet access.
  - id: lambda-cross-account-efs-path
    title: Cross-account EFS needs a network path and file permissions
    width: 900
    height: 260
    groups:
      - label: Function account VPC
        x: 20
        y: 20
        w: 300
        h: 210
        tone: network
        icon: group-virtual-private-cloud-vpc
      - label: File-system account VPC
        x: 570
        y: 20
        w: 310
        h: 210
        tone: network
        icon: group-virtual-private-cloud-vpc
    nodes:
      - id: function
        label: Lambda
        icon: lambda
        x: 70
        y: 100
        w: 170
        h: 72
        tone: compute
      - id: efs
        label: EFS mount
        icon: efs
        x: 640
        y: 100
        w: 170
        h: 72
        tone: storage
    edges:
      - from: function
        to: efs
        step: 1
        label: routed NFS
    steps:
      - Use routed VPC connectivity, allow NFS port 2049, and authorize the Lambda client to mount EFS through an access point.
cards:
  - id: lambda-015
    q: Does placing a VPC-connected Lambda function in a public subnet give it IPv4 internet access?
    a: No. It does not receive a public IP. Use private-subnet routing through a NAT gateway in a public subnet for IPv4 internet access; an S3 gateway endpoint can provide a separate S3 path.
    trap: true
    facts:
      - public-subnet
      - ipv4-nat
      - vpc-endpoint
  - id: lambda-047
    q: Several Lambda functions use the same subnet and security groups. Does Lambda need a separate network interface for every function?
    a: No. Functions in the same account can share a Hyperplane ENI for the same subnet and security-group combination.
    trap: true
    facts:
      - eni-reuse
  - id: lambda-048
    q: A team cannot attach a Lambda function to a VPC because network-interface creation is denied. What role permission should it inspect?
    a: Check the execution role network-interface management permissions, supplied by AWSLambdaVPCAccessExecutionRole. Those permissions establish the attachment, rather than authorizing every invocation.
    facts:
      - eni-role
      - eni-invoke
  - id: lambda-049
    q: Multiple Lambda environments need access to the same persistent files. What should the team configure?
    a: Mount EFS through an access point under /mnt/. Provide mount targets in the function Availability Zones, allow NFS port 2049, and configure the required IAM permissions.
    facts:
      - efs-mount
      - efs-az
      - efs-network
      - efs-permissions
  - id: lambda-050
    q: A Lambda function can mount local EFS but cannot mount EFS in another account after an IAM grant. What else must the team establish?
    a: Provide routed VPC connectivity, such as peering, to the EFS mount targets and allow NFS traffic. IAM permission alone does not establish the network path.
    facts:
      - efs-cross-account
      - efs-network
  - id: lambda-051
    q: Can a VPC-connected Lambda function use outbound IPv6 without an IPv4 NAT gateway?
    a: Yes, with outbound IPv6 enabled, dual-stack selected subnets, and the appropriate IPv6 internet route, such as an egress-only internet gateway. IPv4 NAT is not the only internet-access path.
    trap: true
    facts:
      - ipv6
      - ipv6-egress
---
A Lambda VPC attachment lets function code reach resources in your private network. Lambda still runs in its own managed VPC and uses Hyperplane elastic network interfaces (ENIs), managed network connections into your selected subnets and security groups.

### How it works

1. Select the customer VPC subnets and security groups, rules that control allowed network traffic. Give the execution role the interface-management permissions supplied by `AWSLambdaVPCAccessExecutionRole` to establish the attachment.
2. Lambda creates or reuses a Hyperplane ENI. Functions in the same account with the same subnet and security-group combination can share it. Interface-management permissions establish connectivity; they do not authorize each function invocation.
3. For IPv4 internet access, route private-subnet traffic through a NAT gateway in a public subnet, then through an internet gateway. A NAT gateway translates the private source address so replies can return. Selecting a public subnet alone gives the function neither a public IP nor internet access.
4. For S3 access, an S3 gateway endpoint provides a VPC path to the service. For IPv6 internet access, enable outbound IPv6, use dual-stack subnets that support both IPv4 and IPv6, and configure the IPv6 route through an egress-only internet gateway.
5. For shared persistent files, mount EFS through an access point, a configured entry path into the file system, under `/mnt/`. Make a mount target, the network endpoint for the file system, available in each function Availability Zone. Allow Network File System (NFS) traffic on port 2049 between the function and mount-target security groups.
6. Give the function EFS permissions, including `ClientMount` and `ClientWrite` when writing under a user-configured EFS IAM policy. Cross-account EFS also needs VPC routing or peering, a private connection between VPCs, so the function can reach the mount targets.

### Exam cues

- If the question says Lambda lost IPv4 internet access after VPC attachment, think private-subnet NAT routing, because attachment does not assign a public IP.
- If the question says many functions share subnets and security groups, think Hyperplane ENI reuse, because Lambda can share that network attachment.
- If the question says files must be shared across Lambda environments, think EFS access points, because they expose shared files through a local mount.
- If the question says cross-account EFS has IAM permissions but times out, think routing and NFS rules, because authorization does not provide network connectivity.

### Remember

- Public subnet placement alone does not provide Lambda internet access.
- Outbound IPv6 is off by default; every selected subnet must be dual stack when enabling it.
- EFS NFS traffic: port 2049. Lambda mount path: begins with `/mnt/`.
- An EFS access point can restrict the accessible file-system path.

> **Trap:** A NAT gateway is the IPv4 internet solution described here. IPv6 can use its own egress-only internet gateway path; an S3 endpoint provides a service path rather than general internet access.
