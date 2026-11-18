---
title: Resolver DNS Firewall
level: associate
order: 90
facts:
  - id: firewall-scope
    text: DNS Firewall filters domain-name queries through VPC Resolver, including queries from VPC
      resources and on-premises queries entering the protected VPC through Resolver endpoints.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
  - id: firewall-not-packets
    text: DNS Firewall does not resolve domain names into blocked IP addresses and does not filter other
      application protocols such as HTTPS.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
  - id: firewall-groups
    text: A rule group is a reusable collection of filtering rules; associating it with a VPC enables
      filtering for that VPC.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
  - id: firewall-no-match
    text: A query that matches no rule across the associated rule groups resolves normally.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
  - id: firewall-lists
    text: Foundational rules can use user-managed or AWS-managed domain lists and can optionally
      restrict a rule to a DNS query type.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
  - id: firewall-redirect
    text: By default, domain-list rules inspect the entire DNS redirection chain; trusting redirected
      domains applies only within that query transaction.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
  - id: firewall-allow
    text: ALLOW stops inspection and permits the query; it is not available for DNS Firewall Advanced
      rules.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html#resolver-dns-firewall-rule-actions
  - id: firewall-block
    text: BLOCK stops inspection and blocks the intended DNS destination, using the configured DNS block
      response.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html#resolver-dns-firewall-rule-actions
  - id: firewall-walled-garden
    text: An allow-only design evaluates approved domains before a rule blocking the remaining domains.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-getting-started.html#resolver-dns-firewall-getting-started
  - id: firewall-share
    text: AWS RAM can share rule groups across accounts; recipients can associate them with their VPCs
      but cannot edit or delete the shared group.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-group-sharing.html#resolver-dns-firewall-rule-group-sharing
  - id: firewall-fms
    text: Firewall Manager DNS Firewall policies manage rule-group associations across an AWS
      organization.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/dns-firewall-policies.html#dns-firewall-policies
  - id: firewall-sg-exclusion
    text: Security groups cannot filter traffic to or from Amazon-provided DNS.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups
  - id: firewall-acl-exclusion
    text: Network ACLs cannot block traffic to or from the Route 53 VPC Resolver.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#vpc-network-acls
  - id: firewall-advanced
    text: DNS Firewall Advanced detects DNS tunneling and DGA threats, including dictionary DGAs, and
      supports BLOCK or ALERT actions.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
cards:
  - id: route53-055
    q: An EC2 application must be prevented from resolving known malicious domains through VPC Resolver.
      Which Route 53 feature fits when security groups cannot filter that resolver traffic?
    a: Associate a Resolver DNS Firewall rule group with the VPC and block matching domains. Security
      groups and network ACLs cannot block the Amazon-provided resolver path.
    facts:
      - firewall-scope
      - firewall-groups
      - firewall-sg-exclusion
      - firewall-acl-exclusion
  - id: route53-060
    q: A team adds only an approved-domain ALLOW list to Route 53 DNS Firewall and expects all other
      domains to be denied. What else is required?
    a: A later rule blocking the remaining domains. Queries that match no rule resolve normally.
    trap: true
    facts:
      - firewall-walled-garden
      - firewall-no-match
  - id: route53-062
    q: A central security account must reuse Route 53 DNS Firewall rules across application accounts.
      Which sharing and enforcement options apply?
    a: Share rule groups with AWS RAM for recipient VPC associations. Use Firewall Manager policies to
      manage associations across the organization. Recipients cannot edit the shared group.
    facts:
      - firewall-share
      - firewall-fms
  - id: route53-063
    q: Does Route 53 DNS Firewall inspect HTTPS payloads or block an IP address obtained through another
      path?
    a: No. It filters domain-name queries through VPC Resolver, not HTTPS payloads or resolved
      destination IP addresses.
    trap: true
    facts:
      - firewall-not-packets
diagrams:
  - id: route53-dns-firewall-evaluation
    title: VPC Resolver submits DNS queries to the associated rule groups
    width: 800
    height: 170
    groups: []
    nodes:
      - id: client
        label: Workload
        icon: res-ec2-instance
        x: 20
        y: 48
        w: 160
        h: 72
        tone: compute
      - id: resolver
        label: VPC Resolver
        icon: res-route-53-resolver
        x: 220
        y: 48
        w: 160
        h: 72
        tone: network
      - id: firewall
        label: DNS Firewall
        icon: route-53
        x: 420
        y: 48
        w: 160
        h: 72
        tone: network
      - id: action
        label: Rule action
        sub: allow, alert, or block
        x: 620
        y: 48
        w: 160
        h: 86
        tone: security
    edges:
      - from: client
        to: resolver
        step: 1
      - from: resolver
        to: firewall
        step: 2
      - from: firewall
        to: action
        step: 3
    steps:
      - Send a name query through VPC Resolver.
      - Evaluate associated groups and rules from lowest numeric priority.
      - Apply the first matching action; if none matches, resolve normally.
---
Route 53 Resolver DNS Firewall controls which domain names clients can resolve through VPC Resolver, the DNS service used by a virtual private cloud (VPC). DNS translates names into records such as addresses. DNS Firewall filters those queries; it does not inspect HTTPS payloads or turn domain names into blocked destination IPs. [Filtering scope](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html)

### How it works

1. Create a domain list, a collection of names to match, or select an AWS-managed list. Foundational rules can also select a query type. DNS Firewall Advanced detects DNS tunneling, which carries data through DNS, and DGA threats, which generate domain names for malicious use.
2. Add rules to a rule group, a reusable rule collection, and associate the group with a VPC. Filtering also covers on-premises queries entering that protected VPC through Resolver endpoints.
3. Choose an action for each rule. `ALLOW` permits the query and stops inspection; `BLOCK` stops inspection and returns the configured block response. Queries with no match resolve normally.

For an allow-only policy, allow approved domains before a rule blocking the rest. [Actions](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html) · [Policy examples](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-getting-started.html)

By default, domain-list rules inspect all names in a DNS redirection chain, where one name points to another. A setting that trusts redirected names applies only to that query; a direct query for the destination is evaluated independently. [Redirection behavior](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html)

### Exam cues

- If the question says block malicious domain lookups through Amazon-provided DNS, think DNS Firewall, because security groups and network ACLs cannot block that resolver path.
- If the question says an allow list must deny everything else, think a later catch-all block rule, because unmatched queries resolve normally.
- If the question says deploy common DNS controls across accounts, think RAM sharing or Firewall Manager policies, because rule groups can be reused across VPCs. [Sharing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-group-sharing.html) · [Organization policies](https://docs.aws.amazon.com/waf/latest/developerguide/dns-firewall-policies.html)

### Remember

- Queries that match no rule resolve normally.
- Advanced rules support `BLOCK` and `ALERT`, not `ALLOW`.

> **Trap:** A matching allow rule stops inspection, so a later block rule does not inspect that query.

> **Trap:** Blocking a DNS name does not inspect or deny all traffic to its destination. DNS filtering and application-traffic controls solve different problems.
