<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
    data () {
    return {
      title: 'My GitHub Favorites'
    }
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

header{
  background-color: #778ca3;
  padding: 25px 0px 35px 0px;
  height: 4vh;

}

h1{
  color: white;
  text-align: center;
}
</style>