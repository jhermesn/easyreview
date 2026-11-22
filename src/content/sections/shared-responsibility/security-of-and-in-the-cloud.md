---
title: Security of and in the cloud
level: foundational
order: 10
facts:
  - id: shared
    text: Security and compliance are a shared responsibility between AWS and the customer, commonly described as security of the cloud versus security in the cloud.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: aws-part
    text: AWS operates, manages and controls the components from the host operating system and virtualization layer down to the physical security of the facilities where the service runs.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: of-cloud
    text: Security of the cloud means AWS protects the infrastructure that runs AWS services; third-party auditors regularly test and verify the effectiveness of this security.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html#lambda-security
  - id: in-cloud
    text: Security in the cloud is the customer's part; it is determined by the services used, and also depends on the sensitivity of the data, the company's requirements and applicable laws and regulations.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html#lambda-security
  - id: ec2
    text: For Amazon EC2, an IaaS service, the customer manages the guest operating system including updates and security patches, any software installed on the instances, and the security group firewall configuration.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: abstracted
    text: For abstracted services such as Amazon S3 and Amazon DynamoDB, AWS operates the infrastructure layer, the operating system and the platform; customers manage their data including encryption options, classify their assets and use IAM to apply permissions.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: rds-patching
    text: Amazon RDS automatically schedules required operating system and database patching for patches related to security and instance reliability.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html#USER_UpgradeDBInstance.Maintenance.Overview.offline
  - id: lambda-runtime
    text: For Lambda functions on managed runtimes, Lambda applies runtime security updates automatically by default, taking on the burden of patching the runtime.
    source: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html#runtimes-update
  - id: inherited
    text: Inherited controls are fully inherited from AWS, such as physical and environmental controls.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: shared-controls
    text: "Shared controls apply to both AWS and customer layers in separate contexts: patch management, configuration management, and awareness and training."
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: customer-specific
    text: Customer-specific controls are solely the customer's responsibility, based on the applications they deploy in AWS services.
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: global-infra
    text: "AWS is responsible for the global infrastructure that runs AWS services: the Regions, Availability Zones and edge locations."
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: pentest
    text: Customers may run security assessments and penetration tests on their own resources for permitted services without prior AWS approval; DoS and DDoS tests are prohibited outside AWS's simulated DDoS testing policy.
    source: https://aws.amazon.com/security/penetration-testing/
  - id: zone-security
    text: "AWS gives service and communications protection, or zone security, as an example of a customer-specific control: the customer may need to route or zone data within specific security environments."
    source: https://aws.amazon.com/compliance/shared-responsibility-model/
  - id: media-destruction
    text: "When a storage device that held customer data reaches the end of its life, AWS decommissions it with a documented media destruction process, as part of security of the cloud."
    source: https://aws.amazon.com/compliance/data-center/controls/
  - id: pentest-c2
    text: "AWS requires prior approval for security testing that includes command and control."
    source: https://aws.amazon.com/security/penetration-testing/
  - id: pentest-databases
    text: "AWS lists Amazon RDS and Aurora as permitted services for assessments of customer resources without prior approval, subject to its testing policy."
    source: https://aws.amazon.com/security/penetration-testing/
  - id: pentest-unlisted
    text: Amazon S3, IAM and AWS STS are absent from the AWS permitted services list for security assessments without prior approval.
    source: https://aws.amazon.com/security/penetration-testing/
cards:
  - id: shared-responsibility-017
    q: "Are Amazon S3, IAM and AWS STS on the AWS list of services permitted for security assessments without prior approval?"
    a: "No. Consult AWS Support or your account representative about testing services outside the permitted list."
    facts: [pentest-unlisted, pentest]
  - id: shared-responsibility-001
    q: In the AWS shared responsibility model, what does "security of the cloud" versus "security in the cloud" mean?
    a: "- Of the cloud: AWS protects the infrastructure that runs AWS services, from the facilities to the host OS and virtualization layer\n- In the cloud: the customer secures what it puts and configures there"
    facts: [shared, aws-part, of-cloud, in-cloud]
  - id: shared-responsibility-002
    q: A company runs an application on Amazon EC2. Who patches the instance's guest operating system?
    a: The customer. EC2 is IaaS, so the customer manages the guest OS, installed software and security groups.
    facts: [ec2]
  - id: shared-responsibility-003
    q: A company stores files in Amazon S3. What remains the company's responsibility under the AWS shared responsibility model?
    a: Its data, including encryption options, classifying its assets, and IAM permissions. AWS runs the infrastructure, OS and platform.
    facts: [abstracted]
  - id: shared-responsibility-004
    q: Who patches the database engine and operating system of an Amazon RDS DB instance?
    a: AWS. Amazon RDS schedules required OS and database patching for security and reliability.
    facts: [rds-patching]
  - id: shared-responsibility-005
    q: Who updates the managed runtime of an AWS Lambda function with security patches?
    a: AWS. Lambda applies managed runtime updates automatically by default. The customer still owns its function code and permissions.
    facts: [lambda-runtime]
  - id: shared-responsibility-006
    q: Which AWS shared responsibility control type is fully inherited from AWS?
    a: Inherited controls, such as physical and environmental controls.
    facts: [inherited]
  - id: shared-responsibility-007
    q: Name the three shared control examples in the AWS shared responsibility model.
    a: "- Patch management: AWS patches the infrastructure, the customer patches its guest OS and applications\n- Configuration management: AWS configures its devices, the customer its OS, databases and applications\n- Awareness and training: each trains its own employees"
    facts: [shared-controls]
  - id: shared-responsibility-008
    q: Who is responsible for the physical security of AWS data centers?
    a: AWS. Physical security is part of security of the cloud.
    facts: [aws-part, inherited]
  - id: shared-responsibility-009
    q: Who configures the security group rules for an Amazon EC2 instance?
    a: The customer. Configuring the AWS-provided firewall is part of security in the cloud.
    facts: [ec2]
  - id: shared-responsibility-010
    q: Does moving from Amazon EC2 to a managed service such as Amazon RDS remove all of the customer's security responsibilities?
    a: No. AWS takes on the OS and engine patching, but the customer still controls data, access, network settings and encryption choices.
    trap: true
    facts: [rds-patching, in-cloud, abstracted]
  - id: shared-responsibility-011
    q: Under the AWS shared responsibility model, who is responsible for the Regions, Availability Zones and edge locations?
    a: AWS, as part of security of the cloud.
    facts: [global-infra]
  - id: shared-responsibility-012
    q: Under the AWS shared responsibility model, who secures the physical facilities that run AWS services?
    a: AWS is responsible for physical security of its facilities as part of security of the cloud.
    facts: [aws-part, of-cloud]
  - id: shared-responsibility-013
    q: "Which control is solely the customer responsibility: patch management, awareness and training, or service and communications protection (zone security)?"
    a: "Service and communications protection, also called zone security, which is customer-specific. Patch management and awareness and training are shared controls."
    trap: true
    facts: [zone-security, customer-specific]
  - id: shared-responsibility-014
    q: "What happens to an AWS storage device that held customer data when it reaches end of life?"
    a: "AWS decommissions it with its media destruction process. Disposing of physical media is part of AWS security of the cloud."
    facts: [media-destruction]
  - id: shared-responsibility-015
    q: "When does AWS require prior approval for security testing that includes command and control?"
    a: "Before conducting the test. The AWS penetration testing policy requires prior approval."
    facts: [pentest-c2]
  - id: shared-responsibility-016
    q: "Can customers assess their own Amazon RDS and Aurora resources without prior AWS approval?"
    a: "Yes, subject to the AWS penetration testing policy and its conditions."
    facts: [pentest-databases]
---
AWS and the customer share security and compliance. AWS secures the cloud itself: facilities, hardware, network, and the host software that runs the services. The customer secures what it builds in the cloud. The customer's part grows or shrinks with the services it chooses.

### How it works

1. **Security of the cloud (AWS):** physical security of data centers, hardware, networking, and the host operating system and virtualization layer.
2. **Security in the cloud (customer):** data, identity and access, and the configuration of whatever the customer controls.
3. **The line moves with the service.** The more AWS manages, the less the customer has to configure and patch.

| Service | AWS manages | Customer manages |
|---|---|---|
| Amazon EC2 (IaaS) | Infrastructure up to the hypervisor | Guest OS and patches, installed software, security groups, data |
| Amazon RDS | Infrastructure, OS and database engine patching | Data, access, network settings, encryption choices |
| AWS Lambda | Infrastructure, OS and managed runtime updates | Function code, permissions, data |
| Amazon S3, Amazon DynamoDB | Infrastructure, OS and platform | Data and encryption options, classification, IAM permissions |

IT controls are split the same way:

- **Inherited:** fully from AWS, such as physical and environmental controls.
- **Shared:** both sides in their own layer. Examples are patch management, configuration management, and awareness and training.
- **Customer-specific:** only the customer, based on what it deploys.

### Exam cues

- If the question says assess S3, IAM or STS, think the AWS permitted services list, because these services are not listed for testing without prior approval.
- If the question says assess owned RDS or Aurora resources, think the AWS permitted services list, because both appear on it subject to the testing policy.
- If the question says a security test includes command and control, think prior AWS approval, because the testing policy requires it.
- If the question says data center, hardware or physical security, think AWS.
- If the question says guest OS patches on Amazon EC2, security groups or IAM users, think customer.
- If the question says patching on Amazon RDS or AWS Lambda, think AWS.
- If the question says customer data and who can access it, think customer, for every service.

### Remember

- AWS: host OS, virtualization layer and everything below.
- Customer: data, identity, and configuration, on every service.
- Shared controls: patch management, configuration management, awareness and training.

> **Trap:** Encrypting data is the customer's decision even on managed services. AWS provides the encryption options; the customer chooses to use them.
