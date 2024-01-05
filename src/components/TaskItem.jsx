import React from "react";
import { MdDeleteSweep } from "react-icons/md";

const TaskItem = ([task]) => {
  return (
    <li className="items">
      <div className="items-text">
        <input type="checkbox" />
        <p>{task.taskName} </p>
      </div>
      <MdDeleteSweep className="delete-icon" />
    </li>
  );
};

export default TaskItem;
