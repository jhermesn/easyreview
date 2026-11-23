---
title: Wavelength basics
level: foundational
order: 5
facts:
  - id: carrier-edge
    text: AWS Wavelength places AWS compute and storage at the edge of telecommunications providers' networks to serve mobile users with low latency.
    source: https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html#what-is-wavelength
cards:
  - id: wavelength-006
    q: Which AWS infrastructure places compute and storage at a telecommunications provider's network edge for low-latency mobile applications?
    a: AWS Wavelength Zones place AWS compute and storage at the carrier network edge.
    facts: [carrier-edge]
  - id: wavelength-007
    q: A mobile application needs low latency on a telecommunications provider's network. Which AWS infrastructure should it consider?
    a: AWS Wavelength Zones bring compute and storage to the carrier network edge.
    facts: [carrier-edge]
---
AWS Wavelength brings AWS compute and storage closer to mobile users at a telecommunications provider's network edge.

### How it works

1. AWS places compute and storage at a provider's network edge.
2. Applications use these resources to serve mobile users with low latency.

### Exam cues

- If the question says low-latency mobile applications on a carrier network, think AWS Wavelength, because compute and storage run at the carrier edge.

### Remember

- Wavelength places AWS compute and storage at the carrier network edge.

> **Trap:** A Wavelength Zone is at a telecommunications provider's network edge, not in a customer's data center.
