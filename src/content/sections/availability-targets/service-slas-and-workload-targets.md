---
title: Service SLAs and workload targets
level: foundational
order: 10
facts:
  - id: availability-function
    text: Workload availability measures the percentage of a stated period during which the workload
      performs its agreed function successfully.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: sla-contract
    text: An SLA defines a service commitment, its measurement and remedies if the commitment is not met.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies
  - id: target-cost
    text: Higher availability targets typically increase cost and require more extensive failure testing
      and recovery automation.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: rto-definition
    text: Recovery time objective is the maximum acceptable delay between service interruption and
      restoration.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html#disaster-recovery-dr-objectives
  - id: rpo-definition
    text: Recovery point objective is the maximum acceptable time since the last data recovery point,
      expressing acceptable data loss.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html#disaster-recovery-dr-objectives
  - id: ec2-region-sla
    text: The EC2 Region-Level SLA commits to at least 99.99% monthly uptime for running instances
      concurrently deployed across two or more AZs in a Region, or at least two Regions if a Region
      has only one AZ.
    source: https://aws.amazon.com/compute/sla/
  - id: ec2-instance-sla
    text: The EC2 Instance-Level SLA commits to at least 99.5% uptime for an individual instance in a
      monthly billing cycle.
    source: https://aws.amazon.com/compute/sla/
  - id: ec2-sla-outage
    text: EC2 Region-Level unavailability means all running instances in the qualifying AZs concurrently
      have no external connectivity.
    source: https://aws.amazon.com/compute/sla/
  - id: ec2-credit
    text: EC2 SLA service credits require a qualifying claim through AWS Support; credit requests are
      due by the end of the second billing cycle after the incident.
    source: https://aws.amazon.com/compute/sla/
  - id: az-definition
    text: An Availability Zone is an isolated location within an AWS Region.
    source: https://aws.amazon.com/compute/sla/
  - id: dns-scope
    text: The Route 53 SLA covers Authoritative DNS per hosted zone; a hosted zone is unavailable for a
      minute only when all four assigned virtual name servers fail to answer all DNS queries
      throughout that minute.
    source: https://aws.amazon.com/route53/sla/
  - id: dns-exclusions
    text: The Route 53 Authoritative DNS SLA excludes other Route 53 features, including API and console
      availability.
    source: https://aws.amazon.com/route53/sla/
  - id: hosted-zone
    text: A hosted zone is a container for DNS records that describe traffic routing for a domain and
      its subdomains.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html#hosted-zones-working-with
  - id: sla-not-prediction
    text: SLA availability figures are not a guarantee of actual downtime; workloads and dependencies
      can exceed their stated SLA availability.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies
  - id: dns-definition
    text: DNS means Domain Name System, which returns information about resources associated with domain
      names.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/route-53-concepts.html#route-53-concepts-domain-name-system-dns
  - id: authoritative-dns
    text: An authoritative name server answers DNS queries using definitive information for its part of
      DNS; Route 53 name servers use hosted-zone records for their domains.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/route-53-concepts.html#route-53-concepts-domain-name-system-dns
cards:
  - id: availability-targets-002
    q: How does an AWS service SLA differ from a workload availability target?
    a: An SLA defines a service commitment, measurement and remedies. A workload target concerns
      successful operation of the whole workload over its measurement period. EC2 SLA credits do not
      establish application availability.
    trap: true
    facts:
      - sla-contract
      - availability-function
      - ec2-credit
      - sla-not-prediction
  - id: availability-targets-006
    q: A company runs one EC2 instance and assumes the Region-Level 99.99% SLA applies. What deployment
      condition is missing?
    a: Concurrent deployment across at least two Availability Zones in the Region. The SLA specifies a
      two-Region alternative where a Region has only one AZ. An individual instance has a separate
      99.5% monthly commitment.
    trap: true
    facts:
      - ec2-region-sla
      - ec2-instance-sla
  - id: availability-targets-007
    q: An application is unavailable while Route 53 still answers DNS queries. Does the Route 53
      Authoritative DNS SLA establish an application outage claim?
    a: No. It measures hosted-zone DNS availability. It does not promise availability of the
      application, Route 53 API or console.
    trap: true
    facts:
      - dns-scope
      - dns-exclusions
      - availability-function
  - id: availability-targets-008
    q: Which workload objective limits service restoration time, and which limits the age of recoverable
      data?
    a: RTO limits the delay until restoration. RPO limits the time since the last data recovery point
      and therefore acceptable data loss.
    facts:
      - rto-definition
      - rpo-definition
  - id: availability-targets-009
    q: A team believes a qualifying EC2 outage earns SLA credits automatically. What claim process
      should it follow?
    a: Open an AWS Support case with the required evidence by the end of the second billing cycle after
      the incident.
    trap: true
    facts:
      - ec2-credit
---
A workload availability target states how often the application must perform its agreed function. A service-level agreement, or SLA, defines a service commitment and its remedy. Set the workload target from business needs and evaluate the services it depends on. [AWS availability guidance](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability) · [SLA and dependency guidance](https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies)

### How it works

1. Define the workload function and measurement period. Availability measures whether the function succeeds during that period.
2. Define recovery limits separately. RTO, the recovery time objective, limits the delay until service restoration. RPO, the recovery point objective, limits the age of the recoverable data and therefore the acceptable data loss. [Recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html#disaster-recovery-dr-objectives)
3. Read each dependency SLA for deployment conditions and its definition of unavailability. An Availability Zone, or AZ, is an isolated location within an AWS Region.
4. Choose a target the business needs and can support. Higher targets typically require more cost, testing and automated recovery.

DNS, the Domain Name System, answers queries about domain names. A name server answers these queries; an authoritative name server uses the records it holds for the domain. [AWS DNS terms](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/route-53-concepts.html#route-53-concepts-domain-name-system-dns)

| Measure or commitment | Scope | What to check |
|---|---|---|
| Workload availability target | Successful operation of the whole workload | Function and measurement period |
| EC2 Region-Level SLA | Qualifying EC2 deployment | 99.99% monthly; instances across at least two AZs, with the single-AZ Region exception |
| EC2 Instance-Level SLA | Individual EC2 instance | 99.5% monthly |
| Route 53 Authoritative DNS SLA | Hosted-zone DNS responses | Assigned name servers and SLA exclusions |

EC2 Region-Level unavailability requires all running instances in the qualifying AZs to have no external connectivity concurrently. A qualifying service-credit claim goes through AWS Support and is due by the end of the second billing cycle after the incident. [EC2 SLA](https://aws.amazon.com/compute/sla/)

A Route 53 hosted zone is a container of DNS records that describe where a domain's traffic should go. The Authoritative DNS SLA treats a minute as unavailable only when all four assigned virtual name servers fail to answer all DNS queries throughout that minute. Other Route 53 features, including its API and console, are excluded. [Hosted zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html#hosted-zones-working-with) · [Route 53 SLA](https://aws.amazon.com/route53/sla/)

### Exam cues

- If the question says one EC2 instance must qualify for the Region-Level commitment, think deployment across AZs, because the Region-Level SLA has an explicit deployment condition.
- If the question says an application failed while DNS continued answering, think workload availability, because the Route 53 SLA measures hosted-zone DNS responses.
- If the question says restore service quickly and lose little data, think separate RTO and RPO values, because restoration delay and recoverable data age measure different effects.

### Remember

- EC2 Region-Level SLA: 99.99% monthly, qualifying concurrent deployment across at least two AZs. If a Region has only one AZ, the SLA specifies at least two Regions.
- EC2 Instance-Level SLA: 99.5% monthly.
- Higher availability targets increase engineering and operational demands.

> **Trap:** A dependency's SLA percentage is not a prediction of the workload's actual downtime. Measure the workload function and account for its dependencies.
