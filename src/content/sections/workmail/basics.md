---
title: Business email and calendars
level: foundational
order: 10
facts:
  - id: email-calendar
    text: Amazon WorkMail is a managed business email and calendar service.
    source: https://docs.aws.amazon.com/workmail/latest/adminguide/what_is.html
  - id: clients
    text: WorkMail supports desktop and mobile email clients, including Microsoft Outlook and native iOS and Android email apps.
    source: https://docs.aws.amazon.com/workmail/latest/adminguide/what_is.html
  - id: directory
    text: WorkMail can integrate with an existing corporate directory.
    source: https://docs.aws.amazon.com/workmail/latest/adminguide/what_is.html
  - id: ses
    text: Applications can send email through Amazon Simple Email Service (Amazon SES).
    source: https://docs.aws.amazon.com/ses/latest/dg/send-using-smtp-programmatically.html#send-using-smtp-programmatically
  - id: workspaces
    text: Amazon WorkSpaces provides cloud-based virtual desktops.
    source: https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html#amazon-workspaces
  - id: new-customers
    text: Amazon WorkMail stopped accepting new customers on April 30, 2026.
    source: https://docs.aws.amazon.com/workmail/latest/adminguide/workmail-end-of-support.html#workmail-end-of-support
  - id: end-support
    text: AWS will end support for Amazon WorkMail on March 31, 2027.
    source: https://docs.aws.amazon.com/workmail/latest/adminguide/workmail-end-of-support.html#workmail-end-of-support
cards:
  - id: workmail-001
    q: What does Amazon WorkMail provide?
    a: Managed business email and calendars. It supports existing desktop and mobile clients.
    facts: [email-calendar, clients]
  - id: workmail-002
    q: An existing customer needs business mail and calendars with an existing corporate directory. Which service fits, Amazon WorkMail or Amazon SES?
    a: Amazon WorkMail. It provides business mail and can integrate with an existing directory.
    facts: [email-calendar, directory, ses]
  - id: workmail-003
    q: An application needs to send email. Should its team choose Amazon WorkMail or Amazon SES for sending?
    a: Amazon SES. Applications can use it to send email; WorkMail provides business mail and calendars.
    trap: true
    facts: [ses, email-calendar]
  - id: workmail-004
    q: An existing customer needs cloud desktops for staff. Should it choose Amazon WorkMail or Amazon WorkSpaces?
    a: Amazon WorkSpaces. It provides virtual desktops; WorkMail provides business mail and calendars.
    trap: true
    facts: [workspaces, email-calendar]
  - id: workmail-005
    q: Can a new customer sign up for Amazon WorkMail after April 30, 2026?
    a: No. WorkMail stopped accepting new customers on that date. AWS will end support on March 31, 2027.
    trap: true
    facts: [new-customers, end-support]
---
Amazon WorkMail provides managed business email and calendars. It supports existing email clients and corporate directories.

### How it works

1. An existing customer can integrate WorkMail with a corporate directory, a system that holds user accounts.
2. Users access email and calendars through supported desktop or mobile clients.
3. For application email sending, consider Amazon Simple Email Service (Amazon SES). For virtual desktops, consider Amazon WorkSpaces.

### Exam cues

- If the question says an existing customer needs business email and calendars, think Amazon WorkMail, because it provides both.
- If the question says an application needs to send email, think Amazon SES, because applications can send through it.
- If the question says users need cloud desktops, think Amazon WorkSpaces, because it provides virtual desktops.

### Remember

- WorkMail stopped accepting new customers on April 30, 2026.
- AWS will end WorkMail support on March 31, 2027.

> **Trap:** Amazon WorkMail and Amazon SES both involve email, but WorkMail supplies business mail and calendars while applications can send email through SES.
