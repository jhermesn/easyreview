---
title: Resource sharing and invitations
level: professional
order: 10
facts:
  - id: ram-purpose
    text: AWS RAM shares supported resources across accounts, organizations, organizational units, and for some resource types IAM roles and users.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is
  - id: ram-share
    text: A resource share contains owned resources, principals, and a managed permission for each resource type.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: ram-ownership
    text: The owning account retains ownership of shared resources.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: ram-org-enable
    text: Organization sharing requires enabling sharing through AWS RAM from the management account with all Organizations features enabled; enabling trusted access only in Organizations does not create the required service-linked role.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-invitations
    text: Sharing with accounts in an organization normally requires no invitation when organization sharing is enabled; external accounts or accounts in the organization without sharing enabled receive an invitation.
    source: https://docs.aws.amazon.com/ram/latest/userguide/working-with-shared-invitations.html#working-with-shared-invitations
  - id: ram-retain
    text: RetainSharingOnAccountLeaveOrganization can be enabled when creating an individual account share that allows external principals; it sends an invitation and preserves access if the account leaves the organization.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-retain-limits
    text: The retention option does not apply to organization or OU shares and cannot be used with resources shareable only within an organization.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-ou
    text: An organizational unit is a group of AWS accounts within an organization and can contain other organizational units.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#organizationalunit
  - id: ram-permission
    text: The managed permission defines the maximum cross-account permissions, and consuming account administrators must grant roles and users access through identity-based policies.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: ram-visibility
    text: RAM can target an organization or OU without listing account IDs, and shared resources appear in the originating service console and API for consumers.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-about-res-pol-sharing
  - id: ram-subnets
    text: A VPC owner can share subnets with accounts in the same organization; participants can manage their own application resources in the shared subnets.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html#vpc-sharing
  - id: ram-subnet-isolation
    text: Participants cannot view, modify, or delete application resources belonging to other participants or the VPC owner.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html#vpc-sharing
  - id: ram-subnet-owner
    text: Only the VPC owner can modify the shared VPC and subnets; participants cannot modify them.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-share-limitations.html#vpc-resource-permissions
  - id: ram-vpc-subnet
    text: A VPC is an isolated virtual network, and a subnet is a range of IP addresses within it.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: ram-transit
    text: AWS RAM can share a transit gateway for VPC attachments across accounts; recipients cannot manage its route tables, propagations, or associations.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/working-with-transit-gateways.html#transit-gateway-share
  - id: ram-transit-purpose
    text: A transit gateway is a central hub for routing traffic between VPCs, VPNs, and Direct Connect connections.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: ram-resolver
    text: Route 53 Resolver rules can be shared through AWS RAM; the recipient can associate a shared rule with its VPC but cannot change or delete it.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html#resolver-rules-managing-sharing
  - id: ram-forwarding-purpose
    text: A Route 53 Resolver forwarding rule forwards DNS queries for a specified domain to the configured resolvers.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html#resolver-rules-managing-associating-rules
  - id: ram-region
    text: A share contains Regional resources in the same Region as the share; global resources use the designated home Region us-east-1.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: ram-expiry
    text: Invitations for the listed resource types including transit gateways and subnets expire after seven days; invitations for resource types not on that list expire after 12 hours.
    source: https://docs.aws.amazon.com/ram/latest/userguide/working-with-shared-invitations.html#working-with-shared-invitations
  - id: ram-membership
    text: By default a consuming account loses organization-based access when it leaves the organization.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-re-share
    text: A resource received through a share cannot be shared again by the recipient.
    source: https://docs.aws.amazon.com/ram/latest/userguide/working-with-sharing-create.html#working-with-sharing-create
  - id: ram-version
    text: A new share uses the default version of its managed permission, and existing shares do not automatically update when a new default version is released.
    source: https://docs.aws.amazon.com/ram/latest/userguide/security-ram-permissions.html#security-ram-permissions
diagrams:
  - id: ram-cross-account-sharing
    title: Cross-account resource sharing
    width: 800
    height: 190
    nodes:
      - { id: owner, label: Owner account, x: 25, y: 65, w: 150, h: 72, tone: neutral }
      - { id: ram, label: AWS RAM, x: 325, y: 65, w: 150, h: 72, tone: security, icon: resource-access-manager }
      - { id: consumer, label: Consumer account, x: 625, y: 65, w: 150, h: 72, tone: neutral }
    edges:
      - { from: owner, to: ram, step: 1 }
      - { from: ram, to: consumer, step: 2 }
    steps:
      - The owner creates a share with resources, principals, and managed permissions.
      - The consumer accepts an invitation when required and grants its users access within the permission ceiling.
cards:
  - id: resource-access-manager-001
    q: Can AWS RAM share VPC subnets across accounts?
    a: Yes. The VPC owner shares subnets with accounts in the same organization; participants manage their own application resources in those subnets.
    facts: [ram-subnets]
  - id: resource-access-manager-002
    q: A team needs to share a subnet across its organization without invitations. What should it use?
    a: Enable sharing with Organizations through AWS RAM, then create a share targeting the organization or an OU.
    facts: [ram-org-enable, ram-invitations, ram-subnets, ram-purpose]
  - id: resource-access-manager-003
    q: Why use AWS RAM rather than only a resource-based policy for cross-account sharing?
    a: RAM can target an organization or OU without listing account IDs, and consumers can see shared resources in the service console and API.
    facts: [ram-visibility]
  - id: resource-access-manager-004
    q: A receiving account accepted an AWS RAM share but a user still lacks access. What must its administrator check?
    a: Grant the user an identity-based permission within the resource share's managed permission ceiling.
    facts: [ram-permission]
  - id: resource-access-manager-005
    q: Does enabling trusted access only in AWS Organizations complete setup for organization sharing in AWS RAM?
    a: No. Enable sharing through AWS RAM so the required service-linked role is created.
    facts: [ram-org-enable]
    trap: true
  - id: resource-access-manager-006
    q: How long does an AWS RAM invitation for a transit gateway remain valid?
    a: Seven days. Resource types not on AWS's seven-day list have 12 hours.
    facts: [ram-expiry]
  - id: resource-access-manager-007
    q: An account must retain an AWS RAM share after leaving its organization. What option can the owner use?
    a: When creating an eligible individual-account share, enable RetainSharingOnAccountLeaveOrganization and allow external principals. The recipient must accept an invitation. Organization-only resources are not eligible.
    facts: [ram-retain, ram-retain-limits]
  - id: resource-access-manager-008
    q: Does an existing AWS RAM resource share automatically switch to a new default managed permission version?
    a: No. Existing shares are not automatically updated.
    facts: [ram-version]
    trap: true
  - id: resource-access-manager-009
    q: A network account wants other accounts to attach VPCs to its transit gateway. What sharing service can it use?
    a: AWS RAM can share the transit gateway; recipients can create VPC attachments but cannot manage its route tables.
    facts: [ram-transit]
---
AWS Resource Access Manager (AWS RAM) shares supported resources across accounts without creating a separate copy for each account. The owner keeps the resource; a resource share describes who may use it and what they may do.

A virtual private cloud (VPC) is an isolated virtual network. A subnet is a range of IP addresses inside it.

### How it works

1. For organization-wide sharing, enable sharing through AWS RAM from the management account. AWS Organizations must have all features enabled.
2. The owner creates a resource share, adds owned resources, selects a managed permission for each resource type, and names principals: accounts, an organization, organizational units (OUs), or supported IAM roles and users. An OU is a group of accounts in an organization.
3. When organization sharing is enabled, accounts in the organization normally receive access without an invitation. Outside accounts, or accounts sharing without organization integration, must accept an invitation.
4. The managed permission sets the maximum cross-account actions. The consuming account administrator grants its users and roles permissions to the shared resource.

### Exam cues

- If the question says share subnets across accounts in one organization, think AWS RAM, because the VPC owner can share subnets with those accounts.
- If the question says a recipient accepted a share but a user cannot use it, think identity-based permissions in the consuming account, because the share's managed permission is a ceiling.
- If the question says an account must keep access after leaving an organization, think the retention option on an eligible new individual-account share, because it requires an invitation and allows external principals.
- If the question says enable organization sharing, think the AWS RAM console or CLI, because enabling trusted access only in Organizations does not create the required service-linked role.

### Remember

- Subnet and transit gateway invitations expire after seven days; resource types not on AWS's seven-day list expire after 12 hours.
- Regional resources belong in a share in the same Region; global resources use `us-east-1` for the share.
- By default, an account leaving the organization loses its organization-based access.
- Participants manage their own application resources in shared subnets, not those owned by other participants.
- Only the VPC owner can modify the shared VPC or subnets.
- AWS RAM can also share transit gateways and Route 53 Resolver forwarding rules across accounts. A transit gateway connects networks; a forwarding rule directs name queries.
- The retention option cannot be used with resources limited to sharing within an organization.
- A new share uses the managed permission's default version; existing shares do not automatically update to a new version.

> **Trap:** A shared resource is not transferred to the consumer, and a consumer cannot share it onward. The original owner retains ownership.
