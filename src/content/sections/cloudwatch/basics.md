---
title: "CloudWatch basics"
level: foundational
order: 5
facts:
  - id: monitors
    text: "Amazon CloudWatch monitors AWS resources and the applications running on AWS in real time."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#WhatIsCloudWatch
  - id: metrics-alarms-logs
    text: "CloudWatch provides metrics, alarms and dashboards for operational visibility, and collects, stores and queries logs."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#WhatIsCloudWatch
  - id: agent
    text: "The CloudWatch agent gathers metrics, logs and traces from Amazon EC2 instances."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#WhatIsCloudWatch
  - id: billing-alarm
    text: A billing alarm watches the EstimatedCharges metric and notifies through Amazon SNS; billing alerts must be turned on first, and billing metric data is stored in US East (N. Virginia).
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html
  - id: purpose
    text: Amazon CloudWatch monitors AWS resources and applications in real time, covering resource utilization, application performance and operational health.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html
cards:
  - id: cloudwatch-124
    q: "How can Amazon CloudWatch support data governance through logging?"
    a: "It collects, stores and queries logs."
    facts: [metrics-alarms-logs]
  - id: cloudwatch-125
    q: "Which AWS service collects and searches application log files from EC2 instances?"
    a: "Amazon CloudWatch Logs, with the CloudWatch agent installed on the instances."
    facts: [metrics-alarms-logs, agent]
  - id: cloudwatch-126
    q: "Does Amazon CloudWatch tell you which user changed a security group?"
    a: "No. That is AWS CloudTrail. CloudWatch watches metrics, logs and alarms about performance and health."
    trap: true
    facts: [monitors]
  - id: cloudwatch-113
    q: A company wants an email when its estimated AWS charges pass 500 USD, using CloudWatch. What does it set up, and in which Region?
    a: A CloudWatch billing alarm on EstimatedCharges with an SNS notification, created in US East (N. Virginia) after turning on billing alerts.
    facts: [billing-alarm]
  - id: cloudwatch-114
    q: Which AWS service monitors resource utilization, application performance and operational health of AWS resources?
    a: Amazon CloudWatch.
    facts: [purpose]
---
Amazon CloudWatch is the monitoring service of AWS: it collects metrics and logs from resources and applications and acts on them with alarms and dashboards.

### How it works

1. AWS services publish metrics such as CPU use to CloudWatch; the CloudWatch agent adds metrics and logs from inside instances.
2. Dashboards show the data, and Logs stores and searches log lines.
3. An alarm watches a metric against a threshold and triggers an action, such as an SNS notification or scaling.

### Exam cues

- If the question says monitor performance, set a threshold alert or view a dashboard, think CloudWatch.
- If the question says collect logs from servers, think CloudWatch Logs with the CloudWatch agent.

### Remember

- Metrics, alarms, dashboards and logs.
- The agent collects data from inside EC2 instances.

> **Trap:** CloudWatch shows how resources behave. It does not record who called an API; CloudTrail does.
