---
title: Email sending
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Simple Email Service (SES) is an easy, cost-effective email platform for sending and receiving email using your own email addresses and domains.
    source: https://docs.aws.amazon.com/ses/latest/dg/Welcome.html#Welcome
  - id: send-types
    text: Amazon SES sends marketing emails such as offers, transactional emails such as order confirmations, and newsletters.
    source: https://docs.aws.amazon.com/ses/latest/dg/Welcome.html#Welcome
  - id: receive
    text: Receiving mail with Amazon SES supports solutions such as autoresponders, unsubscribe systems and support tickets created from incoming email.
    source: https://docs.aws.amazon.com/ses/latest/dg/Welcome.html#Welcome
cards:
  - id: ses-001
    q: An online store must send order confirmation emails to customers from its own domain. Which AWS service fits?
    a: Amazon Simple Email Service (SES).
    facts: [purpose, send-types]
  - id: ses-002
    q: Can Amazon SES receive email as well as send it?
    a: Yes. Received email can drive autoresponders, unsubscribe handling or support tickets.
    facts: [receive]
  - id: ses-003
    q: A team needs alerts sent to administrators by email, SMS and to other services when an alarm fires. Is Amazon SES the right service?
    a: No. Fan-out notifications to many endpoint types fit Amazon SNS; SES is for sending and receiving full email from your domains.
    trap: true
    facts: [purpose]
---
Amazon SES sends email at scale, such as marketing campaigns, receipts and newsletters, from your own domains, and can also receive email. [What is Amazon SES?](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html#Welcome)

### How it works

1. Verify your domain or address.
2. Send through the API, SMTP or the console.
3. Optionally receive mail and process it automatically.

| Need | Service |
|---|---|
| Marketing, transactional or bulk email | Amazon SES |
| Notifications fanned out to email, SMS, queues, functions | Amazon SNS |
| Messages between application components | Amazon SQS |

### Exam cues

- If the question says send transactional or marketing email, think Amazon SES.

### Remember

- Send and receive; your own addresses and domains.

> **Trap:** SNS can send an email notification, but bulk and branded email from your domain is SES.
