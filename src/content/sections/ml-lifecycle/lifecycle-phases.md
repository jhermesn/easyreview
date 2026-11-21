---
title: Phases of the ML lifecycle
level: foundational
order: 10
facts:
  - id: phases
    text: "The Well-Architected ML lifecycle has six phases: business goal identification, ML problem framing, data processing, model development, deployment and monitoring. The phases loop back with feedback instead of running only once."
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lifecycle.html
  - id: business-goal
    text: Business goal identification is the most important phase; it starts by deciding whether ML is the right approach at all and whether enough relevant, high-quality training data exists.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/business-goal-identification.html
  - id: not-ml
    text: Some business problems don't need ML because simple business rules do a better job, and others lack enough data for ML to work.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/ml-problem-framing.html
  - id: framing
    text: Problem framing turns the business problem into an ML problem by deciding what is observed, what to predict (the label or target) and which metric to optimize.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/ml-problem-framing.html
  - id: data-processing
    text: Data processing covers data collection and data preparation; preparation includes preprocessing and feature engineering, with exploratory data analysis (EDA) to understand the data and check its quality.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/data-processing.html
  - id: same-steps
    text: The same data processing steps applied to the training data must also be applied to inference requests.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/data-processing.html
  - id: feature-engineering
    text: Feature engineering selects and transforms variables (features) for a model, through feature creation, transformation, extraction (dimensionality reduction such as PCA) and selection.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/feature-engineering.html
  - id: development
    text: Model development consists of building, training, tuning and evaluating the model; deployment then serves predictions (inference), and monitoring watches the model in production.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lifecycle.html
cards:
  - id: ml-lifecycle-001
    q: Put the Well-Architected ML lifecycle phases in order - deployment, data processing, business goal identification, monitoring, ML problem framing, model development.
    a: Business goal identification, ML problem framing, data processing, model development, deployment, monitoring.
    facts: [phases]
  - id: ml-lifecycle-002
    q: Which phase of the ML lifecycle should decide whether ML is the right approach at all?
    a: Business goal identification, together with problem framing. Some problems are better solved with simple business rules.
    facts: [business-goal, not-ml]
  - id: ml-lifecycle-003
    q: A company must always produce the same exact result from a fixed formula, such as a tax calculation. Is ML a good fit?
    a: "No. Rules give an exact, repeatable answer; ML gives a prediction that can be wrong.\nUse ML when patterns must be learned from data."
    trap: true
    facts: [not-ml]
  - id: ml-lifecycle-004
    q: A data scientist plots distributions and checks for missing values before training. Which activity is this?
    a: Exploratory data analysis (EDA), part of data preparation in the data processing phase.
    facts: [data-processing]
  - id: ml-lifecycle-005
    q: A team derives "building age" from a construction date column before training a model. What is this called?
    a: Feature engineering (feature creation), which builds better input variables from raw data.
    facts: [feature-engineering]
  - id: ml-lifecycle-006
    q: A model scores well in testing but badly in production, and the team finds the training data was normalized while live requests are not. Which rule was broken?
    a: The same data processing steps used for training must also run on inference requests.
    facts: [same-steps]
  - id: ml-lifecycle-007
    q: In which ML lifecycle phase do you choose the label to predict and the metric to optimize?
    a: ML problem framing.
    facts: [framing]
---
An ML project isn't a single training run. It's a loop: agree on the business goal, frame it as a prediction, prepare data, build a model, deploy it, and watch it, feeding what you learn back into earlier phases.

### How it works

1. **Business goal:** define the problem, the value and how you'll measure it. Ask whether ML is needed at all.
2. **Problem framing:** decide what to predict (the target) from which inputs, and the metric to optimize.
3. **Data processing:** collect data, clean it, explore it (EDA) and engineer features.
4. **Model development:** pick an algorithm, train, tune hyperparameters and evaluate.
5. **Deployment:** serve the model so applications get predictions (inference).
6. **Monitoring:** watch data and quality in production and retrain when they drift.

### Exam cues

- If the question says a fixed rule gives the exact answer, or there's too little data, think "ML isn't appropriate", because the lens says rules can beat ML.
- If the question says understand the data with charts and summary statistics, think exploratory data analysis.
- If the question says create, transform or select input variables, think feature engineering.

### Remember

- Six phases, in a loop: goal, framing, data, development, deployment, monitoring.
- Data processing = collection + preparation (preprocessing and feature engineering).

> **Trap:** Training is not the first step. Business goal identification comes first and is the most important phase.
