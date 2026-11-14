---
title: Managed nodes and hybrid activation
level: associate
order: 10
facts:
  - id: node-agent
    text: Managed nodes run SSM Agent to communicate with Systems Manager.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html#setup-instance-permissions
  - id: node-permissions
    text: EC2 node permissions can come from an IAM instance profile or Default Host Management
      Configuration.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html#setup-instance-permissions
  - id: node-profile
    text: An instance profile passes an IAM role to an EC2 instance.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html#instance-profile-add-permissions
  - id: node-profile-policy
    text: AmazonSSMManagedInstanceCore grants core Systems Manager node permissions.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html#instance-profile-add-permissions
  - id: node-outbound
    text: SSM Agent initiates connections to Systems Manager, so nodes need outbound HTTPS on port 443
      and no inbound Systems Manager port.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#setup-create-vpc
  - id: node-endpoint
    text: Private access uses interface VPC endpoints; their security groups must accept port 443 from
      the nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#vpc-requirements-and-limitations
  - id: node-endpoint-services
    text: Private Systems Manager access uses ssm and ssmmessages endpoints.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#create-vpc-endpoints
  - id: node-endpoint-services-s3
    text: Private S3 access supports agent updates, S3 scripts, output and patch operation buckets.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#create-vpc-endpoints
  - id: node-endpoint-services-logs
    text: Private CloudWatch logging requires the logs endpoint.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#create-vpc-endpoints
  - id: node-endpoint-services-kms
    text: Private KMS integration can require the kms endpoint.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#create-vpc-endpoints
  - id: node-message-versions
    text: SSM Agent 3.3.40.0 and later prefer ssmmessages when available.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up-messageAPIs.html#message-services
  - id: node-message-versions-region
    text: Regions launched in 2024 or later do not support ec2messages.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up-messageAPIs.html#message-services
  - id: node-dhmc-scope
    text: Default Host Management Configuration supplies node permissions without individual instance
      profiles in each account and Region where enabled.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-default-host-management-configuration.html#fleet-manager-default-host-management-configuration
  - id: node-dhmc-requires
    text: DHMC requires EC2 instances to use IMDSv2.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-default-host-management-configuration.html#dhmc-prerequisites
  - id: node-dhmc-requires-agent
    text: DHMC requires SSM Agent 3.2.582.0 or later.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-default-host-management-configuration.html#dhmc-prerequisites
  - id: node-dhmc-precedence
    text: An attached instance profile allowing ssm:UpdateInstanceInformation takes precedence over
      Default Host Management Configuration credentials.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-default-host-management-configuration.html#dhmc-prerequisites
  - id: node-activation
    text: CreateActivation returns an activation ID and code for registering non-EC2 machines with SSM
      Agent.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateActivation.html#API_CreateActivation
  - id: node-hybrid-role
    text: A hybrid activation assigns a service role that trusts ssm.amazonaws.com, rather than an EC2
      instance profile.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateActivation.html#systemsmanager-CreateActivation-request-IamRole
  - id: node-hybrid-id
    text: Hybrid-activated machines receive managed node IDs beginning with mi-.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/hybrid-activation-managed-nodes.html#hybrid-activation-managed-nodes
  - id: node-activation-expiry
    text: An activation expires after 24 hours by default.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateActivation.html#systemsmanager-CreateActivation-request-ExpirationDate
  - id: node-activation-expiry-maximum
    text: An activation expiration can be set up to 30 days ahead.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateActivation.html#systemsmanager-CreateActivation-request-ExpirationDate
  - id: node-activation-count
    text: CreateActivation defaults to one registration.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateActivation.html#systemsmanager-CreateActivation-request-RegistrationLimit
  - id: node-activation-count-maximum
    text: CreateActivation permits a registration limit up to 1000 per activation.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateActivation.html#systemsmanager-CreateActivation-request-RegistrationLimit
  - id: node-greengrass
    text: Greengrass core devices need a Systems Manager registration service role, an updated token
      exchange role and deployment of the SSM Agent component; Greengrass then registers them
      automatically.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up-edge-devices.html#systems-manager-edge-devices-install-SSM-agent
  - id: node-hybrid-pricing
    text: The hybrid advanced-instances tier was removed in June 2026.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-hybrid-multicloud.html#systems-manager-hybrid-multicloud
  - id: node-hybrid-pricing-pricing
    text: Session Manager and Run Command on hybrid nodes use pay-as-you-go pricing starting September
      2026.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-hybrid-multicloud.html#systems-manager-hybrid-multicloud
  - id: node-ec2-trust
    text: The IAM role attached through an EC2 instance profile trusts ec2.amazonaws.com.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html#attach-iam-role
  - id: node-imds-definition
    text: IMDSv2 uses session tokens when software retrieves EC2 instance metadata.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#configuring-instance-metadata-service
  - id: node-token-role
    text: The Greengrass token exchange role grants device components temporary AWS permissions.
    source: https://docs.aws.amazon.com/greengrass/v2/developerguide/device-service-role.html#device-service-role
  - id: term-iam
    text: "IAM: The AWS permissions system that controls which identities can perform actions on
      resources."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html#introduction
  - id: term-instance-profile
    text: "Instance profile: A container that passes an IAM role to an EC2 instance."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
  - id: term-interface-vpc-endpoint
    text: "Interface VPC endpoint: A private network entry point for connecting to a supported service
      through AWS PrivateLink."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#setup-create-vpc
  - id: term-security-group
    text: A set of rules that controls permitted network traffic for associated resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups
  - id: central-view
    text: Systems Manager gives a centralized view to see and manage EC2 instances, on-premises servers and other managed nodes across an organization's accounts.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html
  - id: managed-check
    text: The Config rule ec2-instance-managed-by-systems-manager marks EC2 instances NON_COMPLIANT when Systems Manager doesn't manage them, and DescribeInstanceInformation lists the managed nodes.
    source: https://docs.aws.amazon.com/config/latest/developerguide/ec2-instance-managed-by-systems-manager.html
diagrams:
  - id: ssm-node-connectivity
    title: Agent connections originate on the managed node
    width: 940
    height: 190
    nodes:
      - id: n0
        label: Managed node
        sub: SSM Agent
        icon: res-ec2-instance
        tone: compute
        x: 25
        y: 45
        w: 270
        h: 86
      - id: n1
        label: VPC endpoints
        sub: ssm and ssmmessages
        icon: privatelink
        tone: network
        x: 335
        y: 45
        w: 270
        h: 86
      - id: n2
        label: Systems Manager
        sub: management service
        icon: systems-manager
        tone: mgmt
        x: 645
        y: 45
        w: 270
        h: 86
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
    steps:
      - SSM Agent initiates an outbound HTTPS connection to a private endpoint on port 443.
      - The endpoint provides private access to Systems Manager; node permissions still authorize
        the calls.
cards:
  - id: systems-manager-010
    q: What makes an EC2 instance a Systems Manager managed node?
    a: SSM Agent, node IAM permissions and connectivity to Systems Manager. Permissions can come from an
      instance profile or Default Host Management Configuration.
    facts:
      - node-agent
      - node-permissions
      - node-outbound
  - id: systems-manager-011
    q: A private EC2 instance does not appear in Systems Manager. What should the operator check?
    a: Check SSM Agent, node permissions and outbound connectivity. For private endpoints, check ssm,
      ssmmessages and endpoint security groups allowing port 443 from the node. Do not require
      ec2messages in Regions launched in 2024 or later.
    trap: true
    facts:
      - node-agent
      - node-permissions
      - node-endpoint
      - node-endpoint-services
      - node-endpoint-services-s3
      - node-endpoint-services-logs
      - node-endpoint-services-kms
      - node-message-versions
      - node-message-versions-region
  - id: systems-manager-012
    q: How do on-premises servers become Systems Manager managed nodes through hybrid activation?
    a: Create an activation ID and code, then register SSM Agent. The activation assigns a service role
      trusting Systems Manager; registered node IDs start with mi-. An EC2 instance-profile role
      instead trusts ec2.amazonaws.com.
    facts:
      - node-activation
      - node-hybrid-role
      - node-hybrid-id
      - node-ec2-trust
  - id: systems-manager-036
    q: An EC2 fleet needs Systems Manager permissions without individual instance profiles. What must be
      enabled and installed?
    a: Enable Default Host Management Configuration in each account and Region. Instances must use
      IMDSv2 and SSM Agent 3.2.582.0 or later.
    facts:
      - node-dhmc-scope
      - node-dhmc-requires
      - node-dhmc-requires-agent
  - id: systems-manager-037
    q: A Systems Manager EC2 node still uses its instance role after Default Host Management
      Configuration is enabled. Why?
    a: An instance profile allowing ssm:UpdateInstanceInformation takes precedence. Remove that
      permission from the profile if the node should use Default Host Management Configuration.
    trap: true
    facts:
      - node-dhmc-precedence
  - id: systems-manager-038
    q: A team wants to manage Greengrass core devices with Systems Manager. Is a generic hybrid
      activation sufficient?
    a: "Follow the Greengrass setup: configure the registration service role and token exchange role,
      then deploy the SSM Agent component. Greengrass registers the devices automatically."
    trap: true
    facts:
      - node-greengrass
  - id: systems-manager-039
    q: What are the default expiration and registration limit for a Systems Manager hybrid activation?
    a: 24 hours and one registration. Expiration can be up to 30 days ahead, with a registration limit
      up to 1000 per activation.
    facts:
      - node-activation-expiry
      - node-activation-expiry-maximum
      - node-activation-count
      - node-activation-count-maximum
  - id: systems-manager-086
    q: An operator is preparing IAM roles for EC2 and hybrid Systems Manager nodes. Which service does
      each role trust?
    a: The role in an EC2 instance profile trusts ec2.amazonaws.com. The hybrid activation service role
      trusts ssm.amazonaws.com.
    facts:
      - node-ec2-trust
      - node-hybrid-role
  - id: systems-manager-108
    q: A company wants one place to view and operate both its EC2 instances and its on-premises servers. Which AWS service fits?
    a: AWS Systems Manager, which manages them all as managed nodes from a centralized view.
    facts: [central-view]
  - id: systems-manager-110
    q: A company must find EC2 instances that Systems Manager is not managing. What fits?
    a: The AWS Config rule ec2-instance-managed-by-systems-manager (or comparing running instances with DescribeInstanceInformation).
    facts: [managed-check]
---
A Systems Manager managed node is a machine configured to receive management actions through SSM Agent. The agent is the software on the machine that connects it to Systems Manager.

### How it works

1. Install and run SSM Agent. IAM is the AWS permissions system. For EC2, grant node permissions through an instance profile, the container for an IAM role attached to an instance, or through Default Host Management Configuration (DHMC). The instance role trusts `ec2.amazonaws.com`; the hybrid service role trusts `ssm.amazonaws.com`.
2. Give the agent an outbound HTTPS path. An interface VPC endpoint is a private network entry point to an AWS service. For private access, allow port 443 from the nodes into the endpoint security group, the rules that control its network traffic.
3. For non-EC2 servers, call `CreateActivation`, choose a service role that trusts `ssm.amazonaws.com`, and register SSM Agent with the returned activation ID and code. The resulting node ID starts with `mi-`.
4. For Greengrass core devices, configure the registration service role and token exchange role, which supplies temporary AWS permissions to device components. Deploy the SSM Agent component; Greengrass performs registration.

### Exam cues

- If the question says an EC2 fleet needs node permissions without per-instance profiles, think DHMC, because it supplies permissions within the enabled account and Region.
- If the question says a private node is missing, think agent, IAM and endpoint checks, because the agent needs all three to connect.
- If the question says Greengrass core devices need management, think the Greengrass SSM Agent component, because its registration flow includes the token exchange role.

### Remember

- DHMC requires IMDSv2, the token-based EC2 metadata service, and SSM Agent 3.2.582.0 or later.
- Use `ssm` and `ssmmessages`; agent 3.3.40.0 and later prefer `ssmmessages`. Regions launched in 2024 or later do not support `ec2messages`.
- Allow required S3 access for agent updates, scripts, output and patching. Private logging and KMS integrations also need their endpoints.
- Activation defaults: 24-hour expiration and one registration. Maximums: expiration 30 days ahead and 1000 registrations per activation.
- June 2026: the hybrid advanced-instances tier was removed. September 2026: hybrid Session Manager and Run Command moved to pay-as-you-go pricing.

> **Trap:** Enabling DHMC does not override an instance profile that permits `ssm:UpdateInstanceInformation`. That profile takes precedence.

> **Trap:** The 1000-registration limit is per activation, not a fleet limit.
