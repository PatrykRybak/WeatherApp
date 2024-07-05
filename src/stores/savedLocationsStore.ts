import { defineStore } from 'pinia'

export interface Location {
  name: string
  lat: string
  lon: string
}

function loadLocations() {
  const storedLocations = localStorage.getItem('savedLocations')
  return storedLocations ? JSON.parse(storedLocations) : []
}

function saveLocations(locations: Location[]) {
  localStorage.setItem('savedLocations', JSON.stringify(locations))
}

export const savedLocationsStore = defineStore('savedLocationsStore', {
  state: () => ({
    locations: loadLocations()
  }),
  actions: {
    addLocation(location: Location) {
      this.locations.push(location)
      saveLocations(this.locations)
    },
    removeLocation(location: Location) {
      const index = this.locations.findIndex((loc: Location) => {
        return loc.name === location.name && loc.lat === location.lat && loc.lon === location.lon
      })
      if (index !== -1) {
        this.locations.splice(index, 1)
        saveLocations(this.locations)
      }
    },
    isInDrawer(location: Location) {
      return this.locations.some((loc: Location) => {
        return loc.name === location.name && loc.lat === location.lat && loc.lon === location.lon
      })
    }
  }
})
