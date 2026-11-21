---
title: Parameter Store operational controls
level: professional
order: 190
facts:
  - id: parameter-tier
    text: A standard parameter can become advanced; an advanced parameter cannot be changed back to
      standard.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-tiers-limitations
  - id: parameter-expiry
    text: Expiration deletes a parameter after the specified timestamp through asynchronous periodic
      policy processing.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#parameter-store-policies
  - id: parameter-expiry-notify
    text: ExpirationNotification emits an EventBridge event before or after the expiration time.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#parameter-store-policies
  - id: parameter-nochange
    text: NoChangeNotification emits an EventBridge event when a parameter has remained unchanged for
      the specified period.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#parameter-store-policies
  - id: parameter-policy-count
    text: An advanced parameter can have up to ten policies.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#parameter-store-policies
  - id: parameter-policy-replace
    text: Supplying a new policy array replaces the policies already attached to the parameter.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#sysman-paramstore-su-policy-create
  - id: parameter-path
    text: Parameter hierarchies use slash-separated names.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-hierarchies.html#ps-hierarchy-examples
  - id: parameter-path-depth
    text: Parameter hierarchies support up to 15 levels.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-hierarchies.html#ps-hierarchy-examples
  - id: parameter-recursive
    text: GetParametersByPath supports recursive retrieval of parameters below a path.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParametersByPath.html#systemsmanager-GetParametersByPath-request-Recursive
  - id: parameter-history
    text: Parameter Store retains up to 100 versions, normally deleting the oldest to make room for the
      next.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: parameter-history-label
    text: If the oldest of 100 retained versions has a label, creation of a new version fails instead of
      deleting the labeled version.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: session-restricted
    text: A custom Session document using schemaVersion 1.0 and sessionType InteractiveCommands can
      restrict commands and parameters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-restrict-command-access.html#session-manager-restrict-command-access
  - id: session-restricted-cli
    text: InteractiveCommands sessions are supported only through the CLI.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-restrict-command-access.html#session-manager-restrict-command-access
  - id: session-iam
    text: IAM policies control which users may start sessions and which managed nodes they can access.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#session-manager
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
  - id: session-default-user
    text: On Linux and macOS, Session Manager uses ssm-user by default and adds it to sudoers.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-run-as.html#session-preferences-run-as
  - id: session-run-as
    text: Run As chooses an existing Linux or macOS operating-system user using SSMSessionRunAs on the
      IAM entity before the user configured in session preferences.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-run-as.html#session-preferences-run-as
  - id: window-priority
    text: Tasks run in priority order; tasks with the same priority run in parallel.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html#state-manager-vs-maintenance-windows
  - id: window-final
    text: A later-priority task starts after earlier-priority tasks reach a final state, regardless of
      whether those tasks succeeded.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html#state-manager-vs-maintenance-windows
  - id: window-cutoff
    text: Cutoff specifies how many hours before the window ends Systems Manager stops scheduling new
      tasks.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateMaintenanceWindow.html#systemsmanager-CreateMaintenanceWindow-request-Cutoff
  - id: window-continue
    text: CutoffBehavior defaults to CONTINUE_TASK, allowing running tasks to continue after cutoff.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_RegisterTaskWithMaintenanceWindow.html#systemsmanager-RegisterTaskWithMaintenanceWindow-request-CutoffBehavior
  - id: window-types
    text: Maintenance windows support Run Command, Automation, Lambda and Step Functions Standard tasks;
      Express workflows are unsupported.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
cards:
  - id: systems-manager-030
    q: Can a Systems Manager Parameter Store advanced parameter be changed to standard after its value
      becomes smaller?
    a: No. Standard can be upgraded to advanced, but an advanced parameter cannot be downgraded.
    trap: true
    facts:
      - parameter-tier
  - id: systems-manager-031
    q: Which Systems Manager Parameter Store policies exist, and how do they notify?
    a: Expiration deletes the parameter; ExpirationNotification and NoChangeNotification emit
      EventBridge events. Advanced parameters support up to ten policies; a newly supplied policy
      array replaces the existing policies.
    facts:
      - parameter-expiry
      - parameter-expiry-notify
      - parameter-nochange
      - parameter-policy-count
      - parameter-policy-replace
  - id: systems-manager-071
    q: An application needs all Systems Manager parameters below its environment path. Which API and
      naming structure fit?
    a: Use slash-separated parameter hierarchies and GetParametersByPath with recursive retrieval.
      Hierarchies support up to 15 levels.
    facts:
      - parameter-path
      - parameter-path-depth
      - parameter-recursive
  - id: systems-manager-073
    q: A Systems Manager parameter already has 100 versions and the oldest has a deployment label. What
      happens when its value is updated?
    a: The update fails because the labeled oldest version cannot be deleted. Move the label to a newer
      version before continuing updates.
    trap: true
    facts:
      - parameter-history
      - parameter-history-label
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
  - id: systems-manager-059
    q: A Systems Manager maintenance-window task fails. Does task priority automatically skip all later
      tasks?
    a: No. Later-priority tasks can start after earlier tasks reach a final state, regardless of
      success. Priority orders tasks; it is not a success dependency.
    trap: true
    facts:
      - window-priority
      - window-final
  - id: systems-manager-060
    q: A Systems Manager maintenance window reaches its cutoff while tasks are running. What happens by
      default?
    a: CONTINUE_TASK allows running tasks to continue. Cutoff stops scheduling new tasks; it is not an
      automatic termination deadline.
    trap: true
    facts:
      - window-cutoff
      - window-continue
  - id: systems-manager-061
    q: Which Step Functions workflow type can run as a Systems Manager maintenance-window task?
    a: Standard workflows. Express workflows are unsupported.
    facts:
      - window-types
---
Systems Manager Parameter Store uses hierarchies, policies and version history to organize parameters and manage their lifecycle. These controls affect how applications retrieve values and how updates behave over time.

### How it works

1. Organize parameter names in a slash-separated hierarchy. Use `GetParametersByPath` with recursive retrieval to read parameters below a path.
2. Use policies on an advanced parameter to delete it after an expiration timestamp or emit EventBridge events. `ExpirationNotification` alerts before or after expiration; `NoChangeNotification` alerts when the parameter has remained unchanged for the specified period. Expiration is processed asynchronously through periodic scans.
3. When updating policies, supply the complete desired policy array: a new array replaces the existing policies.
4. Parameter Store retains version history. Once the history is full, the oldest version is normally removed to make room for a new one. If the oldest version has a label, the update fails; move the label to a newer version before retrying.

### Exam cues

- If the question says an application needs parameters below an environment path, think a hierarchy and recursive `GetParametersByPath`, because it retrieves parameters below the requested path.
- If the question says to alert on a parameter that has not changed, think `NoChangeNotification`, because it emits an EventBridge event after the specified unchanged period.
- If the question says an update fails with a full version history, think a label on the oldest version, because that label prevents its removal.

### Remember

- Hierarchies support up to 15 levels.
- An advanced parameter supports up to ten policies.
- Parameter Store retains up to 100 versions.
- A standard parameter can become advanced; an advanced parameter cannot be changed back to standard.
- Session Manager idle timeout: 20 minutes by default, one to 60 minutes; resizing or reconnecting can reset it. Maximum session duration is a separate limit.
- Restricted command access: custom `Session` documents with `sessionType: InteractiveCommands`, started through the CLI.
- Run As selects an existing Linux or macOS user (the `SSMSessionRunAs` tag wins over the account preference) and fails rather than falling back to `ssm-user`.

> **Trap:** `Expiration` deletes the parameter; `ExpirationNotification` emits an event. Also, supplying a new policy array replaces the existing array rather than adding to it.
