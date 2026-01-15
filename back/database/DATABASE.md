# Database Strategy - RankedHonor

## Overview

RankedHonor uses a **hybrid database architecture** combining MySQL, MongoDB, and Redis for optimal performance and scalability.

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                  Python API (FastAPI)                       │
│                       Port 8080                             │
└─────┬─────────────────┬────────────────┬────────────────────┘
      │                 │                │
      │                 │                │
      ▼                 ▼                ▼
┌──────────┐   ┌──────────────┐   ┌─────────┐
│  MySQL   │   │   MongoDB    │   │  Redis  │
│  Port    │   │   Port       │   │  Port   │
│  3306    │   │   27017      │   │  6379   │
└──────────┘   └──────────────┘   └─────────┘
      ▲                 ▲                ▲
      │                 │                │
      └─────────────────┴────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Rust Services (game-server,                    │
│              websocket-server, matchmaking)                 │
│              Ports 8000-8001                                │
└─────────────────────────────────────────────────────────────┘
```

## Database Roles

### MySQL (Relational - ACID)
**What:** Critical, structured, transactional data  
**Why:** Data integrity, complex queries, relationships

**Data:**
- ✅ Users & authentication
- ✅ User stats & rankings
- ✅ Match results
- ✅ Teams/guilds & memberships
- ✅ Achievements
- ✅ Third-party integrations (OAuth tokens)

**Characteristics:**
- ACID compliance
- Foreign key constraints
- Complex JOINs
- Aggregations (SUM, AVG, GROUP BY)
- Optimized indexes for rankings

### MongoDB (Document - Flexibility)
**What:** High-write, semi-structured, analytical data  
**Why:** Flexibility, scalability, write performance

**Data:**
- ✅ Live activity feed (rank_up, match_end events)
- ✅ Match detailed logs (timeline, chat)
- ✅ Live streams & clips (Twitch/YouTube cache)
- ✅ Matchmaking queue state (temporary)
- ✅ Notifications (temporary with TTL)
- ✅ Analytics & metrics (hero pick rates, daily stats)
- ✅ Activity logs (user actions, audit trail)

**Characteristics:**
- Nested documents
- TTL indexes (auto-cleanup)
- Flexible schema
- High write throughput
- Aggregation pipeline

### Redis (In-Memory - Cache)
**What:** Cache, sessions, real-time data  
**Why:** Speed, pub/sub, atomic operations

**Data:**
- ✅ Session tokens (JWT blacklist)
- ✅ Leaderboard cache (Redis Sorted Sets)
- ✅ Rate limiting counters
- ✅ Pub/Sub for WebSocket events
- ✅ Matchmaking queue cache
- ✅ Active player count

**Characteristics:**
- In-memory (sub-millisecond)
- Sorted Sets for leaderboards
- Pub/Sub for real-time
- Expiration (TTL)
- Atomic operations

## Data Flow Examples

### 1. User Registration
```
Frontend → Python API → MySQL (users table)
                     → MongoDB (activity log)
```

### 2. Match Completion
```
Rust game-server → MySQL (matches, match_participants, user_stats)
                 → MongoDB (match_detailed_logs)
                 → MongoDB (live_feed_events)
                 → Redis (invalidate leaderboard cache)
```

### 3. Leaderboard Query
```
Frontend → Python API → Redis (check cache)
                     ↓ (cache miss)
                     → MySQL (query + ORDER BY mmr)
                     → Redis (cache result for 5 min)
```

### 4. Live Stream Update
```
External API (Twitch) → Python API → MongoDB (live_streams)
                                   → Redis (pub/sub to WebSocket clients)
```

## Migration Strategy

### Phase 1: MySQL (Current)
Setup core tables:
```bash
cd database/mysql
mysql -u rankedhonor -p rankedhonor < schema.sql
```

### Phase 2: MongoDB
Setup collections:
```bash
cd database/mongodb
mongosh rankedhonor < schemas.js
```

### Phase 3: Redis
Setup cache layer:
```bash
redis-cli
# Configure in application code
```

## Backup Strategy

### MySQL
```bash
# Daily backup
mysqldump -u rankedhonor -p rankedhonor > backup_$(date +%Y%m%d).sql

# Restore
mysql -u rankedhonor -p rankedhonor < backup_20260115.sql
```

### MongoDB
```bash
# Daily backup
mongodump --db rankedhonor --out backup_$(date +%Y%m%d)

# Restore
mongorestore --db rankedhonor backup_20260115/rankedhonor
```

### Redis
```bash
# Save snapshot
redis-cli BGSAVE

# Enable AOF (Append-Only File) for durability
redis-cli CONFIG SET appendonly yes
```

## Monitoring

### Key Metrics to Track
- MySQL: Query time, slow queries, connection pool
- MongoDB: Write ops/sec, index usage, collection size
- Redis: Memory usage, hit rate, eviction count

### Tools
- MySQL: MySQL Workbench, pt-query-digest
- MongoDB: MongoDB Compass, mongostat
- Redis: redis-cli INFO, RedisInsight

## Security

- [ ] MySQL: SSL/TLS connections, encrypted passwords
- [ ] MongoDB: Authentication enabled, network binding
- [ ] Redis: Password authentication, disable dangerous commands
- [ ] All: Firewall rules, VPC isolation, regular security updates

## Performance Tuning

### MySQL
- InnoDB buffer pool size (70-80% of RAM)
- Query cache (deprecated in 8.0, use Redis)
- Proper indexes on frequently queried columns

### MongoDB
- Index frequently queried fields
- Use projection to reduce data transfer
- Shard large collections (future)

### Redis
- Maxmemory policy (allkeys-lru recommended)
- Persistence: AOF for durability, RDB for speed
- Connection pooling

## Scaling Strategy

### Vertical Scaling (Short-term)
- Increase RAM/CPU for database servers
- Optimize queries and indexes

### Horizontal Scaling (Long-term)
- MySQL: Read replicas, ProxySQL for load balancing
- MongoDB: Sharding by region or user_id
- Redis: Redis Cluster for high availability

---

**Current Status:** ✅ Schema designed  
**Next Steps:** Implement migrations, seed data, test queries
