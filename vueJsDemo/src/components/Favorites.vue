<template>
    <div class="favorites">
      <div class="favoritesContent">
        <div class="results" id="results">
          <div class="resultsHeadings">
            <p>Name</p>
            <p>Language</p>
          </div>
 <div class="items">
          <div class="item" v-for="(item) in faves" v-bind:id="item.id">
              <a v-bind:href="item.html_url">{{ item.name }}</a>
              <p>{{ item.language }}</p>
              <div class="itemButton"><button v-on:click="removeFave(item.id)">Remove</button></div>
          </div>
        </div>
        </div>
      </div>  
    </div>
</template>

<script>
export default {
      props:["response", "faves"],
      data () {
      return {
      localFaves: this.faves
    }
  },
  methods: {
    removeFave(id){
      this.$emit('removed', id);
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



h1{
  color: white;
  text-align: center;
}

.item{
  padding:15px 10px;
  border-bottom: 1px solid lightgrey;
}

.item, .resultsHeadings{
  display: grid;
  grid-template-columns:150px 150px 200px;
}

.item:nth-child(odd) {
  background: #f5f6fa;
}

 button{
  cursor: pointer;
  border: none;
  background-color: #778ca3;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  height: 30px;
  width: 150px;
  margin-left: 15px;
  transition: .3s;
}

 button:hover{
  background-color: #d1d8e0;
}

.item a{
  color:#7433F1;
  transition: .3s ease-in-out;
}

.favoritesContent{

  height: 50%;
  margin-left:35px;
}

a:hover{
  color: purple;
}

.resultsHeadings{
  font-weight: bold;
  text-transform: uppercase;
  color: grey;
  padding-bottom: 5px;
}
.items{
  border: 2px solid lightgrey;
  border-radius: 5px;
  height: 48vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

/*SCROLL BAR*/

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #C3C3C3; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #969696; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #878787; 
}



.item a{
  color:#778ca3;
  transition: .3s ease-in-out;
}

a:hover{
  color: darkgrey;
}

.results{
  width: 90%;
}
</style>