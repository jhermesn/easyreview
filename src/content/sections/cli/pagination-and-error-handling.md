---
title: Pagination and error handling
level: associate
order: 10
facts:
  - id: no-paginate
    text: The --no-paginate option stops automatic token following and returns only the first service
      page.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-nopaginate
  - id: order
    text: If a service changes item order, different --page-size and --max-items values can cause
      missing or duplicate results; align them or retrieve the complete list.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html
  - id: retry-default
    text: AWS CLI v2 uses standard retry mode by default, with two retries after the initial call for
      three total attempts.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-modes-standard.title
  - id: attempt-config
    text: AWS_RETRY_MODE and AWS_MAX_ATTEMPTS configure retry behavior; max_attempts includes the
      initial call.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-configure
  - id: authorization
    text: Access denied errors require checking identity and permissions; invalid command parameters
      require correcting syntax or values.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html
  - id: syntax-code
    text: CLI return code 252 indicates invalid command syntax, an unknown parameter or an incorrect
      parameter value that prevents execution.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html
  - id: config-code
    text: CLI return code 253 indicates invalid environment or configuration, including missing
      credentials.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html
  - id: service-code
    text: CLI return code 254 indicates the request reached the service and the service returned an
      error.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html
  - id: s3-codes
    text: For S3 transfer commands, code 1 indicates a failed transfer and code 2 can indicate skipped
      files; code 2 also represents command parsing failures.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html
  - id: debug
    text: The --debug option shows processing details including parameter parsing, requests, raw
      responses and formatted output.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html#general-debug
diagrams:
  - id: cli-pagination
    title: The CLI follows service pages
    width: 800
    height: 190
    nodes:
      - id: request
        label: CLI request
        icon: command-line-interface
        tone: devtools
        x: 30
        y: 60
        w: 210
        h: 86
      - id: page
        label: Service page
        icon: res-server
        tone: neutral
        x: 295
        y: 60
        w: 210
        h: 86
      - id: next
        label: Next CLI request
        icon: command-line-interface
        tone: devtools
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: request
        to: page
        step: 1
      - from: page
        to: next
        step: 2
    steps:
      - Fetch page
      - Follow continuation
cards:
  - id: cli-006
    q: An AWS CLI command returns an access denied error during an infrastructure deployment. What
      should the team check?
    a: Check the caller identity and permissions.
    facts:
      - authorization
---
The AWS Command Line Interface (CLI) reports errors that help identify why a command failed. For an access denied error, check the caller's identity and permissions. [Troubleshooting AWS CLI errors](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html)

### How it works

1. Check the command's [return code](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html), the process status reported to the script, and inspect the error details.
2. For access denied, check the caller's identity and permissions. For invalid parameters, correct the syntax or values.
3. Use [`--debug`](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html#general-debug) to inspect processing details, including parameter parsing, requests and responses.

### Exam cues

- If a deployment command returns access denied, think check the caller's identity and permissions, because the error points to an access problem.
- If a command has invalid parameters, think correct the syntax or values, because the request needs correction.

### Remember

- Return code `252` indicates invalid syntax or parameters; `253` indicates an invalid environment or configuration; `254` means the service returned an error. [Return codes](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html)
- For S3 transfers, code `1` indicates a failed transfer, while code `2` can indicate skipped files.

> **Trap:** Return code `2` can also mean a command parsing failure; its meaning depends on the command.
