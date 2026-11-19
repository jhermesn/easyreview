---
title: RDS Proxy connection pooling
level: associate
order: 60
facts:
  - id: pooling
    text: RDS Proxy shares and reuses database connections to reduce the overhead of opening connections
      for each client request.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy
  - id: proxy-auth
    text: RDS Proxy can enforce IAM authentication for clients and use IAM database authentication or
      Secrets Manager credentials for database connections.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy
  - id: proxy-failover
    text: RDS Proxy can connect to a standby during database failure while preserving application
      connections.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy
  - id: client-endpoint
    text: Clients connect to RDS Proxy, while the proxy manages separate database connections.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-life
  - id: pinning
    text: RDS Proxy session pinning reserves one underlying database connection for a client session
      until that session ends, reducing reuse.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html#rds-proxy-pinning
  - id: load-shedding
    text: RDS Proxy can queue or throttle requests and reject client connections when configured limits
      are exceeded.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy
  - id: cache-reads
    text: Caching repeated relational query results in ElastiCache reduces repeated database reads; a
      cache miss queries the database and stores the result.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/caching-database-query-results.html
  - id: cache-consistency
    text: Query caching is unsuitable when queries require strong consistency or read-after-write
      consistency inside multi-statement transactions.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/caching-database-query-results.html
  - id: proxy-endpoints
    text: "A proxy default endpoint is provisioned across two Availability Zones chosen from its subnets; up to 20 additional endpoints can be added per proxy."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html
  - id: proxy-engine-support
    text: "RDS Proxy supports eligible versions of RDS for MariaDB, MySQL, PostgreSQL and SQL Server, plus Aurora MySQL and Aurora PostgreSQL."
    source: https://aws.amazon.com/rds/proxy/
  - id: proxy-managed-scaling
    text: "RDS Proxy is fully managed and automatically scales its capacity with application demand."
    source: https://aws.amazon.com/rds/proxy/
  - id: proxy-client-tls
    text: "Clients can require TLS/SSL when connecting to an RDS Proxy endpoint; the proxy can accept a newer TLS version than its underlying database."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.howitworks.html#rds-proxy-security.tls
diagrams:
  - id: rds-proxy-client-backend
    title: Client connections and shared database connections
    width: 900
    height: 230
    nodes:
      - id: client
        label: Application
        sub: many short connections
        icon: res-client
        tone: user
        x: 30
        y: 85
        w: 220
        h: 86
      - id: proxy
        label: RDS Proxy
        sub: shared backend pool
        icon: rds
        tone: database
        x: 340
        y: 85
        w: 220
        h: 86
      - id: db
        label: Database
        sub: bounded connections
        icon: rds
        tone: database
        x: 650
        y: 85
        w: 220
        h: 86
    edges:
      - from: client
        to: proxy
        step: 1
        label: connect
      - from: proxy
        to: db
        step: 2
        label: reuse pool
    steps:
      - Application connections terminate at the proxy endpoint.
      - The proxy shares database connections up to its configured limit; session pinning reduces
        sharing.
cards:
  - id: rds-002
    q: Short Lambda invocations repeatedly open connections and exhaust an RDS database connection
      budget. What should the team use?
    a: RDS Proxy. Point clients at the proxy so it can share and reuse backend database connections
      rather than opening one for each client request.
    facts:
      - pooling
      - client-endpoint
  - id: rds-031
    q: An application using RDS Proxy changes session state and database connections remain dedicated to
      individual clients. What explains the poor reuse?
    a: Session pinning. The proxy reserves one backend connection until the client session ends so that
      session state remains consistent.
    facts:
      - pinning
  - id: rds-033
    q: An RDS application repeats expensive read queries whose results can tolerate some staleness.
      Which complementary technique reduces database query work?
    a: Cache reusable query results in ElastiCache. A cache hit avoids a repeated database query. Avoid
      this for queries requiring strong consistency.
    facts:
      - cache-reads
      - cache-consistency
  - id: rds-034
    q: Does adding RDS Proxy guarantee that every incoming connection is accepted during overload?
    a: No. The proxy can queue or throttle demand, and it rejects connections if configured limits are
      exceeded.
    trap: true
    facts:
      - load-shedding
  - id: rds-085
    q: "A team is choosing RDS Proxy for an Amazon RDS for Oracle database. Is that engine supported?"
    a: "No. RDS Proxy supports eligible RDS MariaDB, MySQL, PostgreSQL and SQL Server versions, plus Aurora MySQL and PostgreSQL."
    facts: [proxy-engine-support]
  - id: rds-086
    q: "An application needs database connection pooling but its team cannot operate or scale proxy servers. Which Amazon RDS feature fits?"
    a: "RDS Proxy. AWS manages the proxy and scales its capacity automatically with demand."
    facts: [proxy-managed-scaling]
  - id: rds-096
    q: "An application connects to Amazon RDS through RDS Proxy and must encrypt the client-to-proxy connection. What should its connection settings require?"
    a: "TLS/SSL to the RDS Proxy endpoint. Set the TLS requirement in the client connection configuration."
    facts: [proxy-client-tls]
---

RDS Proxy reduces connection pressure by keeping a shared pool of database connections. A connection pool is a set of open connections that clients can reuse. The [RDS Proxy guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy) describes reuse, authentication, and recovery through a standby after database failure.

### How it works

1. Point application clients at the proxy endpoint, the connection address for the proxy. Client connections end there; RDS Proxy manages separate connections to the database.
2. The proxy shares backend connections among client requests. It can enforce IAM authentication, which uses AWS identities, and connect to the database using IAM authentication or credentials from Secrets Manager.
3. Under overload, the proxy can queue or throttle requests and reject client connections when configured limits are exceeded.
4. Watch for session pinning, where a client keeps one backend connection until its session ends. This reduces sharing. For repeated reads that tolerate stale results, ElastiCache query caching can reduce database work: a miss queries the database and stores the result.
5. Check engine and version eligibility: RDS Proxy supports RDS MariaDB, MySQL, PostgreSQL and SQL Server, and Aurora MySQL and PostgreSQL. AWS manages and scales the proxy capacity.
6. Require TLS/SSL in the client connection settings to encrypt the connection to the proxy. The client-to-proxy TLS version can differ from the version used with the database.

### Exam cues

- If the question says bursts of short Lambda invocations exhaust RDS connections, think RDS Proxy, because it reuses connections across client requests.
- If the question says repeated read queries consume database CPU, think query caching when stale results are acceptable, because a cache hit avoids another database query.

### Remember

- Session pinning ties one backend connection to a client session until it ends.
- The proxy can queue or throttle requests and reject connections when configured limits are exceeded.

> **Trap:** A proxy shares connections but still has capacity limits. It can reject demand, and pinning can reduce reuse. Query caching also needs a consistency decision: avoid it for reads that must always reflect the latest write.
