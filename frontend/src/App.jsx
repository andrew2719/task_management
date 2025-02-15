/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./Config";
import { LogOut, ListTodo, Plus } from "lucide-react";
import TaskCard from "./components/TaskCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/Sheet";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    userId: "",
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const checkSession = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/auth/session-check`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/tasks/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const tasksArray = Array.isArray(data) ? data : data.tasks || [];
        setTasks(tasksArray);
      } else {
        console.error("Failed to fetch tasks:", data);
        setTasks([]);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user.id,
          title: newTask.title,
          description: newTask.description,
          status: "pending",
        }),
      });

      if (response.ok) {
        setNewTask({ title: "", description: "" });
        setIsOpen(false);
        await fetchTasks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    if (!currentTask?.title?.trim()) return;

    const taskId = currentTask._id || currentTask.id;

    if (!taskId) {
      console.error("No task ID found:", currentTask);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${SERVER_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: currentTask.title,
          description: currentTask.description,
          status: currentTask.status || "pending",
        }),
      });
      if (response.ok) {
        await fetchTasks();
        setIsOpen(false);
        setCurrentTask(null);
        setIsUpdateMode(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to update task:", errorData);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error("Invalid task ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`${SERVER_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        const error = await response.json();
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Error deleting task. Please try again.");
    }
  };

  const openUpdateSheet = (task) => {
    setCurrentTask({
      ...task,
      _id: task._id || task.id,
      id: task.id || task._id,
    });
    setIsUpdateMode(true);
    setIsOpen(true);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    if (!taskId) {
      console.error("Task ID is undefined");
      return;
    }

    try {
      const status = newStatus === "completed" ? "complete" : "incomplete";
      const response = await fetch(`${SERVER_URL}/tasks/${taskId}/${status}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return null;
  }

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          {/* <div className="logo-icon">
            <ListTodo color="white" />
          </div> */}
          <span className="logo-text">Hello !</span>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="main-content">
        <div className="content-grid">
          <div className="tasks-column pending-column">
            <div className="column-header">
              <div>
                <h2>Welcome {user.name}</h2>
                <p className="subtitle">Gotta DO!</p>
              </div>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    className="add-task-btn"
                    onClick={() => {
                      setIsUpdateMode(false);
                      setCurrentTask(null);
                    }}
                  >
                    <Plus className="icon" />
                    <span>Add Task</span>
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      {isUpdateMode ? "Update Task" : "Add New Task"}
                    </SheetTitle>
                    <SheetDescription>
                      {isUpdateMode
                        ? "Update the task details below."
                        : ""}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="sheet-form">
                    <div className="form-group">
                      <input
                        type="text"
                        value={
                          isUpdateMode
                            ? currentTask?.title || ""
                            : newTask.title
                        }
                        onChange={(e) =>
                          isUpdateMode
                            ? setCurrentTask({
                                ...currentTask,
                                title: e.target.value,
                              })
                            : setNewTask({ ...newTask, title: e.target.value })
                        }
                        placeholder="Task Title"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        value={
                          isUpdateMode
                            ? currentTask?.description || ""
                            : newTask.description
                        }
                        onChange={(e) =>
                          isUpdateMode
                            ? setCurrentTask({
                                ...currentTask,
                                description: e.target.value,
                              })
                            : setNewTask({
                                ...newTask,
                                description: e.target.value,
                              })
                        }
                        placeholder="Task Description"
                        className="form-textarea"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (isUpdateMode) {
                          handleUpdateTask();
                        } else {
                          handleAddTask();
                        }
                        // closeSheet();
                      }}
                      className="submit-btn"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? isUpdateMode
                          ? "Updating..."
                          : "Adding..."
                        : isUpdateMode
                        ? "Update Task"
                        : "Add Task"}
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="tasks-list">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                    onEdit={openUpdateSheet}
                  />
                ))
              ) : (
                <div className="no-tasks">
                  <p>Nothing To show</p>
                </div>
              )}
            </div>
          </div>

          <div className="tasks-column completed-column">
            <div className="column-header">
              <div>
                <h2>Completed Tasks</h2>
                <p className="subtitle"></p>
              </div>
            </div>
            <div className="tasks-list">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                    onEdit={openUpdateSheet}
                  />
                ))
              ) : (
                <div className="no-tasks">
                  <p> 🙃 NONE FINISHED</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
