const express = require('express');
const router = express.Router();
const studentModel = require('../models/studentModel');

// Create student
router.post('/', async (req, res, next) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || age === undefined) {
      return res.status(400).json({ error: 'name, email, and age are required' });
    }

    const id = await studentModel.createStudent({ name, email, age });
    const student = await studentModel.getStudentById(id);
    res.status(201).json(student);
  } catch (err) {
    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'A student with that email already exists' });
    }
    next(err);
  }
});

// Get all students
router.get('/', async (req, res, next) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// Get student by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid student id' });
    }

    const student = await studentModel.getStudentById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Update student
router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid student id' });
    }

    const { name, email, age } = req.body;
    const updated = await studentModel.updateStudent(id, { name, email, age });

    if (!updated) {
      return res.status(404).json({ error: 'Student not found or no fields to update' });
    }

    res.json(updated);
  } catch (err) {
    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'A student with that email already exists' });
    }
    next(err);
  }
});

// Delete student
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid student id' });
    }

    const deleted = await studentModel.deleteStudent(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
