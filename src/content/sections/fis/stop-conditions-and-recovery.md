---
title: Stop conditions and recovery
level: professional
order: 20
facts:
  - id: stop-steady
    text: A steady state describes acceptable workload behavior using business or technical metrics such
      as latency, CPU load, or retries.
    source: https://docs.aws.amazon.com/fis/latest/userguide/stop-conditions.html#stop-conditions
  - id: stop-alarm
    text: An FIS stop condition references a CloudWatch alarm; if its threshold is reached during the
      experiment, FIS stops the experiment.
    source: https://docs.aws.amazon.com/fis/latest/userguide/stop-conditions.html#stop-conditions
  - id: stop-syntax
    text: A CloudWatch stop condition uses source aws:cloudwatch:alarm and the alarm ARN as value;
      source none declares no stop condition.
    source: https://docs.aws.amazon.com/fis/latest/userguide/stop-conditions.html#stop-condition-syntax
  - id: stop-manual
    text: A running FIS experiment can be stopped manually at any time; a stopped experiment cannot be
      resumed.
    source: https://docs.aws.amazon.com/fis/latest/userguide/stop-experiment.html#stop-experiment
  - id: stop-post
    text: When an FIS experiment is stopped, pending post actions finish before the experiment stops.
    source: https://docs.aws.amazon.com/fis/latest/userguide/stop-experiment.html#stop-experiment
  - id: stop-limits
    text: Only some actions support post actions that restore prior state; a terminated EC2 instance
      cannot be recovered by a post action.
    source: https://docs.aws.amazon.com/fis/latest/userguide/action-sequence.html#action-parameters
  - id: stop-restart
    text: The FIS stop-instances parameter startInstancesAfterDuration optionally starts stopped
      instances after a configured interval.
    source: https://docs.aws.amazon.com/fis/latest/userguide/fis-actions-reference.html#stop-instances
  - id: stop-asg
    text: An Auto Scaling group can terminate an FIS-stopped instance before restart;
      completeIfInstancesTerminated can allow that action to complete and defaults to false.
    source: https://docs.aws.amazon.com/fis/latest/userguide/fis-actions-reference.html#stop-instances
  - id: stop-safety
    text: A safety lever stops running FIS experiments and prevents new ones in its account and Region;
      safety levers are disengaged by default.
    source: https://docs.aws.amazon.com/fis/latest/userguide/safety-lever.html#safety-lever
  - id: stop-new
    text: After a safety lever is disengaged, a new experiment can be started from the same template,
      but a stopped or cancelled experiment cannot resume.
    source: https://docs.aws.amazon.com/fis/latest/userguide/safety-lever.html#safety-lever
  - id: stop-preprod
    text: AWS recommends planning and running FIS experiments in pre-production before production
      because faults affect real resources.
    source: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is
  - id: stop-arn
    text: An Amazon Resource Name, or ARN, uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
cards:
  - id: fis-003
    q: An FIS checkout test must stop when the error rate reaches an unacceptable threshold. How should
      the team configure it?
    a: Create a CloudWatch alarm on the error metric and add it as a stop condition with source
      aws:cloudwatch:alarm and the alarm ARN as value.
    facts:
      - stop-alarm
      - stop-syntax
  - id: fis-004
    q: A team uses FIS to terminate instances. Will stopping the experiment restore those instances?
    a: No. FIS finishes pending supported post actions before stopping, but termination cannot be
      reversed. A stopped experiment cannot resume.
    trap: true
    facts:
      - stop-post
      - stop-limits
      - stop-manual
  - id: fis-011
    q: An FIS stop-instances experiment should restart its instances later. Which parameter provides
      that behavior, and what can interfere?
    a: Set startInstancesAfterDuration. Auto Scaling can terminate a stopped instance before restart;
      completeIfInstancesTerminated controls whether that case fails the action and defaults to
      false.
    facts:
      - stop-restart
      - stop-asg
  - id: fis-012
    q: An operator must stop all FIS experiments and prevent new experiments in an account and Region
      during an incident. Which control fits?
    a: Engage the FIS safety lever for that account and Region. It stops in-progress experiments and
      prevents new starts.
    facts:
      - stop-safety
  - id: fis-013
    q: Can a stopped FIS experiment resume from its interrupted action?
    a: No. Start a new experiment from the template when appropriate; if a safety lever stopped it,
      disengage that lever before a new run.
    trap: true
    facts:
      - stop-manual
      - stop-new
  - id: fis-014
    q: What does source none mean in an FIS template stopConditions entry?
    a: No stop condition is configured. To stop on workload health, reference a CloudWatch alarm with
      source aws:cloudwatch:alarm.
    facts:
      - stop-syntax
diagrams:
  - id: fis-stop-condition
    title: A workload alarm stops the FIS experiment
    width: 800
    height: 300
    nodes:
      - id: alarm
        label: Health alarm
        icon: res-cloudwatch-alarm
        x: 40
        y: 90
        w: 160
        h: 72
        tone: mgmt
        info: A CloudWatch alarm expresses the workload threshold chosen as a stop condition.
      - id: experiment
        label: FIS experiment
        icon: fault-injection-service
        x: 320
        y: 90
        w: 160
        h: 72
        tone: mgmt
        info: The referenced stop condition causes FIS to stop the running experiment.
      - id: recovery
        label: Post actions
        icon: fault-injection-service
        x: 600
        y: 90
        w: 160
        h: 72
        tone: mgmt
        info: Pending supported post actions finish before stopping completes. Terminated resources cannot
          be restored.
    edges:
      - from: alarm
        to: experiment
        label: threshold
        step: 1
      - from: experiment
        to: recovery
        label: finish
        step: 2
    steps:
      - The CloudWatch alarm threshold triggers the experiment stop condition.
      - FIS completes pending supported post actions before the experiment stops.
---

FIS stop conditions bound an experiment using workload health. Define the steady state, meaning acceptable behavior measured by business or technical metrics, and create an alarm for a deviation that should stop the test.

### How it works

1. Choose a metric such as latency or errors that represents acceptable behavior. Plan recovery and test in pre-production because FIS changes real resources.
2. Create a CloudWatch alarm and reference its Amazon Resource Name, or ARN, in a stop condition with `source: aws:cloudwatch:alarm`.
3. FIS stops the experiment when that alarm threshold is reached. An operator can also stop a running experiment manually.
4. Before stopping completes, FIS finishes pending post actions, the supported actions that restore a target's prior state. Recovery depends on the fault: termination has no reversal.
5. To stop all experiments and prevent new starts in the account and Region, engage the safety lever. A stopped experiment cannot resume; use a new experiment when another run is appropriate.

### Exam cues

- If the question says stop a test automatically when checkout errors rise, think a CloudWatch alarm stop condition, because it ties experiment stopping to workload health.
- If the question says stopped faults must all roll back, think action-specific recovery, because only some actions support post actions.
- If the question says prevent every new experiment during an incident, think the safety lever, because an individual experiment stop does not provide that account and Region control.

### Remember

- Stop condition source: `aws:cloudwatch:alarm`; its value is the alarm ARN.
- `source: none` declares no stop condition.
- `startInstancesAfterDuration` optionally restarts stopped instances. Terminated instances cannot restart.
- `completeIfInstancesTerminated` defaults to `false`.
- Safety levers are disengaged by default and apply per account and Region.

> **Trap:** Stopping an experiment does not reverse every effect. Check the action's recovery behavior, especially when termination or Auto Scaling has removed an instance.
