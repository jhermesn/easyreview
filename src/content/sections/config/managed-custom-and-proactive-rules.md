---
title: Managed, custom, and proactive rules
level: associate
order: 20
facts:
  - id: rule-purpose
    text: Config rules evaluate resource configuration settings against desired conditions and flag
      failures as noncompliant.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config-how-rules-work
  - id: managed-rule
    text: Managed rules are predefined customizable rules created by AWS Config.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-concepts.html#aws-config-managed-rules-type
  - id: custom-rule-types
    text: Custom rules use either Lambda functions for custom code or Guard policies for policy-as-code
      checks without developing a Lambda function.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html
  - id: lambda-results
    text: Config invokes a custom rule's Lambda function on configuration changes or periodically; the
      function sends results using PutEvaluations.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules_lambda-functions.html
  - id: guard-trigger
    text: Detective evaluations for custom Guard policy rules are initiated by configuration changes.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules_cfn-guard.html#config-custom-policy-rules-add
  - id: initial-evaluation
    text: After a rule is added, Config compares existing resources with its conditions before
      subsequent triggered evaluations.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-trigger
  - id: change-trigger
    text: Configuration-change evaluations follow a CI change notification for a resource matching the
      rule scope.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-trigger
  - id: rule-scope
    text: Rule scope can select resource types, a resource type with an ID, a tag key and value, or all
      recorded resource changes.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-trigger
  - id: periodic-trigger
    text: Periodic rules run at a selected frequency.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-trigger
  - id: hybrid-trigger
    text: Hybrid rules evaluate both on configuration changes and periodically.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-trigger
  - id: rule-results
    text: Rule results include COMPLIANT for passing, NON_COMPLIANT for failing, ERROR for invalid
      parameters, and NOT_APPLICABLE when rule logic does not apply.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config-how-rules-work
  - id: detective-mode
    text: Detective evaluation checks the configurations of already deployed resources.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-proactive-detective
  - id: proactive-mode
    text: Proactive evaluation checks proposed resource properties against proactive rules in the
      account and Region before deployment.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-proactive-detective
  - id: proactive-no-enforcement
    text: Proactive rules neither prevent deployment nor remediate resources flagged as NON_COMPLIANT.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-proactive-detective
  - id: proactive-api
    text: After enabling PROACTIVE evaluation on a supporting rule, call StartResourceEvaluation with
      resource properties and use its ResourceEvaluationId with GetResourceEvaluationSummary to
      retrieve the result.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_turn-on-proactive-rules.html#evaluate-config_turn-on-proactive-rules
  - id: proactive-support
    text: Only supporting resource types and managed rules can be used for proactive evaluation.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_turn-on-proactive-rules.html#evaluate-config_turn-on-proactive-rules
  - id: approved-ami
    text: The configuration-change rule approved-amis-by-id checks EC2 instances against the amiIds list
      and marks running instances with unlisted AMIs NON_COMPLIANT.
    source: https://docs.aws.amazon.com/config/latest/developerguide/approved-amis-by-id.html#approved-amis-by-id
  - id: encrypted-volume
    text: The configuration-change rule encrypted-volumes checks attached EBS volumes for encryption and
      optionally checks the KMS key specified by kmsId.
    source: https://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html#encrypted-volumes
  - id: rotation-check
    text: The periodic cmk-backing-key-rotation-enabled rule checks whether automatic KMS key rotation
      is enabled and has no input parameters.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cmk-backing-key-rotation-enabled.html#cmk-backing-key-rotation-enabled
  - id: trail-check
    text: The periodic cloudtrail-enabled rule reports NON_COMPLIANT if a CloudTrail trail is not
      enabled.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cloudtrail-enabled.html#cloudtrail-enabled
  - id: tag-check
    text: The configuration-change required-tags rule checks specified resource tags, supports up to six
      tags, and does not prevent resource creation.
    source: https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html#required-tags
  - id: tag-remediation
    text: AWS-SetRequiredTags does not work as remediation for required-tags; that rule requires a
      custom Systems Manager Automation document for remediation.
    source: https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html#required-tags
  - id: s3-public-read
    text: The s3-bucket-public-read-prohibited rule evaluates public read access using S3 Block Public Access settings, the bucket policy, and bucket ACL.
    source: https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-read-prohibited.html#s3-bucket-public-read-prohibited
  - id: s3-public-write
    text: The s3-bucket-public-write-prohibited rule evaluates public write access using S3 Block Public Access settings, the bucket policy, and bucket ACL.
    source: https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-write-prohibited.html#s3-bucket-public-write-prohibited
  - id: s3-public-bucket
    text: The AWS Config rule `s3-bucket-level-public-access-prohibited` flags public bucket-level settings unless the bucket is listed in excludedPublicBuckets.
    source: https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-level-public-access-prohibited.html#s3-bucket-level-public-access-prohibited
  - id: security-hub-integration
    text: The Config integration sends managed and custom rule evaluations through EventBridge as
      Security Hub CSPM findings after the integration is activated.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html
  - id: security-hub-exclusions
    text: The Config integration sends evaluations performed after Security Hub CSPM is enabled and
      excludes service-linked rules except those created and managed by Control Tower.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html
  - id: tag-definition
    text: A tag is a resource label consisting of a key and an optional value.
    source: https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html#required-tags
  - id: ami-definition
    text: An Amazon Machine Image provides the software needed to set up and boot an EC2 instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
  - id: tenancy-choices
    text: EC2 tenancy choices distinguish shared instances, Dedicated Instances, and Dedicated Hosts.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/conversion-tenancy.html
  - id: host-tenancy
    text: Launching an instance on a Dedicated Host uses Tenancy=host; dedicated is a distinct tenancy
      value.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/launching-dedicated-hosts-instances.html
  - id: tenancy-values
    text: ModifyInstancePlacement accepts default, dedicated, and host for its Tenancy parameter.
    source: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyInstancePlacement.html
  - id: dedicated-host-definition
    text: A Dedicated Host is a physical server with EC2 instance capacity dedicated to your use.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html
  - id: finding-definition
    text: Security Hub CSPM findings contain a security observation and identify the affected resource
      and current status.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html
diagrams:
  - id: config-proactive-flow
    title: Proactive evaluation supplies a result to a deployment gate
    width: 900
    height: 190
    nodes:
      - id: proposal
        label: Pipeline input
        sub: proposed properties
        icon: codepipeline
        x: 20
        y: 50
        w: 170
        h: 86
        tone: devtools
        info: The pipeline submits proposed resource properties for a supported resource type.
      - id: evaluation
        label: Config rules
        sub: proactive evaluation
        icon: config
        x: 350
        y: 50
        w: 180
        h: 86
        tone: mgmt
        info: StartResourceEvaluation starts the check. Config evaluates proactive rules in this account and
          Region.
      - id: gate
        label: Pipeline gate
        sub: decide from result
        icon: codepipeline
        x: 690
        y: 50
        w: 180
        h: 86
        tone: devtools
        info: The pipeline retrieves the summary and enforces its decision; Config does not prevent
          deployment.
    edges:
      - from: proposal
        to: evaluation
        step: 1
        label: submit
      - from: evaluation
        to: gate
        step: 2
        label: retrieve result
    steps:
      - Enable proactive evaluation on a supporting rule, then submit properties with
        StartResourceEvaluation.
      - Use the returned evaluation ID with GetResourceEvaluationSummary. To reject a failed check,
        the pipeline must enforce that decision.
cards:
  - id: config-003
    q: When does an AWS Config rule evaluate, and how can its configuration-change scope be restricted?
    a: Config evaluates when the rule is added, then on configuration changes, a periodic schedule, or
      both. Change-trigger scope can select resource types, a type and ID, a tag key and value, or
      all recorded changes.
    facts:
      - initial-evaluation
      - change-trigger
      - periodic-trigger
      - hybrid-trigger
      - rule-scope
  - id: config-005
    q: What are the implementation choices for AWS Config managed and custom rules?
    a: Managed rules are AWS-defined checks with configurable parameters. Custom rules use Lambda code
      that reports results with PutEvaluations, or a Guard policy without a custom Lambda function.
    facts:
      - managed-rule
      - custom-rule-types
      - lambda-results
  - id: config-006
    q: A team needs an AWS Config check expressed as comparisons of recorded properties without
      developing a Lambda function. Which custom rule type fits?
    a: A custom policy rule written in Guard. Detective Guard evaluations are triggered by configuration
      changes.
    facts:
      - custom-rule-types
      - guard-trigger
  - id: config-007
    q: How do detective and proactive AWS Config evaluations differ?
    a: Detective checks deployed resources. Proactive checks proposed properties before deployment, but
      does not block deployment or remediate failures.
    trap: true
    facts:
      - detective-mode
      - proactive-mode
      - proactive-no-enforcement
  - id: config-022
    q: A deployment pipeline uses AWS Config proactive evaluation and receives NON_COMPLIANT. What must
      stop deployment?
    a: A decision enforced by the pipeline. Config returns an evaluation result; proactive rules do not
      prevent deployment themselves.
    trap: true
    facts:
      - proactive-api
      - proactive-no-enforcement
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
  - id: config-031
    q: A team needs AWS Config to find running EC2 instances launched from images outside an approved
      AMI ID list. Which rule and parameter fit?
    a: Use approved-amis-by-id with amiIds. It evaluates configuration changes and marks running
      instances with unlisted AMIs NON_COMPLIANT.
    facts:
      - approved-ami
  - id: config-032
    q: A team needs AWS Config to find attached EBS volumes without encryption or using an unapproved
      KMS key. What should it use?
    a: Use encrypted-volumes and optionally set kmsId to the required key. Its scope is attached EBS
      volumes, and its trigger is configuration changes.
    facts:
      - encrypted-volume
  - id: config-033
    q: Can the AWS Config cmk-backing-key-rotation-enabled rule enforce a chosen rotation age through a
      parameter?
    a: No. It checks whether automatic rotation is enabled, runs periodically, and has no input
      parameters.
    trap: true
    facts:
      - rotation-check
  - id: config-034
    q: A team wants AWS Config to detect when no CloudTrail trail is enabled. Which managed rule fits,
      and does it run on every change?
    a: Use cloudtrail-enabled. It is periodic, so its evaluation is scheduled rather than triggered by
      every configuration change.
    facts:
      - trail-check
  - id: config-035
    q: A team uses AWS Config required-tags and wants to attach AWS-SetRequiredTags as remediation. Is
      that supported?
    a: No. Use a custom Systems Manager Automation document for this rule. required-tags checks up to
      six tags and does not prevent creation of incorrectly tagged resources.
    trap: true
    facts:
      - tag-check
      - tag-remediation
  - id: config-036
    q: A security team wants AWS Config managed and custom rule evaluations alongside Security Hub CSPM
      findings. Which integration is needed?
    a: Activate the AWS Config integration. It sends evaluations through EventBridge; only evaluations
      performed after Security Hub CSPM was enabled are sent. Service-linked rules are excluded
      except Control Tower rules.
    facts:
      - security-hub-integration
      - security-hub-exclusions
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
  - id: config-049
    q: Which AWS Config managed rules check S3 buckets for public read access, public write access, or public bucket-level settings with an exclusion list?
    a: Use s3-bucket-public-read-prohibited, s3-bucket-public-write-prohibited, and s3-bucket-level-public-access-prohibited, respectively. The first two check Block Public Access, bucket policy, and bucket ACL; the last accepts excludedPublicBuckets.
    facts: [s3-public-read, s3-public-write, s3-public-bucket]
---
An AWS Config **rule** compares resource settings with desired conditions and reports compliance, meaning whether the resource passes the check. Choose the rule's implementation separately from its trigger, which decides when to run, and its evaluation mode, which decides whether to assess deployed or proposed resources.

### How it works

1. Pick a managed rule and its parameters, or write a custom rule. **Guard** is a language for expressing configuration checks as policies. A custom Lambda rule runs your code and reports results with `PutEvaluations`.
2. Define the rule's **scope**, the resources whose changes initiate evaluations: resource types, a type and resource ID, a tag key and value, or all recorded changes. A **tag** is a key with an optional value used to label a resource.
3. Config evaluates existing resources when a rule is added. Later evaluations follow the rule's trigger. Detective custom Guard rules use configuration changes.

| Trigger | When evaluation runs |
|---|---|
| Configuration changes | After a CI change notification for a resource matching scope |
| Periodic | At the selected frequency |
| Hybrid | Both on changes and periodically |

4. Use **detective evaluation** for deployed resources. For **proactive evaluation**, enable `PROACTIVE` on a supporting rule, submit proposed properties with `StartResourceEvaluation`, then retrieve `GetResourceEvaluationSummary` using the returned `ResourceEvaluationId`. A pipeline must enforce its own rejection decision.
5. Read the result: `COMPLIANT` passes, `NON_COMPLIANT` fails, `ERROR` means invalid rule parameters, and `NOT_APPLICABLE` means the rule logic does not apply.
6. To see evaluations as Security Hub CSPM findings, activate the AWS Config integration. It sends managed and custom evaluations through EventBridge. A **finding** is a security or compliance report about a resource.

### Exam cues

- If the question says find running EC2 instances using unapproved images, think `approved-amis-by-id` with `amiIds`, because it compares their Amazon Machine Image (AMI) IDs with the approved list. An AMI supplies the software used to boot an instance.
- If the question says check encryption on attached EBS volumes, think `encrypted-volumes`, because it checks encryption and can require the KMS key in `kmsId`.
- If the question says check whether automatic KMS rotation is enabled, think `cmk-backing-key-rotation-enabled`, because this periodic rule checks enablement and has no rotation-age parameter.
- If the question says detect that no CloudTrail trail is enabled, think `cloudtrail-enabled`, because it checks that condition periodically. Evaluation alone does not configure a fix.
- If the question says require Dedicated Hosts, think a custom check for placement tenancy `host`, because `dedicated` is a different value. **Tenancy** selects shared instances, Dedicated Instances, or Dedicated Hosts; a Dedicated Host is a physical server allocated for your use.
- If the question says check recorded properties without writing a Lambda function, think a Guard custom policy rule, because the policy expresses the check.
- If the question says reject noncompliant proposed infrastructure before deployment, think proactive evaluation plus a pipeline decision, because Config supplies a result without blocking deployment.
- If the question says check S3 public read or write access, think `s3-bucket-public-read-prohibited` or `s3-bucket-public-write-prohibited`. Both consider Block Public Access, the bucket policy, and the bucket access control list (ACL). For public bucket-level settings with exclusions, think `s3-bucket-level-public-access-prohibited` and `excludedPublicBuckets`.

### Remember

- Trigger type and evaluation mode answer different questions: when to run and which resource state to assess.
- Proactive evaluation supports only supporting rules and resource types. It does not remediate or prevent deployment.
- `required-tags` checks up to six tags. It needs a custom remediation document; `AWS-SetRequiredTags` is incompatible with this rule.
- The Security Hub CSPM integration sends evaluations performed after Security Hub CSPM was enabled. Service-linked rules are excluded except rules created and managed by Control Tower.

> **Trap:** A rule reports noncompliance; a remediation action performs the fix. A proactive result is not a deployment block.

> **Trap:** `encrypted-volumes` checks attached volumes. Do not assume it checks every unattached volume.
