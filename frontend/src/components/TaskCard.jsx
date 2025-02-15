/* eslint-disable react/prop-types */
import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import "../styles/TaskCard.css";

const TaskCard = ({ task, onStatusChange, onDelete, onEdit }) => {
  const taskId = task._id || task.id;

  const handleCheckboxChange = (e) => {
    const newStatus = e.target.checked ? "completed" : "pending";
    onStatusChange(taskId, newStatus);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // make it 24hrs
      hour12: false,
    });
  };

  return (
    <div
      className={`task-card ${task.status === "completed" ? "completed" : ""}`}
    >
      <div className="task-header">
        <div className="task-left">
          <label>
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={task.status === "completed"}
              onChange={handleCheckboxChange}
            />
          </label>
          <h3 className="task-title">{task.title}</h3>
        </div>
        <div className="task-actions">
          <button className="action-btn edit" onClick={() => onEdit(task)}>
            <Pencil size={16} />
          </button>
          <button
            className="action-btn delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(taskId);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span className="task-date created">
          <p className="labels">Created:</p> {formatDate(task.created_at)}
        </span>
        <span className="task-date">
          <p className="labels">Updated:</p>
          {formatDate(task.updated_at)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
