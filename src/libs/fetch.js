import axios from 'axios'
import {baseUrl} from '@/libs/util'

const ax = axios.create({
    headers: {},
    method: 'POST',
})
// ax.defaults.withCredentials = true
// 设置过滤器
ax.interceptors.request.use(
    function (config) {
        // config.headers.Authorization = 'Bearer ' + localStorage.token
        return config
    },
    function (err) {
        return Promise.reject(err)
    },
)
ax.interceptors.response.use(
    function (re) {
        return re.data
    },
    function (err) {
        let response = err.response

        return Promise.reject(response.data)
    },
)
const _fetch = (type, link, params) => {
    if (!link.match(/^http/)) {
        link = baseUrl + link
    }
    return ax[type](link, params)
}
const fetch = {
    post(link, params) {
        return _fetch('post', link, params)
    },
    put(link, params) {
        return _fetch('put', link, params)
    },
    get(link, params, ) {
        return _fetch('get', link, params)
    },
    delete(link, params) {
        return _fetch('delete', link, params)
    },
    uploadPost(link, params) {
        if (!link.match(/^http/)) {
            link = baseUrl + link
        }
        return ax.post(link, params, {headers: {'Content-Type': 'multipart/form-data'}})
    },
}
export default fetch
