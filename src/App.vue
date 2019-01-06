<template>

  <div id="app">
    <router-view/>
  </div>

</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Abel');

html, body {
  font-family: 'Abel', sans-serif;
}

body {
  font-family: 'Abel', sans-serif;
}

#app {
  font-family: 'Abel', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body, h1{
  margin: 0;
}


</style>
