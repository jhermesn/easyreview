---
title: Test and coverage reports
level: associate
order: 40
facts:
  - id: test-formats
    text: Supported test formats are JUnit XML, Cucumber JSON, NUnit XML, NUnit3 XML, TestNG XML, and
      Visual Studio TRX or TRX XML.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html
  - id: default-format
    text: The default report file-format is JUNITXML.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.reports.file-format
  - id: group
    text: A report group holds reports with shared settings such as export configuration and permissions.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-report-group.html
  - id: group-limit
    text: A build project can specify up to 5 report groups.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-report-group.html
  - id: create-group
    text: A buildspec report group name creates a group; an ARN selects an existing group.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html
  - id: files
    text: reports.files identifies the generated test result files to collect.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.reports.files
  - id: report-per-run
    text: Each build run creates a new report in its configured report group.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-report-group.html
  - id: expiry
    text: A test report expires 30 days after creation and cannot then be viewed.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html
  - id: raw-export
    text: A report group can export raw result files to S3; those files do not have CodeBuild report
      expiry.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html
  - id: export-role
    text: The project service role supplies permissions to upload report exports to S3.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html
  - id: coverage-formats
    text: Coverage formats are JaCoCo XML, Cobertura XML, Clover XML, SimpleCov JSON, and LCOV INFO.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/code-coverage-report.html
  - id: coverage
    text: Line coverage measures covered statements; branch coverage measures covered control-flow
      branches.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/code-coverage-report.html
  - id: simplecov
    text: SimpleCov coverage input must come from simplecov, not simplecov-json.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/code-coverage-report.html
  - id: test-commands
    text: Coverage analysis commands run in the build or post_build phase and generate files for reports.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/code-coverage-report.html
diagrams: []
cards:
  - id: codebuild-008
    q: Which CodeBuild test and coverage formats can a buildspec report group collect?
    a: "Tests: JUnit XML, Cucumber JSON, NUnit XML, NUnit3 XML, TestNG XML, and Visual Studio TRX or TRX
      XML. Coverage: JaCoCo XML, Cobertura XML, Clover XML, SimpleCov JSON, and LCOV INFO.
      `JUNITXML` is the default report format."
    facts:
      - test-formats
      - coverage-formats
      - default-format
  - id: codebuild-009
    q: A team needs raw CodeBuild test results after the report expires. What should it configure?
    a: Configure S3 export on the report group. Reports expire after `30 days`; raw S3 exports do not
      have that CodeBuild report expiry.
    facts:
      - expiry
      - raw-export
  - id: codebuild-027
    q: How does a CodeBuild buildspec publish a test report from test tool output?
    a: Point `reports.files` at the generated result files and supply a report group name or existing
      group ARN. A name creates a group; each build creates a report. A project supports up to `5`
      groups.
    facts:
      - files
      - create-group
      - report-per-run
      - group-limit
  - id: codebuild-028
    q: How long can a CodeBuild test report be viewed, and does S3 export extend that report lifetime?
    a: "`30 days` from creation. S3 export preserves raw result files; it does not extend the report
      view lifetime."
    facts:
      - expiry
      - raw-export
    trap: true
  - id: codebuild-029
    q: What do CodeBuild line and branch coverage measure, and which tool must generate SimpleCov JSON
      input?
    a: Line coverage measures covered statements; branch coverage measures covered branches of control
      structures. Use `simplecov`, not `simplecov-json`, for SimpleCov input.
    facts:
      - coverage
      - simplecov
  - id: codebuild-034
    q: A CodeBuild build should add results to an existing shared report group, but naming the group
      creates another group. What should the team supply?
    a: Supply the existing report group ARN in `reports`. A name creates a report group; an ARN selects
      an existing one.
    facts:
      - create-group
---
CodeBuild reports collect files produced by test tools. A report group holds report runs and shared settings such as export permissions. Code coverage measures how much code the tests exercise.

### How it works

1. Run tests or coverage analysis in build commands. Coverage commands can run in `build` or `post_build`.
2. Configure `reports.files` to locate the result files and select the matching `file-format`.
3. Supply a report group name to create a group, or an existing group's ARN, its AWS resource identifier, to reuse it. Each build adds a report.
4. Configure the group's S3 export if raw files must remain after the report expires. Grant the project service role permission to upload them.

| Result type | Accepted formats | Meaning |
|---|---|---|
| Tests | JUnit XML, Cucumber JSON, NUnit XML, NUnit3 XML, TestNG XML, Visual Studio TRX or TRX XML | Results produced by the test framework. |
| Line coverage | JaCoCo XML, Cobertura XML, Clover XML, SimpleCov JSON, LCOV INFO | Statements exercised by tests. |
| Branch coverage | JaCoCo XML, Cobertura XML, Clover XML, SimpleCov JSON, LCOV INFO | Branches exercised in control structures. |

### Exam cues

- If the question says results must be retained beyond 30 days, think report group S3 export, because the report view expires but raw exported files do not have that expiry.
- If the question says several builds must use an existing report group, think its ARN, because a buildspec name creates a group.
- If the question says line coverage looks good but conditional paths are untested, think branch coverage, because it measures branches of control structures.

### Remember

- Maximum: 5 report groups per project.
- Test report lifetime: 30 days after creation.
- Default report format: `JUNITXML`.
- SimpleCov input comes from `simplecov`, not `simplecov-json`.

> **Trap:** Exporting raw files to S3 preserves those files. It does not make an expired CodeBuild report viewable again.
