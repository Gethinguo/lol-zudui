import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import fetch from '@/libs/fetch'
import {rewirteLog} from '@/libs/util'
import './styles/common.less'
import titleC from './components/titleC'


const app = createApp(App)

app.component('titleC',titleC)

app.use(router)


app.config.globalProperties.$fetch = fetch

rewirteLog()


app.mount('#app')