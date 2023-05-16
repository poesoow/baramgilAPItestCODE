import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'


import { library } from '@fortawesome/fontawesome-svg-core'
// 1. 원하는 라이브러리 등록
import { faMoon, faSun, faGlobe, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 2. 라이브러리 안에 집에넣기
library.add(faMoon, faSun, faGlobe, faPencil)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
