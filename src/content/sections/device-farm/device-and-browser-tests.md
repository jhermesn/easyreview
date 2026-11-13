---
title: Device and browser tests
level: associate
order: 10
facts:
  - id: purpose
    text: AWS Device Farm tests Android, iOS and web apps on real physical phones and tablets hosted by AWS.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#welcome
  - id: region
    text: Device Farm is available in the US West (Oregon) Region, us-west-2.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#welcome
  - id: remote
    text: Remote access allows interactive use of a device in a browser or local Appium testing through a managed endpoint.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#remote-access-intro
  - id: automated
    text: Device Farm runs uploaded app tests on multiple devices in parallel in a managed test environment.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#automated-test-intro
  - id: results
    text: Automated test reports include results, logs, screenshots and test artifacts.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#automated-test-intro
  - id: run
    text: A run combines a specific app build, test set and device set and contains one or more jobs.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-runs.html#test-runs
  - id: job
    text: A job tests one app against one device.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#welcome-terminology
  - id: device-pool
    text: A device pool is a collection of devices that typically share characteristics such as platform, manufacturer or model.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#welcome-terminology
  - id: browser
    text: Device Farm desktop browser testing runs Selenium tests on AWS-hosted desktop browsers in parallel and produces videos and Selenium logs.
    source: https://docs.aws.amazon.com/devicefarm/latest/testgrid/what-is-testgrid.html#what-is-testgrid
  - id: fuzz
    text: Device Farm offers a built-in fuzz test for Android and iOS that does not require the user to write test scripts.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types.html#test-types-built-in
  - id: fuzz-events
    text: The Device Farm built-in fuzz test sends random user interface events to devices and reports results.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types-built-in-fuzz.html#test-types-built-in-fuzz
  - id: selenium
    text: Selenium is a testing framework that uses scripts to control a web browser and simulate user interaction.
    source: https://docs.aws.amazon.com/devicefarm/latest/testgrid/getting-started.html#getting-started
  - id: frameworks
    text: Device Farm supports Appium and Android Instrumentation for Android tests, and Appium, XCTest and XCTest UI for iOS tests.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types.html#test-types-framework
  - id: appium
    text: Appium is an open-source tool for automating native and mobile web applications.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types-appium.html#test-types-appium
  - id: retention
    text: Device Farm stores uploaded apps and files for 30 days and run results, logs and screenshots for 400 days.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-runs.html#test-runs-retention
  - id: job-timeout
    text: The Device Farm console defaults the per-device job timeout to 150 minutes.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/how-to-create-test-run.html#how-to-create-test-run-console
  - id: recording
    text: The Device Farm console offers an option to enable video recording during a test run.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/how-to-create-test-run.html#how-to-create-test-run-console
  - id: pipeline
    text: Service-side execution can be used to run Device Farm tests from a CI/CD pipeline.
    source: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types.html#test-types
cards:
  - id: device-farm-001
    q: What does AWS Device Farm provide for mobile application testing?
    a: Testing on AWS-hosted physical phones and tablets, including automated tests and interactive remote access.
    facts: [purpose, remote, automated]
  - id: device-farm-002
    q: A team needs to run Selenium tests on multiple desktop browsers in parallel. Which AWS Device Farm feature fits?
    a: Device Farm desktop browser testing. It also produces videos and Selenium logs.
    facts: [browser]
  - id: device-farm-003
    q: A developer needs to reproduce a mobile app problem interactively on a physical device. Which AWS Device Farm feature fits?
    a: Remote access. It allows real-time interaction through a browser.
    facts: [remote, purpose]
  - id: device-farm-004
    q: In AWS Device Farm, how does a run differ from a job?
    a: A run combines an app build, tests and devices; each job tests one app on one device.
    facts: [run, job]
  - id: device-farm-005
    q: Can AWS Device Farm test an Android or iOS app without a user-written test script?
    a: Yes. Its built-in fuzz test does not require one.
    facts: [fuzz]
    trap: true
  - id: device-farm-006
    q: How long does AWS Device Farm retain uploaded apps and test results?
    a: Uploaded apps and files are retained for 30 days; run results, logs and screenshots for 400 days.
    facts: [retention]
  - id: device-farm-007
    q: Which AWS Region hosts AWS Device Farm?
    a: US West (Oregon), us-west-2.
    facts: [region]
  - id: device-farm-008
    q: What is the default per-device job timeout when creating an AWS Device Farm test run in the console?
    a: 150 minutes.
    facts: [job-timeout]
---

AWS Device Farm tests mobile and web applications on physical phones and tablets hosted by AWS. It also runs Selenium tests on hosted desktop browsers. Selenium is a framework for scripts that control a browser and simulate user actions.

### How it works

1. For automated mobile testing, upload the app and tests. Select a device pool, a collection of devices with shared characteristics.
2. A run combines a specific app build, tests and devices. It contains jobs, each testing one app on one device.
3. Device Farm executes tests in parallel on available devices and produces a report with results, logs, screenshots and test artifacts. Video recording can be enabled for a run.
4. For interactive debugging, use remote access to a physical device in a browser. Alternatively, run local Appium tests against a managed endpoint. Appium is a tool for automating native and mobile web applications.

### Exam cues

- If the question says test an app on physical mobile devices in parallel, think Device Farm automated testing, because it runs uploaded tests on managed devices.
- If the question says reproduce a mobile issue manually on a specific device, think Device Farm remote access, because it provides interactive access.
- If the question says run Selenium tests across desktop browsers, think Device Farm desktop browser testing, because it hosts browser instances and records videos and logs.
- If the question says test Android or iOS without writing scripts, think the Device Farm built-in fuzz test, because it sends random user interface events and reports results.

### Remember

- Device Farm is available in US West (Oregon), `us-west-2`.
- Uploaded apps and files are retained for 30 days; run results, logs and screenshots are retained for 400 days.
- The console's default per-device job timeout is 150 minutes.
- Service-side test execution can be used from an automated software release pipeline.
- Supported mobile frameworks include Appium and Android Instrumentation for Android, and Appium, XCTest and XCTest UI for iOS.

> **Trap:** A Device Farm job tests one app on one device. A run can contain multiple jobs and devices.
