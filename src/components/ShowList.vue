<template>
  <div class="tv-show-list">
    <div v-for="show in shows" :key="show.id" class="tv-show">
      <router-link :to="`/show/${show.id}`">
      <img :src="show.image ? show.image.medium : 'https://placehold.co/250x375'" alt="Show Image" />
      <h3>{{ show.name }}</h3>
    </router-link>
      <p>Rating: {{ show.rating.average || 'N/A' }}</p>
      <p>{{ (show.genres || []).join(', ') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shows: Array,
  }
};
</script>

<style scoped>
.tv-show-list {
  display: flex;
  overflow-x: auto;  /* Horizontal scrolling */
  gap: 20px;
  padding-bottom: 10px;  /* Prevents the scrollbar from being cut off */
}

.tv-show {
  width: 250px;
  border: 1px solid #ddd;
  padding: 10px;
  min-width: 250px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tv-show img {
  width: 100%;
  border-radius: 8px;
}

.tv-show h3 {
  font-size: 18px;
  margin: 10px 0;
}

.tv-show p {
  font-size: 14px;
  color: #555;
}
</style>
