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
  - id: mac-instances
    text: "EC2 Mac instances run macOS on Apple hardware for building, testing and signing apps for Apple platforms such as iPhone, iPad and Mac; they run only on Dedicated Hosts with a 24-hour minimum allocation."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html#ec2-mac-instances
  - id: user-data-root
    text: On Linux, EC2 user data scripts run as root on the first boot by default; the instance can be configured to run them again on later restarts.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts
  - id: stop-loss
    text: Stopping, hibernating or terminating an instance erases its instance store data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: temporary-use
    text: Instance store suits temporary data such as caches, buffers and scratch files.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#InstanceStorage
  - id: copy-durable
    text: To preserve instance store data beyond the instance lifetime, copy it to persistent storage such as EBS, S3 or EFS.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: host-disks
    text: Instance store is temporary block storage on disks physically attached to the host computer, suited to buffers, caches and scratch data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html
  - id: no-charge
    text: Instance store volumes have no additional charge; they are included in the instance usage cost.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html
  - id: ami-template
    text: An Amazon Machine Image (AMI) supplies the software used to set up and boot an EC2 instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
  - id: compatible-type
    text: An AMI must be compatible with the instance type selected for launch.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
  - id: launch-user-data
    text: EC2 user data can provide scripts for automated configuration at instance launch.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
  - id: instance-metadata
    text: Instance metadata describes a running EC2 instance and can be used to configure or manage it.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
  - id: metadata-examples
    text: EC2 instance metadata includes the instance ID and, when available, the kernel ID and instance role credentials.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
  - id: optional-elastic-ip
    text: An Elastic IP address is optional for an EC2 instance and provides a persistent public IPv4 address.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-networking.html
  - id: windows-rdp
    text: Remote Desktop can connect to a Windows EC2 instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-rdp.html
  - id: environment-tags
    text: EC2 resource tags can categorize instances by environment.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
  - id: ami-copy-region
    text: An EC2 AMI can be copied to another Region and used there to launch instances with a consistent configuration.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html
  - id: ebs-console-data-termination
    text: An EBS data volume attached at launch in the EC2 console persists by default after instance termination and continues to incur charges.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-ec2-instance-termination-works.html
  - id: ami-instance-recovery
    text: An AMI created from a customized EC2 instance can launch another instance with those customizations.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html
  - id: ami-volume-snapshots
    text: Creating an EBS-backed AMI from an EC2 instance creates snapshots of its root volume and attached EBS volumes.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html
  - id: default-subnet
    text: If a Region has a default VPC and no subnet is specified for an EC2 launch, AWS selects a default subnet.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html
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
  - id: ec2-084
    q: "A team needs cloud machines to build and sign its iOS app. Which EC2 option fits?"
    a: "EC2 Mac instances, which run macOS on Apple hardware. They run on Dedicated Hosts, billed per host with a 24-hour minimum."
    facts: [mac-instances]
  - id: ec2-070
    q: A user data script on an EC2 instance uses sudo, and an admin expects it to run on every reboot. What is wrong with both assumptions?
    a: "On Linux, user data runs as root and only on first boot by default. Configure repeated execution if it must run on later restarts."
    trap: true
    facts: [user-data-root]
  - id: ec2-001
    q: What happens to EC2 instance store data when its instance stops, hibernates or terminates?
    a: It is erased. Use instance store for temporary data, and copy anything that must survive to persistent storage.
    facts: [stop-loss, temporary-use, copy-durable]
  - id: ec2-050
    q: An application needs very fast temporary block storage for scratch data, at no extra storage cost. Which EC2 storage option fits?
    a: "Instance store.\nIts disks are attached to the host and are included in the instance price, but data is lost when the instance stops or terminates."
    facts: [host-disks, no-charge]
  - id: ec2-009
    q: What does an EC2 AMI provide, and what compatibility must a launch satisfy?
    a: The software to set up and boot an instance. The AMI must support the chosen instance type.
    facts: [ami-template, compatible-type]
  - id: ec2-129
    q: A team wants an EC2 instance to run configuration scripts at launch. Should it use user data or instance metadata?
    a: User data supplies launch configuration scripts. Instance metadata describes the running instance.
    facts: [launch-user-data, instance-metadata]
  - id: ec2-130
    q: Which EC2 feature can categorize instances by environment?
    a: Resource tags.
    facts: [environment-tags]
  - id: ec2-131
    q: Which client protocol can connect to a Windows EC2 instance's desktop?
    a: Remote Desktop Protocol (RDP).
    facts: [windows-rdp]
  - id: ec2-137
    q: How can a team launch an EC2 instance with the same AMI configuration in another Region?
    a: Copy the AMI to the destination Region and launch an instance from the copy.
    facts: [ami-copy-region]
  - id: ec2-138
    q: What happens by default to an EBS data volume attached at EC2 launch using the console when the instance terminates?
    a: The volume persists and continues to incur charges.
    facts: [ebs-console-data-termination]
  - id: ec2-140
    q: How can a team use a customized EC2 instance to prepare a replacement instance?
    a: Create an AMI from the customized instance and launch a replacement from that AMI.
    facts: [ami-instance-recovery]
  - id: ec2-141
    q: What happens to attached EBS volumes when EC2 creates an EBS-backed AMI from an instance?
    a: EC2 creates snapshots of the root and attached EBS volumes.
    facts: [ami-volume-snapshots]
  - id: ec2-144
    q: What subnet can EC2 select when a launch does not specify one and a default VPC exists?
    a: A default subnet in the Region's default VPC.
    facts: [default-subnet]
---
An EC2 instance type sets the CPU, memory, storage and networking of a virtual server. Types are grouped into categories by what they're good at, so the first choice is the category that matches the workload.

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

- If the question says an EC2 instance needs a persistent public IPv4 address, think an Elastic IP address, because it is optional and can be moved.
- If the question says launch an EC2 instance without specifying a subnet, think a default subnet when a default VPC exists, because AWS can select one.
- If the question says launch a replacement with an EC2 instance's customizations, think an AMI created from the instance, because it can launch another instance.
- If the question says launch the same EC2 image in another Region, think copy the AMI first, because an AMI is regional.
- If the question says configure an EC2 instance at launch, think user data, because it can run configuration scripts.
- If the question says balanced or general web workload, think general purpose.
- If the question says CPU-bound processing, think compute optimized.
- If the question says large in-memory data sets, think memory optimized.
- If the question says high I/O on local storage, think storage optimized.
- If the question says GPUs or graphics, think accelerated computing.

### Remember

- Six categories: general purpose, compute, memory, storage, accelerated computing, HPC.

> **Trap:** "Storage optimized" is about fast local instance storage, not about the most EBS capacity. Large EBS volumes attach to any category.
