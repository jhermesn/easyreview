---
title: "PLACEHOLDER cli/operations-in-depth"
level: professional
order: 20
facts:
  - id: auto-pages
    text: For supported paginated list commands, the AWS CLI retrieves all pages by default using the
      service-specific default page size.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-serverside
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
  - id: pager
    text: AWS CLI v2 uses a client-side display pager by default; --no-cli-pager disables that display
      pager without disabling API pagination.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-clientside
  - id: retry-errors
    text: Standard mode retries supported transient connection and timeout errors, throttling errors,
      and HTTP 500, 502, 503 and 504 responses.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-modes-standard.title
  - id: backoff
    text: Standard retry mode uses exponential backoff with a base factor of two and a maximum backoff
      of 20 seconds.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-retries.html#cli-usage-retries-modes-standard.title
  - id: success-code
    text: CLI return code 0 indicates command success with no CLI or service errors.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-returncodes.html
cards:
  - id: cli-001
    q: A script uses the AWS CLI to inventory resources across a paginated list operation. Does it
      need to request each page manually?
    a: No. For supported paginated list commands, the AWS CLI retrieves all pages by default.
    facts:
      - auto-pages
  - id: cli-002
    q: An AWS CLI inventory times out while retrieving a large list. How can the team reduce the
      size of each service request?
    a: Reduce the service page size. The CLI can still retrieve the complete list across multiple
      requests.
    facts:
      - page-size
  - id: cli-003
    q: An AWS CLI automation needs to process a limited batch of list results and continue later.
      What should it retain?
    a: Retain the returned continuation token and use it to resume the listing.
    facts:
      - max-items
      - starting-token
  - id: cli-004
    q: A team disables the AWS CLI display pager in an inventory script. Does this stop automatic
      retrieval of service pages?
    a: No. The display pager and API pagination are separate. Disabling the display pager does not
      disable pagination.
    trap: true
    facts:
      - pager
  - id: cli-005
    q: An AWS CLI automation encounters a temporary service throttling error. What built-in behavior
      can help?
    a: Standard retry mode retries supported throttling and transient errors with exponential
      backoff.
    facts:
      - retry-errors
      - backoff
  - id: cli-007
    q: An AWS CLI automation checks whether a command completed without CLI or service errors. Which
      return code indicates success?
    a: Return code 0 indicates success without CLI or service errors.
    facts:
      - success-code
  - id: cli-008
    q: An AWS CLI automation receives a transient connection error. How does standard retry mode
      space its retry attempts?
    a: It uses exponential backoff between retries.
    facts:
      - retry-errors
      - backoff
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
