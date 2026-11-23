---
title: Stateful, domain, and Suricata rules
level: associate
order: 20
facts:
  - id: engine-order
    text: Network Firewall evaluates stateless rules first and only sends packets to stateful inspection when the stateless action forwards them.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-policy-processing.html
  - id: stateless-actions
    text: Stateless Pass permits the packet and ends inspection; Drop blocks it; Forward to stateful rules sends it to stateful inspection.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/rule-action.html
  - id: stateless-default
    text: Packets that match no stateless rule use the configured default stateless action; full packets and UDP fragments have separate default settings.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-policy-processing.html
  - id: stateful-context
    text: The stateful engine inspects packets in the context of their traffic flow and supports Suricata-compatible rules for intrusion prevention.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-rules-engines.html
  - id: suricata-rules
    text: Suricata-compatible rule strings define traffic match conditions and actions for the stateful engine.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/stateful-rule-groups-suricata.html
  - id: domain-fields
    text: TLS_SNI domain rules match the hostname in the TLS handshake; HTTP_HOST rules match the HTTP Host header.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/stateful-rule-groups-domain-names.html
  - id: domain-allow
    text: With default action order, an Allow domain list using HTTP_HOST or TLS_SNI blocks nonmatching domains for the selected protocol; with strict order, this implicit denial does not apply.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/stateful-rule-groups-domain-names.html
  - id: domain-vs-payload
    text: Domain filtering based on HTTP Host or TLS SNI does not itself decrypt encrypted payloads; TLS inspection uses a separate TLS inspection configuration.
    source: https://docs.aws.amazon.com/network-firewall/latest/APIReference/API_CreateTLSInspectionConfiguration.html
  - id: requested-host
    text: "Network Firewall HTTP Host and TLS SNI domain rules match the hostname requested by the client."
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/stateful-rule-groups-domain-names.html
  - id: https-url-filter
    text: "Network Firewall URL category filtering requires TLS inspection to evaluate HTTPS URL paths."
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/rule-groups-url-filtering.html
cards:
  - id: network-firewall-003
    q: Outbound HTTP and HTTPS traffic from private subnets must use only approved domains. Which AWS Network Firewall rules fit?
    a: Use stateful domain-list rules with HTTP_HOST and TLS_SNI, route traffic through endpoints, and forward it from stateless to stateful inspection. Account for the domain Allow behavior of the chosen rule order.
    facts:
      - domain-fields
      - domain-allow
      - engine-order
  - id: network-firewall-007
    q: AWS Network Firewall has a stateless Pass rule and a stateful domain deny rule. Why can matching traffic bypass the domain block?
    a: Stateless Pass ends inspection. Use Forward to stateful rules for traffic that must reach the stateful domain rule.
    trap: true
    facts:
      - stateless-actions
  - id: network-firewall-011
    q: Does an AWS Network Firewall TLS_SNI domain rule decrypt HTTPS request bodies?
    a: No. It matches the hostname in the TLS handshake. Payload decryption requires a separate TLS inspection configuration.
    trap: true
    facts:
      - domain-fields
      - domain-vs-payload
  - id: network-firewall-014
    q: "What hostname do AWS Network Firewall HTTP Host and TLS SNI domain rules match?"
    a: "The hostname requested by the client."
    facts: [requested-host]
  - id: network-firewall-016
    q: "What does AWS Network Firewall need to apply URL category filtering to HTTPS paths?"
    a: "TLS inspection and a URL category filtering rule."
    facts: [https-url-filter]
diagrams:
  - id: network-firewall-engine-order
    title: Stateless decisions control access to stateful inspection
    width: 800
    height: 350
    nodes:
      - id: packet
        label: Packet
        x: 20
        y: 40
        w: 180
        h: 72
        tone: neutral
      - id: stateless
        label: Stateless engine
        icon: network-firewall
        x: 280
        y: 40
        w: 200
        h: 86
        tone: network
      - id: destination
        label: Destination
        x: 590
        y: 40
        w: 190
        h: 72
        tone: neutral
      - id: stateful
        label: Stateful engine
        icon: network-firewall
        x: 280
        y: 230
        w: 200
        h: 86
        tone: network
      - id: blocked
        label: Blocked
        x: 20
        y: 230
        w: 180
        h: 72
        tone: neutral
    edges:
      - from: packet
        to: stateless
        label: inspect
      - from: stateless
        to: destination
        label: Pass
      - from: stateless
        to: blocked
        label: Drop
      - from: stateless
        to: stateful
        label: Forward
      - from: stateful
        to: destination
        label: permit
    steps: []
---

AWS Network Firewall first checks packets independently, then can inspect them as part of a connection. Stateless means each packet is judged alone. Stateful means inspection uses the traffic flow. Suricata is the rule language supported by the stateful intrusion prevention engine.

### How it works

1. Evaluate stateless rules first. Their action passes, drops, or forwards the packet to stateful inspection. If none matches, apply the configured default stateless action.
2. Forward traffic that needs domain or Suricata inspection to the stateful engine. Stateless Pass bypasses that engine.
3. Choose domain lists for hostname matching or Suricata rule strings for explicit traffic conditions. HTTP_HOST reads the HTTP Host header; TLS_SNI reads Server Name Indication, the hostname sent in a TLS handshake.

| Stateless action | Result |
|---|---|
| Pass | Permit the packet and end inspection |
| Drop | Block the packet and end inspection |
| Forward to stateful rules | Send the packet to flow inspection |

### Exam cues

- If the question says filter HTTPS URL paths, think TLS inspection and URL category rules, because encrypted URLs cannot be evaluated without TLS inspection.
- If the question says match the hostname a client requests, think HTTP Host or TLS SNI domain rules, because those fields identify the requested hostname.
- If the question says a stateful deny is bypassed by a stateless allow, think change Pass to Forward to stateful rules, because Pass ends inspection.

### Remember

- Unmatched stateless traffic uses configured defaults; full packets and UDP fragments have separate settings.
- TLS SNI hostname inspection does not itself decrypt HTTPS payloads.

> **Trap:** A stateful rule cannot inspect a packet already permitted by stateless Pass. The packet must be forwarded to the stateful engine.
