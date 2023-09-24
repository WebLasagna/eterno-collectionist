import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    favorites: ref<number[]>([])
  }),
  actions: {
    addFavorite(id: number) {
      this.favorites.push(id)
    },
    removeFavorite(id: number) {
      const index = this.favorites.indexOf(id)
      this.favorites.splice(index, 1)
    }
  },
  persist: true
})
