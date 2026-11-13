---
title: Lifecycle hooks
level: associate
order: 40
facts:
  - id: hook
    text: An EC2/On-Premises lifecycle hook maps a deployment event to scripts in AppSpec.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#appspec-hooks-server
  - id: core-order
    text: Without load balancing, the EC2 scriptable hook order is ApplicationStop, BeforeInstall,
      AfterInstall, ApplicationStart, ValidateService.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-run-order
  - id: reserved
    text: DownloadBundle and Install are agent operations and cannot run user hook scripts.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list
  - id: old-stop
    text: ApplicationStop uses AppSpec and scripts from the previous successful deployment and does not
      run on the first deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list
  - id: old-block
    text: ApplicationStop, BeforeBlockTraffic, and AfterBlockTraffic use scripts from the previous
      successful deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
  - id: new-scripts
    text: Other EC2 hook scripts use the current deployment AppSpec.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
  - id: lb-order
    text: For in-place deployments with a load balancer, traffic blocking hooks run before
      ApplicationStop and traffic allowing hooks run after ValidateService.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-run-order
  - id: lb-events
    text: BlockTraffic deregisters instances and AllowTraffic registers them; both operations are
      reserved for the agent.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list
  - id: sequential
    text: Scripts listed for an EC2 lifecycle event run sequentially in AppSpec order.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/application-specification-files.html#application-specification-files-agent-usage
  - id: timeout
    text: A hook script timeout defaults to 3600 seconds; all script timeout values within one lifecycle
      event must total no more than 3600 seconds.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-section-structure
  - id: env
    text: EC2 hook scripts receive APPLICATION_NAME, DEPLOYMENT_ID, DEPLOYMENT_GROUP_NAME,
      DEPLOYMENT_GROUP_ID, and LIFECYCLE_EVENT environment variables.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-environment-variable-availability
  - id: env-use
    text: A hook can use DEPLOYMENT_GROUP_NAME to select settings for the deployment environment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-environment-variable-availability
  - id: skip-broken-stop
    text: The ignore-application-stop-failures option lets deployment continue despite failures in
      ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
  - id: load-balancer
    text: A load balancer routes requests to instances that are registered with it.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-elastic-load-balancing.html#integrations-aws-elastic-load-balancing
cards:
  - id: codedeploy-001
    q: What is the scriptable hook order for an EC2/On-Premises CodeDeploy in-place deployment without a
      load balancer?
    a: ApplicationStop, BeforeInstall, AfterInstall, ApplicationStart, ValidateService. DownloadBundle
      and Install are reserved agent operations between these hooks.
    facts:
      - core-order
      - reserved
  - id: codedeploy-002
    q: Why does CodeDeploy skip ApplicationStop on the first deployment to an EC2 instance, and use an
      older script on later deployments?
    a: It reads ApplicationStop from the previous successful revision. No such revision exists on the
      first deployment.
    trap: true
    facts:
      - old-stop
  - id: codedeploy-008
    q: What are the timeout default and event limit for EC2/On-Premises CodeDeploy hook scripts?
    a: A script timeout defaults to 3600 seconds. The total of all script timeout values for one
      lifecycle event must not exceed 3600 seconds.
    facts:
      - timeout
  - id: codedeploy-030
    q: The same CodeDeploy revision goes to staging and production but needs different settings. How can
      an EC2 hook select them?
    a: Read DEPLOYMENT_GROUP_NAME in the hook script and select the environment settings from that
      value.
    facts:
      - env
      - env-use
  - id: codedeploy-044
    q: A CodeDeploy EC2 deployment keeps failing in ApplicationStop even though the new revision fixes
      the script. How can the fixed revision be installed?
    a: Use the ignore-application-stop-failures deployment option. The failing stop hook comes from the
      previous successful revision, so the new script is not used yet.
    trap: true
    facts:
      - old-stop
      - skip-broken-stop
  - id: codedeploy-045
    q: A CodeDeploy EC2 in-place deployment uses a load balancer. When are instances removed from
      traffic and restored?
    a: BeforeBlockTraffic, BlockTraffic, and AfterBlockTraffic precede ApplicationStop.
      BeforeAllowTraffic, AllowTraffic, and AfterAllowTraffic follow ValidateService.
    facts:
      - lb-order
      - lb-events
diagrams:
  - id: codedeploy-ec2-hook-order
    title: EC2 script hooks without load balancing
    width: 1120
    height: 190
    nodes:
      - id: stop
        label: ApplicationStop
        sub: previous revision
        icon: res-document
        x: 25
        y: 40
        w: 180
        h: 86
        tone: user
        info: Skip this hook on the first deployment.
      - id: before
        label: BeforeInstall
        sub: before file copy
        icon: res-document
        x: 245
        y: 40
        w: 180
        h: 86
        tone: user
      - id: after
        label: AfterInstall
        sub: after file copy
        icon: res-document
        x: 465
        y: 40
        w: 180
        h: 86
        tone: user
      - id: start
        label: ApplicationStart
        sub: start application
        icon: res-document
        x: 685
        y: 40
        w: 180
        h: 86
        tone: user
      - id: validate
        label: ValidateService
        sub: check application
        icon: res-document
        x: 905
        y: 40
        w: 190
        h: 86
        tone: user
    edges:
      - from: stop
        to: before
        step: 1
      - from: before
        to: after
        step: 2
      - from: after
        to: start
        step: 3
      - from: start
        to: validate
        step: 4
    steps:
      - After the previous revision stop hook, the agent downloads the bundle and runs BeforeInstall.
      - Install copies files, then AfterInstall runs.
      - ApplicationStart starts the application.
      - ValidateService checks the running application.
---
A lifecycle hook runs your script at a defined point in a deployment. For EC2/On-Premises, the agent follows AppSpec, its deployment instruction file, to stop the old application, install the revision, start it, and check that it works.

### How it works

1. With a load balancer, run `BeforeBlockTraffic`, deregister the instance during `BlockTraffic`, and run `AfterBlockTraffic`.
2. Run `ApplicationStop` from the previous successful revision. Skip it on an instance's first deployment.
3. Download the revision during `DownloadBundle`. Run `BeforeInstall`, copy files during `Install`, and run `AfterInstall`.
4. Run `ApplicationStart` to start the application, then `ValidateService` to check it.
5. With a load balancer, run `BeforeAllowTraffic`, register the instance during `AllowTraffic`, and run `AfterAllowTraffic`.

A load balancer directs requests to registered servers. Its traffic hooks surround the server update. Scripts within an event run sequentially in their AppSpec order; reserved agent operations cannot be replaced by hook scripts.

### Exam cues

- If the question says a new revision cannot fix a broken stop hook, think previous successful revision, because that is where `ApplicationStop` comes from.
- If the question says one revision needs environment-specific settings, think `DEPLOYMENT_GROUP_NAME`, because the agent provides it to hooks.
- If the question says multiple scripts share one event, think one combined timeout budget, because their configured timeouts must fit within the event limit.

### Remember

- Script timeout default: 3600 seconds. Combined timeout values per lifecycle event: at most 3600 seconds.
- Hook context: `APPLICATION_NAME`, `DEPLOYMENT_ID`, `DEPLOYMENT_GROUP_NAME`, `DEPLOYMENT_GROUP_ID`, and `LIFECYCLE_EVENT`.
- `ApplicationStop`, `BeforeBlockTraffic`, and `AfterBlockTraffic` use the previous successful revision. Other scripts use the current revision.
- `DownloadBundle`, `Install`, `BlockTraffic`, and `AllowTraffic` are reserved operations.

> **Trap:** Reordering hook names in YAML does not change lifecycle order. Only scripts within a hook run in the order listed there.
