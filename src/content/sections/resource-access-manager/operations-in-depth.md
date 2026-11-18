---
title: "PLACEHOLDER resource-access-manager/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
