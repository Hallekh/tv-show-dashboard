<template>
  <div id="app">
    <header>
      <h1>My TV Show App</h1>
    </header>
    
    <router-view></router-view>
    
    <footer>
      <p>&copy; 2025 My TV Show App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
header, footer {
  background-color: #3498db;
  color: white;
  text-align: center;
  padding: 10px 0;
}
</style>
