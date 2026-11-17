---
title: VMware workloads on AWS
level: associate
order: 10
facts:
  - id: fit
    text: VMware Cloud on AWS fits when workloads already run on premises in vSphere, need a fast migration of many VMs, must keep their IP addresses, or need Oracle RAC in the cloud.
    source: https://docs.aws.amazon.com/whitepapers/latest/oracle-database-aws-best-practices/choosing-between-amazon-rds-amazon-ec2-or-vmware-cloud-on-aws-for-your-oracle-database.html
  - id: bare-metal
    text: VMware Cloud on AWS gives workloads the NVMe storage performance of Amazon EC2 bare metal hosts with data persistence.
    source: https://docs.aws.amazon.com/whitepapers/latest/oracle-database-aws-best-practices/choosing-between-amazon-rds-amazon-ec2-or-vmware-cloud-on-aws-for-your-oracle-database.html
  - id: resale
    text: Since April 30, 2024, AWS and its channel partners no longer resell VMware on AWS; it stays available through Broadcom.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/transitioning-from-vmware-to-the-aws-cloud/introduction.html
  - id: evs
    text: Amazon Elastic VMware Service (Amazon EVS) deploys and runs a VMware Cloud Foundation environment on EC2 bare metal instances inside your Amazon VPC.
    source: https://docs.aws.amazon.com/evs/latest/userguide/what-is-evs.html#what-is-evs
  - id: evs-migrate
    text: Amazon EVS lets you extend on-premises networks and migrate VMware workloads without changing IP addresses, retraining staff or rewriting runbooks.
    source: https://docs.aws.amazon.com/evs/latest/userguide/what-is-evs.html#servicename-feature-overview
cards:
  - id: vmware-cloud-on-aws-001
    q: A company runs 2,000 VMs in on-premises vSphere and must move them to AWS within weeks, keeping IP addresses and VMware tooling. Which approach fits?
    a: "Run the VMs in a VMware environment on AWS: **VMware Cloud on AWS** (through Broadcom) or **Amazon EVS**.\nNo re-platforming and the IP addresses stay the same."
    facts: [fit, evs-migrate, resale]
  - id: vmware-cloud-on-aws-002
    q: Which AWS option runs Oracle Real Application Clusters (RAC) in the cloud, according to AWS's Oracle guidance?
    a: "VMware Cloud on AWS."
    facts: [fit]
  - id: vmware-cloud-on-aws-003
    q: Who sells VMware Cloud on AWS since April 30, 2024?
    a: "Broadcom. AWS and its channel partners no longer resell it."
    facts: [resale]
  - id: vmware-cloud-on-aws-004
    q: What does Amazon Elastic VMware Service (Amazon EVS) deploy, and where?
    a: "A VMware Cloud Foundation environment on EC2 bare metal instances inside your own VPC."
    facts: [evs]
---
VMware Cloud on AWS is the relocate option for VMware estates: the same vSphere tools and VMs, running on AWS hardware next to native services. In 2024 its sale moved to Broadcom, and AWS added Amazon EVS for running VMware Cloud Foundation in your own VPC. [Choosing between RDS, EC2 or VMware Cloud on AWS](https://docs.aws.amazon.com/whitepapers/latest/oracle-database-aws-best-practices/choosing-between-amazon-rds-amazon-ec2-or-vmware-cloud-on-aws-for-your-oracle-database.html)

### How it works

1. A VMware software-defined data center runs on EC2 bare metal hosts.
2. Workloads move from on-premises vSphere with VMware tools, keeping their IP addresses.
3. VMs reach native AWS services over the network.

### Exam cues

- If the question says vSphere, VMware tools, keep IP addresses, or move hundreds of VMs fast with no changes, think VMware Cloud on AWS (or Amazon EVS).
- If the question says Oracle RAC in the cloud, think VMware Cloud on AWS.
- If the question says modernize or reduce licensing, think rehosting to EC2 or moving to managed services instead.

### Remember

- Relocate strategy: no VM conversion.
- AWS resale ended April 30, 2024; available through Broadcom.
- Amazon EVS: VMware Cloud Foundation on EC2 bare metal in your VPC.

> **Trap:** Moving VMs into native EC2 instances is rehosting (for example with AWS Application Migration Service). Keeping the VMware platform is relocating, and that is VMware Cloud on AWS or EVS.
