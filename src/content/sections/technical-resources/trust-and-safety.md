---
title: Reporting abuse
level: foundational
order: 30
facts:
  - id: report
    text: Suspected abuse of AWS resources is reported through the Amazon AWS abuse form or, for automated reports or if the form can't be used, by email to trustandsafety@support.aws.com.
    source: https://aws.amazon.com/premiumsupport/knowledge-center/report-aws-abuse/
  - id: team
    text: The AWS Trust & Safety team investigates reported incidents, may request more information, shares information only with permission from the party that controls the resource, and mediates between reporters and customers.
    source: https://aws.amazon.com/premiumsupport/knowledge-center/report-aws-abuse/
  - id: types
    text: Trust & Safety handles reports of objectionable web content, spam or abusive email, abusive network activity such as intrusion attempts, DDoS attacks and port scanning, and DMCA copyright requests involving AWS resources.
    source: https://aws.amazon.com/premiumsupport/knowledge-center/report-aws-abuse/
  - id: not-support
    text: AWS Support can't assist with abuse reports or questions about Trust & Safety notifications.
    source: https://aws.amazon.com/premiumsupport/knowledge-center/report-aws-abuse/
  - id: ses-spam
    text: Spam or malicious email sent through Amazon SES is reported to email-abuse@amazon.com.
    source: https://aws.amazon.com/premiumsupport/knowledge-center/report-aws-abuse/
  - id: aup
    text: The AWS Acceptable Use Policy lists uses of AWS services that are prohibited, such as illegal activity, security violations and network abuse.
    source: https://aws.amazon.com/aup/
cards:
  - id: technical-resources-012
    q: A company sees port scans and intrusion attempts coming from an IP address on AWS. Which AWS team should it report this to?
    a: The AWS Trust & Safety team, through the Amazon AWS abuse form or trustandsafety@support.aws.com.
    facts: [report, types]
  - id: technical-resources-013
    q: Can a customer report abuse of AWS resources by opening an AWS Support case?
    a: No. AWS Support can't assist with abuse reports; they go to the AWS Trust & Safety team.
    trap: true
    facts: [not-support, report]
  - id: technical-resources-014
    q: Which kinds of abuse does the AWS Trust & Safety team handle?
    a: Objectionable web content, spam and abusive email, abusive network activity such as DDoS, intrusion attempts and port scans, and DMCA copyright requests.
    facts: [types]
  - id: technical-resources-015
    q: Which AWS document lists the activities that are prohibited on AWS services?
    a: The AWS Acceptable Use Policy. Abuse that breaks it is reported to the AWS Trust & Safety team.
    facts: [aup, report]
---
When an AWS resource is used for abuse, such as spam, attacks or illegal content, anyone can report it to the AWS Trust & Safety team. [Report abuse of AWS resources](https://aws.amazon.com/premiumsupport/knowledge-center/report-aws-abuse/)

### How it works

1. Submit the Amazon AWS abuse form. For automated reports, or if the form doesn't work, email trustandsafety@support.aws.com.
2. Include evidence: IP addresses, timestamps and logs.
3. Trust & Safety investigates and may ask for more information.
4. It mediates between the reporter and the AWS customer behind the resource, and shares information only with that customer's permission.

| Abuse type | Example |
|---|---|
| Objectionable content | A web page or file hosted on AWS |
| Email abuse | Spam sent from an AWS resource |
| Network abuse | DDoS, intrusion attempts, port scanning |
| Copyright | DMCA takedown requests |

### Exam cues

- If the question says AWS resources used for attacks or spam, think AWS Trust & Safety.
- If the question says report abuse, not AWS Support.
- If the question says prohibited uses of AWS, think AWS Acceptable Use Policy, because it lists them.

### Remember

- Abuse form or trustandsafety@support.aws.com.
- Amazon SES spam goes to email-abuse@amazon.com.

> **Trap:** AWS Shield and AWS WAF protect your own resources from attacks; they don't report attackers. Reporting abuse from AWS resources is Trust & Safety's job.
