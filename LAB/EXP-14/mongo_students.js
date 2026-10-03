// Run with:
//   mongosh mongo_students.js
// This script tags its own documents so it can be rerun without touching
// unrelated records in the student_management database.

use('student_management');

db.students.deleteMany({ labExperiment: 'exp14' });

db.students.insertMany([
  {
    name: 'Alice Sharma',
    branch: 'CSE',
    email: 'alice@example.com',
    enrollment_date: ISODate('2024-01-15'),
    labExperiment: 'exp14',
  },
  {
    name: 'Bilal Khan',
    branch: 'ECE',
    email: 'bilal@example.com',
    enrollment_date: ISODate('2023-08-10'),
    labExperiment: 'exp14',
  },
  {
    name: 'Carla Gomez',
    branch: 'CSE',
    email: 'carla@example.com',
    enrollment_date: ISODate('2024-03-02'),
    labExperiment: 'exp14',
  },
]);

// Read: students in CSE
db.students.find({ labExperiment: 'exp14', branch: 'CSE' }, { _id: 0 });

// Update: move Bilal to AI/ML
db.students.updateOne(
  { labExperiment: 'exp14', email: 'bilal@example.com' },
  { $set: { branch: 'AI/ML' } },
);

// Delete: remove Carla from this experiment's sample data
db.students.deleteOne({ labExperiment: 'exp14', email: 'carla@example.com' });

// Show the remaining sample documents
db.students.find({ labExperiment: 'exp14' }, { _id: 0 });
