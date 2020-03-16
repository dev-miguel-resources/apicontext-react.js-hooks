import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuid'

export const TaskListContext = createContext() //creo mi contexto

const TaskListContextProvider = props => { //defino props
  const initialState = JSON.parse(localStorage.getItem('tasks')) || [] //la data la guardo en el localstorage para que no se pierda

  const [tasks, setTasks] = useState(initialState) //funcion que inicializa mi state de task

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)) //nombre de la collection y el value
  }, [tasks])

  const [editItem, setEditItem] = useState(null) //creo un nuevo manejo de state, para editar

  // Agregar tasks
  const addTask = title => {
    setTasks([...tasks, { title, id: uuid() }]) //le doy un unique id
  }

  // eliminar tasks
  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id)) //va a filtrar y verificar si son iguales o diferentes
  }

  // limpiar tasks
  const clearList = () => {
    setTasks([]) //limpia el estado de taks, con un empty array
  }

  // buscar task
  const findItem = id => {
    const item = tasks.find(task => task.id === id) //comparo la tarea con el id actual respecto al que viene

    setEditItem(item) //modifico el estado del item
  }

  // editar task
  const editTask = (title, id) => {
    const newTasks = tasks.map(task => (task.id === id ? { title, id } : task)) //retorno un nuevo objeto en el caso contrario

    console.log(newTasks)

    setTasks(newTasks) //nueva instancia
    setEditItem(null) //lo dejo en null
  }

  return (
    <TaskListContext.Provider //las propiedades de mi context, que quiero proveer a otros componentes en orden
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
      {props.children} {/*con esto ya le puedo pasar estas props como hijos a mis demas componentes*/}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider
