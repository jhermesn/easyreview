---
title: Managed batch computing
level: foundational
order: 10
facts:
  - id: purpose
    text: AWS Batch runs batch computing workloads on AWS and removes the heavy lifting of configuring and managing the infrastructure, like traditional batch computing software.
    source: https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html#what-is-batch
  - id: provisioning
    text: AWS Batch provisions compute resources in response to submitted jobs and optimizes workload distribution by quantity and scale, to remove capacity constraints and reduce compute costs.
    source: https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html#what-is-batch
  - id: no-software
    text: AWS Batch is fully managed, so there is no batch computing software to install or manage.
    source: https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html#what-is-batch
  - id: capacity-types
    text: "AWS Batch runs containerized jobs on Amazon ECS or Amazon EKS and scales capacity on EC2 instances (including Spot), Fargate or ECS Managed Instances."
    source: https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html#what-is-batch
  - id: multi-node-parallel
    text: "Batch multi-node parallel jobs (gang scheduling) run one job across several EC2 instances, with a main node that starts first, for tightly coupled HPC or distributed GPU training."
    source: https://docs.aws.amazon.com/batch/latest/userguide/multi-node-parallel-jobs.html#multi-node-parallel-jobs
  - id: parallelcluster
    text: "AWS ParallelCluster is an open source tool that deploys HPC clusters with compute, a scheduler such as Slurm and a shared file system; AWS now points new HPC work to the managed AWS Parallel Computing Service."
    source: https://docs.aws.amazon.com/parallelcluster/latest/ug/what-is-aws-parallelcluster.html#what-is-aws-parallelcluster
cards:
  - id: batch-001
    q: Scientists submit thousands of compute jobs that must run on as many servers as needed and then stop. Which AWS service manages this?
    a: AWS Batch, which provisions compute resources for submitted jobs and scales with the workload.
    facts: [purpose, provisioning]
  - id: batch-002
    q: Does a team need to install a batch scheduler to use AWS Batch?
    a: No. AWS Batch is fully managed; there is no batch software to install or manage.
    trap: true
    facts: [no-software]
  - id: batch-003
    q: How does AWS Batch reduce compute costs for job workloads?
    a: It provisions resources only for submitted jobs and distributes the work by quantity and scale, so no idle fleet waits for jobs.
    facts: [provisioning]
  - id: batch-004
    q: "A nightly image job runs for three hours and needs a custom runtime. Lambda or AWS Batch?"
    a: "AWS Batch. Lambda stops at 15 minutes; Batch runs any container image as long as needed on EC2, Spot or Fargate capacity."
    facts: [capacity-types]
  - id: batch-005
    q: "Which AWS service manages infrastructure for batch computing workloads?"
    a: "AWS Batch runs batch jobs and manages the underlying infrastructure."
    facts: [purpose]
---
AWS Batch runs batch jobs: units of work, such as simulations or data processing, that run to completion without user interaction. You submit jobs; Batch finds and provisions the compute and spreads the work. [What is AWS Batch?](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html#what-is-batch)

### How it works

1. Define the job and the compute environment it may use.
2. Submit jobs to a queue.
3. Batch provisions compute, runs the jobs, and scales back when they finish.

### Exam cues

- If the question says run large numbers of batch jobs without managing servers or schedulers, think AWS Batch.

### Remember

- Fully managed; provisions compute per job demand.

> **Trap:** Batch is for jobs that run to completion. Event-driven functions that respond in milliseconds fit AWS Lambda better.
