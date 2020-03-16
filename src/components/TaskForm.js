import React, { useState, useContext, useEffect } from 'react'
import { TaskListContext } from '../contexts/TaskListContext'
//importo el contexto
const TaskForm = () => {
  const { addTask, clearList, editTask, editItem } = useContext(TaskListContext) //las recibo por destructuring
  const [title, setTitle] = useState('') //el title empieza vacio

  const handleSubmit = e => {
    e.preventDefault() //prevengo que recargue la pagina
    if (!editItem) { //si no es una tarea a editar
      addTask(title) //agrego la tarea con el titulo
      setTitle('') //luego limpio el valor del estado del titulo
    } else {
      editTask(title, editItem.id) //sino: edito el titulo con ese id
    }
  }

  const handleChange = e => {
    setTitle(e.target.value) //obtiene el nuevo valor de la caja
  }

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title) //edito el titulo
      console.log(editItem)
    } else {
      setTitle('') //sino lo dejo como empty string
    }
  }, [editItem]) //va a volver a ejecutarse cuando haya cambios en el state de esta propiedad, bajo la condición de arriba

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Add Task..."
        value={title}
        onChange={handleChange} //ir propagando los cambios
        required
        className="task-input"
      />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
          {editItem ? 'Edit Task' : 'Add Task'}
        </button>
        <button className="btn clear-btn" onClick={clearList}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default TaskForm
