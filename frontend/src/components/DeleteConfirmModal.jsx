import React, { useEffect, useRef } from "react";

export default function DeleteConfirmModal({ open, onClose, onConfirm, taskTitle, task }) {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (open && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") onConfirm(task);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, onConfirm, task]);

  const handleConfirm = () => {
    onConfirm(task);
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm animate-fade-in" 
      aria-modal="true" 
      role="dialog"
      onClick={(e) => {
        // Close if clicking the backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg p-6 border border-gray-200 animate-modal-pop">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="material-icons text-red-600 text-2xl">warning</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Task?
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              Are you sure you want to delete this task?
            </p>
            {taskTitle && (
              <p className="text-sm font-medium text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">
                "{taskTitle}"
              </p>
            )}
            <p className="text-xs text-gray-500 mt-3">
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            ref={confirmButtonRef}
            className="px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

