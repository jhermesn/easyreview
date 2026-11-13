---
title: Task troubleshooting
level: associate
order: 80
facts:
  - id: ecs-diagnose-service-events
    text: The ECS service event log is the first diagnostic source for service scheduling and
      instance-health problems.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-event-messages.html
  - id: ecs-diagnose-describe
    text: DescribeTasks exposes stopped task details including stopCode, stoppedReason, and container
      reason.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html
  - id: ecs-diagnose-exit
    text: ECS container details can include exitCode and reason for diagnosing a stopped container.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_Container.html
  - id: ecs-diagnose-retention
    text: Stopped tasks remain visible in the ECS console for one hour.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html
  - id: ecs-diagnose-agent
    text: On EC2, container runtime and ECS agent logs provide host-level diagnostic information.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html
  - id: ecs-diagnose-awslogs
    text: The awslogs driver forwards container STDOUT and STDERR to CloudWatch Logs.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
  - id: ecs-diagnose-config
    text: Fargate container logs require logConfiguration in the task definition to enable awslogs.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
  - id: ecs-diagnose-driver
    text: Custom EC2 AMIs must advertise awslogs through ECS_AVAILABLE_LOGGING_DRIVERS when starting the
      ECS agent.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
  - id: ecs-diagnose-options
    text: awslogs-region selects the destination Region, awslogs-group selects a log group, and
      awslogs-stream-prefix is required on Fargate.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LogConfiguration.html
  - id: ecs-diagnose-group
    text: awslogs-create-group defaults to false; automatic creation requires logs:CreateLogGroup
      permission.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LogConfiguration.html
  - id: ecs-diagnose-log-permissions
    text: Container log delivery requires logs:CreateLogStream and logs:PutLogEvents permissions.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
  - id: ecs-diagnose-sidecar
    text: An application can write log files to a shared task volume that a Fluent Bit sidecar reads
      with its tail input and forwards to CloudWatch.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/firelens-docker-buffer-limit.html
  - id: ecs-diagnose-firelens
    text: FireLens uses Fluent Bit or Fluentd to route ECS container logs to AWS services or external
      destinations.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
  - id: ecs-diagnose-order
    text: ECS starts the FireLens container before dependent application containers and stops it after
      them by default.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
  - id: ecs-diagnose-state
    text: ECS Task State Change events for stopped tasks contain stoppedReason and stopCode.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_task_events.html
  - id: ecs-diagnose-alert
    text: An EventBridge rule can match stopped ECS task events and send an SNS alert.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_task_events.html
  - id: ecs-diagnose-health
    text: Task health is absent from ECS task state-change events; DescribeTasks can retrieve it.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_task_events.html
  - id: ecs-diagnose-no-extra-agent
    text: The awslogs Docker logging driver sends container output directly to CloudWatch Logs without a
      separate CloudWatch Logs agent for those streams.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
  - id: ecs-diagnose-image
    text: Image pull failures can result from a missing image, pull permissions, or connectivity to the
      registry.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_cannot_pull_image.html
  - id: ecs-diagnose-pull-role
    text: Fargate image-pull permissions use the task execution role; EC2 image-pull permissions use the
      container instance role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_cannot_pull_image.html
  - id: ecs-diagnose-initialization
    text: Secret initialization failures can indicate missing secrets, missing execution-role
      permissions, or network connectivity failures.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/resource-initialization-error.html
  - id: ecs-diagnose-missing-group
    text: A logging-driver initialization failure can be caused by a missing CloudWatch log group named
      in the task definition.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/resource-initialization-error.html
  - id: ecs-diagnose-oom
    text: OutOfMemoryError can indicate that container processes exceeded task-definition memory
      allocation or host operating-system constraints.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/out-of-memory.html
  - id: ecs-diagnose-log-group
    text: A CloudWatch Logs group contains log streams with common retention, monitoring, and access
      settings.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html
  - id: ecs-diagnose-log-stream
    text: A CloudWatch Logs stream is a sequence of events from the same log source.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html
  - id: ecs-diagnose-exec
    text: ECS Exec uses Systems Manager Session Manager to run commands in containers without opening
      inbound ports or managing SSH keys; it must be enabled for new tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html#ecs-exec
  - id: ecs-diagnose-exec-role
    text: ECS Exec needs ssmmessages CreateControlChannel, CreateDataChannel, OpenControlChannel, and
      OpenDataChannel permissions on the task IAM role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#ecs-exec-required-iam-permissions
  - id: ecs-diagnose-exec-root
    text: ECS Exec commands run as root and require a writable container file system for the Systems
      Manager agent; readonlyRootFilesystem is not supported.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html#ecs-exec-considerations
  - id: ecs-diagnose-exec-endpoint
    text: ECS Exec using interface VPC endpoints requires the Systems Manager ssmmessages endpoint; a
      KMS interface endpoint is also required when using a KMS key for encryption.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html#ecs-exec-considerations
  - id: ecs-diagnose-exec-timeout
    text: ECS Exec has a fixed 20-minute idle timeout and does not support IPv6-only tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html#ecs-exec-considerations
diagrams:
  - id: ecs-stopped-task-alert
    title: Stopped tasks trigger notifications
    width: 800
    height: 220
    nodes:
      - id: task
        label: ECS task
        icon: res-elastic-container-service-task
        x: 30
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: STOPPED event
      - id: events
        label: EventBridge
        icon: eventbridge
        x: 310
        y: 65
        w: 180
        h: 86
        tone: integration
        sub: match task state
      - id: sns
        label: SNS
        icon: simple-notification-service
        x: 590
        y: 65
        w: 180
        h: 86
        tone: integration
        sub: notify operators
    edges:
      - from: task
        to: events
        step: 1
      - from: events
        to: sns
        step: 2
    steps:
      - ECS emits a task-state event including the stop reason.
      - An EventBridge rule forwards matched stopped-task events to an SNS notification target.
cards:
  - id: ecs-017
    q: How should an ECS task that repeatedly stops be diagnosed?
    a: Read service events, then DescribeTasks stopCode, stoppedReason, container reason, and exitCode.
      Inspect application logs and EC2 agent/runtime logs when relevant.
    facts:
      - ecs-diagnose-service-events
      - ecs-diagnose-describe
      - ecs-diagnose-exit
      - ecs-diagnose-agent
  - id: ecs-048
    q: An ECS task writes logs to STDOUT and STDERR. How can those streams reach CloudWatch Logs?
    a: Set each container logConfiguration to use awslogs and configure its destination and permissions.
      The driver forwards the streams directly.
    facts:
      - ecs-diagnose-awslogs
      - ecs-diagnose-config
      - ecs-diagnose-options
      - ecs-diagnose-log-permissions
  - id: ecs-049
    q: An ECS service uses a custom EC2 AMI and cannot place tasks using awslogs. What host
      configuration should be checked?
    a: Advertise awslogs in ECS_AVAILABLE_LOGGING_DRIVERS when starting the ECS agent. Also check log
      delivery permissions.
    facts:
      - ecs-diagnose-driver
      - ecs-diagnose-log-permissions
  - id: ecs-050
    q: An ECS application writes only to log files and cannot be changed. How can CloudWatch receive
      them?
    a: Mount a shared volume and use a Fluent Bit sidecar to read the files and forward them.
      A sidecar is a helper container running alongside the application.
    facts:
      - ecs-diagnose-sidecar
  - id: ecs-051
    q: An ECS task must send container logs to an external logging destination. Which routing feature
      fits?
    a: Use FireLens with Fluent Bit or Fluentd. ECS starts the log router before dependent application
      containers by default.
    facts:
      - ecs-diagnose-firelens
      - ecs-diagnose-order
  - id: ecs-052
    q: An ECS operations team needs an alert containing why a task stopped. What event should it
      capture?
    a: Match ECS Task State Change events with STOPPED status in EventBridge and send them to SNS. Read
      stoppedReason and stopCode.
    facts:
      - ecs-diagnose-state
      - ecs-diagnose-alert
  - id: ecs-053
    q: An ECS task-state event has no task health field. How should health be retrieved?
    a: Use DescribeTasks. Task health is not included in task state-change events.
    trap: true
    facts:
      - ecs-diagnose-health
  - id: ecs-056
    q: Must an ECS team install a separate CloudWatch Logs agent to send container STDOUT and STDERR to
      CloudWatch?
    a: No. Configure awslogs in the container logConfiguration; the Docker logging driver forwards those
      streams. File logs may need a sidecar or another collection method.
    trap: true
    facts:
      - ecs-diagnose-awslogs
      - ecs-diagnose-config
      - ecs-diagnose-no-extra-agent
      - ecs-diagnose-sidecar
  - id: ecs-058
    q: An ECS Fargate task fails with CannotPullContainerError. Which checks come first?
    a: Confirm the image exists, the task execution role can pull it, and the task can reach the
      registry. EC2 image pulls use the container instance role.
    facts:
      - ecs-diagnose-image
      - ecs-diagnose-pull-role
  - id: ecs-059
    q: An ECS task exits with OutOfMemoryError. What does that indicate?
    a: The application may have exceeded its configured memory allocation, or host operating-system
      constraints caused the exit. Compare usage with the task definition and host limits.
    facts:
      - ecs-diagnose-oom
  - id: ecs-060
    q: An ECS task cannot retrieve an injected secret and reports ResourceInitializationError. What
      should be inspected?
    a: Check the secret exists, the execution role has retrieval permissions, and the task can reach the
      secret service. Read the specific initialization message before changing permissions.
    facts:
      - ecs-diagnose-initialization
  - id: ecs-066
    q: An operator needs a shell in a new ECS Fargate task without opening inbound SSH. Which feature
      and permissions are required?
    a: Enable ECS Exec for the task and grant the task role the required ssmmessages control and data
      channel permissions. ECS Exec uses Systems Manager Session Manager.
    facts:
      - ecs-diagnose-exec
      - ecs-diagnose-exec-role
  - id: ecs-067
    q: An ECS Fargate task has a read-only root file system and ECS Exec fails. What constraint
      explains the failure?
    a: The Systems Manager agent requires a writable container file system. ECS Exec commands run as
      root, and readonlyRootFilesystem is unsupported.
    facts:
      - ecs-diagnose-exec-root
  - id: ecs-068
    q: A private ECS task uses VPC endpoints and cannot establish an ECS Exec session. Which endpoint
      is required, and what is the session idle timeout?
    a: Provide the ssmmessages interface endpoint. Add a KMS endpoint when using a KMS encryption key.
      ECS Exec has a fixed 20-minute idle timeout.
    facts:
      - ecs-diagnose-exec-endpoint
      - ecs-diagnose-exec-timeout
---

ECS task troubleshooting connects scheduler messages, stop reasons, and application logs. Each explains a different part of a failure: placement, task termination, or application behavior.

### How it works

1. For a service problem, read the service event log first. It reports scheduling and instance-health issues.
2. Inspect the stopped task with `DescribeTasks`. Read `stopCode`, `stoppedReason`, and container `reason` and `exitCode`. On EC2, inspect agent and container runtime logs as well.
3. Configure each application's `logConfiguration` with `awslogs`. Standard output (STDOUT) and standard error (STDERR) are the process's normal and error output streams; the driver forwards them directly to CloudWatch Logs without a separate CloudWatch Logs agent for those streams.
4. Set the log group and Region, plus a stream prefix on Fargate. A log group holds related streams; a stream holds one source's log events. Grant `logs:CreateLogStream` and `logs:PutLogEvents`. On a custom EC2 image, advertise `awslogs` through `ECS_AVAILABLE_LOGGING_DRIVERS`.
5. Capture `ECS Task State Change` events in EventBridge. Filter for stopped tasks and forward to SNS, a notification destination. Events include `stoppedReason` and `stopCode`; retrieve health separately through `DescribeTasks`.
6. For interactive diagnosis without inbound SSH, enable ECS Exec on new tasks. It uses Systems Manager Session Manager and requires task-role `ssmmessages` channel permissions. For private endpoint access, add the `ssmmessages` interface endpoint and, when using a KMS key, a KMS endpoint.

| Application output | Collection approach |
| --- | --- |
| STDOUT and STDERR | `awslogs` forwards directly to CloudWatch Logs |
| Files inside the task | Shared volume plus a Fluent Bit sidecar, a helper container that forwards the files |
| Logs for external destinations | FireLens router using Fluent Bit or Fluentd |

Match the stop message to the failing operation:

| Symptom | Check |
| --- | --- |
| Image pull failure | Image existence, registry connectivity, and pull permissions; Fargate uses the execution role, EC2 the instance role |
| Secret initialization failure | Secret existence, agent execution-role permissions, and service connectivity |
| Logging-driver initialization failure | Whether the named CloudWatch log group exists |
| `OutOfMemoryError` | Container memory usage against its task-definition allocation and host constraints |

### Exam cues

- If the question says an ECS service cannot place tasks, think service events, because the scheduler reports placement failures there.
- If the question says the application only writes files, think shared-volume sidecar, because `awslogs` forwards output streams.
- If the question says alert when ECS tasks stop, think EventBridge task-state events and SNS, because the events include stop reasons.
- If the question says diagnose a running container without SSH, think ECS Exec, because it connects through Systems Manager Session Manager.

### Remember

- Stopped tasks appear in the console for one hour.
- `awslogs-create-group` defaults to false; automatic creation needs `logs:CreateLogGroup`.
- FireLens starts before dependent application containers and stops after them by default.
- ECS Exec needs a writable container file system, runs commands as root, and has a fixed 20-minute idle timeout. IPv6-only tasks are not supported.

> **Trap:** A task-state event does not include task health. Call `DescribeTasks` for that information.
