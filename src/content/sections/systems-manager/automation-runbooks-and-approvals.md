---
title: Automation runbooks and approvals
level: associate
order: 40
facts:
  - id: automation-runbook
    text: Automation runbooks orchestrate maintenance and deployment actions, including calls to AWS
      APIs and actions on managed nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html#what-are-document-types
  - id: automation-role
    text: AutomationAssumeRole supplies the IAM role used for runbook actions; without a role,
      AWS-ResizeInstance uses the initiating user permissions.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-resizeinstance.html#automation-aws-resizeinstance
  - id: automation-approve
    text: aws:approve pauses a runbook until designated principals approve or reject the step.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-timeout
    text: aws:approve defaults to a seven-day timeout.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-timeout-maximum
    text: aws:approve supports a maximum timeout of 30 days through timeoutSeconds.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-notification
    text: NotificationArn is optional for aws:approve.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-notification-prefix
    text: An SNS topic specified for aws:approve must have a name starting with Automation.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-minimum
    text: MinRequiredApprovals defaults to one.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-minimum-limit
    text: MinRequiredApprovals cannot exceed the number of designated approvers.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-approval-scope
    text: aws:approve does not support multi-account and Region automations.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: automation-update-ami
    text: AWS-UpdateLinuxAmi updates a source AMI with Linux packages and Amazon software and creates a
      new AMI using a workspace instance.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-updatelinuxami.html#automation-aws-updatelinuxami
  - id: automation-golden
    text: The golden AMI tutorial patches an AMI and invokes a Lambda function at the end to update a
      Parameter Store value with the new AMI ID.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-tutorial-update-patch-golden-ami.html#automation-tutorial-update-patch-golden-ami
  - id: automation-resize
    text: AWS-ResizeInstance changes the instance type of an EC2 instance.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-resizeinstance.html#automation-aws-resizeinstance
  - id: automation-rescue
    text: AWSSupport-ExecuteEC2Rescue uses a temporary SSM-enabled helper to diagnose and attempt repair
      of an unreachable instance root volume.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-ec2rescue.html#automation-ec2rescue-how
  - id: automation-rescue-order
    text: EC2Rescue Automation stops and backs up the original instance, attaches its root volume to the
      helper, runs EC2Rescue, reattaches the volume and restarts the original instance.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-ec2rescue.html#automation-ec2rescue
  - id: automation-rescue-encryption
    text: AWSSupport-ExecuteEC2Rescue does not support instances with encrypted root volumes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-ec2rescue.html#automation-ec2rescue
  - id: automation-windows-rescue
    text: EC2Rescue for Windows can diagnose boot issues and connectivity problems caused by firewall,
      RDP or network interface settings.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Windows-Server-EC2Rescue.html#Windows-Server-EC2Rescue
  - id: automation-signal
    text: SendAutomationSignal supports Approve and Reject signals for an Automation execution.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_SendAutomationSignal.html#API_SendAutomationSignal
  - id: automation-image-filters
    text: AWS-UpdateLinuxAmi supports IncludePackages and ExcludePackages to control package updates.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-updatelinuxami.html#automation-aws-updatelinuxami
  - id: automation-image-scripts
    text: AWS-UpdateLinuxAmi supports PreUpdateScript and PostUpdateScript URLs for scripts before and
      after updates.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-updatelinuxami.html#automation-aws-updatelinuxami
  - id: term-ami
    text: "AMI: A template used to launch an EC2 instance with its operating system and software."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
  - id: term-root-volume
    text: "Root volume: The storage volume containing the operating system used to boot an instance."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/RootDeviceStorage.html#RootDeviceStorage
  - id: term-golden-ami
    text: An organization-maintained base machine image used for consistent instance launches.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-tutorial-update-patch-golden-ami.html#automation-tutorial-update-patch-golden-ami
diagrams:
  - id: ssm-approval-flow
    title: An approval step gates later runbook actions
    width: 940
    height: 190
    nodes:
      - id: n0
        label: Automation
        sub: start runbook
        icon: res-systems-manager-automation
        tone: mgmt
        x: 25
        y: 45
        w: 270
        h: 86
      - id: n1
        label: Approvers
        sub: approve or reject
        icon: res-users
        tone: user
        x: 335
        y: 45
        w: 270
        h: 86
      - id: n2
        label: Automation
        sub: continue if approved
        icon: res-systems-manager-automation
        tone: mgmt
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
      - The runbook pauses at aws:approve for designated principals.
      - The runbook resumes after the required approval count is reached.
  - id: ssm-rescue-volume
    title: EC2Rescue repairs the root volume through a helper
    width: 940
    height: 190
    nodes:
      - id: n0
        label: Original instance
        sub: stop and back up
        icon: res-ec2-instance
        tone: compute
        x: 25
        y: 45
        w: 270
        h: 86
      - id: n1
        label: Helper instance
        sub: repair attached volume
        icon: res-ec2-instance
        tone: compute
        x: 335
        y: 45
        w: 270
        h: 86
      - id: n2
        label: Original instance
        sub: reattach and restart
        icon: res-ec2-instance
        tone: compute
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
      - Automation stops and backs up the original instance, then attaches its root volume to the
        managed helper.
      - After EC2Rescue attempts repair, Automation returns the root volume and restarts the
        original instance.
cards:
  - id: systems-manager-001
    q: What does the Systems Manager AWS-UpdateLinuxAmi Automation runbook do?
    a: It uses a source AMI and workspace instance to create a new AMI with Linux package and Amazon
      software updates.
    facts:
      - automation-update-ami
  - id: systems-manager-016
    q: A team needs Systems Manager to coordinate AWS resource changes and pause for a manager before
      continuing. Which document type fits?
    a: An Automation runbook with an aws:approve step. A runbook coordinates maintenance actions and
      pauses for designated approvers.
    facts:
      - automation-runbook
      - automation-approve
  - id: systems-manager-017
    q: How does a Systems Manager Automation runbook wait for human approval?
    a: Use aws:approve with designated approvers. The timeout defaults to seven days and can be up to 30
      days. An optional SNS notification topic must have a name starting with Automation.
    facts:
      - automation-approve
      - automation-timeout
      - automation-timeout-maximum
      - automation-notification
      - automation-notification-prefix
  - id: systems-manager-046
    q: A Systems Manager Automation runbook should perform EC2 instance-type changes under a service
      role. Which input and runbook fit?
    a: Set AutomationAssumeRole on AWS-ResizeInstance. The runbook uses that role for actions; without
      it, the runbook uses the initiating user permissions.
    facts:
      - automation-role
      - automation-resize
  - id: systems-manager-047
    q: A team uses Systems Manager Automation to patch its golden AMI and publish the resulting AMI ID
      for consumers. How can it do that?
    a: Build the patched AMI and invoke a Lambda function at the end to update a Parameter Store value
      with the new AMI ID, as in the AWS golden AMI tutorial.
    facts:
      - automation-golden
  - id: systems-manager-048
    q: An EC2 instance is unreachable after operating-system changes. Which Systems Manager Automation
      can attempt offline repair?
    a: AWSSupport-ExecuteEC2Rescue. It stops and backs up the instance, repairs its root volume through
      a temporary managed helper, then restores and restarts it. Encrypted root volumes are
      unsupported.
    facts:
      - automation-rescue
      - automation-rescue-order
      - automation-rescue-encryption
  - id: systems-manager-049
    q: Can a Systems Manager aws:approve step be placed directly in a multi-account and Region
      Automation?
    a: No. The aws:approve action does not support that execution mode.
    trap: true
    facts:
      - automation-approval-scope
  - id: systems-manager-087
    q: A Windows EC2 instance cannot boot or accept RDP after firewall or network changes. Which Systems
      Manager workflow can attempt offline recovery?
    a: Use AWSSupport-ExecuteEC2Rescue to run repair through a temporary managed helper. EC2Rescue for
      Windows can diagnose boot, firewall, RDP and network-interface issues; the Automation does not
      support encrypted root volumes.
    facts:
      - automation-rescue
      - automation-rescue-order
      - automation-windows-rescue
      - automation-rescue-encryption
---
Systems Manager Automation runs a runbook, an ordered set of maintenance or deployment actions. It can coordinate AWS resource operations and pause for a person to approve a step.

### How it works

1. Choose the runbook and its inputs. `AutomationAssumeRole` is the IAM role whose permissions the runbook uses; `AWS-ResizeInstance` uses the initiating user permissions if that role is omitted.
2. Add `aws:approve` before the action that needs approval. Specify approvers and the required approval count. If sending SNS notifications, use a topic whose name starts with `Automation`. Approve or reject in the console or with `SendAutomationSignal`.
3. Use a runbook suited to the task. `AWS-UpdateLinuxAmi` produces a patched Amazon Machine Image (AMI), the template used to launch an instance. `IncludePackages` and `ExcludePackages` control package selection; `PreUpdateScript` and `PostUpdateScript` add scripts around the update. A golden AMI is the organization's maintained base image. The AWS tutorial invokes Lambda afterward to publish the new image ID in Parameter Store.
4. For an unreachable instance, `AWSSupport-ExecuteEC2Rescue` stops and backs it up, attaches its root volume, the disk used to boot the operating system, to a temporary managed helper, attempts repairs, then restores the volume and restarts the original instance.

### Exam cues

- If the question says change an EC2 instance type with a reusable workflow, think `AWS-ResizeInstance`, because the runbook performs that change.
- If the question says publish the new golden AMI ID, think Automation followed by a Parameter Store update, because the AWS tutorial connects those steps with Lambda.
- If the question says Windows boot or firewall settings prevent access, think EC2Rescue, because it can inspect boot and connectivity issues through a helper.

### Remember

- Approval timeout: seven days by default, up to 30 days with `timeoutSeconds`.
- `MinRequiredApprovals` defaults to one.
- `NotificationArn` is optional; a supplied SNS topic name must start with `Automation`.
- `aws:approve` does not support multi-account and Region automations.
- `AWSSupport-ExecuteEC2Rescue` does not support encrypted root volumes.

> **Trap:** A seven-day approval timeout is the default, not an unchangeable maximum.

> **Trap:** An unreachable target can be repaired through a separate managed helper; the rescue runbook does not depend on running the repair command inside the unreachable operating system.
