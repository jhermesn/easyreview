---
title: Quotas and increases
level: foundational
order: 10
facts:
  - id: purpose
    text: Service Quotas lets you view and manage quotas for AWS services from a central location.
    source: https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html#intro
  - id: definition
    text: Quotas, also called limits, are the maximum values for the resources, actions and items in an AWS account; each service defines its quotas and defaults, which apply to an account, a resource or a Region.
    source: https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html#intro
  - id: increase
    text: If default quotas don't meet business needs, Service Quotas lets you request increases, which Support can approve, deny or partially approve.
    source: https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html#intro
  - id: adjustable
    text: The Service Quotas console shows whether each quota is adjustable.
    source: https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html#intro
  - id: support-case
    text: Service limit increase requests can also be opened as cases in AWS Support by all customers, including Basic Support.
    source: https://docs.aws.amazon.com/awssupport/latest/user/case-management.html#case-management
cards:
  - id: service-quotas-001
    q: A company hits the maximum number of EC2 instances allowed in its account. Where does it see the limit and ask for more?
    a: In Service Quotas, which shows quotas centrally and submits increase requests.
    facts: [purpose, increase]
  - id: service-quotas-002
    q: What is an AWS service quota?
    a: The maximum value for a resource, action or item in an AWS account, also called a limit. Each service sets its defaults.
    facts: [definition]
  - id: service-quotas-003
    q: Can every AWS service quota be raised by request?
    a: No. Only adjustable quotas can be raised; the Service Quotas console shows which ones are adjustable.
    trap: true
    facts: [adjustable]
  - id: service-quotas-004
    q: Does a company need a paid AWS Support plan to request a service quota increase?
    a: No. Quota increases are available to all customers, through Service Quotas or a Support case, even on Basic.
    facts: [support-case, increase]
---
Every AWS account has quotas, also called limits, on how many resources and actions it can use. Defaults protect accounts and AWS capacity; Service Quotas shows them and asks for more. [What is Service Quotas?](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html#intro)

### How it works

1. Open Service Quotas and pick a service to see its quotas and current values.
2. Check whether the quota is adjustable.
3. Request an increase; AWS Support approves, denies or partially approves it.

### Exam cues

- If the question says a limit stops resource creation, think Service Quotas increase request.
- If the question says see all limits in one place, think Service Quotas.

### Remember

- Quotas are per account, and many are per Region.
- Increases are available on every support plan, including Basic.

> **Trap:** Some quotas are fixed. Not every limit can be raised, so check the Adjustable column first.
