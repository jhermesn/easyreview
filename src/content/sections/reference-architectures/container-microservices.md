---
title: Container microservices on ECS and Fargate
level: associate
order: 54
facts:
  - id: ecs
    text: Amazon ECS is a fully managed container orchestration service for deploying, managing and scaling containerized applications.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html#Welcome
  - id: fargate
    text: AWS Fargate runs containers without provisioning, configuring or scaling clusters of EC2 instances; you set CPU and memory per task.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#AWS_Fargate
  - id: eks
    text: Amazon EKS is a fully managed Kubernetes service that removes the work of operating Kubernetes clusters.
    source: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html#what-is-eks
  - id: eks-compute
    text: An EKS cluster can combine Auto Mode nodes, managed node groups, self-managed nodes, Fargate, and Hybrid Nodes.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html
  - id: ecr
    text: Amazon ECR is an AWS managed container image registry with private repositories controlled through IAM, and public repositories too.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#what-is-ecr
  - id: execution-role
    text: The execution role is used for Fargate ECR image pulls and awslogs delivery, and for referenced secrets.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: secrets
    text: Injected Secrets Manager secrets require secretsmanager:GetSecretValue on the execution role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-secrets
  - id: task-role
    text: The ECS task role gives application code AWS API permissions; the execution role gives agents permissions for operations such as image pulls and log delivery.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: alb-rules
    text: A load balancer receives client requests through listeners and uses listener rules to route them to registered targets in target groups.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html
  - id: alb-conditions
    text: ALB conditions can match host-header, path-pattern, http-header, http-request-method, source-ip, and query-string.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-rules.html
  - id: stateless
    text: A stateless system keeps no session data on local disk or memory between requests, so servers can be replaced at will and any instance or Lambda function can serve any request, which allows horizontal scaling.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_mitigate_interaction_failure_stateless.html#rel_mitigate_interaction_failure_stateless
  - id: shared-store
    text: AWS recommends storing session state in a shared backing store such as Amazon DynamoDB, Amazon RDS or Amazon ElastiCache, so the application scales across instances without losing sessions.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-asp-net-web-forms/ha-scaling.html#backing-store
  - id: sticky
    text: Sticky sessions on an Application Load Balancer keep a client on one instance, but the session is lost if that instance fails and load can become uneven.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-asp-net-web-forms/ha-scaling.html#sticky-sessions
  - id: efs
    text: ECS tasks on Fargate Linux platform 1.4.0 or later can mount shared persistent EFS file systems.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html
  - id: async
    text: Making interactions asynchronous, for example with Amazon SQS, AWS Step Functions, Amazon EventBridge or Amazon SNS, suits any request that only needs an acknowledgment rather than an immediate response.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_prevent_interaction_failure_loosely_coupled_system.html#rel_prevent_interaction_failure_loosely_coupled_system
  - id: spot
    text: FARGATE_SPOT uses spare capacity and gives a two-minute interruption warning.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html
  - id: spot-fallback
    text: Fargate does not automatically replace unavailable Spot capacity with on-demand capacity.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html
  - id: redelivery
    text: If a received SQS message is not deleted before visibility timeout expires, it becomes available for another receive.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#configuring-visibility-timeout
  - id: scale-desired
    text: ECS Service Auto Scaling uses Application Auto Scaling to change the desired number of service tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: scale-target
    text: Target tracking chooses a metric target and manages the alarms and task-count adjustments automatically.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-autoscaling-targettracking.html
  - id: scale-cpu
    text: ECS publishes service average CPU and memory metrics for scaling.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: scale-queue
    text: SQS worker services can scale using a custom backlog-per-task metric.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: asg-provider
    text: An Auto Scaling group capacity provider connects ECS task placement with EC2 instance capacity.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: a2c
    text: AWS App2Container is a command line tool that packages supported applications running on servers into container images without requiring their source code.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html#what-is-a2c
  - id: a2c-closed
    text: AWS App2Container stopped accepting new customers on November 7, 2025.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/dotnet-modernization-tools-availability-change.html#dotnet-modernization-tools-availability-change
  - id: a2c-alternative
    text: AWS recommends AWS Transform for new modernization projects in its .NET modernization-tools availability notice.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/dotnet-modernization-tools-availability-change.html#dotnet-modernization-tools-availability-change
  - id: dlq
    text: A dead-letter queue isolates source-queue messages that could not be processed successfully for diagnosis and later processing.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#sqs-dead-letter-queues
  - id: dlq-policy
    text: A source queue RedrivePolicy identifies deadLetterTargetArn and maxReceiveCount; SQS moves a message when its receive count exceeds maxReceiveCount.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
diagrams:
  - id: container-microservices
    title: Stateless services on Fargate behind one load balancer, with a queue worker on Spot
    facts: [ecs, fargate, eks, eks-compute, ecr, execution-role, secrets, task-role, alb-rules, alb-conditions, stateless, shared-store, sticky, efs, async, spot, spot-fallback, redelivery, scale-desired, scale-target, scale-cpu, scale-queue, asg-provider, a2c, a2c-closed, a2c-alternative, dlq, dlq-policy]
    width: 1240
    height: 880
    groups:
      - { label: Region, x: 200, y: 20, w: 1020, h: 840, tone: neutral, icon: group-region }
      - { label: VPC, x: 220, y: 220, w: 580, h: 560, tone: neutral, icon: group-virtual-private-cloud-vpc }
    nodes:
      - { id: users, label: Clients, sub: HTTPS, x: 20, y: 380, w: 150, h: 86, tone: user, icon: res-users }
      - { id: ecr, label: ECR, sub: image repositories, x: 250, y: 80, w: 160, h: 86, tone: integration, icon: elastic-container-registry }
      - { id: secrets, label: Secrets Manager, sub: injected secrets, x: 470, y: 80, w: 170, h: 86, tone: security, icon: secrets-manager }
      - { id: cw, label: CloudWatch, sub: CPU target, x: 690, y: 80, w: 170, h: 86, tone: mgmt, icon: cloudwatch, info: "Target tracking keeps average CPU near the target by changing the service's desired task count." }
      - { id: alb, label: ALB, sub: path rules, x: 250, y: 380, w: 160, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer, info: "Listener rules match path-pattern or host-header and forward to each service's target group." }
      - { id: orders, label: Orders service, sub: Fargate tasks, x: 470, y: 260, w: 170, h: 86, tone: compute, icon: fargate, info: "The execution role pulls the image and injects secrets; the task role gives the code its AWS permissions." }
      - { id: catalog, label: Catalog service, sub: Fargate tasks, x: 470, y: 460, w: 170, h: 86, tone: compute, icon: fargate }
      - { id: worker, label: Worker service, sub: Fargate Spot, x: 470, y: 660, w: 170, h: 86, tone: compute, icon: fargate, info: "Scales on backlog per task. Spot capacity gives a two-minute warning before interruption." }
      - { id: ddb, label: DynamoDB, sub: orders and sessions, x: 900, y: 260, w: 170, h: 86, tone: database, icon: dynamodb }
      - { id: efs, label: EFS, sub: shared files, x: 1030, y: 460, w: 170, h: 86, tone: storage, icon: efs }
      - { id: sqs, label: SQS queue, sub: order jobs, x: 860, y: 660, w: 160, h: 86, tone: integration, icon: simple-queue-service, info: "Its redrive policy names the dead-letter queue and maxReceiveCount." }
      - { id: dlq, label: Dead-letter queue, sub: failed jobs, x: 1050, y: 660, w: 150, h: 86, tone: integration, icon: simple-queue-service }
    edges:
      - { from: ecr, to: orders, step: 1 }
      - { from: secrets, to: orders, step: 1 }
      - { from: users, to: alb, step: 2 }
      - { from: alb, to: orders, step: 2 }
      - { from: alb, to: catalog, step: 2 }
      - { from: orders, to: ddb, step: 3 }
      - { from: catalog, to: efs, step: 4 }
      - { from: orders, to: sqs, step: 5 }
      - { from: worker, to: sqs, step: 5 }
      - { from: cw, to: orders, step: 6 }
      - { from: sqs, to: dlq, step: 7, dashed: true }
    steps:
      - "Each service's image lives in ECR. When a task starts, the execution role pulls the image and injects secrets from Secrets Manager."
      - "The load balancer's listener rules route each path to the target group of the service behind it."
      - "Services run as stateless Fargate tasks, with no servers to manage. Orders and session data live in DynamoDB, so any task can serve any request."
      - "Catalog tasks mount a shared EFS file system for files that every task needs."
      - "The orders service puts slow work on an SQS queue and answers at once; a worker service on Fargate Spot polls the queue and processes it."
      - "Service Auto Scaling uses target tracking on average CPU to change the desired task count. The worker scales on queue backlog per task."
      - "If Spot reclaims a worker task, the messages it did not delete become visible again after the visibility timeout, and another task retries them. A message received more than maxReceiveCount times moves to the dead-letter queue."
cards:
  - id: reference-architectures-099
    q: A team wants to run containers without provisioning, patching or scaling EC2 hosts, setting only CPU and memory per task. Which launch option fits?
    a: "**AWS Fargate** with Amazon ECS (or EKS)."
    facts: [fargate, ecs]
  - id: reference-architectures-100
    q: A company already runs Kubernetes on premises and wants the same tooling and APIs on AWS without operating the control plane. What fits?
    a: "**Amazon EKS**, a managed Kubernetes service. Its pods can run on managed node groups, Fargate or other compute options."
    facts: [eks, eks-compute]
  - id: reference-architectures-101
    q: Container tasks keep user sessions in memory, so users lose their session when tasks scale in. What fixes this?
    a: "Make the tasks **stateless**: keep session data in a shared store such as **DynamoDB** or **ElastiCache**, so any task can serve any request."
    facts: [stateless, shared-store, sticky]
  - id: reference-architectures-102
    q: One Application Load Balancer must send /orders to one ECS service and /catalog to another. How?
    a: "**Listener rules** with **path-pattern** conditions, each forwarding to the target group of one service."
    facts: [alb-rules, alb-conditions]
  - id: reference-architectures-103
    q: An ECS task fails to start because it cannot read a database password from Secrets Manager, although the task role allows it. What is wrong?
    a: "Injected secrets are read by the **task execution role**, which needs secretsmanager:GetSecretValue. The task role only covers calls from the application code."
    trap: true
    facts: [secrets, execution-role, task-role]
  - id: reference-architectures-104
    q: An ECS service should add tasks when average CPU rises and remove them when it falls, with no alarms to manage by hand. What fits?
    a: "**Service Auto Scaling** with a **target tracking** policy on average CPU. It changes the desired task count and manages the alarms."
    facts: [scale-desired, scale-target, scale-cpu]
  - id: reference-architectures-105
    q: A queue worker on ECS should scale with the amount of waiting work, not CPU. Which metric fits?
    a: "A custom **backlog per task** metric: messages waiting divided by running tasks."
    facts: [scale-queue]
  - id: reference-architectures-106
    q: Interruptible queue workers on ECS must cost as little as possible. Which capacity fits, and what happens if Spot capacity is unavailable?
    a: "**FARGATE_SPOT**, which gives a two-minute warning before interruption. Fargate does **not** fall back to on-demand on its own."
    trap: true
    facts: [spot, spot-fallback]
  - id: reference-architectures-107
    q: A worker task is stopped while processing an SQS message it has not deleted yet. Is the message lost?
    a: "No. After the **visibility timeout** expires, the message becomes available again and another task processes it, so processing must tolerate repeats. A message that keeps failing moves to a **dead-letter queue** after maxReceiveCount receives."
    facts: [redelivery, dlq, dlq-policy]
  - id: reference-architectures-108
    q: A company wants to package existing Java and ASP.NET applications into container images without their source code. Which tool was built for this, and what does AWS recommend for new projects?
    a: "**AWS App2Container** packages such applications into images for ECS or EKS. It stopped accepting new customers on November 7, 2025, and AWS points new projects to **AWS Transform**."
    facts: [a2c, a2c-closed, a2c-alternative]
---
Container questions describe several small services that must scale on their own, deploy without servers to manage, and survive tasks coming and going. The usual answer: one load balancer routing by path, stateless services on Fargate, state in managed stores, queues between services, and scaling policies per service.

### How it works

1. Images live in ECR. The task execution role pulls them and injects secrets; the task role gives the code its AWS permissions.
2. An Application Load Balancer routes each path or host to the target group of one ECS service.
3. Tasks are stateless: sessions and data live in DynamoDB, and files that every task shares live in EFS.
4. Slow work goes through SQS to a worker service, which can run on Fargate Spot because a lost task only delays a message.
5. Service Auto Scaling changes the desired task count: target tracking on CPU for web services, backlog per task for workers.

| Decision | Choose | When |
|---|---|---|
| Orchestrator | ECS | AWS-native orchestration with less to operate |
| Orchestrator | EKS | Kubernetes tooling and APIs are required |
| Compute | Fargate | No hosts to manage; CPU and memory per task |
| Compute | EC2 with a capacity provider | Instance-level control; ECS places tasks on the Auto Scaling group |
| Interruptible workers | Fargate Spot | Work can be retried; no automatic fallback to on-demand |
| Shared state | DynamoDB, ElastiCache, EFS | Any task must serve any request |

### Exam cues

- If the question says containers without managing servers, think Fargate.
- If the question says existing Kubernetes manifests or tooling, think EKS.
- If the question says route paths to different services behind one endpoint, think ALB listener rules.
- If the question says sessions are lost when tasks scale in, think a shared session store, because stateless tasks can be replaced at will.
- If the question says a task cannot pull its image or read an injected secret, think the task execution role.
- If the question says scale workers on waiting messages, think backlog per task.

### Remember

- Execution role: image pulls, logs, injected secrets. Task role: the application's AWS calls.
- Fargate Spot gives a two-minute warning and no automatic on-demand fallback.
- Service Auto Scaling changes the desired task count; a capacity provider ties tasks to EC2 capacity.

> **Trap:** Sticky sessions do not make a service stateless. If a task holding sessions is replaced, those users lose them; keep state in a shared store.
