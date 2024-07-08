import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Board from "../../components/Board/Board";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KanbanBoardPage() {
  const { projectId } = useParams();
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    boardId: null,
  });

  useEffect(() => {
    fetchBoards();
  }, [projectId]);

  const fetchBoards = () => {
    fetch(`http://localhost:8080/questor/boards/byProjectId/${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        setBoards(data);
        data.forEach((board) => {
          fetchTasksForBoard(board.boardId);
        });
      })
      .catch((error) => console.error("Failed to fetch boards: " + error));
  };

  const fetchTasksForBoard = (boardId) => {
    fetch(`http://localhost:8080/questor/tasks/byBoardId/${boardId}`)
      .then((response) => response.json())
      .then((tasks) => {
        setBoards((prevBoards) =>
          prevBoards.map((b) => (b.boardId === boardId ? { ...b, tasks } : b))
        );
      })
      .catch((error) =>
        console.error(
          "Failed to fetch tasks for board: " + boardId + " Error: " + error
        )
      );
  };

  const handleCreateBoard = () => {
    if (newBoardName.trim() === "") {
      toast.error("Board name cannot be empty");
      return;
    }

    const newBoard = {
      name: newBoardName,
      projectId: Number(projectId),
    };

    fetch(`http://localhost:8080/questor/boards/addBoard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBoard),
    })
      .then((response) => response.json())
      .then((createdBoard) => {
        setBoards([...boards, createdBoard]);
        setIsModalOpen(false);
        setNewBoardName("");
        toast.success("Board created successfully");
      })
      .catch((error) => toast.error("Failed to create board: " + error));
  };

  const handleDragStart = (e, taskId) => {
    if (taskId) {
      e.dataTransfer.setData("taskId", taskId);
    } else {
      console.error("Invalid taskId");
    }
  };

  const handleDrop = (e, boardId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId && boardId) {
      updateTaskBoard(taskId, boardId);
    } else {
      console.error("Invalid taskId or boardId");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateTaskBoard = (taskId, boardId) => {
    fetch(`http://localhost:8080/questor/tasks/getTask/${taskId}`)
      .then((response) => response.json())
      .then((task) => {
        task.boardId = boardId;
        return fetch(`http://localhost:8080/questor/tasks/update/${taskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
      })
      .then(() => {
        fetchBoards();
        toast.success("Task updated successfully");
      })
      .catch((error) => toast.error("Failed to update task: " + error));
  };

  const openTaskModal = (boardId) => {
    setNewTask({ ...newTask, boardId });
    setIsTaskModalOpen(true);
  };

  const handleCreateTask = () => {
    if (newTask.name.trim() === "") {
      toast.error("Task name cannot be empty");
      return;
    }

    fetch(`http://localhost:8080/questor/tasks/addTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((createdTask) => {
        fetchTasksForBoard(newTask.boardId);
        setIsTaskModalOpen(false);
        setNewTask({
          name: "",
          description: "",
          dueDate: "",
          priority: "LOW",
          boardId: null,
        });
        toast.success("Task created successfully");
      })
      .catch((error) => toast.error("Failed to create task: " + error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:8080/questor/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchBoards();
        toast.success("Task deleted successfully");
      })
      .catch((error) => toast.error("Failed to delete task: " + error));
  };

  const handleDeleteBoard = (boardId) => {
    fetch(`http://localhost:8080/questor/boards/${boardId}`, {
      method: "DELETE",
    })
      .then(() => {
        setBoards(boards.filter((board) => board.boardId !== boardId));
        toast.success("Board deleted successfully");
      })
      .catch((error) => toast.error("Failed to delete board: " + error));
  };

  return (
    <div>
      <div className="container mt-28 mx-auto p-4 overflow-x-auto">
        <div className="flex space-x-4">
          {boards.map((board, index) => (
            <Board
              key={index}
              board={board}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleDragStart={handleDragStart}
              openTaskModal={openTaskModal}
              handleDeleteTask={handleDeleteTask}
              handleDeleteBoard={handleDeleteBoard}
            />
          ))}
          <div className="w-64 bg-gray-200 p-4 rounded-lg shadow-md">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Board
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Create New Board</h3>
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              placeholder="Board Name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBoard}
                className="bg-indigo-600 text-white py-2 px-4 rounded-full"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Create New Task</h3>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              placeholder="Task Name"
            />
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              placeholder="Description"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
            />
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
            >
              <option value="LOW">Low</option>
              <option value="MED">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="bg-indigo-600 text-white py-2 px-4 rounded-full"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanBoardPage;
