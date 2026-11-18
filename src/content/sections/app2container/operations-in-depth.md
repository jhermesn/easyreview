---
title: Containerization workflow and deployment
level: professional
order: 20
facts:
  - id: worker
    text: App2Container can build and deploy on a worker instead of the application server; the worker
      must use the same Linux or Windows platform and support containers.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/start-intro.html#start-intro
  - id: extract
    text: App2Container extract creates an application archive that can be transferred to a worker for
      containerization.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/a2c-commands.html#a2c-commands
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
  - id: containerize
    text: App2Container containerize generates a Dockerfile, container image, and deployment.json from
      analysis results or an extracted application archive.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-containerize.html#cmd-containerize
  - id: deploy-option
    text: App2Container generate app-deployment uses deployment.json; --deploy creates and deploys the
      target stack directly, while generated artifacts can be reviewed and customized for manual
      deployment.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-appdeploy.html#cmd-generate-appdeploy
  - id: pipeline-config
    text: App2Container generate app-deployment creates pipeline.json, which generate pipeline uses to
      produce optional delivery-pipeline artifacts.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-pipeline.html#cmd-generate-pipeline
  - id: app-mode
    text: App2Container application mode includes the application files and dependencies required by a
      supported framework.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/supported-applications.html#supported-applications
  - id: process-mode
    text: App2Container process mode includes all non-system files when a supported framework is not
      found or dependent processes require broader discovery.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/supported-applications.html#supported-applications
  - id: generate-resources
    text: App2Container generate app-deployment can create an ECR repository and push the container
      image even when the deployment itself is performed later.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-appdeploy.html#cmd-generate-appdeploy
  - id: prevalidation
    text: App2Container containerize pre-validates generated images by default; --no-validate skips that
      check.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-containerize.html#cmd-containerize
cards:
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
  - id: app2container-009
    q: Which App2Container output file configures container deployment and which configures an optional
      delivery pipeline?
    a: deployment.json configures generate app-deployment. pipeline.json is created during
      deployment-artifact generation and consumed by generate pipeline.
    facts:
      - deploy-option
      - pipeline-config
  - id: app2container-011
    q: Does App2Container containerize test the generated container image by default?
    a: Yes. It pre-validates the image. The --no-validate option bypasses that check.
    facts:
      - prevalidation
---

AWS App2Container uses a sequence of commands to discover an application, build its container image, and prepare deployment artifacts. A worker machine can handle the build and deployment when the application server cannot run containers.

### How it works

1. Run `init` to configure the workspace, then `inventory` to list running candidate applications and assign IDs. Run `analyze` to identify runtime dependencies and write `analysis.json`. The [command reference](https://docs.aws.amazon.com/app2container/latest/UserGuide/a2c-commands.html#a2c-commands) describes each phase.
2. If using a worker, run `extract` to create an application archive and transfer it to the worker. The [worker](https://docs.aws.amazon.com/app2container/latest/UserGuide/start-intro.html#start-intro) must support containers and use the same Linux or Windows platform as the application server.
3. Run [`containerize`](https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-containerize.html#cmd-containerize) with the analysis results or extracted archive. It generates a Dockerfile, an image, and `deployment.json`. It pre-validates the image by default; `--no-validate` skips that check.
4. Run [`generate app-deployment`](https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-appdeploy.html#cmd-generate-appdeploy) using `deployment.json`. Review and customize the generated artifacts for manual deployment, or use `--deploy` to create and deploy the target stack directly.
5. Optionally run [`generate pipeline`](https://docs.aws.amazon.com/app2container/latest/UserGuide/cmd-generate-pipeline.html#cmd-generate-pipeline) to produce delivery-pipeline artifacts. It uses `pipeline.json`, which `generate app-deployment` creates.

### Exam cues

- If the question says the application server cannot run Docker, think of extracting an archive for a compatible worker, because the worker can build and deploy the application.
- If the question says a supported framework is detected, think application mode, because it selects the required application files and dependencies. If no supported framework is found or dependent processes need broader discovery, think process mode, because it includes all non-system files. See [supported applications](https://docs.aws.amazon.com/app2container/latest/UserGuide/supported-applications.html#supported-applications).
- If the question asks which configuration feeds deployment or pipeline generation, think `deployment.json` for `generate app-deployment` and `pipeline.json` for `generate pipeline`.

### Remember

- Command order: `init`, `inventory`, `analyze`, `containerize`, `generate app-deployment`, then optionally `generate pipeline`. A worker workflow adds `extract` before `containerize`.
- Image pre-validation is on by default; `--no-validate` bypasses it.

> **Trap:** Omitting `--deploy` does not guarantee that no AWS resources are created. `generate app-deployment` can create an Amazon ECR repository and push the image even when deployment happens later.
