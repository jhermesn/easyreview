---
title: Common algorithms and model families
level: foundational
order: 40
facts:
  - id: linear
    text: The SageMaker AI Linear Learner algorithm learns a linear function for regression or a linear threshold function for classification.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html
  - id: logistic
    text: Logistic regression is a classification algorithm that returns probabilities, which are compared against a threshold to assign a class.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: trees
    text: XGBoost is a gradient-boosted trees algorithm that combines an ensemble of simpler, weaker models.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html
  - id: tree-transparency
    text: Simpler models such as decision trees and linear regression are more transparent and easier to interpret than deep neural networks.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlops01-bp02.html
  - id: kmeans
    text: K-means finds discrete groupings in data, where members of a group are as similar as possible to each other and as different as possible from other groups, such as high-, medium- and low-spending customers.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html
  - id: cnn
    text: Convolutional neural networks (CNNs) use hidden layers that apply convolutions, which makes them very useful for image classification and recognition.
    source: https://aws.amazon.com/what-is/neural-network/
  - id: rnn
    text: Recurrent neural networks (RNNs) process inputs one step at a time in sequence and are used for sequences such as time-series forecasting, as in the SageMaker AI DeepAR algorithm.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html
  - id: multi-label
    text: Multi-label image classification tags an image with every label that applies, and object detection finds and classifies people and objects within an image.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html
cards:
  - id: ai-ml-fundamentals-019
    q: Which neural network type is best known for image classification?
    a: A convolutional neural network (CNN).
    facts: [cnn]
  - id: ai-ml-fundamentals-020
    q: Which neural network type processes sequences one step at a time, for example in time-series forecasting?
    a: A recurrent neural network (RNN), such as the one behind SageMaker AI DeepAR. Transformers later replaced RNNs for most language tasks.
    facts: [rnn]
  - id: ai-ml-fundamentals-021
    q: Which algorithm groups customers into a chosen number of segments by similarity, with no labels?
    a: K-means clustering.
    facts: [kmeans]
  - id: ai-ml-fundamentals-022
    q: A model must predict whether a customer will churn (yes or no) and give a probability. Which classic algorithm fits?
    a: Logistic regression, a classification algorithm that outputs probabilities.
    facts: [logistic]
  - id: ai-ml-fundamentals-023
    q: Which classic algorithm predicts a continuous value, such as price, from a weighted sum of features?
    a: Linear regression (for example, SageMaker AI Linear Learner).
    facts: [linear]
  - id: ai-ml-fundamentals-024
    q: What is the difference between multi-class and multi-label classification?
    a: "Multi-class assigns exactly one class out of several.\nMulti-label assigns every label that applies, so one item can get several."
    facts: [multi-label]
  - id: ai-ml-fundamentals-025
    q: A security team must find and locate every person in thousands of photos. Which computer vision task is this?
    a: Object detection, which locates and classifies objects within an image.
    facts: [multi-label]
  - id: ai-ml-fundamentals-026
    q: Is logistic regression a regression algorithm for predicting numbers?
    a: "No. Despite the name, logistic regression is used for classification."
    trap: true
    facts: [logistic]
---
Classic ML algorithms each fit a problem type, and neural network families each fit a data type. Knowing the pairing answers many "which technique" questions.

### How it works

| Algorithm or family | Problem | Example |
|---|---|---|
| Linear regression | Regression | House price |
| Logistic regression | Classification with probabilities | Churn yes or no |
| Decision trees, XGBoost | Classification or regression on tables | Fraud score |
| K-means | Clustering | Customer segments |
| CNN | Images | Image classification, object detection |
| RNN | Sequences | Time-series forecasting |
| Transformer | Language and more | LLMs |

### Exam cues

- If the question says images, think CNN; sequences over time, think RNN; language at scale, think transformer.
- If the question says segments with no labels, think k-means clustering.
- If the question says yes/no with a probability, think logistic regression.
- If the question says locate objects in an image, think object detection.

### Remember

- Logistic regression classifies; linear regression predicts numbers.
- Multi-label: several labels per item; multi-class: one of several.

> **Trap:** Decision trees are easy to explain but a deep ensemble of trees (XGBoost) is much harder to interpret.
