---
title: Application containerization and availability
level: associate
order: 10
facts:
  - id: purpose
    text: AWS App2Container is a command line tool that packages supported applications running on
      servers into container images without requiring their source code.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html#what-is-a2c
  - id: supported-applications
    text: App2Container supports Java applications on Linux and ASP.NET applications on Windows and
      Linux.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/supported-applications.html#supported-applications
  - id: app-mode
    text: App2Container application mode includes the application files and dependencies required by a
      supported framework.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/supported-applications.html#supported-applications
  - id: process-mode
    text: App2Container process mode includes all non-system files when a supported framework is not
      found or dependent processes require broader discovery.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/supported-applications.html#supported-applications
  - id: database-excluded
    text: App2Container does not containerize database-layer components; application containers must be
      configured to access the database server.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/supported-applications.html#supported-applications
  - id: initialize
    text: App2Container init configures the local workspace before analysis, transformation, and
      deployment commands.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/a2c-commands.html#a2c-commands
  - id: inventory
    text: App2Container inventory lists running candidate applications and assigns application IDs.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/a2c-commands.html#a2c-commands
  - id: analyze
    text: App2Container analyze identifies runtime dependencies and writes analysis.json for
      transformation.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/a2c-commands.html#a2c-commands
  - id: extract
    text: App2Container extract creates an application archive that can be transferred to a worker for
      containerization.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/a2c-commands.html#a2c-commands
  - id: worker
    text: App2Container can build and deploy on a worker instead of the application server; the worker
      must use the same Linux or Windows platform and support containers.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/start-intro.html#start-intro
  - id: containerize
    text: App2Container containerize generates a Dockerfile, container image, and deployment.json from
      analysis results or an extracted application archive.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-containerize.html#cmd-containerize
  - id: prevalidation
    text: App2Container containerize pre-validates generated images by default; --no-validate skips that
      check.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-containerize.html#cmd-containerize
  - id: targets
    text: App2Container generates deployment artifacts for Amazon ECS, Amazon EKS, or App Runner, using
      Amazon ECR as the image registry.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-appdeploy.html#cmd-generate-appdeploy
  - id: apprunner-linux
    text: App2Container deployment to App Runner supports Linux applications only.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-appdeploy.html#cmd-generate-appdeploy
  - id: generate-resources
    text: App2Container generate app-deployment can create an ECR repository and push the container
      image even when the deployment itself is performed later.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-appdeploy.html#cmd-generate-appdeploy
  - id: deploy-option
    text: App2Container generate app-deployment uses deployment.json; --deploy creates and deploys the
      target stack directly, while generated artifacts can be reviewed and customized for manual
      deployment.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-appdeploy.html#cmd-generate-appdeploy
  - id: pipeline-config
    text: App2Container generate app-deployment creates pipeline.json, which generate pipeline uses to
      produce optional delivery-pipeline artifacts.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-pipeline.html#cmd-generate-pipeline
  - id: pipeline-types
    text: App2Container can generate pipeline artifacts for CodePipeline, Jenkins, or Microsoft Azure
      DevOps.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-pipeline.html#cmd-generate-pipeline
  - id: closed-date
    text: AWS App2Container stopped accepting new customers on November 7, 2025.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/dotnet-modernization-tools-availability-change.html#dotnet-modernization-tools-availability-change
  - id: existing-customers
    text: Existing App2Container customers can complete ongoing modernization projects; AWS continues
      security updates and availability without adding new features.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/dotnet-modernization-tools-availability-change.html#dotnet-modernization-tools-availability-change
  - id: alternative
    text: AWS recommends AWS Transform for new modernization projects in its .NET modernization-tools
      availability notice.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/dotnet-modernization-tools-availability-change.html#dotnet-modernization-tools-availability-change
  - id: apprunner-date
    text: AWS App Runner moved to maintenance and closed to new customers on March 31, 2026.
    source: https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html
  - id: tool-pricing
    text: App2Container has no additional tool charge; underlying AWS resources used to store or run its
      outputs are billed.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html#what-is-a2c
diagrams:
  - id: app2container-package-to-ecs
    title: App2Container packaging and an ECS deployment path
    width: 900
    height: 230
    nodes:
      - id: server
        label: Running app
        sub: inventory and analyze
        icon: res-server
        tone: neutral
        x: 30
        y: 85
        w: 220
        h: 86
      - id: image
        label: ECR image
        sub: extract and containerize
        icon: elastic-container-registry
        tone: compute
        x: 340
        y: 85
        w: 220
        h: 86
      - id: service
        label: ECS application
        sub: generated deployment
        icon: elastic-container-service
        tone: compute
        x: 650
        y: 85
        w: 220
        h: 86
    edges:
      - from: server
        to: image
        step: 1
      - from: image
        to: service
        step: 2
    steps:
      - Discover and analyze the application, build its image on the server or worker, and push the
        image during deployment-artifact generation.
      - Review the generated artifacts and deploy the ECS application, or use --deploy for direct
        deployment. The database is configured separately.
cards:
  - id: app2container-001
    q: Which AWS tool packages supported existing Java or ASP.NET server applications into containers
      without requiring source code, and what availability limit applies?
    a: AWS App2Container. It discovers running applications and generates container and deployment
      artifacts. It stopped accepting new customers on November 7, 2025; existing customers can
      finish ongoing projects.
    facts:
      - purpose
      - supported-applications
      - closed-date
      - existing-customers
  - id: app2container-002
    q: An existing App2Container customer has a Java application running on Linux and no source
      repository. Can App2Container still package it?
    a: Yes, if the application is supported. App2Container analyzes running applications and
      dependencies without requiring source code.
    facts:
      - purpose
      - supported-applications
      - analyze
  - id: app2container-003
    q: An existing App2Container customer cannot install Docker on the application server. Where should
      containerization run?
    a: Use a worker machine on the same Linux or Windows platform that supports containers. Extract and
      transfer the application archive for the build.
    facts:
      - worker
      - extract
  - id: app2container-004
    q: What is the App2Container command order from discovery to optional deployment automation?
    a: Initialize, inventory, analyze, containerize, generate app-deployment, then optionally generate
      pipeline. A worker workflow can extract an archive before containerize.
    facts:
      - initialize
      - inventory
      - analyze
      - extract
      - containerize
      - deploy-option
      - pipeline-config
  - id: app2container-005
    q: Does App2Container migrate an application database into the generated container image?
    a: No. It does not containerize the database layer. Configure the application container to reach the
      database server.
    trap: true
    facts:
      - database-excluded
  - id: app2container-006
    q: How do App2Container application mode and process mode differ?
    a: Application mode selects required application files and dependencies. Process mode includes all
      non-system files when broader dependency discovery is required.
    facts:
      - app-mode
      - process-mode
  - id: app2container-007
    q: An App2Container team runs generate app-deployment without --deploy. Can it assume no AWS
      resources are created?
    a: No. Artifact generation can create an ECR repository and push an image. --deploy adds direct
      deployment of the target stack.
    trap: true
    facts:
      - generate-resources
      - deploy-option
  - id: app2container-008
    q: Does the November 2025 App2Container availability change shut down every existing customer
      project?
    a: No. New customers were excluded from November 7, 2025. Existing customers can finish ongoing
      projects; AWS recommends Transform for new modernization work.
    trap: true
    facts:
      - closed-date
      - existing-customers
      - alternative
  - id: app2container-009
    q: Which App2Container output file configures container deployment and which configures an optional
      delivery pipeline?
    a: deployment.json configures generate app-deployment. pipeline.json is created during
      deployment-artifact generation and consumed by generate pipeline.
    facts:
      - deploy-option
      - pipeline-config
  - id: app2container-010
    q: Which platforms can host an App2Container-generated application, subject to support and customer
      eligibility?
    a: Amazon ECS, Amazon EKS, or App Runner, with images in ECR. App Runner output is limited to Linux
      applications; App Runner closed to new customers in March 2026.
    facts:
      - targets
      - apprunner-linux
      - apprunner-date
  - id: app2container-011
    q: Does App2Container containerize test the generated container image by default?
    a: Yes. It pre-validates the image. The --no-validate option bypasses that check.
    facts:
      - prevalidation
---

AWS App2Container packages a supported application that is already running on a server into a container image without requiring source code. A container image is the packaged application and dependencies used to start a container. The [App2Container guide](https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html#what-is-a2c) describes discovery, packaging, and generation of AWS deployment artifacts, meaning files used to build or deploy the application.

### How it works

1. Check support and eligibility. Java on Linux and ASP.NET on Windows or Linux are supported application types. App2Container closed to new customers on November 7, 2025. Existing customers can finish ongoing projects; AWS recommends Transform for new modernization projects.
2. Run init to configure the workspace, then inventory to discover running applications and assign IDs. Run analyze for the chosen ID. Its analysis.json records the dependencies needed at runtime, meaning files and processes the running application relies on.
3. Choose where to build. A worker machine is a separate machine used for containerization and deployment. It must use the same Linux or Windows platform and support containers. Use extract to create an application archive for transfer when following that workflow.
4. Run containerize. It generates a Dockerfile, the image-build instructions, plus an image and deployment.json. It pre-validates the image by default; --no-validate skips this check. Application mode selects required application files; process mode takes all non-system files when broader discovery is needed.
5. Review deployment.json and run generate app-deployment. It uses ECR as the container registry, a store for images, and generates target deployment files. Even without --deploy it can create the ECR repository and push the image. Review and customize the files before deploying, or use --deploy for direct stack deployment. A stack is a set of resources managed together through CloudFormation.
6. Optionally review the generated pipeline.json and run generate pipeline for delivery automation. Configure database connectivity separately: App2Container does not package the database layer.

### Exam cues

- If the question says an existing customer must containerize a supported running application without source code, think App2Container, because it discovers the running application's files and dependencies.
- If the question says Docker cannot run on the application server, think a compatible worker machine and extracted archive, because build and deployment can happen separately from discovery.
- If the question says generate deployment files without deploying the application, think omit --deploy and review the artifacts, because direct stack deployment is optional. ECR resource creation can still occur.
- If the question says a new customer wants to adopt App2Container after November 2025, think the availability restriction, because AWS closed new access on November 7, 2025.

### Remember

| Documented deployment target | Output and restriction |
|---|---|
| Amazon ECS | Container image in ECR and ECS deployment artifacts |
| Amazon EKS | Container image in ECR and Kubernetes deployment artifacts |
| AWS App Runner | Linux applications only; closed to new customers in March 2026 |

- App2Container's [availability notice](https://docs.aws.amazon.com/app2container/latest/UserGuide/dotnet-modernization-tools-availability-change.html#dotnet-modernization-tools-availability-change) permits existing projects to continue with security and availability maintenance, without new features.
- Optional pipeline artifacts support CodePipeline, Jenkins, or Microsoft Azure DevOps.
- App2Container has no additional tool charge; the AWS resources used by its outputs are billed.

> **Trap:** Packaging the application does not package its database. The application container still needs access to the database server.

> **Trap:** Generating deployment artifacts without --deploy is not a guarantee of zero AWS changes. The command can create an ECR repository and push an image.
