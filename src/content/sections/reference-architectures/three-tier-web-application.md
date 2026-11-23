---
title: Highly available three-tier web application
level: associate
order: 10
facts:
  - id: alias-apex
    text: A Route 53 alias record can point the zone apex, such as example.com, at a CloudFront distribution or other supported AWS resource, which a CNAME record cannot do.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html
  - id: oac
    text: CloudFront can send authenticated requests to an S3 origin with origin access control (OAC), so the bucket stays private; AWS recommends OAC over the older origin access identity.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
  - id: alb-two-azs
    text: An Application Load Balancer needs subnets in at least two Availability Zones.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html
  - id: asg-multi-az
    text: EC2 Auto Scaling replaces instances it finds unhealthy, and a group that spans several Availability Zones can launch instances in another zone when one becomes unavailable.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html
  - id: shared-store
    text: AWS recommends keeping session state in a shared backing store such as ElastiCache, DynamoDB or RDS, so any instance can serve any user and instances can scale without losing sessions.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-asp-net-web-forms/ha-scaling.html#backing-store
  - id: aurora-storage
    text: An Aurora cluster volume keeps copies of the data across three Availability Zones in the Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html
  - id: aurora-replicas
    text: An Aurora cluster can have up to 15 Aurora Replicas that share the cluster volume and serve reads; placing them in other Availability Zones keeps the cluster highly available.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html
  - id: nat-per-az
    text: A NAT gateway lives in one Availability Zone; to stay resilient, create one in each zone and route each zone's private subnets to the NAT gateway in the same zone.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html
  - id: sg-reference
    text: A security group rule can name another security group as its source, allowing traffic from every instance associated with that group over private IP addresses.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html
  - id: waf
    text: AWS WAF filters HTTP(S) requests using rules to allow or block traffic to resources including API Gateway APIs and CloudFront distributions.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter
  - id: shield-standard
    text: AWS gives automatic protection against common DDoS attacks such as UDP reflection and SYN floods at no extra cost.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html#shield-chapter
  - id: edge-ddos
    text: Serving traffic through Amazon CloudFront and Amazon Route 53, which run in edge locations, is an AWS best practice for DDoS resilience because attacks are absorbed at the edge.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/aws-best-practices-ddos-resiliency.html
  - id: acm
    text: AWS Certificate Manager creates, stores and renews public and private SSL/TLS certificates that protect websites and applications on AWS.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
  - id: acm-integrated
    text: ACM certificates are deployed to integrated AWS services such as Elastic Load Balancing and CloudFront.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
  - id: rds-kms
    text: Amazon RDS encrypts DB instances at rest with an AWS KMS key, either the AWS managed key for RDS (the default) or a customer managed key you choose when creating the instance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Overview
  - id: rds-encrypt-existing
    text: To encrypt an unencrypted RDS DB instance or change its KMS key, copy a manual snapshot with encryption enabled and restore it, or use a blue/green deployment with an encrypted green environment.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Limitations
  - id: target-tracking
    text: Target tracking adjusts group capacity toward a metric target and manages the associated CloudWatch alarms.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-scaling-target-tracking
diagrams:
  - id: three-tier-web-application
    title: Three-tier web application across two Availability Zones
    facts: [alias-apex, oac, alb-two-azs, asg-multi-az, shared-store, aurora-storage, aurora-replicas, nat-per-az, sg-reference, waf, shield-standard, edge-ddos, acm, acm-integrated, rds-kms, rds-encrypt-existing, target-tracking]
    width: 1240
    height: 900
    groups:
      - { label: Region, x: 380, y: 20, w: 840, h: 860, tone: neutral, icon: group-region }
      - { label: VPC, x: 400, y: 165, w: 800, h: 560, tone: network, icon: group-virtual-private-cloud-vpc }
      - { label: Availability Zone A, x: 420, y: 200, w: 760, h: 200, tone: neutral }
      - { label: Availability Zone B, x: 420, y: 520, w: 760, h: 190, tone: neutral }
      - { label: Auto Scaling group, x: 675, y: 205, w: 190, h: 495, tone: compute, icon: group-auto-scaling-group }
    nodes:
      - { id: users, label: Users, x: 20, y: 344, w: 130, h: 72, tone: user, icon: res-users }
      - { id: dns, label: Route 53, sub: "alias at apex", x: 20, y: 103, w: 130, h: 86, tone: network, icon: route-53, info: "An **alias** record at the zone apex points example.com at the CloudFront distribution." }
      - { id: cdn, label: CloudFront, sub: edge cache, x: 200, y: 344, w: 150, h: 86, tone: network, icon: cloudfront, info: "Serves cached static content from edge locations and forwards dynamic requests to the load balancer. Shield Standard protects it at no extra cost." }
      - { id: waf, label: AWS WAF, sub: web ACL, x: 200, y: 520, w: 150, h: 86, tone: security, icon: waf, info: "Rules block SQL injection, cross-site scripting and request floods before they reach the origin." }
      - { id: acm, label: ACM, sub: TLS certificates, x: 20, y: 680, w: 150, h: 86, tone: security, icon: certificate-manager, info: "Issues and renews the certificates on the distribution and on the load balancer." }
      - { id: s3, label: S3 bucket, sub: static assets, x: 420, y: 55, w: 170, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Private bucket. Its policy lets only this distribution read it, through **origin access control**." }
      - { id: igw, label: Internet gateway, sub: attached to VPC, x: 640, y: 55, w: 160, h: 86, tone: network, icon: res-vpc-internet-gateway }
      - { id: kms, label: AWS KMS, sub: key for data at rest, x: 880, y: 55, w: 170, h: 86, tone: security, icon: key-management-service, info: "Chosen when the database is created. An unencrypted database cannot be encrypted in place." }
      - { id: alb, label: Load balancer, sub: "ALB, two AZs", x: 440, y: 418, w: 160, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer, info: "Internet-facing ALB with nodes in a public subnet of each AZ. Its security group accepts HTTPS from CloudFront." }
      - { id: nata, label: NAT gateway, sub: public subnet A, x: 440, y: 240, w: 160, h: 86, tone: network, icon: res-vpc-nat-gateway }
      - { id: natb, label: NAT gateway, sub: public subnet B, x: 440, y: 600, w: 160, h: 86, tone: network, icon: res-vpc-nat-gateway }
      - { id: weba, label: EC2 instances, sub: private subnet A, x: 690, y: 240, w: 160, h: 86, tone: compute, icon: res-ec2-instance, info: "Stateless app tier. Its security group allows traffic only from the ALB security group." }
      - { id: webb, label: EC2 instances, sub: private subnet B, x: 690, y: 600, w: 160, h: 86, tone: compute, icon: res-ec2-instance }
      - { id: cache, label: ElastiCache, sub: "sessions, reads", x: 880, y: 418, w: 160, h: 86, tone: database, icon: elasticache, info: "Shared session store and read cache, so any instance can serve any user." }
      - { id: writer, label: Aurora writer, sub: private DB subnet A, x: 1010, y: 240, w: 160, h: 86, tone: database, icon: aurora, info: "Takes all writes. Its security group allows the database port only from the app tier security group." }
      - { id: reader, label: Aurora Replica, sub: private DB subnet B, x: 1010, y: 600, w: 160, h: 86, tone: database, icon: aurora, info: "Serves reads through the reader endpoint and is the failover target if the writer fails." }
      - { id: alarm, label: CloudWatch alarm, sub: target tracking, x: 680, y: 765, w: 180, h: 86, tone: mgmt, icon: res-cloudwatch-alarm, info: "Created and managed by the target tracking policy, for example average CPU at 50 percent." }
    edges:
      - { from: users, to: dns, step: 1 }
      - { from: users, to: cdn, step: 2 }
      - { from: cdn, to: waf, step: 3 }
      - { from: acm, to: cdn, step: 4 }
      - { from: cdn, to: s3, step: 5 }
      - { from: cdn, to: alb, step: 6 }
      - { from: alb, to: weba, step: 7 }
      - { from: alb, to: webb, step: 7 }
      - { from: weba, to: cache, step: 8 }
      - { from: weba, to: writer, step: 9 }
      - { from: writer, to: kms, step: 10 }
      - { from: writer, to: reader, step: 11, dashed: true }
      - { from: alarm, to: webb, step: 12 }
      - { from: weba, to: nata, step: 13 }
      - { from: webb, to: natb, step: 13 }
      - { from: nata, to: igw, step: 13 }
    steps:
      - "Users look up the domain in Route 53. An alias record at the zone apex returns the CloudFront distribution."
      - "Requests reach a nearby CloudFront edge location, where Shield Standard absorbs common DDoS attacks at no extra cost."
      - "An AWS WAF web ACL on the distribution blocks malicious requests, such as SQL injection, before they reach any origin."
      - "TLS uses certificates that ACM issues and renews, on the distribution and on the load balancer."
      - "Static files come from a private S3 bucket that only the distribution can read, through origin access control in the bucket policy."
      - "Dynamic requests go to the Application Load Balancer, which has nodes in public subnets of two Availability Zones and accepts traffic only from CloudFront."
      - "The load balancer spreads requests across an Auto Scaling group in private subnets of both zones. Only the ALB security group may reach the instances."
      - "Instances keep sessions and cached reads in ElastiCache, so no user is tied to one instance."
      - "Writes go to the Aurora writer, reachable only from the app tier security group. The cluster volume keeps copies of the data in three Availability Zones."
      - "The database is encrypted at rest with a KMS key chosen when it was created."
      - "If the writer or its zone fails, the Aurora Replica in the other zone becomes the writer."
      - "A target tracking policy keeps a metric such as average CPU at its target, adding or removing instances, and the group replaces unhealthy instances in the surviving zone."
      - "Outbound internet calls from each zone use the NAT gateway in that same zone, which sends them out through the internet gateway."
cards:
  - id: reference-architectures-001
    q: A web application on EC2 must survive the loss of an Availability Zone with no manual action. Which combination of load balancer and compute settings fits?
    a: "An **Application Load Balancer** with subnets in at least two AZs, in front of an **Auto Scaling group** that spans the same AZs.\nThe group replaces unhealthy instances and launches in the surviving zone."
    facts: [alb-two-azs, asg-multi-az]
  - id: reference-architectures-002
    q: A three-tier application on EC2 must let only the web tier reach the database tier, even as instances are added and removed. How should the database security group be written?
    a: "Allow the database port with the **app tier security group as the source**, not IP ranges.\nThe rule then covers every instance in that group, whatever its address."
    facts: [sg-reference]
  - id: reference-architectures-003
    q: Private EC2 instances in two Availability Zones share one NAT gateway in AZ A. What happens to internet access from AZ B if AZ A fails, and what is the fix?
    a: "AZ B loses outbound internet access. Create **one NAT gateway per AZ** and route each zone's private subnets to the NAT gateway in the same zone."
    trap: true
    facts: [nat-per-az]
  - id: reference-architectures-004
    q: A company serves static images from an S3 bucket through CloudFront and wants the bucket closed to direct public access. What should it configure?
    a: "**Origin access control (OAC)** on the distribution, and a bucket policy that allows only that distribution. Block Public Access can stay on."
    facts: [oac]
  - id: reference-architectures-005
    q: A three-tier web application uses Aurora and needs a database that keeps serving after an Availability Zone failure, with read capacity in the other zone. Which design fits?
    a: "An Aurora cluster with an **Aurora Replica in another AZ**. The replica serves reads and is the failover target, and the cluster volume already keeps copies in three AZs."
    facts: [aurora-replicas, aurora-storage]
  - id: reference-architectures-006
    q: The domain example.com must point at a CloudFront distribution. Why does the team use a Route 53 alias record instead of a CNAME?
    a: "A CNAME is not allowed at the **zone apex**. An alias record can point example.com at the distribution."
    facts: [alias-apex]
  - id: reference-architectures-007
    q: Users of an Auto Scaling web tier are logged out whenever an instance is terminated. Which change fits a highly available three-tier design?
    a: "Move session state to a shared store such as **ElastiCache** (or DynamoDB), so any instance can serve any user."
    facts: [shared-store]
  - id: reference-architectures-068
    q: "A web application behind CloudFront receives SQL injection attempts and bursts of requests from a few IP addresses. What should block them before they reach the origin?"
    a: "An **AWS WAF web ACL** on the CloudFront distribution, with rules for SQL injection and request rates."
    facts: [waf]
  - id: reference-architectures-069
    q: "A company wants baseline DDoS protection for a public web application without paying for an extra service. What does it get, and which front end helps?"
    a: "**Shield Standard** protects every customer automatically at no extra cost. Serving through **CloudFront and Route 53** absorbs attacks at edge locations."
    facts: [shield-standard, edge-ddos]
  - id: reference-architectures-070
    q: "A web application needs HTTPS certificates on CloudFront and on its Application Load Balancer that renew without manual work. Which service fits?"
    a: "**AWS Certificate Manager (ACM)**: it issues and renews certificates and deploys them to integrated services such as CloudFront and Elastic Load Balancing."
    facts: [acm, acm-integrated]
  - id: reference-architectures-071
    q: "An Amazon RDS DB instance was created without encryption, and compliance now requires encryption at rest. Can the team turn it on in place?"
    a: "No. Copy a manual snapshot with **encryption enabled** and restore it (or use a blue/green deployment with an encrypted green environment). The KMS key is chosen at creation."
    trap: true
    facts: [rds-kms, rds-encrypt-existing]
  - id: reference-architectures-072
    q: "An Auto Scaling group behind an ALB should keep average CPU near 50 percent as traffic changes, without hand-built alarms. Which scaling policy fits?"
    a: "A **target tracking** policy on average CPU with a target of 50. It adjusts capacity and manages its own CloudWatch alarms."
    facts: [target-tracking]
---
The classic architecture question describes a web application that must stay up through an Availability Zone failure, scale with traffic, resist attacks and keep its data private. The answer combines a protected edge layer, a load-balanced stateless tier and an encrypted managed database, each placed in at least two zones.

### How it works

1. Route 53 answers for the domain with an alias record that points at CloudFront.
2. At the edge, Shield Standard absorbs common DDoS attacks, and an AWS WAF web ACL blocks malicious requests. ACM provides and renews the TLS certificates.
3. CloudFront serves static files from a private S3 bucket through origin access control and forwards dynamic requests to the load balancer.
4. An Application Load Balancer in public subnets of two zones sends requests to an Auto Scaling group in private subnets of the same zones. A target tracking policy scales the group, and unhealthy instances are replaced.
5. The app tier keeps no local state: sessions and hot reads live in ElastiCache, durable data in Aurora, encrypted with a KMS key chosen at creation.
6. Aurora takes writes on the writer and keeps a replica in the other zone for reads and failover.
7. Each zone has its own NAT gateway for outbound calls, so losing one zone does not cut the other off.

| Tier | Service | What makes it highly available and secure |
|---|---|---|
| Edge | Route 53, CloudFront, Shield Standard, AWS WAF, ACM | Global edge network; attacks filtered before the origin |
| Static content | S3 | Private bucket behind OAC |
| Web and app | ALB, EC2 Auto Scaling | Two or more AZs; target tracking; unhealthy instances replaced |
| Session and cache | ElastiCache | Shared state, so instances are interchangeable |
| Data | Aurora, KMS | Storage in three AZs; replica as failover target; encrypted at rest |

| Decision | Choose | When |
|---|---|---|
| Name at the zone apex | Alias record | Pointing example.com at CloudFront or an ALB |
| Block web exploits | AWS WAF on CloudFront | SQL injection, scripting, rate floods |
| Reach from app tier to database | Security group as source | Instances come and go |
| Scaling policy | Target tracking | Keep one metric near a target |
| Egress for private subnets | One NAT gateway per AZ | Egress must survive an AZ failure |

Security groups chain the tiers: the ALB accepts HTTPS, the app tier accepts traffic only from the ALB security group, and the database accepts its port only from the app tier security group.

### Exam cues

- If the question says survive an AZ failure, think ALB and an Auto Scaling group across at least two AZs, because both spread work across zones.
- If the question says only the app tier may reach the database, think a security group rule that references the app tier security group, because it follows instances as they scale.
- If the question says private instances keep internet access during an AZ outage, think one NAT gateway per AZ, because a NAT gateway lives in one zone.
- If the question says keep the S3 origin private behind CloudFront, think origin access control, because only the distribution can read the bucket.
- If the question says users lose sessions as instances scale in, think ElastiCache or DynamoDB for session state, because the app tier must be stateless.
- If the question says block SQL injection or request floods, think AWS WAF on CloudFront, because it filters at the edge.
- If the question says certificates must renew automatically, think ACM.

### Remember

- ALB: subnets in at least two AZs.
- Aurora: storage copies in three AZs; up to 15 Aurora Replicas.
- NAT gateway: one per AZ for zone-independent egress.
- Alias, not CNAME, at the zone apex.
- Shield Standard is automatic and free; AWS WAF is configured per resource.
- RDS encryption is set at creation; encrypt later through an encrypted snapshot copy.

> **Trap:** One NAT gateway or one database instance makes the whole design depend on a single zone, even when the web tier spans two. Check every tier, not just compute.
