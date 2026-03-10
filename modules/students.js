const Student = require('../models/Student');

async function initStudentTable() {
  // Ensure the students table is created/updated on server start.
  // This only affects the `students` model, not the whole database.
  await Student.sync({ alter: true });
  console.log('✅ Students table is created/updated (Sequelize model sync).');
}

module.exports = {
  initStudentTable,
};
