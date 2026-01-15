use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

/// User model (MySQL)
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub password_hash: String,
    pub nickname: String,
    pub region: String,
    pub faction: Faction,
    pub avatar: String,
    pub profile_visibility: ProfileVisibility,
    pub email_verified: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// User registration request
#[derive(Debug, Deserialize, Validate)]
pub struct RegisterRequest {
    #[validate(email)]
    pub email: String,
    
    #[validate(length(min = 8))]
    pub password: String,
    
    #[validate(length(min = 3, max = 20))]
    pub nickname: String,
    
    pub faction: Faction,
}

/// User login request
#[derive(Debug, Deserialize, Validate)]
pub struct LoginRequest {
    #[validate(email)]
    pub email: String,
    
    pub password: String,
}

/// User stats model (MySQL)
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct UserStats {
    pub user_id: Uuid,
    pub rank: String,
    pub mmr: i32,
    pub duelo_rank: String,
    pub duelo_mmr: i32,
    pub briga_rank: String,
    pub briga_mmr: i32,
    pub dominio_rank: String,
    pub dominio_mmr: i32,
    pub invasao_rank: String,
    pub invasao_mmr: i32,
    pub tributo_rank: String,
    pub tributo_mmr: i32,
    pub mata_mata_rank: String,
    pub mata_mata_mmr: i32,
    pub matches_played: i32,
    pub wins: i32,
    pub losses: i32,
    pub kills: i32,
    pub deaths: i32,
}

/// Faction enum
#[derive(Debug, Clone, Copy, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "VARCHAR(20)", rename_all = "lowercase")]
#[serde(rename_all = "PascalCase")]
pub enum Faction {
    Knights,
    Vikings,
    Samurai,
    WuLin,
    Outlanders,
}

/// Profile visibility
#[derive(Debug, Clone, Copy, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "VARCHAR(10)", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum ProfileVisibility {
    Public,
    Private,
}

/// Match model (MySQL)
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Match {
    pub id: Uuid,
    pub mode: GameMode,
    pub region: String,
    pub duration: i32, // seconds
    pub started_at: DateTime<Utc>,
    pub ended_at: Option<DateTime<Utc>>,
    pub status: MatchStatus,
}

/// Game mode enum
#[derive(Debug, Clone, Copy, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "VARCHAR(20)", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum GameMode {
    Duelo,
    Briga,
    Dominio,
    Invasao,
    Tributo,
    MataMata,
}

/// Match status
#[derive(Debug, Clone, Copy, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "VARCHAR(20)", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum MatchStatus {
    Pending,
    InProgress,
    Completed,
    Cancelled,
}

/// Match participant (MySQL)
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct MatchParticipant {
    pub match_id: Uuid,
    pub user_id: Uuid,
    pub hero: String,
    pub result: MatchResult,
    pub kills: i32,
    pub deaths: i32,
    pub score: i32,
    pub team_id: Option<i32>,
}

/// Match result
#[derive(Debug, Clone, Copy, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "VARCHAR(10)", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum MatchResult {
    Win,
    Loss,
    Draw,
}

pub mod user;
pub mod stats;
pub mod matches;
