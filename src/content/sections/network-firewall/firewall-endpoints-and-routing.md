---
title: Firewall endpoints and routing
level: associate
order: 10
facts:
  - id: firewall-purpose
    text: Network Firewall filters traffic using stateless packet rules and stateful inspection of traffic flows.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-rules-engines.html
  - id: firewall-subnets
    text: For VPC firewalls, provide a subnet in each selected Availability Zone; reserve endpoint subnets exclusively for Network Firewall.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-subnets.html
  - id: own-subnet
    text: A firewall endpoint cannot filter traffic entering or leaving the subnet where the endpoint resides.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-subnets.html
  - id: endpoint-associations
    text: VPC endpoint associations allow multiple endpoints in an Availability Zone and endpoints in additional VPCs, limited to zones supported by the primary firewall VPC endpoints.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-subnets.html
  - id: routing
    text: After creating a firewall, update VPC route tables to insert its endpoints into the traffic path, including both directions to filter incoming and outgoing traffic.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-route-tables.html
  - id: internet-path
    text: For the documented internet-gateway topology, customer-subnet routes point internet traffic to the firewall endpoint, gateway routes point return traffic to it, and firewall-subnet routes point internet traffic to the gateway.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-route-tables.html
  - id: symmetric-flow
    text: Stateful inspection requires request and response traffic for a flow to pass through the same firewall endpoint.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/asymmetric-routing.html
  - id: logging-destinations
    text: Network Firewall can send stateful-engine flow, alert, and TLS logs to S3, CloudWatch Logs, or a Firehose delivery stream.
    source: https://docs.aws.amazon.com/network-firewall/latest/APIReference/API_LogDestinationConfig.html
  - id: manager-models
    text: Firewall Manager supports distributed Network Firewall deployments, a centralized firewall in one VPC, and importing existing firewalls for policy management.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/network-firewall-policies.html
cards:
  - id: network-firewall-001
    q: What does AWS Network Firewall inspect, and where are its VPC endpoints placed?
    a: It applies stateless packet rules and stateful flow inspection. Place endpoints in dedicated firewall subnets in the selected Availability Zones.
    facts:
      - firewall-purpose
      - firewall-subnets
  - id: network-firewall-002
    q: A team creates an AWS Network Firewall but application traffic is not inspected. What must it check?
    a: Check VPC route tables. Insert firewall endpoints into the required traffic path and route both directions through the same endpoint for stateful inspection.
    trap: true
    facts:
      - routing
      - symmetric-flow
  - id: network-firewall-004
    q: An application shares the AWS Network Firewall endpoint subnet and its traffic bypasses inspection. Why?
    a: A firewall endpoint cannot inspect traffic entering or leaving its own subnet. Move the application to a separate subnet and route its traffic through the endpoint.
    trap: true
    facts:
      - own-subnet
      - routing
  - id: network-firewall-005
    q: A team needs AWS Network Firewall flow logs delivered directly to a managed delivery stream. Is a custom forwarding function required?
    a: No. Configure a Firehose delivery stream as the Network Firewall log destination. S3 and CloudWatch Logs are also supported.
    facts:
      - logging-destinations
  - id: network-firewall-006
    q: Which Firewall Manager management models are available for AWS Network Firewall across an organization?
    a: Distributed deployment, centralized deployment in one VPC, and importing existing firewalls.
    facts:
      - manager-models
diagrams:
  - id: network-firewall-internet-path
    title: Example outbound path; return traffic uses the same endpoint
    width: 800
    height: 170
    nodes:
      - id: n0
        label: EC2 workload
        icon: res-ec2-instance
        tone: compute
        x: 20
        y: 40
        w: 220
        h: 86
      - id: n1
        label: Firewall endpoint
        icon: network-firewall
        tone: network
        x: 290
        y: 40
        w: 220
        h: 86
      - id: n2
        label: Internet
        tone: neutral
        x: 560
        y: 40
        w: 220
        h: 86
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
    steps:
      - The customer subnet route sends internet-bound traffic to the firewall endpoint.
      - The firewall subnet route sends inspected internet-bound traffic to the internet gateway; return routing inserts the same endpoint.
---

AWS Network Firewall filters VPC traffic that is routed through its firewall endpoints. An endpoint is the insertion point for inspection. Creating the firewall and steering packets through it are separate parts of the setup.

### How it works

1. Reserve dedicated firewall subnets in the selected Availability Zones. Keep application resources in other subnets.
2. Create endpoints with the firewall policy. A policy selects the stateless packet rules and stateful flow inspection rules.
3. Update route tables, which choose the next destination for packets, to insert the endpoint into the required path. In the internet-gateway example, the customer subnet sends internet traffic to the endpoint and the firewall subnet sends it to the gateway.
4. Route the response through the same endpoint. Stateful inspection needs both directions of the flow, the related request and response packets.
5. Configure stateful-engine logging when needed. Use Firewall Manager for centrally managed deployments across an organization.

| Firewall Manager model | Deployment |
|---|---|
| Distributed | Firewalls and endpoints in accounts and VPCs within scope |
| Centralized | A firewall in a single VPC |
| Import existing firewalls | Existing firewalls governed by a Firewall Manager policy |

### Exam cues

- If the question says a firewall exists but traffic bypasses it, think route tables, because the endpoint inspects traffic routed through it.
- If the question says requests and responses take different firewall paths, think symmetric routing, because stateful inspection needs the same endpoint for both directions.
- If the question says deliver firewall flow logs to a stream, think a Firehose log destination, because Network Firewall supports it directly.

### Remember

- Reserve endpoint subnets exclusively for Network Firewall.
- An endpoint cannot inspect traffic entering or leaving its own subnet.
- Endpoint associations support additional endpoints and VPCs within the documented zone constraints.
- Stateful log destinations are S3, CloudWatch Logs, and Firehose; log types include flow, alert, and TLS.

> **Trap:** Adding a firewall without changing the required routes does not put application traffic on the inspection path.
