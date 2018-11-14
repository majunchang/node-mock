import Mock from 'mockjs'

export function test (req, res) {
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

export function le (req, res) {
  res.json({
    name: 111,
    age: 11
  })
}
