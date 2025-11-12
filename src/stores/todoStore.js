import { makeAutoObservable } from 'mobx'

class TodoStore {

    todos = []
    filter = null // null | 'active' | 'completed'
    editText = {} // { [todoId]: 'text edit' }

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

    counterTodo(){
        return this.todos.length;
    }

    trueTodo(){
        return this.todos.filter(e => e.done == true)
    }

    falseTodo(){
        return this.todos.filter(e => e.done == false)
    }

    setFilter(filterType){
        this.filter = filterType;
    }

    setEditText(todoId, text){
        this.editText[todoId] = text;
    }

    editTodo(id, newTitle){
        const x = this.todos.find(e => e.id === id);
        if (x && newTitle) {
            x.title = newTitle;
            this.editText[id] = ''; 
        }
    }

    clearCompletedTodo(){
        this.todos = this.todos.filter(e => e.done == false);
    }

}

const todoStore = new TodoStore()
export default todoStore
