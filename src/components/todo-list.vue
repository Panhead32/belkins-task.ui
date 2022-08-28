<script setup lang="ts">
import { TodoStore } from "../stores/store";
import { reactive, ref, computed } from "vue";
import { getTodos, removeTodo } from "../service/todos";
import TodoAdd from "./todo-add.vue";
import TodoItem from "./todo-item.vue";

const store = TodoStore();

interface Todo {
  title: string;
  _id: string;
  done: boolean;
  __v?: number;
}
const tasks: Todo[] = reactive(await getTodos());

const doneTodos = computed(() => tasks.filter((task) => task.done));
const todos = computed(() => tasks.filter((task) => !task.done));

function removeTask(id: string): void {
  try {
    removeTodo(id);
    const index = tasks.findIndex((task) => task._id === id);
    tasks.splice(index, 1);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="todo-list">
    <div class="todo-list__title">To-do list</div>
    <TodoAdd class="todo-list__add"></TodoAdd>
    <div class="todo-list__todo">
      <TodoItem
        v-for="todo in todos"
        :key="todo._id"
        :task="todo"
        @remove="removeTask(todo._id)"
      />
    </div>
    <div class="todo-list__done">
      <TodoItem
        v-for="todo in doneTodos"
        :key="todo._id"
        :task="todo"
        @remove="removeTask(todo._id)"
      />
    </div>
  </div>
</template>

<style lang="scss">
</style>