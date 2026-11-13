---
title: Compute and isolation
level: associate
order: 10
facts:
  - id: compute
    text: Fargate runs ECS containers without customers provisioning, patching, or scaling container hosts.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
  - id: task
    text: An ECS Fargate task has an isolation boundary that separates its kernel, CPU, memory, and network interface from other tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
  - id: shared
    text: Containers within one Fargate task share task resources and can communicate over localhost.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-security-considerations.html
  - id: roles
    text: The ECS task role gives application code AWS API permissions; the execution role gives agents permissions for operations such as image pulls and log delivery.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: ec2
    text: On ECS EC2 container instances, containers can potentially access other task credentials or instance metadata unless access is restricted.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
  - id: definition
    text: ECS Fargate task definitions specify CPU, memory, and FARGATE compatibility and require awsvpc networking.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html
  - id: privileged
    text: Fargate does not support privileged containers or access to the underlying host.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-security-considerations.html
  - id: platform
    text: A Fargate platform version identifies the kernel and container runtime environment; running tasks remain on one revision for their lifetime.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-fargate.html
  - id: revision
    text: A new Fargate task starts on the latest revision of its selected platform version.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-fargate.html
  - id: scale
    text: Scaling an unchanged ECS Fargate service uses the platform version specified by its current deployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-fargate.html
  - id: deploy
    text: Changing a service platform version requires a deployment; forcing a new deployment can replace tasks without changing the service definition.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-ecs-service-forcenewdeployment.html
  - id: efs
    text: ECS tasks on Fargate Linux platform 1.4.0 or later can mount shared persistent EFS file systems.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html
  - id: balancers
    text: ECS Fargate supports Application, Network, and Gateway Load Balancers.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html
  - id: targets
    text: Load balancer target groups for ECS Fargate tasks use target type ip rather than instance.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
  - id: no-classic
    text: Classic Load Balancers are not supported for ECS Fargate services.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
  - id: scheduled
    text: EventBridge Scheduler can run ECS tasks at specified times or intervals.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduling_tasks.html
  - id: eks
    text: EKS runs Kubernetes pods on Fargate with an individual compute boundary per pod.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate.html
  - id: selectors
    text: EKS Fargate profiles select pods by namespace and optional labels.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  - id: eks-limits
    text: EKS Fargate does not support DaemonSets, privileged containers, HostPort, HostNetwork, or GPUs.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate.html
  - id: eks-efs
    text: EKS Fargate supports statically provisioned EFS persistent volumes, not dynamic provisioning.
    source: https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html
  - id: eks-ebs
    text: EBS volumes cannot be mounted to EKS Fargate pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
diagrams:
  - id: fargate-task-launch
    title: ECS places a task on managed compute
    width: 800
    height: 180
    nodes:
      - id: definition
        label: Task definition
        icon: res-elastic-container-service-task
        tone: compute
        x: 30
        y: 45
        w: 200
        h: 86
      - id: ecs
        label: ECS
        icon: elastic-container-service
        tone: compute
        x: 300
        y: 45
        w: 200
        h: 86
      - id: fargate
        label: Fargate task
        icon: fargate
        tone: compute
        x: 570
        y: 45
        w: 200
        h: 86
    edges:
      - from: definition
        to: ecs
        step: 1
      - from: ecs
        to: fargate
        step: 2
    steps:
      - Define the container workload, CPU, memory, and networking for Fargate.
      - ECS runs the task with its own compute boundary on Fargate.
cards:
  - id: fargate-001
    q: Who manages container hosts for ECS Fargate, and what is the isolation boundary?
    a: AWS manages Fargate compute hosts. Each task is isolated from other tasks, while containers inside one task share resources. EC2 container instances need controls to restrict access to instance metadata and other credentials.
    facts:
      - compute
      - task
      - shared
      - ec2
  - id: fargate-003
    q: An ECS Fargate service scales out after a newer platform version becomes available. Does scale-out automatically adopt that new version?
    a: No. New tasks use the current deployment platform version, with its latest revision. Update the platform version through a deployment to change versions.
    trap: true
    facts:
      - scale
      - revision
      - platform
  - id: fargate-004
    q: An ECS team needs to replace running Fargate tasks to pick up the latest revision of their selected platform version. What should it do?
    a: Start a new deployment, using force new deployment if no service definition change is needed. Existing tasks keep their revision for their lifetime.
    facts:
      - deploy
      - platform
      - revision
  - id: fargate-005
    q: Two ECS Fargate tasks must share persistent files across replacements. Which storage service fits?
    a: Amazon EFS, supported by Linux Fargate platform 1.4.0 or later.
    facts:
      - efs
  - id: fargate-006
    q: A Kubernetes workload on EKS needs a privileged DaemonSet with host networking. Is Fargate suitable?
    a: No. EKS Fargate does not support DaemonSets, privileged containers, or HostNetwork.
    trap: true
    facts:
      - eks-limits
  - id: fargate-007
    q: How does EKS decide which Kubernetes pods run on Fargate?
    a: A Fargate profile selects pods using a namespace and optional labels.
    facts:
      - selectors
  - id: fargate-008
    q: Can an EKS Fargate pod mount an EBS persistent volume?
    a: No. Use supported EFS persistent storage with static provisioning when shared files fit the workload.
    trap: true
    facts:
      - eks-ebs
      - eks-efs
  - id: fargate-009
    q: Which target type should an Application Load Balancer use for an ECS Fargate service?
    a: ip. Fargate tasks use task network interfaces rather than EC2 instance targets. Classic Load Balancers are unsupported.
    facts:
      - targets
      - no-classic
  - id: fargate-010
    q: An application in an ECS Fargate container calls S3. Should its S3 permissions be placed only on the task execution role?
    a: No. Application API permissions belong to the task role. The execution role supplies agent permissions for startup and log delivery.
    trap: true
    facts:
      - roles
---
Fargate supplies container compute without requiring you to manage worker hosts. ECS runs tasks, groups of containers deployed together, while EKS runs Kubernetes pods. The isolation boundary surrounds each task or pod, not every container inside it.

### How it works

1. For ECS, register a Fargate task definition, the description of containers and their required CPU, memory, and networking. Fargate requires awsvpc mode, which gives the task a VPC network interface.
2. Give application code its task role and give startup operations their execution role. Containers in one task share resources and can communicate over localhost; separate tasks have separate compute boundaries.
3. Run tasks directly or use an ECS service deployment. EventBridge Scheduler can start tasks at specified times. Linux platform 1.4.0 or later supports EFS, shared file storage that persists beyond a task.
4. For EKS, define a Fargate profile whose selectors match a pod's namespace, its Kubernetes grouping, and optional labels, its identifying key-value tags. EKS schedules matching pods on Fargate.
5. Plan task replacement for platform updates. A platform version identifies a runtime environment; a revision is an update within that version. Running tasks keep their revision until replaced.

| Workload requirement | Fargate behavior |
|---|---|
| ECS load balancing | Application, Network, and Gateway Load Balancers are supported; use IP targets |
| Classic Load Balancer | Unsupported for ECS Fargate |
| Privileged containers or underlying host access | Unsupported |
| EKS DaemonSet, one pod on every node | Unsupported |
| EKS HostPort or HostNetwork, which use host ports or networking | Unsupported |
| EKS GPU workload | Unsupported |
| EKS persistent files | EFS with static provisioning, where storage is prepared in advance |
| EKS EBS volume | Cannot be mounted to Fargate pods |

### Exam cues

- If the question says avoid container-host provisioning and patching, think Fargate, because AWS manages that compute.
- If the question says adopt a newer ECS service platform version, think a new deployment, because scale-out keeps the version of the current deployment.
- If the question says shared persistent files across Linux ECS tasks, think EFS on supported Fargate platforms, because the file system is shared across tasks.
- If the question says choose EKS pods by namespace and labels, think Fargate profiles, because their selectors control pod placement.

### Remember

- New tasks use the latest revision of the selected platform version. An unchanged service's scale-out keeps its current deployment version.
- A forced deployment replaces tasks without requiring a service-definition change.
- The task role authorizes application API calls; the execution role authorizes agent operations.
- EC2 container workloads need restrictions on instance metadata, the host service that can expose instance-role credentials.

> **Trap:** Containers inside the same Fargate task share its resources. Per-task isolation does not create a separate security boundary between those containers.
