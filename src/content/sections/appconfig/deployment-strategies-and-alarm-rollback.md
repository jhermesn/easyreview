---
title: Deployment strategies and alarm rollback
level: associate
order: 20
facts:
  - id: configuration-without-code-release
    text: AppConfig changes application behavior through feature flags and dynamic configuration without redeploying application code.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html
  - id: environment-targets
    text: An AppConfig environment groups deployment targets and can have CloudWatch alarms associated with it.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-environment.html
  - id: metric-alarm
    text: A CloudWatch metric alarm compares a metric or expression with a threshold over time.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html
  - id: deployment-inputs
    text: StartDeployment identifies the application, environment, configuration profile, configuration version, and deployment strategy.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_StartDeployment.html
  - id: linear-growth
    text: LINEAR deployments add the configured growth-factor percentage of targets at evenly spaced intervals.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html
  - id: exponential-growth
    text: EXPONENTIAL deployments grow according to G*(2^N), where G is the growth factor and N is the step number starting at zero.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_CreateDeploymentStrategy.html#appconfig-CreateDeploymentStrategy-request-GrowthType
  - id: growth-factor
    text: Growth factor, also called step percentage, specifies the percentage of callers targeted at a deployment step.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html
  - id: deployment-window
    text: Deployment time is the window over which configuration rolls out in intervals, not a timeout.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html
  - id: final-bake
    text: Final bake time monitors configured CloudWatch alarms after configuration reaches 100% of targets and before deployment completes; an alarm can cause rollback during this period.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_CreateDeploymentStrategy.html#appconfig-CreateDeploymentStrategy-request-FinalBakeTimeInMinutes
  - id: predefined-linear-twenty
    text: AppConfig.Linear20PercentEvery6Minutes releases 20% every six minutes over 30 minutes, followed by 30 minutes of alarm monitoring.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy-predefined.html
  - id: predefined-canary
    text: AppConfig.Canary10Percent20Minutes uses exponential growth with a 10% growth factor over 20 minutes, followed by 10 minutes of alarm monitoring.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy-predefined.html
  - id: predefined-all-at-once
    text: AppConfig.AllAtOnce releases to all targets immediately, followed by 10 minutes of alarm monitoring.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy-predefined.html
  - id: predefined-test-strategy
    text: AppConfig.Linear50PercentEvery30Seconds releases half the targets every 30 seconds over one minute, followed by one minute of alarm monitoring, and AWS recommends it only for tests or demonstrations.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy-predefined.html
  - id: alarm-rollback-states
    text: A configured CloudWatch alarm entering ALARM or INSUFFICIENT_DATA during deployment causes automatic rollback to the previous configuration version.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html
  - id: alarm-actions-required
    text: Disabling actions on an associated CloudWatch alarm prevents automatic AppConfig rollback for that alarm.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html
  - id: monitor-role-permissions
    text: The alarm-monitoring IAM role must allow cloudwatch:DescribeAlarms and trust appconfig.amazonaws.com.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/setting-up-appconfig.html#getting-started-with-appconfig-cloudwatch-alarms-permissions
  - id: monitor-account
    text: The alarm-monitoring role must be in the current account, and AppConfig monitors only alarms in that account by default.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/setting-up-appconfig.html#getting-started-with-appconfig-cloudwatch-alarms-permissions
  - id: stop-in-progress
    text: StopDeployment can manually roll back an in-progress AppConfig deployment.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html
  - id: revert-completed
    text: StopDeployment with AllowRevert can revert a completed deployment within 72 hours of completion and sets its status to REVERTED.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_StopDeployment.html
  - id: agent-cache-poll
    text: AWS recommends AppConfig Agent for retrieval; it caches configuration locally and polls the data plane asynchronously for updates.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/about-data-plane.html
  - id: direct-session
    text: A direct client starts a configuration session using application, environment, and profile identifiers, then periodically calls GetLatestConfiguration.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/about-data-plane.html
  - id: session-once
    text: StartConfigurationSession is called once per application, environment, profile, and client to establish a retrieval session.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/about-data-plane.html
  - id: initial-token
    text: StartConfigurationSession returns InitialConfigurationToken for the first GetLatestConfiguration request.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_StartConfigurationSession.html#API_appconfigdata_StartConfigurationSession_ResponseElements
  - id: polling-token-chain
    text: Each GetLatestConfiguration request consumes a single-use token, and its response supplies NextPollConfigurationToken for the next request.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_GetLatestConfiguration.html
  - id: token-lifetime
    text: Configuration retrieval tokens remain valid for up to 24 hours but may each be used only once.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_StartConfigurationSession.html#API_appconfigdata_StartConfigurationSession_ResponseElements
  - id: polling-interval
    text: Clients must wait the returned NextPollIntervalInSeconds before polling again; its default is 60 seconds unless RequiredMinimumPollIntervalInSeconds specifies a desired interval.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_GetLatestConfiguration.html#API_appconfigdata_GetLatestConfiguration_ResponseElements
  - id: unchanged-empty-response
    text: GetLatestConfiguration can return an empty configuration body when the client already has the latest version.
    source: https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_GetLatestConfiguration.html
diagrams:
  - id: appconfig-rollout-and-bake
    title: Reach every target, then finish the bake period
    width: 860
    height: 170
    nodes:
      - { id: rollout, label: AppConfig, sub: Gradual rollout, icon: appconfig, x: 20, y: 45, w: 170, h: 86, tone: mgmt, info: "The deployment strategy controls how configuration becomes available to targets." }
      - { id: targets, label: Targets, sub: 100% reached, icon: res-client, x: 235, y: 45, w: 170, h: 86, tone: user }
      - { id: bake, label: CloudWatch, sub: Final bake period, icon: cloudwatch, x: 450, y: 45, w: 170, h: 86, tone: mgmt, info: "Continue monitoring configured alarms. ALARM or INSUFFICIENT_DATA can trigger rollback during deployment, including bake time, when alarm actions are enabled." }
      - { id: complete, label: Complete, x: 665, y: 60, w: 170, h: 56, tone: neutral }
    edges:
      - { from: rollout, to: targets, step: 1 }
      - { from: targets, to: bake, step: 2 }
      - { from: bake, to: complete, step: 3 }
    steps:
      - Release configuration according to the strategy while monitoring alarms.
      - After reaching every target, continue alarm monitoring for the final bake time.
      - Complete when the bake period finishes without triggering rollback.
  - id: appconfig-direct-polling
    title: Direct configuration retrieval uses a session and fresh tokens
    width: 780
    height: 530
    nodes:
      - { id: start, label: Client, sub: Start session, icon: res-client, x: 20, y: 30, w: 180, h: 86, tone: user }
      - { id: session, label: AppConfig, sub: Initial token, icon: appconfig, x: 580, y: 30, w: 180, h: 86, tone: mgmt }
      - { id: poll, label: Client, sub: Get configuration, icon: res-client, x: 20, y: 220, w: 180, h: 86, tone: user }
      - { id: data, label: AppConfig, sub: Data and next token, icon: appconfig, x: 580, y: 220, w: 180, h: 86, tone: mgmt, info: "The response includes the next token and polling interval. Configuration data can be empty when unchanged." }
      - { id: next, label: Client, sub: Wait, then poll again, icon: res-client, x: 20, y: 410, w: 180, h: 86, tone: user }
      - { id: updated, label: AppConfig, sub: Same session, new token, icon: appconfig, x: 580, y: 410, w: 180, h: 86, tone: mgmt }
    edges:
      - { from: start, to: session, step: 1, label: StartConfigurationSession }
      - { from: session, to: poll, step: 2, label: InitialConfigurationToken }
      - { from: poll, to: data, step: 3, label: GetLatestConfiguration }
      - { from: data, to: next, step: 4, label: Next token and interval }
      - { from: next, to: updated, step: 5, dashed: true, label: GetLatestConfiguration }
    steps:
      - Establish the session for the application, environment, and profile.
      - Use the initial token for the first configuration request.
      - Receive configuration, a fresh token, and the next polling interval.
      - Keep the returned token and wait for the returned polling interval.
      - Repeat GetLatestConfiguration with the fresh token in the same session.
cards:
  - id: appconfig-001
    q: A team has deployed application code and needs to enable its feature gradually without another code deployment. Which AWS service fits?
    a: AWS AppConfig. Release a feature flag gradually with a deployment strategy and configure CloudWatch alarms for rollback.
    trap: true
    facts: [configuration-without-code-release, environment-targets, linear-growth, alarm-rollback-states]
  - id: appconfig-002
    q: Which AWS service gradually releases changed settings without redeploying code and restores the previous configuration if health alarms trigger?
    a: AWS AppConfig. Choose a deployment strategy, associate environment alarms, and grant monitoring permissions. Alarm monitoring continues through final bake time.
    facts: [configuration-without-code-release, environment-targets, monitor-role-permissions, alarm-rollback-states, final-bake]
  - id: appconfig-013
    q: How do AWS AppConfig LINEAR and EXPONENTIAL deployment strategies differ?
    a: LINEAR adds equal growth-factor increments at evenly spaced intervals. EXPONENTIAL grows according to G*(2^N), starting with N equal to zero.
    facts: [linear-growth, exponential-growth]
  - id: appconfig-014
    q: An AWS AppConfig deployment has reached every target. Why can an alarm still roll it back before completion?
    a: Final bake time continues alarm monitoring after 100% of targets have configuration. Reaching every target does not end deployment monitoring.
    trap: true
    facts: [final-bake, alarm-rollback-states]
  - id: appconfig-015
    q: Which CloudWatch alarm states cause automatic rollback during an AWS AppConfig deployment when monitoring is configured?
    a: ALARM or INSUFFICIENT_DATA. AppConfig restores the previous configuration version.
    facts: [alarm-rollback-states]
  - id: appconfig-016
    q: An AWS AppConfig environment has a configured alarm and monitoring permissions, but someone disabled the alarm's actions. Will that alarm trigger automatic rollback?
    a: No. Automatic rollback does not occur for an associated alarm with disabled actions.
    trap: true
    facts: [alarm-actions-required]
  - id: appconfig-017
    q: What IAM setup does AWS AppConfig require to monitor CloudWatch alarms for rollback?
    a: An environment monitoring role with cloudwatch:DescribeAlarms that trusts appconfig.amazonaws.com. The role must belong to the current account.
    facts: [environment-targets, monitor-role-permissions, monitor-account]
  - id: appconfig-018
    q: What rollout and bake times does AppConfig.Linear20PercentEvery6Minutes use in AWS AppConfig?
    a: Release 20% every six minutes over 30 minutes, then monitor alarms for another 30 minutes.
    facts: [predefined-linear-twenty]
  - id: appconfig-019
    q: Does AWS AppConfig's AppConfig.AllAtOnce strategy finish immediately after releasing configuration to every target?
    a: No. It releases immediately but continues monitoring alarms for 10 minutes before completion.
    trap: true
    facts: [predefined-all-at-once]
  - id: appconfig-020
    q: An AWS AppConfig deployment completed an hour ago and the team must restore its previous configuration. Which API option supports this?
    a: StopDeployment with AllowRevert. Completed deployments can be reverted within 72 hours, changing their status to REVERTED.
    facts: [revert-completed]
  - id: appconfig-021
    q: How should an application retrieve AWS AppConfig settings while avoiding a remote request for every local configuration read?
    a: Use AppConfig Agent. It caches configuration locally and polls asynchronously for updates.
    facts: [agent-cache-poll]
  - id: appconfig-022
    q: An application cannot use AWS AppConfig Agent. What API sequence retrieves configuration changes directly?
    a: Call StartConfigurationSession once, then poll GetLatestConfiguration. Use InitialConfigurationToken first and the returned NextPollConfigurationToken for each later poll.
    facts: [direct-session, session-once, initial-token, polling-token-chain]
  - id: appconfig-023
    q: Can an AWS AppConfig retrieval client reuse a configuration token for 24 hours?
    a: No. A token is valid for up to 24 hours but is single use. Replace it with NextPollConfigurationToken after each request.
    trap: true
    facts: [token-lifetime, polling-token-chain]
  - id: appconfig-024
    q: An AWS AppConfig GetLatestConfiguration response has no configuration body. What should a client that already has configuration do?
    a: Keep its existing configuration, wait NextPollIntervalInSeconds, and poll with the new token. An empty body can mean the configuration is unchanged.
    facts: [unchanged-empty-response, polling-interval, polling-token-chain]
  - id: appconfig-025
    q: Which value controls the wait between direct AWS AppConfig configuration polls, and what is its default?
    a: NextPollIntervalInSeconds, normally 60 seconds unless RequiredMinimumPollIntervalInSeconds specifies a desired interval. Follow the interval returned by the service.
    facts: [polling-interval]
---

AWS AppConfig releases configuration changes separately from application code. A deployment strategy controls how quickly targets receive a setting or feature flag. CloudWatch alarms can restore the previous version if the change causes problems.

### How it works

1. Define an environment, a group of application targets receiving configuration. Associate CloudWatch health alarms, checks that compare a measured value with a threshold over time. Supply a monitoring role that trusts `appconfig.amazonaws.com` and allows `cloudwatch:DescribeAlarms`.
2. Start deployment with the application, environment, profile, configuration version, and strategy. Deployment time is the rollout window, not a timeout.
3. The strategy releases configuration in stages. Its growth factor is the percentage of callers targeted per step. `LINEAR` uses equal increments; `EXPONENTIAL` uses `G*(2^N)`, with growth factor `G` and step number `N` starting at zero.
4. Applications retrieve the available configuration. AWS recommends AppConfig Agent, which keeps a local copy and polls, meaning it repeatedly checks the service for changes. A direct client starts a session once and then calls `GetLatestConfiguration` periodically.
5. Monitor environment alarms during rollout. `ALARM` or `INSUFFICIENT_DATA` triggers rollback to the previous configuration when monitoring permissions and alarm actions are enabled.
6. After configuration reaches **100%** of targets, continue monitoring for final bake time, the observation period before completion. An alarm can still trigger rollback here.

| Predefined strategy | Rollout | Final alarm monitoring |
|---|---|---|
| `AppConfig.Linear20PercentEvery6Minutes` | 20% every six minutes over 30 minutes | 30 minutes |
| `AppConfig.Canary10Percent20Minutes` | Exponential, 10% growth factor over 20 minutes | 10 minutes |
| `AppConfig.AllAtOnce` | Immediately to every target | 10 minutes |
| `AppConfig.Linear50PercentEvery30Seconds` | Half every 30 seconds over one minute | One minute; AWS recommends this strategy only for tests or demonstrations |

For direct retrieval, `StartConfigurationSession` returns an initial token, a value tracking the retrieval session. Use it in the first `GetLatestConfiguration` call. Each response returns `NextPollConfigurationToken` and `NextPollIntervalInSeconds`: wait that interval and use the new token next. An empty configuration body can mean your client already has the latest version, so keep its current settings.

### Exam cues

- If the question says enable already deployed functionality gradually, think an AppConfig feature flag and deployment strategy, because configuration can change behavior without another code release.
- If the question says restore settings when health degrades, think environment alarms plus a monitoring role, because alarm states drive rollback.
- If the question says failure occurs after every target has received the change, think final bake time, because monitoring continues before completion.
- If the question says applications need configuration updates with local reads, think AppConfig Agent, because it caches settings and polls for changes.
- If the question says stop a bad release while it is progressing, think `StopDeployment`, because it supports manual rollback.
- If the question says a completed release must be undone within 72 hours, think `StopDeployment` with `AllowRevert`, because it can revert a completed deployment.

### Remember

- Deployment time and final bake time are separate periods.
- Automatic rollback responds to **ALARM** and **INSUFFICIENT_DATA**. Disabled alarm actions prevent it.
- The monitoring role belongs to the current account. Alarms are in that account by default.
- Retrieval tokens are **single use**, even though each is valid for up to **24 hours**.
- The direct polling interval defaults to **60 seconds** unless a desired interval is supplied through `RequiredMinimumPollIntervalInSeconds`. Follow the returned interval.
- A completed deployment can be reverted within **72 hours** and receives status `REVERTED`.

> **Trap:** A deployment at 100% can still roll back during final bake time. `AppConfig.AllAtOnce` also has an observation period.

> **Trap:** Creating alarms alone does not configure rollback. Associate them with the environment, grant monitoring permissions, and keep alarm actions enabled.

> **Trap:** Deploying configuration does not remove the need for application retrieval. Poll with the agent or a direct API client; do not create a new session for every poll.
