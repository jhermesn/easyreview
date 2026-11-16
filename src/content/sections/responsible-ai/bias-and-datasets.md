---
title: Bias, fairness and datasets
level: foundational
order: 20
facts:
  - id: representative
    text: Datasets should reflect the real-world conditions and users of the system; look for missing user groups or interaction styles and fill the gaps, especially in fine-tuning and evaluation sets.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/raidp02-bp01.html
  - id: demographics
    text: To minimize unwanted bias, analyze the demographic makeup of datasets for over- and under-represented groups and fill gaps with more data from underrepresented groups or stratified sampling.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/raidp03-bp02.html
  - id: group-fairness
    text: Group fairness is measured by comparing performance metrics such as accuracy, precision and recall across demographic groups and checking the differences against acceptable thresholds.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/rairc03-bp02.html
  - id: paired-tests
    text: Testing pairs of inputs that differ only in a demographic attribute reveals whether demographic factors inappropriately change the output.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/rairc03-bp02.html
  - id: label-quality
    text: Label quality needs controls on human annotators, such as training, inter-rater agreement and checks for annotator bias, and synthetic labels should be validated against human judgment.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/raidp02-bp03.html
  - id: harms
    text: Fairness harms include harms to individuals, such as wrongful denials, and to groups, such as performance that varies across demographic groups.
    source: https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/raibr02-bp01.html
  - id: class-imbalance
    text: Class imbalance is a pre-training bias metric that measures imbalance in the number of members between groups (facets), such as too little data for one age group.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-measure-data-bias.html
  - id: clarify
    text: SageMaker Clarify detects bias in pre-training data and in model predictions and explains predictions with feature attributions; it is no longer open to new customers.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html
cards:
  - id: responsible-ai-008
    q: A face verification model fails much more often for one region's users. Which check finds this?
    a: Subgroup analysis, comparing error rates (accuracy, precision, recall) across groups against acceptable thresholds.
    facts: [group-fairness, harms]
  - id: responsible-ai-009
    q: A training dataset has 90% of its examples from one age group. What is the problem and how do you fix it?
    a: Class imbalance (under-representation). Collect more data for the underrepresented groups or use stratified sampling.
    facts: [class-imbalance, demographics]
  - id: responsible-ai-010
    q: Name three characteristics of a dataset that supports fair models.
    a: "Any three of: representative of real users, diverse and inclusive across groups, balanced, accurately labeled, curated from relevant sources."
    facts: [representative, demographics, label-quality]
  - id: responsible-ai-011
    q: How can a team test whether a hiring model is biased by gender?
    a: Send pairs of identical applications that differ only in gender and check whether the outputs change.
    facts: [paired-tests]
  - id: responsible-ai-012
    q: Different annotators label the same images inconsistently. Which responsible AI practice addresses this?
    a: Label quality control - annotator training, clear guidelines, inter-rater agreement and expert review of disagreements.
    facts: [label-quality]
  - id: responsible-ai-013
    q: Which SageMaker AI capability was built to detect bias in data and predictions and explain predictions?
    a: SageMaker Clarify. It's no longer open to new customers.
    facts: [clarify]
  - id: responsible-ai-014
    q: Does removing the gender column from training data guarantee a fair model?
    a: "No. Other features can stand in for it, so measure outcomes across groups instead of assuming fairness."
    trap: true
    facts: [group-fairness, paired-tests]
---
Bias usually enters through data: groups that are missing or underrepresented, labels that carry annotators' assumptions, or examples that don't match real users. It shows up as a model that works well for some groups and badly for others. [Minimize unwanted bias](https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/raidp03-bp02.html)

### How it works

1. **Plan representative data:** compare datasets with the real users and use cases; fill gaps.
2. **Check balance:** measure each group's share (class imbalance) and add data or use stratified sampling.
3. **Control labels:** train annotators, measure agreement and look for annotator bias.
4. **Measure outcomes:** compare accuracy, precision and recall across groups (subgroup analysis) and test paired inputs.
5. **Keep auditing:** human audits and monitoring in production catch bias that appears later.

### Exam cues

- If the question says the model performs worse for one group, think subgroup analysis and unrepresentative data.
- If the question says one group has far fewer examples, think class imbalance; collect or augment data.
- If the question says inconsistent labels, think label quality controls.
- If the question says detect bias and explain predictions on SageMaker AI, think SageMaker Clarify.

### Remember

- Fair datasets are representative, diverse, balanced and well labeled.
- Measure fairness by comparing metrics across groups.

> **Trap:** Overall accuracy can hide unfairness. A model can be 95% accurate overall and fail most often for a small group.
