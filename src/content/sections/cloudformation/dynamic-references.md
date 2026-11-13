---
title: Dynamic references
level: associate
order: 30
facts:
  - id: external-value
    text: Dynamic references let CloudFormation retrieve values managed outside the template during
      stack operations.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references
  - id: noecho
    text: NoEcho masks parameter values in describe results but does not redact Outputs, template
      Metadata, or resource Metadata.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties
  - id: ssm-secure
    text: The ssm-secure dynamic reference retrieves an encrypted Parameter Store SecureString for
      supported resource properties while CloudFormation stores the literal reference.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references-ssm-secure-strings.html#dynamic-references-ssm-secure-strings
  - id: secret-reference
    text: A secretsmanager dynamic reference retrieves a secret or a selected JSON field; versionless
      references use AWSCURRENT.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references-secretsmanager.html#dynamic-references-secretsmanager-pattern
  - id: secret-refresh
    text: Changing only a secret value does not make CloudFormation reread it; creation or an update
      modifying its consuming resource is required.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references-secretsmanager.html#dynamic-references-secretsmanager-considerations
  - id: secure-limitations
    text: Secure dynamic references are unsupported in custom resources, and dynamic references are
      unsupported in AWS::CloudFormation::Init metadata and EC2 UserData.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-considerations
  - id: identifier-risk
    text: Using sensitive dynamic values in a primary resource identifier can expose the plaintext
      through that identifier.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-considerations
  - id: reference-limit
    text: A stack template can contain up to 60 dynamic references.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-considerations
  - id: managed-password
    text: ManageMasterUserPassword on AWS::RDS::DBCluster enables Secrets Manager management of the
      master password and cannot be combined with MasterUserPassword.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-managemasteruserpassword
  - id: attachment
    text: AWS::SecretsManager::SecretTargetAttachment adds database connection details to a secret for
      database credential rotation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-secretsmanager-secrettargetattachment.html#aws-resource-secretsmanager-secrettargetattachment
  - id: attachment-not-rotation
    text: SecretTargetAttachment supplies connection information required by database rotation; a
      rotation configuration is still needed to enable rotation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-secretsmanager-secrettargetattachment.html#aws-resource-secretsmanager-secrettargetattachment
cards:
  - id: cloudformation-033
    q: Does NoEcho prevent a CloudFormation parameter from appearing in Outputs or Metadata?
    a: No. NoEcho masks parameter describe results, but does not redact Outputs, template Metadata, or
      resource Metadata. Use external secret storage and dynamic references for supported
      properties.
    trap: true
    facts:
      - noecho
      - external-value
  - id: cloudformation-062
    q: A CloudFormation template needs a password without embedding it. What should it use, and will a
      secret-only change refresh the resource?
    a: Use a secure dynamic reference to Secrets Manager or a supported Parameter Store SecureString. A
      secret-only change does not cause CloudFormation to update the consuming resource.
    facts:
      - ssm-secure
      - secret-reference
      - secret-refresh
  - id: cloudformation-070
    q: A CloudFormation template must retrieve an encrypted Parameter Store password. Which reference
      pattern should it use?
    a: ssm-secure for a supported resource property. CloudFormation stores the literal reference rather
      than the resolved secure string.
    facts:
      - ssm-secure
  - id: cloudformation-071
    q: A CloudFormation RDS DBCluster must let RDS manage its master password in Secrets Manager. What
      should the team configure?
    a: Set ManageMasterUserPassword and omit MasterUserPassword. These properties cannot be used
      together.
    facts:
      - managed-password
  - id: cloudformation-072
    q: A database secret used by CloudFormation lacks the connection information needed for rotation.
      Which resource supplies it?
    a: AWS::SecretsManager::SecretTargetAttachment. It adds the database connection details; supplying
      those details alone does not enable rotation.
    trap: true
    facts:
      - attachment
      - attachment-not-rotation
  - id: cloudformation-073
    q: A CloudFormation user changes a Secrets Manager value but leaves its resource unchanged. Why does
      the resource still use the old value?
    a: CloudFormation rereads the secret during creation or an update that modifies the consuming
      resource. A secret-only change does not trigger that operation.
    trap: true
    facts:
      - secret-refresh
---
A dynamic reference tells CloudFormation where to retrieve a value from external storage. This keeps a password out of the template while letting a supported resource receive it during provisioning.

### How it works

1. Store the value outside the template and choose a reference type.
2. Put the reference in a supported resource property. CloudFormation resolves it during the relevant stack operation.
3. For Secrets Manager, use a versionless reference when the current version should apply. Changing only the stored secret does not update an existing resource through CloudFormation; modify the consuming resource in a stack update to retrieve it again.

| Reference or resource | Use |
|---|---|
| `ssm-secure` | Retrieve an encrypted Parameter Store SecureString for a supported property |
| `secretsmanager` | Retrieve a secret or a JSON field; a versionless reference uses `AWSCURRENT`, the current version label |
| `ManageMasterUserPassword` on an RDS DBCluster | Let RDS manage its master password with Secrets Manager; omit `MasterUserPassword` |
| `AWS::SecretsManager::SecretTargetAttachment` | Add database connection details needed for database credential rotation |

### Exam cues

- If the question says an encrypted Parameter Store password must reach a template resource, think `ssm-secure`, because the reference resolves a SecureString for supported properties.
- If the question says an RDS cluster should manage its own password in Secrets Manager, think `ManageMasterUserPassword`, because RDS manages that credential.
- If the question says database secret rotation lacks connection details, think `SecretTargetAttachment`, because it adds that information to the secret.

### Remember

- A template supports up to 60 dynamic references.
- Secure dynamic references do not work in custom resources. Dynamic references do not work in `AWS::CloudFormation::Init` or EC2 `UserData`.
- Keep secrets out of primary resource identifiers, where resolved plaintext can appear.

> **Trap:** NoEcho does not redact Outputs or Metadata. A SecretTargetAttachment supplies connection details but does not enable rotation by itself.
