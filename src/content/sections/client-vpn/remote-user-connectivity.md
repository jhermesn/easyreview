---
title: Remote user connectivity
level: associate
order: 10
facts:
  - id: remote-user
    text: Client VPN provides encrypted TLS remote access for individual users through an OpenVPN-based
      client to AWS and connected on-premises resources.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html
  - id: network-vpn
    text: Site-to-Site VPN connects an on-premises network to AWS using IPsec rather than individual
      remote user sessions.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html
  - id: authentication
    text: Client VPN supports Active Directory, mutual certificate authentication or SAML federated
      authentication; mutual authentication can be combined with either user-based method.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/client-authentication.html
  - id: both-methods
    text: When mutual and user-based authentication are combined, both methods must succeed.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/client-authentication.html
  - id: server-certificate
    text: Every Client VPN authentication method requires a server certificate in ACM in the endpoint
      Region.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-endpoint-create.html
  - id: authorization
    text: Client VPN authorization rules grant network access to selected users or groups; without a
      matching grant, access is denied.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-rules.html
  - id: authorization-order
    text: Client VPN authorization rules use longest prefix matching, with the IPv4 any-destination rule
      0.0.0.0/0 processed last; rules grant access and cannot explicitly deny it.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-rules.html
  - id: subnet
    text: For subnet-based endpoints, associate at least one target subnet; further subnets must be in
      the same VPC and different Availability Zones.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-target.html
  - id: redundancy
    text: AWS recommends associating at least two target subnets in different Availability Zones for
      subnet-based endpoint redundancy.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-target.html
  - id: subnet-capacity
    text: A Client VPN target subnet must be /27 or larger and retain at least 20 available IP addresses.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-target.html
  - id: ipv4-client-range
    text: The client IPv4 CIDR must be from /22 through /12, cannot overlap target networks, the VPC or
      endpoint routes, and cannot be changed after endpoint creation.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-endpoint-create.html
  - id: routing
    text: Subnet association adds the local VPC route; additional destination networks need endpoint
      routes and authorization rules.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-routes.html
  - id: route-consistency
    text: Each associated subnet should have an identical set of Client VPN routes to avoid intermittent
      destination access.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-routes.html
  - id: security-groups
    text: For subnet-based VPC access, allow traffic in resource security groups from the security group
      applied to the Client VPN subnet association.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/how-it-works.html
  - id: full-tunnel
    text: By default, split tunnel is disabled and client traffic is routed through the VPN tunnel.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/split-tunnel-vpn.html
  - id: split-tunnel
    text: Split tunnel installs endpoint route table routes on clients and sends only traffic matching
      those routes through the VPN.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/split-tunnel-vpn.html
  - id: split-change
    text: Changing a split-tunnel endpoint route table resets all client connections; adding 0.0.0.0/0
      is not recommended because it can disrupt connectivity.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/split-tunnel-vpn.html
  - id: logging
    text: Client VPN connection logging can send connection events to CloudWatch Logs for
      troubleshooting.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-endpoint-create.html
  - id: transport
    text: Client VPN supports TCP or UDP on ports 443 or 1194; the default transport is UDP and the
      default port is 443.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html
  - id: udp-default
    text: Creating a Client VPN endpoint defaults its transport protocol to UDP.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-endpoint-create.html
  - id: tgw
    text: Client VPN can attach directly to a Transit Gateway for access to connected networks; subnet
      associations and Transit Gateway associations cannot be mixed in one endpoint.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-tgw.html
  - id: tgw-source
    text: Transit Gateway-associated Client VPN endpoints preserve client source IPs without source
      network address translation; destination VPCs need return routes for the client CIDR.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-tgw.html
  - id: quickstart
    text: Client VPN Quickstart creates a VPC authorization grant, target subnet associations and VPC
      routes automatically.
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-endpoint-create.html
diagrams:
  - id: client-vpn-subnet-path
    title: Subnet-based remote access path
    width: 800
    height: 190
    nodes:
      - id: client
        label: Remote client
        icon: res-client
        tone: user
        x: 30
        y: 60
        w: 210
        h: 86
      - id: vpn
        label: Client VPN
        icon: client-vpn
        tone: network
        x: 295
        y: 60
        w: 210
        h: 86
      - id: app
        label: VPC resource
        icon: res-ec2-instance
        tone: compute
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: client
        to: vpn
        step: 1
      - from: vpn
        to: app
        step: 2
    steps:
      - TLS authentication
      - Authorized routed access
cards:
  - id: client-vpn-001
    q: Remote employees need encrypted access from their laptops to private AWS resources. Which AWS VPN
      service fits?
    a: Client VPN. Users connect with an OpenVPN-based client. Site-to-Site VPN connects an on-premises
      network to AWS.
    facts:
      - remote-user
      - network-vpn
  - id: client-vpn-002
    q: A Client VPN user authenticates successfully but cannot access a VPC resource through a
      subnet-based endpoint. What controls should the team check?
    a: Destination authorization, endpoint and network routes, and resource security group access from
      the Client VPN association security group. Authentication alone does not grant network access.
    facts:
      - authorization
      - routing
      - security-groups
  - id: client-vpn-003
    q: Does SAML authentication remove the requirement for an ACM server certificate on an AWS Client
      VPN endpoint?
    a: No. Every authentication method requires a server certificate in ACM in the endpoint Region.
    trap: true
    facts:
      - server-certificate
  - id: client-vpn-004
    q: An AWS Client VPN endpoint combines mutual certificate authentication with Active Directory. Can
      a valid client certificate alone authenticate the user?
    a: No. Both the certificate-based and user-based methods must succeed.
    trap: true
    facts:
      - authentication
      - both-methods
  - id: client-vpn-005
    q: Remote users should send only private destination traffic through AWS Client VPN. Which mode
      fits?
    a: Split tunnel. It installs endpoint routes on the client and sends matching traffic through the
      tunnel. Route table changes reset connected clients.
    facts:
      - split-tunnel
      - split-change
  - id: client-vpn-006
    q: What subnet design improves AWS Client VPN availability for a subnet-based endpoint?
    a: Associate at least two subnets in different Availability Zones of the same VPC. Keep an identical
      destination route set on each association.
    facts:
      - subnet
      - redundancy
      - route-consistency
  - id: client-vpn-007
    q: What IPv4 client CIDR constraints apply when creating an AWS Client VPN endpoint?
    a: Choose /22 through /12 without overlapping the VPC, target networks or endpoint routes. The
      client IPv4 range cannot be changed after creation.
    facts:
      - ipv4-client-range
  - id: client-vpn-008
    q: Can one AWS Client VPN endpoint use both VPC subnet associations and a direct Transit Gateway
      association?
    a: No. Choose one association type. A Transit Gateway-associated endpoint preserves client source
      IPs and requires return routes to the client CIDR.
    trap: true
    facts:
      - tgw
      - tgw-source
  - id: client-vpn-009
    q: What default tunnel transport, port and routing mode does an AWS Client VPN endpoint use?
    a: UDP, port 443 and full-tunnel routing. TCP and port 1194 are supported alternatives, and split
      tunnel can be enabled.
    facts:
      - transport
      - udp-default
      - full-tunnel
  - id: client-vpn-010
    q: A subnet-based AWS Client VPN endpoint has intermittent access to an added destination network.
      What route configuration should the team inspect?
    a: Ensure every associated subnet has the same endpoint destination route set, and confirm
      authorization for that network.
    facts:
      - route-consistency
      - routing
      - authorization
---
AWS Client VPN gives individual users encrypted access from their devices to AWS and connected on-premises resources. It uses an OpenVPN-based client and Transport Layer Security (TLS), the protocol that encrypts the connection. Site-to-Site VPN connects networks through IPsec, a suite of network encryption protocols.

### How it works

1. Create an endpoint, the connection point for user sessions, with a server certificate in ACM in the endpoint Region. Choose user authentication through Active Directory or SAML, an identity federation standard, or mutual certificate authentication that checks the client's certificate. A combined configuration requires both checks to succeed.
2. For an IPv4 setup, choose a non-overlapping client CIDR, the address range assigned to connected clients. It must be from `/22` through `/12` and cannot change after creation.
3. Choose a network association. A subnet-based endpoint connects through VPC subnets. A Transit Gateway-associated endpoint connects directly to the network hub; one endpoint cannot mix the two association types.
4. Add destination routes and authorization grants. Authentication identifies who connected; authorization decides which destination networks that user may access. Rules grant access, use the most specific matching network prefix, and process `0.0.0.0/0`, any IPv4 destination, last.
5. For subnet-based access, allow traffic at the destination resource's security group, a virtual firewall, from the Client VPN association security group. Keep the same destination routes on all subnet associations.
6. Choose traffic routing. Full tunnel is the default. Split tunnel sends only traffic matching endpoint routes through the VPN. Connection logs in CloudWatch Logs help diagnose access failures.

| Authentication choice | What is checked |
|---|---|
| Active Directory | User identity through a directory |
| SAML federation | User identity through an external identity provider |
| Mutual authentication | Client certificate |

For subnet-based endpoints, use subnets in the same VPC and different Availability Zones, separate locations that provide failure isolation. AWS recommends at least two for redundancy. Each subnet must be `/27` or larger and retain at least 20 free addresses.

Direct Transit Gateway attachment preserves client source IPs. Source network address translation (SNAT) means replacing a packet's source address; this attachment does not apply it. Destination VPCs therefore need return routes to the client CIDR through the Transit Gateway.

### Exam cues

- If the question says individual remote users on laptops, think Client VPN, because it creates client sessions rather than a network-to-network IPsec connection.
- If the question says users connect but resources remain unreachable, think authorization, routes and security groups, because successful login alone does not open the network path.
- If the question says keep ordinary internet traffic off the VPN, think split tunnel with private destination routes, because only matching routes use the tunnel.
- If the question says direct remote access to networks on a Transit Gateway, think Transit Gateway-associated Client VPN, because it can attach directly without an intermediate VPC.

### Remember

- Default transport and port: UDP and 443. TCP and port 1194 are also supported.
- Split tunnel is disabled by default. Updating its endpoint routes resets all client connections.
- Client IPv4 CIDR: `/22` through `/12`, fixed after creation and non-overlapping.
- Target subnet: `/27` or larger with at least 20 available addresses.
- Standard authorization requires explicit grants. Quickstart automatically creates a VPC grant, routes and associations.

> **Trap:** SAML or directory login still needs a server certificate. Network authorization and routing are separate from authentication.
