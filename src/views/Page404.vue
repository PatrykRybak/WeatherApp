<script lang="ts">
import WeatherImage from '@/components/WeatherImage.vue'

export default {
  name: 'ErrorPage404',
  data() {
    return {
      code: 404,
      message: 'Not Found',
      icon: 'angry_clouds'
    }
  },
  components: {
    WeatherImage
  }
}
</script>

<template>
  <div class="page404">
    <WeatherImage alt="Oops" :name="icon" />
    <h1>{{ code }} - {{ message }}</h1>
    <a href="/">Go back to home</a>
  </div>
</template>

<style scoped>
.page404 {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
