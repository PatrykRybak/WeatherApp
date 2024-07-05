import { defineStore } from 'pinia'

export const currentWeatherStore = defineStore('currentWeatherStore', {
  state: (): { weather: { name: string; lat: string; lon: string } } => ({
    weather: {
      name: '',
      lat: '',
      lon: ''
    }
  }),
  actions: {
    setWeatherData(data: { name: string; lat: string; lon: string }) {
      this.weather = data
    },
    getWeatherData() {
      return this.weather
    }
  }
})
