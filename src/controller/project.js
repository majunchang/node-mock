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
