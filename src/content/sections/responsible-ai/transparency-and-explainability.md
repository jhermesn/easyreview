---
title: Transparency and explainability
level: foundational
order: 30
facts:
  - id: explainability
    text: Explainability provides an understanding of how and why a model makes predictions, which builds trust, enables auditing and supports regulatory requirements.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlops01-bp02.html
  - id: tradeoff
    text: Highly complex models such as deep neural networks may predict better but act as an opaque system, while simpler models such as decision trees and linear regression are more transparent; explainability needs must be balanced against accuracy.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlops01-bp02.html
  - id: shapley
    text: Shapley values measure how much each feature contributed to a model's prediction, for a single prediction or for the model as a whole.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-shapley-values.html
  - id: pdp
    text: Partial dependence plots (PDPs) show how the predicted outcome depends on one or more input features.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-processing-job-analysis-results.html#clarify-processing-job-analysis-results-pdp
  - id: model-cards
    text: SageMaker Model Cards document a model's intended use, risk rating, training details, metrics and evaluation results in one place.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html
  - id: service-cards
    text: AWS AI Service Cards explain the intended use cases of an AWS AI service, how it uses machine learning and key considerations for its responsible design and use.
    source: https://docs.aws.amazon.com/ai/responsible-ai/bedrock-guardrails/overview.html
  - id: human-oversight
    text: Human review belongs at points where inputs or outputs are hard to judge or where human expertise helps with consequential decisions.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/raiuc04-bp02.html
  - id: interpretability
    text: Model interpretability is the ability to understand and explain the reasoning behind a model's outputs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
cards:
  - id: responsible-ai-015
    q: A regulator requires a bank to explain which factors drove each individual loan decision. Which technique gives per-prediction explanations?
    a: Feature attributions with Shapley values (SHAP), which show each feature's contribution to a specific prediction.
    facts: [shapley, explainability]
  - id: responsible-ai-016
    q: Which document tells customers the intended use, limitations and responsible-use considerations of an AWS AI service?
    a: An AWS AI Service Card.
    facts: [service-cards]
  - id: responsible-ai-017
    q: A highly regulated team must be able to read exactly how its model decides. Which kind of model fits better than a deep neural network?
    a: An inherently interpretable model, such as a decision tree or linear regression, accepting some loss of accuracy.
    facts: [tradeoff]
  - id: responsible-ai-018
    q: What is the trade-off between model performance and interpretability?
    a: Complex models (deep neural networks) often predict better but are opaque; simpler models are easier to explain but may be less accurate.
    facts: [tradeoff]
  - id: responsible-ai-019
    q: Which SageMaker AI feature documents a model's intended use and risk rating for governance?
    a: SageMaker Model Cards.
    facts: [model-cards]
  - id: responsible-ai-020
    q: An AI system recommends insurance plans. Name two human-centered design practices that build user trust.
    a: Disclose that the recommendation is AI-generated and explain its main factors, and give users a way to give feedback or reach a human for consequential decisions.
    facts: [human-oversight, explainability]
  - id: responsible-ai-021
    q: Which visualization shows how a model's predicted outcome changes as one input feature changes?
    a: A partial dependence plot (PDP).
    facts: [pdp]
  - id: responsible-ai-022
    q: Is an open-weight model automatically transparent and explainable?
    a: "Not automatically. Open weights help inspection, but you still need documentation of training data, licensing and explanation methods."
    trap: true
    facts: [interpretability, model-cards]
---
A transparent system tells people that AI is involved and how it was built; an explainable model lets you see why it produced an output. Both build trust, support audits and satisfy regulators.

### How it works

| Tool | What it shows |
|---|---|
| Shapley values (SHAP) | Each feature's contribution to a prediction |
| Partial dependence plots | How the prediction moves with a feature |
| SageMaker Model Cards | Intended use, risk, training data, evaluation |
| AWS AI Service Cards | Intended use and responsible-use notes for AWS AI services |
| Human oversight | People review hard or consequential decisions |

1. Agree on the level of explainability the use case needs before choosing a model.
2. Prefer interpretable models when decisions must be explained; add explanation techniques to complex ones.
3. Document models (model cards), disclose AI use to users, and keep feedback paths and human review.

### Exam cues

- If the question says explain an individual prediction, think Shapley values (SHAP).
- If the question says document a model's intended use and risks, think SageMaker Model Cards.
- If the question says intended use and limitations of an AWS AI service, think AWS AI Service Cards.
- If the question says regulated decisions must be explainable, think interpretable models, accepting lower accuracy.

### Remember

- Interpretability: understand the model's internal reasoning. Explainability: explain why it produced an output.
- Simpler models are more transparent; complex ones often more accurate.

> **Trap:** Explaining a model and documenting it are different jobs. Model Cards document; SHAP and PDPs explain.
