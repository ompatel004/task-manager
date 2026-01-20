const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: { 
    type: String, 
    enum: ['College Work', 'Self-Learning', 'Personal', 'Work', 'Career', 'Health', 'Study', 'Utility'],
    required: true 
  },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
  status: { type: String, enum: ['open', 'done'], required: true, default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
