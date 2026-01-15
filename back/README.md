# RankedHonor Backend

> High-performance backend for RankedHonor competitive gaming platform combining Rust (performance) and Python (rapid development).

![Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![Rust](https://img.shields.io/badge/Rust-1.75+-orange)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green)
![Redis](https://img.shields.io/badge/Redis-7.0-red)

---

## 📁 Project Structure

```
back/
├── rust-core/              # Rust services (performance-critical)
│   ├── auth-rs/            # Authentication library
│   ├── game-server/        # Match management (Port 8000)
│   ├── matchmaking-engine/ # Matchmaking algorithm
│   ├── websocket-server/   # Real-time updates (Port 8001)
│   └── shared-models/      # Shared data models
│
├── python-api/             # Python FastAPI (Port 8080)
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   ├── core/           # Config, database, security
│   │   └── api/v1/         # API endpoints
│   ├── tests/              # Pytest test suite
│   └── pyproject.toml      # uv project config
│
├── database/               # Database schemas & migrations
│   ├── mysql/              # MySQL schema
│   ├── mongodb/            # MongoDB collections
│   └── DATABASE.md         # Database strategy
│
├── shared/                 # Shared schemas (Rust ↔ Python)
└── docs/                   # Documentation
    ├── ARCHITECTURE.md     # System architecture
    └── API_SPEC.md         # API specification
```

---

## 🚀 Quick Start

### Prerequisites

- **Rust:** 1.75+ ([Install](https://rustup.rs/))
- **Python:** 3.11+ with [uv](https://github.com/astral-sh/uv)
- **MySQL:** 8.0+
- **MongoDB:** 5.0+
- **Redis:** 7.0+

### 1. Setup Databases

**MySQL:**
```bash
mysql -u root -p
CREATE DATABASE rankedhonor CHARACTER SET utf8mb4;
mysql -u rankedhonor -p rankedhonor < database/mysql/schema.sql
```

**MongoDB:**
```bash
mongosh rankedhonor < database/mongodb/schemas.js
```

**Redis:**
```bash
redis-server
```

### 2. Start Rust Services

```bash
cd rust-core

# Copy environment template
cp .env.example .env
# Edit .env with your database credentials

# Build all services
cargo build

# Run game server (Port 8000)
cargo run --bin game-server

# In another terminal: Run WebSocket server (Port 8001)
cargo run --bin websocket-server
```

### 3. Start Python API

```bash
cd python-api

# Install uv if not already installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e ".[dev]"

# Copy environment template
cp .env.example .env
# Edit .env with your settings

# Run API server (Port 8080)
uv run uvicorn app.main:app --reload --port 8080
```

### 4. Access Services

- **Frontend:** http://localhost:3000 (run from /front directory)
- **Python API:** http://localhost:8080
- **API Docs:** http://localhost:8080/docs
- **Rust Game Server:** http://localhost:8000
- **WebSocket Server:** ws://localhost:8001

---

## 🧪 Testing

### Rust
```bash
cd rust-core

# Run all tests
cargo test --workspace

# Run with coverage
cargo tarpaulin --workspace --out Html

# Lint
cargo clippy --all-targets --all-features

# Format
cargo fmt --all
```

### Python
```bash
cd python-api

# Run tests
uv run pytest

# Run with coverage
uv run pytest --cov=app --cov-report=html

# Type check
uv run mypy app

# Lint
uv run ruff check app

# Format
uv run black app
```

---

## 🏗️ Architecture

### Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Game Server** | Rust + Axum | Match management, statistics |
| **WebSocket** | Rust + Axum | Real-time updates |
| **Matchmaking** | Rust (library) | Player matching algorithm |
| **API** | Python + FastAPI | REST API, integrations |
| **Auth** | Rust + JWT | Authentication & security |
| **Database (SQL)** | MySQL 8.0 | Users, stats, matches |
| **Database (NoSQL)** | MongoDB 5.0 | Logs, analytics, streams |
| **Cache** | Redis 7.0 | Sessions, leaderboards |

### Service Communication

```
Frontend (Next.js)
    ↓ HTTP/REST
Python API (FastAPI) ← → Redis (Cache)
    ↓ HTTP          ↓
Rust Services    MySQL + MongoDB
    ↓ WebSocket
Frontend (Real-time)
```

**See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.**

---

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture and design decisions
- **[API_SPEC.md](docs/API_SPEC.md)** - Complete API reference
- **[DATABASE.md](database/DATABASE.md)** - Database strategy (MySQL vs MongoDB)
- **[Rust README](rust-core/README.md)** - Rust services documentation
- **[Python README](python-api/README.md)** - Python API documentation

---

## 🔐 Security

- **Authentication:** JWT (access + refresh tokens)
- **Password Hashing:** Argon2 (Rust) / bcrypt (Python)
- **Rate Limiting:** Redis-based sliding window
- **CORS:** Configured for frontend origins
- **SQL Injection:** Prevented via SQLAlchemy/SQLx
- **Input Validation:** Pydantic (Python) / Validator (Rust)

---

## 🚢 Deployment

### Development
```bash
# All services run on localhost with default ports
# See Quick Start section
```

### Production (Future)
```bash
# Docker Compose
docker-compose up -d

# Or Kubernetes
kubectl apply -f k8s/
```

**Deployment targets:**
- Frontend: Vercel
- Backend: AWS ECS / Google Cloud Run
- Databases: RDS (MySQL), Atlas (MongoDB), ElastiCache (Redis)

---

## 📊 Performance

**Target Metrics:**
- API Response Time: <200ms (p95)
- Matchmaking: <60s average wait time
- WebSocket Latency: <50ms
- Concurrent Users: 10,000+

**Optimization:**
- Rust for CPU-intensive tasks (10x faster than Python)
- Redis cache for leaderboards (5-minute TTL)
- Database indexes on frequently queried columns
- Connection pooling for databases

---

## 🔧 Development Tools

**Rust:**
- `cargo build` - Build project
- `cargo run` - Run binary
- `cargo test` - Run tests
- `cargo clippy` - Lint
- `cargo fmt` - Format

**Python:**
- `uv run uvicorn app.main:app --reload` - Dev server
- `uv run pytest` - Run tests
- `uv run black app` - Format
- `uv run mypy app` - Type check

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Commit Convention:** [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📝 Environment Variables

### Rust Services (.env)
```env
DATABASE_URL=mysql://user:pass@localhost:3306/rankedhonor
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-secret-here
```

### Python API (.env)
```env
SECRET_KEY=your-secret-here
MYSQL_HOST=localhost
MYSQL_USER=rankedhonor
MYSQL_PASSWORD=your-password
MONGODB_HOST=localhost
REDIS_HOST=localhost
RUST_GAME_SERVER_URL=http://localhost:8000
```

**See `.env.example` files in each directory for complete reference.**

---

## 🗺️ Roadmap

### ✅ Phase 1 - Foundation (Current)
- [x] Project structure
- [x] Rust workspace setup
- [x] Python API with uv
- [x] Database schemas (MySQL + MongoDB)
- [x] Authentication library (Rust)
- [x] Documentation

### 🚧 Phase 2 - Core Features (In Progress)
- [ ] User registration/login endpoints
- [ ] Match creation and results
- [ ] Matchmaking algorithm implementation
- [ ] WebSocket real-time updates
- [ ] Leaderboards with Redis cache

### 🔮 Phase 3 - Advanced Features
- [ ] Teams/guilds system
- [ ] Achievements system
- [ ] Twitch/YouTube integration
- [ ] Discord bot
- [ ] Analytics dashboard

### 🎯 Phase 4 - Production Ready
- [ ] Docker containers
- [ ] CI/CD pipelines
- [ ] Monitoring & logging
- [ ] Load testing
- [ ] Production deployment

---

## 📈 Monitoring

**Planned:**
- Prometheus + Grafana for metrics
- ELK Stack for logs
- Sentry for error tracking
- APM (Application Performance Monitoring)

---

## 🐛 Troubleshooting

**Issue: Rust services won't start**
```bash
# Check database connection
mysql -u rankedhonor -p rankedhonor -e "SELECT 1"

# Verify .env file exists
ls rust-core/.env

# Check logs
cargo run --bin game-server
```

**Issue: Python API import errors**
```bash
# Reinstall dependencies
uv pip install -e ".[dev]"

# Verify Python version
python --version  # Should be 3.11+
```

**Issue: Database connection failed**
```bash
# Start MySQL
sudo systemctl start mysql

# Start MongoDB
sudo systemctl start mongod

# Start Redis
redis-server
```

---

## 📄 License

MIT License - See [LICENSE](../LICENSE) for details

---

## 👥 Team

- **crozzo** - Lead Developer

---

## 🔗 Links

- **Frontend:** [../front/README.md](../front/README.md)
- **GitHub:** [github.com/crozzo/RankedHonor](https://github.com/crozzo/RankedHonor)
- **Documentation:** [docs/](docs/)

---

**Questions?** Open an issue or check the [documentation](docs/).

**Last Updated:** January 15, 2026
