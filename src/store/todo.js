import { createStore } from '@mpxjs/core'

const todoStore = createStore({
  state: {
    todoList: [{
      text: '123', done: true
    }, {
      text: '456', done: false
    }]
  },
  mutations: {
    addTodo(state, payload) {
      const newTodo = {
        text: payload,
        done: false
      }
      state.todoList.push(newTodo)
    },
    toggleTodo(state, index) {
      const todoItem = state.todoList[index]
      todoItem.done = !todoItem.done
    },
    deleteTodo(state, index) {
      state.todoList.splice(index, 1)
    },
    deleteAllDone(state) {
      state.todoList = state.todoList.filter(item => !item.done)
    },
    toggleAll(state, payload) {
      state.todoList.forEach(item => {
        item.done = payload
      })
    }
  }
})
export default todoStore
