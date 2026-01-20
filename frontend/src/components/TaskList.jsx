import React from "react";
import TaskItem from "./TaskItem";

const categories = [
  "All",
  "College Work",
  "Self-Learning",
  "Personal",
  "Work",
  "Career",
  "Health",
  "Study",
  "Utility"
];

export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus, filters, onFilterChange }) {
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filters.status === "all" || task.status === filters.status;
    const matchesPriority = filters.priority === "all" || task.priority === filters.priority;
    const matchesCategory = filters.category === "All" || task.category === filters.category;
    return matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-6">
        <select
          className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
          value={filters.status}
          onChange={e => onFilterChange({ ...filters, status: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="done">Done</option>
        </select>
        <select
          className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
          value={filters.priority}
          onChange={e => onFilterChange({ ...filters, priority: e.target.value })}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
          value={filters.category}
          onChange={e => onFilterChange({ ...filters, category: e.target.value })}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Try adjusting your filters or add a new task.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
} 