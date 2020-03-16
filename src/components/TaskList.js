import React, { useContext } from "react";
//me traigo el tasklistcontext y el useContext para poder manejarlo
import { TaskListContext } from "../contexts/TaskListContext";
import Task from "./Task"; //me traigo mi componente

const TaskList = () => {
  const { tasks } = useContext(TaskListContext); //le pasa el estado de la task que estaba asociado al contexto

  return (
    <div>
      {tasks.length ? ( //valido por medio del operator ternary
        <ul className="list">
          {tasks.map(task => {
            return <Task task={task} key={task.id} />;
            //paso estas props a mi hijo task
          })}
        </ul>
      ) : (
        <div className="no-tasks">No existen tasks</div>
      )}
    </div>
  );
};

export default TaskList;
