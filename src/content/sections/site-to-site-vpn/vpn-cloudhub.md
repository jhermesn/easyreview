---
title: VPN CloudHub
level: associate
order: 20
facts:
  - id: what
    text: AWS VPN CloudHub lets sites with Site-to-Site VPN connections to the same virtual private gateway communicate with each other, in a hub-and-spoke model, with or without a VPC.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html#VPN_CloudHub
  - id: setup
    text: For VPN CloudHub you create one virtual private gateway, a customer gateway per site with a unique BGP ASN, and a dynamically routed VPN connection from each site.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html#VPN_CloudHub
  - id: no-overlap
    text: Sites connected through VPN CloudHub must not have overlapping IP ranges, and each advertises its own prefix over BGP.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html#vpn-cloudhub-overview
cards:
  - id: site-to-site-vpn-012
    q: A company has six branch offices, each with a Site-to-Site VPN to AWS, and needs the branches to talk to each other cheaply over the existing VPNs. Which feature fits?
    a: "**AWS VPN CloudHub**: all VPNs to one virtual private gateway, BGP re-advertises each site's prefix to the others."
    facts: [what, setup]
  - id: site-to-site-vpn-013
    q: What does each customer gateway need for AWS VPN CloudHub to work?
    a: "A unique BGP ASN and a dynamically routed VPN connection to the shared virtual private gateway."
    facts: [setup]
  - id: site-to-site-vpn-014
    q: Two branch offices use the same 10.0.0.0/24 range. Can AWS VPN CloudHub connect them?
    a: "No. CloudHub sites must not have overlapping IP ranges."
    trap: true
    facts: [no-overlap]
---
AWS VPN CloudHub turns the virtual private gateway into a hub, so branch offices that already have VPNs to AWS can reach each other through it. [VPN CloudHub](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html)

### How it works

1. Create one virtual private gateway.
2. Create a customer gateway per site, each with a unique BGP ASN.
3. Create a dynamically routed VPN connection from each site to that gateway.
4. Each site advertises its prefix; the gateway re-advertises it to the other sites.

### Exam cues

- If the question says branch offices must communicate with each other over their existing AWS VPNs, think VPN CloudHub.
- If the question says many VPCs plus many sites at scale, think Transit Gateway.

### Remember

- One virtual private gateway, BGP, unique ASN per site.
- No overlapping site IP ranges.

> **Trap:** Static VPN routes don't work for CloudHub. Each site needs a dynamically routed (BGP) connection so prefixes can be re-advertised.
