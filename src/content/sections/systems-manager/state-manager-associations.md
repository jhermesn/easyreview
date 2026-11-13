---
title: State Manager associations
level: associate
order: 60
facts:
  - id: state-association
    text: A State Manager association binds an SSM document, parameters, targets and a schedule to
      maintain a desired configuration.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
  - id: state-targets
    text: Associations can target node IDs, tags, resource groups or all nodes in the current account
      and Region.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
  - id: state-default
    text: By default, State Manager runs an association at creation and on its schedule.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about-scheduling
  - id: state-new-nodes
    text: State Manager attempts to apply associations when matching managed nodes come online for the
      first time.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about-scheduling
  - id: state-cron
    text: Association schedules accept cron or rate expressions; association cron expressions do not
      support months.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
  - id: state-only-cron
    text: ApplyOnlyAtCronInterval can prevent association execution when targets change and defer
      execution to the specified cron interval.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about-scheduling
  - id: state-compliance
    text: Systems Manager Compliance reports association Compliant or Non-compliant status and the
      assigned severity.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/compliance-about.html#compliance-about-association
  - id: state-chef
    text: AWS-ApplyChefRecipes runs Chef recipes on Linux managed nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: state-chef-versions
    text: AWS-ApplyChefRecipes supports Chef 11 through 18.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: state-chef-source
    text: AWS-ApplyChefRecipes can download cookbooks from Git, GitHub, HTTP or S3.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: state-chef-checks
    text: AWS-ApplyChefRecipes can install the Chef client.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: state-chef-checks-checks
    text: AWS-ApplyChefRecipes can optionally run compliance checks with results stored in S3.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: state-automation-targets
    text: Automatic target updates for Automation-based associations require a Quick Setup-created
      association with supported node resource types, parameters and targets.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#runbook-target-updates
  - id: term-cron-expression
    text: "Cron expression: A schedule expression specifying calendar times for an action."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/reference-cron-and-rate-expressions.html#reference-cron-and-rate-expressions
  - id: term-rate-expression
    text: "Rate expression: A schedule expression specifying a repeating time interval."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/reference-cron-and-rate-expressions.html#reference-cron-and-rate-expressions
cards:
  - id: systems-manager-002
    q: A team wants Systems Manager to run its existing Chef recipes on Linux nodes. What should it use?
    a: A State Manager association with AWS-ApplyChefRecipes. It supports Chef 11 through 18 and
      cookbook downloads from Git, GitHub, HTTP or S3.
    facts:
      - state-association
      - state-chef
      - state-chef-versions
      - state-chef-source
  - id: systems-manager-003
    q: A team needs Systems Manager to reapply instance settings on a schedule and report compliance.
      Which capability fits?
    a: State Manager. An association specifies the document, parameters, targets and schedule;
      Compliance reports its status and severity.
    facts:
      - state-association
      - state-compliance
  - id: systems-manager-004
    q: A fleet needs recurring configuration and compliance reporting. Which Systems Manager capability
      maintains that configuration?
    a: State Manager associations. They bind a desired configuration to targets and a schedule and
      report association compliance.
    facts:
      - state-association
      - state-compliance
  - id: systems-manager-026
    q: New Auto Scaling nodes must receive the same CloudWatch agent configuration through Systems
      Manager. Which setup fits?
    a: A State Manager command-document association targeting the matching node tags. State Manager
      attempts to run it when new matching managed nodes first come online and reapplies it on
      schedule.
    facts:
      - state-targets
      - state-new-nodes
      - state-association
  - id: systems-manager-052
    q: A Systems Manager command-document association should run only at its next cron interval,
      including when new nodes match. Which setting fits?
    a: Set ApplyOnlyAtCronInterval. The association then avoids executions triggered by target changes.
    facts:
      - state-only-cron
  - id: systems-manager-053
    q: Does Systems Manager State Manager guarantee immediate repair whenever a file is manually
      changed?
    a: No. An association reapplies configuration on its schedule and documented triggers; it is not a
      promise of immediate file-change detection.
    trap: true
    facts:
      - state-default
      - state-new-nodes
---
State Manager maintains a desired configuration on managed nodes by reapplying a document. An association is the saved link between that document, its inputs, the targets and the schedule.

### How it works

1. Describe the desired state in an SSM document, such as installing software or configuring an agent.
2. Create an association with document parameters, targets and a cron or rate schedule. Cron names calendar times; rate expressions specify a repeating interval.
3. By default, run at creation and again on schedule. State Manager also attempts execution when matching managed nodes first come online.
4. Review association compliance and execution results. For Chef recipes, use `AWS-ApplyChefRecipes` on Linux, with optional compliance checks and S3 results.

### Exam cues

- If the question says reapply settings and report compliance, think State Manager, because an association keeps configuration tied to targets and a schedule.
- If the question says new tagged nodes need an agent configuration, think a command-document association targeting those tags, because matching nodes receive the association when first online.
- If the question says existing Chef recipes must run on Linux, think `AWS-ApplyChefRecipes`, because it downloads and runs the cookbooks.

### Remember

- Associations run at creation by default. `ApplyOnlyAtCronInterval` can defer execution to the next specified cron interval.
- Association cron expressions do not support months.
- `AWS-ApplyChefRecipes` supports Chef 11 through 18 and Git, GitHub, HTTP or S3 sources.
- Compliance includes `Compliant` or `Non-compliant` and an assigned severity.
- Automation-based associations have additional requirements for automatic target updates, including creation through Quick Setup.

> **Trap:** Recurring enforcement does not mean every manual configuration change is detected and repaired immediately. The schedule and documented triggers determine execution.
