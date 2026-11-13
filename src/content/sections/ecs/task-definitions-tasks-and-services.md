---
title: Task definitions, tasks, and services
level: associate
order: 10
facts:
  - id: ecs-model-definition
    text: A task definition is a JSON description of the containers and settings used to run an
      application.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
  - id: ecs-model-settings
    text: Task definitions specify container images, CPU, memory, networking, logging, volumes, and an
      application IAM role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
  - id: ecs-model-task
    text: A task is an instance of a task definition inside a cluster.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
  - id: ecs-model-service
    text: A service maintains its desired task count and replaces failed or stopped tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html
  - id: ecs-model-standalone
    text: Standalone tasks suit batch jobs and work that runs once rather than continuously.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduling_tasks.html
  - id: ecs-model-events
    text: EventBridge rules can target ECS tasks, and EventBridge Scheduler can start tasks on a
      schedule.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduling_tasks.html
  - id: ecs-model-stop
    text: StopTask stops the specified running task.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_StopTask.html
  - id: ecs-model-replica
    text: REPLICA maintains a desired task count across a cluster.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_service-options.html#service_scheduler_replica
  - id: ecs-model-daemon
    text: DAEMON places one task on every eligible active container instance and is unsupported on
      Fargate.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_service-options.html#service_scheduler_daemon
  - id: ecs-model-dockerfile
    text: A Dockerfile describes an image build; docker build builds an image, docker run starts it, and
      docker tag names it for a registry.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html
  - id: ecs-model-registry
    text: An image can be tested locally, tagged with an ECR repository URI, and pushed to ECR for a
      task definition to reference.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html
  - id: ecs-model-layers
    text: Image layers are read-only; each container adds its own writable layer.
    source: https://docs.aws.amazon.com/pdfs/AmazonECS/latest/bestpracticesguide/bestpracticesguide.pdf
  - id: ecs-model-disposable
    text: Changes in a container writable layer do not survive container replacement; persistent data
      needs external storage.
    source: https://docs.aws.amazon.com/pdfs/AmazonECS/latest/bestpracticesguide/bestpracticesguide.pdf
  - id: ecs-model-efs
    text: EFS provides shared persistent file storage for Linux tasks on EC2 and Fargate.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html
  - id: ecs-model-efs-version
    text: Fargate Linux supports EFS starting with platform version 1.4.0.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html
  - id: ecs-model-s3-files
    text: An S3 Files volume mounts a file-system interface to S3 bucket data using
      s3filesVolumeConfiguration.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/s3files-volumes.html
  - id: ecs-model-s3-security
    text: S3 Files volumes require a task IAM role and enforce encryption in transit.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/s3files-volumes.html
  - id: ecs-model-ebs
    text: EBS task volumes support EC2 and Fargate; service-task volumes are ephemeral, while
      standalone-task volumes can persist.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html
  - id: ecs-model-bind
    text: Bind mounts can share files between containers in a task and are an ephemeral storage option.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html
  - id: ecs-model-load-balancers
    text: Fargate services support Application, Network, and Gateway Load Balancers.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html
  - id: ecs-model-routing
    text: Application Load Balancers route HTTP/HTTPS; Network Load Balancers route TCP/UDP; Gateway
      Load Balancers serve virtual appliances.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html
  - id: ecs-model-classic
    text: Classic Load Balancers are not supported for Fargate services.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
  - id: ecs-model-awsvpc
    text: Fargate requires awsvpc networking; its tasks have an elastic network interface.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
  - id: ecs-model-ip
    text: Fargate service load balancer target groups must use ip targets rather than instance targets.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
  - id: ecs-model-container
    text: Containers package an application with the dependencies needed to run it.
    source: https://aws.amazon.com/what-is/containerization/
  - id: ecs-model-volume
    text: A task volume exposes a storage location to its containers.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html
  - id: ecs-model-s3-date
    text: Amazon S3 Files launched in April 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-s3-files/
diagrams:
  - id: ecs-service-replacement
    title: A service replaces a stopped task
    width: 800
    height: 220
    nodes:
      - id: service
        label: ECS service
        icon: elastic-container-service
        x: 30
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: maintain desired count
      - id: stopped
        label: Stopped task
        icon: res-elastic-container-service-task
        x: 310
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: StopTask or failure
      - id: replacement
        label: Replacement task
        icon: res-elastic-container-service-task
        x: 590
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: restore desired count
    edges:
      - from: service
        to: stopped
        step: 1
      - from: stopped
        to: replacement
        step: 2
    steps:
      - A service task stops or fails.
      - The service scheduler launches a replacement to maintain its desired count.
cards:
  - id: ecs-002
    q: How do an ECS task definition, task, and service differ?
    a: "Definition: container configuration. Task: an instance of it. Service: maintains the desired
      task count. Fargate supports REPLICA, not DAEMON."
    facts:
      - ecs-model-definition
      - ecs-model-task
      - ecs-model-service
      - ecs-model-replica
      - ecs-model-daemon
  - id: ecs-024
    q: An ECS service task is stopped with StopTask, but another task appears. Why?
    a: The service replaces stopped tasks to maintain its desired count. StopTask stops a task; it does
      not reduce the service desired count.
    trap: true
    facts:
      - ecs-model-stop
      - ecs-model-service
  - id: ecs-025
    q: A nightly container job on ECS must finish and exit. How should it run?
    a: Use an EventBridge Scheduler schedule to launch a standalone task. A continuously maintained
      service is suited to long-running work.
    facts:
      - ecs-model-events
      - ecs-model-standalone
  - id: ecs-026
    q: How do you prepare a container image for an ECS task definition?
    a: Write a Dockerfile, build and run the image locally, tag it with the ECR repository URI, and push
      it. Reference the image in the task definition.
    facts:
      - ecs-model-dockerfile
      - ecs-model-registry
  - id: ecs-027
    q: Two Linux ECS tasks on Fargate must share files after either task is replaced. Which storage
      fits?
    a: Use an EFS volume. It provides shared persistent storage; the container writable layer is
      disposable. Fargate Linux requires platform version 1.4.0 or later.
    facts:
      - ecs-model-efs
      - ecs-model-efs-version
      - ecs-model-disposable
  - id: ecs-028
    q: An ECS application needs file operations on data held in an S3 bucket. Which volume option fits?
    a: Use S3 Files with s3filesVolumeConfiguration. Configure a task IAM role; encryption in transit is
      mandatory.
    facts:
      - ecs-model-s3-files
      - ecs-model-s3-security
  - id: ecs-029
    q: Will an EBS volume attached to an ECS service task automatically preserve application data after
      that task ends?
    a: No. EBS volumes attached to service tasks are ephemeral. Standalone-task volumes can persist; EFS
      is shared persistent file storage.
    trap: true
    facts:
      - ecs-model-ebs
      - ecs-model-efs
  - id: ecs-030
    q: Which load balancer should an ECS Fargate HTTP service use for application routing?
    a: Use an Application Load Balancer. Fargate also supports Network Load Balancers for TCP/UDP and
      Gateway Load Balancers for virtual appliances.
    facts:
      - ecs-model-load-balancers
      - ecs-model-routing
  - id: ecs-054
    q: An ECS Fargate service is configured with an instance-type load balancer target group. What
      should change?
    a: Use ip targets. Fargate tasks require awsvpc networking and have their own network interfaces.
      Classic Load Balancers are unsupported.
    trap: true
    facts:
      - ecs-model-ip
      - ecs-model-awsvpc
      - ecs-model-classic
  - id: ecs-055
    q: Does replacing an ECS container preserve changes made to the image layers or its writable layer?
    a: Image layers are read-only. The container writes into its own disposable layer; those changes do
      not survive replacement. Store persistent data in an appropriate external volume.
    facts:
      - ecs-model-layers
      - ecs-model-disposable
---

An ECS task definition describes how to run an application in containers, which package code and its dependencies. A task is a running copy; a service keeps the requested number of copies available.

### How it works

1. Write a Dockerfile, the instructions for building an image. Use `docker build`, test it with `docker run`, then use `docker tag` and push the image to an ECR repository, a store for container images.
2. Reference that image in a JSON task definition. Group containers that run together and set their CPU, memory, networking, logging, roles, and volumes. A volume exposes storage as a directory in a container.
3. Run a standalone task for finite work, or create a service for continuous work. EventBridge rules can launch tasks for events; EventBridge Scheduler launches them on a schedule.
4. Choose `REPLICA` to maintain a desired count. On eligible container instances, `DAEMON` places one task per instance. Fargate does not support `DAEMON`.
5. For a service, ECS replaces stopped tasks. `StopTask` stops the selected task without reducing the service's desired count.

Image layers are read-only. The container adds a disposable writable layer, so changes there disappear when the container is replaced. Choose storage deliberately:

| Storage | Use |
| --- | --- |
| EFS | Shared persistent files for Linux tasks on EC2 or Fargate |
| EBS | Block storage; service-task volumes are ephemeral, standalone-task volumes can persist |
| S3 Files | File-system access to S3 data; requires a task role and encryption in transit |
| Bind mount | Temporary files shared by containers in the same task |

S3 Files launched in April 2026.

A Fargate service can use an Application Load Balancer for HTTP/HTTPS, a Network Load Balancer for TCP/UDP, or a Gateway Load Balancer for virtual appliances such as firewalls. Classic Load Balancers are unsupported. Fargate requires `awsvpc` networking, which gives each task a network interface, its connection to the network. Use `ip` targets for load balancer target groups.

### Exam cues

- If the question says a nightly ECS job must exit when done, think scheduled standalone task, because a service maintains continuous task availability.
- If the question says stopping an ECS service task creates another, think desired count, because the service replaces stopped tasks.
- If the question says replacement Linux tasks need the same shared files, think EFS, because container writable layers do not persist.

### Remember

- A task definition groups containers and their runtime settings.
- `DAEMON` means one task per eligible instance; Fargate requires `REPLICA` for services.
- EFS on Fargate Linux requires platform version 1.4.0 or later.

> **Trap:** Stopping a service task does not stop the service from maintaining its desired count.
