---
title: Environment variables and secrets
level: associate
order: 30
facts:
  - id: plain-variables
    text: Plain environment variable values can be displayed in the console and AWS CLI.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.variables
  - id: parameter-mapping
    text: env.parameter-store maps build variable names to Parameter Store parameter names.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.parameter-store
  - id: parameter-permission
    text: The CodeBuild service role needs ssm:GetParameters to retrieve Parameter Store values.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.parameter-store
  - id: secret-mapping
    text: env.secrets-manager uses secret-id:json-key:version-stage:version-id references.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.secrets-manager
  - id: secret-field
    text: Omitting json-key retrieves the entire secret text.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.secrets-manager
  - id: secret-default
    text: A Secrets Manager mapping retrieves AWSCURRENT when no version stage or version ID is
      specified.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.secrets-manager
  - id: secret-version
    text: Specify a version stage or version ID, not both.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.secrets-manager
  - id: secret-account
    text: A secret in another account must be referenced by its ARN.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.secrets-manager
  - id: secret-permission
    text: GetSecretValue requires secretsmanager:GetSecretValue and kms:Decrypt when the secret uses a
      customer managed KMS key.
    source: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  - id: precedence
    text: StartBuild values override project values, which override buildspec values.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.variables
  - id: masking
    text: Secret masking matches stored values exactly; transformations such as Base64 can expose a
      different value in logs.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env
  - id: reserved-prefix
    text: CODEBUILD_ is reserved and must not prefix user-defined variable names.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.variables
  - id: literal-replacement
    text: Variable mappings replace existing values literally, so a mapped PATH containing $PATH does
      not expand the old PATH.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.variables
  - id: parameter-decrypt
    text: Decrypting a Parameter Store SecureString requires kms:Decrypt permission for its KMS key.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html#parameter-policy-kms-encryption
  - id: source-version-vars
    text: CODEBUILD_RESOLVED_SOURCE_VERSION holds the commit ID that was built, while CODEBUILD_SOURCE_VERSION holds the version requested, such as a branch name or commit ID.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
  - id: initiator-jenkins
    text: CODEBUILD_INITIATOR names who started the build; when the CodeBuild plugin for Jenkins starts it, the value is CodeBuild-Jenkins-Plugin.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
diagrams: []
cards:
  - id: codebuild-005
    q: A CodeBuild build needs a database password without placing its value in the buildspec. What
      should it use?
    a: Use `env.parameter-store` or `env.secrets-manager`. The role needs `ssm:GetParameters` or
      `secretsmanager:GetSecretValue`; reading a Secrets Manager secret under a customer managed key
      also needs `kms:Decrypt`.
    facts:
      - parameter-mapping
      - parameter-permission
      - secret-mapping
      - secret-permission
      - parameter-decrypt
    trap: true
  - id: codebuild-006
    q: The same CodeBuild variable is defined in the buildspec, project, and StartBuild request. Which
      value wins?
    a: StartBuild first, project second, buildspec last.
    facts:
      - precedence
  - id: codebuild-022
    q: A CodeBuild project stores a token as a plain environment variable. How should the team avoid
      exposing its value through the console and CLI?
    a: Store it in Parameter Store or Secrets Manager and configure a reference mapping. Plain
      environment variables can be displayed as text.
    facts:
      - plain-variables
      - parameter-mapping
      - secret-mapping
    trap: true
  - id: codebuild-023
    q: Which secret version does a CodeBuild Secrets Manager mapping select by default, and how is a
      secret in another account identified?
    a: "`AWSCURRENT` by default. Use the secret ARN for another account. The reference format is
      `secret-id:json-key:version-stage:version-id`; choose a stage or ID, not both."
    facts:
      - secret-default
      - secret-account
      - secret-mapping
      - secret-version
  - id: codebuild-024
    q: A CodeBuild command prints a Base64 transformation of a Secrets Manager value. Does CodeBuild
      mask that transformed output?
    a: No. Masking matches the stored value exactly. A transformation can produce visible text; store
      the value in the form the build needs and avoid printing secrets.
    facts:
      - masking
    trap: true
  - id: codebuild-033
    q: A CodeBuild environment mapping sets PATH to $PATH:/tools. Why does the previous PATH disappear?
    a: Mappings replace values literally. The `$PATH` text in the mapped value does not expand the
      previous value.
    facts:
      - literal-replacement
  - id: codebuild-060
    q: A buildspec must tag an image with the exact commit that was built, even when a branch name triggered the build. Which variable fits?
    a: CODEBUILD_RESOLVED_SOURCE_VERSION, the resolved commit ID.
    facts: [source-version-vars]
  - id: codebuild-061
    q: How can a CodeBuild build tell that the Jenkins plugin started it?
    a: CODEBUILD_INITIATOR is CodeBuild-Jenkins-Plugin.
    facts: [initiator-jenkins]
---
CodeBuild maps environment variable names to plain values or stored secrets. An environment variable is a named value available to build commands. Secret references let the build retrieve a value without putting it in the buildspec text.

### How it works

1. Choose a mapping under `env`. Use plain `variables` for non-sensitive values, `parameter-store` for parameter names, or `secrets-manager` for secret references.
2. Grant the service role, the AWS permission identity used by CodeBuild, `ssm:GetParameters` or `secretsmanager:GetSecretValue`. Decrypting a Parameter Store `SecureString`, an encrypted parameter value, requires `kms:Decrypt`; Secrets Manager reads under a customer managed KMS key also require it.
3. For Secrets Manager, use `secret-id:json-key:version-stage:version-id`. A JSON key selects one named field; omitting it retrieves the whole secret text. Use an ARN, an AWS resource identifier, for another account's secret.
4. Resolve duplicate variable names by precedence: StartBuild request, project, then buildspec. Treat logging separately: a transformed secret can escape masking.

| Mapping | Value supplied in the buildspec | Use |
|---|---|---|
| `variables` | Plain text | Non-sensitive settings. |
| `parameter-store` | Parameter name | Retrieve a stored parameter. |
| `secrets-manager` | Secret reference | Retrieve a secret or one JSON field. |

### Exam cues

- If the question says a token is visible in the CodeBuild console, think a secret reference, because plain variables can be displayed in the console and CLI.
- If the question says a secret is readable but its transformed value appears in logs, think exact-value masking, because transformations produce a different string.
- If the question says a build override changes a project variable, think StartBuild precedence, because request values have the highest priority.

### Remember

- Default secret version: `AWSCURRENT`.
- Specify a version stage or version ID, not both.
- `CODEBUILD_` is reserved for CodeBuild.
- Mappings replace existing values literally, including `$PATH` text.

> **Trap:** Masking is not permission to print secrets. A Base64 transformation can appear in logs even when the original stored value is masked.
