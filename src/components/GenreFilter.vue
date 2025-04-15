<template>
    <div class="genre-buttons">
    <AppButton
      v-for="genre in genres"
      :key="genre"
      :label="genre"
      :buttonClass="'genre-button'"
      :isActive="genre === selectedGenre"
      @click="selectGenre(genre)"
    />
  </div>
  </template>
  
  <script>
import AppButton from './AppButton.vue';

export default {
  name: 'GenreFilter',
  props: {
    fetchShowsByGenre: Function,
  },
  components: {
      AppButton,
    },
    data() {
    return {
      genres: ['Drama', 'Comedy', 'Sports', 'Action', 'Horror'],
      selectedGenre: '', // Track which genre is selected
    };
  },
  methods: {
    selectGenre(genre) {
      this.selectedGenre = genre;
      this.$emit('genre-selected', genre);
    },
    
  }
};
</script>

  <style scoped>
/* Style for the genre container */
.genre-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 20px;
}
.genre-button {
  font-size: 18px;  
  color: black; 
  padding: 14px 28px;
  margin: 5px;
  background-color: #e9e5eb; 
  width: 200px;
}
.genre-button:hover {
  background-color: #8e44ad;
}
.genre-buttons .genre-button.active {
  background-color: #857ae7 !important; /* Darker purple */
  transform: scale(1.1) !important;
  box-shadow: 0 0 12px rgba(108, 52, 131, 0.7) !important;
}
  </style>
  