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
  - id: session-restricted
    text: A custom Session document using schemaVersion 1.0 and sessionType InteractiveCommands can
      restrict commands and parameters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-restrict-command-access.html#session-manager-restrict-command-access
  - id: session-restricted-cli
    text: InteractiveCommands sessions are supported only through the CLI.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-restrict-command-access.html#session-manager-restrict-command-access
  - id: session-default-user
    text: On Linux and macOS, Session Manager uses ssm-user by default and adds it to sudoers.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-run-as.html#session-preferences-run-as
  - id: session-run-as
    text: Run As chooses an existing Linux or macOS operating-system user using SSMSessionRunAs on the
      IAM entity before the user configured in session preferences.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-run-as.html#session-preferences-run-as
  - id: session-no-fallback
    text: If Run As cannot use the selected operating-system user, the session fails without falling
      back to ssm-user.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-run-as.html#session-preferences-run-as
  - id: session-idle
    text: Session Manager idle timeout defaults to 20 minutes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-timeout.html#session-preferences-timeout
  - id: session-idle-range
    text: Session Manager idle timeout can be set from one to 60 minutes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-timeout.html#session-preferences-timeout
  - id: session-idle-input
    text: Keyboard input, window resizing and reconnection can reset the Session Manager idle timeout.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-timeout.html#session-preferences-timeout
  - id: session-idle-input-duration
    text: Maximum session duration is a separate control from idle timeout.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-timeout.html#session-preferences-timeout
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
  - id: systems-manager-068
    q: Engineers should run only an approved interactive command through Systems Manager. How can access
      be restricted?
    a: Create a custom Session document with schemaVersion 1.0 and sessionType InteractiveCommands, then
      restrict IAM access to that document. These sessions must start through the CLI.
    facts:
      - session-restricted
      - session-restricted-cli
      - session-iam
  - id: systems-manager-069
    q: A Systems Manager Run As session fails because its configured Linux user is absent. Will it fall
      back to ssm-user?
    a: No. The configured user must exist; Run As fails without falling back to ssm-user.
    trap: true
    facts:
      - session-no-fallback
  - id: systems-manager-070
    q: What is the default idle timeout for Systems Manager Session Manager, and does it impose a strict
      total duration?
    a: 20 minutes, configurable from one to 60 minutes. Client inputs such as resizing or reconnection
      reset it; use maximum session duration for a separate total-duration control.
    facts:
      - session-idle
      - session-idle-range
      - session-idle-input
      - session-idle-input-duration
  - id: systems-manager-089
    q: A team wants native Systems Manager sessions on Linux to use an existing operating-system user
      rather than ssm-user. What should it configure?
    a: Enable Run As. Set SSMSessionRunAs on the IAM user or role, or set the OS user in session
      preferences. The IAM tag takes precedence, and the selected user must exist.
    facts:
      - session-default-user
      - session-run-as
      - session-no-fallback
---
Session Manager opens remote sessions to managed nodes through the agent connection. Native sessions remove the need for an inbound SSH port, SSH keys or a bastion, a separate host used to reach private machines.

### How it works

1. Use IAM policies to authorize the user and target node. IAM is the permissions system that controls AWS actions.
2. Open a browser or CLI session. The channel uses TLS 1.2, encryption for data in transit, with optional additional KMS encryption.
3. Configure S3 or CloudWatch Logs for native session data. CloudTrail captures session API calls; EventBridge can respond to those API events.
4. For limited command access, allow only custom `Session` documents using `schemaVersion: 1.0` and `sessionType: InteractiveCommands`. These sessions start through the CLI.
5. For Linux or macOS, enable Run As to select an existing operating-system user. The `SSMSessionRunAs` IAM tag takes precedence over the account preference.

### Exam cues

- If the question says shell access without inbound ports, think native Session Manager, because the session uses the managed-node channel.
- If the question says only an approved interactive command is permitted, think a restricted Session document and IAM policy, because the document defines the allowed command and parameters.
- If the question says sessions must end after inactivity, think idle timeout, because Session Manager can close idle sessions.

### Remember

- Idle timeout: 20 minutes by default, configurable from one to 60 minutes.
- Resizing or reconnecting can reset the idle timer. Use maximum session duration for a separate total-duration limit.
- Linux and macOS default to `ssm-user`, which is added to `sudoers`, the configuration granting privileged command access.
- Run As fails if the selected user cannot be used; it does not fall back to `ssm-user`.
- CloudTrail API records and session content logs are different outputs.

> **Trap:** SSH and port-forwarding session content cannot be logged by Session Manager. Use native sessions when a command transcript is required.

> **Trap:** An `exit` command inside the session does not by itself generate an EventBridge session API event.
