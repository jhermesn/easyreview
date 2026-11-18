---
title: EC2, ECR, and Lambda scanning
level: associate
order: 10
facts:
  - id: purpose
    text: Amazon Inspector finds software vulnerabilities and unintended network exposure in supported workloads.
    source: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html
  - id: ecr-enhanced
    text: ECR enhanced scanning uses Inspector to find operating system and programming language package vulnerabilities in private registry images.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html
  - id: ecr-rescans
    text: ECR enhanced scanning supports scan on push and continuous scanning; continuous scanning rescans eligible images when relevant new CVEs appear.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html#ecr-scan-behavior
  - id: lambda-types
    text: Lambda standard scanning checks dependencies in functions and layers; optional Lambda code scanning checks custom code and requires standard scanning.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-lambda.html
cards:
  - id: inspector-001
    q: Which AWS service finds vulnerable packages in EC2 instances, private ECR images, and Lambda functions?
    a: Amazon Inspector. Select the scan type for each workload; findings identify software vulnerabilities and unintended network exposure.
    facts:
      - purpose
      - ecr-enhanced
      - lambda-types
  - id: inspector-006
    q: A team wants private ECR images reassessed when new relevant CVEs appear after image push. Which Inspector setting fits?
    a: ECR enhanced continuous scanning. It rescans images that remain eligible when relevant new CVEs appear.
    facts:
      - ecr-enhanced
      - ecr-rescans
  - id: inspector-007
    q: A team enabled Amazon Inspector Lambda standard scanning and wants flaws in its own function code detected. What must it add?
    a: Lambda code scanning. Standard scanning checks dependencies; code scanning checks custom application code.
    facts:
      - lambda-types
---

Amazon Inspector finds vulnerable software and unintended network exposure. A finding is a report of a detected issue. A CVE, or Common Vulnerabilities and Exposures entry, identifies a publicly known vulnerability.

### How it works

1. Activate the required scan types. Initial activation includes EC2, ECR, and Lambda standard scanning.
2. For EC2, collect software information with Systems Manager Agent, the software that lets Systems Manager manage a server, or from EBS disk snapshots. Hybrid mode combines these methods.
3. For private ECR images, use enhanced scanning and choose scan on push or continuous scanning. Continuous scans respond to relevant new CVEs while images remain eligible.
4. For Lambda, scan dependencies in functions and layers. Add code scanning to inspect custom application code.

| Workload | Scan method | Selection cue |
|---|---|---|
| EC2 instance | Agent or snapshots | Installed packages and network exposure |
| Private ECR image | Enhanced scanning | Operating system and language packages |
| Lambda function | Standard plus optional code scanning | Dependencies plus custom code |

### Exam cues

- If the question says container images need rescanning for new CVEs, think ECR enhanced continuous scanning, because it reassesses eligible images.
- If the question says Lambda dependencies are covered but custom code is not, think Lambda code scanning, because standard scanning covers dependencies.
- If the question says vulnerable packages across EC2, private ECR images, and Lambda functions, think Amazon Inspector, because it scans those workloads.

### Remember

- ECR enhanced scanning offers scan on push and continuous scanning.
- Lambda code scanning and machine image scanning require separate activation.
- Lambda code scanning requires standard scanning.

> **Trap:** Lambda standard scanning checks dependencies, not custom application code. Add Lambda code scanning to inspect custom code.
