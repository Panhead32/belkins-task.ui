<template>
  <div
    :class="['todo-input', { active: addFieldShow }]"
    @click="addFieldShow = true"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 8.75H11.25V0H8.75V8.75H0V11.25H8.75V20H11.25V11.25H20V8.75Z"
        fill="#7A7C8D"
      />
    </svg>
    <input
      ref="input"
      type="text"
      v-model="taskTitle"
      v-if="addFieldShow"
      @blur="addFieldShow = false"
      @keyup.escape="addFieldShow = false"
      @keyup.enter="addTask"
    />
    <div class="todo-input__placeholder" v-else>Add a task</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { TodoStore } from "../stores/store";
import { Todo } from "../models/todo.interface";
const store = TodoStore();

const addFieldShow = ref<boolean>(false);
const input = ref<any>(null);
watch(addFieldShow, async (newValue: boolean) => {
  if (newValue) {
    await nextTick();
    input.value.focus();
  }
});

const taskTitle = ref<string>("");
async function addTask() {
  const newItem: Todo = await store.createTodo(taskTitle.value);
  store.todos.push(newItem);
  taskTitle.value = "";
  addFieldShow.value = false;
}
</script>

<style lang="scss">
.todo-input {
  display: flex;
  align-items: center;
  background: #222435;
  box-shadow: 0 0 0 1px #535568, 0 0 0 2px transparent;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    .todo-input__placeholder {
      color: #fafafd;
    }
  }
  &.active {
    box-shadow: 0 0 0 2px #535568;
    background: #383a4c;
  }
  &__placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #7a7c8d;
  }

  svg {
    padding-right: 20px;
  }
  input {
    border: none;
    background: none;
    width: 100%;
    outline: none;
    font-size: 16px;
    color: #fafafd;
  }
}
</style>