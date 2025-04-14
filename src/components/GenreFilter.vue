<template>
    <div class="genre-buttons">
  <button @click="fetchShowsByGenre('Drama')">Drama</button>
  <button @click="fetchShowsByGenre('Comedy')">Comedy</button>
  <button @click="fetchShowsByGenre('Sports')">Sports</button>
  <button @click="fetchShowsByGenre('Action')">Action</button>
  <button @click="fetchShowsByGenre('Horror')">Horror</button>
</div>
  </template>
  
  <script>
export default {
  props: {
    fetchShowsByGenre: Function,
  },
  methods: {
    selectGenre(genre) {
      this.fetchShowsByGenre(genre);
    }
  }
};
</script>

  <style scoped>
  /* Style for the genre buttons and sorting buttons */
button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px; /* Rounded corners */
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #2980b9; /* Darker blue on hover */
  transform: scale(1.05); /* Slight scaling effect */
}

button:focus {
  outline: none; /* Removes the outline on focus */
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.6); /* Add a subtle glow */
}

/* Style for the genre container */
.genre-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}



  </style>
  