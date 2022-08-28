
<template>
  <Suspense>
    <TodoList />
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup lang="ts">
import TodoList from "./components/todo-list.vue";
</script>

<style scoped>
</style>
