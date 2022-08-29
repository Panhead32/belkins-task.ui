<template>
  <div
    :class="[{ active: addFieldShow }, 'task-add']"
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
      v-if="addFieldShow"
      @blur="addFieldShow = false"
      @keyup.escape="addFieldShow = false"
    />
    <div class="task-add__placeholder" v-else>Add a task</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

const addFieldShow = ref<boolean>(false);
const input = ref<any>(null);
watch(addFieldShow, async (newValue: boolean) => {
  if (newValue) {
    await nextTick();
    input.value.focus();
  }
});
</script>

<style lang="scss">
.active {
  background: #383a4c;
  border: 2px solid #535568;
}
.task-add {
  border: 1px solid #535568;
  font-weight: 400;
  color: #7a7c8d;
  cursor: pointer;
  &__placeholder {
    width: 100%;
  }
  &:hover {
    color: #fafafd;
  }
  svg {
    padding-right: 20px;
  }
  input {
    border: unset;
    background: none;
    width: 100%;
    outline: none;
    font-size: 16px;
    color: #fafafd;
  }
}
</style>