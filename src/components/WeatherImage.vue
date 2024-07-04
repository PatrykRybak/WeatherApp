<template>
  <div class="weather-image-container">
    <!-- {{ name }} -->
    <a-skeleton-image v-if="loading || !imageUrl" />
    <img v-else :alt="name" :src="imageUrl" class="weather-image" @load="onImageLoad" />
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
      loading: true,
      imageUrl: ''
    }
  },
  watch: {
    name: {
      immediate: true,
      handler(newName) {
        this.loading = false
        this.imageUrl = `/weather/${newName}.png`
      }
    }
  },
  methods: {
    // updateImageUrl() {
    //   if (this.name) {
    //     this.imageUrl = `/weather/${this.name}.png`
    //   } else {
    //     this.imageUrl = ''
    //   }
    // },
    onImageLoad() {
      this.loading = false
      console.log('Image loaded')
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
