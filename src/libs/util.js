import config from '@/config'
import axios from 'axios'

export const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

/** 缩放屏幕 */
export const zoom = () => {
    const [W, H] = [window.innerWidth, window.innerHeight]
    const realk = W / H
    let k = 0
    if (realk > 16 / 9) {
        k = H / 1080
    } else {
        k = W / 1920
    }
    document.body.style.zoom = k + ''
}
/**
 * 获取JSON
 * @param url
 * @returns {Promise<unknown>}
 */
export const $getJson = function (url) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: url,
            dataType: "json",
            crossDomain: true,
            cache: false
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

/**
 * 在打包上传的时候 忽略console.log 打印
 */
export function rewirteLog() {
    console.log = (function(log) {
        return process.env.NODE_ENV === 'development' ? log : function() {
        }
    }(console.log))
}