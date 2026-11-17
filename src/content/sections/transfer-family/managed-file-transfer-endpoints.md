---
title: Managed file transfer endpoints
level: associate
order: 10
facts:
  - id: what
    text: AWS Transfer Family is a fully managed service for transferring files into and out of Amazon S3 or Amazon EFS over SFTP, FTPS, FTP, AS2 and web browser-based transfers.
    source: https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html#what-is-aws-transfer-family
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
cards:
  - id: transfer-family-001
    q: Dozens of vendors upload daily files with SFTP to an on-premises server that the company wants to retire. The files must land in Amazon S3, and vendors must not change their clients. Which service fits?
    a: "**AWS Transfer Family** with an SFTP endpoint backed by S3.\nFully managed, and vendors keep their SFTP clients."
    facts: [what, no-servers, use-cases]
  - id: transfer-family-002
    q: An AWS Transfer Family SFTP endpoint must be reachable from the internet only from a list of partner IP addresses. How?
    a: "Host the endpoint in a VPC, make it internet-facing with Elastic IP addresses, and allow only the partner addresses in its security group."
    facts: [vpc-endpoint]
  - id: transfer-family-003
    q: After each upload to an AWS Transfer Family server, files must be scanned, tagged and copied to another location automatically. Which feature fits?
    a: "Transfer Family managed workflows, which run processing steps after upload."
    facts: [workflows]
  - id: transfer-family-004
    q: Which storage services can AWS Transfer Family write to?
    a: "Amazon S3 and Amazon EFS."
    facts: [what]
  - id: transfer-family-005
    q: Which protocols does AWS Transfer Family support?
    a: "SFTP, FTPS, FTP and AS2, plus browser-based web apps."
    facts: [what]
  - id: transfer-family-007
    q: Each vendor using an AWS Transfer Family SFTP server must see only its own prefix in a shared S3 bucket. What limits that?
    a: "The user's IAM user role plus a session policy scoped to the user's home folder."
    facts: [user-role]
  - id: transfer-family-006
    q: Is an AWS Transfer Family server a single point of failure in one Availability Zone?
    a: "No. It supports up to 3 Availability Zones on an auto scaling, redundant fleet."
    trap: true
    facts: [multi-az]
---
AWS Transfer Family replaces self-managed SFTP and FTP servers. Partners connect with the same clients as before; files go straight into Amazon S3 or Amazon EFS, where the rest of AWS can process them. [What is AWS Transfer Family?](https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html)

### How it works

1. Create a server with the protocols you need (SFTP, FTPS, FTP, AS2) and choose S3 or EFS as storage.
2. Choose the endpoint: public, VPC-only, or VPC internet-facing with Elastic IP addresses and security groups.
3. Give each user an IAM user role, and a session policy that limits them to their home folder.
4. Optionally attach a managed workflow that processes each uploaded file.

### Exam cues

- If the question says partners or vendors use SFTP, FTPS or AS2 and the data should land in S3, think AWS Transfer Family.
- If the question says allow only known partner IP addresses, think a VPC endpoint with Elastic IP addresses and a security group.
- If the question says process each file right after upload with no servers, think a managed workflow (or S3 event notifications).

### Remember

- Protocols: SFTP, FTPS, FTP, AS2, browser web apps. Storage: S3 or EFS.
- Fully managed, up to 3 Availability Zones.
- A user role per user; a session policy can lock a user to their home folder.

> **Trap:** Running SFTP on an EC2 instance works but adds servers to patch and scale. When the question stresses fully managed or least operational overhead, the answer is Transfer Family.
