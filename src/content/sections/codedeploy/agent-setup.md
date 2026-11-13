---
title: Agent setup
level: associate
order: 30
facts:
  - id: agent-needed
    text: EC2/On-Premises requires the CodeDeploy agent; Lambda and ECS deployments do not.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent
  - id: agent-port
    text: The CodeDeploy agent communicates outbound using HTTPS on port 443.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-outbound-port
  - id: profile
    text: An EC2 instance profile provides the agent permissions to communicate with CodeDeploy and
      download the S3 revision.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-agent-commandpoller-error
  - id: service-role
    text: The CodeDeploy service role grants the service permissions to discover targets and operate on
      deployment resources.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-service-role
  - id: bootstrap
    text: Finish cfn-init bootstrap scripts before starting the CodeDeploy agent to avoid deployment
      ordering failures.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html#integrations-aws-auto-scaling-behaviors-event-order
  - id: ssm-prerequisite
    text: Using Systems Manager to install the CodeDeploy agent requires an instance configured for
      Systems Manager.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-ssm.html#download-codedeploy-agent-on-EC2-Instance
  - id: never
    text: The Never agent configuration option skips installation through Systems Manager.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-in-place.html#deployment-groups-create-in-place
  - id: once
    text: The Only once agent configuration option installs the CodeDeploy agent once through Systems
      Manager.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-in-place.html#deployment-groups-create-in-place
  - id: scheduled
    text: Now and schedule updates creates a State Manager association to install the agent on the
      chosen schedule.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-in-place.html#deployment-groups-create-in-place
  - id: v2-package
    text: From July 2026, the AWSCodeDeployAgentV2 Distributor package installs agent 2.0.x and later;
      AWSCodeDeployAgent serves the 1.8.x line.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-version-history
  - id: private-endpoints
    text: CodeDeploy provides separate interface VPC endpoints for API operations and agent operations.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/vpc-endpoints.html#create-vpc-endpoint-for-codedeploy
  - id: endpoint-auth
    text: Using the agent endpoint requires enable_auth_policy set to true and the documented
      codedeploy-commands-secure permissions on the instance identity.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/vpc-endpoints.html#vpc-codedeploy-agent-configuration
  - id: s3-endpoint
    text: An S3 gateway endpoint lets instances access S3 without an internet gateway or NAT device.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#vpc-endpoints-s3
  - id: registration
    text: RegisterOnPremisesInstance associates an instance name with either an IAM user ARN or an IAM
      session ARN, never both.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_RegisterOnPremisesInstance.html#API_RegisterOnPremisesInstance
  - id: session-refresh
    text: On-premises registration with an IAM session ARN uses temporary STS credentials that need
      periodic refresh.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/register-on-premises-instance-iam-session-arn.html#register-on-premises-instance-iam-session-arn-prerequisites
  - id: onprem-agent
    text: On-premises instances must have the agent installed and be registered and tagged for
      deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-on-premises.html#instances-on-premises
  - id: parameter-access
    text: An identity that reads a Systems Manager parameter needs permission for the retrieval action,
      such as ssm:GetParameter or ssm:GetParameters, on the required parameters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-setting-up.html#parameter-store-setting-up
  - id: profile-definition
    text: An instance profile passes an IAM role to software on an EC2 instance.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
  - id: role-definition
    text: An IAM role is an identity with permissions that applications or services can assume.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#id_roles
  - id: arn-definition
    text: An ARN uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
  - id: association-definition
    text: A State Manager association specifies the configuration to apply to managed instances on a
      schedule.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-in-place.html#deployment-groups-create-in-place
  - id: endpoint-definition
    text: An interface endpoint provides a private service entry point in a VPC.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/vpc-endpoints.html#vpc-endpoints
  - id: credentials-expire
    text: STS temporary security credentials expire and must be replaced to continue accessing AWS.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#id_credentials_temp
cards:
  - id: codedeploy-011
    q: New EC2 instances configured by cfn-init fail their first CodeDeploy release because deployment
      starts before setup completes. What should change?
    a: Finish the bootstrap scripts before starting the CodeDeploy agent. Install it last, or start an
      agent baked into the machine image as the final bootstrap step.
    trap: true
    facts:
      - bootstrap
  - id: codedeploy-015
    q: What does CodeDeploy require on EC2 that its Lambda and ECS deployments do not require?
    a: The CodeDeploy agent. EC2 also needs an instance profile with permissions for deployment
      communication and the S3 revision.
    facts:
      - agent-needed
      - profile
  - id: codedeploy-016
    q: How can CodeDeploy install and update its agent across a fleet with Systems Manager?
    a: Configure instances for Systems Manager and choose Never, Only once, or Now and schedule updates.
      Scheduled updates use a State Manager association. Select AWSCodeDeployAgentV2 for agent 2.x
      or AWSCodeDeployAgent for 1.8.x.
    facts:
      - ssm-prerequisite
      - never
      - once
      - scheduled
      - v2-package
  - id: codedeploy-017
    q: What connectivity and credentials does a CodeDeploy agent on EC2 need for an S3 revision?
    a: Outbound HTTPS on port 443 and an instance profile authorized to communicate with CodeDeploy and
      retrieve the S3 revision. Private endpoints require their documented agent authentication
      configuration.
    facts:
      - agent-port
      - profile
      - private-endpoints
      - endpoint-auth
  - id: codedeploy-042
    q: A team wants to deploy with CodeDeploy to physical servers using expiring credentials. How should
      it register them?
    a: Use RegisterOnPremisesInstance with the instance name and an IAM session ARN, configure the
      agent, and refresh STS credentials periodically. Do not supply an IAM user ARN in the same
      request.
    facts:
      - registration
      - session-refresh
      - onprem-agent
  - id: codedeploy-043
    q: An EC2 CodeDeploy agent must operate without public internet access. Which network paths should
      the design provide?
    a: Provide CodeDeploy API and agent interface endpoints and S3 access, such as an S3 gateway
      endpoint. Enable the agent endpoint authentication setting and grant its command permissions.
    facts:
      - private-endpoints
      - endpoint-auth
      - s3-endpoint
  - id: codedeploy-062
    q: An on-premises CodeDeploy hook authenticates successfully but cannot read application settings
      from Parameter Store. What permission should be checked?
    a: Check the identity used by the hook for the matching retrieval permission, such as
      ssm:GetParameter or ssm:GetParameters, on the required parameters. Registration alone does not
      grant parameter access.
    facts:
      - registration
      - parameter-access
---
The CodeDeploy agent is the software on an EC2 or on-premises server that carries out deployments. It retrieves instructions and revision content, then runs the deployment steps on that server.

### How it works

1. For EC2, attach an instance profile, which supplies an IAM role to software on the instance. A role is an identity with permissions that software can assume. Give CodeDeploy its separate service role to manage deployment resources.
2. Allow outbound HTTPS on port 443 to CodeDeploy and the revision store. For private access, provide CodeDeploy API and agent interface endpoints, private entry points into those services, plus access to S3.
3. When using the agent endpoint, set `:enable_auth_policy:` to `true` and grant the documented `codedeploy-commands-secure` permissions to the instance identity.
4. Finish instance setup before starting the agent. With `cfn-init`, the CloudFormation bootstrap helper, install or start the agent after the other setup scripts.
5. Install directly or use Systems Manager on managed instances. A State Manager association is a scheduled instruction that keeps software configured as requested.
6. For on-premises servers, install the agent, register each instance name with an IAM user ARN or IAM session ARN, and tag it. ARN means AWS resource identifier. Session registration uses temporary STS credentials, which must be refreshed.
7. If a hook reads configuration from Parameter Store, a store of named settings, authorize the identity making that request for the matching retrieval action, such as `ssm:GetParameter` or `ssm:GetParameters`.

| Agent configuration option | Systems Manager action |
|---|---|
| Never | Skip agent installation |
| Only once | Install once |
| Now and schedule updates | Create a State Manager association for scheduled installation |

### Exam cues

- If the question says deployment races instance setup, think start the agent last, because it can begin deployment before bootstrap finishes.
- If the question says physical servers need temporary credentials, think IAM session ARN registration, because CodeDeploy supports STS session authentication.
- If the question says no public internet, think CodeDeploy interface endpoints and an S3 gateway endpoint, because these provide private service access.

### Remember

- EC2/On-Premises needs the agent; Lambda and ECS do not.
- Agent communication uses outbound HTTPS on port 443.
- From July 2026, use Distributor package `AWSCodeDeployAgentV2` for agent 2.x; `AWSCodeDeployAgent` serves 1.8.x.

> **Trap:** Installing the agent does not register an on-premises server. Registration, credentials, and deployment tags are separate requirements.
