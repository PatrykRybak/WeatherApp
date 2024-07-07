<script lang="ts">
import { Button } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { CloseOutlined } from '@ant-design/icons-vue'

import { savedLocationsStore } from '@/stores/savedLocationsStore'
import { currentWeatherStore } from '@/stores/currentWeatherStore'

import WeatherView from '@/views/WeatherView.vue'

export default {
  name: 'WeatherApp',
  data() {
    return {
      alreadyAdded: false
    }
  },
  components: {
    'a-button': Button,
    LeftOutlined,
    PlusOutlined,
    CloseOutlined,
    WeatherView
  },
  computed: {
    lat() {
      return this.$route.query.lat
    },
    lon() {
      return this.$route.query.lon
    },
    currentWeather() {
      const store = currentWeatherStore()
      return store.weather
    }
  },
  methods: {
    checkIfInDrawer(dataFetched: boolean) {
      console.log('checking')
      const locationStore = savedLocationsStore()
      this.alreadyAdded = false
      if (this.lat && this.lon) {
        if (locationStore.isInDrawer(this.currentWeather)) {
          this.alreadyAdded = true
        } else {
          this.alreadyAdded = false
        }
      }
    },
    addToDrawer() {
      const locationStore = savedLocationsStore()
      locationStore.addLocation(this.currentWeather)
      this.alreadyAdded = true
      // @ts-ignore
      this.$message.success('Saved!')
    },
    removeFromDrawer() {
      const locationStore = savedLocationsStore()
      locationStore.removeLocation(this.currentWeather)
      this.alreadyAdded = false
      // @ts-ignore
      this.$message.info('Removed from drawer')
    }
  }
}
</script>

<template>
  <main>
    <div class="top-bar">
      <RouterLink to="/search">
        <a-button shape="circle" size="large">
          <LeftOutlined />
        </a-button>
      </RouterLink>
      <a-button v-if="!alreadyAdded" shape="circle" size="large" @click="addToDrawer">
        <PlusOutlined />
      </a-button>
      <a-button v-else danger shape="circle" size="large" @click="removeFromDrawer">
        <CloseOutlined />
      </a-button>
    </div>
    <WeatherView :lat="String(lat)" :lon="String(lon)" @data-fetched="checkIfInDrawer" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}
.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabs {
  width: 100%;
}
</style>
