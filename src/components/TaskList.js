import React, { useContext } from "react";
//me traigo el tasklistcontext y el useContext para poder manejarlo
import { TaskListContext } from "../contexts/TaskListContext";
import Task from "./Task";

const TaskList = () => {
  const { tasks } = useContext(TaskListContext);

  return (
    <div>
      {tasks.length ? ( 
        <ul className="list">
          {tasks.map(task => {
            return <Task task={task} key={task.id} />;
          })}
        </ul>
      ) : (
        <div className="no-tasks">Don't exists tasks</div>
      )}
    </div>
  );
};

export default TaskList;
