---
title: Compliance programs
level: foundational
order: 20
facts:
  - id: categories
    text: AWS groups the IT standards it complies with into certifications and attestations; laws, regulations and privacy; and alignments and frameworks.
    source: https://aws.amazon.com/compliance/programs/
  - id: third-party
    text: Compliance certifications and attestations are assessed by a third-party, independent auditor and result in a certification, audit report or attestation of compliance.
    source: https://aws.amazon.com/compliance/programs/
  - id: customer-laws
    text: AWS customers remain responsible for complying with the compliance laws, regulations and privacy programs that apply to them.
    source: https://aws.amazon.com/compliance/programs/
  - id: frameworks
    text: Compliance alignments and frameworks are published security or compliance requirements for a specific purpose, such as a specific industry or function.
    source: https://aws.amazon.com/compliance/programs/
  - id: examples
    text: AWS certifications and attestations include ISO 27001, SOC 1, SOC 2, SOC 3, PCI DSS and FedRAMP; HIPAA is listed under laws and regulations.
    source: https://aws.amazon.com/compliance/programs/
  - id: in-scope
    text: The AWS Services in Scope by Compliance Program page lists which services each assurance program covers; generally available features of a listed service are in scope unless excluded.
    source: https://aws.amazon.com/compliance/services-in-scope/
  - id: not-listed
    text: A service missing from the scope of the latest assessment can still be used; the customer decides whether it will process or store data that affects its compliance.
    source: https://aws.amazon.com/compliance/services-in-scope/
cards:
  - id: artifact-006
    q: Who audits AWS for compliance certifications such as ISO 27001 and SOC 2?
    a: Third-party, independent auditors. The result is a certification, audit report or attestation.
    facts: [third-party, examples]
  - id: artifact-007
    q: A company must process credit card data and wants to know which AWS services are covered by PCI DSS. Where does it look?
    a: The AWS Services in Scope by Compliance Program page. Compliance requirements vary among AWS services.
    facts: [in-scope, examples]
  - id: artifact-008
    q: Because AWS holds many compliance certifications, is a company running on AWS automatically compliant with the laws in its country or industry?
    a: No. Customers remain responsible for complying with the laws, regulations and privacy programs that apply to them.
    trap: true
    facts: [customer-laws]
  - id: artifact-009
    q: Into which three groups does AWS sort the compliance standards it meets?
    a: Certifications and attestations; laws, regulations and privacy; alignments and frameworks.
    facts: [categories]
  - id: artifact-010
    q: A service the company needs is not yet listed in scope for a compliance program. Can the company still use it?
    a: Yes. The customer decides whether the service will touch data that affects its compliance.
    facts: [not-listed]
---
AWS takes part in many compliance programs: global standards, industry rules and government programs. Each covers a specific set of services. Customers inherit the AWS side of these programs and remain responsible for their own. [Compliance programs](https://aws.amazon.com/compliance/programs/)

### How it works

1. Independent third parties audit AWS for certifications and attestations, such as ISO 27001, SOC reports, PCI DSS and FedRAMP.
2. AWS also aligns with laws, such as HIPAA, and with published frameworks, such as NIST.
3. Each program covers a list of services, so requirements vary by service. Check the Services in Scope page for your program. [Services in scope](https://aws.amazon.com/compliance/services-in-scope/)
4. The audit reports themselves are in AWS Artifact.

| Group | Examples |
|---|---|
| Certifications and attestations | ISO 27001, SOC 1/2/3, PCI DSS, FedRAMP |
| Laws, regulations and privacy | HIPAA |
| Alignments and frameworks | NIST frameworks |

### Exam cues

- If the question says which services a compliance program covers, think Services in Scope by Compliance Program.
- If the question says compliance requirements depend on the industry or country, think the customer checks the programs and laws that apply to it.
- If the question says download the audit report, think AWS Artifact.

### Remember

- Certifications are third-party audited.
- Compliance requirements vary among AWS services.
- The customer stays responsible for its own compliance.

> **Trap:** AWS being certified does not make a customer's workload certified. AWS covers its part under the shared responsibility model.
