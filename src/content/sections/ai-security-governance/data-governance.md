---
title: Data governance for AI
level: foundational
order: 20
facts:
  - id: lineage
    text: Data lineage tracks where data came from and how it was transformed, so you can trace a data element back to its source, reproduce workflows and show audit adherence.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlsec03-bp04.html
  - id: privacy-techniques
    text: Sensitive training data can be protected with data removal, masking, tokenization and principal component analysis (PCA), using anonymized data instead of raw PII where it suffices.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlsec03-bp03.html
  - id: minimize
    text: Keep only data relevant to the use case; automated data lifecycle management identifies data, redacts it when necessary and removes it when it's no longer needed, instead of keeping it indefinitely.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlsec03-bp05.html
  - id: residency
    text: Where data must stay within a geography, Amazon Bedrock geographic cross-Region inference keeps processing within a boundary such as the US or EU.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: regulations
    text: Generative AI systems that ingest sensitive information raise compliance questions under privacy regulations such as GDPR, CCPA and HIPAA, so compliance teams should be involved early.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-privacy
  - id: iso42001
    text: ISO/IEC 42001 is an international standard for establishing, implementing, maintaining and improving an Artificial Intelligence Management System (AIMS).
    source: https://aws.amazon.com/compliance/iso-42001-faqs/
cards:
  - id: ai-security-governance-008
    q: An auditor asks a team to show which source records fed a model and how they were transformed. Which practice provides this?
    a: Data lineage tracking.
    facts: [lineage]
  - id: ai-security-governance-009
    q: A health insurer wants to fine-tune a model on claims without exposing member names and IDs. Which techniques fit?
    a: De-identify the data by masking or tokenizing direct identifiers (or removing them) before training.
    facts: [privacy-techniques]
  - id: ai-security-governance-010
    q: What is the difference between data residency and data retention?
    a: "Residency is where data is physically stored and processed.\nRetention is how long data is kept before deletion."
    facts: [residency, minimize]
  - id: ai-security-governance-011
    q: A team keeps every customer chat log forever in case it's useful for training later. Which governance practice does this break?
    a: Data minimization and lifecycle management. Keep only relevant data and delete it when no longer needed.
    facts: [minimize]
  - id: ai-security-governance-012
    q: A company wants certification that its AI management practices meet an international standard. Which standard fits?
    a: ISO/IEC 42001, for Artificial Intelligence Management Systems.
    facts: [iso42001]
  - id: ai-security-governance-013
    q: Is encrypting a training dataset enough to make it safe to use PII for training?
    a: "No. Encryption protects data at rest; governance should still remove, mask or tokenize PII the model doesn't need."
    trap: true
    facts: [privacy-techniques, minimize]
---
Data governance decides what data AI may use, where it lives, how long it's kept and how its history is tracked. Good governance makes models auditable and keeps regulated data under control. [Enforce data lineage](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlsec03-bp04.html)

### How it works

| Practice | Purpose |
|---|---|
| Classification and usage policy | Decide which data may reach prompts or training |
| Lineage and cataloging | Trace sources and transformations for audits |
| De-identification | Mask, tokenize or remove PII |
| Lifecycle and retention | Keep only what's needed, delete the rest |
| Residency | Keep data and processing in required locations |
| Logging and monitoring | Record access and changes (CloudTrail) |

### Exam cues

- If the question says trace data origins and transformations, think data lineage.
- If the question says where data physically lives, think residency; how long it's kept, think retention.
- If the question says train without exposing identities, think masking or tokenization.
- If the question says AI management system standard, think ISO/IEC 42001.

### Remember

- Lineage supports audits and reproducibility.
- Minimize data: keep only relevant data, redact PII, delete when done.

> **Trap:** Data residency isn't the same as data sovereignty or retention; residency is only about location.
