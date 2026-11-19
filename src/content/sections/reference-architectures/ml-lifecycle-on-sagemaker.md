---
title: The ML lifecycle on SageMaker AI
level: foundational
order: 8
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
  - id: training
    text: Training gives an algorithm the training data, an objective metric to optimize and hyperparameters that control the training process.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-training-and-tuning.html
  - id: hyperparameters
    text: Hyperparameters are settings that control how an algorithm learns, such as learning rate, number of epochs and hidden layers; hyperparameter tuning searches for the best values.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-training-and-tuning.html
  - id: holdout
    text: In offline evaluation, a holdout set that was never used for training or validation measures the errors of the final model.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-evaluation.html
  - id: overfitting
    text: An overfit model predicts the training data well but performs poorly on new data; it shows high variance. An underfit model is inaccurate on both training and test data; it shows high bias.
    source: https://aws.amazon.com/what-is/overfitting/
  - id: data-wrangler
    text: SageMaker Data Wrangler imports, prepares, transforms, featurizes and analyzes data for ML; it is now integrated into SageMaker Canvas, with a natural language interface as well as a visual one.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html
  - id: feature-store
    text: Amazon SageMaker Feature Store creates, stores and shares features, the transformed inputs for ML models, for training and inference across teams and accounts.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html
  - id: pipelines
    text: A SageMaker AI pipeline is a series of connected steps in a directed acyclic graph (DAG), built with a drag-and-drop UI or the Pipelines SDK, that automates ML workflows.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines-overview.html
  - id: registry
    text: SageMaker Model Registry catalogs models for production and manages model versions.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html
  - id: registry-approval
    text: In SageMaker Model Registry, setting a model version's approval status to Approved can trigger CI/CD deployment; the status can be set manually or by a condition step in a pipeline.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html#model-registry-approve
  - id: model-monitor
    text: SageMaker Model Monitor watches models in production for drift in data quality, model quality (such as accuracy), bias and feature attribution, on real-time endpoints or batch transform jobs.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
  - id: monitor-closed
    text: SageMaker Model Monitor is no longer open to new customers; existing customers can keep using it, but no new features are planned.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
  - id: drift
    text: Data drift is a significant change in input data compared with the training data; concept drift is a change in the properties of the target; both degrade a model and trigger retraining.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/monitoring.html
  - id: mlflow
    text: Fully managed MLflow on SageMaker AI tracks experiments and monitors the performance of models and AI applications in one tool.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html#mlflow
  - id: real-time
    text: SageMaker AI real-time inference suits interactive workloads with low-latency requirements.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html#deploy-model-additional
  - id: serverless
    text: SageMaker AI Serverless Inference deploys models without managing infrastructure and suits workloads with idle periods between traffic spurts that can tolerate cold starts.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html#deploy-model-additional
  - id: async
    text: Asynchronous inference queues requests and processes them asynchronously, for payloads up to 1 GB, processing times up to one hour and near real-time latency needs.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html#deploy-model-additional
  - id: batch
    text: Batch transform gets inferences for large datasets when you don't need a persistent endpoint, and can also preprocess datasets.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/batch-transform.html#batch-transform
  - id: ops-burden
    text: Amazon Bedrock has the lowest operational burden, SageMaker AI manages instances while you manage the model stack, and self-managed EC2, EKS or ECS gives full control and full responsibility; choose the most managed option that gives the control you need.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#consider
diagrams:
  - id: ml-lifecycle-on-sagemaker
    title: Data becomes features, a trained model becomes an endpoint, and drift starts a retraining run
    facts: [phases, business-goal, not-ml, data-processing, same-steps, feature-engineering, development, training, hyperparameters, holdout, overfitting, data-wrangler, feature-store, pipelines, registry, registry-approval, model-monitor, monitor-closed, drift, mlflow, real-time, serverless, async, batch, ops-burden]
    width: 1240
    height: 660
    groups:
      - { label: Region, x: 200, y: 20, w: 1020, h: 620, tone: neutral, icon: group-region }
    nodes:
      - { id: s3, label: S3 bucket, sub: collected data, x: 240, y: 90, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: wrangler, label: Data Wrangler, sub: prepare and featurize, x: 460, y: 90, w: 160, h: 86, tone: integration, icon: sagemaker-ai, info: "Now part of SageMaker Canvas. Its data quality report shows issues such as missing values and outliers." }
      - { id: fs, label: Feature Store, sub: shared features, x: 680, y: 90, w: 160, h: 86, tone: database, icon: sagemaker-ai }
      - { id: train, label: Training job, sub: hyperparameters, x: 900, y: 90, w: 160, h: 86, tone: compute, icon: sagemaker-ai, info: "Evaluated on a holdout set it never saw; a large gap between training and test accuracy means overfitting." }
      - { id: pipe, label: SageMaker Pipelines, sub: repeatable DAG, x: 900, y: 280, w: 170, h: 86, tone: devtools, icon: sagemaker-ai }
      - { id: registry, label: Model Registry, sub: approved versions, x: 680, y: 280, w: 160, h: 86, tone: devtools, icon: sagemaker-ai }
      - { id: mlflow, label: Managed MLflow, sub: experiments, x: 460, y: 280, w: 160, h: 86, tone: mgmt, icon: sagemaker-ai }
      - { id: users, label: Applications, sub: predictions, x: 20, y: 470, w: 150, h: 86, tone: user, icon: res-users }
      - { id: endpoint, label: Endpoint, sub: real-time inference, x: 680, y: 470, w: 160, h: 86, tone: compute, icon: sagemaker-ai }
      - { id: monitor, label: Model Monitor, sub: drift checks, x: 900, y: 470, w: 160, h: 86, tone: mgmt, icon: sagemaker-ai, info: "No longer open to new customers; existing customers keep using it." }
    edges:
      - { from: pipe, to: train, step: 1 }
      - { from: s3, to: wrangler, step: 2 }
      - { from: wrangler, to: fs, step: 3 }
      - { from: fs, to: train, step: 4 }
      - { from: train, to: mlflow, step: 4 }
      - { from: train, to: registry, step: 5 }
      - { from: registry, to: endpoint, step: 6 }
      - { from: users, to: endpoint, step: 6 }
      - { from: endpoint, to: monitor, step: 7 }
      - { from: monitor, to: pipe, step: 8, dashed: true }
    steps:
      - "A SageMaker pipeline runs the steps below as a repeatable DAG, which is the core of MLOps."
      - "After the business goal and problem framing are settled, collected data lands in S3, and Data Wrangler prepares it: cleaning, transformation and feature engineering."
      - "The features go to Feature Store, so training and inference use the same transformed inputs."
      - "A training job learns from the features with chosen hyperparameters and is evaluated on a holdout set. MLflow tracks each experiment."
      - "The trained model is registered as a new version. Approving it can trigger the deployment."
      - "The approved model runs on a real-time endpoint, and applications call it for low-latency predictions."
      - "Model Monitor compares production data and predictions with the training baseline to detect drift."
      - "If drift is detected, the pipeline runs again to retrain the model on new data."
cards:
  - id: reference-architectures-206
    q: "What are the six phases of the ML lifecycle in the AWS Well-Architected guidance, and which comes first?"
    a: "Business goal identification, ML problem framing, data processing, model development, deployment and monitoring. **Business goal identification** comes first."
    facts: [phases, business-goal]
  - id: reference-architectures-207
    q: "A team wants ML for a problem that simple business rules already solve well. What does the lifecycle guidance say?"
    a: "Not every problem needs ML: when rules do the job, or there is not enough data, ML is the wrong approach."
    trap: true
    facts: [not-ml, business-goal]
  - id: reference-architectures-208
    q: "Training and inference must use exactly the same feature transformations. Which SageMaker AI feature helps?"
    a: "**SageMaker Feature Store**, which stores and shares features for both training and inference."
    facts: [feature-store, same-steps, feature-engineering]
  - id: reference-architectures-209
    q: "A model scores 99% on training data but 70% on new data. What is the problem?"
    a: "**Overfitting**: the model learned the training data too closely. A holdout set shows the gap."
    trap: true
    facts: [overfitting, holdout]
  - id: reference-architectures-210
    q: "Match the SageMaker AI inference option: low-latency interactive calls, traffic with idle periods, large payloads processed within an hour, and a whole dataset at once."
    a: "**Real-time**, **Serverless Inference**, **Asynchronous inference** and **Batch transform**."
    facts: [real-time, serverless, async, batch]
  - id: reference-architectures-211
    q: "A model's accuracy drops months after deployment because customer behavior changed. What is this, and what detects it?"
    a: "**Drift**: production data no longer matches the training data. Monitoring, such as SageMaker Model Monitor, detects it so the model can be retrained."
    facts: [drift, model-monitor, monitor-closed]
  - id: reference-architectures-212
    q: "Which SageMaker AI features make ML work repeatable and governed?"
    a: "**SageMaker Pipelines** automates the steps as a DAG, **Model Registry** versions and approves models, and **managed MLflow** tracks experiments."
    facts: [pipelines, registry, registry-approval, mlflow]
  - id: reference-architectures-213
    q: "A team wants a generative AI model with the least operational work, and another wants full control of the model stack. What fits each?"
    a: "**Amazon Bedrock** has the lowest operational burden (managed API). **SageMaker AI** manages instances while you manage the model; self-managed EC2, EKS or ECS gives full control."
    facts: [ops-burden]
  - id: reference-architectures-214
    q: "Which SageMaker AI tool prepares and featurizes data, and shows missing values and outliers?"
    a: "**SageMaker Data Wrangler**, now part of SageMaker Canvas, with its data quality report."
    facts: [data-wrangler, data-processing]
---
AI Practitioner questions name a stage of a machine learning project and ask which component or AWS feature belongs there. This design follows one model from raw data to a monitored endpoint, with the MLOps loop that retrains it.

### How it works

1. Start with the business goal and problem framing; only then collect data. [ML lifecycle](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lifecycle.html)
2. Data Wrangler prepares the data, and Feature Store keeps the features for training and inference.
3. A training job builds the model, evaluated on a holdout set; MLflow tracks experiments.
4. Model Registry versions the model, and an approved version deploys to an endpoint.
5. Monitoring watches for drift, and SageMaker Pipelines reruns the steps to retrain.

| Lifecycle phase | On AWS |
|---|---|
| Data processing | S3, Data Wrangler, Feature Store |
| Model development | Training jobs, MLflow experiments |
| Deployment | Model Registry, SageMaker AI endpoints |
| Monitoring | Model Monitor, drift checks |
| Automation (MLOps) | SageMaker Pipelines |

| Inference need | Option |
|---|---|
| Interactive, low latency | Real-time endpoint |
| Idle periods between bursts | Serverless Inference |
| Large payloads, long processing | Asynchronous inference |
| Whole dataset, no endpoint | Batch transform |

### Exam cues

- If the question says decide whether ML is needed, think the business goal phase.
- If the question says reuse the same features for training and inference, think Feature Store.
- If the question says great on training data, poor on new data, think overfitting.
- If the question says model quality drops over time, think drift and monitoring.
- If the question says repeatable ML workflows, think SageMaker Pipelines.

### Remember

- Six phases: business goal, framing, data processing, development, deployment, monitoring.
- Overfit: high variance; underfit: inaccurate on training data too.
- Model Monitor is closed to new customers; existing customers keep using it.

> **Trap:** Deploying a model is not the last step. Without monitoring, drift goes unnoticed and accuracy quietly falls.
