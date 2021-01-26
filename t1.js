// 这个是在目录下都打包完了，，不再打包直接替换打包后的接口地址然后发布
const path = require("path");
const fs = require("fs");
const os = require(`child_process`).execSync;

let filePath = 'data/srsrecord'

//测试157
// const ip = "172.16.200.157";
// const port = "50001";
// const fileIp = "172.16.200.157";
// const filePort = "22";
// filePath = 'data/casair_nginx/html'

//三里河生产的
// const ip = "172.16.1.186";
// const port = "50001";
// const fileIp = "172.16.1.186";
// const filePort = "22";
// filePath = 'data/smx/nginx/html'

// 莱西华商金岸
// const ip = "117.132.4.163";
// const port = "50007";
// const fileIp = "117.132.4.163";
// const filePort = "2201";
// filePath = 'data/casair_nginx/html'

// 刘家村
const ip = "117.132.2.130";
const port = "50007";
const fileIp = "117.132.2.130";
const filePort = "22";
filePath = 'casair_nginx/html'


let did = `lol-zudui`;

setIpPort()
tToServer()

function setIpPort() {
  const p = path.resolve("./", did, "config.js");
  const old = fs.readFileSync(p).toString();
  const arr = old.split(/\n/);
  const i = arr.findIndex(v => v.match("baseUrl"));
  let proArr = arr[i].split("/")

  proArr.splice(2, 1, `${ip}:${port}`);
  let newProArr = proArr.join("/");
  arr[i] = newProArr;
  const re = arr.join("\n");
  fs.writeFileSync(p, re);
}

function tToServer() {
  os(
    `scp -P ${filePort} -r ${did} root@${fileIp}:/${filePath}`
  )
  console.log(`发布成功了：${did} ,${ip}`);
}
