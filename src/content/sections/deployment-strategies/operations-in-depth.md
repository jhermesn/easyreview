---
title: Image pipeline controls and rollback
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
EC2 Image Builder pipelines depend on instance connectivity and permissions to build, test, log, and publish AMIs. A scan result condition can gate distribution, while instance refresh rollback needs a supported launch configuration.

### How it works

1. Give build and test instances access to Systems Manager and an instance profile with permissions for their components. Image Builder uses [Run Command](https://docs.aws.amazon.com/imagebuilder/latest/userguide/set-up-ib-env.html#prereq-config) to operate those instances. If build logs go to Amazon S3, the [instance profile](https://docs.aws.amazon.com/imagebuilder/latest/userguide/set-up-ib-env.html#image-builder-IAM-prereq) also needs `s3:PutObject` for the bucket.
2. For an [output Parameter Store value](https://docs.aws.amazon.com/imagebuilder/latest/userguide/cr-upd-ami-distribution-settings.html#ami-distribution-prereqs-ssm-param), grant the execution role `ssm:PutParameter` and, for `aws:ec2:image` validation, `ec2:DescribeImages`. Enable a targeted opt-in Region in the source account for parameter writes.
3. Enable an [Amazon Inspector on-demand AMI scan](https://docs.aws.amazon.com/imagebuilder/latest/userguide/integ-inspector.html#integ-inspector-ami-scan) and set a scan result condition to make Image Builder wait for the result. Findings above the allowed severity fail the image. This scan does not require Inspector account activation.
4. For [instance refresh rollback](https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html), specify a desired configuration and use an explicit numbered previous launch template version. Rollback does not support `$Latest`, `$Default`, or a Parameter Store AMI alias.

### Exam cues

- If a private build or test instance cannot run components, think Systems Manager access and instance profile permissions, because Image Builder sends actions through Run Command.
- If an AMI copy reaches an opt-in Region but its output parameter fails, think source account Region enablement and execution role permissions, because the parameter write has its own prerequisites.
- If findings above a severity must block AMI distribution, think on-demand scanning with a scan result condition, because the condition makes Image Builder wait and evaluate the results.
- If a release needs instance refresh rollback, think a desired configuration and a numbered previous launch template version, because aliases and symbolic versions are unsupported.

### Remember

- The instance profile needs `s3:PutObject` for configured S3 build logs.
- The execution role needs `ssm:PutParameter` for output parameters and `ec2:DescribeImages` for `aws:ec2:image` validation.
- On-demand AMI scanning does not require Inspector account activation.

> **Trap:** Enabling an on-demand AMI scan alone does not make distribution wait. Set a scan result condition to fail the image when findings exceed the allowed severity.
