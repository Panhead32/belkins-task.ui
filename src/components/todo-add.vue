<template>
  <div>
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
      type="text"
      placeholder="Add a task "
      v-if="addFieldShow"
      @blur="addFieldShow = false"
    />
    <span v-else @click="addFieldShow = true">Add a task</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const addFieldShow = ref<boolean>(false);
</script>

<style lang="scss">
</style>