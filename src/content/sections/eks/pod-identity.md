---
title: Pod identity
level: associate
order: 50
facts:
  - id: association
    text: Pod Identity associates an IAM role with a service account in a namespace of an EKS cluster;
      Pods use that service account to obtain workload permissions.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html
  - id: service-account
    text: A Kubernetes service account is an identity used by applications running in Pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/service-accounts.html
  - id: trust
    text: Pod Identity roles trust the pods.eks.amazonaws.com service principal, and the same role trust
      can serve associations in multiple clusters without an OIDC provider.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-benefits
  - id: agent
    text: Pod Identity needs the Pod Identity Agent on nodes; Auto Mode includes it without a separate
      installation.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-setup-overview
  - id: credentials
    text: The agent uses AssumeRoleForPodIdentity with the EKS Auth API to retrieve temporary
      credentials and makes them available to workload SDKs.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html#pod-id-agent-pod
  - id: sdk
    text: Pod Identity workloads need a supported AWS SDK using the default credential chain or
      container credential provider; credentials found earlier in that chain take precedence.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html#pod-id-credentials
  - id: linux-ec2
    text: Pod Identity is supported for Pods on Linux EC2 workers, not Fargate or Windows EC2 workers.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-restrictions
  - id: irsa
    text: IAM roles for service accounts use a cluster IAM OIDC provider and a service account token
      exchanged with STS using AssumeRoleWithWebIdentity.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html#pod-id-credentials
  - id: fargate-role
    text: The Fargate Pod execution role grants infrastructure permissions such as pulling images; it
      does not grant application containers AWS permissions.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-execution-role.html
  - id: imds
    text: Restrict access to the EC2 Instance Metadata Service to prevent Pods retrieving the node role
      in addition to workload-role credentials.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-benefits
  - id: target-role
    text: Pod Identity can assume a same-account association role and then a target role in another
      account, returning target-role credentials to the Pod.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-assign-target-role.html#_how_it_works
  - id: target-role-permissions
    text: The association role needs permission to assume the target role, and the target role must
      trust the association role; session tags also require sts:TagSession.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-assign-target-role.html#_step_1_create_and_associate_a_target_iam_role
  - id: target-role-date
    text: In June 2025, EKS Pod Identity added simplified cross-account access using a target role in
      the association.
    source: https://aws.amazon.com/about-aws/whats-new/2025/06/amazon-eks-pod-identity-cross-account-access/
  - id: session-policy
    text: A Pod Identity association session policy restricts role permissions by intersection and
      requires disableSessionTags to be true; with a target role it restricts that role only.
    source: https://docs.aws.amazon.com/eks/latest/APIReference/API_CreatePodIdentityAssociation.html#AmazonEKS-CreatePodIdentityAssociation-request-policy
  - id: association-cache
    text: Association changes do not reset cached credentials; the cache lasts six hours without a
      target role and 59 minutes with one. Recreating Pods can apply changes sooner.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-assign-target-role.html#_caching_considerations
  - id: agent-proxy
    text: Pods using a proxy must exclude the Pod Identity Agent link-local addresses 169.254.170.23
      and fd00:ec2::23 from the proxy using no_proxy or NO_PROXY.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-considerations
  - id: host-network-imds
    text: Pods with hostNetwork true always have IMDS access, although supported SDKs and the CLI use
      Pod Identity credentials when enabled.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-benefits
  - id: agent-node-permission
    text: The node role needs eks-auth:AssumeRoleForPodIdentity for the Pod Identity Agent to call EKS
      Auth; AmazonEKSWorkerNodePolicy includes this permission.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-agent-setup.html#pod-id-agent-prereqs
  - id: agent-private-endpoint
    text: Nodes in private subnets need an EKS Auth interface endpoint for the Pod Identity Agent to
      reach the EKS Auth API.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-agent-setup.html#pod-id-agent-prereqs
  - id: agent-ipv6
    text: The Pod Identity Agent listens on IPv4 and IPv6 by default and cannot start when IPv6
      localhost addresses are unavailable unless its IPv6 configuration is disabled.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-agent-setup.html#pod-id-agent-considerations
diagrams:
  - id: eks-pod-credentials
    title: How Pod Identity supplies credentials
    width: 1000
    height: 180
    nodes:
      - id: pod
        label: Pod SDK
        x: 25
        y: 60
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: agent
        label: Identity Agent
        x: 280
        y: 60
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: auth
        label: EKS Auth
        x: 535
        y: 60
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: role
        label: IAM role
        x: 790
        y: 60
        w: 180
        h: 72
        tone: security
        icon: identity-and-access-management
    edges:
      - from: pod
        to: agent
        step: 1
      - from: agent
        to: auth
        step: 2
      - from: auth
        to: role
        step: 3
    steps:
      - The workload SDK requests credentials from the node agent.
      - The agent calls AssumeRoleForPodIdentity on EKS Auth.
      - The role association determines the temporary role credentials returned through the agent.
cards:
  - id: eks-001
    q: How do EKS Pod Identity and IAM roles for service accounts differ for workload permissions?
    a: Both associate a workload role with a service account. Pod Identity uses the node agent and
      trusts `pods.eks.amazonaws.com` without a cluster OIDC provider. IRSA uses OIDC and STS web
      identity. Pod Identity supports Linux EC2 Pods, not Fargate.
    facts:
      - association
      - trust
      - agent
      - irsa
      - linux-ec2
  - id: eks-026
    q: An EKS application on Fargate needs AWS API permissions. Should it use Pod Identity or its Pod
      execution role?
    a: Use IAM roles for service accounts for application permissions. Pod Identity does not support
      Fargate, and the Pod execution role is for infrastructure operations such as image pulls.
    facts:
      - irsa
      - linux-ec2
      - fargate-role
    trap: true
  - id: eks-027
    q: An EKS team runs one application in several clusters and wants to reuse its Pod Identity role.
      What must it configure?
    a: Create a role association for the application service account and namespace in each cluster. The
      role trusts `pods.eks.amazonaws.com`; no per-cluster OIDC trust update is needed.
    facts:
      - association
      - trust
  - id: eks-028
    q: An EKS workload has a Pod Identity association but still uses old credentials. What should the
      team inspect?
    a: Check the AWS SDK version and credential provider chain. Credentials located earlier in the chain
      take precedence over Pod Identity.
    facts:
      - sdk
  - id: eks-029
    q: Does an EKS Auto Mode cluster require a separate Pod Identity Agent installation?
    a: No. Auto Mode includes the agent; standard clusters need it configured on their nodes.
    facts:
      - agent
  - id: eks-030
    q: Does assigning EKS Pod Identity by itself stop a Pod from retrieving the EC2 node role?
    a: No. Restrict access to EC2 Instance Metadata Service as well, so Pods cannot retrieve node-role
      credentials.
    facts:
      - imds
    trap: true
  - id: eks-046
    q: An EKS Pod needs to read an S3 bucket in another AWS account without application-managed role
      chaining. How can EKS Pod Identity provide the credentials?
    a: Configure a same-account association role and a target role in the bucket account. Allow the
      first role to assume the target and configure the target's trust and S3 permissions.
    facts:
      - target-role
      - target-role-permissions
      - target-role-date
  - id: eks-047
    q: An EKS Pod Identity association needs a session policy to limit a shared IAM role. What setting
      is required, and can the policy add permissions?
    a: Disable session tags. The session policy intersects with role permissions, so it only restricts
      access. With a target role, it restricts the target role.
    trap: true
    facts:
      - session-policy
  - id: eks-048
    q: An EKS Pod Identity association is updated but running Pods still use the old credentials. What
      should the team do?
    a: Recreate the Pods for faster application of the change, or wait for cached credentials to
      refresh. Changing the association does not reset the cache.
    facts:
      - association-cache
  - id: eks-049
    q: An EKS Pod using an HTTP proxy cannot obtain Pod Identity credentials from the node agent. What
      proxy configuration should be checked?
    a: Exclude 169.254.170.23 and fd00:ec2::23 using no_proxy or NO_PROXY so agent requests bypass
      the proxy.
    facts:
      - agent-proxy
  - id: eks-050
    q: Can an EKS Pod with hostNetwork true be prevented from reaching the node IMDS merely by enabling
      Pod Identity?
    a: No. hostNetwork Pods always have IMDS access, even though supported SDKs and the CLI use Pod
      Identity credentials when enabled.
    trap: true
    facts:
      - host-network-imds
  - id: eks-051
    q: An EKS Pod Identity Agent on a private node cannot obtain credentials from EKS Auth. Which node
      permission and network endpoint should be checked?
    a: Grant eks-auth:AssumeRoleForPodIdentity to the node role and provide an EKS Auth interface
      endpoint for private access.
    facts:
      - agent-node-permission
      - agent-private-endpoint
  - id: eks-052
    q: An EKS Pod Identity Agent fails to start on nodes with IPv6 disabled. What configuration change
      should be checked?
    a: Disable the agent's IPv6 configuration. It listens on both IPv4 and IPv6 by default.
    facts:
      - agent-ipv6
---
EKS workload identity gives an application AWS permissions through a Kubernetes service account, an identity used by Pods. Pod Identity associates that service account with an IAM role, which grants temporary AWS credentials. IAM roles for service accounts (IRSA) is another mechanism for the same purpose.

### How it works

1. Create an IAM role with the application's permissions. For Pod Identity, its trust policy, which names who may assume the role, uses the service principal `pods.eks.amazonaws.com`.
2. Associate the role with a service account and namespace in the EKS cluster. A namespace groups Kubernetes resources. Configure application Pods to use that service account.
3. Run the Pod Identity Agent on nodes. Auto Mode includes the agent. The agent calls the EKS Auth API using `AssumeRoleForPodIdentity` to retrieve temporary credentials.
4. Use a supported AWS SDK with its default credential chain, the ordered search for credentials, or its container credential provider. The SDK retrieves credentials from the agent.
5. For IRSA, configure the cluster's IAM OpenID Connect (OIDC) provider, which lets IAM trust cluster-issued identity tokens. The SDK exchanges the service account token with AWS STS using `AssumeRoleWithWebIdentity`.
6. For cross-account access, associate a role in the cluster account and specify a target role in the resource account. Grant the first role permission to assume the target and configure the target's trust. EKS performs the role chaining, or successive role assumptions, and supplies target credentials.

A session policy is an additional policy that limits a role session. An association session policy requires session tags to be disabled and cannot grant more than the role allows. If a target role is specified, the policy limits the target role only.

The node role needs `eks-auth:AssumeRoleForPodIdentity`, and private nodes need an EKS Auth interface endpoint. If IPv6 localhost addresses are unavailable, disable the agent's IPv6 configuration so it can start.

| Mechanism | Credential path | Distinguishing requirement |
|---|---|---|
| Pod Identity | Node agent and EKS Auth | Linux EC2 workers; role trusts `pods.eks.amazonaws.com` |
| IRSA | Service account token and STS | Cluster IAM OIDC provider |
| Fargate Pod execution role | Infrastructure operations such as image pulls | Does not grant application container permissions |

### Exam cues

- If the question says reuse a workload role across EKS clusters without per-cluster OIDC providers, think Pod Identity, because the shared service principal can serve associations in each cluster.
- If the question says a Fargate application needs AWS API permissions, think IRSA, because Pod Identity does not support Fargate and the execution role is for infrastructure.
- If the question says an association exists but old credentials are still used, think the SDK credential chain, because an earlier credential source takes precedence.
- If an EKS Pod needs S3 access in another account without application-managed role chaining, think a Pod Identity target role, because EKS assumes both roles and supplies the resulting credentials.
- If a proxy prevents agent credential requests, exclude the agent's link-local IPv4 and IPv6 addresses with `no_proxy` or `NO_PROXY`.
- If private nodes cannot reach EKS Auth, think its interface endpoint and node-role permission, because the agent must call that API.

### Remember

- Pod Identity supports Linux EC2 workers; Fargate and Windows EC2 workers are excluded.
- Auto Mode includes the Pod Identity Agent.
- Restrict the EC2 Instance Metadata Service (IMDS), the node's metadata and role-credential endpoint, to prevent application access to the node role.
- Target-role support for cross-account Pod Identity associations was added in June 2025.
- Association changes do not clear cached credentials. The cache lasts six hours without a target role and 59 minutes with one; recreating Pods can apply changes sooner.

> **Trap:** A workload role association alone does not isolate node-role credentials. IMDS access must also be restricted.

> **Trap:** Pods using `hostNetwork: true` always have IMDS access, even when Pod Identity credentials are enabled.
