---
title: Training, overfitting and underfitting
level: foundational
order: 20
facts:
  - id: training
    text: Training gives an algorithm the training data, an objective metric to optimize and hyperparameters that control the training process.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-training-and-tuning.html
  - id: hyperparameters
    text: Hyperparameters are settings that control how an algorithm learns, such as learning rate, number of epochs and hidden layers; hyperparameter tuning searches for the best values.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-training-and-tuning.html
  - id: artifacts
    text: Model artifacts are the output of training, typically the trained parameters, a model definition and metadata.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-training-and-tuning.html
  - id: holdout
    text: In offline evaluation, a holdout set that was never used for training or validation measures the errors of the final model.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-evaluation.html
  - id: overfitting
    text: An overfit model predicts the training data well but performs poorly on new data; it shows high variance. An underfit model is inaccurate on both training and test data; it shows high bias.
    source: https://aws.amazon.com/what-is/overfitting/
  - id: detect
    text: A large gap between accuracy on the training data and on test data indicates overfitting.
    source: https://aws.amazon.com/what-is/overfitting/
  - id: fixes
    text: Ways to reduce overfitting include early stopping, pruning (feature selection), regularization, ensembling and data augmentation; underfitting comes from a model that is too simple or trained too little.
    source: https://aws.amazon.com/what-is/overfitting/
  - id: kfold
    text: K-fold cross-validation splits the training data into k equal folds, trains on k-1 folds and validates on the remaining one, and repeats k times with a different validation fold.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-cross-validation-kfold
cards:
  - id: ml-lifecycle-008
    q: A model reaches 99% accuracy on its training data but 70% on new data. What is happening?
    a: Overfitting. The model memorized the training data (high variance) and doesn't generalize.
    facts: [overfitting, detect]
  - id: ml-lifecycle-009
    q: A model is inaccurate on both the training data and the test data. What is the likely problem?
    a: Underfitting (high bias). The model is too simple or wasn't trained enough to capture the relationship.
    facts: [overfitting, fixes]
  - id: ml-lifecycle-010
    q: Name three techniques that reduce overfitting.
    a: "Any three of: more or augmented training data, regularization, early stopping, feature selection (pruning), ensembling."
    facts: [fixes]
  - id: ml-lifecycle-011
    q: What is the difference between a model's parameters and its hyperparameters?
    a: "Parameters (weights) are learned from the data during training.\nHyperparameters, such as learning rate and epochs, are set before training to control how it learns."
    facts: [hyperparameters, artifacts]
  - id: ml-lifecycle-012
    q: Why should the test (holdout) set never be used during training?
    a: It must measure how the final model does on data it hasn't seen; data used in training would make the score look better than real-world performance.
    facts: [holdout]
  - id: ml-lifecycle-013
    q: What does the bias-variance trade-off describe?
    a: Balancing a model that is too simple (high bias, underfits) against one that is too complex (high variance, overfits).
    facts: [overfitting]
  - id: ml-lifecycle-021
    q: A team has little data and wants a reliable estimate of how its model generalizes. Which validation technique fits?
    a: K-fold cross-validation, which trains and validates k times, each time holding out a different fold.
    facts: [kfold]
---
Training fits a model to data; the real question is whether it works on data it hasn't seen. A model that memorizes its training set overfits, and one that is too simple underfits. [What is overfitting?](https://aws.amazon.com/what-is/overfitting/)

### How it works

1. Split the data: a training set to learn from, a validation set to tune, and a test (holdout) set kept aside for the final check.
2. Train with chosen hyperparameters; the model learns its parameters (weights).
3. Compare training and test scores. Close and high: a good fit. Training high, test low: overfitting. Both low: underfitting.
4. Fix overfitting with more or augmented data, regularization, early stopping or fewer features. Fix underfitting with a more complex model or more training.

| Fit | Training score | Test score | Also called |
|---|---|---|---|
| Underfit | Low | Low | High bias |
| Good fit | High | High | Balanced |
| Overfit | High | Low | High variance |

### Exam cues

- If the question says great on training data, poor on new data, think overfitting, because the model learned noise.
- If the question says poor everywhere, think underfitting.
- If the question asks for settings chosen before training, such as learning rate or epochs, think hyperparameters.

### Remember

- Overfit = high variance; underfit = high bias.
- The holdout set is never used for training or validation.

> **Trap:** Training longer doesn't fix overfitting; it usually makes it worse. Early stopping exists to halt training before the model learns noise.
