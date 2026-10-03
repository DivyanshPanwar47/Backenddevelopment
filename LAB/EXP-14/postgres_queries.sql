-- Experiment 14: PostgreSQL CRUD and JSONB queries
-- Run with:
--   psql -d student_management -f postgres_queries.sql

-- Read: students in CSE
SELECT id, name, branch, email, enrollment_date
FROM students
WHERE branch = 'CSE'
ORDER BY enrollment_date;

-- Read: students enrolled after January 2024
SELECT id, name, branch, email, enrollment_date
FROM students
WHERE enrollment_date > DATE '2024-01-31'
ORDER BY enrollment_date;

-- Read: case-insensitive name search
SELECT id, name, email
FROM students
WHERE name ILIKE 'a%';

-- Update: move one student to the AI/ML branch
UPDATE students
SET branch = 'AI/ML'
WHERE email = 'bilal@example.com'
RETURNING id, name, branch, email;

-- Delete: inspect the target before deleting it
SELECT id, name, email
FROM students
WHERE email = 'divya@example.com';

DELETE FROM students
WHERE email = 'divya@example.com'
RETURNING id, name, email;

-- Bonus aggregation
SELECT branch, COUNT(*) AS total
FROM students
GROUP BY branch
ORDER BY total DESC, branch;

-- JSONB: store flexible profile data beside the typed columns
UPDATE students
SET profile = jsonb_build_object(
    'skills', jsonb_build_array('python', 'sql'),
    'clubs', jsonb_build_object('robotics', true)
)
WHERE email = 'alice@example.com';

SELECT profile -> 'skills' AS skills,
       profile -> 'clubs' AS clubs,
       profile ->> 'clubs' AS clubs_as_text
FROM students
WHERE email = 'alice@example.com';

SELECT *
FROM students
WHERE profile @> '{"clubs": {"robotics": true}}';

CREATE INDEX IF NOT EXISTS idx_students_profile
    ON students USING GIN (profile);
