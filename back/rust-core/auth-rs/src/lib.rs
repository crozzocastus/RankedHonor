use anyhow::Result;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// JWT Claims structure
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,      // User ID
    pub email: String,
    pub exp: i64,         // Expiration time
    pub iat: i64,         // Issued at
    pub token_type: TokenType,
}

#[derive(Debug, Serialize, Deserialize, Clone, Copy)]
#[serde(rename_all = "lowercase")]
pub enum TokenType {
    Access,
    Refresh,
}

/// Password hashing service using Argon2
pub struct PasswordService;

impl PasswordService {
    /// Hash a password using Argon2
    pub fn hash_password(password: &str) -> Result<String> {
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let password_hash = argon2
            .hash_password(password.as_bytes(), &salt)
            .map_err(|e| anyhow::anyhow!("Failed to hash password: {}", e))?
            .to_string();
        Ok(password_hash)
    }

    /// Verify a password against a hash
    pub fn verify_password(password: &str, password_hash: &str) -> Result<bool> {
        let parsed_hash = PasswordHash::new(password_hash)
            .map_err(|e| anyhow::anyhow!("Invalid password hash: {}", e))?;
        
        let argon2 = Argon2::default();
        Ok(argon2.verify_password(password.as_bytes(), &parsed_hash).is_ok())
    }
}

/// JWT token service
pub struct JwtService {
    access_secret: String,
    refresh_secret: String,
}

impl JwtService {
    pub fn new(access_secret: String, refresh_secret: String) -> Self {
        Self {
            access_secret,
            refresh_secret,
        }
    }

    /// Generate an access token (15 minutes validity)
    pub fn generate_access_token(&self, user_id: &Uuid, email: &str) -> Result<String> {
        let claims = Claims {
            sub: user_id.to_string(),
            email: email.to_string(),
            exp: (Utc::now() + Duration::minutes(15)).timestamp(),
            iat: Utc::now().timestamp(),
            token_type: TokenType::Access,
        };

        encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(self.access_secret.as_bytes()),
        )
        .map_err(|e| anyhow::anyhow!("Failed to generate access token: {}", e))
    }

    /// Generate a refresh token (7 days validity)
    pub fn generate_refresh_token(&self, user_id: &Uuid, email: &str) -> Result<String> {
        let claims = Claims {
            sub: user_id.to_string(),
            email: email.to_string(),
            exp: (Utc::now() + Duration::days(7)).timestamp(),
            iat: Utc::now().timestamp(),
            token_type: TokenType::Refresh,
        };

        encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(self.refresh_secret.as_bytes()),
        )
        .map_err(|e| anyhow::anyhow!("Failed to generate refresh token: {}", e))
    }

    /// Validate and decode a token
    pub fn validate_token(&self, token: &str, token_type: TokenType) -> Result<Claims> {
        let secret = match token_type {
            TokenType::Access => &self.access_secret,
            TokenType::Refresh => &self.refresh_secret,
        };

        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &Validation::new(Algorithm::HS256),
        )
        .map_err(|e| anyhow::anyhow!("Invalid token: {}", e))?;

        Ok(token_data.claims)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_password_hashing() {
        let password = "test_password_123";
        let hash = PasswordService::hash_password(password).unwrap();
        assert!(PasswordService::verify_password(password, &hash).unwrap());
        assert!(!PasswordService::verify_password("wrong_password", &hash).unwrap());
    }

    #[test]
    fn test_jwt_generation() {
        let jwt_service = JwtService::new("test_secret".to_string(), "test_refresh".to_string());
        let user_id = Uuid::new_v4();
        let email = "test@example.com";

        let token = jwt_service.generate_access_token(&user_id, email).unwrap();
        let claims = jwt_service.validate_token(&token, TokenType::Access).unwrap();

        assert_eq!(claims.sub, user_id.to_string());
        assert_eq!(claims.email, email);
    }
}
