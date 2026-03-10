const { pool } = require('../db');

async function createStudent({ name, email, age }) {
  const sql = 'INSERT INTO students (name, email, age) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [name, email, age]);
  console.log(`DB: Inserted student id=${result.insertId}`, { name, email, age });
  return result.insertId;
}

async function getAllStudents() {
  const [rows] = await pool.query('SELECT id, name, email, age FROM students');
  return rows;
}

async function getStudentById(id) {
  const [rows] = await pool.query('SELECT id, name, email, age FROM students WHERE id = ?', [id]);
  return rows[0];
}

async function updateStudent(id, { name, email, age }) {
  const fields = [];
  const values = [];

  if (name !== undefined) {
    fields.push('name = ?');
    values.push(name);
  }
  if (email !== undefined) {
    fields.push('email = ?');
    values.push(email);
  }
  if (age !== undefined) {
    fields.push('age = ?');
    values.push(age);
  }

  if (fields.length === 0) {
    return { affectedRows: 0 };
  }

  values.push(id);
  const sql = `UPDATE students SET ${fields.join(', ')} WHERE id = ?`;
  const [result] = await pool.query(sql, values);

  if (result.affectedRows > 0) {
    console.log(`DB: Updated student id=${id}`, { name, email, age });
  }

  return result;
}

async function deleteStudent(id) {
  const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
  if (result.affectedRows > 0) {
    console.log(`DB: Deleted student id=${id}`);
  }
  return result;
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
