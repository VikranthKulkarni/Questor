import React, { useState } from 'react';
import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid';

const BoardTask = ({ task, handleDragStart, handleDeleteTask, openEditModal }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleEditModalOpen = () => {
        setIsEditModalOpen(true);
        setEditedTask({ ...task });
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleEditTask = () => {
        // Implement logic to update task via API call
        fetch(`http://localhost:8080/questor/tasks/update/${task.taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedTask)
        })
        .then(response => response.json())
        .then(updatedTask => {
            console.log('Updated Task:', updatedTask);
            // Close modal after updating task
            setIsEditModalOpen(false);
        })
        .catch(error => console.error('Failed to update task:', error));
    };

    const handleDeleteTaskLocally = () => {
        handleDeleteTask(task.taskId);
        setIsEditModalOpen(false); // Close modal if open when deleting task
    };

    return (
        <div
            key={task.taskId}
            className="p-2 bg-gray-100 rounded shadow-sm cursor-pointer"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, task.taskId)}
        >
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{task.name}</h4>
                <div className="flex space-x-2">
                    <button onClick={handleDeleteTaskLocally} className="bg-transparent hover:bg-gray-200 rounded-full p-2">
                        <TrashIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <button onClick={handleEditModalOpen} className="bg-transparent hover:bg-gray-200 rounded-full p-2">
                        <PencilAltIcon className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
            </div>
            <p className="text-sm">{task.description}</p>
            <p className="text-xs">Due: {new Date(task.dueDate).toISOString().split('T')[0]}</p>
            <p className="text-xs">Priority: {task.priority}</p>

            {/* Edit Task Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Edit Task</h3>
                        <input
                            type="text"
                            name="name"
                            value={editedTask.name}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
                            placeholder="Task Name"
                        />
                        <textarea
                            name="description"
                            value={editedTask.description}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
                            placeholder="Description"
                        />
                        <input
                            type="date"
                            name="dueDate"
                            value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
                        />
                        <select
                            name="priority"
                            value={editedTask.priority}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
                        >
                            <option value="LOW">Low</option>
                            <option value="MED">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleEditModalClose} className="bg-gray-600 text-white py-2 px-4 rounded-full">
                                Cancel
                            </button>
                            <button onClick={handleEditTask} className="bg-indigo-600 text-white py-2 px-4 rounded-full">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardTask;
