<script lang="ts">
import { defineComponent } from 'vue'
import WeatherImage from '@/components/WeatherImage.vue'
import InfoBox from '@/components/InfoBox.vue'
import axios from 'axios'

import { useApiKeyStore } from '@/stores/apiKeyStore'
import { currentWeatherStore } from '@/stores/currentWeatherStore'

export default defineComponent({
  name: 'WeatherApp',
  data() {
    return {
      dataFetched: false,
      active: true,
      city: '',
      weather: 0,
      icon: 'cloudy',
      infoBoxData: [
        { header: 'SUNRISE', content: '' },
        { header: 'SUNSET', content: '' },
        { header: 'HUMIDITY', content: '' }
      ]
    }
  },
  computed: {
    apiKey() {
      const store = useApiKeyStore()
      return store.apiKey
    },
    currentWeather() {
      const store = currentWeatherStore()
      return store.weather
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    lat: {
      type: String,
      default: ''
    },
    lon: {
      type: String,
      default: ''
    }
  },
  components: {
    WeatherImage,
    InfoBox
  },
  methods: {
    async getWeather() {
      // const weather =
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`
        )
        .then((response) => {
          // console.log(response)
          this.weather = response.data.main.temp.toFixed(0)
          this.city = response.data.name
          this.icon = response.data.weather[0].icon
          this.infoBoxData[0].content = new Date(
            response.data.sys.sunrise * 1000
          ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          this.infoBoxData[1].content = new Date(
            response.data.sys.sunset * 1000
          ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          this.infoBoxData[2].content = response.data.main.humidity + '%'

          const store = currentWeatherStore()
          store.setWeatherData({
            name: this.city,
            lat: this.lat,
            lon: this.lon
          })

          this.dataFetched = true
          this.$emit('data-fetched', this.dataFetched)
        })
        .catch((error) => {
          console.log(error)
          // @ts-ignore
          this.$message.error('Error fetching weather data')
        })
    }
  },
  mounted() {
    if (this.lat && this.lon) {
      this.getWeather()
    } else {
      this.dataFetched = false
      // @ts-ignore
      // this.$message.error('Error: bad weather data')
    }
  }
})
</script>

<template>
  <main>
    <a-skeleton-image v-if="!dataFetched" style="margin-bottom: 30px" />
    <WeatherImage v-else :name="icon" />

    <a-skeleton-input
      v-if="!dataFetched"
      style="width: 200px; margin-bottom: 30px"
      :active="active"
      size="small"
    />
    <h2 v-else @click="getWeather">
      {{ city }}
    </h2>
    <a-skeleton-avatar
      v-if="!dataFetched"
      style="margin-bottom: 30px"
      :active="true"
      size="large"
      shape="circle"
    />
    <h1 v-else @click="getWeather">{{ weather }}&deg;</h1>

    <a-skeleton-input v-if="!dataFetched" :active="active" size="large" />
    <InfoBox v-else :params="infoBoxData" />
    <!-- {{ lat }} {{ lon }} -->
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h2 {
  font-size: 2rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
  text-align: center;
  margin-top: 15px;
}

h1 {
  font-size: 4rem;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
}
</style>
