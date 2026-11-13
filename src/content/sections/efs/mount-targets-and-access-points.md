---
title: Mount targets and access points
level: associate
order: 20
facts:
  - id: target-endpoint
    text: A mount target provides the NFS endpoint address for an EFS file system in a VPC.
    source: https://docs.aws.amazon.com/efs/latest/ug/how-it-works.html#how-it-works
  - id: target-placement
    text: Regional EFS allows one mount target per AZ, and a file system has mount targets in only one
      VPC at a time.
    source: https://docs.aws.amazon.com/efs/latest/ug/how-it-works.html#how-it-works
  - id: target-port
    text: The client needs outbound TCP 2049, and the mount target needs inbound TCP 2049 from the
      client.
    source: https://docs.aws.amazon.com/efs/latest/ug/network-access.html#network-access
  - id: routed-clients
    text: Clients in connected VPCs or on-premises networks can reach EFS mount targets through suitable
      private connectivity.
    source: https://docs.aws.amazon.com/efs/latest/ug/network-access.html#network-access
  - id: ap-root
    text: An access point can enforce a directory as the client root, restricting that mount to the
      directory and its descendants.
    source: https://docs.aws.amazon.com/efs/latest/ug/enforce-root-directory-access-point.html#enforce-root-directory-access-point
  - id: ap-identity
    text: An access point can replace client user and group IDs with configured POSIX user and group IDs
      for file operations.
    source: https://docs.aws.amazon.com/efs/latest/ug/enforce-identity-access-points.html#enforce-identity-access-points
  - id: ap-target
    text: Access points require at least one mount target; security groups attach to mount targets
      rather than access points.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-access-points.html#accesspoints-and-mount-targets
  - id: ap-enforce
    text: IAM policies can require a particular access point using elasticfilesystem:AccessPointArn.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#efs-condition-keys-for-nfs
  - id: ap-helper
    text: Access-point mounts use the EFS mount helper with tls and accesspoint= options; IAM
      authorization also requires the helper.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-access-points.html#efs-access-points
  - id: iam-combination
    text: EFS evaluates IAM identity and file system resource policies for NFS client permissions; an
      allow can come from either, subject to applicable explicit denies.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#iam-access-control-nfs-efs
  - id: iam-actions
    text: ClientMount authorizes read-only access, ClientWrite authorizes writes, and ClientRootAccess
      authorizes use of root.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#efs-filesystempolicy-actions
  - id: default-policy
    text: Without a user-configured file system policy, the default permits anonymous clients that can
      connect through a mount target; file permissions still apply.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#default-filesystempolicy
  - id: posix-check
    text: EFS checks numeric POSIX user and group identities against file and directory permissions.
    source: https://docs.aws.amazon.com/efs/latest/ug/accessing-fs-nfs-permissions.html#accessing-fs-nfs-permissions
  - id: missing-root
    text: An access-point root directory must exist or specify creation ownership and permissions;
      otherwise mounting the access point fails.
    source: https://docs.aws.amazon.com/efs/latest/ug/enforce-root-directory-access-point.html#create-root-directory-access-point
  - id: lambda-ap
    text: Lambda file-system configuration mounts EFS through an access point so function invocations
      can share files.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem-efs.html#configuration-filesystem-efs
  - id: cross-account-lambda
    text: Lambda can use EFS through a cross-account VPC path when routing, security groups, IAM
      permissions, access-point access, and file permissions permit it.
    source: https://aws.amazon.com/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/
cards:
  - id: efs-003
    q: What controls can an EFS access point enforce, and does it replace the mount target?
    a: An application root directory and optional POSIX user and group identity. It still uses a mount
      target for connectivity. Use the EFS mount helper with tls and accesspoint= options; IAM can
      require the chosen access point.
    facts:
      - ap-root
      - ap-identity
      - ap-target
      - ap-helper
      - ap-enforce
  - id: efs-013
    q: Two applications share EFS but must use separate directories and fixed Unix identities. How
      should access be configured?
    a: Give each application an access point with its own enforced root and POSIX identity. Require the
      appropriate access point in IAM policies.
    facts:
      - ap-root
      - ap-identity
      - ap-enforce
  - id: efs-014
    q: An EFS client has IAM permission and an access point but its mount connection times out. What
      should the team check?
    a: Private connectivity to a mount target, outbound TCP 2049 from the client, and inbound TCP 2049
      at the target. An access point does not supply network connectivity.
    facts:
      - target-endpoint
      - target-port
      - routed-clients
      - ap-target
  - id: efs-015
    q: An EFS IAM policy allows mounting, but writes fail. What additional permissions must the team
      examine?
    a: ClientWrite for write authorization and POSIX directory and file permissions for the effective
      user and group. ClientMount grants read-only access.
    facts:
      - iam-actions
      - posix-check
  - id: efs-016
    q: An EFS access point names a root directory that does not exist and supplies no creation
      permissions. What happens?
    a: The mount fails. Create the directory with appropriate permissions or provide access-point
      creation ownership and permissions.
    facts:
      - missing-root
  - id: efs-017
    q: A Lambda function must share persistent files through EFS in a connected account. Are
      access-point permissions alone sufficient?
    a: No. It also needs routed VPC connectivity, security-group access, appropriate IAM permissions,
      and file permissions. Configure the Lambda EFS access point.
    trap: true
    facts:
      - cross-account-lambda
      - lambda-ap
---

An EFS mount target provides network connectivity; an access point defines how an application sees and identifies itself to the shared file system. A root directory is the top folder visible through that mount. A POSIX identity is the numeric Unix-style user and group used for file permission checks.

### How it works

1. Create mount targets in the file system's VPC. Regional file systems allow one per AZ, and all targets for one file system belong to one VPC at a time.
2. Establish private connectivity. The client security group allows outbound TCP 2049 and the target group allows inbound TCP 2049 from clients. Connected VPCs and on-premises networks need suitable private paths.
3. Configure the access point's root directory and optional enforced user and group. Ensure the root exists with suitable permissions, or provide creation ownership and permissions.
4. Mount using the EFS helper with `tls` and `accesspoint=`. TLS encrypts the connection in transit. IAM authorization also uses the helper.
5. Evaluate identity and file system policies, then file permissions. Require the intended access point with `elasticfilesystem:AccessPointArn` when applications must not bypass that entry point.

| Control | What it controls |
|---|---|
| Mount target and security group | The network path and permitted clients |
| Access point | Application root directory and optional enforced POSIX identity |
| IAM client authorization | Permission to mount, write, or use root |
| POSIX file permissions | File and directory operations for the effective user and group |

### Exam cues

- If the question says applications share EFS but need different visible directories, think access points plus IAM enforcement, because each mount can expose its own root and identity.
- If the question says mounting times out despite permissions, think the mount target's private network path and TCP 2049, because authorization cannot create connectivity.
- If the question says a Lambda function needs shared persistent files across a connected account, think EFS access-point configuration plus network and permission checks, because each layer is required.

### Remember

- Security groups attach to mount targets, not access points.
- `ClientMount`: read-only access. `ClientWrite`: writes. `ClientRootAccess`: root identity.
- EFS evaluates both identity and file system policies; permission does not universally need an allow in both.
- Without a user-configured file system policy, the default permits reachable anonymous clients. POSIX file permissions still apply.

> **Trap:** A fixed access-point user does not grant every file operation. EFS still checks that effective user's file and directory permissions.

> **Trap:** An access point does not replace a mount target. Both the network path and application authorization must work.
