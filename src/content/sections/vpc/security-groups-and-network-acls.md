---
title: Security groups and network ACLs
level: associate
order: 10
facts:
  - id: sg-scope
    text: Security groups control allowed inbound and outbound traffic for associated resources and
      their network interfaces.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups
  - id: sg-stateful
    text: Security groups track connections and automatically allow response traffic for allowed
      requests regardless of opposite-direction rules.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#security-group-basics
  - id: sg-allows
    text: Security groups have allow rules only; rules across multiple attached groups combine into one
      set of permissions.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-characteristics
  - id: sg-defaults
    text: A newly created custom security group has no inbound rules and an allow-all outbound rule.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-characteristics
  - id: sg-reference
    text: A security-group reference permits matching traffic from or to network interfaces associated
      with that referenced group; it does not copy its rules.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-referencing
  - id: acl-subnet
    text: A network ACL filters traffic entering or leaving a subnet; each subnet has exactly one ACL,
      and one ACL can serve multiple subnets.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: acl-stateless
    text: Network ACLs are stateless, so response traffic needs its own matching allow rule.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: acl-order
    text: ACL rules allow or deny traffic in ascending rule-number order; the first match wins, and
      numbered rules range from 1 to 32766.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: acl-unmatched
    text: The unremovable asterisk ACL rules deny traffic that matches no numbered rule.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/custom-network-acl.html#custom-network-acl
  - id: ephemeral-reply
    text: ACL return-path rules must allow the client ephemeral ports, the temporary ports the client
      selects for connections; the range depends on the client.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/custom-network-acl.html#nacl-ephemeral-ports
  - id: sg-exceptions
    text: Security groups do not filter Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata,
      Windows activation, Time Sync, or reserved VPC router addresses.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#security-group-basics
  - id: acl-exceptions
    text: Network ACLs do not filter Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata, Windows
      activation, Time Sync, or reserved VPC router addresses.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: dns-filter
    text: Use Route 53 Resolver DNS Firewall to filter DNS requests through the VPC Resolver.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: reply-log
    text: An accepted request followed by a rejected response can indicate that the subnet ACL blocks
      the response despite stateful security-group permission.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-records-examples.html#flow-log-example-security-groups
  - id: sg-retirement-dependency
    text: Referencing an Elastic Beanstalk environment security group from another group can prevent
      deletion during environment termination; a separately managed group avoids tying access to
      that environment lifecycle.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.ec2.console.html#using-features.managing.ec2.securitygroups
  - id: cidr-sources
    text: Security group rules and network ACL rules specify IP address ranges in CIDR notation, such as 203.0.113.0/24.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html
cards:
  - id: vpc-001
    q: How do VPC security groups and network ACLs differ?
    a: Security groups protect associated resources, track connections, and have allow rules only.
      Network ACLs protect subnets, do not track connections, and process allow or deny rules from
      lowest number to first match. A subnet has one ACL.
    facts:
      - sg-scope
      - sg-stateful
      - sg-allows
      - acl-subnet
      - acl-stateless
      - acl-order
  - id: vpc-002
    q: A VPC subnet ACL allows inbound HTTPS, but a client gets no response. What return-path rule may
      be missing?
    a: An outbound allow rule for the client ephemeral port range. ACLs are stateless, so allowing the
      inbound request does not automatically allow its response.
    trap: true
    facts:
      - acl-stateless
      - ephemeral-reply
  - id: vpc-003
    q: A team must block one abusive IP range from reaching a VPC subnet. Which network control fits?
    a: An ACL deny rule placed before any matching allow rule. Security groups have no deny rules.
    facts:
      - acl-order
      - sg-allows
  - id: vpc-004
    q: Which AWS platform traffic bypasses VPC security-group and network-ACL filtering?
    a: Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata, Windows activation, Time Sync, and
      reserved VPC router addresses. Use Resolver DNS Firewall for DNS filtering.
    trap: true
    facts:
      - sg-exceptions
      - acl-exceptions
      - dns-filter
  - id: vpc-008
    q: VPC Flow Logs show an accepted inbound request followed by a rejected response. Which control
      should the team inspect first?
    a: The subnet network ACL. It needs an explicit return-path allow rule, while the stateful security
      group automatically permits responses to allowed requests.
    facts:
      - reply-log
      - acl-stateless
      - sg-stateful
  - id: vpc-009
    q: A new custom VPC security group has not been edited. What traffic do its initial rules allow?
    a: No inbound connections and all outbound traffic. Responses to allowed outbound requests are
      permitted by connection tracking.
    facts:
      - sg-defaults
      - sg-stateful
  - id: vpc-010
    q: A database security group references the application security group. Does it inherit the
      application group rules?
    a: No. The reference permits matching traffic involving the application group network interfaces; it
      does not copy that group rules.
    trap: true
    facts:
      - sg-reference
  - id: vpc-025
    q: An old Elastic Beanstalk environment cannot terminate because a database security group
      references its security group. How should the team remove the dependency without cutting
      replacement access?
    a: Permit the replacement application through a suitable independent security group, then remove the
      retiring environment group reference. References to an environment-managed group can block its
      deletion.
    facts:
      - sg-retirement-dependency
      - sg-reference
  - id: vpc-034
    q: In which notation do security group and network ACL rules specify IP address ranges?
    a: CIDR notation, for example 203.0.113.0/24.
    facts: [cidr-sources]
---

Security groups and network access control lists (ACLs) control traffic at different places in a VPC. A security group protects its associated resources. A network ACL controls traffic crossing a subnet boundary, where a subnet is a range of addresses inside the VPC.

### How it works

1. A network ACL checks traffic entering or leaving its subnet. It evaluates rule numbers from lowest to highest and stops at the first match.
2. The resource's security groups allow matching traffic. Their permissions combine; they have no deny rules.
3. For an allowed request, security-group connection tracking automatically allows the response. This is what stateful means.
4. The ACL checks the response separately because it is stateless, meaning it remembers no connection. Allow the client's ephemeral ports, the temporary ports selected when it opens a connection.

| Property | Security group | Network ACL |
|---|---|---|
| Scope | Associated resource or network interface | Subnet boundary |
| Rules | Allow only, combined across groups | Allow and deny, first numbered match |
| Return traffic | Automatically allowed for an allowed request | Needs an explicit allow rule |
| Association | A resource can use multiple groups | One ACL per subnet; an ACL can serve multiple subnets |

A group reference permits matching traffic involving interfaces in the referenced group. It does not copy that group's rules. For example, a database can allow its application tier by referring to the application's group.

Before retiring an environment, preserve the replacement application's access and remove references to the retiring environment's group. Beanstalk can fail to delete an environment-managed security group while another group depends on it; a separately managed group avoids that lifecycle dependency.

### Exam cues

- If the question says block an IP range for an entire subnet, think an early ACL deny rule, because security groups cannot express deny rules.
- If the question says inbound access works but replies fail, think the ACL return path, because responses need their own allow rule and the correct client ports.
- If the question says filter queries through Amazon's VPC DNS resolver, think Resolver DNS Firewall, because security groups and ACLs do not filter that resolver traffic.

### Remember

- Numbered ACL rules: 1 to 32766. The asterisk rule denies unmatched traffic.
- A new custom security group starts with no inbound rules and an allow-all outbound rule.
- Both controls bypass Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata, Windows activation, Time Sync, and reserved VPC router addresses. DNS resolves names to addresses; DHCP supplies network configuration. Metadata endpoints expose instance or task information.

> **Trap:** An inbound allow rule on a stateless ACL does not permit the response automatically. Choose return-path ports for the actual client, whose ephemeral range can vary.
