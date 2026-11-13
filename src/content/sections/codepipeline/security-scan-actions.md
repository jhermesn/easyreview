---
title: Security scan actions
level: associate
order: 80
facts:
  - id: scan-purpose
    text: InspectorScan is a managed compute CodePipeline action that scans source dependencies or
      container images for vulnerabilities.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan
  - id: scan-category
    text: InspectorScan uses the Invoke action category.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan-type
  - id: scan-mode
    text: InspectorRunMode accepts SourceCodeScan or ECRImageScan.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan-parameters
  - id: scan-image-settings
    text: ECRImageScan identifies the image using ECRRepositoryName and ImageTag.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan-parameters
  - id: scan-thresholds
    text: CriticalThreshold, HighThreshold, MediumThreshold, and LowThreshold are finding counts beyond
      which the scan action fails.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan-parameters
  - id: scan-source-input
    text: Source scanning consumes a source artifact; an ECR image scan does not require that source
      artifact.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan-input
  - id: scan-output
    text: InspectorScan produces an output artifact with vulnerability information in a software bill of
      materials file.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan-output
  - id: scan-compute
    text: InspectorScan runs on CodePipeline-managed CodeBuild compute and incurs separate CodeBuild
      charges.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan
  - id: scan-permissions
    text: InspectorScan service role permissions include inspector-scan:ScanSbom and ECR image-read
      permissions for image access.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#edit-role-InspectorScan
  - id: sbom-meaning
    text: An SBOM is a structured inventory of software components, libraries, and modules.
    source: https://docs.aws.amazon.com/inspector/latest/user/sbom-generator.html#sbom-generator
  - id: ecr-basic
    text: ECR basic scanning checks operating system vulnerabilities using manual or scan-on-push
      scanning.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html#image-scanning
  - id: ecr-enhanced
    text: ECR enhanced scanning uses Inspector to check operating system and programming language
      package vulnerabilities with scan-on-push or continuous scanning.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html#image-scanning
cards:
  - id: codepipeline-030
    q: A CodePipeline release must stop when an ECR image exceeds an allowed critical vulnerability
      count. Which action fits?
    a: "Use the Invoke-category `InspectorScan` action with `InspectorRunMode: ECRImageScan`, repository
      and tag, and `CriticalThreshold`. Counts beyond the threshold fail the action."
    facts:
      - scan-category
      - scan-mode
      - scan-image-settings
      - scan-thresholds
  - id: codepipeline-047
    q: A CodePipeline pipeline must scan source dependencies before deployment rather than an ECR image.
      How should InspectorScan be configured?
    a: "Use `InspectorRunMode: SourceCodeScan` with the source artifact and required severity
      thresholds. The action produces vulnerability information in an SBOM file."
    facts:
      - scan-mode
      - scan-source-input
      - scan-thresholds
      - scan-output
  - id: codepipeline-048
    q: Does the CodePipeline InspectorScan action run without additional build compute charges?
    a: No. It uses CodePipeline-managed CodeBuild compute and incurs separate CodeBuild charges.
    trap: true
    facts:
      - scan-compute
---
InspectorScan adds a vulnerability check to CodePipeline for source dependencies or container images. A vulnerability is a known software weakness; severity thresholds decide when findings block the action.

### How it works

1. Add the `InspectorScan` provider in the `Invoke` category.
2. Choose `InspectorRunMode: SourceCodeScan` and supply source files, or choose `ECRImageScan` with `ECRRepositoryName` and `ImageTag`.
3. Configure finding-count thresholds through `CriticalThreshold`, `HighThreshold`, `MediumThreshold`, and `LowThreshold` as needed.
4. The action scans on CodePipeline-managed CodeBuild compute. A count beyond a configured threshold fails it.
5. Read its output artifact for vulnerability information in a software bill of materials, or SBOM, a list of software components and their associated findings.

ECR registry scanning is a separate setting: basic scanning checks operating system packages manually or on push. Enhanced scanning uses Inspector for operating system and language packages, on push or continuously.

### Exam cues

- If the question says block an image release on critical findings, think `ECRImageScan` and `CriticalThreshold`, because the action fails when that count exceeds the threshold.
- If the question says check dependencies in source before deployment, think `SourceCodeScan`, because it consumes the source artifact.

### Remember

- ECR image scanning does not require the source-code input artifact.
- The service role needs `inspector-scan:ScanSbom` and image-read permissions for ECR access.
- This managed action incurs separate CodeBuild charges.

> **Trap:** A threshold is the allowed finding count. The action fails when the count goes beyond it, not merely when it equals it.
