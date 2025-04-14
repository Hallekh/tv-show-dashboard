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
      
      <!-- Show List -->
      <ShowList :shows="shows" />
    </div>
  </template>
  
  <script>
  import GenreFilter from './GenreFilter.vue';
  import ShowList from './ShowList.vue';
  
  export default {
    name: 'TvDashboard',
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
          return order === 'asc' ? ratingA - ratingB : ratingB - ratingA;
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
  .container {
    padding: 20px;
  }
  .sort-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>
  