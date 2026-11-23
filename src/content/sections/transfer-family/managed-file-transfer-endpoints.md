---
title: Managed file transfer endpoints
level: associate
order: 10
facts:
  - id: no-servers
    text: With Transfer Family you get a protocol-enabled server endpoint without running any server infrastructure, and end users keep their existing clients and configurations.
    source: https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html#what-is-aws-transfer-family
  - id: use-cases
    text: Common Transfer Family uses are uploads from vendors and partners into an S3 data lake, data distribution to customers, and AS2 business-to-business exchanges with compliance requirements.
    source: https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html#what-is-aws-transfer-family
  - id: multi-az
    text: Transfer Family supports up to 3 Availability Zones and runs on an auto scaling, redundant fleet.
    source: https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html#how-aws-transfer-works
  - id: workflows
    text: Transfer Family managed workflows automate processing steps such as copying, tagging, scanning and filtering on files after they are uploaded.
    source: https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html#how-aws-transfer-works
  - id: vpc-endpoint
    text: A Transfer Family server endpoint can live in a VPC, reachable only from inside it, or be internet-facing by attaching Elastic IP addresses, with security groups limiting which source addresses can connect.
    source: https://docs.aws.amazon.com/transfer/latest/userguide/create-server-in-vpc.html#create-server-in-vpc
  - id: user-role
    text: Each service-managed Transfer Family user gets a user role that Transfer Family assumes for that user, and a session policy can limit the user to their own home folder.
    source: https://docs.aws.amazon.com/transfer/latest/userguide/requirements-roles.html#requirements-roles
  - id: identity-providers
    text: "Transfer Family servers authenticate users as service-managed users, through AWS Directory Service for Microsoft Active Directory, or through a custom identity provider reached with Lambda or an API Gateway method."
    source: https://docs.aws.amazon.com/transfer/latest/userguide/create-server-sftp.html#create-server-sftp
cards:
  - id: transfer-family-001
    q: Must vendors replace their existing SFTP clients when a company moves its file transfer endpoint to AWS Transfer Family?
    a: "No. Vendors can keep their existing clients and configurations with a Transfer Family protocol-enabled endpoint."
    facts: [no-servers]
  - id: transfer-family-002
    q: An AWS Transfer Family SFTP endpoint must be reachable from the internet only from a list of partner IP addresses. How?
    a: "Host the endpoint in a VPC, make it internet-facing with Elastic IP addresses, and allow only the partner addresses in its security group."
    facts: [vpc-endpoint]
  - id: transfer-family-003
    q: After each upload to an AWS Transfer Family server, files must be scanned, tagged and copied to another location automatically. Which feature fits?
    a: "Transfer Family managed workflows, which run processing steps after upload."
    facts: [workflows]
  - id: transfer-family-007
    q: Each vendor using an AWS Transfer Family SFTP server must see only its own prefix in a shared S3 bucket. What limits that?
    a: "The user's IAM user role plus a session policy scoped to the user's home folder."
    facts: [user-role]
  - id: transfer-family-006
    q: Is an AWS Transfer Family server a single point of failure in one Availability Zone?
    a: "No. It supports up to 3 Availability Zones on an auto scaling, redundant fleet."
    trap: true
    facts: [multi-az]
  - id: transfer-family-008
    q: "An SFTP endpoint on Transfer Family must authenticate partners against an existing Okta or LDAP directory. How?"
    a: "Use a custom identity provider: a Lambda function, or an API Gateway method backed by Lambda, that checks the credentials."
    facts: [identity-providers]
revised:
  - date: 2026-11-23
    note: The vendor transfer card now tests existing client compatibility.
    cards: [transfer-family-001]
---
AWS Transfer Family endpoints build on managed file transfers with endpoint networking, user access controls and workflows.

### How it works

1. Choose the endpoint: public, VPC-only, or VPC internet-facing with Elastic IP addresses and security groups.
2. Give each user an IAM user role, and a session policy that limits them to their home folder.
3. Optionally attach a managed workflow that processes each uploaded file.

### Exam cues

- If the question says allow only known partner IP addresses, think a VPC endpoint with Elastic IP addresses and a security group.
- If the question says process each file right after upload with no servers, think a managed workflow (or S3 event notifications).

### Remember

- Up to 3 Availability Zones.
- A user role per user; a session policy can lock a user to their home folder.

> **Trap:** To limit a user to a home folder, use a session policy with the user's role.
