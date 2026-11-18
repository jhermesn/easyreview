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
cards:
  - id: cloudwatch-124
    q: "A team wants an email when the CPU of an EC2 instance stays above 80 percent. Which service fits?"
    a: "Amazon CloudWatch: a metric alarm on CPU utilization that notifies through Amazon SNS."
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
---
Amazon CloudWatch is the monitoring service of AWS: it collects metrics and logs from resources and applications and acts on them with alarms and dashboards. [What is Amazon CloudWatch?](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#WhatIsCloudWatch)

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
