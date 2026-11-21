---
title: Multi-Region active-active with automated failover
level: professional
order: 110
facts:
  - id: global-tables
    text: Global tables provide managed replication across Regions and every replica can serve reads and writes.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html
  - id: mrec
    text: MREC replicates asynchronously and resolves concurrent item updates by latest internal timestamp, called last writer wins.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html
  - id: mrsc
    text: MRSC synchronously replicates a write to at least one other Region before success; strong reads at any replica return the latest item.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html
  - id: mrsc-create
    text: Conversion to MRSC requires an empty table and additional replicas cannot be added later.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html
  - id: mrsc-accounts
    text: Global tables support same-account and multi-account configurations; MRSC supports same-account configurations only.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html
  - id: gt-failover
    text: Applications can shift traffic to another global table replica if application processing is interrupted in a Region.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html
  - id: origin-group
    text: An origin group contains a primary and a secondary origin and must be selected by a cache behavior.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.creating
  - id: failover-codes
    text: Selectable failover status codes are 400, 403, 404, 416, 429, 500, 502, 503 and 504.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.creating
  - id: failover-hit
    text: CloudFront serves a cache hit without contacting the origin group.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: latency
    text: Route 53 latency routing compares configured Regions using measurements collected over time between users and AWS data centers. An endpoint outside AWS can have substantially different latency, even when it is near an AWS Region.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
  - id: latency-tree
    text: Latency aliases can point to regional groups of weighted records; Evaluate Target Health lets Route 53 leave a Region with no healthy records and try another Region.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs
  - id: arc-switch
    text: ARC routing controls are On or Off switches that change Route 53 health checks associated with application DNS records.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.about.html
  - id: arc-failover
    text: Switching the primary routing control Off and a standby control On changes associated health checks to reroute DNS traffic to the standby application replica.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.about.html
  - id: arc-not-monitor
    text: A routing control does not probe endpoint health or measure response time; its configured state controls the associated health check.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.about.html
  - id: arc-assertion
    text: An assertion safety rule rejects a routing control state update unless its configured conditions remain true, such as at least one control remaining On.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.safety-rules.html#routing-control.about-safety-rule
  - id: arc-cluster
    text: An ARC routing control cluster provides five redundant regional endpoints for getting and updating routing control states.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/introduction-components-routing.html
  - id: s3-crr
    text: S3 Cross-Region Replication copies objects asynchronously to a bucket in another Region, and with versioning you can choose a restore point.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: fis
    text: FIS injects real faults into real AWS resources so teams can observe workload behavior; AWS recommends planning and pre-production experiments before production.
    source: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is
  - id: fis-template
    text: An FIS experiment template defines actions, targets, stop conditions, and an IAM experiment role.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-templates.html#experiment-templates
  - id: fis-stop
    text: A stop condition uses a CloudWatch alarm to stop an FIS experiment when workload performance crosses an unacceptable threshold.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-templates.html#experiment-templates
  - id: resiliency-policy
    text: A resiliency policy sets recovery time and recovery point objectives for application, infrastructure, Availability Zone and Region disruptions.
    source: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
diagrams:
  - id: multi-region-automated-failover
    title: Two Regions serve traffic, replicate data, and fail over by DNS and origin groups
    facts: [global-tables, mrec, mrsc, mrsc-create, mrsc-accounts, gt-failover, origin-group, failover-codes, failover-hit, latency, latency-tree, arc-switch, arc-failover, arc-not-monitor, arc-assertion, arc-cluster, s3-crr, fis, fis-template, fis-stop, resiliency-policy]
    width: 1240
    height: 760
    groups:
      - { label: Region A, x: 440, y: 20, w: 380, h: 720, tone: neutral, icon: group-region }
      - { label: Region B, x: 860, y: 20, w: 360, h: 720, tone: neutral, icon: group-region }
    nodes:
      - { id: users, label: Users, sub: worldwide, x: 20, y: 380, w: 150, h: 86, tone: user, icon: res-users }
      - { id: cf, label: CloudFront, sub: origin group, x: 240, y: 180, w: 160, h: 86, tone: network, icon: cloudfront, info: "The origin group pairs the Region A bucket as primary and the Region B bucket as secondary, with chosen failover status codes." }
      - { id: r53, label: Route 53, sub: latency records, x: 240, y: 380, w: 160, h: 86, tone: network, icon: route-53, info: "Latency aliases with Evaluate Target Health skip a Region whose records are unhealthy." }
      - { id: arc, label: ARC, sub: routing controls, x: 240, y: 620, w: 160, h: 86, tone: network, icon: application-recovery-controller, info: "Switches that change Route 53 health checks. They do not probe health themselves. Safety rules can require at least one Region to stay On." }
      - { id: fis, label: FIS test, sub: stop on alarm, x: 680, y: 420, w: 120, h: 86, tone: mgmt, icon: fault-injection-service }
      - { id: s3a, label: S3 bucket, sub: static assets, x: 480, y: 70, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: alba, label: ALB, sub: Region A, x: 480, y: 250, w: 160, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer }
      - { id: appa, label: App tier, sub: Auto Scaling, x: 480, y: 420, w: 160, h: 86, tone: compute, icon: ec2-auto-scaling }
      - { id: ddba, label: DynamoDB, sub: global table replica, x: 480, y: 600, w: 160, h: 86, tone: database, icon: dynamodb }
      - { id: s3b, label: S3 bucket, sub: CRR replica, x: 880, y: 70, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: albb, label: ALB, sub: Region B, x: 880, y: 250, w: 160, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer }
      - { id: appb, label: App tier, sub: Auto Scaling, x: 880, y: 420, w: 160, h: 86, tone: compute, icon: ec2-auto-scaling }
      - { id: ddbb, label: DynamoDB, sub: global table replica, x: 880, y: 600, w: 160, h: 86, tone: database, icon: dynamodb, info: "Every replica takes reads and writes. In the default MREC mode, concurrent updates resolve by last writer wins." }
    edges:
      - { from: s3a, to: s3b, step: 1 }
      - { from: ddba, to: ddbb, step: 1 }
      - { from: users, to: cf, step: 2 }
      - { from: cf, to: s3a, step: 2 }
      - { from: users, to: r53, step: 3 }
      - { from: r53, to: alba, step: 3 }
      - { from: r53, to: albb, step: 3 }
      - { from: alba, to: appa, step: 4 }
      - { from: appa, to: ddba, step: 4 }
      - { from: albb, to: appb, step: 4 }
      - { from: appb, to: ddbb, step: 4 }
      - { from: fis, to: appa, step: 5, dashed: true }
      - { from: cf, to: s3b, step: 6, dashed: true }
      - { from: arc, to: r53, step: 7, dashed: true }
    steps:
      - "S3 Cross-Region Replication copies static assets to Region B, and a DynamoDB global table keeps a replica in each Region."
      - "CloudFront serves static content from its cache, going to the Region A bucket on a miss."
      - "Route 53 latency records send each user to the closer healthy Region, so both Regions serve traffic."
      - "In each Region, the load balancer sends requests to the app tier, which reads and writes its local DynamoDB replica."
      - "Before relying on failover, an FIS experiment injects a fault into Region A's app tier. A CloudWatch alarm as stop condition ends the experiment if the impact goes too far."
      - "If the Region A bucket returns a configured error status, the CloudFront origin group retries the request on the Region B bucket."
      - "To move all traffic, operators turn Region A's ARC routing control Off and Region B's On. The linked Route 53 health checks change, and DNS sends everyone to Region B."
cards:
  - id: reference-architectures-146
    q: "An application must accept writes in two Regions at once with local latency, and the data must survive the loss of either Region. Which database feature fits?"
    a: "**DynamoDB global tables**: every replica takes reads and writes. In the default **MREC** mode, replication is asynchronous and concurrent updates resolve by last writer wins."
    facts: [global-tables, mrec, gt-failover]
  - id: reference-architectures-147
    q: "A multi-Region DynamoDB application needs strong reads that always return the latest write, in any Region. What fits, and what are the limits?"
    a: "A global table in **MRSC** mode, which replicates each write to another Region before succeeding. It needs an empty table, cannot add replicas later and works in one account."
    trap: true
    facts: [mrsc, mrsc-create, mrsc-accounts]
  - id: reference-architectures-148
    q: "Static assets served by CloudFront from an S3 bucket in one Region must keep working if that bucket fails. What fits?"
    a: "Replicate the bucket to another Region and use a CloudFront **origin group** with the two buckets as primary and secondary, failing over on chosen status codes such as 500, 502, 503 or 504."
    facts: [origin-group, failover-codes, s3-crr]
  - id: reference-architectures-149
    q: "During a test, the primary origin of a CloudFront origin group is down, yet some requests never reach the secondary. Why?"
    a: "**Cache hits** are served without contacting the origin group at all; failover only happens on requests that go to the origin."
    trap: true
    facts: [failover-hit]
  - id: reference-architectures-150
    q: "A company wants a dependable, operator-triggered way to move all traffic from one Region to another, without editing DNS records during an incident. What fits?"
    a: "**ARC routing controls**: On/Off switches that change Route 53 health checks tied to each Region's records, with a highly available cluster of endpoints."
    facts: [arc-switch, arc-failover, arc-cluster]
  - id: reference-architectures-151
    q: "Does an ARC routing control notice by itself that a Region is unhealthy?"
    a: "No. It does not probe endpoints; its **state** decides the health check result. Detection comes from alarms or people, and safety rules can stop every control from being turned Off."
    trap: true
    facts: [arc-not-monitor, arc-assertion]
  - id: reference-architectures-152
    q: "A team must prove that its multi-Region failover works, with a safe way to stop if customers are affected. What fits?"
    a: "An **AWS FIS** experiment template with actions, targets and a **stop condition** on a CloudWatch alarm, run in pre-production first."
    facts: [fis, fis-template, fis-stop]
  - id: reference-architectures-153
    q: "Route 53 latency records point to two Regions. How does Route 53 avoid sending users to a Region whose endpoints are down?"
    a: "Use alias records with **Evaluate Target Health**, so Route 53 leaves a Region with no healthy records and answers with another Region."
    facts: [latency, latency-tree]
---
Professional resilience questions ask for more than a standby Region: both Regions serve users, data replicates in both directions, and failover is automatic, tested and safe to trigger. The design combines CloudFront origin groups for static content, Route 53 latency routing for dynamic traffic, DynamoDB global tables for data and ARC routing controls for a deliberate Region switch.

### How it works

1. S3 Cross-Region Replication and a DynamoDB global table copy data to both Regions.
2. CloudFront serves static content and fails over between buckets through an origin group.
3. Route 53 latency records with Evaluate Target Health send users to the closest healthy Region.
4. ARC routing controls move all traffic on purpose, through the health checks linked to each Region's records.
5. FIS experiments test the failover, with CloudWatch alarms as stop conditions.

| Decision | Choose | When |
|---|---|---|
| Writes in every Region | DynamoDB global tables (MREC) | Eventual consistency between Regions is acceptable |
| Latest write everywhere | Global tables in MRSC mode | Strong reads in every Region; one account |
| Static content failover | CloudFront origin group | Primary origin returns an error status |
| Send users to the closer Region | Route 53 latency with Evaluate Target Health | Active-active traffic |
| Deliberate Region switch | ARC routing controls | Operators decide, DNS follows |
| Prove failover works | FIS experiment with stop conditions | Before an incident, in pre-production first |
| Track RTO and RPO targets | Resilience Hub resiliency policy | Assess an application against objectives |

### Exam cues

- If the question says writes in multiple Regions, think DynamoDB global tables.
- If the question says static content must survive a Region failure, think S3 replication plus a CloudFront origin group.
- If the question says route users to the lowest latency Region and skip unhealthy ones, think Route 53 latency records with Evaluate Target Health.
- If the question says a reliable manual switch between Regions, think ARC routing controls.
- If the question says test failover safely, think AWS FIS with stop conditions.

### Remember

- MREC: last writer wins. MRSC: strong reads everywhere, empty table, one account.
- Origin group failover status codes: 400, 403, 404, 416, 429, 500, 502, 503, 504.
- Cache hits never touch the origin group.
- ARC routing controls do not measure health.

> **Trap:** Replication is not a test. Until a fault injection experiment has moved traffic, nobody knows whether failover works.
