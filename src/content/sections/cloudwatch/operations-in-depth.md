---
title: CloudWatch operational controls
level: professional
order: 190
facts:
  - id: agent-server-policy
    text: CloudWatchAgentServerPolicy grants metric and log publishing permissions and GetParameter
      access to AmazonCloudWatch-* parameters.
    source: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/CloudWatchAgentServerPolicy.html#CloudWatchAgentServerPolicy-json
  - id: agent-admin-policy
    text: CloudWatchAgentAdminPolicy also grants PutParameter access to AmazonCloudWatch-* parameters
      for configuration management.
    source: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/CloudWatchAgentAdminPolicy.html#CloudWatchAgentAdminPolicy-json
  - id: agent-credentials
    text: The agent supports EC2 instance profile credentials and shared AWS credential profiles,
      including for on-premises installations.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Credentials-Preference.html#CloudWatch-Agent-Credentials-Preference
  - id: agent-logs-store
    text: "Logs collected by the CloudWatch agent are stored in CloudWatch Logs, like logs from the older CloudWatch Logs agent."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
  - id: state-actions
    text: Alarm actions normally run on state changes; Auto Scaling actions repeat once per minute while
      the alarm stays in the relevant state.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: composite-suppression
    text: A suppressor alarm in ALARM prevents composite alarm actions; WaitPeriod and ExtensionPeriod
      delay actions around suppressor transitions. AWS recommends 60 seconds for each.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-suppression.html#Create_Composite_Alarm_Suppression_Wait_Extension
  - id: composite-cycle
    text: Cyclic composite alarm dependencies stop evaluation and prevent deletion; setting one AlarmRule
      to False breaks the cycle.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html#Create_Composite_Alarm
  - id: alarm-action-validation
    text: CloudWatch does not validate configured alarm actions or detect errors from attempts to invoke
      nonexistent EC2 Auto Scaling actions or SNS topics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: alarm-test-state
    text: SetAlarmState temporarily changes an alarm state until the next alarm comparison.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#common-features-of-alarms
  - id: alarm-lambda-permission
    text: Lambda alarm actions can invoke a function in another account; its resource policy must allow
      lambda.alarms.cloudwatch.amazonaws.com to invoke it, with source account and alarm ARN restrictions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-actions-Lambda.html#alarms-and-actions-Lambda
  - id: composite-create-permission
    text: Creating a composite alarm requires cloudwatch:PutCompositeAlarm scoped to all resources; an IAM
      user creating one with OpsItem actions also needs iam:CreateServiceLinkedRole.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutCompositeAlarm.html#API_PutCompositeAlarm
  - id: composite-limits
    text: A composite rule can reference up to 100 alarms, and a single alarm can be referenced by up to
      150 composite alarms.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutCompositeAlarm.html#API_PutCompositeAlarm
  - id: alarm-mute
    text: Scheduled alarm mute rules suppress actions but not state evaluation for targeted metric and
      composite alarms in the same account and Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-mute-rules.html#effects-of-mute-rules
  - id: alarm-mute-end
    text: After a mute window ends, CloudWatch executes actions for the current state if it differs from
      the state at the start; otherwise it executes no actions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-mute-rules.html#effects-of-mute-rules
  - id: short-cadence
    text: Alarms with 10-, 20-, or 30-second periods evaluate every 10 seconds.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-evaluation-settings
  - id: retention-expiry
    text: Log events older than the applicable retention period are marked for deletion.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
  - id: retention-delay
    text: Deletion normally takes up to 72 hours after expiry and can rarely take longer; marked events
      no longer incur archival storage charges.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
  - id: incoming-bytes
    text: The AWS/Logs metric IncomingBytes, by LogGroupName, shows how much data each log group ingests, which finds the costliest groups.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch-Logs-Monitoring-CloudWatch-Metrics.html
  - id: live-tail
    text: "CloudWatch Logs Live Tail streams new log events as they are ingested so you can filter and highlight them in near real time during an incident; sessions are billed per minute."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogs_LiveTail.html#CloudWatchLogs_LiveTail
  - id: insights-languages
    text: Supported query languages are Logs Insights QL, OpenSearch PPL, and OpenSearch SQL.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-timeout
    text: Queries in any supported language time out after 60 minutes.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-results
    text: Query results remain available for 7 days.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-cost
    text: Logs Insights charges depend on data scanned regardless of query language.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-creation
    text: Logs Insights cannot read events whose timestamps precede creation of their log group.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: filter-dimensions
    text: Metric filters with dimensions cannot have a default value.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
cards:
  - id: cloudwatch-035
    q: How do CloudWatchAgentServerPolicy and CloudWatchAgentAdminPolicy differ for agent configuration
      in Parameter Store?
    a: ServerPolicy can read AmazonCloudWatch-* parameters and publish telemetry. AdminPolicy also
      writes those parameters. EC2 can use instance profile credentials; on-premises agents can use
      a shared credential profile.
    facts:
      - agent-server-policy
      - agent-admin-policy
      - agent-credentials
  - id: cloudwatch-112
    q: "An application on EC2 writes log files that must end up in Amazon Data Firehose. Can the CloudWatch agent deliver them straight to Firehose?"
    a: "No. The agent stores the logs it collects in CloudWatch Logs. Deliver them onward with a subscription filter on the log group."
    facts:
      - agent-logs-store
  - id: cloudwatch-052
    q: A CloudWatch alarm stays in ALARM after invoking an Auto Scaling action. Can it invoke the action
      again without another state change?
    a: Yes. Auto Scaling actions repeat once per minute while the alarm remains in the relevant state.
      Most other alarm actions run on state changes.
    trap: true
    facts:
      - state-actions
  - id: cloudwatch-098
    q: During a deployment, a team wants a CloudWatch composite alarm to retain its state but suppress
      SNS actions while a maintenance alarm is in ALARM. What should it configure?
    a: Use the maintenance alarm as an action suppressor. Configure wait and extension periods around
      its transitions; AWS recommends 60 seconds for each.
    facts:
      - composite-suppression
  - id: cloudwatch-099
    q: Two CloudWatch composite alarms depend on each other and cannot be deleted. How can an operator
      restore evaluation and remove the dependency?
    a: Set one composite alarm's AlarmRule to False to break the dependency cycle.
    facts:
      - composite-cycle
  - id: cloudwatch-100
    q: A CloudWatch alarm transitions to ALARM but its configured SNS topic does not exist. Does
      CloudWatch validate the action when the alarm is configured?
    a: No. CloudWatch does not validate the action or detect errors from attempts to invoke nonexistent
      SNS or Auto Scaling actions.
    trap: true
    facts:
      - alarm-action-validation
  - id: cloudwatch-101
    q: An operator tests a CloudWatch alarm action with SetAlarmState. Does the forced state persist?
    a: No. It is temporary and lasts until the next alarm comparison.
    facts:
      - alarm-test-state
  - id: cloudwatch-105
    q: A CloudWatch alarm must invoke a Lambda function in another AWS account. What permission must
      the function resource policy grant?
    a: Allow lambda.alarms.cloudwatch.amazonaws.com to invoke the function. Restrict the source account
      and alarm ARN.
    facts:
      - alarm-lambda-permission
  - id: cloudwatch-106
    q: An IAM user cannot create a CloudWatch composite alarm with a Systems Manager OpsItem action.
      Which permissions should be checked?
    a: Grant cloudwatch:PutCompositeAlarm scoped to all resources and iam:CreateServiceLinkedRole.
    facts:
      - composite-create-permission
  - id: cloudwatch-107
    q: A CloudWatch composite alarm must combine more than 100 underlying alarms. Can one composite
      rule reference all of them?
    a: No. A composite rule can reference up to 100 alarms.
    facts:
      - composite-limits
  - id: cloudwatch-108
    q: A team wants to silence CloudWatch metric and composite alarm actions during a recurring
      maintenance window while keeping state evaluation active. What should it configure?
    a: A scheduled alarm mute rule targeting alarms in the same account and Region.
    facts:
      - alarm-mute
  - id: cloudwatch-109
    q: A CloudWatch alarm changes state during a mute window and is still in that new state when the
      window ends. What happens to its actions?
    a: CloudWatch executes the current state's actions if the final state differs from the state at the
      start of the window.
    facts:
      - alarm-mute-end
  - id: cloudwatch-051
    q: A CloudWatch alarm has a 30-second period. Does it wait 30 seconds between evaluations?
    a: No. Alarms with 10-, 20-, or 30-second periods evaluate every 10 seconds. The period and
      evaluation cadence are different settings.
    trap: true
    facts:
      - short-cadence
  - id: cloudwatch-060
    q: CloudWatch log events have expired but have not been physically deleted. Are they still charged
      as archival storage?
    a: No. Events marked for deletion no longer add archival storage charges. Physical deletion normally
      takes up to 72 hours and can occasionally take longer.
    facts:
      - retention-expiry
      - retention-delay
  - id: cloudwatch-116
    q: Which CloudWatch metric shows which log groups ingest the most data and drive the CloudWatch Logs bill?
    a: AWS/Logs IncomingBytes, with the LogGroupName dimension.
    facts: [incoming-bytes]
  - id: cloudwatch-118
    q: "During an incident, an engineer wants to watch new log events appear and filter them for an error string. Which CloudWatch feature fits?"
    a: "CloudWatch Logs Live Tail, which streams newly ingested events with filtering and highlighting."
    facts: [live-tail]
  - id: cloudwatch-026
    q: Which query languages does CloudWatch Logs Insights support, and how long do queries and results
      last?
    a: Logs Insights QL, OpenSearch PPL, and OpenSearch SQL. Queries time out after 60 minutes; results
      remain for 7 days. Charges depend on data scanned.
    facts:
      - insights-languages
      - insights-timeout
      - insights-results
      - insights-cost
  - id: cloudwatch-070
    q: Can CloudWatch Logs Insights query events whose timestamps are older than their log group
      creation time?
    a: No. Those timestamps are outside the events Logs Insights can access for that group.
    trap: true
    facts:
      - insights-creation
  - id: cloudwatch-063
    q: A team wants a CloudWatch Logs metric filter with service dimensions and a default value of zero.
      Can it configure both?
    a: No. A metric filter with dimensions cannot specify a default value. Choose the dimension design
      and alarm missing-data behavior accordingly.
    trap: true
    facts:
      - filter-dimensions
---
CloudWatch operational controls help teams configure agents, manage alarm actions, and investigate logs. Their behavior matters when permissions, maintenance windows, or log retention affect an operational response.

### How it works

1. Give the agent credentials through an EC2 instance profile or a shared credentials profile, including on premises. [CloudWatchAgentServerPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/CloudWatchAgentServerPolicy.html#CloudWatchAgentServerPolicy-json) permits publishing metrics and logs and reading `AmazonCloudWatch-*` parameters; [CloudWatchAgentAdminPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/CloudWatchAgentAdminPolicy.html#CloudWatchAgentAdminPolicy-json) also permits writing those parameters. The agent stores collected logs in [CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent). See the [credential options](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Credentials-Preference.html#CloudWatch-Agent-Credentials-Preference).
2. Configure alarm actions and check their destinations. CloudWatch does not validate configured actions or detect errors when invoking nonexistent SNS topics or Auto Scaling actions. Most actions run on state changes, but Auto Scaling actions repeat every minute while the alarm remains in the relevant state. [SetAlarmState](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#common-features-of-alarms) forces a state only until the next comparison. See [alarm actions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms).
3. For a cross-account Lambda action, allow `lambda.alarms.cloudwatch.amazonaws.com` in the function resource policy and restrict the source account and alarm ARN. Creating a composite alarm requires `cloudwatch:PutCompositeAlarm` scoped to all resources; an IAM user also needs `iam:CreateServiceLinkedRole` for OpsItem actions. See [Lambda actions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-actions-Lambda.html#alarms-and-actions-Lambda) and [PutCompositeAlarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutCompositeAlarm.html#API_PutCompositeAlarm).
4. During maintenance, choose a [suppressor alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-suppression.html#Create_Composite_Alarm_Suppression_Wait_Extension) for composite actions or a [scheduled mute rule](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-mute-rules.html#effects-of-mute-rules) for targeted metric and composite alarms in the same account and Region. A suppressor in ALARM prevents composite actions, with wait and extension periods around its transitions. A mute rule suppresses actions while evaluation continues.
5. For logs, use [Live Tail](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogs_LiveTail.html#CloudWatchLogs_LiveTail) to filter and highlight newly ingested events during an incident. Use [IncomingBytes by LogGroupName](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch-Logs-Monitoring-CloudWatch-Metrics.html) to identify groups ingesting the most data. For investigation, [Logs Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData) charges by data scanned and cannot read events timestamped before their log group was created.

### Exam cues

- If a composite alarm remains silent during a deployment, think action suppression by a maintenance alarm, because a suppressor in ALARM prevents its actions.
- If recurring maintenance must silence actions while evaluation continues, think scheduled mute rules. After the window, actions run only if the current state differs from the state at the start.
- If composite alarms depend on each other and cannot be deleted, set one `AlarmRule` to `False` to break the [cycle](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html#Create_Composite_Alarm).
- If expired events remain in a log group, think [retention deletion delay](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention), because marked events no longer incur archival storage charges while deletion is pending.
- If a metric filter needs dimensions and a default value, choose the dimensions without a default, because [the two cannot be combined](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts).

### Remember

- A composite rule can reference up to 100 alarms; one alarm can be referenced by up to 150 composites.
- AWS recommends 60 seconds each for the suppressor wait and extension periods.
- Alarms with 10, 20, or 30 second periods evaluate every 10 seconds. See [evaluation settings](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-evaluation-settings).
- Expired log events are marked for deletion. Deletion normally takes up to 72 hours and can rarely take longer.
- Logs Insights supports Logs Insights QL, OpenSearch PPL, and OpenSearch SQL. Queries time out after 60 minutes; results remain available for 7 days.
- Live Tail sessions are billed per minute.

> **Trap:** An alarm action is not guaranteed to work just because it is configured. CloudWatch does not validate the destination; check that an SNS topic or Auto Scaling action exists.
