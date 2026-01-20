
# Python API - RankedHonor Backend

> **Nota:** Este README segue o [template padronizado](../../docs/guias/README_TEMPLATE.md). Mantenha sempre os tópicos obrigatórios atualizados!

FastAPI-based REST API for RankedHonor platform. Handles user management, integrations, and proxies requests to Rust services.

## 🚀 Quick Start

### Prerequisites

- Python 3.11+ 
- [uv](https://github.com/astral-sh/uv) - Fast Python package installer
- MySQL 8.0+
- MongoDB 5.0+
- Redis 7.0+

### Installation with uv

```bash
# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .

# Install dev dependencies
uv pip install -e ".[dev]"
```

### Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env
```

### Run Development Server

```bash
# Using uvicorn directly
uv run uvicorn app.main:app --reload --port 8080

# Or using Python
uv run python -m app.main
```

API will be available at:
- **API**: http://localhost:8080
- **Docs**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc

## 📁 Project Structure

```
python-api/
├── app/
│   ├── main.py              # FastAPI application
│   ├── core/                # Core functionality
│   │   ├── config.py        # Settings & configuration
│   │   ├── database.py      # MySQL connection
│   │   ├── mongodb.py       # MongoDB connection
│   │   ├── redis.py         # Redis connection
│   │   └── security.py      # Auth & JWT
│   ├── api/
│   │   └── v1/
│   │       ├── __init__.py  # API router
│   │       └── endpoints/   # API endpoints
│   │           ├── auth.py
│   │           ├── users.py
│   │           ├── matches.py
│   │           ├── rankings.py
│   │           └── streams.py
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   └── services/            # Business logic
├── tests/                   # Test suite
├── alembic/                 # Database migrations
├── pyproject.toml           # Project config & dependencies
└── .env.example             # Environment template
```

## 🧪 Testing

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=app --cov-report=html

# Run specific test file
uv run pytest tests/test_main.py

# Run with verbose output
uv run pytest -v
```

## 🔧 Code Quality

```bash
# Format code with Black
uv run black app tests

# Lint with Ruff
uv run ruff check app tests

# Type check with mypy
uv run mypy app

# Run all checks
uv run black app tests && uv run ruff check app tests && uv run mypy app
```

## 📊 Database Migrations

```bash
# Create migration
uv run alembic revision --autogenerate -m "Description"

# Apply migrations
uv run alembic upgrade head

# Rollback migration
uv run alembic downgrade -1

# Show migration history
uv run alembic history
```

## 🔗 Integration with Rust Services

Python API acts as a proxy and orchestrator:

```python
# Example: Calling Rust matchmaking service
import httpx

async def find_match(user_id: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{settings.RUST_GAME_SERVER_URL}/matchmaking/queue",
            json={"user_id": user_id}
        )
        return response.json()
```

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/{user_id}` - Get user profile
- `PUT /api/v1/users/{user_id}` - Update user profile

### Matches
- `GET /api/v1/matches` - Get match history
- `GET /api/v1/matches/{match_id}` - Get match details
- `POST /api/v1/matches` - Create match

### Rankings
- `GET /api/v1/rankings/global` - Get global rankings
- `GET /api/v1/rankings/user/{user_id}` - Get user ranking

### Streams
- `GET /api/v1/streams/live` - Get live streams
- `GET /api/v1/streams/creator/{creator_id}` - Get creator stream

## 🚢 Deployment

```bash
# Build for production
uv pip install --no-dev

# Run with production settings
ENVIRONMENT=production uv run uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 4
```

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- CORS configured for allowed origins
- SQL injection prevention (SQLAlchemy)
- Input validation (Pydantic)

## 📖 Documentation

API documentation automatically generated at `/docs` (Swagger UI) and `/redoc` (ReDoc).

## 📝 License

MIT
