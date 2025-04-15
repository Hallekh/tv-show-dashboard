<template>
    <div class="genre-buttons">
      <AppButton variant="primary" label="Drama" @click="fetchShowsByGenre('Drama')" />
      <AppButton variant="primary" label="Comedy" @click="fetchShowsByGenre('Comedy')" />
      <AppButton variant="primary" label="Sports" @click="fetchShowsByGenre('Sports')" />
      <AppButton variant="primary" label="Action" @click="fetchShowsByGenre('Action')" />
      <AppButton variant="primary" label="Horror" @click="fetchShowsByGenre('Horror')" />
</div>
  </template>
  
  <script>
import AppButton from './AppButton.vue';

export default {
  props: {
    fetchShowsByGenre: Function,
  },
  components: {
      AppButton,
    },
  methods: {
    selectGenre(genre) {
      this.fetchShowsByGenre(genre);
    }
  }
};
</script>

  <style scoped>
/* Style for the genre container */
.genre-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
  </style>
  