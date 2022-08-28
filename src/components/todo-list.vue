<script setup lang="ts">
import { TodoStore } from "../stores/store";
import { reactive, ref, computed } from "vue";
import TodoAdd from "./todo-add.vue";
import TodoItem from "./todo-item.vue";

const store = TodoStore();

interface Todo {
  title: string;
  _id: string;
  done: boolean;
  __v?: number;
}
const tasks: Todo[] = reactive(await store.getTodos());

const doneTodos = computed(() => tasks.filter((task) => task.done));
const todos = computed(() => tasks.filter((task) => !task.done));

function removeTask(id: string): void {
  try {
    store.removeTodo(id);
    const index = tasks.findIndex((task) => task._id === id);
    tasks.splice(index, 1);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <div>To-do list</div>
    <TodoAdd></TodoAdd>
    <div>
      <TodoItem
        class="task"
        v-for="todo in todos"
        :key="todo._id"
        :task="todo"
        @remove="removeTask(todo._id)"
      />
    </div>
    <div>
      <TodoItem
        class="task"
        v-for="todo in doneTodos"
        :key="todo._id"
        :task="todo"
        @remove="removeTask(todo._id)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.task {
  border: 1px solid #535568;
  border-radius: 10px;
  display: flex;
  background-color: #383a4c;
  color: #fff;
}
</style>