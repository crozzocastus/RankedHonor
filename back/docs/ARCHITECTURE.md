# Backend Architecture - RankedHonor

**Version:** 1.0.0  
**Last Updated:** January 15, 2026

## 🎯 Architecture Overview

RankedHonor backend uses a **hybrid microservices architecture** combining Rust (performance-critical services) and Python (rapid development, integrations) with a multi-database strategy.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                            │
│                     http://localhost:3000                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │ HTTP/REST
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                     Python API (FastAPI)                            │
│                        Port 8080                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Routes: /auth, /users, /matches, /rankings, /streams        │  │
│  │ Handles: User management, OAuth, Analytics, Integrations    │  │
│  └─────────────────────────────────────────────────────────────┘  │
└──┬────────────┬──────────────────┬────────────────┬───────────────┘
   │            │                  │                │
   │ HTTP       │ SQL              │ NoSQL          │ Cache
   ▼            ▼                  ▼                ▼
┌──────────┐ ┌──────────┐  ┌────────────┐   ┌──────────┐
│  Rust    │ │  MySQL   │  │  MongoDB   │   │  Redis   │
│ Services │ │  :3306   │  │   :27017   │   │  :6379   │
└──────────┘ └──────────┘  └────────────┘   └──────────┘
   │
   ├─ game-server (Port 8000)
   │  ├─ Match management
   │  ├─ Game state tracking
   │  └─ Statistics calculation
   │
   ├─ websocket-server (Port 8001)
   │  ├─ Real-time match updates
   │  ├─ Live rankings
   │  └─ Notifications
   │
   ├─ matchmaking-engine (Library)
   │  ├─ Queue management
   │  ├─ MMR-based matching
   │  └─ Region/mode filtering
   │
   └─ auth-rs (Library)
      ├─ JWT generation/validation
      ├─ Password hashing (Argon2)
      └─ Token refresh
```

## 🧱 Components

### 1. Python API (FastAPI)

**Purpose:** REST API, user management, third-party integrations  
**Port:** 8080  
**Language:** Python 3.11+ with uv  
**Framework:** FastAPI

**Responsibilities:**
- User registration/login
- Profile management
- OAuth integrations (Twitch, YouTube, Discord)
- Analytics endpoints
- Admin operations
- Proxying requests to Rust services

**Why Python:**
- ✅ Rapid development for business logic
- ✅ Rich ecosystem for integrations (httpx, pydantic)
- ✅ Easy to maintain and extend
- ✅ Great for data processing and analytics

**Tech Stack:**
- FastAPI (async web framework)
- SQLAlchemy (MySQL ORM)
- Motor (MongoDB async driver)
- Redis (caching & sessions)
- Pydantic (data validation)
- uv (fast package manager)

---

### 2. Rust Services

#### 2.1 Game Server (Port 8000)

**Purpose:** Core game logic and match management  
**Framework:** Axum (async web framework)

**Responsibilities:**
- Match creation and finalization
- Match result processing
- Statistics calculation
- MMR updates
- Leaderboard generation

**Why Rust:**
- ✅ High performance (10k+ req/sec)
- ✅ Memory safety
- ✅ Concurrent processing with Tokio
- ✅ Type safety for game logic

#### 2.2 WebSocket Server (Port 8001)

**Purpose:** Real-time communication  
**Framework:** Axum with WebSocket support

**Responsibilities:**
- Live match updates
- Matchmaking queue status
- Ranking changes broadcast
- In-game events
- Notifications

**Why Separate Service:**
- Long-lived connections don't block HTTP
- Can scale independently
- Redis pub/sub for multi-instance

#### 2.3 Matchmaking Engine (Library)

**Purpose:** Player matching algorithm  
**Type:** Rust library used by game-server

**Responsibilities:**
- Queue management
- MMR-based matching (tolerance ±200)
- Region filtering
- Mode-specific queues (1v1, 2v2, 4v4)
- Wait time estimation

**Algorithm:**
```rust
1. Player joins queue with {user_id, mmr, mode, region}
2. Find eligible players:
   - Same mode
   - Same region
   - MMR within tolerance (±200)
3. Group players (2 for 1v1, 4 for 2v2, 8 for 4v4)
4. Create match and remove from queue
```

#### 2.4 Auth Library (auth-rs)

**Purpose:** Authentication and security  
**Type:** Rust library

**Responsibilities:**
- Password hashing (Argon2)
- JWT generation (access + refresh tokens)
- Token validation
- Rate limiting logic

**Can be used by:**
- Python API (via HTTP calls to Rust service)
- Game server (direct library usage)
- WebSocket server (JWT validation)

---

## 🗄️ Database Strategy

### MySQL (Relational)

**What:** Critical, structured data  
**Port:** 3306

**Tables:**
- `users` - User accounts
- `user_stats` - Statistics (overall + per mode)
- `matches` - Match metadata
- `match_participants` - Player results
- `teams` - Teams/guilds
- `achievements` - Achievement system
- `creator_integrations` - OAuth tokens

**Queries:**
- User authentication
- Rankings (ORDER BY mmr DESC)
- Match history (JOIN matches + participants)
- Team membership

### MongoDB (Document)

**What:** High-write, flexible data  
**Port:** 27017

**Collections:**
- `live_feed_events` - Activity feed (TTL 7d)
- `match_detailed_logs` - Timeline events
- `live_streams` - Twitch/YouTube cache
- `matchmaking_queue` - Queue state (TTL 10min)
- `notifications` - User notifications
- `hero_pick_rates` - Daily analytics
- `user_activity_logs` - Audit trail

**Queries:**
- Live feed (find by timestamp DESC)
- Match timeline (nested arrays)
- Analytics aggregation

### Redis (Cache)

**What:** In-memory cache and pub/sub  
**Port:** 6379

**Data:**
- `leaderboard:{mode}` - Sorted Sets
- `session:{token}` - JWT blacklist
- `rate_limit:{ip}` - Request counters
- `matchmaking:queue` - Active queues
- `pubsub:events` - Real-time events

**Usage:**
- Leaderboard cache (5 min TTL)
- Session management
- Rate limiting (sliding window)
- WebSocket pub/sub

---

## 🔄 Communication Patterns

### 1. Frontend → Python API (REST)

```typescript
// Frontend (Next.js)
const response = await fetch('http://localhost:8080/api/v1/users/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### 2. Python API → Rust Service (HTTP)

```python
# Python API
async with httpx.AsyncClient() as client:
    response = await client.post(
        f"{settings.RUST_GAME_SERVER_URL}/matches",
        json={"mode": "duelo", "players": [...]}
    )
```

### 3. WebSocket Communication

```javascript
// Frontend
const ws = new WebSocket('ws://localhost:8001/ws');
ws.send(JSON.stringify({ type: 'subscribe', channel: 'rankings' }));
```

### 4. Redis Pub/Sub (Internal)

```rust
// Rust WebSocket Server
redis_client.publish("rankings:update", json_payload).await;
```

---

## 🔐 Authentication Flow

```
1. User Login
   Frontend → POST /api/v1/auth/login (email, password)
            → Python API validates credentials (MySQL)
            → Generate JWT (access + refresh tokens)
            ← Return tokens

2. Authenticated Request
   Frontend → GET /api/v1/users/me
            → Header: Authorization: Bearer {access_token}
            → Python API validates JWT
            → Query user from MySQL
            ← Return user data

3. Token Refresh
   Frontend → POST /api/v1/auth/refresh (refresh_token)
            → Python API validates refresh token
            → Generate new access token
            ← Return new tokens
```

**Token Lifetimes:**
- Access Token: 15 minutes
- Refresh Token: 7 days

---

## 📊 Match Lifecycle

```
1. Matchmaking
   Player → POST /api/v1/matchmaking/queue
          → Python API → Rust matchmaking-engine
          → Add to Redis queue
          → Match found (WebSocket notification)

2. Match Start
   Launcher → POST /api/v1/matches (Rust game-server)
            → Create match in MySQL (status=pending)
            → Store match_id in MongoDB queue

3. Match Progress
   Game → WebSocket events to /ws
        → Rust websocket-server
        → Broadcast to spectators
        → Log events in MongoDB (timeline)

4. Match End
   Launcher → PUT /api/v1/matches/{id}/result
            → Rust game-server
            → Update MySQL:
              - matches (status=completed)
              - match_participants (kills, deaths, result)
              - user_stats (mmr, wins, losses)
            → MongoDB:
              - match_detailed_logs
              - live_feed_events (rank_up if applicable)
            → Redis:
              - Invalidate leaderboard cache
            → WebSocket:
              - Broadcast rank change
```

---

## 🚀 Deployment Architecture

### Development
```
localhost:3000  - Frontend (Next.js dev server)
localhost:8080  - Python API (uvicorn --reload)
localhost:8000  - Rust game-server (cargo run)
localhost:8001  - Rust websocket-server (cargo run)
localhost:3306  - MySQL
localhost:27017 - MongoDB
localhost:6379  - Redis
```

### Production (Future)
```
AWS/GCP/Azure:
  - Frontend: Vercel (CDN + Edge Functions)
  - Python API: Docker containers (ECS/Cloud Run)
  - Rust Services: Docker containers (optimized binaries)
  - MySQL: RDS/Cloud SQL (managed)
  - MongoDB: Atlas (managed)
  - Redis: ElastiCache/MemoryStore (managed)
  - Load Balancer: ALB/Cloud Load Balancing
  - CDN: CloudFront/Cloud CDN
```

---

## 📈 Scalability Strategy

### Horizontal Scaling

**Python API:**
- Run multiple instances behind load balancer
- Stateless (JWT in cookies)
- Shared MySQL/MongoDB/Redis

**Rust Services:**
- Multiple game-server instances
- Multiple websocket-server instances
- Redis pub/sub for inter-server communication

**Databases:**
- MySQL: Read replicas for queries
- MongoDB: Sharding by region or user_id
- Redis: Redis Cluster for high availability

### Vertical Scaling
- Increase CPU/RAM for database servers
- Optimize queries and indexes
- Connection pooling

---

## 🔧 Configuration Management

### Environment Variables

**Python API** (`.env`):
```env
ENVIRONMENT=production
SECRET_KEY=...
MYSQL_URL=...
MONGODB_URL=...
REDIS_URL=...
RUST_GAME_SERVER_URL=http://rust-game:8000
```

**Rust Services** (`.env`):
```env
DATABASE_URL=mysql://...
REDIS_URL=redis://...
JWT_ACCESS_SECRET=...
GAME_SERVER_PORT=8000
```

### Service Discovery
- Development: Hardcoded URLs
- Production: Kubernetes Service Discovery or Consul

---

## 🧪 Testing Strategy

### Unit Tests
- Python: pytest (FastAPI test client)
- Rust: cargo test (mockall for mocking)

### Integration Tests
- Test Python ↔ Rust communication
- Test database operations
- Test authentication flow

### Load Tests
- Apache JMeter or k6
- Target: 1000 concurrent users
- Monitor response times and error rates

---

## 📚 Technology Decisions

### Why Rust + Python?

**Rust for:**
- Performance-critical paths (matchmaking, game logic)
- Real-time services (WebSocket)
- Type safety in game mechanics
- Long-running processes

**Python for:**
- Rapid feature development
- Third-party API integrations
- Admin tools and analytics
- Developer productivity

### Communication: HTTP vs gRPC vs PyO3?

**Choice: HTTP (REST)**
- ✅ Simple, debuggable
- ✅ No coupling between services
- ✅ Easy to swap implementations
- ❌ Slightly slower than gRPC (acceptable trade-off)

**Future consideration:**
- gRPC for Rust ↔ Rust (lower latency)
- PyO3 for Python calling Rust libs (tight integration)

---

## 🎓 Learning Resources

**Rust:**
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)
- [Axum Framework](https://github.com/tokio-rs/axum)

**Python:**
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [uv Package Manager](https://github.com/astral-sh/uv)

**Databases:**
- [MySQL Performance Tuning](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MongoDB Aggregation](https://www.mongodb.com/docs/manual/aggregation/)
- [Redis Best Practices](https://redis.io/docs/manual/patterns/)

---

**Next Steps:**
1. ✅ Architecture documented
2. ⏳ Implement database migrations
3. ⏳ Build core API endpoints
4. ⏳ Implement matchmaking logic
5. ⏳ Setup CI/CD pipelines
