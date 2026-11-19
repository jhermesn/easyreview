---
title: "Site-to-Site VPN basics"
level: foundational
order: 5
facts:
  - id: network-vpn
    text: "AWS Site-to-Site VPN connects a VPC to a remote network, such as an on-premises site, which instances in a VPC cannot reach by default."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#VPC_VPN
  - id: gateway-roles
    text: A customer gateway is an AWS resource describing the customer gateway device, which is physical or software equipment on the customer side.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#concepts
cards:
  - id: site-to-site-vpn-017
    q: "A company wants a quick, encrypted connection between its office network and a VPC over the internet. Which service fits?"
    a: "AWS Site-to-Site VPN."
    facts: [network-vpn]
  - id: site-to-site-vpn-007
    q: What is the difference between a Site-to-Site VPN customer gateway and customer gateway device?
    a: "The customer gateway is an AWS resource describing the device. The device is physical or software equipment on the customer side."
    facts: [gateway-roles]
---
AWS Site-to-Site VPN links a whole remote network to a VPC with an encrypted connection. [What is AWS Site-to-Site VPN?](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#VPC_VPN)

### How it works

1. Configure a customer gateway for the remote network.
2. Create the VPN connection to AWS.
3. Traffic between the networks flows through the tunnels.

### Exam cues

- If the question says connect an on-premises network to a VPC quickly, think Site-to-Site VPN.

### Remember

- Connects networks, not individual users.

> **Trap:** Site-to-Site VPN connects networks; Client VPN connects individual users.
