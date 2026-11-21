---
title: Storage configurations and Babelfish
level: associate
order: 40
facts:
  - id: io-optimized
    text: Aurora I/O-Optimized charges only for instance usage and storage with no charge for read and write I/O, and is the best choice when I/O is 25% or more of total Aurora spending.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html
  - id: standard
    text: Aurora Standard adds a charge per million I/O requests and is the best choice when I/O is less than 25% of total Aurora spending.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html
  - id: switch
    text: You can switch from Aurora Standard to I/O-Optimized once every 30 days and back to Standard at any time, without downtime on non-NVMe instances.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html
  - id: babelfish
    text: Babelfish for Aurora PostgreSQL accepts connections from SQL Server clients over the TDS wire protocol, so SQL Server applications work with Aurora PostgreSQL with few code changes and no driver changes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/babelfish.html#babelfish
cards:
  - id: aurora-032
    q: An Aurora cluster's I/O charges are 40% of its bill and fluctuate month to month. Which change lowers and stabilizes the cost?
    a: "Switch the cluster to **Aurora I/O-Optimized**: no per-I/O charges, best when I/O is 25% or more of spend."
    facts: [io-optimized, standard]
  - id: aurora-033
    q: A SQL Server application needs to move to Aurora PostgreSQL with few code changes. Which
      Aurora feature supports this migration?
    a: "Babelfish for Aurora PostgreSQL accepts SQL Server client connections without changing database drivers."
    facts: [babelfish]
  - id: aurora-034
    q: A company wants to move a SQL Server application to Aurora PostgreSQL with minimal code changes and without changing database drivers. Which feature fits?
    a: "**Babelfish for Aurora PostgreSQL**, which understands the SQL Server TDS protocol and T-SQL."
    facts: [babelfish]
  - id: aurora-035
    q: An Aurora cluster has light, steady I/O that is under 10% of its spend. Should it use I/O-Optimized?
    a: "No. Aurora Standard is cheaper when I/O is under 25% of total Aurora spending."
    trap: true
    facts: [standard, io-optimized]
---
Two Aurora choices that come down to money and migration effort: the storage configuration decides how I/O is billed, and Babelfish lets SQL Server applications talk to Aurora PostgreSQL.

### How it works

1. Pick Aurora Standard (pay per I/O) or Aurora I/O-Optimized (no I/O charges) per cluster.
2. Compare I/O cost to total Aurora cost: 25% is the break-even rule of thumb from AWS.
3. For SQL Server apps, enable Babelfish on an Aurora PostgreSQL cluster; it opens a TDS endpoint next to the PostgreSQL one.

### Exam cues

- If the question says I/O-heavy Aurora with unpredictable I/O bills, think Aurora I/O-Optimized.
- If the question says migrate SQL Server apps to PostgreSQL with minimal code changes, think Babelfish (plus AWS DMS for the data).

### Remember

- I/O-Optimized at 25% or more of spend on I/O; Standard below that.
- Standard to I/O-Optimized once every 30 days.
- Babelfish: SQL Server clients over TDS to Aurora PostgreSQL.

> **Trap:** I/O-Optimized isn't a performance tier you always want. With low I/O, Standard costs less.
