---
title: Legal and business risks of generative AI
level: foundational
order: 40
facts:
  - id: ip-indemnity
    text: AWS offers an uncapped intellectual property indemnity for copyright claims arising from the generative output of Amazon models and other generative AI services listed in the AWS Service Terms.
    source: https://aws.amazon.com/bedrock/faqs/
  - id: bias
    text: Foundation models can pick up hate speech and inappropriate undertones from training data, so developers should filter training data and encode specific norms into their models.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: unreliable
    text: Foundation model answers on some subjects can be unreliable, inappropriate, toxic or incorrect.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: hallucination
    text: A hallucination is output that is inconsistent, factually incorrect or unrelated to the input prompt.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
  - id: trust
    text: Openness about an AI system's capabilities and limitations, including when and how AI is used, builds user trust and encourages adoption.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#transparency
  - id: data-privacy
    text: Using proprietary data to customize generative AI models raises data privacy and security concerns, so responses must not give unauthorized access to that data.
    source: https://aws.amazon.com/what-is/generative-ai/
cards:
  - id: responsible-ai-023
    q: A marketing team's image generator produces a picture very similar to a famous cartoon character. Which legal risk is this?
    a: An intellectual property (copyright) infringement claim from the character's owner.
    facts: [ip-indemnity]
  - id: responsible-ai-024
    q: Name four legal or business risks of using generative AI.
    a: "Any four of: intellectual property infringement claims, biased or toxic outputs, hallucinations that mislead users, loss of customer trust, exposure of private data."
    facts: [bias, unreliable, hallucination, trust, data-privacy]
  - id: responsible-ai-025
    q: A support bot confidently gives a customer wrong refund rules, and the customer acts on them. Which risks does this create?
    a: End-user harm and loss of customer trust caused by a hallucination, plus possible legal liability.
    facts: [hallucination, trust]
  - id: responsible-ai-026
    q: What does AWS offer to customers facing copyright claims over output from Amazon's own generative models?
    a: An uncapped intellectual property indemnity for copyright claims on output of Amazon models and the services listed in the Service Terms.
    facts: [ip-indemnity]
  - id: responsible-ai-027
    q: Does using a model from a large provider remove the risk of biased output?
    a: "No. Models pick up bias from their training data; the deployer still has to test, filter and monitor outputs."
    trap: true
    facts: [bias]
---
Generative AI creates new legal and business exposure: output that copies protected work, biased or toxic content, confident falsehoods, leaked data and the loss of trust that follows. [What are foundation models?](https://aws.amazon.com/what-is/foundation-models/)

### How it works

| Risk | Example | Mitigation |
|---|---|---|
| Intellectual property | Output resembles copyrighted work | Content review, IP indemnity on covered services |
| Biased output | Unfair treatment of a group | Data curation, bias testing, guardrails |
| Hallucination | Wrong policy given to a customer | RAG grounding, contextual grounding checks, human review |
| Privacy | Model reveals private data | Data minimization, PII filters, access control |
| Loss of trust | Users stop relying on the product | Transparency, disclosure, feedback loops |

### Exam cues

- If the question says output resembles a protected character, brand or text, think IP infringement claims.
- If the question says users acted on false AI answers, think hallucination and end-user risk.
- If the question says disclose AI use and limits to keep trust, think transparency.

### Remember

- AWS's IP indemnity covers copyright claims on output of Amazon models and listed services.
- Bias and toxicity come from training data; filter and test.

> **Trap:** An indemnity covers certain copyright claims; it doesn't make the output accurate, fair or safe to publish.
