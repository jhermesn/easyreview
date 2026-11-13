---
title: Retirement and migration
level: associate
order: 20
facts:
  - id: retirement
    text: OpsWorks Stacks, OpsWorks for Chef Automate, and OpsWorks for Puppet Enterprise reached end of support on May 1, 2024 and are in full shutdown.
    source: https://docs.aws.amazon.com/general/latest/gr/full_shutdown_services.html#full_shutdown_services
  - id: managed-servers
    text: OpsWorks for Chef Automate and OpsWorks for Puppet Enterprise managed configuration management servers.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorksCM.html
  - id: state-manager
    text: Systems Manager State Manager uses associations to apply a defined configuration to managed nodes on a schedule.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
  - id: chef-document
    text: The AWS-ApplyChefRecipes document runs Chef recipes on Linux Systems Manager managed nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: chef-source
    text: AWS-ApplyChefRecipes can download cookbooks from Git, GitHub, HTTP, or S3.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: chef-versions
    text: AWS-ApplyChefRecipes supports Chef 11 through 18 and can install the Chef client.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: chef-no-server
    text: Cookbooks used with AWS-ApplyChefRecipes must be compatible with Chef Infra Client and not require a Chef server.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#state-manager-chef-prereqs
  - id: dry-run
    text: AWS-ApplyChefRecipes can run in why-run mode to show potential recipe changes without making them.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-chef.html#systems-manager-state-manager-chef
  - id: app-manager
    text: Starting July 30, 2026, accounts that had not previously used Systems Manager Application Manager cannot access it; existing customers can continue to use it.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change-faq
  - id: app-manager-alternatives
    text: AWS suggests Resource Groups for organizing resources and Application Signals for application-level observability as alternatives to Application Manager.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change-alternatives
diagrams:
  - id: opsworks-chef-association
    title: Run Chef recipes with State Manager
    width: 720
    height: 150
    nodes:
      - { id: state, label: State Manager, icon: systems-manager, x: 25, y: 35, w: 170, h: 72, tone: mgmt }
      - { id: node, label: Managed node, icon: ec2, x: 275, y: 35, w: 170, h: 72, tone: compute }
      - { id: bucket, label: Cookbook in S3, icon: simple-storage-service, x: 525, y: 35, w: 170, h: 72, tone: storage }
    edges:
      - { from: state, to: node, step: 1 }
      - { from: node, to: bucket, step: 2 }
    steps:
      - An association targets the managed node and runs AWS-ApplyChefRecipes.
      - The document downloads the cookbook from the selected source.
cards:
  - id: opsworks-001
    q: Can a team create a new AWS OpsWorks Stacks, Chef Automate, or Puppet Enterprise deployment?
    a: No. All three reached end of support on May 1, 2024 and are in full shutdown.
    facts: [retirement]
    trap: true
  - id: opsworks-002
    q: A team replacing an OpsWorks Stacks configuration needs to run existing Chef recipes on managed Linux nodes. What AWS option can it evaluate?
    a: Use a Systems Manager State Manager association with `AWS-ApplyChefRecipes`, provided the cookbooks do not require a Chef server.
    facts: [state-manager, chef-document, chef-no-server]
  - id: opsworks-003
    q: What were AWS OpsWorks for Chef Automate and OpsWorks for Puppet Enterprise?
    a: Managed configuration management servers. Both reached end of support on May 1, 2024.
    facts: [managed-servers, retirement]
  - id: opsworks-011
    q: A team wants to preview changes from Chef recipes on a Systems Manager managed Linux node without applying them. What option fits?
    a: Use `AWS-ApplyChefRecipes` in `why-run` mode.
    facts: [chef-document, dry-run]
  - id: opsworks-012
    q: Can a new AWS account use Systems Manager Application Manager as an OpsWorks replacement in August 2026?
    a: No. Accounts that had not previously used it lost access starting July 30, 2026. Existing customers can continue to use it.
    facts: [app-manager]
    trap: true
  - id: opsworks-013
    q: Where can Systems Manager AWS-ApplyChefRecipes obtain Chef cookbooks?
    a: Git, GitHub, HTTP, or Amazon S3.
    facts: [chef-source]
---
AWS OpsWorks is retired. A migration must replace the needed configuration or application management capability rather than create another OpsWorks deployment.

### How it works

1. Identify the configuration that the legacy system applied and the nodes that need it.
2. For compatible Chef cookbooks on Linux managed nodes, create a Systems Manager State Manager association, a configuration assigned to targets on a schedule.
3. Select `AWS-ApplyChefRecipes` and a cookbook source such as S3. The document can install the Chef client and run recipes that do not require a Chef server.
4. Use `why-run` to preview recipe changes without applying them. Choose other tools for requirements beyond those recipes.

### Exam cues

- If the question says to run compatible Chef recipes on managed Linux nodes, think State Manager and `AWS-ApplyChefRecipes`, because the association applies the document to its targets.
- If the question says an account has never used Application Manager and wants to start in August 2026, think another service, because access for new customers ended on July 30, 2026.
- If the question says organize resources or inspect application dependencies, think Resource Groups or Application Signals, respectively, because AWS lists them as alternatives for those use cases.

### Remember

- OpsWorks Stacks, Chef Automate, and Puppet Enterprise reached end of support on May 1, 2024.
- `AWS-ApplyChefRecipes` supports Chef versions 11 through 18 and sources from Git, GitHub, HTTP, and S3.
- Existing Application Manager customers can continue using it; accounts that had not used it cannot start after July 30, 2026.

> **Trap:** State Manager can run compatible Chef recipes, but a cookbook that requires a Chef server does not meet the document's prerequisites.
