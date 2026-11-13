---
title: Patch compliance and remediation
level: associate
order: 80
facts:
  - id: patch-command
    text: AWS-RunPatchBaseline performs patch operations using the applicable patch baseline.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline
  - id: patch-scan
    text: The Scan operation reports approved applicable missing patches without installing updates or
      rebooting nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-operation
  - id: patch-install
    text: The Install operation attempts to install approved applicable missing patches and reports
      patch compliance.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-operation
  - id: patch-default-reboot
    text: RebootOption defaults to RebootIfNeeded.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-norebootoption
  - id: patch-reboot
    text: RebootIfNeeded reboots after installing patches or finding INSTALLED_PENDING_REBOOT patches
      during Install; it does not test whether an individual patch requires reboot.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-norebootoption
  - id: patch-no-reboot
    text: NoReboot prevents operating system restarts by Patch Manager.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-norebootoption
  - id: patch-no-reboot-services
    text: NoReboot does not prevent service restarts during patching.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-norebootoption
  - id: patch-missing
    text: MISSING means an approved patch is not installed.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-compliance-states.html#patch-manager-compliance-states
  - id: patch-failed
    text: FAILED means an approved patch could not be installed; AWS directs operators to review command
      output.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-compliance-states.html#patch-manager-compliance-states
  - id: patch-pending
    text: INSTALLED_PENDING_REBOOT means the node has not rebooted since installation and is
      noncompliant.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-compliance-states.html#patch-manager-compliance-states
  - id: patch-rescan
    text: After NoReboot installation, rebooting and running Scan updates a successfully patched node to
      Compliant.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-norebootoption
  - id: patch-snapshot
    text: Inside a maintenance window, Patch Manager supplies a snapshot ID; outside one, AWS recommends
      a shared custom snapshot ID for nodes patched together to use a consistent approved patch set.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-snapshot-id
  - id: term-baseline-snapshot
    text: "Baseline snapshot: The approved patch set captured for a patching operation."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline-parameters-snapshot-id
cards:
  - id: systems-manager-007
    q: A Systems Manager patch report shows MISSING and FAILED patches. How should an operator remediate
      them?
    a: Use Install for approved missing patches. For FAILED patches, inspect command output to diagnose
      installation errors. Scan reports compliance without installing updates.
    facts:
      - patch-install
      - patch-failed
      - patch-scan
      - patch-missing
  - id: systems-manager-023
    q: "Which Systems Manager AWS-RunPatchBaseline operation changes installed patches: Scan or
      Install?"
    a: Install applies approved applicable missing updates. Scan only reports compliance and does not
      install or reboot.
    trap: true
    facts:
      - patch-scan
      - patch-install
  - id: systems-manager-056
    q: A Systems Manager patch installation uses NoReboot and leaves nodes noncompliant. What should
      happen next?
    a: Schedule the reboot, then run Scan. INSTALLED_PENDING_REBOOT records that the node has not
      rebooted since patch installation.
    facts:
      - patch-pending
      - patch-rescan
  - id: systems-manager-057
    q: Does the default RebootIfNeeded option in Systems Manager only reboot when a patch vendor
      requires it?
    a: No. It reboots after installing patches or detecting pending-reboot patches during Install,
      without testing whether a particular patch requires it.
    trap: true
    facts:
      - patch-default-reboot
      - patch-reboot
  - id: systems-manager-058
    q: A team uses Systems Manager Run Command outside a maintenance window to patch a fleet
      consistently. What should it supply?
    a: A common custom snapshot ID for the nodes patched together. It keeps the operation on a
      consistent approved patch set.
    facts:
      - patch-snapshot
---
Patch Manager compliance compares a node with its approved patch baseline. Scanning measures that state; installation changes the node toward the approved patch set.

### How it works

1. Run `AWS-RunPatchBaseline` with `Operation: Scan` to identify approved applicable missing updates. Scan does not install or reboot.
2. Run `Operation: Install` to apply approved applicable missing updates. Review command output when a patch reports `FAILED`.
3. Choose reboot behavior. The default `RebootIfNeeded` reboots after installing patches or detecting pending-reboot patches during Install.
4. If using `NoReboot`, arrange a later reboot and Scan. A baseline snapshot is the approved patch set captured for an operation; use a consistent snapshot ID when patching nodes together outside a maintenance window.

| State | Meaning |
|---|---|
| `MISSING` | Approved patch is absent |
| `FAILED` | Approved patch could not be installed |
| `INSTALLED_PENDING_REBOOT` | Node has not rebooted since installation |

### Exam cues

- If the question says report missing updates without changing nodes, think Scan, because it measures compliance only.
- If the question says approved patches are missing, think Install, because it attempts to apply them.
- If the question says installation failed, think command output, because it contains the information needed to diagnose the failure.

### Remember

- Default `RebootOption`: `RebootIfNeeded`.
- `NoReboot` prevents OS restarts by Patch Manager; services can still restart.
- `INSTALLED_PENDING_REBOOT` is noncompliant.
- A maintenance window supplies the patch snapshot ID automatically.

> **Trap:** A compliant scan means the node meets the selected baseline. Scan never installs patches.

> **Trap:** `RebootIfNeeded` does not evaluate each patch vendor's reboot requirement.
