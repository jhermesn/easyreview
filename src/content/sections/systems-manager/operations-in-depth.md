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
---
Systems Manager Parameter Store uses hierarchies, policies and version history to organize parameters and manage their lifecycle. These controls affect how applications retrieve values and how updates behave over time.

### How it works

1. Organize parameter names in a [slash-separated hierarchy](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-hierarchies.html#ps-hierarchy-examples). Use [`GetParametersByPath` with recursive retrieval](https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParametersByPath.html#systemsmanager-GetParametersByPath-request-Recursive) to read parameters below a path.
2. Use [policies](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#parameter-store-policies) on an advanced parameter to delete it after an expiration timestamp or emit EventBridge events. `ExpirationNotification` alerts before or after expiration; `NoChangeNotification` alerts when the parameter has remained unchanged for the specified period. Expiration is processed asynchronously through periodic scans.
3. When updating policies, supply the [complete desired policy array](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#sysman-paramstore-su-policy-create): a new array replaces the existing policies.
4. Parameter Store retains [version history](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions). Once the history is full, the oldest version is normally removed to make room for a new one. If the oldest version has a label, the update fails; move the label to a newer version before retrying.

### Exam cues

- If the question says an application needs parameters below an environment path, think a hierarchy and recursive `GetParametersByPath`, because it retrieves parameters below the requested path.
- If the question says to alert on a parameter that has not changed, think `NoChangeNotification`, because it emits an EventBridge event after the specified unchanged period.
- If the question says an update fails with a full version history, think a label on the oldest version, because that label prevents its removal.

### Remember

- Hierarchies support up to 15 levels.
- An advanced parameter supports up to ten policies.
- Parameter Store retains up to 100 versions.
- A standard parameter can become advanced; an [advanced parameter cannot be changed back to standard](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-tiers-limitations).

> **Trap:** `Expiration` deletes the parameter; `ExpirationNotification` emits an event. Also, supplying a new policy array replaces the existing array rather than adding to it.
