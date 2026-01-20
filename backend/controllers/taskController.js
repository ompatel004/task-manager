const Task = require('../models/Task');

// Get all tasks (with optional filters)
exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, sortBy } = req.query;
    let filter = {};
    if (status && status !== 'all') filter.status = status;
    if (priority && priority !== 'all') filter.priority = priority;
    let query = Task.find(filter);
    if (sortBy === 'priority') {
      query = query.sort({
        priority: 1, // high < medium < low (alphabetical)
        dueDate: 1
      });
    } else {
      query = query.sort({ dueDate: 1 });
    }
    const tasks = await query.exec();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, status, category } = req.body;
    const task = new Task({ title, description, dueDate, priority, status, category });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, status, category } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, status, category },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
