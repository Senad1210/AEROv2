-- ============================================================
--  MONTANA – Users table
--  Database: MONTANA  (matches app.py config)
-- ============================================================

USE MONTANA;

-- ── TABLE ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name          VARCHAR(100)    NOT NULL,
    email         VARCHAR(255)    NOT NULL,
    password_hash VARCHAR(255)    NOT NULL,   -- store bcrypt hash, NEVER plain text
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_email (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ── OPTIONAL: index for fast login look-ups ───────────────────
CREATE INDEX idx_users_email ON users (email);