import { defineStore } from 'pinia'

export const useApiKeyStore = defineStore('apiKeyStore', {
  state: () => ({
    apiKey: '72b0fa580cebb312a5bf50b04b322b1c'
  }),
  actions: {
    setApiKey(key: string) {
      this.apiKey = key
    },
    clearApiKey() {
      this.apiKey = ''
    }
  }
})
