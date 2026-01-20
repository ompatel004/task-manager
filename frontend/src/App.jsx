import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEditTask from "./components/AddEditTask";
import TaskList from "./components/TaskList";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

const API_URL = "http://localhost:5000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "All"
  });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, task: null });

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (priorityFilter !== "all") params.priority = priorityFilter;
      if (sortBy) params.sortBy = sortBy;
      const res = await axios.get(`${API_URL}/tasks`, { params });
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter, sortBy]);

  // Add or update task
  const handleSaveTask = async (taskData) => {
    try {
      if (editTask) {
        await axios.put(`${API_URL}/tasks/${editTask._id}`, taskData);
      } else {
        await axios.post(`${API_URL}/tasks`, taskData);
      }
      setShowModal(false);
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error("Error saving task:", err);
    }
  };

  // Edit
  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  // Show delete confirmation
  const handleDelete = (task) => {
    setDeleteConfirm({ open: true, task });
  };

  // Confirm and perform deletion
  const confirmDelete = async (task) => {
    if (!task) return;
    
    try {
      await axios.delete(`${API_URL}/tasks/${task._id}`);
      setDeleteConfirm({ open: false, task: null });
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
      setDeleteConfirm({ open: false, task: null });
    }
  };

  // Toggle status
  const handleToggleStatus = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task._id}`, {
        ...task,
        status: task.status === "done" ? "open" : "done",
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task status. Please try again.");
      console.error("Error updating task status:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-start">
      {/* Sticky Header */}
      <header className="w-full sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">
              Task Management
            </h1>
            <button
              className="px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              onClick={() => {
                setEditTask(null);
                setShowModal(true);
              }}
            >
              + Add Task
            </button>
          </div>
        </div>
      </header>

      <div className="w-full flex flex-col items-center justify-center flex-1 py-6">
        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-6">
          {error && (
            <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Analysis Section */}
          <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Tasks</p>
                  <h3 className="text-2xl font-semibold text-gray-800">{tasks.length}</h3>
                </div>
                <div className="p-2 bg-gray-100 rounded-md">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {tasks.filter(task => task.status === 'done').length}
                  </h3>
                </div>
                <div className="p-2 bg-gray-100 rounded-md">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {tasks.filter(task => task.status === 'open').length}
                  </h3>
                </div>
                <div className="p-2 bg-gray-100 rounded-md">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Priority Distribution */}
          <section className="w-full bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <h3 className="text-base font-medium text-gray-800 mb-4">Priority Distribution</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-md">
                <div className="text-xl font-semibold text-gray-800">
                  {tasks.filter(task => task.priority === 'high').length}
                </div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-md">
                <div className="text-xl font-semibold text-gray-800">
                  {tasks.filter(task => task.priority === 'medium').length}
                </div>
                <div className="text-sm text-gray-600">Medium Priority</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-md">
                <div className="text-xl font-semibold text-gray-800">
                  {tasks.filter(task => task.priority === 'low').length}
                </div>
                <div className="text-sm text-gray-600">Low Priority</div>
              </div>
            </div>
          </section>

          {/* Filter & Sort Controls */}
          <section className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex gap-2 w-full md:w-auto">
              <select
                className="border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 transition w-full md:w-auto text-gray-700 bg-white"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="done">Done</option>
              </select>
              <select
                className="border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 transition w-full md:w-auto text-gray-700 bg-white"
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <select
                className="border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-200 transition w-full md:w-auto text-gray-700 bg-white"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </section>

          {/* Task List */}
          <main className="w-full bg-white rounded-lg shadow-sm p-6 min-h-[300px] flex flex-col gap-4 border border-gray-200">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
                filters={filters}
                onFilterChange={setFilters}
              />
            )}
          </main>

          {/* Add/Edit Modal */}
          <AddEditTask
            open={showModal}
            onClose={() => {
              setShowModal(false);
              setEditTask(null);
            }}
            onSave={handleSaveTask}
            initialData={editTask}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmModal
            open={deleteConfirm.open}
            onClose={() => setDeleteConfirm({ open: false, task: null })}
            onConfirm={confirmDelete}
            taskTitle={deleteConfirm.task?.title}
            task={deleteConfirm.task}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
