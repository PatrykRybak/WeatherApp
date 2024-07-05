<script lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'

import WeatherView from '@/views/WeatherView.vue'

export default {
  name: 'WeatherApp',
  data() {
    return {
      location: null as null | { latitude: string; longitude: string },
      error: null as null | string,
      activeKey: '1'
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
    <a-tabs v-model:activeKey="activeKey" centered class="tabs">
      <a-tab-pane key="1">
        <template #tab>
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="13"
            height="13"
            fill="currentColor"
          >
            <path
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            />
          </svg> -->
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
          <!-- Location -->
        </template>

        <!-- <div v-if="error">{{ error }}</div>
        <div v-if="location">
          <p>Latitude: {{ location.latitude }}</p>
          <p>Longitude: {{ location.longitude }}</p>
        </div> -->

        <WeatherView v-if="location" :lat="location.latitude" :lon="location.longitude" />
        <WeatherView v-else />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Białystok"><WeatherView /></a-tab-pane>
      <a-tab-pane key="3" tab="Tokio"><WeatherView /></a-tab-pane>
    </a-tabs>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}
.toLeft {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tabs {
  width: 100%;
}
</style>
