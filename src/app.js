import path from 'path'
import express from 'express'
// import config from './config'
// 手动封装一个 处理普通的post请求的文件
import bodyParser from './middlewares/body-parser'
// 将所有的路由 以读文件的形式 封装 然后引入 这个对象
import mountRouter from './middlewares/mount-router'

const app = express()

// let router = express.Router()
// router.all('*', function (req, res, next) {
//   // res.header('Access-Control-Allow-Origin', '*')
//   console.log('进入了all  express解决跨域问题')
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//   res.header('X-Powered-By', ' 3.2.1')
//   next()
// })

// 挂载解析普通post请求的中间件
app.use(bodyParser)

mountRouter.configure(path.join(__dirname, 'router'), {
  express: app
})

app.listen(9000, () => {
  console.log('服务器已经启动,监听的端口号是9000')
})
