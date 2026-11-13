---
title: Central configuration policies
level: professional
order: 30
facts:
  - id: central-prereq
    text: Central configuration requires Organizations integration and a delegated administrator.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/start-central-configuration.html#orgs-integration-prereq
  - id: central-admin
    text: For central configuration, the management account cannot be the delegated administrator.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/start-central-configuration.html#orgs-integration-prereq
  - id: central-home
    text: The delegated administrator creates and manages configuration policies in the home Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/start-central-configuration.html#home-region-prereq
  - id: non-opt-in-home
    text: The central configuration home Region cannot be an opt-in Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/start-central-configuration.html#home-region-prereq
  - id: optional-linked
    text: Linked Regions are optional for central configuration.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/start-central-configuration.html#home-region-prereq
  - id: central-scope
    text: A policy applies in the home Region and all linked Regions, subject to control availability; it cannot target an arbitrary subset of those Regions.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/start-central-configuration.html#home-region-prereq
  - id: central-settings
    text: Policies configure CSPM enablement, enabled standards, enabled or disabled controls, and supported custom control parameters.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-concepts
  - id: policy-association
    text: A policy takes effect only after association with accounts, OUs, or the organization root.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/create-associate-policy.html#create-associate-policy
  - id: policy-inheritance
    text: Without direct association, an account or OU inherits the closest associated parent's policy or self-managed behavior; direct application overrides inheritance.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#policy-association
  - id: one-policy
    text: Each account or OU uses one complete configuration policy at a time.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#configuration-policies-considerations
  - id: no-policy-merge
    text: Configuration settings are not merged across policies.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#configuration-policies-considerations
  - id: managed
    text: Only the delegated administrator configures centrally managed targets; self-managed accounts configure their settings separately in each Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
  - id: root-new
    text: New accounts inherit a policy associated with the root unless a different policy or self-managed designation overrides it.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#policy-association
  - id: new-controls
    text: An enabled-controls list disables unlisted controls, including newly released ones.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/create-associate-policy.html#create-associate-policy
  - id: disabled-control-list
    text: A disabled-controls list enables other applicable controls in enabled standards, including newly released ones.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/create-associate-policy.html#create-associate-policy
  - id: recommended-policy
    text: The recommended policy enables CSPM, FSBP, and all existing and new FSBP controls with default parameters.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#policy-types
  - id: config-not-policy
    text: Configuration policies do not include Config recorder settings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#policy-types
  - id: auto-recorder
    text: With both CSPM and Security Hub enabled, CSPM creates a service-linked recorder; CSPM alone requires manual Config recording.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#service-linked-config-recorder
  - id: opt-in-linked
    text: An opt-in linked Region must be enabled for an account before its configuration policy can take effect.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#configuration-policies-considerations
  - id: global-controls
    text: Central configuration normally enables global-resource controls only in the home Region; if unsupported there, CSPM tries a supported linked Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/create-associate-policy.html#create-associate-policy
  - id: disassociate
    text: Dissociating a policy does not revert its settings; apply a replacement policy or switch to self-managed and change settings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/configuration-policies-overview.html#configuration-policies-considerations
diagrams:
  - id: security-hub-policy-inheritance
    title: Configuration policy association and inheritance
    width: 1060
    height: 360
    nodes:
      - id: admin
        label: Administrator
        icon: security-hub
        x: 20
        y: 120
        w: 180
        h: 86
        sub: home Region
        tone: security
      - id: root
        label: Organization root
        icon: organizations
        x: 360
        y: 120
        w: 180
        h: 86
        sub: policy association
        tone: mgmt
      - id: ou
        label: OU
        icon: organizations
        x: 740
        y: 20
        w: 180
        h: 86
        sub: inherits policy
        tone: mgmt
      - id: account
        label: Member account
        icon: res-organizations-account
        x: 740
        y: 240
        w: 180
        h: 86
        sub: inherits policy
        tone: mgmt
    edges:
      - from: admin
        to: root
        step: 1
        label: associate policy
      - from: root
        to: ou
        step: 2
        label: inherit
      - from: ou
        to: account
        step: 3
        label: inherit
    steps:
      - The delegated administrator associates a policy with the root.
      - An OU without a direct association inherits the policy.
      - The member inherits unless a direct policy or self-managed designation overrides inheritance.
cards:
  - id: security-hub-006
    q: An AWS Security Hub CSPM team needs consistent standards and controls across OUs and Regions. How should it configure them?
    a: Use Organizations, a delegated administrator, and central configuration. Create and associate configuration policies in the home Region; they apply in home and linked Regions.
    facts:
      - central-prereq
      - central-admin
      - central-home
      - non-opt-in-home
      - optional-linked
      - central-settings
      - policy-association
      - central-scope
  - id: security-hub-018
    q: A new account joins an OU under an AWS Security Hub CSPM root policy. Which settings apply if there is no more specific association?
    a: It inherits the root policy. A direct policy or self-managed designation can override inherited behavior.
    facts:
      - root-new
      - policy-inheritance
  - id: security-hub-019
    q: An AWS Security Hub CSPM team expects newly released controls to enable automatically. Which policy list should it use?
    a: List the controls to disable. Other controls in enabled standards, including future controls, are enabled. An enabled-controls list leaves unlisted controls disabled.
    trap: true
    facts:
      - new-controls
      - disabled-control-list
  - id: security-hub-020
    q: An AWS Security Hub CSPM account has an explicit child policy and a parent policy. Are their settings combined?
    a: No. Each account uses one complete configuration policy. Direct application overrides inheritance.
    trap: true
    facts:
      - one-policy
      - no-policy-merge
      - policy-inheritance
  - id: security-hub-021
    q: An AWS Security Hub CSPM policy was created but never associated with an account, OU, or root. Does it change those targets?
    a: No. A policy takes effect only after association.
    facts:
      - policy-association
  - id: security-hub-022
    q: An AWS Security Hub CSPM team dissociates a policy that disabled a control. Does the control return to its previous state?
    a: No. Dissociation does not revert settings. Apply a policy that enables the control, or use self-management to change it.
    trap: true
    facts:
      - disassociate
  - id: security-hub-023
    q: An AWS Security Hub CSPM centrally managed account wants local control settings different from its policy. Who can change its configuration?
    a: The delegated administrator. To allow local configuration, the administrator must designate the account self-managed.
    facts:
      - managed
  - id: security-hub-024
    q: An AWS Security Hub CSPM policy links an opt-in Region, but the member account has not enabled that Region. What is required?
    a: Enable the Region for the account before the policy can apply there. An opt-in Region cannot be the central configuration home Region.
    facts:
      - opt-in-linked
      - central-home
      - non-opt-in-home
      - optional-linked
  - id: security-hub-031
    q: What settings does an AWS Security Hub CSPM configuration policy specify?
    a: CSPM enablement, enabled security standards, controls to enable or disable, and supported custom control parameters.
    facts:
      - central-settings
---
Security Hub CSPM central configuration applies consistent service, standard, and control settings across an organization. A configuration policy is a complete set of those settings. An organizational unit (OU) groups accounts in the organization hierarchy; policy inheritance lets child accounts receive their parent's configuration.

### How it works

1. Integrate CSPM with Organizations. The management account designates a separate delegated administrator for central configuration.
2. Choose a home Region and optional linked Regions. The home Region cannot be an opt-in Region, a Region disabled for an account until explicitly enabled. Enable any opt-in linked Region for each account before applying its policy there.
3. Create a policy in the home Region. Select whether CSPM is enabled, the standards to enable, the controls to enable or disable, and supported control parameters, the values that customize a check.
4. Associate the policy with accounts, OUs, or the root. A child without direct association inherits the closest associated parent's policy or self-managed behavior. A directly applied association overrides inheritance; settings from different policies are not merged.
5. Apply settings across the home and all linked Regions where controls are available. Only the delegated administrator changes centrally managed settings. Self-managed accounts configure their settings separately in each Region.
6. Apply a root policy to cover new accounts by inheritance, while allowing explicit exceptions. Dissociating a policy does not undo its changes; apply a replacement policy or switch to self-management and adjust settings.

| Control selection | Existing controls | Newly released controls |
|---|---|---|
| List controls to enable | Only listed controls enabled | Disabled unless listed |
| List controls to disable | All other applicable controls enabled | Enabled unless excluded |
| Recommended policy | FSBP controls with default parameters | New FSBP controls enabled |

Central configuration normally keeps global-resource controls, checks for resources whose scope is not limited to one Region, in the home Region. If one is unsupported there, CSPM tries a linked Region where it is supported. Configuration policies do not contain Config recorder settings: CSPM alone still needs manual recording, while CSPM with Security Hub uses the automatically created service-linked recorder.

### Exam cues

- If the question says enforce the same standards across existing and new accounts and Regions, think central configuration policies, because policies apply settings across the hierarchy and linked Regions.
- If the question says enable future controls automatically, think a disabled-controls list, because unlisted controls remain enabled.
- If the question says an account needs independent Regional settings, think self-managed designation, because centrally managed targets are configured only by the delegated administrator.
- If the question says policy removed but controls stay disabled, think apply a replacement configuration, because dissociation does not restore earlier values.

### Remember

- Create and manage policies in the home Region.
- Associate a policy before it takes effect.
- Each account or OU uses one complete policy, with direct application overriding inheritance.
- Policies cover home and linked Regions; they do not configure the Config recorder.

> **Trap:** A child policy does not add selected controls to its parent's policy. It replaces the inherited configuration with a complete policy.
