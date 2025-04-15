<template>
  <div id="app">
    <!-- Header -->
    <header class="app-header">
      <nav class="navbar">
        <div class="navbar-logo">
          <h1>My TV Show App</h1>
        </div>
        <ul class="navbar-links">
          <li><router-link to="/">Home</router-link></li>
          <!-- Potentially more links like Favorites, Profile, etc. -->
        </ul>
      </nav>
    </header>

    <!-- Main Content: The router-view will render Dashboard, ShowDetail, etc. -->
    <main class="app-content">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>&copy; 2025 My TV Show App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
/* Basic Reset/Defaults */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Page Container */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f5f5f5; /* Light background for the content area */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.app-header {
  background-color: #2C3E50; /* Dark navy */
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  padding: 10px 20px;
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex; 
  justify-content: space-between; 
  align-items: center;
}

.navbar-logo h1 {
  font-size: 1.5rem;
}

/* Navigation Links */
.navbar-links {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.navbar-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.navbar-links a:hover {
  color: #3498db; /* Lighter accent color on hover */
}

/* MAIN CONTENT */
.app-content {
  flex: 1; 
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  width: 100%;
}

/* FOOTER */
.app-footer {
  background-color: #2C3E50;
  color: #ffffff;
  text-align: center;
  padding: 10px 0;
}
</style>
