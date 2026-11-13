---
title: Interface endpoints and private access
level: associate
order: 10
facts:
  - id: private-connectivity
    text: AWS PrivateLink connects VPCs privately to supported services without requiring an internet gateway or NAT device for that connection.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html#what-is-privatelink
  - id: interface-eni
    text: An interface endpoint creates an endpoint network interface with a private IP address in each selected subnet.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html#create-interface-endpoint
  - id: security-group
    text: The endpoint network interface security group must allow expected traffic from clients.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html#prerequisites-interface-endpoints
  - id: private-dns
    text: Private DNS requires VPC DNS hostnames and DNS resolution.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html#prerequisites-interface-endpoints
  - id: private-dns-resolution
    text: Private DNS can resolve an AWS service's public endpoint name to the endpoint network interfaces.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html#interface-endpoint-private-dns
  - id: provider
    text: A provider can create an endpoint service backed by a Network Load Balancer that routes requests to service targets.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html#endpoint-service-overview
  - id: provider-permissions
    text: The provider grants AWS principals permission to connect to its endpoint service.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html#endpoint-service-overview
  - id: consumer-endpoint
    text: The consumer creates an interface endpoint to connect selected VPC subnets to the provider endpoint service.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html#endpoint-service-overview
  - id: acceptance
    text: The service consumer initiates the connection and the provider accepts or rejects the connection request.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html#privatelink-connections
  - id: overlapping
    text: A PrivateLink architecture using a Network Load Balancer can connect services in VPCs with overlapping CIDR blocks.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/integrate-third-party-services/architecture-1.html#architecture-1
  - id: transit-overlap
    text: A transit gateway does not support routing between VPCs with identical or overlapping CIDR blocks.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/tgw-vpc-attachments.html#tgw-vpc-attachments
  - id: on-premises
    text: Consumers can access endpoint services from their VPCs or from on-premises.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html#concepts-service-consumers
  - id: policy
    text: An endpoint policy controls which AWS principals can use the endpoint to access a service.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html#vpc-endpoints-access
  - id: policy-layers
    text: An endpoint policy does not replace identity-based or resource-based policies.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html#vpc-endpoints-access
  - id: policy-support
    text: Not all AWS services support endpoint policies.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html#vpc-endpoint-policy-considerations
  - id: default-policy
    text: The default endpoint policy grants full access through the endpoint.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html#default-endpoint-policy
  - id: gateway
    text: Gateway endpoints provide access to S3 and DynamoDB using selected route tables.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoint-routing
  - id: gateway-not-privatelink
    text: Gateway endpoints do not use AWS PrivateLink.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoints
  - id: gateway-cost
    text: There is no additional charge for gateway endpoints.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoints
  - id: subnet
    text: An interface endpoint can use one subnet per Availability Zone.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html#create-interface-endpoint-aws
  - id: availability
    text: AWS recommends making an endpoint service available in at least two Availability Zones for high availability.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html#endpoint-service-overview
  - id: ping
    text: Interface endpoints do not respond to ping.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html#interface-endpoint-icmp
  - id: s3-on-premises
    text: S3 interface endpoints can be accessed from on-premises over Site-to-Site VPN or Direct Connect.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html#privatelink-interface-endpoints
  - id: s3-gateway-on-premises
    text: S3 gateway endpoints cannot be used from on-premises.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html#types-of-vpc-endpoints-for-s3
  - id: s3-source-ip
    text: For S3 requests traversing a VPC endpoint, use aws:VpcSourceIp rather than aws:SourceIp in an identity or bucket policy.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#gateway-endpoint-considerations-s3
  - id: availability-state
    text: After a provider accepts an interface endpoint connection request, the consumer can use it once the endpoint is Available.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html#concepts-endpoint-states
  - id: interface-cost
    text: Interface endpoints incur hourly charges per Availability Zone and data processing charges.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html#privatelink-access-aws-services
  - id: source-ip-scope
    text: Pair aws:VpcSourceIp with aws:SourceVpc, aws:SourceVpce, or aws:SourceVpcArn because unrelated VPCs can have overlapping IP ranges.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-vpcsourceip
diagrams:
  - id: privatelink-service-flow
    title: Private service access
    width: 800
    height: 160
    nodes:
      - { id: client, label: Consumer, x: 20, y: 35, w: 130, h: 72, tone: user, icon: res-client }
      - { id: endpoint, label: Interface endpoint, x: 210, y: 35, w: 155, h: 72, tone: network, icon: privatelink }
      - { id: nlb, label: Network LB, x: 425, y: 35, w: 150, h: 72, tone: network, icon: elastic-load-balancing }
      - { id: service, label: Provider service, x: 645, y: 43, w: 145, h: 56, tone: neutral }
    edges:
      - { from: client, to: endpoint, step: 1 }
      - { from: endpoint, to: nlb, step: 2 }
      - { from: nlb, to: service, step: 3 }
    steps:
      - The consumer sends a request to its interface endpoint.
      - The endpoint connects privately to the provider endpoint service.
      - The Network Load Balancer routes the request to the service.
cards:
  - id: privatelink-001
    q: What is an AWS PrivateLink interface VPC endpoint?
    a: An endpoint that creates private-IP network interfaces in selected subnets to connect to a service; its security groups control traffic.
    facts: [interface-eni, security-group]
  - id: privatelink-002
    q: Two VPCs have overlapping address ranges and one must expose a service privately to the other. What AWS PrivateLink pattern fits?
    a: Use a provider endpoint service backed by a Network Load Balancer and a consumer interface endpoint. Transit Gateway cannot route between overlapping VPCs.
    facts: [provider, consumer-endpoint, overlapping, transit-overlap]
  - id: privatelink-003
    q: A workload cannot connect to its AWS PrivateLink interface endpoint. Which network control should be checked first?
    a: Check that the endpoint network interface security group allows the expected client traffic.
    facts: [security-group]
  - id: privatelink-004
    q: What must be enabled in a VPC to use private DNS for an AWS PrivateLink interface endpoint?
    a: DNS resolution and DNS hostnames.
    facts: [private-dns]
  - id: privatelink-005
    q: Does an AWS PrivateLink endpoint policy replace IAM identity policies or service resource policies?
    a: No. It is an additional policy controlling use of the endpoint.
    facts: [policy, policy-layers]
    trap: true
  - id: privatelink-006
    q: A VPC needs a no-additional-charge endpoint for Amazon S3 using route tables. Which endpoint type fits?
    a: A gateway endpoint. It does not use AWS PrivateLink.
    facts: [gateway, gateway-not-privatelink, gateway-cost]
  - id: privatelink-007
    q: How many subnets can an AWS PrivateLink interface endpoint select per Availability Zone?
    a: One subnet per Availability Zone.
    facts: [subnet]
  - id: privatelink-008
    q: A ping to an AWS PrivateLink interface endpoint fails. Does that alone prove the endpoint is unavailable?
    a: No. Interface endpoints do not respond to ping.
    facts: [ping]
    trap: true
  - id: privatelink-009
    q: An on-premises application needs private S3 access over Direct Connect. Should it use an S3 gateway endpoint or an AWS PrivateLink interface endpoint?
    a: Use an S3 interface endpoint. An S3 gateway endpoint cannot be used from on-premises.
    facts: [s3-on-premises, s3-gateway-on-premises]
  - id: privatelink-010
    q: Which condition key should an S3 bucket policy use for a client's private address when the request traverses a VPC endpoint?
    a: Use `aws:VpcSourceIp`, not `aws:SourceIp`, together with a VPC or endpoint condition to avoid matching overlapping ranges.
    facts: [s3-source-ip, source-ip-scope]
    trap: true
---

AWS PrivateLink connects a virtual private cloud (VPC), an isolated virtual network, to supported services privately. An interface endpoint is a private entry point in the consumer's network, not a connection to the provider's entire network.

### How it works

1. For a custom service, the provider creates an endpoint service backed by a Network Load Balancer, which routes requests to service targets, and grants selected AWS principals permission.
2. The consumer creates an interface endpoint for the service. AWS places a network interface with a private IP address in each selected subnet.
3. The consumer initiates the connection; the provider accepts or rejects it. The endpoint must be available before use.
4. Clients use the Domain Name System (DNS) to resolve the service name to an address and send requests to the endpoint. Its security group, a virtual firewall, must allow the traffic. Private DNS requires VPC DNS resolution and hostnames.

### Exam cues

- If the question says two VPCs have overlapping CIDR blocks, meaning IP address ranges, think a Network Load Balancer-backed endpoint service and interface endpoint, because PrivateLink supports this layout while Transit Gateway cannot route between the overlapping VPCs.
- If the question says private access to S3 through a route table without an additional endpoint charge, think gateway endpoint, because it routes S3 traffic without PrivateLink.
- If the question says an endpoint policy allows a request but a resource policy denies it, think the request is still subject to the resource policy, because an endpoint policy does not replace other policies.
- If the question says an on-premises application must reach S3 over Direct Connect or Site-to-Site VPN, think S3 interface endpoint, because an S3 gateway endpoint cannot serve on-premises clients.
- If the question says restrict an S3 endpoint request by the client's private IP, think `aws:VpcSourceIp` plus a VPC or endpoint condition, because `aws:SourceIp` is unavailable and private ranges can overlap.

### Remember

- Choose at most one subnet per Availability Zone for an interface endpoint.
- AWS recommends at least two Availability Zones for an endpoint service.
- The default endpoint policy grants full access through the endpoint; not all AWS services support custom endpoint policies.
- Consumers can access endpoint services from on-premises as well as VPCs.
- Interface endpoints incur hourly charges per Availability Zone and data processing charges.

> **Trap:** A failed ping does not prove an interface endpoint is broken. Interface endpoints do not respond to ping.
