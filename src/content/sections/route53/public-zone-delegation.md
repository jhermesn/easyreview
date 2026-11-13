---
title: Public zone delegation
level: associate
order: 5
facts:
  - id: hosting
    text: A domain can keep its existing registrar while using Route 53 for DNS hosting.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-new-domain.html#dns-configuring-new-domain-other
  - id: delegate
    text: For a domain registered elsewhere, create a Route 53 public hosted zone and configure the registrar to use the four name servers assigned to that zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-new-domain.html#dns-configuring-create-hz-delegate
  - id: automatic
    text: Registering a domain with Route 53 creates its hosted zone, assigns four name servers and updates the domain to use them.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-new-domain.html#dns-configuring-new-domain-r53
  - id: a
    text: An A record provides an IPv4 address.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#AFormat
  - id: aaaa
    text: An AAAA record provides an IPv6 address.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#AAAAFormat
  - id: cname
    text: A CNAME maps a name to another domain name and cannot exist at the hosted-zone apex.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#CNAMEFormat
  - id: ns
    text: NS records identify the authoritative name servers for a hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#NSFormat
  - id: mx
    text: MX records specify mail servers and their preference values.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#MXFormat
  - id: txt
    text: TXT records hold text values, including values used to establish domain ownership.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#TXTFormat
  - id: sla
    text: The Route 53 SLA covers authoritative DNS hosted-zone availability and excludes API and console availability.
    source: https://aws.amazon.com/route53/sla/
cards:
  - id: route53-048
    q: A company keeps its domain at an external registrar but wants Route 53 DNS hosting. Must it transfer registration?
    a: No. Create a public hosted zone and set the registrar to use the four Route 53 name servers for that zone.
    facts:
      - hosting
      - delegate
    trap: true
  - id: route53-049
    q: Records in a new Route 53 public zone do not affect public lookups for an externally registered domain. What should be checked?
    a: The registrar name-server configuration. It must delegate to the four name servers assigned to the intended hosted zone.
    facts:
      - delegate
  - id: route53-050
    q: Which Route 53 DNS record types represent IP addresses, another name, name servers, mail servers and text?
    a: "A: IPv4. AAAA: IPv6. CNAME: another name. NS: authoritative name servers. MX: mail servers. TXT: text values."
    facts:
      - a
      - aaaa
      - cname
      - ns
      - mx
      - txt
  - id: route53-051
    q: Does the Route 53 authoritative DNS SLA guarantee its console and API availability?
    a: No. The SLA is scoped to authoritative DNS hosted-zone availability and excludes API and console availability.
    facts:
      - sla
    trap: true
diagrams:
  - id: route53-public-delegation
    title: Delegate an externally registered domain to Route 53
    width: 840
    height: 180
    nodes:
      - id: zone
        label: Public zone
        icon: route-53
        sub: four name servers
        x: 20
        y: 50
        w: 220
        h: 86
        tone: network
      - id: registrar
        label: Registrar
        icon: res-client
        sub: set zone name servers
        x: 310
        y: 50
        w: 220
        h: 86
        tone: network
      - id: dns
        label: DNS hosting
        icon: route-53
        sub: answer from zone
        x: 600
        y: 50
        w: 220
        h: 86
        tone: network
    edges:
      - from: zone
        to: registrar
        step: 1
      - from: registrar
        to: dns
        step: 2
    steps:
      - Create the zone and obtain its assigned name servers.
      - Configure the registrar to use those servers so the zone supplies DNS answers.
---
A public hosted zone holds DNS records for a domain. Domain registration and DNS hosting can use different providers. A registrar manages the domain registration; delegation tells DNS which name servers answer for it.

### How it works

1. If the domain is registered elsewhere, create a public hosted zone in Route 53.
2. At the registrar, configure the four name servers assigned to that hosted zone. These are its authoritative servers, meaning they supply its DNS answers.
3. Add the records needed for the application. Creating a zone without updating delegation does not make the registrar use it.
4. When registering through Route 53, Route 53 creates the zone and updates the domain's name servers for you.

| Record | Value it provides |
|---|---|
| A | IPv4 address |
| AAAA | IPv6 address |
| CNAME | Another domain name; not allowed at the zone apex |
| NS | Authoritative name servers |
| MX | Mail servers and preference values |
| TXT | Text, including domain ownership values |

### Exam cues

- If the question says keep the current registrar and use Route 53 DNS, think update name-server delegation, because registration transfer is unnecessary.
- If the question says the new zone has correct records but public DNS uses old answers from another provider, think delegation, because the registrar must point to the intended zone's servers.

### Remember

- Route 53 assigns four name servers to the hosted zone.
- A uses IPv4; AAAA uses IPv6.
- The Route 53 SLA concerns authoritative hosted-zone DNS availability. It excludes API and console availability.

> **Trap:** Creating a public hosted zone for an externally registered domain does not update that registrar's name-server settings.
