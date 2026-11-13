---
title: Platform templates and end of support
level: associate
order: 10
facts:
  - id: purpose
    text: AWS Proton provided automated infrastructure provisioning and deployment for serverless and container-based applications using versioned templates.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#Welcome
  - id: environment-template
    text: A Proton environment template defines shared infrastructure used by multiple applications or resources.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#ag-admin
  - id: service-template
    text: A Proton service template defines the infrastructure needed to deploy and maintain an application or microservice in an environment.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#ag-admin
  - id: compatible-environments
    text: Administrators could specify which environment templates were compatible with a Proton service template.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#ag-admin
  - id: service-instance
    text: A Proton service instance instantiates a service template in a specific environment.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#ag-admin
  - id: service-pipeline
    text: A Proton service normally includes service instances and a pipeline.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#ag-admin
  - id: workflow
    text: A platform administrator registers templates and a developer selects a service template and source repository; Proton provisions the service and its pipeline.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#ag-workflow
  - id: versions
    text: Proton identified service instances using outdated template versions and allowed administrators to request upgrades.
    source: https://docs.aws.amazon.com/proton/latest/userguide/Welcome.html#Welcome
  - id: existing-infrastructure
    text: A customer managed environment template connects to existing provisioned infrastructure, which Proton does not manage.
    source: https://docs.aws.amazon.com/proton/latest/userguide/ag-templates.html#ag-templates
  - id: end-support
    text: AWS Proton support ended on October 7, 2026.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#proton-end-of-support
  - id: new-customers
    text: New customers could not sign up for Proton after October 7, 2025.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#proton-end-of-support
  - id: proton-inaccessible
    text: After support ended, the Proton console and Proton resources became inaccessible.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#faqs
  - id: migration-impact
    text: Deployed CloudFormation stacks and their resources remain intact after Proton support ends.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#important-migration-information
  - id: data-deletion
    text: Proton data was retained until October 7, 2026 and deleted after that date.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#faqs
  - id: git-sync
    text: AWS lists CloudFormation Git sync as an alternative for a Git-based workflow, with no Proton-style environments or advanced pipeline features.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#cloudformation-git-sync
  - id: pipeline-alternative
    text: AWS lists CodePipeline and CodeBuild as an alternative with more implementation work and less built-in developer self-service.
    source: https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html#codepipeline-and-codebuild
  - id: minor-version
    text: Proton minor template versions require a backward-compatible schema.
    source: https://docs.aws.amazon.com/proton/latest/userguide/ag-template-versions.html#ag-template-versions
  - id: minor-inputs
    text: A Proton minor version does not require the developer to supply new information when updating.
    source: https://docs.aws.amazon.com/proton/latest/userguide/ag-template-versions.html#ag-template-versions
  - id: minor-iac
    text: Proton did not check whether infrastructure code in a minor template version was backward compatible.
    source: https://docs.aws.amazon.com/proton/latest/userguide/ag-template-versions.html#ag-template-versions
  - id: major-version
    text: Proton major template versions can introduce incompatible changes that typically require new developer inputs.
    source: https://docs.aws.amazon.com/proton/latest/userguide/ag-template-versions.html#ag-template-versions
diagrams:
  - id: proton-template-workflow
    title: Proton template workflow
    width: 800
    height: 160
    nodes:
      - { id: templates, label: Templates, x: 25, y: 43, w: 135, h: 56, tone: neutral }
      - { id: proton, label: Proton, x: 235, y: 35, w: 135, h: 72, tone: devtools, icon: proton }
      - { id: pipeline, label: Pipeline, x: 445, y: 35, w: 135, h: 72, tone: devtools, icon: codepipeline }
      - { id: service, label: Service instance, x: 650, y: 43, w: 145, h: 56, tone: neutral }
    edges:
      - { from: templates, to: proton, step: 1 }
      - { from: proton, to: pipeline, step: 2 }
      - { from: pipeline, to: service, step: 3 }
    steps:
      - Administrators register environment and service templates.
      - A developer selects a service template and Proton provisions a pipeline.
      - The pipeline deploys code to a service instance in an environment.
cards:
  - id: proton-001
    q: What happened to AWS Proton after its end of support?
    a: Support ended October 7, 2026. Proton became inaccessible, but deployed CloudFormation stacks and their resources remained intact.
    trap: true
    facts: [end-support, proton-inaccessible, migration-impact]
  - id: proton-002
    q: Which former AWS service used platform-team templates to provision standardized application infrastructure and deployment pipelines?
    a: AWS Proton. It supported serverless and container-based applications and ended support in October 2026.
    trap: true
    facts: [purpose, end-support]
  - id: proton-003
    q: A platform team using AWS Proton needed shared infrastructure for multiple applications. Which template described it?
    a: An environment template.
    facts: [environment-template]
  - id: proton-004
    q: A developer using AWS Proton needed to deploy an application using a platform-approved definition. What did the developer select?
    a: A compatible service template and a source repository.
    facts: [service-template, workflow]
  - id: proton-005
    q: What was an AWS Proton service instance?
    a: An instance of a service template in a specific environment.
    facts: [service-instance]
  - id: proton-006
    q: A team replacing AWS Proton wants CloudFormation changes driven by a Git repository. Which AWS-documented alternative fits?
    a: CloudFormation Git sync, although it does not provide Proton-style environments or advanced pipeline features.
    facts: [git-sync]
  - id: proton-007
    q: Did AWS Proton manage existing infrastructure connected through a customer managed environment?
    a: No. It connected to the existing infrastructure without managing it.
    facts: [existing-infrastructure]
    trap: true
  - id: proton-008
    q: What happened to AWS Proton data after October 7, 2026?
    a: It was deleted after the retention date.
    facts: [data-deletion]
  - id: proton-009
    q: Could a minor AWS Proton template version guarantee that infrastructure code changes were backward compatible?
    a: No. Proton checked schema compatibility, not compatibility of the infrastructure code.
    facts: [minor-version, minor-iac]
    trap: true
---

AWS Proton was a platform service for deploying serverless and container applications from standardized infrastructure templates. Support ended on October 7, 2026, so the workflow below is historical.

### How it works

1. A platform administrator registered an environment template defining shared infrastructure, and a service template defining application infrastructure and compatible environments.
2. The team deployed an environment, a set of shared resources. A developer selected a service template and supplied a source code repository.
3. Proton provisioned a service and a deployment pipeline, an automated sequence for delivering changes. Each service instance represented the service template in a specific environment.
4. Proton identified instances using older template versions so an administrator could request an upgrade.

### Exam cues

- If the question says a platform team defines shared resources for several applications, think environment template, because it defines their common infrastructure.
- If the question says developers select a standardized application stack, think service template, because it defines the application infrastructure and compatible environments.
- If the question says replace Proton with a Git-driven CloudFormation workflow, think CloudFormation Git sync, because AWS lists it as an alternative, although it lacks Proton-style environments and advanced pipeline features.
- If the question says replace Proton with flexible delivery tooling, think CodePipeline and CodeBuild, because AWS lists them as an alternative that requires more implementation work.

### Remember

- New customer signup ended after October 7, 2025; support ended October 7, 2026.
- The Proton console and resources are inaccessible after support ended. Deployed CloudFormation stacks and their resources remain intact.
- Proton data was retained until October 7, 2026 and deleted after that date.
- A customer managed environment connected existing infrastructure without Proton managing it.
- Minor template versions could not require new developer inputs; major versions could. Proton checked the template's input schema, but schema compatibility did not guarantee compatible infrastructure code.

> **Trap:** End of Proton support did not delete deployed CloudFormation stacks. It ended access to Proton management and affected delivery pipelines.
