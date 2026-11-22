---
title: Cost-optimized batch processing
level: associate
order: 56
facts:
  - id: batch
    text: AWS Batch runs batch computing workloads on AWS and removes the heavy lifting of configuring and managing the infrastructure, like traditional batch computing software.
    source: https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html#what-is-batch
  - id: batch-capacity
    text: AWS Batch runs containerized jobs on Amazon ECS or Amazon EKS and scales capacity on EC2 instances (including Spot), Fargate or ECS Managed Instances.
    source: https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html#what-is-batch
  - id: emr
    text: Amazon EMR is a managed cluster platform for running big data frameworks such as Apache Hadoop and Apache Spark.
    source: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html#emr-what-is-emr
  - id: fargate
    text: AWS Fargate runs containers without provisioning, configuring or scaling clusters of EC2 instances; you set CPU and memory per task.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#AWS_Fargate
  - id: lambda-timeout
    text: A Lambda function's timeout defaults to 3 seconds and can be set in 1-second steps up to 1,800 seconds (30 minutes).
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html
  - id: on-demand
    text: On-Demand Instances are paid by the second for the instances you launch, with no commitment.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html#instance-purchasing-options
  - id: spot
    text: Spot Instances use spare EC2 capacity at steep discounts and suit applications that are flexible about when they run and can be interrupted, such as batch jobs, data analysis and background processing.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html#using-spot-instances
  - id: spot-90
    text: Spot Instances are available at up to a 90% discount compared with On-Demand prices.
    source: https://aws.amazon.com/ec2/spot/
  - id: spot-notice
    text: "EC2 Spot interruption notices are best effort: stop and termination notices give two minutes of warning, while a hibernation notice arrives as hibernation begins."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html#spot-instance-termination-notices
  - id: savings-plans
    text: Savings Plans can save up to 72% on compute; Compute Savings Plans apply regardless of instance family, size, OS, tenancy or Region, and also to AWS Fargate and AWS Lambda.
    source: https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html#what-is-savings-plans
  - id: reserved
    text: Reserved Instances lower costs in exchange for a commitment to a consistent instance configuration, including instance type and Region, for 1 or 3 years; they are a billing discount, not physical instances.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html#ec2-reserved-instances
  - id: prefer-sp
    text: AWS recommends Savings Plans over Reserved Instances; both offer up to 72% off On-Demand, but Savings Plans don't tie you to an instance configuration.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html#ec2-reserved-instances
  - id: s3-eventbridge
    text: Enabling EventBridge on an S3 bucket sends all supported events to EventBridge, where rules select events and targets.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html#EventBridge
  - id: sns
    text: "Amazon SNS delivers messages from publishers to subscribers: publishers send to a topic, and every subscriber of the topic receives the message."
    source: https://docs.aws.amazon.com/sns/latest/dg/welcome.html#welcome
  - id: intelligent-tiering
    text: S3 Intelligent-Tiering is for data with unknown, changing or unpredictable access patterns; it charges per-object monitoring and automation fees but no retrieval fees.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: deep-archive
    text: S3 Glacier Deep Archive is for archives accessed less than once a year, with retrieval in hours and a 180-day minimum storage duration; it is the lowest-cost class.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: lifecycle-rules
    text: S3 Lifecycle rules schedule transitions or expiration for all objects in a bucket, or select a subset with filters such as a key prefix or object tags.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-filters.html#filter-examples
  - id: lifecycle-early
    text: Deleting, overwriting, or transitioning objects out of a class before its minimum storage duration can incur remaining-duration charges.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints
  - id: eb-batch
    text: EventBridge rules can send events to a Batch job queue as a target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html
  - id: job-queue
    text: Batch jobs wait in a job queue until they can be scheduled on a compute environment; for example, one queue can use On-Demand Instances for high-priority jobs and another Spot Instances.
    source: https://docs.aws.amazon.com/batch/latest/userguide/job_queues.html
  - id: ce-order
    text: A job queue tries its compute environments for job placement in ascending order, so the one with the lower order value is tried first.
    source: https://docs.aws.amazon.com/batch/latest/APIReference/API_ComputeEnvironmentOrder.html
  - id: spot-allocation
    text: The SPOT_PRICE_CAPACITY_OPTIMIZED allocation strategy picks Spot pools that are least likely to be interrupted and have the lowest price; AWS recommends it over SPOT_CAPACITY_OPTIMIZED in most cases.
    source: https://docs.aws.amazon.com/batch/latest/userguide/allocation-strategies.html
  - id: retry
    text: A Batch job gets one attempt by default; a retry strategy in the job definition or at submission allows 1 to 10 attempts, for failures such as a non-zero exit code or an EC2 instance failing or being terminated.
    source: https://docs.aws.amazon.com/batch/latest/userguide/job_retries.html
  - id: batch-events
    text: AWS Batch sends an event to EventBridge whenever the status of a submitted job changes.
    source: https://docs.aws.amazon.com/batch/latest/userguide/batch_cwe_events.html
  - id: standard-ia
    text: S3 Standard-IA is for long-lived, infrequently accessed data (about once a month) with millisecond access, a 30-day minimum storage duration and per-GB retrieval fees.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: glacier-ir
    text: S3 Glacier Instant Retrieval is for archive data accessed about once a quarter that needs millisecond access, with a 90-day minimum storage duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: glacier-flexible
    text: S3 Glacier Flexible Retrieval is for archives accessed about once a year, with retrieval in minutes to hours, a 90-day minimum, and objects restored before access.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
diagrams:
  - id: cost-optimized-batch-processing
    title: File-triggered batch jobs on Spot with an On-Demand fallback and tiered storage
    facts: [batch, batch-capacity, emr, fargate, lambda-timeout, on-demand, spot, spot-90, spot-notice, savings-plans, reserved, prefer-sp, s3-eventbridge, sns, intelligent-tiering, deep-archive, lifecycle-rules, lifecycle-early, eb-batch, job-queue, ce-order, spot-allocation, retry, batch-events, standard-ia, glacier-ir, glacier-flexible]
    width: 1240
    height: 740
    groups:
      - { label: Region, x: 200, y: 20, w: 1020, h: 700, tone: neutral, icon: group-region }
    nodes:
      - { id: producers, label: Data producers, sub: daily files, x: 20, y: 330, w: 150, h: 86, tone: user, icon: res-users }
      - { id: input, label: Input bucket, sub: S3 Standard, x: 250, y: 330, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: eb, label: EventBridge, sub: object created, x: 250, y: 90, w: 160, h: 86, tone: integration, icon: eventbridge }
      - { id: archive, label: Deep Archive, sub: lifecycle rule, x: 250, y: 580, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Lowest-cost class, retrieval in hours, 180-day minimum storage duration." }
      - { id: queue, label: Job queue, sub: AWS Batch, x: 470, y: 90, w: 170, h: 86, tone: compute, icon: batch, info: "Tries its compute environments in ascending order: Spot first, then On-Demand." }
      - { id: sns, label: SNS topic, sub: failure alert, x: 470, y: 330, w: 170, h: 86, tone: integration, icon: simple-notification-service }
      - { id: spot, label: Spot instances, sub: compute env 1, x: 720, y: 90, w: 180, h: 86, tone: compute, icon: res-ec2-instances, info: "Uses SPOT_PRICE_CAPACITY_OPTIMIZED. Jobs have a retry strategy, because Spot capacity can be reclaimed with a two-minute notice." }
      - { id: failrule, label: Failed job rule, sub: EventBridge, x: 720, y: 330, w: 180, h: 86, tone: integration, icon: res-eventbridge-rule }
      - { id: od, label: On-Demand, sub: compute env 2, x: 720, y: 560, w: 180, h: 86, tone: compute, icon: res-ec2-instances }
      - { id: ecr, label: ECR, sub: job images, x: 980, y: 90, w: 170, h: 86, tone: integration, icon: elastic-container-registry }
      - { id: output, label: Output bucket, sub: Intelligent-Tiering, x: 980, y: 330, w: 170, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Results with unpredictable access: no retrieval fees, a small monitoring fee per object." }
      - { id: sp, label: Savings Plan, sub: steady baseline, x: 980, y: 560, w: 170, h: 86, tone: mgmt, icon: cost-explorer, info: "A Compute Savings Plan commits to a steady USD per hour of use and also applies to Fargate and Lambda." }
    edges:
      - { from: sp, to: od, step: 1 }
      - { from: producers, to: input, step: 2 }
      - { from: input, to: eb, step: 3 }
      - { from: eb, to: queue, step: 3 }
      - { from: queue, to: spot, step: 4 }
      - { from: ecr, to: spot, step: 4 }
      - { from: queue, to: od, step: 5 }
      - { from: spot, to: output, step: 6 }
      - { from: od, to: output, step: 6 }
      - { from: input, to: archive, step: 7 }
      - { from: spot, to: failrule, step: 8, dashed: true }
      - { from: failrule, to: sns, step: 8, dashed: true }
    steps:
      - "A Compute Savings Plan covers the steady part of the On-Demand usage at a lower rate."
      - "Producers upload input files to an S3 bucket."
      - "With EventBridge enabled on the bucket, a rule matches new objects and submits a job to the Batch job queue."
      - "The queue tries the Spot compute environment first. Batch launches Spot instances from the least interrupted, lowest priced pools, and they pull the job image from ECR."
      - "If the Spot environment cannot take the jobs, the queue tries the On-Demand environment next."
      - "Jobs write results to a bucket in S3 Intelligent-Tiering, because nobody knows how often each result will be read."
      - "A lifecycle rule moves raw input files to S3 Glacier Deep Archive once processing is done."
      - "If Spot reclaims an instance, the retry strategy runs the job again. When a job still ends FAILED, Batch's status event matches an EventBridge rule that alerts the team through SNS."
cards:
  - id: reference-architectures-109
    q: Thousands of containerized jobs run every night, and the team does not want to install a scheduler or size the cluster. Which service fits?
    a: "**AWS Batch**, which provisions compute for submitted jobs and runs them on EC2 (including Spot), Fargate or ECS Managed Instances."
    facts: [batch, batch-capacity]
  - id: reference-architectures-110
    q: Batch jobs can be interrupted and rerun, and cost matters more than finishing at a fixed time. Which EC2 purchasing option fits?
    a: "**Spot Instances**: spare capacity at up to 90% off On-Demand, suited to interruptible work such as batch jobs."
    facts: [spot, spot-90]
  - id: reference-architectures-111
    q: A workload runs a steady baseline 24/7 on EC2, Fargate and Lambda, and instance families may change next year. Which commitment fits?
    a: "A **Compute Savings Plan**: a USD-per-hour commitment for 1 or 3 years that applies across instance families, Regions, Fargate and Lambda."
    facts: [savings-plans, prefer-sp]
  - id: reference-architectures-112
    q: Why does AWS recommend Savings Plans over Reserved Instances for most new commitments?
    a: "Both give up to 72% off, but **Reserved Instances** tie the discount to an instance configuration and Region, while **Savings Plans** do not."
    trap: true
    facts: [reserved, prefer-sp]
  - id: reference-architectures-113
    q: Batch jobs on Spot sometimes fail when an instance is reclaimed. How can they rerun automatically?
    a: "Set a **retry strategy** on the job definition or submission: 1 to 10 attempts, covering failures such as an instance being terminated."
    facts: [retry, spot-notice]
  - id: reference-architectures-114
    q: Which AWS Batch allocation strategy does AWS recommend for most Spot compute environments?
    a: "**SPOT_PRICE_CAPACITY_OPTIMIZED**, which picks the pools least likely to be interrupted and with the lowest price."
    facts: [spot-allocation]
  - id: reference-architectures-115
    q: A job takes 40 minutes per file. A team proposes Lambda triggered by S3 uploads. Why will that fail, and what fits?
    a: "A Lambda function times out after at most **1,800 seconds (30 minutes)**. Run long jobs on **AWS Batch** or containers instead."
    trap: true
    facts: [lambda-timeout, batch]
  - id: reference-architectures-116
    q: Nightly processing runs Apache Spark over terabytes of data. Which managed service fits better than AWS Batch?
    a: "**Amazon EMR**, a managed cluster platform for big data frameworks such as Hadoop and Spark."
    facts: [emr]
  - id: reference-architectures-117
    q: Output files are read heavily for some customers and never for others, and nobody can predict which. Which storage class fits?
    a: "**S3 Intelligent-Tiering**, built for unknown or changing access, with monitoring fees but no retrieval fees."
    facts: [intelligent-tiering]
  - id: reference-architectures-118
    q: Raw input files must be kept for 7 years, are almost never read, and a restore can take hours. How are they stored most cheaply?
    a: "An **S3 Lifecycle** rule that transitions them to **S3 Glacier Deep Archive**, the lowest-cost class."
    facts: [lifecycle-rules, deep-archive]
  - id: reference-architectures-119
    q: A lifecycle rule moves files to Glacier Deep Archive, and another rule deletes them 30 days later. Why is the bill higher than expected?
    a: "Deep Archive has a **180-day minimum storage duration**. Deleting earlier still charges for the remaining days."
    trap: true
    facts: [deep-archive, lifecycle-early, standard-ia, glacier-ir]
  - id: reference-architectures-120
    q: The operations team must be alerted when a Batch job finally fails. What fits with no polling?
    a: "Batch sends **job status change events to EventBridge**; a rule matching FAILED jobs sends the event to an **SNS topic**."
    facts: [batch-events, sns]
revised:
  - date: 2026-11-19
    note: The maximum Lambda function timeout is now 1,800 seconds (30 minutes), up from 900 seconds (15 minutes).
    cards: [reference-architectures-115]
---
Cost questions about batch work give a nightly or event-driven workload, say it can be interrupted or must finish by morning, and ask for the cheapest design. The answer combines the right compute service, the right purchasing option for each part of the load, and storage classes that follow how the data is used.

### How it works

1. With EventBridge enabled on the input bucket, a rule submits a job to an AWS Batch job queue for each new file.
2. The queue tries a Spot compute environment first and an On-Demand one next. A retry strategy reruns jobs that lose their Spot instance.
3. A Compute Savings Plan covers the steady On-Demand baseline; Spot covers the flexible part.
4. Results land in S3 Intelligent-Tiering. A lifecycle rule moves raw input to Glacier Deep Archive.
5. Batch job status events go to EventBridge, so a rule alerts the team through SNS when a job fails.

| Need | Compute |
|---|---|
| Short tasks, up to 30 minutes | Lambda |
| Containerized jobs, scheduler managed for you | AWS Batch |
| Hadoop or Spark over large datasets | Amazon EMR |
| Containers with no instances to manage | Fargate |

| Load | Purchasing option |
|---|---|
| Interruptible, flexible start time | Spot Instances |
| Steady 24/7 baseline, may change instance family | Compute Savings Plans |
| Short, unpredictable, cannot be interrupted | On-Demand |

| Access pattern | Storage class |
|---|---|
| Unknown or changing | S3 Intelligent-Tiering |
| About once a month, millisecond access | S3 Standard-IA |
| Less than once a year, hours to restore | S3 Glacier Deep Archive |

### Exam cues

- If the question says batch jobs that can be interrupted at the lowest cost, think Spot, because it is spare capacity at a steep discount.
- If the question says run containerized batch jobs without managing a scheduler, think AWS Batch.
- If the question says Spark or Hadoop, think EMR.
- If the question says a steady baseline across EC2, Fargate and Lambda, think Compute Savings Plans.
- If the question says access patterns are unknown, think S3 Intelligent-Tiering.
- If the question says keep data for years and rarely read it, think a lifecycle rule to Glacier Deep Archive.

### Remember

- Lambda timeout: 1,800 seconds (30 minutes) at most.
- Spot: up to 90% off, two-minute interruption notice; design jobs to retry.
- Savings Plans and Reserved Instances: up to 72% off; Savings Plans are not tied to an instance configuration.
- Minimum storage durations: 30 days for the IA classes, 90 for Glacier Instant and Flexible Retrieval, 180 for Deep Archive.

> **Trap:** Spot is the cheapest compute, but not for work that cannot be interrupted or retried. Put the steady, must-run part on a Savings Plan or On-Demand.
