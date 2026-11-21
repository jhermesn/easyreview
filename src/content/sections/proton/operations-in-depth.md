---
title: Environment management and migration
level: professional
order: 20
facts:
  - id: environment-template
    text: A Proton environment template defines shared infrastructure used by multiple applications or resources.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#ag-admin
  - id: existing-infrastructure
    text: A customer managed environment template connects to existing provisioned infrastructure, which Proton does not manage.
    source: https://docs.aws.amazon.com/proton/latest/userguide/ag-templates.html#ag-templates
  - id: migration-impact
    text: Deployed CloudFormation stacks and their resources remain intact after Proton support ends.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#important-migration-information
  - id: end-support
    text: AWS Proton support ended on October 7, 2026.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#proton-end-of-support
  - id: proton-inaccessible
    text: After support ended, the Proton console and Proton resources became inaccessible.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#faqs
  - id: git-sync
    text: AWS lists CloudFormation Git sync as an alternative for a Git-based workflow, with no Proton-style environments or advanced pipeline features.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#cloudformation-git-sync
  - id: pipeline-alternative
    text: AWS lists CodePipeline and CodeBuild as an alternative with more implementation work and less built-in developer self-service.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#codepipeline-and-codebuild
cards:
  - id: proton-002
    q: "In a historical AWS Proton design, several applications needed shared infrastructure. Which template defined those common resources?"
    a: "An environment template."
    facts: [environment-template]
  - id: proton-003
    q: "Before AWS Proton support ended, a team wanted to deploy services onto existing infrastructure while retaining its management. Which environment option fit?"
    a: "A customer managed environment template. Proton connected to the existing infrastructure without managing it."
    facts: [existing-infrastructure]
  - id: proton-004
    q: "A team used AWS Proton to deploy infrastructure through CloudFormation. What happened to the deployed stacks when Proton support ended?"
    a: "The deployed CloudFormation stacks and their resources remain intact."
    facts: [migration-impact, end-support]
  - id: proton-005
    q: "Can a team continue using the AWS Proton console to automate infrastructure after support ended?"
    a: "No. The Proton console and Proton resources became inaccessible after support ended."
    trap: true
    facts: [end-support, proton-inaccessible]
  - id: proton-007
    q: "A team is considering CloudFormation Git sync as an AWS Proton alternative. Does it include Proton-style environments?"
    a: "No. CloudFormation Git sync supports a Git-based workflow but does not include Proton-style environments or advanced pipeline features."
    trap: true
    facts: [git-sync]
  - id: proton-008
    q: "A team wants infrastructure automation after AWS Proton support ended. What tradeoff comes with the CodePipeline and CodeBuild alternative?"
    a: "It requires more implementation work and has less built-in developer self-service."
    facts: [end-support, pipeline-alternative]
  - id: proton-009
    q: "A team wants to retain AWS Proton-style environments when moving to CloudFormation Git sync. Does Git sync provide them?"
    a: "No. AWS lists Git sync as a Git-based alternative, but it has no Proton-style environments."
    trap: true
    facts: [git-sync]
---
AWS Proton environment templates defined shared infrastructure for applications. After Proton support ended, teams needed an alternative for infrastructure automation, while deployed CloudFormation stacks and their resources remained intact.

### How it works

1. An environment template defined infrastructure shared by multiple applications or resources.
2. A customer managed environment template connected to existing provisioned infrastructure without Proton managing it.
3. After support ended, the Proton console and resources became inaccessible. Deployed CloudFormation stacks and their resources remained intact.
4. AWS lists CloudFormation Git sync and CodePipeline with CodeBuild as alternatives, with different tradeoffs.

### Exam cues

- If the question says multiple applications need shared infrastructure, think environment template, because it defined their common resources.
- If the question says retain management of existing infrastructure, think customer managed environment template, because Proton connected to that infrastructure without managing it.
- If the question says use a Git-based workflow, think CloudFormation Git sync, because AWS lists it as an alternative, though it lacks Proton-style environments and advanced pipeline features.
- If the question says use CodePipeline and CodeBuild as an alternative, think more implementation work and less built-in developer self-service, because those are the tradeoffs AWS lists.

### Remember

- Proton support ended on October 7, 2026.
- Deployed CloudFormation stacks and their resources remained intact after support ended.

> **Trap:** Intact CloudFormation stacks do not mean Proton is still accessible. The Proton console and resources became inaccessible after support ended. CloudFormation Git sync does not provide Proton-style environments.
