---
title: Resource control policies
level: professional
order: 30
facts:
  - id: organizations-rcp-ceiling
    text: An RCP limits available permissions on supported resources in organization member accounts
      without granting access.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: organizations-rcp-external
    text: An RCP on a member-account resource applies even when the requester belongs to an external
      account.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: organizations-rcp-scp
    text: SCPs constrain member-account principals, so a resource owner SCP does not restrict an
      external-account requester.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: organizations-rcp-features
    text: RCPs require all-features mode and the RCP policy type enabled.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: organizations-rcp-scope
    text: RCP-supported services include S3, KMS, STS, SQS, and Secrets Manager; coverage is
      service-specific.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: organizations-rcp-location
    text: RCPs can attach at the root, OU, or account and follow the resource-owning account hierarchy.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: organizations-rcp-management
    text: Resources in the management account are exempt from RCPs; resources in delegated administrator
      member accounts are not.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: organizations-rcp-linked
    text: RCPs do not restrict calls made using service-linked roles.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: organizations-rcp-baseline
    text: Enabling RCPs attaches RCPFullAWSAccess to the root, every OU, and every account; it cannot be
      detached.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps_evaluation.html
  - id: organizations-rcp-baseline-access
    text: RCPFullAWSAccess permits requests through RCP evaluation without granting resource access.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps_evaluation.html
  - id: organizations-rcp-deny
    text: A Deny in any applicable RCP on the resource account path overrides a resource policy Allow.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps_evaluation.html
  - id: organizations-rcp-effect
    text: Custom RCPs use Deny; Allow is reserved for the managed RCPFullAWSAccess policy.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps_syntax.html
  - id: organizations-rcp-principal
    text: RCP Principal supports only the wildcard *; NotPrincipal is unsupported.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps_syntax.html
  - id: organizations-rcp-organization
    text: aws:PrincipalOrgID identifies the requesting principal organization and avoids enumerating its
      accounts.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principalorgid
  - id: organizations-rcp-service-exception
    text: An RCP using principal-organization restrictions must account for AWS service principals, for
      example with aws:PrincipalIsAWSService exceptions.
    source: https://docs.aws.amazon.com/whitepapers/latest/building-a-data-perimeter-on-aws/perimeter-implementation.html
  - id: organizations-rcp-source-org
    text: aws:SourceOrgID can restrict service-principal access to requests originating from resources
      in a trusted organization.
    source: https://docs.aws.amazon.com/whitepapers/latest/building-a-data-perimeter-on-aws/perimeter-implementation.html
  - id: organizations-rcp-test
    text: AWS recommends testing RCP restrictions on individual accounts before applying them more
      broadly.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
diagrams:
  - id: organizations-external-rcp
    title: External requests still meet resource limits
    width: 800
    height: 300
    groups:
      - label: Member account
        x: 290
        y: 35
        w: 490
        h: 225
        tone: mgmt
        icon: group-aws-account
    nodes:
      - id: caller
        label: External caller
        icon: res-users
        x: 35
        y: 115
        w: 180
        h: 86
        tone: user
        sub: outside organization
      - id: rcp
        label: RCP evaluation
        icon: organizations
        x: 320
        y: 115
        w: 180
        h: 86
        tone: mgmt
        sub: applicable Deny wins
      - id: bucket
        label: S3 bucket
        icon: res-simple-storage-service-bucket
        x: 590
        y: 115
        w: 180
        h: 86
        tone: storage
        sub: resource permissions
    edges:
      - from: caller
        to: rcp
        step: 1
      - from: rcp
        to: bucket
        step: 2
    steps:
      - The requester is outside the organization, but the resource is in a member account.
      - Access must pass the applicable RCP ceiling and the policies that grant access; an RCP Deny
        blocks it.
cards:
  - id: organizations-007
    q: An S3 bucket in an AWS Organizations member account grants access to an external account. Does
      the bucket-owner SCP restrict that requester?
    a: No. It limits member-account principals. Use an applicable RCP or a restrictive bucket policy to
      control external access to that bucket.
    trap: true
    facts:
      - organizations-rcp-external
      - organizations-rcp-scp
      - organizations-rcp-ceiling
  - id: organizations-008
    q: How do RCPs and SCPs differ in AWS Organizations?
    a: RCPs limit supported member-account resources, including access by outside requesters. SCPs limit
      member-account principals. Neither grants access; management-account resources and
      service-linked-role calls are outside RCP restrictions.
    facts:
      - organizations-rcp-ceiling
      - organizations-rcp-external
      - organizations-rcp-scp
      - organizations-rcp-management
      - organizations-rcp-linked
  - id: organizations-012
    q: An AWS Organizations team must centrally block outside principals from member-account resources.
      Can it rely on an SCP alone?
    a: No. Use RCP restrictions for supported resources, alongside the policies that grant access. An
      SCP does not limit an external principal merely because the resource is in your organization.
    trap: true
    facts:
      - organizations-rcp-scp
      - organizations-rcp-external
      - organizations-rcp-ceiling
  - id: organizations-024
    q: Can an AWS Organizations administrator detach RCPFullAWSAccess to build an RCP allow list?
    a: No. The managed policy cannot be detached. Custom RCPs use Deny; only the managed
      RCPFullAWSAccess policy supports Allow.
    trap: true
    facts:
      - organizations-rcp-baseline
      - organizations-rcp-effect
  - id: organizations-025
    q: An AWS Organizations team applies an RCP using aws:PrincipalOrgID and breaks CloudTrail log
      delivery. What exception may be missing?
    a: Account for AWS service principals with an aws:PrincipalIsAWSService condition. A service
      principal is not an IAM principal belonging to your organization; aws:SourceOrgID can
      constrain the service request origin.
    facts:
      - organizations-rcp-organization
      - organizations-rcp-service-exception
      - organizations-rcp-source-org
  - id: organizations-026
    q: An AWS Organizations RCP denies S3 reads, but the bucket policy grants them. Which policy wins?
    a: The applicable RCP Deny wins. Resource-policy access must fit within the RCP ceiling.
    trap: true
    facts:
      - organizations-rcp-deny
      - organizations-rcp-ceiling
---

A resource control policy (RCP) limits access to supported resources in member accounts, including requests from outside the organization. Think of it as a ceiling attached to the resource owner's account hierarchy.

### How it works

1. Enable all features and RCPs. Confirm that the resource's service supports RCPs; documented examples include S3, KMS, STS, SQS, and Secrets Manager.
2. Organizations attaches `RCPFullAWSAccess` at the root, every OU, and every account. It cannot be detached and grants no resource access.
3. Attach custom `Deny` policies where restrictions belong. A Deny anywhere on the resource account's path wins over a resource policy Allow. Custom RCPs cannot use `Allow`.
4. Evaluate actual access with the relevant IAM and resource policies. A resource policy is a policy attached to a resource, such as an S3 bucket. It can grant access only within applicable organization limits.
5. Test on a small scope before broader use. Management-account resources and calls made through service-linked roles are exempt; delegated administrator member-account resources remain covered.

| Control | What it limits | Grants access? |
| --- | --- | --- |
| SCP | Member-account principals | No |
| RCP | Supported member-account resources, including outside access | No |
| Resource policy | Access to its attached resource | Can grant access within applicable limits |

To build an identity perimeter, a rule about who may reach data, use `aws:PrincipalOrgID` to identify the caller's organization. Account for AWS service principals with `aws:PrincipalIsAWSService` exceptions so services such as CloudTrail can deliver logs. `aws:SourceOrgID` can constrain which organization a service request originates from.

### Exam cues

- If the question says outside principals must be blocked from member-account S3 data, think RCP or bucket policy, because the bucket owner's SCP does not constrain those outside identities.
- If the question says a bucket policy Allow conflicts with an RCP Deny, think denied, because the resource grant cannot override the ceiling.
- If the question says organization-only access breaks AWS service delivery, think service-principal exceptions, because AWS services do not belong to the organization like IAM roles do.

### Remember

- `RCPFullAWSAccess` is automatic and cannot be detached.
- Custom RCPs use `Deny`; `Principal` supports only `*`, and `NotPrincipal` is unsupported.
- RCP coverage is service-specific; enabling RCPs does not restrict every AWS resource type.

> **Trap:** An RCP passing a request does not grant it access. The required IAM or resource policy permissions must still exist.
