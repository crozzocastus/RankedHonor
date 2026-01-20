
# Rust Core - RankedHonor Backend

> **Nota:** Este README segue o [template padronizado](../../docs/guias/README_TEMPLATE.md). Mantenha sempre os tópicos obrigatórios atualizados!

High-performance game server, matchmaking engine, and WebSocket server written in Rust.

## 📦 Workspace Structure

```
rust-core/
├── auth-rs/              # Authentication & JWT library
├── game-server/          # Main game server (HTTP API)
├── matchmaking-engine/   # Matchmaking algorithm
├── websocket-server/     # Real-time WebSocket server
└── shared-models/        # Shared data models
```

## 🚀 Quick Start

### Prerequisites

- Rust 1.75+ (`rustup install stable`)
- MySQL 8.0+
- Redis 7.0+

### Development

```bash
# Install dependencies
cargo build

# Run game server (port 8000)
cargo run --bin game-server

# Run WebSocket server (port 8001)
cargo run --bin websocket-server

# Run all tests
cargo test --workspace

# Run tests with coverage
cargo tarpaulin --workspace --out Html

# Format code
cargo fmt --all

# Lint
cargo clippy --all-targets --all-features -- -D warnings
```

## 🔧 Environment Variables

Create `.env` in `rust-core/` directory:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/rankedhonor
REDIS_URL=redis://localhost:6379

# JWT Secrets
JWT_ACCESS_SECRET=your-super-secret-access-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production

# Server
GAME_SERVER_PORT=8000
WEBSOCKET_SERVER_PORT=8001
RUST_LOG=info
```

## 📚 Crates

### auth-rs
Authentication library providing:
- Password hashing (Argon2)
- JWT generation/validation
- Token refresh logic

### game-server
HTTP API server handling:
- Match creation/results
- User statistics
- Game data queries

### matchmaking-engine
Intelligent matchmaking:
- MMR-based player matching
- Queue management
- Region-based matching
- Mode-specific queues

### websocket-server
Real-time communication:
- Live match updates
- Matchmaking queue events
- Ranking updates
- Notifications

### shared-models
Common data structures:
- User models
- Match models
- Stats models
- Database mapping (SQLx)

## 🧪 Testing

```bash
# Unit tests
cargo test

# Integration tests
cargo test --test '*'

# Specific crate
cargo test -p auth-rs
```

## 📊 Performance

- **Game Server**: Handles 10k+ concurrent connections
- **Matchmaking**: Sub-second match finding
- **WebSocket**: Real-time updates <50ms latency

## 🔗 Integration with Python API

Rust services expose HTTP/gRPC APIs consumed by Python:
- Python calls Rust for performance-critical operations
- Shared database (MySQL + Redis)
- Consistent data models via JSON schemas

## 📖 Documentation

```bash
# Generate and open documentation
cargo doc --open --workspace --no-deps
```

## 🚢 Deployment

```bash
# Build optimized release binaries
cargo build --release

# Binaries will be in target/release/
# - game-server
# - websocket-server
```

## 📝 License

MIT
