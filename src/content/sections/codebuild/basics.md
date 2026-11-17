---
title: "CodeBuild basics"
level: foundational
order: 5
facts:
  - id: build
    text: "AWS CodeBuild is a fully managed build service that compiles source code, runs unit tests and produces deployable artifacts, with no build servers to manage."
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html#welcome
cards:
  - id: codebuild-062
    q: "A team wants to compile code and run unit tests on each commit without managing build servers. Which service fits?"
    a: "AWS CodeBuild."
    facts: [build]
---
AWS CodeBuild compiles and tests code on demand. [What is AWS CodeBuild?](https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html#welcome)

### How it works

1. A build starts from source code.
2. CodeBuild runs the build and test commands.
3. It produces artifacts ready to deploy.

### Exam cues

- If the question says compile and test code without build servers, think CodeBuild.

### Remember

- Fully managed builds.

> **Trap:** CodeBuild builds; CodePipeline orchestrates the whole release.
