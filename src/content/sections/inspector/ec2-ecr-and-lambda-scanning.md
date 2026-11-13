---
title: EC2, ECR, and Lambda scanning
level: associate
order: 10
facts:
  - id: purpose
    text: Amazon Inspector finds software vulnerabilities and unintended network exposure in supported workloads.
    source: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html
  - id: initial-types
    text: First activation enables EC2, ECR, and Lambda standard scanning; Lambda code scanning and machine image scanning require separate activation.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html
  - id: ec2-methods
    text: EC2 scans compare collected software metadata with security advisories; agent-based scanning uses Systems Manager Agent and agentless scanning uses EBS snapshots.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ec2.html
  - id: hybrid-default
    text: Hybrid is the default EC2 scanning mode and uses agent-based scanning for managed instances and agentless scanning for eligible unmanaged instances.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ec2.html
  - id: ecr-enhanced
    text: ECR enhanced scanning uses Inspector to find operating system and programming language package vulnerabilities in private registry images.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html
  - id: ecr-rescans
    text: ECR enhanced scanning supports scan on push and continuous scanning; continuous scanning rescans eligible images when relevant new CVEs appear.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html#ecr-scan-behavior
  - id: lambda-types
    text: Lambda standard scanning checks dependencies in functions and layers; optional Lambda code scanning checks custom code and requires standard scanning.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-lambda.html
  - id: lambda-eligibility
    text: Eligible Lambda functions use a supported runtime, are $LATEST, were invoked or updated within 90 days, and are not excluded by tags.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-lambda.html#supported-functions
  - id: classic-retired
    text: Amazon Inspector Classic reached end of support on May 20, 2026.
    source: https://docs.aws.amazon.com/managedservices/latest/onboardingguide/inspector.html
  - id: classic-model
    text: Historically, Inspector Classic assessed EC2 instances launched from golden AMIs using an Inspector agent, tag-selected assessment targets, and assessment templates.
    source: https://aws.amazon.com/blogs/security/how-to-set-up-continuous-golden-ami-vulnerability-assessments-with-amazon-inspector/
cards:
  - id: inspector-001
    q: Which AWS service finds vulnerable packages in EC2 instances, private ECR images, and Lambda functions?
    a: Amazon Inspector. Select the scan type for each workload; findings identify software vulnerabilities and unintended network exposure.
    facts:
      - purpose
      - ecr-enhanced
      - lambda-types
  - id: inspector-002
    q: How does Amazon Inspector collect EC2 software information, and what scan mode is the default?
    a: Systems Manager Agent or EBS snapshots. The default hybrid mode combines agent-based scanning for managed instances with agentless scanning for eligible unmanaged instances.
    facts:
      - ec2-methods
      - hybrid-default
  - id: inspector-005
    q: An older Amazon Inspector design uses tag-selected assessment targets, assessment templates, and an Inspector agent. Which version is this?
    a: Inspector Classic. Its support ended May 20, 2026. Current Inspector uses workload scan types.
    trap: true
    facts:
      - classic-model
      - classic-retired
      - initial-types
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
  - id: inspector-008
    q: An Amazon Inspector Lambda function has not been invoked or updated for more than 90 days. Why might it be outside scan coverage?
    a: Lambda scan eligibility requires an invocation or update within 90 days, a supported runtime, $LATEST, and no exclusion tag.
    trap: true
    facts:
      - lambda-eligibility
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
- If the question says assessment targets and templates, think Inspector Classic, because that was its assessment model.

### Remember

- EC2 hybrid scanning is the default.
- Lambda code scanning and machine image scanning require separate activation.
- Lambda eligibility includes a supported runtime, `$LATEST`, activity within 90 days, and no exclusion tag.
- Inspector Classic support ended May 20, 2026.

> **Trap:** A legacy golden-AMI design launched EC2 instances and used tag-selected Classic assessment targets. Recognize that historical mechanism; current AMI scanning is a separate scan type.
