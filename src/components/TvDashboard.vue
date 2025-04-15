<template>
    <div class="container">
      <!-- Genre Filter -->
      <GenreFilter @genre-selected="fetchShowsByGenre" />
      
      <!-- Search By Show Name -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="handleDebouncedSearch"
        @keyup.enter="handleExplicitSubmit"
        placeholder="Search shows by name"
      />
      <AppButton variant="secondary" label="Search" @click="handleExplicitSubmit" />
    </div>
      
      <!-- Single sorting toggle button -->
    <div class="sort-container">
      <button @click="toggleSortOrder" class="sort-button">
        Sort by Rating 
        <i :class="sortOrder === 'asc' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
      </button>
    </div>
      
      <!-- Show List -->
      <ShowList :shows="shows" />
    </div>
  </template>
  
  <script>
  // debounce helper function
function debounce(fn, delay) {
  let timeoutID;
  return function (...args) {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
  import GenreFilter from './GenreFilter.vue';
  import ShowList from './ShowList.vue';
import AppButton from './AppButton.vue';
  
  export default {
    name: 'TvDashboard',
    components: {
      GenreFilter,
      ShowList,
      AppButton,
    },
    data() {
      return {
        searchQuery: '',      // For storing the user search input.
        shows: [],  // Flattened list of shows
        sortOrder: 'desc',  // Default sorting by descending rating
      };
    },
    created() {
    // Create a debounced version of searchShows.
    this.debouncedSearch = debounce(this.searchShows, 300);
  },
    methods: {
      // Called when the input changes (debounced).
    handleDebouncedSearch() {
      // Only search if there is text
      if (this.searchQuery.trim()) {
        this.debouncedSearch();
      }
    },
    // Called when the user explicitly submits by pressing Enter or clicking the button.
    handleExplicitSubmit() {
      // Perform search immediately.
      this.searchShows();
      // Clear the input field after submission.
      this.searchQuery = '';
    },

      searchShows() {
      const query = this.searchQuery.trim();
      if (!query) {
        return;
      }
      fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
          // The API returns an array of objects where the actual show is in the "show" property.
          this.shows = data.map(item => item.show);
          this.sortShows(this.sortOrder);
        })
        .catch((error) => console.error('Error searching shows:', error));
    },
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
      toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      this.sortShows();
    },
    sortShows() {
      this.shows.sort((a, b) => {
        const ratingA = a.rating.average || 0;
        const ratingB = b.rating.average || 0;
        return this.sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      });
    },
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

  /* Search container styling */
.search-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-container input {
  padding: 10px;
  font-size: 16px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

@media (max-width: 600px) {

  .search-container input, 
  .search-container button {
    width: 90%;
  }
}

/* Sort Button Styling */
.sort-container {
  text-align: left;
  margin: 15px 0;
}

.sort-button {
  background-color: #3b536c;
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.sort-button:hover {
  background-color: #2c3e50;
  transform: scale(1.05);
}
  </style>
  