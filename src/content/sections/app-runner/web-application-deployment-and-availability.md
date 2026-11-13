---
title: Web application deployment and availability
level: associate
order: 10
facts:
  - id: service-purpose
    text: App Runner creates and maintains a running web service from source code or a ready-to-run container
      image.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/architecture.html#architecture
  - id: source-providers
    text: App Runner can deploy source code from GitHub or Bitbucket and source images from Amazon ECR.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/manage-create.html#manage-create.prereq
  - id: code-build
    text: For source code, configure the managed runtime, build command, start command and listening port; App
      Runner builds a container image and runs the service.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/manage-create.html#manage-create.create.github
  - id: runtime-definition
    text: An App Runner managed runtime is the base image used to deploy a source-code repository.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/architecture.html#architecture.concepts
  - id: automatic-deploy
    text: Automatic deployment monitors the configured source and starts a deployment for a new image version or
      qualifying code change.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/manage-deploy.html#manage-deploy.methods
  - id: source-directory
    text: For code services, only commits that change the configured source directory trigger automatic
      deployment; the default source directory is the repository root.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/manage-deploy.html#manage-deploy.methods
  - id: manual-deploy
    text: A manual deployment is explicitly started through the console, CLI or StartDeployment API.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/manage-deploy.html#manage-deploy.manual
  - id: automatic-image-exclusions
    text: Automatic deployment is unsupported for ECR Public images and ECR images in another AWS account.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/manage-deploy.html#manage-deploy.methods
  - id: auto-deploy-defaults
    text: AutoDeploymentsEnabled defaults to false for ECR Public and cross-account ECR images, and true for code
      and same-account ECR images.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_SourceConfiguration.html#apprunner-Type-SourceConfiguration-AutoDeploymentsEnabled
  - id: access-role
    text: An access role gives App Runner permission to retrieve private ECR images; it is not required for ECR
      Public.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/security_iam_service-with-iam.html#security_iam_service-with-iam-roles-service.access
  - id: access-role-trust
    text: The access role trusts build.apprunner.amazonaws.com and can use AWSAppRunnerServicePolicyForECRAccess.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/security_iam_service-with-iam.html#security_iam_service-with-iam-roles-service.access
  - id: instance-role
    text: An instance role supplies the permissions needed by application code that calls AWS APIs.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/security_iam_service-with-iam.html#security_iam_service-with-iam-roles-service.instance
  - id: instance-role-trust
    text: An App Runner instance role trusts tasks.apprunner.amazonaws.com.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/security_iam_service-with-iam.html#security_iam_service-with-iam-roles-service.instance
  - id: public-ingress
    text: An App Runner service has a public incoming endpoint by default.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/network-incoming.html#network-incoming
  - id: private-ingress
    text: A private incoming endpoint uses a VPC interface endpoint through AWS PrivateLink to permit access from
      a VPC.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/network-incoming.html#network-incoming
  - id: vpc-egress
    text: A VPC connector lets the application reach private VPC services, such as an RDS database.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/network-vpc.html#network-vpc.VPC-connector
  - id: egress-not-ingress
    text: A VPC connector affects outbound application traffic and does not change incoming traffic configuration.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/network-vpc.html#network-vpc
  - id: private-subnets
    text: App Runner VPC connector network interfaces have private IP addresses, so the connector needs private
      subnets.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/network-vpc.html#network-vpc.subnet
  - id: vpc-internet
    text: With VPC-connected outbound traffic, use a NAT gateway for internet access or VPC endpoints for
      supported AWS APIs.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/network-vpc.html#network-vpc.considerations-subnet
  - id: concurrency-scaling
    text: MaxConcurrency is the concurrent-request target per instance above which App Runner scales up.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_CreateAutoScalingConfiguration.html#apprunner-CreateAutoScalingConfiguration-request-MaxConcurrency
  - id: concurrency-default
    text: MaxConcurrency defaults to 100 requests per instance.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_CreateAutoScalingConfiguration.html#apprunner-CreateAutoScalingConfiguration-request-MaxConcurrency
  - id: minimum-scaling
    text: MinSize sets the minimum number of provisioned instances and defaults to one.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_CreateAutoScalingConfiguration.html#apprunner-CreateAutoScalingConfiguration-request-MinSize
  - id: maximum-scaling
    text: MaxSize limits the number of instances actively serving traffic and defaults to twenty-five.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_CreateAutoScalingConfiguration.html#apprunner-CreateAutoScalingConfiguration-request-MaxSize
  - id: minimum-azs
    text: A higher MinSize increases the service spread across Availability Zones at a higher minimum cost.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_CreateAutoScalingConfiguration.html#API_CreateAutoScalingConfiguration
  - id: provisioned-cost
    text: All provisioned instances incur memory charges; only the active subset incurs CPU usage charges.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_CreateAutoScalingConfiguration.html#apprunner-CreateAutoScalingConfiguration-request-MinSize
  - id: deployment-capacity
    text: App Runner temporarily doubles provisioned instances during deployment to maintain capacity for old and
      new code.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_CreateAutoScalingConfiguration.html#apprunner-CreateAutoScalingConfiguration-request-MinSize
  - id: health-protocol
    text: The health protocol defaults to TCP, which checks the listening port; HTTP checks request the configured
      application path.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/manage-configure-healthcheck.html#manage-configure-healthcheck
  - id: health-path
    text: The HTTP health-check path defaults to /.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_HealthCheckConfiguration.html#apprunner-Type-HealthCheckConfiguration-Path
  - id: health-interval
    text: The default time between health checks is five seconds.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_HealthCheckConfiguration.html#apprunner-Type-HealthCheckConfiguration-Interval
  - id: health-timeout
    text: The default health-check response timeout is two seconds.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_HealthCheckConfiguration.html#apprunner-Type-HealthCheckConfiguration-Timeout
  - id: health-healthy
    text: The default healthy threshold is one consecutive successful check.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_HealthCheckConfiguration.html#apprunner-Type-HealthCheckConfiguration-HealthyThreshold
  - id: health-unhealthy
    text: The default unhealthy threshold is five consecutive failed checks.
    source: https://docs.aws.amazon.com/apprunner/latest/api/API_HealthCheckConfiguration.html#apprunner-Type-HealthCheckConfiguration-UnhealthyThreshold
  - id: maintenance-state
    text: During maintenance App Runner can report OPERATION_IN_PROGRESS and block service-management actions
      while the application continues handling requests.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/architecture.html#architecture.concepts
  - id: new-customer-cutoff
    text: App Runner stopped accepting new customers on April 30, 2026.
    source: https://aws.amazon.com/apprunner/
  - id: existing-customer-access
    text: Existing App Runner customers can continue normal use, including creating new resources and services.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html#apprunner-availability-change
  - id: feature-roadmap
    text: AWS continues App Runner security and availability investment but does not plan new features.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html#apprunner-availability-change
  - id: migration-direction
    text: AWS recommends exploring Amazon ECS Express Mode when migrating from App Runner.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html#apprunner-availability-change
  - id: container-definition
    text: A container image contains application code and its required dependencies.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-considerations.html
  - id: repository-definition
    text: A repository is the source location containing the application code or source images for deployment.
    source: https://docs.aws.amazon.com/apprunner/latest/dg/architecture.html#architecture.concepts
  - id: zone-definition
    text: An Availability Zone is an isolated location within an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
  - id: nat-definition
    text: A public NAT gateway lets private-subnet applications initiate internet connections without accepting
      unsolicited internet connections.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html#vpc-nat-gateway
  - id: private-subnet-definition
    text: A private subnet is a VPC network range without a direct route to an internet gateway.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-types
diagrams:
  - id: app-runner-image-deployment
    title: An image deployment creates the service clients call
    width: 820
    height: 230
    nodes:
      - id: ecr
        label: Amazon ECR
        icon: elastic-container-registry
        x: 20
        y: 90
        w: 180
        h: 72
        tone: compute
        info: The image source contains a ready-to-run application image.
      - id: runner
        label: App Runner
        icon: app-runner
        x: 320
        y: 90
        w: 180
        h: 72
        tone: compute
        info: App Runner deploys the image and manages the running web service.
      - id: client
        label: Web client
        icon: res-client
        x: 640
        y: 90
        w: 160
        h: 72
        tone: user
        info: The client sends requests to the service endpoint.
    edges:
      - from: ecr
        to: runner
        step: 1
        label: deploy image
      - from: client
        to: runner
        step: 2
        label: requests
    steps:
      - App Runner retrieves and deploys the configured image.
      - Clients send requests to the running service.
  - id: app-runner-vpc-egress
    title: Public incoming traffic and private database access
    width: 840
    height: 250
    groups:
      - label: Private VPC
        icon: group-virtual-private-cloud-vpc
        x: 610
        y: 20
        w: 210
        h: 210
        tone: network
    nodes:
      - id: client
        label: Web client
        icon: res-client
        x: 20
        y: 110
        w: 160
        h: 72
        tone: user
        info: This example retains the default public incoming endpoint.
      - id: runner
        label: App Runner
        icon: app-runner
        x: 320
        y: 110
        w: 160
        h: 72
        tone: compute
        info: The VPC connector changes outbound application traffic, separately from incoming access.
      - id: db
        label: RDS database
        icon: rds
        x: 635
        y: 110
        w: 160
        h: 72
        tone: database
        info: The application can reach the private database through the configured VPC connector.
    edges:
      - from: client
        to: runner
        step: 1
        label: public request
      - from: runner
        to: db
        step: 2
        label: VPC connector
    steps:
      - A client reaches the public application endpoint.
      - The application sends database traffic through its outbound VPC connector.
cards:
  - id: app-runner-001
    q: Which AWS service deploys a web application from source code or a container image while managing the
      underlying service?
    a: AWS App Runner. It builds source when needed, deploys the application and scales it. It stopped accepting
      new customers on April 30, 2026; existing customers can continue normal use.
    facts:
      - service-purpose
      - code-build
      - concurrency-scaling
      - new-customer-cutoff
      - existing-customer-access
      - container-definition
  - id: app-runner-002
    q: An existing App Runner customer wants a GitHub code commit to trigger deployment. Which source and
      deployment settings apply?
    a: Connect the code repository, configure the runtime and build/start settings, and enable automatic
      deployment. Only changes in the configured source directory trigger code deployments.
    facts:
      - source-providers
      - code-build
      - automatic-deploy
      - source-directory
  - id: app-runner-003
    q: An App Runner service uses an ECR Public image. Can it automatically deploy every new image version?
    a: No. ECR Public images require manual deployment; cross-account private ECR images also do not support
      automatic deployment.
    trap: true
    facts:
      - automatic-image-exclusions
      - manual-deploy
  - id: app-runner-004
    q: An App Runner service can pull a private ECR image but its application cannot call an AWS API. Which role
      should the team inspect?
    a: The instance role. The access role retrieves the image; the instance role grants application API
      permissions.
    trap: true
    facts:
      - access-role
      - instance-role
  - id: app-runner-005
    q: Which service principals do App Runner access and instance roles trust?
    a: "Access role: build.apprunner.amazonaws.com. Instance role: tasks.apprunner.amazonaws.com."
    facts:
      - access-role-trust
      - instance-role-trust
  - id: app-runner-006
    q: An App Runner team wants scaling to react to simultaneous requests per instance. Which setting applies, and
      what is its default?
    a: MaxConcurrency, which defaults to 100 concurrent requests per instance.
    facts:
      - concurrency-scaling
      - concurrency-default
  - id: app-runner-007
    q: What do App Runner MinSize and MaxSize control, and what are their API defaults?
    a: MinSize is the provisioned-instance minimum, default 1. MaxSize caps active instances, default 25. A higher
      minimum spreads capacity across more Availability Zones at higher minimum cost.
    facts:
      - minimum-scaling
      - maximum-scaling
      - minimum-azs
  - id: app-runner-008
    q: An App Runner service accepts a network connection but must test an application URL for health. What should
      the team configure?
    a: HTTP health checks with the appropriate path. The default TCP check tests the listening port, not an
      application path.
    trap: true
    facts:
      - health-protocol
      - health-path
  - id: app-runner-009
    q: What are the default App Runner health-check path, interval, timeout and success/failure thresholds?
    a: HTTP path /; interval 5 seconds; timeout 2 seconds; healthy after 1 consecutive success; unhealthy after 5
      consecutive failures.
    facts:
      - health-path
      - health-interval
      - health-timeout
      - health-healthy
      - health-unhealthy
  - id: app-runner-010
    q: An App Runner service needs a private RDS database, but public internet callers should still reach the
      application. What should the team configure?
    a: Use a VPC connector with private subnets for outbound database traffic. Keep the public incoming endpoint;
      outbound and inbound configuration are separate.
    facts:
      - vpc-egress
      - private-subnets
      - egress-not-ingress
      - public-ingress
  - id: app-runner-011
    q: An App Runner application loses access to public APIs after its outbound traffic is connected to a VPC.
      What connectivity should the team add?
    a: A public NAT gateway for internet access, or VPC endpoints for the supported AWS services it needs.
    facts:
      - vpc-internet
  - id: app-runner-012
    q: Can an existing App Runner customer create another service after April 30, 2026?
    a: Yes. The restriction applies to new customers; existing customers can create resources and services. AWS
      does not plan new App Runner features.
    trap: true
    facts:
      - new-customer-cutoff
      - existing-customer-access
      - feature-roadmap
  - id: app-runner-013
    q: An App Runner deployment is temporarily blocked with OPERATION_IN_PROGRESS during maintenance. Does that
      state alone mean the application has stopped serving requests?
    a: No. Maintenance can block management actions while the application continues handling requests.
    trap: true
    facts:
      - maintenance-state
  - id: app-runner-014
    q: Does App Runner stop charging for every provisioned instance that is not actively handling traffic?
    a: No. Memory is charged for all provisioned instances; CPU usage charges apply to the active subset.
    trap: true
    facts:
      - provisioned-cost
---

App Runner turns source code or a container image, a packaged application with its dependencies, into a managed web service. It handles building when needed, deployment and scaling so the team can run a web application without provisioning its compute resources directly.

### How it works

1. Choose a GitHub or Bitbucket code repository, or an ECR image. A repository stores the code or image versions. For code, select a managed runtime, the base execution image, and supply build/start commands and the listening port.
2. Choose automatic or manual deployment. Code automation watches the configured source directory, which defaults to the repository root. ECR Public and cross-account ECR images require manual deployment through the console, CLI or `StartDeployment`.
3. Assign an access role for private ECR retrieval, using `AWSAppRunnerServicePolicyForECRAccess` and trust in `build.apprunner.amazonaws.com`. If application code calls AWS APIs, give its instance role the required permissions and trust in `tasks.apprunner.amazonaws.com`.
4. Set the scaling controls below. Concurrency means requests being handled at the same time. Provisioned instances are capacity kept ready; some can be inactive. Increasing `MinSize` spreads capacity across more Availability Zones, isolated locations within a Region, at higher minimum cost.
5. Configure health checks. TCP tests the listening port; HTTP requests an application path. A VPC connector enables outbound access to private resources through private subnets, network ranges without a direct internet-gateway route. Incoming access is configured separately: public by default, or private through a VPC interface endpoint using AWS PrivateLink.

| Scaling control | Meaning | API default |
|---|---|---|
| `MaxConcurrency` | Concurrent requests per instance before scaling up | 100 |
| `MinSize` | Minimum provisioned instances | 1 |
| `MaxSize` | Maximum instances actively serving traffic | 25 |

### Exam cues

- If the question says deploy code or an image with managed web-service operations, think App Runner, because it builds when needed and manages the running service.
- If the question says a public or cross-account ECR image is not automatically redeployed, think manual deployment, because those image sources do not support automatic deployment.
- If the question says image retrieval works but AWS API calls fail, think instance-role permissions, because image retrieval uses the separate access role.
- If the question says an application needs a private database while keeping public callers, think outbound VPC connector, because incoming access has separate settings. For internet access after adding the connector, provide a public NAT gateway, which allows outbound internet connections from private subnets, or use VPC endpoints for supported AWS APIs.

### Remember

- Automatic deployment defaults to enabled for code and same-account ECR images; it defaults to disabled for ECR Public and cross-account ECR images.
- Memory is charged for all provisioned instances. CPU usage charges apply to the active subset. Deployments temporarily double provisioned instances to maintain old and new capacity.
- During maintenance, `OPERATION_IN_PROGRESS` can block management actions while the application keeps handling requests.
- App Runner stopped accepting new customers on April 30, 2026. Existing customers can still create resources and services. AWS plans no new features and recommends exploring ECS Express Mode for migration.

| Health-check setting | Default |
|---|---|
| Protocol | TCP |
| HTTP path | `/` |
| Interval | 5 seconds |
| Timeout | 2 seconds |
| Healthy threshold | 1 consecutive successful check |
| Unhealthy threshold | 5 consecutive failed checks |

> **Trap:** A VPC connector does not make the incoming endpoint private. Configure private incoming access separately.

> **Trap:** New-customer closure does not mean existing App Runner services shut down.
