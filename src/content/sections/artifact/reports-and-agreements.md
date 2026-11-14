---
title: Reports and agreements
level: foundational
order: 10
facts:
  - id: reports
    text: AWS Artifact provides on-demand downloads of AWS security and compliance documents, such as ISO and PCI compliance reports and System and Organization Controls (SOC) reports.
    source: https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#what-is-aws-artifact
  - id: certifications
    text: AWS Artifact also provides certifications from accreditation bodies that validate the implementation and operating effectiveness of AWS security controls.
    source: https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#what-is-aws-artifact
  - id: auditors
    text: Customers can submit AWS Artifact documents to auditors or regulators as audit artifacts that demonstrate the security and compliance of the AWS infrastructure and services they use.
    source: https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#what-is-aws-artifact
  - id: own-documents
    text: Customers remain responsible for developing or obtaining documents that demonstrate the security and compliance of their own companies.
    source: https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#what-is-aws-artifact
  - id: agreements
    text: AWS Artifact lets customers review, accept and track agreements with AWS for one account or for every account in an organization.
    source: https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#what-is-aws-artifact
  - id: baa
    text: Companies subject to HIPAA typically need a Business Associate Addendum (BAA) with AWS, which they can review and accept in AWS Artifact.
    source: https://docs.aws.amazon.com/artifact/latest/ug/managing-agreements.html#managing-agreements
  - id: org-agreement
    text: With AWS Organizations, an agreement such as a BAA can be accepted for all accounts in the organization, covering existing and future member accounts.
    source: https://docs.aws.amazon.com/artifact/latest/ug/managing-agreements.html#managing-agreements
  - id: free
    text: AWS Artifact documents and agreements are free of charge.
    source: https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#pricing-for-artifact
  - id: isv
    text: AWS Artifact also offers security and compliance documents for independent software vendors that sell on AWS Marketplace.
    source: https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#what-is-aws-artifact
cards:
  - id: artifact-001
    q: An auditor asks for AWS's SOC 2 report. Where does the customer get it?
    a: AWS Artifact, which provides on-demand downloads of AWS compliance reports such as SOC, ISO and PCI reports.
    facts: [reports]
  - id: artifact-002
    q: A healthcare company must sign a Business Associate Addendum (BAA) with AWS for HIPAA. Which service does it use?
    a: AWS Artifact. It reviews and accepts agreements such as the BAA, for one account or a whole organization.
    facts: [baa, agreements]
  - id: artifact-003
    q: How much does AWS Artifact charge for compliance reports and agreements?
    a: Nothing. AWS Artifact documents and agreements are free.
    facts: [free]
  - id: artifact-004
    q: A company uses AWS Organizations and wants a BAA to cover every current and future account. What can it do in AWS Artifact?
    a: Accept the agreement at the organization level. Existing and future member accounts are covered automatically.
    facts: [org-agreement]
  - id: artifact-005
    q: Does an AWS SOC report from AWS Artifact prove that the customer's own application is compliant?
    a: No. It covers the AWS infrastructure and services. The customer must demonstrate the compliance of its own systems.
    trap: true
    facts: [auditors, own-documents]
---
AWS Artifact is a free portal in the AWS console for compliance documents. It provides reports and certifications about AWS's own controls, which customers hand to auditors. It also manages legal agreements with AWS. [What is AWS Artifact?](https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html#what-is-aws-artifact)

### How it works

1. **Artifact Reports:** download AWS compliance reports and certifications, such as SOC, ISO and PCI. Third parties audit them.
2. Give them to auditors or regulators as evidence about the AWS side, or use them to evaluate your own controls.
3. **Artifact Agreements:** review, accept and track agreements with AWS, such as the HIPAA Business Associate Addendum. Accept them for one account or for a whole organization. [Managing agreements](https://docs.aws.amazon.com/artifact/latest/ug/managing-agreements.html#managing-agreements)

### Exam cues

- If the question says download a SOC, ISO or PCI report about AWS, think AWS Artifact.
- If the question says sign or accept a BAA or another agreement with AWS, think AWS Artifact.
- If the question says evidence for an auditor about AWS's controls, think AWS Artifact.

### Remember

- Free of charge.
- Reports cover AWS; customers document their own compliance.
- Organization-level agreements cover future member accounts too.

> **Trap:** AWS Artifact does not check your resources for compliance. Rule-based checks of your configuration are AWS Config; findings across accounts are AWS Security Hub.
