---
title: Organization policies and Config prerequisites
level: professional
order: 10
facts:
  - id: organization-scope
    text: Firewall Manager centrally manages security policies for an organization or selected accounts and resources.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/security-group-policies.html#security-group-policies
  - id: administrator
    text: Firewall Manager requires an AWS Organizations organization and a Firewall Manager administrator account.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/fms-prereq.html#fms-prereq
  - id: config
    text: AWS Config must be enabled in each member account including the administrator account and in each Region with resources to protect.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/enable-config.html#enable-config
  - id: continuous-recording
    text: Compliance monitoring requires continuous Config recording for protected resources; continuous is the default recording frequency.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/enable-config.html#enable-config
  - id: config-types
    text: When not recording all resource types, enable the Config resource types required by each policy type.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/enable-config.html#enable-config
  - id: scope-changes
    text: Firewall Manager continuously maintains security group policies as accounts and resources are added or updated.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/security-group-policies.html#security-group-policies
  - id: security-group-types
    text: Common security group policies apply groups; content audits find and remediate noncompliant rules; usage audits identify unused and redundant groups.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/security-group-policies.html#security-group-policies
  - id: audit-remediation
    text: AWS recommends starting content and usage audits with automatic remediation disabled and reviewing the proposed effects.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/security-group-policies.html#security-groups-best-practice
  - id: network-models
    text: Network Firewall policies support distributed firewalls per in-scope account and VPC, a centralized firewall in one VPC, or importing existing firewalls.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/network-firewall-policies.html#network-firewall-policies
  - id: network-rules
    text: Network Firewall rule groups must already exist in the Firewall Manager administrator account before they can be included in a policy.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/network-firewall-policies.html#network-firewall-policies
  - id: dns-associations
    text: DNS Firewall policies manage associations between DNS Firewall rule groups and in-scope VPCs across an organization.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/dns-firewall-policies.html#dns-firewall-policies
  - id: dns-rules
    text: DNS Firewall rule groups must already exist in the Firewall Manager administrator account before they can be included in a policy.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/dns-firewall-policies.html#dns-firewall-policies
  - id: sharing
    text: Network Firewall and DNS Firewall policies require resource sharing enabled for AWS Organizations.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/dns-firewall-policies.html#dns-firewall-policies
  - id: dns-priority
    text: DNS Firewall evaluates Firewall Manager first rule groups at priorities 1 through 99, account-managed groups next, and Firewall Manager last rule groups at priorities 9901 through 10000.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/dns-firewall-policies.html#dns-firewall-policies
  - id: policy-types
    text: Firewall Manager supports AWS WAF, Shield Advanced, security group, network ACL, Network Firewall and DNS Firewall policies.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/enable-config.html#enable-config
cards:
  - id: firewall-manager-001
    q: Which service centrally manages AWS WAF, Shield Advanced, security group, network ACL and Network Firewall policies across an organization?
    a: AWS Firewall Manager. Configure AWS Config and the policy scope for the accounts and resources to protect.
    facts: [organization-scope, policy-types, config]
  - id: firewall-manager-002
    q: What prerequisites allow AWS Firewall Manager to monitor policy compliance across accounts?
    a: An AWS Organizations organization, a Firewall Manager administrator, and AWS Config enabled in each member account and relevant Region with continuous recording of protected resources.
    facts: [administrator, config, continuous-recording]
  - id: firewall-manager-003
    q: A team wants to find unused and redundant security groups across accounts with AWS Firewall Manager. Which policy should it use?
    a: A security group usage audit policy.
    facts: [security-group-types]
  - id: firewall-manager-004
    q: A team wants to check security group rules against standards with AWS Firewall Manager. Which policy should it use?
    a: A security group content audit policy. Start with automatic remediation disabled to review its effects.
    facts: [security-group-types, audit-remediation]
  - id: firewall-manager-005
    q: How can AWS Firewall Manager apply the same security groups to selected resources across accounts?
    a: Use a common security group policy.
    facts: [security-group-types]
  - id: firewall-manager-006
    q: Which AWS Firewall Manager Network Firewall management models are available?
    a: Distributed, centralized, and import existing firewalls.
    facts: [network-models]
  - id: firewall-manager-007
    q: A team wants centrally managed DNS filtering associations in VPCs across accounts. What should it configure in AWS Firewall Manager?
    a: A DNS Firewall policy with existing DNS Firewall rule groups and organization resource sharing enabled.
    facts: [dns-associations, dns-rules, sharing]
  - id: firewall-manager-008
    q: Does enabling daily AWS Config recording suffice for AWS Firewall Manager compliance monitoring?
    a: No. Protected resources must be recorded continuously.
    trap: true
    facts: [continuous-recording]
  - id: firewall-manager-009
    q: In an AWS Firewall Manager DNS Firewall policy, when are first and last rule groups evaluated?
    a: First groups use priorities 1 through 99, before account-managed groups; last groups use priorities 9901 through 10000, after them.
    facts: [dns-priority]
---
AWS Firewall Manager centrally manages security policies across an AWS Organizations organization, so teams do not have to configure every account separately. A policy sets the accounts and resources in scope.

### How it works

1. Set up an organization and a Firewall Manager administrator account.
2. Enable AWS Config in each member account, including the administrator, and each Region containing resources to protect. Config records resource configuration changes. Use continuous recording for protected resources and enable the resource types required by the policy.
3. Choose a policy and its scope. A security group is a set of network traffic rules. Common policies apply groups; content audits check rules; usage audits find unused or redundant groups.
4. Choose automatic remediation, meaning automatic corrective action, only after reviewing its effects. AWS recommends starting content and usage audits with it disabled. Firewall Manager maintains security group policies as accounts and resources change.
5. For Network Firewall or DNS Firewall policies, enable organization resource sharing and create the rule groups in the administrator account first. DNS Firewall policies associate groups of DNS filtering rules with in-scope virtual private clouds (VPCs).

| Network Firewall model | Firewall Manager action |
|---|---|
| Distributed | Creates a firewall for each in-scope account and VPC. |
| Centralized | Creates one firewall in one VPC. |
| Import existing | Imports existing firewalls into a policy. |

### Exam cues

- If the question says apply security groups across accounts, think common security group policy, because it applies selected groups to in-scope resources.
- If the question says find noncompliant rules or unused groups, think content audit or usage audit respectively, because they inspect different properties.
- If the question says centrally manage DNS filtering in multiple VPCs, think DNS Firewall policy, because it manages rule group associations across the organization.
- If the question says retain existing Network Firewall firewalls under central management, think import existing firewalls, because that model brings them into a policy.

### Remember

- AWS Config continuous recording is the default and is required for compliance monitoring.
- DNS first rule groups use priorities 1 through 99; account-managed groups follow; last rule groups use 9901 through 10000.
- Firewall Manager supports AWS WAF, Shield Advanced, network ACL and security group policies as well as Network Firewall and DNS Firewall policies.

> **Trap:** AWS Config enabled with daily recording does not satisfy Firewall Manager compliance monitoring. Protected resources need continuous recording.
