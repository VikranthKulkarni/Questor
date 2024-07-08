import React from "react";
import { XIcon } from "@heroicons/react/solid";

const HowToUse = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold mb-4">How to Use the Kanban Board</h3>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Step 1: Creating Tasks</h4>
            <p className="text-sm text-gray-300">
              To create a task, click on the "Create New Task" button. Fill in
              the task details such as title, description, and due date.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Step 2: Organizing Tasks</h4>
            <p className="text-sm text-gray-300">
              Organize your tasks into columns such as "To Do", "In Progress",
              and "Done". You can create custom columns based on your workflow.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">
              Step 3: Using Drag and Drop
            </h4>
            <p className="text-sm text-gray-300">
              To move tasks between columns, simply click and hold the task
              card, then drag it to the desired column and release it. This
              helps in visualizing the progress of tasks.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">
              Step 4: Editing and Deleting Tasks
            </h4>
            <p className="text-sm text-gray-300">
              You can edit a task by clicking on the task card and updating the
              details. To delete a task, click on the delete button on the task
              card.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Step 5: Tracking Progress</h4>
            <p className="text-sm text-gray-300">
              Use the Kanban board to track the progress of your tasks. Move
              tasks from "To Do" to "In Progress" and finally to "Done" as you
              work on them.
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-600 text-white py-2 px-4 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
