---
title: Applications and deployment groups
level: associate
order: 10
facts:
  - id: application
    text: An application groups the revisions, deployment groups, and deployment configurations used to
      release an application.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-application
  - id: revision
    text: An EC2/On-Premises revision is an archive containing application content and an AppSpec file.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-revision
  - id: configuration
    text: A deployment configuration defines rollout rules and success or failure conditions.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-configuration
  - id: platforms
    text: The compute platforms are EC2/On-Premises, AWS Lambda, and Amazon ECS.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-compute-platform
  - id: in-place
    text: In-place deployment stops, updates, starts, and validates an application on existing EC2 or
      on-premises instances.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-type
  - id: ec2-bluegreen
    text: Blue/green deployment on the EC2/On-Premises platform replaces EC2 instances; on-premises
      instances are not supported.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-type
  - id: managed-bluegreen
    text: Lambda deployments shift traffic between function versions, and ECS deployments shift traffic
      between original and replacement task sets.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-compute-platform
  - id: instance-targets
    text: An EC2/On-Premises deployment group selects instances using tags, Auto Scaling group names, or
      both.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-group
  - id: lambda-group
    text: A Lambda deployment group identifies AppSpec files and stores deployment options such as
      alarms and rollback settings.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-lambda.html#deployment-steps-registering-app-deployment-groups-lambda
  - id: ecs-group
    text: An ECS deployment group identifies a cluster, service, production listener, optional test
      listener, and two target groups.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-steps-prerequisites-ecs
  - id: tag-or
    text: An instance matches a tag group when it matches at least one tag in that group.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-tagging.html#instances-tagging
  - id: tag-and
    text: With multiple tag groups, an instance must match at least one tag in every group.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-tagging.html#instances-tagging
  - id: tag-limits
    text: A deployment group supports up to three tag groups with up to ten tags each.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-tagging.html#instances-tagging
  - id: service-role
    text: A CodeDeploy service role authorizes operations on target resources, publishing SNS
      notifications, and reading CloudWatch alarms.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-service-role
  - id: agent-platform
    text: Only EC2/On-Premises deployments require the CodeDeploy agent.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent
  - id: task-set-definition
    text: An ECS task set runs an application version as a group of tasks.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-compute-platform
  - id: appspec-definition
    text: AppSpec is the deployment instruction file used to describe deployment resources or file
      installation and hooks.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/application-specification-files.html#application-specification-files
cards:
  - id: codedeploy-029
    q: A CodeDeploy group must select EC2 instances tagged Environment=Beta or Environment=Staging, and
      Region=North or Region=South. How should the tags be grouped?
    a: Use one tag group for the Environment alternatives and another for the Region alternatives. Tags
      are OR within each group and AND across groups.
    trap: true
    facts:
      - tag-or
      - tag-and
  - id: codedeploy-034
    q: Which CodeDeploy platforms support in-place and blue/green deployment?
    a: In-place supports EC2 and on-premises instances. Blue/green supports EC2, Lambda, and ECS; it
      does not support on-premises instances.
    trap: true
    facts:
      - in-place
      - ec2-bluegreen
      - managed-bluegreen
  - id: codedeploy-038
    q: What is the difference between a CodeDeploy application, deployment group, and deployment
      configuration?
    a: The application groups release resources; the deployment group identifies targets and settings;
      the configuration defines rollout and success rules.
    facts:
      - application
      - instance-targets
      - lambda-group
      - ecs-group
      - configuration
  - id: codedeploy-039
    q: A CodeDeploy application must deploy to an Auto Scaling group as instances are replaced. How
      should the deployment group identify it?
    a: Specify the Auto Scaling group name. CodeDeploy selects Auto Scaling groups by name rather than
      their instance tags.
    facts:
      - instance-targets
---
CodeDeploy uses an application to keep release resources together. A revision is a version to deploy; a deployment group identifies where it goes; a deployment configuration defines the rollout rules.

### How it works

1. Create an application for its compute platform, meaning the type of resource that runs the application.
2. Supply a revision. For EC2/On-Premises, this is an archive with application files and an AppSpec file, the deployment instructions.
3. Select a deployment group and its targets. Use the platform table below to distinguish them.
4. Give CodeDeploy a service role, an IAM role that authorizes the service to act on AWS resources, and choose a deployment configuration.

| Platform | Deployment targets | Deployment type | CodeDeploy agent |
|---|---|---|---|
| EC2/On-Premises | Tagged instances or named Auto Scaling groups | In-place; blue/green for EC2 only | Required |
| Lambda | Function versions described by AppSpec files | Blue/green traffic shift | Not required |
| ECS | Cluster and service, listeners, and two target groups | Blue/green task set replacement | Not required |

In-place updates existing servers. Blue/green moves traffic from an original environment to a replacement. An ECS task set is a group of tasks running a particular application version.

### Exam cues

- If the question says instances must match several independent tag conditions, think separate tag groups, because a match is required in every group.
- If the question says deploy to an Auto Scaling group, think group name, because CodeDeploy identifies that group by name.
- If the question says update on-premises servers, think in-place, because EC2/On-Premises blue/green supports EC2 instances only.

### Remember

- Three compute platforms: EC2/On-Premises, Lambda, and ECS.
- Up to three tag groups, each with up to ten tags.
- Tags use OR within a group and AND across groups.
- Deployment configurations govern both rollout pace and success conditions.

> **Trap:** Putting every tag in one group broadens selection: an instance needs only one matching tag in that group.
