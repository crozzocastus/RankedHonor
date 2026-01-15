-- MySQL Schema for RankedHonor
-- Version: 1.0.0
-- Description: Core relational data (users, matches, stats, teams)

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    region VARCHAR(20) NOT NULL DEFAULT 'Global',
    faction ENUM('Knights', 'Vikings', 'Samurai', 'WuLin', 'Outlanders') NOT NULL,
    avatar VARCHAR(100) NOT NULL DEFAULT 'warden',
    profile_visibility ENUM('public', 'private') NOT NULL DEFAULT 'public',
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_nickname (nickname),
    INDEX idx_faction (faction),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS email_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- USER STATS & RANKINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_stats (
    user_id CHAR(36) PRIMARY KEY,
    
    -- Overall stats
    rank VARCHAR(50) NOT NULL DEFAULT 'Bronze III',
    mmr INT NOT NULL DEFAULT 1000,
    
    -- Mode-specific ranks and MMR
    duelo_rank VARCHAR(50) NOT NULL DEFAULT 'Bronze III',
    duelo_mmr INT NOT NULL DEFAULT 1000,
    briga_rank VARCHAR(50) NOT NULL DEFAULT 'Bronze III',
    briga_mmr INT NOT NULL DEFAULT 1000,
    dominio_rank VARCHAR(50) NOT NULL DEFAULT 'Bronze III',
    dominio_mmr INT NOT NULL DEFAULT 1000,
    invasao_rank VARCHAR(50) NOT NULL DEFAULT 'Bronze III',
    invasao_mmr INT NOT NULL DEFAULT 1000,
    tributo_rank VARCHAR(50) NOT NULL DEFAULT 'Bronze III',
    tributo_mmr INT NOT NULL DEFAULT 1000,
    mata_mata_rank VARCHAR(50) NOT NULL DEFAULT 'Bronze III',
    mata_mata_mmr INT NOT NULL DEFAULT 1000,
    
    -- General statistics
    matches_played INT NOT NULL DEFAULT 0,
    wins INT NOT NULL DEFAULT 0,
    losses INT NOT NULL DEFAULT 0,
    kills INT NOT NULL DEFAULT 0,
    deaths INT NOT NULL DEFAULT 0,
    
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_mmr (mmr DESC),
    INDEX idx_duelo_mmr (duelo_mmr DESC),
    INDEX idx_briga_mmr (briga_mmr DESC),
    INDEX idx_dominio_mmr (dominio_mmr DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ranking_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    mode ENUM('overall', 'duelo', 'briga', 'dominio', 'invasao', 'tributo', 'mata_mata') NOT NULL,
    old_rank VARCHAR(50) NOT NULL,
    new_rank VARCHAR(50) NOT NULL,
    old_mmr INT NOT NULL,
    new_mmr INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_mode (user_id, mode),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- MATCHES
-- ============================================================================

CREATE TABLE IF NOT EXISTS matches (
    id CHAR(36) PRIMARY KEY,
    mode ENUM('duelo', 'briga', 'dominio', 'invasao', 'tributo', 'mata_mata') NOT NULL,
    region VARCHAR(20) NOT NULL,
    duration INT, -- seconds
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_mode (mode),
    INDEX idx_region (region),
    INDEX idx_status (status),
    INDEX idx_started_at (started_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS match_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    match_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    hero VARCHAR(50) NOT NULL,
    result ENUM('win', 'loss', 'draw'),
    kills INT NOT NULL DEFAULT 0,
    deaths INT NOT NULL DEFAULT 0,
    score INT NOT NULL DEFAULT 0,
    team_id INT, -- NULL for 1v1, 1 or 2 for team modes
    
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_match (match_id),
    INDEX idx_user (user_id),
    INDEX idx_hero (hero),
    UNIQUE KEY unique_user_match (match_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TEAMS / GUILDS
-- ============================================================================

CREATE TABLE IF NOT EXISTS teams (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    tag VARCHAR(10) NOT NULL UNIQUE,
    region VARCHAR(20) NOT NULL,
    points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_points (points DESC),
    INDEX idx_region (region)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    role ENUM('leader', 'officer', 'member') NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_team (team_id),
    INDEX idx_user (user_id),
    UNIQUE KEY unique_user_team (user_id)  -- User can only be in one team
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS team_invitations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    invited_by CHAR(36) NOT NULL,
    status ENUM('pending', 'accepted', 'declined', 'expired') NOT NULL DEFAULT 'pending',
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- ACHIEVEMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS achievements (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    requirements JSON NOT NULL, -- Flexible requirements storage
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    achievement_id CHAR(36) NOT NULL,
    progress INT NOT NULL DEFAULT 0,
    unlocked_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_unlocked_at (unlocked_at),
    UNIQUE KEY unique_user_achievement (user_id, achievement_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- THIRD-PARTY INTEGRATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS creator_integrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    platform ENUM('twitch', 'youtube', 'discord') NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    channel_name VARCHAR(255),
    access_token TEXT, -- Encrypted
    refresh_token TEXT, -- Encrypted
    expires_at TIMESTAMP,
    verified_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_platform (platform),
    UNIQUE KEY unique_user_platform (user_id, platform)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- VIEWS FOR LEADERBOARDS (Performance optimization)
-- ============================================================================

CREATE OR REPLACE VIEW leaderboard_global AS
SELECT 
    u.id,
    u.nickname,
    u.region,
    u.faction,
    u.avatar,
    s.rank,
    s.mmr,
    s.wins,
    s.losses,
    s.matches_played,
    ROUND((s.wins / NULLIF(s.matches_played, 0)) * 100, 2) as win_rate
FROM users u
JOIN user_stats s ON u.id = s.user_id
WHERE u.profile_visibility = 'public'
ORDER BY s.mmr DESC
LIMIT 1000;

CREATE OR REPLACE VIEW leaderboard_duelo AS
SELECT 
    u.id,
    u.nickname,
    u.region,
    s.duelo_rank as rank,
    s.duelo_mmr as mmr
FROM users u
JOIN user_stats s ON u.id = s.user_id
WHERE u.profile_visibility = 'public'
ORDER BY s.duelo_mmr DESC
LIMIT 1000;

-- Similar views for other modes (briga, dominio, etc.)

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert default achievements (examples)
INSERT INTO achievements (id, name, description, icon, category, requirements) VALUES
(UUID(), 'First Blood', 'Win your first match', 'trophy', 'matches', '{"wins": 1}'),
(UUID(), 'Veteran', 'Play 100 matches', 'medal', 'matches', '{"matches_played": 100}'),
(UUID(), 'Killing Spree', 'Get 1000 kills', 'swords', 'combat', '{"kills": 1000}'),
(UUID(), 'Grandmaster', 'Reach Grandmaster rank', 'crown', 'ranking', '{"rank": "Grandmaster"}');
