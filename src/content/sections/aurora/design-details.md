---
title: "PLACEHOLDER aurora/design-details"
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
    q: An Aurora application must cap connections opened to the database while retaining many client connections. Which setting and endpoint apply?
    a: Connect through RDS Proxy and set MaxConnectionsPercent as a percentage of max_connections. Internal reserves mean MaxDatabaseConnectionsAllowed can be lower than that calculation.
    facts:
      - proxy
      - proxy-cap
      - proxy-reserve
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
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
