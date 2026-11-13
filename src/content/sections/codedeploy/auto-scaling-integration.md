---
title: Auto Scaling integration
level: professional
order: 100
facts:
  - id: group-name
    text: A CodeDeploy deployment group integrates with an Auto Scaling group by specifying its name and
      an appropriate service role.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-deploy
  - id: launch-hook
    text: CodeDeploy installs an Auto Scaling launch hook that cannot be disabled.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors
  - id: launch-wait
    text: During an Auto Scaling launch deployment, the instance remains in Pending:Wait while
      CodeDeploy installs the revision.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-hook-usage
  - id: launch-result
    text: A successful launch deployment signals CONTINUE; a failed launch deployment signals ABANDON
      and the instance is terminated.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-hook-usage
  - id: queue
    text: The launch hook notifies an SQS queue polled by CodeDeploy, which starts the launch deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-hook-usage
  - id: old-revision
    text: Instances launched while a deployment is underway receive the previously deployed revision.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-mixed-environment
  - id: follow-on
    text: After a successful rollout, CodeDeploy starts a follow-on deployment to update instances left
      on the older revision.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-mixed-environment
  - id: outdated-option
    text: The outdatedInstancesStrategy setting uses UPDATE to enable automatic outdated-instance
      updates and IGNORE to disable them.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: scheduled
    text: CodeDeploy can suspend ScheduledActions during in-place deployment; this does not prevent
      scale-out driven by scaling policies.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-mixed-environment
  - id: termination
    text: The optional termination hook runs a termination deployment of shutdown lifecycle events
      before scale-in, without installing a revision.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-hook-enable
  - id: termination-result
    text: A termination deployment allows instance termination to continue whether its shutdown hooks
      succeed or fail.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-hook-enable
  - id: custom-order
    text: Execution order of custom Auto Scaling lifecycle hooks relative to CodeDeploy events cannot be
      predetermined.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-hook-order
  - id: scale-in-risk
    text: Scale-in during deployment can interrupt instance hooks and fail the deployment if healthy
      capacity falls below the required minimum.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-scale-in
  - id: hook-definition
    text: An Auto Scaling lifecycle hook pauses a launch or termination transition while additional work
      runs.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-hook-usage
  - id: queue-definition
    text: An SQS queue stores messages until consumers retrieve them.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html#welcome
  - id: multiple-groups
    text: With multiple CodeDeploy deployment groups on one Auto Scaling group, a failed deployment
      can cause instance shutdown while other deployments take up to an hour to time out.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling
  - id: agent-launch-timeout
    text: CodeDeploy waits one hour for an agent to respond to pending deployments; lengthy instance
      initialization can prevent the agent from being ready in time.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-general
cards:
  - id: codedeploy-009
    q: An Auto Scaling group adds instances during a CodeDeploy rollout. Which revision do those new
      instances receive, and how do they catch up?
    a: They receive the previously deployed revision. After the rollout succeeds, CodeDeploy starts a
      follow-on deployment to update outdated instances unless those automatic updates are disabled.
    trap: true
    facts:
      - old-revision
      - follow-on
      - outdated-option
  - id: codedeploy-010
    q: How does CodeDeploy integrate with Auto Scaling instance launches and terminations?
    a: The mandatory launch hook holds the instance in Pending:Wait for deployment, then signals
      CONTINUE or ABANDON. An optional termination hook runs shutdown events before scale-in.
    facts:
      - launch-hook
      - launch-wait
      - launch-result
      - termination
  - id: codedeploy-057
    q: A CodeDeploy deployment needs graceful application shutdown during Auto Scaling scale-in. What
      should be enabled?
    a: Add a termination hook to the Auto Scaling groups and attach shutdown scripts to supported events
      such as ApplicationStop. Termination proceeds even if those scripts fail.
    facts:
      - termination
      - termination-result
  - id: codedeploy-058
    q: A CodeDeploy team suspended ScheduledActions but a scaling policy still launched instances during
      deployment. Is this expected?
    a: Yes. Suspending scheduled actions does not block scaling-policy scale-outs.
    trap: true
    facts:
      - scheduled
  - id: codedeploy-059
    q: A team adds a custom Auto Scaling hook to guarantee bootstrap completes before CodeDeploy runs.
      Does the hook guarantee order?
    a: No. Custom hook order relative to CodeDeploy events is not predetermined.
    trap: true
    facts:
      - custom-order
  - id: codedeploy-069
    q: Several CodeDeploy deployment groups share an EC2 Auto Scaling group. One launch deployment
      fails and the instance shuts down. Why can other deployments remain pending?
    a: Other deployments on the shutting-down instance can take up to an hour to time out. Avoid
      associating multiple deployment groups with the same Auto Scaling group.
    facts:
      - multiple-groups
  - id: codedeploy-070
    q: A new Auto Scaling instance spends over an hour initializing before its CodeDeploy agent starts.
      Why can its launch deployment fail?
    a: CodeDeploy waits one hour for the agent to respond to pending deployments. Move lengthy
      initialization into the revision so the agent can start in time.
    facts:
      - agent-launch-timeout
diagrams:
  - id: codedeploy-autoscaling-launch
    title: Auto Scaling waits for a launch deployment
    width: 1100
    height: 210
    nodes:
      - id: asg
        label: Launch hook
        sub: instance Pending:Wait
        icon: res-ec2-auto-scaling
        x: 25
        y: 45
        w: 220
        h: 86
        tone: compute
      - id: queue
        label: Launch notice
        sub: polled by CodeDeploy
        icon: simple-queue-service
        x: 305
        y: 45
        w: 220
        h: 86
        tone: integration
      - id: deploy
        label: CodeDeploy
        sub: launch deployment
        icon: codedeploy
        x: 585
        y: 45
        w: 220
        h: 86
        tone: devtools
      - id: instance
        label: Launch result
        sub: CONTINUE or ABANDON
        icon: res-ec2-instance
        x: 865
        y: 45
        w: 210
        h: 86
        tone: compute
        info: CONTINUE lets Auto Scaling finish launching. ABANDON causes instance termination.
    edges:
      - from: asg
        to: queue
        step: 1
      - from: queue
        to: deploy
        step: 2
      - from: deploy
        to: instance
        step: 3
    steps:
      - The Auto Scaling launch hook sends an SQS notification while the instance waits.
      - CodeDeploy polls SQS and starts the launch deployment.
      - After deploying, CodeDeploy signals CONTINUE on success or ABANDON on failure.
---
CodeDeploy integrates with Auto Scaling so a newly launched EC2 instance receives application code before it enters service. A lifecycle hook pauses an Auto Scaling state transition while deployment work runs.

### How it works

1. Name the Auto Scaling group in a CodeDeploy deployment group and provide the service role. CodeDeploy installs its mandatory launch hook.
2. A new instance enters `Pending:Wait`, a paused launch state. The hook notifies an SQS queue, a message buffer that CodeDeploy polls.
3. CodeDeploy deploys to the waiting instance. Success signals `CONTINUE`; failure signals `ABANDON`, causing Auto Scaling to terminate it.
4. If scale-out occurs during an existing rollout, deploy the previously deployed revision to new instances. After that rollout succeeds, a follow-on deployment brings outdated instances up to date.
5. Optionally enable a termination hook. It runs shutdown lifecycle events before scale-in, meaning removal of instances, without installing new code. Termination continues even if shutdown scripts fail.

### Exam cues

- If the question says new instances have older code during a rollout, think launch deployment followed by an update, because CodeDeploy initially uses the previously deployed revision.
- If the question says graceful shutdown before scale-in, think optional termination hook, because launch hooks only cover startup.
- If the question says scheduled actions are suspended but instances still launch, think scaling policies, because `ScheduledActions` does not block their scale-out.
- If an instance shuts down after one launch deployment fails while other CodeDeploy deployments remain pending, check for multiple deployment groups sharing the Auto Scaling group.

### Remember

- Launch hook: always enabled. Termination hook: optional.
- `outdatedInstancesStrategy`: `UPDATE` enables follow-on updates; `IGNORE` disables them.
- Custom Auto Scaling hooks have no guaranteed order relative to CodeDeploy events.
- Scale-in during deployment can interrupt hooks and violate minimum healthy capacity.
- CodeDeploy waits one hour for the agent to respond to pending deployments.

> **Trap:** Failure during launch and failure during shutdown have different outcomes. Launch failure abandons the instance; shutdown failure still allows termination.
