---
title: "IAM roles basics"
level: foundational
order: 5
facts:
  - id: role-basic
    text: "An IAM role is an identity with permissions that anyone or anything allowed can assume, such as a service or application, and it provides temporary credentials instead of long-term keys."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#id_roles
  - id: prefer-federation
    text: "AWS recommends identity federation with temporary credentials for people, and IAM users with long-term keys only for use cases federation does not support."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#id_roles
  - id: ec2-profile
    text: An instance profile is the container that passes an IAM role to an EC2 instance.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
  - id: ec2-credentials
    text: Applications retrieve temporary role credentials from EC2 instance metadata.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html#roles-usingrole-ec2instance-roles
  - id: ec2-refresh
    text: EC2 updates temporary credentials before expiration; SDK instance profile credential providers can
      retrieve and refresh them.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html#roles-usingrole-ec2instance-roles
cards:
  - id: iam-110
    q: "An application on EC2 needs to read from S3. What is the recommended way to give it permissions?"
    a: "Attach an IAM role to the instance, so the app gets temporary credentials instead of stored access keys."
    facts: [role-basic]
  - id: iam-111
    q: "Employees already sign in to a corporate identity provider. How should they get access to AWS?"
    a: "Through identity federation, which gives them temporary credentials by assuming roles, instead of creating IAM users."
    facts: [prefer-federation, role-basic]
  - id: iam-017
    q: An EC2 application needs AWS credentials without storing access keys in its machine image. What should the
      team attach?
    a: An IAM role through an instance profile. Use an SDK instance profile credential provider to retrieve and
      refresh temporary credentials.
    facts:
      - ec2-profile
      - ec2-credentials
      - ec2-refresh
---
An IAM role gives temporary permissions to whoever is allowed to assume it, such as an AWS service, an application or a federated user.

### How it works

1. Create a role with permission policies.
2. Say who may assume it, such as EC2 or a federated user.
3. The identity assumes the role and gets temporary credentials.

### Exam cues

- If the question says give an AWS service or app permissions without stored keys, think an IAM role.
- If the question says employees sign in with a corporate directory, think federation.

### Remember

- Roles use temporary credentials.
- Federation is preferred over IAM users for people.

> **Trap:** A role is not tied to one person and has no long-term password or keys.
