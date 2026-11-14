---
title: Documentation and guidance
level: foundational
order: 10
facts:
  - id: knowledge-center
    text: For answers to common troubleshooting questions, AWS points customers to the AWS Knowledge Center.
    source: https://docs.aws.amazon.com/awssupport/latest/user/troubleshooting.html#troubleshooting
  - id: repost
    text: AWS re:Post hosts official AWS Knowledge Center articles alongside community questions and articles.
    source: https://aws.amazon.com/premiumsupport/knowledge-center/
  - id: service-troubleshooting
    text: Most AWS service documentation contains troubleshooting topics to start with before contacting AWS Support.
    source: https://docs.aws.amazon.com/awssupport/latest/user/troubleshooting.html#service-troubleshooting
  - id: prescriptive-guidance
    text: AWS Prescriptive Guidance patterns give step-by-step instructions, architecture, tools and code for specific migration, modernization and deployment scenarios, vetted by AWS subject matter experts.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/welcome.html#welcome
  - id: whitepapers
    text: AWS publishes whitepapers and guides, such as the Overview of Amazon Web Services and the Well-Architected Framework, as technical references.
    source: https://aws.amazon.com/whitepapers/
  - id: basic-resources
    text: Every Support plan, including Basic, includes documentation, technical papers and best practice guides.
    source: https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html#features
  - id: security-blog
    text: The AWS Security Blog publishes AWS posts on security topics, threats and practices.
    source: https://aws.amazon.com/blogs/security/
  - id: repost-private
    text: AWS re:Post Private, a private version of re:Post for Enterprise Support customers, reaches end of support on June 30, 2027.
    source: https://docs.aws.amazon.com/repostprivate/latest/caguide/what-is.html#what-is
  - id: architecture-center
    text: The AWS Architecture Center offers reference architecture diagrams, expert guides and best practices.
    source: https://aws.amazon.com/architecture/
cards:
  - id: technical-resources-001
    q: Where should a customer look first for answers to common AWS troubleshooting questions?
    a: The AWS Knowledge Center, whose official articles are on AWS re:Post, and the troubleshooting topics in each service's documentation.
    facts: [knowledge-center, repost, service-troubleshooting]
  - id: technical-resources-002
    q: A team wants step-by-step instructions, architecture and code for migrating a specific workload to AWS. Which AWS resource provides this?
    a: AWS Prescriptive Guidance patterns, vetted by AWS experts.
    facts: [prescriptive-guidance]
  - id: technical-resources-003
    q: Where can a customer read AWS posts about security threats and practices?
    a: The AWS Security Blog.
    facts: [security-blog]
  - id: technical-resources-004
    q: Does a customer need a paid AWS Support plan to read AWS documentation and whitepapers?
    a: No. Documentation, technical papers and best practice guides are available with every plan, including Basic.
    trap: true
    facts: [basic-resources]
  - id: technical-resources-005
    q: Where do AWS questions and community answers live, together with the official Knowledge Center articles?
    a: AWS re:Post.
    facts: [repost]
  - id: technical-resources-016
    q: Where does a solutions architect find AWS reference architecture diagrams?
    a: The AWS Architecture Center.
    facts: [architecture-center]
---
AWS publishes free self-service resources for learning and troubleshooting. Most questions have an answer in one of them before a support case is needed. [Troubleshooting resources](https://docs.aws.amazon.com/awssupport/latest/user/troubleshooting.html#troubleshooting)

### How it works

1. **Documentation** for each service, including troubleshooting topics.
2. **AWS Knowledge Center** articles answer common questions. They live on **AWS re:Post** with community questions and articles. [Knowledge Center](https://aws.amazon.com/premiumsupport/knowledge-center/)
3. **Whitepapers and guides** explain concepts and architectures. [Whitepapers](https://aws.amazon.com/whitepapers/)
4. **AWS Prescriptive Guidance** gives tested patterns for migration, modernization and deployment, with steps and code. [Prescriptive Guidance patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/welcome.html#welcome)
5. **AWS Security Blog** covers security topics and practices. [AWS Security Blog](https://aws.amazon.com/blogs/security/)

| Need | Resource |
|---|---|
| How a service works and its settings | Service documentation |
| Fix a common problem | AWS Knowledge Center on re:Post |
| Ask the community | AWS re:Post |
| Concepts and architecture | Whitepapers and guides |
| Step-by-step migration or deployment recipes | AWS Prescriptive Guidance |
| Security news and practices | AWS Security Blog |

### Exam cues

- If the question says common troubleshooting question, think Knowledge Center.
- If the question says community Q&A, think re:Post.
- If the question says vetted patterns for migration, think Prescriptive Guidance.

### Remember

- All these resources are free, even on Basic Support.
- re:Post Private ends on June 30, 2027.

> **Trap:** re:Post is not a support case. Community answers don't come with a response time; for guaranteed responses open a case under a paid plan.
