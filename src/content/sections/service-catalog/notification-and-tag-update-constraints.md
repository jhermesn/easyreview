---
title: Notification and tag update constraints
level: associate
order: 40
facts:
  - id: notification
    text: A notification constraint selects an SNS topic to receive CloudFormation stack event notifications.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-notification.html#constraints-notification
  - id: subscription
    text: To receive email notifications from the SNS topic, create an email subscription and confirm it.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-notification.html#constraints-notification
  - id: notification-support
    text: Notification constraints do not support Terraform Open Source or Terraform Cloud products.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-notification.html#constraints-notification
  - id: tag-update
    text: A tag update constraint allows or disallows end-user tag updates on resources associated with a provisioned product.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-resourceupdate.html#constraints-resourceupdate
  - id: update-time
    text: When tag updates are allowed, new product or portfolio tags reach provisioned resources during a provisioned product update.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-resourceupdate.html#constraints-resourceupdate
  - id: tag-update-support
    text: Tag update constraints do not support Terraform Open Source products.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-resourceupdate.html#constraints-resourceupdate
  - id: topic-definition
    text: An SNS topic is a communication channel that delivers published messages to subscribers.
    source: https://docs.aws.amazon.com/sns/latest/dg/welcome.html#welcome
  - id: tag-definition
    text: A tag is a key-value label attached to a resource.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions.html#tagoptions
cards:
  - id: service-catalog-008
    q: Which AWS Service Catalog constraint sends CloudFormation stack events to an SNS topic?
    a: A notification constraint. It is not supported for Terraform Open Source or Terraform Cloud products.
    facts:
      - notification
      - notification-support
  - id: service-catalog-009
    q: What does an AWS Service Catalog tag update constraint control?
    a: Whether users can update tags on provisioned resources. When allowed, new product or portfolio tags are applied during a provisioned product update.
    facts:
      - tag-update
      - update-time
  - id: service-catalog-027
    q: An operations team needs email notifications about AWS Service Catalog CloudFormation stack events. What should it configure?
    a: Create an SNS topic and a confirmed email subscription, then attach a notification constraint naming the topic.
    facts:
      - notification
      - subscription
  - id: service-catalog-028
    q: An administrator adds portfolio tags, but existing AWS Service Catalog resources still have their old tags. What should the team do?
    a: Allow tag updates with a tag update constraint and update the provisioned product. New tags are applied during that update.
    trap: true
    facts:
      - tag-update
      - update-time
---
Notification constraints deliver stack events to Amazon Simple Notification Service (SNS). Tag update constraints control whether tag changes can reach resources in an existing provisioned product. A tag is a key-value label attached to a resource.

### How it works

1. For stack notifications, create an SNS topic, a named destination to which subscribers can receive messages. For email delivery, add and confirm an email subscription.
2. Add a notification constraint to the product in its portfolio and select the topic.
3. For resource tag changes, add a tag update constraint and allow or disallow user tag updates.
4. When updates are allowed, update the provisioned product to apply new tags associated with its product or portfolio.

### Exam cues

- If the question says email the operations team about catalog stack events, think notification constraint and confirmed SNS subscription, because the constraint chooses the event destination.
- If the question says new portfolio tags have not reached running resources, think tag update constraint and provisioned product update, because that update applies the new tags.

### Remember

- Notification constraints do not support Terraform Open Source or Terraform Cloud products.
- Tag update constraints do not support Terraform Open Source products.
- Allowing tag updates and performing a product update are separate actions.

> **Trap:** A notification constraint sends stack events. A tag update constraint governs resource tags; it does not configure an event destination.
