---
title: Patch baselines and groups
level: associate
order: 70
facts:
  - id: baseline-rules
    text: Patch baselines define rules and explicit lists for approving or rejecting patches.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-custom
  - id: baseline-readonly
    text: AWS predefined patch baselines cannot be customized; copying one produces an editable custom
      baseline.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-predefined-and-custom-patch-baselines
  - id: baseline-windows-delay
    text: Windows Server predefined baselines use a seven-day auto-approval delay.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-predefined-and-custom-patch-baselines
  - id: baseline-delay
    text: Auto-approval delay waits a chosen number of days after patch release or update.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-custom
  - id: baseline-cutoff
    text: An approval cutoff date approves patches released or updated on or before that date.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-custom
  - id: baseline-rejected
    text: A patch listed as both approved and rejected in a baseline is rejected.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-custom
  - id: baseline-tags
    text: Patch groups use the case-sensitive tag keys Patch Group or PatchGroup.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-group-tags
  - id: baseline-tags-metadata
    text: Nodes with instance metadata tags enabled must use PatchGroup without a space.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-group-tags
  - id: baseline-mapping
    text: A managed node belongs to one patch group.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-group-tags
  - id: baseline-mapping-os
    text: A patch group can register one baseline per operating system type.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-group-tags
  - id: baseline-fallback
    text: If a node has no patch group or its patch group has no registered baseline, Patch Manager uses
      the current default baseline for the operating system.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-manager-patch-groups
  - id: baseline-policy
    text: Patch policy operations do not use patch groups.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-manager-patch-groups
  - id: baseline-console
    text: Patch group functionality is unavailable in the console for account-Region pairs that did not
      use it before December 22, 2022.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-groups.html#patch-manager-patch-groups
  - id: baseline-repository
    text: A custom Linux baseline can specify alternative patch repositories without permanently
      changing the operating system default repositories.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-alternative-source-repository.html#patch-manager-alternative-source-repository
  - id: baseline-repo-selection
    text: When a Linux baseline specifies alternative repositories, only those repositories are used;
      include default repositories explicitly if they are also needed.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-alternative-source-repository.html#alt-source-repository-important
  - id: baseline-install
    text: Approved patches are installed by an Install operation, while Scan only reports patch
      compliance.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-operation
  - id: term-patch-repository
    text: "Patch repository: A source location from which an operating-system package manager obtains
      updates."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-alternative-source-repository.html#patch-manager-alternative-source-repository
cards:
  - id: systems-manager-020
    q: How does a Systems Manager node select its patch baseline when using patch groups?
    a: Its Patch Group or PatchGroup tag value selects the registered baseline for its operating system.
      If no matching baseline exists, the current OS default applies. A node has one patch group,
      with one baseline per OS in that group.
    facts:
      - baseline-tags
      - baseline-tags-metadata
      - baseline-mapping
      - baseline-mapping-os
      - baseline-fallback
  - id: systems-manager-021
    q: A Windows fleet must install approved updates sooner than the Systems Manager predefined baseline
      allows. Can the team edit AWS-DefaultPatchBaseline?
    a: No. Copy or create a custom baseline with a shorter approval delay. Predefined Windows baselines
      wait seven days and cannot be customized.
    trap: true
    facts:
      - baseline-readonly
      - baseline-windows-delay
  - id: systems-manager-022
    q: How do auto-approval delay and cutoff date differ in Systems Manager Patch Manager?
    a: A delay waits a chosen number of days after release or update. A cutoff date approves patches
      released or updated on or before that fixed date. Rejection wins if a patch is both approved
      and rejected.
    facts:
      - baseline-delay
      - baseline-cutoff
      - baseline-rejected
  - id: systems-manager-054
    q: A Linux Systems Manager fleet must patch from a corporate repository and its usual repositories.
      What should its baseline specify?
    a: Use a custom baseline with alternative patch sources, listing both the corporate and usual
      repositories. Only specified repositories are used during that operation; OS defaults remain
      unchanged afterward.
    facts:
      - baseline-repository
      - baseline-repo-selection
  - id: systems-manager-055
    q: An EC2 fleet allows tags in instance metadata. Which Systems Manager patch-group tag key should
      it use?
    a: PatchGroup without a space. Patch Group cannot be used when instance metadata tags are enabled.
    facts:
      - baseline-tags
      - baseline-tags-metadata
---
A Patch Manager baseline is the rulebook that decides which patches are approved. In patch-group operations, a node tag selects the baseline for that node and operating system.

### How it works

1. Choose an AWS predefined baseline or create a custom one. Copy a predefined baseline when its rules need changing.
2. For patch-group operations, tag each node with `Patch Group` or `PatchGroup` and register the value to a baseline for its operating system.
3. When patching runs, Patch Manager looks up that mapping. If none exists, it uses the current default baseline for the operating system.
4. For custom Linux sources, specify alternative repositories, the locations that supply patch packages. Include every repository needed for the operation, including ordinary defaults.

| Approval choice | Effect |
|---|---|
| Auto-approval delay | Wait after patch release or update |
| Cutoff date | Approve releases or updates on or before a fixed date |
| Rejected list | Reject a listed patch even when also approved |

### Exam cues

- If the question says Windows updates must be approved sooner than seven days, think a custom baseline, because the predefined Windows delay is seven days.
- If the question says test and production nodes need different approved patch sets, think patch groups mapped to baselines, because the node tag selects its baseline.
- If the question says Linux updates come from a corporate repository, think custom baseline patch sources, because alternative repositories select the sources for that operation.

### Remember

- One patch group per node; one baseline per operating system per patch group.
- Use `PatchGroup` when instance metadata tags are enabled.
- Patch policy operations do not use patch groups.
- December 2022: patch-group console support became limited to account-Region pairs already using it before December 22.

> **Trap:** Adding an alternative repository replaces the sources used for that patching operation. Include default repositories too if their updates are required.

> **Trap:** A baseline approves patches; approval alone does not install them.
