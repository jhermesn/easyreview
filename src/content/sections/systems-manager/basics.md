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
---
AWS Systems Manager is the operations hub for servers: it patches, runs commands, opens sessions and stores parameters for EC2 instances and on-premises machines. [What is AWS Systems Manager?](https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html#what-is-systems-manager)

### How it works

1. Install SSM Agent on the node and let it reach Systems Manager; it becomes a managed node.
2. Use tools such as Run Command, Session Manager, Automation and Parameter Store against one node or many.
3. The same console covers AWS, on-premises and other cloud nodes.

### Exam cues

- If the question says manage or patch a fleet of servers, including on premises, think Systems Manager.
- If the question says shell access without SSH or bastion hosts, think Session Manager.

### Remember

- Needs SSM Agent on each node.
- Works for AWS, on-premises and multicloud nodes.

> **Trap:** Systems Manager is not only for EC2: on-premises servers become managed nodes too.
