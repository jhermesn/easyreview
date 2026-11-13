---
title: Configuration validation
level: associate
order: 10
facts:
  - id: profile-location
    text: An AppConfig configuration profile identifies the configuration type and the URI where its data is stored.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-profile.html
  - id: application-namespace
    text: An AppConfig application is a namespace that groups configuration resources.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/creating-feature-flags-and-configuration-data.html
  - id: flag-storage
    text: Feature flags enable or disable application features and use the AppConfig hosted configuration store with the URI hosted.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-profile.html
  - id: freeform-stores
    text: Freeform profiles support the AppConfig hosted store, Amazon S3, CodePipeline, Secrets Manager, Systems Manager Parameter Store, and Systems Manager document store.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-free-form-configurations-creating.html
  - id: external-data-first
    text: Create the parameter, secret, or S3 object before creating its AppConfig freeform configuration profile.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-free-form-configurations-creating.html
  - id: retrieval-role
    text: A profile needs an IAM retrieval role for its configuration source, except for the AppConfig hosted store and CodePipeline.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_CreateConfigurationProfile.html#appconfig-CreateConfigurationProfile-request-RetrievalRoleArn
  - id: role-identity
    text: An IAM role is an AWS permission identity that a service or other trusted caller can assume.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: validator-count
    text: A configuration profile can specify zero to two validators.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_CreateConfigurationProfile.html#appconfig-CreateConfigurationProfile-request-Validators
  - id: validator-types
    text: AppConfig validator types are JSON_SCHEMA and LAMBDA, which check configuration structure or meaning before deployment can proceed.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_Validator.html
  - id: validation-blocks-deployment
    text: AppConfig runs the configured validators when deployment starts and stops an invalid deployment before changing any targets.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-free-form-configurations-creating.html
  - id: schema-rules
    text: A JSON Schema defines allowed properties for configuration settings.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-json-schema
  - id: validator-profile-support
    text: Lambda validators support feature flags and freeform configurations; custom JSON Schema validators support freeform configurations, while AppConfig automatically checks feature flags against a JSON Schema.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html
  - id: inline-schema-version
    text: Inline JSON Schema supports version 4.X; use a Lambda validator for another schema version.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-json-schema
  - id: lambda-validation-calls
    text: StartDeployment and ValidateConfigurationActivity invoke a configured validation Lambda.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-lambda
  - id: lambda-invoke-permission
    text: The validation Lambda must allow appconfig.amazonaws.com to invoke it.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-lambda
  - id: lambda-validation-time
    text: A validation Lambda has 15 seconds, including startup latency.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-lambda
  - id: lambda-rejects-data
    text: A validation Lambda rejects configuration by throwing an exception, which sets the X-Amz-Function-Error response header.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-lambda
  - id: ssm-document-schema
    text: Configuration stored in an SSM document must pass an associated JSON Schema before it can be added.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-json-schema
  - id: ssm-parameter-validation
    text: SSM parameters do not require a validation method, but AWS recommends a Lambda validation check for new or updated parameter configurations.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators-json-schema
cards:
  - id: appconfig-003
    q: What does an AWS AppConfig configuration profile identify?
    a: The configuration type and its storage URI, the address AppConfig uses to find the data.
    facts: [profile-location]
  - id: appconfig-004
    q: An application already keeps settings in S3. How can a team add AWS AppConfig validation without moving those settings?
    a: Create a freeform profile pointing to the S3 object, grant a retrieval role access, and attach validators. Invalid configuration stops before targets change.
    facts: [freeform-stores, external-data-first, retrieval-role, validation-blocks-deployment]
  - id: appconfig-005
    q: How many validators can an AWS AppConfig configuration profile have, and what are their API types?
    a: Zero to two. The types are JSON_SCHEMA and LAMBDA.
    facts: [validator-count, validator-types]
  - id: appconfig-006
    q: A team needs AWS AppConfig to reject settings that violate an application business rule. Which validator fits?
    a: A Lambda validator. It can check the meaning of values with custom logic and reject invalid data by throwing an exception.
    facts: [validator-types, lambda-rejects-data]
  - id: appconfig-007
    q: An AWS AppConfig freeform configuration requires a newer JSON Schema version than 4.X. How should the team validate it?
    a: Use a Lambda validator. Inline JSON Schema supports version 4.X.
    trap: true
    facts: [inline-schema-version]
  - id: appconfig-008
    q: What permission and runtime constraint apply to an AWS AppConfig validation Lambda?
    a: Allow appconfig.amazonaws.com to invoke the function. Validation has 15 seconds including startup.
    facts: [lambda-invoke-permission, lambda-validation-time]
  - id: appconfig-009
    q: Which AWS AppConfig operations invoke a configured validation Lambda?
    a: StartDeployment and ValidateConfigurationActivity.
    facts: [lambda-validation-calls]
  - id: appconfig-010
    q: Where does AWS AppConfig store feature flags, and how are they validated?
    a: In the hosted configuration store, using the URI hosted. AppConfig applies a JSON Schema automatically; a Lambda validator can add custom checks.
    facts: [flag-storage, validator-profile-support]
  - id: appconfig-011
    q: Does AWS AppConfig require the same validation setup for SSM documents and Parameter Store parameters?
    a: No. An SSM document requires its associated JSON Schema. Parameter validation is optional, although AWS recommends a Lambda check.
    trap: true
    facts: [ssm-document-schema, ssm-parameter-validation]
  - id: appconfig-012
    q: Which freeform configuration sources can an AWS AppConfig profile use?
    a: AppConfig hosted store, S3, CodePipeline, Secrets Manager, Systems Manager Parameter Store, and Systems Manager document store.
    facts: [freeform-stores]
---

AWS AppConfig validation checks application settings before they reach running applications. A configuration profile is the record that tells AppConfig what kind of data to use and where to find it. Validators check its structure or whether its values make sense for the application.

### How it works

1. Create an AppConfig application, a namespace that groups related configuration resources. Choose a feature flag, a setting that enables or disables a feature, or a freeform configuration, a collection of application settings.
2. Create a configuration profile with the data's URI, its storage address. Feature flags use `hosted`. For existing external data, point the profile to its store.
3. Give AppConfig an IAM retrieval role, a permission identity that can read that source. The hosted store and CodePipeline do not require this role.
4. Attach optional validators. `JSON_SCHEMA` checks allowed properties; `LAMBDA` runs custom logic. AppConfig already applies a schema to feature flags.
5. Start a deployment. AppConfig runs the configured checks and stops on validation errors before changing targets, the applications receiving configuration. `ValidateConfigurationActivity` also invokes a configured validation Lambda.

| Freeform source | Profile setup |
|---|---|
| AppConfig hosted store | Use `hosted`; no retrieval role required. |
| Amazon S3 | Create the object first; supply a retrieval role. |
| CodePipeline | Use the pipeline as the source; no retrieval role required. |
| Secrets Manager | Create the secret first; supply a retrieval role. |
| Systems Manager Parameter Store | Create the parameter first; supply a retrieval role. |
| Systems Manager document store | Supply a retrieval role; the configuration requires an associated JSON Schema. |

### Exam cues

- If the question says settings already live in S3 or Parameter Store, think a freeform profile pointing to that store, because AppConfig can use existing configuration sources.
- If the question says reject a business-rule violation before release, think a Lambda validator, because it can check the meaning of values.
- If the question says malformed settings must never reach targets, think profile validators, because failure stops deployment before targets change.

### Remember

- Profiles allow **zero to two** validators.
- Inline schemas support **JSON Schema 4.X**. Use Lambda for another version.
- A validation Lambda has **15 seconds including startup** and must permit `appconfig.amazonaws.com` to invoke it.
- Reject invalid data by throwing an exception in the validation Lambda.
- SSM document configurations require a schema; Parameter Store validation is optional.

> **Trap:** A syntactically valid configuration can still contain values that violate application rules. Use a Lambda check for those rules.

> **Trap:** Feature flags already receive automatic schema validation. Custom JSON Schema validators apply to freeform profiles; Lambda validators support both profile types.
