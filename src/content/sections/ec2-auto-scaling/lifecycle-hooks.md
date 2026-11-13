---
title: Lifecycle hooks
level: associate
order: 50
facts:
  - id: hook
    text: A lifecycle hook pauses instance launch or termination to allow a custom action before the next state.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hooks
  - id: launch
    text: A launch lifecycle hook holds an instance in Pending:Wait before it registers with the load balancer.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-event-reference.html#launch-lifecycle-action
  - id: registration
    text: Completing a launch hook lets Auto Scaling register the initialized instance with its load balancer.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hooks
  - id: terminate
    text: A termination hook pauses an instance in Terminating:Wait so automation can collect logs before termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-event-reference.html#terminate-lifecycle-action
  - id: complete
    text: CompleteLifecycleAction completes a lifecycle action and RecordLifecycleActionHeartbeat extends its wait within the overall timeout.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/completing-lifecycle-hooks.html#completing-lifecycle-hooks
  - id: timeout
    text: The default lifecycle hook heartbeat timeout is one hour.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: global-timeout
    text: A lifecycle hook global timeout is the smaller of 48 hours or 100 times its heartbeat timeout.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: default-result
    text: When a lifecycle hook times out or has an unexpected failure, its default result is ABANDON unless configured otherwise.
    source: https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_PutLifecycleHook.html#API_PutLifecycleHook_RequestParameters
  - id: direct-notification-role
    text: A direct SNS or SQS lifecycle hook notification target requires an IAM role that allows Auto Scaling to publish to the target.
    source: https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_PutLifecycleHook.html#API_PutLifecycleHook_RequestParameters
  - id: launch-result
    text: CONTINUE on a launch lifecycle hook permits the instance to enter service.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: launch-abandon
    text: ABANDON on a launch lifecycle hook permits termination and replacement of the instance.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: termination-result
    text: CONTINUE on a termination hook permits termination after any remaining lifecycle hooks complete.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: termination-abandon
    text: ABANDON on a termination hook permits termination and skips remaining hooks.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: best-effort
    text: Termination lifecycle hooks are best effort by default, and a hook cannot prevent a Spot capacity interruption.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: event-filter
    text: Auto Scaling emits best-effort EventBridge events with source aws.autoscaling for lifecycle wait states and successful or failed scaling actions.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-event-reference.html#ec2-auto-scaling-event-reference
  - id: event-lambda
    text: EventBridge rules can filter lifecycle notifications and route them to Lambda, SNS or SQS.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hooks
  - id: ssm
    text: An EventBridge rule can target Systems Manager Run Command to install software on a newly created Auto Scaling managed node or collect logs before termination.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-systems-manager-targets.html#monitoring-systems-manager-targets
  - id: sns-launch
    text: The autoscaling:EC2_INSTANCE_LAUNCH SNS notification reports a successful launch.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-launch-error
    text: The autoscaling:EC2_INSTANCE_LAUNCH_ERROR SNS notification reports a failed launch.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-terminate
    text: The autoscaling:EC2_INSTANCE_TERMINATE SNS notification reports successful termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-terminate-error
    text: The autoscaling:EC2_INSTANCE_TERMINATE_ERROR SNS notification reports failed termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-email
    text: To receive Auto Scaling event email, create an SNS topic, subscribe and confirm the email address, then configure group notification types; delivery is best effort.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#as-configure-sns
  - id: slow-start
    text: ALB slow start gradually increases traffic to a new healthy target; it is incompatible with least outstanding requests and weighted random routing.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
cards:
  - id: ec2-auto-scaling-014
    q: An EC2 Auto Scaling instance must finish installing software before load balancer registration. What should the group use?
    a: A launch lifecycle hook. Hold the instance in Pending:Wait, finish setup, then complete the lifecycle action with CONTINUE.
    facts:
      - hook
      - launch
      - registration
      - launch-result
      - launch-abandon
  - id: ec2-auto-scaling-015
    q: What does ABANDON do for EC2 Auto Scaling launch and termination lifecycle hooks?
    a: On launch, it permits termination and replacement. On termination, it permits termination and skips remaining hooks; CONTINUE lets remaining hooks complete.
    trap: true
    facts:
      - launch-result
      - launch-abandon
      - termination-result
      - termination-abandon
  - id: ec2-auto-scaling-016
    q: An EC2 Auto Scaling instance must send logs before termination. Which automation fits?
    a: Use a termination lifecycle hook with EventBridge automation, such as Lambda, while the instance waits in Terminating:Wait. Complete the action afterward; the hook cannot prevent a Spot interruption.
    facts:
      - terminate
      - event-lambda
      - complete
      - best-effort
  - id: ec2-auto-scaling-022
    q: An EC2 Auto Scaling application behind an ALB must initialize before registration and receive requests gradually afterward. Which controls fit?
    a: A launch lifecycle hook for setup, then ALB slow start for a gradual traffic increase after the target is healthy.
    facts:
      - registration
      - slow-start
  - id: ec2-auto-scaling-043
    q: How long can an EC2 Auto Scaling lifecycle hook wait, and how can automation keep it alive?
    a: Heartbeat timeout defaults to one hour. RecordLifecycleActionHeartbeat extends the wait, up to the smaller of 48 hours or 100 times the heartbeat timeout.
    facts:
      - timeout
      - global-timeout
      - complete
  - id: ec2-auto-scaling-044
    q: An EC2 Auto Scaling team needs emails for successful launches and terminations. What configuration is required?
    a: Configure an SNS topic with a confirmed email subscription and the group notification types autoscaling:EC2_INSTANCE_LAUNCH and autoscaling:EC2_INSTANCE_TERMINATE.
    facts:
      - sns-launch
      - sns-launch-error
      - sns-terminate
      - sns-terminate-error
      - sns-email
  - id: ec2-auto-scaling-045
    q: Which EC2 Auto Scaling SNS notification types report launch and termination failures?
    a: autoscaling:EC2_INSTANCE_LAUNCH_ERROR and autoscaling:EC2_INSTANCE_TERMINATE_ERROR.
    facts:
      - sns-launch
      - sns-launch-error
      - sns-terminate
      - sns-terminate-error
  - id: ec2-auto-scaling-046
    q: An EC2 Auto Scaling fleet must install software on new managed instances after an event. Which event-driven integration fits?
    a: An EventBridge rule targeting Systems Manager Run Command. Use a launch lifecycle hook when setup must finish before load balancer registration.
    facts:
      - ssm
      - registration
  - id: ec2-auto-scaling-047
    q: An EC2 Auto Scaling team wants different automation for launch waits, termination waits and scaling failures. What should route the events?
    a: EventBridge rules filtering source aws.autoscaling and the event type, then routing matching notifications to the required targets.
    facts:
      - event-filter
      - event-lambda
  - id: ec2-auto-scaling-068
    q: An EC2 Auto Scaling launch lifecycle hook times out without an explicit default result. What happens to the instance?
    a: The default is ABANDON, which permits Auto Scaling to terminate and replace the instance.
    facts:
      - default-result
      - launch-abandon
  - id: ec2-auto-scaling-069
    q: An EC2 Auto Scaling lifecycle hook sends notifications directly to an Amazon SQS queue. What permission configuration does the hook need?
    a: An IAM role that allows Auto Scaling to publish to the queue.
    facts:
      - direct-notification-role
diagrams:
  - id: asg-launch-hook-flow
    title: Launch hook before load balancer registration
    width: 1080
    height: 210
    nodes:
      - id: n0
        label: Launch wait
        sub: Pending:Wait
        icon: res-ec2-instance
        x: 30
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n1
        label: EventBridge
        sub: route notification
        icon: eventbridge
        x: 300
        y: 65
        w: 210
        h: 86
        tone: integration
      - id: n2
        label: Lambda
        sub: setup and CONTINUE
        icon: lambda
        x: 570
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n3
        label: Load balancer
        sub: register instance
        icon: res-elastic-load-balancing-application-load-balancer
        x: 840
        y: 65
        w: 210
        h: 86
        tone: network
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
      - from: n2
        to: n3
        step: 3
    steps:
      - A launch hook pauses the instance and emits an event.
      - An EventBridge rule invokes the setup action.
      - After setup completes with CONTINUE, the instance can register with the load balancer.
---
A lifecycle hook pauses an EC2 Auto Scaling instance while custom work finishes. It lets initialization complete before load balancer registration and gives cleanup automation time before termination. Bootstrapping means installing and configuring the application during startup.

### How it works

1. A launch hook holds the instance in Pending:Wait. Auto Scaling emits a lifecycle event to EventBridge.
2. A script or event-triggered action finishes setup. EventBridge can route notifications to Lambda; a Run Command target can install software on a Systems Manager managed node, meaning an instance managed by Systems Manager.
3. Complete the action with CONTINUE to allow registration and service entry. Send heartbeats if work needs more time, within the global timeout.
4. A termination hook holds an instance in Terminating:Wait while automation collects logs. Completing the action permits termination.
5. For notification emails, configure an SNS topic, confirm the email subscription and select the group's notification types. For filtered automation, match EventBridge source aws.autoscaling and the event type.
6. For a direct SNS or SQS lifecycle hook notification target, supply an IAM role that lets Auto Scaling publish to that target.

| Native SNS notification type | Event |
|---|---|
| autoscaling:EC2_INSTANCE_LAUNCH | Launch succeeded |
| autoscaling:EC2_INSTANCE_LAUNCH_ERROR | Launch failed |
| autoscaling:EC2_INSTANCE_TERMINATE | Termination succeeded |
| autoscaling:EC2_INSTANCE_TERMINATE_ERROR | Termination failed |

### Exam cues

- If the question says finish setup before receiving traffic, think launch hook, because registration waits for the action to complete.
- If the question says collect logs before removal, think termination hook with EventBridge automation, because the instance pauses in Terminating:Wait.
- If the question says initialize first and gradually increase traffic afterward, think launch hook plus ALB slow start, because they control different parts of startup.
- If the question says send scaling event emails, think native SNS notification types and a confirmed subscription, because those notifications report launch and termination outcomes.

### Remember

- Default heartbeat timeout: 1 hour. Global timeout: 48 hours or 100 times heartbeat timeout, whichever is smaller.
- The default result on timeout or unexpected failure is ABANDON unless configured otherwise.
- Launch ABANDON permits termination and replacement. Termination ABANDON skips remaining hooks; CONTINUE lets them finish.
- Lifecycle events and native SNS notifications are best effort.
- Slow start requires a compatible ALB routing algorithm; least outstanding requests and weighted random do not support it.

> **Trap:** A termination hook is best effort by default. It cannot keep a Spot instance alive when capacity is interrupted.
