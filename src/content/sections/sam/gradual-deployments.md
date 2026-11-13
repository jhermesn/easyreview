---
title: Gradual deployments
level: professional
order: 30
facts:
  - id: alias-required
    text: DeploymentPreference requires AutoPublishAlias on AWS::Serverless::Function.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-property-function-deploymentpreference.html#sam-property-function-deploymentpreference
  - id: publish
    text: AutoPublishAlias publishes an updated Lambda version when a code change is detected and creates or
      updates the named alias.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: generated
    text: DeploymentPreference generates a CodeDeploy application and deployment group.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-generated-resources-function.html
  - id: call-alias
    text: Function invocations must use the alias qualifier to receive SAM gradual traffic shifting.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: canary
    text: A canary deployment shifts traffic in two increments, separated by the configured interval.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: linear
    text: A linear deployment shifts traffic in equal increments at equal time intervals.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: all-at-once
    text: AllAtOnce shifts all traffic to the new version immediately.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: canary-types
    text: SAM lists Canary10Percent5Minutes, Canary10Percent10Minutes, Canary10Percent15Minutes, and
      Canary10Percent30Minutes as predefined types.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: linear-types
    text: SAM lists Linear10PercentEvery1Minute, Linear10PercentEvery2Minutes, Linear10PercentEvery3Minutes, and
      Linear10PercentEvery10Minutes as predefined types.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: canary-example
    text: Canary10Percent10Minutes shifts 10 percent immediately and the remaining traffic after 10 minutes.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: hooks
    text: PreTraffic and PostTraffic identify validation functions run before and after traffic shifting.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: rollback
    text: Failed pre-traffic or post-traffic validation, or a triggered configured CloudWatch alarm, causes
      CodeDeploy rollback.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: callback
    text: Lambda validation hooks must report Succeeded or Failed using PutLifecycleEventHookExecutionStatus;
      missing notification within one hour fails the deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks
  - id: first-release
    text: For a first gradual release, deploy AutoPublishAlias without DeploymentPreference, then add
      DeploymentPreference on a later update to provide a previous version.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html#automating-updates-to-serverless-apps
  - id: weighted-versions
    text: A weighted Lambda alias can route to at most two published versions and cannot point to $LATEST.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html#configuring-alias-routing
  - id: enabled
    text: DeploymentPreference.Enabled defaults to true.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-property-function-deploymentpreference.html#sam-property-function-deploymentpreference
  - id: alias-definition
    text: A Lambda alias is a named pointer to a function version.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html#configuration-aliases
  - id: version-definition
    text: Publishing a Lambda version locks the function code and most configuration settings.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html
diagrams:
  - id: sam-lambda-release
    title: SAM gradual Lambda release
    width: 1260
    height: 476
    nodes:
      - id: sam
        label: SAM template
        sub: alias + preference
        icon: res-cloudformation-template
        h: 86
        x: 28
        y: 150
        w: 180
        tone: mgmt
        info: AutoPublishAlias creates a version and alias; DeploymentPreference enables CodeDeploy traffic shifting.
      - id: deploy
        label: CodeDeploy
        sub: traffic shifting
        icon: codedeploy
        h: 86
        x: 364
        y: 150
        w: 150
        tone: devtools
        info: CodeDeploy runs configured pre-traffic checks, shifts alias traffic, and runs post-traffic checks.
          Failed checks or configured alarms trigger rollback.
      - id: alias
        label: Lambda alias
        sub: stable caller target
        icon: lambda
        h: 86
        x: 686
        y: 150
        w: 150
        tone: compute
        info: Invoke the alias to receive its traffic split between published versions.
      - id: version
        label: New version
        sub: published code
        icon: res-lambda-lambda-function
        h: 86
        x: 1022
        y: 150
        w: 150
        tone: compute
        info: AutoPublishAlias publishes a new version when it detects a code change.
      - id: alarm
        label: CloudWatch alarm
        sub: errors, latency
        icon: res-cloudwatch-alarm
        x: 364
        y: 346
        w: 150
        h: 86
        tone: mgmt
        info: Configured CloudWatch alarms trigger rollback if they fire during deployment.
    edges:
      - from: sam
        to: deploy
        step: 1
      - from: deploy
        to: alias
        step: 2
      - from: alias
        to: version
        step: 3
      - from: alarm
        to: deploy
        step: 4
        label: ALARM → rollback
        dashed: true
    steps:
      - SAM generates CodeDeploy resources from the configured DeploymentPreference.
      - CodeDeploy runs the pre-traffic hook, then moves alias weight to the new version using the chosen
        canary or linear type.
      - The alias sends the configured share of requests to the new published version.
      - A triggered alarm (or a failed hook) stops the deployment and the alias points back to the old version.
cards:
  - id: sam-001
    q: A team needs gradual Lambda releases from an AWS SAM template. What should it configure?
    a: AutoPublishAlias and DeploymentPreference on AWS::Serverless::Function. SAM publishes the version and alias
      and generates CodeDeploy resources for traffic shifting.
    facts:
      - alias-required
      - publish
      - generated
  - id: sam-002
    q: Which predefined traffic-shifting types does AWS SAM list for DeploymentPreference?
    a: Canary10Percent5Minutes, Canary10Percent10Minutes, Canary10Percent15Minutes, Canary10Percent30Minutes;
      Linear10PercentEvery1Minute, Linear10PercentEvery2Minutes, Linear10PercentEvery3Minutes,
      Linear10PercentEvery10Minutes; and AllAtOnce.
    facts:
      - canary-types
      - linear-types
      - all-at-once
  - id: sam-003
    q: An AWS SAM application has no previously deployed Lambda version. How should the team introduce gradual
      deployment?
    a: Deploy once with AutoPublishAlias and no DeploymentPreference. Add DeploymentPreference on a subsequent
      update so CodeDeploy has an existing version to shift traffic from.
    facts:
      - first-release
    trap: true
  - id: sam-004
    q: What causes an AWS SAM gradual deployment to roll back, and how do validation hooks report results?
    a: A configured alarm or failed pre-traffic or post-traffic validation triggers rollback. Hook functions
      report Succeeded or Failed to CodeDeploy using PutLifecycleEventHookExecutionStatus.
    facts:
      - rollback
      - callback
  - id: sam-005
    q: An AWS SAM release needs validation before traffic moves and rollback on application errors. What should be
      configured?
    a: AutoPublishAlias and DeploymentPreference with a PreTraffic hook and CloudWatch alarms. Failed validation
      or a triggered configured alarm rolls back the deployment.
    facts:
      - alias-required
      - hooks
      - rollback
  - id: sam-019
    q: An AWS SAM canary is configured, but clients call a numbered Lambda version directly. Will they receive the
      alias traffic split?
    a: No. Clients must invoke the alias qualifier to participate in traffic shifting.
    facts:
      - call-alias
    trap: true
  - id: sam-020
    q: What does Canary10Percent10Minutes do in an AWS SAM deployment?
    a: Move 10 percent of traffic to the new version immediately, then move the rest after 10 minutes if the
      deployment continues successfully.
    facts:
      - canary-example
  - id: sam-021
    q: How many Lambda versions can a weighted alias use during an AWS SAM release, and can one be $LATEST?
    a: At most two published versions. The alias cannot point to $LATEST.
    facts:
      - weighted-versions
---
SAM gradual deployment uses CodeDeploy to move a Lambda alias between published versions. An alias is a named invocation target, while a published version is a snapshot with locked code and most settings. Callers keep using the alias while its traffic weights change.

### How it works

1. Deploy `AutoPublishAlias` first to establish an existing version and alias. On a later update, add `DeploymentPreference`.
2. SAM detects new code, publishes an updated version, and generates the CodeDeploy resources needed for the deployment.
3. Run the configured `PreTraffic` validation function before shifting traffic. Hooks must report `Succeeded` or `Failed` using `PutLifecycleEventHookExecutionStatus`.
4. Shift requests through the alias using the selected type.

   | Type | Mechanism | Predefined options |
   |---|---|---|
   | Canary | First share, wait, then remaining traffic | `Canary10Percent5Minutes`, `Canary10Percent10Minutes`, `Canary10Percent15Minutes`, `Canary10Percent30Minutes` |
   | Linear | Equal shares at equal intervals | `Linear10PercentEvery1Minute`, `Linear10PercentEvery2Minutes`, `Linear10PercentEvery3Minutes`, `Linear10PercentEvery10Minutes` |
   | All at once | Entire shift immediately | `AllAtOnce` |

5. Run `PostTraffic` validation after the shift. Failed validation or a configured CloudWatch alarm triggers rollback to the previous version.

### Exam cues

- If the question says move 10 percent of requests and wait 10 minutes, think `Canary10Percent10Minutes`, because it has an initial share and one later shift of the remainder.
- If the question says test before customers reach new code, think `PreTraffic`, because it validates before the shift.
- If the question says no canary behavior despite a correct template, think the caller's invocation target, because direct version calls bypass alias routing.

### Remember

- Required pair: `AutoPublishAlias` plus `DeploymentPreference`.
- `DeploymentPreference.Enabled` defaults to `true`.
- Weighted aliases use at most two published versions and cannot point to `$LATEST`.
- A hook that never reports back fails the deployment after one hour.

> **Trap:** A first deployment has no previous version to shift from. Establish the alias and initial version before enabling gradual traffic shifting.
