const express = require('express');
const mongoose = require('mongoose');

const Todo = require('../models/Todo');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function validId(id) {
  return mongoose.isValidObjectId(id);
}

router.get('/', async (req, res) => {
  const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
  return res.json({ count: todos.length, todos });
});

router.get('/:id', async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid todo id.' });
  const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
  if (!todo) return res.status(404).json({ message: 'Todo not found.' });
  return res.json(todo);
});

router.post('/', async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  if (!String(title || '').trim()) return res.status(400).json({ message: 'Title is required.' });

  try {
    const todo = await Todo.create({ user: req.userId, title, description, priority, dueDate });
    return res.status(201).json({ message: 'Todo created successfully', todo });
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create todo', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid todo id.' });
  const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
  if (!todo) return res.status(404).json({ message: 'Todo not found.' });

  const allowedFields = ['title', 'description', 'completed', 'priority', 'dueDate'];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) todo[field] = req.body[field];
  }

  try {
    await todo.save();
    return res.json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update todo', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid todo id.' });
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!todo) return res.status(404).json({ message: 'Todo not found.' });
  return res.json({ message: 'Todo deleted successfully', todo });
});

module.exports = router;
