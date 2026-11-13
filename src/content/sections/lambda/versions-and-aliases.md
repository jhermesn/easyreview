---
title: Versions and aliases
level: associate
order: 50
facts:
  - id: latest
    text: Deploying code overwrites $LATEST; an unqualified function ARN invokes $LATEST.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html#configuration-versions
  - id: version-snapshot
    text: Publishing creates a numbered snapshot whose code and most configuration, including memory and layers, cannot be edited.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html#configuration-versions
  - id: version-exceptions
    text: Published versions still allow operational changes including triggers, destinations, provisioned concurrency, and asynchronous invocation settings.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html#configuration-versions
  - id: weighted-alias
    text: A weighted Lambda alias routes invocations between at most two published versions of the same function and cannot target $LATEST.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html#configuring-alias-routing
  - id: alias-requirements
    text: Weighted-alias versions must have the same execution role and the same DLQ configuration, or neither may have a DLQ.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html#configuring-alias-routing
  - id: alias-probability
    text: Weighted alias routing is probabilistic, so low request counts can differ substantially from configured percentages.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html#configuring-alias-routing
  - id: alias-call
    text: Traffic weights apply to requests through the alias; a direct version or $LATEST invocation does not traverse that alias.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html#configuring-alias-routing
  - id: stage-alias
    text: An API Gateway REST API stage variable can select the version or alias suffix of a Lambda integration ARN.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/aws-api-gateway-stage-variables-reference.html#stage-variables-in-integration-lambda-functions
  - id: env-version
    text: Environment variables are literal string pairs in version-specific configuration and are locked when that version is published.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars
  - id: env-size
    text: All Lambda environment variables together are limited to 4 KB.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars
  - id: env-encryption
    text: Lambda encrypts environment variables at rest with an AWS managed KMS key by default; a customer managed key can be configured.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars-encryption.html#configuration-envvars-encryption
  - id: env-secrets
    text: AWS recommends Secrets Manager for sensitive values such as database credentials and API keys rather than environment variables.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars
  - id: zip-dependencies
    text: Python ZIP packages must include the handler and compatible dependencies; AWS recommends packaging all dependencies including the SDK to avoid version misalignment.
    source: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package
  - id: native-dependencies
    text: Python native libraries must match the Lambda Linux environment and instruction-set architecture.
    source: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package
  - id: layer-content
    text: A Lambda layer is a ZIP archive of supplementary code or data extracted into /opt.
    source: https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html#chapter-layers
  - id: layer-version
    text: Layer versions are immutable and functions reference a specific layer-version ARN.
    source: https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html#chapter-layers
  - id: layer-zip-only
    text: Lambda supports up to five layers for ZIP-based functions; container-image functions include dependencies in the image.
    source: https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html#chapter-layers
  - id: zip-size
    text: The unzipped Lambda deployment package, including layers and custom runtimes, must fit within 250 MB.
    source: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#function-configuration-deployment-and-execution
  - id: image-runtime
    text: A Lambda container image must implement the Lambda Runtime API; a runtime interface client implements that contract.
    source: https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-reqs
  - id: image-emulator
    text: AWS Lambda base images include a runtime interface emulator for local testing.
    source: https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-create
  - id: image-platform
    text: Lambda container images must use Linux, target one architecture, and run with a read-only filesystem apart from writable /tmp.
    source: https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-reqs
  - id: image-region
    text: The ECR repository for a Lambda container image must be in the same Region as the function, though accounts can differ.
    source: https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-create
  - id: package-type
    text: Changing an existing Lambda function between ZIP and image packaging requires creating a new function.
    source: https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-create
  - id: stage-permissions
    text: When a REST API stage variable selects a Lambda function, configure the function invoke permissions manually.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html#stage-variables
diagrams:
  - id: lambda-weighted-alias-routing
    title: Only alias invocations participate in a weighted release
    width: 850
    height: 330
    nodes:
      - id: caller
        label: Caller
        icon: res-client
        x: 20
        y: 110
        w: 170
        h: 72
        tone: user
      - id: alias
        label: Alias
        icon: lambda
        x: 300
        y: 110
        w: 170
        h: 72
        tone: compute
      - id: stable
        label: Stable version
        icon: res-lambda-lambda-function
        x: 610
        y: 30
        w: 170
        h: 72
        tone: compute
      - id: new
        label: New version
        icon: res-lambda-lambda-function
        x: 610
        y: 210
        w: 170
        h: 72
        tone: compute
    edges:
      - from: caller
        to: alias
        step: 1
        label: invoke alias
      - from: alias
        to: stable
        step: 2
        label: primary weight
      - from: alias
        to: new
        step: 3
        label: extra weight
    steps:
      - The caller invokes the alias ARN rather than $LATEST or a version directly.
      - The alias routes part of the requests to its primary published version.
      - The remaining configured weight routes to the second published version.
cards:
  - id: lambda-013
    q: Which Lambda version settings are fixed after publication, and what can a weighted alias target?
    a: Published code and most configuration are fixed; operational settings such as triggers and destinations can still change. A weighted alias routes between at most two published versions, never $LATEST.
    facts:
      - version-snapshot
      - version-exceptions
      - weighted-alias
  - id: lambda-014
    q: A gradual Lambda release uses a weighted alias, but callers always execute the newly deployed $LATEST code. What should change?
    a: Make callers invoke the alias. Calls to $LATEST or a version directly bypass the alias traffic weights.
    trap: true
    facts:
      - alias-call
      - latest
  - id: lambda-018
    q: An API Gateway REST API stage invokes Lambda $LATEST during a weighted-alias release. How can it follow that release?
    a: Configure the Lambda integration to invoke the alias, for example by using a stage variable for the alias suffix. Only requests through that alias follow its weights. Configure the target invoke permissions explicitly when using stage variables.
    trap: true
    facts:
      - stage-alias
      - alias-call
      - stage-permissions
  - id: lambda-041
    q: A Lambda team wants every low-traffic sample to match the weighted alias percentage exactly. Does alias routing guarantee that?
    a: No. Routing is probabilistic; small request samples can differ substantially from the configured split.
    trap: true
    facts:
      - alias-probability
  - id: lambda-042
    q: A ZIP-based Lambda package exceeds 250 MB after extraction. Can moving dependencies into five Lambda layers bypass the limit?
    a: No. The 250 MB unzipped limit includes the function, layers, and custom runtime together.
    trap: true
    facts:
      - zip-size
      - layer-zip-only
  - id: lambda-043
    q: A Python Lambda ZIP works locally but fails to load a native library. What compatibility should the team check?
    a: Match the library to the Lambda Linux environment and target instruction-set architecture. Include compatible dependencies with the handler.
    facts:
      - native-dependencies
      - zip-dependencies
  - id: lambda-044
    q: A team wants to run a custom Linux image in Lambda. What protocol support must the image include?
    a: Implement the Lambda Runtime API, typically through a runtime interface client. AWS Lambda base images also include a runtime interface emulator for local tests.
    facts:
      - image-runtime
      - image-emulator
  - id: lambda-045
    q: A team changes Lambda environment variables after publishing a release. Will existing published versions get those new values?
    a: No. Environment variables are version-specific and locked on publication. Publish a new version and move the alias to adopt the new configuration.
    facts:
      - env-version
      - version-snapshot
      - weighted-alias
  - id: lambda-046
    q: What encryption and secret-storage choices apply to Lambda environment variables?
    a: Lambda encrypts them at rest using an AWS managed KMS key by default; a customer managed key is optional. AWS recommends Secrets Manager for credentials and API keys.
    facts:
      - env-encryption
      - env-secrets
---
Lambda versions preserve a release while aliases give callers a stable name for a published version. A weighted alias can send part of the traffic to a second version, allowing a canary release, where only some requests try the new code.

### How it works

1. Package the handler and its dependencies, then deploy to `$LATEST`, the editable function version. For Python ZIPs, include compatible dependencies and match native libraries, compiled code loaded by Python, to Lambda's Linux environment and target processor architecture.
2. For reusable dependencies, attach a specific layer-version ARN. A layer is a ZIP archive of supplementary code or data; Lambda extracts it into `/opt`. Layer versions are immutable, meaning their contents cannot be edited after publication.
3. For image packaging, implement the Lambda Runtime API, the contract used to receive invocations and return results. A runtime interface client implements it. AWS Lambda base images include a runtime interface emulator for local testing. Images must use Linux, target one architecture, and support a read-only filesystem except `/tmp`. Store the image in Amazon Elastic Container Registry (ECR) in the function's Region. Changing an existing function between ZIP and image packaging requires a new function.
4. Set environment variables, literal string pairs available to the code. They are version-specific, encrypted at rest by default with an AWS managed AWS Key Management Service (KMS) key, and can use a customer managed key. AWS recommends Secrets Manager for credentials and API keys.
5. Publish a numbered version. Code and most configuration, including memory, layers, and environment variables, are fixed for that version. Operational settings such as triggers, destinations, and provisioned concurrency can still change.
6. Point an alias to the release. A weighted alias supports two published versions with matching execution roles and DLQ configurations, or no DLQ. Callers must invoke the alias to follow its traffic weights. A REST API stage variable can select the alias suffix in an API Gateway Lambda integration. Configure the target invoke permissions manually when using stage variables.

### Exam cues

- If the question says a gradual release sends all requests to new code, think the caller target, because `$LATEST` and direct version calls bypass alias weights.
- If the question says share a fixed dependency release across ZIP functions, think a layer-version ARN, because each layer version preserves its contents.
- If the question says a custom image runs in Docker but not Lambda, think the Runtime API, because an ordinary container entry point alone does not implement Lambda's invocation contract.
- If the question says a published release must retain its environment settings, think version-specific variables, because publishing locks those values.

### Remember

- Weighted alias: at most 2 published versions, never `$LATEST`. The split is probabilistic, especially noticeable at low traffic.
- ZIP functions: up to 5 layers. The combined unzipped function, layers, and custom runtime must fit within 250 MB.
- Environment variables: 4 KB in aggregate. Values are literal strings, not expanded expressions.
- An unqualified function ARN invokes `$LATEST`.

> **Trap:** Moving dependencies into layers does not bypass the combined unzipped package limit.

> **Trap:** A published version freezes code and most configuration, not every operational setting associated with the version.
