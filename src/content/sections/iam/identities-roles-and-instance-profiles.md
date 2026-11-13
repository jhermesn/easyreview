---
title: Identities, roles, and instance profiles
level: associate
order: 10
facts:
  - id: role-trust
    text: A role trust policy controls who may assume the role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#term_trust-policy
  - id: role-permissions
    text: A role permissions policy defines the actions and resources available through the role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#iam-term-role
  - id: ec2-profile
    text: An instance profile is the container that passes an IAM role to an EC2 instance.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
  - id: ec2-credentials
    text: Applications retrieve temporary role credentials from EC2 instance metadata.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html#roles-usingrole-ec2instance-roles
  - id: ec2-refresh
    text: EC2 updates temporary credentials before expiration; SDK instance profile credential providers can
      retrieve and refresh them.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html#roles-usingrole-ec2instance-roles
  - id: profile-limit
    text: An instance profile can contain only one role; a role can appear in multiple profiles.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
  - id: profile-creation
    text: The console creates an instance profile with the same name for an EC2 role; CLI and API users create the
      profile separately.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
  - id: group-members
    text: IAM groups contain users, and users receive permissions from policies attached to their groups.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: group-not-principal
    text: An IAM group cannot be a Principal in a resource policy.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: group-no-nesting
    text: IAM groups cannot contain other groups.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: key-limit
    text: An IAM user can have at most two access keys.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
  - id: key-rotation
    text: To rotate without interrupting applications, create a second key while the first is active, update
      applications, inspect old-key usage, deactivate the old key, test, and then delete it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id-credentials-access-keys-update.html#rotating_access_keys_console
  - id: mfa-purpose
    text: MFA requires an additional authentication mechanism alongside sign-in credentials.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: mfa-factors
    text: A password is something you know; a security key is something you have; a biometric is something you are.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/mfa-types.html#mfa-types
  - id: mfa-separate
    text: Root and IAM users have separate credentials and MFA configurations.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: credential-vpc
    text: Compare aws:SourceVpc with aws:Ec2InstanceSourceVpc to require EC2 role credentials to be used through
      an endpoint in their original VPC.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourcevpc
  - id: credential-ip
    text: Compare aws:VpcSourceIp with aws:Ec2InstanceSourcePrivateIPv4 along with the VPC comparison; private
      addresses alone are not globally unique.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourceprivateip4
  - id: credential-scope
    text: The EC2 credential restriction example checks ec2:SourceInstanceARN for presence and exempts forwarded
      service calls using aws:ViaAWSService.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourcevpc
  - id: codeartifact-token-permissions
    text: CodeArtifact authorization-token retrieval requires both sts:GetServiceBearerToken and
      codeartifact:GetAuthorizationToken.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-permissions
  - id: cloudwatch-agent-role
    text: The CloudWatch agent on EC2 can use an instance role with CloudWatchAgentServerPolicy to publish data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/managed-policies-cloudwatch.html#managed-policies-cloudwatch-CloudWatchAgentServerPolicy
  - id: metadata-definition
    text: Instance metadata supplies information to applications on an EC2 instance, including temporary role
      credentials.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html#roles-usingrole-ec2instance-roles
  - id: vpc-definition
    text: A VPC is a logically isolated virtual network.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
diagrams:
  - id: iam-ec2-credentials
    title: EC2 applications use temporary role credentials
    width: 820
    height: 230
    nodes:
      - id: role
        label: Role in profile
        icon: res-identity-access-management-role
        x: 20
        y: 90
        w: 170
        h: 72
        tone: security
        info: Trust controls assumption; permissions control resource access.
      - id: app
        label: EC2 application
        icon: ec2
        x: 320
        y: 90
        w: 170
        h: 72
        tone: compute
        info: An SDK provider retrieves and refreshes credentials from instance metadata.
      - id: data
        label: S3 bucket
        icon: res-simple-storage-service-bucket
        x: 630
        y: 90
        w: 170
        h: 72
        tone: storage
        info: Requests use temporary role credentials.
    edges:
      - from: role
        to: app
        step: 1
        label: credentials
      - from: app
        to: data
        step: 2
        label: signed request
    steps:
      - The instance profile exposes the role credentials through EC2 metadata.
      - The application uses the credentials for actions permitted by the role.
cards:
  - id: iam-011
    q: Does an IAM role trust policy grant the resulting session permission to read application data?
    a: No. It controls who can assume the role. The role permissions policy defines its resource permissions.
    trap: true
    facts:
      - role-trust
      - role-permissions
  - id: iam-017
    q: An EC2 application needs AWS credentials without storing access keys in its machine image. What should the
      team attach?
    a: An IAM role through an instance profile. Use an SDK instance profile credential provider to retrieve and
      refresh temporary credentials.
    facts:
      - ec2-profile
      - ec2-credentials
      - ec2-refresh
  - id: iam-025
    q: A vendor can assume an IAM role but cannot read the required data. Which role policy defines resource
      access?
    a: The role permissions policy. Successful role assumption only establishes that its trust policy allowed the
      caller.
    trap: true
    facts:
      - role-trust
      - role-permissions
  - id: iam-027
    q: An application still uses an IAM user access key. How can the team rotate the key without interrupting
      access?
    a: Create the second key, update applications, inspect old-key usage, deactivate the old key, test the new
      key, and delete the old key after confirming the migration.
    facts:
      - key-limit
      - key-rotation
  - id: iam-028
    q: Can an IAM group contain another group or be named as Principal in an S3 bucket policy?
    a: No. Groups contain users and distribute identity-policy permissions; they are not authenticated principals.
    trap: true
    facts:
      - group-members
      - group-not-principal
      - group-no-nesting
  - id: iam-029
    q: A security team wants stolen EC2 role credentials rejected outside their original VPC and private address.
      Which IAM context keys should it compare?
    a: Compare aws:SourceVpc with aws:Ec2InstanceSourceVpc and aws:VpcSourceIp with
      aws:Ec2InstanceSourcePrivateIPv4. Scope the restriction to EC2 credentials and account for forwarded
      service calls.
    facts:
      - credential-vpc
      - credential-ip
      - credential-scope
  - id: iam-030
    q: Why does enabling MFA on the AWS root user not enable MFA for every IAM user?
    a: Root and IAM users have separate MFA configurations. Each identity needs its own additional authentication
      factor.
    facts:
      - mfa-separate
      - mfa-purpose
  - id: iam-031
    q: In AWS MFA, what distinguishes a password from a security key or biometric?
    a: A password is a knowledge factor; a security key is a possession factor; a biometric is an inherence
      factor. MFA combines factors.
    facts:
      - mfa-factors
      - mfa-purpose
---

IAM identities determine who makes a request. A role supplies permissions through a temporary session, a period during which temporary credentials are valid. An instance profile connects a role to an EC2 instance so its applications can use those credentials.

### How it works

1. Set the role trust policy to identify who can assume it. Attach a permissions policy for the actions and resources the application needs.
2. Put the role in an instance profile and attach the profile to EC2. The console creates the profile for an EC2 role; CLI and API workflows create it separately.
3. The application retrieves temporary credentials from instance metadata, information available to software on the instance. An AWS software development kit (SDK) instance profile credential provider can refresh them as EC2 rotates them.
4. For human access, IAM groups distribute policies to their user members. Multi-factor authentication (MFA) adds an independent factor: a password is something known, a security key is something held, and a biometric is something inherent to the person.
5. If an application still uses a user access key, create its replacement while the old key is active. Update every consumer, inspect usage, deactivate the old key, test, then delete it after confirming the transition.

### Exam cues

- If the question says EC2 needs AWS access without embedded keys, think role plus instance profile, because the application can retrieve refreshed temporary credentials.
- If the question says role assumption succeeds but a read fails, think role permissions policy, because trust only authorizes assumption.
- If the question says EC2 credentials must work only from their original network location, think paired VPC (isolated virtual network) and private-address comparisons, because a private address alone is not globally unique. Compare `aws:SourceVpc` with `aws:Ec2InstanceSourceVpc`, and `aws:VpcSourceIp` with `aws:Ec2InstanceSourcePrivateIPv4`. Check `ec2:SourceInstanceARN` for presence and account for forwarded calls with `aws:ViaAWSService`.

### Remember

- An instance profile contains one role. A role can be in multiple profiles.
- A user can have at most two access keys, allowing old and replacement keys to overlap.
- Group policies contribute to user permissions. Groups cannot be nested or named as principals, the authenticated identities in requests.
- Root and IAM users have separate MFA configurations.
- A CodeArtifact token needs `sts:GetServiceBearerToken` and `codeartifact:GetAuthorizationToken`. An EC2 CloudWatch agent can use an instance role with `CloudWatchAgentServerPolicy`.

> **Trap:** Enabling root MFA does not configure MFA for the account's IAM users.
