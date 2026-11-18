---
title: "Global Accelerator basics"
level: foundational
order: 5
facts:
  - id: accelerators
    text: "AWS Global Accelerator creates accelerators that improve the performance of applications for local and global users."
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html#what-is-global-accelerator
cards:
  - id: global-accelerator-012
    q: "A global TCP and UDP application needs better performance and fixed entry points worldwide. Which service fits?"
    a: "AWS Global Accelerator."
    facts: [accelerators]
---
AWS Global Accelerator sends users onto the AWS global network close to them to improve application performance. [What is AWS Global Accelerator?](https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html#what-is-global-accelerator)

### How it works

1. Create an accelerator.
2. Add application endpoints in one or more Regions.
3. Users connect through it to a healthy endpoint.

### Exam cues

- If the question says improve global application performance without caching, think Global Accelerator.

### Remember

- Accelerators for local and global users.

> **Trap:** Global Accelerator does not cache content; CloudFront does.
