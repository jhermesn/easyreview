---
title: Build, package, and deploy
level: associate
order: 20
facts:
  - id: build
    text: sam build prepares application code and dependencies for local testing and deployment.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-build.html
  - id: build-output
    text: The default SAM build artifacts and built template are written under .aws-sam/build.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-build.html
  - id: rebuild
    text: Edit original sources and rerun sam build after changes; the build directory is overwritten.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-build.html
  - id: container
    text: sam build --use-container builds inside a provided container image and requires Docker.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-build.html
  - id: package
    text: sam package uploads ZIP code artifacts to S3 and returns a template with local artifact paths replaced
      by S3 locations.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-package.html#sam-cli-command-reference-sam-package
  - id: image
    text: For Image package types, sam package uses an ECR repository specified with --image-repository.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-package.html#sam-cli-command-reference-sam-package
  - id: deploy
    text: sam deploy deploys an application using CloudFormation.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html#sam-cli-command-reference-sam-deploy
  - id: implicit-package
    text: sam deploy includes packaging functionality, so a separate sam package command is optional.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-package.html#sam-cli-command-reference-sam-package
  - id: local-invoke
    text: sam local invoke runs a one-time local invocation of a Lambda function.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-local.html
  - id: local-api
    text: sam local start-api runs a local HTTP server for API-triggered Lambda functions.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-local.html
  - id: sync-code
    text: sam sync, part of SAM Accelerate, uses direct service APIs for supported changes and CloudFormation
      deployment when those APIs are not available.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-sync.html#using-sam-cli-sync
  - id: watch
    text: sam sync --watch monitors local changes and syncs them to the cloud.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-sync.html#using-sam-cli-sync
  - id: sync-dev
    text: AWS recommends sam sync for development environments and sam deploy or a CI/CD pipeline for production.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-sync.html#using-sam-cli-sync
  - id: guided
    text: sam deploy --guided prompts for deployment settings and can save them to samconfig.toml.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/deploy-upload-local-files.html#deploy-upload-local-files
  - id: cdk-local
    text: The SAM CLI can locally test Lambda functions defined in a synthesized AWS CDK CloudFormation template.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing-locally-with-sam-cli.html
cards:
  - id: sam-007
    q: A pipeline needs a packaged AWS SAM template before a separate deployment stage. What should it run?
    a: Run sam build, then sam package to upload ZIP artifacts to S3 and produce a template with remote artifact
      locations. Deploy that template in the deployment stage.
    facts:
      - build
      - package
  - id: sam-013
    q: An AWS SAM pipeline runs sam build followed by sam deploy without sam package. Is a packaging command
      missing?
    a: No. sam deploy includes packaging and uploads the referenced local artifacts as needed before
      CloudFormation deployment.
    facts:
      - implicit-package
      - deploy
    trap: true
  - id: sam-014
    q: Which AWS SAM commands invoke one function locally and expose local API endpoints?
    a: sam local invoke performs a one-time invocation. sam local start-api runs a local HTTP server for
      API-triggered functions.
    facts:
      - local-invoke
      - local-api
  - id: sam-015
    q: An AWS SAM developer wants code edits quickly reflected in a development cloud stack. What should the
      developer use?
    a: sam sync --watch. It watches local changes and uses direct service APIs for supported updates, falling back
      to CloudFormation when needed.
    facts:
      - watch
      - sync-code
      - sync-dev
  - id: sam-016
    q: Where does sam build put its default output, and what should be edited after a source change?
    a: Output goes under .aws-sam/build. Edit the original source and rerun sam build because the build directory
      is overwritten.
    facts:
      - build-output
      - rebuild
  - id: sam-017
    q: An AWS SAM function uses an Image package type. Where are its packaged image artifacts uploaded?
    a: An Amazon ECR repository, specified for sam package with --image-repository. ZIP code artifacts use S3.
    facts:
      - image
      - package
  - id: sam-018
    q: Does sam sync provide the recommended release path for a production AWS SAM stack?
    a: No. AWS recommends sam deploy or a CI/CD pipeline for production and sam sync for development.
    facts:
      - sync-dev
    trap: true
  - id: sam-022
    q: A team defines Lambda functions with AWS CDK but wants to invoke them locally with SAM. What should it
      provide to SAM?
    a: Synthesize the CDK application to a CloudFormation template, then point the SAM CLI at that template for
      local Lambda testing.
    facts:
      - cdk-local
diagrams:
  - id: sam-build-deploy
    title: SAM artifact preparation and deployment
    width: 1000
    height: 210
    nodes:
      - id: source
        label: Source + template
        icon: res-cloudformation-template
        info: Edit the original source and SAM template.
        x: 30
        y: 60
        w: 190
        h: 86
        tone: mgmt
      - id: build
        label: sam build
        icon: lambda
        info: Prepare code and dependencies under .aws-sam/build.
        x: 280
        y: 60
        w: 190
        h: 86
        tone: compute
      - id: package
        label: Upload artifacts
        icon: simple-storage-service
        info: ZIP artifacts use S3; image artifacts use ECR. Packaging updates template references.
        x: 530
        y: 60
        w: 190
        h: 86
        tone: storage
      - id: deploy
        label: CloudFormation
        icon: cloudformation
        info: sam deploy includes packaging and deploys the application stack.
        x: 780
        y: 60
        w: 190
        h: 86
        tone: mgmt
    edges:
      - from: source
        to: build
        step: 1
      - from: build
        to: package
        step: 2
      - from: package
        to: deploy
        step: 3
    steps:
      - Build the source code and dependencies.
      - Upload the built artifacts with sam package or the packaging included in sam deploy.
      - Deploy the template through CloudFormation.
---
The SAM CLI prepares code, uploads deployment artifacts, and asks CloudFormation to deploy the application. An artifact is the packaged code and dependencies that the cloud service needs to run.

### How it works

1. Run `sam build` to prepare source code and dependencies. Its default output is `.aws-sam/build`; edit the original source and rebuild after changes.
2. Use `sam local` to test locally when needed. Use `sam local invoke` for one invocation and `sam local start-api` for a local HTTP API server. SAM can also test Lambda functions in a synthesized CDK CloudFormation template, the template produced from CDK application code.
3. Upload artifacts and update template references. `sam package` sends ZIP code artifacts to S3; image artifacts use ECR, a container-image registry. A separate package command is useful when build and deployment are separate stages.
4. Run `sam deploy` to deploy through CloudFormation. It includes packaging, so a separate `sam package` is optional. `sam deploy --guided` collects settings and can save them in `samconfig.toml`.
5. During cloud development, use `sam sync --watch` to watch changes. SAM Accelerate uses service APIs for supported changes and CloudFormation when needed.

### Exam cues

- If the question says a build stage must hand a deployable template to another stage, think `sam build` then `sam package`, because packaging replaces local paths with uploaded artifact locations.
- If the question says test an API locally before deployment, think `sam local start-api`, because it exposes a local HTTP endpoint for the functions.
- If the question says fast cloud iteration on a development stack, think `sam sync`, because direct service API updates avoid a full CloudFormation deployment for supported changes.

### Remember

- Build output: `.aws-sam/build`.
- `sam build --use-container` uses a build container and requires Docker.
- ZIP artifacts use S3; image artifacts use ECR.
- `sam deploy` already includes packaging.
- Use `sam sync` for development; use `sam deploy` or a delivery pipeline for production.

> **Trap:** A successful build only prepares artifacts locally. The upload and CloudFormation deployment still need to happen.
