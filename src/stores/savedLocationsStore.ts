import { defineStore } from 'pinia'

export const savedLocationsStore = defineStore('savedLocationsStore', {
  state: () => ({
    locations: {
      London: {
        lat: 51.51,
        lon: -0.13
      },
      Paris: {
        lat: 48.85,
        lon: 2.35
      }
    }
  }),
  actions: {
    addLocation(key: string) {
      //   this.apiKey = key
    },
    removeLocation(key: string) {
      //   this.apiKey = key
    },
    saveLocations() {
      //   this.apiKey = key
    }
  }
})
