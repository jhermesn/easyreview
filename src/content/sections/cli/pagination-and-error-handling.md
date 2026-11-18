---
title: Pagination and error handling
level: associate
order: 10
facts:
  - id: auto-pages
    text: For supported paginated list commands, the AWS CLI retrieves all pages by default using the
      service-specific default page size.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-serverside
  - id: no-paginate
    text: The --no-paginate option stops automatic token following and returns only the first service
      page.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-nopaginate
  - id: page-size
    text: The --page-size option changes the items requested per service call without limiting the total
      results retrieved; smaller pages can reduce timeouts.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-pagesize
  - id: max-items
    text: The --max-items option limits items in CLI output and returns a NextToken if more items remain.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-maxitems
  - id: starting-token
    text: Pass the CLI NextToken as --starting-token to resume; do not pass a null or empty starting
      token.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-startingtoken
  - id: order
    text: If a service changes item order, different --page-size and --max-items values can cause
      missing or duplicate results; align them or retrieve the complete list.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html
  - id: pager
    text: AWS CLI v2 uses a client-side display pager by default; --no-cli-pager disables that display
      pager without disabling API pagination.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-clientside
  - id: retry-default
    text: AWS CLI v2 uses standard retry mode by default, with two retries after the initial call for
      three total attempts.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-modes-standard.title
  - id: retry-errors
    text: Standard mode retries supported transient connection and timeout errors, throttling errors,
      and HTTP 500, 502, 503 and 504 responses.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-modes-standard.title
  - id: backoff
    text: Standard retry mode uses exponential backoff with a base factor of two and a maximum backoff
      of 20 seconds.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-modes-standard.title
  - id: attempt-config
    text: AWS_RETRY_MODE and AWS_MAX_ATTEMPTS configure retry behavior; max_attempts includes the
      initial call.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-configure
  - id: authorization
    text: Access denied errors require checking identity and permissions; invalid command parameters
      require correcting syntax or values.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html
  - id: success-code
    text: CLI return code 0 indicates command success with no CLI or service errors.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html
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
The AWS Command Line Interface (CLI) calls AWS services from a terminal or script. Reliable automation must retrieve complete result sets and distinguish temporary failures from requests that need correction. Pagination splits a result set into pages that the CLI retrieves through multiple service calls.

### How it works

1. A supported list command retrieves its first service page, then follows continuation information to retrieve the remaining pages automatically.
2. Choose whether to change request size or output size. `--page-size` changes individual service calls; `--max-items` limits the output batch.
3. Preserve a returned `NextToken` when limiting output. Pass it to `--starting-token` for the next batch. An absent token means no more results; do not send an empty token.
4. Standard retry mode handles supported transient failures, failures that may disappear on another attempt, and throttling, where the service limits request rates. Exponential backoff increases the wait between retries.
5. Check the command's return code, the process status reported to the script, and inspect error details. Correct permissions or invalid input rather than expecting the same request to succeed through retries.

| Option | What it controls |
|---|---|
| `--page-size` | Items requested per service call; still retrieves the full result set |
| `--max-items` | Items included in the output batch |
| `--starting-token` | Where to resume a CLI result batch |
| `--no-paginate` | Stops after the first service page |
| `--no-cli-pager` | Disables the terminal display pager only |

### Exam cues

- If the question says inventory is incomplete after disabling pagination, think remove `--no-paginate`, because it returns only the first page.
- If the question says listing resources times out, think smaller `--page-size`, because each request does less work while the CLI still follows all pages.
- If the question says temporary throttling, think bounded standard retries with backoff, because the service may accept a later request.
- If the question says access denied or invalid parameters, think correct identity, permissions or input, because these are request problems.

### Remember

- AWS CLI v2 standard mode defaults to three attempts in total, including the initial call.
- Standard backoff uses a base factor of two and a maximum delay of 20 seconds.
- `AWS_RETRY_MODE` and `AWS_MAX_ATTEMPTS` configure retries.
- Align `--page-size` and `--max-items` when changing service order could cause missing or duplicate entries.
- `--debug` exposes request processing details for troubleshooting.

| Return code | Meaning |
|---|---|
| 0 | Successful command |
| 1 | An S3 transfer failed |
| 2 | Parsing failure, or skipped files for an S3 transfer |
| 252 | Invalid syntax or parameter prevented execution |
| 253 | Invalid environment or configuration |
| 254 | Service returned an error |

> **Trap:** Turning off the display pager does not truncate API results. Turning off pagination can leave a resource inventory incomplete.
