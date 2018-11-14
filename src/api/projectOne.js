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
