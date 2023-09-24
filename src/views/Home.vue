<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import Movie from '../components/Movie.vue'

const trendingMovies = ref([])
const highlightedMovie = ref(null)
/* TMDB ID of Blade Runner 2049 */
const highlightedMovieID = 335984

axios.get(`https://api.themoviedb.org/3/movie/${highlightedMovieID}?api_key=${process.env.TMDB_API_KEY}&language=fr&append_to_response=images,credits&include_image_language=en,null`)
  .then(res => {
    highlightedMovie.value = res.data
    highlightedMovie.value.director = res.data.credits.crew.find((crew: any) => crew.job === 'Director')

    /* shuffle backdrops (filter out the ones without votes) */
    highlightedMovie.value.images.backdrops = highlightedMovie.value.images.backdrops.filter((backdrop: any) => backdrop.vote_count > 5).sort(() => Math.random() - 0.5)
  })

axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&language=fr`)
  .then(res => {
    trendingMovies.value = res.data.results.slice(0, 4)

    /* get the TMDB images for each trending movie */
    trendingMovies.value.forEach(movie => {
      axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${process.env.TMDB_API_KEY}&include_image_language=en,null`)
        .then(res => {
          res.data.logos = res.data.logos.sort((a, b) => b.width - a.width)
          res.data.backdrops = res.data.backdrops.filter((backdrop: any) => backdrop.vote_count > 5).sort(() => Math.random() - 0.5)
          movie.images = res.data
        })
    })
  })
</script>

<template>
  <main>
    <div class="highlighted" v-if="highlightedMovie">
      <div class="title">film du jour</div>
      <img class="backdrop" :src="`https://www.themoviedb.org/t/p/original${highlightedMovie.images.backdrops[0].file_path}`">
      <div class="details">
        <img class="logo" :src="`https://www.themoviedb.org/t/p/w500${highlightedMovie.images.logos[0].file_path}`">
        <span class="director">de <b>{{ highlightedMovie.director.name }}</b></span>
        <p>{{ highlightedMovie.overview }}</p>
        <div class="cast" v-if="highlightedMovie.credits.cast">
          <div class="actor" v-for="actor in highlightedMovie.credits.cast.slice(0, 5)" :key="actor.id">
            <img :src="'https://image.tmdb.org/t/p/w185' + actor.profile_path" :title="actor.name" :alt="actor.name" @click="$emit('search', actor.name, true)" v-if="actor.profile_path">
          </div>
        </div>
      </div>
    </div>
    <h2>Films populaires en ce moment</h2>
    <div class="row">
      <Movie v-for="movie in trendingMovies" :key="movie.id" :movie="movie" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.highlighted {
  position: relative;

  .title {
    position: absolute;
    top: 0;
    right: 0;
    margin: 30px;
    font-size: 1.15rem;
    font-weight: 600;
    text-transform: uppercase;
    word-spacing: 3px;
    letter-spacing: 1px;
    color: #e1e1e1;
    filter: drop-shadow(0 0 0.75rem #0000004b);
  }

  .backdrop {
    width: 100vw;
    height: 500px;
    object-fit: cover;
  }

  .details {
    position: absolute;
    bottom: 0;
    padding: 40px;
    max-width: 42%;
    background: linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%);

    .logo {
      margin: 30px 0;
      max-height: 150px;
      width: fit-content;
      filter: drop-shadow(0 0 0.75rem #0000004b);
      pointer-events: none;
      user-select: none;
      border-radius: 4px;
    }

    .director {
      font-size: 1.1vw;
      font-weight: 400;
      color: #dfdfdf;
      text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);

      b {
        font-weight: 600;
      }
    }
    
    p {
      margin: 12px 0;
      max-height: 150px;
      overflow: scroll;
      font-size: 1.1vw;
      font-weight: 400;
      color: #dfdfdf;
      text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);

      &::-webkit-scrollbar {
        width: 4px;
      }
    }

    .cast {
      display: flex;
      margin-top: 12px;
      
      .actor {
        width: 30px;
        height: 30px;
        margin-right: 6px;
        border-radius: 50%;
        background: linear-gradient(220.6deg, #212121 9.46%, rgba(159, 159, 159, 0) 94.46%);
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }
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
</style>