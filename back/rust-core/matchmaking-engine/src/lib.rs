use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Player in matchmaking queue
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QueuePlayer {
    pub user_id: Uuid,
    pub mmr: i32,
    pub region: String,
    pub mode: GameMode,
    pub joined_at: DateTime<Utc>,
}

/// Game modes for matchmaking
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum GameMode {
    Duelo,      // 1v1
    Briga,      // 2v2
    Dominio,    // 4v4
    Invasao,    // 4v4
    Tributo,    // 4v4
    MataMata,   // 4v4
}

impl GameMode {
    pub fn team_size(&self) -> usize {
        match self {
            GameMode::Duelo => 1,
            GameMode::Briga => 2,
            GameMode::Dominio | GameMode::Invasao | GameMode::Tributo | GameMode::MataMata => 4,
        }
    }
}

/// Matchmaking engine
pub struct MatchmakingEngine {
    mmr_tolerance: i32,
}

impl MatchmakingEngine {
    pub fn new(mmr_tolerance: i32) -> Self {
        Self { mmr_tolerance }
    }

    /// Find a match for a player in the queue
    pub fn find_match(&self, player: &QueuePlayer, queue: &[QueuePlayer]) -> Option<Vec<QueuePlayer>> {
        let team_size = player.mode.team_size();
        let total_players = team_size * 2;

        let mut eligible_players: Vec<&QueuePlayer> = queue
            .iter()
            .filter(|p| {
                p.mode == player.mode
                    && p.region == player.region
                    && (p.mmr - player.mmr).abs() <= self.mmr_tolerance
            })
            .collect();

        if eligible_players.len() + 1 < total_players {
            return None;
        }

        eligible_players.insert(0, player);
        Some(eligible_players.into_iter().take(total_players).cloned().collect())
    }

    /// Calculate average wait time for a mode/region
    pub fn calculate_average_wait_time(&self, queue: &[QueuePlayer], mode: GameMode, region: &str) -> i64 {
        let now = Utc::now();
        let wait_times: Vec<i64> = queue
            .iter()
            .filter(|p| p.mode == mode && p.region == region)
            .map(|p| (now - p.joined_at).num_seconds())
            .collect();

        if wait_times.is_empty() {
            return 0;
        }

        wait_times.iter().sum::<i64>() / wait_times.len() as i64
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_game_mode_team_size() {
        assert_eq!(GameMode::Duelo.team_size(), 1);
        assert_eq!(GameMode::Briga.team_size(), 2);
        assert_eq!(GameMode::Dominio.team_size(), 4);
    }

    #[test]
    fn test_matchmaking() {
        let engine = MatchmakingEngine::new(200);
        let player = QueuePlayer {
            user_id: Uuid::new_v4(),
            mmr: 1500,
            region: "EU".to_string(),
            mode: GameMode::Duelo,
            joined_at: Utc::now(),
        };

        let queue = vec![
            QueuePlayer {
                user_id: Uuid::new_v4(),
                mmr: 1550,
                region: "EU".to_string(),
                mode: GameMode::Duelo,
                joined_at: Utc::now(),
            }
        ];

        let matched = engine.find_match(&player, &queue);
        assert!(matched.is_some());
        assert_eq!(matched.unwrap().len(), 2);
    }
}
