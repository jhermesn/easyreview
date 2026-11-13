---
title: Real user monitoring
level: associate
order: 160
facts:
  - id: rum-purpose
    text: CloudWatch RUM collects client-side performance information from actual web and mobile user
      sessions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
  - id: rum-web
    text: RUM web data includes page load times, client-side errors, and user behavior.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
  - id: rum-breakdown
    text: RUM provides breakdowns by device type, operating system, and other usage characteristics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
  - id: rum-retention
    text: RUM retains end-user data for 30 days and then deletes it automatically.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
  - id: rum-logs
    text: An app monitor can copy RUM telemetry to CloudWatch Logs for retention controlled by the log
      group.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
  - id: rum-client
    text: Creating a web app monitor generates a code snippet that loads the RUM client to capture and
      send session data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-create-app-monitor.html#web-platform-app-monitor
  - id: rum-sample
    text: The web app monitor creation workflow defaults to sampling 100% of sessions; reducing the
      percentage reduces collected data and charges.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-create-app-monitor.html#web-platform-app-monitor
  - id: rum-options
    text: Web app monitor collection options include Performance telemetry, JavaScript errors, and HTTP
      errors.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-create-app-monitor.html#web-platform-app-monitor
  - id: rum-tracing
    text: Enabling X-Ray active tracing for a RUM monitor lets sampled client requests appear in
      Application Signals when it is enabled for the application.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-create-app-monitor.html#web-platform-app-monitor
  - id: rum-canary
    text: Synthetics canaries generate scheduled checks even when there is no customer traffic.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
  - id: term-appmonitor
    text: An app monitor holds the RUM configuration for collecting data from an application.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-create-app-monitor.html#web-platform-app-monitor
  - id: term-sample
    text: Session sampling selects a configured percentage of real user sessions for data collection.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started-create-app-monitor.html#web-platform-app-monitor
  - id: term-client
    text: Client-side data describes performance and errors observed in the user application or browser.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
cards:
  - id: cloudwatch-042
    q: What does CloudWatch RUM measure that a Synthetics canary does not directly measure?
    a: The experience of actual user sessions, including page load times, client-side errors, and user
      behavior. Canaries generate scheduled checks independently of customer traffic.
    facts:
      - rum-purpose
      - rum-web
      - rum-canary
  - id: cloudwatch-087
    q: A web team sees slow page loads on a particular browser and device type and needs evidence from
      real users. Which CloudWatch feature fits?
    a: CloudWatch RUM. Instrument the web application with its app-monitor client and inspect
      performance data by usage characteristics.
    facts:
      - rum-purpose
      - rum-web
      - rum-breakdown
      - rum-client
  - id: cloudwatch-088
    q: A team needs CloudWatch RUM telemetry beyond its built-in retention. What should it configure?
    a: Enable copies to CloudWatch Logs and set that log group retention appropriately. RUM itself
      deletes end-user data after 30 days.
    facts:
      - rum-retention
      - rum-logs
  - id: cloudwatch-089
    q: What session sampling percentage does the CloudWatch RUM web app monitor creation workflow use by
      default?
    a: 100%. Reduce it to collect fewer sessions and reduce charges.
    facts:
      - rum-sample
---
CloudWatch RUM measures the experience of actual users in web and mobile applications. Client-side data comes from the user's application or browser, helping explain delays and errors that server measurements alone do not describe.

### How it works

1. Create an app monitor, the RUM configuration for an application. For a web application, add the generated code snippet to load the RUM client, the code that captures and sends session data.
2. Choose the session sampling percentage, the share of sessions to record. The web app monitor creation workflow defaults to 100%; reducing it collects less data and reduces charges.
3. Choose collection options such as Performance telemetry, JavaScript errors, and HTTP errors. Examine page load times, client errors, and usage breakdowns by devices or operating systems.
4. If you need longer retention, copy telemetry to CloudWatch Logs and set the log group's retention. To connect sampled client requests to Application Signals, enable X-Ray active tracing for the monitor and Application Signals for the application.

### Exam cues

- If the question says users on one browser experience slow pages, think RUM, because it records client performance from actual sessions and supports usage breakdowns.
- If the question says keep RUM data longer, think CloudWatch Logs copies, because the log group has its own retention setting.
- If the question says test a page when no users are present, think Synthetics, because a canary generates scheduled checks.

### Remember

- RUM end-user data retention is 30 days, followed by automatic deletion.
- The web monitor creation workflow defaults to 100% session sampling.
- Copying telemetry to Logs gives the copy a separate retention policy.

> **Trap:** RUM measures actual sessions. A quiet application needs synthetic checks to exercise its user flows without customer traffic.
