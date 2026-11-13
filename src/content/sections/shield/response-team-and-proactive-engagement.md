---
title: Response team and proactive engagement
level: professional
order: 20
facts:
  - id: srt-role
    text: The Shield Response Team (SRT) consists of engineers who assist Shield Advanced customers with
      DDoS event response.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-support.html
  - id: support
    text: SRT services require Business Support or Enterprise Support in addition to Shield Advanced.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-support.html
  - id: srt-actions
    text: The SRT can analyze WAF logs and, with customer approval during engagement, change a web ACL
      to block identified attacks.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-support.html
  - id: custom-mitigation
    text: The SRT can develop custom infrastructure attack mitigations and recommend architecture
      changes.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-support.html
  - id: health
    text: A Route 53 health check reports whether a resource meets configured health criteria and can
      inform Shield Advanced detection.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html
  - id: health-exclusion
    text: Shield Advanced health-based detection is available for resource types other than Route 53
      hosted zones.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html
  - id: proactive-trigger
    text: Proactive engagement uses an associated Route 53 health check to assess impact during an event
      detected by Shield Advanced and contact the customer.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-proactive-engagement.html
  - id: proactive-types
    text: Proactive engagement covers network and transport events on Elastic IPs and standard Global
      Accelerator accelerators, and web floods on CloudFront and ALBs.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-proactive-engagement.html
  - id: contacts
    text: Proactive engagement requires at least one contact and supports up to ten contacts.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-proactive-engagement.html
  - id: waf-version
    text: For proactively protected resources associated with a WAF web ACL, the ACL must use WAF v2.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-proactive-engagement.html
  - id: managed-rule-exclusion
    text: Events detected only by the Anti-DDoS managed rule group do not trigger SRT proactive
      engagement; use its events and metrics for notification.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-srt-proactive-engagement.html
diagrams:
  - id: shield-proactive-response
    title: Health-based proactive engagement
    width: 800
    height: 190
    nodes:
      - id: health
        label: Route 53 check
        icon: route-53
        tone: network
        x: 30
        y: 60
        w: 210
        h: 86
      - id: shield
        label: Shield event
        icon: shield
        tone: security
        x: 295
        y: 60
        w: 210
        h: 86
      - id: ops
        label: SRT contacts team
        icon: res-users
        tone: user
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: health
        to: shield
        step: 1
      - from: shield
        to: ops
        step: 2
    steps:
      - Health informs impact
      - Contact guidance
cards:
  - id: shield-003
    q: What must a team configure for AWS Shield Advanced proactive engagement?
    a: Business or Enterprise Support, an associated Route 53 health check, proactive engagement
      enabled, and at least one contact. Any associated WAF web ACL must use WAF v2.
    facts:
      - support
      - proactive-trigger
      - contacts
      - waf-version
  - id: shield-009
    q: A Shield Advanced protected ALB has an unhealthy Route 53 health check during a Shield-detected
      web flood. How can the SRT contact operations automatically?
    a: Enable proactive engagement and maintain contact details. The SRT uses the associated health
      check to assess the event impact.
    facts:
      - proactive-trigger
      - proactive-types
      - contacts
  - id: shield-010
    q: An Anti-DDoS managed rule group detects an event with no Shield Advanced event. Will SRT
      proactive engagement start automatically?
    a: No. Only Shield Advanced detections can trigger proactive engagement. Configure notifications
      using the managed rule group events and metrics.
    trap: true
    facts:
      - managed-rule-exclusion
  - id: shield-011
    q: A company has AWS Shield Advanced but lacks Business or Enterprise Support. Can it use SRT
      services?
    a: No. SRT services require one of those support plans in addition to Shield Advanced.
    trap: true
    facts:
      - support
  - id: shield-012
    q: Can the AWS Shield Response Team change a WAF web ACL while assisting with an attack?
    a: Yes, with customer approval during engagement. The SRT can analyze WAF logs and apply rules to
      block identified attack traffic.
    facts:
      - srt-actions
  - id: shield-013
    q: How many contacts can AWS Shield Advanced proactive engagement use?
    a: At least one contact is required, and up to ten can be configured.
    facts:
      - contacts
---
The Shield Response Team (SRT) provides specialist help during DDoS events for Shield Advanced customers. Proactive engagement lets the SRT contact your operations team when a Shield-detected event affects application health.

### How it works

1. Subscribe to Shield Advanced and Business Support or Enterprise Support to use SRT services.
2. Associate a Route 53 health check with an eligible protected resource. A health check tests whether the resource meets your availability criteria.
3. Enable proactive engagement and supply contacts. Use WAF v2 for any web ACL associated with the resource.
4. During a Shield Advanced detected event, the SRT uses the health check state to assess impact and follows your contact guidance.
5. The SRT can analyze WAF logs and, with your approval during engagement, change filtering rules. It can also create custom network mitigations.

### Exam cues

- If the question says experts must call operations during a DDoS event affecting health, think proactive engagement, because Shield combines its event detection with the associated health check.
- If the question says Advanced is subscribed but SRT access is unavailable, think support plan requirements, because Business or Enterprise Support is also required.
- If the question says only an Anti-DDoS managed rule group detected an event, think separate metric or event notifications, because that detection alone cannot trigger proactive engagement.

### Remember

- Provide between one and ten contacts.
- Proactive engagement supports Elastic IPs, standard Global Accelerator accelerators, CloudFront distributions and ALBs for the documented event types.
- Health-based detection excludes Route 53 hosted zones.
- Any associated WAF web ACL must use WAF v2.

> **Trap:** An unhealthy health check alone is not a Shield-detected DDoS event. Proactive engagement evaluates health during an event detected by Shield Advanced.
