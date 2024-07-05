<template>
  <div class="weather-image-container">
    <img :alt="name" :src="imageUrl" class="weather-image" loading="lazy" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherImage',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  watch: {
    name: {
      immediate: true,
      handler(newName) {
        this.imageUrl = `/weather/${newName}.png`
      }
    }
  }
})
</script>

<style scoped>
.weather-image-container {
  width: 226px;
  height: 226px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-image {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
