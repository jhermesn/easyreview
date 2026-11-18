---
title: Model performance metrics
level: foundational
order: 30
facts:
  - id: accuracy
    text: Accuracy is the share of all items that a classification model labels correctly, from 0 to 1.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: precision
    text: Precision is true positives divided by all positive predictions; it measures how often a positive prediction is right.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: recall
    text: Recall (sensitivity) is true positives divided by all actual positives; it measures how many of the real positives the model finds.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: f1
    text: The F1 score is the harmonic mean of precision and recall, from 0 (worst) to 1 (best).
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: auc
    text: AUC is the area under the ROC curve, which plots the true positive rate against the false positive rate across thresholds; 1 is perfect and 0.5 is no better than random.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: confusion-rmse
    text: A confusion matrix is a common metric for classification models, and root mean squared error (RMSE) is a common metric for regression models.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/model-training-and-tuning.html
  - id: business-metrics
    text: Business metrics such as fraud detection rate, new business acquisition or customer satisfaction should be tied to the technical metric, so model performance maps to a business outcome.
    source: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/business-goal-identification.html
  - id: mae
    text: "Mean absolute error (MAE) is the average absolute difference between predicted and actual values across all values; it measures a regression model's prediction error, and lower is better."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: rmse-outliers
    text: "Root mean squared error (RMSE) is the square root of the averaged squared differences between predicted and actual values; it highlights large errors and outliers."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
  - id: r2
    text: "R2, the coefficient of determination, measures how much of the variance in the target a regression model explains; higher values mean more explained variability, and values near zero mean the model explains very little."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics
cards:
  - id: ml-lifecycle-014
    q: A fraud model must catch as many real fraud cases as possible, even if some legitimate payments get flagged. Which metric should it maximize?
    a: Recall, the share of actual positives the model finds. Missing fraud (false negatives) is the costly error.
    facts: [recall]
  - id: ml-lifecycle-015
    q: A spam filter must almost never put a real email in the spam folder. Which metric matters most?
    a: Precision, the share of positive (spam) predictions that are correct. False positives are the costly error.
    facts: [precision]
  - id: ml-lifecycle-016
    q: Which metric balances precision and recall in a single number?
    a: The F1 score, their harmonic mean.
    facts: [f1]
  - id: ml-lifecycle-017
    q: Why can accuracy mislead on a dataset where only 1% of transactions are fraud?
    a: "A model that always predicts \"not fraud\" is 99% accurate but useless.\nUse precision, recall or F1 for imbalanced classes."
    trap: true
    facts: [accuracy, precision, recall]
  - id: ml-lifecycle-018
    q: Which metric suits a model that predicts house prices, and which suits one that classifies images?
    a: "Regression (prices): RMSE or another error measure.\nClassification (images): accuracy, precision, recall, F1, confusion matrix."
    facts: [confusion-rmse]
  - id: ml-lifecycle-019
    q: "Which model metric measures how often positive predictions are correct?"
    a: "Precision measures the share of positive predictions that are correct."
    facts: [precision]
  - id: ml-lifecycle-020
    q: Besides model metrics such as accuracy, what should an ML project measure to prove value?
    a: Business metrics tied to the goal, such as fraud detection rate, customer satisfaction, cost savings or return on investment.
    facts: [business-metrics]
  - id: ml-lifecycle-022
    q: "A model predicts house prices. Which metrics evaluate it: precision and recall, or MAE, RMSE and R2?"
    a: "MAE, RMSE and R2, because predicting a price is regression. Precision, recall, F1 and the confusion matrix are for classification."
    facts: [mae, rmse-outliers, r2]
  - id: ml-lifecycle-023
    q: "Why should an ML team consider business metrics as well as model performance metrics?"
    a: "Business metrics connect technical model performance to outcomes such as customer satisfaction."
    facts: [business-metrics]
---
Model metrics say how well a model predicts; business metrics say whether that matters. For classification, the confusion matrix counts true and false positives and negatives, and precision, recall and F1 come from it. [Autopilot metrics](https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html#autopilot-metrics)

### How it works

1. Compare predictions against the true labels of a test set.
2. Count true positives (TP), false positives (FP), true negatives (TN) and false negatives (FN): the confusion matrix.
3. Compute metrics from those counts.

| Metric | Formula | Use when |
|---|---|---|
| Accuracy | Correct / all | Classes are balanced |
| Precision | TP / (TP + FP) | False positives are costly |
| Recall | TP / (TP + FN) | False negatives are costly |
| F1 | Harmonic mean of precision and recall | You need both |
| AUC | Area under the ROC curve | Comparing classifiers across thresholds |
| RMSE | Error size for numbers | Regression |

### Exam cues

- If the question says missing a positive case is dangerous (fraud, disease), think recall.
- If the question says false alarms are costly, think precision.
- If the question says balance both or imbalanced classes, think F1.
- If the question says cost per user, ROI or customer feedback, think business metrics, not model metrics.
- If the question says evaluate a model that predicts a number, think MAE, RMSE or R2, not precision or recall.

### Remember

- All of these scores range from 0 to 1; AUC 0.5 is random.
- Confusion matrix for classification; RMSE for regression.

> **Trap:** High accuracy on imbalanced data proves little; always check precision and recall for the rare class.
