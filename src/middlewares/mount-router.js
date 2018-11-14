import path from 'path'
import fs from 'fs'

export default {
  configure: (routerPath, option) => {
    const files = fs.readdirSync(routerPath)
    files.forEach(f => {
      const modulePath = path.join(routerPath, f)
      require(modulePath).default && option.express.use(require(modulePath).default)
    })
  }
}
