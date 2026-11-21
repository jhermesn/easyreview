---
title: "Client VPN basics"
level: foundational
order: 5
facts:
  - id: remote-users
    text: "AWS Client VPN is a managed client-based VPN service for securely reaching AWS and on-premises resources from any location with an OpenVPN-based client."
    source: https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html#what-is
cards:
  - id: client-vpn-011
    q: "Remote employees need secure access from their laptops to resources in a VPC. Which service fits?"
    a: "AWS Client VPN."
    facts: [remote-users]
---
AWS Client VPN connects individual users' devices to AWS and on-premises networks.

### How it works

1. Create a Client VPN endpoint.
2. Users connect with an OpenVPN-based client.
3. They reach the resources the endpoint allows.

### Exam cues

- If the question says individual remote users connecting to a VPC, think Client VPN.

### Remember

- For users' devices.

> **Trap:** Client VPN connects people; Site-to-Site VPN connects whole networks.
