---
title: "CodePipeline basics"
level: foundational
order: 5
facts:
  - id: release
    text: "AWS CodePipeline is a continuous delivery service that models, visualizes and automates the stages of a software release."
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html#welcome
cards:
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

- If the question says automate the release process (CI/CD), think CodePipeline.

### Remember

- Continuous delivery service.

> **Trap:** CodePipeline orchestrates; the build itself runs in a service such as CodeBuild.
