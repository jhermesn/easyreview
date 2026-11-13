---
title: Access Analyzer
level: associate
order: 110
facts:
  - id: analyzer-purpose
    text: IAM Access Analyzer evaluates access policies and provides external, internal and unused access analysis.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer
  - id: external-zone
    text: An external analyzer uses an account or organization as its zone of trust and reports supported
      resources shared outside it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
  - id: external-region
    text: External access analysis covers resources in the analyzer Region; create analyzers in each Region with
      supported resources.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
  - id: internal-analysis
    text: Internal access analysis identifies principals inside the account or organization that can access
      selected supported resources.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-internal-access-analysis
  - id: unused-analysis
    text: Unused access findings identify unused roles, user access keys, passwords, services and actions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-unused-access-analysis
  - id: unused-region
    text: Unused access findings do not depend on Region, so an analyzer is not needed in every Region.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
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
  - id: iam-026
    q: A security team wants to find supported AWS resources shared outside its account or organization. What
      should it configure?
    a: IAM Access Analyzer external access analyzers, using that account or organization as the zone of trust, in
      each Region with supported resources.
    facts:
      - external-zone
      - external-region
  - id: iam-061
    q: A CI pipeline must reject an IAM policy that adds access beyond an approved baseline. Which Access Analyzer
      capability fits?
    a: A custom policy check against a reference policy. Grammar validation alone does not compare permission
      scope with your baseline.
    facts:
      - custom-policy-checks
      - policy-validation
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
  - id: iam-063
    q: Should an IAM unused access analyzer be created in every AWS Region like an external access analyzer?
    a: No. Unused access findings do not vary by Region; external analysis is Regional.
    trap: true
    facts:
      - unused-region
      - external-region
  - id: iam-064
    q: An IAM policy generated from CloudTrail omits iam:PassRole and S3 data-event actions. Does that prove the
      application does not need them?
    a: No. Policy generation does not include PassRole or identify action-level data-event activity. Review and
      customize the template.
    trap: true
    facts:
      - generation-passrole-gap
      - generation-data-gap
      - policy-generation
---

IAM Access Analyzer helps identify who can access resources, which access is unused, and how a policy changes permissions. Its findings guide a permission review; external findings describe what policy permits, not proof that anyone used that permission.

### How it works

1. Choose the analysis scope. A zone of trust is the account or organization considered trusted for external analysis. Findings describe supported resources shared outside that zone.
2. Choose external, internal or unused analysis based on the question below. Create external analyzers in every Region containing supported resources; unused findings do not vary by Region.
3. During policy authoring, run validation for grammar and AWS best practices. Use custom checks to compare against a reference policy, test access to specified actions or resources, or check for public access.
4. To reduce an existing user or role policy, select a CloudTrail trail and an analysis window. Provide a service role for log access, generate a template, then review its resources, conditions and missing permissions before attaching it.

| Analysis | Question answered |
|---|---|
| External | Which supported resources are shared outside the trusted account or organization? |
| Internal | Which internal principals can access selected supported resources? |
| Unused | Which roles, credentials, services or actions have unused access? |

### Exam cues

- If the question says find resources shared outside an organization, think external analyzer with an organization zone of trust, because its findings describe external policy grants.
- If the question says CI must reject access beyond a baseline, think custom policy check against a reference, because syntax checks alone do not compare permission scope.
- If the question says build a narrower policy from application activity, think policy generation from CloudTrail, because the template uses observed services and actions.

### Remember

- Policy generation can review up to ninety days of events.
- Generation needs a trail and a service role with log access.
- Generated policies omit `iam:PassRole` and do not identify action-level permissions for data events such as S3 object operations.

> **Trap:** A generated policy is a template to review. Missing actions can reflect generation limits or an unobserved operation.
