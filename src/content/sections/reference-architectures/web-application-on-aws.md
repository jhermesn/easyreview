---
title: A web application on AWS
level: foundational
order: 5
facts:
  - id: shared
    text: Security and compliance are a shared responsibility between AWS and the customer, commonly described as security of the cloud versus security in the cloud.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: in-cloud
    text: Security in the cloud is the customer's part; it is determined by the services used, and also depends on the sensitivity of the data, the company's requirements and applicable laws and regulations.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html#lambda-security
  - id: ec2-customer
    text: For Amazon EC2, an IaaS service, the customer manages the guest operating system including updates and security patches, any software installed on the instances, and the security group firewall configuration.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: rds-patching
    text: Amazon RDS automatically schedules required operating system and database patching for patches related to security and instance reliability.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html#USER_UpgradeDBInstance.Maintenance.Overview.offline
  - id: global-infra
    text: "AWS is responsible for the global infrastructure that runs AWS services: the Regions, Availability Zones and edge locations."
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: region
    text: A Region is a geographical location where AWS clusters data centers; each Region is made of multiple independent, physically separate Availability Zones.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html#regions
  - id: az
    text: An Availability Zone is one or more discrete data centers with independent and redundant power, networking and connectivity in a Region.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones
  - id: multi-az
    text: An application that uses multiple Availability Zones is better protected from issues that affect one Availability Zone and, if architected correctly, stays up when one fails.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html#availability-zones
  - id: edge
    text: DNS routes a CloudFront request to the edge location (point of presence) that can best serve it, typically the nearest in latency, which returns cached content or fetches it from the origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html#HowCloudFrontWorksContentDelivery
  - id: waf
    text: AWS WAF filters HTTP(S) requests using rules to allow or block traffic to resources including API Gateway APIs and CloudFront distributions.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter
  - id: shield
    text: AWS gives automatic protection against common DDoS attacks such as UDP reflection and SYN floods at no extra cost.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html#shield-chapter
  - id: guardduty
    text: Amazon GuardDuty is a threat detection service that continuously analyzes AWS data sources and logs, using threat intelligence and machine learning, to find malicious activity such as compromised credentials.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty
  - id: guardduty-sources
    text: GuardDuty automatically ingests CloudTrail management events, EC2 VPC flow logs, and DNS logs as foundational data sources.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: inspector
    text: Amazon Inspector automatically discovers workloads such as EC2 instances and continually scans them for software vulnerabilities and unintended network exposure.
    source: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html#what-is-inspector
  - id: asg
    text: Amazon EC2 Auto Scaling keeps the right number of EC2 instances for the load, in collections called Auto Scaling groups with a minimum, desired and maximum size; scaling policies change the count within those limits.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#what-is-amazon-ec2-auto-scaling
  - id: replace
    text: An Auto Scaling group launches replacement instances after unexpected termination to maintain desired capacity.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-capacity-limits.html#asg-capacity-limits
  - id: elb
    text: Elastic Load Balancing spreads incoming traffic across targets such as EC2 instances, containers and IP addresses in one or more Availability Zones, and sends traffic only to healthy targets.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html#what-is-load-balancing
  - id: rds
    text: Amazon RDS is a managed service that makes it easier to set up, operate and scale a relational database and manages common database administration tasks.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome
  - id: rds-manages
    text: Amazon RDS manages backups, software patching, automatic failure detection and recovery, and offers high availability with a synchronous secondary instance and read replicas for read scaling.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.on-prem
  - id: vpc
    text: Amazon VPC launches AWS resources in a logically isolated virtual network that you define, closely resembling a traditional data center network.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
  - id: subnet
    text: A subnet is a range of IP addresses in a VPC and must reside in a single Availability Zone.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: public-private
    text: A public subnet routes directly to an internet gateway. A private subnet lacks that route, so its resources need a NAT device for internet access.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#configure-subnets
  - id: igw
    text: An internet gateway is a redundant, highly available VPC component for internet communication. Resources need a public IPv4 or public IPv6 address, an appropriate subnet route, and security controls that allow the traffic.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html#vpc-igw-internet-access
  - id: sg
    text: "A security group acts as a virtual firewall for an instance: only traffic its rules allow reaches it, and it is stateful, so responses are allowed back automatically."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups
  - id: nacl
    text: A network ACL allows or denies inbound and outbound traffic at the subnet level.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#vpc-network-acls
  - id: sg-stateful
    text: Security groups track connections and automatically allow response traffic for allowed requests regardless of opposite-direction rules.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#security-group-basics
  - id: acl-stateless
    text: Network ACLs do not track connections. Traffic between subnets must pass the source outbound and destination inbound rules; replies must pass both subnet ACLs in the reverse direction.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: route53
    text: Amazon Route 53 is a highly available and scalable DNS web service for domain registration, DNS routing and health checking.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html#Welcome
  - id: s3
    text: Amazon S3 is an object storage service for storing and protecting any amount of data for uses such as data lakes, websites, mobile applications, backup and restore, archive and big data analytics.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#Welcome
  - id: s3-durability
    text: Amazon S3 is designed for 99.999999999% (11 nines) durability, and S3 Standard for 99.99% availability.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html#DataDurability
  - id: cloudfront
    text: Amazon CloudFront speeds up delivery of static and dynamic web content by serving it from a worldwide network of edge locations.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction
  - id: oac
    text: Origin access control authenticates CloudFront requests to an S3 bucket origin.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-restricting-access-to-s3
diagrams:
  - id: web-application-on-aws
    title: A web application spread over two Availability Zones, protected at the edge
    facts: [shared, in-cloud, ec2-customer, rds-patching, global-infra, region, az, multi-az, edge, waf, shield, guardduty, guardduty-sources, inspector, asg, replace, elb, rds, rds-manages, vpc, subnet, public-private, igw, sg, nacl, sg-stateful, acl-stateless, route53, s3, s3-durability, cloudfront, oac]
    width: 1240
    height: 900
    groups:
      - { label: Region, x: 400, y: 20, w: 820, h: 860, tone: neutral, icon: group-region }
      - { label: VPC, x: 420, y: 200, w: 790, h: 670, tone: neutral, icon: group-virtual-private-cloud-vpc }
      - { label: Availability Zone A, x: 620, y: 240, w: 290, h: 610, tone: neutral }
      - { label: Availability Zone B, x: 930, y: 240, w: 270, h: 610, tone: neutral }
    nodes:
      - { id: users, label: Users, sub: browsers, x: 20, y: 400, w: 150, h: 86, tone: user, icon: res-users }
      - { id: r53, label: Route 53, sub: DNS, x: 220, y: 180, w: 160, h: 86, tone: network, icon: route-53 }
      - { id: cf, label: CloudFront, sub: edge locations, x: 220, y: 400, w: 160, h: 86, tone: network, icon: cloudfront, info: "Shield Standard protects it against common DDoS attacks at no extra cost." }
      - { id: waf, label: AWS WAF, sub: web ACL, x: 220, y: 600, w: 160, h: 86, tone: security, icon: waf }
      - { id: s3, label: S3 bucket, sub: images and files, x: 440, y: 70, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Private. CloudFront reaches it through origin access control." }
      - { id: insp, label: Inspector, sub: vulnerability scans, x: 660, y: 70, w: 160, h: 86, tone: security, icon: inspector }
      - { id: gd, label: GuardDuty, sub: threat detection, x: 980, y: 70, w: 160, h: 86, tone: security, icon: guardduty }
      - { id: igw, label: Internet gateway, sub: attached to VPC, x: 440, y: 260, w: 160, h: 86, tone: network, icon: res-vpc-internet-gateway }
      - { id: alb, label: Load balancer, sub: public subnets, x: 440, y: 450, w: 160, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer, info: "Its security group allows HTTPS from the internet; the instances' security group allows traffic only from the load balancer." }
      - { id: ec2a, label: EC2 instances, sub: private subnet A, x: 660, y: 300, w: 160, h: 86, tone: compute, icon: res-ec2-instance, info: "Part of an Auto Scaling group across both Availability Zones." }
      - { id: ec2b, label: EC2 instances, sub: private subnet B, x: 980, y: 300, w: 160, h: 86, tone: compute, icon: res-ec2-instance }
      - { id: rdsa, label: RDS primary, sub: private subnet A, x: 660, y: 620, w: 160, h: 86, tone: database, icon: rds }
      - { id: rdsb, label: RDS standby, sub: private subnet B, x: 980, y: 620, w: 160, h: 86, tone: database, icon: rds }
    edges:
      - { from: users, to: r53, step: 1 }
      - { from: users, to: cf, step: 2 }
      - { from: waf, to: cf, step: 2 }
      - { from: cf, to: s3, step: 3 }
      - { from: cf, to: igw, step: 4 }
      - { from: igw, to: alb, step: 4 }
      - { from: alb, to: ec2a, step: 5 }
      - { from: alb, to: ec2b, step: 5 }
      - { from: ec2a, to: rdsa, step: 6 }
      - { from: ec2b, to: rdsa, step: 6 }
      - { from: rdsa, to: rdsb, step: 6 }
      - { from: insp, to: ec2a, step: 7 }
      - { from: ec2b, to: gd, step: 8 }
      - { from: ec2b, to: rdsb, step: 9, dashed: true }
    steps:
      - "Users look up the site's name in Route 53, the AWS DNS service."
      - "Requests reach the nearest CloudFront edge location. AWS WAF filters them, and Shield Standard protects against common DDoS attacks."
      - "Images and files come from an S3 bucket, cached at the edge."
      - "Other requests go through the VPC's internet gateway to the load balancer in the public subnets."
      - "The load balancer spreads requests over EC2 instances in two Availability Zones. An Auto Scaling group adds or replaces instances as needed."
      - "The instances use an RDS database. RDS keeps a synchronous standby copy in the second Availability Zone."
      - "Amazon Inspector scans the instances for software vulnerabilities."
      - "GuardDuty analyzes the account's logs, such as VPC flow logs and DNS logs, to detect threats."
      - "If Availability Zone A fails, RDS switches to the standby, and the Auto Scaling group launches new instances in the healthy zone."
cards:
  - id: reference-architectures-177
    q: "In this web application, who patches the EC2 instances' operating system, and who patches the RDS database engine?"
    a: "The **customer** patches the guest OS on EC2. For RDS, **AWS** schedules the required OS and database patches. AWS always secures the physical infrastructure."
    facts: [shared, ec2-customer, rds-patching, global-infra]
  - id: reference-architectures-178
    q: "How does this design keep running when one Availability Zone fails?"
    a: "It runs in **two Availability Zones**: the Auto Scaling group replaces lost instances, and RDS switches to its standby in the other zone."
    facts: [multi-az, replace, rds-manages]
  - id: reference-architectures-179
    q: "Traffic doubles every evening and drops at night. Which feature adds and removes EC2 instances to match?"
    a: "**Amazon EC2 Auto Scaling**, which keeps the number of instances between a minimum and maximum. This is **elasticity**."
    facts: [asg]
  - id: reference-architectures-180
    q: "What does the load balancer do in this design?"
    a: "It spreads incoming requests across **healthy targets in several Availability Zones**, so no single instance takes all the traffic."
    facts: [elb]
  - id: reference-architectures-181
    q: "Why are the EC2 instances and the database in private subnets, while the load balancer is in public subnets?"
    a: "A **public subnet** has a route to the **internet gateway**; a private one does not. Only the load balancer needs to be reachable from the internet."
    facts: [public-private, igw, subnet, vpc]
  - id: reference-architectures-182
    q: "Which works at the instance level and remembers connections: a security group or a network ACL?"
    a: "A **security group**: instance level, **stateful**, allow rules only. A **network ACL** works at the subnet level and is **stateless**."
    trap: true
    facts: [sg, sg-stateful, nacl, acl-stateless]
  - id: reference-architectures-183
    q: "Match each service to its job: AWS WAF, AWS Shield Standard, Amazon GuardDuty, Amazon Inspector."
    a: "**WAF** filters web requests. **Shield Standard** blocks common DDoS attacks at no extra cost. **GuardDuty** detects threats in logs. **Inspector** scans for software vulnerabilities."
    trap: true
    facts: [waf, shield, guardduty, inspector]
  - id: reference-architectures-184
    q: "Which AWS service gives the application its domain name and DNS routing?"
    a: "**Amazon Route 53**."
    facts: [route53]
  - id: reference-architectures-185
    q: "Where should the application keep user-uploaded images, and how do users far away get them quickly?"
    a: "In **Amazon S3**, object storage designed for 11 nines of durability, served through **CloudFront** edge locations."
    facts: [s3, s3-durability, cloudfront, oac]
  - id: reference-architectures-186
    q: "Is an edge location the same as an Availability Zone?"
    a: "No. An **Availability Zone** is one or more data centers inside a Region. An **edge location** serves CloudFront content close to users."
    trap: true
    facts: [region, az, edge]
---
Cloud Practitioner questions often describe a simple website and ask which service does which job: where the files live, what spreads the traffic, what keeps it running when a data center fails and who is responsible for what. This design puts all of those pieces on one page.

### How it works

1. Route 53 answers DNS, and CloudFront serves users from edge locations, with AWS WAF and Shield Standard in front.
2. Static files live in Amazon S3; other requests go through the internet gateway to a load balancer.
3. EC2 instances in two Availability Zones run the application, and Auto Scaling adds or replaces them.
4. Amazon RDS stores the data, with a standby in the second Availability Zone.
5. Inspector scans the instances for vulnerabilities, and GuardDuty looks for threats in the logs.

| Part of the design | AWS is responsible for | The customer is responsible for |
|---|---|---|
| EC2 instances | Hardware, network, physical security | Guest OS patches, software, security groups |
| RDS database | Hardware, OS and database patching | Data, access, network settings |
| S3 bucket | Storage infrastructure | Data and who can access it |
| Regions and AZs | The global infrastructure | Choosing where to run |

| Need | Service |
|---|---|
| Domain name and DNS | Route 53 |
| Fast delivery worldwide | CloudFront |
| Filter web attacks | AWS WAF |
| DDoS protection | Shield Standard (automatic), Shield Advanced (paid) |
| Spread traffic | Elastic Load Balancing |
| Match capacity to demand | EC2 Auto Scaling |
| Managed relational database | Amazon RDS |
| Find vulnerabilities | Amazon Inspector |
| Detect threats | Amazon GuardDuty |

### Exam cues

- If the question says high availability, think multiple Availability Zones.
- If the question says elasticity, think Auto Scaling.
- If the question says distribute traffic, think a load balancer.
- If the question says block SQL injection or filter web requests, think AWS WAF.
- If the question says the customer's security responsibility on EC2, think the guest OS, software and security groups.

### Remember

- Region: a geographic area with several Availability Zones. Edge location: CloudFront cache near users.
- Security groups are stateful; network ACLs are stateless.
- Public subnet: route to an internet gateway.

> **Trap:** Running in one Availability Zone is not highly available, even with several instances. A zone failure takes them all down.
