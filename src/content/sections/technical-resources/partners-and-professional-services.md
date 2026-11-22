---
title: Partners and Professional Services
level: foundational
order: 20
facts:
  - id: apn
    text: The AWS Partner Network (APN) is a global community of organizations that use AWS technologies, programs, funding and tools to build solutions and services for customers.
    source: https://aws.amazon.com/partners/
  - id: partner-types
    text: Independent software vendors (ISVs), data providers and consulting partners can showcase and sell their solutions to AWS customers, including through AWS Marketplace.
    source: https://aws.amazon.com/partners/
  - id: partner-benefits
    text: AWS Partners use partner programs to differentiate, build AWS expertise through certifications, and access programs, incentives, funding and tools to grow.
    source: https://aws.amazon.com/partners/
  - id: partner-central
    text: AWS Partner Central, in the AWS Management Console, is where AWS Partners manage their engagement with AWS and unlock APN benefits.
    source: https://docs.aws.amazon.com/partner-central/latest/getting-started/what-is-partner-central.html#what-is-partner-central
  - id: proserve
    text: AWS Professional Services helps organizations design, build, migrate and manage their AWS workloads with industry expertise and proven frameworks.
    source: https://aws.amazon.com/professional-services/
  - id: solutions-architects
    text: The AWS Well-Architected best practices were developed by AWS Solutions Architects based on years of experience building solutions across many businesses.
    source: https://docs.aws.amazon.com/wellarchitected/latest/userguide/tool.html#tool
  - id: tam
    text: Enterprise Support and Unified Operations include a designated Technical Account Manager (TAM).
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: solutions-library
    text: The AWS Solutions Library collects vetted solutions built by AWS and AWS Partners; the former AWS Quick Starts page now leads there.
    source: https://aws.amazon.com/solutions/
  - id: ams
    text: "AWS Managed Services (AMS) is an enterprise service in which AWS operates a customer's infrastructure, automating change requests, monitoring, patch management, security and backup, 24 hours a day, every day of the year."
    source: https://docs.aws.amazon.com/managedservices/latest/userguide/what-is-ams.html#what-is-ams
  - id: ams-advanced-end
    text: "AMS Advanced stopped accepting new customers on June 30, 2026 and reaches end of support on June 30, 2027; alternatives include AMS Accelerate, the Unified Operations support plan and AWS Partner managed services."
    source: https://docs.aws.amazon.com/managedservices/latest/userguide/SunsetPlan.html#SunsetPlan
  - id: partner-paths
    text: "AWS Partner Paths replaced the former technology and consulting partner types with paths based on offerings."
    source: https://aws.amazon.com/blogs/aws/aws-partner-network-apn-10-years-and-going-strong/
  - id: software-services-paths
    text: "The AWS Software Path is for organizations developing software that runs on or integrates with AWS; the Services Path covers consulting and other services."
    source: https://aws.amazon.com/partners/smb-partner-solutions/
  - id: consulting-services
    text: "AWS Managed Service Provider partners provide consulting services across cloud planning, design, building, migration and operations."
    source: https://aws.amazon.com/blogs/apn/the-journey-to-aws-msp-an-auditors-advice-for-partners/
cards:
  - id: technical-resources-006
    q: What is the AWS Partner Network (APN)?
    a: A global community of organizations, such as consulting partners and software vendors, that use AWS programs, funding and tools to build solutions for AWS customers.
    facts: [apn]
  - id: technical-resources-007
    q: A company needs an outside firm to design and run its migration to AWS. Which two sources of help does AWS offer?
    a: AWS Professional Services, and consulting partners (system integrators) in the AWS Partner Network.
    facts: [proserve, partner-types]
  - id: technical-resources-008
    q: A software company wants to sell its product to AWS customers through AWS. What does it join, and where does it list the product?
    a: It joins the AWS Partner Network as an independent software vendor and lists the product in AWS Marketplace.
    facts: [partner-types, apn]
  - id: technical-resources-009
    q: Which benefits does a company get from becoming an AWS Partner?
    a: Access to partner programs, AWS training and certifications, incentives, funding and tools, and a way to reach AWS customers through AWS Marketplace.
    facts: [partner-benefits, partner-types]
  - id: technical-resources-010
    q: Which AWS Support plans give a customer a designated Technical Account Manager?
    a: AWS Enterprise Support and AWS Unified Operations.
    facts: [tam]
  - id: technical-resources-011
    q: Is AWS Professional Services the same as AWS Support?
    a: No. AWS Support answers cases under a support plan; AWS Professional Services runs project engagements to design, build and migrate workloads.
    trap: true
    facts: [proserve]
  - id: technical-resources-017
    q: Where does a company find vetted, ready-made solutions built by AWS and AWS Partners, the successor of AWS Quick Starts?
    a: The AWS Solutions Library.
    facts: [solutions-library]
  - id: technical-resources-018
    q: "Where do AWS Partners manage their relationship with AWS and unlock their AWS Partner Network benefits?"
    a: "In AWS Partner Central, in the AWS Management Console."
    facts: [partner-central]
  - id: technical-resources-019
    q: "Which AWS team can help a company design and migrate its AWS workloads?"
    a: "AWS Professional Services helps organizations design, build, migrate and manage AWS workloads."
    facts: [proserve]
  - id: technical-resources-020
    q: "What replaced the former AWS technology and consulting partner types?"
    a: "AWS Partner Paths, based on partner offerings."
    facts: [partner-paths]
  - id: technical-resources-021
    q: "Which AWS Partner Paths fit software developers and consulting providers?"
    a: "Software Path for software that runs on or integrates with AWS; Services Path for consulting and other services."
    facts: [software-services-paths]
---
When a customer needs more than documentation and support cases, AWS offers people. AWS Professional Services and AWS solutions architects come from AWS itself; AWS Partner Network members are outside companies.

### How it works

1. **AWS Professional Services** works on projects to design, build, migrate and manage workloads.
2. **AWS solutions architects** share architecture expertise; their experience shaped the Well-Architected best practices.
3. **AWS Partner Network (APN)** members include consulting partners and system integrators that deliver projects, and independent software vendors (ISVs) that sell software, often through AWS Marketplace.
4. **Technical Account Managers** come with Enterprise Support and Unified Operations.
5. **AWS Managed Services (AMS)** has AWS operate a customer's infrastructure: change requests, monitoring, patching, security and backup. AMS Advanced closed to new customers on June 30, 2026 and ends on June 30, 2027.
6. Partners manage their AWS relationship in AWS Partner Central and get programs, certifications, incentives and funding.

| Help | From | Typical use |
|---|---|---|
| AWS Professional Services | AWS | Large migrations and transformations |
| Solutions architects | AWS | Architecture guidance |
| Consulting partners, system integrators | APN members | Projects, managed services |
| Independent software vendors | APN members | Software, often in AWS Marketplace |
| Technical Account Manager | AWS, with Enterprise Support or higher | Ongoing proactive guidance |
| AWS Managed Services | AWS | AWS runs day-to-day infrastructure operations |

### Exam cues

- If the question says an outside organization should help design and migrate AWS workloads, think an AWS consulting partner, because partners offer those services.
- If the question says a partner develops software for AWS, think Software Path; for consulting services, think Services Path.
- If the question says identify the current AWS partner model, think Partner Paths, because they replaced the former partner types.
- If the question says third-party company to help migrate, think an AWS Partner (consulting partner or system integrator).
- If the question says AWS experts on a project, think AWS Professional Services.
- If the question says software company selling on AWS, think ISV in the APN and AWS Marketplace.
- If the question says AWS should operate the infrastructure for the company, think AWS Managed Services (AMS).

### Remember

- APN: consulting partners, ISVs, data providers.
- Partners build expertise through AWS certifications.
- TAM: Enterprise Support or Unified Operations.

> **Trap:** An AWS Partner is not part of AWS. Partners are independent companies; AWS Professional Services is AWS's own team.
