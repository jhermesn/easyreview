---
title: "CloudFront basics"
level: foundational
order: 5
facts:
  - id: cdn
    text: "Amazon CloudFront speeds up delivery of static and dynamic web content by serving it from a worldwide network of edge locations."
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction
cards:
  - id: cloudfront-058
    q: "Users around the world load a website's images slowly from one Region. Which service reduces the latency?"
    a: "Amazon CloudFront, which caches content at edge locations near users."
    facts: [cdn]
---
Amazon CloudFront is AWS's content delivery network (CDN): copies of content are served from edge locations close to users. [What is Amazon CloudFront?](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction)

### How it works

1. A user requests content.
2. The nearest edge location serves it if cached.
3. Otherwise it fetches from the origin, caches and returns it.

### Exam cues

- If the question says low latency content delivery to global users, think CloudFront.

### Remember

- Edge locations worldwide.

> **Trap:** CloudFront caches content; Global Accelerator speeds up network paths without caching.
