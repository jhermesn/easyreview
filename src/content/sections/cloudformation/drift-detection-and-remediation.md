---
title: Drift detection and remediation
level: professional
order: 110
facts:
  - id: drift
    text: Drift is a difference between a resource actual configuration and the expected template and
      parameter configuration.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#what-is-drift
  - id: explicit
    text: Drift detection compares only supported resources and properties explicitly set in the
      template, including values supplied through parameters.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#what-is-drift
  - id: nested-drift
    text: Drift detection on a parent stack does not inspect nested stacks; run detection on each nested
      stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#what-is-drift
  - id: unreadable
    text: Drift detection cannot compare values the resource service does not return, such as passwords.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#drift-considerations
  - id: resource-status
    text: Resource drift status is IN_SYNC, MODIFIED, DELETED, or NOT_CHECKED.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#drift-status-codes
  - id: stack-status
    text: Stack drift status is IN_SYNC, DRIFTED, or NOT_CHECKED; one drifted resource makes the stack
      DRIFTED.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#drift-status-codes
  - id: detect-only
    text: Drift detection reports differences; corrective action is needed to change resource
      configuration.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#using-cfn-stack-drift
  - id: import-drift
    text: To accept live changes without replacement on an import-supported resource, retain it, remove
      it from the stack, then import it with a template matching its actual state.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import-resolve-drift.html#resource-import-resolve-drift
  - id: config-rule
    text: The Config rule cloudformation-stack-drift-detection-check performs drift detection on
      configuration changes and periodically, and reports DRIFTED stacks NON_COMPLIANT.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cloudformation-stack-drift-detection-check.html#cloudformation-stack-drift-detection-check
  - id: drift-event
    text: CloudFormation Drift Detection Status Change events use source aws.cloudformation and
      detail.stack-drift-status to report stack drift.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/event-detail-stack-drift-detection-change.html#event-detail-stack-drift-detection-change
  - id: event-count
    text: The drift status event reports drifted-stack-resource-count as -1 while detection is in
      progress.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/event-detail-stack-drift-detection-change.html#event-detail-stack-drift-detection-change
  - id: stackset-drift
    text: StackSet drift detection checks each associated stack, accounts for parameter overrides, and
      marks the StackSet DRIFTED if any instance drifts.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-drift.html#stacksets-drift-how
  - id: direct-stack-update
    text: A direct CloudFormation update to a StackSet member stack is not itself drift when resources
      still match that stack own template and parameters.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-drift.html#stacksets-drift-how
  - id: drift-aware
    text: A drift-aware change set uses deployment mode REVERT_DRIFT to compare actual, previous, and
      desired states and reconcile supported drift on execution.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/drift-aware-change-sets.html#drift-aware-change-sets
  - id: reconcile-limit
    text: Drift-aware change sets cannot reconcile immutable properties and use previous deployment
      values for unsupported types and write-only properties.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/drift-aware-change-sets.html#drift-aware-change-sets-considerations
  - id: accept-live
    text: Updating a template to match actual state lets a drift-aware change set reset drift status
      without modifying that resource.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/drift-aware-change-sets.html#drift-aware-change-sets
  - id: drift-permissions
    text: Drift detection requires CloudFormation detection and type configuration permissions plus read
      permissions for supported resources, such as ec2:DescribeInstances.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#drift-considerations
  - id: drift-kms-code
    text: CloudFormation drift detection does not check KMSKeyId properties or compare Lambda function
      source code to its template Code property.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#drift-considerations
  - id: drift-empty-support
    text: A stack with no resources supporting drift detection can still report IN_SYNC.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#drift-status-codes
  - id: drift-attachments
    text: Drift results for resource attachments across stacks can be inaccurate because CloudFormation
      cannot analyze attachments across stacks.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#drift-considerations
  - id: drift-async
    text: DetectStackDrift returns an operation ID; DescribeStackDriftDetectionStatus monitors progress
      and DescribeStackResourceDrifts returns resource results.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_DetectStackDrift.html#API_DetectStackDrift
  - id: drift-rollback
    text: A failed drift-aware deployment rolls resources back to their actual pre-deployment state.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/drift-aware-change-sets.html#drift-aware-change-sets-cli-execute
  - id: drift-managed
    text: Drift-aware change sets leave AWS-managed property values unchanged when the template does not
      modify them, and do not remove or modify tag keys absent from the template.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/drift-aware-change-sets.html#drift-aware-change-sets-considerations
  - id: drift-aware-attachments
    text: Drift-aware change sets can detect and revert attachments made by resources in another stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/drift-aware-change-sets.html#drift-aware-change-sets-considerations
  - id: config-timeout
    text: The AWS Config drift detection rule has a 15-minute execution limit; AWS suggests dividing
      stacks by tags and using separately scoped rule instances if it times out.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cloudformation-stack-drift-detection-check.html#cloudformation-stack-drift-detection-check
  - id: update-stack-runbook
    text: "The AWS-UpdateCloudFormationStack Automation runbook updates an existing stack from a template stored in S3. It takes the stack name or ID, the template URL and a role for its Lambda step."
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-updatecloudformationstack.html#automation-aws-updatecloudformationstack
  - id: not-checked
    text: Resources whose type doesn't support drift detection get a drift status of NOT_CHECKED.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html
  - id: config-rule-timeout
    text: The Config rule cloudformation-stack-drift-detection-check runs DetectStackDrift on every stack and is limited to 15 minutes, so in large accounts scope it to fewer stacks with tags.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cloudformation-stack-drift-detection-check.html
cards:
  - id: cloudformation-051
    q: What does CloudFormation drift detection compare, and what statuses describe its results?
    a: "Supported, explicitly configured properties against actual resources. Resource statuses:
      IN_SYNC, MODIFIED, DELETED, NOT_CHECKED. Stack statuses: IN_SYNC, DRIFTED, NOT_CHECKED."
    facts:
      - explicit
      - resource-status
      - stack-status
  - id: cloudformation-052
    q: Why can a CloudFormation drift check miss an external configuration change?
    a: The type may be unsupported, the property may not be explicitly configured or readable, or the
      change may be inside a nested stack that needs a separate check. Detection itself does not
      repair configuration.
    trap: true
    facts:
      - explicit
      - unreadable
      - nested-drift
      - detect-only
  - id: cloudformation-053
    q: How can a team reconcile a drifted CloudFormation resource while preserving an accepted live
      configuration?
    a: Update the template to match the live state. For supported properties, a drift-aware change set
      can reconcile it. If adoption would require replacement, use Retain, remove, and import for a
      resource supporting import.
    facts:
      - accept-live
      - reconcile-limit
      - import-drift
  - id: cloudformation-058
    q: How can a team evaluate and route CloudFormation drift findings?
    a: Use the Config rule cloudformation-stack-drift-detection-check for recurring evaluation, or match
      CloudFormation Drift Detection Status Change events from aws.cloudformation with
      detail.stack-drift-status equal to DRIFTED.
    facts:
      - config-rule
      - drift-event
  - id: cloudformation-060
    q: Does a successful parent-stack drift check prove that all nested CloudFormation resources match
      their templates?
    a: No. Run drift detection separately on nested stacks. Unsupported types, unspecified defaults, and
      unreadable properties also limit coverage.
    trap: true
    facts:
      - nested-drift
      - explicit
      - unreadable
  - id: cloudformation-093
    q: A CloudFormation baseline spans accounts through StackSets. How can a team check configuration
      drift across its instances?
    a: Run StackSet drift detection. It checks each member stack against its own template and parameter
      overrides, then aggregates the results.
    facts:
      - stackset-drift
  - id: cloudformation-094
    q: A CloudFormation update must preview and restore live properties changed outside the template.
      Which change set mode should the team use?
    a: REVERT_DRIFT for a drift-aware change set. It compares actual, previous, and desired states for
      supported properties before execution.
    facts:
      - drift-aware
      - reconcile-limit
  - id: cloudformation-095
    q: A team changes a StackSet member template through a direct CloudFormation stack update. Is that
      template difference necessarily reported as drift?
    a: No. Drift compares each stack resource with that stack own expected configuration. A direct stack
      update is not itself an unmanaged resource change.
    trap: true
    facts:
      - direct-stack-update
  - id: cloudformation-140
    q: A CloudFormation stack drift detection operation fails to inspect an EC2 instance because of
      permissions. What access must the caller have?
    a: Grant the CloudFormation drift detection and type configuration permissions and resource read
      access such as ec2:DescribeInstances.
    facts:
      - drift-permissions
  - id: cloudformation-141
    q: Does an IN_SYNC CloudFormation drift result prove that Lambda source code and KMSKeyId properties
      match the template?
    a: No. CloudFormation does not compare Lambda source code or KMSKeyId properties during drift detection.
    trap: true
    facts:
      - drift-kms-code
  - id: cloudformation-142
    q: A CloudFormation stack contains no resources that support drift detection. Can its stack drift
      status still be IN_SYNC?
    a: Yes. IN_SYNC does not prove that unsupported resources were checked.
    trap: true
    facts:
      - drift-empty-support
  - id: cloudformation-143
    q: A CloudFormation security group has ingress resources in another stack. Why might drift detection
      report an inaccurate difference?
    a: CloudFormation cannot analyze resource attachments across stacks during the comparison.
    facts:
      - drift-attachments
  - id: cloudformation-144
    q: An automation calls CloudFormation DetectStackDrift. How does it wait for results and retrieve
      resource differences?
    a: Use the returned operation ID with DescribeStackDriftDetectionStatus, then call
      DescribeStackResourceDrifts.
    facts:
      - drift-async
  - id: cloudformation-145
    q: A CloudFormation drift-aware change set fails during deployment after an emergency manual change.
      Which state does rollback restore?
    a: The actual pre-deployment state, preserving out-of-band changes made since the last deployment.
    facts:
      - drift-rollback
  - id: cloudformation-146
    q: A CloudFormation drift-aware change set encounters an unchanged AWS-managed scaling property and
      an external tag not in the template. Are they reverted?
    a: No. Unchanged AWS-managed properties and tag keys absent from the template are preserved.
    facts:
      - drift-managed
  - id: cloudformation-147
    q: An IAM policy in one CloudFormation stack attaches to a role in another. What risk does a
      drift-aware change set pose for that attachment?
    a: It can detect the cross-stack attachment as drift and revert it.
    facts:
      - drift-aware-attachments
  - id: cloudformation-148
    q: An AWS Config CloudFormation drift detection rule times out while evaluating many stacks. How can
      the team reduce the work per evaluation?
    a: Split stacks into tagged groups and create separately scoped rule instances. The rule has a
      15-minute execution limit.
    facts:
      - config-timeout
  - id: cloudformation-149
    q: "An AWS Config remediation action must update a CloudFormation stack with an approved template stored in S3. Which Systems Manager Automation runbook does that?"
    a: "AWS-UpdateCloudFormationStack. It updates the stack named by StackNameOrId with the template at TemplateUrl. To reconcile drifted properties themselves, use a drift-aware change set."
    facts:
      - update-stack-runbook
      - drift-aware
  - id: cloudformation-152
    q: The Config rule cloudformation-stack-drift-detection-check times out in an account with hundreds of stacks. What fixes it?
    a: Scope the rule to fewer stacks with tags; it runs DetectStackDrift on every stack within a 15-minute limit.
    facts: [config-rule-timeout]
  - id: cloudformation-153
    q: A stack's drift result shows NOT_CHECKED for some resources. Why?
    a: Their resource types don't support drift detection.
    facts: [not-checked]
diagrams:
  - id: cfn-drift-import
    title: Adopt an existing resource without replacement
    width: 840
    height: 210
    nodes:
      - id: retain
        label: Retain resource
        icon: res-cloudformation-template
        info: "Set DeletionPolicy: Retain before removing the resource definition."
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: remove
        label: Remove from stack
        icon: res-cloudformation-stack
        info: Update the stack without the retained resource definition.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: import
        label: Import resource
        icon: res-cloudformation-stack
        info: Import the same physical resource using its actual configuration; the type must support
          import.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: retain
        to: remove
        step: 1
      - from: remove
        to: import
        step: 2
    steps:
      - Retain and remove the resource from stack management without deleting it.
      - Import the existing resource using a template matching its live state.
---
Drift is the difference between a resource's live configuration and its expected CloudFormation configuration. Drift detection finds those differences; remediation changes the resource or adopts the live settings in the template.

### How it works

1. Run stack drift detection. CloudFormation reads supported resources and compares explicitly configured properties with expected template and parameter values.
2. Inspect resource results and the overall stack status. Run separate checks for nested stacks. For a StackSet, run StackSet drift detection to aggregate member-stack results, including parameter overrides.
3. Restore the intended configuration or update the template to accept the live state. A drift-aware change set with `REVERT_DRIFT` previews actual, previous, and desired states before reconciling supported properties.
4. If accepting a live setting would require replacement, use the import path for an import-supported resource: set `DeletionPolicy: Retain`, remove the resource in a stack update, then import it using a definition matching its actual state.

The caller needs `cloudformation:DetectStackDrift`, `cloudformation:DetectStackResourceDrift`,
`cloudformation:BatchDescribeTypeConfigurations`, and resource read permissions such as
`ec2:DescribeInstances`. `DetectStackDrift` returns an operation ID; monitor it with
`DescribeStackDriftDetectionStatus` and retrieve differences with `DescribeStackResourceDrifts`.

| Result applies to | Status | Meaning |
|---|---|---|
| Resource | `IN_SYNC` | Checked configuration matches |
| Resource | `MODIFIED` | Checked configuration differs |
| Resource | `DELETED` | Resource no longer exists |
| Resource or stack | `NOT_CHECKED` | No applicable drift check result |
| Stack | `DRIFTED` | At least one resource differs |
| Stack | `IN_SYNC` | Supported checked resources match |

### Exam cues

- If the question says recurring compliance checks must find drift, think Config rule `cloudformation-stack-drift-detection-check`, because it runs detection on configuration changes and periodically.
- If the question says route a drift result to automation, think EventBridge matching `CloudFormation Drift Detection Status Change`, because the event contains `detail.stack-drift-status`.
- If the question says preserve an accepted live change that would otherwise replace a resource, think retain, remove, and import, because import can adopt the existing resource.
- If security group attachments are in another stack, interpret drift results carefully because CloudFormation cannot analyze cross-stack attachments.
- If an AWS Config drift rule times out, split stacks into tagged groups and scope separate rule instances.
- If executing a drift-aware change set, review cross-stack attachments: it can revert them. It preserves unchanged AWS-managed properties and external tag keys absent from the template.
- If the question says a Config remediation should redeploy a stack from a template in S3, think the AWS-UpdateCloudFormationStack runbook, because it updates the stack from that template URL.

### Remember

- Unspecified defaults and unreadable properties such as passwords are outside detection coverage.
- `KMSKeyId` properties and Lambda source code are not checked. A stack with no supported resources can still report `IN_SYNC`.
- Event source: `aws.cloudformation`. A `drifted-stack-resource-count` of -1 means detection is still running.
- Drift-aware change sets cannot reconcile immutable properties, which are properties requiring replacement. Unsupported types and write-only values use previous deployment values for comparison.
- A failed drift-aware deployment rolls back to actual pre-deployment state.

> **Trap:** A StackSet member updated directly through CloudFormation can differ from the StackSet template without being drifted. Detection uses that member stack's own expected template and parameters.
