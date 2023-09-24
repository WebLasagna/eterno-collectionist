import './app.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const store = createPinia()
/* persisted state uses localStorage to keep favorites permanently */
store.use(piniaPluginPersistedstate)

app.use(store)
app.use(router)

app.mount('#app')
