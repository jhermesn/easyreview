---
title: Quick Setup patch policies
level: professional
order: 100
facts:
  - id: policy-purpose
    text: Quick Setup patch policies configure patching across selected accounts, organizational units
      and Regions, or one local account.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
  - id: policy-schedules
    text: Patch policies can configure separate schedules for scanning and installation.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
  - id: policy-baselines
    text: A patch policy selects an AWS predefined or custom baseline for each operating system.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
  - id: policy-no-groups
    text: Patch policy operations do not use patch groups.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-manager-patch-groups
  - id: policy-document
    text: Patch policy operations run the AWS-RunPatchBaseline command document.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
  - id: policy-compliance
    text: Patch policy compliance is reported separately for each account-Region pair.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
  - id: policy-on-demand
    text: Patch now remains limited to one account-Region pair at a time.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
  - id: policy-sync
    text: Changes to custom patch baselines used by Quick Setup are synchronized once an hour.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-custom
cards:
  - id: systems-manager-025
    q: A team wants one Systems Manager patch configuration across an AWS organization and several
      Regions. Which feature fits?
    a: A Quick Setup patch policy. It selects accounts or OUs, Regions, per-OS baselines and patch
      schedules without patch-group mappings.
    facts:
      - policy-purpose
      - policy-baselines
      - policy-no-groups
  - id: systems-manager-062
    q: An organization wants daily Systems Manager patch scans but installations on a separate schedule.
      What should it configure?
    a: Separate scan and install schedules in a Quick Setup patch policy.
    facts:
      - policy-schedules
  - id: systems-manager-063
    q: A team creates an organization-wide Systems Manager patch policy. Does that automatically create
      one combined compliance report for every account and Region?
    a: No. Compliance is reported separately per account-Region pair.
    trap: true
    facts:
      - policy-compliance
  - id: systems-manager-064
    q: A team edits a custom baseline used by a Systems Manager Quick Setup patch policy. Is the policy
      baseline updated immediately?
    a: No. Custom baseline updates synchronize with Quick Setup once an hour.
    trap: true
    facts:
      - policy-sync
---
A Quick Setup patch policy is a central patch configuration for chosen accounts and Regions. It combines baseline selection with scan and install schedules so the organization can manage them together.

### How it works

1. Choose the target accounts or organizational units and Regions, or use a single local account.
2. Choose a predefined or custom patch baseline for each operating system. Patch-policy operations do not use patch groups.
3. Set scanning and installation schedules separately. The policy runs `AWS-RunPatchBaseline`.
4. Inspect compliance in each account-Region pair. Changes to custom baselines synchronize with Quick Setup once an hour.

### Exam cues

- If the question says central patch setup across an organization, think a Quick Setup patch policy, because it supports accounts, OUs and Regions in one configuration.
- If the question says scan frequently but install less often, think separate policy schedules, because scan and install timing can differ.
- If the question says a patch-group tag does not select the policy baseline, think the policy baseline settings, because policy operations do not use patch groups.

### Remember

- Select baselines per operating system.
- Compliance remains per account-Region pair.
- Custom baseline synchronization: once an hour.
- On-demand `Patch now` targets one account-Region pair at a time.

> **Trap:** An organization-wide configuration does not make every patching feature organization-wide. `Patch now` still has one account-Region scope.
