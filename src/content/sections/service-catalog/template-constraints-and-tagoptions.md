---
title: Template constraints and TagOptions
level: associate
order: 30
facts:
  - id: template-rules
    text: A template constraint narrows CloudFormation parameter values for a product in a portfolio.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_constraints_template-constraints.html#catalogs_constraints_template-constraints
  - id: template-scope
    text: Template constraints apply immediately to subsequent launches of every version in that portfolio, not the same product in another portfolio.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_constraints_template-constraints.html#catalogs_constraints_template-constraints
  - id: template-support
    text: Template constraints do not support Terraform Open Source or Terraform Cloud products.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_constraints_template-constraints.html#catalogs_constraints_template-constraints
  - id: assertions
    text: A rule has required Assertions and an optional RuleCondition; without a condition its assertions always apply.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/reference-template_constraint_rules.html#reference-template_constraint_rules
  - id: transform
    text: If a template contains Transform, the Service Catalog console skips Rules evaluation; CloudFormation evaluates the rules after the transform and invalid parameters fail the stack operation.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/reference-template_constraint_rules.html#reference-template_constraint_rules
  - id: tagoption
    text: A TagOption is a managed key-value template for an AWS tag, associated with a product or portfolio.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions.html#tagoptions
  - id: tag-support
    text: TagOptions do not support Terraform Open Source or Terraform Cloud products.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions.html#tagoptions
  - id: tag-values
    text: At launch Service Catalog gathers product and portfolio TagOptions and applies the selected value for each key as a tag.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions-launching.html#tagoptions-launching
  - id: intersection
    text: For the same key on both portfolio and product, available TagOption values are their intersection.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions-launching.html#tagoptions-ex3
  - id: tag-conflict
    text: If the intersection is empty, Service Catalog uses a conflict-marker tag value so an administrator can find and correct the conflict.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions-launching.html#tagoptions-ex4
  - id: tag-policy
    text: Organizations tag policies define tag key and value rules; enforcement must be selected to block noncompliant operations on specified resource types.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoption-policies.html#tag-policies
  - id: policy-conflict
    text: A launch with noncompliant TagOptions or custom tags can fail when Organizations tag policy enforcement applies.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoption-policies.html#conflicts
  - id: later-tags
    text: A tag update constraint controls whether new product or portfolio tags reach resources during a provisioned product update.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-resourceupdate.html#constraints-resourceupdate
  - id: transform-definition
    text: The CloudFormation Transform section specifies processing macros that modify template content.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html#transform-section-structure
cards:
  - id: service-catalog-006
    q: How can an AWS Service Catalog administrator restrict EC2 instance-type parameters without editing a product template for each team?
    a: Apply a template constraint to the product in each team's portfolio. It covers all versions for subsequent launches and does not support Terraform Open Source or Terraform Cloud products.
    facts:
      - template-rules
      - template-scope
      - template-support
  - id: service-catalog-022
    q: An AWS Service Catalog administrator needs restricted parameter choices and approved Environment and CostCenter tag values. What should they configure?
    a: Template constraints for parameters and TagOptions for tag choices on the product or portfolio. Align tags with any enforced Organizations tag policy. Use a tag update constraint for later resource tag changes.
    trap: true
    facts:
      - template-rules
      - tagoption
      - tag-values
      - policy-conflict
      - later-tags
  - id: service-catalog-029
    q: AWS Service Catalog portfolio TagOptions allow Environment=dev or test, while its product allows Environment=test or prod. What can users choose?
    a: Only test. Values for the same key are intersected across product and portfolio.
    facts:
      - intersection
  - id: service-catalog-030
    q: An AWS Service Catalog template contains Transform and invalid Rules parameters pass the console check. Will provisioning necessarily succeed?
    a: No. CloudFormation evaluates the rules after applying the transform and fails the stack operation for invalid values.
    trap: true
    facts:
      - transform
  - id: service-catalog-031
    q: What makes an AWS Service Catalog template constraint rule conditional?
    a: An optional RuleCondition. Assertions are required; without a condition they always apply.
    facts:
      - assertions
---
Template constraints restrict the input parameters a user can choose for a CloudFormation product. TagOptions provide approved key-value choices that become tags at launch. Parameters configure resources; tags label them.

### How it works

1. Apply a template constraint to the product in a portfolio. Its rules narrow values already exposed as template parameters.
2. Define required Assertions, the checks that must pass. Add an optional RuleCondition to decide when the checks apply; without it they always apply.
3. Associate TagOptions with the portfolio, product, or both. Service Catalog collects them at launch and turns selected values into tags.
4. If both levels define the same tag key, Service Catalog offers values allowed at both levels. An empty intersection produces a conflict-marker tag for administrator correction.
5. A Transform section requests template processing before deployment. If present, the catalog console skips Rules evaluation; CloudFormation evaluates those rules after processing the transform.
6. Align TagOptions and optional user tags with enforced Organizations tag policies, which define tag spelling and allowed values across accounts.

### Exam cues

- If the question says restrict instance sizes differently for each team, think template constraints in each portfolio, because they narrow launch parameters across product versions.
- If the question says approved cost allocation labels, think TagOptions, because selected values become tags on the provisioned product.
- If the question says invalid parameters pass the catalog console for a transformed template, think CloudFormation Rules evaluation after Transform, because the console skips that evaluation.

### Remember

| Requirement | Feature |
|---|---|
| Restrict CloudFormation input values | Template constraint |
| Offer approved tag keys and values | TagOptions |
| Define tagging rules across accounts | Organizations tag policy |
| Allow later resource tag changes | Tag update constraint |

- Template constraints cover subsequent launches of all versions in that portfolio.
- Template constraints and TagOptions do not support Terraform Open Source or Terraform Cloud products.
- A tag policy blocks noncompliant operations only where enforcement applies.

> **Trap:** TagOption values on a product and its portfolio use an intersection, not a union. Disjoint values produce a conflict marker; an enforced tag policy can also reject noncompliant tags.
