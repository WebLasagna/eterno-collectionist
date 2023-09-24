<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store'
import Movie from '../components/Movie.vue'
import axios from 'axios'

const { favorites } = useStore()

const favoritesData = ref([])

/* fetch each movie's data from TMDB by id */
favorites.forEach((movieID, i) => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=fr&append_to_response=images,credits&include_image_language=en,null`)
    .then(res => {
      favoritesData.value[i] = res.data
    })
})
</script>


<template>
  <main>
    <h2>Films favoris</h2>
    <div class="row" v-if="favoritesData.length">
      <Movie v-for="movie in favoritesData" :key="movie.id" :movie="movie" />
    </div>
    <span class="empty" v-if="!favoritesData.length">Cliquez sur l'icône <i class="material-icons">favorite_border</i> d'un film pour l'ajouter à vos favoris.</span>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 12px;
}

h2 {
  margin: 6px 12px;
  font-size: 1.7rem;
  font-weight: 600;
}

.row {
  display: flex;
  flex-flow: row wrap;
  padding: 0 12px 40px;
}

.empty {
  display: flex;
  align-items: center;
  margin: 12px;
  font-size: 1.2rem;
  font-weight: 500;

  i {
    margin: 0 8px;
  }
}
</style>