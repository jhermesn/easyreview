---
title: Prompt elements and techniques
level: foundational
order: 10
facts:
  - id: definition
    text: Prompt engineering is the practice of optimizing the text input to an LLM to get the desired response, for tasks such as classification, question answering, code generation and creative writing.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html
  - id: instructions
    text: Models on Amazon Bedrock work best with simple, clear and complete instructions that reduce ambiguity, such as naming the categories to choose from.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html#prompt-instructions
  - id: placement
    text: Placing the task, instruction or question at the end of the prompt helps the model focus on what it must find.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html#prompt-placement
  - id: output-indicator
    text: Output indicators state constraints on the output the model should produce, such as a one-sentence summary.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html#prompt-output-indicators
  - id: zero-shot
    text: Zero-shot learning is a model's ability to perform a task on examples it has never seen, without task-specific training data or examples in the prompt.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
  - id: few-shot
    text: Few-shot prompting includes a few examples of the task, with their input and output format, in the prompt, which makes responses more consistent and accurate.
    source: https://docs.aws.amazon.com/nova/latest/userguide/prompting-examples.html
  - id: chain-of-thought
    text: Chain-of-thought prompting breaks a complex question into smaller logical steps, so the model reasons through intermediate steps before answering.
    source: https://aws.amazon.com/what-is/prompt-engineering/
  - id: negative
    text: Amazon Nova Canvas accepts a negative prompt that lists elements to keep out of an image, such as "clouds, waves"; negation words such as "no" or "without" in the main prompt backfire because the model doesn't understand negation.
    source: https://docs.aws.amazon.com/nova/latest/userguide/prompting-image-generation.html
  - id: template
    text: Prompt engineers build reusable templates and scripts that users customize, so prompts can be reused across the enterprise.
    source: https://aws.amazon.com/what-is/prompt-engineering/
cards:
  - id: prompt-engineering-001
    q: A prompt includes three example reviews with their correct sentiment labels, then a new review to label. Which technique is this?
    a: Few-shot prompting, which shows examples of the task in the prompt.
    facts: [few-shot]
  - id: prompt-engineering-002
    q: A prompt asks an LLM to classify a ticket with no examples at all. Which technique is this?
    a: Zero-shot prompting.
    facts: [zero-shot]
  - id: prompt-engineering-003
    q: An LLM gets multi-step math word problems wrong. Which prompting technique helps it reason step by step?
    a: Chain-of-thought prompting, which asks the model to work through intermediate steps.
    facts: [chain-of-thought]
  - id: prompt-engineering-004
    q: An image generator keeps adding people to product photos. How do you keep them out with Amazon Nova Canvas?
    a: List "people" in the negative prompt. Writing "no people" in the main prompt can add people, because the model doesn't understand negation.
    facts: [negative]
  - id: prompt-engineering-005
    q: Name the parts of a well-built prompt.
    a: "Instructions (the task), context, input data, and an output indicator (the format or length of the answer)."
    facts: [instructions, output-indicator]
  - id: prompt-engineering-006
    q: A summary prompt returns answers nearly as long as the source text. What should the prompt add?
    a: An output indicator, such as "Summarize in one sentence."
    facts: [output-indicator]
  - id: prompt-engineering-007
    q: "Why should a prompt for an Amazon Bedrock model use clear and complete instructions?"
    a: "Clear and complete instructions reduce ambiguity about the task."
    facts: [instructions]
  - id: prompt-engineering-008
    q: Is prompt engineering a way to change a model's weights?
    a: "No. It changes only the input. It's the cheapest customization: no training, no new model."
    trap: true
    facts: [definition]
---
A prompt is everything the model sees: the task, the context, the data to work on and how the answer should look. Techniques such as few-shot examples and chain-of-thought get better answers from the same model. [Prompt engineering concepts](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html)

### How it works

| Element | Example |
|---|---|
| Instruction | "Classify the review as positive, negative or neutral." |
| Context | "You are a support analyst for an airline." |
| Input data | The review text |
| Output indicator | "Answer with one word." |

| Technique | What you add |
|---|---|
| Zero-shot | Only the instruction |
| One-shot / few-shot | One or a few worked examples |
| Chain-of-thought | A request to reason step by step |
| Prompt template | A reusable prompt with variables |
| Negative prompt (images) | What to leave out of the image |

### Exam cues

- If the question says examples of input and output in the prompt, think few-shot prompting.
- If the question says no examples, think zero-shot.
- If the question says step-by-step reasoning for complex problems, think chain-of-thought.
- If the question says keep something out of a generated image, think negative prompt.

### Remember

- Clear, specific instructions; question at the end; state the output format.
- Few-shot improves consistency and reduces misinterpretation.

> **Trap:** "Single-shot" or "one-shot" means one example in the prompt, not one training run. None of these techniques train the model.
