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
  - id: "hipaa-privacy"
    text: "HIPAA includes rules to protect the privacy and security of protected health information."
    source: "https://aws.amazon.com/compliance/hipaa-compliance/"
  - id: "hipaa-eligible"
    text: "Customers with an AWS Business Associate Addendum should process protected health information only in the eligible services defined in that agreement."
    source: "https://aws.amazon.com/compliance/hipaa-compliance/"
  - id: "pci-cardholder"
    text: "PCI DSS covers any organization whose systems store, process or transmit cardholder data or sensitive authentication data."
    source: "https://aws.amazon.com/compliance/pci-dss-level-1-faqs/"
  - id: "soc-financial"
    text: "SOC 1 reports address controls relevant to a customer financial statement audit."
    source: "https://docs.aws.amazon.com/pdfs/whitepapers/latest/gxp-systems-on-aws/gxp-systems-on-aws.pdf"
  - id: "soc-trust"
    text: "SOC 2 reports evaluate controls against applicable trust services criteria."
    source: "https://docs.aws.amazon.com/pdfs/whitepapers/latest/gxp-systems-on-aws/gxp-systems-on-aws.pdf"
  - id: "audit-evidence"
    text: "AWS Audit Manager automatically collects evidence for active assessments."
    source: "https://docs.aws.amazon.com/audit-manager/latest/userguide/how-evidence-is-collected.html#how-evidence-is-collected"
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
    q: How can a customer check which AWS services are covered by a compliance program?
    a: Consult the AWS Services in Scope by Compliance Program page.
    facts: [in-scope]
  - id: artifact-010
    q: A service the company needs is not yet listed in scope for a compliance program. Can the company still use it?
    a: Yes. The customer decides whether the service will touch data that affects its compliance.
    facts: [not-listed]
  - id: artifact-011
    q: "A healthcare organization subject to HIPAA wants to process protected health information on AWS. What should it check?"
    a: "Its AWS Business Associate Addendum and the eligible services defined in it."
    facts: [hipaa-privacy, hipaa-eligible]
  - id: artifact-012
    q: "Which compliance standard addresses the security of payment card data processed on AWS?"
    a: "PCI DSS."
    facts: [pci-cardholder]
  - id: artifact-013
    q: "Which AWS SOC report addresses controls relevant to financial statement audits, and which uses trust services criteria?"
    a: "SOC 1 addresses financial reporting controls. SOC 2 evaluates applicable trust services criteria."
    facts: [soc-financial, soc-trust]
  - id: artifact-014
    q: "Which AWS service automatically collects evidence for active compliance assessments?"
    a: "AWS Audit Manager."
    facts: [audit-evidence]
---
AWS takes part in many compliance programs: global standards, industry rules and government programs. Each covers a specific set of services. Customers inherit the AWS side of these programs and remain responsible for their own.

### How it works

1. Independent third parties audit AWS for certifications and attestations, such as ISO 27001, SOC reports, PCI DSS and FedRAMP.
2. AWS also aligns with laws, such as HIPAA, and with published frameworks, such as NIST.
3. Each program covers a list of services, so requirements vary by service. Check the Services in Scope page for your program.
4. The audit reports themselves are in AWS Artifact.

| Group | Examples |
|---|---|
| Certifications and attestations | ISO 27001, SOC 1/2/3, PCI DSS, FedRAMP |
| Laws, regulations and privacy | HIPAA |
| Alignments and frameworks | NIST frameworks |

### Exam cues

- If the question says protected health information, think HIPAA and eligible services under the AWS Business Associate Addendum, because HIPAA protects that information.
- If the question says payment card data, think PCI DSS, because it applies to entities handling cardholder data.
- If the question says financial reporting controls, think SOC 1; for trust services criteria, think SOC 2.
- If the question says collect evidence for an assessment, think AWS Audit Manager, because active assessments collect evidence automatically.
- If the question says which services a compliance program covers, think Services in Scope by Compliance Program.
- If the question says compliance requirements depend on the industry or country, think the customer checks the programs and laws that apply to it.
- If the question says download the audit report, think AWS Artifact.

### Remember

- Certifications are third-party audited.
- Compliance requirements vary among AWS services.
- The customer stays responsible for its own compliance.

> **Trap:** AWS being certified does not make a customer's workload certified. AWS covers its part under the shared responsibility model.
