<script lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'

import { savedLocationsStore } from '@/stores/savedLocationsStore'

import WeatherView from '@/views/WeatherView.vue'

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
    WeatherView
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="13"
            height="13"
            fill="currentColor"
          >
            <path
              d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"
            />
          </svg>
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
