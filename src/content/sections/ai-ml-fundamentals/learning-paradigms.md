---
title: Supervised, unsupervised and reinforcement learning
level: foundational
order: 20
facts:
  - id: supervised
    text: Supervised learning trains on data whose inputs come with target values (labels).
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html#basic-machine-learning-paradigms
  - id: classification
    text: When the target is categorical the problem is classification, either binary (one of two classes) or multiclass (one of several classes).
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html#basic-machine-learning-paradigms
  - id: regression
    text: When the target is a continuous number the problem is regression, such as predicting a house price from its features.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html#basic-machine-learning-paradigms
  - id: unsupervised
    text: Unsupervised learning works on data without labels and discovers patterns such as groupings in it.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html#algorithms-choose-unsupervised-learning
  - id: unsupervised-tasks
    text: Unsupervised problem types include clustering (grouping similar items), dimension reduction (keeping the most relevant features), anomaly detection (finding rare items such as bank fraud) and density estimation.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html#algorithms-choose-unsupervised-learning
  - id: reinforcement
    text: In reinforcement learning an agent learns by trial and error in an environment, choosing actions to maximize its long-term reward.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html#algorithms-choose-reinforcement-learning
  - id: self-supervised
    text: Foundation models are trained on broad, unlabeled data, learning to predict the next item in a sequence instead of learning from human labels.
    source: https://aws.amazon.com/what-is/generative-ai/
  - id: semi-supervised
    text: "Semi-supervised learning combines a small amount of labeled data with a large amount of unlabeled data: a model partly trained on the labeled data labels the rest (pseudo-labeling), and training continues on both."
    source: https://aws.amazon.com/what-is/machine-learning/
  - id: knn
    text: "The SageMaker AI k-nearest neighbors (k-NN) algorithm classifies a sample with the most frequent label among the k closest points, or for regression returns the average of their values."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/k-nearest-neighbors.html#k-nearest-neighbors
cards:
  - id: ai-ml-fundamentals-007
    q: A bank has past loan records labeled "repaid" or "defaulted" and wants to predict the label for new applicants. Which learning type and problem type fit?
    a: Supervised learning, binary classification. The data has labels and the target is one of two classes.
    facts: [supervised, classification]
  - id: ai-ml-fundamentals-008
    q: A retailer wants to predict next month's sales amount for each store from past data. Which ML problem type is it?
    a: Regression, because the target is a continuous number.
    facts: [regression]
  - id: ai-ml-fundamentals-009
    q: A streaming company wants to group subscribers by similar viewing habits, with no predefined groups. Which ML technique fits?
    a: Clustering, an unsupervised learning technique that finds groupings in unlabeled data.
    facts: [unsupervised, unsupervised-tasks]
  - id: ai-ml-fundamentals-010
    q: A robot learns to walk by trying moves and getting a reward when it stays upright. Which learning type is this?
    a: Reinforcement learning. An agent learns from rewards for its actions in an environment.
    facts: [reinforcement]
  - id: ai-ml-fundamentals-011
    q: Sorting support emails into one of five topics is which classification type?
    a: Multiclass classification. Binary classification has exactly two classes.
    facts: [classification]
  - id: ai-ml-fundamentals-012
    q: Do foundation models need humans to label their pre-training data?
    a: "No. They pre-train on broad unlabeled data by predicting the next item in a sequence (self-supervised).\nLabeled data comes in later, for fine-tuning."
    trap: true
    facts: [self-supervised]
  - id: ai-ml-fundamentals-013
    q: A company has no labels and wants to flag unusual credit card transactions. Which ML approach fits?
    a: Unsupervised anomaly detection, which finds rare items that differ from the rest of the data.
    facts: [unsupervised-tasks]
  - id: ai-ml-fundamentals-027
    q: "A team has a few labeled medical images and many unlabeled ones. Which learning approach uses both?"
    a: "Semi-supervised learning. The model trains on the labeled examples, labels the unlabeled data (pseudo-labeling), and keeps training on both."
    facts: [semi-supervised]
---
A model learns in one of three ways: from labeled examples (supervised), by finding structure in unlabeled data (unsupervised), or from rewards for its actions (reinforcement). The data you have and the answer you want decide which one fits. [Types of algorithms](https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html)

### How it works

1. **Supervised:** every training example has the right answer. A categorical answer is classification; a number is regression.
2. **Unsupervised:** no answers in the data. The model groups (clustering), compresses (dimension reduction) or spots outliers (anomaly detection).
3. **Reinforcement:** an agent acts in an environment, gets rewards or penalties, and learns the actions that pay off over time.
4. **Self-supervised:** foundation models create their own training signal from unlabeled text or images, such as predicting the next word.

| Problem | Target | Learning type |
|---|---|---|
| Binary classification | One of two classes | Supervised |
| Multiclass classification | One of several classes | Supervised |
| Regression | A number | Supervised |
| Clustering | No target, find groups | Unsupervised |
| Anomaly detection | No target, find outliers | Unsupervised |

### Exam cues

- If the question says labeled historical data and a yes/no or category answer, think classification, because the target is categorical.
- If the question says predict an amount, price or count, think regression, because the target is continuous.
- If the question says group customers with no predefined groups, think clustering, because there are no labels.
- If the question says rewards, penalties or trial and error, think reinforcement learning.

### Remember

- Labels present: supervised. Labels absent: unsupervised.
- Clustering, dimension reduction and anomaly detection are unsupervised.

> **Trap:** Predicting one of several categories is still classification (multiclass), not regression, even when the categories are numbered.
