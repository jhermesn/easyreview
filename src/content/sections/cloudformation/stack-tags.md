---
title: Stack tags
level: associate
order: 40
facts:
  - id: tag-purpose
    text: A tag is a key-value label used to organize resources, including cost tracking.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html#configure-stack-options-tags
  - id: tag-limit
    text: A CloudFormation stack accepts up to 50 user tag key-value pairs.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html#configure-stack-options-tags
  - id: tag-update
    text: Adding, changing, or removing stack-level tags initiates a stack update that updates resources
      supporting stack-tag propagation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html#configure-stack-options-tags
  - id: propagation
    text: Stack-tag propagation varies by resource type; EBS volumes created from block device mappings
      do not receive the tags.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html#aws-properties-resource-tags
  - id: asg-tags
    text: PropagateAtLaunch controls propagation of an Auto Scaling group resource tag to instances, but
      stack-level tags reach those instances regardless of this setting.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html#aws-properties-resource-tags
  - id: system-tags
    text: CloudFormation creates aws:cloudformation:logical-id, aws:cloudformation:stack-id, and
      aws:cloudformation:stack-name tags.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html#aws-properties-resource-tags
  - id: reserved-tags
    text: "The aws: tag prefix is reserved, and those tags do not count toward the resource tag limit."
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-resource-tags.html#aws-properties-resource-tags
cards:
  - id: cloudformation-059
    q: A team changes a CloudFormation stack cost-center tag. Does it need a manual retagging script,
      and will every resource receive the tag?
    a: A stack tag change starts a stack update and retags resources supporting stack-tag propagation.
      Propagation varies by type; EBS volumes created from block device mappings are an exception.
    trap: true
    facts:
      - tag-update
      - propagation
  - id: cloudformation-074
    q: A CloudFormation Auto Scaling group has PropagateAtLaunch disabled. Do its instances still
      receive stack-level tags?
    a: Yes. Stack-level tags reach the instances regardless of PropagateAtLaunch; that setting controls
      propagation of group resource tags.
    trap: true
    facts:
      - asg-tags
  - id: cloudformation-075
    q: How many user tag pairs can a CloudFormation stack accept?
    a: "Up to 50. AWS-reserved tags use the aws: prefix and do not count toward resource tag limits."
    facts:
      - tag-limit
      - reserved-tags
  - id: cloudformation-076
    q: A team needs a cost-center label shared by supported CloudFormation resources. Where should it
      configure the label?
    a: Set a stack-level tag. A later change to that tag initiates a stack update for resources that
      support propagation.
    facts:
      - tag-purpose
      - tag-update
---
CloudFormation stack tags apply shared key-value labels to a stack and resources that support propagation. They help organize resources and track costs without maintaining a separate retagging script.

### How it works

1. Supply stack-level tags when creating the stack.
2. CloudFormation propagates the tags according to each resource type's support. It also adds its own stack identity tags.
3. Add, change, or remove stack tags later to start a stack update that retags supported resources.

### Exam cues

- If the question says a cost-center label changes across a stack, think a stack-level tag update, because CloudFormation retags resources that support propagation.
- If the question says EBS volumes created through block device mappings lack the stack tags, think a propagation exception, because those volumes do not receive stack-level tags.

### Remember

- A stack accepts up to 50 user tag pairs.
- CloudFormation adds `aws:cloudformation:logical-id`, `aws:cloudformation:stack-id`, and `aws:cloudformation:stack-name`.
- The `aws:` prefix is reserved. Those tags do not count toward resource tag limits.

> **Trap:** PropagateAtLaunch controls Auto Scaling group resource tags. Stack-level tags reach the group's instances regardless of that setting.
