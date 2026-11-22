---
title: Reviewer, Profiler, and availability
level: associate
order: 10
facts:
  - id: reviewer-analysis
    text: CodeGuru Reviewer detects potential defects and suggests improvements in Java and Python code.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html#welcome
  - id: reviewer-issue-types
    text: CodeGuru Reviewer identifies complex issues including resource leaks and security problems.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html#welcome-recommendations
  - id: reviewer-pull-requests
    text: Incremental reviews can show recommendations in repository pull requests.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html#welcome-repositories
  - id: reviewer-availability
    text: Since November 7, 2025, CodeGuru Reviewer only works with existing repository associations and cannot create new ones.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/codeguru-reviewer-availability-change.html#codeguru-reviewer-availability-change
  - id: reviewer-maintenance
    text: CodeGuru Reviewer is in maintenance; AWS continues to operate and support it without adding functionality.
    source: https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html#maintenance_services
  - id: secrets
    text: CodeGuru Reviewer integrates with Secrets Manager to find unprotected secrets in code; found hardcoded secrets can be moved to Secrets Manager.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating-codeguru.html#integrating-codeguru
  - id: alternatives
    text: Amazon Q Developer offers code review including security and secrets detection.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/codeguru-reviewer-availability-change.html#run-code-reviews-with-amazon-q-developer
  - id: inspector
    text: Amazon Inspector scans discovered GitHub and GitLab repositories for vulnerabilities and unintended network exposure.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/codeguru-reviewer-availability-change.html#run-code-scans-with-amazon-inspector
  - id: profiler-runtime
    text: CodeGuru Profiler collects runtime performance data from live applications and identifies CPU bottlenecks and expensive code.
    source: https://docs.aws.amazon.com/codeguru/latest/profiler-ug/what-is-codeguru-profiler.html#what-is-codeguru-profiler
  - id: profiler-languages
    text: CodeGuru Profiler supports JVM languages and Python 3.6 or later; heap summary visualization is available for JVM applications but not Python.
    source: https://docs.aws.amazon.com/codeguru/latest/profiler-ug/what-is-codeguru-profiler.html#what-is-language-support
  - id: q-github-secrets
    text: Amazon Q Developer can review GitHub repositories and detect exposed secrets.
    source: https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/codeguru-reviewer-availability-change.html#run-code-reviews-with-amazon-q-developer
cards:
  - id: codeguru-007
    q: Which AWS developer tool can review a GitHub repository for exposed secrets?
    a: Amazon Q Developer.
    facts: [q-github-secrets]
  - id: codeguru-001
    q: How do Amazon CodeGuru Reviewer and Profiler differ?
    a: Reviewer analyzes source code for defects; Profiler analyzes runtime performance in live applications.
    facts: [reviewer-analysis, profiler-runtime]
  - id: codeguru-002
    q: "What can CodeGuru Reviewer check during a code review?"
    a: "It identifies potential defects, including resource leaks and security problems, in Java and Python code."
    facts:
      - reviewer-analysis
      - reviewer-issue-types
  - id: codeguru-003
    q: A team with an existing CodeGuru Reviewer association needs to find hardcoded secrets. What integration helps?
    a: Reviewer integrates with AWS Secrets Manager to find unprotected secrets, which can then be moved to Secrets Manager.
    facts: [secrets, reviewer-availability]
  - id: codeguru-004
    q: "An operations team plans to use CodeGuru Profiler heap summaries for both JVM and Python applications. What limitation must its monitoring plan account for?"
    a: "Heap summary visualization is available only for JVM applications; Python applications need another way to inspect heap usage."
    facts:
      - profiler-languages
  - id: codeguru-005
    q: "Which service can scan GitHub or GitLab repositories for vulnerabilities and unintended network exposure?"
    a: "Amazon Inspector can scan discovered repositories for both."
    facts:
      - inspector
  - id: codeguru-006
    q: A team needs a new code review tool after CodeGuru Reviewer stopped accepting repository associations. What AWS option provides code review?
    a: Amazon Q Developer offers code review, including security and secrets detection.
    facts: [reviewer-availability, alternatives]
---
Amazon CodeGuru offers tools for finding code defects and understanding application performance. Reviewer examines code; Profiler examines a running application.

### How it works

1. CodeGuru Reviewer analyzes Java or Python code in an existing associated repository and recommends fixes for issues such as security problems and resource leaks. An incremental review can show recommendations in a pull request, a proposed change to repository code.
2. Its Secrets Manager integration detects unprotected secrets, such as hardcoded credentials. Move exposed secrets to Secrets Manager.
3. CodeGuru Profiler collects performance data from a live application. Its visualizations help locate expensive code and CPU bottlenecks.
4. For a new code review setup, consider Amazon Q Developer. Amazon Inspector also scans discovered GitHub and GitLab repositories for vulnerabilities and unintended network exposure.

### Exam cues

- If the question says find exposed secrets in a GitHub repository, think Amazon Q Developer, because it can review repositories for secrets exposure.
- If the question says find hardcoded secrets in an existing Reviewer association, think Reviewer with Secrets Manager, because it detects unprotected secrets in code.
- If the question says identify code consuming CPU in a running application, think CodeGuru Profiler, because it collects runtime performance data.
- If the question says review a newly associated repository, think Amazon Q Developer, because Reviewer stopped accepting new associations.

### Remember

- Reviewer has accepted no new repository associations since November 7, 2025.
- Reviewer is in maintenance: AWS continues support but does not add functionality.
- Profiler supports Java virtual machine (JVM) languages and Python 3.6 or later. A heap summary shows memory use and is available for JVM applications only.

> **Trap:** Reviewer recommendations are not runtime profiles. Use Profiler to investigate CPU bottlenecks in a live application.
