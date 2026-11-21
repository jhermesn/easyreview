---
title: Connections, LAGs and gateways
level: associate
order: 20
facts:
  - id: dedicated
    text: A dedicated Direct Connect connection is a physical Ethernet connection for one customer, requested from AWS, at 1, 10, 100 or 400 Gbps.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/dedicated_connection.html
  - id: hosted
    text: A hosted Direct Connect connection is provisioned by a Direct Connect Partner on your behalf, at speeds from 50 Mbps up to 25 Gbps.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/hosted_connection.html
  - id: lag
    text: A link aggregation group (LAG) uses LACP to combine several Direct Connect connections at one location into one logical connection with more bandwidth.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/lags.html#lags
  - id: dxgw-global
    text: A Direct Connect gateway is a globally available resource that lets one Direct Connect connection reach VPCs in any Region (except China Regions) through virtual private gateways or transit gateways.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html
  - id: dxgw-no-transit
    text: A Direct Connect gateway doesn't let its gateway associations send traffic to each other, so it doesn't route VPC to VPC between attached virtual private gateways.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html
  - id: connection-costs
    text: "Direct Connect billing combines provisioned port time with data sent out of AWS; the selected connection capacity affects the port price, and an idle provisioned port still incurs charges."
    source: https://aws.amazon.com/directconnect/pricing/
  - id: partner-extension
    text: "A Direct Connect Partner can provide the network extension from an office or data center to a Direct Connect location."
    source: https://aws.amazon.com/directconnect/faqs/
  - id: loa-cross-connect
    text: "After a dedicated connection request, AWS provides a Letter of Authorization and Connecting Facility Assignment (LOA-CFA), which your network provider needs to order the cross connect at the Direct Connect location."
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/dedicated_connection.html
cards:
  - id: direct-connect-009
    q: A company needs a 200 Mbps Direct Connect link. Can it order a dedicated connection from AWS at that speed?
    a: "No. Dedicated connections are 1, 10, 100 or 400 Gbps; sub-1 Gbps speeds come as hosted connections from a Direct Connect Partner."
    trap: true
    facts: [dedicated, hosted]
  - id: direct-connect-010
    q: Two 10 Gbps Direct Connect connections at the same location should act as one 20 Gbps link. Which feature fits?
    a: "A link aggregation group (LAG)."
    facts: [lag]
  - id: direct-connect-011
    q: A data center with one Direct Connect connection in us-east-1 must reach VPCs in us-east-1 and eu-west-1. What connects them?
    a: "A **Direct Connect gateway** (global) with the VPCs' virtual private gateways or transit gateways associated."
    facts: [dxgw-global]
  - id: direct-connect-012
    q: Two VPCs in different Regions are associated with the same Direct Connect gateway. Can they send traffic to each other through it?
    a: "No. A Direct Connect gateway doesn't route between its associations; use VPC peering or transit gateway peering for VPC-to-VPC traffic."
    trap: true
    facts: [dxgw-no-transit]
  - id: direct-connect-017
    q: "A company leaves an AWS Direct Connect port provisioned during a month with no traffic. Does its port charge stop?"
    a: "No. Provisioned port time is billable even while idle. Data transfer out is a separate charge."
    facts: [connection-costs]
  - id: direct-connect-018
    q: "A company wants AWS Direct Connect but its data center is outside a Direct Connect location. Who can extend the network to that location?"
    a: "A Direct Connect Partner can extend the company network to the location."
    facts: [partner-extension]
  - id: direct-connect-021
    q: "AWS has approved a new AWS Direct Connect dedicated connection. What document does the network provider need to order the cross connect at the Direct Connect location?"
    a: "The LOA-CFA (Letter of Authorization and Connecting Facility Assignment)."
    facts: [loa-cross-connect]
---
Direct Connect choices come down to speed, who provisions the link, and how far it reaches.

### How it works

1. Order a dedicated connection from AWS (1 to 400 Gbps) or a hosted connection from a Partner (50 Mbps to 25 Gbps). A Direct Connect Partner can extend the office or data center network to the connection location.
2. Bundle several connections at one location into a LAG for more bandwidth.
3. Create virtual interfaces; attach a private or transit VIF to a Direct Connect gateway.
4. Associate virtual private gateways or transit gateways in any Region with that Direct Connect gateway.

| Need | Option |
|---|---|
| Under 1 Gbps or through a Partner | Hosted connection |
| 1, 10, 100 or 400 Gbps from AWS | Dedicated connection |
| More bandwidth at one location | LAG |
| One link to VPCs in many Regions | Direct Connect gateway |
| Survive a location failure | Connections at two or more locations |

Budget for provisioned port time and data transfer out of AWS. Connection capacity affects the port price; keeping a port provisioned incurs charges even without traffic.

### Exam cues

- If the question says less than 1 Gbps, think hosted connection.
- If the question says reach VPCs in several Regions over one Direct Connect, think Direct Connect gateway.
- If the question says VPCs must talk to each other, a Direct Connect gateway is not the answer; think peering or Transit Gateway.

### Remember

- Dedicated: 1, 10, 100, 400 Gbps. Hosted: 50 Mbps to 25 Gbps.
- LAG: same location, LACP.
- Port time remains billable while a provisioned connection is idle.
- Direct Connect gateway: global, but no VPC-to-VPC routing.
- Dedicated connection: AWS issues the LOA-CFA; the network provider uses it to order the cross connect.

> **Trap:** Some practice answers say a Direct Connect gateway gives transitive routing between attached VPCs. It doesn't: associations on the same gateway can't send traffic to each other.
