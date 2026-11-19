---
title: Session Manager
level: associate
order: 120
facts:
  - id: session-access
    text: Session Manager provides browser or CLI access to managed nodes without opening inbound ports,
      maintaining bastions or managing SSH keys for its native sessions.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#session-manager
  - id: session-iam
    text: IAM policies control which users may start sessions and which managed nodes they can access.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#session-manager
  - id: session-tls
    text: Session Manager encrypts the client-to-node channel with TLS 1.2 and can add KMS encryption.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#what-is-a-session
  - id: session-content
    text: Native session data can be logged to S3 or CloudWatch Logs, with optional KMS encryption.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#session-manager
  - id: session-api
    text: CloudTrail records Session Manager API calls.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-auditing.html#session-manager-auditing
  - id: session-tunnel
    text: Session content logging is unavailable for Session Manager port-forwarding and SSH sessions.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-logging.html#session-manager-logging
  - id: session-notify
    text: EventBridge can use CloudTrail StartSession, ResumeSession and TerminateSession API events; an
      exit command inside a session does not itself produce a detected API event.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-auditing.html#session-manager-auditing
  - id: session-patching
    text: A maintenance window can schedule AWS-RunPatchBaseline for managed nodes outside business
      hours.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
  - id: term-bastion
    text: "Bastion: A separate host used to reach machines in a private network."
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/access-a-bastion-host-by-using-session-manager-and-amazon-ec2-instance-connect.html#access-a-bastion-host-by-using-session-manager-and-amazon-ec2-instance-connect
  - id: term-tls
    text: "TLS: A protocol that encrypts data exchanged over a network connection."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#session-manager
  - id: term-sudoers
    text: "sudoers: The operating-system configuration that grants users permission to run privileged
      commands."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-run-as.html#session-preferences-run-as
  - id: bastion-definition
    text: "A bastion host, or jump box, is a server that is the single access point from an external network to resources in a private network, and its exposure to the internet is a security risk."
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/access-a-bastion-host-by-using-session-manager-and-amazon-ec2-instance-connect.html
  - id: node-dhmc-scope
    text: Default Host Management Configuration supplies node permissions without individual instance
      profiles in each account and Region where enabled.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-default-host-management-configuration.html#fleet-manager-default-host-management-configuration
  - id: node-dhmc-requires
    text: DHMC requires EC2 instances to use IMDSv2.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-default-host-management-configuration.html#dhmc-prerequisites
  - id: node-dhmc-requires-agent
    text: DHMC requires SSM Agent 3.2.582.0 or later.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-default-host-management-configuration.html#dhmc-prerequisites
cards:
  - id: systems-manager-028
    q: Engineers need Systems Manager shell access without inbound SSH and with an audit trail. What
      should be configured?
    a: Use native Session Manager access with IAM authorization. Send session data to S3 or CloudWatch
      Logs; CloudTrail records session API calls.
    facts:
      - session-access
      - session-iam
      - session-content
      - session-api
  - id: systems-manager-029
    q: Does Systems Manager Session Manager record typed commands in SSH or port-forwarding sessions?
    a: No. Session content logging is unavailable for those sessions. CloudTrail still records Session
      Manager API calls.
    trap: true
    facts:
      - session-tunnel
      - session-api
  - id: systems-manager-035
    q: A hybrid fleet needs access without inbound SSH and scheduled patching outside business hours.
      Which Systems Manager features fit?
    a: Session Manager for native remote access and Patch Manager through a maintenance window for
      scheduled patching.
    facts:
      - session-access
      - session-patching
  - id: systems-manager-118
    q: "Administrators reach private EC2 instances through a public bastion host with SSH open. Which AWS feature removes the inbound port and the bastion?"
    a: "AWS Systems Manager Session Manager, with sessions authorized by IAM and logged."
    facts: [bastion-definition]
  - id: systems-manager-036
    q: An EC2 fleet needs Systems Manager permissions without individual instance profiles. What must be
      enabled and installed?
    a: Enable Default Host Management Configuration in each account and Region. Instances must use
      IMDSv2 and SSM Agent 3.2.582.0 or later.
    facts:
      - node-dhmc-scope
      - node-dhmc-requires
      - node-dhmc-requires-agent
---
Session Manager opens remote sessions to managed nodes through the agent connection. Native sessions remove the need for an inbound SSH port, SSH keys or a bastion, a separate host used to reach private machines.

### How it works

1. Use IAM policies to authorize the user and target node. IAM is the permissions system that controls AWS actions.
2. Open a browser or CLI session. The channel uses TLS 1.2, encryption for data in transit, with optional additional KMS encryption.
3. Configure S3 or CloudWatch Logs for native session data. CloudTrail captures session API calls; EventBridge can respond to those API events.

### Exam cues

- If the question says shell access without inbound ports, think native Session Manager, because the session uses the managed-node channel.

### Remember

- Linux and macOS default to `ssm-user`, which is added to `sudoers`, the configuration granting privileged command access.
- CloudTrail API records and session content logs are different outputs.
- A bastion host (jump box) is a single, internet-exposed access point to a private network; Session Manager removes the need for it.

> **Trap:** SSH and port-forwarding session content cannot be logged by Session Manager. Use native sessions when a command transcript is required.
