---
title: ALB authentication and certificates
level: associate
order: 60
facts:
  - id: auth-offload
    text: An Application Load Balancer can authenticate users before routing requests, so applications don't have to implement sign-in themselves.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html#listener-authenticate-users
  - id: auth-idps
    text: ALB authentication works with OIDC-compliant identity providers directly, or with Amazon Cognito user pools for social sign-in (Amazon, Facebook, Google) and corporate SAML, OIDC or OAuth identities.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html#listener-authenticate-users
  - id: auth-https
    text: The authenticate-cognito and authenticate-oidc listener rule actions are supported only on HTTPS listeners, and the ALB keeps the user signed in with a secure session cookie.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html#listener-authenticate-users
  - id: sni
    text: An ALB HTTPS listener's certificate list lets one load balancer serve multiple domains on the same port with a different certificate per domain, chosen through Server Name Indication (SNI).
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/https-listener-certificates.html#sni-certificate-list
cards:
  - id: elastic-load-balancing-060
    q: "An Application Load Balancer must authenticate users before forwarding requests to an application. What can the team configure?"
    a: "Configure authentication on an HTTPS listener using an OIDC identity provider or an Amazon Cognito user pool."
    facts: [auth-offload, auth-idps, auth-https]
  - id: elastic-load-balancing-061
    q: An ALB authenticate-oidc action fails to save on an HTTP listener on port 80. Why?
    a: "User authentication actions are supported only on HTTPS listeners."
    trap: true
    facts: [auth-https]
  - id: elastic-load-balancing-062
    q: One Application Load Balancer must serve three websites with different domain names and TLS certificates on port 443. How?
    a: "Add all three certificates to the HTTPS listener's certificate list; the ALB picks the right one with SNI."
    facts: [sni]
---
An Application Load Balancer can do two jobs that apps often repeat: signing users in, and serving the right TLS certificate for each domain.

### How it works

1. Add an `authenticate-cognito` or `authenticate-oidc` action before the `forward` action in an HTTPS listener rule.
2. Unauthenticated users are redirected to the identity provider; after sign-in, the ALB sets a secure session cookie.
3. For several domains, add their certificates to the HTTPS listener's certificate list; the client's SNI hostname selects the certificate.

### Exam cues

- If the question says sign users in at the load balancer, social or corporate identities, no app changes, think ALB authentication with Cognito or OIDC.
- If the question says several HTTPS domains on one load balancer, think the certificate list with SNI.

### Remember

- Authentication actions need an HTTPS listener.
- Cognito user pools bring social and SAML identities; OIDC IdPs connect directly.
- SNI lets one listener serve many certificates.

> **Trap:** Sign-in at the load balancer is an Application Load Balancer listener rule action, and only on HTTPS. An HTTP listener, or a load balancer type without listener rules for it, can't do it.
