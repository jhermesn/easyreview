---
title: Cross-account observability
level: professional
order: 140
facts:
  - id: cross-purpose
    text: CloudWatch cross-account observability shares operational data between source and monitoring
      accounts within a Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-signals
    text: Shared types include metrics, log groups, X-Ray traces, Application Signals services and SLOs,
      Application Insights applications, and Internet Monitor monitors.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-sink
    text: A sink is the attachment point managed by a monitoring account.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-link
    text: A source account manages a link connecting it to a monitoring account sink.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-limits
    text: Each account supports one sink per Region, and each source account can share with up to five
      monitoring accounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-org
    text: AWS recommends Organizations integration so newly created organization accounts are onboarded
      as sources.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-types
    text: Link creation fails if a source selects telemetry types the monitoring account does not accept.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-no-relay
    text: An account acting as both source and monitor shares its own data onward but does not relay its
      sources data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-new-data
    text: A linked metric name appears in the monitoring account console only after it emits new data
      points following link creation.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-pricing
    text: Cross-account observability adds no extra cost for logs, metrics, or Application Signals; the
      first trace copy is free.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-queries
    text: A monitoring account can run one Logs Insights query across log groups in multiple source
      accounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
  - id: cross-alarms
    text: A cross-account observability monitoring account can create alarms watching source-account
      metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
  - id: legacy-dashboard
    text: The cross-account cross-Region console supports dashboards combining metrics from multiple
      accounts and Regions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Cross-Account-Cross-Region.html#Cross-Account-Cross-Region
  - id: legacy-limits
    text: The cross-account cross-Region console does not provide cross-account cross-Region log
      visibility or alarm creation on remote-account or remote-Region metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Cross-Account-Cross-Region.html#Cross-Account-Cross-Region
  - id: legacy-role
    text: Cross-account console sharing uses CloudWatch-CrossAccountSharingRole in sharing accounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Cross-Account-Cross-Region.html#setup_sharing_account
  - id: term-telemetry
    text: Telemetry is operational data such as measurements, log events, and request traces.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: cross-policy
    text: A sink resource policy grants selected accounts or an organization permission to create links
      and can restrict shared resource types.
    source: https://docs.aws.amazon.com/OAM/latest/APIReference/API_PutSinkPolicy.html#API_PutSinkPolicy
cards:
  - id: cloudwatch-023
    q: A company needs one account to investigate CloudWatch metrics, logs, and traces from several
      accounts within a Region. Which setup fits?
    a: CloudWatch cross-account observability. The monitoring account creates a sink and a policy
      authorizing sources; source accounts create links. Organizations integration includes newly
      created organization accounts.
    facts:
      - cross-purpose
      - cross-sink
      - cross-link
      - cross-org
      - cross-policy
  - id: cloudwatch-024
    q: What can the CloudWatch cross-account cross-Region console provide, and what are its limits?
    a: Dashboards combining metrics across accounts and Regions, using
      CloudWatch-CrossAccountSharingRole in sharing accounts. This console feature does not supply
      cross-account cross-Region log visibility or create alarms on remote metrics.
    facts:
      - legacy-dashboard
      - legacy-role
      - legacy-limits
  - id: cloudwatch-039
    q: Operators need a single CloudWatch Logs Insights query across log groups in several accounts in
      one Region. What should they configure?
    a: CloudWatch cross-account observability with shared log groups. Run the query in the monitoring
      account against the linked source groups.
    facts:
      - cross-purpose
      - cross-signals
      - cross-queries
  - id: cloudwatch-040
    q: A CloudWatch cross-account observability source requests a telemetry type not accepted by the
      monitoring account. What happens?
    a: Link creation fails. The source must select only accepted types. Each account has one sink per
      Region, and a source can share with up to five monitoring accounts.
    trap: true
    facts:
      - cross-types
      - cross-limits
  - id: cloudwatch-080
    q: A source metric is absent from the CloudWatch monitoring account console immediately after an
      observability link is created. What should operators check?
    a: Whether it emitted a new data point after link creation. A metric name does not appear until that
      happens.
    facts:
      - cross-new-data
  - id: cloudwatch-081
    q: A CloudWatch cross-account observability monitoring account is also linked as a source to another
      monitor. Does it relay all linked source data?
    a: No. It shares only its own data onward. Cross-account observability links do not relay telemetry
      from upstream source accounts.
    trap: true
    facts:
      - cross-no-relay
diagrams:
  - id: cloudwatch-observability-links
    title: Source links meet a monitoring account sink in one Region
    width: 1000
    height: 400
    groups:
      - label: Sources
        icon: group-aws-account
        x: 20
        y: 25
        w: 300
        h: 350
        tone: mgmt
      - label: Monitoring account
        icon: group-aws-account
        x: 380
        y: 25
        w: 600
        h: 350
        tone: mgmt
    nodes:
      - id: a
        label: Source A
        sub: observability link
        icon: cloudwatch
        x: 60
        y: 90
        w: 210
        h: 86
        tone: mgmt
      - id: b
        label: Source B
        sub: observability link
        icon: cloudwatch
        x: 60
        y: 250
        w: 210
        h: 86
        tone: mgmt
      - id: sink
        label: Sink
        sub: accepted telemetry
        icon: cloudwatch
        x: 420
        y: 170
        w: 210
        h: 86
        tone: mgmt
      - id: view
        label: CloudWatch
        sub: query + alarm
        icon: cloudwatch
        x: 740
        y: 170
        w: 200
        h: 86
        tone: mgmt
    edges:
      - from: a
        to: sink
        step: 1
        label: link
      - from: b
        to: sink
        label: link
      - from: sink
        to: view
        step: 2
        label: shared view
    steps:
      - Sources link to the monitoring account sink with accepted telemetry types.
      - The monitoring account queries shared log groups and alarms on shared source metrics.
---
CloudWatch cross-account observability lets a monitoring account investigate operational data from source accounts within a Region. Think of a sink as the monitoring account's attachment point and a link as a source account's connection to it.

### How it works

1. Create the monitoring account sink and authorize the source accounts or organization in its resource policy, the permission rules attached to that sink. Choose the telemetry types, meaning operational measurements and events, it will accept. Sources can share metrics, log groups, X-Ray traces, Application Signals services and SLOs, Application Insights applications, and Internet Monitor monitors.
2. Create links from source accounts. A source cannot select types the monitoring account has not accepted. Use Organizations integration to onboard newly created organization accounts.
3. In the monitoring account, run Logs Insights queries across shared log groups and create alarms on source metrics. Metric names appear only after new data points arrive following link creation.
4. Distinguish this setup from the cross-account cross-Region console. That console uses `CloudWatch-CrossAccountSharingRole` in sharing accounts and combines remote metrics in dashboards, with the limitations below.

| Requirement | Mechanism | Scope or limit |
|---|---|---|
| Query shared logs and investigate traces | Cross-account observability | Within a Region |
| Create alarms on shared source metrics | Cross-account observability | In the monitoring account |
| Display metrics across Regions | Cross-account cross-Region console | No cross-account cross-Region log visibility or alarm creation on remote metrics |

### Exam cues

- If the question says investigate logs, metrics, and traces across accounts in one Region, think cross-account observability, because links share those signal types.
- If the question says query several accounts' log groups together, think Logs Insights in the monitoring account, because a query can span linked source groups.
- If the question says one dashboard across accounts and Regions, think cross-account cross-Region console, because it combines remote metric views.

### Remember

- One sink per account per Region; a source can share with up to five monitoring accounts.
- Source-selected telemetry types must be accepted by the monitoring account.
- An account that is both source and monitor does not relay its sources' data onward.
- Cross-account observability adds no extra sharing cost for logs, metrics, or Application Signals; the first trace copy is free.

> **Trap:** The cross-account cross-Region console and cross-account observability have different capabilities. The console's remote alarm restriction does not prevent observability monitoring accounts from creating alarms on shared source metrics within a Region.
