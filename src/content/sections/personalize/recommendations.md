---
title: Recommendations
level: foundational
order: 10
facts:
  - id: what
    text: Amazon Personalize is a fully managed ML service that uses your data to generate item recommendations for users and user segments based on their affinity for items.
    source: https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html#what-is-personalize
  - id: use-cases
    text: Common Amazon Personalize uses include video recommendations such as "Top picks for you" and "More like X", and ecommerce recommendations such as "Frequently bought together" and "Customers who viewed X also viewed".
    source: https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html#what-is-personalize
cards:
  - id: personalize-001
    q: An online store wants "Customers who viewed this also viewed" suggestions without building ML models. Which AWS service fits?
    a: Amazon Personalize.
    facts: [what, use-cases]
  - id: personalize-002
    q: A streaming service wants a "Top picks for you" row per viewer. Which AWS service fits?
    a: Amazon Personalize, which generates personalized recommendations from interaction data.
    facts: [use-cases]
  - id: personalize-003
    q: A marketing team wants to find the users most likely to be interested in a new product line. Which Amazon Personalize capability fits?
    a: User segmentation, which groups users by their affinity for items or item attributes.
    facts: [what]
  - id: personalize-004
    q: Does a company need ML expertise to add recommendations with Amazon Personalize?
    a: "No. It's fully managed; you provide interaction and item data, and it trains and serves the recommenders."
    trap: true
    facts: [what]
---
Amazon Personalize builds recommendation systems from your users' interactions, such as views, clicks and purchases, with no ML to write. [What is Amazon Personalize?](https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html)

### How it works

1. Import interaction data (who did what with which item) and optional user and item data.
2. Choose a recommender or custom resource for the use case.
3. Call it from the app to get recommendations or user segments in real time or in batch.

### Exam cues

- If the question says personalized recommendations, "frequently bought together" or "more like this", think Amazon Personalize.
- If the question says find users interested in an item, think Personalize user segments.

### Remember

- Fully managed; uses your own interaction data.
- Recommendations for users, and user segments for items.

> **Trap:** Grouping customers by similarity with no goal is clustering; recommending items to each user from their behavior is Amazon Personalize.
