import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ShowDetail from './components/ShowDetail.vue';
import TvDashboard from './components/TvDashboard.vue';

// Define routes
const routes = [
  { path: '/', component: TvDashboard },
  { path: '/show/:id', component: ShowDetail, props: true },  // Dynamic route for show details
];

const router = createRouter({
  history: createWebHistory(), // Uses the HTML5 history mode
  routes,
});

// Create and mount the app
const app = createApp(App);
app.use(router);
app.mount('#app');
