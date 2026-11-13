---
title: Dashboards
level: associate
order: 120
facts:
  - id: dash-purpose
    text: CloudWatch dashboards combine selected metric and alarm views across Regions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
  - id: dash-global
    text: CloudWatch dashboards belong to an account globally rather than to a single Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutDashboard.html#API_PutDashboard
  - id: dash-graph
    text: Graph widgets display one or more metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-and-work-with-widgets.html#create-and-work-with-widgets
  - id: dash-alarm
    text: A single-alarm widget shows its metric graph and state; an alarm status widget shows alarm
      names and states without graphs.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-and-work-with-widgets.html#create-and-work-with-widgets
  - id: dash-explorer
    text: Metrics explorer widgets follow resources matching tags or resource properties as those
      resources are created or deleted.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-and-work-with-widgets.html#create-and-work-with-widgets
  - id: dash-text
    text: Text widgets support Markdown for operational guidance.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-and-work-with-widgets.html#create-and-work-with-widgets
  - id: dash-log-widget
    text: After running a Logs Insights query, use Add to dashboard to create a widget for it.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_ExportQueryResults.html#CWL_ExportQueryResults
  - id: dash-log-refresh
    text: Dashboard log queries run when the dashboard loads and refreshes and count toward concurrent
      Logs Insights query usage.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_ExportQueryResults.html#CWL_ExportQueryResults
  - id: dash-query-cost
    text: AWS recommends limiting log groups and time ranges and avoiding frequent dashboard query
      refreshes to reduce Logs Insights query charges.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
  - id: dash-put
    text: PutDashboard creates a dashboard or replaces the entire contents of an existing dashboard with
      the supplied JSON DashboardBody.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutDashboard.html#API_PutDashboard
  - id: term-widget
    text: A widget is a dashboard panel that displays data or explanatory text.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-and-work-with-widgets.html#create-and-work-with-widgets
cards:
  - id: cloudwatch-031
    q: A team needs a CloudWatch dashboard showing CPU, an alarm state, and recent log error counts. How
      can it build one?
    a: Use a metric graph and an alarm widget. Run a Logs Insights aggregation and choose Add to
      dashboard for a log query widget.
    facts:
      - dash-graph
      - dash-alarm
      - dash-log-widget
  - id: cloudwatch-082
    q: Are CloudWatch dashboards Regional, and how does PutDashboard update an existing dashboard?
    a: Dashboards are global within an account. PutDashboard replaces the complete dashboard contents
      with the supplied JSON DashboardBody.
    facts:
      - dash-global
      - dash-put
  - id: cloudwatch-083
    q: A CloudWatch dashboard with Logs Insights widgets refreshes frequently and query usage rises.
      What should operators change?
    a: Reduce refresh frequency and narrow the queried groups and time range. Each dashboard load or
      refresh starts its log queries again.
    facts:
      - dash-log-refresh
      - dash-query-cost
  - id: cloudwatch-084
    q: An EC2 fleet changes often and a CloudWatch dashboard must follow instances with a specific
      environment tag. Which widget fits?
    a: A metrics explorer widget. It follows matching tags or resource properties as resources are
      created or deleted.
    facts:
      - dash-explorer
---
A CloudWatch dashboard puts metric graphs, alarm states, and log query results in one view. A widget is an individual panel that displays one of those views.

### How it works

1. Create a dashboard in the console or supply a JSON `DashboardBody` to `PutDashboard`. Dashboards are global within an account and can show resources from different Regions.
2. Add widgets that answer the operational question. Use the table below to choose their contents.
3. For a log query widget, run a Logs Insights query and choose `Add to dashboard`. The query runs again when the dashboard loads or refreshes.
4. Keep log queries focused on the necessary log groups and time range. Avoid frequent refreshes, because they repeat query work and increase query charges.

| Widget | Use |
|---|---|
| Graph | One or more metric series |
| Single alarm | The alarm's metric graph and current state |
| Alarm status | Names and states of multiple alarms without graphs |
| Logs Insights query | Results from a saved dashboard query |
| Metrics explorer | Metrics for resources matching tags or properties, following resource changes |
| Text | Markdown guidance for operators |

### Exam cues

- If the question says show CPU, alarm state, and log error counts together, think metric, alarm, and Logs Insights widgets, because each supplies a different view.
- If the question says follow a changing fleet by tags, think metrics explorer, because matching resources are added or removed automatically.
- If the question says dashboard query usage rose after faster refreshes, think repeated log queries, because every refresh runs them again.

### Remember

- Dashboard scope is global within the account; displayed metrics can come from multiple Regions.
- A dashboard refresh runs its Logs Insights queries and consumes concurrent query capacity.
- `PutDashboard` replaces the entire dashboard body when updating an existing dashboard.

> **Trap:** Sending only a new widget to `PutDashboard` replaces the existing contents. Send the complete intended dashboard body.
