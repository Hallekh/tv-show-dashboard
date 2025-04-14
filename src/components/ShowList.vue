<template>
    <div class="tv-show-list">
      <div v-for="show in shows" :key="show.id" class="tv-show">
        <img :src="show.image ? show.image.medium : 'https://via.placeholder.com/250x375'" alt="Show Image" />
        <h3>{{ show.name }}</h3>
        <p>{{ show.genres.join(', ') }}</p>
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
  .tv-show {
    width: 250px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

