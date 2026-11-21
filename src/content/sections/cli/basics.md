---
title: "CLI basics"
level: foundational
order: 5
facts:
  - id: command-line
    text: "The AWS Command Line Interface (AWS CLI) is an open-source tool for working with AWS services through commands in a command-line shell."
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html#cli-chap-welcome
cards:
  - id: cli-009
    q: "An administrator wants to script AWS tasks from a terminal. Which tool fits?"
    a: "The AWS Command Line Interface (AWS CLI)."
    facts: [command-line]
---
The AWS CLI controls AWS services with commands from a terminal, which makes tasks easy to script.

### How it works

1. Install and configure the CLI with credentials.
2. Run commands that call AWS APIs.
3. Combine commands in scripts.

### Exam cues

- If the question says commands or scripts from a terminal, think the AWS CLI.

### Remember

- Open-source command-line tool.

> **Trap:** The CLI and the console call the same AWS APIs; the CLI suits automation.
