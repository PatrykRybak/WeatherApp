<template>
  <main>
    <div class="top-bar">
      <div class="navigation">
        <RouterLink to="/">
          <a-button size="large" shape="circle" class="back-btn">
            <LeftOutlined />
          </a-button>
        </RouterLink>
        <a-input-search
          v-model:value="value"
          size="large"
          placeholder="Enter city name"
          @search="onSearch"
        />
      </div>
      <div class="tags">
        <!-- @close="log" -->
        <a-tag closable color="#108ee9" :bordered="false">Białystok</a-tag>
        <a-tag closable color="#108ee9" :bordered="false">New York</a-tag>
        <a-tag closable color="#108ee9" :bordered="false">Tokio</a-tag>
      </div>
    </div>
    <div class="results" id="results">
      <SearchItem
        v-for="result in searchResults"
        :key="`${result.city}-${result.state}-${result.country}`"
        :city="result.city"
        :country="result.country"
        :state="result.state"
        :lat="result.lat"
        :lon="result.lon"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import axios from 'axios'

import SearchItem from '@/components/SearchItem.vue'

export default {
  name: 'SearchView',
  data() {
    return {
      apiKey: '72b0fa580cebb312a5bf50b04b322b1c',
      value: '',
      searchResults: []
    }
  },
  components: {
    'a-button': Button,
    LeftOutlined,
    SearchItem
  },
  methods: {
    async onSearch(value) {
      if (value.length >= 3) {
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=10&appid=${this.apiKey}`
          )

          // console.log(response.data)
          const seenCoordinates = new Set()
          this.searchResults = []
          response.data.forEach((location) => {
            const lat = Math.round(location.lat, 2)
            const lon = Math.round(location.lon, 2)
            const coordinateKey = `${lat},${lon}`

            if (!seenCoordinates.has(coordinateKey)) {
              this.searchResults.push({
                city: location.name, //result.local_names[result.country.toLowerCase()] ||
                country: location.country,
                state: location.state,
                lat: location.lat.toString(),
                lon: location.lon.toString()
              })
              seenCoordinates.add(coordinateKey)
            }
          })
        } catch (error) {
          this.$message.error('Error fetching search results')
        }
      }
    }
  }
}
</script>

<style>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}
.top-bar {
  postion: fixed;
}
.navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.back-btn {
  margin-right: 15px;
}
.tags {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}
.results {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
RouterLink {
  text-decoration: none;
  color: #fab;
}
</style>
