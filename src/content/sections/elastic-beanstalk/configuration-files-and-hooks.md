---
title: Configuration files and hooks
level: associate
order: 50
facts:
  - id: precedence
    text: Configuration precedence is direct environment settings, saved configurations, .ebextensions files, then defaults.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options.html#configuration-options-precedence
  - id: recommended
    text: Console and EB CLI recommended values are direct environment settings; remove higher-precedence values to let configuration file values apply.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options.html#configuration-options-recommendedvalues
  - id: file-format
    text: .ebextensions configuration files use YAML or JSON and have a .config extension.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html#ebextensions
  - id: file-location
    text: AWS recommends one .ebextensions directory at the source bundle root.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html#ebextensions
  - id: file-order
    text: Configuration files execute in alphabetical order.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options.html#configuration-options-precedence
  - id: unique-keys
    text: Use each top-level key once per file; duplicate keys can cause a section to be dropped.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html#ebextensions
  - id: file-keys
    text: option_settings sets environment options; Resources defines CloudFormation resources; packages, files, commands, and container_commands customize instances.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html#ebextensions
  - id: standard-only
    text: Configuration files customize EC2-based Beanstalk Standard environments.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html#ebextensions
  - id: commands
    text: commands run as root before the application and web server are set up and before source extraction.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html#linux-commands
  - id: container-commands
    text: container_commands run as root in the extracted application staging directory before final deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html#linux-container-commands
  - id: leader-only
    text: leader_only container commands run on one instance during creation and deployments, but not for launch configuration changes such as instance type changes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html#linux-container-commands
  - id: hook-stages
    text: prebuild hooks follow commands and source extraction but precede application setup.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html#platforms-linux-extend.hooks.appdeploy
  - id: predeploy-hook
    text: predeploy hooks follow container_commands and precede final deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html#platforms-linux-extend.hooks.appdeploy
  - id: postdeploy-hook
    text: postdeploy hooks run after application and proxy deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html#platforms-linux-extend.hooks.appdeploy
  - id: config-hooks
    text: Configuration deployments that update instances without recreating them use .platform/confighooks with the same three stages.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html#platforms-linux-extend.hooks.configdeploy
  - id: hook-execution
    text: Platform hooks run as root in filename order.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html#platforms-linux-extend.hooks.more
  - id: hook-failure
    text: A nonzero hook exit code aborts and fails deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html#platforms-linux-extend.hooks.more
  - id: hook-platforms
    text: Platform hooks are supported on Amazon Linux 2 and Amazon Linux 2023 platforms; they are not supported on the earlier Amazon Linux AMI platforms.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html#platforms-linux-extend.hooks
  - id: reverse-proxy
    text: A reverse proxy receives traffic on an instance and forwards requests to the application.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.proxy.html#platforms-linux-extend.proxy
diagrams:
  - id: beanstalk-hook-order
    title: Linux application customization order
    width: 1060
    height: 340
    nodes:
      - id: commands
        label: commands
        x: 20
        y: 70
        w: 180
        h: 56
        tone: neutral
      - id: prebuild
        label: prebuild
        sub: source extracted
        x: 280
        y: 70
        w: 180
        h: 56
        tone: neutral
      - id: container
        label: container_commands
        x: 540
        y: 70
        w: 210
        h: 56
        tone: neutral
      - id: predeploy
        label: predeploy
        x: 830
        y: 70
        w: 180
        h: 56
        tone: neutral
      - id: postdeploy
        label: postdeploy
        x: 830
        y: 240
        w: 180
        h: 56
        tone: neutral
    edges:
      - from: commands
        to: prebuild
        step: 1
      - from: prebuild
        to: container
        step: 2
      - from: container
        to: predeploy
        step: 3
      - from: predeploy
        to: postdeploy
        step: 4
        label: final deployment
    steps:
      - Run commands before extraction; prebuild follows extraction.
      - Configure the application and server before container_commands.
      - Run predeploy after container_commands.
      - Deploy the application and proxy, then run postdeploy.
cards:
  - id: elastic-beanstalk-021
    q: What is Elastic Beanstalk configuration option precedence from highest to lowest?
    a: Direct environment settings, saved configurations, .ebextensions configuration files, then defaults.
    facts:
      - precedence
  - id: elastic-beanstalk-022
    q: An Elastic Beanstalk .ebextensions option is ignored after a console setting was applied. What should be checked?
    a: Remove the higher-precedence environment setting if the file should control the value. Console and EB CLI recommended settings also have this precedence.
    trap: true
    facts:
      - precedence
      - recommended
  - id: elastic-beanstalk-023
    q: What format, naming, and ordering rules apply to Elastic Beanstalk .ebextensions configuration files?
    a: Use YAML or JSON files ending in .config, preferably in a root .ebextensions directory. Files execute alphabetically. Use each top-level key once.
    facts:
      - file-format
      - file-location
      - file-order
      - unique-keys
  - id: elastic-beanstalk-024
    q: How do commands and container_commands differ in Elastic Beanstalk configuration files?
    a: commands run before source extraction and application setup. container_commands run in the extracted staging directory before final deployment; leader_only limits a command to one instance during creation or deployment.
    facts:
      - commands
      - container-commands
      - leader-only
  - id: elastic-beanstalk-025
    q: Can an Elastic Beanstalk Standard .ebextensions file create an additional queue or alarm?
    a: Yes. Resources accepts CloudFormation resource definitions. option_settings configures environment options.
    facts:
      - file-keys
      - standard-only
  - id: elastic-beanstalk-048
    q: An Elastic Beanstalk deployment needs a script after source extraction but before application setup. Which hook stage fits?
    a: prebuild under .platform/hooks. It runs after commands and before application setup.
    facts:
      - hook-stages
      - predeploy-hook
      - postdeploy-hook
  - id: elastic-beanstalk-049
    q: An Elastic Beanstalk configuration change updates environment properties without recreating instances. Where should its deployment hooks live?
    a: Under .platform/confighooks, using prebuild, predeploy, or postdeploy.
    facts:
      - config-hooks
  - id: elastic-beanstalk-050
    q: An Elastic Beanstalk instance type update must run a leader_only container command. Will it do so?
    a: No. leader_only commands run during creation and deployments, not launch configuration changes such as an instance type change.
    trap: true
    facts:
      - leader-only
---
Elastic Beanstalk configuration files describe environment settings and instance customization alongside the application. On Amazon Linux 2 and Amazon Linux 2023, platform hooks are scripts run at specific points in deployment. This gives repeatable setup rather than relying on manual instance edits.

### How it works

1. For Beanstalk Standard, include YAML or JSON `.config` files, preferably in one `.ebextensions` directory at the archive root. Files run alphabetically. Use each top-level key once.
2. Use `option_settings` for environment options and `Resources` for additional CloudFormation resources. CloudFormation is the template system Beanstalk uses to create its environment resources. Keys such as `packages` and `files` customize the operating system.
3. For Linux customization, run `commands` before the source archive is extracted and the application is set up. Run `container_commands` against the extracted source in the staging directory, the temporary location before final deployment. Both run as root, the operating system administrator.
4. Use application hooks under `.platform/hooks`: `prebuild` follows `commands`; `predeploy` follows `container_commands`; `postdeploy` follows application and proxy deployment. A proxy is the server in front of the application.
5. Use `.platform/confighooks` for configuration deployments that update existing instances without recreating them. Hook files run in filename order as root; a nonzero exit code fails the deployment.

| Setting source | Precedence, highest first | Consequence |
|---|---|---|
| Direct environment setting | Highest | Includes console and EB CLI recommended values |
| Saved configuration | Next | Stored settings override file values |
| Configuration file | Next | Applies when higher levels do not set the option |
| Default | Lowest | Applies when no other level sets the option |

`leader_only` runs a container command on one instance during environment creation and deployments. It does not run for launch configuration changes such as instance type replacement.

### Exam cues

- If the question says a file option is ignored, think higher-precedence environment settings, because console and EB CLI values override files.
- If the question says edit application files before final deployment, think `container_commands`, because they run in the extracted staging directory.
- If the question says hook an environment property change without replacing instances, think `.platform/confighooks`, because it handles configuration deployments.

### Remember

- Files: `.config`, YAML or JSON, alphabetical order, no duplicate top-level keys.
- Application hooks: `prebuild`, `predeploy`, `postdeploy`.
- `leader_only` applies to creation and deployments, not launch configuration changes.

> **Trap:** Changing a lower-precedence file repeatedly will not override an option stored directly on the environment. Remove the higher-precedence value first.
