---
title: "CloudHSM basics"
level: foundational
order: 5
facts:
  - id: dedicated-hsm
    text: "AWS CloudHSM provides hardware security modules (HSMs), devices that run cryptographic operations and store keys, under the customer's full control."
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
cards:
  - id: cloudhsm-013
    q: "A regulation requires encryption keys in a single-tenant hardware security module that only the company controls. Which AWS service fits?"
    a: "AWS CloudHSM."
    facts: [dedicated-hsm]
  - id: cloudhsm-014
    q: "Who controls the keys in AWS CloudHSM?"
    a: "The customer, who has full control of the HSM and its keys."
    facts: [dedicated-hsm]
---
AWS CloudHSM gives you your own hardware security modules in AWS for storing keys and running cryptographic operations. [What is AWS CloudHSM?](https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction)

### How it works

1. Create a CloudHSM cluster of HSMs.
2. Your applications use the HSMs to create and use keys.
3. You manage the keys and users on the HSMs.

### Exam cues

- If the question says dedicated hardware security module under the customer's own control, think CloudHSM.

### Remember

- Customer-controlled hardware security modules.

> **Trap:** For most encryption needs AWS KMS is simpler; CloudHSM is for cases that require dedicated HSMs under your control.
