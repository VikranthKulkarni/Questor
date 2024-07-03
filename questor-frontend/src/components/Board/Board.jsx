import React from 'react';
import BoardTask from '../BoardCard/BoardTask';
import { PlusIcon, TrashIcon } from '@heroicons/react/solid';

const Board = ({ board, handleDrop, handleDragOver, handleDragStart, openTaskModal, handleDeleteTask, handleDeleteBoard }) => {
    return (
        <div
            key={board.boardId}
            className="w-64 bg-white p-4 rounded-lg shadow-md"
            onDrop={(e) => handleDrop(e, board.boardId)}
            onDragOver={handleDragOver}
            style={{ color: "black" }}
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{board.name}</h2>
                <div className="flex space-x-2">
                    <button onClick={() => openTaskModal(board.boardId)} className="bg-transparent hover:bg-gray-200 rounded-full p-2">
                        <PlusIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <button onClick={() => handleDeleteBoard(board.boardId)} className="bg-transparent hover:bg-gray-200 rounded-full p-2">
                        <TrashIcon className="h-6 w-6 text-red-600" />
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                {board.tasks && board.tasks.map(task => (
                    <BoardTask
                        key={task.taskId}
                        task={task}
                        handleDragStart={handleDragStart}
                        handleDeleteTask={handleDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
