---
title: Access Analyzer
level: associate
order: 110
facts:
  - id: analyzer-purpose
    text: IAM Access Analyzer evaluates access policies and provides external, internal and unused access analysis.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer
  - id: internal-analysis
    text: Internal access analysis identifies principals inside the account or organization that can access
      selected supported resources.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-internal-access-analysis
  - id: unused-analysis
    text: Unused access findings identify unused roles, user access keys, passwords, services and actions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-unused-access-analysis
  - id: policy-validation
    text: Policy validation checks grammar and AWS best practices and returns errors, security warnings, warnings
      and suggestions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html#access-analyzer-policy-validation
  - id: custom-policy-checks
    text: Custom policy checks can compare with a reference policy for new access, check specified actions or
      resources, or check for public access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-checks-validating-policies.html#access-analyzer-custom-policy-checks-overview
  - id: policy-generation
    text: Policy generation creates a policy template from a user or role CloudTrail activity, which the author
      reviews and customizes.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-howitworks
  - id: generation-window
    text: Policy generation can analyze a specified period of up to ninety days of CloudTrail events.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-howitworks
  - id: generation-trail
    text: Policy generation requires a CloudTrail trail and a service role that permits access to its logs and
      required access information.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-howitworks
  - id: generation-data-gap
    text: Policy generation does not identify action-level activity for data events such as S3 object data events.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-know
  - id: generation-passrole-gap
    text: Generated policies omit iam:PassRole because it is not a CloudTrail API action.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-know
  - id: external-finding-not-use
    text: External findings describe policy-granted access; they do not prove a principal actually exercised that
      access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
cards:
  - id: iam-022
    q: Which IAM Access Analyzer capabilities help review and reduce permissions?
    a: External, internal and unused access analysis; policy validation; custom policy checks; and policy
      generation from CloudTrail activity.
    facts:
      - analyzer-purpose
      - policy-validation
      - custom-policy-checks
      - policy-generation
  - id: iam-062
    q: A team wants a narrower IAM policy based on observed application activity. How should it use Access
      Analyzer?
    a: Generate a template from a CloudTrail trail over up to ninety days, then review and customize it. Add
      required permissions that the activity or generation support does not capture.
    facts:
      - policy-generation
      - generation-window
      - generation-trail
      - generation-data-gap
      - generation-passrole-gap
---

IAM Access Analyzer helps identify who can access resources, which access is unused, and how a policy changes permissions. Its findings guide a permission review; external findings describe what policy permits, not proof that anyone used that permission.

### How it works

1. Choose the analysis scope. A zone of trust is the account or organization considered trusted for external analysis. Findings describe supported resources shared outside that zone.
2. Choose external, internal or unused analysis based on the question below.
3. During policy authoring, run validation for grammar and AWS best practices.
4. To reduce an existing user or role policy, select a CloudTrail trail and an analysis window. Provide a service role for log access, generate a template, then review its resources, conditions and missing permissions before attaching it.

| Analysis | Question answered |
|---|---|
| External | Which supported resources are shared outside the trusted account or organization? |
| Internal | Which internal principals can access selected supported resources? |
| Unused | Which roles, credentials, services or actions have unused access? |

### Exam cues

- If the question says find resources shared outside an organization, think external analyzer with an organization zone of trust, because its findings describe external policy grants.
- If the question says build a narrower policy from application activity, think policy generation from CloudTrail, because the template uses observed services and actions.

### Remember

- Policy generation can review up to ninety days of events.
- Generation needs a trail and a service role with log access.

> **Trap:** A generated policy is a template to review. Missing actions can reflect generation limits or an unobserved operation.
