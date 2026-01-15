// MongoDB Collections Schema Documentation
// Collections for semi-structured and high-write data

// ============================================================================
// LIVE EVENTS & ACTIVITY FEED
// ============================================================================

db.createCollection("live_feed_events", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["type", "timestamp", "user_id", "region"],
      properties: {
        type: {
          enum: ["rank_up", "match_end", "achievement", "team_victory", "kill_streak"]
        },
        timestamp: { bsonType: "date" },
        user_id: { bsonType: "string" },
        region: { bsonType: "string" },
        data: { bsonType: "object" },
        ttl: { bsonType: "date" } // Auto-delete after 7 days
      }
    }
  }
});

db.live_feed_events.createIndex({ "timestamp": -1 });
db.live_feed_events.createIndex({ "region": 1, "timestamp": -1 });
db.live_feed_events.createIndex({ "type": 1, "timestamp": -1 });
db.live_feed_events.createIndex({ "ttl": 1 }, { expireAfterSeconds: 0 });

// Example document
/*
{
  "_id": ObjectId("..."),
  "type": "rank_up",
  "timestamp": ISODate("2026-01-15T10:00:00Z"),
  "user_id": "uuid-here",
  "region": "EU",
  "data": {
    "nickname": "WarLegend",
    "from_rank": "Diamante II",
    "to_rank": "Diamante I",
    "mode": "duelo"
  },
  "ttl": ISODate("2026-01-22T10:00:00Z")
}
*/

// ============================================================================
// MATCH DETAILED LOGS
// ============================================================================

db.createCollection("match_detailed_logs");

db.match_detailed_logs.createIndex({ "match_id": 1 });
db.match_detailed_logs.createIndex({ "created_at": -1 });

// Example document
/*
{
  "_id": ObjectId("..."),
  "match_id": "uuid-here",
  "timeline": [
    {
      "timestamp": 45,
      "event": "kill",
      "killer_id": "user-uuid",
      "victim_id": "user-uuid",
      "killer_hero": "warden",
      "victim_hero": "orochi",
      "position": { "x": 123.5, "y": 456.7 }
    },
    {
      "timestamp": 67,
      "event": "objective_captured",
      "team": 1,
      "point": "A",
      "players": ["user-uuid-1", "user-uuid-2"]
    }
  ],
  "chat_log": [
    { "timestamp": 30, "user_id": "uuid", "message": "Good fight!" }
  ],
  "created_at": ISODate("2026-01-15T10:30:00Z")
}
*/

// ============================================================================
// LIVE STREAMS
// ============================================================================

db.createCollection("live_streams");

db.live_streams.createIndex({ "user_id": 1 });
db.live_streams.createIndex({ "platform": 1, "is_live": 1 });
db.live_streams.createIndex({ "is_live": 1, "viewers": -1 });
db.live_streams.createIndex({ "last_updated": -1 });

// Example document
/*
{
  "_id": ObjectId("..."),
  "user_id": "uuid-here",
  "platform": "twitch",
  "channel_id": "knightslayer",
  "channel_name": "KnightSlayer",
  "is_live": true,
  "viewers": 1234,
  "current_mode": "duelo",
  "thumbnail_url": "https://...",
  "title": "Ranked grind to Grandmaster",
  "started_at": ISODate("2026-01-15T08:00:00Z"),
  "last_updated": ISODate("2026-01-15T10:00:00Z")
}
*/

// ============================================================================
// STREAM CLIPS
// ============================================================================

db.createCollection("stream_clips");

db.stream_clips.createIndex({ "user_id": 1 });
db.stream_clips.createIndex({ "views": -1 });
db.stream_clips.createIndex({ "tags": 1 });
db.stream_clips.createIndex({ "created_at": -1 });

// Example document
/*
{
  "_id": ObjectId("..."),
  "user_id": "uuid-here",
  "title": "Clutch 1v3 impossível com Warden",
  "hero": "warden",
  "views": 15234,
  "thumbnail": "https://...",
  "url": "https://youtube.com/watch?v=...",
  "platform": "youtube",
  "tags": ["clutch", "warden", "1v3", "duelo"],
  "duration": 45,
  "created_at": ISODate("2026-01-14T15:30:00Z")
}
*/

// ============================================================================
// MATCHMAKING QUEUE
// ============================================================================

db.createCollection("matchmaking_queue");

db.matchmaking_queue.createIndex({ "user_id": 1 }, { unique: true });
db.matchmaking_queue.createIndex({ "mode": 1, "region": 1, "mmr": 1 });
db.matchmaking_queue.createIndex({ "joined_at": 1 });
db.matchmaking_queue.createIndex({ "joined_at": 1 }, { expireAfterSeconds: 600 }); // Auto-remove after 10 min

// Example document
/*
{
  "_id": ObjectId("..."),
  "user_id": "uuid-here",
  "mode": "duelo",
  "region": "EU",
  "mmr": 3845,
  "preferences": {
    "heroes": ["warden", "lawbringer"],
    "avoid_users": []
  },
  "joined_at": ISODate("2026-01-15T10:00:00Z"),
  "estimated_wait": 45
}
*/

// ============================================================================
// NOTIFICATIONS
// ============================================================================

db.createCollection("notifications");

db.notifications.createIndex({ "user_id": 1, "read": 1 });
db.notifications.createIndex({ "created_at": -1 });
db.notifications.createIndex({ "expires_at": 1 }, { expireAfterSeconds: 0 });

// Example document
/*
{
  "_id": ObjectId("..."),
  "user_id": "uuid-here",
  "type": "match_found",
  "data": {
    "match_id": "match-uuid",
    "mode": "duelo",
    "opponent": "WarLegend"
  },
  "read": false,
  "created_at": ISODate("2026-01-15T10:00:00Z"),
  "expires_at": ISODate("2026-01-22T10:00:00Z")
}
*/

// ============================================================================
// ANALYTICS - HERO PICK RATES
// ============================================================================

db.createCollection("hero_pick_rates");

db.hero_pick_rates.createIndex({ "date": -1 });
db.hero_pick_rates.createIndex({ "mode": 1, "region": 1, "date": -1 });

// Example document
/*
{
  "_id": ObjectId("..."),
  "date": ISODate("2026-01-15T00:00:00Z"),
  "mode": "duelo",
  "region": "EU",
  "hero_stats": {
    "warden": { "picks": 1234, "wins": 678, "losses": 556 },
    "orochi": { "picks": 987, "wins": 501, "losses": 486 },
    "raider": { "picks": 856, "wins": 445, "losses": 411 }
  }
}
*/

// ============================================================================
// ANALYTICS - DAILY METRICS
// ============================================================================

db.createCollection("daily_metrics");

db.daily_metrics.createIndex({ "date": -1 }, { unique: true });

// Example document
/*
{
  "_id": ObjectId("..."),
  "date": ISODate("2026-01-15T00:00:00Z"),
  "total_matches": 15234,
  "unique_players": 8921,
  "new_users": 234,
  "avg_queue_time": 45,
  "peak_concurrent": 5678,
  "mode_distribution": {
    "duelo": 3456,
    "briga": 2345,
    "dominio": 6789,
    "invasao": 1234,
    "tributo": 890,
    "mata_mata": 520
  }
}
*/

// ============================================================================
// USER ACTIVITY LOGS
// ============================================================================

db.createCollection("user_activity_logs");

db.user_activity_logs.createIndex({ "user_id": 1, "timestamp": -1 });
db.user_activity_logs.createIndex({ "action": 1 });
db.user_activity_logs.createIndex({ "timestamp": -1 });
db.user_activity_logs.createIndex({ "timestamp": 1 }, { expireAfterSeconds: 7776000 }); // 90 days

// Example document
/*
{
  "_id": ObjectId("..."),
  "user_id": "uuid-here",
  "action": "login",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "metadata": {
    "location": "São Paulo, BR",
    "device": "desktop"
  },
  "timestamp": ISODate("2026-01-15T10:00:00Z")
}
*/
