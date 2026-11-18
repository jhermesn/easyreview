---
title: "PLACEHOLDER systems-manager/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
