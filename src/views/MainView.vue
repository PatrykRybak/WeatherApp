<script setup lang="ts">
import { RouterLink } from 'vue-router'
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <img alt="Partly cloudy" src="@/assets/icons/partlyCloudy.png" width="50" height="50" />
  <main>
    <h1>Weather App</h1>
  </main>
  <nav>
    <RouterLink to="/search">search</RouterLink>
  </nav>
</template>
