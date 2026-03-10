const Student = require('./Student');

async function createStudent({ name, email, age }) {
  const student = await Student.create({ name, email, age });
  console.log(`DB: Inserted student id=${student.id}`, { name, email, age });
  return student.id;
}

async function getAllStudents() {
  return Student.findAll({
    attributes: ['id', 'name', 'email', 'age'],
    order: [['id', 'ASC']],
  });
}

async function getStudentById(id) {
  return Student.findByPk(id, {
    attributes: ['id', 'name', 'email', 'age'],
  });
}

async function updateStudent(id, { name, email, age }) {
  const student = await Student.findByPk(id);
  if (!student) return null;

  const updated = await student.update({
    ...(name !== undefined ? { name } : {}),
    ...(email !== undefined ? { email } : {}),
    ...(age !== undefined ? { age } : {}),
  });

  console.log(`DB: Updated student id=${id}`, {
    name: updated.name,
    email: updated.email,
    age: updated.age,
  });

  return updated;
}

async function deleteStudent(id) {
  const student = await Student.findByPk(id);
  if (!student) return null;

  await student.destroy();
  console.log(`DB: Deleted student id=${id}`);
  return true;
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
