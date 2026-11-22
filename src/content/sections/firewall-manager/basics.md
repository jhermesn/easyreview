---
title: "Firewall Manager basics"
level: foundational
order: 5
facts:
  - id: central-rules
    text: "AWS Firewall Manager manages protections such as AWS WAF, Shield Advanced, security groups, network ACLs and Network Firewall across many accounts and resources from one place."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html#fms-chapter
  - id: "waf-web-acls"
    text: "Firewall Manager AWS WAF policies manage web ACLs and insert policy rule groups for in-scope resources."
    source: "https://docs.aws.amazon.com/waf/latest/developerguide/how-fms-manages-web-acls.html"
cards:
  - id: firewall-manager-010
    q: "A company must apply the same AWS WAF rules to every account in its organization automatically. Which service fits?"
    a: "AWS Firewall Manager."
    facts: [central-rules]
  - id: firewall-manager-011
    q: "How can AWS Firewall Manager apply AWS WAF rule groups to protected resources across an organization?"
    a: "Use an AWS WAF policy to manage web ACLs and their rule groups for in-scope resources."
    facts: [waf-web-acls]
---
AWS Firewall Manager applies firewall protections across the accounts of an organization from one place.

### How it works

1. Define a policy, for example a set of AWS WAF rules.
2. Firewall Manager applies it to matching resources in every account.
3. New resources and accounts get the policy too.

### Exam cues

- If the question says apply WAF rule groups across protected resources, think a Firewall Manager WAF policy, because it manages their web ACLs.
- If the question says the same firewall rules across many accounts, think Firewall Manager.

### Remember

- Covers WAF, Shield Advanced, security groups, network ACLs and Network Firewall.

> **Trap:** Firewall Manager does not filter traffic itself; it manages services such as AWS WAF that do.
