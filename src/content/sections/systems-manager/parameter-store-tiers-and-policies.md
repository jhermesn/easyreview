---
title: Parameter Store tiers and policies
level: associate
order: 130
facts:
  - id: parameter-types
    text: Parameter Store supports String, comma-separated StringList and encrypted SecureString values.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/param-create-cli.html#param-create-cli
  - id: parameter-standard-size
    text: Standard parameter values can be up to 4 KB.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-standard-count
    text: The standard tier supports 10000 parameters per account and Region.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-standard-cost
    text: Standard parameters have no additional storage charge.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-standard-cost-policy
    text: Standard parameters do not support parameter policies.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-advanced-size
    text: Advanced parameter values can be up to 8 KB.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-advanced-count
    text: The advanced tier supports 100000 parameters per account and Region.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-advanced
    text: Advanced parameters incur charges.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-advanced-policy
    text: Advanced parameters support parameter policies.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-advanced-parameters
  - id: parameter-tier
    text: A standard parameter can become advanced; an advanced parameter cannot be changed back to
      standard.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html#parameter-store-tiers-limitations
  - id: parameter-share
    text: Cross-account sharing through AWS RAM requires advanced parameters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#prereqs
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
  - id: parameter-version
    text: Parameter values begin at version one.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: parameter-version-increment
    text: Each parameter value edit increments the version.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: parameter-version-latest
    text: Requests without a parameter version use the latest version.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: parameter-history
    text: Parameter Store retains up to 100 versions, normally deleting the oldest to make room for the
      next.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: parameter-history-label
    text: If the oldest of 100 retained versions has a label, creation of a new version fails instead of
      deleting the labeled version.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: parameter-missing-version
    text: Requesting a nonexistent parameter version fails rather than falling back to latest.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-versions.html#sysman-paramstore-versions
  - id: parameter-rotation
    text: AWS recommends Secrets Manager for credentials requiring automatic rotation.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html#parameter-store-policies
cards:
  - id: systems-manager-005
    q: How do Systems Manager Parameter Store standard and advanced parameters differ?
    a: "Standard: 4 KB values, 10000 parameters per account and Region, no additional storage charge and
      no policies. Advanced: 8 KB, 100000 parameters, charges, policies and AWS RAM sharing.
      Advanced parameters cannot be downgraded."
    trap: true
    facts:
      - parameter-standard-size
      - parameter-standard-count
      - parameter-standard-cost
      - parameter-standard-cost-policy
      - parameter-advanced-size
      - parameter-advanced-count
      - parameter-advanced
      - parameter-advanced-policy
      - parameter-share
      - parameter-tier
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
  - id: systems-manager-072
    q: A deployment must keep using a reviewed Systems Manager parameter value after later edits. How
      should it retrieve the value?
    a: Specify the parameter version. Value changes create numbered versions; omitting a version
      retrieves the latest, and requesting a nonexistent version fails.
    facts:
      - parameter-version
      - parameter-version-increment
      - parameter-version-latest
      - parameter-missing-version
  - id: systems-manager-073
    q: A Systems Manager parameter already has 100 versions and the oldest has a deployment label. What
      happens when its value is updated?
    a: The update fails because the labeled oldest version cannot be deleted. Move the label to a newer
      version before continuing updates.
    trap: true
    facts:
      - parameter-history
      - parameter-history-label
  - id: systems-manager-074
    q: A team wants a Systems Manager notification when an approved AMI parameter remains unchanged too
      long. Which policy fits?
    a: NoChangeNotification on an advanced parameter. It emits an EventBridge event after the configured
      unchanged interval.
    facts:
      - parameter-nochange
      - parameter-advanced
      - parameter-advanced-policy
  - id: systems-manager-088
    q: Which Systems Manager Parameter Store types represent text, a comma-separated list and an
      encrypted value?
    a: String for text, StringList for a comma-separated list, and SecureString for an encrypted value.
    facts:
      - parameter-types
---
Parameter Store keeps application configuration as named values. The tier determines storage limits and policy support; the parameter type determines how the value is represented.

### How it works

1. Choose `String` for text, `StringList` for a comma-separated list, or `SecureString` for an encrypted value.
2. Organize names with slash-separated paths. A hierarchy is a nested name structure; `GetParametersByPath` with recursive retrieval reads below the requested path.
3. Choose the standard or advanced tier. Upgrade a standard parameter if its size, policy or sharing needs require advanced.
4. Update the value to create a numbered version. Request a specific version when a deployment must retain a reviewed value.
5. Attach advanced parameter policies for expiration or EventBridge notifications. Send the full desired policy array when updating policies.

| Property | Standard | Advanced |
|---|---|---|
| Value size | 4 KB | 8 KB |
| Parameters per account and Region | 10000 | 100000 |
| Storage charge | No additional charge | Charged |
| Parameter policies | Unsupported | Supported |
| Cross-account AWS RAM sharing | Unsupported | Supported |

### Exam cues

- If the question says configuration needs expiration or stale-value alerts, think advanced parameter policies, because standard parameters do not support policies.
- If the question says credentials require automatic rotation, think Secrets Manager, because AWS recommends it for that requirement.
- If the question says reuse configuration across accounts, think advanced parameters with AWS RAM, because standard parameters cannot use that sharing feature.

### Remember

- Policy types: `Expiration`, `ExpirationNotification`, `NoChangeNotification`.
- Maximum ten policies per advanced parameter; new policy arrays replace the old array.
- Hierarchies support 15 levels.
- Version one is initial; edits increment it. Up to 100 versions are retained.
- No version specified means latest; a nonexistent version causes an error.

> **Trap:** Shrinking an advanced value does not permit downgrading the parameter.

> **Trap:** A label on the oldest retained version prevents its automatic deletion and can block the next update.
