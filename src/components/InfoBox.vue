<template>
  <div class="info-box">
    <div class="info-box-slot" v-for="(item, index) in params" :key="index">
      <span class="info-box-slot-header">{{ item.header }}</span>
      <span class="info-box-slot-content">{{ item.content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InfoBox',
  props: {
    params: {
      type: Array,
      required: true,
      validator(value: any[]) {
        return value.every(
          (item) => typeof item.header === 'string' && typeof item.content === 'string'
        )
      }
    }
  }
}
</script>

<style scoped>
.info-box {
  width: 100%;
  background-color: #f9f9f9;
  filter: drop-shadow(0 2px 1px rgb(0 0 0 / 0.05));
  border-radius: 10px;
  padding: 15px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.info-box-slot {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.info-box-slot-header {
  font-size: 0.75rem;
  color: #666;
  padding: 5px;
}
.info-box-slot-content {
  font-size: 1rem;
  color: #000;
  font-weight: bold;
}
</style>
