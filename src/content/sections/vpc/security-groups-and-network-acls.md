---
title: Security groups and network ACLs
level: associate
order: 10
facts:
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
    text: "A security group reference allows the specified protocol and ports involving private addresses of interfaces in the referenced group, including the same group. It does not inherit that group's rules or automatically allow all traffic."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-referencing
  - id: acl-stateless
    text: "Network ACLs do not track connections. Traffic between subnets must pass the source outbound and destination inbound rules; replies must pass both subnet ACLs in the reverse direction."
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
    text: "Network ACL rules match protocol, applicable ports and a source CIDR for inbound traffic or destination CIDR for outbound traffic. They do not take security group IDs as the address range."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nacl-rules.html
  - id: common-ports
    text: "Common security group rules open TCP 22 for SSH to Linux instances, 3389 for RDP to Windows instances, 80 for HTTP and 443 for HTTPS."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html#security-group-rules-reference
  - id: acl-defaults
    text: "The default network ACL allows all inbound and outbound traffic, while a new custom network ACL denies everything until you add allow rules."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/default-network-acl.html#default-network-acl
  - id: peer-sg-reference
    text: "A security group can reference a security group in a peered VPC in the same Region, even in another account (account-id/sg-id); for a peer in another Region use its CIDR block."
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-security-groups.html#vpc-peering-security-groups
  - id: acl-within-subnet
    text: "Network ACL rules are evaluated when traffic enters or leaves a subnet, not for traffic routed within the same subnet."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: nacl-subnet-boundary
    text: "Network ACL rules are evaluated when traffic enters or leaves a subnet, not for traffic routed within the subnet."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html
  - id: sg-ingress-api
    text: "EC2 provides AuthorizeSecurityGroupIngress and RevokeSecurityGroupIngress to add and remove inbound security group rules."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/changing-security-group.html
  - id: rdp-trusted
    text: "AWS recommends limiting RDP security group access to specific trusted IP addresses or ranges."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html
  - id: default-sg-inbound
    text: "The default security group initially allows inbound traffic from resources associated with that same security group."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/default-security-group.html#default-security-group-default-rules
  - id: ftp-transfer-ports
    text: "For an AWS Transfer Family FTP server in a VPC, configure TCP port 21 for control and ports 8192 through 8200 for data."
    source: https://docs.aws.amazon.com/transfer/latest/userguide/create-server-in-vpc.html#create-server-in-vpc
cards:
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
    q: "How do Amazon VPC network ACL rules specify the remote network for inbound and outbound traffic?"
    a: "An inbound rule uses a source CIDR; an outbound rule uses a destination CIDR. Rules also match protocol and applicable ports, and cannot use security group IDs."
    facts: [cidr-sources]
  - id: vpc-046
    q: "Which inbound ports does a security group open for SSH to a Linux instance, RDP to a Windows instance, and HTTPS?"
    a: "TCP 22 for SSH, 3389 for RDP and 443 for HTTPS (80 for plain HTTP)."
    facts: [common-ports]
  - id: vpc-051
    q: "A new custom network ACL is associated with a subnet and all traffic stops. Why?"
    a: "A custom network ACL denies all inbound and outbound traffic until allow rules are added; only the default ACL allows everything."
    trap: true
    facts: [acl-defaults]
  - id: vpc-052
    q: "Can an inbound rule reference a security group in a peered VPC in another Region?"
    a: "No. Cross-account references work within the same Region; for an inter-Region peer, use the peer VPC CIDR block."
    trap: true
    facts: [peer-sg-reference]
  - id: vpc-061
    q: "Two instances in the same subnet cannot talk. Can the subnet network ACL be the cause?"
    a: "No. Network ACLs only filter traffic entering or leaving the subnet; check the security groups and the hosts."
    trap: true
    facts: [acl-within-subnet]
  - id: vpc-069
    q: "A network ACL denies TCP 5432, yet two instances in the same subnet still connect on that port. Why?"
    a: "Network ACLs filter traffic **entering or leaving the subnet**, not traffic within it. Use security groups to control instance-to-instance traffic in one subnet."
    trap: true
    facts: [nacl-subnet-boundary]
  - id: vpc-100
    q: "Amazon EC2 cluster members share one VPC security group. How can the group permit the required member-to-member port?"
    a: "Add an inbound rule for that protocol and port with the same security group as its source. Sharing a group alone does not grant all traffic."
    facts: [sg-reference]
  - id: vpc-101
    q: "Amazon EC2 instances in two VPC subnets exchange requests and responses. Which network ACL directions must allow the traffic?"
    a: "Source outbound and destination inbound for the request; destination outbound and source inbound for the response."
    facts: [acl-stateless]
  - id: vpc-112
    q: "Which Amazon EC2 API operations add and remove security group ingress rules?"
    a: "AuthorizeSecurityGroupIngress adds rules, and RevokeSecurityGroupIngress removes them."
    facts: [sg-ingress-api]
  - id: vpc-113
    q: "What source should an Amazon EC2 security group allow for RDP administration?"
    a: "The trusted administrator IP address or range."
    facts: [rdp-trusted]
  - id: vpc-114
    q: "What inbound traffic does a new Amazon VPC default security group allow?"
    a: "Traffic from resources associated with the same security group."
    facts: [default-sg-inbound]
  - id: vpc-115
    q: "Which TCP ports should a security group allow for an AWS Transfer Family FTP server control and data channels?"
    a: "Port 21 for control and ports 8192 through 8200 for data."
    facts: [ftp-transfer-ports]
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

ACL rules match protocol, applicable ports and a source CIDR inbound or destination CIDR outbound. They do not accept security group IDs. A custom ACL must be associated explicitly before its rules affect a subnet.

A group reference permits matching traffic involving interfaces in the referenced group, including its own group. It does not copy that group's rules. For example, a database can allow its application tier by referring to the application's group.

Before retiring an environment, preserve the replacement application's access and remove references to the retiring environment's group. Beanstalk can fail to delete an environment-managed security group while another group depends on it; a separately managed group avoids that lifecycle dependency.

### Exam cues

- If the question says automate security group ingress changes, think the EC2 ingress authorization and revoke APIs, because they add and remove inbound rules.
- If the question says allow RDP administration, think trusted administrator IP ranges, because broad inbound access exposes the service.
- If the question says a default security group permits traffic among its members, think the default inbound self-reference, because it allows traffic from resources in that group.
- If the question says configure FTP for AWS Transfer Family, think control and data channel rules, because the two channels use different ports.
- If the question says block an IP range for an entire subnet, think an early ACL deny rule, because security groups cannot express deny rules.
- If the question says inbound access works but replies fail, think the ACL return path, because responses need their own allow rule and the correct client ports.

### Remember
- AWS Transfer Family FTP uses TCP 21 for control and 8192 through 8200 for data.
- Between subnets, allow source outbound and destination inbound traffic, then both reverse directions for replies.
- Numbered ACL rules: 1 to 32766. The asterisk rule denies unmatched traffic.
- A new custom security group starts with no inbound rules and an allow-all outbound rule.

> **Trap:** An inbound allow rule on a stateless ACL does not permit the response automatically. Choose return-path ports for the actual client, whose ephemeral range can vary.
