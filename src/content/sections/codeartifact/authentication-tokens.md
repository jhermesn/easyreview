---
title: Authentication tokens
level: associate
order: 40
facts:
  - id: token-required
    text: Package managers use a CodeArtifact authorization token obtained with AWS credentials to
      publish or consume packages.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
  - id: login-setup
    text: The CodeArtifact login command obtains a token and configures a supported package manager with
      the token and repository endpoint.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#auth-token-login
  - id: manual-token
    text: The get-authorization-token command obtains a token for configuring tools manually.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-api
  - id: token-default
    text: CodeArtifact authorization tokens last 12 hours by default.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
  - id: token-range
    text: A nonzero token duration must be 900 to 43200 seconds, equivalent to 15 minutes to 12 hours.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-api
  - id: token-role-lifetime
    text: A CodeArtifact token normally has a lifetime independent of the assumed-role session that
      created it.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-api
  - id: token-session-zero
    text: When assuming a role, duration-seconds 0 makes the token expire with the remaining role
      session.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-api
  - id: token-permissions
    text: GetAuthorizationToken requires codeartifact:GetAuthorizationToken and
      sts:GetServiceBearerToken.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-permissions
  - id: sts-identity
    text: sts:GetServiceBearerToken must be allowed for the IAM caller; putting it in a domain resource
      policy has no effect.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-permissions
  - id: no-root-token
    text: An AWS account root user cannot call GetAuthorizationToken.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
  - id: read-permissions
    text: Fetching the repository endpoint requires codeartifact:GetRepositoryEndpoint, and downloading
      packages requires codeartifact:ReadFromRepository.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/auth-and-access-control-permissions-reference.html#auth-and-access-control-permissions-reference
  - id: publish-permissions
    text: Publishing needs codeartifact:PublishPackageVersion on the package; Maven also needs
      codeartifact:PutPackageMetadata, and NuGet also needs codeartifact:ReadFromRepository.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-publishing-permissions
  - id: token-refresh
    text: After a CodeArtifact authorization token expires, the client must fetch another token.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
  - id: token-environment
    text: AWS recommends passing authorization tokens through environment variables rather than storing
      them in files that could be exposed or committed.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#env-var
diagrams:
  - id: codeartifact-token-flow
    title: Obtain a token before package requests
    width: 1000
    height: 230
    nodes:
      - id: caller
        label: Build role
        sub: AWS credentials
        icon: identity-and-access-management
        x: 25
        y: 90
        w: 250
        h: 86
        tone: security
        info: The caller needs CodeArtifact token permission and sts:GetServiceBearerToken in its identity
          permissions.
      - id: token
        label: Authorization token
        sub: CodeArtifact
        icon: codeartifact
        x: 375
        y: 90
        w: 250
        h: 86
        tone: devtools
        info: The login command retrieves the token and configures a supported package manager.
      - id: client
        label: Package manager
        sub: Token and endpoint
        icon: res-client
        x: 725
        y: 90
        w: 250
        h: 86
        tone: user
        info: The tool uses the token and repository endpoint to publish or download packages.
    edges:
      - from: caller
        to: token
        step: 1
        label: request
      - from: token
        to: client
        step: 2
        label: configure
    steps:
      - The caller obtains a CodeArtifact authorization token with AWS credentials.
      - Configure the package manager with the token and repository endpoint.
cards:
  - id: codeartifact-007
    q: A build job has valid AWS credentials but npm cannot authenticate to CodeArtifact. What should
      the job configure?
    a: Obtain a CodeArtifact authorization token and configure the package manager endpoint. The login
      command performs both for supported tools; renew the token after expiry.
    trap: true
    facts:
      - token-required
      - login-setup
      - token-refresh
  - id: codeartifact-008
    q: Which permissions does requesting a CodeArtifact authorization token require?
    a: codeartifact:GetAuthorizationToken and sts:GetServiceBearerToken. The STS action must be allowed
      for the IAM caller; root users cannot request the token.
    facts:
      - token-permissions
      - sts-identity
      - no-root-token
  - id: codeartifact-009
    q: A CodeArtifact token is created with default settings during a 15-minute assumed-role session.
      How long does that token last?
    a: 12 hours by default. To expire it with the remaining role session, request duration-seconds 0.
    trap: true
    facts:
      - token-default
      - token-role-lifetime
      - token-session-zero
  - id: codeartifact-011
    q: A cross-account build needs a CodeArtifact token that expires with its assumed-role session.
      Which permissions and duration setting apply?
    a: Allow codeartifact:GetAuthorizationToken and sts:GetServiceBearerToken, then request
      duration-seconds 0 while assuming the role.
    trap: true
    facts:
      - token-permissions
      - token-session-zero
  - id: codeartifact-012
    q: Which AWS permissions support a build that gets a CodeArtifact token, discovers its repository
      endpoint, and downloads packages?
    a: codeartifact:GetAuthorizationToken, sts:GetServiceBearerToken,
      codeartifact:GetRepositoryEndpoint, and codeartifact:ReadFromRepository.
    facts:
      - token-permissions
      - read-permissions
  - id: codeartifact-022
    q: A CodeArtifact domain policy allows sts:GetServiceBearerToken, but a build still cannot request
      its token. Where must that STS permission be granted?
    a: In the caller identity permissions. A domain resource policy cannot grant the STS action.
    trap: true
    facts:
      - sts-identity
  - id: codeartifact-023
    q: What CodeArtifact token lifetime can be requested without the assumed-role zero-duration option?
    a: 900 to 43200 seconds, or 15 minutes to 12 hours. The default is 12 hours.
    facts:
      - token-range
      - token-default
  - id: codeartifact-024
    q: Does codeartifact:PublishPackageVersion alone cover every CodeArtifact package format?
    a: No. Maven also requires codeartifact:PutPackageMetadata; NuGet also requires
      codeartifact:ReadFromRepository.
    trap: true
    facts:
      - publish-permissions
---

CodeArtifact authorization tokens let package managers authenticate to repositories. AWS credentials obtain the token; the package tool then uses that token to publish or download packages.

### How it works

1. Give the build IAM role, an identity with assigned permissions, `codeartifact:GetAuthorizationToken` and `sts:GetServiceBearerToken`. The STS permission must be granted to the caller, not through a domain resource policy.
2. Use `aws codeartifact login` for a supported tool. It requests a token and sets the repository endpoint and authentication settings. For other tools, obtain a token with `get-authorization-token` and configure the tool manually.
3. Allow `codeartifact:GetRepositoryEndpoint` to discover the endpoint and `codeartifact:ReadFromRepository` to download packages. Publishing requires additional permissions for the package format.
4. Choose token duration. When assuming a role, use `--duration-seconds 0` if the token must expire with the remaining session. An assumed-role session is the temporary period in which the role's credentials are valid.
5. Fetch another token when it expires. For manual configuration, pass it through an environment variable, a value supplied to a process, to avoid storing it in a file.

| Operation | Required permissions |
|---|---|
| Request token | `codeartifact:GetAuthorizationToken` and `sts:GetServiceBearerToken` |
| Discover endpoint | `codeartifact:GetRepositoryEndpoint` |
| Download packages | `codeartifact:ReadFromRepository` |
| Publish package | `codeartifact:PublishPackageVersion`; Maven adds `codeartifact:PutPackageMetadata`, NuGet adds `codeartifact:ReadFromRepository` |

### Exam cues

- If the question says valid AWS credentials but an unauthorized package request, think token and package-manager configuration, because the tool authenticates with a CodeArtifact token.
- If the question says a token must expire with its role session, think `--duration-seconds 0`, because normal token duration is independent of that session.
- If the question says Maven publishing fails despite PublishPackageVersion, think PutPackageMetadata, because Maven requires both permissions.

### Remember

- Default duration: 12 hours. Nonzero range: 900 to 43200 seconds, or 15 minutes to 12 hours.
- Root users cannot call `GetAuthorizationToken`.
- A domain policy cannot grant `sts:GetServiceBearerToken`.

> **Trap:** A short role session does not automatically shorten a CodeArtifact token. Select the zero-duration option while assuming the role.
