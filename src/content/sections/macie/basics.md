---
title: "Macie basics"
level: foundational
order: 5
facts:
  - id: sensitive-data
    text: "Amazon Macie discovers sensitive data in Amazon S3 using machine learning and pattern matching, and evaluates buckets for security and access risks."
    source: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#what-is-macie
cards:
  - id: macie-013
    q: "A company must find personal data such as credit card numbers stored across its S3 buckets. Which service fits?"
    a: "Amazon Macie."
    facts: [sensitive-data]
---
Amazon Macie finds sensitive data, such as personal information, in Amazon S3 and flags bucket security risks.

### How it works

1. Turn on Macie.
2. It builds an inventory of S3 buckets and checks their security.
3. It discovers sensitive data in objects and reports findings.

### Exam cues

- If the question says find PII or sensitive data in S3, think Macie.

### Remember

- Works on Amazon S3 data.

> **Trap:** Macie looks at data in S3; it is not a threat detector for the whole account (GuardDuty).
