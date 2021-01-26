import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import fetch from '@/libs/fetch'
import {rewirteLog,getUrlKey} from '@/libs/util'
import './styles/common.less'
import titleC from './components/titleC'


const app = createApp(App)

app.component('titleC',titleC)

router.beforeEach((to, from,next) => {
    let type = getUrlKey('type')
    if(to.name === 'jg'){
        next()
        return
    }
    if (type == 0) {
        next()
    }else{
        next({
            name: 'jg',
        })
    }
})
app.use(router)


app.config.globalProperties.$fetch = fetch

rewirteLog()


app.mount('#app')