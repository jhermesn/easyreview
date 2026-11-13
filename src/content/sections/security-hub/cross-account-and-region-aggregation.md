---
title: Cross-account and Region aggregation
level: professional
order: 20
facts:
  - id: cross-account
    text: An administrator can view and manage associated member accounts' findings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-admin-member
  - id: member-visibility
    text: Members cannot view other members' findings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-admin-member
  - id: org-admin
    text: The Organizations management account designates a CSPM delegated administrator, enabling trusted access and administrator management of member accounts.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/designate-orgs-admin-account.html#designate-orgs-admin-account
  - id: manual-members
    text: Outside Organizations, an administrator can invite accounts; the member accepts to establish the relationship.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html#securityhub-manual-setup-overview
  - id: home-region
    text: Cross-Region aggregation replicates findings, updates, insights, control compliance statuses, and security scores to a home Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-overview
  - id: linked-enabled
    text: Aggregation includes data only from Regions where the account has CSPM enabled.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-overview
  - id: link-not-enable
    text: Linking a Region does not enable CSPM there.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-overview
  - id: replication-updates
    text: Finding updates replicate between the home Region and the source linked Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-overview
  - id: conflict-resolution
    text: For conflicting updates, the most recent update wins.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-overview
  - id: member-inheritance
    text: Members inherit their administrator's aggregation settings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-admin-member
  - id: administrator-view
    text: The administrator must view the home Region to see aggregated member data.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-admin-member
  - id: invite-regions
    text: For manually invited members, invitations and CSPM enablement are needed in the home Region and each linked Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-admin-member
  - id: no-linked
    text: A home Region can have no linked Regions; no cross-Region replication then occurs.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-overview
  - id: aggregation-not-config
    text: Cross-Region aggregation collects results; central configuration is the feature for configuring controls across the home and linked Regions.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation
  - id: home-terminology
    text: Home Region is the current name for aggregation Region; some API operations retain the older term.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation
  - id: insight-definition
    text: An insight is a grouped collection of related findings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-concepts.html#securityhub-concepts
diagrams:
  - id: security-hub-account-region-aggregation
    title: Member findings collected in the administrator home Region
    width: 820
    height: 340
    nodes:
      - id: a
        label: Member account A
        icon: security-hub
        x: 20
        y: 20
        w: 180
        h: 86
        sub: linked Region
        tone: security
      - id: b
        label: Member account B
        icon: security-hub
        x: 20
        y: 220
        w: 180
        h: 86
        sub: linked Region
        tone: security
      - id: home
        label: Administrator
        icon: security-hub
        x: 450
        y: 120
        w: 210
        h: 86
        sub: home Region view
        tone: security
    edges:
      - from: a
        to: home
        step: 1
        label: findings and updates
      - from: b
        to: home
        step: 2
        label: findings and updates
    steps:
      - An enabled member account generates findings in a linked Region.
      - The administrator views associated members' replicated findings in the home Region.
cards:
  - id: security-hub-003
    q: How can an AWS Security Hub CSPM administrator see member findings across accounts and Regions in one place?
    a: Associate member accounts and configure cross-Region aggregation to a home Region. View results there. Every contributing account must have CSPM enabled in the source Regions; linking alone does not enable it.
    trap: true
    facts:
      - cross-account
      - member-visibility
      - home-region
      - linked-enabled
      - link-not-enable
      - member-inheritance
      - administrator-view
  - id: security-hub-013
    q: An AWS Security Hub CSPM administrator linked a Region, but an account has no findings from it because CSPM is disabled there. What is missing?
    a: Enable CSPM in that account and Region. Aggregation does not enable the service.
    facts:
      - linked-enabled
      - link-not-enable
  - id: security-hub-014
    q: An AWS Security Hub CSPM member can see its own linked-Region findings. Can it see other member accounts' findings?
    a: No. The administrator can view member findings; members cannot view each other's findings.
    trap: true
    facts:
      - cross-account
      - member-visibility
  - id: security-hub-015
    q: An AWS Security Hub CSPM team wants the same controls enabled across linked Regions. Is findings aggregation enough?
    a: Use central configuration. Aggregation collects results; configuration policies apply standards and control settings.
    trap: true
    facts:
      - aggregation-not-config
  - id: security-hub-016
    q: What happens when an AWS Security Hub CSPM finding has conflicting updates in the home and linked Region?
    a: The most recent update is used. Updates replicate between the home and source linked Region.
    facts:
      - replication-updates
      - conflict-resolution
  - id: security-hub-017
    q: An AWS Security Hub CSPM administrator manually invites accounts rather than using Organizations. What is required for aggregation from every linked Region?
    a: Invite each member and enable CSPM in the home Region and every linked Region.
    facts:
      - invite-regions
  - id: security-hub-032
    q: What data does AWS Security Hub CSPM cross-Region aggregation collect?
    a: Findings and their updates, insights, control compliance statuses, and security scores from linked Regions into a home Region.
    facts:
      - home-region
---
Security Hub CSPM combines two scopes: member account relationships let an administrator manage other accounts' findings, and cross-Region aggregation collects Regional data in a home Region. The home Region is the place to view the combined results; linked Regions supply data.

### How it works

1. In Organizations, the management account designates a delegated administrator, the member account authorized to manage CSPM for the organization. Alternatively, invite accounts manually and have them accept membership.
2. Choose a home Region and the Regions to link. Each contributing account must have CSPM enabled where its findings originate. Linking a Region does not enable the service.
3. CSPM replicates findings, finding updates, insights, control compliance statuses, and security scores to the home Region. An insight is a grouped collection of related findings.
4. Members inherit the administrator's aggregation settings. Sign in to the administrator account in the home Region to view the combined member findings. Members can view their own aggregated data but cannot see other members' findings.
5. Changes to findings replicate between home and source linked Region. If updates conflict, the most recent one wins. For manual membership, establish invitations and CSPM enablement in the home Region and every linked Region.

### Exam cues

- If the question says one findings view across accounts and Regions, think member account administration plus cross-Region aggregation, because the two mechanisms cover different scopes.
- If the question says a linked Region has no data because CSPM is off, think enable CSPM there, because aggregation cannot produce or collect findings from a disabled service.
- If the question says apply identical controls across Regions, think central configuration, because aggregation only collects results.

### Remember

- The home Region is also called the aggregation Region in older API terminology.
- No linked Regions means no cross-Region replication.
- A member sees its own data; an administrator sees associated members' data.
- Cross-Region finding update conflicts use the most recent update.

> **Trap:** Linking every Region does not automatically enable CSPM in those Regions or configure their standards.
