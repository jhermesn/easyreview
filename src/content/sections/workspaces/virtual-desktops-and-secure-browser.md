---
title: Virtual desktops and Secure Browser
level: foundational
order: 10
facts:
  - id: workspaces
    text: Amazon WorkSpaces provisions virtual, cloud-based desktops running Microsoft Windows, Ubuntu Linux, Rocky Linux or Red Hat Enterprise Linux, with no hardware to procure.
    source: https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html#amazon-workspaces
  - id: access
    text: Users reach their WorkSpaces virtual desktops from multiple devices or web browsers, and users can be added or removed quickly.
    source: https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html#amazon-workspaces
  - id: personal-pools
    text: WorkSpaces Personal gives persistent desktops for each user, while WorkSpaces Pools serve non-persistent, curated desktops on ephemeral infrastructure.
    source: https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html#amazon-workspaces
  - id: secure-browser
    text: Amazon WorkSpaces Secure Browser, previously Amazon WorkSpaces Web, is a fully managed hosted browser for securely accessing private websites and SaaS applications from a disposable container, with no VPN or client software.
    source: https://docs.aws.amazon.com/workspaces-web/latest/adminguide/what-is-workspaces-secure-browser.html#what-is-workspaces-secure-browser
  - id: secure-browser-closed
    text: Amazon WorkSpaces Secure Browser closed to new customers starting October 29, 2026.
    source: https://docs.aws.amazon.com/workspaces-web/latest/adminguide/what-is-workspaces-secure-browser.html#what-is-workspaces-secure-browser
cards:
  - id: workspaces-001
    q: A company wants to give remote employees full Windows desktops that run in AWS, reachable from any device. Which AWS service fits?
    a: Amazon WorkSpaces, which provisions virtual cloud desktops.
    facts: [workspaces, access]
  - id: workspaces-002
    q: Contractors must open internal web apps from their own laptops without a VPN, in a browser that leaves nothing behind. Which AWS service was built for this?
    a: Amazon WorkSpaces Secure Browser. It closed to new customers on October 29, 2026.
    facts: [secure-browser, secure-browser-closed]
  - id: workspaces-003
    q: What is the difference between WorkSpaces Personal and WorkSpaces Pools?
    a: Personal gives each user a persistent desktop; Pools serve non-persistent, curated desktops on ephemeral infrastructure.
    facts: [personal-pools]
  - id: workspaces-004
    q: Does a company need to buy desktop hardware for each user to use Amazon WorkSpaces?
    a: No. The desktops run in AWS; users connect from devices they already have.
    trap: true
    facts: [workspaces, access]
---
Amazon WorkSpaces puts users' desktops in the cloud. Users connect from laptops, thin clients or browsers to a Windows or Linux desktop that runs on AWS. Amazon WorkSpaces Secure Browser covers lighter needs: secure access to web applications only. [What is Amazon WorkSpaces?](https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html#amazon-workspaces)

### How it works

1. Choose WorkSpaces Personal (persistent desktop per user) or WorkSpaces Pools (non-persistent).
2. Users connect from their devices or a browser.
3. For web-only access, WorkSpaces Secure Browser streams a disposable browser session. [WorkSpaces Secure Browser](https://docs.aws.amazon.com/workspaces-web/latest/adminguide/what-is-workspaces-secure-browser.html#what-is-workspaces-secure-browser)

| Need | Service |
|---|---|
| Full virtual desktop | Amazon WorkSpaces |
| One application streamed to users | Amazon WorkSpaces Applications (AppStream 2.0) |
| Secure access to internal web apps | Amazon WorkSpaces Secure Browser (closed to new customers since October 29, 2026) |

### Exam cues

- If the question says virtual desktops or desktop as a service, think Amazon WorkSpaces.
- If the question says browser-only access to internal web apps without VPN, think WorkSpaces Secure Browser.

### Remember

- Windows and Linux desktops; no hardware to buy.
- Secure Browser was formerly WorkSpaces Web.

> **Trap:** WorkSpaces gives a whole desktop; for one streamed application the answer is AppStream 2.0.
