import { defineStore } from "pinia";

export const TodoStore = defineStore('main', {
  state: () => ({
    todos: [],
    
  }),
  getters: {},
  actions: {}
})