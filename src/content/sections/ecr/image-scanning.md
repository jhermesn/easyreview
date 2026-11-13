---
title: Image scanning
level: associate
order: 20
facts:
  - id: basic-packages
    text: ECR basic scanning uses AWS native technology to identify operating system package
      vulnerabilities.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-basic.html#image-scanning-basic
  - id: basic-frequency
    text: Basic scanning supports manual and scan-on-push modes; repositories outside scan-on-push
      filters use manual scanning.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-basic.html#image-scanning-basic
  - id: basic-scan-limit
    text: A basic-scanning image can be scanned once per 24 hours, counting both push and manual scans.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-basic.html#image-scanning-basic
  - id: enhanced-packages
    text: Enhanced scanning uses Amazon Inspector for operating system and programming language package
      vulnerabilities.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html#image-scanning-enhanced
  - id: enhanced-frequency
    text: Enhanced repository scan filters select scan-on-push or continuous scanning.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html#image-scanning-enhanced
  - id: continuous-updates
    text: Continuous Inspector scanning rescans eligible images when relevant new CVEs enter its
      database.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html#ecr-scan-behavior
  - id: finding-events
    text: Inspector emits EventBridge events when an initial enhanced scan completes or a finding is
      created, updated or closed.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html#image-scanning-enhanced-considerations
  - id: enhanced-filters
    text: Enhanced repositories that match no filter have scanning Off; manual enhanced scans are
      unsupported.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html#image-scanning-enhanced-considerations
  - id: filter-priority
    text: Continuous scanning takes precedence when both continuous and scan-on-push enhanced filters
      match a repository.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html#image-scanning-enhanced-considerations
  - id: switch-results
    text: Switching basic and enhanced scanning makes earlier scans unavailable, but switching back
      makes the earlier scans available again.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html#image-scanning
  - id: results-api
    text: Current basic scanning returns findings through DescribeImageScanFindings rather than
      DescribeImages scan-summary fields.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html#image-scanning
  - id: duration-defaults
    text: For Inspector ECR scanning activated on or after October 15, 2026, image push-date and re-scan
      duration defaults are both 7 days, with re-scans based on last-in-use date.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html#ecr-scan-behavior
  - id: older-duration
    text: Inspector scanning activated from May 16, 2024 through October 14, 2026 defaults to 14-day
      push-date and re-scan durations; earlier activations default to 90 days and use last pull
      date.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html#ecr-scan-behavior
  - id: basic-migration
    text: AWS completed migration from Clair to AWS native ECR basic scanning in February 2026.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/doc-history.html#doc-history
  - id: cve-definition
    text: A CVE is a named entry describing a publicly known software vulnerability.
    source: https://docs.aws.amazon.com/inspector/latest/user/findings-types.html
  - id: enhanced-charges
    text: Enhanced scanning incurs Amazon Inspector scanning charges.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html#image-scanning-enhanced-considerations
diagrams:
  - id: ecr-continuous-findings
    title: Continuous vulnerability scanning
    width: 800
    height: 170
    nodes:
      - id: repository
        label: ECR repository
        icon: elastic-container-registry
        info: Select the repository for continuous enhanced scanning.
        x: 20
        y: 45
        w: 220
        h: 86
        tone: compute
      - id: scan
        label: Inspector
        icon: inspector
        info: Scan operating system and language packages; rescan eligible images for relevant new CVEs.
        x: 280
        y: 45
        w: 220
        h: 86
        tone: compute
      - id: events
        label: Finding events
        icon: eventbridge
        info: Inspector emits events when findings are created, updated or closed.
        x: 540
        y: 45
        w: 220
        h: 86
        tone: compute
    edges:
      - from: repository
        to: scan
        step: 1
      - from: scan
        to: events
        step: 2
    steps:
      - Inspector scans the selected repository images while eligible.
      - Inspector sends finding changes to EventBridge.
cards:
  - id: ecr-003
    q: How do ECR basic and enhanced scanning differ in package coverage?
    a: Basic scans operating system packages using AWS native technology. Enhanced uses Inspector and
      covers both operating system and programming language packages.
    facts:
      - basic-packages
      - enhanced-packages
  - id: ecr-007
    q: Which scan frequencies does ECR support for basic versus enhanced scanning?
    a: "Basic: manual or scan on push. Enhanced: scan on push or continuous. Enhanced scanning does not
      support manual scans."
    facts:
      - basic-frequency
      - enhanced-frequency
      - enhanced-filters
  - id: ecr-008
    q: An ECR image had no reported vulnerabilities when pushed. Will that result remain valid as new
      vulnerabilities are discovered?
    a: Not necessarily. Use continuous enhanced scanning to rescan eligible images for relevant newly
      published CVEs, and monitor finding events. Check that the image remains within scanning
      eligibility.
    trap: true
    facts:
      - continuous-updates
      - finding-events
      - duration-defaults
  - id: ecr-012
    q: An ECR repository uses enhanced scanning but matches neither scan filter. Will it receive manual
      scans as a fallback?
    a: No. Its scan frequency is Off. Manual scanning is not supported for enhanced scanning.
    trap: true
    facts:
      - enhanced-filters
  - id: ecr-013
    q: A team switches an ECR registry from basic to enhanced scanning and can no longer see its basic
      results. Were those results permanently deleted by the switch?
    a: No. Earlier scans are unavailable under the other scan type, but become available again if the
      team switches back.
    trap: true
    facts:
      - switch-results
  - id: ecr-014
    q: A security pipeline reads ECR DescribeImages but receives no current basic scan summary. Which
      API should it call?
    a: DescribeImageScanFindings. Current basic scanning no longer uses the DescribeImages scan-summary
      fields to return scan results.
    facts:
      - results-api
---
ECR image scanning finds software vulnerabilities, flaws that may let software be attacked. A CVE, or Common Vulnerabilities and Exposures entry, identifies a publicly known vulnerability. A finding is a reported vulnerability in an image package.

### How it works

1. Choose basic or enhanced scanning and configure repository filters, rules selecting which repository names receive each scan frequency.
2. Basic scanning checks operating system packages. Run it manually or configure scanning on image push. Repositories outside push filters use manual scanning.
3. Enhanced scanning uses Inspector to check operating system and programming language packages. Continuous mode rescans eligible images when relevant new CVEs appear. Scan-on-push mode scans on a push.
4. Consume findings through `DescribeImageScanFindings`. Inspector also sends enhanced-scan completion and finding-change events to EventBridge.
5. Check coverage duration. Continuous scanning follows configured eligibility periods; its defaults depend on when the account activated ECR scanning.

| Scan choice | Package coverage | Frequency |
|---|---|---|
| Basic | Operating system | Manual or on push |
| Enhanced, on push | Operating system and language packages | On push |
| Enhanced, continuous | Operating system and language packages | On push and when relevant new CVEs appear while eligible |

### Exam cues

- If the question says detect newly disclosed language-package vulnerabilities after image creation, think continuous enhanced scanning, because Inspector updates eligible image findings.
- If the question says a repository matches both enhanced frequency filters, think continuous scanning, because it takes precedence over scan on push.
- If the question says findings disappear after changing scan types, think switch back to view the earlier scans, because changing types makes them unavailable rather than permanently deleting them.

### Remember

- Basic scanning allows one scan per image per 24 hours, including its push scan.
- Enhanced repositories outside all filters are Off. There is no manual enhanced-scan fallback.
- For activations from October 15, 2026, default push-date and re-scan durations are 7 days, based on last use. Activations from May 16, 2024 through October 14, 2026 use 14 days; earlier activations use 90 days and last pull date.
- AWS completed the migration from Clair to AWS native basic scanning in February 2026.
- Enhanced scanning incurs Inspector charges.

> **Trap:** A clean scan describes what was known at that scan. Continuous scanning can find later CVEs, but the image must remain eligible for scanning.
