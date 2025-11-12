import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import todoStore from './stores/todoStore'

function App() {
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    todoStore.addTodo(text)
    setText('')
  }

  function handleEdit(todoId) {
    const newTitle = todoStore.editText[todoId]
    if (newTitle && newTitle.trim()) {
      todoStore.editTodo(todoId, newTitle.trim())
    }
  }

  return (

    <>
      <h1>To-do lista</h1>
      <form onSubmit={submit}>
        <input type="text" name='naziv-to-do' placeholder='Unesite novi to-do' value={text} onChange={(e) => setText(e.target.value)} />
        <button type='submit'>Dodaj to-do</button>
      </form>
      <ul>
        {todoStore.todos.length == 0 && <li>Lista je prazna</li>}
        {todoStore.todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => todoStore.toggleTodo(todo.id)} />
            <span>{todo.title}</span>
            <button onClick={() => todoStore.removeTodo(todo.id)}>Izbrisi me</button>
          </li>
          
        ))}
      </ul>
      {todoStore.todos.some(t => t.done) && (
        <button onClick={() => todoStore.clearCompletedTodo()}>
        Obriši sve dovršene
        </button>
      )}
      {todoStore.todos.length > 0 && <h3>Lista ima {todoStore.counterTodo()} stavki</h3>}
      <br />
      <br />
      <h4>filter</h4>
      {todoStore.counterTodo() > 0 && <button onClick={() => todoStore.setFilter('active')}>Nedovrseni</button>}
      {todoStore.counterTodo() > 0 && <button onClick={() => todoStore.setFilter('completed')}>Dovrseni</button>}
      {todoStore.counterTodo() > 0 && <button onClick={() => todoStore.setFilter(null)}>Sakrij</button>}
      
      {todoStore.filter === 'active' && (
        <ul>
          {todoStore.falseTodo().map(todo => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.done} onChange={() => todoStore.toggleTodo(todo.id)} />
              <span>{todo.title}</span>
              <button onClick={() => todoStore.removeTodo(todo.id)}>Izbrisi me</button>
            </li>
          ))}
        </ul>
      )}

      {todoStore.filter === 'completed' && (
        <ul>
          {todoStore.trueTodo().map(todo => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.done} onChange={() => todoStore.toggleTodo(todo.id)} />
              <span>{todo.title}</span>
              <button onClick={() => todoStore.removeTodo(todo.id)}>Izbrisi me</button>
            </li>
          ))}
        </ul>
      )}

      <h4>editaj todo</h4>
        {todoStore.todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => todoStore.toggleTodo(todo.id)} />
            <span>{todo.title}</span>
            <input 
              type="text" 
              placeholder="Novi naziv"
              value={todoStore.editText[todo.id] || ''} 
              onChange={(e) => todoStore.setEditText(todo.id, e.target.value)} 
            />
            <button onClick={() => handleEdit(todo.id)}>promijeni naziv</button>
          </li>
          
        ))}
    </>
    
  )
}

export default observer(App)
