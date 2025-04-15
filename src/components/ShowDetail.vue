<template>
    <div class="show-detail">
        <AppButton variant="primary" label="Back to Dashboard" @click="goBack" />
      <!-- Loading indicator -->
    <div v-if="!show.name">
      Loading show details...
    </div>
    <div v-else>
      <h2>{{ show.name }}</h2>
      <img :src="show.image ? show.image.medium : 'https://via.placeholder.com/500x750'" alt="Show Image" />
      <p><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
      <p><strong>Rating:</strong> {{ show.rating.average || 'N/A' }}</p>
      <p><strong>Summary:</strong> <span v-html="show.summary"></span></p>
      <p><strong>Premiered:</strong> {{ show.premiered }}</p>
      <p><strong>Language:</strong> {{ show.language }}</p>
      <p><strong>Official Site:</strong> <a :href="show.url" target="_blank">{{ show.url }}</a></p>
    </div>
    </div>
  </template>
  
  <script>
import AppButton from './AppButton.vue';

  export default {
    name: 'ShowDetail',
    components: {
      AppButton,
    },
  
    data() {
      return {
        show: {},  // Store show data here
      };
    },
  
    methods: {
      // Method to navigate back to the dashboard
      goBack() {
        this.$router.push('/');
      },
  
      // Fetch show details by ID
      fetchShowDetails() {
        const showId = this.$route.params.id;  // Get the show ID from the URL
        fetch(`https://api.tvmaze.com/shows/${showId}`)
          .then(response => response.json())
          .then(data => {
            this.show = data;  // Set the show data to be displayed
          })
          .catch(error => console.error('Error fetching show details:', error));
      },
    },
  
    // Fetch show details when the component is mounted
    mounted() {
      this.fetchShowDetails();
    },
  };
  </script>
  
  <style scoped>
  .show-detail {
    padding: 20px;
  }
  
  .show-detail h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .show-detail img {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .show-detail p {
    font-size: 16px;
    line-height: 1.5;
  }
  
  </style>
  