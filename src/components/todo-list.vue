<script setup lang="ts">
import { TodoStore } from "../stores/store";
import { computed } from "vue";
import TodoAdd from "./todo-add.vue";
import TodoItem from "./todo-item.vue";

const store = TodoStore();
store.todos = await store.getTodos();

const doneTodos = computed(() => store.todos.filter((task) => task.done));
const todos = computed(() => store.todos.filter((task) => !task.done));

function removeTask(id: string): void {
  try {
    store.removeTodo(id);
    const index = store.todos.findIndex((task) => task._id === id);
    store.todos.splice(index, 1);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <div>To-do list</div>
    <TodoAdd class="task" />
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
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 16px;
  padding: 0 20px;
  font-family: "Inter", sans-serif;
}
</style>