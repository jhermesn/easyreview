---
title: Rule group capacity and evaluation order
level: professional
order: 30
facts:
  - id: capacity-fixed
    text: Rule-group capacity is fixed at creation and cannot be changed or exceeded by later rule updates.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/nwfw-rule-group-capacity.html
  - id: capacity-policy
    text: A firewall policy reserves the entire configured capacity of a referenced rule group.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/nwfw-rule-group-capacity.html
  - id: home-net
    text: By default domain inspection HOME_NET is the deployment VPC address range; centralized inspection of other VPC ranges requires including those ranges in HOME_NET.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/stateful-rule-groups-domain-names.html
  - id: rule-order
    text: Default stateful action order is pass, drop, reject, then alert; strict order follows rule-group priority and the order of rules within each group.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/suricata-rule-evaluation-order.html
cards:
  - id: network-firewall-008
    q: An AWS Network Firewall rule group needs more capacity after creation. Can the team raise its capacity in place?
    a: No. Capacity is fixed at creation. Create a replacement rule group with sufficient capacity and update the policy reference.
    trap: true
    facts:
      - capacity-fixed
      - capacity-policy
  - id: network-firewall-009
    q: A central AWS Network Firewall inspects other VPCs, but their traffic misses domain-list filtering. Which variable should the team review?
    a: HOME_NET. Include the other VPC address ranges; its default covers only the deployment VPC.
    facts:
      - home-net
  - id: network-firewall-010
    q: What changes when AWS Network Firewall uses strict order for stateful rules?
    a: Groups follow configured priority and rules follow their listed order, rather than the default pass, drop, reject, alert action order.
    facts:
      - rule-order
---
AWS Network Firewall rule groups reserve processing capacity when they are created, and stateful rules run in an order the policy chooses. Both settings shape what a firewall can hold and which rule wins, so they matter when a central firewall grows or inspects traffic for other VPCs.

### How it works

1. Size each rule group at creation. Its capacity is fixed; later rule updates cannot exceed it, and a firewall policy reserves the whole configured capacity of every group it references.
2. To grow past that capacity, create a replacement group and point the policy at it.
3. Choose the stateful rule order. Default action order evaluates pass, then drop, reject and alert. Strict order follows rule group priority and the order of rules inside each group.
4. For domain list rules in a central inspection VPC, set `HOME_NET` to include the other VPC address ranges. By default it covers only the VPC where the firewall is deployed.

### Exam cues

- If the question says a rule group has run out of capacity, think a replacement group, because capacity cannot be raised in place.
- If the question says rules must run in an exact sequence, think strict order, because default order groups rules by action.
- If the question says domain filtering misses traffic from spoke VPCs, think `HOME_NET`, because its default is the firewall's own VPC range.

### Remember

- Rule group capacity: fixed at creation, fully reserved by each referencing policy.
- Default stateful order: pass, drop, reject, alert.
- `HOME_NET` default: the deployment VPC range.

> **Trap:** Editing rules cannot push a rule group past the capacity chosen at creation. Plan headroom or replace the group.
