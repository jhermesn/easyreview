---
title: Container delivery pipeline with blue/green on ECS
level: professional
order: 130
facts:
  - id: test-build
    text: CodeBuild can provide Build or Test actions that run buildspec commands in a build container.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-type
  - id: lambda-result
    text: A Lambda pipeline action must call PutJobSuccessResult or PutJobFailureResult with the job ID to report completion.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function-create-function
  - id: lambda-credentials
    text: The CodePipeline event passed to Lambda includes temporary artifact credentials and must not be logged in full.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
  - id: step-invoke
    text: StepFunctions is an Invoke action that starts a state machine, a workflow defined as states and transitions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions
  - id: docker-cache
    text: Local Docker layer cache reuses image layers and requires Linux and privileged mode.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: ca-cross-account
    text: A caller outside the domain-owner and repository-administrator accounts needs both an identity-policy Allow and a resource-policy Allow for cross-account access.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-policies.html#repo-policies
  - id: ca-token
    text: Package managers use a CodeArtifact authorization token obtained with AWS credentials to publish or consume packages.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
  - id: immutable-tags
    text: IMMUTABLE prevents overwriting image tags; a push using an existing immutable tag returns ImageTagAlreadyExistsException.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html#image-tag-mutability
  - id: enhanced-scan
    text: Enhanced scanning uses Amazon Inspector for operating system and programming language package vulnerabilities.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html#image-scanning-enhanced
  - id: inspector-scan
    text: InspectorScan is a managed compute CodePipeline action that scans source dependencies or container images for vulnerabilities.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan
  - id: scan-thresholds
    text: CriticalThreshold, HighThreshold, MediumThreshold, and LowThreshold are finding counts beyond which the scan action fails.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-InspectorScan.html#action-reference-InspectorScan-parameters
  - id: image-detail
    text: An ECR source produces an output artifact containing imageDetail.json with the image URI.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECR.html#action-reference-ECR-output
  - id: bluegreen-inputs
    text: CodeDeployToECS uses a task definition template, an AppSpec file, and imageDetail.json image input for dynamic image replacement.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECSbluegreen.html#action-reference-ECSbluegreen-config
  - id: image-definitions
    text: An ECS standard deploy action consumes imagedefinitions.json by default; the configured filename can be changed.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/file-reference.html#pipelines-create-image-definitions
  - id: task-sets
    text: Lambda deployments shift traffic between function versions, and ECS deployments shift traffic between original and replacement task sets.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-compute-platform
  - id: test-listener
    text: The optional ECS test listener reaches the replacement before production traffic shifts.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#ecs-allow-test-traffic
  - id: test-hook
    text: ECS AfterAllowTestTraffic runs after the test listener sends traffic to the replacement task set.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-ecs
  - id: termination
    text: After an ECS deployment, the original task set is terminated according to the configured wait.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-process-workflow-ecs
  - id: alarm-rollback
    text: Automatic rollback on alarm thresholds must be configured to redeploy the last known good revision when an attached alarm activates.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: circuit-breaker
    text: The ECS deployment circuit breaker detects rolling deployments that cannot reach a stable running state.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentCircuitBreaker.html
  - id: breaker-rollback
    text: With rollback enabled, the circuit breaker chooses the most recent COMPLETED deployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: eks-blue-green
    text: For blue/green in Kubernetes, create a new Deployment alongside the existing version, test its Pods, and change the Service selector to direct traffic to it.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_use_bluegreen_deployments
diagrams:
  - id: container-delivery-pipeline
    title: Build, scan and test an image, then shift ECS traffic to a green task set
    facts: [test-build, lambda-result, lambda-credentials, step-invoke, docker-cache, ca-cross-account, ca-token, immutable-tags, enhanced-scan, inspector-scan, scan-thresholds, image-detail, bluegreen-inputs, image-definitions, task-sets, test-listener, test-hook, termination, alarm-rollback, circuit-breaker, breaker-rollback, eks-blue-green]
    width: 1240
    height: 780
    groups:
      - { label: Region, x: 200, y: 20, w: 1020, h: 740, tone: neutral, icon: group-region }
      - { label: VPC, x: 820, y: 380, w: 390, h: 370, tone: neutral, icon: group-virtual-private-cloud-vpc }
    nodes:
      - { id: repo, label: Git repository, sub: source action, x: 240, y: 70, w: 160, h: 86, tone: devtools, icon: res-git-repository }
      - { id: pipe, label: CodePipeline, sub: release pipeline, x: 440, y: 70, w: 160, h: 86, tone: devtools, icon: codepipeline }
      - { id: build, label: CodeBuild, sub: docker build, x: 640, y: 70, w: 160, h: 86, tone: devtools, icon: codebuild, info: "Local Docker layer caching needs a Linux environment in privileged mode." }
      - { id: ecr, label: ECR, sub: immutable tags, x: 840, y: 70, w: 160, h: 86, tone: integration, icon: elastic-container-registry, info: "Enhanced scanning uses Inspector for OS and language packages." }
      - { id: scan, label: InspectorScan, sub: image scan action, x: 1040, y: 70, w: 150, h: 86, tone: security, icon: inspector, info: "Fails when findings exceed the critical, high, medium or low thresholds." }
      - { id: test, label: Lambda, sub: integration tests, x: 440, y: 240, w: 160, h: 86, tone: compute, icon: lambda, info: "Reports back with PutJobSuccessResult or PutJobFailureResult." }
      - { id: ca, label: CodeArtifact, sub: dependencies, x: 640, y: 240, w: 160, h: 86, tone: devtools, icon: codeartifact }
      - { id: cd, label: CodeDeploy, sub: ECS blue/green, x: 1040, y: 240, w: 150, h: 86, tone: devtools, icon: codedeploy, info: "CodeDeployToECS takes a task definition template, an AppSpec file and imageDetail.json." }
      - { id: hook, label: Lambda, sub: AfterAllowTestTraffic, x: 840, y: 240, w: 160, h: 86, tone: compute, icon: lambda }
      - { id: users, label: Clients, sub: HTTPS, x: 20, y: 430, w: 150, h: 86, tone: user, icon: res-users }
      - { id: alb, label: ALB, sub: prod and test listeners, x: 860, y: 430, w: 160, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer }
      - { id: alarm, label: CloudWatch alarm, sub: green errors, x: 1050, y: 430, w: 140, h: 86, tone: mgmt, icon: res-cloudwatch-alarm }
      - { id: blue, label: Blue task set, sub: original, x: 860, y: 620, w: 160, h: 86, tone: compute, icon: res-elastic-container-service-task }
      - { id: green, label: Green task set, sub: replacement, x: 1050, y: 620, w: 140, h: 86, tone: compute, icon: res-elastic-container-service-task }
    edges:
      - { from: repo, to: pipe, step: 1 }
      - { from: pipe, to: build, step: 1 }
      - { from: ca, to: build, step: 2 }
      - { from: build, to: ecr, step: 2 }
      - { from: ecr, to: scan, step: 3 }
      - { from: pipe, to: test, step: 4 }
      - { from: ecr, to: cd, step: 5 }
      - { from: cd, to: alb, step: 5 }
      - { from: hook, to: alb, step: 6 }
      - { from: users, to: alb, step: 7 }
      - { from: alb, to: blue, step: 7 }
      - { from: alb, to: green, step: 7 }
      - { from: green, to: alarm, step: 8 }
      - { from: alarm, to: cd, step: 9, dashed: true }
    steps:
      - "A commit starts the pipeline, and CodeBuild builds the container image."
      - "The build pulls dependencies from CodeArtifact with an authorization token and pushes the image to an ECR repository with immutable tags."
      - "An InspectorScan action scans the pushed image and fails the pipeline if findings exceed its thresholds."
      - "A test action invokes a Lambda function that runs integration tests and reports success or failure back to the pipeline."
      - "The CodeDeployToECS action reads imageDetail.json, registers a new task definition and creates the green task set behind the load balancer."
      - "The test listener sends traffic to the green task set, and the AfterAllowTestTraffic hook validates it before customers see it."
      - "CodeDeploy shifts production traffic from the blue task set to the green one, all at once, in a canary or linearly."
      - "A CloudWatch alarm watches the green task set's errors."
      - "If the alarm fires, CodeDeploy rolls traffic back to the blue task set, which stays running until the termination wait ends."
cards:
  - id: reference-architectures-162
    q: "Release images must never be overwritten after they are pushed, so a tag always points to the image that was tested. What fits?"
    a: "**Tag immutability** on the ECR repository. A push that reuses an existing tag fails with ImageTagAlreadyExistsException."
    facts: [immutable-tags]
  - id: reference-architectures-163
    q: "A pipeline must stop when a new container image has more than zero critical vulnerabilities, with no custom scanning code. What fits?"
    a: "A CodePipeline **InspectorScan** action in ECRImageScan mode with a **CriticalThreshold**; the action fails when findings exceed it."
    facts: [inspector-scan, scan-thresholds, enhanced-scan]
  - id: reference-architectures-164
    q: "A pipeline invokes a Lambda function to run integration tests, and the stage hangs until it times out. What is the function missing?"
    a: "It must report back with **PutJobSuccessResult** or **PutJobFailureResult** and the job ID. It should also never log the full event, which holds artifact credentials."
    trap: true
    facts: [lambda-result, lambda-credentials]
  - id: reference-architectures-165
    q: "Which input files does the CodePipeline CodeDeployToECS action need, compared with the standard ECS deploy action?"
    a: "CodeDeployToECS needs a **task definition template**, an **AppSpec** file and **imageDetail.json**. The standard ECS action reads **imagedefinitions.json**."
    trap: true
    facts: [bluegreen-inputs, image-detail, image-definitions]
  - id: reference-architectures-166
    q: "QA must test a new ECS version through the production load balancer before any customer traffic reaches it. What fits?"
    a: "CodeDeploy **blue/green** with a **test listener**; the **AfterAllowTestTraffic** hook validates the replacement task set before the production shift."
    facts: [task-sets, test-listener, test-hook]
  - id: reference-architectures-167
    q: "An ECS service uses rolling updates, not CodeDeploy. How can a deployment that never stabilizes roll back automatically?"
    a: "Turn on the **deployment circuit breaker** with rollback; it returns to the most recent COMPLETED deployment."
    facts: [circuit-breaker, breaker-rollback]
  - id: reference-architectures-168
    q: "How is a blue/green release done for a workload on Amazon EKS?"
    a: "Create a new Deployment next to the current one, test its Pods, then change the **Service selector** to send traffic to the new version."
    facts: [eks-blue-green]
---
Container delivery questions combine three repositories (code, packages, images) with a release that must be tested before customers see it and undo itself when it fails. The professional design runs one pipeline: build with dependencies from CodeArtifact, push an immutable image to ECR, scan it, test it, then let CodeDeploy shift ECS traffic from blue to green.

### How it works

1. CodeBuild pulls dependencies from CodeArtifact, builds the image and pushes it to ECR with immutable tags.
2. An InspectorScan action stops the pipeline when the image has too many findings.
3. A test action invokes Lambda, or CodeBuild, for integration tests.
4. CodeDeployToECS creates the green task set, the test listener exposes it to the AfterAllowTestTraffic hook, then production traffic shifts.
5. An alarm on the green task set rolls traffic back to blue.

| Decision | Choose | When |
|---|---|---|
| Tags that never move | ECR tag immutability | Releases must match tested images |
| Stop vulnerable images | InspectorScan action with thresholds | Gate inside the pipeline |
| Test before customers | Blue/green with a test listener | ECS behind an ALB |
| Simple rolling update | ECS deploy action and circuit breaker | No test traffic needed |
| Kubernetes | New Deployment, then switch the Service selector | Workload runs on EKS |
| Long multi-step tests | Step Functions invoke action | Tests need a workflow |

### Exam cues

- If the question says images must not be overwritten, think ECR tag immutability.
- If the question says fail the pipeline on vulnerable images, think the InspectorScan action.
- If the question says test the new ECS version before production traffic, think CodeDeploy blue/green with a test listener.
- If the question says a Lambda test action never finishes, think PutJobSuccessResult or PutJobFailureResult.
- If the question says roll back a failed rolling ECS deployment, think the deployment circuit breaker.

### Remember

- Standard ECS action: imagedefinitions.json. CodeDeployToECS: task definition template, AppSpec, imageDetail.json.
- AfterAllowTestTraffic runs after the test listener reaches the green task set.
- The blue task set stays until the termination wait ends, so rollback is fast.

> **Trap:** The ECS deployment circuit breaker belongs to ECS rolling updates. A CodeDeploy blue/green deployment rolls back through its own alarms and settings.
