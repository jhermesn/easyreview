---
title: Defense in depth and audit architecture
level: professional
order: 30
facts:
  - id: org-trail
    text: An organization trail logs selected events for the management and member accounts and is managed by the
      management account or a CloudTrail delegated administrator.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: member-trails
    text: Member users cannot alter an organization trail but can create and manage their own trails with
      appropriate permissions.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: archive
    text: AWS SRA recommends central S3 logging in a dedicated log archive account with tightly controlled access
      and protection against modification or deletion.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/log-archive.html#log-archive
  - id: kms-logs
    text: For SSE-KMS encrypted archive logs, reading requires both S3 read access and KMS decryption
      authorization.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/log-archive.html#log-archive
  - id: validation
    text: CloudTrail integrity validation delivers signed digest files; enabling it does not itself validate
      existing log files or prevent deletion.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html
  - id: management-exception
    text: SCPs do not restrict the management account.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
  - id: waf
    text: WAF filters HTTP and HTTPS requests at supported resources such as CloudFront, ALB, and API Gateway REST
      APIs.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html#what-is-aws-waf
  - id: sg
    text: "Security groups control resource traffic and are stateful: response traffic for allowed requests is
      automatically allowed."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
  - id: sg-allow
    text: Security group rules allow traffic and cannot specify deny rules.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rules
  - id: nacl
    text: Network ACLs filter subnet traffic with numbered allow and deny rules, evaluated from the lowest number,
      and are stateless.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#vpc-network-acls
  - id: firewall
    text: Network Firewall inspects VPC traffic routed through firewall endpoints and supports Suricata-compatible
      intrusion prevention and domain filtering.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html
  - id: firewall-subnets
    text: Reserve Network Firewall endpoint subnets for the firewall; endpoints cannot filter traffic to or from
      their own subnet.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-subnets.html#vpc-config-subnets
  - id: tls
    text: ACM manages SSL/TLS certificates used to protect application connections.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
  - id: shield
    text: Shield Advanced provides distributed denial-of-service protection, and Firewall Manager manages
      protections across accounts and resources.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html#what-is-aws-waf
  - id: flows
    text: VPC Flow Logs record information about IP traffic at network interfaces outside the traffic path.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs
  - id: guardduty
    text: GuardDuty analyzes AWS data sources and logs for suspicious and malicious activity.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty
  - id: inspector
    text: Inspector scans supported workloads for software vulnerabilities and unintended network exposure.
    source: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html#what-is-inspector
  - id: macie
    text: Macie identifies sensitive S3 data and risks such as publicly accessible buckets.
    source: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#what-is-macie
  - id: detective
    text: Detective helps investigate security findings and identify the root cause of suspicious activity.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: config
    text: Control Tower detective controls use AWS Config rules to detect noncompliant resources.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: rollout
    text: Service-managed StackSets deploy common resources across organization accounts and selected Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: hub-central
    text: Security Hub CSPM central configuration uses policies to enable services, standards, and controls across
      selected organization accounts and Regions.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
  - id: hub-regions
    text: Security Hub CSPM cross-Region aggregation collects findings, compliance statuses, and security scores
      from linked Regions into one home Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation
  - id: config-recording
    text: Security Hub CSPM without Security Hub requires manually configured AWS Config recording for resources
      assessed by its controls.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#securityhub-setup-prereqs
  - id: automatic-recorder
    text: When both Security Hub and Security Hub CSPM are enabled, CSPM automatically creates a service-linked
      configuration recorder.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#securityhub-setup-prereqs
  - id: baseline-deny
    text: An SCP can deny member-account changes to the CloudTrail audit configuration.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_basic.html#orgs_tutorials_basic
  - id: stateful-definition
    text: A stateful security group permits response traffic for an allowed connection.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
cards:
  - id: multi-account-strategy-001
    q: AWS member-account administrators need their own CloudTrail trails while a central audit baseline remains
      protected. What design works?
    a: Use an organization trail delivering to a separately controlled log archive. Member administrators cannot
      alter the organization trail and can manage their own trails if authorized. Protect S3 and KMS access
      separately.
    facts:
      - org-trail
      - member-trails
      - archive
      - kms-logs
    trap: true
  - id: multi-account-strategy-002
    q: A security team needs central AWS audit logs that workload-account administrators cannot read by default.
      What design should it use?
    a: An organization trail delivering into a dedicated log archive account. Restrict S3 access and KMS
      decryption separately; account administration in a workload account does not grant access to that
      archive.
    facts:
      - org-trail
      - archive
      - kms-logs
  - id: multi-account-strategy-003
    q: Does AWS WAF replace security groups and network ACLs for an application?
    a: No. WAF filters HTTP(S) requests at supported application resources; security groups control resource
      traffic and network ACLs control subnet traffic.
    facts:
      - waf
      - sg
      - nacl
    trap: true
  - id: multi-account-strategy-004
    q: An AWS web application needs layered prevention and security visibility. Which controls should the team
      combine?
    a: Use WAF for web requests, Shield for DDoS protection, ACM for TLS certificates, security groups and network
      ACLs for network access, and routed Network Firewall inspection where needed. Add CloudTrail, Flow Logs,
      Config, and security findings for audit and detection.
    facts:
      - waf
      - shield
      - tls
      - sg
      - nacl
      - firewall
      - org-trail
      - flows
      - config
      - guardduty
  - id: multi-account-strategy-005
    q: An AWS organization trail appears in a member account. Can its local administrator stop central logging
      while retaining a separate local trail?
    a: No. The member cannot change the organization trail. With permission, it can manage a separate local trail.
    facts:
      - member-trails
    trap: true
  - id: multi-account-strategy-006
    q: How can an AWS security team coordinate baseline resources and security settings across accounts?
    a: Deploy common resources with service-managed StackSets. Use service-specific delegated administration and
      Security Hub CSPM central configuration policies for supported security settings.
    facts:
      - rollout
      - hub-central
  - id: multi-account-strategy-007
    q: An AWS workload needs HTTP request filtering and VPC egress inspection. How do WAF and Network Firewall
      differ?
    a: WAF filters HTTP(S) at supported application resources. Network Firewall inspects traffic routed through
      firewall endpoints, with Suricata-compatible intrusion prevention and domain filtering. Reserve endpoint
      subnets for the firewall.
    facts:
      - waf
      - firewall
      - firewall-subnets
  - id: multi-account-strategy-008
    q: A security team needs one view of AWS compliance findings and security scores across accounts and Regions.
      What should it configure?
    a: Configure Security Hub CSPM delegated administration, central configuration, and cross-Region aggregation
      into a home Region. Configure the required source services. CSPM alone needs Config recording configured
      manually; enabling Security Hub with CSPM creates its service-linked recorder automatically.
    facts:
      - hub-central
      - hub-regions
      - config-recording
      - automatic-recorder
  - id: multi-account-strategy-020
    q: CloudTrail log file integrity validation is enabled. Does that prevent an authorized S3 user from deleting
      logs?
    a: No. It delivers signed digest files for later validation. Restrict storage access and protect the archive
      separately.
    facts:
      - validation
      - archive
    trap: true
  - id: multi-account-strategy-021
    q: Which AWS services distinguish threat detection, vulnerability scanning, sensitive-data discovery, and
      investigation?
    a: GuardDuty detects suspicious activity; Inspector scans vulnerabilities; Macie discovers sensitive S3 data
      and bucket risks; Detective supports investigation.
    facts:
      - guardduty
      - inspector
      - macie
      - detective
diagrams:
  - id: central-audit-path
    title: Organization audit logs in a separate account
    width: 1000
    height: 210
    nodes:
      - id: accounts
        label: AWS accounts
        icon: organizations
        info: The trail logs selected activity across management and member accounts.
        x: 30
        y: 60
        w: 190
        h: 86
        tone: mgmt
      - id: trail
        label: Organization trail
        icon: cloudtrail
        info: Managed centrally; members cannot change it.
        x: 280
        y: 60
        w: 190
        h: 86
        tone: mgmt
      - id: archive
        label: Log archive S3
        icon: simple-storage-service
        info: A separate log archive account restricts access to stored evidence.
        x: 530
        y: 60
        w: 190
        h: 86
        tone: storage
      - id: audit
        label: Authorized audit
        icon: res-organizations-account
        info: Reading SSE-KMS logs requires S3 and KMS authorization.
        x: 780
        y: 60
        w: 190
        h: 86
        tone: mgmt
    edges:
      - from: accounts
        to: trail
        step: 1
      - from: trail
        to: archive
        step: 2
      - from: archive
        to: audit
        step: 3
    steps:
      - CloudTrail records selected organization activity.
      - CloudTrail delivers logs to the separate log archive.
      - Authorized audit access reads the protected evidence.
---
Defense in depth combines controls at several boundaries with independent audit evidence. A log archive account separates evidence storage from the workload administrators whose activity is being recorded.

### How it works

1. Create an organization trail for the events you need across management and member accounts. Only the management account or a CloudTrail delegated administrator manages it; member accounts can still maintain separate authorized trails.
2. Deliver logs into a dedicated log archive account. Limit S3 reads and changes, and separately control KMS decryption for encrypted logs. An SCP can also deny member-account changes to the audit configuration.
3. Enable log file integrity validation to receive signed digest files, records of log-file hashes used to detect later changes. Run validation when assessing integrity; storage permissions protect against deletion.
4. Combine preventive controls according to the traffic boundary.

   | Control | What it protects |
   |---|---|
   | WAF | HTTP and HTTPS at supported application resources |
   | Shield Advanced | Distributed denial-of-service (DDoS) attacks, attempts to overwhelm availability |
   | ACM | Application connections using TLS, the protocol that encrypts transport |
   | Security group | Resource traffic with stateful allow rules |
   | Network ACL | Subnet traffic with stateless numbered allow and deny rules |
   | Network Firewall | Traffic routed through inspection endpoints |
   | Firewall Manager | Consistent protections across accounts and resources |

   Stateful rules remember allowed connections and permit response traffic. Stateless rules evaluate each direction separately. Keep Network Firewall endpoints in reserved subnets and route inspected traffic through them.
5. Collect complementary evidence and findings, reports of security issues.

   | Service | Role |
   |---|---|
   | CloudTrail | Account API activity selected by the trail |
   | VPC Flow Logs | IP traffic information at network interfaces |
   | Config rules | Resource compliance evaluation |
   | GuardDuty | Suspicious activity detection |
   | Inspector | Software vulnerability and network exposure scanning |
   | Macie | Sensitive S3 data discovery and bucket risks |
   | Detective | Investigation and root-cause analysis |
   | Security Hub CSPM | Central configuration and aggregated findings and compliance |

6. Deploy baseline resources with service-managed StackSets. Configure Security Hub CSPM through its delegated administrator, using central configuration and linked Regions for a consolidated view. CSPM alone requires Config recording to be configured manually; with Security Hub also enabled, CSPM creates its service-linked recorder automatically.

### Exam cues

- If the question says local administrators need their own trails without altering central audit, think organization trail plus a separate log archive, because members cannot change the organization trail.
- If the question says one compliance view across Regions, think Security Hub CSPM cross-Region aggregation, because it brings linked-Region findings and scores into the home Region.
- If the question says web filtering plus egress inspection, think WAF and routed Network Firewall, because the services inspect different traffic boundaries.

### Remember

- An organization trail and its destination bucket have separate access controls.
- SCPs do not restrict the management account.
- Security groups allow; network ACLs allow and deny in rule-number order.
- Validation detects evidence changes; archive protections restrict who can make them.

> **Trap:** Enabling CloudTrail integrity validation produces digests. It neither performs the later validation automatically nor prevents deletion of S3 objects.
