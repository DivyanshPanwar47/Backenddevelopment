# Experiment 14: PostgreSQL and MongoDB

This experiment compares a relational database with a document database using the same student-management data.

## Assignment covered

- PostgreSQL database: `student_management`.
- `students` table with `id`, `name`, `branch`, `email` and `enrollment_date`.
- Five PostgreSQL seed records.
- CSE and date-filter queries, an update, a delete and an aggregation.
- MongoDB `students` collection with three sample documents.
- Equivalent MongoDB read, update and delete operations.
- PostgreSQL `jsonb` storage and indexing as a flexible alternative to a separate document store.

## PostgreSQL setup

Install PostgreSQL using the instructions in the lecture material. On Windows, WSL with Ubuntu is a convenient option. Once PostgreSQL is running:

```bash
createdb student_management
psql -d student_management -f postgres_setup.sql
psql -d student_management -f postgres_queries.sql
```

If the database already exists, skip `createdb`. The setup script is safe to rerun: it creates the table if needed and does not duplicate the seed rows.

Useful checks in `psql`:

```sql
\c student_management
\dt
\d students
SELECT * FROM students;
```

## MongoDB setup

Install MongoDB and `mongosh`, or use a MongoDB Atlas cluster. Then run:

```bash
mongosh mongo_students.js
```

The script uses a `labExperiment: 'exp14'` marker so rerunning it removes only its own sample documents. It demonstrates `find`, `updateOne` and `deleteOne`.

## PostgreSQL versus MongoDB

| Area | PostgreSQL | MongoDB |
|---|---|---|
| Data model | Typed rows in tables | JSON-like documents in collections |
| Query style | SQL | MongoDB query language |
| Schema | Strong structure for core fields | Flexible document structure |
| Relationships | Native joins and foreign keys | Usually embedded documents or references |
| Transactions | ACID transactions are the default | Multi-document transactions are available, but documents are the primary model |
| Flexible fields | `jsonb` beside relational columns | Natural part of each document |

For this student data, PostgreSQL gives strong constraints, unique email validation and straightforward reporting queries. MongoDB is convenient when each student may have different nested fields. PostgreSQL `jsonb` provides a middle ground: strict columns for important fields and flexible JSON for optional profile data.

## Notes

The database servers are intentionally not installed by this repository exercise. The scripts are ready to run once PostgreSQL and MongoDB are available locally or through Atlas.

