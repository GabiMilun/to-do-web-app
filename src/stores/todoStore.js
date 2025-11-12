import { makeAutoObservable } from 'mobx'

class TodoStore {
  todos = []

  constructor() {
    makeAutoObservable(this)
  }

}

const todoStore = new TodoStore()
export default todoStore
