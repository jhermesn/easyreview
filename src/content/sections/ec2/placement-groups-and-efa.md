---
title: Placement groups and EFA
level: associate
order: 50
facts:
  - id: cluster
    text: A cluster placement group packs instances close together inside one Availability Zone for low network latency and high throughput, and suits workloads whose traffic is mostly between the instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-cluster
  - id: cluster-one-az
    text: A cluster placement group can't span Availability Zones; AWS recommends launching all its instances in one request with one instance type to avoid insufficient capacity errors.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-cluster
  - id: cluster-flow
    text: With enhanced networking, instances in a cluster placement group can use up to 10 Gbps for a single flow, versus 5 Gbps outside one.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-cluster
  - id: partition
    text: A partition placement group splits instances into partitions that each have their own racks, network and power, for large distributed and replicated workloads such as HDFS, HBase and Cassandra.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-partition
  - id: partition-limits
    text: A partition placement group can span Availability Zones in a Region with up to seven partitions per zone, and shows which instance is in which partition for topology-aware applications.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-partition
  - id: spread
    text: A spread placement group puts each instance on distinct hardware, for a small number of critical instances that must not fail together.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-spread
  - id: spread-limit
    text: A rack-level spread placement group can span Availability Zones in a Region but supports at most seven running instances per Availability Zone.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-spread
  - id: efa
    text: An Elastic Fabric Adapter (EFA) is a network device for EC2 instances that gives lower, more consistent latency and higher throughput for inter-instance communication in AI, ML and HPC workloads, with support for MPI and NCCL.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html#efa
  - id: no-dedicated-hosts
    text: "Dedicated Hosts cannot be launched in placement groups."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html
cards:
  - id: ec2-061
    q: A tightly coupled HPC job needs the lowest network latency and highest throughput between 16 EC2 instances. Which placement strategy fits?
    a: "A **cluster placement group** in one Availability Zone (add EFA for MPI traffic)."
    facts: [cluster, efa]
  - id: ec2-062
    q: An HDFS cluster of 90 EC2 instances must limit the impact of a rack failure and let the application know which instances share hardware. Which placement strategy fits?
    a: "A **partition placement group**: partitions don't share racks, and partition numbers are visible to the application."
    facts: [partition, partition-limits]
  - id: ec2-063
    q: Five critical EC2 instances must never share underlying hardware. Which placement strategy fits, and what is its limit?
    a: "A **spread placement group**: each instance on distinct hardware, at most seven running instances per AZ."
    facts: [spread, spread-limit]
  - id: ec2-064
    q: Can a cluster placement group span two Availability Zones for high availability?
    a: "No. A cluster placement group lives in one AZ; use spread or partition groups for fault isolation."
    trap: true
    facts: [cluster-one-az]
  - id: ec2-065
    q: Adding instances to an existing cluster placement group fails with an insufficient capacity error. What does AWS recommend?
    a: "Launch all instances in a single request with one instance type; if it already happened, stop and start all instances in the group and retry."
    facts: [cluster-one-az]
  - id: ec2-066
    q: Which EC2 network device speeds up MPI or NCCL communication between instances for HPC and ML training?
    a: "Elastic Fabric Adapter (EFA)."
    facts: [efa]
---
Placement groups tell EC2 how to place instances on hardware: close together for speed, or apart for resilience. [Placement strategies](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html)

### How it works

1. Create a placement group with a strategy: cluster, partition or spread.
2. Launch instances into it; EC2 places them on hardware that follows the strategy.
3. For HPC and ML traffic between instances, attach an Elastic Fabric Adapter (EFA).

| Strategy | Placement | Fits |
|---|---|---|
| Cluster | Close together in one AZ | HPC, low-latency node-to-node traffic |
| Partition | Groups of racks, up to 7 partitions per AZ | HDFS, HBase, Cassandra, Kafka |
| Spread | Each instance on distinct hardware, max 7 per AZ | A few critical instances |

### Exam cues

- If the question says lowest latency or highest throughput between instances, think a cluster placement group (and EFA).
- If the question says large distributed or replicated data store, rack-aware, think partition placement group.
- If the question says a handful of critical instances that must not fail together, think spread placement group.

### Remember

- Cluster: one AZ only; launch in one request with one instance type.
- Partition: up to 7 partitions per AZ; can span AZs.
- Spread: up to 7 running instances per AZ; can span AZs.

> **Trap:** A cluster placement group improves speed, not availability. It sits in one AZ, so an AZ outage takes all of it down.
