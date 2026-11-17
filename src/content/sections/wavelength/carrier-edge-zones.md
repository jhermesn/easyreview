---
title: Carrier edge zones
level: associate
order: 10
facts:
  - id: what
    text: AWS Wavelength deploys standard AWS compute and storage services at the edge of communications service providers' networks to give low latency to mobile devices and end users.
    source: https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html#what-is-wavelength
  - id: zone
    text: A Wavelength Zone sits in a carrier location, is associated with an AWS Region, and is a logical extension of that Region managed by the Region's control plane.
    source: https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html#concepts
  - id: subnet
    text: You extend a VPC to a Wavelength Zone by creating a Wavelength subnet there and launching resources such as EC2 instances in it.
    source: https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html#concepts
  - id: carrier-gateway
    text: A carrier gateway allows inbound traffic from the carrier network in a location and outbound traffic to the carrier network and the internet.
    source: https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html#concepts
  - id: services
    text: In Wavelength Zones you can create EC2 instances, EBS volumes, VPC subnets and carrier gateways, and use EC2 Auto Scaling, Systems Manager and, in select zones, Application Load Balancers.
    source: https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html#services
cards:
  - id: wavelength-001
    q: A mobile game needs single-digit-millisecond latency for players on a 5G carrier network. Where should the game servers run?
    a: "In an **AWS Wavelength Zone**, inside the carrier's network."
    facts: [what, zone]
  - id: wavelength-002
    q: Which gateway lets traffic from the carrier network reach EC2 instances in an AWS Wavelength subnet?
    a: "A carrier gateway."
    facts: [carrier-gateway]
  - id: wavelength-003
    q: How do you place EC2 instances in an AWS Wavelength Zone?
    a: "Extend your VPC with a Wavelength subnet in that zone and launch the instances there."
    facts: [subnet]
  - id: wavelength-004
    q: Low latency for users in a metro area over regular internet, versus low latency for mobile devices on a 5G carrier network. Which AWS infrastructure fits each?
    a: "- Metro users: **Local Zones**.\n- 5G mobile devices: **Wavelength Zones**."
    trap: true
    facts: [what]
---
AWS Wavelength is for latency-sensitive mobile traffic: video analytics, game streaming, connected vehicles. The traffic stays inside the 5G carrier network instead of travelling to a Region. [What is AWS Wavelength?](https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html)

### How it works

1. Opt in to a Wavelength Zone tied to your Region.
2. Create a Wavelength subnet in your VPC and launch EC2 instances (and EBS volumes) there.
3. Add a carrier gateway so devices on the carrier network can reach the instances.
4. The rest of the app keeps running in Regional subnets of the same VPC.

| Need | Infrastructure |
|---|---|
| Low latency to 5G mobile devices | Wavelength Zones |
| Low latency to users in a metro area | Local Zones |
| AWS infrastructure in your own data center | AWS Outposts |

### Exam cues

- If the question says 5G, carrier network or mobile edge, think AWS Wavelength.
- If the question says a city or metro area without mention of carriers, think Local Zones.

### Remember

- Wavelength Zone: carrier location, extension of a Region.
- Wavelength subnet plus carrier gateway.
- EC2, EBS, Auto Scaling, ALB in select zones.

> **Trap:** Wavelength, Local Zones and Outposts all bring AWS closer. The deciding word is who owns the site: a carrier (Wavelength), AWS in a metro area (Local Zones), or you (Outposts).
