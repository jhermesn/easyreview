---
title: When to use multiple Regions
level: foundational
order: 20
facts:
  - id: region-failure-scope
    text: Separation between Regions limits a service failure to a single Region, leaving other Regions' operations unaffected.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions
  - id: dr-scope
    text: For the loss of one data center, a well-architected, highly available workload may need only backup and restore; for the loss of a Region or regulatory requirements, consider pilot light, warm standby or multi-site active/active.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#disaster-recovery-options-in-the-cloud
  - id: active-passive
    text: Active/passive disaster recovery hosts the workload in one active Region and uses a passive Region for recovery; the passive Region serves no traffic until failover.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#disaster-recovery-options-in-the-cloud
  - id: backup-other-region
    text: Backup and restore can protect against a regional disaster by replicating data to other Regions, but the infrastructure, configuration and code must also be redeployed there.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: latency
    text: Selecting a Region close to most of your users lowers network latency.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html#aws-regions
  - id: legal
    text: An AWS account offers multiple Regions so resources can be created where requirements demand, for example in Europe to be close to European customers or to meet legal requirements.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html#aws-regions
  - id: data-residency
    text: Resources and data stay in the Region where they are created unless they are explicitly replicated or copied.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions
  - id: global-network
    text: Regions are interconnected through the AWS global network, which provides private, high-bandwidth, low-latency connectivity.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions
cards:
  - id: global-infrastructure-011
    q: Name four reasons to run a workload in more than one AWS Region.
    a: "- Disaster recovery\n- Business continuity if a whole Region is disrupted\n- Lower latency for users in other parts of the world\n- Data residency or legal rules that require data in a specific country"
    facts: [dr-scope, latency, legal]
  - id: global-infrastructure-012
    q: A highly available workload already runs across three Availability Zones. It must also keep running if an entire AWS Region becomes unavailable. What does it need?
    a: A second Region, with a disaster recovery strategy such as pilot light, warm standby or multi-site active/active. Multiple AZs protect only against data center failures.
    facts: [dr-scope, region-failure-scope]
  - id: global-infrastructure-013
    q: A law requires that customer data of German users stays in Europe. How does AWS Region choice help?
    a: Create the resources in a European Region. Data stays in its Region unless you replicate or copy it elsewhere.
    facts: [legal, data-residency]
  - id: global-infrastructure-014
    q: In an active/passive multi-Region setup, does the passive Region serve user traffic?
    a: No. It stays ready for recovery and serves traffic only after a failover.
    facts: [active-passive]
  - id: global-infrastructure-015
    q: Is copying backups to another AWS Region enough to recover a whole workload there?
    a: No. The infrastructure, configuration and application code must also be redeployed in the recovery Region, ideally with infrastructure as code.
    trap: true
    facts: [backup-other-region]
---
A single Region already spans several Availability Zones, which handles the loss of a data center. A second Region protects against problems that hit a whole Region. It also brings the workload closer to users elsewhere, and keeps data in the countries that require it. [Regions](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions)

### How it works

1. Decide what you are protecting against. For a data center loss, multiple AZs and backup and restore may be enough. For a Region loss, or when regulations require it, use a multi-Region strategy. [Disaster recovery options](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#disaster-recovery-options-in-the-cloud)
2. Replicate data to the second Region. Nothing crosses Regions unless you replicate or copy it.
3. Prepare the infrastructure there too, preferably with infrastructure as code, so it can be deployed quickly.
4. For users in other parts of the world, serve them from a Region close to them.

| Reason | Why a second Region helps |
|---|---|
| Disaster recovery | A failure in one Region doesn't affect the others |
| Business continuity | The business keeps running while a Region is disrupted |
| Low latency for end users | A Region near distant users shortens network paths |
| Data sovereignty | Data created in a Region stays there unless copied |

### Exam cues

- If the question says survive the loss of an entire Region, think multiple Regions, not more AZs.
- If the question says data must remain in a country or area, think choose the Region there.
- If the question says users on another continent see high latency, think a Region near them, or edge locations for cached content.

### Remember

- Multiple AZs protect against data center failures; multiple Regions protect against Region failures.
- In active/passive, the passive Region serves no traffic until failover.
- Regions connect over the private AWS global network.

> **Trap:** More AZs don't help when a whole Region is down. Only a second Region covers that case.
