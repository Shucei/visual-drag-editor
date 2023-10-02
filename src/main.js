import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/iconfont/iconfont.css' // 引入iconfont
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
const pinia = createPinia()
import '@/styles/reset.css' // 引入reset.css
import '@/styles/global.scss' // 引入公共样式
createApp(App).use(pinia).use(router).mount('#app')
