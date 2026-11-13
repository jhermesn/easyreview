---
title: Organization administration
level: professional
order: 20
facts:
  - id: delegation
    text: The Organizations management account designates the delegated Macie administrator, enabling trusted service access and Macie in the selected Region for that administrator.
    source: https://docs.aws.amazon.com/macie/latest/user/accounts-mgmt-ao-integrate.html
  - id: membership
    text: The delegated administrator can enable and add existing organization accounts and configure automatic addition of new organization accounts as Macie members.
    source: https://docs.aws.amazon.com/macie/latest/user/accounts-mgmt-ao-integrate.html
  - id: regional
    text: Macie administrator designations and member relationships are Regional; setup must be repeated in every Region used.
    source: https://docs.aws.amazon.com/macie/latest/user/accounts-mgmt-ao-notes.html
  - id: one-administrator
    text: An organization has one delegated Macie administrator; the same account must be designated separately in each Region used.
    source: https://docs.aws.amazon.com/macie/latest/user/accounts-mgmt-ao-notes.html
  - id: administrator-discovery
    text: Only the Macie administrator manages automated discovery and its settings for organization accounts; member accounts do not manage those settings.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-asdd-account-manage.html
  - id: discovery-settings
    text: Automated discovery settings can control member-account coverage, excluded buckets, managed identifiers, custom identifiers, and allow lists.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-asdd-how-it-works.html
  - id: member-jobs
    text: The Macie administrator can run sensitive data discovery jobs over buckets owned by associated member accounts in the Region.
    source: https://docs.aws.amazon.com/macie/latest/user/accounts-mgmt-ao-integrate.html
  - id: job-independence
    text: A discovery job has its own bucket scope, identifiers, and schedule and can run once or repeatedly.
    source: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs.html
cards:
  - id: macie-002
    q: A Macie administrator needs ongoing organization-wide discovery and a separate targeted monthly scan. What should the team use?
    a: Enable and configure automated discovery for member accounts, then create a separate monthly discovery job for the targeted scope. Configure Macie in every required Region.
    facts:
      - administrator-discovery
      - discovery-settings
      - job-independence
      - regional
  - id: macie-008
    q: Who designates the delegated Amazon Macie administrator for an AWS organization?
    a: The AWS Organizations management account. The delegated account then manages Macie members and discovery in the configured Region.
    facts:
      - delegation
      - membership
  - id: macie-009
    q: An organization configured Amazon Macie in one Region, but member buckets in another Region are absent. What setup is missing?
    a: Designate the same delegated administrator and configure member relationships in the other Region. Macie administration is Regional.
    trap: true
    facts:
      - regional
      - one-administrator
  - id: macie-010
    q: An organization expects new accounts to join Amazon Macie automatically, but older accounts are still missing. What must the administrator do?
    a: Enable and add the existing organization accounts as Macie members. Automatic addition of new accounts and adding existing accounts are separate setup tasks.
    facts:
      - membership
  - id: macie-011
    q: Can an Amazon Macie member account change its organization-managed automated discovery settings?
    a: No. The delegated Macie administrator manages automated discovery settings for organization accounts.
    facts:
      - administrator-discovery
---

Amazon Macie organization administration lets a central security account manage discovery across member accounts. A delegated administrator is an account chosen by the Organizations management account to administer a service for the organization.

### How it works

1. In the required Region, the Organizations management account designates the delegated Macie administrator. This enables trusted service access, the permission for Macie to integrate with Organizations.
2. The administrator adds existing accounts as Macie members and configures automatic addition of new organization accounts.
3. Enable automated discovery for the relevant member accounts. Set bucket exclusions, identifiers, and allow lists centrally.
4. Create separate jobs for targeted analysis of member buckets. Repeat the organization setup in each required Region using the same administrator account.

### Exam cues

- If the question says central discovery across member accounts, think a delegated Macie administrator, because it can manage discovery and jobs for member-owned buckets.
- If the question says new accounts should join automatically, think automatic addition of new members, because existing-account enrollment is a separate task.
- If the question says discovery works in one Region but not another, think Regional setup, because the administrator designation and membership apply per Region.

### Remember

- The Organizations management account chooses the delegated administrator.
- One administrator account serves the organization and must be designated separately in each Region.
- Members cannot manage organization-controlled automated discovery settings.
- Automated discovery and targeted jobs have separate configuration.

> **Trap:** Organization membership alone does not configure Macie in every Region. Repeat the Macie administrator and member setup where discovery is needed.
