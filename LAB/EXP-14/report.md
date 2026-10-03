# Experiment 14 Report

## Objective

Compare PostgreSQL and MongoDB by storing and querying student records, then test PostgreSQL's `jsonb` type for flexible profile data.

## PostgreSQL work

The `postgres_setup.sql` file creates `student_management` data in a `students` table and inserts five records. The `postgres_queries.sql` file demonstrates:

1. Selecting all students from the CSE branch.
2. Finding students enrolled after 31 January 2024.
3. Searching names with `ILIKE`.
4. Updating Bilal Khan's branch to `AI/ML`.
5. Deleting Divya Nair after previewing the matching row.
6. Counting students by branch.
7. Storing and querying nested profile data with `jsonb`.

## MongoDB work

The `mongo_students.js` file creates three documents in the `student_management.students` collection. It repeats the same read, update and delete operations with MongoDB's document query syntax.

## Conclusion

PostgreSQL is a good fit when fields, constraints, reporting and relationships are important. MongoDB is convenient when records have varied, nested shapes. For this exercise, a PostgreSQL table with a `jsonb` profile column offers both typed core fields and flexible optional data without maintaining two separate databases.
