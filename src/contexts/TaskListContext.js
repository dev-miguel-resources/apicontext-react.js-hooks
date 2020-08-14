import React, { createContext, useState, useEffect } from 'react';
import uuid from 'uuid';

export const TaskListContext = createContext(); 

const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  }, [tasks])

  const [editItem, setEditItem] = useState(null);

  // Agregar tasks
  const addTask = title => {
    setTasks([...tasks, { title, id: uuid() }]); //le doy un unique id
  }

  // eliminar tasks
  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id)); //va a filtrar y verificar si son iguales o diferentes
  }


  const clearList = () => {
    setTasks([]); //limpia el estado de taks, con un empty array
  };

  // buscar task
  const findItem = id => {
    const item = tasks.find(task => task.id === id);

    setEditItem(item);
  }

  const editTask = (title, id) => {
    const newTasks = tasks.map(task => (task.id === id ? { title, id } : task)); 

    console.log(newTasks);

    setTasks(newTasks);
    setEditItem(null); 
  }

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem
      }}
    >
      {props.children} {/*otra variante de como gestionar el children*/}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider
