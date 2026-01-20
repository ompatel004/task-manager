import React, { useState, useEffect, useRef } from "react";

const priorities = ["high", "medium", "low"];
const statuses = ["open", "done"];
const categories = [
  "College Work",
  "Self-Learning",
  "Personal",
  "Work",
  "Career",
  "Health",
  "Study",
  "Utility"
];

export default function AddEditTask({ open, onClose, onSave, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "Personal");
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [priority, setPriority] = useState(initialData?.priority || "medium");
  const [status, setStatus] = useState(initialData?.status || "open");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      // Reset form when modal opens or initialData changes
      setTitle(initialData?.title || "");
      setDescription(initialData?.description || "");
      setCategory(initialData?.category || "Personal");
      setDueDate(initialData?.dueDate || "");
      setPriority(initialData?.priority || "medium");
      setStatus(initialData?.status || "open");
      setError("");
      if (titleRef.current) {
        titleRef.current.focus();
      }
    }
  }, [open, initialData]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && document.activeElement.tagName !== "TEXTAREA") handleSave();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [open, title, description, category, dueDate, priority, status]);

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!dueDate) {
      setError("Due date is required");
      return;
    }
    setError("");
    onSave({ title, description, category, dueDate, priority, status });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm animate-fade-in" aria-modal="true" role="dialog">
      <div className="relative w-full max-w-lg mx-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col gap-4 animate-modal-pop">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              ref={titleRef}
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition text-gray-900 bg-white placeholder-gray-400 ${error && !title.trim() ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter task title"
              aria-invalid={!!error && !title.trim()}
              aria-required="true"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition text-gray-900 bg-white placeholder-gray-400 min-h-[60px]"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
            <select
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition text-gray-900 bg-white"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition text-gray-900 bg-white ${error && !dueDate ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`}
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              aria-invalid={!!error && !dueDate}
              aria-required="true"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition text-gray-900 bg-white"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition text-gray-900 bg-white"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            onClick={handleSave}
          >
            {initialData ? "Update" : "Add"} Task
          </button>
        </div>
      </div>
    </div>
  );
} 