---
title: Check automation and security
level: professional
order: 20
facts:
  - id: refresh
    text: The Support API can refresh eligible checks; some automatically refreshed checks reject refresh requests.
    source: https://docs.aws.amazon.com/awssupport/latest/APIReference/API_RefreshTrustedAdvisorCheck.html
  - id: refresh-status
    text: Poll refresh status after submitting a refresh request to determine when new data is ready.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trustedadvisor.html#getcheckstatus
  - id: refresh-outcome
    text: Refresh status success means the check refreshed successfully; abandoned means refresh failed.
    source: https://docs.aws.amazon.com/awssupport/latest/APIReference/API_TrustedAdvisorCheckRefreshStatus.html
  - id: result
    text: DescribeTrustedAdvisorCheckResult returns check results but does not generate updated results.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trustedadvisor.html#requestcheck
cards:
  - id: trusted-advisor-007
    q: How should a program retrieve fresh Trusted Advisor check results through the Support API?
    a: "Refresh a supported check, poll its refresh status until success, then call DescribeTrustedAdvisorCheckResult. Handle failed refreshes."
    facts: [refresh, refresh-status, refresh-outcome, result]
  - id: trusted-advisor-008
    q: Can every Trusted Advisor check be refreshed with RefreshTrustedAdvisorCheck?
    a: "No. Some automatically refreshed checks reject refresh requests."
    trap: true
    facts: [refresh]

---
This section builds on Trusted Advisor checks and covers how to retrieve fresh results through the Support API.

### How it works

1. Request a refresh for an eligible check. Some automatically refreshed checks reject refresh requests.
2. Poll refresh status until it reports success, then call `DescribeTrustedAdvisorCheckResult`. Handle an abandoned status as a failed refresh. The result operation does not generate updated results.

### Exam cues

- If a program needs fresh Trusted Advisor results, refresh, poll and retrieve them, because reading a result does not refresh the check.

### Remember

- Refresh status `success` means the check refreshed; `abandoned` means it failed.

> **Trap:** A result request does not refresh a check. A refresh request does not guarantee that every check accepts it or that fresh results are ready immediately.
