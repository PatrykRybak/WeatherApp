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
        <a-tag
          v-for="location in savedLocations"
          :key="`${location.name}-${location.lat}-${location.lon}`"
          closable
          color="#108ee9"
          :bordered="false"
          style="margin-top: 6px"
          @close="updateLocations(location)"
        >
          {{ location.name }}
        </a-tag>
      </div>
    </div>
    <div class="results" id="results">
      <div v-if="noResults">No results found</div>
      <SearchItem
        v-else
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
import { Button } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import axios from 'axios'

import { useApiKeyStore } from '@/stores/apiKeyStore'
import { savedLocationsStore } from '@/stores/savedLocationsStore'

import SearchItem from '@/components/SearchItem.vue'

export default {
  name: 'SearchView',
  data() {
    return {
      value: '',
      searchResults: [] as {
        city: string
        country: string
        state: string
        lat: string
        lon: string
      }[],
      noResults: false
    }
  },
  components: {
    'a-button': Button,
    LeftOutlined,
    SearchItem
  },
  computed: {
    apiKey() {
      const store = useApiKeyStore()
      return store.apiKey
    },
    savedLocations() {
      const store = savedLocationsStore()
      return store.locations
    }
  },
  methods: {
    async onSearch(value: string) {
      if (value.length >= 3) {
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=10&appid=${this.apiKey}`
          )

          if (response.data.length !== 0) {
            this.noResults = false
            const seenCoordinates = new Set()
            this.searchResults = []
            response.data.forEach(
              (location: {
                lat: number
                lon: number
                name: string
                country: string
                state: string
              }) => {
                const lat = Math.round(location.lat)
                const lon = Math.round(location.lon)
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
              }
            )
          } else {
            this.noResults = true
          }
        } catch (error) {
          // @ts-ignore
          this.$message.error('Error fetching search results')
        }
      }
    },
    updateLocations(location: { name: string; lat: string; lon: string }) {
      const store = savedLocationsStore()

      console.log(store.locations)

      store.removeLocation(location)
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
/* .top-bar {
  position: fixed;
} */
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
  flex-wrap: wrap;
  text-align: center;
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
