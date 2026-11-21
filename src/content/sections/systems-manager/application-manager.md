---
title: Application Manager
level: associate
order: 180
facts:
  - id: app-purpose
    text: Application Manager aggregates AWS resource operations information in the context of an
      application, a logical resource group operated as a unit.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager.html#application-manager
  - id: app-closure
    text: From July 30, 2026, accounts that had not previously used Application Manager cannot access
      it; existing customers can continue in established accounts.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change-faq
  - id: app-maintenance
    text: "Application Manager is in maintenance mode: AWS maintains availability and support but adds
      no new features or Regions."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change
  - id: app-api-continuity
    text: The Application Manager availability change does not affect APIs because the console
      capability uses existing Systems Manager APIs.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change-faq
  - id: app-import
    text: Application Manager can import resource metadata from CloudFormation stacks, Resource Groups,
      ECS clusters, and EKS clusters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager.html#application-manager
  - id: app-custom
    text: Existing users can create an application and add resources or resource groups to provide
      application context.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-getting-started-adding-applications.html#application-manager-getting-started-adding-applications
  - id: app-tag-groups
    text: Tag-based Resource Groups queries select resources by resource type and tag filters.
    source: https://docs.aws.amazon.com/ARG/latest/userguide/gettingstarted-query.html#gettingstarted-query
  - id: app-regional-groups
    text: AWS Resource Groups provides named resource groupings based on tags in a single Region.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change-alternatives
  - id: app-monitoring
    text: Configure CloudWatch logs and alarms to display their information in Application Manager; the
      CloudWatch Logs integration applies to applications, not clusters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-getting-started-related-services.html#application-manager-getting-started-related-services
  - id: app-compliance
    text: AWS Config supplies resource-rule compliance, while State Manager associations supply
      desired-state compliance for Application Manager.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-getting-started-related-services.html#application-manager-getting-started-related-services
  - id: app-opsitems
    text: OpsCenter supplies application operational work records called OpsItems.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager.html#application-manager
  - id: app-remediation
    text: Application Manager can execute predefined Automation runbooks against applicable application
      resources; runbook permissions must be configured.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-getting-started-related-services.html#application-manager-getting-started-related-services
  - id: app-stack-integration
    text: Application Manager integrates with CloudFormation to create and manage stacks and templates;
      stack changes are reflected in both consoles.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager.html#application-manager
  - id: app-eks-boundary
    text: Application Manager shows EKS hosting infrastructure but does not manage or show operations
      information for EKS Pods or containers.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager.html#application-manager
  - id: app-tag-persistence
    text: Existing awsApplication tags and AppManager resource groups remain usable and do not need
      removal or replacement because of maintenance mode.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change-alternatives
  - id: app-alternatives
    text: AWS recommends Resource Groups for Regional organization, Resource Explorer for discovery
      across accounts and Regions, and CloudWatch Application Signals for application observability.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/application-manager-availability-change.html#application-manager-availability-change-alternatives
cards:
  - id: systems-manager-090
    q: What does Systems Manager Application Manager organize for an existing customer?
    a: Operations information for a logical group of AWS resources managed as one application, including
      monitoring, compliance, and operational issues.
    facts:
      - app-purpose
      - app-monitoring
      - app-compliance
      - app-opsitems
  - id: systems-manager-091
    q: "An existing Systems Manager Application Manager user wants to see application alarms and logs. What must be configured?"
    a: "Configure CloudWatch alarms and logs for display in Application Manager. The logs integration applies to applications, not clusters."
    facts:
      - app-monitoring
  - id: systems-manager-092
    q: An existing Application Manager customer needs alarms, compliance status, and operational work
      records together for an application. Which source services supply them?
    a: CloudWatch supplies alarms, AWS Config and State Manager supply compliance, and OpsCenter
      supplies OpsItems. Configure the source integrations.
    facts:
      - app-monitoring
      - app-compliance
      - app-opsitems
  - id: systems-manager-093
    q: An existing Application Manager customer wants to remediate a resource problem from the
      application view. What execution mechanism and access are needed?
    a: Use a Systems Manager Automation runbook with the required runbook permissions for the applicable
      resources.
    facts:
      - app-remediation
  - id: systems-manager-094
    q: An Application Manager user sees an EKS cluster but wants to inspect its individual Pods there.
      Is that supported?
    a: No. Application Manager exposes EKS hosting infrastructure information, not Pod or container
      operations information.
    trap: true
    facts:
      - app-eks-boundary
  - id: systems-manager-095
    q: "An operations team needs application context when reviewing resource health information in Systems Manager Application Manager. What does the service aggregate?"
    a: "It aggregates AWS resource operations information in the context of an application, a logical resource group operated as a unit."
    facts:
      - app-purpose
  - id: systems-manager-096
    q: "An existing Systems Manager Application Manager user wants operational work records alongside application information. Which service supplies them?"
    a: "OpsCenter supplies operational work records called OpsItems."
    facts:
      - app-opsitems
  - id: systems-manager-097
    q: "A team needs to review application resource compliance in Systems Manager Application Manager. Which services supply the compliance information?"
    a: "AWS Config supplies resource-rule compliance; State Manager associations supply desired-state compliance."
    facts:
      - app-compliance
---
Systems Manager Application Manager collects operations information for resources treated as one application. It helps existing users investigate problems with application context and run remediation. In July 2026 it entered maintenance mode: accounts that had not used it before July 30, 2026 cannot start using it, while existing customers can continue in established accounts. Purpose · Availability change

### How it works

1. For an established account, import supported resource metadata, meaning descriptive information about resources. Sources include CloudFormation stacks, Resource Groups, and ECS or EKS clusters. A stack is a set of resources managed from a CloudFormation template.
2. Group resources into an application, a logical collection operated as a unit. A tag is a key-value label. Tag-based Resource Groups select by resource type and tag filters within a Region. Application grouping · Resource selection
3. Configure the source services so their monitoring, compliance, and operational records are available in the application view.
4. Investigate the affected resource and run an authorized Automation runbook, a sequence of operational actions, when remediation is needed. CloudFormation integration also exposes stack and template management.

| Information or action | Source | Meaning |
|---|---|---|
| Alarms and application logs | CloudWatch | Monitoring and diagnostic data |
| Resource compliance | AWS Config | Whether resource configuration meets rules |
| Desired-state compliance | State Manager | Whether a saved association's configuration is satisfied |
| OpsItems | OpsCenter | Operational work records for investigation |
| Remediation | Automation runbooks | Authorized actions against applicable resources |

An association is a saved desired configuration linked to targets. Configure those associations and the other source services before expecting their information to appear. CloudWatch Logs integration applies to applications, not clusters. EKS visibility covers hosting infrastructure, not individual Pods or containers.

### Exam cues

- If the question says an existing user needs operational context across resources belonging to one application, think Application Manager, because it brings the source services' information together.
- If the question says configure a new account after July 2026, think an alternative matched to the use case, because Application Manager is closed to new accounts.
- If the question says inspect EKS Pods in Application Manager, think the infrastructure boundary, because Pod and container operations are outside its view.
- If the question says remediate from the application view, think an authorized Automation runbook, because Application Manager uses Systems Manager execution capabilities.

### Remember

- New-account access closed July 30, 2026. Existing users retain access; no new features or Regions are planned.
- Existing `awsApplication` tags and AppManager groups remain usable.
- Alternatives: Resource Groups for Regional grouping; Resource Explorer for cross-account and cross-Region discovery; CloudWatch Application Signals for application observability.

> **Trap:** Maintenance mode is not a shutdown. Existing applications and the underlying Systems Manager APIs continue to work; deleting application tags is not required.
