<template>
  <div class="container">
    <h1>TV Show Dashboard</h1>

    <!-- Genre Filter -->
    <GenreFilter :fetch-shows-by-genre="fetchShowsByGenre" />
    
    <!-- Sorting Options -->
    <div class="sort-buttons">
      <button @click="sortShows('asc')">Sort by Rating (Ascending)</button>
      <button @click="sortShows('desc')">Sort by Rating (Descending)</button>
    </div>
    
    <!-- Pass the list of shows to ShowList -->
    <ShowList :shows="shows" />
  </div>
</template>

<script>
import GenreFilter from './components/GenreFilter.vue';
import ShowList from './components/ShowList.vue';

export default {
  components: {
    GenreFilter,
    ShowList,
  },
  data() {
    return {
      shows: [],  // Flattened list of shows
      sortOrder: 'desc',  // Default sorting by descending rating
    };
  },
  methods: {
    // Fetch shows based on the selected genre and flatten the list
    fetchShowsByGenre(genre) {
      fetch(`https://api.tvmaze.com/search/shows?q=${genre}`)
        .then(response => response.json())
        .then(data => {
          const shows = data.map(show => show.show);
          // Filter out only the shows that contain the selected genre
          this.shows = shows.filter(show => show.genres.includes(genre));
          // Sort the shows based on the rating
          this.sortShows(this.sortOrder);
        })
        .catch(error => console.error('Error fetching shows:', error));
    },

    // Sort the shows by rating (ascending or descending)
    sortShows(order) {
      this.sortOrder = order;
      this.shows.sort((a, b) => {
        const ratingA = a.rating.average || 0;
        const ratingB = b.rating.average || 0;

        if (order === 'asc') {
          return ratingA - ratingB;
        } else {
          return ratingB - ratingA;
        }
      });
    }
  },
  mounted() {
    // Initially load the "Sports" genre shows
    this.fetchShowsByGenre('Sports');
  }
};
</script>

<style scoped>
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
.genre-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
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
.sort-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
