import style from './ToMakeSandwich.module.css'
import ProgressBar from './ProgressBar'
import TodoItem from './TodoItem'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import InputSection from './InputSection'

// TODO:
//   1. Add "set deadline" button (done)
//   2. It starts white and if you don't use it, the time doesn't show (done)
//   3. It turns blue (or whatever color) and the date is added (done)
//   4. If deadline is reached it turns red (or something like that)

export default function ToMakeSandwich() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  )
  const [inputValue, setInputValue] = useState('')
  const [deadlineValue, setDeadlineValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const appendTodos = () => {
    setTodos(todos => [
      ...todos,
      {
        id: nanoid(),
        text: inputValue,
        date: deadlineValue !== '' ? new Date(deadlineValue).getTime() : null,
        done: false,
        editValue: null
      }
    ])
  }

  const handleAddButtonClick = () => {
    if (inputValue.trim().length !== 0) appendTodos()
    setInputValue('')
    setDeadlineValue('')
  }

  const handleInputKeyUp = e => {
    if (e.key === 'Enter') handleAddButtonClick()
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
                todo.editValue.trim().length === 0 ? todo.editValue : null
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
      <h1 className={style.title}>My To-Do-Sandwich</h1>
      <ProgressBar progress={progress} />
      <ul data-empty={todos.length === 0} className={style.todoList}>
        {todoElements}
      </ul>
      <InputSection
        onInputChange={e => setInputValue(e.target.value)}
        onDeadlineChange={e => setDeadlineValue(e.target.value)}
        onInputKeyUp={handleInputKeyUp}
        onAddButtonClick={handleAddButtonClick}
        inputValue={inputValue}
        deadlineValue={deadlineValue}
      />
    </div>
  )
}
