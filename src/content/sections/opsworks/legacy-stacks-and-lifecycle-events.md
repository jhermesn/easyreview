---
title: Legacy stacks and lifecycle events
level: associate
order: 10
facts:
  - id: shutdown
    text: AWS OpsWorks Stacks reached end of support on May 1, 2024 and is in full shutdown.
    source: https://docs.aws.amazon.com/general/latest/gr/full_shutdown_services.html#full_shutdown_services
  - id: stacks
    text: OpsWorks Stacks was an application management service for the application lifecycle.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html
  - id: components
    text: OpsWorks Stacks had stacks, layers, instances, and apps; an app and an instance belonged to a specified stack.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html
  - id: events
    text: OpsWorks Stacks had five lifecycle events named setup, configuration, deploy, undeploy, and shutdown.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#describeLayers-property
  - id: recipes
    text: OpsWorks Stacks ran standard recipes for each layer and event, followed by any custom event recipes.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#describeLayers-property
  - id: configure
    text: The Configure list specified custom recipes to run after a configure event.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#createLayer-property
  - id: scaling
    text: OpsWorks Stacks supported load-based and time-based instance scaling; Windows stacks could use only time-based instances.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#createInstance-property
  - id: registration
    text: Registered OpsWorks Stacks instances had to use a supported Linux operating system.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#registerInstance-property
  - id: assignment
    text: Registered on-premises instances could be assigned to any layer type, while registered EC2 instances could be assigned only to custom layers.
    source: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#assignInstance-property
cards:
  - id: opsworks-004
    q: What were the main resource types in AWS OpsWorks Stacks?
    a: Stacks, layers, instances, and apps. Apps and instances belonged to a stack.
    facts: [components]
  - id: opsworks-005
    q: What were the five AWS OpsWorks Stacks lifecycle events?
    a: Setup, Configure, Deploy, Undeploy, and Shutdown. Custom recipes ran after standard recipes for an event.
    facts: [events, recipes, configure]
  - id: opsworks-006
    q: A legacy OpsWorks Stacks layer has a custom recipe for its Configure event. When did the custom recipe run relative to standard recipes?
    a: After the standard recipes for that event.
    facts: [configure, recipes]
    trap: true
  - id: opsworks-007
    q: Which automatic scaling types did AWS OpsWorks Stacks support, and which was available for Windows stacks?
    a: Load-based and time-based scaling. Windows stacks could use only time-based instances.
    facts: [scaling]
  - id: opsworks-008
    q: Could a registered EC2 instance be assigned to a built-in OpsWorks Stacks layer?
    a: No. Registered EC2 instances could only be assigned to custom layers. Registered on-premises instances could use any layer type.
    facts: [assignment]
    trap: true
  - id: opsworks-009
    q: A historical OpsWorks Stacks layer uses a custom lifecycle recipe. Did that replace the standard recipes?
    a: No. The custom event recipe ran after the standard recipes.
    facts: [recipes]
    trap: true
  - id: opsworks-010
    q: A team finds a legacy OpsWorks Stacks configuration that registered a server. Which operating system family did registered instances require?
    a: A supported Linux operating system.
    facts: [registration]
---
AWS OpsWorks Stacks was an application management service with stacks, layers, instances, apps, and lifecycle recipes. It reached full shutdown in May 2024, so these concepts describe historical systems only.

### How it works

1. A stack contained application resources, including instances and apps. A layer held recipes for its lifecycle events.
2. The service had Setup, Configure, Deploy, Undeploy, and Shutdown events. A recipe is a set of Chef instructions that configures software.
3. For each event, standard layer recipes ran first, followed by configured custom recipes.
4. Registered EC2 instances could be assigned to custom layers; registered on-premises instances could be assigned to any layer type.

### Exam cues

- If the question says a custom OpsWorks layer recipe runs at a lifecycle event, think after the standard recipes, because custom event recipes followed them.
- If the question says a registered EC2 instance must join a legacy OpsWorks layer, think custom layer, because registered EC2 instances could not be assigned to built-in layers.
- If the question says Windows instances in legacy OpsWorks, think time-based scaling, because load-based instances were not supported for Windows stacks.

### Remember

- The five events were Setup, Configure, Deploy, Undeploy, and Shutdown.
- Registered instances required a supported Linux operating system.
- OpsWorks Stacks reached end of support on May 1, 2024.

> **Trap:** OpsWorks Stacks is not available for a new deployment, even when a question describes its historical lifecycle recipes.
