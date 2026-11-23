---
title: Support plans
level: foundational
order: 10
facts:
  - id: plans
    text: "AWS offers four Support plans: Basic, AWS Business Support+, AWS Enterprise Support and AWS Unified Operations."
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#aws-support-plans
  - id: retired
    text: Developer Support, Business Support and Enterprise On-Ramp are discontinued on January 1, 2027; they remain available in the AWS GovCloud (US) Region.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#aws-support-plans
  - id: basic
    text: Basic Support, included for all customers, gives 24x7 access to one-on-one responses to account and billing questions, support forums, service health checks, and documentation, technical papers and best practice guides.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: basic-no-technical
    text: With Basic Support you can't create a technical support case; account and billing cases and service limit increase requests are available to all customers.
    source: https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#case-management
  - id: business-plus
    text: AWS Business Support+ adds generative AI responses, 24x7 phone, web and chat access to Cloud Support Engineers, under 30 minutes for business-critical system down cases, more than 500 Trusted Advisor checks, the AWS Support API and third-party software support.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: business-plus-price
    text: Business Support+ starts at a minimum of 29 USD per month per account.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#aws-support-plans
  - id: enterprise
    text: AWS Enterprise Support adds a designated Technical Account Manager (TAM), under 15-minute response for business-critical system down cases, AWS Security Incident Response, strategic business reviews and AWS Countdown event management.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: enterprise-price
    text: The Enterprise Support minimum is 5,000 USD, reduced from 15,000 USD.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#aws-support-plans
  - id: unified-operations
    text: AWS Unified Operations adds a designated TAM and Domain Specialist Engineer, application architecture guidance, infrastructure event management, AWS Countdown Premium, and critical workload reviews with personalized runbooks.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: no-contracts
    text: The paid plans offer technical support cases with pay-by-the-month pricing and no long-term contracts.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: third-party
    text: Business Support+ includes third-party software support, and Enterprise Support includes all Business Support+ benefits.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: support-api-plans
    text: "The AWS Support API requires Business Support+, Enterprise Support or Unified Operations; Basic Support has no API access."
    source: https://docs.aws.amazon.com/awssupport/latest/user/about-support-api.html#about-support-api
  - id: basic-ta-checks
    text: "With Basic Support, Trusted Advisor gives all Service limits checks plus a small set of Security and Fault Tolerance checks; the full set needs a higher plan."
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html#trusted-advisor-check-reference
  - id: unlimited-cases
    text: "AWS Business Support+ permits an unlimited number of support cases."
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: unified-price
    text: "AWS Unified Operations has a 50,000 USD monthly minimum, compared with 5,000 USD for AWS Enterprise Support."
    source: https://aws.amazon.com/premiumsupport/pricing/
  - id: architecture-guidance
    text: Business Support+ offers architectural guidance from AWS support engineers.
    source: https://aws.amazon.com/premiumsupport/plans/business-plus/
  - id: enterprise-architecture
    text: Enterprise Support includes consultative architectural guidance tailored to applications.
    source: https://aws.amazon.com/premiumsupport/plans/
  - id: enterprise-reviews
    text: Enterprise Support includes architectural reviews and proactive services from AWS experts.
    source: https://aws.amazon.com/premiumsupport/technology-and-programs/
  - id: countdown-replaced
    text: AWS Countdown replaced Infrastructure Event Management and is included with Enterprise Support.
    source: https://aws.amazon.com/about-aws/whats-new/2023/11/aws-support-countdown-premium-tier/
  - id: billing-concierge
    text: Enterprise Support includes a billing concierge; Unified Operations provides a designated senior billing and account specialist.
    source: https://aws.amazon.com/premiumsupport/plans/
cards:
  - id: support-001
    q: What are the current AWS Support plans?
    a: Basic, AWS Business Support+, AWS Enterprise Support and AWS Unified Operations. Developer, Business and Enterprise On-Ramp end on January 1, 2027.
    facts: [plans, retired]
  - id: support-002
    q: What does every AWS account get with Basic Support?
    a: 24x7 account and billing help, support forums, service health checks, and documentation and best practice guides. No technical support cases.
    facts: [basic, basic-no-technical]
  - id: support-003
    q: A startup needs 24x7 access to AWS engineers by phone and chat for a production workload at the lowest cost. Which AWS Support plan fits?
    a: AWS Business Support+, from 29 USD per month per account.
    facts: [business-plus, business-plus-price]
  - id: support-004
    q: Which AWS Support plan is the lowest that includes a designated Technical Account Manager (TAM)?
    a: AWS Enterprise Support.
    facts: [enterprise]
  - id: support-005
    q: A company with Basic Support has a technical problem with Amazon EC2. Can it open a technical support case?
    a: No. Basic Support allows account and billing cases and service limit increases, not technical cases.
    trap: true
    facts: [basic-no-technical]
  - id: support-006
    q: Which AWS Support plan adds a designated Domain Specialist Engineer and critical workload reviews with personalized runbooks?
    a: AWS Unified Operations.
    facts: [unified-operations]
  - id: support-007
    q: A company wants help from AWS Support with operating systems and popular third-party software on its EC2 instances. What is the lowest plan that includes this?
    a: AWS Business Support+, which includes third-party software support.
    facts: [business-plus]
  - id: support-008
    q: Do paid AWS Support plans require a long-term contract?
    a: No. They are priced by the month with no long-term contract.
    facts: [no-contracts]
  - id: support-014
    q: Which AWS Support plans include help with popular third-party software on AWS?
    a: Business Support+ and above; Enterprise Support includes every Business Support+ benefit. Basic Support doesn't.
    facts: [third-party]
  - id: support-015
    q: "What does a Basic Support customer get from Trusted Advisor and the Support API?"
    a: "Only the Service limits checks and a few Security and Fault Tolerance checks in Trusted Advisor, and no Support API. Business Support+ is the lowest plan with all checks and the API."
    facts: [basic-ta-checks, support-api-plans]
  - id: support-016
    q: "Which has the higher monthly minimum, AWS Unified Operations or AWS Enterprise Support?"
    a: "AWS Unified Operations: 50,000 USD, compared with 5,000 USD for Enterprise Support."
    facts: [unified-price]
  - id: support-017
    q: Can an AWS Business Support+ customer open an unlimited number of support cases?
    a: Yes. AWS Business Support+ permits an unlimited number of support cases.
    facts: [unlimited-cases]
  - id: support-018
    q: Which AWS Support plan offers architectural guidance from support engineers at the lowest paid tier?
    a: AWS Business Support+. Enterprise Support also offers consultative guidance tailored to applications.
    facts: [architecture-guidance, enterprise-architecture]
  - id: support-019
    q: Which AWS Support plan includes architectural reviews and proactive services from AWS experts?
    a: AWS Enterprise Support.
    facts: [enterprise-reviews]
  - id: support-020
    q: What AWS Support service replaced Infrastructure Event Management and is included with Enterprise Support?
    a: AWS Countdown.
    facts: [countdown-replaced]
  - id: support-021
    q: How does billing assistance differ between AWS Enterprise Support and AWS Unified Operations?
    a: Enterprise includes a billing concierge; Unified Operations has a designated senior billing and account specialist.
    facts: [billing-concierge]
---
AWS Support plans set how much help a customer gets and how fast. Basic comes with every account. AWS has reorganized the plans: today they are Basic, Business Support+, Enterprise Support and Unified Operations. Developer, Business and Enterprise On-Ramp end on January 1, 2027.

### How it works

1. Every account starts on Basic: account and billing help, forums, health checks and documentation.
2. A paid plan adds technical cases and 24x7 access to engineers, priced by the month with no contract.
3. Higher plans add faster critical responses and named experts.

| Plan | Highlights | Fastest critical response |
|---|---|---|
| Basic | Account and billing help, forums, health checks; no technical cases | None |
| Business Support+ | AI-assisted answers, 24x7 engineers by phone, web and chat, 500+ Trusted Advisor checks, Support API, third-party software help; from 29 USD/month | Under 30 minutes |
| Enterprise Support | Designated TAM, AWS Security Incident Response, strategic business reviews, Countdown; 5,000 USD minimum | Under 15 minutes |
| Unified Operations | TAM plus Domain Specialist Engineer, architecture guidance, event management, critical workload reviews | 5 minutes |

### Exam cues

- If the question says guidance from support engineers on architecture, think Business Support+, because that plan offers architectural guidance.
- If the question says architectural reviews with AWS experts, think Enterprise Support, because reviews and proactive services are included.
- If the question says a designated senior billing specialist, think Unified Operations, because Enterprise Support provides a billing concierge.
- If the question says compare Enterprise Support and Unified Operations minimum charges, think Unified Operations costs more, because its monthly minimum is higher.
- If the question says only account and billing questions, think Basic.
- If the question says 24x7 technical support at low cost, think Business Support+.
- If the question says Technical Account Manager, think Enterprise Support or higher.
- If the question says the fastest response with domain specialists and personalized runbooks, think Unified Operations.

### Remember

- Business Support+: from 29 USD per month per account; critical cases under 30 minutes.
- Enterprise Support: 5,000 USD minimum; critical cases under 15 minutes; TAM.
- Developer, Business and Enterprise On-Ramp end on January 1, 2027.

> **Trap:** Older questions name Developer, Business or Enterprise On-Ramp. Map them to today's plans: Business Support+ replaces Developer and Business, and Enterprise On-Ramp customers move to Enterprise Support.
