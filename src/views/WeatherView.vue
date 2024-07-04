<script lang="ts">
import WeatherImage from '@/components/WeatherImage.vue'
import InfoBox from '@/components/InfoBox.vue'
import axios from 'axios'

export default {
  name: 'WeatherApp',
  data() {
    return {
      city: 'Białystok',
      weather: 19,
      icon: 'day_partial_cloud',
      infoBoxData: [
        { header: 'TIME', content: '21:37' },
        { header: 'UV', content: this.lat },
        { header: 'RAIN', content: '58%' },
        { header: 'AQ', content: this.lon }
      ]
    }
  },
  components: {
    WeatherImage,
    InfoBox
  },
  props: {
    lat: {
      type: String
    },
    lon: {
      type: String
    }
  }
}
</script>

<template>
  <main>
    <WeatherImage alt="Partly cloudy" :name="icon" />
    <h2>
      {{ city }}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="17px" height="17px">
        <path
          d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
        />
      </svg>
    </h2>
    <h1>{{ weather }}&deg;</h1>
    <InfoBox :params="infoBoxData" />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 2rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}

h1 {
  font-size: 4rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
