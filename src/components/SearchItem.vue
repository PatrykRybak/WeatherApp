<template>
  <RouterLink :to="link" class="search-item">
    <div class="search-item-title">{{ city }}</div>
    <div class="search-item-body">{{ country }} &bull; {{ state }}</div>
  </RouterLink>
</template>

<script lang="ts">
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
}
.search-item:hover {
  cursor: pointer;
}
.search-item-title {
  width: 100%;
  font-size: 1.1rem;
  font-weight: 500;
}
.search-item-body {
  width: 100%;
  font-size: 0.9rem;
  font-weight: 300;
}
</style>
