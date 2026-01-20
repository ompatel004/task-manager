require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('../models/Task');

const tasks = [
  {
    title: "Submit College Assignment",
    description: "Complete and submit the cloud computing assignment on Google Classroom.",
    category: "College Work",
    dueDate: new Date("2025-05-18"),
    priority: "high",
    status: "open"
  },
  {
    title: "Daily Coding Practice",
    description: "Solve 2 problems from Codeforces or LeetCode to improve DSA skills.",
    category: "Self-Learning",
    dueDate: new Date("2025-05-16"),
    priority: "medium",
    status: "open"
  },
  {
    title: "Grocery Shopping",
    description: "Buy milk, bread, eggs, fruits, and vegetables for the week.",
    category: "Personal",
    dueDate: new Date("2025-05-17"),
    priority: "low",
    status: "open"
  },
  {
    title: "Team Project Meeting",
    description: "Attend project sync-up with the team for the Java SaaS app development.",
    category: "Work",
    dueDate: new Date("2025-05-18"),
    priority: "high",
    status: "open"
  },
  {
    title: "Resume Update",
    description: "Add recent internship details and projects in your resume.",
    category: "Career",
    dueDate: new Date("2025-05-20"),
    priority: "medium",
    status: "open"
  },
  {
    title: "Gym Workout",
    description: "Chest and triceps day – 1-hour workout with warm-up and cool down.",
    category: "Health",
    dueDate: new Date("2025-05-16"),
    priority: "medium",
    status: "open"
  },
  {
    title: "Watch IoT Lecture",
    description: "Watch and take notes from NPTEL Week 7 IoT lecture.",
    category: "Study",
    dueDate: new Date("2025-05-19"),
    priority: "high",
    status: "open"
  },
  {
    title: "Backup Important Files",
    description: "Upload recent documents and code to Google Drive for backup.",
    category: "Utility",
    dueDate: new Date("2025-05-21"),
    priority: "low",
    status: "open"
  },
  {
    title: "Prepare for Java Interview",
    description: "Revise OOPs, exception handling, and collections before technical round.",
    category: "Career",
    dueDate: new Date("2025-05-17"),
    priority: "high",
    status: "open"
  },
  {
    title: "Call Parents",
    description: "Check in with parents and update them about exams and interviews.",
    category: "Personal",
    dueDate: new Date("2025-05-16"),
    priority: "low",
    status: "open"
  }
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todolist';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Insert new tasks
    await Task.insertMany(tasks);
    console.log('Successfully seeded database with tasks');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 