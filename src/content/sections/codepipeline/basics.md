---
title: "CodePipeline basics"
level: foundational
order: 5
facts:
  - id: cloudformation-deploy
    text: "A CodePipeline CloudFormation deploy action can create a stack or update an existing stack."
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: release
    text: "AWS CodePipeline models, visualizes and automates software release stages as a continuous delivery service."
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html#welcome
cards:
  - id: codepipeline-057
    q: "How can CodePipeline create or update a CloudFormation stack as part of a release?"
    a: "Use a CloudFormation deploy action with CREATE_UPDATE."
    facts: [cloudformation-deploy]
  - id: codepipeline-056
    q: "A team wants every code change to flow automatically through build, test and deploy stages. Which service fits?"
    a: "AWS CodePipeline."
    facts: [release]
---
AWS CodePipeline automates a release process as a series of stages.

### How it works

1. Define stages such as source, build, test and deploy.
2. A change triggers the pipeline.
3. Each stage runs in order.

### Exam cues

- If the question says a release must deploy infrastructure, think a CloudFormation deploy action in CodePipeline, because it can create or update a stack.
- If the question says automate the release process (CI/CD), think CodePipeline.

### Remember

- Continuous delivery service.

> **Trap:** CodePipeline orchestrates; the build itself runs in a service such as CodeBuild.
