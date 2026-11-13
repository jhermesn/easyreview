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
  - id: connection-cap
    text: MaxConnectionsPercent limits RDS Proxy backend connections as a percentage of the database
      max_connections setting.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
  - id: cap-monitoring
    text: RDS Proxy DatabaseConnections and MaxDatabaseConnectionsAllowed show used and permitted
      backend connections; reserved connections can make the latter lower than the configured
      percentage suggests.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
  - id: borrow-default
    text: ConnectionBorrowTimeout defaults to 120 seconds and limits how long RDS Proxy waits for an
      available database connection.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.connectionborrowtimeout
  - id: idle-default
    text: IdleClientTimeout defaults to 1800 seconds; closing an idle client connection returns its
      backend connection to the pool.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.idleclienttimeout
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
  - id: rds-014
    q: An RDS Proxy workload must leave database connections available for other users. Which setting
      caps the proxy connection pool?
    a: MaxConnectionsPercent. It caps backend connections relative to database max_connections. Compare
      DatabaseConnections with MaxDatabaseConnectionsAllowed to monitor actual usable capacity.
    facts:
      - connection-cap
      - cap-monitoring
  - id: rds-031
    q: An application using RDS Proxy changes session state and database connections remain dedicated to
      individual clients. What explains the poor reuse?
    a: Session pinning. The proxy reserves one backend connection until the client session ends so that
      session state remains consistent.
    facts:
      - pinning
  - id: rds-032
    q: What are the default RDS Proxy ConnectionBorrowTimeout and IdleClientTimeout values?
    a: ConnectionBorrowTimeout is 120 seconds. IdleClientTimeout is 1800 seconds. They control waiting
      for backend capacity and closing idle client connections, respectively.
    facts:
      - borrow-default
      - idle-default
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
---

RDS Proxy reduces connection pressure by keeping a shared pool of database connections. A connection pool is a set of open connections that clients can reuse. The [RDS Proxy guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy) describes reuse, authentication, and recovery through a standby after database failure.

### How it works

1. Point application clients at the proxy endpoint, the connection address for the proxy. Client connections end there; RDS Proxy manages separate connections to the database.
2. The proxy shares backend connections among client requests. It can enforce IAM authentication, which uses AWS identities, and connect to the database using IAM authentication or credentials from Secrets Manager.
3. Set `MaxConnectionsPercent` to cap backend connections relative to the database's `max_connections` setting. Compare `DatabaseConnections` with `MaxDatabaseConnectionsAllowed`; internal reservations can lower usable capacity.
4. When no suitable backend connection is available, the proxy waits up to `ConnectionBorrowTimeout`. Under overload it can queue, throttle, or reject clients.
5. Watch for session pinning, where a client keeps one backend connection until its session ends. This preserves session state but reduces sharing. For repeated reads that tolerate stale results, ElastiCache query caching can reduce database work further: a miss queries the database and stores the result.

### Exam cues

- If the question says bursts of short Lambda invocations exhaust RDS connections, think RDS Proxy, because it reuses connections across client requests.
- If the question says reserve database connections for other clients, think `MaxConnectionsPercent`, because it caps the proxy's backend pool.
- If the question says repeated read queries consume database CPU, think query caching when stale results are acceptable, because a cache hit avoids another database query.

### Remember

| Setting or behavior | Meaning |
|---|---|
| `MaxConnectionsPercent` | Backend pool cap relative to `max_connections` |
| `ConnectionBorrowTimeout` | Wait for a backend connection; default 120 seconds |
| `IdleClientTimeout` | Close an idle client connection; default 1800 seconds |
| Session pinning | One backend connection remains tied to a client session |

> **Trap:** A proxy shares connections but still has capacity limits. It can reject demand, and pinning can reduce reuse. Query caching also needs a consistency decision: avoid it for reads that must always reflect the latest write.
