<template>
  <div>
    <h1>TV Show Dashboard</h1>

    <!-- Genre Filter -->
    <GenreFilter @genre-selected="fetchShowsByGenre" />
    
    <!-- Sorting Options -->
    <div>
      <button @click="sortShows('asc')">Sort by Rating (Ascending)</button>
      <button @click="sortShows('desc')">Sort by Rating (Descending)</button>
    </div>
    
    <!-- Show List Grouped by Genre -->
    <div v-for="(genreShows, genre) in groupedShows" :key="genre">
      <h2>{{ genre }}</h2>
      <ShowList :shows="genreShows" />
    </div>
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
      groupedShows: {},
      currentGenre: 'Drama', // Default genre
      sortOrder: 'desc', // Default sorting by descending rating
    };
  },
  methods: {
    // Define the fetchShowsByGenre method here
    fetchShowsByGenre(genre) {
      this.currentGenre = genre;
      fetch(`https://api.tvmaze.com/search/shows?q=${genre}`)
        .then(response => response.json())
        .then(data => {
          const shows = data.map(show => show.show).filter(show => {
            // Check if the selected genre is present in the show's genres array
            return show.genres.includes(genre);
          });

          this.groupShowsByGenre(shows);
        })
        .catch(error => console.error('Error fetching shows:', error));
    },

    // Group shows by genre
    groupShowsByGenre(shows) {
      const grouped = {};

      shows.forEach(show => {
        show.genres.forEach(genre => {
          if (!grouped[genre]) {
            grouped[genre] = [];
          }
          grouped[genre].push(show);
        });
      });

      this.groupedShows = grouped;
      this.sortShows(this.sortOrder);
    },

    // Sort the shows by rating (ascending or descending)
    sortShows(order) {
      this.sortOrder = order;
      Object.keys(this.groupedShows).forEach(genre => {
        this.groupedShows[genre].sort((a, b) => {
          const ratingA = a.rating.average || 0;
          const ratingB = b.rating.average || 0;

          if (order === 'asc') {
            return ratingA - ratingB;
          } else {
            return ratingB - ratingA;
          }
        });
      });
    }
  },
  mounted() {
    // Initially load the "Drama" genre shows
    this.fetchShowsByGenre('Drama');
  }
};
</script>

<style scoped>

button {
  padding: 10px;
  margin-right: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

h2 {
  margin-top: 20px;
  color: #333;
}

</style>
