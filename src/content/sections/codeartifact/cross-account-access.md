---
title: Cross-account access
level: professional
order: 50
facts:
  - id: external-identity-allow
    text: A caller outside the domain-owner and repository-administrator accounts needs both an
      identity-policy Allow and a resource-policy Allow for cross-account access.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-policies.html#repo-policies
  - id: token-domain-grant
    text: Accessing packages across accounts requires GetAuthorizationToken permission on the domain
      resource.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-policies.html#domain-policies
  - id: domain-grant-scope
    text: A domain resource policy can grant permissions on the domain and on repositories and packages
      within it.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-policies.html#domain-policies
  - id: resource-policy-union
    text: For repository actions, an explicit Allow in either the domain policy or repository policy is
      sufficient on the resource-policy side.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-policies.html#repo-policies
  - id: deny-precedence
    text: An explicit Deny in a CodeArtifact domain, repository, or other applicable policy overrides an
      Allow.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-policies.html#repo-policies
  - id: repository-download
    text: ReadFromRepository grants download access at repository scope and cannot be restricted to
      selected package ARNs.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-policies.html#repo-policies
  - id: endpoint-permission
    text: A caller retrieving a CodeArtifact repository endpoint needs
      codeartifact:GetRepositoryEndpoint.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/auth-and-access-control-permissions-reference.html#auth-and-access-control-permissions-reference
  - id: sts-caller-permission
    text: The caller must have sts:GetServiceBearerToken in its identity permissions; a domain policy
      cannot grant that action.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-permissions
  - id: domain-owner-argument
    text: Accessing a CodeArtifact domain owned by another account requires its owner account ID,
      supplied as domain-owner in CLI requests.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html#domain-overview-cross-account
  - id: organization-condition
    text: A domain policy can use aws:PrincipalOrgID to limit its grants to principals in the specified
      organization.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-policies.html#domain-policies
  - id: cross-account-creation
    text: Creating a repository in another account's domain requires codeartifact:CreateRepository
      permission on that domain.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-policies.html#domain-policies
  - id: repository-administrator
    text: A CodeArtifact repository is associated with the AWS account used to create it, which is its
      administrator account.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/create-repo.html
diagrams:
  - id: codeartifact-cross-account-flow
    title: "External caller: token, endpoint, then download"
    width: 1000
    height: 230
    nodes:
      - id: caller
        label: External build
        sub: Caller identity policy
        icon: identity-and-access-management
        x: 25
        y: 90
        w: 250
        h: 86
        tone: security
        info: Allow the CodeArtifact operations and sts:GetServiceBearerToken in the caller account.
      - id: domain
        label: Domain token
        sub: Owner resource policy
        icon: codeartifact
        x: 375
        y: 90
        w: 250
        h: 86
        tone: devtools
        info: Grant GetAuthorizationToken on the domain and identify its owner account.
      - id: repository
        label: Repository read
        sub: Endpoint and packages
        icon: codeartifact
        x: 725
        y: 90
        w: 250
        h: 86
        tone: devtools
        info: Allow endpoint discovery and reads through the domain or repository resource policy. Explicit
          Deny wins.
    edges:
      - from: caller
        to: domain
        step: 1
        label: get token
      - from: domain
        to: repository
        step: 2
        label: read
    steps:
      - The external caller requests a token using domain permission and its identity grants.
      - The caller discovers the endpoint and downloads packages with the required resource and
        identity permissions.
cards:
  - id: codeartifact-010
    q: How can a build in an external account download from a CodeArtifact repository?
    a: Grant token access on the domain, endpoint discovery and repository reads through applicable
      resource policies, and corresponding identity permissions in the caller account. Grant
      sts:GetServiceBearerToken to the caller and pass domain-owner.
    facts:
      - external-identity-allow
      - token-domain-grant
      - resource-policy-union
      - repository-download
      - endpoint-permission
      - sts-caller-permission
      - domain-owner-argument
  - id: codeartifact-025
    q: A CodeArtifact repository policy omits ReadFromRepository, but the domain policy allows it for an
      external caller. Is a second resource-policy Allow required?
    a: No. The domain Allow is sufficient on the resource-policy side. The external caller still needs
      identity permission, and an explicit Deny overrides the grant.
    trap: true
    facts:
      - resource-policy-union
      - external-identity-allow
      - deny-precedence
  - id: codeartifact-026
    q: A CodeArtifact administrator wants to allow downloads of just one package by using that package
      ARN with ReadFromRepository. Will that scope work?
    a: No. ReadFromRepository applies to a repository. Use a repository boundary when package downloads
      need separate access.
    trap: true
    facts:
      - repository-download
  - id: codeartifact-027
    q: A cross-account CodeArtifact request supplies the domain name but does not identify the owning
      account. Which CLI argument is required?
    a: --domain-owner with the account ID of the domain owner.
    facts:
      - domain-owner-argument
  - id: codeartifact-028
    q: Which CodeArtifact domain-policy condition can restrict a resource-policy grant to accounts in
      one AWS organization?
    a: aws:PrincipalOrgID. External callers still need identity permissions for the requested actions.
    facts:
      - organization-condition
      - external-identity-allow
---

CodeArtifact resource policies let another account use a domain or repository. A resource policy states which principals, meaning users or roles making requests, may act on that resource; the caller's identity policy grants its own permissions.

### How it works

1. Identify the domain owner with `--domain-owner`. The same domain name can exist under another account.
2. Grant the external caller `codeartifact:GetAuthorizationToken` on the domain. Its identity permissions must also allow `sts:GetServiceBearerToken`.
3. Allow endpoint discovery with `codeartifact:GetRepositoryEndpoint` and downloads with `codeartifact:ReadFromRepository`. A domain policy can grant repository actions, or the repository policy can grant them locally.
4. For a caller outside both the domain owner and the repository administrator account (the account that created the repository), ensure its identity policy also allows the requested actions. An Allow in either resource policy suffices on that side; any applicable explicit Deny wins.
5. Use `aws:PrincipalOrgID` in the domain policy when the resource-side grant should cover only a specified organization.

### Exam cues

- If the question says the external build has identity permissions but no domain token grant, think domain resource policy, because token access must be allowed on the shared domain.
- If the question says the repository policy omits an action allowed by the domain policy, think resource-policy union, because one resource-side Allow can suffice.
- If the question says permit reads of only selected packages in a repository, think separate repository boundaries, because ReadFromRepository is not package-scoped.

### Remember

- Cross-account external caller: identity Allow plus resource Allow, with no explicit Deny.
- Domain token permission and repository download permission cover different operations.
- Creating a repository in another account's domain needs `codeartifact:CreateRepository` on that domain.

> **Trap:** Repository and domain policies are not two mandatory Allow checklists for every repository operation. A domain policy can grant repository access, but it cannot grant the caller's STS bearer-token permission.
