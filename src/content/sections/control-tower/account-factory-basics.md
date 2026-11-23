---
title: Account Factory basics
level: associate
order: 25
facts:
  - id: template
    text: Account Factory uses a configurable template to standardize new accounts with pre-approved configurations.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#features
  - id: landing-zone
    text: Account Factory is how a Control Tower landing zone creates new member accounts.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
  - id: controls
    text: Account Factory automates the application of controls and policies to accounts it creates.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#related-services
  - id: organizations
    text: AWS Control Tower uses AWS Organizations to manage and create accounts.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#related-services
cards:
  - id: control-tower-038
    q: A company needs new AWS accounts with a standard configuration in its AWS Control Tower landing zone. Which feature should it use?
    a: Account Factory. It standardizes account provisioning with a configurable template.
    facts: [template, landing-zone]
  - id: control-tower-039
    q: A team wants to create governed AWS accounts through AWS Control Tower. Does Account Factory replace AWS Organizations?
    a: No. Control Tower uses AWS Organizations to manage and create accounts, while Account Factory automates provisioning and applies controls.
    facts: [organizations, controls]
    trap: true
---
AWS Control Tower Account Factory provisions new accounts in a landing zone, a governed multi-account environment. It uses a standard account configuration and applies controls.

### How it works

1. Configure the Account Factory template for new accounts.
2. An administrator requests an account in the landing zone.
3. Control Tower uses AWS Organizations to create the account. Account Factory automates the application of controls and policies.

### Exam cues

- If the question says provision new accounts with a standard configuration, think AWS Control Tower Account Factory, because it uses a configurable account template.
- If the question says create governed accounts in a Control Tower landing zone, think Account Factory with AWS Organizations, because Control Tower uses Organizations to manage and create accounts.

### Remember

- Account Factory provisions landing zone accounts and automates the application of controls.

> **Trap:** Account Factory works with AWS Organizations. It does not replace Organizations.
