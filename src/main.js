import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import NavbarTop from './components/NavbarTop.vue'
import NavbarLeft from './components/NavbarLeft.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
