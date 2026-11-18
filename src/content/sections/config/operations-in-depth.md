---
title: Remediation controls and rule operations
level: professional
order: 60
facts:
  - id: stale-snapshot
    text: Automatic remediation uses periodically captured compliance snapshots and can run on resources
      that became compliant after the snapshot.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: remediation-diagnostics
    text: DescribeRemediationExecutionStatus and its CLI equivalent
      describe-remediation-execution-status report execution states, step timestamps, and failure
      messages.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: resource-parameter
    text: A remediation parameter can use a static value or dynamically receive the noncompliant
      resource ID.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: automation-permissions
    text: Automation failures can result from insufficient action permissions, a missing Systems Manager
      trust relationship, or missing iam:PassRole permission for the caller starting Automation.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-troubleshooting.html
  - id: concurrency-control
    text: ConcurrentExecutionRatePercentage limits the percentage of noncompliant resources remediated
      in parallel and defaults to 10 percent.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_SsmControls.html#config-Type-SsmControls-ConcurrentExecutionRatePercentage
  - id: error-control
    text: ErrorPercentage controls the error percentage allowed before Systems Manager stops running
      automations for the rule and defaults to 50 percent.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_SsmControls.html#config-Type-SsmControls-ErrorPercentage
  - id: retry-attempts
    text: MaximumAutomaticAttempts is the maximum failed automatic-remediation attempts, defaults to 5,
      and accepts 1 through 25.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_RemediationConfiguration.html#config-Type-RemediationConfiguration-MaximumAutomaticAttempts
  - id: retry-window
    text: RetryAttemptSeconds is the time window for counting attempts before adding a remediation
      exception and defaults to 60 seconds.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_RemediationConfiguration.html#config-Type-RemediationConfiguration-RetryAttemptSeconds
  - id: s3-public-runbook
    text: AWS-DisableS3BucketPublicReadWrite uses S3 Block Public Access and takes the target bucket in
      S3BucketName.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-disables3bucketpublicreadwrite.html
  - id: automatic-role
    text: Automatic Config remediation requires a value for AutomationAssumeRole.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationConfigurations.html
  - id: pack-remediation
    text: Add remediation for a service-linked pack rule to the conformance pack template and update the
      pack.
    source: https://docs.aws.amazon.com/config/latest/developerguide/service-linked-awsconfig-rules.html#service-linked-awsconfig-rules
  - id: exception-blocks
    text: A remediation exception excludes a resource from automatic remediation until the exception is
      cleared.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationExceptions.html
  - id: proactive-api
    text: After enabling PROACTIVE evaluation on a supporting rule, call StartResourceEvaluation with
      resource properties and use its ResourceEvaluationId with GetResourceEvaluationSummary to
      retrieve the result.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_turn-on-proactive-rules.html#evaluate-config_turn-on-proactive-rules
  - id: proactive-support
    text: Only supporting resource types and managed rules can be used for proactive evaluation.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_turn-on-proactive-rules.html#evaluate-config_turn-on-proactive-rules
  - id: proactive-no-enforcement
    text: Proactive rules neither prevent deployment nor remediate resources flagged as NON_COMPLIANT.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-proactive-detective
  - id: rotation-check
    text: The periodic cmk-backing-key-rotation-enabled rule checks whether automatic KMS key rotation
      is enabled and has no input parameters.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html#cmk-backing-key-rotation-enabled
  - id: tag-check
    text: The configuration-change required-tags rule checks specified resource tags, supports up to six
      tags, and does not prevent resource creation.
    source: https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html#required-tags
  - id: tag-remediation
    text: AWS-SetRequiredTags does not work as remediation for required-tags; that rule requires a
      custom Systems Manager Automation document for remediation.
    source: https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html#required-tags
  - id: rule-results
    text: Rule results include COMPLIANT for passing, NON_COMPLIANT for failing, ERROR for invalid
      parameters, and NOT_APPLICABLE when rule logic does not apply.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config-how-rules-work
  - id: host-tenancy
    text: Launching an instance on a Dedicated Host uses Tenancy=host; dedicated is a distinct tenancy
      value.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/launching-dedicated-hosts-instances.html
  - id: tenancy-values
    text: ModifyInstancePlacement accepts default, dedicated, and host for its Tenancy parameter.
    source: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyInstancePlacement.html
cards:
  - id: config-010
    q: AWS Config automatic remediation starts for a resource that is already compliant. Why can this
      happen?
    a: Its compliance snapshot can be stale. A resource corrected after the snapshot can still be
      selected for automatic remediation.
    trap: true
    facts:
      - stale-snapshot
  - id: config-011
    q: AWS Config remediation fails despite a valid runbook. Which execution details and permissions
      should an operator inspect?
    a: Use DescribeRemediationExecutionStatus for failed steps and errors. Check parameter values,
      Automation role action permissions and Systems Manager trust, and any PassRole error for the
      caller starting Automation.
    facts:
      - remediation-diagnostics
      - resource-parameter
      - automation-permissions
  - id: config-025
    q: Which AWS Config remediation controls limit simultaneous fixes and repeated failures?
    a: ConcurrentExecutionRatePercentage limits parallel remediation; ErrorPercentage controls when
      errors stop further automations. MaximumAutomaticAttempts and RetryAttemptSeconds control
      retries before an exception.
    facts:
      - concurrency-control
      - error-control
      - retry-attempts
      - retry-window
  - id: config-026
    q: An AWS Config rule flags unwanted public S3 bucket access. Which runbook and parameters can
      support automatic correction?
    a: AWS-DisableS3BucketPublicReadWrite uses S3 Block Public Access. Supply S3BucketName and
      AutomationAssumeRole for automatic Config remediation; pack rules require remediation in the
      pack template.
    facts:
      - s3-public-runbook
      - automatic-role
      - pack-remediation
  - id: config-040
    q: What are AWS Config automatic remediation's default failed-attempt count and retry window?
    a: MaximumAutomaticAttempts defaults to 5 and RetryAttemptSeconds to 60 seconds. Reaching the
      failure threshold within the window adds a remediation exception that blocks further automatic
      remediation.
    facts:
      - retry-attempts
      - retry-window
      - exception-blocks
  - id: config-041
    q: What are the AWS Config remediation defaults for concurrency and allowed errors?
    a: ConcurrentExecutionRatePercentage defaults to 10 percent; ErrorPercentage defaults to 50 percent.
    facts:
      - concurrency-control
      - error-control
  - id: config-042
    q: An AWS Config resource has a remediation exception after repeated failures. Will automatic
      remediation keep retrying it?
    a: No. The exception excludes it from automatic remediation until the exception is cleared.
    trap: true
    facts:
      - exception-blocks
  - id: config-024
    q: Which AWS Config API sequence lets a pipeline assess proposed resource properties before
      deployment?
    a: Enable proactive mode on a supporting rule, call StartResourceEvaluation, then retrieve
      GetResourceEvaluationSummary using the returned ResourceEvaluationId. The pipeline must
      enforce any rejection.
    trap: true
    facts:
      - proactive-api
      - proactive-support
      - proactive-no-enforcement
  - id: config-033
    q: Can the AWS Config cmk-backing-key-rotation-enabled rule enforce a chosen rotation age through a
      parameter?
    a: No. It checks whether automatic rotation is enabled, runs periodically, and has no input
      parameters.
    trap: true
    facts:
      - rotation-check
  - id: config-035
    q: A team uses AWS Config required-tags and wants to attach AWS-SetRequiredTags as remediation. Is
      that supported?
    a: No. Use a custom Systems Manager Automation document for this rule. required-tags checks up to
      six tags and does not prevent creation of incorrectly tagged resources.
    trap: true
    facts:
      - tag-check
      - tag-remediation
  - id: config-037
    q: What do COMPLIANT, NON_COMPLIANT, ERROR, and NOT_APPLICABLE mean for an AWS Config rule?
    a: Pass, fail, invalid rule parameters, and rule logic that does not apply to the resource,
      respectively.
    facts:
      - rule-results
  - id: config-047
    q: A custom AWS Config rule must require EC2 placement on Dedicated Hosts. Is placement tenancy
      dedicated sufficient?
    a: No. Check placement tenancy for host. dedicated and host are different EC2 tenancy values;
      launching on a Dedicated Host uses Tenancy=host.
    trap: true
    facts:
      - host-tenancy
      - tenancy-values
---
AWS Config operational controls help manage automatic remediation and interpret rule evaluations. Use them to limit remediation runs, investigate failures, and assess proposed resource properties before deployment.

### How it works

1. For automatic remediation, supply `AutomationAssumeRole`. A runbook parameter can hold a fixed value or receive the noncompliant resource ID dynamically. For a service-linked rule in a conformance pack, add remediation to the template and update the pack. See [automatic remediation](https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation), [role requirements](https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationConfigurations.html), and [service-linked rules](https://docs.aws.amazon.com/config/latest/developerguide/service-linked-awsconfig-rules.html#service-linked-awsconfig-rules).
2. Set the [execution controls](https://docs.aws.amazon.com/config/latest/APIReference/API_SsmControls.html#config-Type-SsmControls-ConcurrentExecutionRatePercentage): `ConcurrentExecutionRatePercentage` limits the share of noncompliant resources remediated in parallel, while [`ErrorPercentage`](https://docs.aws.amazon.com/config/latest/APIReference/API_SsmControls.html#config-Type-SsmControls-ErrorPercentage) sets the allowed error percentage before Systems Manager stops automations for the rule.
3. Set `MaximumAutomaticAttempts` and `RetryAttemptSeconds` to control failed attempts within a counting window. When the threshold is reached within that window, Config adds a remediation exception. The exception blocks automatic remediation for that resource until cleared. See [attempts](https://docs.aws.amazon.com/config/latest/APIReference/API_RemediationConfiguration.html#config-Type-RemediationConfiguration-MaximumAutomaticAttempts), the [retry window](https://docs.aws.amazon.com/config/latest/APIReference/API_RemediationConfiguration.html#config-Type-RemediationConfiguration-RetryAttemptSeconds), and [exceptions](https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationExceptions.html).
4. Investigate failed runs with [`DescribeRemediationExecutionStatus`](https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation) or `describe-remediation-execution-status`. Review execution states, step timestamps, failure messages, and parameter values. Check the Automation role's action permissions and Systems Manager trust relationship, plus `iam:PassRole` for the caller starting Automation. See [Automation troubleshooting](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-troubleshooting.html).
5. For proactive evaluation, enable `PROACTIVE` on a supporting rule, call [`StartResourceEvaluation`](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_turn-on-proactive-rules.html#evaluate-config_turn-on-proactive-rules) with resource properties, then pass the returned `ResourceEvaluationId` to `GetResourceEvaluationSummary`. Only supporting managed rules and resource types can be used. The pipeline must enforce any rejection because [proactive rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-proactive-detective) do not block deployment or remediate failures.

### Exam cues

- If the question says a compliant resource was remediated, think a stale compliance snapshot, because [automatic remediation](https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation) can use a snapshot captured before the resource became compliant.
- If the question says remediate public S3 bucket access, think [`AWS-DisableS3BucketPublicReadWrite`](https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-disables3bucketpublicreadwrite.html), because it uses S3 Block Public Access and takes the bucket in `S3BucketName`. Supply `AutomationAssumeRole` for automatic remediation.
- If the question says choose a rotation age in `cmk-backing-key-rotation-enabled`, think no parameter, because this [periodic rule](https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html#cmk-backing-key-rotation-enabled) checks whether automatic KMS key rotation is enabled and has no inputs.
- If the question says remediate `required-tags` with `AWS-SetRequiredTags`, think a custom Systems Manager Automation document, because [the managed document does not work with this rule](https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html#required-tags). The rule checks up to six tags and does not prevent resource creation.
- If the question says require EC2 Dedicated Hosts, think `Tenancy=host`, because [`dedicated` is a distinct value](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/launching-dedicated-hosts-instances.html). [`ModifyInstancePlacement`](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyInstancePlacement.html) accepts `default`, `dedicated`, and `host`.
- If the question asks for evaluation results, think [rule status](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config-how-rules-work): `COMPLIANT` means pass, `NON_COMPLIANT` means fail, `ERROR` means invalid parameters, and `NOT_APPLICABLE` means the rule logic does not apply.

### Remember

- `ConcurrentExecutionRatePercentage` defaults to 10 percent; `ErrorPercentage` defaults to 50 percent.
- `MaximumAutomaticAttempts` defaults to 5 and accepts 1 through 25. `RetryAttemptSeconds` defaults to 60 seconds.
- A remediation exception blocks automatic remediation until cleared.

> **Trap:** A proactive `NON_COMPLIANT` result does not stop deployment or fix the resource. A pipeline must enforce its own rejection decision.
