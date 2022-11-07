<template>
<div>
  <b-tabs content-class="mt-3" >
    <b-tab title="Home" active @click="tabEmitted('Home')">
      <div class="tab-pane fade show active" id="home">
       <div v-if="jokesJson" class="hello">
    <div v-for="(joke ) in jokesJson"   :key="joke.value" class="d-flex mt-1 text-left"> <div class="col-2"><button class="btn" :class="isAddedtoFav(joke)" @click="addToFavouraites(joke)"> {{joke.addedtoFav ?  'Remove from fav': 'Add To Fav'}}</button></div> <div class="">{{joke.value}}</div> </div>
  </div>
    </div>
    </b-tab>
    <b-tab title="favorite"  >
         <div v-if="favorites" class="hello">
    <div v-for="(joke ) in favorites"   :key="joke.value" class="d-flex mt-1 text-left">  <div >{{joke.value}}</div> </div>
  </div>
    </b-tab>
  </b-tabs>
</div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'RandomJokes',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      jokesJson: [],
      favorites: []
    }
  },
  beforeDestroy () {
    this.persistfavData()
  },
  mounted: async function () {
    window.addEventListener('beforeunload', this.persistfavData)
    if (localStorage.getItem('myFavJokes')) {
      this.favorites = JSON.parse(localStorage.getItem('myFavJokes'))
    }
    for (let i = 0; i < 10; i++) {
      const data = await this.getIntialJokes()
      if (data) {
        this.jokesJson = [...this.jokesJson, data]
      }
    }
    setInterval(this.getNewJoke, 5000)
  },
  methods: {
    isAddedtoFav (joke) {
      return joke.addedtoFav ? 'btn-warning' : 'btn-primary'
    },
    persistfavData () {
      if (this.favorites.length > 0) {
        localStorage.setItem('myFavJokes', JSON.stringify(this.favorites))
      }
    },
    async getNewJoke () {
      const newJoke = await this.getJoke()
      this.jokesJson.unshift(newJoke)
      if (this.jokesJson.length > 10) {
        this.jokesJson.pop()
      }
    },
    async getJoke () {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random')
        return response.data
      } catch (error) {
        console.error(error)
        return []
      } finally {
      }
    },
    tabEmitted (e) {
    },
    addToFavouraites (joke) {
      joke.addedtoFav = true
      let i = 0
      for (const element of this.favorites) {
        if (joke.id === element.id) {
          joke.addedtoFav = false
          this.favorites.splice(i, 1)
          return
        }
        i++
      }
      this.favorites.unshift(joke)
      if (this.favorites.length > 10) {
        this.favorites.pop()
      }
    },
    async getIntialJokes () {
      return this.getJoke()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.text-left{
  text-align: left;
  padding: 10px;
  margin: 10px;
  border: 1px solid #aaa;
}
</style>
