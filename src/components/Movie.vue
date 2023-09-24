<script setup lang="ts">
import { useStore } from '../store'

const store = useStore()

defineProps({
  movie: {
    type: Object,
    required: true
  },
  'per-row': {
    type: Number,
    default: 4
  }
})
</script>

<template>
  <div
    :style="`width: calc(100% / ${perRow} - 16px)`"
    v-if="movie"
  >
    <img class="logo image" :src="`https://www.themoviedb.org/t/p/w500${movie.images.logos[0].file_path}`" v-if="movie.images && movie.images.logos.length">
    <span class="logo text" v-else>{{ movie.title }}</span>
    <img class="backdrop" :src="`https://www.themoviedb.org/t/p/w780${movie.images ? movie.images.backdrops[0].file_path : movie.backdrop_path}`">
    <i class="material-icons" @click="store.removeFavorite(movie.id)" v-if="store.favorites.includes(movie.id)">favorite</i>
    <i class="material-icons" @click="store.addFavorite(movie.id)" v-else>favorite_border</i>
  </div>
</template>

<style lang="scss" scoped>
div {
  position: relative;
  min-width: 300px;
  margin: 8px;
  border-radius: 4px;
  user-select: none;
  -webkit-user-drag: none;
  min-height: 168px;
  border-radius: 4px;
  background: linear-gradient(220.6deg, #212121 9.46%, rgba(159, 159, 159, 0) 94.46%);
}

.backdrop {
  height: 100%;
  border-radius: 4px;
  pointer-events: none;
}

.logo {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 12px;
  max-width: 80%;

  &.image {
    max-width: 150px;
    max-height: 50px;
    filter: drop-shadow(0 0 0.75rem #0000004b);
    pointer-events: none;
    user-select: none;
    border-radius: 4px;
  }
  
  &.text {
    font-size: 1.3rem;
    font-weight: 600;
    text-shadow: 0 0 4px #000000cc;
    overflow: hidden;
  }
}

i {
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 1;
}
</style>