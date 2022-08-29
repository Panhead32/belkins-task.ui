import { defineStore } from "pinia";
import axios from "axios";
import { Todo } from "../models/todo.interface";

const location: string = 'https://belkins-task.herokuapp.com'

interface body {
  title?: string;
  done?: boolean;
}

export const TodoStore = defineStore('main', {
  state: () => ({
    todos: [] as Todo[],
  }),
  getters: {},
  actions: {
    setTasks() {
      this.todos
    },
    async getTodos() {
      try {
        const { data } = await axios.get(`${location}/todo`);
        return data
      } catch (error) {
        console.error(error);
      }
    },
    async createTodo(title: string) {
      try {
        const { data } = await axios.post(`${location}/todo`, {
          title
        });
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    async removeTodo(id: string) {
      try {
        await axios.delete(`${location}/todo/${id}`);
      } catch (error) {
        console.error(error);
        
      }
    },
    async updateTodo(id: string, body: body) {
      try {
        const { data } = await axios.put(`${location}/todo/${id}`, body);
        return data;
      } catch (error) {
        console.error(error);
        
      }
    }
  }
})