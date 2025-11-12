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

  return (

    <>
      <h1>To-do lista</h1>
      <form onSubmit={submit}>
        <input type="text" name='naziv-to-do' placeholder='Unesite novi to-do' onChange={(e) => setText(e.target.value)} />
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
      {todoStore.todos.length > 0 && <h3>Lista ima {todoStore.todos.length} stavki</h3>}
    </>
    
  )
}

export default observer(App)
