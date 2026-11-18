---
title: "CloudShell basics"
level: foundational
order: 5
facts:
  - id: browser-shell
    text: "AWS CloudShell is a browser-based, pre-authenticated shell launched from the AWS Management Console."
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#welcome
cards:
  - id: cloudshell-010
    q: "A user wants to run AWS CLI commands right from the console without installing anything. What fits?"
    a: "AWS CloudShell, a pre-authenticated shell in the browser."
    facts: [browser-shell]
---
AWS CloudShell opens a command line in the browser, already signed in as the console user. [What is AWS CloudShell?](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#welcome)

### How it works

1. Open CloudShell from the console.
2. It starts with your console credentials.
3. Run CLI commands and scripts.

### Exam cues

- If the question says a shell in the browser with no local setup, think CloudShell.

### Remember

- Pre-authenticated, in the browser.

> **Trap:** CloudShell uses the permissions of the signed-in user; it grants nothing extra.
