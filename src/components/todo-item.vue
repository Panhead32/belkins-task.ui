<template>
  <div class="todo-item">
    <div class="todo-item__inner">
      <input
        class="todo-item__checkbox"
        type="checkbox"
        :id="task._id"
        v-model="task.done"
        @click.stop="editStatus(task._id)"
      />
      <label :for="task._id"></label>
      <span
        v-if="!editCurrentItem"
        :class="['todo-item__title', { done: task.done }]"
        @click="editItemTitle"
        >{{ task.title }}</span
      >
      <input
        v-model="currentItemTitle"
        v-else
        ref="input"
        type="text"
        @blur="editCurrentItem = false"
        @keyup.esc="editCurrentItem = false"
        @keyup.enter="editTitle"
      />
    </div>
    <div class="todo-item__action" @click.stop="$emit('remove')">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5745 0.43434C11.4092 0.26865 11.1848 0.175535 10.9507 0.175535C10.7167 0.175535 10.4922 0.26865 10.3269 0.43434L6.00002 4.75238L1.67313 0.425491C1.50782 0.259802 1.28338 0.166687 1.04932 0.166687C0.815262 0.166687 0.590821 0.259802 0.425504 0.425491C0.0804147 0.770581 0.0804147 1.32803 0.425504 1.67312L4.75239 6.00001L0.425504 10.3269C0.0804147 10.672 0.0804147 11.2294 0.425504 11.5745C0.770593 11.9196 1.32804 11.9196 1.67313 11.5745L6.00002 7.24765L10.3269 11.5745C10.672 11.9196 11.2294 11.9196 11.5745 11.5745C11.9196 11.2294 11.9196 10.672 11.5745 10.3269L7.24765 6.00001L11.5745 1.67312C11.9108 1.33688 11.9108 0.770581 11.5745 0.43434Z"
          fill="#9799AD"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, nextTick } from "vue";
import { TodoStore } from "../stores/store";
const store = TodoStore();

const props = defineProps<{
  task: any;
}>();

const editCurrentItem = ref<boolean>(false);
const currentItemTitle = ref<string>("");

const input = ref<any>(null);
async function editItemTitle() {
  if (!props.task.done) {
    editCurrentItem.value = true;
    await nextTick();
    input.value.focus();
    currentItemTitle.value = props.task.title;
  }
}
async function editTitle() {
  const item = await store.updateTodo(props.task._id, {
    title: currentItemTitle.value,
  });
  props.task.title = currentItemTitle.value;
  editCurrentItem.value = false;
}
async function editStatus(id: string) {
  const item = await store.updateTodo(id, {
    done: !props.task.done,
  });
}
</script>

<style lang="scss">
.todo-item {
  background: #383a4c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background: #535568;
    transition: 0.2s;
  }
  &:last-child {
    margin-bottom: unset;
  }
  &__inner {
    display: flex;
    align-items: center;
    width: 100%;
    label {
      padding-right: 20px;
    }
    .done {
      text-decoration-line: line-through;
      color: #9799ad;
    }
    input[type="text"] {
      border: none;
      background: none;
      width: 100%;
      outline: none;
      font-size: 16px;
      color: #fafafd;
    }
  }
  &__checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  &__checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }
  &__checkbox + label::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    // box-shadow: 0 0 0 2px #67697a;
    border: 2px solid #67697a;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  &__checkbox:checked + label::before {
    border-color: #4ea2ff;
    background-color: #4ea2ff;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%222435' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
  }
}
</style>