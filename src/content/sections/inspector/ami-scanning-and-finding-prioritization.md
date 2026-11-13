---
title: AMI scanning and finding prioritization
level: associate
order: 20
facts:
  - id: ami-separate
    text: Machine image scanning is activated separately from EC2 scanning.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html
  - id: ami-inventory
    text: Inspector scans owned AMIs for operating system and programming language package vulnerabilities using their backing EBS snapshots, without launching instances.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html#scan-types
  - id: ami-continuous
    text: Continuous is the default machine image scan mode; in-scope images are scanned on creation, copy, registration, or enablement and rescanned for new CVEs.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html#scan-types
  - id: ami-on-demand
    text: An on-demand machine image scan evaluates one AMI once, needs no Inspector activation, and does not enroll the image in continuous scanning.
    source: https://docs.aws.amazon.com/inspector/latest/user/machine-image-on-demand.html
  - id: ami-results
    text: On-demand AMI findings are delivered through EventBridge; they do not appear in the Inspector console, ListFindings, or Security Hub CSPM, but are viewable in the EC2 console.
    source: https://docs.aws.amazon.com/inspector/latest/user/machine-image-on-demand.html
  - id: score-context
    text: For EC2 package vulnerability findings, the Inspector score combines CVSS base information with environment details including network reachability and exploitability.
    source: https://docs.aws.amazon.com/inspector/latest/user/findings-understanding-score.html
  - id: score-source
    text: Inspector uses supported vendor CVSS base scores and otherwise NVD scores; the Inspector score is not available for Ubuntu Linux instances.
    source: https://docs.aws.amazon.com/inspector/latest/user/findings-understanding-score.html
  - id: finding-events
    text: Inspector publishes finding events to EventBridge, where rules can route them to response targets such as Lambda or SNS.
    source: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html
  - id: security-hub
    text: With the Inspector integration active, Security Hub CSPM receives supported Inspector findings for centralized security analysis.
    source: https://docs.aws.amazon.com/inspector/latest/user/securityhub-integration.html
cards:
  - id: inspector-003
    q: A team needs ongoing scans of golden AMIs and running EC2 instances, with automated finding response. Is Inspector EC2 scanning enough?
    a: Enable EC2 scanning and separately activate continuous machine image scanning. Use EventBridge finding events to trigger a response.
    trap: true
    facts:
      - ami-separate
      - ami-continuous
      - finding-events
  - id: inspector-004
    q: What does the Amazon Inspector score add to the base CVSS score for an EC2 package finding?
    a: Environment context, including network reachability and exploitability. Inspector uses supported vendor base scores or NVD scores; the score is unavailable on Ubuntu Linux instances.
    facts:
      - score-context
      - score-source
  - id: inspector-009
    q: A build pipeline needs one vulnerability check of a new AMI without enrolling the account in Inspector. Which scan fits?
    a: An on-demand machine image scan. It checks one AMI once and does not start continuous scanning.
    facts:
      - ami-on-demand
  - id: inspector-010
    q: A team runs an on-demand Inspector AMI scan but finds no result in ListFindings or Security Hub CSPM. Where should it look?
    a: Receive the findings through EventBridge, or view them in the EC2 console. On-demand AMI findings are absent from Inspector ListFindings and Security Hub CSPM.
    trap: true
    facts:
      - ami-results
  - id: inspector-011
    q: Must Amazon Inspector launch an EC2 instance to scan an owned AMI for package vulnerabilities?
    a: No. Machine image scanning reads software inventory from the AMI backing EBS snapshots.
    facts:
      - ami-inventory
diagrams:
  - id: inspector-finding-response
    title: Route supported Inspector findings to a response
    width: 800
    height: 170
    nodes:
      - id: n0
        label: Inspector
        icon: inspector
        tone: security
        x: 20
        y: 40
        w: 220
        h: 86
      - id: n1
        label: EventBridge
        icon: eventbridge
        tone: integration
        x: 290
        y: 40
        w: 220
        h: 86
      - id: n2
        label: Lambda response
        icon: lambda
        tone: compute
        x: 560
        y: 40
        w: 220
        h: 86
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
    steps:
      - Inspector publishes a finding event.
      - An EventBridge rule sends the matching event to a Lambda response.
---

Amazon Inspector machine image scanning checks Amazon Machine Images (AMIs), the templates used to launch EC2 instances. It examines their disk snapshots, so an image can be inspected without starting a server.

### How it works

1. Activate machine image scanning separately from EC2 instance scanning. The default continuous mode follows in-scope AMIs and new relevant CVEs.
2. Use an on-demand scan for a single image at a particular point in time. It does not enroll that image in continuous scanning.
3. For EC2 package findings, examine the Inspector score alongside its base Common Vulnerability Scoring System (CVSS) score. Reachability and exploitability add context for prioritization.
4. Route finding events through EventBridge, an event router that sends matching events to targets such as Lambda or SNS. Use the Security Hub CSPM integration for supported findings.

### Exam cues

- If the question says scan both golden AMIs and running instances continuously, think separate machine image and EC2 scan types, because they inspect different resources.
- If the question says check one build image without activating Inspector, think on-demand machine image scanning, because it runs a single evaluation.
- If the question says an on-demand AMI scan is missing from Security Hub CSPM, think EventBridge or the EC2 console, because those results bypass Inspector's normal findings views.

### Remember

- Machine image scanning defaults to continuous mode.
- Continuous AMI scans react to image creation, copy, registration, enablement, and new CVEs within the configured scope.
- On-demand results are absent from Inspector's console, `ListFindings`, and Security Hub CSPM.
- The Inspector score for EC2 package findings adds environment context; Ubuntu Linux instances do not have this score.

> **Trap:** A CVSS base score need not come from NVD. Inspector also uses supported vendor scores.
