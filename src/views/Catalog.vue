<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import Movie from '../components/Movie.vue'

interface Genre {
  id: number
  name: string
  slug: string
  movies?: any[]
}

const genres = ref<Genre[]>([
  { id: 28, name: "Action", slug: "action" },
  { id: 16, name: "Animation", slug: "animation" },
  { id: 12, name: "Aventure", slug: "aventure" },
  { id: 35, name: "Comédie", slug: "comedie" },
  { id: 99, name: "Documentaire", slug: "documentaire" }
])

let moviesAdded: any[] = []
genres.value.forEach((genre, i) => {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en,fr&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${genre.id}`)
    .then(res => {
      /* filter out movies without backdrops and movies that already are in other categories */
      genre.movies = res.data.results.filter((movie: any) => movie.backdrop_path && !moviesAdded.includes(movie.id)).slice(0, 20)
      moviesAdded = moviesAdded.concat(genre.movies.map((movie: any) => movie.id))
    })
})

function genreScroll(genre: Genre, left: number) {
  const genreEl = this.$refs['genre-' + genre.id][0].querySelector('.row .items')
  genreEl.scrollBy({
    top: 0,
    left,
    behavior: 'smooth'
  })
}
</script>


<template>
  <main>
    <div class="genre" :ref="'genre-' + genre.id" v-for="genre in genres" :key="genre.id">
      <span class="title">{{ genre.name }}</span>
      <div class="row" v-if="genre.movies">
        <div class="items" @scroll="genre.scrollLeft = $event.target.scrollLeft">
          <Movie v-for="movie in genre.movies" :key="movie.id" :per-row="5" :movie="movie" />
        </div>
        <div class="scroll left" v-if="genre.scrollLeft > 0">
          <i class="material-icons" @click="genreScroll(genre, -800)" v-if="genre.movies.length > 6">chevron_left</i>
        </div>
        <div class="scroll right">
          <i class="material-icons" @click="genreScroll(genre, 800)" v-if="genre.movies.length > 6">chevron_right</i>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 12px;
}

.genre {
  .title {
    display: block;
    margin: 10px 12px 0;
    font-size: 1.6rem;
    font-weight: 600;
  }
  
  .row {
    position: relative;
    max-width: 100vw;

    .items {
      display: flex;
      flex-flow: row nowrap;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        height: 0;
      }
    }

    .scroll {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      height: 100%;
      width: 60px;
      cursor: pointer;

      i {
        font-size: 3rem;
        font-weight: 600;
        text-shadow: 0 0 10px #000000db;
        user-select: none;
      }

      &.left {
        left: 0;
        background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
      }

      &.right {
        right: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
      }
    }
  }
}
</style>