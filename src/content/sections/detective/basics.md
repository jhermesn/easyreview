---
title: "Detective basics"
level: foundational
order: 5
facts:
  - id: investigate
    text: "Amazon Detective helps investigate security findings and suspicious activity by collecting log data and building visualizations to find the root cause."
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: history
    text: "Detective keeps up to a year of historical event data and links activity to GuardDuty findings."
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: analysis-methods
    text: Amazon Detective builds its investigation visualizations with machine learning, statistical analysis and graph theory.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
cards:
  - id: detective-008
    q: "GuardDuty raised a finding and the security team needs to find its root cause and scope. Which service helps investigate?"
    a: "Amazon Detective, which visualizes related activity to find the root cause."
    facts: [investigate, history]
  - id: detective-009
    q: "Does Amazon Detective detect threats on its own the way GuardDuty does?"
    a: "No. GuardDuty detects threats; Detective helps investigate findings and find their root cause."
    trap: true
    facts: [investigate]
---
Amazon Detective is an investigation tool: after something suspicious is found, it shows the related activity to explain what happened.

### How it works

1. Detective collects log data from AWS resources.
2. It builds graphs and visualizations of activity over time.
3. Analysts follow a finding to the root cause.

Its investigation visuals come from machine learning, statistical analysis and graph theory applied to that data.

### Exam cues

- If the question says investigate or find the root cause of a security finding, think Detective.

### Remember

- Up to a year of history; works with GuardDuty findings.

> **Trap:** GuardDuty finds threats. Detective investigates them.
