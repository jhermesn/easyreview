---
title: "PLACEHOLDER deployment-strategies/operations-in-depth"
level: professional
order: 60
facts:
  - id: rollback-versions
    text: Instance refresh rollback requires a desired configuration and an explicit numbered previous
      launch template version; $Latest, $Default, and Parameter Store AMI aliases are not supported.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html
  - id: parameter-permissions
    text: Image Builder output parameters require ssm:PutParameter on the execution role and ec2:DescribeImages
      for aws:ec2:image validation; the source account must enable a targeted opt-in Region for parameter writes.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#ami-distribution-prereqs-ssm-param
  - id: build-ssm
    text: Image Builder build and test instances must reach Systems Manager. Image Builder uses Run Command
      and requires an instance profile with permissions for the build and test components.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/set-up-ib-env.html#prereq-config
  - id: build-logs
    text: If Image Builder writes build logs to an S3 bucket, its instance profile needs s3:PutObject for that
      bucket.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/set-up-ib-env.html#image-builder-IAM-prereq
  - id: ami-scan-release
    text: Image Builder added on-demand AMI scanning with Amazon Inspector in October 2026.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/doc-history.html
  - id: ami-scan-gate
    text: On-demand AMI scanning does not require Inspector account activation. A scan result condition makes
      Image Builder wait and fail the image for findings above the allowed severity; without one, it can distribute
      before the scan finishes.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/integ-inspector.html#integ-inspector-ami-scan
cards:
  - id: deployment-strategies-029
    q: An Auto Scaling instance refresh needs rollback, but the group uses $Latest or an AMI alias from
      Parameter Store. What must the release plan change?
    a: Use a supported explicit numbered launch template version and specify a desired configuration.
      Instance refresh rollback does not support $Latest, $Default, or Parameter Store AMI aliases.
    trap: true
    facts:
      - rollback-versions
  - id: deployment-strategies-036
    q: Image Builder copies an AMI to an opt-in Region but fails to publish its ID to Parameter Store. What
      permissions and Region setting should be checked?
    a: Enable the opt-in Region in the source account and grant the execution role ssm:PutParameter and, for
      aws:ec2:image validation, ec2:DescribeImages.
    facts:
      - parameter-permissions
  - id: deployment-strategies-038
    q: An Image Builder AMI build in a private subnet cannot run its test components. Which Systems Manager
      prerequisites should an operator check?
    a: Ensure build and test instances can reach Systems Manager and their instance profile has permissions for
      the components. Image Builder uses Run Command to operate the instances.
    facts:
      - build-ssm
  - id: deployment-strategies-039
    q: An Image Builder instance cannot upload build logs to the configured Amazon S3 bucket. What permission
      does its instance profile need?
    a: Grant s3:PutObject for the target bucket's objects.
    facts:
      - build-logs
  - id: deployment-strategies-040
    q: An Image Builder pipeline must block AMI distribution when an Amazon Inspector on-demand scan finds
      vulnerabilities above an allowed severity. What must it configure?
    a: Enable on-demand AMI scanning and set a scan result condition. Without the condition, distribution can
      proceed before the scan finishes. This scan option was added in October 2026.
    facts:
      - ami-scan-release
      - ami-scan-gate
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
