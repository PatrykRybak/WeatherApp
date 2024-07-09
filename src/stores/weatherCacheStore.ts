import { a } from 'node_modules/@tanstack/vue-query/build/legacy/useQuery-JLP2sK49'
import { defineStore } from 'pinia'

export interface LocationsWeather {
  name: string
  lat: string
  lon: string
  dateOfSearch: Date
  icon: string
  temperature: number
  sunrise: number
  sunset: number
  humidity: number
}

export const weatherCacheStore = defineStore('weatherCacheStore', {
  state: () => ({}),
  actions: {}
})
