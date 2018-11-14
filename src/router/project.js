import express from 'express'
import * as project from '../controller/project'
import projectOne from '../api/projectOne'

const router = express.Router()

router.get('/test', project.test)
router.get('/le', project.le)

for (let k in projectOne) {
  console.log(k)
  console.log(projectOne[k])
  router.get(`/${k}`, function (req, res) {
    res.json(projectOne[k])
  })
}

export default router
