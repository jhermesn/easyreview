---
title: "Inspector basics"
level: foundational
order: 5
facts:
  - id: vuln-scanning
    text: "Amazon Inspector automatically discovers workloads such as EC2 instances and continually scans them for software vulnerabilities and unintended network exposure."
    source: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html#what-is-inspector
cards:
  - id: inspector-012
    q: "A team needs automatic, continuous scanning of EC2 instances for known software vulnerabilities. Which service fits?"
    a: "Amazon Inspector."
    facts: [vuln-scanning]
---
Amazon Inspector finds software vulnerabilities and unintended network exposure in workloads.

### How it works

1. Turn on Inspector.
2. It discovers supported workloads automatically.
3. It scans them continually and reports vulnerabilities.

### Exam cues

- If the question says scan for software vulnerabilities (CVEs), think Inspector.

### Remember

- Automatic discovery and continual scanning.

> **Trap:** Inspector finds vulnerabilities; GuardDuty detects active threats.
