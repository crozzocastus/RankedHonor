# MySQL Database Schema

## Overview

MySQL stores all **relational, transactional, and critical data** for RankedHonor:
- User accounts & authentication
- User statistics & rankings
- Match results
- Teams/guilds
- Achievements
- Third-party integrations

## Tables

### Users & Authentication
- `users` - User accounts
- `password_resets` - Password reset tokens
- `email_verifications` - Email verification tokens

### Stats & Rankings
- `user_stats` - User statistics (overall + per game mode)
- `ranking_history` - Historical rank changes

### Matches
- `matches` - Match metadata
- `match_participants` - Players in matches with their stats

### Teams
- `teams` - Team/guild information
- `team_members` - Team membership
- `team_invitations` - Pending team invites

### Achievements
- `achievements` - Available achievements
- `user_achievements` - User progress on achievements

### Integrations
- `creator_integrations` - Twitch/YouTube/Discord connections

## Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE rankedhonor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'rankedhonor'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON rankedhonor.* TO 'rankedhonor'@'localhost';
FLUSH PRIVILEGES;

# Import schema
mysql -u rankedhonor -p rankedhonor < schema.sql

# Or use migrations with SQLx (Rust)
cd ../../rust-core
sqlx migrate run

# Or use Alembic (Python)
cd ../../python-api
uv run alembic upgrade head
```

## Indexes

Optimized indexes for common queries:
- User lookups by email/nickname
- Rankings sorted by MMR (descending)
- Match history by user
- Leaderboard queries

## Performance

- Views for leaderboards (materialized for production)
- Proper foreign key constraints
- UTF8MB4 for emoji support
- InnoDB for ACID compliance
