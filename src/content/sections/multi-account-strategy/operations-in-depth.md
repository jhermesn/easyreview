---
title: RAM sharing and account quotas
level: professional
order: 40
facts:
  - id: ram-regions
    text: A RAM share holds Regional resources in the same Region as the share; global resources use a share in
      us-east-1.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: ram-leave
    text: Organization sharing normally ends when a consumer leaves. For a new direct account share,
      RetainSharingOnAccountLeaveOrganization requires external principals to be allowed and an accepted invitation.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: org-account-quota
    text: The default Organizations account quota is 10 and is adjustable; new organizations can have a lower
      quota, and pending invitations count against it.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_reference_limits.html#default-maximum-number-of-accounts
  - id: shared-permissions
    text: In November 2026 AWS RAM added sharing of customer managed permissions so receiving accounts can
      associate them with their own resource shares.
    source: https://docs.aws.amazon.com/ram/latest/userguide/doc-history.html
cards:
  - id: multi-account-strategy-023
    q: In which Region must an AWS RAM share be created for a Regional resource?
    a: In the resource's Region. A share containing global resources uses us-east-1.
    facts:
      - ram-regions
  - id: multi-account-strategy-027
    q: An AWS RAM resource must remain shared with a specific account after that account leaves the organization.
      How should the share be created?
    a: Enable RetainSharingOnAccountLeaveOrganization on a new direct account share, allow external principals
      and have the consumer accept its invitation.
    facts:
      - ram-leave
  - id: multi-account-strategy-029
    q: An AWS Organizations management account cannot add another member account. Which account quota and
      pending invitations should it check?
    a: The default account quota is 10 and is adjustable, though new organizations can have a lower quota.
      Pending invitations count against it.
    facts:
      - org-account-quota
  - id: multi-account-strategy-030
    q: A platform team wants other AWS accounts to reuse its customer managed AWS RAM permission on their own
      resource shares. What feature can it use?
    a: Share the customer managed permission. RAM added this capability in November 2026.
    facts:
      - shared-permissions
---
AWS Resource Access Manager (AWS RAM) shares require planning for Region, account departures and reusable permissions. AWS Organizations account quotas also affect how many accounts an organization can add.

### How it works

1. Create a share for a Regional resource in the same Region as the resource. For global resources, use a share in `us-east-1`.
2. Organization sharing normally ends when a consumer account leaves. To retain access, create a new direct account share with `RetainSharingOnAccountLeaveOrganization`, allow external principals and have the consumer accept the invitation.
3. Share a customer managed RAM permission so receiving accounts can associate it with their own resource shares. AWS added this capability in November 2026.
4. Check the Organizations account quota when adding accounts. Pending invitations count against the quota.

### Exam cues

- If the question says a Regional resource needs a RAM share, think the resource's Region, because the share must be in that Region.
- If the question says a specific account must retain a share after leaving the organization, think a new direct account share with `RetainSharingOnAccountLeaveOrganization`, because ordinary organization sharing normally ends on departure.
- If the question says accounts need to reuse a customer managed RAM permission, think sharing the permission, because receiving accounts can associate it with their own shares.
- If the question says an organization cannot add another account, think the account quota and pending invitations, because invitations count against the quota.

### Remember

- Global resources use a RAM share in `us-east-1`.
- The default Organizations account quota is 10 and is adjustable. New organizations can have a lower quota.
- Retaining a direct share on account departure requires external principals to be allowed and the invitation to be accepted.

> **Trap:** An ordinary organization share does not normally persist when a consumer leaves. Retention requires the setting on a new direct account share, plus external principals and an accepted invitation.
