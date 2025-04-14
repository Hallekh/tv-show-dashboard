import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ShowDetail from './components/ShowDetail.vue'; // Import the new ShowDetail component

Vue.config.productionTip = false;

// Use Vue Router
Vue.use(VueRouter);

// Define routes
const routes = [
  { path: '/', component: App },
  { path: '/show/:id', component: ShowDetail, props: true },  // Dynamic route for show details
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: h => h(App),
  router,  // Pass the router to the Vue instance
}).$mount('#app');
