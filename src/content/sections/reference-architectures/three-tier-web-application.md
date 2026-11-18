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
diagrams:
  - id: three-tier-web-application
    title: Three-tier web application across two Availability Zones
    width: 1240
    height: 760
    groups:
      - { label: Region, x: 380, y: 20, w: 840, h: 720, tone: neutral, icon: group-region }
      - { label: VPC, x: 400, y: 165, w: 800, h: 560, tone: network, icon: group-virtual-private-cloud-vpc }
      - { label: Availability Zone A, x: 420, y: 200, w: 760, h: 200, tone: neutral }
      - { label: Availability Zone B, x: 420, y: 520, w: 760, h: 190, tone: neutral }
      - { label: Auto Scaling group, x: 675, y: 205, w: 190, h: 495, tone: compute, icon: group-auto-scaling-group }
    nodes:
      - { id: users, label: Users, x: 20, y: 344, w: 130, h: 72, tone: user, icon: res-users }
      - { id: dns, label: Route 53, sub: "alias at apex", x: 20, y: 103, w: 130, h: 86, tone: network, icon: route-53, info: "An **alias** record at the zone apex points example.com at the CloudFront distribution." }
      - { id: cdn, label: CloudFront, sub: edge cache, x: 200, y: 344, w: 150, h: 86, tone: network, icon: cloudfront, info: "Serves cached static content from edge locations and forwards dynamic requests to the load balancer." }
      - { id: s3, label: S3 bucket, sub: static assets, x: 420, y: 55, w: 170, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Private bucket. Its policy lets only this distribution read it, through **origin access control**." }
      - { id: igw, label: Internet gateway, sub: attached to VPC, x: 640, y: 55, w: 160, h: 86, tone: network, icon: res-vpc-internet-gateway }
      - { id: alb, label: Load balancer, sub: "ALB, two AZs", x: 440, y: 418, w: 160, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer, info: "Internet-facing ALB with nodes in a public subnet of each AZ. Its security group accepts HTTPS from CloudFront." }
      - { id: nata, label: NAT gateway, sub: public subnet A, x: 440, y: 240, w: 160, h: 86, tone: network, icon: res-vpc-nat-gateway }
      - { id: natb, label: NAT gateway, sub: public subnet B, x: 440, y: 600, w: 160, h: 86, tone: network, icon: res-vpc-nat-gateway }
      - { id: weba, label: EC2 instances, sub: private subnet A, x: 690, y: 240, w: 160, h: 86, tone: compute, icon: res-ec2-instance, info: "Stateless app tier. Its security group allows traffic only from the ALB security group." }
      - { id: webb, label: EC2 instances, sub: private subnet B, x: 690, y: 600, w: 160, h: 86, tone: compute, icon: res-ec2-instance }
      - { id: cache, label: ElastiCache, sub: "sessions, reads", x: 880, y: 418, w: 160, h: 86, tone: database, icon: elasticache, info: "Shared session store and read cache, so any instance can serve any user." }
      - { id: writer, label: Aurora writer, sub: private DB subnet A, x: 1010, y: 240, w: 160, h: 86, tone: database, icon: aurora, info: "Takes all writes. Its security group allows the database port only from the app tier security group." }
      - { id: reader, label: Aurora Replica, sub: private DB subnet B, x: 1010, y: 600, w: 160, h: 86, tone: database, icon: aurora, info: "Serves reads through the reader endpoint and is the failover target if the writer fails." }
    edges:
      - { from: users, to: dns, step: 1 }
      - { from: users, to: cdn, step: 2 }
      - { from: cdn, to: s3, step: 3 }
      - { from: cdn, to: alb, step: 4 }
      - { from: alb, to: weba, step: 5 }
      - { from: alb, to: webb, step: 5 }
      - { from: weba, to: cache, step: 6 }
      - { from: weba, to: writer, step: 7 }
      - { from: writer, to: reader, step: 8, dashed: true }
      - { from: weba, to: nata, step: 9 }
      - { from: webb, to: natb, step: 9 }
      - { from: nata, to: igw, step: 10 }
    steps:
      - "Users look up the domain in Route 53. An alias record at the zone apex returns the CloudFront distribution."
      - "Requests reach a nearby CloudFront edge location."
      - "Static files come from a private S3 bucket that only the distribution can read, through origin access control."
      - "Dynamic requests go to the Application Load Balancer, which has nodes in public subnets of two Availability Zones."
      - "The load balancer spreads requests across an Auto Scaling group in private subnets of both zones. The group replaces unhealthy instances and can launch in the other zone if one fails."
      - "Instances keep sessions and cached reads in ElastiCache, so no user is tied to one instance."
      - "Writes go to the Aurora writer. The cluster volume keeps copies of the data in three Availability Zones."
      - "An Aurora Replica in the other zone serves reads and becomes the writer on failover."
      - "Outbound internet calls from each zone use the NAT gateway in that same zone."
      - "NAT gateway traffic leaves the VPC through the internet gateway."
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
---
The classic architecture question describes a web application that must stay up through an Availability Zone failure, scale with traffic and keep its data private. The answer combines an edge layer, a load-balanced stateless tier and a managed database, each placed in at least two zones.

### How it works

1. Route 53 answers for the domain with an alias record that points at CloudFront. [Alias records](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html)
2. CloudFront serves static files from a private S3 bucket through origin access control and forwards dynamic requests to the load balancer.
3. An Application Load Balancer in public subnets of two zones sends requests to an Auto Scaling group in private subnets of the same zones.
4. The app tier keeps no local state: sessions and hot reads live in ElastiCache, durable data in Aurora.
5. Aurora takes writes on the writer and keeps a replica in the other zone for reads and failover.
6. Each zone has its own NAT gateway for outbound calls, so losing one zone does not cut the other off.

| Tier | Service | What makes it highly available |
|---|---|---|
| Edge | Route 53, CloudFront, S3 | Global edge network; private bucket behind OAC |
| Web and app | ALB, EC2 Auto Scaling | Two or more AZs; unhealthy instances replaced |
| Session and cache | ElastiCache | Shared state, so instances are interchangeable |
| Data | Aurora | Storage in three AZs; replica as failover target |

Security groups chain the tiers: the ALB accepts HTTPS, the app tier accepts traffic only from the ALB security group, and the database accepts its port only from the app tier security group.

### Exam cues

- If the question says survive an AZ failure, think ALB and an Auto Scaling group across at least two AZs, because both spread work across zones.
- If the question says only the app tier may reach the database, think a security group rule that references the app tier security group, because it follows instances as they scale.
- If the question says private instances keep internet access during an AZ outage, think one NAT gateway per AZ, because a NAT gateway lives in one zone.
- If the question says keep the S3 origin private behind CloudFront, think origin access control, because only the distribution can read the bucket.
- If the question says users lose sessions as instances scale in, think ElastiCache or DynamoDB for session state, because the app tier must be stateless.

### Remember

- ALB: subnets in at least two AZs.
- Aurora: storage copies in three AZs; up to 15 Aurora Replicas.
- NAT gateway: one per AZ for zone-independent egress.
- Alias, not CNAME, at the zone apex.

> **Trap:** One NAT gateway or one database instance makes the whole design depend on a single zone, even when the web tier spans two. Check every tier, not just compute.
