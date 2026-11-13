---
title: AppSpec and file handling
level: associate
order: 20
facts:
  - id: appspec
    text: An AppSpec file describes deployment resources or file installation and optional lifecycle
      hooks.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/application-specification-files.html#application-specification-files
  - id: server-format
    text: For a normal EC2/On-Premises deployment, AppSpec must be YAML named appspec.yml at the
      revision root.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file.html#appspec-reference-server
  - id: managed-format
    text: Lambda and ECS AppSpec files accept YAML or JSON and can be entered directly in the console.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/application-specification-files.html#application-specification-files
  - id: files-copy
    text: The EC2/On-Premises files section maps revision sources to instance destinations during
      Install.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-files.html#reference-appspec-file-structure-files
  - id: source-path
    text: A files source path is relative to the AppSpec file; destination is a fully qualified instance
      path.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-files.html#reference-appspec-file-structure-files
  - id: permissions
    text: EC2/On-Premises AppSpec can specify permissions for deployed files.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/application-specification-files.html#appspec-files-on-server-compute-platform
  - id: lambda-resource
    text: Lambda AppSpec resources specify the function name, alias, current version, and target version.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-lambda
  - id: ecs-resource
    text: ECS AppSpec resources specify the task definition ARN, container name, and container port.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-ecs
  - id: disallow
    text: DISALLOW is the default file_exists_behavior and fails on conflicting files outside the
      previous successful deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-files.html#reference-appspec-file-structure-files
  - id: overwrite
    text: OVERWRITE replaces a conflicting file on the instance with the revision copy.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-files.html#reference-appspec-file-structure-files
  - id: retain
    text: RETAIN keeps the conflicting instance file and uses it in the deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-files.html#reference-appspec-file-structure-files
  - id: precedence
    text: AppSpec file_exists_behavior applies to all files and takes precedence over the CLI or API
      file-exists setting.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-files.html#reference-appspec-file-structure-files
  - id: cleanup
    text: Before redeployment, CodeDeploy uses its cleanup file to remove files it installed, but leaves
      files created by hook scripts.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-workflow
  - id: rollback-content
    text: A rollback uses the last successful deployment content-handling option, but cannot retain
      files already removed by the failed deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-content-options
  - id: task-definition
    text: An ECS task definition describes how the application containers run.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-steps-prerequisites-ecs
  - id: arn-definition
    text: An ARN uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
cards:
  - id: codedeploy-012
    q: A CodeDeploy EC2 deployment finds a conflicting file that was not installed by the previous
      successful deployment. Which AppSpec setting controls the result?
    a: "Use `file_exists_behavior`: `DISALLOW` fails by default, `OVERWRITE` replaces the file, and
      `RETAIN` keeps the instance copy."
    facts:
      - disallow
      - overwrite
      - retain
  - id: codedeploy-014
    q: What AppSpec formats and locations does CodeDeploy support for EC2/On-Premises compared with
      Lambda and ECS?
    a: Normal EC2/On-Premises deployments require YAML named `appspec.yml` at the revision root. Lambda
      and ECS accept YAML or JSON, including console input.
    facts:
      - server-format
      - managed-format
  - id: codedeploy-023
    q: A CodeDeploy rollback uses RETAIN but a local file removed by the failed release is still
      missing. Why?
    a: RETAIN can only keep a file that still exists. A failed deployment using OVERWRITE may already
      have removed it.
    trap: true
    facts:
      - rollback-content
  - id: codedeploy-028
    q: A CodeDeploy EC2 release overwrites a manually installed configuration file and then fails. Can
      rollback recover that original local file?
    a: Do not expect it to. CodeDeploy can redeploy revision files, but the overwritten local content is
      no longer available for RETAIN.
    trap: true
    facts:
      - overwrite
      - rollback-content
  - id: codedeploy-040
    q: A CodeDeploy EC2 deployment uses RETAIN in AppSpec but OVERWRITE in its CLI request. Which
      setting wins?
    a: AppSpec `file_exists_behavior` wins and applies to all files listed in `files`.
    trap: true
    facts:
      - precedence
  - id: codedeploy-041
    q: Does a CodeDeploy EC2 rollback delete files that a hook script created outside the installed
      revision files?
    a: No. The cleanup file tracks files CodeDeploy installed; script-created files need script logic to
      reconcile them.
    facts:
      - cleanup
---
An AppSpec file is CodeDeploy's deployment instruction file. It tells the service which resources to update or tells the instance agent which files to copy and which scripts to run.

### How it works

1. Package EC2/On-Premises content with a file in YAML, a text format for configuration, named `appspec.yml` at the revision root. Lambda and ECS also accept the JSON data format and direct console input.
2. Describe what changes. EC2 uses `files` mappings and optional file permissions; Lambda names the function, alias, and versions; ECS names the task definition, container, and port. A task definition is the configuration used to run containers. Its ARN is its AWS resource identifier.
3. During EC2 `Install`, resolve each source relative to AppSpec and copy it to the fully qualified destination on the instance.
4. Apply `file_exists_behavior` to conflicting files outside the previous successful deployment. The AppSpec setting overrides the command line interface (CLI) or programmatic interface (API) setting.
5. On redeployment, remove files recorded in CodeDeploy's cleanup file. Hook scripts must handle the files they created themselves.

| AppSpec value | Conflicting file behavior |
|---|---|
| `DISALLOW` | Fail the deployment; default |
| `OVERWRITE` | Replace the instance file with the revision copy |
| `RETAIN` | Keep and use the instance copy |

### Exam cues

- If the question says files already exist on a server being adopted into CodeDeploy, think file conflict behavior, because unmanaged files cause the default deployment to fail.
- If the question says a rollback lost locally maintained files, think the failed deployment's overwrite behavior, because rollback cannot retain deleted content.
- If the question says CLI and AppSpec conflict handling disagree, think AppSpec precedence, because that setting controls the listed files.

### Remember

- Normal EC2/On-Premises: YAML, `appspec.yml`, revision root.
- Lambda and ECS: YAML or JSON.
- File mappings apply to EC2/On-Premises, with `DISALLOW` as the default conflict policy.

> **Trap:** Rollback redeploys application content. It does not undo arbitrary file changes made by scripts or recover local files already overwritten.
