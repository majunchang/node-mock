# node-mock
使用node+express 搭建本地mock‘数据服务器 配置快捷语法  支持自定义配置 和实时刷新
###  搭建本地 mock 服务器 ---为了更好的前端开发

>  工作中，有时候前端的很多工作需要后端的支持，但是可能后端的接口还没有开发完，或者有些时候在联调阶段，修复某个 bug 的时候，环境挂了。。。 那么这个时候，我们的很多工作无法顺利的进行下去。于是萌生了搭建本地服务器的想法。


#####  首先粗略的说一下它的好处
- 前端更加独立，在开发阶段对于后端的依赖性大大降低。
- 联调和开发截断，对于新增加的接口，只需要后端提供接口文档就好，不需要等到他们真正的开发完成，前端就可以自己进入联调。
- 修复和定位 bug 更加便捷，自测阶段中对于某些极端的边界条件，我们自己就可以实现构造数据，模拟边界条件。

### mock 数据的方式（这里我提供了三种，可自行选择）

######  在线 mock 网址： [Easy mock](https://easy-mock.com/login) （缺点: 当需要修改大量数据和新增很多 api 的时候，比较繁琐）
######  jsonserver+gulp 实现（ 缺点：大部分需求都能满足，但是对于需要动态解析参数的接口，支持的不够完美 ）
######  node+express 实现 （ 可实现几乎所有接口的情况，但是配置起来比第二种麻烦 ）



### EasyMock 

>  官网提供详细的文档和说明，上手比较快，但是对于保密性比较强的公司，建议舍弃这种方式。

![image.png](https://upload-images.jianshu.io/upload_images/5703029-4b33f2628ba4710c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### JsonServer+Gulp+MockJs

>   技术选型
- JsonSever 开启端口，提供服务。
- Gulp 实现监听文件和热更新的功能。
- MockJs  一个成熟的 mock 数据平台，通过其提供的 api，可以快速的生成大量测试数据。
- babel 配置 es6语法。

#### 项目目录预览

###### 介绍
1. api 为数据文件夹，配置不同的项目所需要的不同接口以及其返回值，在 index中进行继承 然后暴露给 mock/db 下 最后暴露给 server。（这个可以自行更改，只要最后暴露出去就可以
api/project.projectOne

```js
let projectOne = {
  'getList': {
    code: '0',
    data: [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }]
  },
  getInfo: {
    error_no: 0,
    errMessage: '',
    data: {
      info: {
        'name': 'BeJson',
        'url': 'http://www.bejson.com',
        'page': 88,
        'isNonProfit': true,
        'address': {
          'street': '科技园路.',
          'city': '江苏苏州',
          'country': '中国'
        },
        'links': [{
          'name': 'Google',
          'url': 'http://www.google.com'
        },
        {
          'name': 'Baidu',
          'url': 'http://www.baidu.com'
        },
        {
          'name': 'SoSo',
          'url': 'http://www.SoSo.com'
        }
        ]
      }
    }
  }
}

module.exports = {
  ...projectOne
}

```
api/index (支持 es5 和 es6共存写法)

```js
const test = require('./test/test.js')
import projectOne from './project/projectOne'

module.exports = {
  ...test,
  ...projectOne
}

```


2. mock 文件夹  集中 mock 平台，我们想要通过 mock
平台生成的接口放在这个文件夹。
mock/db.js

```js
// var Mock = require('mockjs')
import Mock from 'mockjs'
var api = require('../api')

module.exports = {
  ...api,
  getComment: Mock.mock({
    'error': 0,
    'message': 'success',
    'result|40': [{
      'author': '@name',
      'comment': '@cparagraph',
      'date': '@datetime'
    }]
  }),
  addComment: Mock.mock({
    'error': 0,
    'message': 'success',
    'result|5': [{
      'comment': '@cparagraph'
    }]
  }),
  // post/1 和post/2 返回不同的内容
  'posts': [{
      'id': 1,
      'title': 'json-server',
      'author': 'typicode'
    },
    {
      'id': 2,
      'title': 'json-server',
      'author': 'typicode'
    }
  ],
  'comments': [{
    'id': 1,
    'body': 'some comment',
    'postId': 1
  }],
  'profile': {
    'name': 'typicode'
  }
}

```


3. router文件夹 大致结构和 api 文件夹相似，暴露路由（支持 es6 和 es5 的写法共存）
    
```
import test from './test/test'
const projectOne = require('./project/projectOne')

module.exports = {
  ...test,
  ...projectOne
}
```
router/project/projectOne

```js
module.exports = {
  '/localMock/*': '/$1',
  '/localMock/getList': '/getList',
  '/localMock/getInfo': '/getInfo',
  /*
    如果没有'/localMock/*': '/$1',
    下面接口连接无法访问到
  */
  '/localMock/getInfo?123456+.2345.3434': '/getInfo'
}

```
4. gulpfile 提供监听文件和接口热更新的功能
5. main.js 中 提供babel 配置 es6 的写法
6.  server.js 中 启动端口，配置路由和接口返回值。





![image.png](https://upload-images.jianshu.io/upload_images/5703029-b68bcfad0562f0c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 运行预览
![image.png](https://upload-images.jianshu.io/upload_images/5703029-e07b1ea1024d1fec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/5703029-45a518dd077215c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/5703029-e0e10667086a9b8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 如何运行？

[localMock项目地址](https://github.com/majunchang/localMock.git)



```
    git clone https://github.com/majunchang/localMock.git
    cd localMock
    npm i 
    npm dev | npm run start | npm run mock (都可以启动)
    npm run gulp ( 启动并且可以热更新 )

```


>   在查询了关于jsonserver 的 router 配置方式以后，总感觉对于动态执行参数的接口支持的不太好，于是就有了 nodemock（什么分页，什么查询等，处理起来就是一把梭！ 复制粘贴 就是刚！）


### NodeMock(node+express+嗯？...)

######  项目目录
- api  配置接口以及接口返回值（类似与上面的 localmock 的配置）
 
api/projectOne
```js
import Mock from 'mockjs'

let projectOne = {
  getme: {
    name: 'xiaohong',
    age: 21,
    gender: '男',
    xuexi: 'cha11'
  },
  getshe: Mock.mock({
    'error': 0,
    'message': 'success',
    'result|1': [{
      'author': '@name',
      'comment': '@cparagraph',
      'date': '@datetime'
    }]
  }),
  liyitong: Mock.mock({
    'error': 0,
    'message': 'success',
    'result|3': [{
      'author': '@name',
      'comment': '@cparagraph',
      'date': '@datetime'
    }]
  })
}

export default projectOne

```

- controller 配置动态查询参数的请求  示例中给出了 get 和 post 的两种情况

controller/project.js

```js
import Mock from 'mockjs'

export function test(req, res) {
  var arr = Mock.mock({
    'error': 0,
    'message': 'success',
    'result|10': [{
      'author': '@name',
      'comment': '@cparagraph',
      'date': '@datetime'
    }]
  })
  res.json({
    arr
  })
}

export function geturl(req, res) {
  //  对于接口中的 get 参数  我们使用 query 获取即可
  const {
    num
  } = req.query
  res.json({
    name: 111,
    age: 11,
    message: req.originalUrl,
    num: `get 请求中的接口 num 为${num}`,
  })
}


export function postUrl(req, res) {
  //   针对普通的 post 请求 如果是表单格式的需要单独配置一下
  res.json({
    name: `post 请求的接口中，post参数为${req.body}`,
    age: 11,
    message: req.originalUrl,
  })
}


```
- router 中为路由配置
- app.js  启动端口服务，接受路由和接口配置
- main.js  babel 配置es6 语法


![image.png](https://upload-images.jianshu.io/upload_images/5703029-e77b7e7486bb8400.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


######  运行预览
>  这个项目，没有预览所有接口的功能。感兴趣的读者可以自己添加(当访问指定链接时，获取router 中的信息 进行展示出来，解决方法不唯一，可以查文档 自己添加)。

![image.png](https://upload-images.jianshu.io/upload_images/5703029-22badb80e74ecb9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/5703029-bf8dd09a0322ac0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





######  项目启动

[项目地址](https://github.com/majunchang/node-mock)
```

git clone https://github.com/majunchang/node-mock

cd node-mock
npm i 
npm run dev 

```

##  End 
文章如有错误和不正之处，欢迎指正和批评，同时也希望大家多多支持,非常感谢。



![image.png](https://upload-images.jianshu.io/upload_images/5703029-9f9f1f8cf4eed957.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





