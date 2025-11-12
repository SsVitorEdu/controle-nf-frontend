
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue'

const app = createApp(App)
app.use(CarbonComponentsVue)
app.use(store)
app.use(router)
app.mount('#app')