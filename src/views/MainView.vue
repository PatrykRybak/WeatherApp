<script lang="ts">
import { Button } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'

import { savedLocationsStore } from '@/stores/savedLocationsStore'

import WeatherView from '@/views/WeatherView.vue'
import GpsImage from '@/components/GpsImage.vue'

export default {
  name: 'WeatherApp',
  data() {
    return {
      location: null as null | { latitude: string; longitude: string },
      error: null as null | string,
      activeKey: '0'
    }
  },
  components: {
    'a-button': Button,
    SearchOutlined,
    WeatherView,
    GpsImage
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback)
      } else {
        // @ts-ignore
        this.$message.error('Geolocation not supported')
      }
    },
    successCallback(position: any) {
      this.location = {
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString()
      }
      this.error = null
    },
    errorCallback(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // @ts-ignore
          this.$message.error('User denied Geolocation')
          break
        case error.POSITION_UNAVAILABLE:
          // @ts-ignore
          this.$message.error('Location data unavailable')
          break
        case error.TIMEOUT:
          // @ts-ignore
          this.$message.error('User location request timed out')
          break
        case error.UNKNOWN_ERROR:
          // @ts-ignore
          this.$message.error('Unknown error')
          break
      }
    }
  },
  computed: {
    savedLocations() {
      const store = savedLocationsStore()
      return store.locations
    }
  },
  mounted() {
    this.getLocation()
  }
}
</script>

<template>
  <main>
    <div class="toLeft">
      <RouterLink to="/search">
        <a-button shape="circle" size="large">
          <SearchOutlined />
        </a-button>
      </RouterLink>
    </div>
    <a-tabs
      v-model:activeKey="activeKey"
      size="small"
      centered
      tabPosition="top"
      class="tabs"
      type="line"
      :animated="true"
      style="width: 100%"
    >
      <a-tab-pane key="0">
        <template #tab>
          <GpsImage />
          Location
        </template>

        <WeatherView v-if="location" :lat="location.latitude" :lon="location.longitude" />
        <WeatherView v-else />
      </a-tab-pane>
      <a-tab-pane
        v-for="i in Object.keys(savedLocations).length"
        :key="i"
        :tab="`${savedLocations[i - 1].name}`"
      >
        <WeatherView :lat="savedLocations[i - 1].lat" :lon="savedLocations[i - 1].lon" />
      </a-tab-pane>
    </a-tabs>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  overflow-x: hidden;
}
.toLeft {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
}
.tabs {
  width: 100%;
}
</style>
