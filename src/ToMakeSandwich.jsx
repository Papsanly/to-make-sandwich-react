import style from './ToMakeSandwich.module.css'
import ProgressBar from './ProgressBar'
import TodoItem from './TodoItem'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

export default function ToMakeSandwich() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  )
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const appendTodos = () => {
    setTodos(todos => [
      ...todos,
      {
        id: nanoid(),
        text: inputValue,
        date: Date.now(),
        done: false,
        editValue: null,
      },
    ])
  }

  const handleButtonClick = () => {
    if (inputValue.trim().length !== 0) {
      appendTodos()
    }
    setInputValue('')
  }

  const handleInputKeyUp = e => {
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  const toggleDone = e => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === e.target.id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = e => {
    setTodos(todos => todos.filter(todo => todo.id !== e.target.id))
  }

  const editTodo = e => {
    e.stopPropagation()
    setTodos(todos =>
      todos.map(todo =>
        todo.id === e.target.id ? { ...todo, editValue: todo.text } : todo
      )
    )
  }

  const saveEditedTodo = e => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === e.target.id
          ? {
              ...todo,
              text:
                todo.editValue.trim().length === 0 ? todo.text : todo.editValue,
              editValue:
                todo.editValue.trim().length === 0 ? todo.editValue : null,
            }
          : todo
      )
    )
  }

  const cancelEditedTodo = e => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === e.target.id ? { ...todo, editValue: null } : todo
      )
    )
  }

  const changeTodoEditValue = e => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === e.target.id ? { ...todo, editValue: e.target.value } : todo
      )
    )
  }

  const todoElements = todos.map(item => (
    <TodoItem
      key={item.id}
      {...item}
      onClick={toggleDone}
      onDeleteButtonClick={deleteTodo}
      onEditButtonClick={editTodo}
      onSaveButtonClick={saveEditedTodo}
      onCancelButtonClick={cancelEditedTodo}
      onEditInputChange={changeTodoEditValue}
    />
  ))

  const progress = todos.filter(todo => todo.done).length / todos.length || 0

  return (
    <div className={style.toMakeSandwich}>
      <h1 className={style.title}>My To-Do-List</h1>
      <ProgressBar progress={progress} />
      <ul>{todoElements}</ul>
      <div className={style.inputSection}>
        <input
          placeholder={'What do u want to do?'}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyUp={handleInputKeyUp}
        />
        <button onClick={handleButtonClick}>Add</button>
      </div>
    </div>
  )
}
