---
title: MLOps, monitoring and governance
level: foundational
order: 50
facts:
  - id: pipelines
    text: A SageMaker AI pipeline is a series of connected steps in a directed acyclic graph (DAG), built with a drag-and-drop UI or the Pipelines SDK, that automates ML workflows.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines-overview.html
  - id: registry
    text: SageMaker Model Registry catalogs models for production and manages model versions.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html
  - id: model-monitor
    text: SageMaker Model Monitor watches models in production for drift in data quality, model quality (such as accuracy), bias and feature attribution, on real-time endpoints or batch transform jobs.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
  - id: monitor-closed
    text: SageMaker Model Monitor is no longer open to new customers; existing customers can keep using it, but no new features are planned.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
  - id: model-cards
    text: SageMaker Model Cards document a model's intended use and risk rating, training details and metrics, evaluation results and other considerations in one place, for governance and responsible AI.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html
  - id: dashboard
    text: SageMaker Model Dashboard brings together model monitoring, model cards, workflow lineage and endpoint performance in one view.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-dashboard.html
  - id: drift
    text: Data drift is a significant change in input data compared with the training data; concept drift is a change in the properties of the target; both degrade a model and trigger retraining.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/monitoring.html
  - id: registry-approval
    text: "In SageMaker Model Registry, setting a model version's approval status to Approved can trigger CI/CD deployment; the status can be set manually or by a condition step in a pipeline."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html#model-registry-approve
  - id: role-manager
    text: "SageMaker Role Manager builds least-privilege roles for ML personas such as data scientists and MLOps engineers, but it is no longer open to new customers."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/role-manager.html#role-manager
  - id: managed-mlflow
    text: "Fully managed MLflow on SageMaker AI tracks experiments and monitors the performance of models and AI applications in one tool."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html#mlflow
cards:
  - id: sagemaker-ai-020
    q: A team must automate data preparation, training, evaluation and registration of models as repeatable steps. Which SageMaker AI feature fits?
    a: SageMaker Pipelines (a DAG of ML workflow steps).
    facts: [pipelines]
  - id: sagemaker-ai-021
    q: An auditor asks for one document per model with its intended use, risk rating, training data and evaluation results. Which SageMaker AI feature fits?
    a: SageMaker Model Cards.
    facts: [model-cards]
  - id: sagemaker-ai-022
    q: A model's accuracy drops months after launch because customer behavior changed. What is this, and what fixes it?
    a: Drift (data or concept drift). Detect it with monitoring and retrain the model on recent, representative data.
    facts: [drift, model-monitor]
  - id: sagemaker-ai-023
    q: Which SageMaker AI feature stores approved model versions ready for deployment?
    a: SageMaker Model Registry.
    facts: [registry]
  - id: sagemaker-ai-024
    q: Which SageMaker AI feature was built to detect data quality, model quality, bias and feature attribution drift in production?
    a: SageMaker Model Monitor. It's no longer open to new customers.
    facts: [model-monitor, monitor-closed]
  - id: sagemaker-ai-025
    q: Is training a model once enough for MLOps?
    a: "No. MLOps means repeatable pipelines, versioned models, monitoring in production and retraining when data drifts."
    trap: true
    facts: [pipelines, drift]
  - id: sagemaker-ai-026
    q: "How does SageMaker Model Registry help teams manage models for production?"
    a: "It catalogs models for production and manages their versions."
    facts: [registry]
---
MLOps applies DevOps habits to ML: automated, repeatable pipelines, versioned models, monitoring in production and retraining when the world changes. SageMaker AI has a tool for each step and for documenting models.

### How it works

| Need | SageMaker AI feature |
|---|---|
| Repeatable training workflows | Pipelines |
| Versioned, approved models | Model Registry |
| Drift and quality in production | Model Monitor |
| Model documentation and risk | Model Cards |
| One view of all models | Model Dashboard |

1. A pipeline prepares data, trains, evaluates and registers a model version.
2. An approved version is deployed.
3. Monitoring compares live data and predictions with the training baseline.
4. Drift triggers retraining through the same pipeline.

### Exam cues

- If the question says repeatable, automated ML workflow, think SageMaker Pipelines.
- If the question says document intended use and risk for governance, think SageMaker Model Cards.
- If the question says performance degrades as data changes, think drift; monitor and retrain.

### Remember

- Model Monitor watches data quality, model quality, bias drift and feature attribution drift.
- Model Monitor is closed to new customers.

> **Trap:** Model Cards document a model; they don't monitor it. Monitoring production behavior is Model Monitor's job.
