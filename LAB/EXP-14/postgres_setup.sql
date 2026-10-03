-- Experiment 14: PostgreSQL setup and seed data
-- Create the database once before running this file:
--   createdb student_management
-- Then run:
--   psql -d student_management -f postgres_setup.sql

CREATE TABLE IF NOT EXISTS students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- The jsonb column is used in the final part of the comparison exercise.
ALTER TABLE students
    ADD COLUMN IF NOT EXISTS profile JSONB NOT NULL DEFAULT '{}'::jsonb;

INSERT INTO students (name, branch, email, enrollment_date)
VALUES
    ('Alice Sharma', 'CSE', 'alice@example.com', '2024-01-15'),
    ('Bilal Khan', 'ECE', 'bilal@example.com', '2023-08-10'),
    ('Carla Gomez', 'CSE', 'carla@example.com', '2024-03-02'),
    ('Divya Nair', 'ME', 'divya@example.com', '2023-11-20'),
    ('Ethan Brooks', 'CSE', 'ethan@example.com', '2024-02-18')
ON CONFLICT (email) DO NOTHING;

SELECT * FROM students ORDER BY id;
