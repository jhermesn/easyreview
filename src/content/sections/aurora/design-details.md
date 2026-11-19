---
title: "Scaling, connections and integrations"
level: associate
order: 60
facts:
  - id: autoscaling
    text: Aurora Auto Scaling uses target tracking to add and remove reader instances within configured limits; it does not scale the writer.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: dimension
    text: Application Auto Scaling registers an Aurora cluster with service namespace rds and scalable dimension rds:cluster:ReadReplicaCount.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.Register
  - id: cpu
    text: RDSReaderAverageCPUUtilization is average CPU utilization across Aurora readers.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.DefineScalingPolicy.Predefined
  - id: connections
    text: RDSReaderAverageDatabaseConnections is the average connection count across Aurora readers.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.DefineScalingPolicy.Predefined
  - id: proxy
    text: RDS Proxy manages reusable database connections separately from client connections; clients connect to the proxy endpoint.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-life
  - id: proxy-cap
    text: RDS Proxy MaxConnectionsPercent caps database connections as a percentage of the Aurora max_connections setting; it does not open all allowed connections in advance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
  - id: proxy-reserve
    text: RDS Proxy reserves internal connections, so MaxDatabaseConnectionsAllowed can be lower than the value calculated from MaxConnectionsPercent.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
  - id: secondary
    text: Aurora Auto Scaling is unsupported on Global Database secondary clusters.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: serverless
    text: Aurora Auto Scaling is unsupported for Serverless v2; pre-created Serverless readers scale compute capacity instead of being added by a reader-count policy.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html#aurora-serverless-v2.limitations
  - id: cloning
    text: "Aurora cloning creates a new cluster that initially shares the source's data pages using copy-on-write, so it is fast and uses little extra space; it suits test environments built from production data."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html#Aurora.Managing.Clone
  - id: lambda-native
    text: "Aurora MySQL can invoke a Lambda function from SQL with the native functions lambda_sync and lambda_async, once the cluster has access to Lambda."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.Lambda.html#AuroraMySQL.Integrating.Lambda
  - id: free-backup-allowance
    text: "Aurora provides automated backup storage equal to the latest cluster volume size at no charge; only usage beyond that allowance is billed."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-storage-backup.html
cards:
  - id: aurora-002
    q: How does an Aurora cluster automatically add read-serving instances as demand changes?
    a: Aurora Auto Scaling uses Application Auto Scaling target tracking on rds:cluster:ReadReplicaCount. Predefined metrics are RDSReaderAverageCPUUtilization and RDSReaderAverageDatabaseConnections.
    facts:
      - autoscaling
      - dimension
      - cpu
      - connections
  - id: aurora-014
    q: "A serverless application opens many short-lived connections to an Amazon Aurora database. What reduces the connection load on the database?"
    a: "Amazon RDS Proxy. It pools and reuses database connections, and clients connect to the proxy endpoint."
    facts: [proxy]
  - id: aurora-015
    q: Can Aurora Auto Scaling add readers to a Global Database secondary or an Aurora Serverless v2 cluster?
    a: No. Reader-count Auto Scaling does not support those configurations. Pre-created Serverless readers can scale their compute capacity.
    trap: true
    facts:
      - secondary
      - serverless
  - id: aurora-036
    q: "Developers need a full copy of a 5 TB production Aurora database for testing, created in minutes and at low storage cost. Which feature fits?"
    a: "**Aurora cloning** (copy-on-write: shares pages until either side changes them)."
    facts: [cloning]
  - id: aurora-040
    q: "When a row is deleted in Aurora MySQL, a Lambda function must run and forward the change. How can the database call Lambda directly?"
    a: "With the Aurora MySQL native functions lambda_sync or lambda_async, after granting the cluster access to Lambda."
    facts: [lambda-native]
  - id: aurora-049
    q: "How much Amazon Aurora automated backup storage is included at no extra charge?"
    a: "An amount equal to the latest cluster volume size. Only backup usage beyond it is billed."
    facts: [free-backup-allowance]
---
Aurora offers separate controls for reader capacity and database connections, plus ways to clone data and invoke Lambda. Choose the feature that matches the problem: scaling readers, reusing connections, creating a test cluster or calling a function.

### How it works

1. Register the cluster with Application Auto Scaling under the `rds` namespace and the `rds:cluster:ReadReplicaCount` dimension. Set a target and limits so [Aurora Auto Scaling](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling) can add or remove readers. The predefined targets use [average reader CPU or connections](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.DefineScalingPolicy.Predefined). See the [registration details](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.Register).
2. Connect clients to the [RDS Proxy endpoint](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-life). The proxy manages reusable database connections separately from client connections. Set [MaxConnectionsPercent](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent) to cap database connections as a percentage of `max_connections`.
3. Create an [Aurora clone](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html#Aurora.Managing.Clone) for a test environment. It initially shares data pages with the source using copy-on-write, which uses little extra space.
4. Give an Aurora MySQL cluster access to Lambda, then call a function from SQL using [`lambda_sync` or `lambda_async`](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.Lambda.html#AuroraMySQL.Integrating.Lambda).

### Exam cues

- If the question says read demand changes, think Aurora Auto Scaling, because it adjusts the reader count within configured limits.
- If the question says many clients need a cap on database connections, think RDS Proxy and MaxConnectionsPercent, because the proxy reuses database connections.
- If the question says create a fast, space-efficient test cluster from production data, think Aurora cloning, because the clone initially shares data pages.
- If the question says Aurora MySQL must call Lambda from SQL, think `lambda_sync` or `lambda_async`, because these native functions invoke Lambda after the cluster has access.

### Remember

- The predefined reader metrics are `RDSReaderAverageCPUUtilization` and `RDSReaderAverageDatabaseConnections`.
- `MaxDatabaseConnectionsAllowed` can be lower than the percentage calculation because RDS Proxy reserves internal connections. The proxy does not open all allowed connections in advance.
- Automated backup storage up to the latest cluster volume size is free.

> **Trap:** Aurora Auto Scaling does not scale the writer and cannot add readers to a Global Database secondary or an [Aurora Serverless v2 cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html#aurora-serverless-v2.limitations). Pre-created Serverless readers scale compute capacity instead.
