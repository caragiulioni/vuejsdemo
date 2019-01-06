
<template>
  <div class="searchBarContainer">
    <div class="search">
      <div class="searchBar">
        <form v-on:submit="queryGitHub(query)">
          <input type="search" placeholder="Search Repositories Ex. Hello World" v-model="query" />
          <button type="submit" v-on:click="isHidden = !isHidden">Search</button>
        </form>
      </div>

      <div class="results" id="results" v-if="response">
        <div class="notFound" v-if="response.length == 0">
          <p>Sorry buddy, try another search!</p>
        </div>
          
        <div class="resultsHeadings" v-if="response.length >= 1">
          <p>Name</p>
          <p>Language</p>
        </div>

        <div class="items" v-if="response.length >= 1">
          <div class="item" v-for="(item, index) in response, filteredList" v-bind:id="item.id" :key="index"> 
              <p>{{item.name}}</p>
              <p>{{item.language}}</p>

              <div class="expand">
                <a @click="pushItem(index)">Details</a>
              </div>

              <div class="expanded" v-show="activeItems.includes(index)">
                  <p>Branch: {{item.default_branch}}</p>
                  <p>Forks: {{item.forks}}</p>
                  <p>URL: <a v-bind:href="item.html_url">{{item.full_name}}</a></p> 
                  <div class="itemButton">
                    <button v-on:click="addFave(item.id, item.forks)">Add to Favorites</button>
                  </div>
              </div>
          </div>
        </div>

        <div class="filter" v-if="response.length >= 1">
          <label for="filter">Filter your results here:</label>
          <input type="text" v-model="filter"placeholder="Filter by name..."/>
        </div>
      </div>
    </div>

     <div class="favesContainer">
      <div class="favesHeading"><h3>My Favorites List</h3></div>
      <favorite v-bind:response="response" v-bind:faves="faves" @removed="handleRemove"></favorite>
      </div>
    </div>
</template>

<script>

export default{
  data () {
    return {
      query:'',
      filter: '',
      response: null,
      items: [],
      faves: [],
      activeItems: [],
      isHidden: true
    }
  },
  methods: {
    queryGitHub(q) {
    if (q.length >= 1){
      fetch('https://api.github.com/search/repositories?q=' + q)
        .then((j) => {
          return j.json();
        })
        .then ((r) => {
        console.log(r);
        //this.response = r.items;

        this.response = r.items.slice(0, 15)
          })
        }
    },
    addFave(id){
    console.log("click", id);  
    ///console.log(this.response)  
    //references our data object outside of primary method so we can use it elsewhere
    let fave = this.response.filter((item) =>{
        return item.id === id
    })
   //console.log(fave);
    this.faves.push(fave[0]);
    }, 
    pushItem(index) {
      if(this.activeItems.includes(index)) {
        this.activeItems.splice(this.activeItems.indexOf(index), 1)
      } else {
        this.activeItems.push(index)
      }
    },
    handleRemove(id){
      console.log('this is been removed', id)
        let newFaves = this.faves.filter((item) => {
        return item.id !== id
      })
      console.log(newFaves)
      this.faves = newFaves;
      }
    }, //end method
    computed: {
    filteredList(language) {
      return this.response.filter(item => {
        return item.name.toLowerCase().includes(this.filter.toLowerCase())
         })
        }
    }
  };


</script>

<style scoped>

input{
  border-radius: 5px;
  height: 30px;
  width: 55%;
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

.item button{
  margin: 0;
}

a{
  text-decoration: none;
  transition: .3s;
} 


.items{
  margin-right: 35px;
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
.results{
  background: #fff;
  border-radius: 4px;
  padding-top: 35px;

}

.notFound p{
  color: grey;
  font-size: 1.3em;
}

.searchBarContainer{
  height: 85vh;
  display: flex;
}

.search{
  border-right: 1px solid darkgrey;
  padding-left: 35px;
}


.search, .favorites{
  padding-top: 35px;
  width: 50vw;
}

.notFound{
  font-size: 12px;
  font-weight: bold;
  margin-top: -25px;
}

.items{
  border: 2px solid lightgrey;
  border-radius: 5px;

}
.item{
  padding: 10px;
  border-bottom: 1px solid lightgrey;
}

.item, .resultsHeadings{
  display: grid;
  grid-template-columns:2fr 2fr 1fr;
}

.item:nth-child(odd) {
  background: #f5f6fa;
}

a{
  cursor: pointer;
}

.item a{
  color:#778ca3;
  transition: .3s ease-in-out;
  padding: 10px;
}

a:hover{
  color: lightgrey;
}

.resultsHeadings{
  color: grey;
  font-weight: bold;
  text-transform: uppercase;
  padding: 5px 5px 5px 5px;
  margin-right: 35px;
}

.expand{
  text-align: right;
  font-weight: bold;
}


.expand a{
  font-weight: normal;
}

.expanded p, 
.expanded button{
  margin: 3px 0px;
}


.name{
  text-transform: uppercase;
}


.favesHeading{
  padding: 30px 30px 0px 30px;
}

.favesHeading h3{
  font-size: 1em;
  padding: 8px;
  background: #778CA3;
  color: white;
}

.filter{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

label{
  margin-bottom: 5px;
  font-size: .8em;
  font-weight: bold;
  color:grey;
}

.itemButton{
  margin: 10px 0px;
}

</style>