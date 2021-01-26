//依赖一个http模块，相当于java中的import，与C#中的using
let express = require('express')
const bodyParser = require("body-parser");
const app = express()

const cors = require('cors');
app.use(cors())

//必须设置下面这个东西， 作用是对post请求的请求体进行解析，先引入body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let zudui = ''

app.get('/getZuHe', function (req, res) {
    res.send(zudui)
})
app.post('/setZudui', async function (req, res) {
    if (req.body.zudui) {
        console.log(req.body.zudui)
        zudui = req.body.zudui
    }
    res.send('200')
})

//让服务器监听本地 端口开始运行
let server = app.listen(50007);
console.log('启用了服务50007')
let host = server.address().address

let port = server.address().port
console.log(host + ':' + port);