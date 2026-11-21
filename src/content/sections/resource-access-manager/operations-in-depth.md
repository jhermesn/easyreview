---
title: Organization sharing and permission versions
level: professional
order: 20
facts:
  - id: ram-org-enable
    text: Organization sharing requires enabling sharing through AWS RAM from the management account with all Organizations features enabled; enabling trusted access only in Organizations does not create the required service-linked role.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-retain
    text: RetainSharingOnAccountLeaveOrganization can be enabled when creating an individual account share that allows external principals; it sends an invitation and preserves access if the account leaves the organization.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-retain-limits
    text: The retention option does not apply to organization or OU shares and cannot be used with resources shareable only within an organization.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-version
    text: A new share uses the default version of its managed permission, and existing shares do not automatically update when a new default version is released.
    source: https://docs.aws.amazon.com/ram/latest/userguide/security-ram-permissions.html#security-ram-permissions
cards:
  - id: resource-access-manager-005
    q: Does enabling trusted access only in AWS Organizations complete setup for organization sharing in AWS RAM?
    a: No. Enable sharing through AWS RAM so the required service-linked role is created.
    facts: [ram-org-enable]
    trap: true
  - id: resource-access-manager-007
    q: An account must retain an AWS RAM share after leaving its organization. What option can the owner use?
    a: When creating an eligible individual-account share, enable RetainSharingOnAccountLeaveOrganization and allow external principals. The recipient must accept an invitation. Organization-only resources are not eligible.
    facts: [ram-retain, ram-retain-limits]
  - id: resource-access-manager-008
    q: Does an existing AWS RAM resource share automatically switch to a new default managed permission version?
    a: No. Existing shares are not automatically updated.
    facts: [ram-version]
    trap: true
---
AWS Resource Access Manager (AWS RAM) has specific setup and retention options for sharing within an organization. Managed permission versions also determine whether a new default affects an existing share.

### How it works

1. Enable sharing with AWS Organizations through AWS RAM from the management account, with all Organizations features enabled. Enabling trusted access only in Organizations does not create the required service-linked role.
2. To preserve access for an individual account that leaves the organization, enable `RetainSharingOnAccountLeaveOrganization` when creating its share and allow external principals. AWS RAM sends the account an invitation.
3. A new share uses the default version of its managed permission. Existing shares do not automatically move to a new default version.

### Exam cues

- If the question says trusted access is enabled only in Organizations, think enable sharing through AWS RAM, because the required service-linked role is not created by that step alone.
- If the question says an account must retain access after leaving its organization, think an eligible new individual-account share with retention enabled, because the option preserves access after departure.
- If the question says a managed permission has a new default version, think existing shares retain their current version, because they do not update automatically.

### Remember

- The retention option requires external principals to be allowed and sends an invitation.
- The option does not apply to organization or organizational unit shares, or to resources shareable only within an organization.
- New shares use the managed permission's default version.

> **Trap:** Enabling trusted access only in Organizations does not complete AWS RAM organization sharing setup. Enable sharing through AWS RAM from the management account.
