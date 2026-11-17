---
title: "GuardDuty basics"
level: foundational
order: 5
facts:
  - id: threat-detection
    text: "Amazon GuardDuty is a threat detection service that continuously analyzes AWS data sources and logs, using threat intelligence and machine learning, to find malicious activity such as compromised credentials."
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty
cards:
  - id: guardduty-032
    q: "A company wants continuous detection of compromised credentials and malicious activity in its AWS accounts without installing agents on its own. Which service fits?"
    a: "Amazon GuardDuty."
    facts: [threat-detection]
  - id: guardduty-033
    q: "Is Amazon GuardDuty a vulnerability scanner for software on EC2 instances?"
    a: "No. GuardDuty detects threats from activity and logs; Amazon Inspector scans for software vulnerabilities."
    trap: true
    facts: [threat-detection]
---
Amazon GuardDuty watches account activity and logs for signs of attack and reports findings. [What is Amazon GuardDuty?](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty)

### How it works

1. Turn on GuardDuty in the account.
2. It analyzes AWS logs and data sources continuously.
3. It reports findings such as compromised credentials or unusual access.

### Exam cues

- If the question says intelligent threat detection or compromised credentials, think GuardDuty.

### Remember

- Continuous threat detection with threat intelligence and machine learning.

> **Trap:** GuardDuty detects threats; Inspector finds vulnerabilities; Macie finds sensitive data in S3.
