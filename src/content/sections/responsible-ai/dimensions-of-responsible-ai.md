---
title: Dimensions of responsible AI
level: foundational
order: 10
facts:
  - id: definition
    text: Responsible AI is the practice of designing, developing and using AI technology with the goal of maximizing benefits and minimizing risks.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#responsible-ai
  - id: dimensions
    text: "AWS defines responsible AI through eight dimensions: fairness, explainability, privacy and security, safety, controllability, veracity and robustness, governance, and transparency."
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#responsible-ai
  - id: fairness
    text: Fairness considers the impact on different groups of stakeholders, for example verifying that a mortgage system's decisions aren't influenced by discriminatory factors.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#fairness
  - id: veracity
    text: Veracity and robustness mean achieving correct system outputs, even with unexpected or adversarial inputs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#responsible-ai
  - id: controllability
    text: Controllability means having mechanisms to monitor and steer AI system behavior, including procedures to adjust or disable the system while keeping human oversight effective.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#controllability
  - id: safety
    text: Safety means reducing harmful system output and misuse, keeping the system within a clearly defined use case scope.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#safety
  - id: transparency
    text: Transparency lets stakeholders make informed choices about their engagement with an AI system, by communicating when and how AI is used, what data informs decisions and what controls exist.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#transparency
  - id: genai-weight
    text: Some responsible AI dimensions, such as veracity (truthfulness), weigh more heavily for generative AI systems than for traditional machine learning.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html#responsible-ai
  - id: is-ai-needed
    text: The Responsible AI Lens starts by clarifying the business problem and verifying that AI is actually required to solve it.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/raiuc01-bp02.html
cards:
  - id: responsible-ai-001
    q: Name the eight dimensions AWS uses to define responsible AI.
    a: Fairness, explainability, privacy and security, safety, controllability, veracity and robustness, governance, transparency.
    facts: [dimensions]
  - id: responsible-ai-002
    q: A chatbot must keep giving correct answers even when users send typos, odd phrasing or adversarial input. Which responsible AI dimension is this?
    a: Veracity and robustness.
    facts: [veracity]
  - id: responsible-ai-003
    q: A company tells customers when they are chatting with an AI and what data it uses. Which responsible AI dimension does this serve?
    a: Transparency.
    facts: [transparency]
  - id: responsible-ai-004
    q: A loan model must not treat applicants differently because of gender or race. Which responsible AI dimension is this?
    a: Fairness.
    facts: [fairness]
  - id: responsible-ai-005
    q: Operators need a way to monitor an AI system and switch it off if it misbehaves. Which responsible AI dimension is this?
    a: Controllability.
    facts: [controllability]
  - id: responsible-ai-006
    q: Which responsible AI dimension matters more for generative AI than for traditional ML because models can invent facts?
    a: Veracity (truthfulness).
    facts: [genai-weight]
  - id: responsible-ai-007
    q: Is responsible AI a final check before launch?
    a: "No. It applies across the whole lifecycle, starting with whether AI is needed at all."
    trap: true
    facts: [definition, is-ai-needed]
---
Responsible AI weighs the benefits of an AI system against its risks, across eight dimensions, from the first decision about whether AI is needed to the system's retirement. [Responsible AI](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html)

### How it works

| Dimension | Question it asks |
|---|---|
| Fairness | Does it treat stakeholder groups equitably? |
| Explainability | Can we understand and evaluate its outputs? |
| Privacy and security | Are data and models obtained, used and protected properly? |
| Safety | Does it avoid harmful output and misuse? |
| Controllability | Can we monitor and steer it? |
| Veracity and robustness | Are outputs correct, even with unexpected input? |
| Governance | Are best practices built into the AI supply chain? |
| Transparency | Do people know when and how AI is used? |

### Exam cues

- If the question says equal treatment of groups, think fairness.
- If the question says correct output despite adversarial or unexpected input, think veracity and robustness.
- If the question says disclose AI use and its limits, think transparency.
- If the question says monitor and steer or switch off, think controllability.

### Remember

- Eight dimensions; veracity weighs more for generative AI.
- Start by asking whether AI is required at all.

> **Trap:** Explainability and transparency differ: explainability is understanding why the system produced an output; transparency is telling people that AI is used and how.
