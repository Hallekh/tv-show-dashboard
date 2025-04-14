<template>
  <div class="container">
    <h1>TV Show Dashboard</h1>
    <GenreFilter @genre-selected="fetchShowsByGenre" />
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
      shows: [],
    };
  },
  methods: {
    fetchShowsByGenre(genre) {
      fetch(`https://api.tvmaze.com/search/shows?q=${genre}`)
        .then(response => response.json())
        .then(data => {
          this.shows = data.map(show => show.show);
        })
        .catch(error => console.error('Error fetching shows:', error));
    }
  },
  mounted() {
    this.fetchShowsByGenre('Drama');
  }
};
</script>

<style src="./assets/styles.css"></style>
