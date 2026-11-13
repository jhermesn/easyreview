---
title: Credential providers, pagination, and retries
level: associate
order: 10
facts:
  - id: sdk-purpose
    text: AWS SDKs provide libraries and APIs that help application code access cloud services.
    source: https://aws.amazon.com/what-is/sdk/#amsc3--1chu1sx
  - id: chain
    text: SDK credential provider chains search sources in order and stop at the first valid credentials; supported providers and chain order vary by SDK.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html#credentialProviderChain
  - id: refresh
    text: Standardized credential providers attempt to renew expired credentials automatically.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html#credentialProviderChain
  - id: ec2-role
    text: The IMDS provider can obtain temporary credentials for an EC2 instance role from instance metadata.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html#credentialProviderChain
  - id: role-definition
    text: An IAM role is an identity with permissions that provides temporary credentials when assumed.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#id_roles
  - id: container-provider
    text: The container credential provider obtains credentials for containerized applications and can be used with ECS or EKS.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-container-credentials.html#feature-container-credentials
  - id: early-provider
    text: The IMDS provider is checked after several other providers, so earlier valid credentials can prevent it from being used.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-imds-credentials.html#feature-imds-credentials
  - id: pagination
    text: Many operations split results into pages; the Java 2.x SDK can automatically request subsequent pages or use a response token for manual pagination.
    source: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/pagination.html#pagination
  - id: ssm-token
    text: Systems Manager DescribeInstanceInformation returns a NextToken for the next set; it is empty when there are no further items.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_DescribeInstanceInformation.html#systemsmanager-DescribeInstanceInformation-response-NextToken
  - id: ssm-paginator
    text: Boto3 provides a paginator for DescribeInstanceInformation responses.
    source: https://docs.aws.amazon.com/boto3/latest/reference/services/ssm/paginator/DescribeInstanceInformation.html#SSM.Paginator.DescribeInstanceInformation.paginate
  - id: ssm-page
    text: DescribeInstanceInformation defaults to 10 items per call and accepts MaxResults from 5 to 50.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_DescribeInstanceInformation.html#systemsmanager-DescribeInstanceInformation-request-MaxResults
  - id: ssm-stopped
    text: DescribeInstanceInformation does not return stopped or terminated nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_DescribeInstanceInformation.html#API_DescribeInstanceInformation
  - id: cli-pages
    text: For supported paginated commands, the AWS CLI normally retrieves all available items; --no-paginate makes only the first call.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html#cli-usage-pagination-nopaginate
  - id: retry-opt-in
    text: The documented 2026 retry behavior requires AWS_NEW_RETRIES_2026=true until it becomes the default; earlier behavior differs in backoff timing, retry quota costs and service defaults.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html#feature-retry-behavior
  - id: retry-standard
    text: Under the documented 2026 behavior standard retry mode uses exponential backoff with jitter and a retry quota, and does not delay the initial request.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html#standard-mode
  - id: retry-adaptive
    text: Adaptive retry mode adds a per-client rate limiter that can delay initial requests and can slow unaffected resources sharing that client.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html#adaptive-mode
  - id: retry-attempts
    text: Under the documented 2026 behavior the general default is three total attempts, including the initial request; DynamoDB and DynamoDB Streams default to four.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html#retry-settings
  - id: retry-errors
    text: Under the documented 2026 behavior transient and throttling errors can be retried, while non-retryable errors such as access denied are returned immediately.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html#error-classification
  - id: throttle-definition
    text: Throttling errors indicate that a service rejected a request because of rate limits.
    source: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html#error-classification
cards:
  - id: sdks-001
    q: A Systems Manager inventory script misses managed nodes and receives throttling errors. How should the AWS SDK script handle paginated results and retries?
    a: Follow NextToken until it is empty, or use a supported paginator, and use SDK retry handling with backoff for throttling. Stopped and terminated nodes are not returned.
    facts: [ssm-token, ssm-stopped, ssm-paginator, retry-standard]
  - id: sdks-002
    q: An EC2 application needs AWS credentials without embedded access keys. Which SDK provider can supply role credentials?
    a: The IMDS credential provider can obtain temporary credentials for the instance role.
    facts: [ec2-role]
  - id: sdks-003
    q: An EC2 application unexpectedly uses credentials other than its instance role. What should the team check in its SDK credential chain?
    a: Check for an earlier source with valid credentials; the chain stops there before reaching IMDS.
    facts: [chain, early-provider]
    trap: true
  - id: sdks-004
    q: What does the AWS SDK credential provider chain do when it finds valid credentials?
    a: It stops searching. Provider availability and order vary by SDK.
    facts: [chain]
  - id: sdks-005
    q: A Systems Manager DescribeInstanceInformation call returns a NextToken. How does an AWS SDK retrieve remaining nodes?
    a: Supply the token to the next call and continue until the returned token is empty, or use a supported paginator.
    facts: [ssm-token, ssm-paginator]
  - id: sdks-006
    q: With the documented 2026 AWS SDK retry behavior, how many requests are included in the general default maximum attempts?
    a: Three total attempts, including the first request. DynamoDB and DynamoDB Streams default to four.
    facts: [retry-attempts, retry-opt-in]
  - id: sdks-007
    q: An AWS SDK client serves several resources and throttling on one slows requests to all of them. Which retry mode can cause this?
    a: Adaptive mode. Its rate limiter is shared by requests using the client.
    facts: [retry-adaptive, retry-opt-in]
  - id: sdks-008
    q: Will standard AWS SDK retries fix an access-denied error under the documented 2026 retry behavior?
    a: No. Access denied is non-retryable and is returned immediately.
    facts: [retry-errors, retry-opt-in]
    trap: true
  - id: sdks-009
    q: An Amazon ECS application needs AWS SDK credentials without embedding keys. Which SDK provider can retrieve container credentials?
    a: The container credential provider can obtain credentials for containerized applications.
    facts: [container-provider]
---
AWS software development kits (SDKs) provide libraries for application code to call AWS services. Credential providers supply credentials for requests, pagination retrieves results in portions, and retries handle eligible temporary failures.

### How it works

1. The SDK searches its credential provider chain, an ordered list of credential sources, until it finds valid credentials. Supported providers and order vary by SDK. Standardized providers attempt to renew expired credentials.
2. On Amazon EC2, the instance metadata service (IMDS) can provide temporary credentials for the instance role, an IAM identity with permissions. An earlier valid source can take precedence. Containerized applications on Amazon ECS or EKS can use the container credential provider.
3. For paginated operations, process each page and send its continuation token in the next request until no token remains. A supported paginator can make those calls for you.
4. With the documented 2026 retry behavior enabled, standard mode retries eligible transient errors and throttling errors. Throttling occurs when a service rejects a request due to rate limits. Standard mode uses exponential backoff, increasing delays on average, and jitter, randomizing each delay. A retry quota, a token budget for retries, can stop retries; non-retryable errors return immediately.

### Exam cues

- If the question says an EC2 application must avoid embedded keys, think instance role and IMDS provider, because the SDK can obtain temporary role credentials.
- If the question says a Systems Manager node list is incomplete, think pagination, because `DescribeInstanceInformation` returns a token for the next set. Stopped and terminated nodes are not returned by that operation.
- If the question says one throttled resource slows unrelated requests on the same client, think adaptive retry mode, because its rate limiter is per client.
- If the question says access is denied, think fix permissions, not retries, because access denied is non-retryable.

### Remember

- `DescribeInstanceInformation` defaults to 10 items per call; `MaxResults` accepts 5 through 50.
- The AWS CLI normally retrieves all pages for supported commands; `--no-paginate` makes only the first call.
- The documented 2026 retry behavior requires `AWS_NEW_RETRIES_2026=true` until it becomes the default. Older behavior differs.
- Under that behavior, the general default is 3 total attempts, including the initial request; DynamoDB and DynamoDB Streams default to 4.
- Standard mode does not delay the first request. Adaptive mode can delay it.

> **Trap:** A page size is not the whole result set. Follow the continuation token or use a supported paginator.
