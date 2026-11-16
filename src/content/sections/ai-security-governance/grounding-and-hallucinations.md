---
title: Detecting and reducing hallucinations
level: foundational
order: 30
facts:
  - id: risk
    text: A hallucination, a confident but incorrect or fabricated answer, can lead to bad decisions, financial loss or compliance violations, which makes it a reliability and reputational concern for enterprises.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-quality
  - id: cause
    text: Hallucinations come partly from the probabilistic nature of LLMs and partly from missing data; a model without facts to ground a response may make one up.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-quality
  - id: rag
    text: Retrieval augmented generation reduces hallucinations by supplying facts from a knowledge base so answers are grounded in authoritative sources.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-quality
  - id: prompt-constraints
    text: Prompts can tell the model to acknowledge uncertainty instead of guessing, and secondary models can cross-check outputs against a knowledge base.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-quality
  - id: grounding-check
    text: Amazon Bedrock Guardrails contextual grounding checks flag responses that aren't grounded in the reference source or relevant to the query.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
  - id: guardrails-practice
    text: Implement guardrails to mitigate harmful or incorrect model responses.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gensec02-bp01.html
cards:
  - id: ai-security-governance-014
    q: Name three ways to reduce hallucinations in a generative AI application.
    a: "Any three of: RAG grounding, contextual grounding checks in Bedrock Guardrails, prompts that allow \"I don't know\", cross-checking output with another model, human review."
    facts: [rag, grounding-check, prompt-constraints]
  - id: ai-security-governance-015
    q: Why do LLMs hallucinate?
    a: They generate probable text rather than look up facts, and when they lack grounding data they fill the gap with plausible-sounding content.
    facts: [cause]
  - id: ai-security-governance-016
    q: An assistant answers questions about policy documents and must never invent policies. Which combination fits on AWS?
    a: RAG with Amazon Bedrock Knowledge Bases, plus Guardrails contextual grounding checks to block answers not supported by the documents.
    facts: [rag, grounding-check]
  - id: ai-security-governance-017
    q: Why is a hallucination a business risk and not only a quality issue?
    a: Wrong answers given to customers or employees can cause financial loss, compliance violations and reputational damage.
    facts: [risk]
  - id: ai-security-governance-018
    q: Does a bigger model guarantee no hallucinations?
    a: "No. Hallucination comes from probabilistic generation and missing facts; grounding and validation reduce it."
    trap: true
    facts: [cause, rag]
---
Hallucinations can't be switched off, but they can be made rare and caught. Ground the model in real data, tell it to admit uncertainty, check its answers against the source, and keep people reviewing high-stakes output. [Model hallucinations and output integrity](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-quality)

### How it works

1. **Ground:** retrieve authoritative facts with RAG and put them in the prompt.
2. **Constrain:** instruct the model to answer only from the context and say when it doesn't know.
3. **Validate:** run contextual grounding checks or Automated Reasoning checks in Amazon Bedrock Guardrails, or cross-check with another model.
4. **Review:** send low-confidence or high-risk answers to people.

### Exam cues

- If the question says answers must stay true to company documents, think RAG plus contextual grounding checks.
- If the question says verify answers against formal rules, think Automated Reasoning checks.
- If the question says high-risk decisions, think human-in-the-loop review.

### Remember

- Hallucinations come from probabilistic generation and missing grounding data.
- Ground, constrain, validate, review.

> **Trap:** Fine-tuning isn't the main fix for hallucinations about facts that change; grounding with current data at query time is.
