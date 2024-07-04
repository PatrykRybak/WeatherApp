<template>
  <RouterLink :to="link" class="search-item">
    {{ city }} &bull; {{ country }} &bull; {{ state }}</RouterLink
  >
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    lat: {
      type: String,
      required: true
    },
    lon: {
      type: String,
      required: true
    }
  },
  computed: {
    link() {
      return {
        path: '/preview',
        query: {
          lat: this.lat,
          lon: this.lon
        }
      }
    }
  }
}
</script>

<style scoped>
.search-item {
  width: 75%;
  margin-bottom: 15px;
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
}
.search-item:hover {
  cursor: pointer;
}
</style>
