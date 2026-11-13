---
title: CloudFormation actions
level: associate
order: 50
facts:
  - id: stack-template
    text: A CloudFormation stack is a group of resources managed together from a template.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation
  - id: changeset-preview
    text: A change set previews stack changes without changing the resources.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation
  - id: changeset-create
    text: CHANGE_SET_REPLACE creates a change set or deletes and recreates an existing change set with
      that name.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: changeset-execute
    text: CHANGE_SET_EXECUTE applies an existing change set to a stack.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: create-update
    text: CREATE_UPDATE creates a missing stack or updates an existing stack without deleting a failed
      stack to replace it.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: delete-only
    text: DELETE_ONLY deletes a stack and succeeds if the stack does not exist.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: replace-failed
    text: REPLACE_ON_FAILURE can delete and recreate a failed stack; AWS recommends it for testing only.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: template-path
    text: TemplatePath identifies a template inside an input artifact using
      ArtifactName::TemplateFileName.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: template-configuration
    text: TemplateConfiguration points to an input artifact file containing parameter values and an
      optional stack policy.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: parameter-overrides
    text: ParameterOverrides is JSON that overrides template configuration parameter values and is
      intended for values known only at pipeline runtime.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: cfn-role
    text: The configuration RoleArn is the role assumed by CloudFormation to change resources; it is not
      applied when executing a change set.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: cfn-role-account
    text: The CloudFormation configuration RoleArn must be in the same account as the role running the
      action.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: signed-template
    text: The action role needs artifact bucket access to generate a signed template URL; the
      CloudFormation configuration role does not need that bucket access for the template.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: capabilities
    text: Capabilities acknowledges IAM resource creation or macro processing with CAPABILITY_IAM,
      CAPABILITY_NAMED_IAM, or CAPABILITY_AUTO_EXPAND as applicable.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: approval-review
    text: A manual approval pauses a pipeline for an authorized review.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals
  - id: stack-policy-meaning
    text: A stack policy defines which update actions may affect designated stack resources.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources
  - id: macro-meaning
    text: A CloudFormation macro performs custom processing and transformation of template content.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html#template-macros
diagrams:
  - id: pipeline-changeset-review
    title: Preview, review, then apply a change set
    width: 940
    height: 220
    nodes:
      - id: preview
        label: Create preview
        icon: cloudformation
        x: 20
        y: 70
        w: 180
        h: 72
        tone: devtools
      - id: review
        label: Manual approval
        icon: res-users
        x: 350
        y: 70
        w: 180
        h: 72
        tone: devtools
      - id: apply
        label: Apply changes
        icon: cloudformation
        x: 700
        y: 70
        w: 180
        h: 72
        tone: devtools
    edges:
      - from: preview
        to: review
        step: 1
        label: review change set
      - from: review
        to: apply
        step: 2
        label: approval
    steps:
      - CHANGE_SET_REPLACE prepares the change set without applying it.
      - After approval, CHANGE_SET_EXECUTE applies the changes.
cards:
  - id: codepipeline-008
    q: A CodePipeline release needs a person to inspect infrastructure changes before CloudFormation
      applies them. What sequence fits?
    a: Run `CHANGE_SET_REPLACE`, manual approval, then `CHANGE_SET_EXECUTE`. The change set previews
      changes before execution.
    facts:
      - changeset-preview
      - changeset-create
      - approval-review
      - changeset-execute
  - id: codepipeline-009
    q: Which CodePipeline CloudFormation mode does AWS recommend for testing only, and why?
    a: "`REPLACE_ON_FAILURE`, because it can delete and recreate a failed stack."
    trap: true
    facts:
      - replace-failed
  - id: codepipeline-038
    q: A CodePipeline pipeline creates temporary CloudFormation stacks for integration tests. Which mode
      removes the stack after testing?
    a: "`DELETE_ONLY`. It also succeeds if the named stack is already absent."
    facts:
      - delete-only
  - id: codepipeline-039
    q: A CodePipeline CloudFormation action must override a template configuration parameter with a
      value generated during the run. Which field wins?
    a: "`ParameterOverrides`. Its JSON parameter values take precedence over `TemplateConfiguration`."
    facts:
      - parameter-overrides
      - template-configuration
  - id: codepipeline-040
    q: Does the CodePipeline CloudFormation configuration RoleArn replace the role already associated
      with a change set when CHANGE_SET_EXECUTE runs?
    a: No. The configuration `RoleArn` is not applied when executing a change set. Ensure the change set
      or stack already has its intended role.
    trap: true
    facts:
      - cfn-role
---
A CloudFormation action lets CodePipeline create, update, or delete a stack, a group of resources managed from a template. A change set is a preview of changes that can be reviewed before resources change.

### How it works

1. Supply `TemplatePath` as `ArtifactName::TemplateFileName`. Use `TemplateConfiguration` for a file of parameter values and an optional stack policy, which restricts stack updates.
2. Put values known only during the run in `ParameterOverrides`. This JSON overrides matching values in the configuration file.
3. For review before applying changes, run `CHANGE_SET_REPLACE`, manual approval, then `CHANGE_SET_EXECUTE`.
4. Set the CloudFormation configuration `RoleArn` for resource operations. This differs from the action role that reads artifacts and calls CloudFormation. Both roles must be in the same account.
5. Acknowledge IAM creation or macros, which transform templates, through the applicable `Capabilities` value.

| ActionMode | Behavior |
|---|---|
| CREATE_UPDATE | Create a missing stack or update an existing one |
| CHANGE_SET_REPLACE | Create or recreate the named change set |
| CHANGE_SET_EXECUTE | Apply the existing change set |
| DELETE_ONLY | Delete the stack; succeed if it is absent |
| REPLACE_ON_FAILURE | Delete and recreate a failed stack; recommended for testing only |

### Exam cues

- If the question says review infrastructure before applying it, think change set, approval, execution, because a preview does not change resources.
- If the question says remove a temporary test stack, think `DELETE_ONLY`, because it handles deletion and an already absent stack.
- If the question says a generated parameter must replace a configured value, think `ParameterOverrides`, because runtime overrides take precedence.

### Remember

- IAM and macro acknowledgments: `CAPABILITY_IAM`, `CAPABILITY_NAMED_IAM`, and `CAPABILITY_AUTO_EXPAND`, as applicable.
- The action role reads artifacts to generate a signed template URL. The CloudFormation role does not need artifact bucket access for that template URL.

> **Trap:** The configuration `RoleArn` is not applied for `CHANGE_SET_EXECUTE`. The change set or stack must already have the intended role.
