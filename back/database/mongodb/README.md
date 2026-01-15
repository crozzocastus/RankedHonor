# MongoDB Collections Schema

## Overview

MongoDB stores **high-write, semi-structured, and analytical data**:
- Live activity feed
- Match detailed logs & timeline
- Streaming data (live streams, clips)
- Matchmaking queue state
- Notifications
- Analytics & metrics
- Activity logs

## Collections

### Live Events
- `live_feed_events` - Real-time activity feed (TTL 7 days)

### Match Data
- `match_detailed_logs` - Detailed match timeline & events

### Streaming
- `live_streams` - Currently live streams (cache from Twitch/YouTube)
- `stream_clips` - Highlight clips with tags

### Matchmaking
- `matchmaking_queue` - Active queue entries (TTL 10 minutes)

### Notifications
- `notifications` - User notifications (TTL 7 days)

### Analytics
- `hero_pick_rates` - Daily hero statistics by mode/region
- `daily_metrics` - Platform-wide daily metrics

### Logs
- `user_activity_logs` - User actions (TTL 90 days)

## Setup

```bash
# Start MongoDB
mongod --dbpath /path/to/data

# Connect to MongoDB
mongosh

# Use database
use rankedhonor

# Create collections with schemas
mongosh < schemas.js

# Or using Motor (Python)
cd ../../python-api
uv run python scripts/init_mongodb.py
```

## Indexes

Optimized for:
- Time-series queries (timestamps descending)
- User-specific lookups
- Live data filtering (is_live, region, etc.)
- TTL for automatic cleanup

## TTL (Time-To-Live) Collections

Auto-cleanup for temporary data:
- `live_feed_events`: 7 days
- `matchmaking_queue`: 10 minutes
- `notifications`: 7 days (or when read)
- `user_activity_logs`: 90 days

## Performance

- Single field and compound indexes
- Projection to reduce data transfer
- Aggregation pipeline for analytics
- Capped collections for high-write scenarios (optional)
