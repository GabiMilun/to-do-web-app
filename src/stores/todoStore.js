import { makeAutoObservable } from 'mobx'

class TodoStore {
//   todos = []

//   constructor() {
//     makeAutoObservable(this)
//   }

//   addTodo(title) {
//     const trimmed = String(title || '').trim()
//     if (!trimmed) return

//     this.todos.push({
//       id: Date.now(),
//       title: trimmed,
//       done: false,
//     })
//   }

//   removeTodo(id) {
//     this.todos = this.todos.filter(t => t.id !== id)
//   }

//   toggleTodo(id) {
//     const t = this.todos.find(x => x.id === id)
//     if (t) t.done = !t.done
//   }


    todos = []

    constructor(){
        makeAutoObservable(this);
    }

    addTodo(title){
        this.todos.push({
            id: Date.now(),
            title: title,
            done: false
        })
    }

    removeTodo(id){
        this.todos = this.todos.filter(x => x.id != id);
    }

    toggleTodo(id){
        const x = this.todos.find(e => e.id == id);
        if (x){
            x.done = !x.done;
        }
    }

}

const todoStore = new TodoStore()
export default todoStore
