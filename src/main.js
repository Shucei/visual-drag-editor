import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import { createPinia } from 'pinia'
const pinia = createPinia()
import '@/styles/reset.css' // 引入reset.css
createApp(App).use(pinia).use(router).mount('#app')
