---
title: Instance types
level: foundational
order: 1
facts:
  - id: instance-type
    text: An EC2 instance type determines the hardware of the host computer; each type offers different compute, memory and storage capabilities and belongs to an instance family grouped by those capabilities.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html#instance-types
  - id: general
    text: General purpose instances balance compute, memory and networking, which suits applications that use them in equal proportions, such as web servers and code repositories.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/gp.html#gp
  - id: compute
    text: Compute optimized instances suit compute-intensive applications that benefit from high-performance processors, such as batch processing, media transcoding, high-performance web servers, scientific modeling, dedicated gaming servers and machine learning inference.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/co.html#co
  - id: memory
    text: Memory optimized instances deliver fast performance for workloads that process large data sets in memory.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/mo.html#mo
  - id: storage
    text: Storage optimized instances suit workloads that need high, sequential read and write access to very large data sets on local storage, delivering tens of thousands of low-latency random IOPS.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/so.html#so
  - id: accelerated
    text: Accelerated computing instances use hardware accelerators, or co-processors, for functions such as floating point calculations, graphics processing or data pattern matching more efficiently than CPUs.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/ac.html#ac
  - id: hpc
    text: High-performance computing instances offer the best price performance for HPC workloads at scale, such as large, complex simulations and deep learning.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/hpc.html#hpc
  - id: ec2-purpose
    text: Amazon EC2 provides scalable compute capacity in the AWS Cloud as virtual servers (instances) that you configure and manage, including the operating system.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
cards:
  - id: ec2-030
    q: A company runs a web server that uses CPU, memory and network in roughly equal amounts. Which EC2 instance category fits?
    a: General purpose.
    facts: [general]
  - id: ec2-031
    q: A media company transcodes video and needs fast processors. Which EC2 instance category fits?
    a: Compute optimized.
    facts: [compute]
  - id: ec2-032
    q: An in-memory database processes very large data sets in RAM. Which EC2 instance category fits?
    a: Memory optimized.
    facts: [memory]
  - id: ec2-033
    q: A data warehouse needs very high sequential read and write throughput on local disks. Which EC2 instance category fits?
    a: Storage optimized.
    facts: [storage]
  - id: ec2-034
    q: A team trains machine learning models and renders graphics on GPUs. Which EC2 instance category fits?
    a: Accelerated computing, which uses hardware accelerators such as GPUs.
    facts: [accelerated]
  - id: ec2-035
    q: Does choosing a bigger general purpose EC2 instance give the same result as choosing a memory optimized one for a large in-memory data set?
    a: No. Memory optimized instances are built for large in-memory data sets; the category, not only the size, should match the workload.
    trap: true
    facts: [memory, instance-type]
  - id: ec2-056
    q: A company needs virtual servers in AWS where it controls the operating system and installed software. Which service fits?
    a: Amazon EC2, which provides virtual servers (instances) that you configure and manage.
    facts: [ec2-purpose]
---
An EC2 instance type sets the CPU, memory, storage and networking of a virtual server. Types are grouped into categories by what they're good at, so the first choice is the category that matches the workload. [Amazon EC2 instance types](https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html#instance-types)

### How it works

1. Identify the workload's bottleneck: CPU, memory, local disk, or specialized math such as graphics.
2. Pick the matching category, then the family and size inside it.
3. Measure and resize as usage changes (right-sizing).

| Category | Strength | Example workloads |
|---|---|---|
| General purpose | Balanced compute, memory and network | Web servers, code repositories |
| Compute optimized | High-performance processors | Batch processing, media transcoding, gaming servers, ML inference |
| Memory optimized | Large data sets in memory | In-memory databases, real-time analytics |
| Storage optimized | High sequential I/O on local storage | Data warehousing, large data sets on local disks |
| Accelerated computing | Hardware accelerators such as GPUs | Graphics, ML training, pattern matching |
| High-performance computing | Price performance for HPC at scale | Large simulations, deep learning |

### Exam cues

- If the question says balanced or general web workload, think general purpose.
- If the question says CPU-bound processing, think compute optimized.
- If the question says large in-memory data sets, think memory optimized.
- If the question says high I/O on local storage, think storage optimized.
- If the question says GPUs or graphics, think accelerated computing.

### Remember

- Six categories: general purpose, compute, memory, storage, accelerated computing, HPC.

> **Trap:** "Storage optimized" is about fast local instance storage, not about the most EBS capacity. Large EBS volumes attach to any category.
