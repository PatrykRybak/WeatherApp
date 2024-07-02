<script lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h3>{{ msg }}</h3>
  </div>
</template>

<style scoped>
/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
