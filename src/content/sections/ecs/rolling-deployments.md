---
title: Rolling deployments
level: associate
order: 30
facts:
  - id: ecs-rolling-replace
    text: Rolling deployments replace existing ECS service tasks with new tasks under deployment
      configuration limits.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: ecs-rolling-minimum
    text: minimumHealthyPercent sets the healthy task floor relative to desiredCount, rounded up.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html
  - id: ecs-rolling-maximum
    text: maximumPercent caps RUNNING and PENDING tasks relative to desiredCount, rounded down.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html
  - id: ecs-rolling-defaults
    text: REPLICA services default to minimumHealthyPercent 100 and maximumPercent 200.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html
  - id: ecs-rolling-progress
    text: Deployment percentages must allow ECS to start or stop at least one task; otherwise deployment
      cannot progress.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: ecs-rolling-capacity
    text: Starting additional deployment tasks requires sufficient cluster resources.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html
  - id: ecs-rolling-example
    text: With desiredCount 4 and maximumPercent 200, ECS may start four replacement tasks before
      stopping the original four if capacity permits.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html
  - id: ecs-rolling-digest
    text: ECS resolves image tags to digests by default and uses the established digests for other
      service tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: ecs-rolling-force
    text: Forcing a new deployment establishes updated image digests for new tasks without altering
      already running tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: ecs-rolling-platform
    text: A Fargate platform version describes its kernel and container runtime; a revision is an update
      within that version.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-fargate.html
  - id: ecs-rolling-platform-deploy
    text: Changing a Fargate service platform version requires a deployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-fargate.html
  - id: ecs-rolling-platform-scale
    text: Scaling an unchanged Fargate service uses the current deployment platform version and the
      latest revision of that version.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-fargate.html
  - id: ecs-rolling-platform-force
    text: A forced deployment can start Fargate tasks on a newer platform version revision.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-ecs-service-forcenewdeployment.html
cards:
  - id: ecs-001
    q: An ECS service image tag points to a newly pushed image. How should the service adopt it?
    a: Force a new deployment. ECS establishes updated digests for replacement tasks; running tasks keep
      their image.
    trap: true
    facts:
      - ecs-rolling-digest
      - ecs-rolling-force
  - id: ecs-009
    q: What do minimumHealthyPercent and maximumPercent control during an ECS rolling deployment?
    a: The healthy task floor, rounded up, and the RUNNING/PENDING task ceiling, rounded down, relative
      to desiredCount. The settings must permit a task to start or stop.
    facts:
      - ecs-rolling-minimum
      - ecs-rolling-maximum
      - ecs-rolling-progress
  - id: ecs-019
    q: An ECS REPLICA service must retain its healthy task count while replacing tasks. Which deployment
      settings apply?
    a: minimumHealthyPercent 100 keeps the healthy floor at desiredCount; maximumPercent 200 allows
      another desiredCount of tasks when capacity is available. These are the REPLICA defaults.
    facts:
      - ecs-rolling-defaults
      - ecs-rolling-minimum
      - ecs-rolling-maximum
      - ecs-rolling-capacity
  - id: ecs-034
    q: An ECS Fargate service should adopt a different platform version. Will increasing desiredCount do
      it?
    a: No. Update the service platform version and create a deployment. Scale-out alone uses the version
      selected for the current deployment, with its latest patched revision.
    trap: true
    facts:
      - ecs-rolling-platform-deploy
      - ecs-rolling-platform-scale
  - id: ecs-035
    q: How can an ECS Fargate service replace running tasks to receive a newer revision of its selected
      platform version?
    a: Force a new deployment. New tasks use the latest revision of the selected platform version;
      existing tasks keep their runtime revision.
    facts:
      - ecs-rolling-platform
      - ecs-rolling-platform-force
      - ecs-rolling-platform-scale
---

An ECS rolling deployment replaces service tasks while retaining a configured amount of healthy capacity. An image digest is a content identifier for an image; resolving tags to digests keeps a deployment's tasks on the same image.

### How it works

1. ECS starts replacing tasks under two bounds: `minimumHealthyPercent` is the healthy floor, and `maximumPercent` is the ceiling for running or pending tasks.
2. Multiply each percentage by `desiredCount`. Round the minimum up and the maximum down. The settings must leave room to start or stop a task.
3. Supply capacity for any extra tasks. With four desired tasks and a maximum of 200%, ECS can start four replacements before stopping the old four.
4. To adopt a changed image tag, force a new deployment. Updated digests apply to new tasks; existing tasks keep their images.

A Fargate platform version identifies its kernel and container runtime. A patched revision updates that version. Changing the selected version requires a deployment. Scale-out alone retains the current deployment's version and uses its latest revision. Forcing a deployment replaces running tasks so they can receive a newer revision.

### Exam cues

- If the question says an ECS deployment cannot start or stop tasks, think percentage bounds and capacity, because rounding can leave no legal move.
- If the question says an image was pushed under the same tag, think force a new deployment, because existing tasks retain their images.
- If the question says Fargate scale-out must upgrade the platform version, think service update and deployment, because scale-out retains the current version selection.

### Remember

- `REPLICA` defaults: minimum 100%, maximum 200%.
- Minimum rounds up; maximum rounds down.
- `maximumPercent` includes `RUNNING` and `PENDING` tasks.

> **Trap:** Selecting a new image tag or platform version does not modify the runtime of an already running task.
