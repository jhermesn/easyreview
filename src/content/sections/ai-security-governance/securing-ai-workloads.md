---
title: Scoping and securing AI workloads
level: foundational
order: 10
facts:
  - id: matrix
    text: The Generative AI Security Scoping Matrix sorts generative AI workloads into five scopes by how much of the model and data you own, to decide which security controls apply.
    source: https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/
  - id: scopes
    text: "Scope 1 is a public consumer app, scope 2 an enterprise app with embedded generative AI, scope 3 your own app on a pre-trained third-party model, scope 4 a fine-tuned third-party model, and scope 5 a model you train from scratch."
    source: https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/
  - id: scope1-data
    text: For scope 1 consumer apps, use public, non-proprietary data, because the provider may use submitted data to improve its models.
    source: https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/
  - id: disciplines
    text: "The scoping matrix names five security disciplines: governance and compliance, legal and privacy, risk management, controls, and resilience."
    source: https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/
  - id: least-privilege
    text: Grant least-privilege access to foundation model endpoints and use private network communication between models and applications.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gensec01.html
  - id: encryption
    text: Training datasets, fine-tuning datasets and vector databases should be encrypted at rest with fine-grained access controls, and prompts, outputs and retrieved context should be protected in transit with TLS.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-pipeline
  - id: data-policy
    text: Data governance policies should classify data and restrict what can be used for training and inference, for example excluding PII from prompts unless it is anonymized.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-privacy
cards:
  - id: ai-security-governance-001
    q: What is the Generative AI Security Scoping Matrix used for?
    a: It groups generative AI workloads by model and data ownership to help identify applicable security controls.
    facts: [matrix]
  - id: ai-security-governance-002
    q: How can a team protect training data and prompts in an AI workload?
    a: Encrypt datasets and vector databases at rest, and protect prompts and outputs in transit with TLS.
    facts: [encryption]
  - id: ai-security-governance-003
    q: How can data governance reduce privacy risks in AI training and inference?
    a: Classify data and restrict its use, such as excluding personal information from prompts unless anonymized.
    facts: [data-policy]
  - id: ai-security-governance-004
    q: Name the five security disciplines in the Generative AI Security Scoping Matrix.
    a: Governance and compliance, legal and privacy, risk management, controls, resilience.
    facts: [disciplines]
  - id: ai-security-governance-005
    q: Which controls protect a RAG application's vector database and prompts?
    a: Encryption at rest with fine-grained access control for the data stores, TLS in transit for prompts and retrieved context, and least-privilege IAM.
    facts: [encryption, least-privilege]
  - id: ai-security-governance-006
    q: Under the shared responsibility model, who secures the data, prompts and access policies of an app built on Amazon Bedrock?
    a: The customer. AWS secures the infrastructure that runs the service.
    facts: [least-privilege, data-policy]
  - id: ai-security-governance-007
    q: Does a scope 5 self-trained model need fewer controls than a scope 3 app because the company owns everything?
    a: "No. Owning the model and training data means owning more of the security responsibility, not less."
    trap: true
    facts: [scopes, matrix]
---
Securing AI starts by asking how much of the solution you own. The Generative AI Security Scoping Matrix answers that in five scopes, and the controls follow: least privilege, private networking, encryption and data policies.

### How it works

| Scope | You use | You own |
|---|---|---|
| 1 Consumer app | A public generative AI service | Only what you type in |
| 2 Enterprise app | A vendor app with AI features | The contract and your data |
| 3 Pre-trained model | Your app on a third-party FM (e.g. via Bedrock) | App, prompts, data |
| 4 Fine-tuned model | A third-party FM tuned on your data | Plus the custom model |
| 5 Self-trained model | A model trained from scratch | Everything |

1. Classify data and decide which categories may reach prompts or training.
2. Grant least-privilege IAM access to models, knowledge bases and data stores.
3. Keep traffic private (AWS PrivateLink) and encrypt data at rest (AWS KMS) and in transit (TLS).
4. Find sensitive data with Amazon Macie; log with CloudTrail and model invocation logging.

### Exam cues

- If the question says public chatbot and confidential data, think scope 1; keep confidential data out.
- If the question says fine-tune a provider's model, think scope 4.
- If the question says private connectivity to the model API, think AWS PrivateLink.
- If the question says find PII in S3 training data, think Amazon Macie.

### Remember

- Five scopes, by ownership; five disciplines, by concern.
- Encrypt training data, fine-tuning data and vector stores; TLS for prompts and context.

> **Trap:** Moving from scope 3 to 5 adds responsibility. Every extra piece you own, you must secure.
