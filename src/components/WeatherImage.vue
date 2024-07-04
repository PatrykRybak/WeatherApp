<template>
  <img :alt="alt" :src="imageUrl" class="weather-image" />
  <!-- src="@/assets/icons/weather/day_partial_cloud.png" -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherImage',
  props: {
    alt: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    imageUrl() {
      return `/weather/${this.name}.png`
    }
  }
})
</script>

<style scoped>
.weather-image {
  width: 226px;
  height: 226px;
  pointer-events: none;
}
</style>
