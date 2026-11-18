---
title: Distributed processing workloads
level: associate
order: 10
facts:
  - { id: platform, text: "Amazon EMR is a managed cluster platform for data processing frameworks including Apache Hadoop and Apache Spark.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html#emr-what-is-emr" }
  - { id: s3, text: "EMR processing steps can use input in Amazon S3 and write output to S3.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-steps" }
  - { id: text-input, text: "The default Hadoop input format is text files with newline-separated lines.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-input-accept.html#emr-plan-input-accept" }
  - { id: ec2, text: "An EMR on EC2 cluster is a collection of EC2 instances called nodes.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-clusters" }
  - { id: primary, text: "The primary node coordinates cluster tasks and monitors cluster health.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-clusters" }
  - { id: core, text: "Core nodes run tasks and store data in HDFS.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-clusters" }
  - { id: task, text: "Task nodes run tasks without storing data in HDFS, and are optional.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-clusters" }
  - { id: core-loss, text: "Terminating core nodes risks HDFS data loss.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-master-core-task-nodes.html#emr-plan-core" }
  - { id: task-loss, text: "Task nodes do not hold persistent HDFS data, making them suitable for Spot capacity.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html#emr-dev-task-instance-group-spot" }
  - { id: spot-primary, text: "Termination of a single primary node ends the cluster.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html#emr-dev-master-instance-group-spot" }
  - { id: ha, text: "Clusters with three primary nodes can fail over and replace a failed primary.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-ha.html#emr-plan-ha" }
  - { id: ha-versions, text: "High availability for instance groups is supported in EMR 5.23.0 and later; instance fleet support starts in specified later releases.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-ha.html#emr-plan-ha" }
  - { id: ondemand, text: "For data-critical workloads AWS suggests On-Demand primary and core nodes with Spot task nodes.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html#emr-dev-when-use-spot-data-critical" }
  - { id: spot, text: "EC2 can interrupt Spot Instances when it needs the capacity back.", source: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html#spot-features" }
  - { id: yarn-six, text: "Starting with EMR 6.x, YARN node labels are disabled by default and application primary processes can run on core or task nodes.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-master-core-task-nodes.html#emr-plan-task" }
  - { id: yarn-config, text: "Enabling YARN node labels and setting the application primary label expression to CORE restricts those processes to core nodes.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-master-core-task-nodes.html#emr-plan-task" }
  - { id: bootstrap, text: "Bootstrap actions run after instance launch and before application installation and data processing, including on nodes added later.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html#emr-plan-bootstrap" }
  - { id: bootstrap-limit, text: "A cluster can have up to 16 bootstrap actions.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html#bootstrapUses" }
  - { id: steps, text: "EMR steps are units of work submitted to a cluster for processing by installed software.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-steps" }
  - { id: terminate, text: "A cluster can be configured to terminate automatically after its last step.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-cluster-lifecycle" }
  - { id: fleets, text: "Instance fleets support a mix of instance types and target capacities for On-Demand and Spot Instances.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html#emr-overview-clusters" }
  - { id: s3a, text: "EMR 7.10.0 and later use S3A by default for S3 file schemes; EMRFS can still be configured.", source: "https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-s3a-migrate.html#emr-s3a-migrate" }
  - { id: emrfs, text: "Before EMR 7.10.0, s3:// and s3n:// used EMRFS.", source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-file-systems.html#emr-plan-file-systems" }
  - { id: release-date, text: "EMR 7.10.0 was initially released in August 2025.", source: "https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-7100-release.html#emr-7100-supported-lifecycle" }
  - { id: serverless, text: "EMR Serverless runs big data frameworks without configuring, managing and scaling clusters or servers.", source: "https://aws.amazon.com/emr/" }
  - { id: eks, text: "EMR on EKS submits Spark jobs on EKS without provisioning EMR clusters.", source: "https://aws.amazon.com/emr/" }
diagrams:
  - id: emr-node-roles
    title: EMR on EC2 node roles
    width: 800
    height: 300
    nodes:
      - { id: primary, label: Primary node, icon: res-ec2-instance, x: 50, y: 110, w: 160, h: 72, tone: compute }
      - { id: core, label: Core node, sub: "Tasks and HDFS", icon: res-ec2-instance, x: 540, y: 30, w: 170, h: 86, tone: compute }
      - { id: task, label: Task node, sub: "Tasks only", icon: res-ec2-instance, x: 540, y: 190, w: 170, h: 86, tone: compute }
    edges:
      - { from: primary, to: core, step: 1 }
      - { from: primary, to: task, step: 2 }
    steps:
      - "The primary coordinates core nodes, which process tasks and store HDFS data."
      - "The primary coordinates optional task nodes, which process tasks without HDFS storage."
cards:
  - id: emr-001
    q: "A team needs a managed platform for processing a large dataset with Apache Spark. Which AWS service fits?"
    a: "Amazon EMR runs data processing frameworks such as Apache Spark and Hadoop."
    facts: [platform]
  - id: emr-002
    q: "A team wants to process data stored in Amazon S3 using a managed Hadoop cluster. Which AWS service fits?"
    a: "Amazon EMR can run Hadoop processing steps that read input from S3 and write output to S3."
    facts: [platform, s3]
  - id: emr-003
    q: "An Amazon EMR on EC2 workload uses HDFS for cluster storage. Which nodes both store that data and run processing tasks?"
    a: "Core nodes. Terminating them risks losing HDFS data."
    facts: [core, core-loss]
  - id: emr-004
    q: "A data-critical Amazon EMR cluster needs lower-cost processing capacity while keeping HDFS data off interruptible instances. Which capacity mix fits?"
    a: "Use On-Demand primary and core nodes with Spot task nodes. Task nodes do not store persistent HDFS data."
    facts: [ondemand, task-loss]
  - id: emr-005
    q: "An Amazon EMR cluster needs extra processing capacity without adding HDFS storage. Which node type fits?"
    a: "Task nodes run processing tasks without storing data in HDFS. They are optional."
    facts: [task]
  - id: emr-006
    q: "An Amazon EMR cluster must tolerate the failure of a primary node. Which configuration supports failover?"
    a: "Use a cluster with three primary nodes. It can fail over and replace a failed primary."
    facts: [ha]
  - id: emr-007
    q: "A team wants to add interruptible compute to an Amazon EMR cluster that stores data in HDFS. Why are task nodes a suitable choice?"
    a: "Task nodes do not hold persistent HDFS data, so they are suitable for Spot capacity."
    facts: [task-loss]
  - id: emr-008
    q: "An Amazon EMR cluster needs custom setup on each node before data processing begins. Which feature fits?"
    a: "Use bootstrap actions. They run after instance launch and before application installation and processing, including on nodes added later."
    facts: [bootstrap]
  - id: emr-009
    q: "A nightly Amazon EMR processing job should release its cluster after the work finishes. What option fits?"
    a: "Configure the cluster to terminate automatically after its last step."
    facts: [terminate]
  - id: emr-010
    q: "An Amazon EMR processing job needs durable input and output outside its cluster. Which storage service can its steps use?"
    a: "Amazon S3. EMR processing steps can read input from S3 and write output there."
    facts: [s3]
  - id: emr-011
    q: "A team needs Spark processing without configuring or scaling clusters or servers. Which Amazon EMR option fits?"
    a: "Amazon EMR Serverless runs big data frameworks without configuring, managing or scaling clusters or servers."
    facts: [serverless]
  - id: emr-012
    q: "A team already runs Amazon EKS and wants to submit Spark jobs without provisioning Amazon EMR clusters. Which EMR option fits?"
    a: "Amazon EMR on EKS runs Spark jobs on EKS without provisioning EMR clusters."
    facts: [eks]
---

Amazon EMR is a managed platform for running distributed data processing frameworks such as Apache Spark and Hadoop. The examples below use EMR on EC2, where a cluster is a group of machines working on the data.

EMR Serverless runs big data frameworks without managing clusters or servers. EMR on EKS runs Spark jobs on an EKS cluster without provisioning EMR clusters.

### How it works

1. Choose processing applications and create an EC2 cluster. Each EC2 instance is a node.
2. Bootstrap actions, scripts that customize nodes, run before EMR installs the selected applications. They also run on nodes added later.
3. The primary node coordinates work. Core nodes process tasks and store data in HDFS, the Hadoop Distributed File System. Optional task nodes process tasks without HDFS storage.
4. Submit steps, units of work for the installed applications. Input and output can be in Amazon S3.
5. Configure the cluster to wait for further work or terminate after the last step.

| Node | Role | Consequence of loss |
| --- | --- | --- |
| Primary | Coordinates work and monitors health. | Losing the only primary ends the cluster; a three-primary cluster can fail over. |
| Core | Runs tasks and stores HDFS data. | Termination risks HDFS data loss. |
| Task | Runs tasks without storing HDFS data. | Persistent HDFS data is not stored on the node. |

### Exam cues

- If the question says managed Spark processing over large datasets, think EMR, because it runs distributed processing frameworks.
- If the question says Hadoop processing of newline-separated log files in S3, think EMR, because it can read S3 input and Hadoop accepts newline-separated text by default.
- If the question says data-critical HDFS with cheaper extra compute, think On-Demand primary and core nodes plus Spot task nodes, because task nodes do not store HDFS data.
- If the question says tolerate a primary node failure, think three primary nodes, because EMR can fail over to a standby and replace the failed node.
- If the question says install custom software before EMR applications, think bootstrap action, because it runs before application installation.

### Remember

- With instance groups, EMR 5.23.0 and later support three primary nodes for high availability. Instance fleets require a supported later release.
- A cluster can specify up to 16 bootstrap actions.
- EMR 7.10.0, released in August 2025, made S3A the default S3 connector. Earlier releases used EMRFS for `s3://` and `s3n://`; EMRFS remains configurable.
- Spot Instances are interruptible EC2 capacity. A Spot task node can be lost without losing persistent HDFS data on that node, but running work may still be affected.
- In EMR 6.x, YARN node labels are disabled by default. YARN manages application resources; enable labels and use the `CORE` expression to restrict application primary processes to core nodes.
- Instance fleets can mix instance types and On-Demand and Spot capacity.

> **Trap:** Spot task nodes do not store HDFS data, but do not assume application primary processes always run on core nodes. EMR 6.x disables node labels by default.
