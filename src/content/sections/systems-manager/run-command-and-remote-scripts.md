---
title: Run Command and remote scripts
level: associate
order: 20
facts:
  - id: command-doc
    text: SSM documents define parameterized actions and steps in JSON or YAML.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html#documents
  - id: command-version
    text: Editing document content increments its version; callers can choose a specific version and
      owners can change the default version.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html#ssm-docs-benefits
  - id: command-target
    text: Run Command runs command documents on managed nodes targeted by IDs, tags or a resource group.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-targeting
  - id: command-tag-limits
    text: Run Command tag targeting supports up to five keys and five values per key.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-multiple
  - id: command-group
    text: A tag-based resource group selects resources using resource types and tag key-value filters.
    source: https://docs.aws.amazon.com/ARG/latest/userguide/gettingstarted-query.html#getting_started-query_types
  - id: command-remote
    text: AWS-RunRemoteScript downloads and runs remote scripts from GitHub or S3.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-remote-scripts.html#integration-remote-scripts
  - id: command-s3
    text: For S3 scripts, the EC2 instance profile needs s3:ListBucket and s3:GetObject.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-s3.html#integration-s3
  - id: command-download
    text: aws:downloadContent downloads scripts or documents; GitHub sourceInfo identifies the owner,
      repository and path, with getOptions selecting a branch or commit.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents-command-ssm-plugin-reference.html#aws-downloadContent
  - id: command-execute
    text: aws:runDocument executes an SSM document downloaded to a local path; aws:runShellScript
      executes a Linux shell script.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents-command-ssm-plugin-reference.html#aws-rundocument
  - id: command-output
    text: Run Command returns only the first 24000 output characters by default; S3 or CloudWatch Logs
      can receive complete output.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-rc-setting-up-cwlogs.html#sysman-rc-setting-up-cwlogs
  - id: command-notify
    text: Run Command SNS notifications can report overall command status or individual node invocations.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-sns-notifications.html#monitoring-sns-notifications
  - id: command-notify-fifo
    text: SNS FIFO topics are unsupported for Run Command status notifications.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-sns-notifications.html#monitoring-sns-notifications
  - id: command-event
    text: EventBridge can target Run Command to configure newly launched Auto Scaling nodes or run
      patching after noncompliance events.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-systems-manager-targets.html#monitoring-systems-manager-targets
  - id: command-regional
    text: Resource groups are maintained separately for each AWS Region.
    source: https://docs.aws.amazon.com/ARG/latest/userguide/supported-resources.html#supported-resources
  - id: term-resource-group
    text: "Resource group: A saved collection of resources selected by a query such as resource types
      and tags."
    source: https://docs.aws.amazon.com/ARG/latest/userguide/gettingstarted-query.html#gettingstarted-query
  - id: term-invocation
    text: "Invocation: A copy of a Run Command command sent to a particular managed node."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-sns-notifications.html#monitoring-sns-notifications
  - id: send-command
    text: "The SendCommand API runs an SSM document on managed nodes chosen by instance IDs or tags, so code such as a Lambda function can trigger Run Command."
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_SendCommand.html#API_SendCommand
diagrams:
  - id: ssm-remote-script
    title: Run Command sends instructions; the node retrieves the script
    width: 940
    height: 190
    nodes:
      - id: n0
        label: Run Command
        sub: command document
        icon: systems-manager
        tone: mgmt
        x: 25
        y: 45
        w: 270
        h: 86
      - id: n1
        label: Managed node
        sub: download and execute
        icon: res-ec2-instance
        tone: compute
        x: 335
        y: 45
        w: 270
        h: 86
      - id: n2
        label: S3 bucket
        sub: remote script
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 645
        y: 45
        w: 270
        h: 86
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
    steps:
      - Run Command delivers the document to SSM Agent on the targeted managed node.
      - The node retrieves the S3 script using its node permissions and runs the requested script.
cards:
  - id: systems-manager-009
    q: A team needs Systems Manager to run bootstrap scripts stored in GitHub or S3. Which document
      fits?
    a: AWS-RunRemoteScript. It downloads and runs remote scripts on managed nodes. For S3, grant the
      node profile s3:ListBucket and s3:GetObject.
    facts:
      - command-remote
      - command-s3
  - id: systems-manager-013
    q: A team needs Systems Manager to run a command on nodes tagged Env=Prod. How should it target
      them?
    a: Use Run Command with a command document and a tag target. Targets can also be node IDs or a
      resource group; tag targeting permits up to five keys and five values per key.
    facts:
      - command-target
      - command-tag-limits
  - id: systems-manager-040
    q: A team needs reusable Systems Manager configuration actions with a fixed reviewed revision. What
      should it use?
    a: A parameterized JSON or YAML SSM document with an explicit document version. Updating content
      creates another version; the default version can be changed separately.
    facts:
      - command-doc
      - command-version
  - id: systems-manager-041
    q: A custom Systems Manager command document must run another SSM document from GitHub. Which
      plugins belong in sequence?
    a: Use aws:downloadContent with sourceType GitHub and repository sourceInfo, then aws:runDocument
      with documentType LocalPath and the downloaded document path.
    facts:
      - command-download
      - command-execute
  - id: systems-manager-042
    q: A Systems Manager command produces more output than its default response shows. How can a team
      retain all output and receive failure alerts?
    a: Send complete output to S3 or CloudWatch Logs and configure SNS status notifications.
      Notifications can describe the command or each node invocation.
    facts:
      - command-output
      - command-notify
      - command-notify-fifo
  - id: systems-manager-043
    q: A team wants a Systems Manager script to configure nodes after Auto Scaling launch events. Which
      event integration fits?
    a: Use an EventBridge rule with Run Command as its target to run the command document on managed
      nodes.
    facts:
      - command-event
  - id: systems-manager-085
    q: A team wants Systems Manager targets selected by resource type and environment tags in a
      particular Region. What should it use?
    a: Use a tag-based resource group as the Run Command target. Its query filters resource types and
      tag values; resource groups are maintained separately by Region.
    facts:
      - command-target
      - command-group
      - command-regional
  - id: systems-manager-107
    q: "A CloudWatch alarm notifies an SNS topic when an application on an EC2 instance runs out of memory, and the application must be restarted automatically. What can the topic trigger to do it?"
    a: "A Lambda function subscribed to the topic that calls SendCommand to run a restart command on the instance with Run Command."
    facts:
      - send-command
      - command-target
---
Run Command executes a document on managed nodes so an operator can apply the same action across a fleet. A document is a reusable recipe of steps with inputs supplied when it runs.

### How it works

1. Choose a JSON or YAML command document and its version. Supply the parameters for that execution.
2. Select node IDs, tags or a resource group. A tag-based resource group is a saved selection by resource type and tag filters. Resource groups are maintained separately in each Region.
3. For remote scripts, use `AWS-RunRemoteScript`. For a downloaded SSM document, use `aws:downloadContent` followed by `aws:runDocument` with `documentType: LocalPath`. A downloaded Linux shell script uses `aws:runShellScript`.
4. Retain complete output in S3 or CloudWatch Logs. Configure SNS notifications for the overall command or for each invocation, the copy of the command sent to a particular node.

### Exam cues

- If the question says scripts already live in GitHub or S3, think `AWS-RunRemoteScript`, because it downloads and runs them.
- If the question says a reviewed document revision must be repeatable, think an explicit document version, because editing content creates a new revision.
- If the question says Auto Scaling launch events must configure managed nodes, think EventBridge targeting Run Command, because Run Command is a supported event target.
- If the question says react to an alarm by running a command on an instance, think SNS to Lambda to Run Command SendCommand, because the instance itself cannot subscribe to the topic.

### Remember

- Tag targets support five keys and five values per key.
- The default command response contains only the first 24000 output characters. Use S3 or CloudWatch Logs for complete output.
- An EC2 node downloading S3 scripts needs `s3:ListBucket` and `s3:GetObject`.
- GitHub downloads use `sourceType: GitHub`, repository `sourceInfo`, and `getOptions` to select a branch or commit.
- SNS FIFO topics are unsupported for these status notifications.

> **Trap:** `aws:downloadContent` only downloads content. A later execution step must run the downloaded script or document.
