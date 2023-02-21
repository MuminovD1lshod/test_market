import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";

import './assets/styles/tailwind.css'
import "vue-toastification/dist/index.css";

createApp(App).use(Toast).mount('#app')
