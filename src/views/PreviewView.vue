<script lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { CloseOutlined } from '@ant-design/icons-vue'

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
    }
  },
  methods: {
    addToDrawer() {
      this.alreadyAdded = true
    },
    removeFromDrawer() {
      this.alreadyAdded = false
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
      <a-button v-if="alreadyAdded" danger shape="circle" size="large" @click="removeFromDrawer">
        <CloseOutlined />
      </a-button>
    </div>
    <WeatherView :lat="String(lat)" :lon="String(lon)" />
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
