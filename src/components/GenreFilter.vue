<template>
    <div class="genre-buttons">
      <button @click="selectGenre('Drama')">Drama</button>
      <button @click="selectGenre('Comedy')">Comedy</button>
      <button @click="selectGenre('Sports')">Sports</button>
      <button @click="selectGenre('Action')">Action</button>
      <button @click="selectGenre('Horror')">Horror</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      selectGenre(genre) {
        this.$emit('genre-selected', genre);
      }
    }
  };
  </script>
  
  <style scoped>
  .genre-buttons {
    display: flex;
    gap: 10px;
  }
  
  .genre-buttons button {
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .genre-buttons button:hover {
    background-color: #2980b9;
  }
  </style>
  