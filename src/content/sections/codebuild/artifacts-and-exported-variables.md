---
title: Artifacts and exported variables
level: associate
order: 50
facts:
  - id: artifact-files
    text: artifacts.files selects output files; base-directory selects their parent directory and
      discard-paths controls directory flattening.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.artifacts
  - id: pipeline-artifacts
    text: CodeBuild output artifacts can be inputs to subsequent CodePipeline actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-output
  - id: multiple-artifacts
    text: With multiple CodePipeline outputs, all outputs must be secondary artifacts whose identifiers
      match the action output names.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-output
  - id: artifact-limits
    text: A CodePipeline CodeBuild action accepts 1 to 5 inputs and 0 to 5 outputs.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html
  - id: export-list
    text: env.exported-variables lists container variables to pass to subsequent CodePipeline stages.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.exported-variables
  - id: namespace
    text: "A CodePipeline namespace groups the output variables of an action; later actions reference
      them as #{namespace.variable}."
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html#reference-variables-concepts
  - id: export-window
    text: Exported variable values can change from install through the end of post_build, then become
      fixed.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.exported-variables
  - id: export-restrictions
    text: Project-configured Parameter Store secrets, project-configured Secrets Manager secrets, and
      variables starting AWS_ cannot be exported.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.exported-variables
  - id: artifact-key
    text: CodeBuild needs KMS key access to encrypt output artifacts and by default uses the account AWS
      managed key for S3.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up-kms.html
  - id: custom-key
    text: A customer managed key must have a key policy allowing the required use by CodeBuild.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up-kms.html
  - id: artifact-store
    text: CodePipeline stores action input and output artifacts in its S3 artifact bucket.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html
  - id: primary-source
    text: A CodeBuild action with multiple input artifacts requires PrimarySource; CodeBuild reads its buildspec from that input and extracts each input to a separate directory.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-input
  - id: standalone-output
    text: For S3 output, CodeBuild defaults to an uncompressed folder; ZIP packaging is an option. CodePipeline manages its own output location and packaging.
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_ProjectArtifacts.html#CodeBuild-Type-ProjectArtifacts-packaging
  - id: standalone-namespace
    text: For S3 output, namespaceType defaults to NONE; BUILD_ID includes the build ID in the output path.
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_ProjectArtifacts.html#CodeBuild-Type-ProjectArtifacts-namespaceType
  - id: artifact-name-override
    text: The overrideArtifactName project flag lets a buildspec name override the configured artifact name.
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_ProjectArtifacts.html#CodeBuild-Type-ProjectArtifacts-overrideArtifactName
  - id: proxy-upload
    text: Builds using an explicit proxy must set proxy.upload-artifacts to yes to upload artifacts; the default is no.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.proxy.upload-artifacts
  - id: cross-account-artifacts
    text: A cross-account CodePipeline setup requires access to the artifact bucket and a customer managed KMS key, plus a trusted cross-account role; an artifact cannot pass directly between two non-pipeline accounts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html
  - id: batch-combine
    text: CombineArtifacts combines artifacts from a CodePipeline batch build into one output and requires BatchEnabled.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-config
  - id: secondary-files-required
    text: The top-level artifacts.files sequence is required even if the buildspec defines only secondary artifacts.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.artifacts.secondary-artifacts
  - id: upload-after-failure
    text: CodeBuild always attempts the UPLOAD_ARTIFACTS phase even if the BUILD phase fails.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/view-build-details-phases.html
  - id: output-bucket-region
    text: A CodeBuild S3 output bucket in a different Region from the project can cause an invalid ARN error during artifact upload.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/troubleshooting.html#troubleshooting-output-bucket-different-region
  - id: artifact-checksum
    text: "CodeBuild reports the SHA-256 and MD5 hashes of a build artifact only when the project packaging is ZIP."
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_BuildArtifacts.html#CodeBuild-Type-BuildArtifacts-sha256sum
diagrams:
  - id: codebuild-output-flow
    title: Files and values for later pipeline actions
    width: 800
    height: 320
    nodes:
      - id: build
        label: CodeBuild
        x: 40
        y: 100
        w: 160
        h: 72
        tone: devtools
        icon: codebuild
      - id: files
        label: Output files
        x: 330
        y: 30
        w: 160
        h: 72
        tone: storage
        icon: simple-storage-service
      - id: values
        label: Exported values
        x: 330
        y: 190
        w: 160
        h: 72
        tone: devtools
        icon: codepipeline
      - id: later
        label: Later action
        x: 620
        y: 100
        w: 160
        h: 72
        tone: devtools
        icon: codepipeline
    edges:
      - from: build
        to: files
        step: 1
      - from: build
        to: values
        step: 2
      - from: files
        to: later
        step: 3
      - from: values
        to: later
        step: 4
    steps:
      - Select output files in the buildspec.
      - Export named values through the action namespace.
      - A later action consumes the output artifact.
      - A later action references the namespaced value.
cards:
  - id: codebuild-014
    q: A team needs files from a CodeBuild build in a later CodePipeline action. How should it pass
      them?
    a: Select files in the buildspec `artifacts` section and declare the CodeBuild action output
      artifact. The later action consumes that output as an input.
    facts:
      - artifact-files
      - pipeline-artifacts
  - id: codebuild-015
    q: How can a CodeBuild action pass a non-secret version value to a later CodePipeline action?
    a: List it under `env.exported-variables`, give the action a namespace, and reference
      `#{namespace.variable}` later. Values stop changing at the end of `post_build`.
      Project-configured secrets and variables beginning `AWS_` cannot be exported.
    facts:
      - export-list
      - namespace
      - export-window
      - export-restrictions
  - id: codebuild-020
    q: A CodePipeline build needs a compiled package and a separate test bundle from one CodeBuild
      action. How must its outputs be named?
    a: Define both under `artifacts.secondary-artifacts`. Every CodePipeline output name must match its
      buildspec artifact identifier.
    facts:
      - multiple-artifacts
  - id: codebuild-035
    q: A CodeBuild project can write to S3 but cannot encrypt artifacts with a customer managed KMS key.
      What access should the team inspect?
    a: Inspect access to the KMS key and its key policy for CodeBuild. S3 output permissions do not by
      themselves authorize use of a customer managed key.
    facts:
      - artifact-key
      - custom-key
  - id: codebuild-048
    q: A CodePipeline CodeBuild action receives two source artifacts. How does it find the buildspec?
    a: Set `PrimarySource` to one input artifact. CodeBuild looks for the buildspec there and extracts each input into its own directory.
    facts: [primary-source]
  - id: codebuild-049
    q: A standalone CodeBuild project needs each S3 output as a ZIP under a build-specific path. Which settings matter?
    a: Set packaging to `ZIP` and namespace type to `BUILD_ID`. Their defaults are an uncompressed folder and no build ID.
    facts: [standalone-output, standalone-namespace]
  - id: codebuild-050
    q: A standalone CodeBuild project needs its buildspec to generate a unique S3 artifact name. What project setting permits it?
    a: Enable `overrideArtifactName` so the buildspec name overrides the project artifact name.
    facts: [artifact-name-override]
  - id: codebuild-051
    q: A CodeBuild build uses an explicit proxy and cannot upload its artifact. Which buildspec setting should the team check?
    a: Set `proxy.upload-artifacts` to `yes`. It defaults to `no`.
    facts: [proxy-upload]
  - id: codebuild-052
    q: A CodePipeline build artifact must reach a CodeDeploy action in another account. What access is needed?
    a: Grant the cross-account role access to the artifact bucket and customer managed KMS key, and configure its trust. An artifact cannot pass directly between two non-pipeline accounts.
    facts: [cross-account-artifacts]
  - id: codebuild-053
    q: A CodePipeline CodeBuild batch action needs one combined output artifact. Which options should it enable?
    a: Enable `BatchEnabled` and `CombineArtifacts`. The latter combines the batch builds' outputs.
    facts: [batch-combine]
  - id: codebuild-054
    q: A CodeBuild buildspec defines only secondary artifacts. Can it omit the top-level artifacts.files sequence?
    a: No. The top-level `artifacts.files` sequence is still required.
    trap: true
    facts: [secondary-files-required]
  - id: codebuild-055
    q: A CodeBuild BUILD phase fails. Is the artifact upload phase skipped?
    a: No. CodeBuild still attempts `UPLOAD_ARTIFACTS`.
    trap: true
    facts: [upload-after-failure]
  - id: codebuild-056
    q: CodeBuild reports an invalid ARN while uploading an S3 artifact. What Region mismatch should the team check?
    a: Check that the output bucket is in the same Region as the CodeBuild project.
    facts: [output-bucket-region]
  - id: codebuild-057
    q: "A CodeBuild project writes S3 artifacts with default packaging, and an auditor needs the SHA-256 hash CodeBuild reports for each artifact. What must change?"
    a: "Set packaging to ZIP. CodeBuild reports the SHA-256 and MD5 hashes only for ZIP-packaged artifacts; the default is an uncompressed folder."
    facts:
      - artifact-checksum
      - standalone-output
---
CodeBuild artifacts are output files selected for later use. Exported variables pass named values between CodePipeline actions. Use artifacts for the files and variables for values such as a version identifier.

### How it works

1. Select output files with `artifacts.files`. Use `base-directory` to select their parent directory and `discard-paths` to flatten directory paths if required.
2. Declare the CodeBuild action outputs in CodePipeline. CodePipeline stores artifacts in its S3 artifact bucket. Later actions take those outputs as inputs. With multiple inputs, set `PrimarySource` to the artifact containing the buildspec; each input is extracted separately.
3. For multiple outputs, define every output under `secondary-artifacts` and match each identifier to its CodePipeline output name. Include the top-level `artifacts.files` sequence even when only secondary artifacts are defined.
4. List values under `env.exported-variables`. Give the action a namespace, a name grouping its output variables, and read them later with `#{namespace.variable}`.
5. Authorize artifact encryption. CodeBuild needs KMS key access; a customer managed key requires an appropriate key policy.
6. For standalone S3 output, choose `ZIP` packaging or an uncompressed folder and optionally include `BUILD_ID` in the path. Enable `overrideArtifactName` to use the buildspec name. CodePipeline manages its own output location and packaging.

### Exam cues

- If the question says one build must produce separate packages for later actions, think secondary artifacts, because output identifiers map each bundle to a pipeline output.
- If the question says a later action needs a build version, think an exported variable and namespace, because CodePipeline can resolve the value during execution.
- If the question says an S3 upload fails on encryption, think KMS key access, because writing an object and using its encryption key require separate authorization.
- If an explicit proxy blocks artifact upload, set `proxy.upload-artifacts` to `yes`, because the default is `no`.
- If a CodePipeline batch build needs one output, enable `BatchEnabled` and `CombineArtifacts`.
- If a CodeDeploy action in another account needs a pipeline artifact, configure role trust and bucket and customer managed KMS key access. Artifacts cannot pass directly between two non-pipeline accounts.
- If upload reports an invalid ARN, check that the S3 output bucket and CodeBuild project are in the same Region.
- If the question says verify a CodeBuild artifact with the hash CodeBuild reports, think ZIP packaging, because the hashes exist only for ZIP artifacts.

### Remember

- CodePipeline CodeBuild action: 1 to 5 input artifacts and 0 to 5 output artifacts.
- Export values can change from `install` through the end of `post_build`.
- Project-configured Parameter Store and Secrets Manager secrets cannot be exported. Variables starting `AWS_` cannot be exported.
- Default artifact encryption key: the account's AWS managed key for S3.
- Standalone S3 artifacts default to an uncompressed folder and no build ID in the path.
- CodeBuild attempts artifact upload even when the build phase fails.

> **Trap:** Defining several pipeline output names is insufficient. Each must match an identifier in the buildspec's secondary artifacts.
