<template>
  <div class="todo container">
    <div class="todo-title">To-do list</div>
    <TodoAdd />
    <div v-if="todos.length" class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo._id"
        :task="todo"
        @remove="removeTask(todo._id)"
      />
    </div>
    <div v-if="doneTodos.length" class="todo-list__done">
      <TodoItem
        v-for="todo in doneTodos"
        :key="todo._id"
        :task="todo"
        @remove="removeTask(todo._id)"
      />
    </div>
  </div>
</template>

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



<style lang="scss">
body * {
  font-family: "Inter", sans-serif;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
.todo {
  padding: 40px 0;
  &-input {
  }
  &-title {
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: #535568;
    margin-bottom: 30px;
  }
  &-list {
    border-bottom: 1px solid #383a4c;
    padding-bottom: 20px;
    &__done {
      padding-top: 20px;
      &:before {
        content: "Completed";
        background: #1e446e;
        border-radius: 4px;
        padding: 6px 8px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #4ea2ff;
        margin-bottom: 20px;
        display: inline-block;
        &::before{
          content:'';
          background-image:url('../assets/marked.svg');
        }
      }
    }
  }
}
</style>