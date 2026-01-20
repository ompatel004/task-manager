import React from "react";

function getDueLabel(dueDate) {
  if (!dueDate) return "";
  const due = new Date(dueDate);
  const now = new Date();
  const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  if (diff < 0) return `Overdue by ${-diff} day${-diff === 1 ? '' : 's'}`;
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  return `Due in ${diff} days`;
}

const priorityIcons = {
  high: <span className="material-icons text-red-500 align-middle" title="High Priority">priority_high</span>,
  medium: <span className="material-icons text-yellow-500 align-middle" title="Medium Priority">star_half</span>,
  low: <span className="material-icons text-green-500 align-middle" title="Low Priority">low_priority</span>,
};

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const categoryColors = {
    "College Work": "bg-blue-100 text-blue-800",
    "Self-Learning": "bg-purple-100 text-purple-800",
    "Personal": "bg-pink-100 text-pink-800",
    "Work": "bg-indigo-100 text-indigo-800",
    "Career": "bg-orange-100 text-orange-800",
    "Health": "bg-teal-100 text-teal-800",
    "Study": "bg-cyan-100 text-cyan-800",
    "Utility": "bg-gray-100 text-gray-800",
  };

  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 bg-white/80 shadow-md hover:shadow-2xl transition-all backdrop-blur-md group focus-within:ring-2 focus-within:ring-blue-300 animate-fade-in`}> 
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className={`font-bold text-lg ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</span>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm border flex items-center gap-1 ${priorityColors[task.priority]}`}
            title={`Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`}
          >
            {priorityIcons[task.priority]}<span className="sr-only">{task.priority}</span>
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm border flex items-center gap-1 ${categoryColors[task.category]}`}
            title={`Category: ${task.category}`}
          >
            {task.category}
          </span>
        </div>
        {task.description && <div className="text-sm text-gray-600 mb-1">{task.description}</div>}
        <div className="text-xs text-gray-500" title={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}>{getDueLabel(task.dueDate)}</div>
      </div>
      <div className="flex gap-2 items-center mt-2 md:mt-0">
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-300 ${task.status === 'done' ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}
          onClick={() => onToggleStatus(task)}
          title={task.status === 'done' ? 'Mark as Open' : 'Mark as Done'}
          aria-label={task.status === 'done' ? 'Mark as Open' : 'Mark as Done'}
        >
          {task.status === 'done' ? (
            <span className="material-icons text-base">undo</span>
          ) : (
            <span className="material-icons text-base">check_circle</span>
          )}
          <span className="hidden sm:inline">{task.status === 'done' ? 'Open' : 'Done'}</span>
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500 text-white font-semibold text-sm shadow-sm hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => onEdit(task)}
          title="Edit Task"
          aria-label="Edit Task"
        >
          <span className="material-icons text-base">edit</span> <span className="hidden sm:inline">Edit</span>
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 text-white font-semibold text-sm shadow-sm hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={() => onDelete(task)}
          title="Delete Task"
          aria-label="Delete Task"
        >
          <span className="material-icons text-base">delete</span> <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
} 