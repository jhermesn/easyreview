---
title: STS sessions and role chaining
level: professional
order: 60
facts:
  - id: sts-credential-parts
    text: STS temporary credentials contain an access key ID, secret access key and session token.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: session-expiration
    text: STS temporary credentials have an expiration time and must be replaced for continued access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html
  - id: assumerole-default
    text: AssumeRole defaults DurationSeconds to 3600 seconds, or one hour.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole_RequestParameters
  - id: assumerole-range
    text: AssumeRole accepts at least 900 seconds and at most the role configured maximum; the maximum setting
      ranges from one to twelve hours.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole_RequestParameters
  - id: chaining-definition
    text: Role chaining means using credentials from one role to assume another.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#iam-term-role-chaining
  - id: chaining-limit
    text: A chained CLI or API role session is limited to one hour; requesting DurationSeconds greater than 3600
      fails.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole_RequestParameters
  - id: role-not-combined
    text: An assumed session uses the role permissions rather than a combination with the caller original
      permissions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html#access_policies-cross-account-resource-access
  - id: regional-endpoints
    text: STS has Regional endpoints; a client can choose another Regional endpoint if it cannot reach the
      original.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html#using_sts_regions
  - id: transitive-tags
    text: Session tags marked transitive persist through role chaining; ordinary session tags do not pass
      automatically.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_role-chaining
  - id: source-identity
    text: A source identity set on a role session persists through chaining and appears in CloudTrail activity; it
      cannot be changed after it is set.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-sourceidentity
cards:
  - id: iam-014
    q: A pipeline uses role A credentials to assume role B and requests a four-hour STS session. What happens?
    a: AssumeRole fails. Role chaining limits that API session to one hour, regardless of the target role maximum.
    trap: true
    facts:
      - chaining-definition
      - chaining-limit
  - id: iam-044
    q: An IAM user calls AssumeRole for a role with a twelve-hour maximum but omits DurationSeconds. How long is
      the requested session?
    a: One hour. The configured maximum is a ceiling; the default DurationSeconds is 3600.
    trap: true
    facts:
      - assumerole-default
      - assumerole-range
  - id: iam-045
    q: Which three values must an application use from an AWS STS temporary credential set?
    a: The access key ID, secret access key and session token. Retrieve replacement credentials before expiration
      for continued access.
    facts:
      - sts-credential-parts
      - session-expiration
  - id: iam-046
    q: A pipeline needs project session tags to survive when role A assumes role B. What should it configure?
    a: Mark the session tags as transitive. Ordinary session tags do not automatically pass to the next role
      session.
    facts:
      - transitive-tags
  - id: iam-047
    q: An audit team needs the originating identity recorded across a chain of IAM role sessions. Which STS
      feature helps?
    a: Source identity. Once set, it persists through role chaining, cannot be changed, and appears in CloudTrail
      activity.
    facts:
      - source-identity
---

AWS Security Token Service (STS) issues temporary credentials for a session. Role chaining is the use of an existing role session to assume another role. Each session acts with its selected role permissions.

### How it works

1. Call `AssumeRole` with the target role and optional `DurationSeconds`. STS returns an access key ID, secret access key, session token and expiration time.
2. Use that credential set for requests during the session. Retrieve replacement credentials before they expire to keep working.
3. If those role credentials call `AssumeRole` again, the new session is chained and has a one-hour maximum.
4. Mark session tags, temporary key-value labels, as transitive if they must survive the chain. A source identity, an origin identifier recorded in CloudTrail, also persists and cannot be changed after it is set.

### Exam cues

- If the question says a chained role requests four hours, think failed assumption, because a chained API session cannot exceed one hour.
- If the question says a role has a twelve-hour maximum but no duration was requested, think one-hour session, because the default is separate from the ceiling.
- If the question says project attributes disappear on the next role, think transitive session tags, because ordinary tags do not pass automatically.

### Remember

- `AssumeRole` defaults to 3,600 seconds; its minimum request is 900 seconds.
- The role maximum setting can range from one to twelve hours.
- A chained request above 3,600 seconds fails.
- STS offers Regional endpoints; clients can choose an alternative if the original cannot be reached.

> **Trap:** Raising the target role maximum does not raise the role-chaining limit.
