---
title: "Systems Manager basics"
level: foundational
order: 5
facts:
  - id: manage-nodes
    text: "AWS Systems Manager centrally views, manages and operates nodes at scale in AWS, on premises and in other clouds."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html#what-is-systems-manager
  - id: agent-required
    text: "A node is managed by Systems Manager when SSM Agent is installed on it and can reach the service."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html#what-is-systems-manager
  - id: no-ssh
    text: "Systems Manager manages nodes remotely without bastion hosts, SSH or remote PowerShell, and its tools include Run Command, Session Manager, Automation and Parameter Store."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html#benefits
  - id: central-view
    text: Systems Manager gives a centralized view to see and manage EC2 instances, on-premises servers and other managed nodes across an organization's accounts.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html
  - id: "patch-windows"
    text: "Systems Manager Patch Manager can scan for missing patches and install patches on managed Windows Server nodes."
    source: "https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager"
  - id: "compliance-view"
    text: "Systems Manager Compliance displays current patch and State Manager association compliance data for managed nodes."
    source: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-compliance.html"
  - id: "run-command-hybrid"
    text: "Systems Manager Run Command can remotely run commands on managed nodes in hybrid environments."
    source: "https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html#run-command"
  - id: "launch-wizard"
    text: "AWS Launch Wizard guides sizing, configuration and deployment of AWS resources for third-party applications."
    source: "https://docs.aws.amazon.com/cli/latest/reference/launch-wizard/"
  - id: "appconfig-changes"
    text: "AWS AppConfig manages and deploys application configuration changes without redeploying application code."
    source: "https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html"
  - id: "opscenter-alarm"
    text: "A CloudWatch alarm can create a Systems Manager OpsCenter OpsItem when it enters the ALARM state."
    source: "https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter"
  - id: "opscenter-purpose"
    text: "Systems Manager OpsCenter centralizes investigation and resolution of operational work items called OpsItems."
    source: "https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter"
cards:
  - id: systems-manager-114
    q: "Operations must patch hundreds of EC2 instances and on-premises servers from one place. Which AWS service fits?"
    a: "AWS Systems Manager, which manages nodes in AWS and on premises through SSM Agent."
    facts: [manage-nodes, agent-required]
  - id: systems-manager-115
    q: "How can admins open a shell on EC2 instances without opening SSH ports or running a bastion host?"
    a: "Systems Manager Session Manager."
    facts: [no-ssh]
  - id: systems-manager-116
    q: "Which AWS service helps a company centrally manage servers across AWS, on premises and other clouds?"
    a: "AWS Systems Manager centrally manages and operates nodes across these environments."
    facts: [manage-nodes]
  - id: systems-manager-108
    q: A company wants one place to view and operate both its EC2 instances and its on-premises servers. Which AWS service fits?
    a: AWS Systems Manager, which manages them all as managed nodes from a centralized view.
    facts: [central-view]
  - id: systems-manager-120
    q: "Which Systems Manager tool scans for missing patches and installs patches on managed Windows Server nodes?"
    a: "Patch Manager."
    facts: [patch-windows]
  - id: systems-manager-121
    q: "Which Systems Manager tool displays patch and configuration association compliance for managed nodes?"
    a: "Compliance."
    facts: [compliance-view]
  - id: systems-manager-122
    q: "How can an administrator run commands remotely on managed on-premises servers with AWS Systems Manager?"
    a: "Use Run Command."
    facts: [run-command-hybrid]
  - id: systems-manager-123
    q: "Which AWS service guides sizing and deployment of AWS resources for third-party applications?"
    a: "AWS Launch Wizard."
    facts: [launch-wizard]
  - id: systems-manager-124
    q: "Which AWS service deploys application configuration changes without redeploying application code?"
    a: "AWS AppConfig."
    facts: [appconfig-changes]
  - id: systems-manager-125
    q: "How can a CloudWatch alarm create an operational work item in AWS Systems Manager?"
    a: "Configure the alarm to create an OpsCenter OpsItem when it enters ALARM."
    facts: [opscenter-alarm]
  - id: systems-manager-126
    q: "Which AWS Systems Manager tool tracks operational work items for investigation?"
    a: "OpsCenter manages OpsItems."
    facts: [opscenter-purpose]
---
AWS Systems Manager is the operations hub for servers: it patches, runs commands, opens sessions and stores parameters for EC2 instances and on-premises machines.

### How it works

1. Install SSM Agent on the node and let it reach Systems Manager; it becomes a managed node.
2. Use tools such as Run Command, Session Manager, Automation and Parameter Store against one node or many.
3. The same console covers AWS, on-premises and other cloud nodes.

### Exam cues

- If the question says install operating system patches on managed Windows servers, think Patch Manager, because it scans and installs patches.
- If the question says report patch and configuration association compliance, think Systems Manager Compliance, because it displays both kinds of data.
- If the question says run commands on managed on-premises servers, think Run Command, because it supports hybrid managed nodes.
- If the question says guided sizing and deployment of a third-party application, think AWS Launch Wizard, because it guides the selection of AWS resources.
- If the question says deploy application configuration changes without redeploying code, think AWS AppConfig, because it manages configuration deployments.
- If the question says create an operational work item from a CloudWatch alarm, think OpsCenter, because the alarm can create an OpsItem.
- If the question says manage or patch a fleet of servers, including on premises, think Systems Manager.
- If the question says shell access without SSH or bastion hosts, think Session Manager.

### Remember

- Needs SSM Agent on each node.
- Works for AWS, on-premises and multicloud nodes.

> **Trap:** Systems Manager is not only for EC2: on-premises servers become managed nodes too.
