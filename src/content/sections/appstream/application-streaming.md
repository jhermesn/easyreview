---
title: Application streaming
level: foundational
order: 10
facts:
  - id: rename
    text: Amazon AppStream 2.0 is now named Amazon WorkSpaces Applications.
    source: https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html#what-is-appstream
  - id: purpose
    text: Amazon WorkSpaces Applications is a fully managed application streaming service that gives users instant access to their desktop applications from anywhere, scaling automatically.
    source: https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html#what-is-appstream
  - id: browser
    text: Users stream applications through a client or an HTML5-capable web browser, and administrators maintain a single version of each application.
    source: https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html#what-is-appstream
cards:
  - id: appstream-001
    q: A university wants students to use engineering software from any browser without installing it. Which AWS service fits?
    a: Amazon AppStream 2.0, now named Amazon WorkSpaces Applications, which streams desktop applications.
    facts: [purpose, browser, rename]
  - id: appstream-002
    q: What is the difference between Amazon WorkSpaces and Amazon AppStream 2.0?
    a: WorkSpaces provides full virtual desktops; AppStream 2.0 (WorkSpaces Applications) streams individual applications.
    facts: [purpose]
  - id: appstream-003
    q: Must every user install each application locally to use it with Amazon AppStream 2.0?
    a: No. Applications run on AWS and stream to the user's browser or client; one version is maintained centrally.
    trap: true
    facts: [browser]
---
Amazon WorkSpaces Applications, formerly AppStream 2.0, runs desktop applications on AWS and streams them to users' browsers or clients. Users get the app without installing it, and IT keeps one version up to date. [What Is Amazon WorkSpaces Applications?](https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html#what-is-appstream)

### How it works

1. Install the applications once in an image.
2. The service runs them on AWS and scales capacity automatically.
3. Users open them in a browser or client, from any device.

### Exam cues

- If the question says stream individual desktop applications to users, think AppStream 2.0 (WorkSpaces Applications).

### Remember

- Renamed Amazon WorkSpaces Applications.

> **Trap:** Streaming one application is AppStream 2.0; a full persistent desktop is Amazon WorkSpaces.
