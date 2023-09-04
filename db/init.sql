-- Create the database

CREATE DATABASE blogapp;

\c blogapp;

-- Create the "User" table
CREATE TABLE IF NOT EXISTS "Users" (
  id VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create the "Post" table
CREATE TABLE IF NOT EXISTS "Posts" (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insert dummy user data
INSERT INTO "Users" (id, username, name, email, password, "createdAt", "updatedAt")
VALUES
    ('1', 'User1', 'John Doe', 'user1@example.com', 'password1', NOW(), NOW()),
    ('2', 'User2', 'Jane Smith', 'user2@example.com', 'password2', NOW(), NOW()),
    ('3', 'User3', 'Alice Johnson', 'user3@example.com', 'password3', NOW(), NOW()),
    ('4', 'User4', 'Bob Brown', 'user4@example.com', 'password4', NOW(), NOW()),
    ('5', 'User5', 'Eve Davis', 'user5@example.com', 'password5', NOW(), NOW());

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert dummy post data
INSERT INTO "Posts" (id, title, content, author_id, "createdAt", "updatedAt")
SELECT
  uuid_generate_v4(),
  'Dummy Title' || generate_series(1, 100),
  'Dummy Content' || generate_series(1, 100),
  (floor(random() * 5) + 1)::VARCHAR,
  NOW(),
  NOW()
FROM generate_series(1, 100);
