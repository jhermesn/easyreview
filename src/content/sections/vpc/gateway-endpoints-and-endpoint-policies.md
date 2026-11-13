---
title: Gateway endpoints and endpoint policies
level: associate
order: 30
facts:
  - id: gateway-services
    text: Gateway endpoints provide S3 and DynamoDB connectivity without an internet gateway or NAT, do
      not use PrivateLink, and have no additional endpoint charge.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoints
  - id: gateway-routes
    text: Associating a route table with a gateway endpoint adds an AWS-managed service prefix-list
      destination route targeting that endpoint.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoint-routing
  - id: gateway-region
    text: Gateway prefix lists are Region-specific, so the endpoint route applies to the service in that
      Region rather than another Region.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoint-routing
  - id: gateway-boundary
    text: An S3 gateway endpoint cannot be extended through VPN, peering, Transit Gateway, or Direct
      Connect; use an interface endpoint for those access paths.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#gateway-endpoint-considerations-s3
  - id: gateway-controls
    text: Client security groups and subnet ACLs must allow service traffic; security groups can
      reference service prefix lists but ACLs cannot.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoint-security
  - id: policy-boundary
    text: An endpoint policy controls use of the endpoint and does not replace or override identity or
      resource policies.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html#vpc-endpoints-access
  - id: policy-default
    text: The default endpoint policy permits full access through the endpoint, subject to other
      applicable authorization policies.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html#default-endpoint-policy
  - id: policy-deny
    text: An explicit deny in an applicable IAM policy overrides an allow.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html#reference_policies_evaluation-logic
  - id: vpc-source-ip
    text: For S3 requests through a VPC endpoint, use aws:VpcSourceIp rather than aws:SourceIp for
      source-address conditions.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#gateway-endpoint-considerations-s3
  - id: pair-source-conditions
    text: Pair aws:VpcSourceIp with aws:SourceVpc, aws:SourceVpce, or aws:SourceVpcArn because unrelated
      VPCs can use overlapping private addresses.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-vpcsourceip
  - id: credential-vpc
    text: Compare aws:Ec2InstanceSourceVpc with endpoint-only aws:SourceVpc to restrict EC2 role
      credentials to requests from their original VPC; account for AWS service calls on the role
      behalf.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourcevpc
  - id: interface-network
    text: An interface endpoint creates a private-addressed network interface in each selected subnet
      for reaching a PrivateLink service.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html
cards:
  - id: vpc-005
    q: How does a VPC gateway endpoint provide private S3 or DynamoDB access?
    a: It adds an AWS-managed service prefix-list route to associated route tables. No internet gateway
      or NAT is required, and there is no additional endpoint charge. The service prefix list is
      Region-specific.
    facts:
      - gateway-services
      - gateway-routes
      - gateway-region
  - id: vpc-006
    q: An S3 gateway endpoint policy allows a bucket, but the request is denied. Why can that happen?
    a: The endpoint policy does not replace IAM or bucket policies. Other applicable policies must
      authorize the request, and an explicit deny overrides an allow.
    trap: true
    facts:
      - policy-boundary
      - policy-deny
  - id: vpc-018
    q: On-premises clients need private access to S3 through the VPC. Can they use its S3 gateway
      endpoint over VPN?
    a: No. Use an S3 interface endpoint with suitable connectivity. Gateway endpoint access cannot
      extend through VPN, peering, Transit Gateway, or Direct Connect.
    facts:
      - gateway-boundary
  - id: vpc-019
    q: An S3 policy must restrict requests through a VPC endpoint to a private source address. Which
      condition keys should it use?
    a: aws:VpcSourceIp together with aws:SourceVpc, aws:SourceVpce, or aws:SourceVpcArn. aws:SourceIp
      does not serve endpoint requests, and a private address alone is not globally unique.
    facts:
      - vpc-source-ip
      - pair-source-conditions
  - id: vpc-020
    q: A team wants EC2 role credentials usable only through an endpoint in the VPC where they were
      issued. Which condition values should it compare?
    a: aws:Ec2InstanceSourceVpc and aws:SourceVpc. Scope the policy to EC2 role credentials and account
      for AWS services making calls on their behalf.
    facts:
      - credential-vpc
diagrams:
  - id: vpc-s3-gateway-path
    title: S3 traffic follows the gateway endpoint route
    width: 1000
    height: 230
    nodes:
      - id: client
        label: EC2 instance
        icon: res-ec2-instance
        tone: compute
        x: 25
        y: 85
        w: 230
        h: 72
      - id: vpc
        label: VPC
        icon: virtual-private-cloud
        tone: network
        x: 365
        y: 85
        w: 230
        h: 72
      - id: s3
        label: S3
        icon: simple-storage-service
        tone: storage
        x: 705
        y: 85
        w: 230
        h: 72
    edges:
      - from: client
        to: vpc
        step: 1
        label: prefix route
      - from: vpc
        to: s3
        step: 2
        label: to S3
    steps:
      - The client subnet uses a route table associated with the S3 gateway endpoint.
      - The AWS-managed S3 prefix-list route sends matching traffic through the endpoint.
---

A gateway endpoint gives a VPC a route to S3 or DynamoDB without NAT or an internet gateway. A prefix list is an AWS-managed set of service address ranges used as the route destination. The endpoint policy controls what requests may pass through that endpoint.

### How it works

1. Create the gateway endpoint for S3 or DynamoDB in the service's Region.
2. Associate the subnets' route tables. AWS adds a route whose destination is the service prefix list and whose target is the endpoint.
3. Permit the service traffic in client security groups and subnet ACLs. Groups can reference the prefix list; ACL rules need address ranges.
4. Evaluate the endpoint policy alongside identity and resource policies, such as IAM and S3 bucket policies. The endpoint policy does not replace them, and an applicable explicit deny wins.
5. For source-address conditions on S3 endpoint requests, use `aws:VpcSourceIp` with a VPC or endpoint condition. For EC2 credential confinement, compare the credential's original VPC with the request's endpoint VPC and allow required AWS service calls on the role's behalf.

### Exam cues

- If the question says instances need S3 access without NAT in the same Region, think gateway endpoint plus route-table association, because its prefix-list route reaches S3 without an internet gateway.
- If the question says clients connect from on premises or a peered VPC, think an S3 interface endpoint, because the gateway endpoint cannot extend across those connections. An interface endpoint provides a private network interface for the service.
- If the question says a permissive endpoint policy still yields AccessDenied, think IAM and resource policy evaluation, because endpoint permission alone does not replace authorization.

### Remember

- Gateway endpoints support S3 and DynamoDB, have no additional endpoint charge, and do not use PrivateLink.
- Prefix lists are Region-specific. A gateway endpoint route does not cover a service in another Region.
- The default endpoint policy permits full endpoint access subject to other applicable policies.
- Use `aws:VpcSourceIp` with `aws:SourceVpc`, `aws:SourceVpce`, or `aws:SourceVpcArn`.

> **Trap:** An allowed private IP range is not a unique VPC identity. Unrelated VPCs can use the same addresses, so pair source-address conditions with a VPC or endpoint identifier.
