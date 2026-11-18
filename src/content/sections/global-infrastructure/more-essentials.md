---
title: "PLACEHOLDER global-infrastructure/more-essentials"
level: foundational
order: 30
facts:
  - id: local-zones
    text: AWS Local Zones place compute, storage, database and other select resources close to large population and industry centers for low-latency access.
    source: https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html#what-is-aws-local-zones
  - id: az-encryption
    text: All traffic between Availability Zones is encrypted.
    source: https://aws.amazon.com/about-aws/global-infrastructure/regions_az/
  - id: region-pricing
    text: "Resource pricing can differ between Regions because of local costs such as land, electricity and taxes, so Region cost is a selection factor alongside latency, data residency and service availability."
    source: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/cost_pricing_model_region_cost.html#cost_pricing_model_region_cost
cards:
  - id: global-infrastructure-008
    q: A game studio needs single-digit millisecond latency for players in a large city that has no AWS Region. Which AWS infrastructure option fits?
    a: AWS Local Zones. They place compute, storage and database resources close to large population centers.
    facts: [local-zones]
  - id: global-infrastructure-018
    q: Is traffic between Availability Zones in a Region encrypted?
    a: Yes. All traffic between AZs is encrypted.
    facts: [az-encryption]
  - id: global-infrastructure-022
    q: "Besides latency, legal requirements and service availability, what else can differ between two AWS Regions that host the same workload?"
    a: "Price. Each Region has its own resource prices, so with no residency or latency constraint the cheaper Region can lower cost."
    facts: [region-pricing]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
