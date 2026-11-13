---
title: Lifecycle policies
level: associate
order: 30
facts:
  - id: lifecycle-cleanup
    text: ECR lifecycle rules automate image expiration in a private repository.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lifecycle-policy-howitworks
  - id: preview-first
    text: Lifecycle policy preview shows affected images before the policy is applied.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lifecycle-policy-howitworks
  - id: evaluate-together
    text: ECR evaluates all lifecycle rules together, then applies them by priority.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
  - id: rule-priority
    text: Lower rulePriority numbers have higher priority; priority values must be unique.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/lifecycle_policy_parameters.html#lp_rule_priority
  - id: single-action
    text: An image is expired or archived by zero or one lifecycle rules.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
  - id: tag-priority
    text: An image matching the tagging requirements of a higher-priority rule cannot be expired by a
      lower-priority rule.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
  - id: expiration-delay
    text: Images should expire within 24 hours after meeting lifecycle expiration criteria.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lifecycle-policy-howitworks
  - id: tag-selection
    text: tagStatus accepts tagged, untagged or any; tagged selects a tagPatternList or tagPrefixList,
      and untagged omits both lists.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/lifecycle_policy_parameters.html#lp_tag_status
  - id: any-last
    text: A tagStatus any rule must have the highest rulePriority value and run last.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/lifecycle_policy_parameters.html#lp_rule_priority
  - id: count-age
    text: imageCountMoreThan retains the configured image count; sinceImagePushed uses image age with
      countNumber and countUnit days.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/lifecycle_policy_parameters.html#lp_count_type
  - id: pattern-choice
    text: A lifecycle rule can specify tagPatternList or tagPrefixList, but not both; all specified tag
      filters must match.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
  - id: manifest-dependency
    text: An image referenced by a manifest list cannot expire until the manifest list is deleted or
      archived.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
  - id: manifest-list
    text: A manifest list references several images, commonly for different operating systems or
      processor architectures.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-multi-architecture-image.html#docker-push-multi-architecture-image
  - id: expire-action
    text: The expire lifecycle action deletes selected images.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/lifecycle_policy_parameters.html#lp_action
cards:
  - id: ecr-001
    q: Old build images are filling an ECR repository. Which managed feature should the team configure?
    a: An ECR lifecycle policy with image count or age rules and the expire action. Preview the rules
      before applying them. Expiration should occur within 24 hours after eligibility.
    facts:
      - lifecycle-cleanup
      - count-age
      - expire-action
      - preview-first
      - expiration-delay
  - id: ecr-006
    q: How does ECR resolve lifecycle policy rules with overlapping selections?
    a: Evaluate all rules together, then apply priorities with lower numbers first. An image receives at
      most one action. A higher-priority tag match prevents lower-priority rules from expiring it.
    facts:
      - evaluate-together
      - rule-priority
      - single-action
      - tag-priority
  - id: ecr-015
    q: An ECR lifecycle rule with tagStatus any has higher priority than specific release-tag rules. How
      should it be corrected?
    a: Give the any rule the largest rulePriority number so it runs last. Rule priority values must be
      unique.
    facts:
      - any-last
      - rule-priority
  - id: ecr-016
    q: An ECR image is old enough for expiration but is referenced by a multi-architecture manifest
      list. Why might it remain?
    a: The manifest list must be deleted or archived first. Referenced images cannot expire while that
      dependency remains.
    trap: true
    facts:
      - manifest-dependency
      - manifest-list
---
An ECR lifecycle policy removes images that meet retention rules, so a repository does not keep every build indefinitely. Expiration means deleting an image. A preview shows the affected images before the policy takes effect.

### How it works

1. Select tagged images, untagged images, or any images with `tagStatus`. For tagged images, choose either a wildcard pattern list or a prefix list. A wildcard matches variable text; a prefix is the beginning of a tag.
2. Choose count-based or age-based retention. `imageCountMoreThan` keeps the configured count. `sinceImagePushed` uses `countNumber` days of age and `countUnit: days`. Use `expire` for deletion.
3. Preview the rules. ECR evaluates every rule before applying priority, with smaller `rulePriority` values first. Each image receives at most one action.
4. Put an `any` rule last. An image matching a higher-priority rule's tag requirements is protected from lower-priority expiration even when multiple rules select it.
5. Apply the policy after reviewing the preview. Expiration should occur within 24 hours after eligibility. A manifest list, a reference to multiple platform-specific images, must be deleted or archived before its referenced images can expire.

### Exam cues

- If the question says retain only the required number of builds, think `imageCountMoreThan`, because it caps retained image count.
- If the question says delete images older than a retention period, think `sinceImagePushed`, because it uses image age.
- If the question says overlapping rules may delete release images, think preview and priority, because higher-priority tag matches constrain lower-priority expiration.

### Remember

- Smaller priority number means higher priority; values must be unique.
- `tagStatus: any` must have the largest priority number.
- Expiration should occur within 24 hours, rather than immediately.
- A rule uses `tagPatternList` or `tagPrefixList`, never both.

> **Trap:** One image can match several selections, but ECR takes at most one lifecycle action on it. Do not treat each rule as an independent deletion pass.
