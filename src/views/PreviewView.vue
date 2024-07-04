<script lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'

import WeatherView from '@/views/WeatherView.vue'

export default {
  name: 'WeatherApp',
  data() {
    return {
      city: 'Białystok',
      weather: 19,
      icon: 'day_partial_cloud',
      infoBoxData: [
        { header: 'TIME', content: '21:37' },
        { header: 'UV', content: '4' },
        { header: 'RAIN', content: '58%' },
        { header: 'AQ', content: '2' }
      ]
    }
  },
  components: {
    'a-button': Button,
    LeftOutlined,
    WeatherView
  },
  computed: {
    lat() {
      return this.$route.query.lat
    },
    lon() {
      return this.$route.query.lon
    }
  }
}
</script>

<template>
  <main>
    <div class="toLeft">
      <RouterLink to="/search">
        <a-button shape="circle" size="large">
          <LeftOutlined />
        </a-button>
      </RouterLink>
    </div>
    <WeatherView :lat="lat" :lon="lon" />
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
  justify-content: flex-start;
  align-items: center;
}
.tabs {
  width: 100%;
}
</style>
