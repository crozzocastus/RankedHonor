# API Specification - RankedHonor Backend

**Base URL:** `http://localhost:8080/api/v1` (development)  
**Production URL:** `https://api.rankedhonor.com/api/v1` (future)  
**Version:** 1.0.0

---

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Matches](#matches)
- [Rankings](#rankings)
- [Matchmaking](#matchmaking)
- [Streams](#streams)
- [Teams](#teams)
- [Achievements](#achievements)
- [Error Responses](#error-responses)

---

## Authentication

All authenticated endpoints require `Authorization: Bearer {access_token}` header.

### POST /auth/register

Register a new user.

**Request Body:**
```json
{
  "email": "player@example.com",
  "password": "SecurePassword123",
  "nickname": "WarLegend",
  "faction": "Knights"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid-here",
  "email": "player@example.com",
  "nickname": "WarLegend",
  "faction": "Knights",
  "region": "Global",
  "created_at": "2026-01-15T10:00:00Z"
}
```

**Errors:**
- `400` - Validation error (weak password, invalid email)
- `409` - Email or nickname already exists

---

### POST /auth/login

Login user and receive JWT tokens.

**Request Body:**
```json
{
  "username": "player@example.com",
  "password": "SecurePassword123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errors:**
- `401` - Invalid credentials

---

### POST /auth/refresh

Refresh access token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "access_token": "new-access-token",
  "refresh_token": "new-refresh-token",
  "token_type": "bearer"
}
```

---

### GET /auth/me

Get current authenticated user.

**Headers:**  
`Authorization: Bearer {access_token}`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "player@example.com",
  "nickname": "WarLegend",
  "region": "EU",
  "faction": "Knights",
  "avatar": "warden",
  "profile_visibility": "public",
  "stats": {
    "rank": "Diamante II",
    "mmr": 3845,
    "matches_played": 247,
    "wins": 145,
    "losses": 102,
    "win_rate": 58.7
  }
}
```

---

## Users

### GET /users/{user_id}

Get user profile by ID.

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "nickname": "WarLegend",
  "region": "EU",
  "faction": "Knights",
  "avatar": "warden",
  "stats": {
    "rank": "Diamante II",
    "mmr": 3845,
    "duelo_rank": "Diamante I",
    "briga_rank": "Diamante III",
    "matches_played": 247,
    "wins": 145,
    "losses": 102
  }
}
```

**Errors:**
- `404` - User not found
- `403` - Profile is private

---

### PUT /users/{user_id}

Update user profile (authenticated).

**Request Body:**
```json
{
  "faction": "Vikings",
  "avatar": "raider",
  "profile_visibility": "private"
}
```

**Response:** `200 OK`

---

### GET /users/{user_id}/matches

Get user match history.

**Query Params:**
- `mode` (optional): Filter by game mode
- `limit` (default: 50, max: 100)
- `offset` (default: 0)

**Response:** `200 OK`
```json
{
  "total": 247,
  "matches": [
    {
      "id": "match-uuid",
      "mode": "duelo",
      "result": "win",
      "hero": "warden",
      "opponent": "ShadowBlade",
      "kills": 3,
      "deaths": 2,
      "duration": 420,
      "mmr_change": +25,
      "created_at": "2026-01-15T10:00:00Z"
    }
  ]
}
```

---

## Matches

### POST /matches

Create a new match (from launcher).

**Request Body:**
```json
{
  "mode": "duelo",
  "region": "EU",
  "players": [
    {"user_id": "uuid-1", "hero": "warden"},
    {"user_id": "uuid-2", "hero": "orochi"}
  ]
}
```

**Response:** `201 Created`
```json
{
  "match_id": "uuid",
  "status": "pending",
  "started_at": "2026-01-15T10:00:00Z"
}
```

---

### PUT /matches/{match_id}/result

Submit match result.

**Request Body:**
```json
{
  "winner_team": 1,
  "participants": [
    {
      "user_id": "uuid-1",
      "kills": 3,
      "deaths": 2,
      "score": 1200
    },
    {
      "user_id": "uuid-2",
      "kills": 2,
      "deaths": 3,
      "score": 800
    }
  ],
  "duration": 420
}
```

**Response:** `200 OK`
```json
{
  "match_id": "uuid",
  "status": "completed",
  "mmr_changes": {
    "uuid-1": +25,
    "uuid-2": -20
  }
}
```

---

### GET /matches/{match_id}

Get match details.

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "mode": "duelo",
  "region": "EU",
  "status": "completed",
  "duration": 420,
  "started_at": "2026-01-15T10:00:00Z",
  "ended_at": "2026-01-15T10:07:00Z",
  "participants": [
    {
      "user": {
        "id": "uuid-1",
        "nickname": "WarLegend",
        "avatar": "warden"
      },
      "hero": "warden",
      "result": "win",
      "kills": 3,
      "deaths": 2,
      "score": 1200,
      "mmr_change": +25
    }
  ]
}
```

---

## Rankings

### GET /rankings/global

Get global leaderboard.

**Query Params:**
- `mode` (optional): `geral|duelo|briga|dominio|invasao|tributo|mata_mata`
- `region` (optional): `Global|EU|NA|SA|ASIA`
- `limit` (default: 50, max: 100)
- `offset` (default: 0)

**Response:** `200 OK`
```json
{
  "mode": "geral",
  "region": "Global",
  "total": 10000,
  "updated_at": "2026-01-15T10:00:00Z",
  "rankings": [
    {
      "position": 1,
      "user": {
        "id": "uuid",
        "nickname": "WarLegend",
        "region": "EU",
        "faction": "Knights",
        "avatar": "warden"
      },
      "rank": "Grão-Mestre",
      "mmr": 4521,
      "wins": 234,
      "losses": 87,
      "win_rate": 72.9
    }
  ]
}
```

---

### GET /rankings/user/{user_id}

Get user ranking position.

**Query Params:**
- `mode` (optional): Specific mode or overall

**Response:** `200 OK`
```json
{
  "user_id": "uuid",
  "mode": "geral",
  "position": 123,
  "rank": "Diamante II",
  "mmr": 3845,
  "percentile": 89.5
}
```

---

## Matchmaking

### POST /matchmaking/queue

Join matchmaking queue.

**Request Body:**
```json
{
  "mode": "duelo",
  "region": "EU"
}
```

**Response:** `200 OK`
```json
{
  "queue_id": "uuid",
  "position": 5,
  "estimated_wait": 45
}
```

---

### DELETE /matchmaking/queue/{queue_id}

Leave matchmaking queue.

**Response:** `204 No Content`

---

### GET /matchmaking/status

Get current queue status.

**Response:** `200 OK`
```json
{
  "in_queue": true,
  "queue_id": "uuid",
  "mode": "duelo",
  "position": 3,
  "wait_time": 32,
  "estimated_wait": 45
}
```

---

## Streams

### GET /streams/live

Get currently live streams.

**Query Params:**
- `platform` (optional): `twitch|youtube`
- `limit` (default: 20)

**Response:** `200 OK`
```json
{
  "total": 15,
  "streams": [
    {
      "id": "stream-uuid",
      "creator": {
        "id": "user-uuid",
        "nickname": "KnightSlayer"
      },
      "platform": "twitch",
      "title": "Ranked grind to Grandmaster",
      "viewers": 1234,
      "thumbnail": "https://...",
      "current_mode": "duelo",
      "started_at": "2026-01-15T08:00:00Z"
    }
  ]
}
```

---

### POST /streams/register

Register as content creator.

**Request Body:**
```json
{
  "platform": "twitch",
  "channel_id": "knightslayer",
  "verification_code": "abc123"
}
```

**Response:** `200 OK`

---

## Teams

### POST /teams

Create a team.

**Request Body:**
```json
{
  "name": "Valhalla Warriors",
  "tag": "VW",
  "region": "EU"
}
```

**Response:** `201 Created`

---

### GET /teams/{team_id}

Get team details.

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Valhalla Warriors",
  "tag": "VW",
  "region": "EU",
  "points": 12450,
  "members": [
    {
      "user": {
        "id": "uuid",
        "nickname": "WarLegend",
        "rank": "Diamante II"
      },
      "role": "leader",
      "joined_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

## Achievements

### GET /achievements

Get all achievements.

**Response:** `200 OK`
```json
{
  "achievements": [
    {
      "id": "uuid",
      "name": "First Blood",
      "description": "Win your first match",
      "icon": "trophy",
      "category": "matches"
    }
  ]
}
```

---

### GET /users/{user_id}/achievements

Get user achievements.

**Response:** `200 OK`
```json
{
  "total": 45,
  "unlocked": 12,
  "achievements": [
    {
      "id": "uuid",
      "name": "First Blood",
      "progress": 100,
      "unlocked_at": "2026-01-10T15:30:00Z"
    }
  ]
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | `VALIDATION_ERROR` | Invalid request data |
| 401 | `UNAUTHORIZED` | Missing or invalid token |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource already exists |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

---

## Rate Limiting

**Default Limits:**
- Anonymous: 100 requests/minute
- Authenticated: 1000 requests/minute
- Matchmaking: 10 queue joins/minute

**Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 985
X-RateLimit-Reset: 1642243200
```

---

## WebSocket API

### Connection

`ws://localhost:8001/ws?token={access_token}`

### Events

**Subscribe to channel:**
```json
{
  "type": "subscribe",
  "channel": "rankings",
  "data": { "mode": "duelo" }
}
```

**Receive updates:**
```json
{
  "type": "ranking_update",
  "data": {
    "user_id": "uuid",
    "old_rank": "Diamante II",
    "new_rank": "Diamante I",
    "mmr": 3901
  }
}
```

---

## Pagination

List endpoints support pagination:

**Request:**
```
GET /api/v1/rankings/global?limit=50&offset=100
```

**Response:**
```json
{
  "total": 10000,
  "limit": 50,
  "offset": 100,
  "data": [...]
}
```

---

**API Documentation:**  
Interactive docs available at `/docs` (Swagger UI) and `/redoc` (ReDoc) when running the server.
