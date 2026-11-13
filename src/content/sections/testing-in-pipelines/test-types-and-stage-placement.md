---
title: Test types and stage placement
level: associate
order: 20
facts:
  - id: unit
    text: Unit tests check application code while simulating external dependencies.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-cicd-litmus/tests-for-cicd-pipelines.html
  - id: integration
    text: Integration tests check technical requirements against a provisioned test environment.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-cicd-litmus/tests-for-cicd-pipelines.html
  - id: acceptance
    text: Acceptance tests check user requirements against a provisioned test environment.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-cicd-litmus/tests-for-cicd-pipelines.html
  - id: sast
    text: Static application security testing analyzes source code for security problems.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-cicd-litmus/tests-for-cicd-pipelines.html
  - id: dast
    text: Dynamic application security testing looks for vulnerabilities in a running test environment.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-cicd-litmus/tests-for-cicd-pipelines.html
  - id: minimum
    text: AWS recommends unit tests and static security tests on code, plus integration and acceptance
      tests in a test environment.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-cicd-litmus/tests-for-cicd-pipelines.html
  - id: synthetic
    text: Synthetic tests continually generate traffic to check system health.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-cicd-litmus/tests-for-cicd-pipelines.html
  - id: vpc
    text: CodeBuild VPC configuration allows builds to access private resources, including databases and
      internal load balancers.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: vpc-internet
    text: Internet access from VPC-configured CodeBuild builds needs a NAT gateway or NAT instance, not
      just an internet gateway.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html
  - id: stage-lock
    text: In SUPERSEDED and QUEUED modes, a stage processes one execution at a time; related deployment
      and subsequent test actions in the same stage process that execution.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-executions
  - id: parallel
    text: PARALLEL executions run independently without stage queues; AWS recommends targets that other
      executions do not share.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-executions-parallel
  - id: order
    text: CodePipeline actions with lower runOrder values run first; actions with the same value run in
      parallel.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-requirements.html#action.runOrder
  - id: device
    text: A CodePipeline Device Farm test action runs tests against a configured device pool.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-DeviceFarm.html
  - id: virtual-network
    text: A VPC is a logically isolated virtual network for AWS resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
diagrams:
  - id: testing-stage-lock
    title: Deploy and test within one locked stage
    width: 1000
    height: 230
    groups:
      - label: "Test stage: QUEUED mode"
        x: 10
        y: 10
        w: 980
        h: 205
        tone: devtools
    nodes:
      - id: deploy
        label: CodeDeploy
        icon: codedeploy
        sub: deploy test environment
        x: 30
        y: 75
        w: 270
        h: 86
        tone: devtools
      - id: test
        label: CodeBuild
        icon: codebuild
        sub: higher runOrder
        x: 360
        y: 75
        w: 270
        h: 86
        tone: devtools
      - id: complete
        label: CodePipeline
        icon: codepipeline
        sub: stage completes
        x: 690
        y: 75
        w: 270
        h: 86
        tone: devtools
    edges:
      - from: deploy
        to: test
        step: 1
      - from: test
        to: complete
        step: 2
    steps:
      - Deployment completes before the test action starts.
      - Tests must succeed before the stage completes.
cards:
  - id: testing-in-pipelines-002
    q: Which tests should a CI/CD pipeline run against source code and which need a test environment?
    a: Run unit tests and static application security tests against code. Run integration, acceptance,
      and dynamic security tests against a provisioned test environment.
    facts:
      - unit
      - integration
      - acceptance
      - sast
      - dast
      - minimum
  - id: testing-in-pipelines-007
    q: A team has passing unit tests but needs to prove its application meets user requirements before
      production. Which tests should it add?
    a: Acceptance tests against a provisioned test environment. Unit tests simulate dependencies and do
      not establish user acceptance.
    facts:
      - unit
      - acceptance
  - id: testing-in-pipelines-009
    q: A CodePipeline in QUEUED mode deploys to a shared test environment. How can its test action
      inspect the change just deployed?
    a: Place deployment and testing in the same stage, with a higher runOrder for testing. The stage
      lock keeps another execution from entering during those actions.
    facts:
      - stage-lock
      - order
  - id: testing-in-pipelines-016
    q: A CodePipeline in PARALLEL mode uses one shared test environment. Does placing deploy and test
      actions in one stage prevent concurrent overwrites?
    a: No. PARALLEL executions are independent. Use separate targets or a locking execution mode for
      shared targets.
    facts:
      - parallel
      - stage-lock
    trap: true
  - id: testing-in-pipelines-017
    q: A CodeBuild integration test must connect to a private database. What project setting is needed?
    a: Configure VPC access for the build. Provide NAT connectivity if the build also needs the public
      internet.
    facts:
      - vpc
      - vpc-internet
  - id: testing-in-pipelines-018
    q: What is the difference between static and dynamic application security testing in a pipeline?
    a: Static testing inspects source code. Dynamic testing probes a running application in a test
      environment.
    facts:
      - sast
      - dast
---
Pipeline tests check different kinds of requirements before a change moves forward. A unit test isolates code by simulating outside dependencies; tests against a deployed environment check how the application behaves as a system.

### How it works

1. Run unit tests and static application security testing (SAST), which inspects source code for security problems.
2. Provision a test environment and run integration tests for technical requirements.
3. Run acceptance tests for user requirements. Dynamic application security testing (DAST) probes the running application for vulnerabilities.
4. For a shared environment in SUPERSEDED or QUEUED mode, put deployment and its tests in one stage. Give tests a higher `runOrder`, the value that orders actions within a stage.

| Check | What it checks | Where it runs |
|---|---|---|
| Unit | Code behavior with simulated dependencies | Application code |
| SAST | Security problems in source | Source code |
| Integration | Technical requirements | Provisioned test environment |
| Acceptance, including user interface behavior | User requirements | Provisioned test environment |
| DAST | Vulnerabilities in a running application | Provisioned test environment |
| Synthetic | Ongoing system health | Continuous generated traffic |

CodeBuild can access private databases through VPC configuration. A VPC is an isolated virtual network. Builds that need public internet access also need a NAT gateway or NAT instance as their outbound internet path. Device Farm has a pipeline test action for a configured pool of devices.

### Exam cues

- If the question says unit tests pass but services fail together, think integration tests, because they exercise technical requirements in an environment.
- If the question says a release must satisfy user requirements, think acceptance tests, because they test those requirements against the application.
- If the question says test the exact deployment on a shared target, think one deploy-and-test stage in a locking mode, because the stage holds one execution through both actions.

### Remember

- Lower `runOrder` runs first; equal values run in parallel.
- SUPERSEDED and QUEUED lock stages; PARALLEL executions run independently.
- An internet gateway alone does not give a VPC-configured CodeBuild build internet access.

> **Trap:** Putting deployment and tests in the same stage does not serialize PARALLEL executions against a shared environment.
