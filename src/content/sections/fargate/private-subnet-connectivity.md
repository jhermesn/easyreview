---
title: Private subnet connectivity
level: associate
order: 20
facts:
  - id: eni
    text: Each ECS Fargate task receives a network interface with a private IP address.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
  - id: nat
    text: An IPv4 Fargate task in a private subnet can use a NAT gateway for internet access to pull container images.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
  - id: public
    text: A Fargate task in a public subnet can be assigned a public IP address for internet access.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
  - id: endpoints
    text: Without internet egress, Fargate platform 1.4.0 or later needs ecr.api and ecr.dkr interface endpoints and an S3 gateway endpoint for ECR image pulls.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: older
    text: Fargate platform 1.3.0 or earlier needs ecr.dkr and the S3 gateway endpoint for endpoint-based ECR image pulls.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: layers
    text: ECR stores image layers in S3; image pulling accesses ECR for the manifest and S3 for the layers.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: sg
    text: An ECR endpoint security group must allow incoming TCP 443 from the task private subnet.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: dns
    text: The ECR Docker registry endpoint requires private DNS; enabling private DNS lets standard ECR hostnames resolve through endpoints.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: s3-route
    text: The S3 gateway endpoint must be associated with the route tables used by the tasks.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: logs
    text: Fargate tasks using awslogs without internet access need the logs interface endpoint.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: log-driver
    text: Configure logConfiguration with the awslogs driver to send container standard output and standard error to CloudWatch Logs.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
  - id: execution
    text: The execution role authorizes image pulls, awslogs delivery, and task-definition secret retrieval when configured.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: task-role
    text: The task IAM role supplies permissions used by application code inside the container.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
  - id: single-eni
    text: On Linux Fargate platform 1.4.0 or later, task network traffic passes through one task ENI and is visible in VPC Flow Logs.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
  - id: pull-through
    text: An initial ECR pull-through cache pull may still require NAT internet access even when ECR endpoints exist.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
  - id: eks-private
    text: EKS Fargate pods run only in private subnets, without a direct route to an internet gateway.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate.html
diagrams:
  - id: fargate-private-image-pull
    title: Private image pulls need registry and image-layer access
    width: 800
    height: 510
    groups:
      - label: VPC endpoint paths for Linux platform 1.4.0 or later
        icon: group-virtual-private-cloud-vpc
        x: 10
        y: 10
        w: 780
        h: 490
        tone: network
    nodes:
      - id: task
        label: Fargate task
        icon: fargate
        tone: compute
        x: 35
        y: 220
        w: 200
        h: 86
      - id: s3
        label: S3 layers
        icon: simple-storage-service
        tone: storage
        x: 35
        y: 75
        w: 200
        h: 86
      - id: api
        label: ECR API
        icon: elastic-container-registry
        tone: compute
        x: 550
        y: 75
        w: 200
        h: 86
      - id: registry
        label: ECR registry
        icon: elastic-container-registry
        tone: compute
        x: 550
        y: 220
        w: 200
        h: 86
      - id: logs
        label: CloudWatch Logs
        icon: cloudwatch
        tone: mgmt
        x: 550
        y: 365
        w: 200
        h: 86
    edges:
      - from: task
        to: api
        step: 1
      - from: task
        to: registry
        step: 2
      - from: task
        to: s3
        step: 3
      - from: task
        to: logs
        step: 4
    steps:
      - Reach ECR API through its interface endpoint for image-pull API access.
      - Reach the ECR registry through its interface endpoint.
      - Download image layers using the S3 gateway endpoint and associated subnet route tables.
      - Send container output through the Logs interface endpoint when awslogs is configured.
cards:
  - id: fargate-002
    q: An ECS Fargate Linux platform 1.4.0 task in a private subnet cannot pull a private ECR image without internet access. What should operators check?
    a: Check ecr.api and ecr.dkr interface endpoints, private DNS, the S3 gateway endpoint and route tables, endpoint TCP 443 access, and execution-role permissions.
    facts:
      - endpoints
      - dns
      - s3-route
      - sg
      - execution
  - id: fargate-011
    q: A private ECS Fargate task reaches ECR APIs, but image-layer downloads fail. Which missing path should be checked?
    a: The S3 gateway endpoint and task-subnet route tables. ECR image layers are stored in S3.
    facts:
      - layers
      - s3-route
  - id: fargate-012
    q: A private ECS Fargate task pulls images successfully but cannot send awslogs output without internet access. What does it need?
    a: A logs interface endpoint, awslogs logConfiguration, and execution-role permissions for CloudWatch Logs.
    facts:
      - logs
      - log-driver
      - execution
  - id: fargate-013
    q: Do ECR VPC endpoints guarantee that every first pull-through cache download works without internet egress?
    a: No. The first pull through a cache rule may require NAT internet access; subsequent cached pulls do not have that requirement.
    trap: true
    facts:
      - pull-through
  - id: fargate-014
    q: For ECS Fargate, does granting the application task role ECR permissions replace the execution-role permissions needed to pull its image?
    a: No. Image pulling uses the execution role. Application API calls use the task role.
    trap: true
    facts:
      - execution
      - task-role
  - id: fargate-015
    q: Where can operators inspect network traffic for an ECS Fargate Linux platform 1.4.0 task?
    a: VPC Flow Logs for the task ENI. Its network traffic uses that interface.
    facts:
      - single-eni
---
A private subnet gives a Fargate task a private network address, but the task still needs routes to its dependencies. For IPv4 image pulls, provide internet egress through a NAT gateway or private endpoint paths to ECR and S3.

### How it works

1. ECS attaches the task's elastic network interface (ENI), a virtual network card, in the selected subnet. On Linux platform 1.4.0 or later, task traffic uses this ENI and can be inspected with VPC Flow Logs.
2. Choose a dependency path. A NAT gateway lets private IPv4 tasks initiate internet connections. Interface VPC endpoints expose service APIs through private addresses inside the VPC.
3. For private ECR pulls on platform 1.4.0 or later without internet access, provide both ecr.api and ecr.dkr endpoints. Enable private DNS and allow endpoint security-group inbound TCP 443 from the task subnet.
4. Associate an S3 gateway endpoint with the task subnet's route tables. ECR supplies the image manifest, a description of the image's layers, while S3 supplies those layers.
5. For awslogs without internet access, add the logs interface endpoint and configure the container's logConfiguration. Check the execution role for image, log, and configured secret retrieval permissions.

| Dependency | Private path or configuration |
|---|---|
| ECR APIs | ecr.api interface endpoint |
| ECR registry | ecr.dkr interface endpoint with private DNS |
| Image layers | S3 gateway endpoint and task route-table associations |
| Container standard output and error | awslogs driver and logs interface endpoint |
| Authorization for startup operations | Task execution role |
| Application AWS API calls | Task role plus a reachable service path |

### Exam cues

- If the question says ECR authentication works but layer downloads fail, think the S3 route, because ECR stores layers in S3.
- If the question says private tasks cannot send awslogs output, think the Logs endpoint, logConfiguration, and execution role, because each is required for that delivery path.
- If the question says image-pull permission errors remain after the network works, think the execution role, because application task-role permissions do not authorize the agent's image pull.

### Remember

- Platform 1.4.0 or later needs both ECR endpoints for endpoint-based pulls. Platform 1.3.0 or earlier needs ecr.dkr and S3.
- Interface endpoint security groups must permit TCP 443 from the private task subnet.
- A first ECR pull-through cache request may still need NAT internet access.
- ECS Fargate can use a public subnet with public IP assignment. EKS Fargate pods use private subnets only.

> **Trap:** A private ECR registry endpoint alone does not provide the S3 path used to download image layers. Check routes as well as API connectivity.
