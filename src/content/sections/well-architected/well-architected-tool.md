---
title: Well-Architected Tool
level: foundational
order: 20
facts:
  - id: tool
    text: The AWS Well-Architected Tool provides a consistent process for measuring an architecture against AWS best practices from the Well-Architected Framework.
    source: https://docs.aws.amazon.com/wellarchitected/latest/userguide/tool.html#tool
  - id: helps
    text: The tool helps document decisions, recommends improvements based on best practices, and guides workloads toward being more reliable, secure, efficient and cost-effective.
    source: https://docs.aws.amazon.com/wellarchitected/latest/userguide/tool.html#tool
  - id: custom-lenses
    text: Custom lenses let you measure a workload against your own best practices, with questions specific to a technology or to your governance needs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/userguide/tool.html#tool
  - id: output
    text: A Well-Architected Tool review is a guided self-review that produces identified risks (high and medium risk issues) and an improvement plan; milestones track progress over time.
    source: https://docs.aws.amazon.com/wellarchitected/latest/userguide/well-architected.html#well-architected
  - id: agent
    text: AWS Well-Architected Agent, in preview as of October 2026, analyzes deployed resources and IaC templates with AI and returns prioritized recommendations, automation scripts and updated templates.
    source: https://docs.aws.amazon.com/wellarchitected/latest/userguide/well-architected.html#well-architected
  - id: audience
    text: Customers use the tool to document architectures, provide product launch governance, and understand and manage the risks in their technology portfolio.
    source: https://docs.aws.amazon.com/wellarchitected/latest/userguide/tool.html#tool
cards:
  - id: well-architected-011
    q: Which AWS service reviews a workload against the AWS Well-Architected Framework and produces an improvement plan?
    a: The AWS Well-Architected Tool. It guides a self-review, lists high and medium risk issues, and builds an improvement plan.
    facts: [tool, output]
  - id: well-architected-012
    q: A company wants AWS Well-Architected reviews to include its own internal standards. What does the AWS Well-Architected Tool offer for this?
    a: Custom lenses, which add your own best practices and questions to the review.
    facts: [custom-lenses]
  - id: well-architected-013
    q: How does the AWS Well-Architected Tool track a workload's progress after a review?
    a: With milestones, point-in-time records of the review that show progress over time.
    facts: [output]
  - id: well-architected-014
    q: Does the AWS Well-Architected Tool change a workload's resources to fix the risks it finds?
    a: No. It is a guided self-review that documents risks and an improvement plan; you make the changes.
    trap: true
    facts: [output, tool]
---
The AWS Well-Architected Tool runs Well-Architected Framework reviews in the AWS console. You answer the questions for a workload, and the tool lists the risks and an improvement plan. [What is AWS WA Tool](https://docs.aws.amazon.com/wellarchitected/latest/userguide/tool.html#tool)

### How it works

1. Define a workload in the tool.
2. Answer the review questions for each pillar. Lenses supply the questions; custom lenses add your own.
3. Read the result: high risk issues (HRIs), medium risk issues (MRIs) and an improvement plan.
4. Save a milestone, make improvements, and review again to track progress. [AWS Well-Architected](https://docs.aws.amazon.com/wellarchitected/latest/userguide/well-architected.html#well-architected)

AWS Well-Architected Agent, in preview as of October 2026, takes another approach: it analyzes deployed resources with AI and proposes fixes. The two can be used together.

### Exam cues

- If the question says review a workload against AWS best practices, think AWS Well-Architected Tool.
- If the question says add company-specific best practices to reviews, think custom lenses.
- If the question says track improvement over time, think milestones.

### Remember

- The tool documents decisions and risks; it does not change resources.
- Results: high and medium risk issues plus an improvement plan.

> **Trap:** The Well-Architected Tool is not AWS Trusted Advisor. Trusted Advisor runs automated checks on your account; the WA Tool guides a review of a workload's design.
